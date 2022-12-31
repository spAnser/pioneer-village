local playerPed = PlayerPedId()
local stamina = 100
local isOnFoot = true
local isRagdolling = false
local ragdollStart
local ragdollLastDamagedBone
local ragdollMaxZ
local ragdollLastZ = 0
local ragdollDidDamage = false
local canRagdollWithKey = true

local desiredMaxBlendRatio = 3.0
local boneSpeedLimit = 3.0
local warmthSpeedLimit = 3.0

local InvokeNative = Citizen.InvokeNative

local InputJump = GetHashKey('INPUT_JUMP')
local InputSniperZoomInOnly = GetHashKey('INPUT_SNIPER_ZOOM_IN_ONLY')
local InputSniperZoomOutOnly = GetHashKey('INPUT_SNIPER_ZOOM_OUT_ONLY')
local InputFrontendRs = GetHashKey('INPUT_FRONTEND_RS')

local min, max, ceil, abs = math.min, math.max, math.ceil, math.abs

function clamp(value, min, max)
    if value < min then
        return min
    elseif value > max then
        return max
    else
        return value
    end
end

function lerp(a, b, t) return a * (1 - t) + b * t end

AddEventHandler('health:client:boneSpeedLimit', function(limit)
    boneSpeedLimit = limit
end)

AddEventHandler('health:client:warmthSpeedLimit', function(limit)
    warmthSpeedLimit = limit
end)

local horseSpeed = 0

local lastStamina = 100
local lastHorseSpeed = 0

