export { onServerCall, onServer, awaitServer, emitServer } from './comms/server';
export { onUICall, onUI, awaitUI, emitUI, focusUI } from './comms/ui';
export { DrawLine, DrawTxt, TxtAtWorldCoord } from './functions';
export * from './resources';
export * from './game';
export * from './events';
export { PedManager } from './ped-manager';
export type { PedConfig, PedSpeechConfig, RoutineStep, PedReactionConfig, ReactionSpeech } from './ped-manager';

// @ts-ignore
export const exports: ClientExports = global.exports;
