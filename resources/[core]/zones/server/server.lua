-- Import GLM library for geometric calculations (polygon containment, quaternion rotations)
local glm = require 'glm'

-- Configuration variables
local DEBUG = true -- Enable/disable debug logging of zone transitions
local LOOP_DELAY = 250 -- Milliseconds between zone check iterations (lower = more responsive, higher = better performance)

-- Storage tables for zone management
-- Unlike the client, every state table is keyed by zone name AND server id, because the
-- server tracks every connected player against every zone rather than a single local ped.
local Zones = {} -- Main storage for all registered zones, indexed by zone name
local InZones = {} -- Tracks which players are currently inside a zone ([zoneName][serverId] = true)
local InZonesTimeEnter = {} -- Timestamps for when a player started entering a zone (for delayed entry)
local InZonesTimeExit = {} -- Timestamps for when a player started exiting a zone (for delayed exit)

--
-- Helpers
--

-- Reads a player's state out of one of the nested state tables
-- @param store     table - InZones, InZonesTimeEnter or InZonesTimeExit
-- @param zoneName  string - Name of the zone
-- @param serverId  number - Server id of the player
-- @return any|nil - Stored value, or nil if the zone or player has no state
function GetPlayerZoneState(store, zoneName, serverId)
    local zoneStore = store[zoneName]
    if not zoneStore then
        return nil
    end
    return zoneStore[serverId]
end

-- Writes a player's state into one of the nested state tables
-- Creates the per-zone table on demand, and skips creating it when clearing state
-- @param store     table - InZones, InZonesTimeEnter or InZonesTimeExit
-- @param zoneName  string - Name of the zone
-- @param serverId  number - Server id of the player
-- @param value     any|nil - Value to store, or nil to clear
function SetPlayerZoneState(store, zoneName, serverId, value)
    local zoneStore = store[zoneName]
    if not zoneStore then
        if value == nil then
            return -- Nothing to clear, don't allocate a table for it
        end
        zoneStore = {}
        store[zoneName] = zoneStore
    end
    zoneStore[serverId] = value
end

-- Shared containment check used by the main loop and every query export
-- Kept in one place so the loop and the validation exports can never disagree
-- @param zone    table - Entry from the Zones table
-- @param coords  vector3 - Position to check
-- @return boolean - True if the position is within the zone boundaries
function IsCoordInZoneData(zone, coords)
    if zone.polygon then
        -- For polygon and box zones, use GLM polygon containment
        -- The third parameter is a vertical tolerance around the polygon plane
        return glm.polygon.contains(zone.polygon, coords, zone.data.size.z / 4)
    elseif zone.type == 'sphere' then
        -- For sphere zones, use simple distance calculation
        local distance = #(zone.data.coords - coords)
        return distance < zone.data.radius
    end

    return false
end

-- Resolves the live position of a connected player
-- A player who is still connecting, or who has already been dropped, has no usable ped
-- and therefore cannot be inside any zone
-- @param serverId  number - Server id of the player
-- @return vector3|nil - Player coordinates, or nil when they have no ped
function GetConnectedPlayerCoords(serverId)
    local playerPed = GetPlayerPed(serverId)
    if playerPed == 0 or not DoesEntityExist(playerPed) then
        return nil
    end

    return GetEntityCoords(playerPed)
end

-- Collects every connected player that currently has a ped, along with their coordinates
-- Coordinates are read once per loop iteration rather than once per zone, since the server
-- checks every player against every zone
-- @return table - Array of { serverId = number, coords = vector3 }
function GetPlayersWithCoords()
    local players = {}
    local indexes = GetNumPlayerIndices()

    for i = 0, indexes - 1 do
        local serverId = tonumber(GetPlayerFromIndex(i))

        if serverId and serverId ~= 0 then
            local coords = GetConnectedPlayerCoords(serverId)

            if coords then
                players[#players + 1] = {
                    serverId = serverId,
                    coords = coords,
                }
            end
        end
    end

    return players
end

--
-- Generators
--

