DEBUG = false

local CAC = 'CUR_ALC_CNT'
local TAC = 'TAR_ALC_CNT'
local USE_TIME = 'SLN_USE_TIME'
local SLN_RAGDOLL = 'SLN_DRUNK_RAGDOLL'

local openMenuPrompt = false
local openMenuPromptName = 'saloon:open_menu'

local bartendingMenuPrompt = false
local bartendingMenuPromptName = 'saloon:bartending_menu'
local servePrompt = false
local servePromptName = 'saloon:serve'

local storePrompt = false
local storePromptName = 'saloon:store'

local restockNutsPrompt = false
local restockNutsPromptName = 'saloon:restock_nuts'

local pickupPrompts = {}
local pickupPromptNames = {}
local pickupPromptEntities = {}

local promptPoolSize = 6

local initialized = false

local pi, sin, cos, abs, rad, mathRandom, mathMin, floor = math.pi, math.sin, math.cos, math.abs, math.rad, math.random, math.min, math.floor

local player = PlayerPedId()
local keys = {
    E = 0xCEFD9220, -- E
    R = 0xE30CD707, -- R
    F = 0xB2F377E8, -- F
    SHIFT = 0x8FFC75D6, -- SHIFT
}

PROMPT = exports.prompt.PROMPT()

function initPrompts()
    CreateThread(function()
        Citizen.Wait(1000 + mathRandom() * 4000) -- Without waiting at least 1000 the game will hang if you restart prompt.
        openMenuPrompt = PROMPT.register('createHold', openMenuPromptName, keys.E, 'View') -- E

        bartendingMenuPrompt = PROMPT.register('createHold', bartendingMenuPromptName, keys.E, 'Menu') -- E
        servePrompt = PROMPT.register('createHold', servePromptName, keys.E, 'Serve') -- E
        storePrompt = PROMPT.register('createHold', storePromptName, keys.R, 'Store') -- R

        restockNutsPrompt = PROMPT.register('createHold', restockNutsPromptName, keys.E, 'Restock') -- E
        --print('restockNutsPrompt ', restockNutsPrompt)
        for n = 1,promptPoolSize do
            pickupPromptNames[n] = 'saloon:pickup:' .. tostring(n)
            pickupPrompts[n] = PROMPT.register('createHold', pickupPromptNames[n], keys.R, 'Pickup')
            --print('pickupPrompt ' .. tostring(n), pickupPrompts[n])
        end
        initialized = true
    end)
end

if PROMPT then
    initPrompts()
end

-- Resource Setup
AddEventHandler('onResourceStart', function(resourceName)
    if resourceName == 'prompt' then
        PROMPT = exports.prompt.PROMPT()
        initPrompts()
    end
end)

local menuItems = {}
for _,item in pairs(ITEMS) do
    if item.menu_section then
        if menuItems[item.menu_section] == nil then
            menuItems[item.menu_section] = {
                label = item.menu_section,
                categories = {},
            }
        end
        if menuItems[item.menu_section].categories[item.menu_category] == nil then
            if item.menu_category == 'FOOTER' then
            menuItems[item.menu_section].categories[item.menu_category] = {
                type = 'footer',
                items = {},
            }
            else
                menuItems[item.menu_section].categories[item.menu_category] = {
                    type = 'section',
                    label = item.menu_category,
                    items = {},
                }
            end
        end
        if item.identifier and item.name then
            table.insert(menuItems[item.menu_section].categories[item.menu_category].items, {
                identifier = item.identifier,
                label = item.name,
                price = item.menu_price or 0.0,
            })
        end
    end
end

-- WORLD_HUMAN_BARTENDER_CLEAN_GLASS

local ghostItem = false
--P_BOTTLEABSINTHE01X
--P_BOTTLEBEER01A_1
--P_BOTTLEBEER01A_2
--P_BOTTLEBEER01A_3
--P_BOTTLEBEER01A
--P_BOTTLEBEER01X
--P_BOTTLEBEER02X
--P_BOTTLEBEER03X
--P_BOTTLEBEER04X
--P_BOTTLEBRANDY01X
--P_BOTTLEBRANDY02X
--P_BOTTLECASTOR01X
--P_BOTTLECHAMPAGNE01X
--P_BOTTLECOGNAC01X
--P_BOTTLECONKLIN01X
--P_BOTTLECORDIAL01X
--P_BOTTLETEQUILA01X
--P_BOTTLETEQUILA02X
--P_BOTTLETEQUILAFULL02X
--P_BOTTLETEQUILAFULL_CS01X
--P_BOTTLETOOTHPWDR01X
--P_BOTTLEWINE01X
--P_BOTTLEWINE02X
--P_BOTTLEWINE03X
--P_BOTTLEWINE04X

NUTBOWL_MODEL = GetHashKey('P_NUTBOWL01X')

-- Resource Cleanup
AddEventHandler('onResourceStop', function(resourceName)
    if resourceName == 'prompt' then
        for n = 1,promptPoolSize do
            pickupPrompts[n] = false
        end
    elseif (GetCurrentResourceName() ~= resourceName) then return end
    SendNuiMessage(json.encode({ action = 'hide' }))
    SetNuiFocus(false)
    if ghostItem then
        SetEntityAsMissionEntity(ghostItem, true, true)
        DeleteEntity(ghostItem)
        print('Deleted Bottle:', ghostItem)
    end
end)

for k, item in pairs(ITEMS) do
    _SALOON.items[GetHashKey(item.identifier)] = item
end

DecorRegister(CAC, 1)
DecorRegister(TAC, 1)
DecorRegister(USE_TIME, 3)
DecorRegister(SLN_RAGDOLL, 3)

DecorSetFloat(player, TAC, 0.0)
DecorSetFloat(player, CAC, 0.0)

