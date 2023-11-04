Target = {}

local Wait = Wait

local GetEntityType = GetEntityType
local GetEntityModel = GetEntityModel
local GetEntityCoords = GetEntityCoords
local DisablePlayerFiring = DisablePlayerFiring
local SetCursorLocation = SetCursorLocation
local GetGameTimer = GetGameTimer

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
	self.class = {}

	setmetatable(self.targets, {
		__call = function(self,data)
			for k,v in pairs(self) do
				local this = v(data)

				if this then
					return this
				end
			end
		end
	})

	setmetatable(self.zones, {
		__call = function(self,data)
			for k,v in pairs(self) do
				local this = v(data)

				if this then
					return this
				end
			end
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

	self.name = GetCurrentResourceName()
	self.active = false
	self.distance = tonumber(GetConvar(("%s:raycast_distance"):format(self.name), "10")) or 10

	while GetResourceState("keymapper") ~= "started" do
		Wait(1000)
	end

	RegisterCommand('+eye_target', function() Target(true) end)
	RegisterCommand('-eye_target', function() Target(false) end)

	RegisterCommand('+eye_target:click', function() self.click = true end)
	RegisterCommand('-eye_target:click', function() self.click = false end)

	self.cacheHandler = AddEventHandler("events_manager:cache", self.UpdateCache)

	self.ready = true

	exports.keymapper:RegisterKeyMapping("eye_target", "Eye Target", "keyboard", "LALT")
	exports.keymapper:RegisterKeyMapping("eye_target:click", "Eye Target Use", "keyboard", "MOUSE1")

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

	if not map then
		for k,v in ipairs(self.intersect) do
			local shapeTestSphere = StartShapeTestSweptSphere(position.x, position.y, position.z, destination.x, destination.y, destination.z, 0.25, v, self.cache.ped, 7)

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
	else
		local shapeTestSphere = StartShapeTestSweptSphere(position.x, position.y, position.z, destination.x, destination.y, destination.z, 0.25, 1, self.cache.ped, 7)

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
		return
	end

	self.ratio = 1.77 -- GetAspectRatio(true) Doesn't seem to work on rdr and im not quite sure how i could do it :nikezMald:
	self.fov = GetFinalRenderedCamFov()

	--SendNuiMessage({show = true})
	exports['ui']:emitUI('target.state', { show = true })

	repeat
		local hit, coords, entity = self:RayCast()

		if hit == 1 then
			self.cache.pedCoords = GetEntityCoords(self.cache.ped)

			local data = {
				entity = entity,
				type = GetEntityType(entity),
				model = GetEntityType(entity) ~= 0 and GetEntityModel(entity),
				coords = coords,
				distance = #(self.cache.pedCoords - coords)
			}

			local dstCheck = data.distance <= self.distance

			local flag = ''

			if Citizen.InvokeNative(0x772A1969F649E902, data.model) then -- _IS_THIS_MODEL_A_HORSE
				flag = 'isHorse'
			end

			if dstCheck then
				local this = self.targets(data)

				if this then
					--SendNuiMessage({ontarget = true})
					exports['ui']:emitUI('target.state', { active = true, type = data.type, flag = flag })

					self:DisablePlayerFiring()

					while self.active do
						Wait(0)
						local _hit, _coords, _entity = self:RayCast()

						if _hit ~= 1 or _entity ~= entity then
							break
						end

						if self.click and this(data) then
							self.click = false

							--SetNuiFocus(true, true)
							SetCursorLocation(0.5, 0.5)
							--SendNuiMessage(json.encode(this.data)) -- Data sent when registering the target
							exports['ui']:emitUI('target.state', { context = _entity, type = data.type, actions = this.data })
							exports['ui']:focusUI(true, true)
						end
					end

					self:DisablePlayerFiring()

					--SendNuiMessage({ontarget = false})
					exports['ui']:emitUI('target.state', { active = false, type = -1, flag = '' })
				end
			end
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
				local this = self.zones(data)

				if this then
					--SendNuiMessage({ontarget = true})
					exports['ui']:emitUI('target.state', { active = true })

					self:DisablePlayerFiring()

					while self.active do
						Wait(0)

						local _hit, _coords, _entity = self:RayCast(true)

						self.cache.pedCoords = GetEntityCoords(self.cache.ped)

						local data = {
							coords = _coords,
							distance = #(self.cache.pedCoords - coords)
						}

						if _hit ~= 1 or not this(data) then
							break
						end

						if self.click and this(data) then
							local clickTime = GetGameTimer()

							while self.click and GetGameTimer() - clickTime < 10000 do
								Wait(0)
							end

							self.click = false

							if GetGameTimer() - clickTime < 10000 then
								--SetNuiFocus(true, true)
								SetCursorLocation(0.5, 0.5)
								--SendNuiMessage(json.encode(this.data)) -- Data sent when registering the target
								exports['ui']:emitUI('target.state', { show = false, context = 'zone', actions = this.data })
								exports['ui']:focusUI(true, true)
							end
						end
					end

					self:DisablePlayerFiring()

					--SendNuiMessage({ontarget = false})
					exports['ui']:emitUI('target.state', { active = false, type = -1, flag = '' })
				end
			end
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
		Wait(1000)
	end

	--local key = ("%s_%s"):format(data.type:lower(), tlen(self.targets))
	local key = data.id:lower()
	print(key)

	self.targets[key] = data

	self.targets[key].options = self.targets[key].options or {}
	self.targets[key].options.isEnabled = self.targets[key].options.isEnabled
	self.targets[key].options.distance = self.targets[key].options.distance and tonumber(self.targets[key].options.distance) or type(self.targets[key].options.distance) == "table" and self.targets[key].options.distance.radius and self.targets[key].options.distance.radius or self.distance

	if data.type == "flag" then
		if type(self.targets[key].group) == "string" then
			self.targets[key].group = {self.targets[key].group}
		end

		setmetatable(self.targets[key],{
			__call = function(self,data)
				if data.distance > self.options.distance then
					return false
				end

				if self.options.isEnabled and not self.options.isEnabled(data) then
					return false
				end

				for k,v in pairs(self.group) do
					if Target.class(data.model, v) then
						return self
					end
				end

				return false
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
				if data.distance > self.options.distance then
					return false
				end

				if self.options.isEnabled and not self.options.isEnabled(data) then
					return false
				end

				if self.group[data.model] then
					return self
				end

				return false
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
				if data.distance > self.options.distance then
					return false
				end

				if self.options.isEnabled and not self.options.isEnabled(data) then
					return false
				end

				if self.group[data.entity] then
					return self
				end

				return false
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
				if data.distance > self.options.distance then
					return false
				end

				if self.options.isEnabled and not self.options.isEnabled(data) then
					return false
				end

				for k,v in ipairs(self.group) do
					if exports.plouffe_zones:AreCoordsInZone(data.coords,v) then
						return self
					end
				end

				return false
			end
		})
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
	end
end)

if GetResourceState('ui') == 'started' then
	AddOnUIHandler()
end

-- Example Usages

CreateThread(function()
	Wait(2000)
	exports['init']:resolveResource('target')
	print('Add Example Targets')
	local flagKey = Target.AddTarget({
		id = 'horse',
		type = 'flag',
		group = {'isHorse'},
		icon = 'horse',
		data = {
			{
				id = 'horse_drink',
				label = 'Drink',
				icon = 'water',
				event = 'stable:client:drink',
				parameters = {},
			},
			{
				id = 'horse_lead',
				label = 'Lead',
				icon = 'lasso',
				event = 'stable:client:lead',
				parameters = {},
			}
		},
		options = {
			distance = 1.5,
			isEnabled = function(data)
				return IsEntityInWater(data.entity) == false
			end
		}
	})
	Target.AddTarget({
		id = 'coach',
		type = 'flag',
		group = {'isWagon'},
		data = {
			{
				id = 'wagon_drink',
				label = 'Drink',
				icon = 'water',
				event = 'stable:client:drink',
				parameters = {},
			},
			{
				id = 'wagon_lead',
				label = 'Lead',
				icon = 'lasso',
				event = 'stable:client:lead',
				parameters = {},
			}
		},
		options = {
			distance = 1.5,
			isEnabled = function(data)
				return IsEntityInWater(data.entity) == false
			end
		}
	})
end)

AddEventHandler('stable:client:drink', function()
	print('Do Horse Drinking')
end)

AddEventHandler('stable:client:lead', function()
	print('Do Horse Leading')
end)
