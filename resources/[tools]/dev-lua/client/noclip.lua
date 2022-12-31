local keys = {
    delete = GetHashKey('INPUT_CREATOR_DELETE'),
    lookLR = GetHashKey('INPUT_LOOK_LR'),
    lookUD = GetHashKey('INPUT_LOOK_UD'),
    w = GetHashKey('INPUT_MOVE_UP_ONLY'),
    a = GetHashKey('INPUT_MOVE_LEFT_ONLY'),
    s = GetHashKey('INPUT_MOVE_DOWN_ONLY'),
    d = GetHashKey('INPUT_MOVE_RIGHT_ONLY'),
    q = GetHashKey('INPUT_COVER'),
    e = GetHashKey('INPUT_CONTEXT_Y'),
    shift = GetHashKey('INPUT_SPRINT'),
    alt = GetHashKey('INPUT_HUD_SPECIAL'),
    ctrl = GetHashKey('INPUT_CREATOR_LS'),
}

camera = nil
noclip = false

local x = 0
local y= 0
local z = 0
local pitch = 0
local roll = 0
local yaw = 0
local fov = nil
local speed = 0.5

function NoClipFnc(playerPed)

    local mouseX = GetControlNormal(0, keys.lookLR)
    local mouseY = GetControlNormal(0, keys.lookUD)

    if mouseX then
        yaw = yaw + mouseX * -7.5
    end

    if mouseY then
        pitch = pitch + mouseY * -7.5
    end

    -- Determine change in forward/backward movement
    local r1 = -yaw * math.pi / 180
    local dx1 = speed * math.sin(r1)
    local dy1 = speed * math.cos(r1)

    -- Determine change in left/right movement
    local r2 = math.floor(yaw + 90.0) % 360 * -1.0 * math.pi / 180
    local dx2 = speed * math.sin(r2)
    local dy2 = speed * math.cos(r2)

    -- Determine Change in up/down movement
    local r3 = pitch * math.pi / 180
    local dz1 = speed * math.sin(r3)

    if IsDisabledControlPressed(0, keys.alt) and IsDisabledControlPressed(0, keys.shift) then
        speed = 15.0
    elseif IsDisabledControlPressed(0, keys.alt) then
        speed = 5.0
    elseif IsDisabledControlPressed(0, keys.shift) then
        speed = 1.0
    elseif IsDisabledControlPressed(0, keys.ctrl) then
        speed = 0.1
    else
        speed = 0.5
    end

    if IsDisabledControlPressed(0, keys.w) then
        x = x + dx1
        y = y + dy1
        z = z + dz1
    elseif IsDisabledControlPressed(0, keys.s) then
        x = x - dx1
        y = y - dy1
        z = z - dz1
    end

    if IsDisabledControlPressed(0, keys.a) then
        x = x + dx2
        y = y + dy2
    elseif IsDisabledControlPressed(0, keys.d) then
        x = x - dx2
        y = y - dy2
    end

    if (IsDisabledControlPressed(0, keys.q)) then
        z = z - speed * 0.75
    elseif (IsDisabledControlPressed(0, keys.e)) then
        z = z + speed * 0.75
    end

    SetEntityCoords(playerPed, x, y, z)
    SetCamRot(camera, pitch, roll, yaw, 2)
    --SetCamFov(camera, fov)

end

function StartNoClip(ped)
    --print('NoClip Start')

    x, y, z = table.unpack(GetGameplayCamCoord())
    pitch, roll, yaw = table.unpack(GetGameplayCamRot(2))
    fov = GetGameplayCamFov()

    FreezeEntityPosition(ped, true)
    camera = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)
    print('NoClip Cam ' .. tostring(camera))

    SetEntityCoords(ped, x, y, z)
    SetCamRot(camera, pitch, roll, yaw, 2)
    SetCamFov(camera, fov)

    AttachCamToEntity(camera, ped, 0.0, 0.0, 0.0, true)

    SetEntityVisible(ped, false)

    RenderScriptCams(true, true, 500, true, true)
end

function EndNoClip(ped)
    --print('NoClip End')
    FreezeEntityPosition(ped, false)
    DestroyCam(camera)
    DetachEntity(ped, false, false)
    SetEntityVisible(ped, true)

    local height = GetEntityHeightAboveGround(ped)
    if height < 15 then
        local xf = GetOffsetFromEntityInWorldCoords(ped,0.0,0.0, 0.0 - height)
        SetEntityCoords(ped, xf.x, xf.y, xf.z)
    end

    DisableControlAction(0, `INPUT_HORSE_EXIT`, false)
    DisableControlAction(0, `INPUT_VEH_EXIT`, false)
end

function NoClipCheck(ped)

    if IsControlJustReleased(0, keys.delete) then
        noclip = not noclip

        if noclip then
            StartNoClip(ped)
        else
            EndNoClip(ped)
        end

    end

end


AddEventHandler("onResourceStop", function()
    FreezeEntityPosition(PlayerPedId(), false)
    DestroyCam(camera)
end)

