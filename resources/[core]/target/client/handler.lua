Target = {}

local Wait = Wait

local GetEntityType = GetEntityType
local GetEntityModel = GetEntityModel
local GetEntityCoords = GetEntityCoords
local DisablePlayerFiring = DisablePlayerFiring
local SetCursorLocation = SetCursorLocation
local GetGameTimer = GetGameTimer
local GetScreenCoordFromWorldCoord = GetScreenCoordFromWorldCoord
local DrawSprite = DrawSprite
local RequestStreamedTextureDict = RequestStreamedTextureDict
local HasStreamedTextureDictLoaded = HasStreamedTextureDictLoaded

local StartShapeTestSweptSphere = StartShapeTestSweptSphere
local GetShapeTestResult = GetShapeTestResult

local GetFinalRenderedCamFov = GetFinalRenderedCamFov
local GetFinalRenderedCamCoord = GetFinalRenderedCamCoord
local GetFinalRenderedCamRot = GetFinalRenderedCamRot

local glm = require 'glm'
local glm_rad = glm.rad
local glm_quatEuler = glm.quatEulerAngleZYX
local glm_rayPicking = glm.rayPicking
local glm_up = glm.up()
local glm_forward = glm.forward()

--- @param t table to get length of
--- @return number
local function tlen(t)
    local retval = 0

    for k,v in pairs(t) do
        retval = retval + 1
    end

    return retval
end

--- Checks (and caches, throttled) whether a point's own isEnabled passes
--- @param point table The point with .id and .options fields
--- @param pedCoords vector3 Current ped coords
--- @param coord vector3 The specific point coord being evaluated
--- @return boolean
local function isPointEnabled(point, pedCoords, coord)
    if not point.options or not point.options.isEnabled then
        return true
    end

    local cacheKey = ("%s_point"):format(point.id)
    local cached = Target.enabledCache[cacheKey]
    local currentTime = GetGameTimer()

    if cached and currentTime < cached.expiry then
        return cached.result
    end

    local result = point.options.isEnabled({
        distance = #(pedCoords - coord),
        coords = coord,
    })
    local enabledTime = point.options.enabledThrottle or point.options.throttle or Target.enabledThrottle
    local disabledTime = point.options.disabledThrottle or point.options.throttle or Target.disabledThrottle
    Target.enabledCache[cacheKey] = {
        result = result,
        expiry = currentTime + (result and enabledTime or disabledTime)
    }
    return result
end

--- Checks if a target has at least one enabled item (fast bail-out for active highlight)
--- @param target table The target with .data and .hasItemEnabled fields
--- @param data table The isEnabled context data
--- @return boolean
local function hasEnabledItems(target, data)
    if not target.hasItemEnabled then
        return true
    end
    for _, action in ipairs(target.data) do
        if not action.isEnabled or action.isEnabled(data) then
            return true
        end
    end
    return false
end

--- Collects actions from a target/zone/point, filtering by per-item isEnabled when present
--- @param target table The target with .data and .hasItemEnabled fields
--- @param data table The isEnabled context data (distance, coords, entity, etc.)
--- @param allActions table The table to append matching actions to
local function collectActions(target, data, allActions)
    if target.hasItemEnabled then
        for _, action in ipairs(target.data) do
            if not action.isEnabled or action.isEnabled(data) then
                table.insert(allActions, action)
            end
        end
    else
        for _, action in ipairs(target.data) do
            table.insert(allActions, action)
        end
    end
end

function RegisterKeyMapping()
    while GetResourceState("keymapper") ~= "started" do
        Wait(1000)
    end

    --exports.keymapper:RegisterKeyMapping("eye_target", "Eye Target", "raw", "LMENU")
    exports.keymapper:RegisterKeyMapping("eye_target", "Eye Target", "game", "LALT")
    exports.keymapper:RegisterKeyMapping("eye_target:click", "Eye Target Use", "game", "MOUSE1")
end

