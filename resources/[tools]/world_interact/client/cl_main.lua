local activePrompt = true

-- Resource Cleanup
AddEventHandler('onResourceStop', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then return end
end)

local abs, sin, cos, rad = math.abs, math.sin, math.cos, math.rad

local lastCamCoords = vector3(0.0, 0.0, 0.0)
local lastCamRot = vector3(0.0, 0.0, 0.0)
local lastCamFov = 0

local pos = vector3(-282.62, 784.4, 119.5)
local shown = false

local sentPos = false

Citizen.CreateThread(function()
    while true do
        Wait(15)
        if not activePrompt then
            Wait(1000)
        end
        local camCoords = GetGameplayCamCoord()
        local camRot = GetGameplayCamRot(1)
        local camFov = GetGameplayCamFov()
        local distance = #(camCoords - pos)
        if distance < 10 and shown == false then
            shown = true
            SendNuiMessage(json.encode({ action = 'show' }))
        elseif distance > 10 and shown == true then
            shown = false
            SendNuiMessage(json.encode({ action = 'hide' }))
        end
        if shown then
            local cam = {}
            if #(lastCamRot - camRot) > 0.01 or #(lastCamCoords - camCoords) > 0.01 then
                cam.rotation = camRot
                cam.position = camCoords
            end
            if abs(lastCamFov - camFov) > 1 then
                cam.fov = camFov
            end
            if cam.rotation or cam.position or cam.fov then
                lastCamCoords = camCoords
                lastCamRot = camRot
                lastCamFov = camFov
                SendNuiMessage(json.encode({
                    action = 'update_camera',
                    cam = cam,
                }))
            end
        end
        --pos = GetEntityCoords(651782)
        --local doorRot = GetEntityRotation(651782) + vector3(0.0, 0.0, 90.0)
        ----local doorCoord = pos + vector3(0.95 , 0.95, 0.85) * (vector3(1.0, -1.0, 0.0) - GetEntityForwardVector(527878))
        --SendNuiMessage(json.encode({
        --    action = 'update_door',
        --    coord = pos,
        --    rot = doorRot
        --}))
        pos = GetEntityCoords(129794)
        local doorRot = GetEntityRotation(129794)
        --local doorRot = GetEntityRotation(8492291) + vector3(-90.0, 0.0, 0.0)
        --local doorCoord = pos + vector3(0.95 , 0.95, 0.85) * (vector3(1.0, -1.0, 0.0) - GetEntityForwardVector(527878))
        SendNuiMessage(json.encode({
            action = 'update_door',
            coord = pos,
            rot = doorRot
        }))
    end
end)
