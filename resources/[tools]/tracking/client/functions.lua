DrawDistance = 10.0
MinTextSize = 0.125
MaxTextSize = 0.25
MinTextAlpha = 128
MaxTextAlpha = 255

local Qualities = {
    'Poor',
    'Good',
    'Perfect'
}

local DoorState = {
    [-1] = 'DOORSTATE_INVALID',
    [0] = 'DOORSTATE_UNLOCKED',
    [1] = 'DOORSTATE_LOCKED_UNBREAKABLE',
    [2] = 'DOORSTATE_LOCKED_BREAKABLE',
    [3] = 'DOORSTATE_HOLD_OPEN_POSITIVE',
    [4] = 'DOORSTATE_HOLD_OPEN_NEGATIVE',
}

local floor = math.floor

function round(num, numDecimalPlaces)
  local mult = 10^(numDecimalPlaces or 0)
  return math.floor(num * mult + 0.5) / mult
end

function DrawEntityInfo(entity)
    if entity == PlayerPedId() then
        return
    end
    local pCoords = GetEntityCoords(PlayerPedId())
    local eCoords = GetEntityCoords(entity)
    local eHeading = GetEntityHeading(entity)
    local eDistance = #(pCoords - eCoords)
    if eDistance >= DrawDistance then
        return
    end
    local str = "ID: " .. tostring(entity)

    local model_hash = GetEntityModel(entity)
    local model_name = GetHashName(model_hash)
    if not model_name  then
        str = str .. " | Model: ~e~" .. tostring(model_hash) .. "~q~\n"
    else
        str = str .. " | Model: " .. tostring(model_hash) .. "\n"
        str = str .. model_name .. "\n"
    end
    str = str .. "Networked: " .. tostring(NetworkGetEntityIsNetworked(entity))
    if NetworkGetEntityIsNetworked(entity) then
        str = str .. " | Network ID: " .. tostring(NetworkGetNetworkIdFromEntity(entity)) .. "\n"
    else
        str = str .. "\n"
    end
    -- 0x569F1E1237508DEB Idle and not Interacting
    -- 0xA911EE21EDF69DAF Is Carrying
    -- Set Model Variation with 0xFFA1594703ED27CA
--     str = str .. "Model Variation: " .. tostring(Citizen.InvokeNative(0xA622E66EEE92A08D, entity)) .. " | "  .. tostring(Citizen.InvokeNative(0x90403E8107B60E81, entity)) .. "\n"
    str = str .. "MetapedType: " .. tostring(Citizen.InvokeNative(0xEC9A1261BF0CE510, entity))
    str = str .. " | PedType: " .. tostring(GetPedType(entity))
    str = str .. " | Pop Type: ".. tostring(GetEntityPopulationType(entity))
    str = str .. " | Wild: ".. tostring(Citizen.InvokeNative(0x3B005FF0538ED2A9, entity)) .. "\n"

    local scenario_hash = Citizen.InvokeNative(0x569F1E1237508DEB, entity) -- _PED_GET_ACTIVE_SCENARIO_HASH
    local scenario_name = GetHashName(scenario_hash)
    if not scenario_name  then
        str = str .. "Scenario: ~e~" .. tostring(scenario_hash) .. "~q~\n"
    else
        str = str .. "Scenario: " .. tostring(scenario_hash) .. " : " .. scenario_name .. "\n"
    end
    str = str .. "Looted: " .. tostring(Citizen.InvokeNative(0x8DE41E9902E85756, entity)) -- Set looted status with 0x6BCF5F3D8FFE988D
    str = str .. " | Being Looted: " .. tostring(Citizen.InvokeNative(0x3AEC4A410ECAF30D, entity)) -- I think this is being looted. Really only seen while skinning not looting People.
    str = str .. " | IsBird: " .. tostring(Citizen.InvokeNative(0xC346A546612C49A9, entity))
    str = str .. "\nInjured: " .. tostring(IsPedInjured(entity))
    str = str .. " | Fatally Injured: " .. tostring(IsPedFatallyInjured(entity))
    str = str .. "\nBurned: " .. tostring(Citizen.InvokeNative(0x37B01666BAE8F7EF, entity))

    local eCarcassQuality = Citizen.InvokeNative(0x88EFFED5FE8B0B4A, entity)
    if not eCarcassQuality then
        eCarcassQuality = 0
    end
    str = str .. " | Carcass Quality: " .. Qualities[eCarcassQuality + 1]

    local pedQuality = Citizen.InvokeNative(0x7BCC6087D130312A, entity) -- Set with 0xCE6B874286D640BB
    str = str .. " | Ped Quality: " .. tostring(pedQuality)
    -- Dont know for what purpose but thats what i got from dec scripts maybe related to rare animals?
    --  2: "PED_QUALITY_HIGH"
    --  1: "PED_QUALITY_MEDIUM"
    --  0: "PED_QUALITY_LOW"
    -- -1: you should interpret as "PED_QUALITY_HIGH"
    local carry_config = Citizen.InvokeNative(0x0FD25587BB306C86, entity)
    if carry_config then
        local carry_config_name = GetHashName(carry_config)
        if carry_config_name then
            str = str .. "\nCarry Config: " .. tostring(carry_config_name)
        else
            str = str .. "\nCarry Config: " .. tostring(carry_config)
        end
    end
