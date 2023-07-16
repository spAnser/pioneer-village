local glm = require 'glm'

local DEBUG = true
local LOOP_DELAY = 250
local Zones = {}
local InZones = {}
local InZonesTimeEnter = {}
local InZonesTimeExit = {}

--
-- Helpers
--
function DrawPoly(v1, v2, v3, r, g, b, a)
    --Citizen.InvokeNative(`DRAW_POLY` & 0xFFFFFFFF, v1, v2, v3, r, g, b, a)
    Citizen.InvokeNative(GetHashKey('DRAW_POLY') & 0xFFFFFFFF, v1, v2, v3, r, g, b, a)
end

function DrawSphere(x, y, z, radius, r, g, b, a)
    --Citizen.InvokeNative(`DRAW_SPHERE` & 0xFFFFFFFF, x, y, z, radius, r, g, b, a)
    --Citizen.InvokeNative(GetHashKey('DRAW_SPHERE') & 0xFFFFFFFF, x, y, z, radius, r, g, b, a)
    Citizen.InvokeNative(0x2A32FAA57B937173, 0x50638AB9, x, y, z, 0, 0, 0, 0, 0, 0, radius, radius, radius, r, g, b, a, false, false, 0, false, false, false, false)
end

--taken straight from --https://github.com/mkafrin/PolyZone/blob/master/client.lua
function DrawWall(p1, p2, minZ, maxZ, r, g, b, a)
    local bottomLeft = vector3(p1.x, p1.y, minZ)
    local topLeft = vector3(p1.x, p1.y, maxZ)
    local bottomRight = vector3(p2.x, p2.y, minZ)
    local topRight = vector3(p2.x, p2.y, maxZ)

    DrawPoly(bottomLeft, topLeft, bottomRight, r, g, b, a)
    DrawPoly(topLeft, topRight, bottomRight, r, g, b, a)
    DrawPoly(bottomRight, topRight, topLeft, r, g, b, a)
    DrawPoly(bottomRight, topLeft, bottomLeft, r, g, b, a)
end

--
-- Generators
--
function generatePoly(data)
    local points = {}
    local centerPoint = vector2(0, 0)
    local maxZ = data.minZ
    local minZ = data.maxZ
    local centerZ = (minZ + maxZ) / 2
    for _, point in pairs(data.points) do
        centerPoint = centerPoint + vector2(point.x, point.y)
        table.insert(points, vector3(point.x, point.y, centerZ))
    end
    centerPoint = centerPoint / #points
    centerPoint = vector3(centerPoint.x, centerPoint.y, centerZ)

    Zones[data.name] = {
        type = 'poly',
        data = {
            name = data.name,
            points = data.points,
            coords = centerPoint,
            debug = data.options.debug,
            delayEnter = data.options.delayEnter,
            delayExit = data.options.delayExit,
            maxZ = maxZ,
            minZ = minZ,
            size = vector3(0, 0, maxZ - minZ),
        },
        polygon = glm.polygon.new(points)
    }
end

function generateBox(data)
    local halfHeight = data.size.z / 2
    local centerPoint = data.coords.z
    local minZ = centerPoint - halfHeight
    local maxZ = centerPoint + halfHeight

    local quatRotation = quat(data.rotation or 0, vec3(0, 0, 1))

    Zones[data.name] = {
        type = 'box',
        data = {
            name = data.name,
            coords = data.coords,
            rotation = data.rotation,
            quat = quatRotation,
            debug = data.options.debug,
            delayEnter = data.options.delayEnter,
            delayExit = data.options.delayExit,
            maxZ = maxZ,
            minZ = minZ,
            size = data.size,
        },
        polygon = (quatRotation * glm.polygon.new({
            vec3(data.size.x, data.size.y, 0),
            vec3(-data.size.x, data.size.y, 0),
            vec3(-data.size.x, -data.size.y, 0),
            vec3(data.size.x, -data.size.y, 0),
        }) + data.coords)
    }
end

function generateSphere(data)
    Zones[data.name] = {
        type = 'sphere',
        data = {
            name = data.name,
            coords = data.coords,
            radius = data.radius,
            debug = data.options.debug,
            delayEnter = data.options.delayEnter,
            delayExit = data.options.delayExit,
        }
    }
