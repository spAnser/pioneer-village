function deleteVehicle(entity)
    if entity and IsEntityAVehicle(entity) then
        print('Deleting Stuck Vehicle: ' .. entity)
        exports['ui']:emitUI('log.message', {
            resource = GetCurrentResourceName(),
            message = 'Deleting Stuck Vehicle: ' .. entity,
        })
        SetEntityAsMissionEntity(entity, true, true)

        local seats = GetVehicleModelNumberOfSeats(GetEntityModel(vehicle))

        for i = 0, seats do
            local ped = GetPedInVehicleSeat(vehicle, i)
            if not IsPedAPlayer(ped) then
                SetEntityAsMissionEntity(ped, true, true)
                DeletePed(ped)
                DeleteEntity(ped)
            end
        end

        DeleteVehicleLanterns(entity)
        DeleteVehicle(entity)
        DeleteEntity(entity)
    end
end

local movingVehicles = {}

Citizen.CreateThread(function()
    while true do
        local vehicles = GetGamePool('CVehicle')

        for _,vehicle in pairs(vehicles) do
            if NetworkHasControlOfEntity(vehicle) then
                local seats = GetVehicleModelNumberOfSeats(GetEntityModel(vehicle))

                local hasPlayerInVehicle = false
                for i = 0, seats do
                    local ped = GetPedInVehicleSeat(vehicle, i)
                    if IsPedAPlayer(ped) then
                        hasPlayerInVehicle = true
                    end
                end

                if not hasPlayerInVehicle then
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
                                    if #(coords - oldCoords) < 1 then
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
