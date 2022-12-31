declare interface RPC {}

declare namespace World {
  interface Object {
    model: number;
    coords: Vector3Format;
    rotation: Vector3Format;
    name: string;
    networked: boolean;
  }
}
