// UI Socket Events - events the UI layer sends to the socket server
type UISocketEvents = SocketIn.FromClient & SocketOut.ToClient;

declare namespace UI {
  interface BaseProps {}

  interface BaseState {
    show?: boolean;
  }

  type BaseEvent = Partial<BaseState>;

  interface Channel {
    label: string;
    bg: keyof UI.Theme['colors'];
    fg: keyof UI.Theme['colors'];
  }

  interface ColorData {
    hex: string;
    rgb?: string;
    rgbRaw?: [r: number, g: number, b: number];
  }

  interface Theme {
    transitionSpeed: {
      slow: string;
      normal: string;
      fast: string;
    };
    colors: Record<string, ColorData>;
    borderRadius: {
      small: string;
      normal: string;
      large: string;
    };
  }
}

declare namespace UI.Splash {
  interface State extends UI.BaseState {
    fadeOut: boolean;
  }
}

declare namespace UI.App {
  interface State extends UI.BaseState {
    isFramed: boolean;
    bg: string;
    disabledLayers: Set<string>;
  }
}

declare namespace UI.Catcher {
  interface Props {
    layer: string;
    reloadWindow: boolean;
    children?: React.ReactNode;
  }

  interface State {
    layer: string;
    errored: boolean;
  }
}

type CustomizationPalette = Customization.Palette;

declare namespace UI.Customization {
  interface State extends UI.BaseState {
    state: globalThis.Customization.State;
    components: Record<string, number>;
    model: string | number;
    gender: 'male' | 'female';
    currentComponents: Record<string, { style: number; option: number }>;
    hiddenComponents: Record<string, { style: number; option: number }>;
    currentFaceOptions: Record<string, number>;
    currentFaceFeatures: Record<string, number>;
    currentBodyOptions: Record<string, number>;
    currentLayers: LayerData[];
    currentWhistle: Record<string, number>;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    tints: Record<string, CustomizationPalette>;
    head: number;
    teeth: number;
    skinTone: number;
    bodyType: number;
  }

  type Event = Partial<State>;

  interface ComponentJsonData {
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
    drawable: string | number;
    albedo: string | number;
    normal: string | number;
    swatchTexture?: string;
    swatchTextureHex?: string;
  }

  type ComponentJsonDataPalette = ComponentJsonData & {
    palette: string | number;
    tint0: number;
    tint1: number;
    tint2: number;
  };

  interface ComponentJson {
    name: string;
    components: (ComponentJsonData | ComponentJsonDataPalette)[];
  }

  type StyleColorComponentData =
    | {
        name: string;
        type: string;
        component: number;
        swatchTexture?: string;
        drawable: string | number;
        tintable: boolean;
      }
    | {
        name: string;
        type: string;
        component: number;
        palette: string | number;
        tint0: number;
        tint1: number;
        tint2: number;
        swatchTexture?: string;
        drawable: string | number;
        tintable: boolean;
      };

  interface OverlayJsonData {
    id: number | string;
    albedo: number | string;
    normal?: number | string;
    ma?: number | string;
    name?: string;
    type?: '0' | '1';
  }

  interface OverlayJson {
    name: string;
    canUsePalette: boolean;
    components: OverlayJsonData[];
  }

  type LayerData = {
    uid: string;
    id: string;
    opacity: number;
    roughness?: number;
    palette?: CustomizationPalette;
  };
}

declare namespace UI.HUD {
  interface State extends UI.BaseState {
    crosshair: boolean;
    health: number;
    isHot: boolean;
    isCold: boolean;
    bleeding: boolean;
    brokenBone: boolean;
    infection: number;
    food: number;
    drink: number;
    stamina: number;
    moveSpeed: number;
    horseSpeed: number;
    speakVolume: number;
    isSpeaking: boolean;
  }

  type Event = Partial<State>;
}

declare namespace UI.Doctor {
  interface BoneStatus {
    coords: Vector2Format;
    name: string;
    health: number;
    broken: boolean;
    wound: number;
    burned: boolean;
    infection: number;
  }

  interface State extends UI.BaseState {
    entity: number;
    boneStatus: BoneStatus[];
    inspecting: number;
    inspected: boolean[];
  }

  type Event = Partial<State>;
}

declare namespace UI.Form {
  interface State extends UI.BaseState {
    title: string;
    text: string;
  }

  type Event = Partial<State>;
}

declare namespace UI.Notification {
  interface Notification {
    text: string;
    duration: number;
    bgColor: keyof UI.Theme['colors'];
    fgColor: keyof UI.Theme['colors'];
    centered?: boolean;
  }

  interface State extends UI.BaseState {
    active: boolean;
    notifications: Notification[];
    currentNotification: Notification | null;
  }

  type Event = Partial<State>;
}

declare namespace UI.Interact {
  interface POI {
    id: string;
    screenX: number;
    screenY: number;
    distance: number;
    label: string;
    key: string;
  }

