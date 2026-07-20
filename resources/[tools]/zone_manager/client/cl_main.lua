local menuOpen = false
local camera = false
local playerOriginalCoords = false

local PREVIEW_ZONE_NAME = '__zone_manager_preview'

-- SetNuiFocus(true, true) routes keyboard input to the NUI browser, so the
-- game process never sees WASD keypresses while the editor has focus.
-- Movement state is instead reported by the NUI (via keydown/keyup) and
-- forwarded here through the 'move_input' callback.
local MoveState = { w = false, s = false, a = false, d = false, q = false, e = false, sprint = false }

-- Editor state
local points = {}       -- array of { x = , y = , z = }
local minZ = -50.0
local maxZ = 999.0

--
-- Cleanup
--

AddEventHandler('onResourceStop', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then return end
    exports['zones']:Remove(PREVIEW_ZONE_NAME)
    DestroyCameras()
    SendNuiMessage(json.encode({ action = 'hide' }))
    SetNuiFocus(false)
end)

--
-- Camera (same free-fly pattern as object_manager)
--

function CreateCameras()
    Citizen.CreateThread(function()
        camera = CreateCamera(`DEFAULT_SCRIPTED_CAMERA`, false)
        if DoesCamExist(camera) then
            SetCamCoord(camera, GetGameplayCamCoord())
            SetCamRot(camera, GetGameplayCamRot())
            SetCamFov(camera, 70.0)
            SetCamActive(camera, true)
            RenderScriptCams(true, true, 1000)
            local player = PlayerPedId()
            playerOriginalCoords = GetEntityCoords(player) - vector3(0.0, 0.0, 1.0)
            FreezeEntityPosition(player, true)
            SetEntityVisible(player, false)
            SetEntityCoords(player, GetGameplayCamCoord())
        end
    end)
end

function DestroyCameras()
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
            if playerOriginalCoords then
                SetEntityCoords(player, playerOriginalCoords.x, playerOriginalCoords.y, playerOriginalCoords.z)
            end
        end
    end
    camera = false
end

--
-- Raycasting (screen cursor -> world), mirrors object_manager's approach
--

local abs, sin, cos, rad = math.abs, math.sin, math.cos, math.rad

function round2(n)
    return math.floor(n * 100 + 0.5) / 100
end

function rotationToDirection(rotation)
    local z = rad(rotation.z)
    local x = rad(rotation.x)
    local num = abs(cos(x))
    return vector3(-sin(z) * num, cos(z) * num, sin(x))
end

function w2s(position)
    local onScreen, x, y = GetScreenCoordFromWorldCoord(position.x, position.y, position.z)
    if not onScreen then
        return nil
    end
    return { x = (x - 0.5) * 2, y = (y - 0.5) * 2, z = 0 }
end

function processCoordinates(x, y)
    local screenX, screenY = GetCurrentScreenResolution()

    local relativeX = 1 - (x / screenX) * 1.0 * 2
    local relativeY = 1 - (y / screenY) * 1.0 * 2

    if relativeX > 0.0 then relativeX = -relativeX else relativeX = abs(relativeX) end
    if relativeY > 0.0 then relativeY = -relativeY else relativeY = abs(relativeY) end

    return { x = relativeX, y = relativeY }
end

function s2w(camPos, relX, relY)
    local camRot = GetGameplayCamRot(0)
    if camera and IsCamActive(camera) then
        camRot = GetCamRot(camera, 0)
    end
    local camForward = rotationToDirection(camRot)
    local camRight = rotationToDirection(camRot + vector3(0, 0, 10)) - rotationToDirection(camRot + vector3(0, 0, -10))
    local camUp = rotationToDirection(camRot + vector3(10, 0, 0)) - rotationToDirection(camRot + vector3(-10, 0, 0))

    local rollRad = -rad(camRot.y)
    local camRightRoll = (camRight * cos(rollRad)) - (camUp * sin(rollRad))
    local camUpRoll = (camRight * sin(rollRad)) + (camUp * cos(rollRad))

    local point3DZero = camPos + (camForward * 10.0)
    local point2DZero = w2s(point3DZero)
    if point2DZero == nil then
        return point3DZero
    end

    local point3D = camPos + (camForward * 10.0) + camRightRoll + camUpRoll
    local point2D = w2s(point3D)
    if point2D == nil then
        return point3DZero
    end

    local eps = 0.001
    if abs(point2D.x - point2DZero.x) < eps or abs(point2D.y - point2DZero.y) < eps then
        return point3DZero
    end

    local scaleX = (relX - point2DZero.x) / (point2D.x - point2DZero.x)
    local scaleY = (relY - point2DZero.y) / (point2D.y - point2DZero.y)
    return camPos + (camForward * 10.0) + (camRightRoll * scaleX) + (camUpRoll * scaleY)
end

