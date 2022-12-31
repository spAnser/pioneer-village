local inputHorseExit = GetHashKey('INPUT_HORSE_EXIT')
local inputVehExit = GetHashKey('INPUT_VEH_EXIT')

Citizen.CreateThread( function()
    Wait(500)

    local player = PlayerId()
    local playerPed = PlayerPedId()
    --local coords = GetEntityCoords(ply)

    while true do
        Wait(0)

        player = PlayerId()
        playerPed = PlayerPedId()
        --coords = GetEntityCoords(playerPed)

        mountPed = GetMount(playerPed)
        vehiclePed = GetVehiclePedIsUsing(playerPed)

        if mountPed == 0 then
            mountPed = nil
        end
        if vehiclePed == 0 then
            vehiclePed = nil
        end

        if noclip then
            DisableControlAction(0, inputHorseExit, true)
            DisableControlAction(0, inputVehExit, true)
            NoClipFnc(mountPed or vehiclePed or playerPed)
        end

        NoClipCheck(mountPed or vehiclePed or playerPed)

        --SetSuperJumpThisFrame()
        RestorePlayerStamina(player,100.0)
    end
end)

InvokeNative = Citizen.InvokeNative
IN = InvokeNative

RegisterCommand('crun', function(source, args, rawCommand)
    local command = GetTextSubstring(rawCommand, 5, GetLengthOfLiteralString(rawCommand))
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

function LoadModel(model)
    local attempts = 0
    while attempts < 100 and not HasModelLoaded(model) do
        RequestModel(model)
        Citizen.Wait(1)
        attempts = attempts + 1
    end
    return IsModelValid(model)
end

RegisterCommand('spawn', function(source, args, rawCommand)
    local player = PlayerPedId()
    local pCoords = GetEntityCoords(player)
    local pDir = GetEntityHeading(player)
    -- 0x405180B14DA5A935 SetPedType(entity, ??) -- Always makes PedType 4

    local spawnCoords = GetOffsetFromEntityInWorldCoords(player, 0.0, 3.0, 0.0)

    local modelName = args[1]
    local modelHash = tonumber(modelName)
    if nil == modelHash then
        modelHash = GetHashKey(modelName)
    end
    print(modelName .. " : " .. modelHash)
    print(modelName .. " : " .. GetHashKey(modelName))
    print(IsModelInCdimage(modelHash), IsModelAVehicle(modelHash), IsModelAPed(modelHash), IsModelValid(modelHash))
    if (IsModelAPed(modelHash)) then
        Citizen.CreateThread(function()
            LoadModel(modelHash)
            local isNetwork = true
            if args[2] == 'false' then
                isNetwork = false
            end
            local entity = CreatePed(modelHash, spawnCoords.x, spawnCoords.y, spawnCoords.z, pDir, isNetwork, false, false, false)
            SetEntityVisible(entity, true)
            SetEntityAlpha(entity, 255, false)
            Citizen.InvokeNative(0x283978A15512B2FE, entity, true)
            SetModelAsNoLongerNeeded(modelHash)
            SetEntityAsNoLongerNeeded(entity)
            print('Spawned: ', entity)

            if args[2] == 'true' then
                Citizen.InvokeNative(0xAEB97D84CDF3C00B, entity, true)
            end
        end)
    end
end)

RegisterCommand('vehicle', function(source, args, rawCommand)
    local player = PlayerPedId()
    local pCoords = GetEntityCoords(player)
    local pDir = GetEntityHeading(player)

    local spawnCoords = GetOffsetFromEntityInWorldCoords(player, 0, 2.0, 0)

    local modelName = args[1]
    local modelHash
    if not IsModelAVehicle(tonumber(args[1])) then
        modelHash = GetHashKey(modelName)
    else
        modelHash = tonumber(args[1])
    end
    print(modelName .. " : " .. modelHash)
    print(modelHash, IsModelInCdimage(modelHash), IsModelAVehicle(modelHash), IsModelAPed(modelHash), IsModelValid(modelHash), IsThisModelABoat(modelHash))
    if IsModelAVehicle(modelHash) then
        Citizen.CreateThread(function()
            LoadModel(modelHash)
            local entity = CreateVehicle(modelHash, spawnCoords.x, spawnCoords.y, spawnCoords.z, pDir - 90.0, true, false, false, false)
            SetEntityVisible(entity, true)
            --if not IsThisModelABoat(modelHash) then
            --    SetEntityAlpha(entity, 255, false)
            --end
            SetModelAsNoLongerNeeded(modelHash)
        end)
    end
end)

RegisterCommand('createObject', function(source, args, rawCommand)
    local player = PlayerPedId()
    local pCoords = GetEntityCoords(player)
    local pDir = GetEntityHeading(player)
    -- 0x405180B14DA5A935 SetPedType(entity, ??) -- Always makes PedType 4

    local spawnCoords = GetOffsetFromEntityInWorldCoords(player, 0.0, 3.0, -1.0)

    local modelName = args[1]
    local modelHash = tonumber(modelName)
    if nil == modelHash then
        modelHash = GetHashKey(modelName)
    end
    print(modelName .. " : " .. modelHash)
    print(modelName .. " : " .. GetHashKey(modelName))
    print(IsModelInCdimage(modelHash), IsModelAVehicle(modelHash), IsModelAPed(modelHash), IsModelValid(modelHash))
    if IsModelValid(modelHash) then
        Citizen.CreateThread(function()
            LoadModel(modelHash)
            local entity = CreateObject(modelHash, spawnCoords.x, spawnCoords.y, spawnCoords.z, pDir, true, true, false, false)
            SetModelAsNoLongerNeeded(modelHash)
            print('Created: ', entity)
        end)
    end
end)

RegisterCommand('imapActive', function(source, args, rawCommand)
    local imapName = args[1]
    local imapHash = tonumber(imapName)
    if nil == imapHash then
        imapHash = GetHashKey(imapName)
    end
    print(imapName, imapHash, IsImapActive(imapHash))
end)

RegisterCommand('imapLoad', function(source, args, rawCommand)
    local imapName = args[1]
    local imapHash = tonumber(imapName)
    if nil == imapHash then
        imapHash = GetHashKey(imapName)
    end
    --print(imapHash)
    if not IsImapActive(imapHash) then
        print("Loading imap " .. imapHash)
        RequestImap(imapHash)
    end
end)

RegisterCommand('imapUnload', function(source, args, rawCommand)
    local imapName = args[1]
    local imapHash = tonumber(imapName)
    if nil == imapHash then
        imapHash = GetHashKey(imapName)
    end
    --print(imapHash)
    if IsImapActive(imapHash) then
        print("Unloading imap " .. imapHash)
        RemoveImap(imapHash)
    end
end)

RegisterCommand('intUnload', function(source, args, rawCommand)
    local interiorSetId = tonumber(args[1])
    local interiorSetName = args[2]

    if IsInteriorEntitySetActive(interiorSetId, interiorSetName) then
        DeactivateInteriorEntitySet(interiorSetId, interiorSetName, true)
    end
end)

RegisterCommand('intLoad', function(source, args, rawCommand)
    local interiorSetId = args[1]
    local interiorSetName = args[2]

    if not IsInteriorEntitySetActive(interiorSetId, interiorSetName) then
        ActivateInteriorEntitySet(interiorSetId, interiorSetName)
    end
end)

-- ALWAYS NOON
--Citizen.CreateThread(function()
--    while true do
--        Wait(1000)
--        Citizen.InvokeNative(0x669E223E64B1903C, 12, 0, 0)
--    end
--end)