--    str = str .. '\nCarry Flags: '
--    for n=0,95 do
--        local flag = Citizen.InvokeNative(0x808077647856DE62, entity, n)
--        if flag then
--            str = str .. tostring(n) .. ','
--        end
--    end
    str = str .. '\nConfig Flags: '
    for n=0,512 do
        local flag = GetPedConfigFlag(entity, n)
        if flag then
            local ending = ','
            if PCF[n] then
                ending = ' [ ' .. PCF[n] .. ' ],'
            end
            str = str .. tostring(n) .. ending
        end
    end
    --str = str .. '\nReset Flags: '
    --for n=0,512 do
    --    local flag = GetPedResetFlag(entity, n)
    --    if flag then
    --        str = str .. tostring(n) .. ','
    --    end
    --end
    str = str .. "\nHas Carried: " .. tostring(Citizen.InvokeNative(0xA911EE21EDF69DAF, entity)) -- Seems to be 1 when an entity has carried items
    local eCarrier = Citizen.InvokeNative(0X79443D56C8DF45EE, entity)
    str = str .. " | Carrier: " .. tostring(eCarrier)
    if eCarrier then
--        str = str .. "Carriable: " .. tostring(Citizen.InvokeNative(0XF0B4F759F35CC7F5, entity, eCarrier, 0, 16))
    end
    -- str = str .. " | Visible: " .. tostring(Citizen.InvokeNative(0xC8CCDB712FBCBA92, entity)) .. "\n"
    -- str = str .. "~m~Prompt Group: " .. tostring(PromptGetGroupIdForTargetEntity(entity)) .. "\n"
    local entityStatus = Citizen.InvokeNative(0x61914209C36EFDDB, entity)
    str = str .. " | Status: " .. GetStatusText((entityStatus or 0) + 1) .. "\n"