-- Creates a polygon-shaped zone from a series of 2D points
-- Polygon zones can be any shape defined by connecting points
function generatePoly(data)
    local points = {} -- Will store the 3D vertices for the polygon
    local centerPoint = vector2(0, 0) -- Accumulator for calculating center position

    -- Note: These appear swapped but it matches the client implementation exactly
    -- Both sides must derive identical bounds or the server would disagree with the client loop
    local maxZ = data.minZ
    local minZ = data.maxZ
    local centerZ = (minZ + maxZ) / 2 -- Calculate vertical center of the zone

    -- Process each 2D point and convert to 3D vertices
    for _, point in pairs(data.points) do
        -- Accumulate points to calculate geometric center
        centerPoint = centerPoint + vector2(point.x, point.y)
        -- Convert 2D point to 3D by adding the center Z coordinate
        table.insert(points, vector3(point.x, point.y, centerZ))
    end

    -- Calculate the average position (geometric center) of all points
    centerPoint = centerPoint / #points
    centerPoint = vector3(centerPoint.x, centerPoint.y, centerZ)

    -- Store the zone with all its properties and create the GLM polygon
    Zones[data.name] = {
        type = 'poly',
        data = {
            name = data.name,
            points = data.points, -- Original 2D points for reference
            coords = centerPoint, -- Center position for distance checks
            delayEnter = data.options.delayEnter, -- Milliseconds delay before triggering enter event
            delayExit = data.options.delayExit, -- Milliseconds delay before triggering exit event
            maxZ = maxZ,
            minZ = minZ,
            size = vector3(0, 0, maxZ - minZ), -- Height of the zone
        },
        polygon = glm.polygon.new(points) -- GLM polygon object for containment checks
    }
end

-- Creates a box-shaped zone with rotation support
-- Box zones are rectangular prisms that can be rotated around the Z-axis
function generateBox(data)
    data.coords = vector3(data.coords.x, data.coords.y, data.coords.z) -- Ensure coords is a vector3
    data.size = vector3(data.size.x, data.size.y, data.size.z) -- Ensure size is a vector3

    -- Calculate vertical bounds from center and height
    local halfHeight = data.size.z / 2
    local centerPoint = data.coords.z
    local minZ = centerPoint - halfHeight
    local maxZ = centerPoint + halfHeight

    -- Create quaternion for rotation (around Z-axis only)
    -- Quaternions prevent gimbal lock and provide smooth rotations
    local quatRotation = quat(data.rotation or 0, vector3(0, 0, 1))

    Zones[data.name] = {
        type = 'box',
        data = {
            name = data.name,
            coords = data.coords, -- Center position of the box
            rotation = data.rotation, -- Rotation angle in radians
            quat = quatRotation, -- Quaternion for efficient rotation calculations
            delayEnter = data.options.delayEnter,
            delayExit = data.options.delayExit,
            maxZ = maxZ,
            minZ = minZ,
            size = data.size, -- Width (x), depth (y), and height (z) of the box
        },
        -- Create a rotated polygon from the box corners
        -- Start with box corners in local space, apply rotation, then translate to world position
        polygon = (quatRotation * glm.polygon.new({
            vector3(data.size.x, data.size.y, 0),    -- Front-right corner
            vector3(-data.size.x, data.size.y, 0),   -- Front-left corner
            vector3(-data.size.x, -data.size.y, 0),  -- Back-left corner
            vector3(data.size.x, -data.size.y, 0),   -- Back-right corner
        }) + data.coords) -- Apply rotation then translate to world position
    }
end

-- Creates a sphere-shaped zone
-- Sphere zones are simple radius-based areas, efficient for circular zones
function generateSphere(data)
    -- Spheres don't need polygons - they use simple distance checks
    Zones[data.name] = {
        type = 'sphere',
        data = {
            name = data.name,
            coords = data.coords, -- Center position of the sphere
            radius = data.radius, -- Radius for distance-based containment checks
            delayEnter = data.options.delayEnter,
            delayExit = data.options.delayExit,
        }
        -- No polygon needed - sphere uses distance calculation in main loop
    }
end

-- Export function to create a polygon zone
-- Used by other resources to register polygon-shaped zones
-- @param name      string - Unique identifier for the zone
-- @param points    vector2[] - Array of 2D points defining the polygon shape
-- @param minZ      float - Bottom boundary of the zone
-- @param maxZ      float - Top boundary of the zone
-- @param options   { delayEnter = number, delayExit = number }
exports('AddPoly', function(name, points, minZ, maxZ, options)
    generatePoly({
        name = name,
        points = points,
        minZ = minZ,
        maxZ = maxZ,
        options = options,
    })
end)

-- Export function to create a box zone
-- Used by other resources to register rectangular zones with rotation
-- @param name      string - Unique identifier for the zone
-- @param coords    vector3 - Center position of the box
-- @param size      vector3 - Dimensions (width, depth, height)
-- @param rotation  float - Rotation angle around Z-axis in radians
-- @param options   { delayEnter = number, delayExit = number }
exports('AddBox', function(name, coords, size, rotation, options)
    generateBox({
        name = name,
        coords = coords,
        size = size,
        rotation = rotation,
        options = options,
    })
end)

