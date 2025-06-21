import { serverNamespace, userNamespace } from '../server';
import { logInfoC, logInfoS } from '../helpers/log';

export default () => {
  const claimed: Set<string> = new Set();
  const objects: Map<string, number> = new Map();

  serverNamespace.on('connection', (socket) => {
    socket.on('world.registered-objects', (cb) => {
      const data: Record<string, number> = {};
      for (const [name, id] of objects.entries()) {
        data[name] = id;
      }
      cb(data);
    });

    // Register Object
    socket.on('world.register-object', (name, id) => {
      logInfoS('[World]', 'Register network object', name, id);
      objects.set(name, id);
      userNamespace.emit('world.register-object', name, id);
    });

    // Unregister Object
    socket.on('world.unregister-object', (name) => {
      logInfoS('[World]', 'Unregister network object', name);
      if (objects.get(name)) {
        objects.delete(name);
      }
      if (claimed.has(name)) {
        claimed.delete(name);
      }
      userNamespace.emit('world.unregister-object', name);
    });
  });

  userNamespace.on('connection', (socket) => {
    socket.on('world.registered-objects', (cb) => {
      const data: Record<string, number> = {};
      for (const [name, id] of objects.entries()) {
        data[name] = id;
      }
      cb(data);
    });

    socket.on('world.request-creation', (name, cb) => {
      logInfoC('[World]', 'Request creation', name);

      if (!claimed.has(name)) {
        claimed.add(name);
        cb(true);
      } else {
        const id = objects.get(name);
        if (id) {
          // logInfoC('netIdExists', id);
          serverNamespace.timeout(250).emit('netIdExists', id, (err, responses) => {
            logInfoC('exists', err, responses);
            if (responses.includes(true)) {
              cb(false);
            } else {
              cb(true);
              objects.delete(name);
            }
          });
        } else {
          cb(false);
        }
      }
    });

    // Register Object
    socket.on('world.register-object', (name, id) => {
      logInfoC('[World]', 'Register network object', name, id);
      objects.set(name, id);
    });

    // Unregister Object
    socket.on('world.unregister-object', (name) => {
      logInfoC('[World]', 'Unregister network object', name);

      if (objects.get(name)) {
        objects.delete(name);
      }
      if (claimed.has(name)) {
        claimed.delete(name);
      }
    });
  });
};
