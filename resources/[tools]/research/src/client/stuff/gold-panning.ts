// import PromptManager from '@ts-shared/client/managers/prompt-manager';
// import entityManager from '@ts-shared/shared/managers/entity-manager';

import { PVBase, PVGame, PVHealth, PVPlaceObject, PVPrompt, PVTarget } from '@lib/client';
import { AnimFlag } from '@lib/flags';
import { Vector3 } from '@lib/math';
import { Delay } from '@lib/functions';
import { initManager } from '@lib/shared/init-manager';

// let bucket = PVGame.getChildEntity(1822722, 'bucket');
// console.log('bucket', bucket);
let bucket = 0;

/*
pinId = InvokeNative(0x6F3068258A499E52, `P_DOOR_VAL_BARN_L`, -361.6891, 785.3472, 115.2065, 7)
InvokeNative(0x4735E2A4BB83D9DA, pinId)
*/

// P_PEBBLE01X
// P_PEBBLE02X
// P_PEBBLE03X
// P_PEBBLE04X
// P_GOLDNUGGET01X
// P_GOLDNUGGET02X
// P_GOLDNUGGET03X
// P_GOLDNUGGET04X

on('gold:panning', async (goldCradleEntityId: number, parameters: any) => {
  // P_GOLDCRADLESTAND01X
  Entity(goldCradleEntityId).state.set('inUse', true, true);
  const animOffset = new Vector3(0.6, 0.325, 0.0);
  let bucketOffset = new Vector3(0.825, -0.333, -0.065);
  if (IsPedMale(PVGame.playerPed())) {
    bucketOffset = new Vector3(0.825, -0.375, 0.0);
  }
  const animCoords = Vector3.fromArray(
    GetOffsetFromEntityInWorldCoords(goldCradleEntityId, animOffset.x, animOffset.y, animOffset.z),
  );
  const bucketCoords = Vector3.fromArray(
    GetOffsetFromEntityInWorldCoords(goldCradleEntityId, bucketOffset.x, bucketOffset.y, bucketOffset.z),
  );
  const headingOffset = 95.0;
  const heading = GetEntityHeading(goldCradleEntityId) + headingOffset;
  // const bucket = await PVGame.createObject(GetHashKey('P_CS_BUCKET01X'), bucketCoords, new Vector3(0, 0, heading - 15));
  const bucket = PVGame.getChildEntity(goldCradleEntityId, 'bucket');
  Entity(bucket).state.set('hasWater', false, true);
  SetEntityCoords(bucket, bucketCoords.x, bucketCoords.y, bucketCoords.z, 0.0, 0.0, 0.0, false);
  SetEntityRotation(bucket, 0, 0, heading - 15, 2);
  TaskGoToCoordAnyMeans(PVGame.playerPed(), animCoords.x, animCoords.y, animCoords.z, 1.5, 0, false, 0, 0);
  await PVGame.reachedCoords(animCoords, 0.75);
  await Delay(250);
  SetEntityCollision(bucket, false, false);

  const pan = await PVGame.createObject(GetHashKey('P_CS_MININGPAN01X'), new Vector3(0, 0, 0), new Vector3(0, 0, 0));
  // console.log('pan', pan);
  PVGame.attachEntityToBoneName(pan, 'IK_R_HAND');

  // SetEntityCoords(PVGame.playerPed, coords.x, coords.y, coords.z, 0.0, 0.0, 0.0, false);
  // SetEntityCoordsAndHeading(PVGame.playerPed, animCoords.x, animCoords.y, animCoords.z, heading, 0.0, 0.0, 0.0);

  const success = Math.random() < 0.25;

  let goldNugget: number = 0;
  if (success) {
    const nuggetSize = Math.random() * 4;
    goldNugget = await PVGame.createObject(
      GetHashKey(`P_GOLDNUGGET0${Math.ceil(4 - nuggetSize)}X`),
      new Vector3(0, 0, 0),
      new Vector3(0, 0, 0),
    );
    console.log('nuggetSize', nuggetSize, `P_GOLDNUGGET0${Math.ceil(4 - nuggetSize)}X`);

    PVGame.attachEntityToBoneName(goldNugget, 'PH_R_HAND');

    SetEntityAlpha(goldNugget, 0, false);
  }

  const animDict = 'script_re@gold_panner@gold_success';
  await PVGame.taskPlayAnimAdvArray(
    Vector3.fromArray(GetEntityCoords(goldCradleEntityId, false, false)),
    Vector3.fromArray(GetEntityRotation(goldCradleEntityId, 0)),
    [
      {
        dict: animDict,
        anim: 'pour_bucket',
        flags: AnimFlag.OFFSET_POSITION,
        async onStart() {
          PVGame.taskPlayEntityAnim([
            {
              obj: bucket,
              dict: animDict,
              anim: 'pour_bucket_bucket',
              flags: AnimFlag.OFFSET_POSITION_ENTITY + AnimFlag.UNK_IS_ENTITY,
              position: Vector3.fromArray(GetEntityCoords(goldCradleEntityId, false, false)),
              rotation: Vector3.fromArray(GetEntityRotation(goldCradleEntityId, 0)),
            },
          ]);
        },
      },
      {
        dict: animDict,
        anim: ['search01', 'search02', 'search03', 'search04'],
        flags: AnimFlag.OFFSET_POSITION,
      },
      {
        dict: animDict,
        anim: ['panning_idle', 'panning_idle_02', 'pile_of_nothing'],
        flags: AnimFlag.REPEAT + AnimFlag.OFFSET_POSITION,
        duration: 5000,
      },
      {
        dict: animDict,
        anim: ['search01', 'search02', 'search03', 'search04'],
        flags: AnimFlag.OFFSET_POSITION,
      },
      {
        dict: animDict,
        anim: success ? ['success_front', 'success_back', 'success_walk_r', 'success_walk_back'] : 'fail',
        flags: AnimFlag.OFFSET_POSITION,
        duration: 5000,
        async onStart() {
          if (success) {
            SetEntityAlpha(goldNugget, 255, false);
            await Delay(2000);
          } else {
            await Delay(4500);
          }
          DetachEntity(pan, true, true);
        },
      },
    ],
  );
  /*
    await PVGame.taskPlayAnimArrayNew([
        {
            dict: animDict,
            anim: 'pour_bucket',
            async onStart() {
                PVGame.taskPlayEntityAnim([
                    {
                        obj: bucket,
                        dict: animDict,
                        anim: 'pour_bucket_bucket',
                        flags: AnimFlag.UNK_IS_ENTITY,
                    },
                ]);
            },
        },
        {
            dict: animDict,
            anim: ['search01', 'search02', 'search03', 'search04'],
        },
        {
            dict: animDict,
            anim: ['panning_idle', 'panning_idle_02', 'pile_of_nothing'],
            flags: AnimFlag.REPEAT,
            duration: 5000,
        },
        {
            dict: animDict,
            anim: ['search01', 'search02', 'search03', 'search04'],
        },
        {
            dict: animDict,
            anim: success ? ['success_front', 'success_back', 'success_walk_r', 'success_walk_back'] : 'fail',
            duration: 5000,
            async onStart() {
                if (success) {
                    SetEntityAlpha(goldNugget, 255, false);
                    await Delay(2000);
                } else {
                    await Delay(4500);
                }
                DetachEntity(pan, true, true);
            },
        },
    ]);*/

  await Delay(1000);
  if (success && goldNugget) {
    PVBase.deleteEntity(goldNugget);
  }
  PVBase.deleteEntity(pan);
  // PVBase.deleteEntity(bucket);

  Entity(goldCradleEntityId).state.set('inUse', false, true);
});

