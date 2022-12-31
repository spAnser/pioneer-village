import { Vector3 } from '@lib/math';

declare function GetGameplayCamCoord(): [number, number, number];

export const rad = (value: number): number => {
  return (value * Math.PI) / 180.0;
};

export const rotationToDirection = (rotation: Vector3): Vector3 => {
  const z = rad(rotation.z);
  const x = rad(rotation.x);
  const num = Math.abs(Math.cos(x));

  return new Vector3(-Math.sin(z) * num, Math.cos(z) * num, Math.sin(x));
};

export const w2s = (position: Vector3): Vector3 | undefined => {
  const [onScreen, _x, _y] = GetScreenCoordFromWorldCoord(position.x, position.y, position.z);
  if (!onScreen) {
    return;
  }

  return new Vector3((_x - 0.5) * 2, (_y - 0.5) * 2, 0);
};

export const processCoordinates = (x: number, y: number): Vector2Format => {
  //const screenX, screenY = GetScreenResolution()
  const screenX = 2560;
  const screenY = 1440;

  let relativeX = 1 - (x / screenX) * 2.0;
  let relativeY = 1 - (y / screenY) * 2.0;

  if (relativeX > 0) {
    relativeX = -relativeX;
  } else {
    relativeX = Math.abs(relativeX);
  }

  if (relativeY > 0) {
    relativeY = -relativeY;
  } else {
    relativeY = Math.abs(relativeY);
  }

  return { x: relativeX, y: relativeY };
};

export const s2w = (camPos: Vector3, relX: number, relY: number): Vector3 => {
  const camRot = Vector3.fromArray(GetGameplayCamRot(0));
  // if (camera && IsCamActive(camera)) {
  //   camRot = GetCamRot(camera, 0)
  // }
  const camForward = rotationToDirection(camRot.copy()).multiplyScalar(10);
  const rotUp = camRot.add(new Vector3(10));
  const rotDown = camRot.add(new Vector3(-10));
  const rotLeft = camRot.add(new Vector3(0, 0, -10));
  const rotRight = camRot.add(new Vector3(0, 0, 10));

  const camRight = rotationToDirection(rotRight.copy()).sub(rotationToDirection(rotLeft.copy()));
  const camUp = rotationToDirection(rotUp.copy()).sub(rotationToDirection(rotDown.copy()));

  const rollRad = -rad(camRot.y);
  // print(rollRad)
  const camRightRoll = camRight
    .copy()
    .multiplyScalar(Math.cos(rollRad))
    .sub(camUp.copy().multiplyScalar(Math.sin(rollRad)));
  const camUpRoll = camRight
    .copy()
    .multiplyScalar(Math.sin(rollRad))
    .add(camUp.copy().multiplyScalar(Math.cos(rollRad)));

  const point3D = camPos.copy().add(camForward).add(camRightRoll).add(camUpRoll);
  const point2D = w2s(point3D);

  if (point2D === undefined) {
    return camPos.copy().add(camForward);
  }

  const point3DZero = camPos.copy().add(camForward);
  const point2DZero = w2s(point3DZero);

  if (point2DZero === undefined) {
    return camPos.copy().add(camForward);
  }

  const eps = 0.001;

  if (Math.abs(point2D.x - point2DZero.x) < eps || Math.abs(point2D.y - point2DZero.y) < eps) {
    return camPos.copy().add(camForward);
  }

  const scaleX = (relX - point2DZero.x) / (point2D.x - point2DZero.x);
  const scaleY = (relY - point2DZero.y) / (point2D.y - point2DZero.y);
  return camPos.copy().add(camForward).add(camRightRoll.multiplyScalar(scaleX)).add(camUpRoll.multiplyScalar(scaleY));
};

// Get entity, ground, etc. targeted by mouse position in 3D space.
export const screenToWorld = (flags: number, ignore: number = 0) => {
  const [x, y] = GetNuiCursorPosition();

  const absoluteX = x;
  const absoluteY = y;

  const camPos = Vector3.fromArray(GetGameplayCamCoord());
  // if (camera && IsCamActive(camera)) {
  //   camPos = GetCamCoord(camera)
  // }
  const processedCoords = processCoordinates(absoluteX, absoluteY);
  const target = s2w(camPos, processedCoords.x, processedCoords.y);

  const dir = target.sub(camPos); //vectorSub(target, camPos);
  const from = camPos.copy().add(dir.copy().multiplyScalar(0.05)); //vectorAdd(camPos, vectorMultSingle(dir, 0.05));
  const to = camPos.copy().add(dir.copy().multiplyScalar(300)); //vectorAdd(camPos, vectorMultSingle(dir, 300));

  const ray = StartShapeTestRay(from.x, from.y, from.z, to.x, to.y, to.z, flags, ignore, 0);
  const [a, b, c, d, e] = GetShapeTestResult(ray);
  return [b, c, e, to];
};

/*
setInterval(() => {
  const [hit, endCoords, entityHit, to] = screenToWorld(255, 9049624)
  const coords = toVector3(...GetEntityCoords(PlayerPedId()))
  const hitCoords = toVector3(...endCoords)
  // DrawLine(coords.x, coords.y, coords.z, endCoords.x, endCoords.y, endCoords.z, 255, 255, 255, 255)
  Citizen.invokeNative(
    '0xb3426bcc',
    coords.x,
    coords.y,
    coords.z,
    hitCoords.x,
    hitCoords.y,
    hitCoords.z,
    255,
    255,
    255,
    255,
  )
}, 0)
*/
