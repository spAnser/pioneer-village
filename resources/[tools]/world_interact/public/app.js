const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

camera.rotation.order = "YZX";

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  stencil: false,
  depth: false,
});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({
  color: 0xff00ff,
  opacity: 1.0,
});
/*
const cube = new THREE.Mesh(geometry, material);
cube.rotation.order = "YZX";
cube.scale.set(1.0, 1.0, 1.0);
cube.position.set(1970.193359375, 116.11246490478516, -943.1165161132812);
cube.rotation.set(
  0.04089024611729299,
  0.2088563112501057,
  0.0030614009408436406
);
scene.add(cube);
*/
const loader = new THREE.FontLoader();
loader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  (font) => {
    const color = 0xffffff;
    const matDark = new THREE.LineBasicMaterial({
      color: color,
      side: THREE.FrontSide,
    });
    const message = `[R] Lock`;
    // const message = `   •\n[R] Pickup`;
    // const message = `0/5 Sticks`;

    const shapes = font.generateShapes(message, 0.04);
    const geometry = new THREE.ShapeGeometry(shapes);

    geometry.computeBoundingBox();

    const xMid =
      -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

    geometry.translate(xMid, 0, 0);

    const text = new THREE.Mesh(geometry, matDark);
    text.position.set(-283.5356, 118.5298, -784.4078);
    text.rotation.set(0, 0, 0);
    text.rotation.order = "YZX";
    scene.add(text);
    window.text = text;

    const text2 = new THREE.Mesh(geometry, matDark);
    text2.position.set(-283.5356, 118.5298, -784.4078);
    text2.rotation.set(0, THREE.Math.degToRad(180), 0);
    text2.rotation.order = "YZX";
    scene.add(text2);
    window.text2 = text2;
  }
);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

const app = new Vue({
  el: "#app",
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("message", this.messageHandler);
  },
  methods: {
    messageHandler(e) {
      if (!e.isTrusted) {
        throw "Untrusted event";
      }
      switch (e.data.action) {
        case "hide":
          renderer.domElement.style.display = "none";
          break;
        case "show":
          renderer.domElement.style.display = "";
          break;
        case "update_camera":
          // console.log(JSON.stringify(e.data.cam));
          if (e.data.cam.position) {
            camera.position.set(
              e.data.cam.position.x,
              e.data.cam.position.z,
              -e.data.cam.position.y
            );
          }
          if (e.data.cam.rotation) {
            // console.log(e.data.cam.rotation)
            const camX = e.data.cam.rotation.x;
            const camY = e.data.cam.rotation.y;
            const camZ = e.data.cam.rotation.z;
            camera.rotation.set(
              THREE.MathUtils.degToRad(camX),
              THREE.MathUtils.degToRad(camY > 0 ? -camZ : camZ),
              THREE.MathUtils.degToRad(camY)
            );
          }
          if (e.data.cam.fov) {
            camera.fov = e.data.cam.fov;
          }
          camera.updateProjectionMatrix();
          if (e.data.entity && e.data.entity.position) {
            // cube.position.set(
            //   e.data.entity.position.x,
            //   e.data.entity.position.z,
            //   -e.data.entity.position.y
            // );
            // cube.rotation.set(
            //   THREE.MathUtils.degToRad(e.data.entity.rotation.x),
            //   THREE.MathUtils.degToRad(e.data.entity.rotation.z),
            //   THREE.MathUtils.degToRad(-e.data.entity.rotation.y)
            // );
          }
          break;
        case "update_door":
          text.position.set(e.data.coord.x, e.data.coord.z, -e.data.coord.y);
          text.rotation.set(
            THREE.MathUtils.degToRad(e.data.rot.x),
            THREE.MathUtils.degToRad(e.data.rot.z),
            THREE.MathUtils.degToRad(-e.data.rot.y)
          );
          text2.position.set(e.data.coord.x, e.data.coord.z, -e.data.coord.y);
          text2.rotation.set(
            THREE.MathUtils.degToRad(e.data.rot.x),
            THREE.MathUtils.degToRad(e.data.rot.z),
            THREE.MathUtils.degToRad(-e.data.rot.y)
          );
          // text.translateOnAxis({ x: 0.0, y: 0.25, z: 0.0 }, 1.0);
          // text2.translateOnAxis({ x: 0.0, y: 0.25, z: 0.0 }, 1.0);
          text.translateOnAxis({ x: 0.95, y: 0.85, z: 0.0 }, 1.0);
          text2.translateOnAxis({ x: 0.95, y: 0.85, z: 0.0 }, 1.0);
          text.rotateOnAxis({ x: 0.0, y: 1.0, z: 0.0 }, 3.14);
          // text.translateOnAxis({ x: -0.0575, y: -0.025, z: 0.0 }, 1.0);
          // text2.translateOnAxis({ x: 0.0575, y: -0.025, z: 0.0 }, 1.0);
          break;
        default:
          console.log("e.data.action", e.data.action);
      }
    },
  },
});