// Bucket Anims
/*
// Pickup
amb_work@world_human_bucket_pickup@empty@male_a@stand_enter enter_back_lf
amb_work@world_human_bucket_pickup@empty@male_a@stand_exit_withprop exit_front

amb_work@world_human_bucket_pickup@empty@female_a@stand_enter enter_back_lf
amb_work@world_human_bucket_pickup@empty@female_a@stand_exit_withprop exit_front


// Standing
amb_wander@code_human_bucket_wander@empty@male_a@base base
amb_wander@code_human_bucket_wander@full@male_a@base base

amb_wander@code_human_bucket_wander@empty@female_a@base base
amb_wander@code_human_bucket_wander@full@female_a@base base

// Walking
amb_wander@code_human_bucket_wander@empty@male_a@walk walk
amb_wander@code_human_bucket_wander@full@male_a@walk walk

amb_wander@code_human_bucket_wander@empty@female_a@walk walk
amb_wander@code_human_bucket_wander@full@female_a@walk walk

// Filling
amb_work@world_human_bucket_fill@male_b@stand_enter_withprop enter_back_rf
amb_work@world_human_bucket_fill@male_b@stand_enter_withprop enter_back_lf
amb_work@world_human_bucket_fill@male_b@stand_exit_withprop exit_front

amb_work@world_human_bucket_fill@female_a@stand_enter_withprop enter_back_rf
amb_work@world_human_bucket_fill@female_a@stand_enter_withprop enter_back_lf
amb_work@world_human_bucket_fill@female_a@stand_exit_withprop exit_front
 */