-- Export function to create a sphere zone
-- Used by other resources to register circular/spherical zones
-- @param name     string - Unique identifier for the zone
-- @param coords   vector3 - Center position of the sphere
-- @param radius   float - Radius of the sphere
-- @param options  { delayEnter = number, delayExit = number }
exports('AddSphere', function(name, coords, radius, options)
    generateSphere({
        name = name,
        coords = vector3(coords.x, coords.y, coords.z), -- Ensure it's a vector3
        radius = radius * 1.0, -- Convert to float to prevent integer issues
        options = options,
    })
end)

-- Export function to remove a zone
-- Cleans up both the zone definition and the tracked state of every player in it
-- @param name  string - Identifier of the zone to remove
exports('Remove', function(name)
    -- Remove zone definition if it exists
    if Zones[name] then
        Zones[name] = nil
    end
    -- Clean up active zone state for every player that was inside
    if InZones[name] then
        InZones[name] = nil
    end
    -- Also clean up any pending enter/exit timers
    if InZonesTimeEnter[name] then
        InZonesTimeEnter[name] = nil
    end
    if InZonesTimeExit[name] then
        InZonesTimeExit[name] = nil
    end
end)

-- Export function to check if a coordinate is inside a specific zone
-- Returns boolean indicating if the position is within the zone boundaries
-- @param zoneName  string - Name of the zone to check
-- @param coords    vector3 - Position to check
-- @return boolean - True if position is in zone, false otherwise
exports('IsCoordInZone', function(zoneName, coords)
    local zone = Zones[zoneName]
    if not zone then
        return false -- Zone doesn't exist
    end

    return IsCoordInZoneData(zone, coords)
end)

-- Export function to check if an entity is inside a specific zone
-- Convenience wrapper that gets entity coordinates automatically
-- @param zoneName  string - Name of the zone to check
-- @param entity    number - Entity handle to check
-- @return boolean - True if entity is in zone, false otherwise
exports('IsEntityInZone', function(zoneName, entity)
    if not DoesEntityExist(entity) then
        return false -- Entity doesn't exist
    end

    local zone = Zones[zoneName]
    if not zone then
        return false -- Zone doesn't exist
    end

    return IsCoordInZoneData(zone, GetEntityCoords(entity))
end)

-- Export function to check if an entity is inside any of the specified zones
-- Convenience wrapper that gets entity coordinates automatically
-- @param zoneNames  string[] - Names of the zones to check
-- @param entity     number - Entity handle to check
-- @return string|nil - Name of the first matching zone, or nil if in none of them
exports('IsEntityInZones', function(zoneNames, entity)
    if not DoesEntityExist(entity) then
        return nil -- Entity doesn't exist
    end

    local coords = GetEntityCoords(entity)
    for _, zoneName in pairs(zoneNames) do
        local zone = Zones[zoneName]
        if zone and IsCoordInZoneData(zone, coords) then
            return zoneName
        end
    end
    return nil
end)

-- Export function to check if a player is inside a specific zone
-- Validates against the player's live server-side coordinates, so the answer ignores the
-- main loop's delayEnter/delayExit smoothing and its LOOP_DELAY staleness
-- @param zoneName  string - Name of the zone to check
-- @param serverId  number - Server id of the player to check
-- @return boolean - True if the player is in zone, false otherwise
exports('IsPlayerInZone', function(zoneName, serverId)
    local zone = Zones[zoneName]
    if not zone then
        return false -- Zone doesn't exist
    end

    local coords = GetConnectedPlayerCoords(serverId)
    if not coords then
        return false -- Player isn't connected, or has no ped yet
    end

    return IsCoordInZoneData(zone, coords)
end)

-- Export function to check if a player is inside any of the specified zones
-- Validates against the player's live server-side coordinates
-- @param zoneNames  string[] - Names of the zones to check
-- @param serverId   number - Server id of the player to check
-- @return string|nil - Name of the first matching zone, or nil if in none of them
exports('IsPlayerInZones', function(zoneNames, serverId)
    local coords = GetConnectedPlayerCoords(serverId)
    if not coords then
        return nil -- Player isn't connected, or has no ped yet
    end

    for _, zoneName in pairs(zoneNames) do
        local zone = Zones[zoneName]
        if zone and IsCoordInZoneData(zone, coords) then
            return zoneName
        end
    end
    return nil
end)

-- Export function to get all zones at a specific coordinate
-- Returns an array of zone names that contain the given position
-- @param coords  vector3 - Position to check
-- @return table - Array of zone names at this position
exports('GetZonesAtCoord', function(coords)
    local zonesAtCoord = {}

    for zoneName, zone in pairs(Zones) do
        if IsCoordInZoneData(zone, coords) then
            table.insert(zonesAtCoord, zoneName)
        end
    end

    return zonesAtCoord
end)

