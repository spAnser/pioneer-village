declare interface ClientExports {
  <R extends keyof ClientExports, K extends keyof ClientExports[R] = keyof ClientExports[R]>(
    name: K,
    fn: ClientExports[R][K],
  ): void;
}

declare interface ServerExports {
  <R extends keyof ServerExports, K extends keyof ServerExports[R] = keyof ServerExports[R]>(
    name: K,
    fn: ServerExports[R][K],
  ): void;
}

declare interface RPC {}
declare interface NetEvents {}
declare interface UIRPC {}
declare interface UIEvents {}

type DropLast<T extends any[]> = T extends [...rest: infer U, arg: any] ? U : T;
type DropLastParam<T extends (...args: any[]) => any> = DropLast<Parameters<T>>;
type Last<T extends any[]> = T extends [...any[], infer R] ? R : never;
type LastParam<T extends (...args: any[]) => any> = Last<Parameters<T>>;

type onClient = <T extends keyof NetEvents>(evtName: T, callback: (...args: Parameters<NetEvents[T]>) => void) => void;
type onClientCall = <T extends keyof RPC>(
  evtName: T,
  callback: (serverId: number, ...args: Parameters<RPC[T]>) => ReturnType<RPC[T]> | Promise<ReturnType<RPC[T]>>,
) => void;
type emitClient = <T extends keyof NetEvents>(evtName: T, serverId: number, ...args: Parameters<NetEvents[T]>) => void;
type awaitClient = <T extends keyof RPC>(
  evtName: T,
  serverId: number,
  ...args: Parameters<RPC[T]>
) => Promise<ReturnType<RPC[T]>>;

type onServer = onClient;
type onServerCall = onClientCall;
type emitServer = <T extends keyof NetEvents>(evtName: T, ...args: Parameters<NetEvents[T]>) => void;
type awaitServer = <T extends keyof RPC>(evtName: T, ...args: Parameters<RPC[T]>) => Promise<ReturnType<RPC[T]>>;

type PendingCallback = {
  resolve: (response: any) => void;
  reject: (error: any) => void;
  timeout: NodeJS.Timeout;
};

declare namespace Global {
  type PopulationPedCreating = (
    x: number,
    y: number,
    z: number,
    model: number,
    setters: {
      setModel: (model: string | number) => void;
      setPosition: (x: number, y: number, z: number) => void;
    },
  ) => void;
}

declare namespace CFX {
  interface ExplosionEvent {
    f186: number;
    f208: number;
    ownerNetId: number;
    f214: number;
    explosionType: number;
    damageScale: number;
    posX: number;
    posY: number;
    posZ: number;
    f242: boolean;
    f104: number;
    cameraShake: number;
    isAudible: boolean;
    f189: boolean;
    isInvisible: boolean;
    f126: boolean;
    f241: boolean;
    f243: boolean;
    f210: number;
    unkX: number;
    unkY: number;
    unkZ: number;
    f190: boolean;
    f191: boolean;
    f164: number;
    posX224: number;
    posY224: number;
    posZ224: number;
    f240: boolean;
    f218: number;
    f216: boolean;
  }
}

interface Vector2Format {
  x: number;
  y: number;
}

interface Vector3Format extends Vector2Format {
  z: number;
}

interface Vector4Format extends Vector3Format {
  w: number;
}

interface MinMax {
  min: number;
  max: number;
}

type ValueOf<T> = T[keyof T];
