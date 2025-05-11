--[[
    Default, and assumed, LUAI_MAXSHORTLEN is 40. To create a non internalized
    string always force the buffer to be greater than that value.
--]]
local _strblob = string.blob or function(length)
    return string.rep("\0", math.max(40 + 1, length))
end

--[[
    API:
        DataView::{Get | Set}Int8
        DataView::{Get | Set}Uint8
        DataView::{Get | Set}Int16
        DataView::{Get | Set}Uint16
        DataView::{Get | Set}Int32
        DataView::{Get | Set}Uint32
        DataView::{Get | Set}Int64
        DataView::{Get | Set}Uint64
        DataView::{Get | Set}LuaInt
        DataView::{Get | Set}UluaInt
        DataView::{Get | Set}LuaNum
        DataView::{Get | Set}Float32
        DataView::{Get | Set}Float64
        DataView::{Get | Set}String
            Parameters:
                Get: self, offset, endian (optional)
                Set: self, offset, value, endian (optional)
        DataView::{GetFixed | SetFixed}::Int
        DataView::{GetFixed | SetFixed}::Uint
        DataView::{GetFixed | SetFixed}::String
            Parameters:
                Get: offset, typelen, endian (optional)
                Set: offset, typelen, value, endian (optional)
    NOTES:
        (1) Endianness changed from JS API, defaults to little endian.
        (2) {Get|Set|Next} offsets are zero-based.
    EXAMPLES:
        local view = DataView.ArrayBuffer(512)
        if Citizen.InvokeNative(0x79923CD21BECE14E, 1, view:Buffer(), Citizen.ReturnResultAnyway()) then
            local dlc = {
                validCheck = view:GetInt64(0),
                weaponHash = view:GetInt32(8),
                val3 = view:GetInt64(16),
                weaponCost = view:GetInt64(24),
                ammoCost = view:GetInt64(32),
                ammoType = view:GetInt64(40),
                defaultClipSize = view:GetInt64(48),
                nameLabel = view:GetFixedString(56, 64),
                descLabel = view:GetFixedString(120, 64),
                simpleDesc = view:GetFixedString(184, 64),
                upperCaseName = view:GetFixedString(248, 64),
            }
        end
--]]
DataView = {
    EndBig = ">",
    EndLittle = "<",
    Types = {
        Int8 = { code = "i1", size = 1 },
        Uint8 = { code = "I1", size = 1 },
        Int16 = { code = "i2", size = 2 },
        Uint16 = { code = "I2", size = 2 },
        Int32 = { code = "i4", size = 4 },
        Uint32 = { code = "I4", size = 4 },
        Int64 = { code = "i8", size = 8 },
        Uint64 = { code = "I8", size = 8 },

        LuaInt = { code = "j", size = 8 }, -- a lua_Integer
        UluaInt = { code = "J", size = 8 }, -- a lua_Unsigned
        LuaNum = { code = "n", size = 8}, -- a lua_Number
        Float32 = { code = "f", size = 4 }, -- a float (native size)
        Float64 = { code = "d", size = 8 }, -- a double (native size)
        String = { code = "z", size = -1, }, -- zero terminated string
    },

    FixedTypes = {
        String = { code = "c", size = -1, }, -- a fixed-sized string with n bytes
        Int = { code = "i", size = -1, }, -- a signed int with n bytes
        Uint = { code = "I", size = -1, }, -- an unsigned int with n bytes
    },
}
DataView.__index = DataView

--[[ Is a dataview type at a specific offset still within buffer length --]]
local function _ib(o, l, t) return ((t.size < 0 and true) or (o + (t.size - 1) <= l)) end
local function _ef(big) return (big and DataView.EndBig) or DataView.EndLittle end

--[[ Helper function for setting fixed datatypes within a buffer --]]
local SetFixed = nil

--[[ Create an ArrayBuffer with a size in bytes --]]
function DataView.ArrayBuffer(length)
    return setmetatable({
        offset = 1, length = length, blob = _strblob(length)
    }, DataView)
end

--[[ Wrap a non-internalized string --]]
function DataView.Wrap(blob)
    return setmetatable({
        offset = 1, blob = blob, length = blob:len(),
    }, DataView)
end

function DataView:Buffer() return self.blob end
function DataView:ByteLength() return self.length end
function DataView:ByteOffset() return self.offset end
function DataView:SubView(offset)
    return setmetatable({
        offset = offset, blob = self.blob, length = self.length,
    }, DataView)
