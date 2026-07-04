# PedManager

Client-side lifecycle manager for resource-owned NPC peds. Each resource instantiates its own `PedManager` — there is no global singleton.

```ts
import { PedManager } from '@lib/client';

const manager = PedManager().getInstance();
```

---

## Spawning & despawning

```ts
const handle = await manager.spawn('my-ped', config);
manager.despawn('my-ped');
manager.despawnAll();

// Get the entity handle for a managed ped
const handle = manager.getPed('my-ped');
```

`spawn` is idempotent — calling it with the same id twice returns the existing handle. `despawn` cleans up the entity, stops all timers and ticks, and removes the ped from tracking.

---

## PedConfig

```ts
interface PedConfig {
  model: string | number;
  position: { x: number; y: number; z: number; w: number }; // w = heading
  networked?: boolean;       // default false
  freeze?: boolean;          // FreezeEntityPosition
  invincible?: boolean;      // SetEntityInvincible
  blockEvents?: boolean;     // SetBlockingOfNonTemporaryEvents
  missionEntity?: boolean;   // SetEntityAsMissionEntity (cleaned up on despawn)
  scenario?: string;         // one-shot scenario on spawn (overridden if routine is set)
  speech?: PedSpeechConfig;
  routine?: RoutineStep[];
  reactions?: PedReactionConfig[];
}
```

---

## Ambient speech loop

Fires a random line from the pool on a random interval. Runs independently of the routine.

```ts
speech: {
  ref: '0822_S_M_M_BANKCLERK_01_WHITE_01',
  names: ['HOWS_IT_GOING', 'WELCOME'],
  params: 'speech_params_force',
  intervalMs: [15_000, 45_000], // [min, max] ms — picked randomly each time
}
```

> **Note:** Ambient speech is routed through a Lua event handler (`game:playAmbientSpeech` in `resources/game/lua/client.lua`). This is intentional and must not be moved to TypeScript — `PlayPedAmbientSpeechNative` requires 64-bit memory pointers from `VarString` which cannot be represented safely in JS IEEE 754 floats. The TypeScript export `playAmbientSpeechFromEntity` in `game-manager.ts` was tested and confirmed to crash for this reason.

---

## Scripted routines

A routine is a looping sequence of steps executed in order. Supports four step types:

```ts
routine: [
  // Play a named scenario for a duration then move to the next step
  { type: 'scenario', name: 'WORLD_HUMAN_VAL_BANKTELLER', duration: 10_000 },

  // Play an animation dict/clip for a duration
  { type: 'anim', dict: 'amb@world_human_stand_impatient@male@base', anim: 'base', duration: 4_000 },

  // Fire a one-shot speech line mid-routine
  { type: 'speech', ref: '0822_S_M_M_BANKCLERK_01_WHITE_01', name: 'GENERIC_THANKS', params: 'speech_params_force' },

  // Pause before the next step
  { type: 'wait', ms: 2_000 },
]
```

All steps log to the console when executed (`[PedManager] routine "<id>" ...`).

### Pausing and resuming

```ts
manager.pauseRoutine('my-ped');
manager.resumeRoutine('my-ped');
```

When paused the routine tick keeps running but skips all steps, polling every 500ms until resumed.

---

## Event-based reactions

Reactions listen for game events and fire a random speech line from a pool when triggered. Each reaction has an independent cooldown.

```ts
reactions: [
  {
    // Event name — must be a key of EventData (see lib/client/events.ts)
    event: 'EVENT_ENTITY_DAMAGED',

    // Optional: only react if this field in the event data matches this ped's handle.
    // Omit to react to the event regardless of which entity was involved.
    entityField: 'attacked',

    // Random pick from this pool each time
    lines: [
      { ref: '0822_S_M_M_BANKCLERK_01_WHITE_01', name: 'GENERIC_FRIGHTENED_HIGH', params: 'speech_params_force' },
      { ref: '0822_S_M_M_BANKCLERK_01_WHITE_01', name: 'GENERIC_FRIGHTENED_MED',  params: 'speech_params_force' },
    ],

    // Minimum ms between triggers for this reaction. Default: 5000
    cooldownMs: 8_000,

    // Optional callback — runs alongside the speech line
    onReact: (pedHandle, data) => {
      console.log(`ped ${pedHandle} was hit by ${data.attacker}`);
    },
  },
]
```

### Entity matching

| `entityField` set | Behaviour |
|---|---|
| Yes | Only fires if `data[entityField] === pedHandle` |
| No | Fires on any occurrence of the event (ped handle not checked) |

### Available events

Events must be mapped in `lib/client/events.ts` (`eventMappings`) to be usable as a `PedReactionConfig.event`. Currently mapped events relevant to peds:

| Event | Key fields |
|---|---|
| `EVENT_ENTITY_DAMAGED` | `attacked`, `attacker`, `weaponHash`, `damage` |
| `EVENT_ENTITY_DESTROYED` | `attacked`, `attacker`, `weaponHash` |
| `EVENT_ENTITY_EXPLOSION` | `pedOrigin`, `weaponHash`, `x`, `y`, `z` |
| `EVENT_SHOT_FIRED_BULLET_IMPACT` | `shooter` |
| `EVENT_CRIME_CONFIRMED` | `ped` |
| `EVENT_LOOT_COMPLETE` | `playerPed`, `entity` |

To add a new event, add its field mapping to `eventMappings` in `lib/client/events.ts`. The size (number of fields) can be found in `resources/[core]/events_manager/client/handler.lua`.

---

## Full example

```ts
const manager = new PedManager();

const handle = await manager.spawn('valentine-teller', {
  model: 'mp_m_m_bankclerk01_01',
  position: { x: -252.8, y: 764.2, z: 118.9, w: 90 },
  freeze: true,
  invincible: true,
  blockEvents: true,
  missionEntity: true,
  speech: {
    ref: '0822_S_M_M_BANKCLERK_01_WHITE_01',
    names: ['HOWS_IT_GOING', 'WELCOME'],
    params: 'speech_params_force',
    intervalMs: [15_000, 45_000],
  },
  routine: [
    { type: 'scenario', name: 'WORLD_HUMAN_VAL_BANKTELLER', duration: 10_000 },
    { type: 'wait', ms: 2_000 },
  ],
  reactions: [
    {
      event: 'EVENT_ENTITY_DAMAGED',
      entityField: 'attacked',
      cooldownMs: 8_000,
      lines: [
        { ref: '0822_S_M_M_BANKCLERK_01_WHITE_01', name: 'GENERIC_FRIGHTENED_HIGH', params: 'speech_params_force' },
      ],
      onReact: (ped, data) => {
        // e.g. trigger flee, notify server, etc.
      },
    },
  ],
});
```
