local menuOpen = false
local camera = false

-- Resource Cleanup
AddEventHandler('onResourceStop', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then return end
    DestoryCameras()
    SendNuiMessage(json.encode({ action = 'hide' }))
    SetNuiFocus(false)
end)

function LoadModel(model)
    local attempts = 0
    while attempts < 100 and not HasModelLoaded(model) do
        RequestModel(model)
        Wait(1)
        attempts = attempts + 1
    end
    return IsModelValid(model)
end

function GetHashName(hash)
    if HASH_MODELS[hash] then
        return HASH_MODELS[hash]
    end
    return hash
end

function DrawLine(x1, y1, z1, x2, y2, z2, red, green, blue, alpha)
  Citizen.InvokeNative((`DRAW_LINE` & 0xFFFFFFFF), x1, y1, z1, x2, y2, z2, red, green, blue, alpha)
end

local playerOriginalCoords = false

function CreateCameras()
    Citizen.CreateThread(function()
        camera = CreateCamera(`DEFAULT_SCRIPTED_CAMERA`, false)
        if DoesCamExist(camera) then
            SetCamCoord(camera, GetGameplayCamCoord())
            SetCamRot(camera, GetGameplayCamRot())
            SetCamFov(camera, 70.0)

            print('camera', camera)
            SetCamActive(camera, true)
            RenderScriptCams(true, true, 1000)
            local player = PlayerPedId()
            playerOriginalCoords = GetEntityCoords(player) - vector3(0.0, 0.0, 1.0)
            print(playerOriginalCoords)
            FreezeEntityPosition(player, true)
            SetEntityVisible(player, false)
            SetEntityCoords(player, GetGameplayCamCoord())
        end
    end)
end

function DestoryCameras()
    if DoesCamExist(camera) then
        RenderScriptCams(false, true, 1000)
        Citizen.CreateThread(function()
            Wait(250)
            DestroyCam(camera)
        end)
        local player = PlayerPedId()
        if not IsEntityVisible(player) then
            FreezeEntityPosition(player, false)
            SetEntityVisible(player, true)
            SetEntityCoords(player, playerOriginalCoords.x, playerOriginalCoords.y, playerOriginalCoords.z)
        end
    end
end

RegisterCommand('object_manager', function()
    CreateCameras()

    SendNuiMessage(json.encode({ action = 'show' }))
    menuOpen = true
    SetNuiFocus(true, true)
end)

RegisterNuiCallbackType('close_ui')
AddEventHandler('__cfx_nui:close_ui', function(data, callback)
    menuOpen = false
    SetNuiFocus(false)
    callback({})
    DestoryCameras()
end)

local drawLineToEntity = false

RegisterNuiCallbackType('spawn')
AddEventHandler('__cfx_nui:spawn', function(data, callback)
    --print('data.model', data.model)
    local modelHash
    if data.name then
        modelHash = GetHashKey(data.name)
    else
        modelHash = tonumber(data.hash)
    end

    if not modelHash then
        return
    end
    if IsModelValid(modelHash) and LoadModel(modelHash) then
        local modelHashName = GetHashName(modelHash)
        local player = PlayerPedId()
        local playerCoords = GetEntityCoords(player)
        local entityId = CreateObject(modelHash, playerCoords.x, playerCoords.y, playerCoords.z, true, false, false, true, true)
        if DoesEntityExist(entityId) then
            drawLineToEntity = entityId
            local entityAlpha = GetEntityAlpha(entityId)
            local entityRotation = GetEntityRotation(entityId, 2)
            callback({
                exists = true,
                hash = modelHashName,
                id = entityId,
                alpha = entityAlpha,
                x = playerCoords.x,
                y = playerCoords.y,
                z = playerCoords.z,
                pitch = entityRotation.x,
                roll = entityRotation.y,
                yaw = entityRotation.z,
            })
        else
            drawLineToEntity = false
            callback({ exists = false })
        end
    else
        drawLineToEntity = false
        callback({ exists = false })
    end
end)

