import { exports } from '@lib/client';
import healthManager from '../managers/health-manager';

const increaseFoodLevel: Health.increaseFoodLevel = (food): void => {
  healthManager.food += food;
};

const increaseWaterLevel: Health.increaseWaterLevel = (water): void => {
  healthManager.water += water;
};

const limitWalkSpeed: Health.limitWalkSpeed = (speed: number): void => {
  healthManager.blendRatioForcedMax = speed;
};

const clearWalkSpeed: Health.clearWalkSpeed = (): void => {
  healthManager.blendRatioForcedMax = 3.0;
};

exports<'health'>('increaseFoodLevel', increaseFoodLevel);
exports<'health'>('increaseWaterLevel', increaseWaterLevel);
exports<'health'>('limitWalkSpeed', limitWalkSpeed);
exports<'health'>('clearWalkSpeed', clearWalkSpeed);
