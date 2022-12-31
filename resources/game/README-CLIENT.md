# Client

## Controllers
Character Select

## Managers
Component Manager
Game Manager

## Exports

Import `PVGame` from the @lib/client to use exports with typings
```ts
import { PVGame } from '@lib/client';
```

`playerPed` Returns PlayerPedId() without calling the native.
```ts
PVGame.playerPed()
```

`mountPed` Returns GetMount() without calling the native. Possible 5 second delay in accuracy.
```ts
PVGame.mountPed()
```

`playerCoords` Returns GetEntityCoords(PlayerPedId()) without calling the natives.  
This has a optional argument to force an update of the coordinates with the GetEntityCoords native when calling. Default is false.
```ts
PVGame.playerCoords()
```

`createObject` Creates an object with the given model, coordinates and rotation.  
Returns the object handle.  
Network is true by default
```ts
type createObject = (
  model: number | string,
  coord?: Vector3Format,
  rotation?: Vector3Format,
  network?: boolean
) => Promise<number>;

PVGame.createObject('P_FLASK01X', { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 })
```

`createPed` Creates a ped with the given model, coords and heading.  
Returns the ped handle.  
Network is false by default
```ts
type createPed = (
  model: string,
  x: number,
  y: number,
  z: number,
  heading?: number,
  randomOutfit?: boolean,
  networked?: boolean
) => Promise<number>;

PVGame.createPed('A_M_M_ARMTOWNFOLK_01', 0, 0, 0, 0, true, true)
```

`setPedComponents` and `setPedComponentsMp` Sets the ped components.  
The Mp suffix is for MP peds like mp_male and mp_female.
```ts
type setPedComponents = (ped: number, components: number[]) => Promise<void>
type setPedComponentsMp = (ped: number, components: number[]) => Promise<void>

await PVGame.setPedComponents(69, [-1241887289, -2045421226])
await PVGame.setPedComponentsMp(420, [-1241887289, -2045421226])
```

`finalizePedOutfit` Finalizes the ped outfit.  
This should fix any valid clothing for that model from clipping through the ped model
```ts
type finalizePedOutfit = (ped: number) => void;

PVGame.finalizePedOutfit(69)
```

`getNetworkControlOfEntity` is a loop to NetworkRequestControlOfEntity until control is had.
```ts
type getNetworkControlOfEntity = (entity: number) => Promise<void>;

await PVGame.getNetworkControlOfEntity(420)
```

`attachEntityToBoneIndex` and `attachEntityToBoneName` Attaches an entity to a bone index or name.  
Attachee default is player ped 
```ts
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

PVGame.attachEntityToBoneIndex(this.attachedJunk, 0, this.state.hookedEntity, junkData.offset, junkData.rotation);
PVGame.attachEntityToBoneName(key, 'IK_R_HAND', PVGame.playerPed(), new Vector3(0.15, 0.05, -0.05), new Vector3(0, -90, 90));
```

`loadModel` Loads a model and returns a promise that resolves when the model is loaded
```ts
type loadModel = (model: string | number) => Promise<void>;

await PVGame.loadModel('P_FLASK01X')
```

`requestTxd` Requests a texture dictionary and returns a promise that resolves when the txd is loaded
```ts
type requestTxd = (txd: string | number) => Promise<void>;

await PVGame.requestTxd('BOUNTY_HUNTER_EXPANSION');
```

`collisionLoadedAtEntity` Returns a promise that resolves when the collision is loaded at the entity
```ts
type collisionLoadedAtEntity = (entity: number) => Promise<void>;

await PVGame.collisionLoadedAtEntity(69)
```

`pedIsReadyToRender` Returns a promise that resolves when the ped is ready to render.  
The `delay` is how often to check default is 125ms
```ts
type pedIsReadyToRender = (ped: number, delay?: number) => Promise<void>;

await PVGame.pedIsReadyToRender(420)
```

`reachedCoords` Returns a promise that resolves when the player ped has reached the coords.  
The `distance` is how close the ped needs to be to the coords default is 0.51.  
The `timeout` is how long to wait before rejecting the promise default is 10s  
The `check` interval is 100ms
```ts
type reachedCoords = (destCoords: Vector3Format, distance?: number, timeout?: number) => Promise<boolean>;

await PVGame.reachedCoords(animCoords, 0.75, 5000);
```

`setAnimWalk` This is used to make a custom walk animation.  
This can be resource intensive because it starts a onTick event to ensure the player is playing the animations.  
`clearAnimWalk` Can be used to stop the anim walk onTick
```ts
declare namespace Anim {
  interface Walk {
    standing: { dict: string; anim: string | string[]; flags?: number; };
    walking: { dict: string; anim: string | string[]; flags?: number; };
    running?: { dict: string; anim: string | string[]; flags?: number; };
  }
}
type setAnimWalk = (animWalk: Anim.Walk) => void;

PVGame.setAnimWalk({
  standing: {
    dict: `amb_wander@code_human_bucket_wander@empty@${isMale ? 'male_a' : 'female_a'}@base`,
    anim: 'base',
    flags: AnimFlag.REPEAT + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
  },
  walking: {
    dict: `amb_wander@code_human_bucket_wander@empty@${isMale ? 'male_a' : 'female_a'}@walk`,
    anim: 'walk',
    flags: AnimFlag.REPEAT + AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
  },
});
```