AddEventHandler('saloon:client:bottle', function(itemHash, slotId, inventoryId, itemId)
    print('saloon:client:bottle')
    print(slotId, itemHash)
    local interactionEntity = Citizen.InvokeNative(0x5a0100ea714db68, player)
    if not interactionEntity then
        local item = _SALOON.items[itemHash]
        player = PlayerPedId()
        local coords = GetEntityCoords(player)
        local bottle = CreateObject(item.model, coords.x, coords.y, coords.z, true, false, false, true, true)

        local propId = GetHashKey('P_BOTTLEBEER01X_PH_R_HAND')
        local itemInteractionState = GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_UNCORK')

        if item.food_type == 'BOTTLE_LARGE' then
            propId = GetHashKey('P_BOTTLEJD01X_PH_R_HAND')
            itemInteractionState = GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_UNCORK')
        end

        TaskItemInteraction_2(player, GetHashKey('CONSUMABLE_SALOON_BEER'), bottle, propId, itemInteractionState, 1, 0, -1.0)
        TriggerServerEvent('saloon:server:remove_item', inventoryId, itemId, slotId)
    end
end)

AddEventHandler('saloon:client:glass', function(itemHash, slotId, inventoryId, itemId)
    print('saloon:client:glass')
    print(slotId, itemHash)
    local interactionEntity = Citizen.InvokeNative(0x5a0100ea714db68, player)
    if not interactionEntity then
        local item = _SALOON.items[itemHash]
        player = PlayerPedId()
        local coords = GetEntityCoords(player)
        local glass = CreateObject(item.model, coords.x, coords.y, coords.z, true, false, false, true, true)
        TaskItemInteraction_2(player, GetHashKey('CONSUMABLE_WHISKEY'), glass, GetHashKey('P_GLASS001X_PH_R_HAND'), GetHashKey('DRINK_CHAMPAGNE_HOLD'), 1, 0, -1.0)
        TriggerServerEvent('saloon:server:remove_item', inventoryId, itemId, slotId)
    end
end)

AddEventHandler('saloon:client:coffee', function(itemHash, slotId, inventoryId, itemId)
    print('saloon:client:coffee')
    print(slotId, itemHash)
    local interactionEntity = Citizen.InvokeNative(0x5a0100ea714db68, player)
    if not interactionEntity then
        local item = _SALOON.items[itemHash]
        player = PlayerPedId()
        local coords = GetEntityCoords(player)
        local coffeeCup = CreateObject(item.model, coords.x, coords.y, coords.z, true, false, false, true, true)
        Citizen.InvokeNative(0x669655FFB29EF1A9, coffeeCup, 0, 'CTRL_cupFill', 1.0)
        TaskItemInteraction_2(player, GetHashKey('CONSUMABLE_COFFEE'), coffeeCup, GetHashKey('P_MUGCOFFEE01X_PH_R_HAND'), GetHashKey('DRINK_COFFEE_HOLD'), 1, 0, -1.0)
        TriggerServerEvent('saloon:server:remove_item', inventoryId, itemId, slotId)
    end
end)

AddEventHandler('saloon:client:stew', function(itemHash, slotId, inventoryId, itemId)
    print('saloon:client:stew')
    print(slotId, itemHash)
    local interactionEntity = Citizen.InvokeNative(0x5a0100ea714db68, player)
    if not interactionEntity then
        local item = _SALOON.items[itemHash]
        player = PlayerPedId()
        local coords = GetEntityCoords(player)
        local stewBowl = CreateObject(item.model, coords.x, coords.y, coords.z, true, false, false, true, true)
        Citizen.InvokeNative(0x669655FFB29EF1A9, stewBowl, 0, 'Stew_Fill', 1.0)
        TaskItemInteraction_2(player, 599184882, stewBowl, GetHashKey('p_bowl04x_stew_ph_l_hand'), GetHashKey('EAT_STEW_BOWL_BASE'), 3, 0, 0.0)
        local spoon = CreateObject(GetHashKey('p_spoon01x'), GetEntityCoords(player), true, true, false, false, true)
        TaskItemInteraction_2(player, 599184882, spoon, GetHashKey('p_spoon01x_ph_r_hand'), GetHashKey('EAT_STEW_BOWL_BASE'), 3, 0, 0.0)

        TriggerServerEvent('saloon:server:remove_item', inventoryId, itemId, slotId)
    end
end)

--local behindBarServeCoords = {
--    val_bartending = {},
--    val_bartending_2 = {},
--    rhd_bartending = {},
--}
--
--local startX = -312.5
--local startY = 807.6
--for i=1,15 do
--    behindBarServeCoords.val_bartending[i] = vector3(startX + (0.035 * i), startY - (0.2 * i), 119.0325)
--end
--behindBarServeCoords.val_bartending[16] = vector3(startX + (0.035 * 15), startY - (0.2 * 16), 119.0325)
--behindBarServeCoords.val_bartending[17] = vector3(startX + (0.035 * 14), startY - (0.2 * 16.75), 119.0325)
--behindBarServeCoords.val_bartending[18] = vector3(startX + (0.035 * 11), startY - (0.2 * 17.5), 119.0325)
--behindBarServeCoords.val_bartending[19] = vector3(startX + (0.035 * 7), startY - (0.2 * 18), 119.0325)
--behindBarServeCoords.val_bartending[20] = vector3(startX + (0.035 * 4), startY - (0.2 * 18.25), 119.0325)
--
--startX = -239.525
--startY = 768.5
--for i=1,11 do
--    behindBarServeCoords.val_bartending_2[i] = vector3(startX - (0.075 * i), startY + (0.2 * i), 118.125)
--end
--
--startX = 1339.075
--startY = -1372.525
--for i=1,11 do
--    behindBarServeCoords.rhd_bartending[i] = vector3(startX + (0.175 * i), startY - (0.0325 * i), 80.55)
--end

local curServeCoords = false

local isBartending = true
local inBartendingArea = false
local inDiningArea = false
local showServePrompt = false
local placingItem = false

RegisterCommand('bartend_start', function()
    isBartending = true
end)

RegisterCommand('bartend_stop', function()
    isBartending = false
end)

local menuOpen = false
local menuLocations = {
    vector3(-312.7748, 803.239, 118.9804), -- VAL
    vector3(1342.1, -1374.1, 80.5), -- RHD
    vector3(2638.0, -1225.6, 53.4), -- STDNS
    vector3(2945.7, 528.6, 45.4), -- VHRN
    vector3(-815.7, -1318.1, 43.7), -- BLKWTR
    vector3(-5516.6, -2907.4, -1.7), -- TMBLWD
}
local showMenuPrompt = false

