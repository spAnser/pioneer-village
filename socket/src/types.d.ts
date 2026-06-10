// Import resource-specific socket type definitions
/// <reference path="./base.d.ts" />
/// <reference path="./inventory.d.ts" />
/// <reference path="./jobs.d.ts" />
/// <reference path="./world.d.ts" />
/// <reference path="./doors.d.ts" />
/// <reference path="./stable.d.ts" />
/// <reference path="./character.d.ts" />
/// <reference path="./types/birds.d.ts" />
/// <reference path="./types/banking.d.ts" />

// Core socket communication namespaces
// These contain events that don't belong to any specific resource
declare namespace SocketIn {
  interface FromGameServer {
    getAccount: (identifiers: Record<string, string>, callback: (whitelist: {}) => void) => void;
    generateJWT: (serverId: number, identifiers: Record<string, string>, callback: (jwt: string) => void) => void;
  }

  interface FromClient {
    chatSend: (chatMessage: UI.Chat.Send) => void;
  }
}

declare namespace SocketOut {
  interface ToGameServer {
    // Core server events - resource-specific events are in their respective files
    'player-management.kick': SocketInternal.Events['player-management.kick'];
    __server__: (eventName: string, ...args: any[]) => void;
    'world.geyser-show': () => void;
  }

  interface ToClient {
    chatSend: (chatSend: UI.Chat.Send) => void;
    chatMessage: (chatMessage: UI.Chat.Message) => void;
    ['notification.notify']: (notification: UI.Notification.Notification) => void;
    __client__: (eventName: string, ...args: any[]) => void;
  }
}

// Socket internal events
declare namespace SocketInternal {
  interface Events {
    'player-management.kick': (serverId: number, reason: string) => void;
    'world.geyser-show': () => void;
  }

  interface Data {
    user: {
      serverId: number;
      userId: number;
      iat: number;
      exp: number;
    };
    character?: {
      id: number;
    };
  }
}

// type onClient = <T extends keyof NetEvents>(evtName: T, callback: (...args: Parameters<NetEvents[T]>) => void) => void;

// declare namespace Collection {
//   type inventory = {
//     _id?: number;
//     identifier: string;
//     metadata: string;
//     container: {
//       _id?: number;
//       locked: boolean;
//       sealed: 'NONE' | 'SEALED' | 'BROKEN';
//       items: {
//         _id?: number;
//         identifier: number;
//         metadata: string;
//         quantity: number;
//         createdAt: Date;
//         deletedAt: Date;
//       }[];
//     };
//   };
// }

declare interface String {
  GetHashKey(): number;
}
