import { PVGame } from '@lib/client';
import { Vector3 } from '@lib/math';

type PtfxInfo = {
  id: number;
  looped: boolean;
};

export class PtfxManager {
  protected static instance: PtfxManager;

  protected ptfxs: Map<string, PtfxInfo> = new Map();

  static getInstance(): PtfxManager {
    if (!PtfxManager.instance) {
      PtfxManager.instance = new PtfxManager();
    }
    return PtfxManager.instance;
  }

  initialized = false;

  constructor() {
    on('onResourceStop', (resourceName: string) => {
      if (resourceName === GetCurrentResourceName()) {
        this.cleanup();
      }
    });

    this.init();
  }

  async init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
  }

  cleanup() {
    for (const ptfx of this.ptfxs.values()) {
      if (!ptfx.looped || !DoesParticleFxLoopedExist(ptfx.id)) {
        continue;
      }
      StopParticleFxLooped(ptfx.id, false);
    }
  }

  async startFxAtCoords(
    id: string,
    looped: boolean,
    dict: string,
    name: string,
    coords: Vector3Format,
    rot: Vector3Format = { x: 0, y: 0, z: 0 },
    scale: number = 1.0,
    ignoreDistance = false,
  ): Promise<number> {
    if (this.ptfxs.has(id)) {
      return this.ptfxs.get(id)!.id;
    }
    // console.log('Starting PTFX', id, dict, name, coords, rot, scale, looped);

    const playerCoords = PVGame.playerCoords();
    if (!ignoreDistance) {
      const distance = Vector3.fromObject(coords).getDistance(playerCoords);
      if (distance > 500) {
        console.log('PTFX too far away, not starting', id, distance);
        return 0;
      }
    }

    let ptfxId = 0;
    UseParticleFxAsset(dict);
    if (looped) {
      ptfxId = StartParticleFxLoopedAtCoord(
        name,
        coords.x,
        coords.y,
        coords.z,
        rot.x,
        rot.y,
        rot.z,
        scale,
        false,
        false,
        false,
        false,
      );
    } else {
      StartParticleFxNonLoopedAtCoord(
        name,
        coords.x,
        coords.y,
        coords.z,
        rot.x,
        rot.y,
        rot.z,
        scale,
        false,
        false,
        false,
      );
    }

    if (ptfxId) {
      this.ptfxs.set(id, { id: ptfxId, looped });
    }

    return ptfxId;
  }

  // int StartParticleFxLoopedOnEntity(string effectName, Entity entity, float xOffset, float yOffset, float zOffset, float xRot, float yRot, float zRot, float scale, bool xAxis, bool yAxis, bool zAxis);
  // GRAPHICS::START_PARTICLE_FX_LOOPED_ON_ENTITY("scr_gen_shiny_bling", sLocal_56[1 /*12*/].f_8, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 1.0f, true, false, false);
  // BOOL StartParticleFxNonLoopedOnEntity(string effectName, Entity entity, float offsetX, float offsetY, float offsetZ, float rotX, float rotY, float rotZ, float scale, bool axisX, bool axisY, bool axisZ);
  // GRAPHICS::START_PARTICLE_FX_NON_LOOPED_ON_ENTITY("scr_sad2_logwagon_dust", bLocal_2402, vLocal_2613, 0.0f, 0.0f, 0.0f, 1.0f, false, false, false);

  async startFxOnEntity(
    id: string,
    looped: boolean,
    dict: string,
    name: string,
    entity: number,
    offset: Vector3Format = { x: 0, y: 0, z: 0 },
    rot: Vector3Format = { x: 0, y: 0, z: 0 },
    scale: number = 1.0,
  ): Promise<number> {
    if (this.ptfxs.has(id)) {
      return this.ptfxs.get(id)!.id;
    }
    // console.log('Starting PTFX on entity', id, dict, name, entity, offset, rot, scale, looped);

    let ptfxId = 0;
    UseParticleFxAsset(dict);
    if (looped) {
      ptfxId = StartParticleFxLoopedOnEntity(
        name,
        entity,
        offset.x,
        offset.y,
        offset.z,
        rot.x,
        rot.y,
        rot.z,
        scale,
        false,
        false,
        false,
      );
    } else {
      StartParticleFxNonLoopedOnEntity(
        name,
        entity,
        offset.x,
        offset.y,
        offset.z,
        rot.x,
        rot.y,
        rot.z,
        scale,
        false,
        false,
        false,
      );

      console.log('ptfxId', ptfxId);
    }

    if (ptfxId) {
      this.ptfxs.set(id, { id: ptfxId, looped });
    }

    return ptfxId;
  }

  async startFxOnEntityBone(
    id: string,
    looped: boolean,
    dict: string,
    name: string,
    entity: number,
    boneIndex: number,
    offset: Vector3Format = { x: 0, y: 0, z: 0 },
    rot: Vector3Format = { x: 0, y: 0, z: 0 },
    scale: number = 1.0,
  ): Promise<number> {
    if (this.ptfxs.has(id)) {
      return this.ptfxs.get(id)!.id;
    }
    // console.log('Starting PTFX on entity bone', id, dict, name, entity, offset, rot, boneIndex, scale, looped);

    let ptfxId = 0;
    UseParticleFxAsset(dict);
    if (looped) {
      ptfxId = StartParticleFxLoopedOnEntityBone(
        name,
        entity,
        offset.x,
        offset.y,
        offset.z,
        rot.x,
        rot.y,
        rot.z,
        boneIndex,
        scale,
        false,
        false,
        false,
      );
    } else {
      StartParticleFxNonLoopedOnPedBone(
        name,
        entity,
        offset.x,
        offset.y,
        offset.z,
        rot.x,
        rot.y,
        rot.z,
        boneIndex,
        scale,
        false,
        false,
        false,
      );

      console.log('ptfxId', ptfxId);
    }

    if (ptfxId) {
      this.ptfxs.set(id, { id: ptfxId, looped });
    }

    return ptfxId;
  }

  async startFxOnEntityBoneByName(
    id: string,
    looped: boolean,
    dict: string,
    name: string,
    entity: number,
    boneName: string,
    offset: Vector3Format = { x: 0, y: 0, z: 0 },
    rot: Vector3Format = { x: 0, y: 0, z: 0 },
    scale: number = 1.0,
  ): Promise<number> {
    const boneIndex = GetEntityBoneIndexByName(entity, boneName);
    console.log('boneIndex', boneIndex);
    if (boneIndex === -1) {
      return 0;
    }
    return this.startFxOnEntityBone(id, looped, dict, name, entity, boneIndex, offset, rot, scale);
  }

  async startFxOnPedBone(
    id: string,
    looped: boolean,
    dict: string,
    name: string,
    ped: number,
    boneIndex: number,
    offset: Vector3Format = { x: 0, y: 0, z: 0 },
    rot: Vector3Format = { x: 0, y: 0, z: 0 },
    scale: number = 1.0,
  ): Promise<number> {
    if (this.ptfxs.has(id)) {
      return this.ptfxs.get(id)!.id;
    }
    // console.log('Starting PTFX on ped bone', id, dict, name, ped, offset, rot, boneIndex, scale, looped);

    let ptfxId = 0;
    UseParticleFxAsset(dict);
    if (looped) {
      ptfxId = StartParticleFxLoopedOnPedBone(
        name,
        ped,
        offset.x,
        offset.y,
        offset.z,
        rot.x,
        rot.y,
        rot.z,
        boneIndex,
        scale,
        false,
        false,
        false,
      );
    } else {
      // _START_PARTICLE_FX_NON_LOOPED_ON_PED_BONE_2
      Citizen.invokeNative(
        '0xc695870b8a149b96',
        name,
        ped,
        offset.x,
        offset.y,
        offset.z,
        rot.x,
        rot.y,
        rot.z,
        boneIndex,
        scale,
        false,
        false,
        false,
      );

      console.log('ptfxId', ptfxId);
    }

    if (ptfxId) {
      this.ptfxs.set(id, { id: ptfxId, looped });
    }

    return ptfxId;
  }

  async startFxOnPedBoneByName(
    id: string,
    looped: boolean,
    dict: string,
    name: string,
    ped: number,
    boneName: string,
    offset: Vector3Format = { x: 0, y: 0, z: 0 },
    rot: Vector3Format = { x: 0, y: 0, z: 0 },
    scale: number = 1.0,
  ): Promise<number> {
    const boneIndex = GetEntityBoneIndexByName(ped, boneName);
    console.log('boneIndex', boneIndex);
    if (boneIndex === -1) {
      return 0;
    }
    return this.startFxOnPedBone(id, looped, dict, name, ped, boneIndex, offset, rot, scale);
  }

  stopFx(id: string, removeNow: boolean = true) {
    const ptfx = this.ptfxs.get(id);
    if (!ptfx) {
      return;
    }
    if (ptfx.looped && DoesParticleFxLoopedExist(ptfx.id)) {
      console.log('Stopping PTFX', id, ptfx.id);
      if (removeNow) RemoveParticleFx(ptfx.id, false);
      StopParticleFxLooped(ptfx.id, false);
    }
    this.ptfxs.delete(id);
  }

  setFxEvolution(id: string, name: string, value: number) {
    const ptfx = this.ptfxs.get(id);
    if (!ptfx || !DoesParticleFxLoopedExist(ptfx.id)) {
      return;
    }
    console.log('Setting PTFX evolution', id, name, value);
    SetParticleFxLoopedEvolution(ptfx.id, name, value, false);
  }

  setFxEvolutions(id: string, evolutions: Record<string, number>) {
    const ptfx = this.ptfxs.get(id);
    if (!ptfx || !DoesParticleFxLoopedExist(ptfx.id)) {
      return;
    }
    for (const [name, value] of Object.entries(evolutions)) {
      console.log('Setting PTFX evolution', id, name, value);
      SetParticleFxLoopedEvolution(ptfx.id, name, value, false);
    }
  }
}

const ptfxManager = PtfxManager.getInstance();

export default ptfxManager;
