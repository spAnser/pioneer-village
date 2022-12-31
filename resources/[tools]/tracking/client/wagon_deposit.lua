---
--- Wagon Deposit
---

local depositGroup = GetRandomIntInRange(0, 0xffffff)
print('depositGroup: ' .. depositGroup)
local depositPrompt = false
local depositGroupName = 'Wagon'

local depositPrompt = false
local depositPromptName = 'hunting:depositPrompt'
local depositGroupName = 'Hunting Wagon'

PROMPT = exports.prompts

function initPrompts()
    CreateThread(function()
        Citizen.Wait(1000 + math.random() * 4000) -- Without waiting at least 1000 the game will hang if you restart prompt.
        depositPrompt = PROMPT:registerWithEvent('createHold', depositPromptName, 0xE30CD707, 'Deposit')
    end)
end

if PROMPT then
    initPrompts()
end

AddEventHandler('onResourceStart', function(resourceName)
    if resourceName == 'prompt' then
        PROMPT = exports.prompts
        initPrompts()
    end
end)

local cartCheckDistance = 0.5
local tarpCheckDistance = 1.0
local carcassCheckDistance = 5.0
local volumeArea = Citizen.InvokeNative(0xB3FB80A32BAE3065, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, tarpCheckDistance, tarpCheckDistance, tarpCheckDistance)
local itemSet = CreateItemset(1)

-- Resource Cleanup
AddEventHandler('onResourceStop', function(resourceName)
    if resourceName == 'prompt' then
        depositPrompt = false
    elseif (GetCurrentResourceName() ~= resourceName) then return end
    -- Do My Cleanup
    Citizen.InvokeNative(0x43F867EF5C463A53, volumeArea) -- _DELETE_VOLUME
end)

local cartYOffset = {
    [GetHashKey('CART03')] = -1.8,
    [GetHashKey('CART06')] = -2.2,
}
local cartDistance = {
    [GetHashKey('CART03')] = 0.5,
    [GetHashKey('CART06')] = 0.5,
}

local tarpEntity = false
local itemsInCart = 0
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        local player = PlayerPedId()
        local coords = GetEntityCoords(player)
        local carriedEntity = Citizen.InvokeNative(0xD806CD2A4F2C2996, player)

        if depositPrompt and carriedEntity then
            if not IsPedHuman(carriedEntity) then
                local coordsf = GetOffsetFromEntityInWorldCoords(player, 0.0, 2.0, 0.0)
                Citizen.InvokeNative(0xA46E98BDC407E23D, volumeArea, cartCheckDistance, cartCheckDistance, cartCheckDistance * 2.0) -- SET_VOLUME_SIZE
                Citizen.InvokeNative(0x541B8576615C33DE, volumeArea, coordsf.x, coordsf.y, coordsf.z) -- SET_VOLUME_COORDS

                local itemsFound = Citizen.InvokeNative(0x886171A12F400B89, volumeArea, itemSet, 2) -- Get volume items into itemset

                local hitEntity = false
                local hitModel = false
                if itemsFound then
                    n = 0
                    while n < itemsFound do
                        local itemId = GetIndexedItemInItemset(n, itemSet)
                        local itemModel = GetEntityModel(itemId)
                        if SupportedWagon(itemModel) then
                            hitEntity = itemId
                            hitModel = itemModel
                        end
                        n = n + 1
                    end
                end

                Citizen.InvokeNative(0x20A4BF0E09BEE146, itemSet) -- Empty Item Set

                if hitEntity then
                    local hitCoords = GetEntityCoords(hitEntity)
                    Citizen.InvokeNative(0xA46E98BDC407E23D, volumeArea, tarpCheckDistance, tarpCheckDistance, tarpCheckDistance) -- SET_VOLUME_SIZE
                    Citizen.InvokeNative(0x541B8576615C33DE, volumeArea, hitCoords.x, hitCoords.y, hitCoords.z) -- SET_VOLUME_COORDS
                    local itemsFound = Citizen.InvokeNative(0x886171A12F400B89, volumeArea, itemSet, 3) -- Get volume items into itemset
                    if itemsFound then
                        n = 0
                        while n < itemsFound do
                            local itemId = GetIndexedItemInItemset(n, itemSet)
                            local itemModel = GetEntityModel(itemId)
                            if itemModel == `MP005_P_HUNTINGWAGONTARP01` then
                                tarpEntity = itemId
                            end
                        n = n + 1
                        end
                    end
                    local entityCoords = GetOffsetFromEntityInWorldCoords(hitEntity, 0.0, cartYOffset[hitModel], 0.0)

                    local distance = #(coords - entityCoords)
                    TxtAtWorldCoord(entityCoords.x, entityCoords.y, entityCoords.z, tostring(distance), 0.175, 1)

                    Citizen.InvokeNative(0x20A4BF0E09BEE146, itemSet) -- Empty Item Set

                    Citizen.InvokeNative(0xA46E98BDC407E23D, volumeArea, carcassCheckDistance, carcassCheckDistance, carcassCheckDistance) -- SET_VOLUME_SIZE
                    Citizen.InvokeNative(0x541B8576615C33DE, volumeArea, GetEntityCoords(hitEntity)) -- SET_VOLUME_COORDS
                    local itemsFound = Citizen.InvokeNative(0x886171A12F400B89, volumeArea, itemSet, 1) -- Get volume items into itemset
                    itemsInCart = 0
                    if itemsFound then
                        n = 0
                        while n < itemsFound do
                            local itemId = GetIndexedItemInItemset(n, itemSet)
                            local attachedTo = GetEntityAttachedTo(itemId)
                            if attachedTo == tarpEntity then
                                itemsInCart = itemsInCart + 1
                            end
                            n = n + 1
                        end
                    end
                    Citizen.InvokeNative(0x20A4BF0E09BEE146, itemSet) -- Empty Item Set

                    if distance < cartDistance[hitModel] and itemsInCart < 6 then
                        PROMPT:show(depositPromptName, depositGroupName)
                    end
                end
            end
        else
            --tarpEntity = false
        end
    end
