const distanceVector = (v1, v2) => {
  const dx = (v1.x ?? v1[0]) - (v2.x ?? v2[0]);
  const dy = (v1.y ?? v1[1]) - (v2.y ?? v2[1]);
  const dz = (v1.z ?? v1[2]) - (v2.z ?? v2[2]);

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

const v3 = (ary) => {
  return { x: ary[0], y: ary[1], z: ary[2] };
};

const activePrompt = true;

let lastCamCoords = { x: 0.0, y: 0.0, z: 0.0 };
let lastCamRot = { x: 0.0, y: 0.0, z: 0.0 };
let lastCamFov = 0;

const pos = { x: -282.62, y: 784.4, z: 119.5 };
let shown = false;

const updateCameraInterval = () => {
  const camCoords = v3(GetGameplayCamCoord());
  const camRot = v3(GetGameplayCamRot(1));
  const camFov = GetGameplayCamFov();
  const distance = distanceVector(camCoords, pos);
  if (shown === false && distance < 4) {
    shown = true;
    SendNuiMessage(JSON.stringify({ action: "show" }));
  } else if (shown === true && distance > 4) {
    shown = false;
    SendNuiMessage(JSON.stringify({ action: "hide" }));
  }
  if (shown) {
    const cam = {};
    if (
      distanceVector(lastCamRot, camRot) > 0.001 ||
      distanceVector(lastCamCoords, camCoords) > 0.001
    ) {
      cam.rotation = camRot;
      cam.position = camCoords;
    }
    if (Math.abs(lastCamFov - camFov) > 1) {
      cam.fov = camFov;
    }
    if (cam.rotation || cam.position || cam.fov) {
      lastCamCoords = camCoords;
      lastCamRot = camRot;
      lastCamFov = camFov;
      SendNuiMessage(
        JSON.stringify({
          action: "update_camera",
          cam: cam,
        })
      );
    }
  }
};

setInterval(updateCameraInterval, 15);
