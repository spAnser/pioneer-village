--[[
    RedM's JS native-calling ABI has no argument type for a mutable,
    variable-size output buffer (only single-value IntPtr/FloatPtr/VectorPtr
    pointers exist), so GET_EVENT_DATA can't be called directly from the TS
    side. Lua's binding treats strings as mutable byte buffers, so this thin
    helper does the native call here and hands the decoded int32 fields back
    to JS via export. This mirrors the proven-working pattern from the
    original events_manager resource's client/dateview.lua.

    Minimum 41 bytes forces a non-internalized string, since a mutable buffer
    aliasing Lua's interned string pool would corrupt it.
--]]
local function blob(length)
    return string.rep('\0', math.max(41, length))
end

--- @param group number event group (0=AI, 1=Network, 2=Scenario, 3=UI)
--- @param index number event index within that group's queue
--- @param size number number of int32 fields the event struct contains
--- @return number[]|nil fields, or nil if the native reported failure
local function decodeEvent(group, index, size)
    local buffer = blob(8 * size)

    local ok = Citizen.InvokeNative(0x57EC5FA4D4D6AFCA, group, index, buffer, size)
    if not ok then
        return nil
    end

    local fields = {}
    for i = 1, size do
        fields[i] = string.unpack('<i4', buffer, 1 + (i - 1) * 8)
    end
    return fields
end

exports('decodeEvent', decodeEvent)