function CameraForwardVec()
    local rot = (pi / 180.0) * GetGameplayCamRot()
    return vector3(-sin(rot.z) * abs(cos(rot.x)), cos(rot.z) * abs(cos(rot.x)), sin(rot.x))
end

function lerp(a,b,t) return a * (1-t) + b * t end

function round(num, numDecimalPlaces)
  local mult = 10^(numDecimalPlaces or 0)
  return math.floor(num * mult + 0.5) / mult
end

function GetServeCoordsFromLook()
    local camCoords = GetGameplayCamCoord()
    local targetCoords = camCoords + (CameraForwardVec() * 10.0)
    local shapeTest = StartShapeTestRay(camCoords, targetCoords, 1 + 8 + 16 + 32 + 64 + 128, ghostItem)
    local rtnVal, hit, endCoords, surfaceNormal, entityHit = GetShapeTestResult(shapeTest)
    if hit > 0 then
        return endCoords
    end
    return false
 end

Citizen.CreateThread(function()
    while not initialized do
        Citizen.Wait(0)
    end
    while true do
        Wait(0)
        player = PlayerPedId(0)
        local playerCoords = GetEntityCoords(player)
        if isBartending then
            inDiningArea = false
            inBartendingArea = false
            for _,ZONE in pairs(SALOON_ZONES) do
                if ZONE.dining:isPointInside(playerCoords) then
                    if ZONE.bartending:isPointInside(playerCoords) then
                        inBartendingArea = ZONE.bartending.name
                    else
                        inDiningArea = true
                        inBartendingArea = ZONE.dining.name
                    end
                end
            end

            if inBartendingArea and placingItem and ghostItem then
                SetEntityCoords(ghostItem, playerCoords.x, playerCoords.y, 0.0, 0.0, 0.0, 0.0, false)

                --local testCoords = GetOffsetFromEntityInWorldCoords(player, 0, 1.5, 0)

                --local closestDistance = 3.0
                --local closestIndex = false

                --for i, serveCoords in pairs(behindBarServeCoords[inBartendingArea]) do
                --    local distance = #(testCoords - serveCoords)
                --    if distance < closestDistance then
                --        closestDistance = distance
                --        closestIndex = i
                --    end
                --end

                --if closestIndex ~= false then

                local serveCoords = GetServeCoordsFromLook()

                if serveCoords and #(playerCoords - serveCoords) < 2.5 then
                    curServeCoords = serveCoords

                    local shapeTest = StartShapeTestBox(curServeCoords.x, curServeCoords.y, curServeCoords.z, 0.15, 0.15, 0.25, 0.0, 0.0, 0.0, true, 8 + 16, ghostItem)
                    local rtnVal, hit, endCoords, surfaceNormal, entityHit = GetShapeTestResult(shapeTest)

                    if entityHit ~= 0 then
                        local entityModel = GetEntityModel(entityHit)
                        if BLACKLIST_MODELS[entityModel] then
                            entityHit = 0
                        end
                    end
                    if entityHit == 0 then
                        SetEntityCoords(ghostItem, curServeCoords, 0.0, 0.0, 0.0, false)
                        showServePrompt = true
                    else
                        showServePrompt = false
                    end
                else
                    curServeCoords = false
                end
            else
                curServeCoords = false
                placingItem = false
                if ghostItem then
                    SetEntityAsMissionEntity(ghostItem, true, true)
                    DeleteEntity(ghostItem)
                ghostItem = false
                end
            end
        else
            curServeCoords = false
            placingItem = false
            if ghostItem then
                SetEntityAsMissionEntity(ghostItem, true, true)
                DeleteEntity(ghostItem)
                ghostItem = false
            end
        end

        showMenuPrompt = false
        if not menuOpen then
            for _,menuCoords in pairs(menuLocations) do
                if #(playerCoords - menuCoords) < 0.5 then
                    showMenuPrompt = true
                    break
                end
            end
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        if isBartending then
            Wait(0)
            --DrawTxt('inBartendingArea: ' .. tostring(inBartendingArea), 0.15, 0.375, 0.25, true, 255, 255, 255, 255, false, 0)
            if not menuOpen then
                if curServeCoords ~= false and showServePrompt and placingItem then
                    PROMPT.show(servePromptName, placingItem.name)
                elseif not placingItem and inBartendingArea and not inDiningArea then
                    PROMPT.show(bartendingMenuPromptName, 'Bartending')
                end
            end
        else
            Wait(5000)
        end
    end
end)

local volumeArea = Citizen.InvokeNative(0xB3FB80A32BAE3065, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 2.0) -- _CREATE_VOLUME_SPHERE
local itemSet = CreateItemset(1)
Citizen.CreateThread(function()
    while true do
        Wait(5000)
        player = PlayerPedId()
    end
end)

