declare interface ClientExports {
  ui: UI.ClientExports;
}

declare namespace UI {
  type onUI = <T extends keyof ClientIn.FromSocket>(
    evtName: T,
    callback: (...args: Parameters<ClientIn.FromSocket[T]>) => void,
  ) => void;
  type onUICall = <T extends keyof ClientRPC.Socket>(
    evtName: T,
    callback: (
      ...args: Parameters<ClientRPC.Socket[T]>
    ) => Promise<ReturnType<ClientRPC.Socket[T]>> | ReturnType<ClientRPC.Socket[T]>,
  ) => void;
  type emitUI = <T extends keyof ClientIn.FromSocket>(evtName: T, ...args: Parameters<ClientIn.FromSocket[T]>) => void;
  type onSocket = (eventName: string, ...args: unknown[]) => void;
  type emitSocket = <T extends keyof SocketForwardEvents>(
    evtName: T,
    ...args: Parameters<SocketForwardEvents[T]>
  ) => void;
  type awaitUI = <T extends keyof ClientRPC.Socket>(
    evtName: T,
    ...args: Parameters<ClientRPC.Socket[T]>
  ) => Promise<ReturnType<ClientRPC.Socket[T]>>;
  type focusUI = (hasFocus: boolean, hasCursor: boolean) => void;

  type onClient = onUI;
  type onClientCall = onUICall;
  type emitClient = emitUI;
  type awaitClient = awaitUI;

  type ClientExports = {
    onUICall: onUICall;
    onUI: onUI;
    awaitUI: awaitUI;
    emitUI: emitUI;
    focusUI: focusUI;
  };
}

declare interface ClientForwardEvents {}

// Client perspective - RPC calls to various destinations
declare namespace ClientRPC {
  interface Socket {
    chatSend: (chatMessage: UI.Chat.Send) => void;
  }
}

// SocketForwardEvents should include all events that can be forwarded from client to socket
declare interface SocketForwardEvents extends ClientOut.ToSocket {
  ['character-select.choose']: (characterId: number, steam: Game.playerSteamId) => void;
}

// Extend SocketIO.Events with UI-specific socket events
declare namespace SocketIO {
  interface Events {
    ['__client__']: UI.onSocket;
  }
}

// Extend ClientIn.FromSocket with UI-specific events
declare namespace ClientIn {
  interface FromSocket {
    ['socket.connected']: () => void;
    ['__socket__']: UI.emitSocket;
    ['nui.close']: () => void;
    ['nui.restart']: () => void;
    ['hud.state']: (event: UI.HUD.Event) => void;
    ['ui.ready']: () => void;
    ['form.state']: (event: UI.Form.Event) => void;
    ['form.answer']: (event: UI.Form.Event) => void;
    ['notification.notify']: (
      text: string,
      duration?: number,
      bgColor?: keyof UI.Theme['colors'],
      fgColor?: keyof UI.Theme['colors'],
      centered?: boolean,
    ) => void;
    ['interact.pois']: (pois: UI.Interact.POI[]) => void;
    ['doors.indicator']: (indicators: UI.Door.Indicator[]) => void;
    ['interact.active']: (active: string | null) => void;
    ['chat.state']: (event: UI.Chat.Event) => void;
    ['threejs.state']: (event: UI.ThreeJS.Event) => void;
    ['animations.state']: (event: UI.Animations.Event) => void;
    ['animations.play-anim']: (event: UI.Animations.Play) => void;
    ['animations.stop-anim']: (event: UI.Animations.Stop) => void;

    ['target.action']: (context: number | string, action: Target.Item) => void;

    // TODO: Move to proper resource ?
    ['character-select.state']: (state: UI.CharacterSelect.Event) => void;
    ['character-select.create']: () => void;
    ['character-select.choose']: (characterId: number) => void;
    ['character-select.delete']: (characterId: number) => void;
    ['character-select.hover']: (characterId: number) => void;
    ['character-select.unhover']: (characterId: number) => void;
    ['customization.state']: (event: UI.Customization.Event) => void;
    ['customization.set-components']: (components: number[]) => void;
    ['customization.set-components-with-tints']: (
      components: { hash: number; palette?: number | string; tint0?: number; tint1?: number; tint2?: number }[],
    ) => void;
    ['customization.highlight']: (gender: 'male' | 'female') => void;
    ['customization.choose-gender']: () => void;
    ['customization.set-state']: (state: Customization.State) => void;
    ['customization.set-skin-tone']: (skinTone: number) => void;
    ['customization.set-head']: (head: number) => void;
    ['customization.set-teeth']: (head: number) => void;
    ['customization.set-body-type']: (bodyType: number) => void;
    ['customization.set-waist']: (waist: number) => void;
    ['customization.set-face-feature']: (feature: number, value: number) => void;
    ['customization.set-face-option']: (faceOptions: Record<string, number>) => void;
    ['customization.rotate-chosen']: (rotation: number) => void;

    ['customization.set-tint-by-category']: (category: string, tint: Customization.Palette) => void;
    ['customization.remove-tint-by-category']: (category: string) => void;
    ['customization.set-wearable-state']: (category: string, state: string | number) => void;

    ['customization.finalized']: () => void;

    ['log.state']: (event: UI.Log.Event) => void;
    ['log.message']: (data: UI.Log.Data, overrideSource?: 'client' | 'server') => void;

    // Chat events
    ['chat.closed']: () => void;

    // Interact events
    ['interact.startup']: () => void;
    ['interact.trigger']: (poiId: string, label: string, key: string) => void;
    ['interact.toggle']: (show: boolean) => void;
    ['interact.show']: () => void;
    ['interact.hide']: () => void;
    ['interact.complete']: () => void;
    ['interact.execute']: (poiId: string, label: string, key: string) => void;

    // Jobs events
    ['jobs.toggle']: (show: boolean) => void;
    ['jobs.show']: () => void;
    ['jobs.hide']: () => void;

    // Notification events
    ['notification.state']: (state: UI.Notification.State) => void;
  }
}
