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
    methods: {
        round(n) {
            return Math.round(n * 100) / 100;
        },
        addPoint() {
            post('add_point').then((res) => {
                if (res && res.points) {
                    this.points = toArray(res.points);
                    this.exportData = null;
                }
            });
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
            navigator.clipboard.writeText(text).then(() => {
                const button = event.target;
                const original = button.textContent;
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = original;
                }, 1200);
            });
        },
        close() {
            this.show = false;
            post('close_ui');
        },
    },
    mounted() {
        window.addEventListener('message', (event) => {
            const message = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

            switch (message.action) {
                case 'show':
                    this.show = true;
                    this.points = toArray(message.points);
                    this.minZ = message.minZ;
                    this.maxZ = message.maxZ;
                    this.exportData = null;
                    break;
                case 'hide':
                    this.show = false;
                    break;
                case 'update_positions':
                    this.cursor = message.cursor || null;
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
            if (!this.show) return;
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
            if (!this.show || !this.dragging) return;
            const dx = event.clientX - this.lastX;
            const dy = event.clientY - this.lastY;
            this.lastX = event.clientX;
            this.lastY = event.clientY;
            post('rotate_camera', { x: dx, y: dy });
        });
    },
});