-- DetachEntity
-- ClearPedTasks
-- Player Doing Something?
-- 0x927861b2c08dbea5
local lastInteraction = false
local pedIsDoing = false
local startedDrinkingAt = false
local startedEatingAt = false
local isDrinking = false
local isEating = false
local endDrinking = false
local endEating = false
Citizen.CreateThread(function()
    while not initialized do
        Citizen.Wait(0)
    end
    while true do
        Wait(0)

        local interactionEntity = Citizen.InvokeNative(0x5a0100ea714db68, player)

        local useTime = 0
        if interactionEntity then
            useTime = DecorGetInt(interactionEntity, USE_TIME)
            --DrawTxt('UseTime: ' .. tostring(useTime), 0.15, 0.475, 0.25, true, 255, 255, 255, 255, false, 0)
        end
        local interaction = Citizen.InvokeNative(0x6AA3DCA2C6F5EB6D, player) -- _GET_ITEM_INTERACTION_FROM_PED
        interaction = tonumber(interaction)
        if interaction ~= lastInteraction then
            --print('interaction', interaction)
            lastInteraction = interaction
        end
        local interactionModel = GetEntityModel(interactionEntity)
        if
            interaction == GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_HOLD') or
            interaction == GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_TABLE_HOLD') or
            interaction == GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_HOLD') or
            interaction == GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_TABLE_HOLD')
        then
            pedIsDoing = 'BEER_HOLDING'
            if IsControlPressed(0, keys.SHIFT) then
                PROMPT.show(storePromptName, 'Beer')
            end
        elseif
            interaction == GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_CHUG_A') or
            interaction == GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_CHUG_B') or
            interaction == GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_CHUG_C') or
            interaction == GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_TABLE_CHUG_A') or
            interaction == GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_CHUG_A') or
            interaction == GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_CHUG_B') or
            interaction == GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_CHUG_C') or
            interaction == GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_TABLE_CHUG_A')
        then
            pedIsDoing = 'BEER_DRINKING'
            if not isDrinking then
                isDrinking = true
                endDrinking = false
                startedDrinkingAt = GetGameTimer()
            end
            local curUseTime = GetGameTimer() - startedDrinkingAt - 1000
            if curUseTime > 0 then
                WATER_LEVEL = WATER_LEVEL + curUseTime / 150.0 -- About 1/3
                exports['np-doctor']:increaseWaterLevel(curUseTime / 150.0)
            end
            if useTime + curUseTime > 5000 then
                curUseTime = 5000 - useTime
                ClearPedTasks(player)
            end
            if curUseTime > 0 then
                startedDrinkingAt = GetGameTimer() - 1000
                local drankPercentage = curUseTime / 5000

                local targetAlcoholContent = DecorGetFloat(player, TAC)
                if not targetAlcoholContent then
                    targetAlcoholContent = 0.0
                end

                local alcoholContent = 0.0
                for _,item in pairs(ITEMS) do
                    if interactionModel == item.model then
                        alcoholContent = item.alcohol_content
                        break
                    end
                end
                targetAlcoholContent = targetAlcoholContent + (drankPercentage * alcoholContent)

                DecorSetFloat(player, TAC, targetAlcoholContent)
                if interactionEntity then
                    DecorSetInt(interactionEntity, USE_TIME, useTime + curUseTime)
                end
            end
        elseif
            interaction == GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_CHUG_TRANS') or
            interaction == GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_TABLE_CHUG_TRANS') or
            interaction == GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_CHUG_TRANS') or
            interaction == GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_TABLE_CHUG_TRANS')
        then
            pedIsDoing = 'BEER_STOP_DRINKING'
            endDrinking = true
        elseif interaction == GetHashKey('DRINK_CHAMPAGNE_HOLD') then
            pedIsDoing = 'CHAMPAGNE_HOLDING'
            endDrinking = true
        elseif interaction == GetHashKey('DRINK_CHAMPAGNE_DRINK') then
            local useTimeMax = 26750
            pedIsDoing = 'CHAMPAGNE_DRINKING'
            if not isDrinking then
                isDrinking = true
                endDrinking = false
                startedDrinkingAt = GetGameTimer()
            end
            local curUseTime = GetGameTimer() - startedDrinkingAt - 1000
            if curUseTime > 0 then
                WATER_LEVEL = WATER_LEVEL + curUseTime / 1000.0 -- About 1/4
            end
            if useTime + curUseTime > useTimeMax then
                curUseTime = useTimeMax - useTime
                ClearPedTasks(player)
            end
            if curUseTime > 0 then
                startedDrinkingAt = GetGameTimer() - 1000
                local drankPercentage = curUseTime / useTimeMax

                local targetAlcoholContent = DecorGetFloat(player, TAC)
                if not targetAlcoholContent then
                    targetAlcoholContent = 0.0
                end

                local alcoholContent = 0.0
                for _,item in pairs(ITEMS) do
                    if interactionModel == item.model then
                        alcoholContent = item.alcohol_content
                        break
                    end
                end
                targetAlcoholContent = targetAlcoholContent + (drankPercentage * alcoholContent) -- TODO: Replace 0.2 with model value

                DecorSetFloat(player, TAC, targetAlcoholContent)
                if interactionEntity then
                    DecorSetInt(interactionEntity, USE_TIME, useTime + curUseTime)
                end
            end
        elseif interaction == GetHashKey('DRINK_COFFEE_HOLD') then
            pedIsDoing = 'COFFEE_HOLDING'
            isDrinking = false
            if useTime > 25000 then
                endDrinking = true
                ClearPedTasks(player)
            end
        elseif interaction == GetHashKey('DRINK_COFFEE_DRINK') then
            pedIsDoing = 'COFFEE_DRINKING'
            if not isDrinking then
                isDrinking = true
                endDrinking = false
                startedDrinkingAt = GetGameTimer()
            end
            local curUseTime = GetGameTimer() - startedDrinkingAt - 1000
            if curUseTime > 0 then
                WATER_LEVEL = WATER_LEVEL + curUseTime / 350.0 -- About 2/3 to 3/4
            end
            if curUseTime > 0 then
                startedDrinkingAt = GetGameTimer() - 1000

                if interactionEntity then
                    DecorSetInt(interactionEntity, USE_TIME, useTime + curUseTime)
                end
            end
        elseif
            interaction == GetHashKey('DRINK_COFFEE_PUT_AWAY') or
            interaction == GetHashKey('DRINK_COFFEE_PUT_AWAY_KNEELING')
        then
            pedIsDoing = 'COFFEE_PUT_AWAY'
        elseif
            interaction == GetHashKey('EAT_STEW_BOWL_BASE') or
            interaction == GetHashKey('EAT_STEW_BOWL_CHAIR_BASE') or
            interaction == GetHashKey('EAT_STEW_BOWL_TABLE_BASE')
        then
            pedIsDoing = 'STEW_HOLDING'
        elseif
            interaction == GetHashKey('EAT_STEW_BOWL_EAT_FINISH_DISCARD') or
            interaction == GetHashKey('EAT_STEW_BOWL_CHAIR_EAT_FINISH_DISCARD') or
            interaction == GetHashKey('EAT_STEW_BOWL_TABLE_EAT_FINISH_HOLD')
        then
            pedIsDoing = 'STEW_EATING'
            if not isEating then
                isEating = true
                endEating = false
                startedEatingAt = GetGameTimer()
            end
            local curUseTime = GetGameTimer() - startedEatingAt
            FOOD_LEVEL = FOOD_LEVEL + curUseTime / 75.0 -- About 2/3 to 3/4
            exports['np-doctor']:increaseFoodLevel(curUseTime / 75.0)
            if useTime + curUseTime > 5475 then
                curUseTime = 5475 - useTime
                ClearPedTasks(player)
            end
            if curUseTime > 0 then
                startedEatingAt = GetGameTimer()
                --local eatPercentage = curUseTime / 5475 -- WRONG !
                if interactionEntity then
                    DecorSetInt(interactionEntity, USE_TIME, useTime + curUseTime)
                end
            end
        elseif
            interaction == GetHashKey('EAT_STEW_BOWL_EAT_TRANS') or
            interaction == GetHashKey('EAT_STEW_BOWL_CHAIR_EAT_TRANS') or
            interaction == GetHashKey('EAT_STEW_BOWL_TABLE_EAT_TRANS')
        then
            pedIsDoing = 'STEW_STOP_EATING'
            endEating = true
        else
            pedIsDoing = interaction
            if interaction == nil then
                endDrinking = true
                endEating = true
            end
            if not menuOpen and showMenuPrompt then
                PROMPT.show(openMenuPromptName, 'Menu')
            end
        end

        if isDrinking and endDrinking then
            isDrinking = false
            endDrinking = false
        end
        if isEating and endEating then
            isEating = false
            endEating = false
        end
        --DrawTxt('Doing: ' .. tostring(pedIsDoing), 0.15, 0.45, 0.25, true, 255, 255, 255, 255, false, 0)
    end
end)