--- @param threadId number
function Target.Start(threadId)
    self = self or Target

    setmetatable(Target, {
        __call = self.Enable
    })

    self.intersect = {
        -- 1, -- World - Ground
        2, -- Vehicles (Probably included with entity (8) ?)
        4, -- Ped (Probably included with entity (8) ?)
        8, -- Entity (Not sure but acts weird ?)
        16, -- Items - Pelts / Buckets / Brooms / Power Poles / Lasso
        -- 32, -- Pickup Weapon
        -- 64, -- Glass - Breakable? (I don think we want to use this one ?)
        128, -- Water
        256, -- Shrubs / Bushes / Small Trees
        -- 512, -- Road / Zone ? ( I don think we want to use this one ?)
         1024, -- Horse Ped (Probably included with entity(8) ?)
        -- 2048, -- Horse Entity (Probably included with entity(8) ?)
    }

    self.targets = {}
    self.zones = {}
    self.points = {}
    self.class = {}
    self.enabledCache = {} -- Cache for isEnabled results with throttling
    self.pointSpriteDefaults = {
        dict = 'rpg_textures',
        name = 'rpg_background',
        r = 255, g = 255, b = 255, a = 200,
        scale = 0.012
    }
    RequestStreamedTextureDict(self.pointSpriteDefaults.dict)

    setmetatable(self.targets, {
        __call = function(self, data)
            local matched = {}

            for _, v in pairs(self) do
                local this = v(data)
                if this then
                    table.insert(matched, this)
                end
            end

            return matched
        end
    })

    setmetatable(self.zones, {
        __call = function(self, data)
            local matchedZones = {}

            for _, v in pairs(self) do
                local this = v(data)

                if this then
                    table.insert(matchedZones, this)
                end
            end

            return matchedZones
        end
    })

    setmetatable(self.class, {
        __call = function(self,model,group)
            return self[model] and self[model][group] and true or false
        end
    })

    self.cache = {
        ped = PlayerPedId(),
        pedCoords = GetEntityCoords(PlayerPedId())
    }

    -- Throttle configuration (milliseconds)
    -- Support both old and new naming for backwards compatibility
    self.throttleDelay = tonumber(GetConvar("target:throttle_delay", "500")) or 500 -- Deprecated, kept for backwards compatibility
    self.throttle = tonumber(GetConvar("target:throttle", "500")) or 500 -- Generic throttle for both states
    self.disabledThrottle = tonumber(GetConvar("target:disabled_throttle", "500")) or 500 -- Throttle when isEnabled returns false
    self.enabledThrottle = tonumber(GetConvar("target:enabled_throttle", "100")) or 100 -- Throttle when isEnabled returns true

    self.name = GetCurrentResourceName()
    self.active = false
    self.distance = tonumber(GetConvar(("%s:raycast_distance"):format(self.name), "10")) or 10

    RegisterCommand('+eye_target', function() Target(true) end)
    RegisterCommand('-eye_target', function() Target(false) end)

    RegisterCommand('+eye_target:click', function() self.click = true end)
    RegisterCommand('-eye_target:click', function() self.click = false end)

    self.cacheHandler = AddEventHandler("events_manager:cache", self.UpdateCache)

    self.ready = true

    RegisterKeyMapping()

    Wait(500)
    Citizen.CreateThread(function()
        Target(true)
    end)
    Wait(500)
    Target(false)
end

--- @return table position
--- @return table direction
function Target:Direction()
    local pos = GetFinalRenderedCamCoord()
    local rot = glm_rad(GetFinalRenderedCamRot(2))
    local q = glm_quatEuler(rot.z, rot.y, rot.x)
    return pos, glm_rayPicking(
        q * glm_forward,
        q * glm_up,
        glm_rad(self.fov),
        self.ratio,
        0.10000,
        10000.0,
        0, 0
    )
end

--- @param map boolean Intersect with the world only
function Target:RayCast(map)
    local position, direction = self:Direction()
    local destination = position + 10000 * direction

    --Citizen.InvokeNative((GetHashKey('DRAW_LINE') & 0xFFFFFFFF), position.x, position.y, position.z, destination.x, destination.y, destination.z, 255, 0, 255, 255)
    if not map then
        local flags = 0
        for _,v in ipairs(self.intersect) do
            flags = flags + v
        end
        local shapeTestSphere = StartShapeTestSweptSphere(position.x, position.y, position.z, destination.x, destination.y, destination.z, 0.5, flags, self.cache.ped, 7)

        while true do
            local retval, hit, endCoords, surfaceNormal, entityHit = GetShapeTestResult(shapeTestSphere)

            if retval == 2 then
                if hit == 1 then
                    return hit, endCoords, entityHit
                else
                    break
                end
            end

            Wait(0)
        end
    else
        local shapeTestSphere = StartShapeTestSweptSphere(position.x, position.y, position.z, destination.x, destination.y, destination.z, 0.5, 1, self.cache.ped, 7)

        while true do
            local retval, hit, endCoords, surfaceNormal, entityHit = GetShapeTestResult(shapeTestSphere)

            if retval == 2 then
                if hit == 1 then
                    return hit, endCoords, entityHit
                else
                    break
                end
            end

            Wait(0)
        end
    end
end

