function deleteVehicle(entity)
    if entity and IsEntityAVehicle(entity) then
        print('Deleting Stuck Vehicle: ' .. entity)
        SetEntityAsMissionEntity(entity, true, true)
        DeletePed(entity)
        DeleteEntity(entity)
    end
end

local movingVehicles = {}

Citizen.CreateThread(function()
    while true do
        local vehicles = GetGamePool('CVehicle')

        for _,vehicle in pairs(vehicles) do
            if NetworkHasControlOfEntity(vehicle) then
                local driver = Citizen.InvokeNative(0x2963B5C1637E8A27, 2794498) -- GET_DRIVER_OF_VEHICLE
                if not driver or not IsPedAPlayer(driver) then
                    local isStuck = IsVehicleStuckTimerUp(vehicle, 3, 1000)
                    if isStuck then
                        local horse = Citizen.InvokeNative(0xA8BA0BAE0173457B, vehicle, 0) -- _GET_PED_IN_DRAFT_HARNESS
                        local horseSpeed = GetPedDesiredMoveBlendRatio(horse)
                        if horseSpeed > 0.5 or horseSpeed < -0.5 then
                            deleteVehicle(vehicle)
                        end
                    else
                        -- Since isStuck is unreliable we will also check position of vehicles with horses trying to move
                        local velocity = #GetEntityVelocity(vehicle)
                        if velocity == 0 then
                            local horse = Citizen.InvokeNative(0xA8BA0BAE0173457B, vehicle, 0) -- _GET_PED_IN_DRAFT_HARNESS
                            local horseSpeed = GetPedDesiredMoveBlendRatio(horse)
                            if horseSpeed ~= 0 then
                                if movingVehicles[vehicle] then
                                    local oldCoords = movingVehicles[vehicle]
                                    local coords = GetEntityCoords(vehicle)
                                    if
                                    math.floor(coords.x) == math.floor(oldCoords.x) and
                                            math.floor(coords.y) == math.floor(oldCoords.y) and
                                            math.floor(coords.z) == math.floor(oldCoords.z)
                                    then
                                        deleteVehicle(vehicle)
                                    end
                                    movingVehicles[vehicle] = nil
                                else
                                    movingVehicles[vehicle] = GetEntityCoords(vehicle)
                                end
                            end
                        end
                    end
                end
            end
        end
        Wait(10000)
    end
end)
