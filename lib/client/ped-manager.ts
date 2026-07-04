import { Delay } from '@lib/functions';

import { PVGameEvents, type EventData } from './events';
import { PVGame } from './resources';

const playAmbientSpeech = (entity: number, ref: string, name: string, params: string, line = 0) => {
  emit('game:playAmbientSpeech', entity, ref, name, params, line);
};

export interface PedSpeechConfig {
  ref: string;
  names: string[];
  params: string;
  /** [minMs, maxMs] random interval between speech lines */
  intervalMs: [number, number];
}

export type RoutineStep =
  | { type: 'scenario'; name: string; duration?: number }
  | { type: 'anim'; dict: string; anim: string; flags?: number; duration?: number }
  | { type: 'wait'; ms: number }
  | { type: 'speech'; ref: string; name: string; params: string };

/** A single speech variant for a reaction — picked randomly from the pool. */
export interface ReactionSpeech {
  ref: string;
  name: string;
  params: string;
}

/**
 * Reaction config for a game event.
 *
 * `entityField` — the field in the event data that contains the entity handle
 * to match against this ped. Defaults to checking all numeric values in the
 * event data. Most events use 'attacked', 'ped', or similar.
 *
 * `cooldownMs` — minimum ms between reaction triggers for this event.
 * Defaults to 5000ms to avoid speech spam.
 */
export interface PedReactionConfig {
  event: keyof EventData;
  /** Field name in the event data whose value is compared against the ped handle. Omit to skip entity matching and always fire. */
  entityField?: string;
  lines: ReactionSpeech[];
  cooldownMs?: number;
  /** Optional callback fired alongside the speech reaction. Receives the ped handle and the raw event data. */
  onReact?: (pedHandle: number, data: Record<string, number>) => void;
}

export interface PedConfig {
  model: string | number;
  position: { x: number; y: number; z: number; w: number };
  networked?: boolean;
  freeze?: boolean;
  invincible?: boolean;
  blockEvents?: boolean;
  missionEntity?: boolean;
  scenario?: string;
  speech?: PedSpeechConfig;
  routine?: RoutineStep[];
  reactions?: PedReactionConfig[];
}

interface ManagedPed {
  id: string;
  handle: number;
  config: PedConfig;
  speechTimer?: CitizenTimer;
  routineTick?: number;
  routineRunning: boolean;
  reactionCooldowns: Map<string, number>;
}

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

export class PedManager {
  protected static instance: PedManager;
  private _peds: Map<string, ManagedPed> = new Map();
  /** Events that have already been registered with PVGameEvents (per-instance). */
  private _registeredReactionEvents: Set<keyof EventData> = new Set();

  static getInstance(): PedManager {
    if (!PedManager.instance) {
      PedManager.instance = new PedManager();
    }
    return PedManager.instance;
  }

  async spawn(id: string, config: PedConfig): Promise<number> {
    const existing = this._peds.get(id);
    if (existing) return existing.handle;

    const { x, y, z, w } = config.position;
    await PVGame.loadModel(config.model);
    const handle = await PVGame.createPed(config.model, x, y, z, w, true, config.networked ?? false);

    if (!handle || !DoesEntityExist(handle)) {
      console.warn(`[PedManager] Failed to spawn ped "${id}"`);
      return 0;
    }

    if (config.missionEntity) SetEntityAsMissionEntity(handle, true, true);
    if (config.invincible) SetEntityInvincible(handle, true);
    if (config.freeze) FreezeEntityPosition(handle, true);
    if (config.blockEvents) SetBlockingOfNonTemporaryEvents(handle, true);

    SetPedFleeAttributes(handle, 0, false);
    SetPedCombatAttributes(handle, 17, true);

    if (config.scenario) {
      TaskStartScenarioInPlace_2(handle, null, config.scenario, 0, true, 0, false);
    }

    const managed: ManagedPed = { id, handle, config, routineRunning: true, reactionCooldowns: new Map() };
    this._peds.set(id, managed);

    if (config.speech) this._startSpeechLoop(managed);
    if (config.routine?.length) this._startRoutine(managed);
    if (config.reactions?.length) this._registerReactions(managed);

    return handle;
  }

  despawn(id: string): void {
    const managed = this._peds.get(id);
    if (!managed) return;

    this._stopSpeechLoop(managed);
    this._stopRoutine(managed);

    const { handle, config } = managed;
    if (DoesEntityExist(handle)) {
      if (config.missionEntity) SetEntityAsMissionEntity(handle, false, true);
      DeletePed(handle);
    }

    this._peds.delete(id);
  }

  despawnAll(): void {
    for (const id of this._peds.keys()) {
      this.despawn(id);
    }
  }

  getPed(id: string): number | undefined {
    return this._peds.get(id)?.handle;
  }

  pauseRoutine(id: string): void {
    const managed = this._peds.get(id);
    if (managed) managed.routineRunning = false;
  }