--     str = str .. tostring(GetEntityType(entity))
    -- str = str .. " | " .. tostring(Citizen.InvokeNative(0xD21C7418C590BB40, entity)) -- Dead?
    -- str = str .. " | " .. tostring(Citizen.InvokeNative(0x0FD25587BB306C86, entity))
    -- local provision_hash = Citizen.InvokeNative(0x31FEF6A20F00B963, entity) -- Provision Hash ? -- Can be set with 0x399657ED871B3A6C
    -- str = str .. " | " .. tostring(provision_hash)
    -- if HASH_PROVISIONS[provision_hash] then
    --     str = str .. "\n" .. HASH_PROVISIONS[provision_hash]
    -- end
    -- local carriedEntity = Citizen.InvokeNative(0xD806CD2A4F2C2996, entity)
    -- if carriedEntity then
    --     local carriedEntityModel = GetEntityModel(carriedEntity)
    --     local carriedEntityHash = Citizen.InvokeNative(0x31FEF6A20F00B963, carriedEntity)
    --     str = str .. "\nCarrying: id : " .. carriedEntity .. " model: " .. carriedEntityModel .. " | " .. (GetHashName(carriedEntityModel) or "")
    --     if carriedEntityHash then
    --         str = str .. "\nCarrying: " .. carriedEntityHash .. " | " .. (GetHashName(carriedEntityHash) or "")
    --     end
    -- end
    -- str = str .. '\nx: ' .. (Floor(eCoords.x * 100) / 100.0) .. ' y: ' .. (Floor(eCoords.y * 100) / 100.0) .. ' z: ' .. (Floor(eCoords.z * 100) / 100.0) .. ' h: ' .. (Floor(eHeading * 100) / 100.0)
    -- local eRot = GetEntityRotation(entity)
    -- str = str .. '\nRot: x: ' .. (Floor(eRot.x * 100) / 100.0) .. ' y: ' .. (Floor(eRot.y * 100) / 100.0) .. ' z: ' .. (Floor(eRot.z * 100) / 100.0)

    local zOff = 0
    local mount = GetMount(entity)
    if not (mount == 0) then
        zOff = 1
        str = str .. '\nMounted on: ' .. mount
    end
    local vehicle = GetVehiclePedIsIn(entity)
    if not (vehicle == 0) then
        zOff = 1
        local driver = GetPedInVehicleSeat(vehicle, -1)
        if driver == entity then
            str = str .. '\nVehicle driving: ' .. vehicle
        else
            str = str .. '\nVehicle passenger: ' .. vehicle
        end
    end
    str = str .. '\nMood Towards You: '
    for n=0,10 do
        local mood = Citizen.InvokeNative(0x42688E94E96FD9B4, entity, n, PlayerPedId()) or 0
        local s = string.pack('i4', tonumber(mood))
        mood = string.unpack('f', s)
        str = str .. tostring(round(mood, 2)) .. ' | '
    end
    local textSize = lerp(MinTextSize, MaxTextSize, (DrawDistance - eDistance) / DrawDistance)
    local textAlpha = lerp(MinTextAlpha, MaxTextAlpha, (DrawDistance - eDistance) / DrawDistance)
    TxtAtWorldCoord(eCoords.x, eCoords.y, eCoords.z + zOff, str, textSize, 9, textAlpha)
    -- TxtAtWorldCoord(eCoords.x, eCoords.y, eCoords.z + zOff, str, 0.175, 1)
end
function lerp(a,b,t) return a * (1-t) + b * t end