  interface State extends UI.BaseState {
    pois: POI[];
    active: string | null;
  }

  type Event = Partial<State>;
}

declare namespace UI.Door {
  interface Indicator {
    doorHash: number;
    screenX: number;
    screenY: number;
    locked: boolean;
    distance: number;
    canInteract: boolean;
    lockpickable: boolean;
    devOpen?: boolean;
  }
}

declare namespace UI.TargetLayer {
  interface State extends UI.BaseState {
    active: boolean;
    context: number | string;
    type: number;
    flag: string;
    actions: Target.Item[];
  }

  type Event = Partial<State>;
}

declare namespace UI.TelegramLayer {
  interface State extends UI.BaseState {
    message: string;
    sender: string;
    header: string;
  }

  type Event = Partial<State>;
}

// declare namespace UI.Interact {
//   interface State extends UI.BaseState {
//     options: Record<string, string>;
//     context: any;
//   }
//
//   type Event = Partial<State>;
// }

declare namespace UI.ThreeJS {
  interface State extends UI.BaseState {
    fov: number;
    cameraPosition: { x: number; y: number; z: number };
    cameraRotation: { x: number; y: number; z: number };
    targetPosition: { x: number; y: number; z: number };
    targetRotation: { x: number; y: number; z: number };
  }

  type Event = Partial<State>;
}

declare namespace UI.Chat {
  interface Message {
    channel: string;
    sender?: string;
    id?: number;
    text: string;
  }

  interface Send {
    channel: string;
    text: string;
  }

  interface SuggestionEntry {
    description: string;
    children?: string[];
  }

  type Suggestions = Record<string, SuggestionEntry>;

  interface State extends UI.BaseState {
    partialShow: boolean;
    autoScroll: boolean;
    currentChannel: string;
    currentInput: string;
    suggestions: Suggestions;
    messages: Message[];
  }

  type Event = Partial<State>;
}

declare namespace UI.Animations {
  interface State extends UI.BaseState {
    animations: Record<string, string[]>;
    query: string;
    dict: string;
    clip: string;
    flags: number;
    entity: number;
    blendInSpeed: number;
    blendOutSpeed: number;
  }

  type Event = Partial<State>;

  interface Play {
    dict: string;
    clip: string;
    flags: number;
    entity: number;
    blendInSpeed: number;
    blendOutSpeed: number;
  }

  interface Stop {
    entity: number;
  }
}

declare namespace UI.Inventory {
  interface State extends UI.BaseState {
    characterId: number;
    clothingInventory: string;
    mainInventory: string;
    targetInventory: string;
    targetContainerItemId: number;
    birdsInventory: string;
    inventories: Map<string, LoadData>;
    inventoriesWeight: Map<string, number>;
    tooltipItem: UI.Inventory.ItemData | null;
    tooltipBelow: boolean;
    tooltipX: number;
    tooltipY: number;
  }

  type Event = Partial<State>;

  interface ItemData {
    identifier: number;
    ids: number[];
    metadatas: any[];
    durabilities: (number | null)[];
    quantity: number;
  }

  interface LoadData {
    identifier: string;
    slots: number;
    maxWeight: number;
    container: {
      locked: boolean;
      sealed: 'NONE' | 'SEALED' | 'BROKEN';
    };
    items: Record<string, ItemData>;
  }

  interface AddData {
    identifier: string;
    items: Record<string, ItemData>;
  }

  interface MoveData {
    charRequestId: string;
    identifier: string;
    items: Record<string, ItemData>;
    emptySlots: number[];
  }

  interface RemoveData {
    identifier: string;
    items: Record<string, ItemData>;
  }

  type RequestType = 'add' | 'stack' | 'move' | 'remove';

  interface SuccessFailData {
    identifier: string;
    requestId: number;
    requestType: RequestType;
  }

  type MoveOrFailData = MoveData | SuccessFailData;

  interface MoveRequest {
    sourceIdentifier: string;
    oldSlot: number;
    targetIdentifier: string;
    newSlot: number;
  }
}

declare namespace UI.CharacterSelect {
  interface CharacterData {
    id: number;
    firstName: string;
    lastName: string;
    pos?: { x: number; y: number };
  }

  interface State extends UI.BaseState {
    characters: CharacterData[];
  }

  type Event = Partial<State>;
}

declare namespace UI.Log {
  type Data = { resource: string; message: string };

  type Source = 'server' | 'client';

  type LogData = {
    source: Source;
  } & Data;

  type ColorData = { h: number; s: number; l: number; hsl: string };

  interface State extends UI.BaseState {
    autoScroll: boolean;
    scrollOverride: number;
    filter: Set<string>;
    reverseFilter: Set<string>;
    messages: LogData[];
    colors: Record<string, ColorData>;
  }

  type Event = Partial<State>;
}

interface TypedInputEvent<T extends EventTarget> extends InputEvent {
  target: T;
}