RegisterNuiCallbackType('load_entity_info')
AddEventHandler('__cfx_nui:load_entity_info', function(data, callback)
    local entityId = data.id
    if DoesEntityExist(entityId) then
        local modelHash = GetEntityModel(entityId)
        local modelHashName = GetHashName(modelHash)
        drawLineToEntity = entityId
        local entityAlpha = GetEntityAlpha(entityId)
        local entityCoords = GetEntityCoords(entityId, true, true)
        local entityRotation = GetEntityRotation(entityId, 2)
        local camCoords = GetGameplayCamCoord()
        callback({
            exists = true,
            id = entityId,
            hash = modelHashName,
            alpha = entityAlpha,
            x = entityCoords.x,
            y = entityCoords.y,
            z = entityCoords.z,
            pitch = entityRotation.x,
            roll = entityRotation.y,
            yaw = entityRotation.z,
            distance = #(camCoords - entityCoords),
        })
    else
        drawLineToEntity = false
        callback({ exists = false })
    end
end)

RegisterNuiCallbackType('entity_screen_coords')
AddEventHandler('__cfx_nui:entity_screen_coords', function(data, callback)
    local entityId = data.id
    if DoesEntityExist(entityId) then
        local entityCoords = GetEntityCoords(entityId, true, true)
        local s, sX, sY = GetScreenCoordFromWorldCoord(entityCoords.x, entityCoords.y, entityCoords.z)
        callback({
            x = sX,
            y = sY,
        })
    else
        drawLineToEntity = false
        callback({ exists = false })
    end
end)

RegisterNuiCallbackType('edit_entity')
AddEventHandler('__cfx_nui:edit_entity', function(data, callback)
    local entityId = data.id
    if DoesEntityExist(entityId) then
        SetEntityAlpha(entityId, data.alpha, false)
        SetEntityCoords(entityId, data.x * 1.0, data.y * 1.0, data.z * 1.0)
        SetEntityRotation(entityId, data.pitch * 1.0, data.roll * 1.0, data.yaw * 1.0, 0, true)
    end
    callback({})
end)

RegisterNuiCallbackType('ground_object')
AddEventHandler('__cfx_nui:ground_object', function(data, callback)
    local entityId = data.id
    if DoesEntityExist(entityId) then
        PlaceObjectOnGroundProperly(entityId)
        local modelHash = GetEntityModel(entityId)
        local modelHashName = GetHashName(modelHash)
        drawLineToEntity = entityId
        local entityAlpha = GetEntityAlpha(entityId)
        local entityCoords = GetEntityCoords(entityId, true, true)
        local entityRotation = GetEntityRotation(entityId, 2)
        local camCoords = GetGameplayCamCoord()
        callback({
            exists = true,
            id = entityId,
            hash = modelHashName,
            alpha = entityAlpha,
            x = entityCoords.x,
            y = entityCoords.y,
            z = entityCoords.z,
            pitch = entityRotation.x,
            roll = entityRotation.y,
            yaw = entityRotation.z,
            distance = #(camCoords - entityCoords),
        })
    else
        callback({})
    end
end)

RegisterNuiCallbackType('delete_entity')
AddEventHandler('__cfx_nui:delete_entity', function(data, callback)
    local entityId = data.id
    if DoesEntityExist(entityId) then
        SetEntityAsMissionEntity(entityId, true, true)
        DeletePed(entityId)
        DeleteEntity(entityId)
    end
    drawLineToEntity = false
    callback({})
end)

RegisterNuiCallbackType('rotate_camera')
AddEventHandler('__cfx_nui:rotate_camera', function(data, callback)
    --local screenX, screenY = GetScreenResolution()
    local screenX = 2560
    local screenY = 1440
    local xMult = 2 * 360 / screenX
    local yMult = 2 * 360 / screenY
    if camera then
        local cameraRot = GetCamRot(camera)
        cameraRot = cameraRot + vector3(-data.y * yMult, 0.0, -data.x * xMult)
        SetCamRot(camera, cameraRot)
    end
    callback({})
end)

RegisterNuiCallbackType('move_camera')
AddEventHandler('__cfx_nui:move_camera', function(data, callback)
    if camera then
        SetCamCoord(camera, vector3(data.x, data.y, data.z))
        SetEntityCoords(PlayerPedId(), vector3(data.x, data.y, data.z))
    end
    callback({})
end)

