local InvokeNative = Citizen.InvokeNative
local PlayerPedId = PlayerPedId
local GetEntityCoords = GetEntityCoords
local GetTemperatureAtCoords = GetTemperatureAtCoords

local argStruct = string.rep('\0', 0xff)
local argStruct2 = string.rep('\0', 0xff)

local warmthLevels = {
    [0xFD143D5] = -1, -- CI_TAG_ITEM_CLOTHING_NONE
    [0x8C776615] = 1, -- CI_TAG_ITEM_SLIGHTLY_WARM_CLOTHING
    [0xCF0F873A] = 2, -- CI_TAG_ITEM_REASONABLY_WARM_CLOTHING
    [0xC8ED2D2B] = 3, -- CI_TAG_ITEM_WARM_CLOTHING
    [0x9BDDBF61] = 4, -- CI_TAG_ITEM_VERY_WARM_CLOTHING
}

local cache = {
    ped = PlayerPedId()
}

local function cacheUpdate(data)
    cache = data
end

local floor = math.floor

local cacheEvent = AddEventHandler("events_manager:cache", cacheUpdate)
local temperature = {temperature = 0, warmth = 0}

LocalPlayer.state.temperature = temperature

CreateThread(function()
    while true do
        local pedCoords = GetEntityCoords(cache.ped)
        local pedComponentCount = InvokeNative(0x90403E8107B60E81, cache.ped) -- _GET_NUM_COMPONENTS_IN_PED

        temperature.warmth = 0
        temperature.temperature = floor(GetTemperatureAtCoords(pedCoords) + 0.5)

        if pedComponentCount then
            for i = 0, pedComponentCount - 1 do
                local component = InvokeNative(0x77BA37622E22023B, cache.ped, i, false, argStruct, argStruct2) -- _GET_PED_COMPONENT_AT_INDEX

                if InvokeNative(0x6D5D51B188333FD1, component, 0) then -- _ITEM_DATABASE_IS_KEY_VALID
                    for warmthTag,warmthValue in pairs(warmthLevels) do
                        if InvokeNative(0xFF5FB5605AD56856, component, warmthTag, 1120943070) then -- _ITEM_DATABASE_DOES_ITEM_HAVE_TAG
                            temperature.warmth = temperature.warmth + warmthValue
                            break
                        end
                    end
                end
            end
        end

        if LocalPlayer.state.temperature.warmth ~= temperature.warmth or LocalPlayer.state.temperature.temperature ~= temperature.temperature then
            LocalPlayer.state.temperature = temperature
            TriggerEvent("temperature_change", temperature)
        end
        --LocalPlayer.state.temperature = temperature

        Wait(1000)
    end
end)