function DrawItemInfo(entity)
    local pCoords = GetEntityCoords(PlayerPedId())
    local eCoords = GetEntityCoords(entity)
    local eHeading = GetEntityHeading(entity)
    local eDistance = #(pCoords - eCoords)
    if eDistance >= DrawDistance then
        return
    end
    local str = "ID: " .. tostring(entity)
    local model_hash = GetEntityModel(entity)
    local model_name = GetHashName(model_hash)
    if not model_name  then
        str = str .. " | Model: ~e~" .. tostring(model_hash) .. "~q~\n"
    else
        str = str .. " | Model: " .. tostring(model_hash) .. "\n"
        str = str .. model_name .. "\n"
    end
    str = str .. "Visible: " .. tostring(Citizen.InvokeNative(0xC8CCDB712FBCBA92, entity)) .. "\n"
    str = str .. "Networked: " .. tostring(NetworkGetEntityIsNetworked(entity))
    if NetworkGetEntityIsNetworked(entity) then
        str = str .. " | Network ID: " .. tostring(NetworkGetNetworkIdFromEntity(entity)) .. "\n"
    else
        str = str .. "\n"
    end
    local carry_config = Citizen.InvokeNative(0x0FD25587BB306C86, entity)
    if carry_config then
        local carry_config_name = GetHashName(carry_config)
        if carry_config_name then
            str = str .. "Carry Config: " .. tostring(carry_config_name)
        else
            str = str .. "Carry Config: " .. tostring(carry_config)
        end
    end
    --str = str .. '\nCarry Flags: '
    --for n=0,95 do
    --    local flag = Citizen.InvokeNative(0x808077647856DE62, entity, n)
    --    if flag then
    --        str = str .. tostring(n) .. ','
    --    end
    --end
    -- str = str .. "~m~Prompt Group: " .. tostring(PromptGetGroupIdForTargetEntity(entity)) .. "\n"
     local entityStatus = Citizen.InvokeNative(0x61914209C36EFDDB, entity)
    str = str .. " | Status: " .. GetStatusText((entityStatus or 0) + 1) .. "\n"
    local inventoryId = DecorGetInt(entity, 'Inventory')
    if inventoryId > 0 then
        str = str .. "Inv: " .. tostring(DecorGetInt(entity, 'Inventory')) .. "\n"
    end
    -- str = str .. tostring(Citizen.InvokeNative(0x97F696ACA466B4E0, entity))
    -- str = str .. " | " .. tostring(Citizen.InvokeNative(0xD21C7418C590BB40, entity)) -- Dead?
    -- str = str .. " | " .. tostring(Citizen.InvokeNative(0x0FD25587BB306C86, entity))
     local provision_hash = Citizen.InvokeNative(0x31FEF6A20F00B963, entity) -- Provision Hash ? -- Can be set with 0x399657ED871B3A6C
     str = str .. " | " .. tostring(provision_hash)
     if HASH_PROVISIONS[provision_hash] then
         str = str .. "\n" .. HASH_PROVISIONS[provision_hash]
     end

    str = str .. "\n" .. "Mission Entity: " ..tostring(Citizen.InvokeNative(0x88AD6CC10D8D35B2, entity))

    local textSize = lerp(MinTextSize, MaxTextSize, (DrawDistance - eDistance) / DrawDistance)
    local textAlpha = lerp(MinTextAlpha, MaxTextAlpha, (DrawDistance - eDistance) / DrawDistance)

    if DOOR_ENTITIES[entity] then
        local doorClosed = 'Open'
        if IsDoorClosed(DOOR_ENTITIES[entity]) then
            doorClosed = 'Closed'
        end
        local minD --[[ vector3 ]], maxD --[[ vector3 ]] = GetModelDimensions(model_hash)
        -- if IsPedOpeningADoor(PlayerPedId()) then
        --     doorClosed = 'Opening'
        -- end
        str = str .. '\nDoor Hash: ' .. tostring(DOOR_ENTITIES[entity])
        str = str .. '\nState: ' .. DoorState[DoorSystemGetDoorState(DOOR_ENTITIES[entity])] .. ' | ' .. doorClosed .. ' : ' .. tostring(DoorSystemGetOpenRatio(DOOR_ENTITIES[entity]))
        str = str .. '\nRotation: ' .. tostring(GetEntityRotation(entity))
        str = str .. '\nHeading: ' .. tostring(GetEntityHeading(entity))
    end
    -- str = str .. "\nClosestObjectOfType: " .. GetClosestObjectOfType(eCoords.x, eCoords.y, eCoords.z, 1.0, model_hash)
    -- local shapeTest = StartShapeTestBox(eCoords.x, eCoords.y, eCoords.z, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, true, 16)
    -- local rtnVal, hit, endCoords, surfaceNormal, entityHit = GetShapeTestResult(shapeTest)
    -- str = str .. "\nShapeTest: " .. entityHit
    -- local eHeading = GetEntityHeading(entity)
    -- str = str .. '\nx: ' .. (Floor(eCoords.x * 100) / 100.0) .. ' y: ' .. (Floor(eCoords.y * 100) / 100.0) .. ' z: ' .. (Floor(eCoords.z * 100) / 100.0) .. ' h: ' .. (Floor(eHeading * 100) / 100.0)
    -- local eRot = GetEntityRotation(entity)
    -- str = str .. '\nRot: x: ' .. (Floor(eRot.x * 100) / 100.0) .. ' y: ' .. (Floor(eRot.y * 100) / 100.0) .. ' z: ' .. (Floor(eRot.z * 100) / 100.0)

    TxtAtWorldCoord(eCoords.x, eCoords.y, eCoords.z, str, textSize, 9, textAlpha)

    -- TxtAtWorldCoord(eCoords.x, eCoords.y, eCoords.z, str, 0.175, 1)
end


function DoorHandleF(entity,x,z)
    local coords = GetOffsetFromEntityInWorldCoords(entity,x,0.0,z/2)
    return coords
end