Citizen.CreateThread(function()
    while true do
        Wait(0)
        if drawLineToEntity then
            if DoesEntityExist(drawLineToEntity) then
                --local playerCoords = GetEntityCoords(PlayerPedId())
                --local entityCoords = GetEntityCoords(drawLineToEntity)
                --DrawLine(
                --    playerCoords.x, playerCoords.y, playerCoords.z,
                --    entityCoords.x, entityCoords.y, entityCoords.z,
                --    255, 0, 255, 255
                --)
            else
                drawLineToEntity = false
            end
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        Wait(10)
        if not menuOpen then
            Wait(1000)
        end
        local camCoords = GetGameplayCamCoord()
        local camRot = GetGameplayCamRot(1)
        local camFov = GetGameplayCamFov()
        local entity = {}
        if camera and IsCamActive(camera) then
            camCoords = GetCamCoord(camera)
            camRot = GetCamRot(camera, 1)
            camFov = GetCamFov(camera)
        end
        if drawLineToEntity then
            entity.position = GetEntityCoords(drawLineToEntity)
            entity.rotation = GetEntityRotation(drawLineToEntity)
        end
        SendNuiMessage(json.encode({
            action = 'update_positions',
            cam = {
                position = camCoords,
                rotation = camRot,
                fov = camFov,
            },
            entity = entity,
        }))
    end
end)

local abs, sin, cos, rad = math.abs, math.sin, math.cos, math.rad

function rotationToDirection(rotation)
    local z = rad(rotation.z)
    local x = rad(rotation.x)
    local num = abs(cos(x))

    local result = {}
    result.x = -sin(z) * num
    result.y = cos(z) * num
    result.z = sin(x)
    return vector3(result.x, result.y, result.z)
end

function w2s(position)
    local onScreen, _x, _y = GetScreenCoordFromWorldCoord(position.x, position.y, position.z)
    if not onScreen then
        return nil
    end

    local newPos = {}
    newPos.x = (_x - 0.5) * 2
    newPos.y = (_y - 0.5) * 2
    newPos.z = 0
    return newPos
end

function processCoordinates(x, y)
    --local screenX, screenY = GetScreenResolution()
    local screenX = 2560
    local screenY = 1440

    local relativeX = 1 - (x / screenX) * 1.0 * 2
    local relativeY = 1 - (y / screenY) * 1.0 * 2

    if relativeX > 0.0 then
        relativeX = -relativeX;
    else
        relativeX = abs(relativeX) -- PENIS
    end

    if relativeY > 0.0 then
        relativeY = -relativeY
    else
        relativeY = abs(relativeY) -- PENIS
    end

    return { x = relativeX, y = relativeY }
end

function s2w(camPos, relX, relY)
    local camRot = GetGameplayCamRot(0)
    if camera and IsCamActive(camera) then
        camRot = GetCamRot(camera, 0)
    end
    local camForward = rotationToDirection(camRot)
    local rotUp = camRot + vector3(10, 0, 0)
    local rotDown = camRot + vector3(-10, 0, 0)
    local rotLeft = camRot + vector3(0, 0, -10)
    local rotRight = camRot + vector3(0, 0, 10)

    local camRight = rotationToDirection(rotRight) - rotationToDirection(rotLeft)
    local camUp = rotationToDirection(rotUp) - rotationToDirection(rotDown)

    local rollRad = -rad(camRot.y)
    -- print(rollRad)
    local camRightRoll = (camRight * cos(rollRad)) - (camUp * sin(rollRad))
    local camUpRoll = (camRight * sin(rollRad)) + (camUp * cos(rollRad))

    local point3D = camPos + (camForward * 10.0) + camRightRoll + camUpRoll

    local point2D = w2s(point3D)

    if point2D == undefined then
        return camPos + (camForward * 10.0)
    end

    local point3DZero = camPos + (camForward * 10.0)
    local point2DZero = w2s(point3DZero)

    if point2DZero == nil then
        return camPos + (camForward * 10.0)
    end

    local eps = 0.001

    if abs(point2D.x - point2DZero.x) < eps or abs(point2D.y - point2DZero.y) < eps then
        return camPos + (camForward * 10.0)
    end

    local scaleX = (relX - point2DZero.x) / (point2D.x - point2DZero.x)
    local scaleY = (relY - point2DZero.y) / (point2D.y - point2DZero.y)
    local point3Dret = camPos + (camForward * 10.0) + (camRightRoll * scaleX) + (camUpRoll * scaleY)

    return point3Dret
