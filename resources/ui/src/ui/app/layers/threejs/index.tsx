import * as THREE from 'three';

import UIComponent from '@uiLib/ui-component';
import { emitClient, onClient } from '@lib/ui';
import { createRef } from 'preact';

export default class ThreeJS extends UIComponent<UI.BaseProps, UI.ThreeJS.State, {}> {
  closeOnEscape = true;
  refWrapper = createRef<HTMLDivElement>();
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  cube: THREE.Mesh;
  sprite: THREE.Sprite;
  lastTime: number;

  constructor() {
    super();

    this.state = {
      show: false,
      fov: 50,
      cameraPosition: { x: 0, y: 0, z: 0 },
      cameraRotation: { x: 0, y: 0, z: 0 },
      targetPosition: { x: 0, y: 0, z: 0 },
      targetRotation: { x: 0, y: 0, z: 0 },
    };

    onClient('threejs.state', this.onEvent.bind(this));
  }

  componentDidMount() {
    this.camera = new THREE.PerspectiveCamera(this.state.fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(0.25, 0.5, 0.25);
    const material = new THREE.MeshNormalMaterial();
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    const map = new THREE.TextureLoader().load('https://p--v.b-cdn.net/smear-1.png');
    const material2 = new THREE.SpriteMaterial({ map });
    this.sprite = new THREE.Sprite(material2);
    this.sprite.scale.set(0.75, 0.18, 1);
    this.scene.add(this.sprite);

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setAnimationLoop(this.handleAnimate.bind(this));

    this.refWrapper?.current?.appendChild(this.renderer.domElement);
  }

  onEvent(threeEvent: UI.ThreeJS.Event) {
    if (threeEvent.cameraPosition) {
      threeEvent.cameraPosition = {
        x: threeEvent.cameraPosition.x,
        y: threeEvent.cameraPosition.z,
        z: -threeEvent.cameraPosition.y,
      };
    }
    if (threeEvent.cameraRotation) {
      threeEvent.cameraRotation = {
        x: THREE.MathUtils.degToRad(threeEvent.cameraRotation.x),
        y: THREE.MathUtils.degToRad(threeEvent.cameraRotation.z),
        z: THREE.MathUtils.degToRad(-threeEvent.cameraRotation.y),
      };
    }
    if (threeEvent.targetPosition) {
      threeEvent.targetPosition = {
        x: threeEvent.targetPosition.x,
        y: threeEvent.targetPosition.z,
        z: -threeEvent.targetPosition.y,
      };
    }
    if (threeEvent.targetRotation) {
      threeEvent.targetRotation = {
        x: THREE.MathUtils.degToRad(threeEvent.targetRotation.x),
        y: THREE.MathUtils.degToRad(threeEvent.targetRotation.z),
        z: THREE.MathUtils.degToRad(-threeEvent.targetRotation.y),
      };
    }
    this.setState(threeEvent);

    this.camera.fov = this.state.fov;
    this.camera.updateProjectionMatrix();

    this.camera.position.set(this.state.cameraPosition.x, this.state.cameraPosition.y, this.state.cameraPosition.z);
    this.camera.rotation.set(this.state.cameraRotation.x, this.state.cameraRotation.y, this.state.cameraRotation.z);

    this.cube.position.set(this.state.targetPosition.x, this.state.targetPosition.y, this.state.targetPosition.z);
    this.cube.rotation.set(this.state.targetRotation.x, this.state.targetRotation.y, this.state.targetRotation.z);
    this.sprite.position.set(this.state.targetPosition.x, this.state.targetPosition.y, this.state.targetPosition.z);
  }

  handleAnimate(time: number) {
    // const delta = time - this.lastTime;
    // this.lastTime = time;

    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <>
        <div
          ref={this.refWrapper}
          style={{
            position: 'absolute',
            inset: 0,
            display: this.state.show ? 'block' : 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            display: this.state.show ? 'block' : 'none',
          }}
        >
          <h1>
            {this.state.cameraPosition.x.toFixed(2)}, {-this.state.cameraPosition.z.toFixed(2)},{' '}
            {this.state.cameraPosition.y.toFixed(2)}
          </h1>
          <h1>
            {this.state.cameraRotation.x.toFixed(2)}, {-this.state.cameraRotation.z.toFixed(2)},{' '}
            {this.state.cameraRotation.y.toFixed(2)}
          </h1>
        </div>
      </>
    );
  }
}
