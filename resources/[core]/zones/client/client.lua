-- Import GLM library for geometric calculations (polygon containment, quaternion rotations)
local glm = require 'glm'

-- Configuration variables
local LOOP_DELAY = 250 -- Milliseconds between zone check iterations (lower = more responsive, higher = better performance)

-- Storage tables for zone management
local Zones = {} -- Main storage for all registered zones, indexed by zone name
local InZones = {} -- Tracks which zones the player is currently inside (boolean flags)
local InZonesTimeEnter = {} -- Timestamps for when player started entering a zone (for delayed entry)
local InZonesTimeExit = {} -- Timestamps for when player started exiting a zone (for delayed exit)

--
-- Helpers
--

-- Draws a single triangular polygon for debug visualization
-- Uses native game function to render a triangle with specified vertices and color
function DrawPoly(v1, v2, v3, r, g, b, a)
    -- Use bitwise AND with 0xFFFFFFFF to ensure the hash is a valid 32-bit integer
    -- This prevents issues with large hash values in Lua
    Citizen.InvokeNative(GetHashKey('DRAW_POLY') & 0xFFFFFFFF, v1, v2, v3, r, g, b, a)
end

-- Draws a sphere marker for debug visualization
-- Uses DRAW_MARKER_EX native (0x2A32FAA57B937173) with sphere type (0x50638AB9)
function DrawSphere(x, y, z, radius, r, g, b, a)
    -- Native parameters: hash, type, x, y, z, dirX, dirY, dirZ, rotX, rotY, rotZ, scaleX, scaleY, scaleZ, r, g, b, a, bobUpDown, faceCamera, p19, rotate, textureDict, textureName, drawOnEnts
    Citizen.InvokeNative(0x2A32FAA57B937173, 0x50638AB9, x, y, z, 0, 0, 0, 0, 0, 0, radius, radius, radius, r, g, b, a, false, false, 0, false, false, false, false)
end

-- Draws a vertical wall between two points (for polygon zone visualization)
-- Creates a wall by drawing 4 triangles to form a rectangle from minZ to maxZ
-- Adapted from PolyZone library: https://github.com/mkafrin/PolyZone/blob/master/client.lua
function DrawWall(p1, p2, minZ, maxZ, r, g, b, a)
    -- Create the 4 corner vertices of the wall
    local bottomLeft = vector3(p1.x, p1.y, minZ)  -- Bottom corner at first point
    local topLeft = vector3(p1.x, p1.y, maxZ)     -- Top corner at first point
    local bottomRight = vector3(p2.x, p2.y, minZ) -- Bottom corner at second point
    local topRight = vector3(p2.x, p2.y, maxZ)    -- Top corner at second point

    -- Draw the wall using 4 triangles (2 per side for double-sided rendering)
    DrawPoly(bottomLeft, topLeft, bottomRight, r, g, b, a)    -- Front face triangle 1
    DrawPoly(topLeft, topRight, bottomRight, r, g, b, a)      -- Front face triangle 2
    DrawPoly(bottomRight, topRight, topLeft, r, g, b, a)      -- Back face triangle 1
    DrawPoly(bottomRight, topLeft, bottomLeft, r, g, b, a)    -- Back face triangle 2
end

--
-- Generators
--

