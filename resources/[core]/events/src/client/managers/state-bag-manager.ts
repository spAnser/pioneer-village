export class StateBagManager {
  protected static instance: StateBagManager;
  protected events: Map<Events.StateName, Map<string, Events.AnyStateOpts>> = new Map();

  static getInstance(): StateBagManager {
    if (!StateBagManager.instance) {
      StateBagManager.instance = new StateBagManager();
    }
    return StateBagManager.instance;
  }

  register<K extends Events.StateName>(identifier: string, key: K, opts: Events.StateOpts<K>) {
    let stateEvents = this.events.get(key);

    if (!stateEvents) stateEvents = new Map();

    // Store as the heterogeneous union: the Map holds opts for many different keys.
    stateEvents.set(identifier, opts as Events.AnyStateOpts);
    this.events.set(key, stateEvents);
  }

  // Narrows an untyped key from the game boundary to a registered StateName.
  isStateName(key: string): key is Events.StateName {
    return this.events.has(key as Events.StateName);
  }

  handle<K extends Events.StateName>(entity: number, key: K, value: Events.StateEventMap[K]) {
    const stateEvents = this.events.get(key);

    if (!stateEvents) return;

    for (const [_ident, opts] of stateEvents.entries()) {
      if (!value && !opts.includeClear) continue;

      opts.callback(entity, key, value);
      // emit(ident, entity, value)
    }
  }
}

const stateManager = StateBagManager.getInstance();

AddStateBagChangeHandler('', '', (bag: string, key: string, value: any, reserved: number, replicated: boolean) => {
  console.log('StateBagChangeHandler', {
    bag,
    key,
    value,
    reserved,
    replicated,
  });

  if (replicated) return;

  let entity = 0;
  if (bag.startsWith('player:')) {
    const playerId = GetPlayerFromStateBagName(bag);
    entity = GetPlayerPed(playerId);
  } else if (bag.startsWith('entity:')) {
    entity = GetEntityFromStateBagName(bag);
  }

  if (stateManager.isStateName(key)) {
    stateManager.handle(entity, key, value);
  }
});

export default stateManager;

/*

const opts = {
  listenClear: false,
};

AddStateBagChangeHandler('', '', (bag: string, key: string, value: any, reserved: number, replicated: boolean) => {
  console.log('StateBagChangeHandler', {
    bag,
    key,
    value,
    reserved,
    replicated,
  });

  if (replicated || (!value && !opts.listenClear)) return;

  let entity = 0;
  if (bag.startsWith('player:')) {
    const playerId = GetPlayerFromStateBagName(bag);
    entity = GetPlayerPed(playerId);
  } else if (bag.startsWith('entity:')) {
    entity = GetEntityFromStateBagName(bag);
  }

  console.log('entity', entity);
});

// PVEventsManager.Register('state:applyForce', (entity, value) => {
//   // do
// })

*/