end)

function SupportedWagon(model)
    return model == `CART06` or model == `CART03`
end

function randomZeroRange(range)
    return math.random() * range - (range / 2)
end

AddEventHandler(depositPromptName .. '::completed', function()
    local player = PlayerPedId()
    local carriedEntity = Citizen.InvokeNative(0xD806CD2A4F2C2996, player)
    TaskPlaceCarriedEntityAtCoord(player, carriedEntity, GetEntityCoords(player), GetEntityHeading(player), 4)
    Citizen.CreateThread(function()
        Wait(1500)
        local attachCoords = {
            math.random() * 0.3 - 0.15,
            math.random() * 1.6 - 1.0
        }
        local zRot = math.random() * 360.0
        print(itemsInCart, json.encode(attachCoords), zRot)
--AttachEntityToEntity(entity1, entity2, boneIndex, xPos, yPos, zPos, xRot, yRot, zRot, p9, useSoftPinning, collision, isPed, vertexIndex, fixedRot, p15, p16);
        AttachEntityToEntity(carriedEntity, tarpEntity, 0, attachCoords[1], attachCoords[2], 0.75, 0.0, 0.0, zRot, true, false, false, true, 0, true, false, false)
        Wait(1000)
        AttachEntityToEntity(carriedEntity, tarpEntity, 0, attachCoords[1], attachCoords[2], 0.75, 0.0, 0.0, zRot, true, false, false, true, 0, true, false, false)
        --SetEntityCollision(carriedEntity, true, false)
        --SetEntityCompletelyDisableCollision(carriedEntity, true, false)
    end)
end)

RegisterCommand('huntingwagon', function(source, args, rawCommand)
    local player = PlayerPedId()
    local pDir = GetEntityHeading(player)

    local spawnCoords = GetOffsetFromEntityInWorldCoords(player, 0, 2.0, 0)

    local cartModel = `CART06`
    local tarpModel = `MP005_P_HUNTINGWAGONTARP01`
    local tarpPropSet = `PG_MP005_HUNTINGWAGONTARP01`
    local lightPropSet = `PG_VEH_CART06_LANTERNS01`
    if IsModelAVehicle(cartModel) then
        Citizen.CreateThread(function()
            LoadModel(cartModel)
            local cartId = CreateVehicle(cartModel, spawnCoords.x, spawnCoords.y, spawnCoords.z, pDir - 90.0, true, false, false, false)

            Citizen.InvokeNative(0x75F90E4051CC084C, cartId, tarpPropSet)
            Citizen.InvokeNative(0xC0F0417A90402742, cartId, lightPropSet)

            --0xD80FAF919A2E56EA propset stuff

            SetEntityVisible(cartId, true)
            SetEntityAlpha(cartId, 255, false)
            SetModelAsNoLongerNeeded(cartModel)
        end)
    end
end)