-- Creates a polygon-shaped zone from a series of 2D points
-- Polygon zones can be any shape defined by connecting points
function generatePoly(data)
    local points = {} -- Will store the 3D vertices for the polygon
    local centerPoint = vector2(0, 0) -- Accumulator for calculating center position

    -- Note: These appear swapped but it's correct - data.minZ is used for maxZ
    -- This might be due to coordinate system differences or a naming convention
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
            debug = data.options.debug, -- Whether to show debug visualization
            debugColor = data.options.debugColor or { r = 255, g = 0, b = 255, a = 128 }, -- Debug color (default magenta)
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
    -- Calculate vertical bounds from center and height
    local halfHeight = data.size.z / 2
    local centerPoint = data.coords.z
    local minZ = centerPoint - halfHeight
    local maxZ = centerPoint + halfHeight

    -- Create quaternion for rotation (around Z-axis only)
    -- Quaternions prevent gimbal lock and provide smooth rotations
    local quatRotation = quat(data.rotation or 0, vec3(0, 0, 1))

    Zones[data.name] = {
        type = 'box',
        data = {
            name = data.name,
            coords = data.coords, -- Center position of the box
            rotation = data.rotation, -- Rotation angle in radians
            quat = quatRotation, -- Quaternion for efficient rotation calculations
            debug = data.options.debug,
            delayEnter = data.options.delayEnter,
            delayExit = data.options.delayExit,
            maxZ = maxZ,
            minZ = minZ,
            size = data.size, -- Width (x), depth (y), and height (z) of the box
        },
        -- Create a rotated polygon from the box corners
        -- Start with box corners in local space, apply rotation, then translate to world position
        polygon = (quatRotation * glm.polygon.new({
            vec3(data.size.x, data.size.y, 0),    -- Front-right corner
            vec3(-data.size.x, data.size.y, 0),   -- Front-left corner
            vec3(-data.size.x, -data.size.y, 0),  -- Back-left corner
            vec3(data.size.x, -data.size.y, 0),   -- Back-right corner
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
            debug = data.options.debug,
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
-- @param options   { debug = boolean, delayEnter = number, delayExit = number }
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
-- @param options   { debug = boolean, delayEnter = number, delayExit = number }
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
-- @param options  { debug = boolean, delayEnter = number, delayExit = number }
exports('AddSphere', function(name, coords, radius, options)
    generateSphere({
        name = name,
        coords = vector3(coords.x, coords.y, coords.z), -- Ensure it's a vector3
        radius = radius * 1.0, -- Convert to float to prevent integer issues
        options = options,
    })
end)

-- Export function to remove a zone
-- Cleans up both the zone definition and any active state
-- @param name  string - Identifier of the zone to remove
exports('Remove', function(name)
    -- Remove zone definition if it exists
    if Zones[name] then
        Zones[name] = nil
    end
    -- Clean up active zone state if player was inside
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

    -- Check based on zone type
    if zone.polygon then
        -- For polygon and box zones, use GLM polygon containment
        -- Use the same vertical tolerance as the main loop
        return glm.polygon.contains(zone.polygon, coords, zone.data.size.z / 4)
    elseif zone.type == 'sphere' then
        -- For sphere zones, use distance check
        local distance = #(zone.data.coords - coords)
        return distance < zone.data.radius
    end

    return false
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

    local coords = GetEntityCoords(entity, false)
    return exports['zones']:IsCoordInZone(zoneName, coords)
end)


-- Export function to check if an entity is inside a specific zones
-- Convenience wrapper that gets entity coordinates automatically
-- @param zoneNames  string[] - Name of the zone to check
-- @param entity    number - Entity handle to check
-- @return string | null - True if entity is in zone, false otherwise
exports('IsEntityInZones', function(zoneNames, entity)
    if not DoesEntityExist(entity) then
        return false -- Entity doesn't exist
    end

    local coords = GetEntityCoords(entity, false)
    for _, zoneName in pairs(zoneNames) do
        if exports['zones']:IsCoordInZone(zoneName, coords) then
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
        local inZone = false

        if zone.polygon then
            -- Check polygon/box zones
            inZone = glm.polygon.contains(zone.polygon, coords, zone.data.size.z / 4)
        elseif zone.type == 'sphere' then
            -- Check sphere zones
            local distance = #(zone.data.coords - coords)
            inZone = distance < zone.data.radius
        end

        if inZone then
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

    local coords = GetEntityCoords(entity, false)
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

-- MAIN LOOP
-- Continuously checks player position against all zones
-- Triggers enter/exit events with optional delays
Citizen.CreateThread(function()
    Wait(2000) -- Initial delay to ensure game is loaded

    -- Notify init system that zones resource is ready
    exports['init']:resolveResource('zones')

    while true do
        -- Check each registered zone
        for zoneName, zone in pairs(Zones) do
            local inZone = false

            -- Different detection methods based on zone type
            if zone.polygon then
                -- For polygon and box zones, use GLM polygon containment check
                -- The third parameter (zone.data.size.z / 4) is a vertical tolerance
                -- This allows some flexibility in Z-axis detection
                inZone = glm.polygon.contains(zone.polygon, GetEntityCoords(PlayerPedId(), false), zone.data.size.z / 4)
            elseif zone.type == 'sphere' then
                -- For sphere zones, use simple distance calculation
                local distance = #(zone.data.coords - GetEntityCoords(PlayerPedId(), false))
                if distance < zone.data.radius then
                    inZone = true
                end
            end

            -- Handle zone entry (player is in zone but wasn't before)
            if inZone and not InZones[zoneName] then
                -- Start entry timer if not already started
                if not InZonesTimeEnter[zoneName] then
                    InZonesTimeEnter[zoneName] = GetGameTimer()
                end
                -- Check if enough time has passed for delayed entry
                -- If no delay is set, enter immediately
                if not zone.data.delayEnter or GetGameTimer() - InZonesTimeEnter[zoneName] >= zone.data.delayEnter then
                    InZones[zoneName] = true -- Mark as inside zone
                    InZonesTimeEnter[zoneName] = nil -- Clear entry timer
                    TriggerEvent('zones::' .. zoneName .. '::enter') -- Fire enter event
                    if debugRender then
                        print('Entered Zone', zoneName)
                    end
                end
            -- Handle zone exit (player was in zone but isn't anymore)
            elseif not inZone and InZones[zoneName] then
                -- Start exit timer if not already started
                if not InZonesTimeExit[zoneName] then
                    InZonesTimeExit[zoneName] = GetGameTimer()
                end
                -- Check if enough time has passed for delayed exit
                -- If no delay is set, exit immediately
                if not zone.data.delayExit or GetGameTimer() - InZonesTimeExit[zoneName] >= zone.data.delayExit then
                    InZones[zoneName] = nil -- Mark as outside zone
                    InZonesTimeExit[zoneName] = nil -- Clear exit timer
                    TriggerEvent('zones::' .. zoneName .. '::exit') -- Fire exit event
                    if debugRender then
                        print('Left Zone', zoneName)
                    end
                end
            -- Handle re-entry during exit delay (player came back before exit triggered)
            elseif inZone and InZonesTimeExit[zoneName] then
                InZonesTimeExit[zoneName] = nil -- Cancel pending exit
            -- Handle leaving during entry delay (player left before entry triggered)
            elseif not inZone and InZonesTimeEnter[zoneName] then
                InZonesTimeEnter[zoneName] = nil -- Cancel pending entry
            end
        end
        -- Wait before next check - configurable delay for performance tuning
        Wait(LOOP_DELAY or 1000) -- Default to 1 second if LOOP_DELAY not set
    end
end)


-- DEBUG VISUALIZATION
-- Renders zone boundaries for all zones when debug rendering is active.
-- Toggled at runtime with /zonedebug — no restart required.
local debugRender = false

RegisterCommand('zonedebug', function()
    debugRender = not debugRender
    print('[Zones] Debug rendering ' .. (debugRender and 'ON' or 'OFF'))
end, false)

Citizen.CreateThread(function()
    while true do
        if debugRender then
            for _, zone in pairs(Zones) do
                if zone.polygon then
                    local corner = zone.polygon
                    local color = zone.data.debugColor or { r = 255, g = 0, b = 255, a = 128 }
                    for k, point in pairs(corner) do
                        local secondPoint = k < #corner and corner[k + 1] or corner[1]
                        DrawWall(point, secondPoint, zone.data.minZ, zone.data.maxZ, color.r, color.g, color.b, color.a)
                    end
                elseif zone.type == 'sphere' then
                    DrawSphere(zone.data.coords.x, zone.data.coords.y, zone.data.coords.z, zone.data.radius, 255, 0, 255, 128)
                end
            end
            Wait(0)
        else
            Wait(500)
        end
    end
end)
