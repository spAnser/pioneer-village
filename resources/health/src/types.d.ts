declare interface ClientExports {
  health: Health.ClientExports;
}

declare interface RPC {
  ['health.getFoodAndDrink']: (charId: number) => Promise<{food: number, drink: number}>;
}

declare namespace Health {
  interface BoneInfo {
    index: number;
    id: number;
    attachedTo?: string[];
  }

  interface InjuryInfo {
    threshold: number;
    text: string;
    recoveryMultiplier: number;
    boneBroken?: boolean;
  }

  interface BoneStatus {
    index: number;
    bulletFragment: number;
    shot: number;
    burned: boolean;
    slash: number;
    broken: boolean;
    bandaged: boolean;
    stabilized: boolean;
    infected: boolean; // Poisonous Animal Infection
    infectedBySelf: boolean; // Bad Bandage Infection
    infectionMultiplier: number;
    infection: number;
    bleedingParticleId: boolean;
    bleedingParticleSize: number;
  }

  type increaseFoodLevel = (food: number) => void;
  type increaseWaterLevel = (water: number) => void;
  type limitWalkSpeed = (speed: number) => void;
  type clearWalkSpeed = () => void;

  type ClientExports = {
    increaseFoodLevel: increaseFoodLevel;
    increaseWaterLevel: increaseWaterLevel;
    limitWalkSpeed: limitWalkSpeed;
    clearWalkSpeed: clearWalkSpeed;
  };
}
