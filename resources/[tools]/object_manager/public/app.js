const post = (url, data) => {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.send(data);
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
const cameraMoveVector = new THREE.Vector3();

// const light = new THREE.AmbientLight(0xffffff)
// scene.add(light)

camera.rotation.order = 'YZX';

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.domElement.style.display = 'none';
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({
  color: 0xff00ff,
  opacity: 0.0,
  transparent: true,
});
const cube = new THREE.Mesh(geometry, material);
cube.rotation.order = 'YZX';
cube.scale.set(1.0, 1.0, 1.0);
scene.add(cube);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

const app = new Vue({
  el: '#app',
  data: {
    cameraLook: false,
    mousePrevX: 0,
    mousePrevY: 0,
    keyW: false,
    keyA: false,
    keyS: false,
    keyD: false,
    keyE: false,
    keyQ: false,
    cameraSpeeds: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 0.75, 1.0],
    cameraSpeed: 0.01,
    keyLoopInterval: false,
    transformControls: false,
    isTransforming: false,
    transformSpace: 'world',
    transformSpaces: ['world', 'local'],
    transformMode: 'translate',
    transformModes: ['translate', 'rotate'],
    translationSnap: 0.1,
    translationSnaps: [0.05, 0.1, 0.25, 0.5, 1.0, 2.0],
    rotationSnap: 15,
    rotationSnaps: [5, 10, 15, 30, 45, 90],
    spawningObject: false,
    ctrlDown: false,
    shiftDown: false,
    dragging: false,
    draggingDirection: 'x',
    top: 0,
    left: 0,
    show: false,
    spawnModel: '',
    modelToClone: '',
    editable: false,
    editingId: '',
    hash: '',
    alpha: 254,
    x: 0.0,
    y: 0.0,
    z: 0.0,
    pitch: 0.0,
    roll: 0.0,
    yaw: 0.0,
    prevX: [],
    prevY: [],
    prevZ: [],
    prevPitch: [],
    prevRoll: [],
    prevYaw: [],
    distance: 0.0,
    objects: [],
    objectInfos: {},
    cameraX: 0.0,
    cameraY: 0.0,
    cameraZ: 0.0,
    cameraRotX: 0.0,
    cameraRotY: 0.0,
    cameraRotZ: 0.0,
  },
  mounted() {
    window.addEventListener('keydown', this.keydownHandler);
    window.addEventListener('keyup', this.keyupHandler);
    window.addEventListener('mousedown', this.mouseDownHandler);
    window.addEventListener('mouseup', this.mouseUpHandler);
    window.addEventListener('mousemove', this.mouseMoveHandler);
    window.addEventListener('message', this.messageHandler);

    this.keyLoopInterval = setInterval(this.keydownLoop, 1);

    this.transformControls = new TransformControls(camera, renderer.domElement);
    this.transformControls.addEventListener('change', this.render);
    this.transformControls.addEventListener('mouseDown', this.transformMouseDownHandler);
    this.transformControls.addEventListener('mouseUp', this.transformMouseUpHandler);
    this.transformControls.setTranslationSnap(this.translationSnap);
    this.transformControls.setRotationSnap(THREE.MathUtils.degToRad(this.rotationSnap));
    this.transformControls.attach(cube);
    scene.add(this.transformControls);
  },
  beforeDestroy() {
    clearInterval(this.keyLoopInterval);
  },
  computed: {
    moverPos() {
      return {
        top: `${this.top}px`,
        left: `${this.left}px`,
      };
    },
    quaternion() {
      const objectInfo = this.objectInfos[this.editingId];
      if (this.editingId && objectInfo) {
        objectInfo.quaternion = {
          x: cube.quaternion.x,
          y: cube.quaternion.y,
          z: cube.quaternion.z,
          w: cube.quaternion.w,
        };
        this.$set(this.objectInfos, this.editingId, objectInfo);
      }
      return cube.quaternion;
    },
    objectIds() {
      return this.objects.map((obj) => obj.id);
    },
    ymapEntityLimits() {
      let minX = false;
      let maxX = false;
      let minY = false;
      let maxY = false;
      let minZ = false;
      let maxZ = false;
      for (const objectId of this.objectIds) {
        if (this.objectInfos[objectId]) {
          if (!minX || this.objectInfos[objectId].x < minX) {
            minX = this.objectInfos[objectId].x;
          }
          if (!maxX || this.objectInfos[objectId].x > maxX) {
            maxX = this.objectInfos[objectId].x;
          }
          if (!minY || this.objectInfos[objectId].y < minY) {
            minY = this.objectInfos[objectId].y;
          }
          if (!maxY || this.objectInfos[objectId].y > maxY) {
            maxY = this.objectInfos[objectId].y;
          }
          if (!minZ || this.objectInfos[objectId].z < minZ) {
            minZ = this.objectInfos[objectId].z;
          }
          if (!maxZ || this.objectInfos[objectId].z > maxZ) {
            maxZ = this.objectInfos[objectId].z;
          }
        }
      }
      if (minX !== false && maxX !== false && minY !== false && maxY !== false && minZ !== false && maxZ !== false) {
        return `  <streamingExtentsMin  x="${minX - 500}" y="${minY - 500}" z="${minZ - 500}"/>
  <streamingExtentsMax x="${maxX + 500}" y="${maxY + 500}" z="${maxZ + 500}"/>
  <entitiesExtentsMin x="${minX}" y="${minY}" z="${minZ}"/>
  <entitiesExtentsMax x="${maxX}" y="${maxY}" z="${maxZ}"/>`;
      }
      return '';
    },
    ymapEntities() {
      let entities = '';
      for (const objectId of this.objectIds) {
        if (this.objectInfos[objectId]) {
          entities += `<Item type="CEntityDef">
  <archetypeName>${this.objectInfos[objectId].hash}</archetypeName>
  <flags value="1572865"/>
  <id value="0x0"/>
  <position x="${this.objectInfos[objectId].x}" y="${this.objectInfos[objectId].y}" z="${
            this.objectInfos[objectId].z
          }"/>
  <rotation x="${-this.objectInfos[objectId].quaternion.x}" y="${this.objectInfos[objectId].quaternion.z}" z="${-this
            .objectInfos[objectId].quaternion.y}" w="${this.objectInfos[objectId].quaternion.w}"/>
  <scaleXY value="1.00000000"/>
  <scaleZ value="1.00000000"/>
  <parentIndex value="-1"/>
  <lodDist value="-1.00000000"/>
  <childLodDist value="0.00000000"/>
  <lodLevel>LODTYPES_DEPTH_ORPHANHD</lodLevel>
  <numChildren value="0"/>
  <priorityLevel>PRI_REQUIRED</priorityLevel>
  <extensions/>
  <redm_loves_you_8afd0f494c4bf509 value="0"/>
  <tintValue value="0"/>
  <redm_loves_you_2158e9a42f04a7dc value="255"/>
  <redm_loves_you_7dd29b0dd179bea5 value="255"/>
</Item>`;
        }
      }
      return entities;
    },
  },
  watch: {
    show() {
      if (this.show) {
        renderer.domElement.style.display = '';
      } else {
        renderer.domElement.style.display = 'none';
      }
    },
    editable() {
      if (this.editable) {
        this.transformControls.visible = true;
      } else {
        this.transformControls.visible = false;
      }
    },
    transformSpace() {
      this.transformControls.setSpace(this.transformSpace);
    },
    transformMode() {
      this.transformControls.setMode(this.transformMode);
    },
    translationSnap() {
      this.transformControls.setTranslationSnap(this.translationSnap);
    },
    rotationSnap() {
      this.transformControls.setRotationSnap(THREE.MathUtils.degToRad(this.rotationSnap));
    },
  },
  methods: {
    render() {
      this.x = cube.position.x;
      this.y = -cube.position.z;
      this.z = cube.position.y;
      this.pitch = THREE.MathUtils.radToDeg(cube.rotation.x);
      this.roll = THREE.MathUtils.radToDeg(-cube.rotation.z);
      this.yaw = THREE.MathUtils.radToDeg(cube.rotation.y);
      // console.log(JSON.stringify(cube.scale))
      this.editEntity();
      renderer.render(scene, camera);
    },
    setTransformSpace(value) {
      this.transformSpace = value;
    },
    setTransformMode(value) {
      this.transformMode = value;
    },
    setTranslationSnap(value) {
      this.translationSnap = value;
    },
    setRotationSnap(value) {
      this.rotationSnap = value;
    },
    clearData() {
      this.prevX = [];
      this.prevY = [];
      this.prevZ = [];
      this.prevPitch = [];
      this.prevRoll = [];
      this.prevYaw = [];
    },
    storeData() {
      if (this.x !== 0 && this.y !== 0 && this.z !== 0) {
        this.prevX.push(this.x);
        this.prevY.push(this.y);
        this.prevZ.push(this.z);
        this.prevPitch.push(this.pitch);
        this.prevRoll.push(this.roll);
        this.prevYaw.push(this.yaw);
      }
    },
    popData() {
      if (
        this.prevX.length &&
        this.prevX[this.prevX.length - 1] !== 0 &&
        this.prevY.length &&
        this.prevY[this.prevY.length - 1] !== 0 &&
        this.prevZ.length &&
        this.prevZ[this.prevZ.length - 1] !== 0
      ) {
        this.x = this.prevX.pop();
        this.y = this.prevY.pop();
        this.z = this.prevZ.pop();
        this.pitch = this.prevPitch.pop();
        this.roll = this.prevRoll.pop();
        this.yaw = this.prevYaw.pop();
      }
    },
    transformMouseDownHandler() {
      this.isTransforming = true;
      this.storeData();
    },
    transformMouseUpHandler() {
      const objectInfo = this.objectInfos[this.editingId];
      if (this.editingId && objectInfo) {
        objectInfo.x = cube.position.x;
        objectInfo.y = -cube.position.z;
        objectInfo.z = cube.position.y;
        this.$set(this.objectInfos, this.editingId, objectInfo);
      }
      this.isTransforming = false;
    },
    mouseDownHandler(e) {
      if (e.target.tagName === 'CANVAS') {
        if (e.button === 0) {
          this.$nextTick(() => {
            if (this.spawningObject) {
              fetch(`https://object_manager/end_entity_placement`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ create: true }),
              })
                .then((resp) => resp.json())
                .then((data) => {
                  this.selectEntity(this.spawningObject);
                  this.spawningObject = false;
                });
            } else if (!this.isTransforming) {
              // post('http://object_manager/select_entity', JSON.stringify({}))
              fetch(`https://object_manager/select_entity`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({}),
              })
                .then((resp) => resp.json())
                .then((data) => {
                  if (data.hit && this.editingId !== data.entity) {
                    this.clearData();
                    this.editingId = data.entity;
                    this.changeEntity();
                  }
                });
            }
          });
        } else if (e.button === 2) {
          this.cameraLook = true;
          this.mousePrevX = e.pageX;
          this.mousePrevY = e.pageY;
        }
      }
    },
    keydownLoop() {
      const dir = {
        x: 0,
        y: 0,
        z: 0,
      };
      if (this.keyW && !this.keyS) {
        dir.z = -1;
      } else if (this.keyS && !this.keyW) {
        dir.z = 1;
      }
      if (this.keyA && !this.keyD) {
        dir.x = -1;
      } else if (this.keyD && !this.keyA) {
        dir.x = 1;
      }
      if (this.keyE && !this.keyQ) {
        dir.y = 1;
      } else if (this.keyQ && !this.keyE) {
        dir.y = -1;
      }

      if (dir.x !== 0 || dir.y !== 0 || dir.z !== 0) {
        const cameraOffset = new THREE.Vector3(
          dir.x * this.cameraSpeed,
          dir.y * this.cameraSpeed,
          dir.z * this.cameraSpeed,
        );
        cameraOffset.applyQuaternion(camera.quaternion);
        camera.position.add(cameraOffset);

        post(
          'http://object_manager/move_camera',
          JSON.stringify({
            x: camera.position.x,
            y: -camera.position.z,
            z: camera.position.y,
          }),
        );

        this.cameraX = camera.position.x;
        this.cameraY = -camera.position.z;
        this.cameraZ = camera.position.y;
      }
    },
    mouseUpHandler(e) {
      if (e.button === 2) {
        this.cameraLook = false;
      }
    },
    mouseMoveHandler(e) {
      if (this.cameraLook) {
        const deltaX = e.pageX - this.mousePrevX;
        const deltaY = e.pageY - this.mousePrevY;
        post('http://object_manager/rotate_camera', JSON.stringify({ x: deltaX, y: deltaY }));
        this.mousePrevX = e.pageX;
        this.mousePrevY = e.pageY;
      }
    },
    keydownHandler(e) {
      if (e.target.tagName === 'BODY') {
        switch (e.which) {
          case 87: // W
            this.keyW = true;
            break;
          case 65: // A
            this.keyA = true;
            break;
          case 83: // S
            this.keyS = true;
            break;
          case 68: // D
            this.keyD = true;
            break;
          case 69: // E
            this.keyE = true;
            break;
          case 81: // Q
            this.keyQ = true;
            break;
          // default:
          //   console.log(e.which)
        }
      }
    },
    keyupHandler(e) {
      // console.log(e.which)
      if (e.target.tagName === 'BODY') {
        switch (e.which) {
          case 27: // Esc
            if (this.spawningObject) {
              fetch(`https://object_manager/end_entity_placement`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({ create: false }),
              })
                .then((resp) => resp.json())
                .then((data) => {
                  this.spawningObject = false;
                });
            } else {
              this.show = false;
              post('http://object_manager/close_ui', JSON.stringify({}));
            }
            break;
          case 82: // R
            this.transformMode = 'rotate';
            break;
          case 84: // T
            this.transformMode = 'translate';
            break;
          case 90: // Z
            if (!this.spawningObject && e.ctrlKey) {
              this.popData();
              this.editEntity();
            }
            break;
          case 67: // C
            if (!this.spawningObject && e.ctrlKey && e.target.tagName === 'BODY') {
              this.modelToClone = this.hash;
            }
            break;
          case 86: // V
            if (!this.spawningObject && e.ctrlKey && e.target.tagName === 'BODY') {
              this.cloneModel(this.modelToClone);
            }
            break;
          case 46: // DEL
            if (!this.spawningObject && e.target.tagName === 'BODY') {
              this.deleteEntity();
            }
            break;
          case 71: // G
            if (!this.spawningObject) {
              this.groundButtonHandler();
            }
            break;
          case 87: // W
            this.keyW = false;
            break;
          case 65: // A
            this.keyA = false;
            break;
          case 83: // S
            this.keyS = false;
            break;
          case 68: // D
            this.keyD = false;
            break;
          case 69: // E
            this.keyE = false;
            break;
          case 81: // Q
            this.keyQ = false;
            break;
          // default:
          //   console.log(e.which)
        }
      } else {
        switch (e.which) {
          case 27: // Esc
            e.target.blur();
            break;
        }
      }
    },
    messageHandler(e) {
      if (!e.isTrusted) {
        throw 'Untrusted event';
      }
      switch (e.data.action) {
        case 'update_positions':
          // console.log(JSON.stringify(e.data.cam.position))
          if (!this.keyW && !this.keyA && !this.keyS && !this.keyD && !this.keyE && !this.keyQ) {
            camera.position.set(e.data.cam.position.x, e.data.cam.position.z, -e.data.cam.position.y);
            this.cameraX = e.data.cam.position.x;
            this.cameraY = e.data.cam.position.y;
            this.cameraZ = e.data.cam.position.z;
          }

          if (e.data.cam.rotation) {
            // console.log(e.data.cam.rotation)
            const camX = e.data.cam.rotation.x;
            const camY = e.data.cam.rotation.y;
            const camZ = e.data.cam.rotation.z;
            this.cameraRotX = camX;
            this.cameraRotY = camY;
            this.cameraRotZ = camZ;
            camera.rotation.set(
              THREE.MathUtils.degToRad(camX),
              THREE.MathUtils.degToRad(Math.abs(camY) >= (90 * Math.PI) / 180 ? -camZ : camZ),
              THREE.MathUtils.degToRad(camY),
            );
          }
          camera.fov = e.data.cam.fov;
          camera.updateProjectionMatrix();
          if (e.data.entity.position) {
            cube.position.set(e.data.entity.position.x, e.data.entity.position.z, -e.data.entity.position.y);
            cube.rotation.set(
              THREE.MathUtils.degToRad(e.data.entity.rotation.x),
              THREE.MathUtils.degToRad(e.data.entity.rotation.z),
              THREE.MathUtils.degToRad(-e.data.entity.rotation.y),
            );
          }
          break;
        case 'show':
          if (this.editingId) {
            this.getEntityScreenCoords();
          }
          this.show = true;
          break;
        case 'hide':
          this.show = false;
          break;
        default:
          console.log('e.data.action', e.data.action);
      }
    },
    setEntityData(data) {
      // console.log(JSON.stringify(data))
      if (data.exists) {
        if (this.editingId !== data.id) {
          this.clearData();
        }
        this.editable = true;
        this.editingId = data.id;
        this.$set(this.objectInfos, this.editingId, {
          id: data.id,
          hash: data.hash,
          alpha: data.alpha,
          x: data.x,
          y: data.y,
          z: data.z,
          pitch: data.pitch,
          roll: data.roll,
          yaw: data.yaw,
          distance: data.distance,
          quaternion: {},
        });
        this.hash = data.hash;
        this.alpha = data.alpha;
        this.x = data.x;
        this.y = data.y;
        this.z = data.z;
        this.pitch = data.pitch;
        this.roll = data.roll;
        this.yaw = data.yaw;
        this.distance = data.distance;
      } else {
        this.editable = false;
        if (this.objectIds.includes(this.editingId)) {
          this.removeHandler();
        }
      }
    },
    spawnKeyup(e) {
      if (e.which === 13) {
        this.cloneModel(this.spawnModel);
      }
    },
    groundButtonHandler() {
      fetch(`https://object_manager/ground_object`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ id: parseInt(this.editingId) }),
      })
        .then((resp) => resp.json())
        .then(this.setEntityData);
    },
    cloneButtonHandler() {
      this.cloneModel(this.hash);
    },
    spawnButtonHandler() {
      this.cloneModel(this.spawnModel);
    },
    cloneModel(modelInput) {
      if (modelInput) {
        let modelName = null;
        let modelHash = null;
        if (isNaN(Number(modelInput))) {
          modelName = modelInput;
        } else {
          modelHash = Number(modelInput);
        }
        fetch(`https://object_manager/start_entity_placement`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({ name: modelName, hash: modelHash }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            this.editable = false;
            this.spawningObject = data.entity;
          });
      }
    },
    addHandler() {
      if (!this.objectIds.includes(this.editingId)) {
        this.objects.push({
          id: this.editingId,
          model: this.hash,
        });
      }
    },
    removeHandler() {
      const idx = this.objectIds.indexOf(this.editingId);
      if (idx > -1) {
        this.objects.splice(idx, 1);
      }
    },
    setMoverPos(data) {
      this.top = window.innerHeight * data.y;
      this.left = window.innerWidth * data.x;
    },
    getEntityScreenCoords() {
      fetch(`https://object_manager/entity_screen_coords`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ id: parseInt(this.editingId) }),
      })
        .then((resp) => resp.json())
        .then(this.setMoverPos);
    },
    selectEntity(id) {
      this.editingId = id;
      this.changeEntity();
    },
    changeEntity(e) {
      fetch(`https://object_manager/load_entity_info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ id: parseInt(this.editingId) }),
      })
        .then((resp) => resp.json())
        .then(this.setEntityData);
      this.getEntityScreenCoords();
    },
    editEntity(e) {
      post(
        'http://object_manager/edit_entity',
        JSON.stringify({
          id: parseInt(this.editingId),
          alpha: parseInt(this.alpha),
          x: parseFloat(this.x),
          y: parseFloat(this.y),
          z: parseFloat(this.z),
          pitch: parseFloat(this.pitch),
          roll: parseFloat(this.roll),
          yaw: parseFloat(this.yaw),
        }),
      );
    },
    deleteEntity(e) {
      post('http://object_manager/delete_entity', JSON.stringify({ id: parseInt(this.editingId) }));
      this.removeHandler();
      this.editingId = '';
      this.clearData();
      this.editable = false;
    },
  },
});

/**

<Item type="CEntityDef">
  <archetypeName>P_TABLEMAHOGANY01X</archetypeName>
  <flags value="1572864"/><!-- 00000000 00011000 00000000 00000000 -->
  <id value="0x0"/>
  <position x="-337.88140000" y="798.79400000" z="117.89830000"/>
  <rotation x="0.00000000" y="0.00000000" z="-0.08715597" w="0.99619470"/>
  <scaleXY value="1.00000000"/>
  <scaleZ value="1.00000000"/>
  <parentIndex value="-1"/>
  <lodDist value="50.00000000"/>
  <childLodDist value="0.00000000"/>
  <lodLevel>LODTYPES_DEPTH_ORPHANHD</lodLevel>
  <numChildren value="0"/>
  <priorityLevel>PRI_REQUIRED</priorityLevel>
  <extensions/>
  <redm_loves_you_8afd0f494c4bf509 value="0"/>
  <tintValue value="0"/>
  <redm_loves_you_2158e9a42f04a7dc value="255"/>
  <redm_loves_you_7dd29b0dd179bea5 value="255"/>
</Item>

*/
