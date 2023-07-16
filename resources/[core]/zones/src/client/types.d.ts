declare interface ClientExports {
  zones: Zones.ClientExports;
}

declare namespace Zones {
  interface PolyOptions {
    debug?: boolean;
    delayEnter?: number;
    delayExit?: number;
  }

  type AddPoly = (name: string, points: Vector2Format[], minZ: number, maxZ: number, options: PolyOptions) => void;
  type AddBox = (
    name: string,
    coords: Vector3Format,
    size: Vector3Format,
    rotation: number,
    options: PolyOptions,
  ) => void;
  type AddSphere = (name: string, coords: Vector3Format, radius: number, options: PolyOptions) => void;

  type ClientExports = {
    AddPoly: AddPoly;
    AddBox: AddBox;
    AddSphere: AddSphere;
    Remove: (name: string) => void;
  };

  interface BaseData {
    name: string;
    options?: PolyOptions;
    onEnter?: () => void;
    onExit?: () => void;
  }

  interface SphereData extends BaseData {
    _type: 'sphere';
    coords: Vector3Format;
    radius: number;
  }

  interface BoxData extends BaseData {
    _type: 'box';
    coords: Vector3Format;
    size: Vector3Format;
    rotation: number;
  }

  interface PolyData extends BaseData {
    _type: 'poly';
    coords: Vector2Format[];
    minZ: number;
    maxZ: number;
  }

  type ZoneData = SphereData | BoxData | PolyData;
}
