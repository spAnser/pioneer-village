declare interface ClientExports {
  base: Base.ClientExports;
}

declare namespace Base {
  type getNetworkControlOfEntity = (entity: number) => Promise<void>;
  type deleteEntity = (entity: number) => void;
  type deleteEntities = (entities: number[]) => void;

  type ClientExports = {
    getNetworkControlOfEntity: getNetworkControlOfEntity;
    deleteEntity: deleteEntity;
    deleteEntities: deleteEntities;
    getCurrentCharacter: () => CharacterData | null;
  };

  type DoorData = [doorHash: number, modelHash: number, modelName: string, x: number, y: number, z: number];
  type BlipData = {
    name: string;
    sprite: string | number;
    color?: number;
    coords: Vector3Format;
  };
}