--MASK_OFF_LEFT_HAND
--MASK_OFF_LEFT_HAND_RIFLE
--MASK_OFF_RIGHT_HAND
--BANDANA_OFF_LEFT_HAND
--BANDANA_OFF_LEFT_HAND_RIFLE
--BANDANA_OFF_RIGHT_HAND
--MASK_ON_LEFT_HAND
--MASK_ON_LEFT_HAND_RIFLE
--MASK_ON_RIGHT_HAND
--BANDANA_ON_LEFT_HAND
--BANDANA_ON_LEFT_HAND_RIFLE
--BANDANA_ON_RIGHT_HAND

local InvokeNative = Citizen.InvokeNative
local BANDANA_COMPONENT = `CLOTHING_ITEM_M_NECKERCHIEF_003_TINT_001`
local bandana = nil
local on = false
-- -2081918609 Boots underpants
RegisterCommand('bandanaon', function(source, args, rawCommand)
    local player = PlayerPedId()
    bandana = tonumber(args[1]) or bandana or BANDANA_COMPONENT
    if not on then
        on = true
        InvokeNative(0xD3A7B003ED343FD9, player, bandana, true, true)
        InvokeNative(0xAE72E7DF013AAA61, player, 0, `BANDANA_ON_RIGHT_HAND`, 1, 0, -1.0) -- _TASK_ITEM_INTERACTION
        Citizen.Wait(750)
    end
    InvokeNative(0x66B957AAC2EAAEAB, player, bandana, -1829635046, 0, true, 1)
    --InvokeNative(0x704C908E9C405136, player) -- FIX_OUTFIT
    InvokeNative(0xAAB86462966168CE, player, true)
    InvokeNative(0xCC8CA3E88256E58F, player, false, true, true, true, false) -- _UPDATE_PED_VARIATION
end)

RegisterCommand('bandanaoff', function(source, args, rawCommand)
    local player = PlayerPedId()
    bandana = tonumber(args[1]) or bandana or BANDANA_COMPONENT
    if on then
        on = false
        InvokeNative(0xAE72E7DF013AAA61, player, 0, `BANDANA_OFF_RIGHT_HAND`, 1, 0, -1.0) -- _TASK_ITEM_INTERACTION
        Citizen.Wait(750)
    end
    InvokeNative(0x66B957AAC2EAAEAB, player, bandana, `base`, 0, true, 1)
    --InvokeNative(0x704C908E9C405136, player) -- FIX_OUTFIT
    InvokeNative(0xAAB86462966168CE, player, true)
    InvokeNative(0xCC8CA3E88256E58F, player, false, true, true, true, false) -- _UPDATE_PED_VARIATION
end)

RegisterCommand('sometest', function(source, args, rawCommand)
    local player = PlayerPedId()
    InvokeNative(0x66B957AAC2EAAEAB, player, 1707193846, `open_collar_rolled_sleeve`, 0, true, 1)
    InvokeNative(0x704C908E9C405136, player) -- FIX_OUTFIT
    InvokeNative(0xAAB86462966168CE, player, true)
    InvokeNative(0xCC8CA3E88256E58F, player, false, true, true, true, false) -- _UPDATE_PED_VARIATION
    InvokeNative(0x66B957AAC2EAAEAB, player, 552411882, `Bounty_Hunter_L30`, 0, true, 1)
    InvokeNative(0x704C908E9C405136, player) -- FIX_OUTFIT
    InvokeNative(0xAAB86462966168CE, player, true)
    InvokeNative(0xCC8CA3E88256E58F, player, false, true, true, true, false) -- _UPDATE_PED_VARIATION
end)