let carryBucketTick: number;
let carryBucketEntity: number;
let cradleEntity: number;

const bucketWalk = () => {
  const isMale = IsPedMale(PVGame.playerPed());
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
  // PVGame.limitWalkSpeed(1.5);
  PVHealth.limitWalkSpeed(1.5);
};

const fillBucket = async () => {
  const isMale = IsPedMale(PVGame.playerPed());
  PVGame.clearAnimWalk();

  Entity(carryBucketEntity).state.set('hasWater', true, true);

  PVGame.attachEntityToBoneName(carryBucketEntity, 'PH_R_HAND');

  await PVGame.taskPlayAnimArrayNew([
    {
      dict: `amb_work@world_human_bucket_fill@${isMale ? 'male_b' : 'female_a'}@stand_enter_withprop`,
      anim: 'enter_back_lf',
      flags: AnimFlag.STOP_LAST_FRAME,
    },
    {
      dict: `amb_work@world_human_bucket_fill@${isMale ? 'male_b' : 'female_a'}@stand_exit_withprop`,
      anim: 'exit_front',
    },
  ]);

  PVGame.attachEntityToBoneName(
    carryBucketEntity,
    'IK_R_HAND',
    undefined,
    new Vector3(0.53, 0.0, -0.2),
    new Vector3(0.0, -70.0, 0.0),
  );
  bucketWalk();
};

(async () => {
  await initManager.initialized('prompts');
  PVPrompt.register(fillBucket, 'createHold', 'fill_bucket', 0xcefd9220, 'Fill');
})();

const carryBucket = () => {
  carryBucketTick = setTick(() => {
    if (IsEntityInWater(PlayerPedId()) && !PVGame.getStateValue(carryBucketEntity, 'hasWater')) {
      PVPrompt.show('fill_bucket');
    } else {
      PVPrompt.hide('fill_bucket');
    }
  });
};

const goToAnimCoords = async () => {
  const animOffset = new Vector3(0.6, 0.325, 0.0);
  const animCoords = Vector3.fromArray(
    GetOffsetFromEntityInWorldCoords(cradleEntity, animOffset.x, animOffset.y, animOffset.z),
  );
  TaskGoToCoordAnyMeans(PVGame.playerPed(), animCoords.x, animCoords.y, animCoords.z, 1.5, 0, false, 0, 0);
  await PVGame.reachedCoords(animCoords, 0.75, 5000);
  await Delay(100);
  SetPedDesiredHeading(PVGame.playerPed(), GetEntityHeading(cradleEntity) + 180);
  await Delay(900);
};

const pickupBucket = async () => {
  const isMale = IsPedMale(PVGame.playerPed());

  // TaskGoToEntity(PVGame.playerPed, carryBucketEntity, -1, 0.5, 1.5, 0, 0);
  // const bucketCoords = Vector3.fromArray(GetEntityCoords(carryBucketEntity, false, false));
  // await PVGame.reachedCoords(bucketCoords, 0.75, 10000);
  await goToAnimCoords();
  await Delay(1000);

  await PVGame.taskPlayAnimArrayNew([
    {
      dict: `amb_work@world_human_bucket_pickup@empty@${isMale ? 'male_a' : 'female_a'}@stand_enter`,
      anim: 'enter_back_lf',
      flags: AnimFlag.STOP_LAST_FRAME,
      onStart() {
        PVGame.taskPlayEntityAnim([
          {
            obj: carryBucketEntity,
            dict: `amb_work@world_human_bucket_pickup@empty@${isMale ? 'male_a' : 'female_a'}@stand_enter`,
            anim: 'enter_back_lf_bucket',
          },
        ]);
      },
    },
    {
      dict: `amb_work@world_human_bucket_pickup@empty@${isMale ? 'male_a' : 'female_a'}@stand_exit_withprop`,
      anim: 'exit_front',
      onStart() {
        PVGame.attachEntityToBoneName(
          carryBucketEntity,
          'IK_R_HAND',
          undefined,
          new Vector3(0.53, 0.0, -0.2),
          new Vector3(0.0, -70.0, 0.0),
        );
        PVGame.taskPlayEntityAnim([
          {
            obj: carryBucketEntity,
            dict: `amb_work@world_human_bucket_pickup@empty@${isMale ? 'male_a' : 'female_a'}@stand_exit_withprop`,
            anim: 'exit_front_bucket',
          },
        ]);
      },
    },
  ]);
  bucketWalk();
  carryBucket();
};