function DrawFoliageInfo(entity)
    local str = "[256] ID: " .. tostring(entity)
    local model_hash = GetEntityModel(entity)
    local model_name = GetHashName(model_hash)
    if not model_name  then
        str = str .. " | Model: ~e~" .. tostring(model_hash) .. "~q~\n"
    else
        str = str .. " | Model: " .. tostring(model_hash) .. "\n"
        str = str .. model_name .. "\n"
    end
    local eCoords = GetEntityCoords(entity)
    local eHeading = GetEntityHeading(entity)
    -- str = str .. '~m~x: ' .. (Floor(eCoords.x * 100) / 100.0) .. ' y: ' .. (Floor(eCoords.y * 100) / 100.0) .. ' z: ' .. (Floor(eCoords.z * 100) / 100.0) .. ' h: ' .. (Floor(eHeading * 100) / 100.0)
    -- local eRot = GetEntityRotation(entity)
    -- str = str .. '\nRot: x: ' .. (Floor(eRot.x * 100) / 100.0) .. ' y: ' .. (Floor(eRot.y * 100) / 100.0) .. ' z: ' .. (Floor(eRot.z * 100) / 100.0)
    TxtAtWorldCoord(eCoords.x, eCoords.y, eCoords.z, str, 0.175, 1)
end

function DrawVehicleInfo(entity)
    local pCoords = GetEntityCoords(PlayerPedId())
    local eCoords = GetEntityCoords(entity)
    local eHeading = GetEntityHeading(entity)
    local eDistance = #(pCoords - eCoords)
    if eDistance >= DrawDistance then
        return
    end
    local str = "[2] ID: " .. tostring(entity)
    local model_hash = GetEntityModel(entity)
    local model_name = GetHashName(model_hash)
    if not model_name  then
        str = str .. " | Model: ~e~" .. tostring(model_hash) .. "~q~\n"
    else
        str = str .. " | Model: " .. tostring(model_hash) .. "\n"
        str = str .. model_name .. "\n"
    end
    str = str .. "Networked: " .. tostring(NetworkGetEntityIsNetworked(entity))
    if NetworkGetEntityIsNetworked(entity) then
        str = str .. " | Network ID: " .. tostring(NetworkGetNetworkIdFromEntity(entity)) .. "\n"
    else
        str = str .. "\n"
    end
    -- str = str .. "~m~Prompt Group: " .. tostring(PromptGetGroupIdForTargetEntity(entity)) .. "\n"
    -- str = str .. 'x: ' .. (Floor(eCoords.x * 100) / 100.0) .. ' y: ' .. (Floor(eCoords.y * 100) / 100.0) .. ' z: ' .. (Floor(eCoords.z * 100) / 100.0) .. ' h: ' .. (Floor(eHeading * 100) / 100.0)
    -- local eRot = GetEntityRotation(entity)
    -- str = str .. '\nRot: x: ' .. (Floor(eRot.x * 100) / 100.0) .. ' y: ' .. (Floor(eRot.y * 100) / 100.0) .. ' z: ' .. (Floor(eRot.z * 100) / 100.0)

    local textSize = lerp(0.05, 0.25, (DrawDistance - eDistance) / DrawDistance)
    local textAlpha = lerp(MinTextAlpha, MaxTextAlpha, (DrawDistance - eDistance) / DrawDistance)
    TxtAtWorldCoord(eCoords.x, eCoords.y, eCoords.z, str, textSize, 9, textAlpha)
    -- TxtAtWorldCoord(eCoords.x, eCoords.y, eCoords.z, str, 0.175, 1)
end

--[[
RegisterCommand('identify', function(source, args, rawCommand)
    local name = GetHashName(args[1])
    if name then
        print('Name:', name)
    else
        print('Unknown / Not a valid hash')
    end
end)
]]

function GetHashName(hash)
    if HASH_MODELS[hash] then
        return HASH_MODELS[hash]
    end
    if HASH_PEDS[hash] then
        return HASH_PEDS[hash]
    end
    if HASH_PROVISIONS[hash] then
        return HASH_PROVISIONS[hash]
    end
    if HASH_VEHICLES[hash] then
        return HASH_VEHICLES[hash]
    end
    if HASH_CARRIABLE[hash] then
        return HASH_CARRIABLE[hash]
    end
    if HASH_SCENARIOS[hash] then
        return HASH_SCENARIOS[hash]
    end
    if HASH_RAW_MODELS[hash] then
        return HASH_RAW_MODELS[hash]
    end
