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
    model: string | number,
    x: number,
    y: number,
    z: number,
    heading?: number,
    randomOutfit?: boolean,
    networked?: boolean,
  ) => Promise<number>;
  type setPedComponents = (ped: number, components: number[]) => Promise<void>;
  type setPedComponentsMp = (ped: number, components: number[]) => Promise<void>;
  type removePedComponent = (ped: number, component: number) => Promise<void>;
  type removePedComponentCategory = (ped: number, category: number) => Promise<void>;
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
  type loadModel = (model: string | number, delay?: number) => Promise<void>;
  type requestTxd = (txd: string | number) => Promise<void>;
  type collisionLoadedAtEntity = (entity: number) => Promise<void>;
  type equipMetaPedOutfit = (ped: number, outfit: number) => Promise<void>;
  type pedIsReadyToRender = (ped: number, delay?: number) => Promise<void>;
  type waitTextureIsValid = (textureId: number, delay?: number) => Promise<void>;
  type reachedCoords = (destCoords: Vector3Format, distance?: number, timeout?: number) => Promise<boolean>;
  type setAnimWalk = (animWalk: Anim.Walk) => void;
  type clearAnimWalk = () => void;

  type getComponentById = (id: number) => Component | undefined;
  type getAllByCategory = (category: string) => number[];

  type loadAnimDict = (hash: string, delay?: number) => Promise<void>;
  type playAnimTask = (animTask: Anim.Task, ped?: number) => Promise<void>;
  type taskPlayAnim = (animTask: Anim.Task) => Promise<void>;
  type taskPlayAnimArrayNew = (animTasks: Anim.Task | Anim.Task[], ped?: number) => Promise<void>;
  type taskPlayAnimAdvArray = (
    coords: Vector3Format,
    rotation: Vector3Format,
    animTasks: Anim.AdvTask[],
    freeze?: boolean,
    animPed?: number,
  ) => Promise<void>;
  type taskPlayEntityAnim = (anims: Anim.EntityTask[]) => void;
  type turnPedToFaceCoord = (ped: number, x: number, y: number, z: number, duration?: number) => Promise<void>;

  type loadStream = (streamSet: string, streamName: string, delay?: number, maxTries?: number) => Promise<boolean>;
  type playStreamFromPed = (ped: number, streamSet: string, streamName: string) => Promise<void>;
  type stopStream = (streamSet: string, streamName: string) => void;

  type requestFlowblock = (flowblock: number) => Promise<number>;
  type createStateMachine = (id: number, flowblock: number) => void;
  type destroyStateMachine = (id: number) => void;

  type vegAddSphereAtEntity = (entity: number, radius: number, modifierType: number, flags: number) => number;
  type vegAddVolume = (volume: number, modifierType: number, flags: number) => number;
  type vegRemoveAllSpheres = () => void;

  interface MoveNetworkConfig {
    id: string;
    entity: number;
    networkDef: string;
    clipSet?: string;
    animDicts?: string[];
    initialState?: string;
    anchorCoords?: { x: number; y: number; z: number };
    anchorRotation?: { x: number; y: number; z: number };
    isAdvanced?: boolean;
    blendInTime?: number;
    flags?: number;
    loadTimeoutMs?: number;
  }

  type startMoveNetwork = (config: MoveNetworkConfig) => Promise<boolean>;
  type setMoveNetworkSignalFloat = (id: string, signal: string, value: number) => void;
  type setMoveNetworkSignalBool = (id: string, signal: string, value: boolean) => void;
  type setMoveNetworkSignalVector = (id: string, signal: string, x: number, y: number, z: number) => void;
  type requestMoveNetworkStateTransition = (id: string, stateName: string) => void;
  type getMoveNetworkEvent = (id: string, eventName: string) => boolean;
  type hasMoveNetworkAnimEventFired = (id: string, eventHash: number) => boolean;
  type isMoveNetworkActive = (id: string) => boolean;
  type isMoveNetworkReadyForTransition = (id: string) => boolean;
  type stopMoveNetwork = (id: string) => void;
  type stopAllMoveNetworks = () => void;

  type skinPed = (ped: number, character: Character) => Promise<void>;

  type playerServerId = number;

  type playerSteamId = string | null;

  type characterId = number | null;

  type getAngleTo = (targetCoords: Vector3Format, ped?: number) => number;
  type isPedFacingCoord = (targetCoords: Vector3Format, ped?: number, toleranceDeg?: number) => boolean;

  type ClientExports = {
    playerPed: () => number;
    mountPed: () => number | null;
    playerCoords: (update?: boolean) => Vector3Format;
    createObject: createObject;
    createPed: createPed;
    setPedComponents: setPedComponents;
    setPedComponentsMp: setPedComponentsMp;
    removePedComponent: removePedComponent;
    removePedComponentCategory: removePedComponentCategory;
    finalizePedOutfit: finalizePedOutfit;
    registerNetworkEntity: registerNetworkEntity;
    getNetworkControlOfEntity: getNetworkControlOfEntity;
    attachEntityToBoneIndex: attachEntityToBoneIndex;
    attachEntityToBoneName: attachEntityToBoneName;
    loadModel: loadModel;
    requestTxd: requestTxd;
    collisionLoadedAtEntity: collisionLoadedAtEntity;
    equipMetaPedOutfit: equipMetaPedOutfit;
    pedIsReadyToRender: pedIsReadyToRender;
    waitTextureIsValid: waitTextureIsValid;
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
    turnPedToFaceCoord: turnPedToFaceCoord;

    skinPed: skinPed;
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

    startMoveNetwork: startMoveNetwork;
    setMoveNetworkSignalFloat: setMoveNetworkSignalFloat;
    setMoveNetworkSignalBool: setMoveNetworkSignalBool;
    setMoveNetworkSignalVector: setMoveNetworkSignalVector;
    requestMoveNetworkStateTransition: requestMoveNetworkStateTransition;
    getMoveNetworkEvent: getMoveNetworkEvent;
    hasMoveNetworkAnimEventFired: hasMoveNetworkAnimEventFired;
    isMoveNetworkActive: isMoveNetworkActive;
    isMoveNetworkReadyForTransition: isMoveNetworkReadyForTransition;
    stopMoveNetwork: stopMoveNetwork;
    stopAllMoveNetworks: stopAllMoveNetworks;

    getPlayerServerId: () => number;

    getPlayerSteamId: () => Promise<string>;

    characterId: () => number | null;

    getAngleTo: getAngleTo;
    isPedFacingCoord: isPedFacingCoord;

    // Lua Exports
    getStateValue: (entity: number, key: string) => any;
    getChildEntity: (entity: number, name: string) => number;
    setCharExpression: (ped: number, index: number, scale: number) => void;
    makeHorseMale: (ped: number) => void;
    makeHorseFemale: (ped: number) => void;
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
    // @deprecated use blendInSpeed
    speed?: number;
    // @deprecated use blendOutSpeed
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
  componentHex: string;
  component: number;
  name?: string;
  categoryHex: string;
  category: number;
  categoryName: string;
  type: '0' | '1';
  isMp: boolean;
  isSp: boolean;
  id: number;
  friendlyName?: string;
  palette?: string;
  tint0?: number;
  tint1?: number;
  tint2?: number;
  drawable: string;
  albedo: number;
  normal: number;
}

interface CameraData {
  id: string;
  _type: number | 'DEFAULT_SCRIPTED_CAMERA' | 'DEFAULT_SPLINE_CAMERA';
  coords: Vector3Format;
  rot: Vector3Format;
  fov: number;
}

// Client perspective - RPC calls to various destinations
declare namespace ClientRPC {
  interface Socket {
    getCharacters: () => Game.Character[];
    createCharacter: (characterData: Game.Character, faceData: Game.Face) => void;
  }

  interface Server {
    'game.getSteamId': () => string;
  }
}

// Client perspective - events received from various sources
declare namespace ClientIn {
  interface FromSocket {
    // Add game events from socket here when needed
  }
}

// Client perspective - events sent to various destinations
declare namespace ClientOut {
  interface ToSocket {
    // Add game events to socket here when needed
  }
}

// Raw Socket.io events for UI layer typing - DEDUPLICATED
// Note: SocketIO.Events eliminated - use ClientRPC.Socket and ClientIn/ClientOut directly
