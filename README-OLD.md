# Pioneer Village

## Setup

- Add `local.cfg` with `sv_licenseKey "[your key here]"`
- Add copy the contents of `.env.example` into `.env` and change any details you need to
- Run `yarn install` in the root of the project
- Run `yarn` in the `resources/[system]/sessionmanager-rdr3` folder
- Run `yarn download-server` to download the correct server version
- Run `yarn migrate` to update the database with any migrations
- Run `yarn prisma generate` to generate the prisma artifacts if needed
- Run `yarn watch` to build all of the typescript and run the socket server
- Run `yarn start` to launch the server

## Typed exports

```ts

// resources/[yourresource]/src/server/types.d.ts

interface ServerExports {
  myResource: {
    doSomething: (blah: string) => string;
  }
}

import { exports } from '@lib/server';

// calling a export
exports['someResource'].doSomething('test');

// exporting an uh.. export
exports<'myResource'>('doSomethingElse', () => { ... })

```

## Communication between systems

### Client <-> Server

```ts
// resources/[yourresource]/src/types.d.ts

declare interface RPC {
  sayHello: (name: string) => string;
}

declare interface NetEvents {
  myEvent: (name: string) => void;
}

/******************
 * Server
 ******************/

import { onClientCall, onClient, awaitClient, emitClient } from '@lib/server';

// respond to a call
onClientCall('sayHello', (serverId, name) => {
  return `hello ${name} you are server id ${serverId}`;
});

// handle an event
onClient('myEvent', (serverId, name) => {
  console.log(`Got an event from ${serverId} with the value ${name}`);
});

// emit an event
emitClient('myEvent', 'mike');

(async () => {
  // call a method on the client
  const message = await awaitClient(serverId, 'sayHello', 'mike');
  console.log(message);
})();


/******************
 * Client
 ******************/

import { onServerCall, onServer, awaitServer, emitServer } from '@lib/client';

// respond to a call
onServerCall('sayHello', (name) => {
  return `hello ${name}`;
});

// handle an event
onServer('myEvent', (name) => {
  console.log(`Got an event from the server with the value ${name}`);
});

// emit an event
emitServer('myEvent', 'mike');

(async () => {
  // call a method on the server
  const message = await awaitServer('sayHello', 'mike');
  console.log(message);
})();

```

### Server <-> Socket

```ts

// resources/[myresource]/src/server/types.d.ts
declare interface SocketEvents {
  test: (word: string) => void;
  testWithCallback: (word: string, cb: (word: string) => void) => void;
}

// on the server
import { emitSocket, awaitSocket, onSocket } from '@lib/server';

onSocket('test', (something) => {
  console.log(something);
});

onSocket('testWithCallback', (something, cb) => {
  cb(something);
});

// /socket/src/types.d.ts
declare namespace SocketServer {
  type Server = {
    doSomethingOnSocketServer: (word: string, cb: (word: string) => void) => void;
  };
}

emitSocket('doSomethingOnSocketServer', 'blah', (res) => {
  console.log(res);
});

```

### Client <-> UI

ehh you'll work it out

### UI <-> Socket

ehh you'll work it out
