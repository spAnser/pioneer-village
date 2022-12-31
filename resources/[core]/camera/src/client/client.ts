import { exports } from '@lib/client';
import { Vector3 } from '@lib/math';
import cameraManager from './camera-manager';

const create: Camera.create = (data) => {
  cameraManager.create(data);
};

const setCoord: Camera.setCoord = (id, coords) => {
  cameraManager.setCoord(id, Vector3.fromObject(coords));
};

const setRot: Camera.setRot = (id, rot) => {
  cameraManager.setRot(id, Vector3.fromObject(rot));
};

const pointAtCoord: Camera.pointAtCoord = (id, coords) => {
  cameraManager.pointAtCoord(id, Vector3.fromObject(coords));
};

const pointAtEntity: Camera.pointAtEntity = (id, entity, offset = { x: 0, y: 0, z: 0 }) => {
  cameraManager.pointAtEntity(id, entity, Vector3.fromObject(offset));
};

const destroy: Camera.destroy = (id) => {
  cameraManager.destroy(id);
};

const setActive: Camera.setActive = (id, easeTime) => {
  cameraManager.setActive(id, easeTime);
};

const setInactive: Camera.setInactive = (id, easeTime) => {
  cameraManager.setInactive(id, easeTime);
};

const interpolate: Camera.interpolate = async (id, duration, easeLocation, easeRotation) => {
  await cameraManager.interpolate(id, duration, easeLocation, easeRotation);
};

exports<'camera'>('create', create);
exports<'camera'>('setCoord', setCoord);
exports<'camera'>('setRot', setRot);
exports<'camera'>('pointAtCoord', pointAtCoord);
exports<'camera'>('pointAtEntity', pointAtEntity);
exports<'camera'>('destroy', destroy);
exports<'camera'>('setActive', setActive);
exports<'camera'>('setInactive', setInactive);
exports<'camera'>('interpolate', interpolate);
