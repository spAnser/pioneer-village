declare interface ClientExports {
  camera: Camera.ClientExports;
}

declare namespace Camera {
  interface Data {
    id: string;
    _type?: number | 'DEFAULT_SCRIPTED_CAMERA' | 'DEFAULT_SPLINE_CAMERA';
    coords: Vector3Format;
    rot: Vector3Format;
    fov: number;
  }

  type create = (data: Data) => void;
  type setCoord = (id: string, coords: Vector3Format) => void;
  type setRot = (id: string, rot: Vector3Format) => void;
  type pointAtCoord = (id: string, coords: Vector3Format) => void;
  type pointAtEntity = (id: string, entity: number, offset?: Vector3Format) => void;
  type destroy = (id: string) => void;
  type setActive = (id: string, easeTime?: number) => void;
  type setInactive = (id: string, easeTime?: number) => void;
  type interpolate = (id: string, duration: number, easeLocation?: boolean, easeRotation?: boolean) => Promise<void>;

  type ClientExports = {
    create: create;
    setCoord: setCoord;
    setRot: setRot;
    pointAtCoord: pointAtCoord;
    pointAtEntity: pointAtEntity;
    destroy: destroy;
    setActive: setActive;
    setInactive: setInactive;
    interpolate: interpolate;
  };
}