  resumeRoutine(id: string): void {
    const managed = this._peds.get(id);
    if (managed) managed.routineRunning = true;
  }

  playSpeech(id: string, psc: PedSpeechConfig): void {
    const managed = this._peds.get(id);
    console.log(`[PedManager] ped found: ${!!managed} with handle ${managed?.handle} - playSpeech "${id}" ref=${psc.ref} names=${psc.names.join(',')} params=${psc.params}`);

    if (managed && DoesEntityExist(managed.handle)) {
      if (managed.routineRunning) this.pauseRoutine(id);
      const line = psc.names[Math.floor(Math.random() * psc.names.length)];
      playAmbientSpeech(managed.handle, psc.ref, line, psc.params);
      if (!managed.routineRunning) this.resumeRoutine(id);
    }
  }

  private _startSpeechLoop(managed: ManagedPed): void {
    const { speech } = managed.config;
    if (!speech) return;

    const schedule = () => {
      const delay = randomBetween(speech.intervalMs[0], speech.intervalMs[1]);
      managed.speechTimer = setTimeout(() => {
        if (DoesEntityExist(managed.handle)) {
          const line = speech.lines[Math.floor(Math.random() * speech.names.length)];
          playAmbientSpeech(managed.handle, speech.ref, line, speech.params);
        }
        schedule();
      }, delay);
    };

    schedule();
  }

  private _stopSpeechLoop(managed: ManagedPed): void {
    if (managed.speechTimer !== undefined) {
      clearTimeout(managed.speechTimer);
      managed.speechTimer = undefined;
    }
  }

  private _startRoutine(managed: ManagedPed): void {
    const steps = managed.config.routine;
    if (!steps?.length) return;

    managed.routineTick = setTick(async () => {
      for (const step of steps) {
        if (!managed.routineRunning || !DoesEntityExist(managed.handle)) {
          await Delay(500);
          continue;
        }

        switch (step.type) {
          case 'scenario':
            console.log(`[PedManager] routine "${managed.id}" scenario=${step.name} duration=${step.duration}`);
            TaskStartScenarioInPlace_2(managed.handle, null, step.name, 0, true, 0, false);
            if (step.duration) await Delay(step.duration);
            break;

          case 'anim':
            console.log(`[PedManager] routine "${managed.id}" anim=${step.dict}@${step.anim} duration=${step.duration}`);
            await PVGame.loadAnimDict(step.dict);
            TaskPlayAnim(
              managed.handle,
              step.dict,
              step.anim,
              8.0,
              -8.0,
              step.duration ?? -1,
              step.flags ?? 0,
              0,
              false,
              false,
              false,
            );
            if (step.duration) await Delay(step.duration);
            break;

          case 'wait':
            console.log(`[PedManager] routine "${managed.id}" wait=${step.ms}ms`);
            await Delay(step.ms);
            break;

          case 'speech':
            console.log(`[PedManager] routine "${managed.id}" speech ref=${step.ref} name=${step.name}`);
            playAmbientSpeech(managed.handle, step.ref, step.name, step.params);
            break;
        }
      }
    });
  }

  private _stopRoutine(managed: ManagedPed): void {
    if (managed.routineTick !== undefined) {
      clearTick(managed.routineTick);
      managed.routineTick = undefined;
    }
  }

  private _registerReactions(managed: ManagedPed): void {
    const { reactions } = managed.config;
    if (!reactions?.length) return;

    for (const reaction of reactions) {
      if (this._registeredReactionEvents.has(reaction.event)) continue;
      this._registeredReactionEvents.add(reaction.event);

      PVGameEvents.register(reaction.event, (data) => {
        const now = Date.now();

        for (const ped of this._peds.values()) {
          if (!DoesEntityExist(ped.handle)) continue;

          for (const r of ped.config.reactions ?? []) {
            if (r.event !== reaction.event) continue;

            // Check if the event involves this ped's entity handle.
            const matched = r.entityField
              ? (data as Record<string, number>)[r.entityField as string] === ped.handle
              : Object.values(data as Record<string, number>).includes(ped.handle);

            if (!matched) continue;

            const cooldownKey = `${r.event}`;
            const cooldown = r.cooldownMs ?? 5_000;
            const lastFired = ped.reactionCooldowns.get(cooldownKey) ?? 0;

            if (now - lastFired < cooldown) continue;

            ped.reactionCooldowns.set(cooldownKey, now);

            const line = r.lines[Math.floor(Math.random() * r.lines.length)];
            console.log(`[PedManager] reaction "${ped.id}" event=${r.event} speech=${line.ref}/${line.name}`);
            playAmbientSpeech(ped.handle, line.ref, line.name, line.params);
            r.onReact?.(ped.handle, data as Record<string, number>);
          }
        }
      });
    }
  }
}
