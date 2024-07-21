import { exports } from '@lib/client';
import { Vector3 } from '@lib/math/vector3';
import gameManager from './managers/game-manager';
import componentManager from './managers/component-manager';
import vegModifierManager from './managers/veg-modifier-manager';
import { VegModifierFlag } from '@lib/flags/veg-modifiers';

const playerPed = (): number => gameManager.playerPed;
const mountPed = (): number | null => gameManager.mountPed;
const playerCoords = (update = false): Vector3Format => {
  if (update) {
    gameManager.updatePlayerCoords();
  }
  return gameManager.playerCoords.toObject();
};

const createObject: Game.createObject = (model, coord = undefined, rot = undefined, network = true) => {
  let coordinates = new Vector3(0, 0, 0);
  if (coord) {
    coordinates.setFromObject(coord);
  }

  let rotation = new Vector3(0, 0, 0);
  if (rot) {
    rotation.setFromObject(rot);
  }

  return gameManager.createObject(model, coordinates, rotation, network);
};

const createPed: Game.createPed = (model, x, y, z, heading, randomOutfit, networked): Promise<number> => {
  return gameManager.createPed(model, x, y, z, heading, randomOutfit, networked);
};

const setPedComponents: Game.setPedComponents = (ped, components) => {
  return gameManager.setPedComponents(ped, components);
};

const setPedComponentsMp: Game.setPedComponentsMp = (ped, components) => {
  return gameManager.setPedComponentsMp(ped, components);
};

const removePedComponent: Game.removePedComponent = (ped, component) => {
  return gameManager.removePedComponent(ped, component);
};

const removePedComponentCategory: Game.removePedComponentCategory = (ped, category) => {
  return gameManager.removePedComponentCategory(ped, category);
};

const finalizePedOutfit: Game.finalizePedOutfit = (ped) => {
  return gameManager.finalizePedOutfit(ped);
};

const registerNetworkEntity: Game.registerNetworkEntity = (entity) => {
  return gameManager.registerNetworkEntity(entity);
};

const getNetworkControlOfEntity: Game.getNetworkControlOfEntity = (entity) => {
  return gameManager.getNetworkControlOfEntity(entity);
};

const attachEntityToBoneIndex: Game.attachEntityToBoneIndex = (attacher, boneIndex, attachee, off, rot) => {
  const offset = new Vector3(0, 0, 0);
  if (off) {
    offset.setFromObject(off);
  }

  const rotation = new Vector3(0, 0, 0);
  if (rot) {
    rotation.setFromObject(rot);
  }

  if (!attachee) {
    attachee = gameManager.playerPed;
  }

  gameManager.attachEntityToBoneIndex(attacher, boneIndex, attachee, offset, rotation);
};

const attachEntityToBoneName: Game.attachEntityToBoneName = (attacher, boneName, attachee, off, rot) => {
  const offset = new Vector3(0, 0, 0);
  if (off) {
    offset.setFromObject(off);
  }

  const rotation = new Vector3(0, 0, 0);
  if (rot) {
    rotation.setFromObject(rot);
  }

  if (!attachee) {
    attachee = gameManager.playerPed;
  }

  gameManager.attachEntityToBoneName(attacher, boneName, attachee, offset, rotation);
};

RegisterCommand(
  'attachObjectTest',
  (src: number, args: string[]) => {
    gameManager.attachEntityToBoneName(Number(args[0]), args[1]);
  },
  false,
);

const loadModel: Game.loadModel = (model) => {
  return gameManager.loadModel(model);
};

const requestTxd: Game.requestTxd = (txd) => {
  return gameManager.requestTxd(txd);
};

const collisionLoadedAtEntity: Game.collisionLoadedAtEntity = (entity) => {
  return gameManager.collisionLoadedAtEntity(entity);
};

const equipMetaPedOutfit: Game.equipMetaPedOutfit = (ped, outfit) => {
  return gameManager.equipMetaPedOutfit(ped, outfit);
};

const pedIsReadyToRender: Game.pedIsReadyToRender = (ped, delay) => {
  return gameManager.pedIsReadyToRender(ped, delay);
};

const waitTextureIsValid: Game.waitTextureIsValid = (textureId) => {
  return gameManager.waitTextureIsValid(textureId);
};

const reachedCoords: Game.reachedCoords = (coords, distance, timeout) => {
  return gameManager.reachedCoords(coords, distance, timeout);
};

const setAnimWalk: Game.setAnimWalk = (animWalk) => {
  gameManager.setAnimWalk(animWalk);
};

const clearAnimWalk: Game.clearAnimWalk = () => {
  gameManager.clearAnimWalk();
};

const getComponentById: Game.getComponentById = (id) => {
  return componentManager.getById(id);
};

const getAllByCategory: Game.getAllByCategory = (category) => {
  return [...componentManager.getAllByCategory(category)];
};

const loadAnimDict: Game.loadAnimDict = (hash, delay) => {
  return gameManager.loadAnimDict(hash, delay);
};

const playAnimTask: Game.playAnimTask = (animTask, ped) => {
  return gameManager.playAnimTask(animTask, ped);
};

const taskPlayAnim: Game.taskPlayAnim = (animTask) => {
  return gameManager.taskPlayAnim(animTask);
};