-- Cursor is a free OS-drawn pointer (not locked), so the raycast follows
-- the actual cursor position via the same screen->world conversion object_manager uses.
-- 1 World - Ground / Walls / Rocks
function screenToWorld(flags)
    local x, y = GetNuiCursorPosition()
    local camPos = GetGameplayCamCoord()
    if camera and IsCamActive(camera) then
        camPos = GetCamCoord(camera)
    end
    local processedCoords = processCoordinates(x, y)
    local target = s2w(camPos, processedCoords.x, processedCoords.y)

    local dir = target - camPos
    local from = camPos + (dir * 0.05)
    local to = camPos + (dir * 300)

    local ray = StartShapeTestRay(from.x, from.y, from.z, to.x, to.y, to.z, flags, 0, 0)
    local _, hit, endCoords = GetShapeTestResult(ray)
    return hit, endCoords
end

--
-- Preview zone (live AddPoly rebuild whenever points change)
--

function RefreshPreview()
    exports['zones']:Remove(PREVIEW_ZONE_NAME)
    if #points < 3 then
        return
    end
    local zonePoints = {}
    for _, p in ipairs(points) do
        table.insert(zonePoints, vector2(p.x, p.y))
    end
    exports['zones']:AddPoly(PREVIEW_ZONE_NAME, zonePoints, minZ, maxZ, { debug = true, debugColor = { r = 0, g = 255, b = 100, a = 120 } })
end

local lastCursorHit = nil
local hoveredIndex = nil

function DrawMarkerSphere(x, y, z, radius, r, g, b, a)
    Citizen.InvokeNative(0x2A32FAA57B937173, 0x50638AB9, x, y, z, 0, 0, 0, 0, 0, 0, radius, radius, radius, r, g, b, a, false, false, 0, false, false, false, false)
end

function DrawWorldLabel(x, y, z, text)
    local onScreen, sx, sy = GetScreenCoordFromWorldCoord(x, y, z)
    if not onScreen then
        return
    end
    SetTextScale(0.35, 0.35)
    SetTextFont(0)
    SetTextColour(255, 255, 255, 255)
    SetTextOutline()
    SetTextCentre(true)
    BeginTextCommandDisplayText('STRING')
    AddTextComponentSubstringPlayerName(text)
    EndTextCommandDisplayText(sx, sy)
end

-- Draw a marker sphere at each placed point (yellow, numbered) plus a
-- distinct marker at the current cursor raycast hit (cyan) showing where
-- the next point will land if F is pressed right now.
-- Point markers, labels, and the cursor marker are drawn in separate
-- threads: an uncaught error in one (a FiveM thread that errors stops
-- running permanently) must not be able to silently kill the others.
Citizen.CreateThread(function()
    while true do
        Wait(0)
        if menuOpen then
            for i, p in ipairs(points) do
                if hoveredIndex == i - 1 then
                    DrawMarkerSphere(p.x, p.y, p.z, 0.4, 255, 40, 40, 230)
                else
                    DrawMarkerSphere(p.x, p.y, p.z, 0.3, 255, 255, 0, 200)
                end
            end
        else
            Wait(500)
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        Wait(0)
        if menuOpen then
            for i, p in ipairs(points) do
                DrawWorldLabel(p.x, p.y, p.z + 0.4, tostring(i - 1))
            end
        else
            Wait(500)
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        Wait(0)
        if menuOpen and lastCursorHit then
            DrawMarkerSphere(lastCursorHit.x, lastCursorHit.y, lastCursorHit.z, 0.2, 0, 220, 255, 220)
        else
            Wait(500)
        end
    end
end)

function BuildExport()
    local tsLines = {}
    for _, p in ipairs(points) do
        table.insert(tsLines, string.format('  { x: %.2f, y: %.2f },', p.x, p.y))
    end
    local ts = '[\n' .. table.concat(tsLines, '\n') .. '\n]'

    local luaLines = {}
    for _, p in ipairs(points) do
        table.insert(luaLines, string.format('  vector2(%.2f, %.2f),', p.x, p.y))
    end
    local lua = '{\n' .. table.concat(luaLines, '\n') .. '\n}'

    return {
        ts = ts,
        lua = lua,
        minZ = minZ,
        maxZ = maxZ,
    }
end

--
-- Commands / NUI wiring
--

RegisterCommand('zone_manager', function()
    if menuOpen then return end

    -- Seed the bounds from the player's position once, at open time only.
    -- Moving around or editing the fields afterward must not touch these.
    local playerZ = GetEntityCoords(PlayerPedId(), false).z
    minZ = round2(playerZ - 50.0)
    maxZ = round2(playerZ + 15.0)

    CreateCameras()
    menuOpen = true
    SetNuiFocus(true, true)
    SendNuiMessage(json.encode({ action = 'show', points = points, minZ = minZ, maxZ = maxZ }))
end)

