import { PVInit, PVZone } from '@lib/client/resources';
import { Delay } from '@lib/functions';
// import { initManager } from '@lib/shared/init-manager';

const RegisteredEvents = new Map<string, (...args: any[]) => void>();

export const addZone = (data: Zones.ZoneData) => {
  switch (data._type) {
    case 'sphere':
      PVZone.AddSphere(data.name, data.coords, data.radius, data.options || {});
      break;
    case 'box':
      PVZone.AddBox(data.name, data.coords, data.size, data.rotation, data.options || {});
      break;
    case 'poly':
      PVZone.AddPoly(data.name, data.coords, data.minZ, data.maxZ, data.options || {});
      break;
  }

  if (data.onEnter && !RegisteredEvents.has(`zones::${data.name}::enter`)) {
    on(`zones::${data.name}::enter`, data.onEnter);
    RegisteredEvents.set(`zones::${data.name}::enter`, data.onEnter);
  }

  if (data.onExit && !RegisteredEvents.has(`zones::${data.name}::exit`)) {
    on(`zones::${data.name}::exit`, data.onExit);
    RegisteredEvents.set(`zones::${data.name}::exit`, data.onExit);
  }
};

export const removeZone = (name: string) => {
  PVZone.Remove(name);
  const enterEvent = RegisteredEvents.get(`zones::${name}::enter`);
  if (enterEvent) {
    removeEventListener(`zones::${name}::enter`, enterEvent);
  }
  const exitEvent = RegisteredEvents.get(`zones::${name}::exit`);
  if (exitEvent) {
    removeEventListener(`zones::${name}::exit`, exitEvent);
  }
  RegisteredEvents.delete(`zones::${name}::enter`);
  RegisteredEvents.delete(`zones::${name}::exit`);
};

export const onResourceStart = (resourceName: string, cb: () => void) => {
  if (GetResourceState(resourceName) === 'started') {
    cb();
  }

  on('onResourceStart', async (resource: string) => {
    if (resource === resourceName) {
      cb();
    }
  });
};

export const onResourceInit = (resourceName: string, cb: () => void) => {
  (async () => {
    if (GetResourceState(resourceName) === 'started') {
      await PVInit.initializedResource(resourceName);
      cb();
    }

    on('onResourceStart', async (resource: string) => {
      if (resource === resourceName) {
        await PVInit.initializedResource(resourceName);
        cb();
      }
    });
  })();
};
