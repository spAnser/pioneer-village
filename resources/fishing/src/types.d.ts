declare interface RPC {}

declare namespace Fishing {
  interface FishInfo {
    size: number;
    baitInterest: number;
    hasGoToTask: boolean;
  }

  interface JunkOption {
    model: number;
    offset: Vector3Format;
    rotation: Vector3Format;
    dragOutOfWater?: boolean;
  }
}
