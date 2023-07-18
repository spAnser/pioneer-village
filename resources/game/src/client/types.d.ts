declare interface ClientExports {
  game: Game.ClientExports;
}

declare namespace Game {
  // type playerPed = () => number;
  type createObject = (
    model: number | string,
    coord?: Vector3Format,
    rotation?: Vector3Format,
    network?: boolean,
  ) => Promise<number>;
  type createPed = (
    model: string,
    x: number,
    y: number,
    z: number,
    heading?: number,
    randomOutfit?: boolean,
    networked?: boolean,
  ) => Promise<number>;
  type setPedComponents = (ped: number, components: number[]) => Promise<void>;
  type setPedComponentsMp = (ped: number, components: number[]) => Promise<void>;
  type finalizePedOutfit = (ped: number) => void;

  type registerNetworkEntity = (entity: number) => Promise<void>;
  type getNetworkControlOfEntity = (entity: number) => Promise<void>;
  type attachEntityToBoneIndex = (
    attacher: number,
    boneIndex: number,
    attachee?: number,
    offset?: Vector3Format,
    rotation?: Vector3Format,
  ) => void;
  type attachEntityToBoneName = (
    attacher: number,
    boneName: string,
    attachee?: number,
    offset?: Vector3Format,
    rotation?: Vector3Format,
  ) => void;
  type loadModel = (model: string | number) => Promise<void>;
  type requestTxd = (txd: string | number) => Promise<void>;
  type collisionLoadedAtEntity = (entity: number) => Promise<void>;
  type pedIsReadyToRender = (ped: number, delay?: number) => Promise<void>;
  type reachedCoords = (destCoords: Vector3Format, distance?: number, timeout?: number) => Promise<boolean>;
  type setAnimWalk = (animWalk: Anim.Walk) => void;
  type clearAnimWalk = () => void;

  type getComponentById = (id: number) => Component | undefined;
  type getAllByCategory = (category: string) => number[];

  type loadAnimDict = (hash: string, delay?: number) => Promise<void>;
  type playAnimTask = (animTask: Anim.Task, ped?: number) => Promise<void>;
  type taskPlayAnim = (animTask: Anim.Task) => void;
  type taskPlayAnimArrayNew = (animTasks: Anim.Task | Anim.Task[], ped?: number) => Promise<void>;
  type taskPlayAnimAdvArray = (
    coords: Vector3Format,
    rotation: Vector3Format,
    animTasks: Anim.AdvTask[],
    freeze?: boolean,
    animPed?: number,
  ) => void;
  type taskPlayEntityAnim = (anims: Anim.EntityTask[]) => void;

  type loadStream = (streamSet: string, streamName: string, delay?: number, maxTries?: number) => Promise<boolean>;
  type playStreamFromPed = (ped: number, streamSet: string, streamName: string) => Promise<void>;
  type stopStream = (streamSet: string, streamName: string) => void;

  type requestFlowblock = (flowblock: number) => Promise<number>;
  type createStateMachine = (id: number, flowblock: number) => void;
  type destroyStateMachine = (id: number) => void;

  type vegAddSphereAtEntity = (entity: number, radius: number, modifierType: number, flags: number) => number;
  type vegAddVolume = (volume: number, modifierType: number, flags: number) => number;
  type vegRemoveAllSpheres = () => void;

  type playerServerId = number; 