local itemsFound = false
local pickupItems = {}
local nutBowl = false
Citizen.CreateThread(function()
    while true do
        Wait(1000)
        local coords = GetEntityCoords(player)
        Citizen.InvokeNative(0x541B8576615C33DE, volumeArea, coords.x, coords.y, coords.z) -- SET_VOLUME_COORDS
        itemsFound = Citizen.InvokeNative(0x886171A12F400B89, volumeArea, itemSet, 3) -- Get volume items into itemset
        pickupItems = {}
        nutBowl = false
        if initialized and volumeArea then
            if itemsFound then
                local p = 0
                local i = 0
                while i < itemsFound do
                    local entityHit = GetIndexedItemInItemset(i, itemSet)
                    local entityModel = GetEntityModel(entityHit)

                    local pickupName = false
                    for _,item in pairs(ITEMS) do
                        if entityModel == item.model then
                            pickupName = item.name
                            break
                        end
                    end
                    if pickupName then
                        p = p + 1
                        table.insert(pickupItems, {
                            name = pickupName,
                            entity = entityHit,
                        })
                        if p >= promptPoolSize then
                            break
                        end
                    end

                    if isBartending and entityModel == NUTBOWL_MODEL then
                        nutBowl = entityHit
                    end
                    i = i + 1
                end
            end
            Citizen.InvokeNative(0x20A4BF0E09BEE146, itemSet) -- Empty Item Set
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        Wait(0)

        for p,pickupItem in pairs(pickupItems) do
            pickupPromptEntities[p] = pickupItem.entity
            PROMPT.showAtEntity(pickupPromptNames[p], pickupItem.name, pickupItem.entity)
        end

        if nutBowl then
            -- TODO: See if networked...
            PROMPT.showAtEntity(restockNutsPromptName, 'Almonds', entityHit)

            -- SCENARIO
            --local scenario = Citizen.InvokeNative(0xF533D68FF970D190, coords, GetHashKey('PROP_PLAYER_EAT_ALMONDS_COUNTER'), 2.0)
            --print('scenario', scenario)

            --if not Citizen.InvokeNative(0x974DA3408DEC4E79, scenario) then
            --    PROMPT.showAtEntity(restockNutsPromptName, 'Almonds', entityHit)
            --end

            -- OR

            --if scenario then
            --    local scenarioPromptGroup = PromptGetGroupIdForScenarioPoint(scenario)
            --    if scenarioPromptGroup then
            --        PROMPT.setGroup(restockNutsPromptName, scenarioGroupPromptGroup)
            --    end
            --end
        end
    end
end)

-- 0x11C7CE1AE38911B5 -1.0
-- 0x370F57C47F68EBCA -1.0
-- 0x4687E69D258BBE41 -1.0
-- 0x6BA606AB3A83BC4D -1.0
-- 0x6C269F673C47031E 1491
-- 0x78D8C1D4EB80C588 185.0 -- 1127809024
-- 0x9420FB11B8D77948 -1
-- 0x974DA3408DEC4E79 1 -- _IS_SCENARIO_POINT_ACTIVE_THIS_FRAME
-- 0xE55478C5EDF70AC2 1933205538 -- GET_SCENARIO_GROUP_HASH?
-- 0xEA31F199A73801D3 1
-- 0xEB67D4E056C85A81 185.0 -- 1127809024

AddEventHandler(openMenuPromptName .. '::completed', function()
    menuOpen = true
    SendNuiMessage(json.encode({ action = 'show', menuItems = menuItems }))
    Wait(500)
    SetNuiFocus(true, true)
end)

RegisterNuiCallbackType('close_ui')
AddEventHandler('__cfx_nui:close_ui', function(data, callback)
    menuOpen = false
    SetNuiFocus(false)
    callback({})
end)

AddEventHandler(restockNutsPromptName .. '::completed', function()
    player = PlayerPedId()
    local coords = GetEntityCoords(player)

    CreateModelSwap(coords.x, coords.y, coords.z, 5.0, NUTBOWL_MODEL, NUTBOWL_MODEL)
    Wait(100)
    RemoveModelSwap(coords.x, coords.y, coords.z, 5.0, NUTBOWL_MODEL, NUTBOWL_MODEL)
end)

