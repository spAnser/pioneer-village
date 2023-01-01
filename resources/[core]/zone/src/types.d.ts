declare namespace Zone {
  interface SphereData {
    name: string;
    coords: Vector3Format;
    radius: number;
    onEnter?: () => void;
    onExit?: () => void;
  }

  interface BoxData {
    name: string;
    minZ: number;
    maxZ: number;
    coords: [Vector2Format, Vector2Format, Vector2Format, Vector2Format];
    onEnter?: () => void;
    onExit?: () => void;
  }

  interface PolyData {
    name: string;
    minZ: number;
    maxZ: number;
    coords: Vector2Format[];
    onEnter?: () => void;
    onExit?: () => void;
  }
}

declare interface RPC {}