  type ClientExports = {
    playerPed: () => number;
    mountPed: () => number | null;
    playerCoords: (update?: boolean) => Vector3Format;
    createObject: createObject;
    createPed: createPed;
    setPedComponents: setPedComponents;
    setPedComponentsMp: setPedComponentsMp;
    finalizePedOutfit: finalizePedOutfit;
    registerNetworkEntity: registerNetworkEntity;
    getNetworkControlOfEntity: getNetworkControlOfEntity;
    attachEntityToBoneIndex: attachEntityToBoneIndex;
    attachEntityToBoneName: attachEntityToBoneName;
    loadModel: loadModel;
    requestTxd: requestTxd;
    collisionLoadedAtEntity: collisionLoadedAtEntity;
    pedIsReadyToRender: pedIsReadyToRender;
    reachedCoords: reachedCoords;
    setAnimWalk: setAnimWalk;
    clearAnimWalk: clearAnimWalk;

    getComponentById: getComponentById;
    getAllByCategory: getAllByCategory;

    loadAnimDict: loadAnimDict;
    playAnimTask: playAnimTask;
    taskPlayAnim: taskPlayAnim;
    taskPlayAnimArrayNew: taskPlayAnimArrayNew;
    taskPlayAnimAdvArray: taskPlayAnimAdvArray;
    taskPlayEntityAnim: taskPlayEntityAnim;
    getCurrentCharacter: () => Character;

    loadStream: loadStream;
    playStreamFromPed: playStreamFromPed;
    stopStream: stopStream;

    requestFlowblock: requestFlowblock;
    createStateMachine: createStateMachine;
    destroyStateMachine: destroyStateMachine;

    vegAddSphereAtEntity: vegAddSphereAtEntity;
    vegAddVolume: vegAddVolume;
    vegRemoveAllSpheres: vegRemoveAllSpheres;

    // Lua
    getStateValue: (entity: number, key: string) => any;
    getChildEntity: (entity: number, name: string) => number;

    getPlayerServerId: () => number; 
  };

  interface CharacterSpot {
    position: Vector3Format;
    rotation: Vector3Format;
    animation: Anim.Task;
    objects?: { model: string; attach: string }[];
    screenOffset?: Vector2Format;
  }
}

declare namespace Anim {
  interface Walk {
    standing: {
      dict: string;
      anim: string | string[];
      flags?: number;
    };
    walking: {
      dict: string;
      anim: string | string[];
      flags?: number;
    };
    running?: {
      dict: string;
      anim: string | string[];
      flags?: number;
    };
  }

  interface Task {
    dict: string;
    anim: string | string[];
    entity?: number;
    flags?: number;
    duration?: number;
    delta?: number;
    onStart?: (anim: string, dict: string) => void;
    onEnd?: () => void;
    repeat?: number;
    entities?: AdvTaskEntity[];
    blendInSpeed?: number;
    blendOutSpeed?: number;
    speed?: number;
    speedMultiplier?: number;
  }

  interface EntityTask extends Task {
    obj: number | (() => number);
    loop?: boolean;
    stayInAnim?: boolean;
    position?: Vector3Format;
    rotation?: Vector3Format;
  }

  interface AdvTaskAdditional {
    obj: number | (() => number);
    dict?: string;
    anim?: string;
    suffix?: string;
    flags?: number;
    delta?: number;
    loop?: boolean;
    stayInAnim?: boolean;
    updatePosition?: boolean;
  }

  interface AdvTaskEntity {
    obj: number | (() => number);
    flags?: number;
    prefix?: string;
    suffix?: string;
  }

  interface AdvTask extends Task {
    additional?: AdvTaskAdditional[];
    coords?: Vector3Format;
    rotation?: Vector3Format;
  }

  interface LoopInfo {
    start: Task;
    loop: Task | Task[];
    end?: Task;
    ped: number;
    active: boolean;
  }
}

interface Component {
  component: number;
  category: number;
  type: '0' | '1';
  isMp: boolean;
  isSp: boolean;
  componentHex: string;
  name?: string;
  itemType?: string;
  friendlyName?: string;
}

interface CameraData {
  id: string;
  _type: number | 'DEFAULT_SCRIPTED_CAMERA' | 'DEFAULT_SPLINE_CAMERA';
  coords: Vector3Format;
  rot: Vector3Format;
  fov: number;
}

declare interface UIRPC {
  getCharacters: () => Game.Character[];
  createCharacter: (characterData: Game.Character, faceData: Game.Face) => void;
}