RegisterNuiCallbackType('serve_item')
AddEventHandler('__cfx_nui:serve_item', function(data, callback)
    menuOpen = false
    SetNuiFocus(false)
    placingItem = false
    for _,item in pairs(ITEMS) do
        if item.identifier == data.identifier then
            placingItem = item
        end
    end

    if ghostItem then
        SetEntityAsMissionEntity(ghostItem, true, true)
        DeleteEntity(ghostItem)
        ghostItem = false
    end

    playerCoords = GetEntityCoords(player)

    if placingItem then
        ghostItem = CreateObject(placingItem.model, playerCoords.x, playerCoords.y, playerCoords.z, false, false, false, true, true)
        FreezeEntityPosition(ghostItem, true)
        SetEntityAsMissionEntity(ghostItem, true, true)
        SetEntityAlpha(ghostItem, 200)
        Citizen.InvokeNative(0x7DFB49BCDB73089A, ghostItem, true)
    end

    callback({})
end)

Citizen.CreateThread(function()
    while not initialized do
        Citizen.Wait(0)
    end
    AddEventHandler(bartendingMenuPromptName .. '::completed', function()
        menuOpen = true
        SendNuiMessage(json.encode({ action = 'show', menuItems = menuItems , bartender = true }))
        Wait(500)
        SetNuiFocus(true, true)
    end)
    AddEventHandler(storePromptName .. '::completed', function()
        local interactionEntity = Citizen.InvokeNative(0x5a0100ea714db68, player)
        SetEntityAsMissionEntity(interactionEntity, true, true)
        DeleteEntity(interactionEntity)
        -- TODO: Put in inventory
    end)
    AddEventHandler(servePromptName .. '::completed', function()
        if curServeCoords and IsModelValid(placingItem.model) then
            while not HasModelLoaded(placingItem.model) do
                Wait(10)
                RequestModel(placingItem.model)
            end
            if placingItem.food_type == 'bottle' or placingItem.food_type == 'bottle_large' then
                local bottle = CreateObject(placingItem.model, curServeCoords.x, curServeCoords.y, curServeCoords.z, true, false, false, true, true)
                SetEntityHeading(bottle, mathRandom() * 360.0)
            elseif placingItem.food_type == 'shotglass' then
                local shotGlass = CreateObject(placingItem.model, curServeCoords.x, curServeCoords.y, curServeCoords.z, true, false, false, true, true)
                SetEntityHeading(shotGlass, mathRandom() * 360.0)
            elseif placingItem.food_type == 'glass' then
                local glass = CreateObject(placingItem.model, curServeCoords.x, curServeCoords.y, curServeCoords.z, true, false, false, true, true)
                SetEntityHeading(glass, mathRandom() * 360.0)
                --Citizen.InvokeNative(0x669655FFB29EF1A9, glass, 0, 'tumbler_fill', 1.0)
            elseif placingItem.food_type == 'coffee' then
                local coffeeCup = CreateObject(placingItem.model, curServeCoords.x, curServeCoords.y, curServeCoords.z, true, false, false, true, true)
                SetEntityHeading(coffeeCup, mathRandom() * 360.0)
                Citizen.InvokeNative(0x669655FFB29EF1A9, coffeeCup, 0, 'CTRL_cupFill', 1.0)
            elseif placingItem.food_type == 'stew' then
                local stewBowl = CreateObject(placingItem.model, curServeCoords.x, curServeCoords.y, curServeCoords.z, true, false, false, true, true)
                SetEntityHeading(stewBowl, mathRandom() * 360.0)
                Citizen.InvokeNative(0x669655FFB29EF1A9, stewBowl, 0, 'Stew_Fill', 1.0)
            elseif placingItem.food_type == 'plate' then
                -- TODO: Needs Work
                --local plate = CreateObject(GetHashKey('P_PLATE17X'), curServeCoords.x, curServeCoords.y, curServeCoords.z, true, false, false, true, true)
                --local main = CreateObject(item.model, curServeCoords.x, curServeCoords.y, curServeCoords.z, true, false, false, true, true)
                --local side = CreateObject(GetHashKey('P_SIDE_GREENPEASPOTATO01X'), curServeCoords.x, curServeCoords.y, curServeCoords.z, true, false, false, true, true)
                --local side2 = CreateObject(GetHashKey('P_SIDE_GREENPEASPOTATO01X'), curServeCoords.x, curServeCoords.y, curServeCoords.z, true, false, false, true, true)
                --AttachEntityToEntity(main, plate, 0, 0.0, -0.04, 0.00, 0.0, 0.0, 0.0, true, false, false, false, 0, true, false, false)
                --AttachEntityToEntity(side, plate, 0, -0.04, 0.04, 0.00, 0.0, 0.0, 180.0, true, false, false, false, 0, true, false, false)
                --AttachEntityToEntity(side2, plate, 0, 0.04, 0.04, 0.00, 0.0, 0.0, 0.0, true, false, false, false, 0, true, false, false)
            end
            SetModelAsNoLongerNeeded(placingItem.model)
        end

        if not IsControlPressed(0, keys.SHIFT) then
            if ghostItem then
                SetEntityAsMissionEntity(ghostItem, true, true)
                DeleteEntity(ghostItem)
                ghostItem = false
            end
            placingItem = false
        end
    end)
    for n = 1,promptPoolSize do
        AddEventHandler(pickupPromptNames[n] .. '::completed', function()
            print('n', n, 'entity', pickupPromptEntities[n])
            Wait(0)
            player = PlayerPedId()
            local pickupEntityModel = GetEntityModel(pickupPromptEntities[n])
            if IsEntityAttached(pickupPromptEntities[n]) then
                local entityHoldingItem = GetEntityAttachedTo(pickupPromptEntities[n])
                if entityHoldingItem then
                    ClearPedTasks(entityHoldingItem, true, true)
                    TaskPutPedDirectlyIntoMelee(entityHoldingItem, player)
                end
            end

            for _,item in pairs(ITEMS) do
                if pickupEntityModel == item.model then
                    -- Citizen.InvokeNative(0x804425C4BBD00883, player) Gets 2nd param from TaskItemInteraction_2
                    -- GetItemInteractionFromPed
                    if item.food_type == 'bottle' then
                        local propId = GetHashKey('P_BOTTLEBEER01X_PH_R_HAND')
                        local itemInteractionState = GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_HOLD')

                        TaskItemInteraction_2(player, GetHashKey('CONSUMABLE_SALOON_BEER'), pickupPromptEntities[n], propId, itemInteractionState, 1, 0, -1.0)
                    elseif item.food_type == 'bottle_large' then
                        local propId = GetHashKey('P_BOTTLEJD01X_PH_R_HAND')
                        local itemInteractionState = GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-3_H30-5_Neck_A13_B2-5_HOLD')
                        --local test3 = GetHashKey('DRINK_BOTTLE@Bottle_Cylinder_D1-55_H18_Neck_A8_B1-8_UNCORK')
                        TaskItemInteraction_2(player, GetHashKey('CONSUMABLE_SALOON_WHISKEY'), pickupPromptEntities[n], propId, itemInteractionState, 1, 0, -1.0)
                    elseif item.food_type == 'shotglass' then
                        -- TODO
                        --Citizen.InvokeNative(0x3BBDD6143FF16F98, player, pickupPromptEntities[n], 'p_shotGlass01x_PH_L_HAND', 'WORLD_HUMAN_BARTENDER_WHISKEY', 'WORLD_HUMAN_BARTENDER_SERVE_WHISKEY_RETURN_GLASS_UNDER_BAR_MALE_A', 1)
                        --Citizen.InvokeNative(0x4D0D2E3D8BC000EB, player, 'p_shotGlass01x_PH_L_Hand', 1)
                        --Citizen.InvokeNative(0x569F1E1237508DEB, player)
                    elseif item.food_type == 'glass' then
                        TaskItemInteraction_2(player, GetHashKey('CONSUMABLE_WHISKEY'), pickupPromptEntities[n], GetHashKey('P_GLASS001X_PH_R_HAND'), GetHashKey('DRINK_CHAMPAGNE_HOLD'), 1, 0, -1.0)
                    elseif item.food_type == 'coffee' then
                        TaskItemInteraction_2(player, GetHashKey('CONSUMABLE_COFFEE'), pickupPromptEntities[n], GetHashKey('P_MUGCOFFEE01X_PH_R_HAND'), GetHashKey('DRINK_COFFEE_HOLD'), 1, 0, -1.0)
                    elseif item.food_type == 'stew' then
                        TaskItemInteraction_2(player, 599184882, pickupPromptEntities[n], GetHashKey('p_bowl04x_stew_ph_l_hand'), GetHashKey('EAT_STEW_BOWL_BASE'), 3, 0, 0.0)
                        local spoon = CreateObject(GetHashKey('p_spoon01x'), GetEntityCoords(player), true, true, false, false, true)
                        TaskItemInteraction_2(player, 599184882, spoon, GetHashKey('p_spoon01x_ph_r_hand'), GetHashKey('EAT_STEW_BOWL_BASE'), 3, 0, 0.0)
                    end
                    break
                end
            end
            --DeleteEntity(pickupPromptEntities[n])
            --
            --player = PlayerPedId()
            --local targetAlcoholContent = DecorGetFloat(player, TAC)
            --if not targetAlcoholContent then
            --    targetAlcoholContent = 0.0
            --end
            --
            --targetAlcoholContent = targetAlcoholContent + 0.2
            --
            --DecorSetFloat(player, TAC, targetAlcoholContent)
        end)
    end
end)