end

 -- Get entity, ground, etc. targeted by mouse position in 3D space.
function screenToWorld(flags, ignore)
    local x, y = GetNuiCursorPosition()

    local absoluteX = x
    local absoluteY = y

    local camPos = GetGameplayCamCoord()
    if camera and IsCamActive(camera) then
        camPos = GetCamCoord(camera)
    end
    local processedCoords = processCoordinates(absoluteX, absoluteY)
    local target = s2w(camPos, processedCoords.x, processedCoords.y)

    local dir = target - camPos
    local from = camPos + (dir * 0.05)
    local to = camPos + (dir * 300)

    local ray = StartShapeTestRay(from.x, from.y, from.z, to.x, to.y, to.z, flags, ignore, 0)
	local a, b, c, d, e = GetShapeTestResult(ray)
    return b, c, e, to
end


-- 1 World - Ground / Walls / Rocks -- 2 Vehicle -- 4 Ped -- 8 Entity
-- 16 Items - Pelts / Buckets / Brooms / Power Poles / Lasso
-- 32 Pickup Weapon? -- 64 Glass - Breakable? -- 128 Water -- 256 Shrubs / Bushes / Small Trees
-- 512 Road / Zone ? - 1024 Horse Ped - 2048 Horse Entity

RegisterNuiCallbackType('select_entity')
AddEventHandler('__cfx_nui:select_entity', function(data, callback)
    local hit, endCoords, entityHit, _ = screenToWorld(16 + 32 + 64 + 256)
    callback({
        hit = hit,
        entity = entityHit
    })
end)

local spawnGhost = false

RegisterNuiCallbackType('start_entity_placement')
AddEventHandler('__cfx_nui:start_entity_placement', function(data, callback)
    print('data.name', data.name)
    print('data.hash', data.hash)
    local modelHash
    if data.name then
        modelHash = GetHashKey(data.name)
    else
        modelHash = tonumber(data.hash)
    end

    print(modelHash)

    if not modelHash then
        return
    end

    if IsModelValid(modelHash) and LoadModel(modelHash) then
        local player = PlayerPedId()
        local playerCoords = GetEntityCoords(player)
        spawnGhost = CreateObject(modelHash, playerCoords.x, playerCoords.y, playerCoords.z, true, false, false, true, true)
        --print('spawnGhost', spawnGhost)
        SetEntityAlpha(spawnGhost, 127)
    end
    callback({
        entity = spawnGhost
    })
end)

Citizen.CreateThread(function()
    while true do
        Wait(0)
        if spawnGhost then
            local hit, endCoords, entityHit, _ = screenToWorld(1 + 16 + 32 + 64 + 256, spawnGhost)
            if hit then
                SetEntityCoords(spawnGhost, endCoords.x, endCoords.y, endCoords.z)
            end
        end
    end
end)

RegisterNuiCallbackType('end_entity_placement')
AddEventHandler('__cfx_nui:end_entity_placement', function(data, callback)
    if data.create then
        SetEntityAlpha(spawnGhost, 255)
        spawnGhost = false
    else
        SetEntityAsMissionEntity(spawnGhost, true, true)
        DeleteEntity(spawnGhost)
        spawnGhost = false
    end
    callback({})
end)

--Citizen.CreateThread(function()
--    while true do
--        Wait(10000)
--        local hit, endCoords, entityHit, _ = screenToWorld(255)
--        local coords = GetEntityCoords(PlayerPedId())
--        DrawLine(
--                coords.x, coords.y, coords.z,
--                endCoords.x, endCoords.y, endCoords.z,
--            255, 255, 255, 255)
--        print(entityHit)
--    end
--end)