function Target.GetEntityPlayerIsLookingAt(distance, radius, flags, ignore)
    self = Target

    local position, direction = self:Direction()
    local destination = position + distance * direction

    local shapeTestSphere = StartShapeTestSweptSphere(position.x, position.y, position.z, destination.x, destination.y, destination.z, radius, flags, ignore or self.cache.ped, 7)

    while true do
        local retval, hit, endCoords, surfaceNormal, entityHit = GetShapeTestResult(shapeTestSphere)

        if retval == 2 then
            if hit == 1 then
                return entityHit
            else
                break
            end
        end

        Wait(0)
    end
end

exports("GetEntityPlayerIsLookingAt", Target.GetEntityPlayerIsLookingAt)

--- @param cache table cache data
function Target.UpdateCache(cache)
    Target.cache = cache
end

--- @param state boolean activeState
function Target:Enable(state)
    self.active = state

    if not self.active then
        -- Clear cache when targeting is disabled
        self.enabledCache = {}
        return
    end

    self.ratio = 1.77 -- GetAspectRatio(true) Doesn't seem to work on rdr and im not quite sure how i could do it :nikezMald:
    self.fov = GetFinalRenderedCamFov()

    --SendNuiMessage({show = true})
    exports['ui']:emitUI('target.state', { show = true })

    -- Point target rendering and interaction runs in its own thread
    -- so it doesn't flicker when entity/zone ray-cast inner loops block the main loop
    Citizen.CreateThread(function()
        while self.active do
            local pedCoords = GetEntityCoords(self.cache.ped)
            local matchedPoints = {} -- All points passing interaction checks at the best coord
            local bestCoord = nil
            local bestScreenDist = 999
            local bestInteractDist = 999 -- Track largest interact distance among matched points
            local drewAny = false

            for _, point in pairs(self.points) do
                for _, coord in ipairs(point.coords) do
                    local dist = #(pedCoords - coord)

                    -- Tier 1: renderDistance culling
                    if dist <= point.options.renderDistance then
                        local onScreen, sx, sy = GetScreenCoordFromWorldCoord(coord.x, coord.y, coord.z)

                        if onScreen then
                            -- LOS check
                            local passLos = true
                            if point.options.losCheck then
                                passLos = Citizen.InvokeNative(0x0267D00AF114F17A, self.cache.ped, coord.x, coord.y, coord.z, 17)
                            end

                            if passLos then
                                -- Scale: full size within interact distance, fade to 0 at renderDistance
                                local sprite = point.options.sprite
                                local scaleFactor = sprite.scale
                                if dist > point.options.distance then
                                    scaleFactor = sprite.scale * (1.0 - (dist - point.options.distance) / (point.options.renderDistance - point.options.distance))
                                end

                                if not HasStreamedTextureDictLoaded(sprite.dict) then
                                    RequestStreamedTextureDict(sprite.dict, false)
                                else
                                    -- Dim the marker when the point's isEnabled check currently fails,
                                    -- so players can tell an out-of-range/inactive target apart from an active one.
                                    local pointEnabled = isPointEnabled(point, pedCoords, coord)
                                    local r, g, b, a = sprite.r, sprite.g, sprite.b, sprite.a
                                    if not pointEnabled then
                                        r, g, b = 169, 169, 169
                                    end

                                    DrawMarker(
                                        GetHashKey('MARKERTYPE_SPHERE'),
                                        coord.x, coord.y, coord.z,
                                        0, 0, 0,
                                        0, 0, 0,
                                        scaleFactor, scaleFactor, scaleFactor,
                                        r, g, b, a,
                                        false, false, 2, false, 0, 0, false
                                    )
                                    drewAny = true
                                end

                                -- Tier 2: interactDistance check for interaction
                                if dist <= point.options.distance then
                                    local screenDist = math.sqrt((sx - 0.5) ^ 2 + (sy - 0.5) ^ 2)

                                    if screenDist <= point.options.screenThreshold then
                                        if screenDist < bestScreenDist then
                                            -- New best coord — reset matched points
                                            matchedPoints = { point }
                                            bestCoord = coord
                                            bestScreenDist = screenDist
                                            bestInteractDist = point.options.distance
                                        elseif coord == bestCoord or (bestCoord and coord.x == bestCoord.x and coord.y == bestCoord.y and coord.z == bestCoord.z) then
                                            -- Same coord as current best — combine
                                            table.insert(matchedPoints, point)
                                            if point.options.distance > bestInteractDist then
                                                bestInteractDist = point.options.distance
                                            end
                                        end
                                    end
                                end
                            end
                        end
                    end
                end
            end

            if #matchedPoints > 0 then
                -- isEnabled check with throttle cache for each matched point
                local enabledPoints = {}
                for _, point in ipairs(matchedPoints) do
                    local passEnabled = true
                    if point.options and point.options.isEnabled then
                        local cacheKey = ("%s_point"):format(point.id)
                        local cached = self.enabledCache[cacheKey]
                        local currentTime = GetGameTimer()

                        if cached and currentTime < cached.expiry then
                            passEnabled = cached.result
                        else
                            local result = point.options.isEnabled({
                                distance = #(pedCoords - bestCoord),
                                coords = bestCoord,
                            })
                            local enabledTime = point.options.enabledThrottle or point.options.throttle or self.enabledThrottle
                            local disabledTime = point.options.disabledThrottle or point.options.throttle or self.disabledThrottle
                            self.enabledCache[cacheKey] = {
                                result = result,
                                expiry = currentTime + (result and enabledTime or disabledTime)
                            }
                            passEnabled = result
                        end
                    end
                    if passEnabled then
                        table.insert(enabledPoints, point)
                    end
                end

                if #enabledPoints > 0 then
                    -- Check if any enabled point has at least one enabled item before highlighting
                    local pointData = {
                        distance = #(pedCoords - bestCoord),
                        coords = bestCoord,
                    }
                    local anyItemEnabled = false
                    for _, point in ipairs(enabledPoints) do
                        if hasEnabledItems(point, pointData) then
                            anyItemEnabled = true
                            break
                        end
                    end

                    if not anyItemEnabled then
                        goto continue_point_loop
                    end

                    exports['ui']:emitUI('target.state', { active = true })

                    self:DisablePlayerFiring()

                    while self.active do
                        Wait(0)

                        -- Re-check distance and screen proximity using largest interact distance
                        pedCoords = GetEntityCoords(self.cache.ped)
                        local dist = #(pedCoords - bestCoord)
                        if dist > bestInteractDist then
                            break
                        end

                        local onScreen, sx, sy = GetScreenCoordFromWorldCoord(bestCoord.x, bestCoord.y, bestCoord.z)
                        if not onScreen then
                            break
                        end

                        -- Keep rendering the sprite while interacting (use first enabled point's sprite)
                        local sprite = enabledPoints[1].options.sprite
                        local scaleFactor = sprite.scale
                        if HasStreamedTextureDictLoaded(sprite.dict) then
                            DrawMarker(
                                GetHashKey('MARKERTYPE_SPHERE'),
                                bestCoord.x, bestCoord.y, bestCoord.z,
                                0, 0, 0,
                                0, 0, 0,
                                scaleFactor, scaleFactor, scaleFactor,
                                sprite.r, sprite.g, sprite.b, sprite.a,
                                false, false, 2, false,
                                0, 0,
                                false
                            )
                        end

                        -- Use smallest screenThreshold among enabled points
                        local minThreshold = enabledPoints[1].options.screenThreshold
                        for i = 2, #enabledPoints do
                            if enabledPoints[i].options.screenThreshold < minThreshold then
                                minThreshold = enabledPoints[i].options.screenThreshold
                            end
                        end

                        local screenDist = math.sqrt((sx - 0.5) ^ 2 + (sy - 0.5) ^ 2)
                        if screenDist > minThreshold then
                            break
                        end

                        if self.click then
                            self.click = false
                            SetCursorLocation(0.5, 0.5)

                            -- Collect actions from all enabled points, filtering per-item isEnabled
                            local allActions = {}
                            local pointData = {
                                distance = dist,
                                coords = bestCoord,
                            }
                            for _, point in ipairs(enabledPoints) do
                                collectActions(point, pointData, allActions)
                            end

                            if #allActions > 0 then
                                exports['ui']:emitUI('target.state', {
                                    show = false,
                                    context = 'point',
                                    actions = allActions
                                })
                                exports['ui']:focusUI(true, true)
                            end
                        end
                    end

                    self:DisablePlayerFiring()
                    exports['ui']:emitUI('target.state', { active = false, type = -1, flag = '' })
                end
            end

            ::continue_point_loop::
            Wait(0)
        end
    end)

    repeat
        local hit, coords, entity = self:RayCast()

        if hit == 1 then
            self.cache.pedCoords = GetEntityCoords(self.cache.ped)

            local data = {
                playerPed = self.cache.ped,
                entity = entity,
                type = GetEntityType(entity),
                model = GetEntityType(entity) ~= 0 and GetEntityModel(entity),
                coords = coords,
                distance = #(self.cache.pedCoords - coords)
            }

            local dstCheck = data.distance <= self.distance

            local flag = ''

            local isHorse = IsThisModelAHorse(data.model)
            local isBoat = IsThisModelABoat(data.model)
            local isVehicle = IsThisModelADraftVehicle(data.model)
            local isTrain = IsThisModelATrain(data.model)

            if isHorse == 1 or isHorse == true then
                flag = 'isHorse'
            end

            if isBoat == 1 or isBoat == true then
                flag = 'isBoat'
            end

            if isVehicle == 1 or isVehicle == true then
                flag = 'isWagon'
            end

            if isTrain == 1 or isTrain == true then
                flag = 'isTrain'
            end

            if dstCheck then
                local targets = self.targets(data)

                if targets and #targets > 0 then
                    -- Check if any matched target has at least one enabled item before highlighting
                    local anyItemEnabled = false
                    for _, target in ipairs(targets) do
                        if hasEnabledItems(target, data) then
                            anyItemEnabled = true
                            break
                        end
                    end

                    if not anyItemEnabled then
                        goto continue_entity_loop
                    end

                    exports['ui']:emitUI('target.state', { active = true, type = data.type, flag = flag })

                    self:DisablePlayerFiring()

                    while self.active do
                        Wait(0)
                        local _hit, _coords, _entity = self:RayCast()

                        if _hit ~= 1 or _entity ~= entity then
                            break
                        end

                        if self.click then
                            self.click = false
                            SetCursorLocation(0.5, 0.5)

                            -- Collect actions from each valid target, filtering per-item isEnabled
                            local allActions = {}
                            for _, target in ipairs(targets) do
                                if target(data) then
                                    collectActions(target, data, allActions)
                                end
                            end

                            -- Only emit once with all actions gathered (skip if all items filtered out)
                            if #allActions > 0 then
                                exports['ui']:emitUI('target.state', {
                                    context = _entity,
                                    type = data.type,
                                    actions = allActions
                                })
                                exports['ui']:focusUI(true, true)
                            end
                        end
                    end

                    self:DisablePlayerFiring()
                    exports['ui']:emitUI('target.state', { active = false, type = -1, flag = '' })
                end
            end

            ::continue_entity_loop::
        end

        hit, coords, entity = self:RayCast(true)

        if hit == 1 then
            self.cache.pedCoords = GetEntityCoords(self.cache.ped)

            local data = {
                coords = coords,
                distance = #(self.cache.pedCoords - coords)
            }

            local dstCheck = data.distance <= self.distance

            if dstCheck then
                local matchingZones = self.zones(data)

                if matchingZones and #matchingZones > 0 then
                    -- Check if any matched zone has at least one enabled item before highlighting
                    local anyItemEnabled = false
                    for _, zone in ipairs(matchingZones) do
                        if hasEnabledItems(zone, data) then
                            anyItemEnabled = true
                            break
                        end
                    end

                    if not anyItemEnabled then
                        goto continue_zone_loop
                    end

                    exports['ui']:emitUI('target.state', { active = true })

                    self:DisablePlayerFiring()

                    while self.active do
                        Wait(0)

                        local _hit, _coords, _entity = self:RayCast(true)
                        self.cache.pedCoords = GetEntityCoords(self.cache.ped)

                        local data = {
                            coords = _coords,
                            distance = #(self.cache.pedCoords - _coords)
                        }

                        -- If no hit or the entity is not in any of the matching zones, exit the loop
                        if _hit ~= 1 or not matchingZones[1](data) then
                            break
                        end

                        if self.click then
                            self.click = false
                            SetCursorLocation(0.5, 0.5)

                            -- Collect actions from each valid zone, filtering per-item isEnabled
                            local allActions = {}
                            for _, zone in ipairs(matchingZones) do
                                if zone(data) then
                                    collectActions(zone, data, allActions)
                                end
                            end

                            -- Only emit if there are actions after filtering
                            if #allActions > 0 then
                                exports['ui']:emitUI('target.state', { show = false, context = 'zone', actions = allActions })
                                exports['ui']:focusUI(true, true)
                            end
                        end
                    end

                    self:DisablePlayerFiring()

                    -- Hide target state when done
                    exports['ui']:emitUI('target.state', { active = false, type = -1, flag = '' })
                end
            end

            ::continue_zone_loop::
        end

        Wait(0)
    until not self.active

    --SendNuiMessage({show = false})
    exports['ui']:emitUI('target.state', { show = false, type = -1, flag = '' })
end

--- @return nil
function Target:DisablePlayerFiring()
    if self.disablePlayerFiring then
        self.disablePlayerFiring = false
        return
    end

    self.disablePlayerFiring = true

    CreateThread(function()
        while self.disablePlayerFiring and self.active do
            Wait(0)
            DisablePlayerFiring(self.cache.ped, true)
        end

        self.disablePlayerFiring = false
    end)
end

--- @param data table Target data refer to discord for examples but should be as expected
--- @return string Registered data key
function Target.AddTarget(data)
    self = Target

    while not self.ready do
        print("waiting for keymapper to start")
        Wait(1000)
    end

    --local key = ("%s_%s"):format(data.type:lower(), tlen(self.targets))
    local key = data.id:lower()
    print(key)

    print("Targets Length: " .. tlen(self.targets))

    self.targets[key] = data

    self.targets[key].options = self.targets[key].options or {}
    self.targets[key].options.isEnabled = self.targets[key].options.isEnabled
    self.targets[key].options.distance = self.targets[key].options.distance and tonumber(self.targets[key].options.distance) or type(self.targets[key].options.distance) == "table" and self.targets[key].options.distance.radius and self.targets[key].options.distance.radius or self.distance
    -- Per-target throttle overrides (support multiple naming schemes)
    self.targets[key].options.throttleDelay = self.targets[key].options.throttleDelay and tonumber(self.targets[key].options.throttleDelay) or nil -- Deprecated
    self.targets[key].options.throttle = self.targets[key].options.throttle and tonumber(self.targets[key].options.throttle) or nil
    self.targets[key].options.disabledThrottle = self.targets[key].options.disabledThrottle and tonumber(self.targets[key].options.disabledThrottle) or nil
    self.targets[key].options.enabledThrottle = self.targets[key].options.enabledThrottle and tonumber(self.targets[key].options.enabledThrottle) or nil

    -- Check if any data items have per-item isEnabled functions
    local hasItemEnabled = false
    for _, item in ipairs(self.targets[key].data) do
        if item.isEnabled then
            hasItemEnabled = true
            break
        end
    end
    self.targets[key].hasItemEnabled = hasItemEnabled

    if data.type == "flag" then
        if type(self.targets[key].group) == "string" then
            self.targets[key].group = {self.targets[key].group}
        end

        setmetatable(self.targets[key],{
            __call = function(self,data)
                local rtn = false

                if data.distance > self.options.distance then
                    return false
                end

                for _,v in pairs(self.group) do
                    if v == "isEntity" and (IsEntityAPed(data.entity) or IsEntityAVehicle(data.entity)) then
                        rtn = self
                    elseif Target.class(data.model, v) then
                        rtn = self
                    end
                end

                if rtn and rtn.options and rtn.options.isEnabled then
                    local cacheKey = ("%s_%s"):format(self.id, data.entity)
                    local cached = Target.enabledCache[cacheKey]
                    local currentTime = GetGameTimer()

                    -- Check if we have a cached result that's still valid
                    if cached and currentTime < cached.expiry then
                        if not cached.result then
                            return false
                        end
                    else
                        -- Evaluate and cache the result
                        local result = rtn.options.isEnabled(data)
                        -- Determine throttle values with priority: specific > generic > global
                        local enabledTime = rtn.options.enabledThrottle or rtn.options.throttle or rtn.options.throttleDelay or Target.enabledThrottle
                        local disabledTime = rtn.options.disabledThrottle or rtn.options.throttle or rtn.options.throttleDelay or Target.disabledThrottle
                        Target.enabledCache[cacheKey] = {
                            result = result,
                            expiry = currentTime + (result and enabledTime or disabledTime)
                        }
                        if not result then
                            return false
                        end
                    end
                end

                return rtn
            end
        })
    elseif data.type == "model" then
        local group = {}

        if type(self.targets[key].group) == "string" then
            self.targets[key].group = {self.targets[key].group}
        end

        for k,v in pairs(self.targets[key].group) do
            group[type(v) == "string" and GetHashKey(v) or v] = true
        end

        self.targets[key].group = group

        setmetatable(self.targets[key],{
            __call = function(self,data)
                local rtn = false

                if data.distance > self.options.distance then
                    return false
                end

                if self.group[data.model] then
                    rtn = self
                end

                --print("------------------------------")
                --print(json.encode(self))
                --print(json.encode(rtn))
                --print("------------------------------")
                if rtn and rtn.options and rtn.options.isEnabled then
                    local cacheKey = ("%s_%s"):format(self.id, data.entity)
                    local cached = Target.enabledCache[cacheKey]
                    local currentTime = GetGameTimer()

                    -- Check if we have a cached result that's still valid
                    if cached and currentTime < cached.expiry then
                        if not cached.result then
                            return false
                        end
                    else
                        -- Evaluate and cache the result
                        local result = rtn.options.isEnabled(data)
                        -- Determine throttle values with priority: specific > generic > global
                        local enabledTime = rtn.options.enabledThrottle or rtn.options.throttle or rtn.options.throttleDelay or Target.enabledThrottle
                        local disabledTime = rtn.options.disabledThrottle or rtn.options.throttle or rtn.options.throttleDelay or Target.disabledThrottle
                        Target.enabledCache[cacheKey] = {
                            result = result,
                            expiry = currentTime + (result and enabledTime or disabledTime)
                        }
                        if not result then
                            return false
                        end
                    end
                end

                return rtn
            end
        })
    elseif data.type == "entity" then
        local group = {}
        local id = (type(self.targets[key].group) == "string" or type(self.targets[key].group) == "number") and tonumber(self.targets[key].group) or nil

        if id then
            self.targets[key].group = {}
            self.targets[key].group[id] = true
        elseif type(self.targets[key].group) == "table" then
            for k,v in pairs(self.targets[key].group) do
                group[v] = true
            end

            self.targets[key].group = group
        end

        setmetatable(self.targets[key],{
            __call = function(self,data)
                local rtn = false

                if data.distance > self.options.distance then
                    return false
                end

                if self.group[data.entity] then
                    rtn = self
                end

                if rtn and rtn.options and rtn.options.isEnabled then
                    local cacheKey = ("%s_%s"):format(self.id, data.entity)
                    local cached = Target.enabledCache[cacheKey]
                    local currentTime = GetGameTimer()

                    -- Check if we have a cached result that's still valid
                    if cached and currentTime < cached.expiry then
                        if not cached.result then
                            return false
                        end
                    else
                        -- Evaluate and cache the result
                        local result = rtn.options.isEnabled(data)
                        -- Determine throttle values with priority: specific > generic > global
                        local enabledTime = rtn.options.enabledThrottle or rtn.options.throttle or rtn.options.throttleDelay or Target.enabledThrottle
                        local disabledTime = rtn.options.disabledThrottle or rtn.options.throttle or rtn.options.throttleDelay or Target.disabledThrottle
                        Target.enabledCache[cacheKey] = {
                            result = result,
                            expiry = currentTime + (result and enabledTime or disabledTime)
                        }
                        if not result then
                            return false
                        end
                    end
                end

                return rtn
            end
        })
    elseif data.type == "zone" then
        local newKey = ("%s_%s"):format(data.type:lower(), tlen(self.zones))

        self.zones[newKey] = table.clone(self.targets[key])

        self.targets[key] = nil

        key = newKey

        local id = (type(self.zones[key].group) == "string" or type(self.zones[key].group) == "number") and tostring(self.zones[key].group) or nil

        if id then
            self.zones[key].group = {id}
        end

        setmetatable(self.zones[key],{
            __call = function(self,data)
                local rtn = false

                if data.distance > self.options.distance then
                    return false
                end

                for k,v in ipairs(self.group) do
                    if exports.plouffe_zones:AreCoordsInZone(data.coords,v) then
                        rtn = self
                    end
                end

                if rtn and rtn.options and rtn.options.isEnabled then
                    -- For zones, use coords as part of cache key since there's no entity
                    local cacheKey = ("%s_%s_%s_%s"):format(self.id, math.floor(data.coords.x), math.floor(data.coords.y), math.floor(data.coords.z))
                    local cached = Target.enabledCache[cacheKey]
                    local currentTime = GetGameTimer()

                    -- Check if we have a cached result that's still valid
                    if cached and currentTime < cached.expiry then
                        if not cached.result then
                            return false
                        end
                    else
                        -- Evaluate and cache the result
                        local result = rtn.options.isEnabled(data)
                        -- Determine throttle values with priority: specific > generic > global
                        local enabledTime = rtn.options.enabledThrottle or rtn.options.throttle or rtn.options.throttleDelay or Target.enabledThrottle
                        local disabledTime = rtn.options.disabledThrottle or rtn.options.throttle or rtn.options.throttleDelay or Target.disabledThrottle
                        Target.enabledCache[cacheKey] = {
                            result = result,
                            expiry = currentTime + (result and enabledTime or disabledTime)
                        }
                        if not result then
                            return false
                        end
                    end
                end

                return rtn
            end
        })
    elseif data.type == "point" then
        local newKey = data.id:lower()

        -- Parse coords from group field: accept {x,y,z}, [{x,y,z}], or [{x,y,z}, {x,y,z}, ...]
        local coords = {}
        local group = self.targets[key].group

        if type(group) == "table" then
            -- Check if group itself is a single coord {x=, y=, z=}
            if group.x and group.y and group.z then
                table.insert(coords, vec3(group.x, group.y, group.z))
            else
                -- Array of coords
                for _, g in ipairs(group) do
                    if type(g) == "table" and g.x and g.y and g.z then
                        table.insert(coords, vec3(g.x, g.y, g.z))
                    end
                end
            end
        end

        if #coords == 0 then
            print("[Target] Error: point target requires group with {x, y, z} coordinates")
            self.targets[key] = nil
            return nil
        end

        self.points[newKey] = table.clone(self.targets[key])
        self.targets[key] = nil
        key = newKey

        self.points[key].coords = coords

        -- Set point-specific option defaults
        local opts = self.points[key].options
        opts.renderDistance = tonumber(opts.renderDistance) or 15
        opts.losCheck = opts.losCheck ~= false  -- default true
        opts.screenThreshold = tonumber(opts.screenThreshold) or 0.05

        -- Sprite options with defaults
        local spriteOpts = opts.sprite or {}
        opts.sprite = {
            dict = spriteOpts.dict or self.pointSpriteDefaults.dict,
            name = spriteOpts.name or self.pointSpriteDefaults.name,
            r = spriteOpts.r or self.pointSpriteDefaults.r,
            g = spriteOpts.g or self.pointSpriteDefaults.g,
            b = spriteOpts.b or self.pointSpriteDefaults.b,
            a = spriteOpts.a or self.pointSpriteDefaults.a,
            scale = spriteOpts.scale or self.pointSpriteDefaults.scale,
        }

        -- Request custom texture dict if needed
        if opts.sprite.dict ~= self.pointSpriteDefaults.dict then
            RequestStreamedTextureDict(opts.sprite.dict)
        end
    end

    return key
end
exports("AddTarget", Target.AddTarget)

--- @return boolean
function Target.RemoveTarget(key)
    key = tostring(key) and key or nil

    if not key then
        return false
    end

    if Target.targets[key] then
        Target.targets[key] = nil
        return true
    elseif Target.zones[key] then
        Target.zones[key] = nil
        return true
    elseif Target.points and Target.points[key] then
        Target.points[key] = nil
        return true
    end

    return false
end
exports("RemoveTarget", Target.RemoveTarget)

CreateThread(Target.Start)

function AddOnUIHandler()
    Citizen.CreateThread(function()
        Wait(1000)
        exports['ui']:onUI('target.action', function(context, action)
            print('context: ' .. tostring(context))
            print('action: ' .. json.encode(action))
            print('TriggerEvent: ' .. action.event)
            TriggerEvent(action.event, context, action.parameters)
        end)
    end)
end

AddEventHandler('onResourceStart', function(resourceName)
    if resourceName == 'ui' then
        AddOnUIHandler()
    --elseif resourceName == 'keymapper' then
    --	RegisterKeyMapping()
    end
end)

AddEventHandler('onPVInit::resource::keymapper', function()
    RegisterKeyMapping()
end)

if GetResourceState('ui') == 'started' then
    AddOnUIHandler()
end

-- Example Usages

CreateThread(function()
    Wait(2000)
    exports['init']:resolveResource('target')
    --print('Add Example Targets')
    --local flagKey = Target.AddTarget({
    --	id = 'horse',
    --	type = 'flag',
    --	group = {'isHorse'},
    --	icon = 'horse',
    --	data = {
    --		{
    --			id = 'horse_drink',
    --			label = 'Drink',
    --			icon = 'water',
    --			event = 'stable:client:drink',
    --			parameters = {},
    --		},
    --		{
    --			id = 'horse_lead',
    --			label = 'Lead',
    --			icon = 'lasso',
    --			event = 'stable:client:lead',
    --			parameters = {},
    --		}
    --	},
    --	options = {
    --		distance = 1.5,
    --		isEnabled = function(data)
    --			return IsEntityInWater(data.entity) == false
    --		end
    --	}
    --})
    --print('flagKey: ' .. flagKey)
    --Target.AddTarget({
    --	id = 'coach',
    --	type = 'flag',
    --	group = {'isWagon'},
    --	data = {
    --		{
    --			id = 'wagon_drink',
    --			label = 'Drink',
    --			icon = 'water',
    --			event = 'stable:client:drink',
    --			parameters = {},
    --		},
    --		{
    --			id = 'wagon_lead',
    --			label = 'Lead',
    --			icon = 'lasso',
    --			event = 'stable:client:lead',
    --			parameters = {},
    --		}
    --	},
    --	options = {
    --		distance = 1.5,
    --		isEnabled = function(data)
    --			return IsEntityInWater(data.entity) == false
    --		end
    --	}
    --})
end)

AddEventHandler('stable:client:drink', function()
    print('Do Horse Drinking')
end)

AddEventHandler('stable:client:lead', function()
    print('Do Horse Leading')
end)
