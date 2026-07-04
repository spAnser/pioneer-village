import { PVCustomization, exports } from '@lib/client';
import { Delay } from '@lib/functions';
import { Vector3 } from '@lib/math/vector3';

import componentManager from './managers/component-manager';
import gameManager from './managers/game-manager';
import moveNetworkManager from './managers/move-network-manager';
import vegModifierManager from './managers/veg-modifier-manager';

// Character-related functionality from character-select controller
let currentCharacter: Game.Character | undefined;

export const setCurrentCharacter = (character: Game.Character | undefined) => {
  currentCharacter = character;
};

const getCurrentCharacter = () => currentCharacter;

const setPedOutfit = async (ped: number, components: Game.BodyComponent[]) => {
  const componentHashes = components.map((c) => (typeof c === 'number' ? c : c.id));

  let currentComponentCount = GetNumComponentsInPed(ped);
  for (let n = currentComponentCount; n--; ) {
    const component = GetShopItemComponentAtIndex(
      ped,
      n,
      false,
      new DataView(new ArrayBuffer(255)),
      new DataView(new ArrayBuffer(255)),
    );
    if (!componentHashes.includes(component)) {
      const componentCategory = GetShopItemComponentCategory(component, 0, true);
      RemoveTagFromMetaPed(ped, componentCategory, 0);
      await Delay(1);
    }
  }

  for (const component of componentHashes) {
    ApplyShopItemToPed(ped, component, false, true, false);
    await Delay(1);
  }
  Citizen.invokeNative('0x704c908e9c405136', ped);
  UpdatePedVariation(ped, false, true, true, true, false);
  await Delay(100);

  for (const component of components) {
    if (typeof component !== 'number') {
      const category = GetShopItemComponentCategory(component.id, 0, true);
      PVCustomization.setTintByCategory(ped, category, component.p, component.t0, component.t1, component.t2);
      await Delay(1);
    }
  }
};

export const skinPed = async (ped: number, character: Game.Character) => {
  await setPedOutfit(ped, character.components);
  PVCustomization.equipItems(ped, character.clothing);

  await gameManager.pedIsReadyToRender(ped);
  for (const [feature, value] of Object.entries(character.features)) {
    const featureIndex = Number(feature);
    SetPedFaceFeature(ped, featureIndex, value);
    await Delay(1);
  }
  gameManager.finalizePedOutfit(ped);
};

const playerPed = (): number => gameManager.playerPed;
const mountPed = (): number | null => gameManager.mountPed;
const playerCoords = (update = false): Vector3Format => {
  if (update) {
    gameManager.updatePlayerCoords();
  }
  return gameManager.playerCoords.toObject();
};

const createObject: Game.createObject = (model, coord = undefined, rot = undefined, network = true) => {
  const coordinates = Vector3.fromOrCreate(coord);
  const rotation = Vector3.fromOrCreate(rot);

  return gameManager.createObject(model, coordinates, rotation, network);
};

const createPed: Game.createPed = (model, x, y, z, heading, randomOutfit, networked) => {
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
  const offset = Vector3.fromOrCreate(off);
  const rotation = Vector3.fromOrCreate(rot);

  if (!attachee) {
    attachee = gameManager.playerPed;
  }

  gameManager.attachEntityToBoneIndex(attacher, boneIndex, attachee, offset, rotation);
};

const attachEntityToBoneName: Game.attachEntityToBoneName = (attacher, boneName, attachee, off, rot) => {
  const offset = Vector3.fromOrCreate(off);
  const rotation = Vector3.fromOrCreate(rot);

  if (!attachee) {
    attachee = gameManager.playerPed;
  }

  gameManager.attachEntityToBoneName(attacher, boneName, attachee, offset, rotation);
};

const loadModel: Game.loadModel = (model, delay) => {
  return gameManager.loadModel(model, delay);
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
  return gameManager.taskPlayEntityAnim(animTasks);
};

