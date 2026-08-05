declare interface ClientExports {
  base: Base.ClientExports;
}

declare namespace Base {
  type DoorData = [doorHash: number, modelHash: number, modelName: string, x: number, y: number, z: number];
  type BlipData =
    | {
        handle?: number;
        resource: string;
        type: 'sprite';
        label: string;
        sprite: string | number;
        modifiers?: number[];
        style: number;
        coords: Vector3Format;
      }
    | {
        handle?: number;
        resource: string;
        type: 'entity';
        label: string;
        sprite: string | number;
        modifiers?: number[];
        style: number;
        entity: number;
      }
    | {
        handle?: number;
        resource: string;
        type: 'pickup';
        label: string;
        sprite: string | number;
        modifiers?: number[];
        style: number;
        pickup: number;
      }
    | {
        handle?: number;
        resource: string;
        type: 'radius';
        style: string | number;
        sprite?: string | number;
        label: string;
        modifiers?: number[];
        coords: Vector3Format;
        scale: number;
      }
    | {
        handle?: number;
        resource: string;
        type: 'area';
        label: string;
        style: string | number;
        sprite?: string | number;
        modifiers?: number[];
        coords: Vector3Format;
        scale: [number, number];
      }
    | {
        handle?: number;
        resource: string;
        type: 'volume';
        label: string;
        style: string | number;
        sprite?: string | number;
        volume: number;
        modifiers?: number[];
      };

  type BlipConstraints = {
    jobHandle?: string;
  };

  type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

  type InternalBlips = BlipData & {
    constraints: BlipConstraints;
    id: string;
  };

  type BlipDataWithoutIdAndResource = DistributiveOmit<DistributiveOmit<BlipData, 'handle'>, 'resource'>;

  type getNetworkControlOfEntity = (entity: number) => Promise<void>;
  type deleteEntity = (entity: number, attached?: boolean) => void;
  type deleteEntities = (entities: number[], attached?: boolean) => void;

  type blipRegister = (id: string, data: BlipDataWithoutIdAndResource, constraints?: BlipConstraints) => void;
  type blipGetHandle = (id: string) => void;
  type blipUpdateCoords = (id: string, coords: Vector3Format) => void;
  type blipUpdateSprite = (id: string, sprite: number) => void;
  type blipUpdateLabel = (id: string, label: string) => void;
  type blipAddModifier = (id: string, modifier: number) => void;
  type blipRemoveModifier = (id: string, modifier: number) => void;
  type blipUnregister = (id: string) => void;

  type ClientExports = {
    getNetworkControlOfEntity: getNetworkControlOfEntity;
    deleteEntity: deleteEntity;
    deleteEntities: deleteEntities;
    getCurrentCharacter: () => CharacterData | null;
    blipRegister: blipRegister;
    blipUnregister: blipUnregister;
    blipUpdateCoords: blipUpdateCoords;
    blipUpdateSprite: blipUpdateSprite;
    blipUpdateLabel: blipUpdateLabel;
    blipAddModifier: blipAddModifier;
    blipRemoveModifier: blipRemoveModifier;
    blipGetHandle: blipGetHandle;
  };
}

// Client perspective - RPC calls to various destinations
declare namespace ClientRPC {
  interface Server {
    ['base.get-network-control']: (entity: number) => void;
  }
}

// Client perspective - events received from various sources
declare namespace ClientIn {
  interface FromServer {
    ['base.force-coords-update']: () => void;
  }
}

// Client perspective - events sent to various destinations
declare namespace ClientOut {
  interface ToServer {
    ['base.entity-deleted']: (entity: number) => void;
    ['base.entities-deleted']: (entities: number[]) => void;
  }
}
