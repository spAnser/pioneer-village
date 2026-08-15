declare namespace Zones {
  interface DebugColor {
    r: number;
    g: number;
    b: number;
    a: number;
  }

  interface PolyOptions {
    /** Client only. The server build strips debug rendering and never stores this. */
    debug?: boolean;
    /** Client only. The server build strips debug rendering and never stores this. */
    debugColor?: DebugColor;
    /** Milliseconds the target must stay inside the zone before the enter event fires. */
    delayEnter?: number;
    /** Milliseconds the target must stay outside the zone before the exit event fires. */
    delayExit?: number;
  }

  // Zone creation - the client and server exports take identical arguments
  type AddPoly = (name: string, points: Vector2Format[], minZ: number, maxZ: number, options: PolyOptions) => void;
  type AddBox = (
    name: string,
    coords: Vector3Format,
    size: Vector3Format,
    rotation: number,
    options: PolyOptions,
  ) => void;
  type AddSphere = (name: string, coords: Vector3Format, radius: number, options: PolyOptions) => void;
  type Remove = (name: string) => void;

  // Zone checking - the client and server exports take identical arguments
  type IsCoordInZone = (zoneName: string, coords: Vector3Format) => boolean;
  type IsEntityInZone = (zoneName: string, entity: number) => boolean;
  type IsEntityInZones = (zoneNames: string[], entity: number) => string | null;
  type GetZonesAtCoord = (coords: Vector3Format) => string[];
  type GetZonesForEntity = (entity: number) => string[];

  // Zone data retrieval
  interface ZoneDataInfo {
    name: string;
    coords: Vector3Format;
    debug?: boolean;
    delayEnter?: number;
    delayExit?: number;
    maxZ?: number;
    minZ?: number;
    size?: Vector3Format;
    radius?: number;
    rotation?: number;
    points?: Vector2Format[];
  }
  type GetZoneData = (zoneName: string) => ZoneDataInfo | null;

  /**
   * Arguments the enter/exit handlers receive.
   *
   * The client loop only ever tracks the local ped, so its handlers take nothing. The
   * server loop walks every connected player, so its handlers are told which one
   * transitioned - see `Zones.ServerZoneData`.
   */
  interface BaseData<TEventArgs extends unknown[] = []> {
    name: string;
    options?: PolyOptions;
    onEnter?: (...args: TEventArgs) => void;
    onExit?: (...args: TEventArgs) => void;
  }

  interface SphereData<TEventArgs extends unknown[] = []> extends BaseData<TEventArgs> {
    _type: 'sphere';
    coords: Vector3Format;
    radius: number;
  }

  interface BoxData<TEventArgs extends unknown[] = []> extends BaseData<TEventArgs> {
    _type: 'box';
    coords: Vector3Format;
    size: Vector3Format;
    rotation: number;
  }

  interface PolyData<TEventArgs extends unknown[] = []> extends BaseData<TEventArgs> {
    _type: 'poly';
    coords: Vector2Format[];
    minZ: number;
    maxZ: number;
  }

  type ZoneData<TEventArgs extends unknown[] = []> =
    | SphereData<TEventArgs>
    | BoxData<TEventArgs>
    | PolyData<TEventArgs>;
}
