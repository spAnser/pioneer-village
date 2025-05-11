declare interface UIEvents {
  ['target.state']: (interactEvent: UI.TargetLayer.Event) => void;
}

declare interface ClientExports {
  target: Target.ClientExports;
}

declare namespace Target {
  interface Item {
    id: string;
    label: string;
    icon: string;
    event: string;
    parameters: Record<string, any>;
  }

  interface IsEnabledData {
    distance: number;
    coords: {
      buffer: {
        type: string;
        data: number[];
      };
    };
    entity: number;
    model: number;
    type: number;
  }

  interface Options {
    distance: number;
    isEnabled?: (data: IsEnabledData) => boolean;
  }

  interface Menu {
    id: string;
    type: 'flag' | 'model' | 'entity' | 'zone';
    group: Array<number | string>;
    data: Item[];
    options: Options;
  }

  type AddTarget = (data: Target.Menu) => string;
  type RemoveTarget = (id: string) => void;
  type GetEntityPlayerIsLookingAt = (
    distance: number,
    radius: number,
    flags: number,
    ignore?: number,
  ) => Promise<number>;

  type ClientExports = {
    AddTarget: AddTarget;
    RemoveTarget: RemoveTarget;
    GetEntityPlayerIsLookingAt: GetEntityPlayerIsLookingAt;
  };
}