Citizen.CreateThread(function()
    while true do
        Wait(1000)
        playerPed = PlayerPedId()
        isOnFoot = IsPedOnFoot(playerPed)

        horseSpeed = 0
        if IsPedOnMount(playerPed) then
            horseSpeed = GetPedDesiredMoveBlendRatio(GetMount(PlayerPedId()));
        end

        if lastStamina ~= stamina or lastHorseSpeed ~= horseSpeed then
            exports['ui']:emitUI('hud.state', {
                stamina = stamina,
                horseSpeed = clamp((horseSpeed / 3) * 100, 0, 100),
            })
            lastStamina = stamina
            lastHorseSpeed = horseSpeed
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        Wait(0)

        --------------------
        -- Ragdoll Damage --
        --------------------
        local isRagdollThisTick = IsPedRagdoll(playerPed)

        if not isRagdolling and isRagdollThisTick then
            -- Init Ragdoll Start
            ragdollStart = GetGameTimer()
            ragdollDidDamage = false
            local hasDamagedBone, damagedBoneId = GetPedLastDamageBone(playerPed)
            if hasDamagedBone then
                ragdollLastDamagedBone = damagedBoneId
            end
            local coords = GetEntityCoords(playerPed)
            --print('Start Z: ' .. tostring(coords.z))
            ragdollMaxZ = coords.z
            ragdollLastZ = coords.z
            isRagdolling = true
        elseif ragdollStart then
            -- Ragdoll is running
            local coords = GetEntityCoords(playerPed)
            ragdollMaxZ = max(ragdollMaxZ or -500, coords.z)
            if isRagdollThisTick then
                ragdollLastZ = max(ragdollLastZ or -500, coords.z)
                local hasDamagedBone, damagedBoneId = GetPedLastDamageBone(playerPed)
                if hasDamagedBone and ragdollLastDamagedBone ~= damagedBoneId then
                    ragdollLastDamagedBone = damagedBoneId
                    -- TODO: Use max velocity to increase damage
                    local fallHeight = abs(ragdollLastZ - coords.z)
                    if (fallHeight > 4.0) then
                        ragdollDidDamage = true
                        TriggerEvent('health:client:trigger-fall-damage', fallHeight, damagedBoneId)
                        ragdollLastZ = coords.z
                    end
                end
            elseif isRagdolling then
                if not ragdollDidDamage then
                    --print('Ragdoll ended and no damage occurred')
                end
                local fallHeight = abs(ragdollLastZ - coords.z)
                if fallHeight > 4.0 then
                    local _, damagedBoneId = GetPedLastDamageBone(playerPed)
                    damagedBoneId = damagedBoneId or 694201337 -- 694201337 is perform random bone
                    ragdollDidDamage = true
                    TriggerEvent('health:client:trigger-fall-damage', fallHeight, damagedBoneId)
                    ragdollLastZ = coords.z
                end
                -- End Fall
                ragdollStart = undefined
                isRagdolling = false
                ragdollLastDamagedBone = undefined
            end
        end

        ------------------------
        --  Stamina Handler  --
        --        and        --
        -- MoveSpeed Limiter --
        ------------------------
        if isOnFoot then
            local currentMoveBlend = GetPedDesiredMoveBlendRatio(playerPed)
            local isCarryingSomething = InvokeNative(0xA911EE21EDF69DAF, playerPed)
            if IsPedJumping(playerPed) then
                stamina = clamp(stamina - lerp(0.05, 0.25, currentMoveBlend / 3.0), 0, 100)
            end
            if currentMoveBlend >= 2.0 or (isCarryingSomething and currentMoveBlend >= 1.0) then
                local lerpTo = 0.025
                if isCarryingSomething then
                    lerpTo = 0.05
                end
                stamina = clamp(
                  stamina - lerp(0.0, lerpTo, currentMoveBlend / 3.0),
                  0,
                  100
                )
                -- InvokeNative(0xC6258F41D86676E0, playerPed, 1, stamina) -- _SET_ATTRIBUTE_CORE_VALUE
            elseif stamina < 100 and not isRagdollThisTick then
                local lerpTo = 0.05
                if isCarryingSomething then
                    lerpTo = 0.025
                end
                stamina = clamp(
                  stamina + lerp(lerpTo, 0.0, currentMoveBlend / 1.5),
                  0,
                  100
                )
                -- InvokeNative(0xC6258F41D86676E0, playerPed, 1, stamina) -- _SET_ATTRIBUTE_CORE_VALUE
            end
            local maxMoveBlendRatio = min(lerp(1.0, 5.0, stamina / 100.0), desiredMaxBlendRatio)

            if stamina < 10 then
                DisableControlAction(0, InputJump, true)
            else
                EnableControlAction(0, InputJump, true)
            end

            if IsControlPressed(0, InputSniperZoomInOnly) and desiredMaxBlendRatio < 3.0 then
                desiredMaxBlendRatio = desiredMaxBlendRatio + 0.25
                exports['ui']:emitUI('hud.state', { moveSpeed = (desiredMaxBlendRatio / 3.0) * 100 })
            elseif IsControlPressed(0, InputSniperZoomOutOnly) and desiredMaxBlendRatio > 0.25 then
                desiredMaxBlendRatio = desiredMaxBlendRatio - 0.25
                exports['ui']:emitUI('hud.state', { moveSpeed = (desiredMaxBlendRatio / 3.0) * 100 })
            end

            local maxSpeed = min(warmthSpeedLimit, boneSpeedLimit, maxMoveBlendRatio, 3.0) * 1.0
            if maxSpeed < 3.0 then
                SetPedMaxMoveBlendRatio(playerPed, maxSpeed)
            end
        elseif stamina < 100 then
            stamina = clamp(stamina + 0.025, 0, 100)
            -- InvokeNative(0xC6258F41D86676E0, playerPed, 1, stamina) -- _SET_ATTRIBUTE_CORE_VALUE
        end

        ---------------------
        -- Ragdoll Keybind --
        ---------------------
        if not isRagdolling then
            local ragdollKeyDown = IsControlPressed(0, InputFrontendRs)
            if ragdollKeyDown and canRagdollWithKey then
                --print('Ragdoll Key Pressed')
                SetPedToRagdoll(playerPed, 3000, 3000)
                canRagdollWithKey = false
            elseif not ragdollKeyDown and not canRagdollWithKey then
                canRagdollWithKey = true
            end
        end
    end
end)
