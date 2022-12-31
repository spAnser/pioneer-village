local pi, sin, cos, abs, rad, mathRandom, mathMin, floor = math.pi, math.sin, math.cos, math.abs, math.rad, math.random, math.min, math.floor

local playerPed = PlayerPedId()
local lastGameTime = GetGameTimer()
local lastRagdollTime = lastGameTime

local targetAlcoholContent = 0.0
local currentAlcoholContent = 0.0

local targetAdjustmentPerSecond = 1.0 / (60 * 30) -- 1.0 over 30 minutes
local currentAdjustmentPerSecond = 1.0 / (60 * 1.5) -- 1.0 over 1.5 minutes

local CAC = 'CUR_ALC_CNT'
local TAC = 'TAR_ALC_CNT'
local USE_TIME = 'SLN_USE_TIME'
local SLN_RAGDOLL = 'SLN_DRUNK_RAGDOLL'

local drunkFxStrength = 0.0

function lerp(a,b,t) return a * (1-t) + b * t end
function round(num, numDecimalPlaces)
  local mult = 10^(numDecimalPlaces or 0)
  return math.floor(num * mult + 0.5) / mult
end

function DrawTxt(str, x, y, size, enableShadow, r, g, b, a, centre, font)
    local str = CreateVarString(10, "LITERAL_STRING", str)
    SetTextScale(1, size)
    SetTextColor(floor(r), floor(g), floor(b), floor(a))
    SetTextCentre(centre)
    if enableShadow then SetTextDropshadow(1, 0, 0, 0, 255) end
    SetTextFontForCurrentCommand(font)
    DisplayText(str, x, y)
end

Citizen.CreateThread(function()
    while true do
        Wait(1000)

        local delta = (GetGameTimer() - lastGameTime) / 1000
        lastGameTime = GetGameTimer()

       --local targetAlcoholContent = DecorGetFloat(playerPed, TAC)

        if not targetAlcoholContent then
            targetAlcoholContent = 0.0
        end

        if targetAlcoholContent > 0.0 then
            targetAlcoholContent = targetAlcoholContent - targetAdjustmentPerSecond
        else
            targetAlcoholContent = 0.0
        end

        --local currentAlcoholContent = DecorGetFloat(playerPed, CAC)

        if currentAlcoholContent ~= targetAlcoholContent then
            if currentAlcoholContent > targetAlcoholContent then
                currentAlcoholContent = currentAlcoholContent - currentAdjustmentPerSecond * delta
                currentAlcoholContent = math.max(currentAlcoholContent, targetAlcoholContent)
            else
                currentAlcoholContent = currentAlcoholContent + currentAdjustmentPerSecond * delta
                currentAlcoholContent = math.min(currentAlcoholContent, targetAlcoholContent)
            end

            TriggerEvent('saloon::client::alcohol-content', currentAlcoholContent, targetAlcoholContent)
        end

        if currentAlcoholContent > 0.0 then
            walkModified = true
            Citizen.InvokeNative(0x406CCF555B04FAD3, playerPed, 1, currentAlcoholContent)
            if not IsGameplayCamShaking() then
                ShakeGameplayCam('DRUNK_SHAKE', 1.0)
            end
            if not AnimpostfxIsRunning('PlayerDrunk01') then
                Citizen.InvokeNative(0x5199405EABFBD7F0, 'PlayerDrunk01') -- GRAPHICS::ANIMPOSTFX_*
                AnimpostfxPlay('PlayerDrunk01')
                Citizen.InvokeNative(0x37D7BDBA89F13959, 'PlayerDrunk01')
            end
            if currentAlcoholContent > 0.6 and not IsPedRagdoll(playerPed) and lastGameTime - lastRagdollTime > lerp(60000, 20000, currentAlcoholContent) then
                if mathRandom() < lerp(0.01, 0.15, currentAlcoholContent) then
                    DecorSetInt(playerPed, SLN_RAGDOLL, 1)
                    SetPedToRagdoll(playerPed, 7500, 7500, 0, false, true, false)
                    Citizen.CreateThread(function()
                        Wait(7500)
                        DecorSetInt(playerPed, SLN_RAGDOLL, 0)
                        lastRagdollTime = lastGameTime
                    end)
                    --AnimpostfxPlay('PlayerDrunk01_PassOut')
                    AnimpostfxPlay('CamTransitionBlink')
                end
            end
            local newDrunkFxStrength = math.max(0.0001, round(currentAlcoholContent / 2, 4))
            if newDrunkFxStrength ~= drunkFxStrength then
                SetGameplayCamShakeAmplitude(newDrunkFxStrength)
                Citizen.InvokeNative(0xCAB4DD2D5B2B7246, 'PlayerDrunk01', newDrunkFxStrength)
                drunkFxStrength = newDrunkFxStrength
            end
        elseif targetAlcoholContent == 0.0 then
            currentAlcoholContent = 0.0
            -- NOT DRUNK
            Citizen.InvokeNative(0x406CCF555B04FAD3, playerPed, 0, currentAlcoholContent)
            if IsGameplayCamShaking() then
                Citizen.InvokeNative(0x4285804FD65D8066, 'DRUNK_SHAKE', 0)
            end
            if AnimpostfxIsRunning('PlayerDrunk01') then
                AnimpostfxStop('PlayerDrunk01')
                drunkFxStrength = 0.0
            end
        end
    end
end)

AddEventHandler('saloon::client::add-to-alcohol-content', function(alcoholContent)
    targetAlcoholContent = targetAlcoholContent + alcoholContent
end)