RegisterNuiCallbackType('close_ui')
AddEventHandler('__cfx_nui:close_ui', function(data, callback)
    menuOpen = false
    SetNuiFocus(false)
    DestroyCameras()
    for key in pairs(MoveState) do
        MoveState[key] = false
    end
    callback({})
end)

function AddPointAtCursor()
    local hit, coords = screenToWorld(1)
    if hit then
        table.insert(points, { x = coords.x, y = coords.y, z = coords.z })
        RefreshPreview()
    end
    return hit
end

RegisterNuiCallbackType('add_point')
AddEventHandler('__cfx_nui:add_point', function(data, callback)
    local hit = AddPointAtCursor()
    callback({ ok = hit, points = points })
end)

-- Placement is also triggered by a keypress (forwarded from the NUI, since
-- the cursor must stay over the target — clicking a panel button would move
-- the cursor off the aim point before the click registers).
RegisterNuiCallbackType('place_point_key')
AddEventHandler('__cfx_nui:place_point_key', function(data, callback)
    local hit = AddPointAtCursor()
    SendNuiMessage(json.encode({ action = 'points_updated', points = points }))
    callback({ ok = hit })
end)

RegisterNuiCallbackType('hover_point')
AddEventHandler('__cfx_nui:hover_point', function(data, callback)
    hoveredIndex = data.index
    callback({})
end)

RegisterNuiCallbackType('undo_point')
AddEventHandler('__cfx_nui:undo_point', function(data, callback)
    table.remove(points)
    RefreshPreview()
    callback({ points = points })
end)

RegisterNuiCallbackType('clear_points')
AddEventHandler('__cfx_nui:clear_points', function(data, callback)
    points = {}
    RefreshPreview()
    callback({ points = points })
end)

RegisterNuiCallbackType('delete_point')
AddEventHandler('__cfx_nui:delete_point', function(data, callback)
    local index = tonumber(data.index)
    if index and points[index + 1] then
        table.remove(points, index + 1)
        RefreshPreview()
    end
    callback({ points = points })
end)

RegisterNuiCallbackType('set_bounds')
AddEventHandler('__cfx_nui:set_bounds', function(data, callback)
    minZ = round2(tonumber(data.minZ) or minZ)
    maxZ = round2(tonumber(data.maxZ) or maxZ)
    RefreshPreview()
    callback({ minZ = minZ, maxZ = maxZ })
end)

RegisterNuiCallbackType('get_export')
AddEventHandler('__cfx_nui:get_export', function(data, callback)
    callback(BuildExport())
end)

RegisterNuiCallbackType('rotate_camera')
AddEventHandler('__cfx_nui:rotate_camera', function(data, callback)
    local screenX, screenY = GetCurrentScreenResolution()
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

RegisterNuiCallbackType('move_input')
AddEventHandler('__cfx_nui:move_input', function(data, callback)
    local key = data.key
    if key and MoveState[key] ~= nil then
        MoveState[key] = data.pressed and true or false
    end
    callback({})
end)

--
-- Free-cam movement (WASD + Q/E, Shift to speed up)
--

local CAM_SPEED = 0.15
local CAM_SPEED_FAST = 0.6

Citizen.CreateThread(function()
    while true do
        Wait(0)
        if menuOpen and camera and IsCamActive(camera) then
            local speed = MoveState.sprint and CAM_SPEED_FAST or CAM_SPEED

            local camRot = GetCamRot(camera, 2)
            local forward = rotationToDirection(camRot)
            local right = rotationToDirection(camRot + vector3(0, 0, 90))
            local up = vector3(0.0, 0.0, 1.0)

            local move = vector3(0.0, 0.0, 0.0)
            if MoveState.w then move = move + forward end
            if MoveState.s then move = move - forward end
            if MoveState.a then move = move + right end
            if MoveState.d then move = move - right end
            if MoveState.q then move = move - up end
            if MoveState.e then move = move + up end

            local moveLength = #move
            if moveLength > 0.0 then
                local camCoords = GetCamCoord(camera)
                local newCoords = camCoords + ((move / moveLength) * speed)
                SetCamCoord(camera, newCoords)
                SetEntityCoords(PlayerPedId(), newCoords)
            end
        end
    end
end)

--
-- Live cursor world-hit feed for the vertex-preview marker in NUI
--

Citizen.CreateThread(function()
    while true do
        Wait(50)
        if not menuOpen then
            Wait(500)
        else
            local hit, cursorCoords = screenToWorld(1)
            lastCursorHit = hit and { x = cursorCoords.x, y = cursorCoords.y, z = cursorCoords.z } or nil

            SendNuiMessage(json.encode({
                action = 'update_positions',
                cursor = lastCursorHit,
                pointCount = #points,
            }))
        end
    end
end)
