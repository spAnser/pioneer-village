declare interface ClientExports {
  base: Base.ClientExports;
}

declare namespace Base {
  type DoorData = [doorHash: number, modelHash: number, modelName: string, x: number, y: number, z: number];
  type BlipData =
    | {
        id: number;
        type: 'sprite';
        label: string;
        sprite: string | number;
        modifiers?: number[];
        coords: Vector3Format;
      }
    | {
        id: number;
        type: 'entity';
        label: string;
        sprite: string | number;
        modifiers?: number[];
        entity: number;
      }
    | {
        id: number;
        type: 'pickup';
        label: string;
        sprite: string | number;
        modifiers?: number[];
        pickup: number;
      }
    | {
        id: number;
        type: 'radius';
        style: string | number;
        sprite?: string | number;
        label: string;
        modifiers?: number[];
        coords: Vector3Format;
        scale: number;
      }
    | {
        id: number;
        type: 'area';
        label: string;
        style: string | number;
        sprite?: string | number;
        modifiers?: number[];
        coords: Vector3Format;
        scale: [number, number];
      }
    | {
        id: number;
        type: 'volume';
        label: string;
        style: string | number;
        sprite?: string | number;
        volume: number;
        modifiers?: number[];
      };
  type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

  type BlipDataWithoutId = DistributiveOmit<BlipData, 'id'>;

  type getNetworkControlOfEntity = (entity: number) => Promise<void>;
  type deleteEntity = (entity: number, attached?: boolean) => void;
  type deleteEntities = (entities: number[], attached?: boolean) => void;

  type blipRegister = (id: string, data: BlipDataWithoutId, style?: number) => number;
  type blipUnregister = (id: string) => void;

  type ClientExports = {
    getNetworkControlOfEntity: getNetworkControlOfEntity;
    deleteEntity: deleteEntity;
    deleteEntities: deleteEntities;
    getCurrentCharacter: () => CharacterData | null;
    blipRegister: blipRegister;
    blipUnregister: blipUnregister;
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