-- Export function to get all zones an entity is currently in
-- Convenience wrapper for GetZonesAtCoord using entity position
-- @param entity  number - Entity handle to check
-- @return table - Array of zone names the entity is in
exports('GetZonesForEntity', function(entity)
    if not DoesEntityExist(entity) then
        return {} -- Return empty array if entity doesn't exist
    end

    local coords = GetEntityCoords(entity)
    return exports['zones']:GetZonesAtCoord(coords)
end)

-- Export function to get zone data
-- Returns the zone configuration if it exists
-- @param zoneName  string - Name of the zone
-- @return table|nil - Zone data table or nil if zone doesn't exist
exports('GetZoneData', function(zoneName)
    local zone = Zones[zoneName]
    if zone then
        return zone.data
    end
    return nil
end)

-- Clears all tracked state for a player that has left the server
-- Without this a rejoining player reusing the same server id would be treated as
-- already inside every zone they were in, and would never fire another enter event
AddEventHandler('playerDropped', function()
    local serverId = tonumber(source)
    if not serverId then
        return
    end

    for _, store in pairs({ InZones, InZonesTimeEnter, InZonesTimeExit }) do
        for _, zoneStore in pairs(store) do
            zoneStore[serverId] = nil
        end
    end
end)

-- MAIN LOOP
-- Continuously checks every connected player's position against all zones
-- Triggers enter/exit events with optional delays, passing the server id of the
-- player that caused the transition
Citizen.CreateThread(function()
    while true do
        local players = GetPlayersWithCoords()

        if #players > 0 then
            -- Read the timer once per iteration instead of once per player/zone pair
            local now = GetGameTimer()

            -- Check each registered zone against every connected player
            for zoneName, zone in pairs(Zones) do
                for _, player in ipairs(players) do
                    local serverId = player.serverId
                    local inZone = IsCoordInZoneData(zone, player.coords)

                    -- Handle zone entry (player is in zone but wasn't before)
                    if inZone and not GetPlayerZoneState(InZones, zoneName, serverId) then
                        -- Start entry timer if not already started
                        local enteringSince = GetPlayerZoneState(InZonesTimeEnter, zoneName, serverId)
                        if not enteringSince then
                            enteringSince = now
                            SetPlayerZoneState(InZonesTimeEnter, zoneName, serverId, enteringSince)
                        end
                        -- Check if enough time has passed for delayed entry
                        -- If no delay is set, enter immediately
                        if not zone.data.delayEnter or now - enteringSince >= zone.data.delayEnter then
                            SetPlayerZoneState(InZones, zoneName, serverId, true) -- Mark as inside zone
                            SetPlayerZoneState(InZonesTimeEnter, zoneName, serverId, nil) -- Clear entry timer
                            TriggerEvent('zones::' .. zoneName .. '::enter', serverId) -- Fire enter event
                            if DEBUG then
                                print('Entered Zone', zoneName, serverId)
                            end
                        end
                    -- Handle zone exit (player was in zone but isn't anymore)
                    elseif not inZone and GetPlayerZoneState(InZones, zoneName, serverId) then
                        -- Start exit timer if not already started
                        local exitingSince = GetPlayerZoneState(InZonesTimeExit, zoneName, serverId)
                        if not exitingSince then
                            exitingSince = now
                            SetPlayerZoneState(InZonesTimeExit, zoneName, serverId, exitingSince)
                        end
                        -- Check if enough time has passed for delayed exit
                        -- If no delay is set, exit immediately
                        if not zone.data.delayExit or now - exitingSince >= zone.data.delayExit then
                            SetPlayerZoneState(InZones, zoneName, serverId, nil) -- Mark as outside zone
                            SetPlayerZoneState(InZonesTimeExit, zoneName, serverId, nil) -- Clear exit timer
                            TriggerEvent('zones::' .. zoneName .. '::exit', serverId) -- Fire exit event
                            if DEBUG then
                                print('Left Zone', zoneName, serverId)
                            end
                        end
                    -- Handle re-entry during exit delay (player came back before exit triggered)
                    elseif inZone and GetPlayerZoneState(InZonesTimeExit, zoneName, serverId) then
                        SetPlayerZoneState(InZonesTimeExit, zoneName, serverId, nil) -- Cancel pending exit
                    -- Handle leaving during entry delay (player left before entry triggered)
                    elseif not inZone and GetPlayerZoneState(InZonesTimeEnter, zoneName, serverId) then
                        SetPlayerZoneState(InZonesTimeEnter, zoneName, serverId, nil) -- Cancel pending entry
                    end
                end
            end
        end

        -- Wait before next check - configurable delay for performance tuning
        Wait(LOOP_DELAY or 1000) -- Default to 1 second if LOOP_DELAY not set
    end
end)