const turnPedToFaceCoord: Game.turnPedToFaceCoord = (ped, x, y, z, duration = 1000) => {
  return gameManager.turnPedToFaceCoord(ped, x, y, z, duration);
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

const startMoveNetwork: Game.startMoveNetwork = (config) => {
  return moveNetworkManager.start(config);
};

const setMoveNetworkSignalFloat: Game.setMoveNetworkSignalFloat = (id, signal, value) => {
  moveNetworkManager.setSignalFloat(id, signal, value);
};

const setMoveNetworkSignalBool: Game.setMoveNetworkSignalBool = (id, signal, value) => {
  moveNetworkManager.setSignalBool(id, signal, value);
};

const setMoveNetworkSignalVector: Game.setMoveNetworkSignalVector = (id, signal, x, y, z) => {
  moveNetworkManager.setSignalVector(id, signal, x, y, z);
};

const requestMoveNetworkStateTransition: Game.requestMoveNetworkStateTransition = (id, stateName) => {
  moveNetworkManager.requestStateTransition(id, stateName);
};

const getMoveNetworkEvent: Game.getMoveNetworkEvent = (id, eventName) => {
  return moveNetworkManager.getEvent(id, eventName);
};

const hasMoveNetworkAnimEventFired: Game.hasMoveNetworkAnimEventFired = (id, eventHash) => {
  return moveNetworkManager.hasAnimEventFired(id, eventHash);
};

const isMoveNetworkActive: Game.isMoveNetworkActive = (id) => {
  return moveNetworkManager.isActive(id);
};

const isMoveNetworkReadyForTransition: Game.isMoveNetworkReadyForTransition = (id) => {
  return moveNetworkManager.isReadyForTransition(id);
};

const stopMoveNetwork: Game.stopMoveNetwork = (id) => {
  moveNetworkManager.stop(id);
};

const stopAllMoveNetworks: Game.stopAllMoveNetworks = () => {
  moveNetworkManager.stopAll();
};

const getPlayerServerId = (): Game.playerServerId => {
  return gameManager.getPlayerServerId();
};

const getPlayerSteamId = (): Promise<Game.playerSteamId> => {
  return gameManager.getPlayerSteamId();
};

const characterId = (): Game.characterId => {
  return gameManager.characterId;
};

const getAngleTo: Game.getAngleTo = (targetCoords, ped) => {
  return gameManager.getAngleTo(targetCoords, ped);
};

const isPedFacingCoord: Game.isPedFacingCoord = (targetCoords, ped, toleranceDeg) => {
  return gameManager.isPedFacingCoord(targetCoords, ped, toleranceDeg);
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
exports<'game'>('turnPedToFaceCoord', turnPedToFaceCoord);

exports<'game'>('loadStream', loadStream);
exports<'game'>('playStreamFromPed', playStreamFromPed);
exports<'game'>('stopStream', stopStream);

exports<'game'>('requestFlowblock', requestFlowblock);
exports<'game'>('createStateMachine', createStateMachine);
exports<'game'>('destroyStateMachine', destroyStateMachine);

exports<'game'>('vegAddSphereAtEntity', vegAddSphereAtEntity);
exports<'game'>('vegAddVolume', vegAddVolume);
exports<'game'>('vegRemoveAllSpheres', vegRemoveAllSpheres);

exports<'game'>('startMoveNetwork', startMoveNetwork);
exports<'game'>('setMoveNetworkSignalFloat', setMoveNetworkSignalFloat);
exports<'game'>('setMoveNetworkSignalBool', setMoveNetworkSignalBool);
exports<'game'>('setMoveNetworkSignalVector', setMoveNetworkSignalVector);
exports<'game'>('requestMoveNetworkStateTransition', requestMoveNetworkStateTransition);
exports<'game'>('getMoveNetworkEvent', getMoveNetworkEvent);
exports<'game'>('hasMoveNetworkAnimEventFired', hasMoveNetworkAnimEventFired);
exports<'game'>('isMoveNetworkActive', isMoveNetworkActive);
exports<'game'>('isMoveNetworkReadyForTransition', isMoveNetworkReadyForTransition);
exports<'game'>('stopMoveNetwork', stopMoveNetwork);
exports<'game'>('stopAllMoveNetworks', stopAllMoveNetworks);

exports<'game'>('getPlayerServerId', getPlayerServerId);
exports<'game'>('getPlayerSteamId', getPlayerSteamId);
exports<'game'>('characterId', characterId);

exports<'game'>('getAngleTo', getAngleTo);
exports<'game'>('isPedFacingCoord', isPedFacingCoord);

// Character-related exports
exports<'game'>('skinPed', skinPed);
exports<'game'>('getCurrentCharacter', getCurrentCharacter);