const taskPlayAnimArrayNew: Game.taskPlayAnimArrayNew = (animTasks, ped = gameManager.playerPed) => {
  return gameManager.taskPlayAnimArrayNew(animTasks, ped);
};

const taskPlayAnimAdvArray: Game.taskPlayAnimAdvArray = (
  coords,
  rotation,
  animTasks,
  freeze = false,
  animPed = gameManager.playerPed,
) => {
  return gameManager.taskPlayAnimAdvArray(coords, rotation, animTasks, freeze, animPed);
};

const taskPlayEntityAnim: Game.taskPlayEntityAnim = (animTasks) => {
  gameManager.taskPlayEntityAnim(animTasks);
};

const loadStream: Game.loadStream = (streamSet, streamName, delay, maxTries) => {
  return gameManager.loadStream(streamSet, streamName, delay, maxTries);
};

const playStreamFromPed: Game.playStreamFromPed = (ped, streamSet, streamName) => {
  return gameManager.playStreamFromPed(ped, streamSet, streamName);
};

const stopStream: Game.stopStream = (streamSet, streamName) => {
  gameManager.stopStream(streamSet, streamName);
};

const requestFlowblock: Game.requestFlowblock = (flowblock) => {
  return gameManager.requestFlowblock(flowblock);
};

const createStateMachine: Game.createStateMachine = (id, flowblock) => {
  return gameManager.createStateMachine(id, flowblock);
};

const destroyStateMachine: Game.destroyStateMachine = (id) => {
  gameManager.destroyStateMachine(id);
};

const vegAddSphereAtEntity: Game.vegAddSphereAtEntity = (entity, radius, modifierType, flags) => {
  return vegModifierManager.addSphereAtEntity(entity, radius, modifierType, flags);
};

const vegAddVolume: Game.vegAddVolume = (coords, modifierType, flags) => {
  return vegModifierManager.addVolume(coords, modifierType, flags);
};

const vegRemoveAllSpheres: Game.vegRemoveAllSpheres = () => {
  vegModifierManager.removeAllSpheres();
};

const getPlayerServerId = (): Game.playerServerId => {
  return gameManager.getPlayerServerId();
};

const getPlayerSteamId = (): Promise<Game.playerSteamId> => {
  return gameManager.getPlayerSteamId();
};

exports<'game'>('playerPed', playerPed);
exports<'game'>('mountPed', mountPed);
exports<'game'>('playerCoords', playerCoords);
exports<'game'>('createObject', createObject);
exports<'game'>('createPed', createPed);
exports<'game'>('setPedComponents', setPedComponents);
exports<'game'>('setPedComponentsMp', setPedComponentsMp);
exports<'game'>('removePedComponent', removePedComponent);
exports<'game'>('removePedComponentCategory', removePedComponentCategory);
exports<'game'>('finalizePedOutfit', finalizePedOutfit);
exports<'game'>('registerNetworkEntity', registerNetworkEntity);
exports<'game'>('getNetworkControlOfEntity', getNetworkControlOfEntity);
exports<'game'>('attachEntityToBoneIndex', attachEntityToBoneIndex);
exports<'game'>('attachEntityToBoneName', attachEntityToBoneName);
exports<'game'>('loadModel', loadModel);
exports<'game'>('requestTxd', requestTxd);
exports<'game'>('collisionLoadedAtEntity', collisionLoadedAtEntity);
exports<'game'>('equipMetaPedOutfit', equipMetaPedOutfit);
exports<'game'>('pedIsReadyToRender', pedIsReadyToRender);
exports<'game'>('waitTextureIsValid', waitTextureIsValid);
exports<'game'>('reachedCoords', reachedCoords);
exports<'game'>('setAnimWalk', setAnimWalk);
exports<'game'>('clearAnimWalk', clearAnimWalk);

exports<'game'>('getComponentById', getComponentById);
exports<'game'>('getAllByCategory', getAllByCategory);

// TODO: Move to anim resource instead?
exports<'game'>('loadAnimDict', loadAnimDict);
exports<'game'>('playAnimTask', playAnimTask);
exports<'game'>('taskPlayAnim', taskPlayAnim);
exports<'game'>('taskPlayAnimArrayNew', taskPlayAnimArrayNew);
exports<'game'>('taskPlayAnimAdvArray', taskPlayAnimAdvArray);
exports<'game'>('taskPlayEntityAnim', taskPlayEntityAnim);

exports<'game'>('loadStream', loadStream);
exports<'game'>('playStreamFromPed', playStreamFromPed);
exports<'game'>('stopStream', stopStream);

exports<'game'>('requestFlowblock', requestFlowblock);
exports<'game'>('createStateMachine', createStateMachine);
exports<'game'>('destroyStateMachine', destroyStateMachine);

exports<'game'>('vegAddSphereAtEntity', vegAddSphereAtEntity);
exports<'game'>('vegAddVolume', vegAddVolume);
exports<'game'>('vegRemoveAllSpheres', vegRemoveAllSpheres);

exports<'game'>('getPlayerServerId', getPlayerServerId);
exports<'game'>('getPlayerSteamId', getPlayerSteamId);