const returnBucket = async () => {
  DetachEntity(carryBucketEntity, false, false);
  let bucketOffset = new Vector3(0.825, -0.333, -0.065);
  if (IsPedMale(PVGame.playerPed())) {
    bucketOffset = new Vector3(0.825, -0.375, 0.0);
  }
  const bucketCoords = Vector3.fromArray(
    GetOffsetFromEntityInWorldCoords(cradleEntity, bucketOffset.x, bucketOffset.y, bucketOffset.z),
  );
  const heading = GetEntityHeading(cradleEntity);
  const bucket = PVGame.getChildEntity(cradleEntity, 'bucket');
  FreezeEntityPosition(bucket, true);
  console.log(
    `SetEntityCoords(${bucket}, ${bucketCoords.x}, ${bucketCoords.y}, ${bucketCoords.z}, 0.0, 0.0, 0.0, false);`,
  );
  SetEntityCoords(bucket, bucketCoords.x, bucketCoords.y, bucketCoords.z, 0.0, 0.0, 0.0, false);
  SetEntityRotation(bucket, 0, 0, heading + 80, 2);
  await Delay(125);
  SetEntityCollision(bucket, false, false);

  carryBucketEntity = 0;
  cradleEntity = 0;
};

const forceReturnBucket = () => {
  PVGame.clearAnimWalk();
  // PVGame.clearWalkSpeed();
  PVHealth.clearWalkSpeed();
  clearTick(carryBucketTick);
  carryBucketTick = 0;
  returnBucket();
};

const putdownBucket = async () => {
  const isMale = IsPedMale(PVGame.playerPed());
  PVGame.clearAnimWalk();
  // PVGame.clearWalkSpeed();
  PVHealth.clearWalkSpeed();
  clearTick(carryBucketTick);
  carryBucketTick = 0;

  // SetPedDesiredHeading(PVGame.playerPed, GetEntityHeading(cradleEntity) + 180);
  await goToAnimCoords();

  await PVGame.taskPlayAnimArrayNew([
    {
      dict: `amb_work@world_human_bucket_putdown@empty@${isMale ? 'male_a' : 'female_a'}@stand_enter_withprop`,
      anim: 'enter_back_lf',
      onStart() {
        SetEntityNoCollisionEntity(carryBucketEntity, PVGame.playerPed(), false);
        DetachEntity(carryBucketEntity, false, false);
        SetEntityCollision(bucket, false, false);
        PVGame.taskPlayEntityAnim([
          {
            obj: carryBucketEntity,
            dict: `amb_work@world_human_bucket_putdown@empty@${isMale ? 'male_a' : 'female_a'}@stand_enter_withprop`,
            anim: 'enter_back_lf_bucket',
            flags: AnimFlag.UNK_IS_ENTITY,
          },
        ]);
      },
    },
    {
      dict: `amb_work@world_human_bucket_putdown@empty@${isMale ? 'male_a' : 'female_a'}@stand_exit`,
      anim: 'exit_front',
      onStart() {
        PVGame.taskPlayEntityAnim([
          {
            obj: carryBucketEntity,
            dict: `amb_work@world_human_bucket_putdown@empty@${isMale ? 'male_a' : 'female_a'}@stand_exit_withprop`,
            anim: 'exit_front_bucket',
            flags: AnimFlag.UNK_IS_ENTITY,
          },
        ]);
      },
      onEnd() {
        returnBucket();
      },
    },
  ]);
};