local drunkFxStrength = 0.0
Citizen.CreateThread(function()
    if not DEBUG then return end
    while true do
        Wait(0)
        player = PlayerPedId()
        local targetAlcoholContent = DecorGetFloat(player, TAC)
        local currentAlcoholContent = DecorGetFloat(player, CAC)
        DrawTxt('TAC: ' .. tostring(targetAlcoholContent), 0.15, 0.5125, 0.25, true, 255, 255, 255, 255, false, 0)
        DrawTxt('CAC: ' .. tostring(currentAlcoholContent), 0.15, 0.5, 0.25, true, 255, 255, 255, 255, false, 0)
        DrawTxt('DFS: ' .. tostring(drunkFxStrength), 0.15, 0.525, 0.25, true, 255, 255, 255, 255, false, 0)
    end
end)

local walkModified = false

-- 1.0 = 0.16
-- 0.5 = 0.08

--100 / (15 * 60 * 1000) * 10 * 5
local targetAdjustmentPerSecond = 1.0 / (60 * 30) -- 1.0 over 30 minutes
local currentAdjustmentPerSecond = 1.0 / (60 * 1.5) -- 1.0 over 1.5 minutes
local lastGameTime = GetGameTimer()
local lastRagdollTime = lastGameTime
Citizen.CreateThread(function()
    Wait(0)
    while true do
        Wait(500)

        player = PlayerPedId()

        -- Game Timer Delta
        local delta = (GetGameTimer() - lastGameTime) / 1000
        lastGameTime = GetGameTimer()

        -- Reduce Target Alcohol Content
        local targetAlcoholContent = DecorGetFloat(player, TAC)

        if not targetAlcoholContent then
            targetAlcoholContent = 0.0
        end

        if targetAlcoholContent > 0.0 then
            targetAlcoholContent = targetAlcoholContent - targetAdjustmentPerSecond
        else
            targetAlcoholContent = 0.0
        end

        -- Move Current Alcohol Content towards Target

        local currentAlcoholContent = DecorGetFloat(player, CAC)

        if currentAlcoholContent ~= targetAlcoholContent then
            if currentAlcoholContent > targetAlcoholContent then
                currentAlcoholContent = currentAlcoholContent - currentAdjustmentPerSecond * delta
                currentAlcoholContent = math.max(currentAlcoholContent, targetAlcoholContent)
            else
                currentAlcoholContent = currentAlcoholContent + currentAdjustmentPerSecond * delta
                currentAlcoholContent = math.min(currentAlcoholContent, targetAlcoholContent)
            end
        end

        if currentAlcoholContent > 0.0 then
            walkModified = true
            Citizen.InvokeNative(0x406CCF555B04FAD3, player, 1, currentAlcoholContent)
            if not IsGameplayCamShaking() then
                ShakeGameplayCam('DRUNK_SHAKE', 1.0)
            end
            if not AnimpostfxIsRunning('PlayerDrunk01') then
                Citizen.InvokeNative(0x5199405EABFBD7F0, 'PlayerDrunk01') -- GRAPHICS::ANIMPOSTFX_*
                AnimpostfxPlay('PlayerDrunk01')
                Citizen.InvokeNative(0x37D7BDBA89F13959, 'PlayerDrunk01')
            end
            if currentAlcoholContent > 0.5 then
                Citizen.InvokeNative(0x89F5E7ADECCCB49C, player, 'very_drunk') -- SET_WALK_TYPE
            else
                Citizen.InvokeNative(0x58F7DB5BD8FA2288, player) -- RESET_WALK ?
            end
            if currentAlcoholContent > 0.6 and not IsPedRagdoll(player) and lastGameTime - lastRagdollTime > lerp(60000, 20000, currentAlcoholContent) then
                if mathRandom() < lerp(0.01, 0.15, currentAlcoholContent) then
                    DecorSetInt(player, SLN_RAGDOLL, 1)
                    SetPedToRagdoll(player, 7500, 7500, 0, false, true, false)
                    Citizen.CreateThread(function()
                        Wait(7500)
                        DecorSetInt(player, SLN_RAGDOLL, 0)
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
            Citizen.InvokeNative(0x406CCF555B04FAD3, player, 0, currentAlcoholContent)
            if IsGameplayCamShaking() then
                Citizen.InvokeNative(0x4285804FD65D8066, 'DRUNK_SHAKE', 0)
            end
            if AnimpostfxIsRunning('PlayerDrunk01') then
                AnimpostfxStop('PlayerDrunk01')
                drunkFxStrength = 0.0
            end
            if walkModified then
                Citizen.InvokeNative(0x58F7DB5BD8FA2288, player)
                walkModified = false
            end
        end

        DecorSetFloat(player, TAC, targetAlcoholContent)
        DecorSetFloat(player, CAC, currentAlcoholContent)
    end
end)

function DrawTxt(str, x, y, size, enableShadow, r, g, b, a, centre, font)
    local str = CreateVarString(10, "LITERAL_STRING", str)
    SetTextScale(1, size)
    SetTextColor(floor(r), floor(g), floor(b), floor(a))
	SetTextCentre(centre)
    if enableShadow then SetTextDropshadow(1, 0, 0, 0, 255) end
    SetTextFontForCurrentCommand(font)
    DisplayText(str, x, y)
end

--switch (iParam0)
--{
--    case joaat("SOBER"):
--        PED::_0x406CCF555B04FAD3(Global_34, 0, 0f);
--        if (CAM::IS_GAMEPLAY_CAM_SHAKING())
--        {
--            CAM::_0x4285804FD65D8066("DRUNK_SHAKE", 0);
--        }
--        if (GRAPHICS::ANIMPOSTFX_IS_RUNNING("PlayerDrunk01"))
--        {
--            GRAPHICS::ANIMPOSTFX_STOP("PlayerDrunk01");
--        }
--        GRAPHICS::_0x37D7BDBA89F13959("PlayerDrunk01");
--        PED::_0x58F7DB5BD8FA2288(Global_34);
--        break;
--    case joaat("SLIGHTLY_DRUNK"):
--        PED::_0x406CCF555B04FAD3(Global_34, 1, 0.25f);
--        if (!CAM::IS_GAMEPLAY_CAM_SHAKING())
--        {
--            CAM::SHAKE_GAMEPLAY_CAM("DRUNK_SHAKE", 1f);
--        }
--        GRAPHICS::_0x5199405EABFBD7F0("PlayerDrunk01");
--        if (!GRAPHICS::ANIMPOSTFX_IS_RUNNING("PlayerDrunk01"))
--        {
--            GRAPHICS::ANIMPOSTFX_PLAY("PlayerDrunk01");
--        }
--        PED::_0x58F7DB5BD8FA2288(Global_34);
--        CAM::SET_GAMEPLAY_CAM_SHAKE_AMPLITUDE(0.4f);
--        GRAPHICS::_0xCAB4DD2D5B2B7246("PlayerDrunk01", 0.4f);
--        break;
--    case -431929910:
--        PED::_0x406CCF555B04FAD3(Global_34, 1, 0.5f);
--        if (!CAM::IS_GAMEPLAY_CAM_SHAKING())
--        {
--            CAM::SHAKE_GAMEPLAY_CAM("DRUNK_SHAKE", 1f);
--        }
--        GRAPHICS::_0x5199405EABFBD7F0("PlayerDrunk01");
--        if (!GRAPHICS::ANIMPOSTFX_IS_RUNNING("PlayerDrunk01"))
--        {
--            GRAPHICS::ANIMPOSTFX_PLAY("PlayerDrunk01");
--        }
--        PED::_0x89F5E7ADECCCB49C(Global_34, "very_drunk");
--        CAM::SET_GAMEPLAY_CAM_SHAKE_AMPLITUDE(0.6f);
--        GRAPHICS::_0xCAB4DD2D5B2B7246("PlayerDrunk01", 0.6f);
--        break;
--    case joaat("VERY_DRUNK"):
--        PED::_0x406CCF555B04FAD3(Global_34, 1, 1f);
--        if (!CAM::IS_GAMEPLAY_CAM_SHAKING())
--        {
--            CAM::SHAKE_GAMEPLAY_CAM("DRUNK_SHAKE", 1f);
--        }
--        GRAPHICS::_0x5199405EABFBD7F0("PlayerDrunk01");
--        if (!GRAPHICS::ANIMPOSTFX_IS_RUNNING("PlayerDrunk01"))
--        {
--            GRAPHICS::ANIMPOSTFX_PLAY("PlayerDrunk01");
--        }
--        PED::_0x89F5E7ADECCCB49C(Global_34, "very_drunk");
--        CAM::SET_GAMEPLAY_CAM_SHAKE_AMPLITUDE(0.8f);
--        GRAPHICS::_0xCAB4DD2D5B2B7246("PlayerDrunk01", 0.8f);
--        break;
--}