`getComponentById` Gets the component info from the component id
```ts
type getComponentById = (id: number) => Component | undefined;

const component = PVGame.getComponentById(GetHashKey('CLOTHING_ITEM_M_BOOTS_000_TINT_001'))
```

`getAllByCategory` Gets all component infos from a category
```ts
type getAllByCategory = (category: string) => number[];

const hats = PVGame.getAllByCategory('hats')
```

`loadAnimDict` Loads an animation dictionary and returns a promise that resolves when the dictionary is loaded
The `delay` is how often to check default is 250ms
```ts
type loadAnimDict = (hash: string, delay?: number) => Promise<void>;

await PVGame.loadAnimDict('amb_camp@prop_camp_dutch_chess@idle_a');
```

`playAnimTask` Plays an animation task on a ped
```ts
type playAnimTask = (animTask: Anim.Task, ped?: number) => Promise<void>;

await PVGame.playAnimTask(animTask);
```

`taskPlayAnim` Plays an animation task on the player ped slightly differently.
```ts
type taskPlayAnim = (animTask: Anim.Task) => void;

PVGame.taskPlayAnim({
  dict: 'amb_rest@world_human_smoke_cigar@male_a@idle_a',
  anim: 'idle_b',
  flags: AnimFlag.UPPERBODY + AnimFlag.ENABLE_PLAYER_CONTROL,
  blendInSpeed: 4,
  blendOutSpeed: -2,
  delta: 0.4,
  duration: 1000,
});
```

`taskPlayAnimArrayNew` Plays a single animation task or an array of animation tasks on a ped
```ts
type taskPlayAnimArrayNew = (animTasks: Anim.Task | Anim.Task[], ped?: number) => Promise<void>;

PVGame.taskPlayAnimArrayNew({
  dict: data.dict,
  anim: data.clip,
  flags: data.flags,
  blendInSpeed: data.blendInSpeed,
  blendOutSpeed: data.blendOutSpeed,
  entity: data.entity !== 0 ? data.entity : undefined,
});
PVGame.taskPlayAnimArrayNew([
  {
    dict: 'mech_pickup@plant@orchid_tree',
    anim: 'enter_lf',
    flags: AnimFlag.STOP_LAST_FRAME,
  },
  {
    dict: 'mech_pickup@plant@orchid_tree',
    anim: 'base',
  },
]);
```

`taskPlayAnimAdvArray` Plays an animation task with additional options:  
`additional`, `coords`, `rotation`
```ts
type taskPlayAnimAdvArray = (
  coords: Vector3Format,
  rotation: Vector3Format,
  animTasks: Anim.AdvTask[],
  freeze?: boolean,
  animPed?: number,
) => void;

PVGame.taskPlayAnimAdvArray(coords.toObject(), rot.toObject(), [
  {
    dict: animDict,
    anim: 'arthur_open_doors_arthur',
    delta: 0.0,
    duration: 1150,
  },
  {
    dict: animDict,
    anim: 'arthur_open_doors_arthur',
    delta: 0.4666,
    additional: [
      {
        obj: doorLeft,
        anim: 'arthur_open_doors_luc_basedr_l_door',
        stayInAnim: true,
        flags: 32768,
      },
      {
        obj: doorRight,
        anim: 'arthur_open_doors_luc_basedr_r_door',
        stayInAnim: true,
        flags: 32768,
      },
    ],
  },
]);
```

`taskPlayEntityAnim` Plays an animation task on an entity
```ts
type taskPlayEntityAnim = (anims: Anim.EntityTask[]) => void;

PVGame.taskPlayEntityAnim([
  {
    obj: carryBucketEntity,
    dict: `amb_work@world_human_bucket_pickup@empty@${isMale ? 'male_a' : 'female_a'}@stand_enter`,
    anim: 'enter_back_lf_bucket',
  },
]);
```

`loadStream` Loads a stream and returns a promise that resolves when the stream is loaded  
The `delay` is how often to check default is 250ms  
The `maxTries` is how many times to try default is 20
```ts
type loadStream = (streamSet: string, streamName: string, delay?: number, maxTries?: number) => Promise<boolean>;

await PVGame.loadStream('inworld_music_banjo', 1)
```

`playStreamFromPed` Plays a stream from a ped
```ts
type playStreamFromPed = (ped: number, streamSet: string, streamName: string) => Promise<void>;

PVGame.playStreamFromPed(PVGame.playerPed(), 'inworld_music_banjo', '1');
```

`stopStream` Stops a stream
```ts
type stopStream = (streamSet: string, streamName: string) => void;

PVGame.stopStream('inworld_music_banjo', '1');
```

`requestFlowblock` Requests a flowblock
```ts
type requestFlowblock = (flowblock: number) => Promise<number>;

const flowblockId = await PVGame.requestFlowblock(GetHashKey('SHOP_BROWSING_MAIN_FLOW'));
```

`createStateMachine` Creates a state machine from a flowblock
```ts
type createStateMachine = (id: number, flowblock: number) => void;

UiflowblockEnter(flowblockId, -702860656);
PVGame.createStateMachine(-1468895189, flowblockId);
```


const destroyStateMachine: Game.destroyStateMachine = (id) => {
`destroyStateMachine` Destroys a state machine
```ts
type destroyStateMachine = (id: number) => void;

PVGame.destroyStateMachine(-1468895189);
```
