// x: -177.9389190673828,
// y: 628.1513061523438,
// z: 113.08961486816406,
// heading: 147.71343994140625
import { PVPrompt, PVZone, PedManager, type PedReactionConfig } from '@lib/client';

const manager = PedManager.getInstance();

(async () => {
  const ped = await manager.spawn('val-postal-clerk', {
    model: 's_m_m_bankclerk_01',
    position: { x: -177.94, y: 628.15, z: 113.09, w: 147.71 },
    freeze: true,
    invincible: true,
    blockEvents: true,
    missionEntity: true,
    // Ambient speech fires on a random interval independently of the routine.
    speech: {
      ref: '0822_S_M_M_BANKCLERK_01_WHITE_01',
      names: ['HOWS_IT_GOING', 'WELCOME'],
      lines: ['HOWS_IT_GOING', 'WELCOME'],
      params: 'speech_params_standard',
      intervalMs: [15_000, 45_000],
    },
    // Routine loops through all step types as a demonstration:
    //   scenario — teller works at the counter
    //   anim     — does key unlock animation
    //   speech   — one-shot voiced line mid-routine
    //   wait     — brief pause before the next cycle
    routine: [
      { type: 'scenario', name: 'WORLD_HUMAN_VAL_BANKTELLER', duration: 10_000 },
      // { type: 'anim', dict: 'script_common@jail_cell@unlock@key', anim: 'action_mp_female', duration: 2_000 },
      // {
      //   type: 'speech',
      //   ref: '0822_S_M_M_BANKCLERK_01_WHITE_01',
      //   name: 'UNAUTHORIZED_AREA',
      //   params: 'speech_params_force',
      // },
      // { type: 'wait', ms: 2_000 },
    ],
    reactions: [
      // Teller reacts when they personally are attacked.
      {
        event: 'EVENT_ENTITY_DAMAGED',
        entityField: 'attacked',
        cooldownMs: 8_000,
        lines: [
          { ref: '0822_S_M_M_BANKCLERK_01_WHITE_01', name: 'GENERIC_FRIGHTENED_HIGH', params: 'speech_params_force' },
          { ref: '0822_S_M_M_BANKCLERK_01_WHITE_01', name: 'LAW_THREAT', params: 'speech_params_force' },
        ],
        onReact: (pedHandle, data) => {
          // e.g. trigger a flee animation, send a server event, update UI, etc.
          console.log(`ped ${pedHandle} was hit:`, data);
        },
      },
      // Teller reacts to any violence happening nearby (any entity damaged).
      {
        event: 'EVENT_SHOT_FIRED_BULLET_IMPACT',
        cooldownMs: 15_000,
        lines: [
          { ref: '0822_S_M_M_BANKCLERK_01_WHITE_01', name: 'GET_AWAY_FROM_ME', params: 'speech_params_force_shouted' },
          {
            ref: '0822_S_M_M_BANKCLERK_01_WHITE_01',
            name: 'GENERIC_SHOCKED_MED',
            params: 'speech_params_force_shouted',
          },
        ],
        onReact: (pedHandle, data) => {
          // e.g. trigger a flee animation, send a server event, update UI, etc.
          console.log(`ped ${pedHandle} was hit:`, data);
        },
      },
    ] satisfies PedReactionConfig[],
  });

  console.log('bank ped', ped);
})();

PVZone.AddPoly(
  'val_post_office',
  [
    { x: -177.28, y: 626.11 },
    { x: -180.05, y: 628.11 },
    { x: -180.76, y: 627.1 },
    { x: -177.95, y: 625.05 },
  ],
  113,
  116,
  {},
);

function openPostOfficeUI() {
  console.log('Opening post office UI');
}

PVPrompt.register(
  openPostOfficeUI,
  'create',
  `carrier-birds:postoffice:open`,
  GetHashKey('INPUT_ENTER'),
  'Open Post Office',
);

on(`zones::val_post_office::enter`, () => {
  console.log('Entered the post office zone');
  PVPrompt.show('carrier-birds:postoffice:open');
});
on(`zones::val_post_office::exit`, () => {
  console.log('Exited the post office zone');
  PVPrompt.hide('carrier-birds:postoffice:open');
});

// PVZone.AddSphere('val_post_office_sphere', { x: -174.24964904785156, y: 633.1265869140625, z: 113.08960723876953 }, 2, {
//   debug: true,
// });
// PVZone.AddBox(
//   'val_post_office_box',
//   { x: -182.63253784179688, y: 626.9462890625, z: 113.08966827392578 },
//   { x: 1, y: 2, z: 4 },
//   55,
//   {
//     debug: true,
//   },
// );
// on(`zones::val_post_office_sphere::enter`, () => {
//   console.log('Entered the post office zone');
//   PVPrompt.show('carrier-birds:postoffice:open');
// });
// on(`zones::val_post_office_sphere::exit`, () => {
//   console.log('Exited the post office zone');
//   PVPrompt.hide('carrier-birds:postoffice:open');
// });
//
// on(`zones::val_post_office_box::enter`, () => {
//   console.log('Entered the post office zone');
//   PVPrompt.show('carrier-birds:postoffice:open');
// });
// on(`zones::val_post_office_box::exit`, () => {
//   console.log('Exited the post office zone');
//   PVPrompt.hide('carrier-birds:postoffice:open');
// });
