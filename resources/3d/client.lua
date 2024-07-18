print('3D Lua Loaded')

local active = true
local lastFov = 0
local lastCamCoords = vec3(0, 0, 0)
local lastCamRot = vec3(0, 0, 0)
local lastTargetCoords = vec3(0, 0, 0)
local lastTargetRot = vec3(0, 0, 0)

local playerPed = PlayerPedId()
local target = PlayerPedId()

local POIs = {
  {
    id = 'bar',
    coord = vec3(-312.6, 805.8, 119.1),
    lastScreen = vec2(0, 0),
    label = 'Order Drink',
    key = 'E',
  },
  {
    id = 'beer',
    coord = vec3(-314.3, 805.6, 119.5),
    lastScreen = vec2(0, 0),
    label = 'Grab Drink',
    key = 'E',
  },
  {
    id = 'pickled_eggs',
    coord = vec3(-313.5, 803.8, 119.1),
    lastScreen = vec2(0, 0),
    label = 'Grab Drink',
    key = 'E',
  },
  {
    id = 'val_saloon',
    coord = vec3(-308.8, 795.8, 119.25),
    lastScreen = vec2(0, 0),
    label = 'Enter Saloon',
    key = 'E',
  }
}

local texDict = 'pm_field_guide_mp_naturalist_stamp'
local texId = 'field_guide_naturalist_stamp_index'

texDict = 'hud_toasts'
texId = 'toast_mp_status_change'

--texDict = 'hudmanager'
--texId = 'location_wipe_'
--texDict = 'hud_textures'
--texId = '_placeholder'
--texDict = 'minigames_hud'
--texId = 'domino_block_game'

RequestStreamedTextureDict(texDict)

