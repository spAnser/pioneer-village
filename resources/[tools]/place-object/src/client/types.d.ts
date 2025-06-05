declare interface ClientExports {
  ['place-object']: PlaceObject.ClientExports;
}

declare namespace PlaceObject {
  type EntityDOF = {
    expression?: 0 | 1 | 2;
    name: string;
    value: number;
  };

  interface SubItem {
    name: string;
    model: string;
    offset: Vector3Format;
    offsetHeading: number;
    dof?: EntityDOF;
  }

  interface Advanced {
    model: string;
    amount?: number;
    uprightLimit?: number;
    subItems?: SubItem[];
  }

  interface ObjectPlacement {
    model: number;
    amount: number;
    groundOnly: boolean;
    dof?: EntityDOF;
  }

  type placeObject = (model: string, amount?: number, groundOnly?: boolean, dof?: EntityDOF) => Promise<number[]>;
  type placeObjectAdvanced = (data: Advanced, groundOnly?: boolean) => Promise<number[]>;
  type placeObjects = (objects: ObjectPlacement[]) => Promise<number[]>;

  type ClientExports = {
    placeObject: placeObject;
    placeObjectAdvanced: placeObjectAdvanced;
    placeObjects: placeObjects;
  };
}
