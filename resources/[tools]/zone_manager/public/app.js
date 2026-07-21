const resourceName = 'zone_manager';

function post(endpoint, data) {
    return fetch(`https://${resourceName}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data || {}),
    }).then((res) => res.json());
}

// Lua's json.encode can't distinguish an empty array from an empty object,
// so an emptied `points` table round-trips as `{}` instead of `[]`.
function toArray(value) {
    return Array.isArray(value) ? value : [];
}

const app = new Vue({
    el: '#app',
    data: {
        show: false,
        points: [],
        minZ: -50,
        maxZ: 999,
        cursor: null,
        exportData: null,
        dragging: false,
        lastX: 0,
        lastY: 0,
        hoveredIndex: null,
        debugInfo: null,
        pointScreenCoords: [],
        gizmoDragging: false,
    },
    computed: {
        nearestIndex() {
            if (!this.cursor || !this.points.length) return -1;
            let closestIndex = -1;
            let closestDist = Infinity;
            for (let i = 0; i < this.points.length; i++) {
                const p = this.points[i];
                const dx = p.x - this.cursor.x;
                const dy = p.y - this.cursor.y;
                const dz = p.z - this.cursor.z;
                const dist = dx * dx + dy * dy + dz * dz;
                if (dist < closestDist) {
                    closestDist = dist;
                    closestIndex = i;
                }
            }
            return closestIndex;
        },
    },
    watch: {
        nearestIndex(index) {
            // Don't rebind the gizmo mid-drag — switching the attached
            // point out from under an active drag would abandon it.
            if (this.gizmoDragging) return;
            if (index === -1 || !this.points[index]) {
                Gizmo.detach();
            } else {
                Gizmo.attachToPoint(index, this.points[index]);
            }
        },
    },
    methods: {
        round(n) {
            return Math.round(n * 100) / 100;
        },
        screenCoordFor(index) {
            return this.pointScreenCoords.find((p) => p.index === index) || null;
        },
        undoPoint() {
            post('undo_point').then((res) => {
                this.points = toArray(res.points);
                this.exportData = null;
            });
        },
        clearPoints() {
            post('clear_points').then((res) => {
                this.points = toArray(res.points);
                this.exportData = null;
            });
        },
        deletePoint(index) {
            post('delete_point', { index }).then((res) => {
                this.points = toArray(res.points);
                this.exportData = null;
            });
        },
        setBounds() {
            post('set_bounds', { minZ: this.minZ, maxZ: this.maxZ });
        },
        refreshExport() {
            post('get_export').then((res) => {
                this.exportData = res;
            });
        },
        hoverPoint(index) {
            this.hoveredIndex = index;
            post('hover_point', { index });
        },
        copyText(text, event) {
            // navigator.clipboard is unreliable inside the CEF-based NUI
            // browser (often unavailable outside a secure context), so
            // copy via a temporary textarea + execCommand instead.
            const helper = document.createElement('textarea');
            helper.value = text;
            helper.style.position = 'fixed';
            helper.style.opacity = '0';
            document.body.appendChild(helper);
            helper.focus();
            helper.select();
            document.execCommand('copy');
            document.body.removeChild(helper);

            const button = event.target;
            const original = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = original;
            }, 1200);
        },
        close() {
            this.show = false;
            post('close_ui');
        },
    },
    mounted() {
        // TransformControls fires 'change' on every pointermove during a
        // drag, which can be very frequent — throttle how often that
        // reaches Lua (which rebuilds the AddPoly preview zone on each
        // call) so a drag doesn't hammer it dozens of times per second.
        let lastPositionPost = 0;
        const POSITION_POST_INTERVAL_MS = 50;

        Gizmo.setDragHandlers({
            onChange: (index, rdr3Pos) => {
                // Local state updates every tick for a responsive panel
                // readout; the Lua round-trip (which rebuilds the preview
                // zone) is throttled separately.
                if (this.points[index]) {
                    this.$set(this.points, index, { x: rdr3Pos.x, y: rdr3Pos.y, z: rdr3Pos.z });
                }
                const now = performance.now();
                if (now - lastPositionPost >= POSITION_POST_INTERVAL_MS) {
                    lastPositionPost = now;
                    post('set_point_position', { index, x: rdr3Pos.x, y: rdr3Pos.y, z: rdr3Pos.z });
                }
            },
            onEnd: (index) => {
                // Force a final, un-throttled sync so the last bit of drag
                // movement (which may have been skipped by the throttle)
                // isn't lost from Lua's authoritative point state.
                const p = this.points[index];
                if (p) {
                    post('set_point_position', { index, x: p.x, y: p.y, z: p.z });
                }
                this.exportData = null;
            },
            onDragStateChange: (dragging) => {
                this.gizmoDragging = dragging;
            },
        });

        window.addEventListener('message', (event) => {
            const message = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

            switch (message.action) {
                case 'show':
                    this.show = true;
                    this.points = toArray(message.points);
                    this.minZ = message.minZ;
                    this.maxZ = message.maxZ;
                    this.exportData = null;
                    Gizmo.setVisible(true);
                    break;
                case 'hide':
                    this.show = false;
                    Gizmo.setVisible(false);
                    break;
                case 'update_positions':
                    this.cursor = message.cursor || null;
                    break;
                case 'update_camera':
                    Gizmo.updateCamera(message.cam);
                    this.debugInfo = Gizmo.getDebugInfo();
                    this.pointScreenCoords = toArray(message.pointScreenCoords);
                    break;
                case 'points_updated':
                    this.points = toArray(message.points);
                    this.exportData = null;
                    break;
            }
        });

        const moveKeys = {
            KeyW: 'w',
            KeyS: 's',
            KeyA: 'a',
            KeyD: 'd',
            KeyQ: 'q',
            KeyE: 'e',
            ShiftLeft: 'sprint',
            ShiftRight: 'sprint',
        };
        const pressedKeys = new Set();

        const isTextInputFocused = () => {
            const tag = document.activeElement && document.activeElement.tagName;
            return tag === 'INPUT' || tag === 'TEXTAREA';
        };

        document.addEventListener('keydown', (event) => {
            if (!this.show) return;
            if (event.key === 'Escape') {
                this.close();
                return;
            }
            if (isTextInputFocused()) return;
            if (event.code === 'KeyF' && !event.repeat) {
                post('place_point_key');
                return;
            }
            const key = moveKeys[event.code];
            if (key && !pressedKeys.has(key)) {
                pressedKeys.add(key);
                post('move_input', { key, pressed: true });
            }
        });

        document.addEventListener('keyup', (event) => {
            const key = moveKeys[event.code];
            if (key && pressedKeys.has(key)) {
                pressedKeys.delete(key);
                post('move_input', { key, pressed: false });
            }
        });

        window.addEventListener('blur', () => {
            for (const key of pressedKeys) {
                post('move_input', { key, pressed: false });
            }
            pressedKeys.clear();
        });

        // Point placement raycasts from the real (free, unlocked) cursor
        // position, so the OS-drawn pointer itself is the aiming indicator —
        // no synthetic crosshair to keep in sync. Drag with middle/right
        // mouse to rotate the camera without moving the cursor off-target.
        document.addEventListener('mousedown', (event) => {
            if (!this.show || this.gizmoDragging) return;
            if (event.target.tagName === 'CANVAS') {
                // Clicks on the gizmo's Three.js canvas are TransformControls'
                // to handle (grabbing a drag handle) — never treat them as
                // camera-rotation or point-placement input. The canvas only
                // accepts clicks near the gizmo itself (see updateCursorProximity),
                // so reaching this branch means the click was genuinely on
                // or very near a handle.
                return;
            }
            if (event.button === 1 || event.button === 2) {
                this.dragging = true;
                this.lastX = event.clientX;
                this.lastY = event.clientY;
            } else if (event.button === 0 && !event.target.closest('.window')) {
                // Left click on the world (not inside a side panel) places
                // a point, same as pressing F — lets you keep one hand off
                // the keyboard while aiming.
                post('place_point_key');
            }
        });
        document.addEventListener('mouseup', () => {
            this.dragging = false;
        });
        document.addEventListener('mousemove', (event) => {
            // Always tracked (regardless of drag state) so the gizmo's
            // canvas can decide whether the cursor is close enough to
            // intercept clicks — see updateCursorProximity in gizmo.js.
            const gizmoScreenPos = this.nearestIndex !== -1 ? this.screenCoordFor(this.nearestIndex) : null;
            Gizmo.updateCursorProximity(event.clientX, event.clientY, gizmoScreenPos);

            if (!this.show || !this.dragging || this.gizmoDragging) return;
            const dx = event.clientX - this.lastX;
            const dy = event.clientY - this.lastY;
            this.lastX = event.clientX;
            this.lastY = event.clientY;
            post('rotate_camera', { x: dx, y: dy });
        });
    },
});