function renderMarkerAtCoord(coords)
  --local n = math.floor(GetGameTimer() / 50 % 20)
  --
  --if n < 8 then
  --  n = 8
  --end
  --
  --if n > 15 then
  --  n = 16
  --end

  Citizen.InvokeNative(
    0x2A32FAA57B937173,
    --GetHashKey('MARKERTYPE_RING'),
    GetHashKey('MARKERTYPE_NUM_0'),
    coords.x,
    coords.y,
    coords.z + 0.05,
    0.0, -- Dir X
    0.0, -- Dir Y
    0.0, -- Dir Z
    0.0, -- Rot X
    0.0, -- Rot Y
    0.0, -- Rot Z
    0.035,-- Scale X
    0.035,-- Scale Y
    0.035,-- Scale Z
    255, -- R
    255,--69, -- G
    255,--83, -- B
    255, -- A
    false, -- Bounce
    false, -- Face Camera
    2, -- Rotation Order
    false, -- Rotate
    texDict, -- Tex Dict
    texId, -- Tex Id
    --texId .. n,
    0 -- Draw On Entities (doesn't actually work)
  )
end

function renderMarker()
  local coords = GetEntityCoords(playerPed, true, true)
  local rot = GetEntityRotation(playerPed, 2)
  --local forward = GetEntityForwardVector(target)
  Citizen.InvokeNative(
    0x2A32FAA57B937173,
    GetHashKey('MARKERTYPE_HALO_POINT'),
    coords.x,
    coords.y,
    coords.z - 0.75,
    0,
    0,
    0,
    rot.x,--0,
    rot.y,--0,
    rot.z,--GetEntityHeading(target),
    1.0,
    1.0,
    1.0,
    255,
    255,
    255,
    255,
    false,
    false,
    2,
    false,
    0,--'ammo_types',
    0,--'arrow_type_fire',
    false
  )
end

function lerp(a, b, t) return a * (1 - t) + b * t end

Citizen.CreateThread(function()

  while not HasStreamedTextureDictLoaded(texDict) do
    Wait(1)
  end

  while true do
    renderMarker()

    --if
    --  IsPedSprinting(playerPed) or
    --  IsPedRunning(playerPed) or
    --  GetVehiclePedIsIn(playerPed, false) ~= 0 or
    --  IsPlayerFreeAiming(playerId)
    --then
    --  if active then
    --    print('not active')
    --    active = false
    --    exports['ui']:emitUI('threejs.state', { show = false })
    --  end
    --elseif not active then
    --  print('active')
    --  active = true
    --  exports['ui']:emitUI('threejs.state', { show = true })
    --end

    if active then
      local fov = GetGameplayCamFov()
      local cameraCoords = GetGameplayCamCoord()
      local cameraRot = GetGameplayCamRot(3)
      local targetCoords = GetEntityCoords(target, false)
      local targetRot = GetEntityRotation(target, 3)

      --targetCoords = vec3(-312.85, 807.51, 119.03)
      --targetRot = vec3(0, 0, 0)

      local sendData = false

      if
        math.abs(fov - lastFov) > 0.1 or
        #(cameraCoords - lastCamCoords) > 0.001 or
        #(cameraRot - lastCamRot) > 0.001 or
        #(targetCoords - lastTargetCoords) > 0.001 or
        #(targetRot - lastTargetRot) > 0.001
      then
        lastFov = fov
        lastCamCoords = cameraCoords
        lastCamRot = cameraRot
        lastTargetCoords = targetCoords
        lastTargetRot = targetRot
        sendData = true
      end

      if sendData then
        exports['ui']:emitUI('threejs.state', {
          fov = fov,
          cameraPosition = {x=cameraCoords.x, y=cameraCoords.y, z=cameraCoords.z},
          cameraRotation = {x=cameraRot.x, y=cameraRot.y, z=cameraRot.z},
          targetPosition = {x=targetCoords.x, y=targetCoords.y, z=targetCoords.z},
          targetRotation = {x=targetRot.x, y=targetRot.y, z=targetRot.z},
        })
      end

      -- Loop over POIs
      local playerCoords = GetEntityCoords(playerPed, false)
      local onScreenPOIs = {}
      local closest = {
        id = nil,
        poi = nil,
        distance = 9999
      }
      for _, poi in ipairs(POIs) do
        local poiDistance = #(playerCoords - poi.coord)
        if poiDistance < 10 then
          if poiDistance < closest.distance then
            closest.id = poi.id
            closest.poi = {
              id = poi.id,
              screenX = poi.lastScreen.x,
              screenY = poi.lastScreen.y,
              distance = #(playerCoords - poi.coord),
              label = poi.label,
              key = poi.key,
            }
            closest.distance = poiDistance
          end
          local onScreen, screenX, screenY = GetScreenCoordFromWorldCoord(poi.coord.x, poi.coord.y, poi.coord.z)
          --local side, screenX, screenY = GetHudScreenPositionFromWorldPosition(poi.coord.x, poi.coord.y, poi.coord.z)
          --local onScreen = side == false
          local newScreen = vec2(screenX, screenY)
          if #(poi.lastScreen - newScreen) > 0.001 then
            poi.lastScreen = newScreen
          end
          if onScreen then
            renderMarkerAtCoord(poi.coord)
            --DrawSprite(
            --  'ammo_types',
            --  'arrow_type_fire',
            --  screenX,
            --  screenY,
            --  0.02,
            --  0.02,
            --  0.02,
            --  255,
            --  255,
            --  255,
            --  255
            --)
            --table.insert(onScreenPOIs, {
            --  id = poi.id,
            --  screenX = poi.lastScreen.x,
            --  screenY = poi.lastScreen.y,
            --  distance = #(playerCoords - poi.coord),
            --  label = poi.label,
            --  key = poi.key,
            --})
          end
        end

        --table.insert(onScreenPOIs, closest.poi)

        --exports['ui']:emitUI('interact.pois', onScreenPOIs)
        --
        --if closest.id and closest.distance < 2 then
        --  exports['ui']:emitUI('interact.active', closest.id)
        --else
        --  exports['ui']:emitUI('interact.active', nil)
        --end
      end
    end

    Wait(0)
  end
end)

local PAUSE_MENU = GetHashKey('PAUSE_MENU')
RegisterCommand('test_pause', function()
  Citizen.InvokeNative(0xC8FC7F4E4CF4F581, PAUSE_MENU)
  Citizen.InvokeNative(0x04428420A248A354, PAUSE_MENU)
end)
