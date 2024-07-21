import { Vector3 } from '@lib/math/vector3';
import { Delay } from '@lib/functions';
import { Log } from '@lib/client/comms/ui';

class CameraManager {
  protected static instance: CameraManager;

  static getInstance(): CameraManager {
    if (!CameraManager.instance) {
      CameraManager.instance = new CameraManager();
    }
    return CameraManager.instance;
  }

  cameras: Map<string, number> = new Map();
  activeCam?: number;
  activeCamCoords?: Vector3;
  activeCamRot?: Vector3;
  activeCamFov?: number;

  constructor() {
    on('onResourceStop', (resourceName: string) => {
      if (resourceName === GetCurrentResourceName()) {
        this.destruct();
      }
    });
  }

  destruct(): void {
    for (const [id, cam] of this.cameras.entries()) {
      Log(`Destroying camera ${id} (${cam})`);
      DestroyCam(cam, false);
      this.cameras.delete(id);
    }
  }

  create(data: Camera.Data): number {
    const existingCamera = this.cameras.get(data.id);
    if (existingCamera) {
      Log(`Camera ${data.id} already exists`);
      return existingCamera;
    }

    if (!data._type) {
      data._type = 'DEFAULT_SCRIPTED_CAMERA';
    }

    if (typeof data._type === 'string') {
      data._type = GetHashKey(data._type);
    }
    const camera = CreateCamera(data._type, false);
    Log(`CreateCamera(${data._type}, false) | ${camera}`);
    SetCamCoord(camera, data.coords.x, data.coords.y, data.coords.z);
    SetCamRot(camera, data.rot.x, data.rot.y, data.rot.z, 2);
    SetCamFov(camera, data.fov);
    Log(data.id, camera);
    this.cameras.set(data.id, camera);
    return camera;
  }

  setCoord(id: string, coords: Vector3): void {
    const camera = this.cameras.get(id);
    if (camera) {
      SetCamCoord(camera, coords.x, coords.y, coords.z);
      if (camera === this.activeCam) {
        this.activeCamCoords = coords;
      }
    }
  }

  setRot(id: string, rot: Vector3): void {
    const camera = this.cameras.get(id);
    if (camera) {
      SetCamRot(camera, rot.x, rot.y, rot.z, 2);
      if (camera === this.activeCam) {
        this.activeCamRot = rot;
      }
    }
  }

  pointAtCoord(id: string, coords: Vector3): void {
    const camera = this.cameras.get(id);
    if (camera) {
      PointCamAtCoord(camera, coords.x, coords.y, coords.z);
      if (camera === this.activeCam) {
        this.activeCamRot = Vector3.fromArray(GetCamRot(this.activeCam, 2));
      }
    }
  }

  pointAtEntity(id: string, entity: number, offset: Vector3): void {
    if (!this.has(id)) {
      return;
    }
    const cam = this.get(id);
    PointCamAtEntity(cam, entity, offset.x, offset.y, offset.z, true);
  }

  has(id: string): boolean {
    return this.cameras.has(id);
  }

  get(id: string): number {
    return this.cameras.get(id) || 0;
  }

  destroy(id: string): void {
    if (!this.has(id)) {
      return;
    }
    Log(`DestroyCam(${this.get(id)}, false);`);
    DestroyCam(this.get(id), false);
    this.cameras.delete(id);
  }

  setActive(id: string, easeTime = 1000): void {
    if (!this.has(id)) {
      return;
    }
    const cam = this.get(id);
    Log(`SetCamActive(${cam}, true);`);
    SetCamActive(cam, true);
    RenderScriptCams(true, easeTime > 0, easeTime, true, false, 0);
    this.activeCam = cam;
    this.activeCamCoords = Vector3.fromArray(GetCamCoord(this.activeCam));
    this.activeCamRot = Vector3.fromArray(GetCamRot(this.activeCam, 2));
    this.activeCamFov = GetCamFov(this.activeCam);
  }

  setInactive(id: string, easeTime = 1000): void {
    if (!this.has(id)) {
      return;
    }
    const cam = this.get(id);
    Log(`SetCamActive(${cam}, false);`);
    SetCamActive(cam, false);
    RenderScriptCams(false, false, easeTime, false, false, 0);
    if (this.activeCam === cam) {
      this.activeCam = undefined;
      this.activeCamCoords = undefined;
      this.activeCamRot = undefined;
      this.activeCamFov = undefined;
    }
  }

  async interpolate(id: string, duration: number, easeLocation = true, easeRotation = true): Promise<void> {
    if (!this.activeCam) {
      return;
    }
    const cam = this.get(id);
    SetCamActiveWithInterp(cam, this.activeCam, duration, easeLocation ? 1 : 0, easeRotation ? 1 : 0);
    this.activeCam = cam;
    await Delay(duration);
  }
}

const cameraManager = CameraManager.getInstance();
export default cameraManager;
