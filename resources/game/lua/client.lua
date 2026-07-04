--[[
    AMBIENT SPEECH — WHY THIS MUST BE LUA, NOT TYPESCRIPT
    -------------------------------------------------------
    PlayPedAmbientSpeechNative (0x8E04FEDD28D42462) requires a struct where the
    first two fields are 64-bit pointers returned by VarString (0xFA925AC00EB830B9).

    In TypeScript/JS, all numbers are IEEE 754 float64, which can only represent
    integers exactly up to 2^53. VarString returns a native memory pointer that
    routinely exceeds this range (e.g. 140696472996639), meaning the value is
    silently truncated when stored in a JS number. Writing this truncated value
    into the struct via DataView.setBigInt64 produces a garbage pointer, causing
    the native to crash with "exception at address RedM_GTAProcess.exe+25F799A".

    Lua integers are true 64-bit integers (no float precision loss), so VarString
    pointers survive the round-trip into the struct intact. There is no equivalent
    safe path in the CFX v8 scripting API — resultAsLong() still returns a JS
    number, losing the high bits. This function must remain in Lua.

    NOTE: The existing TypeScript export GameManager.playAmbientSpeechFromEntity
    (game-manager.ts) was tested and produces the same crash — BigInt(soundName)
    wraps an already-truncated JS number, so the high bits are already gone before
    BigInt sees the value. Do not attempt to move this back to TypeScript.
--]]

-- DataView implementation by gottfriedleibniz
-- https://gist.github.com/gottfriedleibniz/8ff6e4f38f97dd43354a60f8494eedff
local _strblob = string.blob or function(length) return string.rep("\0", math.max(40 + 1, length)) end
local DataView = { EndBig = ">", EndLittle = "<", Types = { Int8={code="i1",size=1}, Uint8={code="I1",size=1}, Int16={code="i2",size=2}, Uint16={code="I2",size=2}, Int32={code="i4",size=4}, Uint32={code="I4",size=4}, Int64={code="i8",size=8}, Uint64={code="I8",size=8}, LuaInt={code="j",size=8}, UluaInt={code="J",size=8}, LuaNum={code="n",size=8}, Float32={code="f",size=4}, Float64={code="d",size=8}, String={code="z",size=-1} }, FixedTypes={ String={code="c",size=-1}, Int={code="i",size=-1}, Uint={code="I",size=-1} } }
DataView.__index = DataView
local function _ib(o,l,t) return((t.size<0 and true)or(o+(t.size-1)<=l))end
local function _ef(big) return(big and DataView.EndBig)or DataView.EndLittle end
function DataView.ArrayBuffer(length) return setmetatable({offset=1,length=length,blob=_strblob(length)},DataView)end
function DataView.Wrap(blob) return setmetatable({offset=1,blob=blob,length=blob:len()},DataView)end
function DataView:Buffer() return self.blob end
function DataView:ByteLength() return self.length end
function DataView:ByteOffset() return self.offset end
function DataView:SubView(offset) return setmetatable({offset=offset,blob=self.blob,length=self.length},DataView)end
for label,datatype in pairs(DataView.Types) do
    DataView["Get"..label]=function(self,offset,endian) if _ib(offset,self.length,datatype) then local v=string.unpack(_ef(endian)..datatype.code,self.blob,self.offset+offset) return v end end
    DataView["Set"..label]=function(self,offset,value,endian) if _ib(offset,self.length,datatype) then self.blob=self.blob:sub(1,self.offset+offset-1)..string.pack(_ef(endian)..datatype.code,value)..self.blob:sub(self.offset+offset+datatype.size) end end
end

local function playAmbientSpeechFromEntity(entity, soundRef, soundName, speechParams, speechLine)
    local struct = DataView.ArrayBuffer(128)
    local sName  = Citizen.InvokeNative(0xFA925AC00EB830B9, 10, "LITERAL_STRING", soundName, Citizen.ResultAsLong())
    local sRef   = Citizen.InvokeNative(0xFA925AC00EB830B9, 10, "LITERAL_STRING", soundRef,  Citizen.ResultAsLong())
    local params = GetHashKey(speechParams)
    struct:SetInt64(0,  sName)
    struct:SetInt64(8,  sRef)
    struct:SetInt32(16, speechLine)
    struct:SetInt64(24, params)
    struct:SetInt32(32, 0)
    struct:SetInt32(40, 1)
    struct:SetInt32(48, 1)
    Citizen.InvokeNative(0x8E04FEDD28D42462, entity, struct:Buffer())
end

AddEventHandler('game:playAmbientSpeech', function(entity, soundRef, soundName, speechParams, speechLine)
    playAmbientSpeechFromEntity(entity, soundRef, soundName, speechParams, speechLine or 0)
end)

function getStateValue(entityId, key)
    if not entityId then
        return nil
    end
    return Entity(entityId).state[key]
end

exports('getStateValue', getStateValue)

function getChildEntity(entityId, name)
  if not entityId then
    return nil
  end
  local childEntityId = getStateValue(entityId, name)
  if childEntityId then
    return childEntityId
  end
  local childNetId = getStateValue(entityId, name .. 'NetId')
  if childNetId then
    childEntityId = NetworkGetEntityFromNetworkId(childNetId)
    Entity(entityId).state.set(name, childEntityId, false)
    return childEntityId
  end
end

exports('getChildEntity', getChildEntity)

function setPedFaceFeature(ped, index, scale)
    SetPedFaceFeature(ped, index, scale + 0.0)
end

exports('setPedFaceFeature', setPedFaceFeature)

function makeHorseMale(horsePed)
    SetPedFaceFeature(horsePed, 0xa28b, 0.0);
    Wait(10);
    Citizen.InvokeNative(0x704c908e9c405136, horsePed);
    Wait(10);
    UpdatePedVariation(horsePed, false, true, true, true, false);
end

exports('makeHorseMale', makeHorseMale)

function makeHorseFemale(horsePed)
    SetPedFaceFeature(horsePed, 0xa28b, 1.0);
    Wait(10);
    Citizen.InvokeNative(0x704c908e9c405136, horsePed);
    Wait(10);
    UpdatePedVariation(horsePed, false, true, true, true, false);
end

exports('makeHorseFemale', makeHorseFemale)
