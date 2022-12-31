sInvokeNative = Citizen.InvokeNative
IN = InvokeNative

RegisterCommand('srun', function(source, args, rawCommand)
    print(source)
    local command = string.sub(rawCommand, 6, string.len(rawCommand))
    print(command)
    local func, err = load('return ' .. command)
    local r = { func() }
    for k,v in pairs(r) do
        if tonumber(v) == nil then
            print('r' .. tostring(k), v)
        else
            v = tonumber(v)
            if tostring(v) == tostring(math.floor(v)) and pcall(function()
                local s = string.pack('i4', v)
                local f = string.unpack('f', s)
                print('r' .. tostring(k), v, f)
            end) then else
                print('r' .. tostring(k), v)
            end
        end
    end
    --Wait(1000)
end)