end

--[[ Create the API by using DataView.Types. --]]
for label,datatype in pairs(DataView.Types) do
    DataView["Get" .. label] = function(self, offset, endian)
        local o = self.offset + offset
        if _ib(o, self.length, datatype) then
            local v,_ = string.unpack(_ef(endian) .. datatype.code, self.blob, o)
            return v
        end
        return nil -- Out of bounds
    end

    DataView["Set" .. label] = function(self, offset, value, endian)
        local o = self.offset + offset
        if _ib(o, self.length, datatype) then
            return SetFixed(self, o, value, _ef(endian) .. datatype.code)
        end
        return self -- Out of bounds
    end

    -- Ensure cache is correct.
    if datatype.size >= 0 and string.packsize(datatype.code) ~= datatype.size then
        local msg = "Pack size of %s (%d) does not match cached length: (%d)"
        error(msg:format(label, string.packsize(fmt[#fmt]), datatype.size))
        return nil
    end
end

for label,datatype in pairs(DataView.FixedTypes) do
    DataView["GetFixed" .. label] = function(self, offset, typelen, endian)
        local o = self.offset + offset
        if o + (typelen - 1) <= self.length then
            local code = _ef(endian) .. "c" .. tostring(typelen)
            local v,_ = string.unpack(code, self.blob, o)
            return v
        end
        return nil -- Out of bounds
    end

    DataView["SetFixed" .. label] = function(self, offset, typelen, value, endian)
        local o = self.offset + offset
        if o + (typelen - 1) <= self.length then
            local code = _ef(endian) .. "c" .. tostring(typelen)
            return SetFixed(self, o, value, code)
        end
        return self
    end
end

--[[ Helper function for setting fixed datatypes within a buffer --]]
SetFixed = function(self, offset, value, code)
    local fmt = { }
    local values = { }

    -- All bytes prior to the offset
    if self.offset < offset then
        local size = offset - self.offset
        fmt[#fmt + 1] = "c" .. tostring(size)
        values[#values + 1] = self.blob:sub(self.offset, size)
    end

    fmt[#fmt + 1] = code
    values[#values + 1] = value

    -- All bytes after the value (offset + size) to the end of the buffer
    -- growing the buffer if needed.
    local ps = string.packsize(fmt[#fmt])
    if (offset + ps) <= self.length then
        local newoff = offset + ps
        local size = self.length - newoff + 1

        fmt[#fmt + 1] = "c" .. tostring(size)
        values[#values + 1] = self.blob:sub(newoff, self.length)
    end

    self.blob = string.pack(table.concat(fmt, ""), table.unpack(values))
    self.length = self.blob:len()
    return self
end


Config = {
    DevMode = true,
    Command = "cyclewearablestate",
}

if Config.DevMode then
    local cycleWearableStateKeys = {
        forward = `INPUT_PREV_WEAPON`,
        backward = `INPUT_NEXT_WEAPON`,
        next = `INPUT_SELECT_QUICKSELECT_SECONDARY_LONGARM`,
        previous = `INPUT_SELECT_QUICKSELECT_MELEE_NO_UNARMED`,
    }

    local cycleWearableStates = false
    RegisterCommand(Config.Command, function(source, args, raw) -- SETUP FOR MP MALE/FEMALE
        cycleWearableStates = not cycleWearableStates
        local ped = args[1] and tonumber(args[1]) or PlayerPedId()
        local isPedMale = IsPedMale(ped)
        local numComponents = GetNumComponentsInPed(ped)
        local componentsWithWearableState = {}
        for componentIndex = 0, numComponents - 1, 1 do
            local componentHash = GetComponentAtIndex(ped, componentIndex, true)
            if componentHash ~= 0 then
                local numWearableStates = Citizen.InvokeNative(0xFFCC2DB2D9953401, componentHash, not isPedMale, true, Citizen.ResultAsInteger())

                if numWearableStates > 0 then
                    local wearableStates = { `base` }
                    for wearableStateIndex = 0, numWearableStates - 1, 1 do
                        local wearableState = Citizen.InvokeNative(0x6243635AF2F1B826, componentHash, wearableStateIndex, not isPedMale, true, Citizen.ResultAsInteger())
                        if wearableState ~= 0 then
                            table.insert(wearableStates, wearableState)
                        end
                    end
                    table.insert(componentsWithWearableState,
                        {
                            componentHash = componentHash,
                            componentCategory = Citizen.invokeNative('0x9b90842304c938a7', ped, componentIndex),
                            wearableStates = wearableStates
                        })
                end
            end
        end

        if #componentsWithWearableState < 1 then
            print("no components with wearable state")
            return
        end

        local index = 1
        function Cycle(forward)
            if not forward then
                index = index - 1
            else
                index = index + 1
            end
            if index > #componentsWithWearableState then
                index = 1
            elseif index < 1 then
                index = #componentsWithWearableState
            end
            print(MetaPedCategoryTags[isPedMale and "maleTags" or "femaleTags"][componentsWithWearableState[index].componentCategory], "componentCategory")
        end

        local index2 = 1
        function Cycle2(forward)
            if not forward then
                index2 = index2 - 1
            else
                index2 = index2 + 1
            end
            if index2 > #componentsWithWearableState[index].wearableStates then
                index2 = 1
            elseif index2 < 1 then
                index2 = #componentsWithWearableState[index].wearableStates
            end
            print(index2, "component", componentsWithWearableState[index].componentHash, "wearablestate:", componentsWithWearableState[index].wearableStates[index2])
            Citizen.InvokeNative(0x66B957AAC2EAAEAB, ped, componentsWithWearableState[index].componentHash, componentsWithWearableState[index].wearableStates[index2], 0, true, 1)
            Citizen.InvokeNative(0xCC8CA3E88256E58F, PlayerPedId(), false, true, true, true, false)
        end

        function InputCheckLoop()
            if IsDisabledControlJustPressed(0, cycleWearableStateKeys.backward) then
                Cycle2(false)
            elseif IsDisabledControlJustPressed(0, cycleWearableStateKeys.forward) then
                Cycle2(true)
            elseif IsDisabledControlJustPressed(0, cycleWearableStateKeys.previous) then
                Cycle(false)
            elseif IsDisabledControlJustPressed(0, cycleWearableStateKeys.next) then
                Cycle2(true)
            end
        end

        function DisableControls(controls)
            for key, hash in pairs(controls) do
                DisableControlAction(0, hash, true)
            end
        end

        Citizen.CreateThread(function()
            while cycleWearableStates do
                DisableControls(cycleWearableStateKeys)
                Wait(0)
            end
        end)

        while cycleWearableStates do
            InputCheckLoop()
            Wait(0)
        end
    end, false)

    function GetNumComponentsInPed(ped)
        return Citizen.InvokeNative(0x90403E8107B60E81, ped)
    end

    function GetComponentAtIndex(ped, componentIndex, isMultiplayer)
        local dataStruct = DataView.ArrayBuffer(6 * 8)
        local componentHash = GetShopPedComponentAtIndex(ped, componentIndex, isMultiplayer, dataStruct:Buffer(),
            dataStruct:Buffer(), Citizen.ResultAsInteger())
        return componentHash
    end

    function GetShopPedComponentAtIndex(ped, index, bool, struct1, struct2)
        return Citizen.InvokeNative(0x77BA37622E22023B, ped, index, bool, struct1, struct2)
    end

    function Citizen.invokeNative('0x9b90842304c938a7', ped, componentIndex)
        return Citizen.InvokeNative(0x9b90842304c938a7, ped, componentIndex, 0) -- _GET_CATEGORY_OF_COMPONENT_AT_INDEX
    end

    MetaPedCategoryTags = {
        maleTags = {
            [`accessories`]           = "accessories",
            [`ammo_pistols`]          = "ammo_pistols",
            [`ammo_rifles`]           = "ammo_rifles",
            [`ankle_bindings`]        = "ankle_bindings",
            [`aprons`]                = "aprons",
            [`armor`]                 = "armor",
            [`badges`]                = "badges",
            [`beards_chin`]           = "beards_chin",
            [`beards_chops`]          = "beards_chops",
            [`beards_complete`]       = "beards_complete",
            [`beards_mustache`]       = "beards_mustache",
            [`belts`]                 = "belts",
            [`belt_buckles`]          = "belt_buckles",
            [`bodies_lower`]          = "bodies_lower",
            [`bodies_upper`]          = "bodies_upper",
            [`boots`]                 = "boots",
            [`boot_accessories`]      = "boot_accessories",
            [`chaps`]                 = "chaps",
            [`cloaks`]                = "cloaks",
            [`coats`]                 = "coats",
            [`coats_closed`]          = "coats_closed",
            [`coats_heavy`]           = "coats_heavy",
            [`dresses`]               = "dresses",
            [`eyebrows`]              = "eyebrows",
            [`eyes`]                  = "eyes",
            [`eyewear`]               = "eyewear",
            [`gauntlets`]             = "gauntlets",
            [`gloves`]                = "gloves",
            [`gunbelt_accs`]          = "gunbelt_accs",
            [`gunbelts`]              = "gunbelts",
            [`hair`]                  = "hair",
            [`hair_accessories`]      = "hair_accessories",
            [`hats`]                  = "hats",
            [`heads`]                 = "heads",
            [`holsters_crossdraw`]    = "holsters_crossdraw",
            [`holsters_knife`]        = "holsters_knife",
            [`holsters_left`]         = "holsters_left",
            [`holsters_right`]        = "holsters_right",
            [`jewelry_bracelets`]     = "jewelry_bracelets",
            [`jewelry_rings_left`]    = "jewelry_rings_left",
            [`jewelry_rings_right`]   = "jewelry_rings_right",
            [`loadouts`]              = "loadouts",
            [`masks`]                 = "masks",
            [`masks_large`]           = "masks_large",
            [`neckties`]              = "neckties",
            [`neckwear`]              = "neckwear",
            [`outfits`]               = "outfits",
            [`pants`]                 = "pants",
            [`ponchos`]               = "ponchos",
            [`satchels`]              = "satchels",
            [`shirts_full`]           = "shirts_full",
            [`shirts_full_overpants`] = "shirts_full_overpants",
            [`skirts`]                = "skirts",
            [`spats`]                 = "spats",
            [`suspenders`]            = "suspenders",
            [`talisman_belt`]         = "talisman_belt",
            [`talisman_holster`]      = "talisman_holster",
            [`talisman_satchel`]      = "talisman_satchel",
            [`talisman_wrist`]        = "talisman_wrist",
            [`teeth`]                 = "teeth",
            [`vests`]                 = "vests",
            [`wrist_bindings`]        = "wrist_bindings",
        },

        femaleTags = {
            [`accessories`]         = "accessories",
            [`ammo_pistols`]        = "ammo_pistols",
            [`ammo_rifles`]         = "ammo_rifles",
            [`ankle_bindings`]      = "ankle_bindings",
            [`aprons`]              = "aprons",
            [`armor`]               = "armor",
            [`badges`]              = "badges",
            [`belts`]               = "belts",
            [`belt_buckles`]        = "belt_buckles",
            [`bodies_lower`]        = "bodies_lower",
            [`bodies_upper`]        = "bodies_upper",
            [`boots`]               = "boots",
            [`boot_accessories`]    = "boot_accessories",
            [`chaps`]               = "chaps",
            [`cloaks`]              = "cloaks",
            [`coats`]               = "coats",
            [`coats_closed`]        = "coats_closed",
            [`coats_heavy`]         = "coats_heavy",
            [`dresses`]             = "dresses",
            [`eyebrows`]            = "eyebrows",
            [`eyes`]                = "eyes",
            [`eyewear`]             = "eyewear",
            [`gauntlets`]           = "gauntlets",
            [`gloves`]              = "gloves",
            [`gunbelt_accs`]        = "gunbelt_accs",
            [`gunbelts`]            = "gunbelts",
            [`hair`]                = "hair",
            [`hair_accessories`]    = "hair_accessories",
            [`hats`]                = "hats",
            [`heads`]               = "heads",
            [`holsters_left`]       = "holsters_left",
            [`holsters_right`]      = "holsters_right",
            [`jewelry_bracelets`]   = "jewelry_bracelets",
            [`jewelry_rings_left`]  = "jewelry_rings_left",
            [`jewelry_rings_right`] = "jewelry_rings_right",
            [`loadouts`]            = "loadouts",
            [`masks`]               = "masks",
            [`neckwear`]            = "neckwear",
            [`neckties`]            = "neckties",
            [`outfits`]             = "outfits",
            [`pants`]               = "pants",
            [`ponchos`]             = "ponchos",
            [`satchels`]            = "satchels",
            [`shirts_full`]         = "shirts_full",
            [`skirts`]              = "skirts",
            [`spats`]               = "spats",
            [`stockings`]           = "stockings",
            [`suspenders`]          = "suspenders",
            [`teeth`]               = "teeth",
            [`vests`]               = "vests",
            [`wrist_bindings`]      = "wrist_bindings",
        },

    }
end