end

function GetStatusText(status)
    local statusTexts = {
        "CARRIABLE_STATE_NONE", -- 0
        "CARRIABLE_STATE_TRANSITIONING_TO_HOGTIED", -- 1
        "CARRIABLE_STATE_CARRIABLE_INTRO", -- 2
        "CARRIABLE_STATE_CARRIABLE", -- 3
        "CARRIABLE_STATE_BEING_PICKED_UP_FROM_GROUND", -- 4
        "CARRIABLE_STATE_CARRIED_BY_HUMAN", -- 5
        "CARRIABLE_STATE_BEING_PLACED_ON_GROUND", -- 6
        "CARRIABLE_STATE_CARRIED_BY_MOUNT", -- 7
        "CARRIABLE_STATE_BEING_PLACED_ON_MOUNT", -- 8
        "CARRIABLE_STATE_BEING_PICKED_UP_FROM_MOUNT", -- 9
        "CARRIABLE_STATE_BEING_CUT_FREE", -- 10
        "CARRIABLE_STATE_BEING_PLACED_ON_GROUND_ESCAPE", -- 11
        "CARRIABLE_STATE_BEING_PLACED_IN_VEHICLE", -- 12
    }
    if tonumber(status) == nil then
        if status == true then
            status = 1
        else
            status = 0
        end
    end
    if status > 0 and status < 14 then
        return statusTexts[status]
    else
        return status
    end
end

function TxtAtWorldCoord(x, y, z, txt, size, font, alpha)
    alpha = alpha or 255
    local s, sx, sy = GetScreenCoordFromWorldCoord(x, y ,z)
    if (sx > 0 and sx < 1) or (sy > 0 and sy < 1) then
        local s, sx, sy = GetHudScreenPositionFromWorldPosition(x, y, z)
        DrawTxt(txt, sx, sy, size, true, 255, 255, 255, alpha, true, font) -- Font 2 has some symbol conversions ex. @ becomes the rockstar logo
    end
end

function DrawTxt(str, x, y, size, enableShadow, r, g, b, a, centre, font)
    local str = CreateVarString(10, "LITERAL_STRING", str)
    SetTextScale(1, size)
    SetTextColor(math.floor(r), math.floor(g), math.floor(b), math.floor(a))
    SetTextCentre(centre)
    if enableShadow then SetTextDropshadow(1, 0, 0, 0, 255) end
    SetTextFontForCurrentCommand(font)
    DisplayText(str, x, y)
end

--Flags
-- 11 Knocked Out?
-- 12 Aiming? Loses 14 when gaining 12 while aiming.
-- 14 Can Control Ped?
-- 177 When rider on horse?
-- 136 Attached to vehicle?
-- 140 Attached to vehicle?
-- 161 Whistling
-- 250 Burning
-- 286 Patting Horse
-- 292 Hitched/Stationary?
-- 304 Detached from vehicle? Gained after player riding?
-- 332 Stationary/Idle
-- 471 When placing animal on back of horse

-- While Skinning
-- lost 14
-- lost/gain 252 sometimes
-- gain 292

function SpriteAtWorldCoord(x, y, z, f, s, size)
    local w, h = GetScreenResolution()
    local wScale = h / w * 0.75
    local os, sx, sy = GetScreenCoordFromWorldCoord(x, y ,z)
    if (sx > 0 and sx < 1) or (sy > 0 and sy < 1) then
        local onScreen,_x,_y = GetHudScreenPositionFromWorldPosition(x, y, z)
        DrawSprite(f, s, _x, _y + 0.0125, size * wScale, size, 0.0, 255, 255, 255, 190, 0)
    end
end

-- task_animal_interaction
-- Horse
--  -224471938 -- Feed
--  1968415774 -- Brush / Clean
--   554992710 -- Brush / Clean Loop ?
--   391681984 -- Pat ?
--  2042508059 -- Pat ?
-- -1897367196 -- Pat Loop ?
-- -1355254781 -- Stim Shot
