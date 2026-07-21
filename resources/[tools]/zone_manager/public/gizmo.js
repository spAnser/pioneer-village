// Three.js overlay used to render an in-world 3D gizmo for adjusting a
// placed point's x/y/z with finer control than the raycast-placement flow.
//
// The camera-synced Three.js scene/camera below exists for the eventual
// interactive gizmo (drag handles need real 3D projection for hit
// testing). Visual point markers, however, are plain 2D screen-space divs
// positioned from Lua's GetScreenCoordFromWorldCoord output — see the
// comment further down for why.
//
// Coordinate mapping (ported from object_manager/public/app.js, the only
// other place in this codebase that syncs a Three.js scene to the RDR3
// camera): RDR3 (x, y, z) -> Three.js (x, z, -y) for position; rotation
// uses Three.js Euler order 'YZX' fed from RDR3 pitch/roll/yaw, with a
// sign flip on the roll axis when the camera looks near-straight up/down
// (|camY| >= 90 degrees) to avoid a gimbal-lock discontinuity.
const Gizmo = (() => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.rotation.order = 'YZX';

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.pointerEvents = 'none';
  renderer.domElement.style.display = 'none';
  document.body.appendChild(renderer.domElement);

  // Visual point markers do NOT go through the Three.js camera/projection
  // at all — that path depends on correctly matching RDR3's FOV/aspect
  // convention in a PerspectiveCamera, which has proven unreliable (see
  // git history: near-screen-center points align, edges drift, and no
  // proven-correct conversion formula exists for this native anywhere).
  // Instead, Lua computes each point's screen position directly via
  // GetScreenCoordFromWorldCoord — the exact native RDR3's own renderer
  // uses — and marker placement here is plain 2D screen-space, so it can
  // never drift out of alignment with what the player actually sees.
  // The Three.js scene/camera above is kept for the eventual interactive
  // gizmo (drag handles), which does need real 3D projection for hit
  // testing, but that's a separate, later problem from "can the user see
  // where a point is."
  let lastDebugInfo = null;

  // Stage 2: an invisible anchor mesh that TransformControls attaches to.
  // Only one is ever needed — it's repositioned to whichever point is
  // currently "nearest" (per app.js's existing nearestIndex calc) rather
  // than creating one gizmo per point.
  const anchorGeometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
  const anchorMaterial = new THREE.MeshBasicMaterial({ visible: false });
  const anchor = new THREE.Mesh(anchorGeometry, anchorMaterial);
  scene.add(anchor);

  const transformControls = new TransformControls(camera, renderer.domElement);
  transformControls.setMode('translate');
  transformControls.setSpace('world');
  transformControls.attach(anchor);
  transformControls.visible = false;
  transformControls.enabled = false;
  scene.add(transformControls);

  let attachedIndex = null;
  let onDragChange = null; // (index, rdr3Pos) => void, set via setDragHandler
  let onDragEnd = null; // (index) => void

  transformControls.addEventListener('change', () => {
    if (attachedIndex === null || !transformControls.dragging) return;
    // Three.js (x, y, z) -> RDR3 (x, -z, y), inverse of the position
    // mapping used in updateCamera/setPointPosition.
    const rdr3Pos = {
      x: anchor.position.x,
      y: -anchor.position.z,
      z: anchor.position.y,
    };
    if (onDragChange) onDragChange(attachedIndex, rdr3Pos);
  });

  transformControls.addEventListener('mouseUp', () => {
    if (attachedIndex !== null && onDragEnd) onDragEnd(attachedIndex);
  });

  // Disable game/camera controls while actively dragging a gizmo handle,
  // same reasoning as object_manager: dragging and free-look both want the
  // mouse, so one must yield while the other is in progress.
  let onDragStateChange = null; // (dragging) => void
  transformControls.addEventListener('dragging-changed', (event) => {
    if (onDragStateChange) onDragStateChange(event.value);
  });

  function attachToPoint(index, rdr3Pos) {
    attachedIndex = index;
    anchor.position.set(rdr3Pos.x, rdr3Pos.z, -rdr3Pos.y);
    transformControls.visible = true;
    transformControls.enabled = true;
  }

  function detach() {
    attachedIndex = null;
    transformControls.visible = false;
    transformControls.enabled = false;
    renderer.domElement.style.pointerEvents = 'none';
  }

  // The canvas defaults to pointer-events:none because a WebGL canvas
  // captures clicks across its ENTIRE bounding box (the full screen here),
  // not just where something is visually drawn — if left enabled whenever
  // a gizmo is attached (which is almost always, since one attaches to
  // whichever point is nearest), it would swallow every click anywhere on
  // screen, including ones meant for point placement. Instead, only allow
  // the canvas to intercept clicks when the cursor is actually near the
  // gizmo's on-screen position, so clicks elsewhere pass through normally.
  const GIZMO_HOVER_RADIUS_PX = 60;

  function updateCursorProximity(clientX, clientY, gizmoScreenPos) {
    if (attachedIndex === null || !gizmoScreenPos) {
      renderer.domElement.style.pointerEvents = 'none';
      return;
    }
    const dx = clientX - gizmoScreenPos.x * window.innerWidth;
    const dy = clientY - gizmoScreenPos.y * window.innerHeight;
    const near = Math.sqrt(dx * dx + dy * dy) <= GIZMO_HOVER_RADIUS_PX;
    renderer.domElement.style.pointerEvents = near || transformControls.dragging ? 'auto' : 'none';
  }

  // Keep the anchor synced to the real point position whenever it's NOT
  // being actively dragged, so external edits (undo, hover switching to a
  // different point, etc) don't leave the gizmo pointing at a stale spot.
  function syncAnchorIfNotDragging(index, rdr3Pos) {
    if (transformControls.dragging || attachedIndex !== index) return;
    anchor.position.set(rdr3Pos.x, rdr3Pos.z, -rdr3Pos.y);
  }

  function setDragHandlers(handlers) {
    onDragChange = handlers.onChange || null;
    onDragEnd = handlers.onEnd || null;
    onDragStateChange = handlers.onDragStateChange || null;
  }

  function updateCamera(cam) {
    camera.position.set(cam.position.x, cam.position.z, -cam.position.y);

    const camX = cam.rotation.x;
    const camY = cam.rotation.y;
    const camZ = cam.rotation.z;
    camera.rotation.set(
      THREE.MathUtils.degToRad(camX),
      THREE.MathUtils.degToRad(Math.abs(camY) >= 90 ? -camZ : camZ),
      THREE.MathUtils.degToRad(camY),
    );

    camera.fov = cam.fov;
    camera.updateProjectionMatrix();

    lastDebugInfo = {
      fov: cam.fov,
      aspect: camera.aspect,
      windowW: window.innerWidth,
      windowH: window.innerHeight,
    };
  }

  function getDebugInfo() {
    return lastDebugInfo;
  }

  function setVisible(visible) {
    renderer.domElement.style.display = visible ? '' : 'none';
    if (!visible) detach();
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return {
    updateCamera,
    setVisible,
    getDebugInfo,
    attachToPoint,
    detach,
    syncAnchorIfNotDragging,
    setDragHandlers,
    updateCursorProximity,
  };
})();