on('gold:panning:bucket-pickup', async (goldCradleEntityId: number, parameters: any) => {
  console.log('gold:panning:bucket-pickup', goldCradleEntityId);
  cradleEntity = goldCradleEntityId;
  carryBucketEntity = PVGame.getChildEntity(goldCradleEntityId, 'bucket');
  console.log('carryBucketEntity', carryBucketEntity);
  pickupBucket();
});

on('gold:panning:bucket-putdown', async (goldCradleEntityId: number, parameters: any) => {
  putdownBucket();
});

on('gold:panning:teardown', async (goldCradleEntityId: number, parameters: any) => {
  const bucketEntityId = PVGame.getChildEntity(goldCradleEntityId, 'bucket');
  PVBase.deleteEntity(goldCradleEntityId);
  PVBase.deleteEntity(bucketEntityId);
});

RegisterCommand('returnbucket', () => forceReturnBucket(), false);

const registerTargets = () => {
  PVTarget.AddTarget({
    id: 'gold_panning',
    type: 'model',
    group: [GetHashKey('P_GOLDCRADLESTAND01X')],
    data: [
      {
        id: 'gold_panning',
        label: 'Pan for Gold',
        icon: 'cloud-meatball',
        event: 'gold:panning',
        parameters: {},
      },
    ],
    options: {
      distance: 2.0,
      isEnabled(data) {
        const bucketEntity = PVGame.getChildEntity(data.entity, 'bucket');
        return (
          !PVGame.getStateValue(data.entity, 'inUse') &&
          PVGame.getStateValue(bucketEntity, 'hasWater') &&
          !GetEntityAttachedTo(bucketEntity)
        );
      },
    },
  });

  PVTarget.AddTarget({
    id: 'gold_panning_bucket_pickup',
    type: 'model',
    group: [GetHashKey('P_GOLDCRADLESTAND01X')],
    data: [
      {
        id: 'gold_panning_bucket_pickup',
        label: 'Grab Bucket',
        icon: 'fill',
        event: 'gold:panning:bucket-pickup',
        parameters: {},
      },
    ],
    options: {
      distance: 2.0,
      isEnabled(data) {
        const bucketEntity = PVGame.getChildEntity(data.entity, 'bucket');
        return (
          !PVGame.getStateValue(data.entity, 'inUse') &&
          !PVGame.getStateValue(bucketEntity, 'hasWater') &&
          !GetEntityAttachedTo(bucketEntity)
        );
      },
    },
  });

  PVTarget.AddTarget({
    id: 'gold_panning_bucket_return',
    type: 'model',
    group: [GetHashKey('P_GOLDCRADLESTAND01X')],
    data: [
      {
        id: 'gold_panning_bucket_return',
        label: 'Return Bucket',
        icon: 'fill',
        event: 'gold:panning:bucket-putdown',
        parameters: {},
      },
    ],
    options: {
      distance: 2.0,
      isEnabled(data) {
        const bucketEntity = PVGame.getChildEntity(data.entity, 'bucket');
        return PVGame.playerPed() === GetEntityAttachedTo(bucketEntity);
      },
    },
  });

  PVTarget.AddTarget({
    id: 'gold_panning_teardown',
    type: 'model',
    group: [GetHashKey('P_GOLDCRADLESTAND01X')],
    data: [
      {
        id: 'gold_panning_teardown',
        label: 'Teardown',
        icon: 'recycle',
        event: 'gold:panning:teardown',
        parameters: {},
      },
    ],
    options: {
      distance: 2.0,
    },
  });
};

if (GetResourceState('target') === 'started') {
  registerTargets();
}

on('onResourceStart', (resourceName: string) => {
  if (resourceName === 'target') {
    registerTargets();
  }
});

RegisterCommand(
  'placeGoldPanning',
  async () => {
    const ids = await PVPlaceObject.placeObjectAdvanced(
      {
        model: 'P_GOLDCRADLESTAND01X',
        amount: 1,
        uprightLimit: 0.1,
        subItems: [
          {
            name: 'bucket',
            model: 'P_CS_BUCKET01X',
            offset: {
              x: 0.825,
              y: -0.333,
              z: -0.065,
            },
            offsetHeading: 80,
          },
        ],
      },
      true,
    );
    console.log('placed entity ids:', ids);
  },
  false,
);

RegisterCommand(
  'jcrun',
  async (source: number, args: string[]) => {
    const rtns = eval(args.join(' '));
    console.log(rtns);
  },
  false,
);