end

-- @param name      string
-- @param points    vector2[]
-- @param minZ      float
-- @param maxZ      float
-- @param options   { debug = boolean }
exports('AddPoly', function(name, points, minZ, maxZ, options)
    generatePoly({
        name = name,
        points = points,
        minZ = minZ,
        maxZ = maxZ,
        options = options,
    })
end)


-- @param name      string
-- @param coords    vector3
-- @param size      vector3
-- @param rotation  vector3
-- @param options   { debug = boolean }
exports('AddBox', function(name, coords, size, rotation, options)
    generateBox({
        name = name,
        coords = coords,
        size = size,
        rotation = rotation,
        options = options,
    })
end)


-- @param name     string
-- @param coords   vector3
-- @param radius   float
-- @param options  { debug = boolean }
exports('AddSphere', function(name, coords, radius, options)
    generateSphere({
        name = name,
        coords = vector3(coords.x, coords.y, coords.z),
        radius = radius * 1.0,
        options = options,
    })
end)

-- @param name  string
exports('Remove', function(name)
    if Zones[name] then
        Zones[name] = nil
    end
    if InZones[name] then
        InZones[name] = nil
    end
end)

-- LOOP
Citizen.CreateThread(function()
    Wait(500)
    while true do
        for zoneName, zone in pairs(Zones) do
            local inZone = false

            if zone.polygon then
                inZone = glm.polygon.contains(zone.polygon, GetEntityCoords(PlayerPedId(), false), zone.data.size.z / 4)
            elseif zone.type == 'sphere' then
                local distance = #(zone.data.coords - GetEntityCoords(PlayerPedId(), false))
                if distance < zone.data.radius then
                    inZone = true
                end
            end

            if inZone and not InZones[zoneName] then
                if not InZonesTimeEnter[zoneName] then
                    InZonesTimeEnter[zoneName] = GetGameTimer()
                end
                if not zone.data.delayEnter or GetGameTimer() - InZonesTimeEnter[zoneName] >= zone.data.delayEnter then
                    InZones[zoneName] = true
                    InZonesTimeEnter[zoneName] = nil
                    TriggerEvent('zones::' .. zoneName .. '::enter')
                    if DEBUG then
                        print('Entered Zone', zoneName)
                    end
                end
            elseif not inZone and InZones[zoneName] then
                if not InZonesTimeExit[zoneName] then
                    InZonesTimeExit[zoneName] = GetGameTimer()
                end
                if not zone.data.delayExit or GetGameTimer() - InZonesTimeExit[zoneName] >= zone.data.delayExit then
                    InZones[zoneName] = nil
                    InZonesTimeExit[zoneName] = nil
                    TriggerEvent('zones::' .. zoneName .. '::exit')
                    if DEBUG then
                        print('Left Zone', zoneName)
                    end
                end
            elseif inZone and InZonesTimeExit[zoneName] then
                InZonesTimeExit[zoneName] = nil
            elseif not inZone and InZonesTimeEnter[zoneName] then
                InZonesTimeEnter[zoneName] = nil
            end
        end
        Wait(LOOP_DELAY or 1000)
    end
end)


-- DEBUG DRAW
if DEBUG then
    Citizen.CreateThread(function()
        Wait(500)
        while true do
            for _, zone in pairs(Zones) do
                if zone.data.debug then
                    if zone.polygon then
                        local corner = zone.polygon
                        for k, point in pairs(corner) do
                            local secondPoint = corner[1]
                            if k < #corner then
                                secondPoint = corner[k + 1]
                            end
                            DrawWall(point, secondPoint, zone.data.minZ, zone.data.maxZ, 0, 0, 0, 128)
                        end
                    elseif zone.type == 'sphere' then
                        local x = zone.data.coords.x
                        local y = zone.data.coords.y
                        local z = zone.data.coords.z
                        DrawSphere(x, y, z, zone.data.radius, 0, 0, 0, 128)
                    end
                end
            end
            Wait(0)
        end
    end)
end
