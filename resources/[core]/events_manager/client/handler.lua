local InvokeNative = Citizen.InvokeNative
local Await = Citizen.Await
local TriggerEvent = TriggerEvent
local GetPedInVehicleSeat = GetPedInVehicleSeat

local PlayerPedId = PlayerPedId
local GetEntityCoords = GetEntityCoords
local GetGameTimer = GetGameTimer

local GetEventAtIndex = GetEventAtIndex
local GetNumberOfEvents = GetNumberOfEvents
local IsPedInMeleeCombat = IsPedInMeleeCombat
local IsPlayerFreeAiming = IsPlayerFreeAiming
local GetVehiclePedIsIn = GetVehiclePedIsIn
local GetMount = GetMount
local GetCurrentPedWeapon = GetCurrentPedWeapon
local IsPedShooting = IsPedShooting

local DataView = DataView

local Events = {
	Events = {
		{name = 'EVENT_BUCKED_OFF', group = 0, size = 3},
		{name = 'EVENT_CALCULATE_LOOT', group = 0, size = 26},
		{name = 'EVENT_CALM_PED', group = 0, size = 4},
		{name = 'EVENT_CARRIABLE_UPDATE_CARRY_STATE', group = 0, size = 5},
		{name = 'EVENT_CARRIABLE_PROMPT_INFO_REQUEST', group = 0, size = 6},
		{name = 'EVENT_CARRIABLE_VEHICLE_STOW_START', group = 0, size = 5},
		{name = 'EVENT_CARRIABLE_VEHICLE_STOW_COMPLETE', group = 0, size = 3},
		{name = 'EVENT_CHALLENGE_GOAL_COMPLETE', group = 0, size = 1},
		{name = 'EVENT_CHALLENGE_GOAL_UPDATE', group = 0, size = 1},
		{name = 'EVENT_CHALLENGE_REWARD', group = 0, size = 3},
		{name = 'EVENT_CONTAINER_INTERACTION', group = 0, size = 4},
		{name = 'EVENT_CRIME_CONFIRMED', group = 0, size = 3},
		{name = 'EVENT_DAILY_CHALLENGE_STREAK_COMPLETED', group = 0, size = 1},
		{name = 'EVENT_ENTITY_BROKEN', group = 0, size = 9},
		{name = 'EVENT_ENTITY_DAMAGED', group = 0, size = 9},
		{name = 'EVENT_ENTITY_DESTROYED', group = 0, size = 9},
		{name = 'EVENT_ENTITY_DISARMED', group = 0, size = 4},
		{name = 'EVENT_ENTITY_EXPLOSION', group = 0, size = 6},
		{name = 'EVENT_ENTITY_HOGTIED', group = 0, size = 3},
		{name = 'EVENT_HEADSHOT_BLOCKED_BY_HAT', group = 0, size = 2},
		{name = 'EVENT_HELP_TEXT_REQUEST', group = 0, size = 4},
		{name = 'EVENT_HITCH_ANIMAL', group = 0, size = 4},
		{name = 'EVENT_HOGTIED_ENTITY_PICKED_UP', group = 0, size = 2},
		{name = 'EVENT_HORSE_BROKEN', group = 0, size = 3},
		{name = 'EVENT_IMPENDING_SAMPLE_PROMPT', group = 0, size = 2},
		{name = 'EVENT_INVENTORY_ITEM_PICKED_UP', group = 0, size = 5},
		{name = 'EVENT_INVENTORY_ITEM_REMOVED', group = 0, size = 1},
		{name = 'EVENT_ITEM_PROMPT_INFO_REQUEST', group = 0, size = 2},
		{name = 'EVENT_LOOT', group = 0, size = 36},
		{name = 'EVENT_LOOT_COMPLETE', group = 0, size = 3},
		{name = 'EVENT_LOOT_PLANT_START', group = 0, size = 36},
		{name = 'EVENT_LOOT_VALIDATION_FAIL', group = 0, size = 2},
		{name = 'EVENT_MISS_INTENDED_TARGET', group = 0, size = 3},
		{name = 'EVENT_MOUNT_OVERSPURRED', group = 0, size = 6},
		{name = 'EVENT_NETWORK_AWARD_CLAIMED', group = 1, size = 12},
		{name = 'EVENT_NETWORK_BOUNTY_REQUEST_COMPLETE', group = 1, size = 7},
		{name = 'EVENT_NETWORK_BULLET_IMPACTED_MULTIPLE_PEDS', group = 1, size = 4},
		{name = 'EVENT_NETWORK_CASHINVENTORY_TRANSACTION', group = 1, size = 6},
		{name = 'EVENT_NETWORK_CREW_CREATION', group = 1, size = 10},
		{name = 'EVENT_NETWORK_CREW_DISBANDED', group = 1, size = 2},
		{name = 'EVENT_NETWORK_CREW_INVITE_RECEIVED', group = 1, size = 11},
		{name = 'EVENT_NETWORK_CREW_JOINED', group = 1, size = 2},
		{name = 'EVENT_NETWORK_CREW_KICKED', group = 1, size = 2},
		{name = 'EVENT_NETWORK_CREW_LEFT', group = 1, size = 2},
		{name = 'EVENT_NETWORK_CREW_RANK_CHANGE', group = 1, size = 7},
		{name = 'EVENT_NETWORK_DAMAGE_ENTITY', group = 1, size = 32},
		{name = 'EVENT_NETWORK_GANG', group = 1, size = 18},
		{name = 'EVENT_NETWORK_GANG_WAYPOINT_CHANGED', group = 1, size = 3},
		{name = 'EVENT_NETWORK_HOGTIE_BEGIN', group = 1, size = 2},
		{name = 'EVENT_NETWORK_HOGTIE_END', group = 1, size = 2},
		{name = 'EVENT_NETWORK_HUB_UPDATE', group = 1, size = 1},
		{name = 'EVENT_NETWORK_INCAPACITATED_ENTITY', group = 1, size = 4},
		{name = 'EVENT_NETWORK_LASSO_ATTACH', group = 1, size = 2},
		{name = 'EVENT_NETWORK_LASSO_DETACH', group = 1, size = 2},
		{name = 'EVENT_NETWORK_LOOT_CLAIMED', group = 1, size = 9},
		{name = 'EVENT_NETWORK_MINIGAME_REQUEST_COMPLETE', group = 1, size = 6},
		{name = 'EVENT_NETWORK_PED_DISARMED', group = 1, size = 3},
		{name = 'EVENT_NETWORK_PED_HAT_SHOT_OFF', group = 1, size = 3},
		{name = 'EVENT_NETWORK_PERMISSION_CHECK_RESULT', group = 1, size = 2},
		{name = 'EVENT_NETWORK_PICKUP_COLLECTION_FAILED', group = 1, size = 3},
		{name = 'EVENT_NETWORK_PICKUP_RESPAWNED', group = 1, size = 2},
		{name = 'EVENT_NETWORK_PLAYER_COLLECTED_PICKUP', group = 1, size = 8},
		{name = 'EVENT_NETWORK_PLAYER_COLLECTED_PORTABLE_PICKUP', group = 1, size = 3},
		{name = 'EVENT_NETWORK_PLAYER_DROPPED_PORTABLE_PICKUP', group = 1, size = 3},
		{name = 'EVENT_NETWORK_PLAYER_JOIN_SCRIPT', group = 1, size = 41},
		{name = 'EVENT_NETWORK_PLAYER_LEFT_SCRIPT', group = 1, size = 41},
		{name = 'EVENT_NETWORK_PLAYER_JOIN_SESSION', group = 1, size = 10},
		{name = 'EVENT_NETWORK_PLAYER_LEFT_SESSION', group = 1, size = 10},
		{name = 'EVENT_NETWORK_PLAYER_MISSED_SHOT', group = 1, size = 9},
		{name = 'EVENT_NETWORK_POSSE_CREATED', group = 1, size = 10},
		{name = 'EVENT_NETWORK_POSSE_DATA_CHANGED', group = 1, size = 2},
		{name = 'EVENT_NETWORK_POSSE_DISBANDED', group = 1, size = 2},
		{name = 'EVENT_NETWORK_POSSE_EX_ADMIN_DISBANDED', group = 1, size = 9},
		{name = 'EVENT_NETWORK_POSSE_EX_INACTIVE_DISBANDED', group = 1, size = 10},
		{name = 'EVENT_NETWORK_POSSE_JOINED', group = 1, size = 2},
		{name = 'EVENT_NETWORK_POSSE_LEADER_SET_ACTIVE', group = 1, size = 23},
		{name = 'EVENT_NETWORK_POSSE_LEFT', group = 1, size = 1},
		{name = 'EVENT_NETWORK_POSSE_MEMBER_DISBANDED', group = 1, size = 23},
		{name = 'EVENT_NETWORK_POSSE_MEMBER_JOINED', group = 1, size = 23},
		{name = 'EVENT_NETWORK_POSSE_MEMBER_KICKED', group = 1, size = 23},
		{name = 'EVENT_NETWORK_POSSE_MEMBER_LEFT', group = 1, size = 23},
		{name = 'EVENT_NETWORK_POSSE_MEMBER_SET_ACTIVE', group = 1, size = 23},
		{name = 'EVENT_NETWORK_PROJECTILE_ATTACHED', group = 1, size = 6},
		{name = 'EVENT_NETWORK_PROJECTILE_NO_DAMAGE_IMPACT', group = 1, size = 2},
		{name = 'EVENT_NETWORK_REVIVED_ENTITY', group = 1, size = 2},
		{name = 'EVENT_NETWORK_SESSION_EVENT', group = 1, size = 10},
		{name = 'EVENT_NETWORK_SESSION_MERGE_END', group = 1, size = 1},
		{name = 'EVENT_NETWORK_SESSION_MERGE_START', group = 1, size = 1},
		{name = 'EVENT_NETWORK_VEHICLE_LOOTED', group = 1, size = 3},
		{name = 'EVENT_NETWORK_VEHICLE_UNDRIVABLE', group = 1, size = 3},
		{name = 'EVENT_OBJECT_INTERACTION', group = 0, size = 10},
		{name = 'EVENT_PED_ANIMAL_INTERACTION', group = 0, size = 3},
		{name = 'EVENT_PED_CREATED', group = 0, size = 1},
		{name = 'EVENT_PED_DESTROYED', group = 0, size = 1},
		{name = 'EVENT_PED_HAT_KNOCKED_OFF', group = 0, size = 2},
		{name = 'EVENT_PED_WHISTLE', group = 0, size = 2},
		{name = 'EVENT_PICKUP_CARRIABLE', group = 0, size = 4},
		{name = 'EVENT_PLACE_CARRIABLE_ONTO_PARENT', group = 0, size = 6},
		{name = 'EVENT_PLAYER_COLLECTED_AMBIENT_PICKUP', group = 0, size = 8},
		{name = 'EVENT_PLAYER_ESCALATED_PED', group = 0, size = 2},
		{name = 'EVENT_PLAYER_HAT_EQUIPPED', group = 0, size = 10},
		{name = 'EVENT_PLAYER_HAT_KNOCKED_OFF', group = 0, size = 5},
		{name = 'EVENT_PLAYER_HORSE_AGITATED_BY_ANIMAL', group = 0, size = 4},
		{name = 'EVENT_PLAYER_MOUNT_WILD_HORSE', group = 0, size = 1},
		{name = 'EVENT_PLAYER_PROMPT_TRIGGERED', group = 0, size = 10},
		{name = 'EVENT_RAN_OVER_PED', group = 0, size = 2},
		{name = 'EVENT_REVIVE_ENTITY', group = 0, size = 3},
		{name = 'EVENT_SCENARIO_ADD_PED', group = 2, size = 2},
		{name = 'EVENT_SCENARIO_DESTROY_PROP', group = 2, size = 2},
		{name = 'EVENT_SCENARIO_REMOVE_PED', group = 2, size = 2},
		{name = 'EVENT_SHOCKING_ITEM_STOLEN', group = 0, size = 3},
		{name = 'EVENT_SHOT_FIRED_BULLET_IMPACT', group = 0, size = 1},
		{name = 'EVENT_SHOT_FIRED_WHIZZED_BY', group = 0, size = 1},
		{name = 'EVENT_STAT_VALUE_CHANGED', group = 0, size = 2},
		{name = 'EVENT_TRIGGERED_ANIMAL_WRITHE', group = 0, size = 2},
		{name = 'EVENT_UI_ITEM_INSPECT_ACTIONED', group = 3, size = 6},
		{name = 'EVENT_UI_QUICK_ITEM_USED', group = 3, size = 6},
		{name = 'EVENT_VEHICLE_CREATED', group = 0, size = 1},
		{name = 'EVENT_VEHICLE_DESTROYED', group = 0, size = 1}
	}
}

--- @param vehicle int The vehicle <optional>
--- @param ped int the ped <optional>
local function getPedSeat(vehicle, ped)
	local ped = ped or Events.cache.ped
	local vehicle = vehicle or Events.onMount and Events.mount or Events.inVehicle and Events.vehicle
	local currentSeat = nil

	-- I assumed iterating 10 was faster than using = GetVehicleModelNumberOfSeats + GetEntityModel
	for i = -1, 10 do
		local pedInSeat = GetPedInVehicleSeat(vehicle, i)
		if pedInSeat == ped then
			return i
		end
	end
end

function Events:Thread()
	CreateThread(function(threadId)
		local baseEventsPromise = promise.new()
		local cachePromise = promise.new()

		self.name = GetCurrentResourceName()
		self.baseEventSleep = tonumber(GetConvar(("%s:base_event_sleep"):format(self.name), "0")) or 0
		self.warning = GetConvar(("%s:warnings"):format(self.name), "false") == "true"
		self.cacheUpdate = tonumber(GetConvar(("%s:cahe_update"):format(self.name), 10 * 1000)) or 10 * 1000

		self.cache = {}

		if self.warning then
			self.warnings = {}
		end

		self.await = {}

		self.tracked = {}
		self.events = {}
		self.callbacks = {}

		for k,v in ipairs(self.Events) do
			self.events[joaat(v.name)] = function(eventIndex, returnData)
				local size = 8*v.size
				local struct = DataView.ArrayBuffer(size)
				local params = {}

				for i = 0, size, 8 do
					struct:SetInt32(i ,0)
				end

				if InvokeNative(0x57EC5FA4D4D6AFCA, 0, eventIndex, struct:Buffer(), v.size) then
					for i = 0, size, 8 do
						params[#params + 1] = struct:GetInt32(i)
					end
				end

				if returnData then
					return params
				end

				TriggerEvent(("%s:%s"):format(self.name, v.name), params)

				if self.warning then
					if self.warnings[v.name] and GetGameTimer() - self.warnings[v.name] < 500 then
						print(("%s has triggered an event in %s ms (Events spamming can create performance issues)"):format(v.name, GetGameTimer() - self.warnings[v.name]))
					end

					self.warnings[v.name] = GetGameTimer()
				end
			end
		end

		CreateThread(function(threadId)
			cachePromise:resolve(threadId)

			self.cache.playerId = PlayerId()
			self.cache.ped = PlayerPedId()
			self.cache.pedCoords = GetEntityCoords(self.ped)

			while true do
				local lastUpdate = 0
				local ped = PlayerPedId()

				self.cache.gameTimer = GetGameTimer()

				if self.cache.gameTimer - lastUpdate > self.cacheUpdate or self.cache.ped ~= ped then
					lastUpdate = self.cache.gameTimer
					TriggerEvent(("%s:cache"):format(self.name), self.cache)
				end

				self.cache.ped = ped
				self.cache.pedCoords = GetEntityCoords(self.ped)

				Wait(500)
			end
		end)

		CreateThread(function(threadId)
			baseEventsPromise:resolve(threadId)

			while true do
				local size = GetNumberOfEvents(0)

				if size > 0 then
					self:NumberOfEvents(size)
				end

				self.meleCombat = IsPedInMeleeCombat(self.cache.ped)

				self.hasRightHandWeapon, self.rightHandWeapon = GetCurrentPedWeapon(self.cache.ped, true, 0, false)
				self.hasLeftHandWeapon, self.leftHandWeapon = GetCurrentPedWeapon(self.cache.ped, true, 1, false)

				self.currentlyAiming = IsPlayerFreeAiming(self.cache.playerId)

				self.aimingInAir = InvokeNative(0x8785E6E40C7A8819, self.cache.ped) -- _GET_IS_PED_AIMING_IN_THE_AIR

				self.vehicle = GetVehiclePedIsIn(self.cache.ped, false)
				self.inVehicle = self.vehicle ~= 0

				self.mount = GetMount(self.cache.ped)
				self.onMount = self.mount ~= 0

				self.interaction = InvokeNative(0x6AA3DCA2C6F5EB6D, self.cache.ped) -- GET_ITEM_INTERACTION_STATE

				if (self.hasRightHandWeapon and self.currentRightHandWeapon ~= self.rightHandWeapon) or (self.hasLeftHandWeapon and self.currentLeftHandWeapon ~= self.leftHandWeapon) then
					self.currentRightHandWeapon = self.rightHandWeapon
					self.currentLeftHandWeapon = self.leftHandWeapon

					if InvokeNative(0x30E7C16B12DA8211, self.rightHandWeapon) then -- IS_WEAPON_THROWABLE
						self:ManageThrowables()
					end

					TriggerEvent(("%s:weapon"):format(self.name), {self.currentRightHandWeapon, self.currentLeftHandWeapon})
				end

				if self.aimingInAir and not self.isAimingInAir then
					self.isAimingInAir = true
					TriggerEvent(("%s:aimingInAir"):format(self.name), self.isAimingInAir)
				elseif self.isAimingInAir and not self.aimingInAir then
					self.isAimingInAir = false
					TriggerEvent(("%s:aimingInAir"):format(self.name), self.isAimingInAir)
				end

				if self.meleCombat and not self.isInMeleCombat then
					self.isInMeleCombat = true
					self.meleCombatTimer = self.cache.gameTimer
					TriggerEvent(("%s:meleCombat"):format(self.name), self.isInMeleCombat)
				elseif not self.meleCombat and self.isInMeleCombat and self.cache.gameTimer - self.meleCombatTimer > 250 then
					self.isInMeleCombat = false
					TriggerEvent(("%s:meleCombat"):format(self.name), self.isInMeleCombat)
				end

				if self.currentlyAiming and not self.aiming then
					self.aiming = true
					TriggerEvent(("%s:aiming"):format(self.name), self.aiming)
				elseif not self.currentlyAiming and self.aiming then
					self.aiming = false
					TriggerEvent(("%s:aiming"):format(self.name), self.aiming)
				end

				if self.interaction and self.lastInteraction ~= self.interaction then
					self.interactionEntity = InvokeNative(0x05A0100EA714DB68, self.cache.ped) -- _GET_ITEM_INTERACTION_ENTITY_FROM_PED
					self.lastInteraction = self.interaction
					self.lastInteractionEntity = self.interactionEntity

					TriggerEvent(("%s:itemInteraction"):format(self.name), true, self.interaction, self.interactionEntity)
				elseif self.lastInteraction and not self.interaction then

					TriggerEvent(("%s:itemInteraction"):format(self.name), false, self.lastInteraction, self.lastInteractionEntity)
					self.lastInteraction = nil
					self.lastInteractionEntity = nil
				end

				if not self.wasOnMount and self.onMount then
					self.wasOnMount = true
					self.currentSeat = getPedSeat()
					self.lastMount = self.mount
					self.lastSeat = self.currentSeat

					TriggerEvent(("%s:mount"):format(self.name), self.onMount, self.mount, self.currentSeat)
				elseif self.wasOnMount and not self.onMount then
					self.wasOnMount = false
					self.currentSeat = nil

					TriggerEvent(("%s:mount"):format(self.name), self.onMount, self.lastMount, self.lastSeat)

					self.lastSeat = nil
					self.lastMount = nil
				end

				if not self.wasInVehicle and self.inVehicle then
					self.wasInVehicle = true
					self.currentSeat = getPedSeat()
					self.lastVehicle = self.vehicle
					self.lastSeat = self.currentSeat

					TriggerEvent(("%s:vehicle"):format(self.name), self.inVehicle, self.vehicle, self.currentSeat)
				elseif self.wasInVehicle and not self.inVehicle then
					self.wasInVehicle = false
					self.currentSeat = nil

					TriggerEvent(("%s:vehicle"):format(self.name), self.inVehicle, self.lastVehicle, self.lastSeat)

					self.lastSeat = nil
					self.lastVehicle = nil
				end

				if self.currentSeat then
					local seat = getPedSeat()

					if seat ~= self.currentSeat then
						TriggerEvent(("%s:seat"):format(self.name), seat, self.currentSeat)
						self.currentSeat = seat
						self.lastSeat = self.currentSeat
					end
				end

				Wait(self.baseEventSleep)
			end
		end)

		return Await(baseEventsPromise), Await(cachePromise)
	end)
end

--- @return void
function Events:ManageThrowables()
	CreateThread(function()
		local ammo = GetAmmoInClip(self.cache.ped, self.rightHandWeapon)

		while InvokeNative(0x30E7C16B12DA8211, self.rightHandWeapon) do -- IS_WEAPON_THROWABLE
			local currentAmmo = GetAmmoInClip(self.cache.ped, self.rightHandWeapon)

			if IsPedShooting(self.cache.ped) or ammo ~= currentAmmo then
				ammo = currentAmmo

				TriggerEvent(("%s:throwing"):format(self.name), self.currentRightHandWeapon)
			end

			Wait(0)
		end
	end)
end

---@param amount int basicly the size fetched from GetNumberOfEvents
function Events:NumberOfEvents(amount)
	for i = 0, amount - 1 do
		local index = GetEventAtIndex(0, i)

		if self.tracked[index] then
			self.events[index](i)
		elseif self.await[index] then
			self.await[index]:resolve(self.events[index](i, true))
		elseif self.callbacks[index] then
			self:ExecuteCallback(index)
		end
	end
end

-- Missing params here right ?
---@param index number Hashkey of the game event
function Events:ExecuteCallback(index)
	local remove = {}

	for k,v in pairs(self.callbacks[index]) do
		remove[k] = getmetatable(self.callbacks[index]) and getmetatable(self.callbacks[index]).clear or nil
		v()
	end

	for k,v in pairs(remove) do
		self.callbacks[index][k] = nil
	end
end

---@param name string the game event name
function Events.Await(name)
	local index = joaat(name:upper())

	self = self or Events
	self.await[joaat(name:upper())] = promise.new()

	return Await(self.await[joaat(name:upper())])
end
exports("Await", Events.Await)

---@param name string the game event name
---@param cb function the callback you want
---@param clear boolean to remove the function after its been triggered
function Events.Callback(name,cb,clear)
	local index = joaat(name:upper())

	self = self or Events
	self.callbacks[index] = not self.callbacks[index] and {} or self.callbacks[index]

	table.insert(self.callbacks[index], cb)
	setmetatable(self.callbacks[index], {clear = clear})
end
exports("Callback", Events.Callback)

---@param name string the game event name to register
function Events.Register(name)
	local index = joaat(name:upper())

	self = self or Events

	while not self.tracked do
		Wait(100)
	end

	self.tracked[index] = self.tracked[index] and self.tracked[index] + 1 or 1
end
exports("Register", Events.Register)

---@param name string the game event name to register
function Events.Remove(name)
	local index = joaat(name:upper())

	self = self or Events

	self.tracked[index] = self.tracked[index] and self.tracked[index] - 1 > 0 and self.tracked[index] - 1 or nil
end
exports("Remove", Events.Remove)

Events.gameThreadId, Events.cacheThreadId = Events:Thread()

-- Exemples

-- AddEventHandler("events_manager:throwing", function(throwableHash)
-- 	print(("Player just threw %s "):format(throwableHash))
-- end)

-- AddEventHandler("events_manager:aimingInAir", function(state)
-- 	if state then
-- 		print("Player is aiming in air")
-- 	else
-- 		print("Player is not aiming in air anymore")
-- 	end
-- end)

-- AddEventHandler("events_manager:meleCombat", function(state)
-- 	if state then
-- 		print("Player started mele combat")
-- 	else
-- 		print("Player ended mele combat")
-- 	end
-- end)

-- AddEventHandler("events_manager:itemInteraction", function(state, interactionHash, entity)
-- 	if state then
-- 		print(("Player started item interaction %s with entity %s "):format(interactionHash, entity))
-- 	else
-- 		print(("Player ended item interaction %s with entity %s "):format(interactionHash, entity))
-- 	end
-- end)

-- AddEventHandler("events_manager:aiming", function(state)
-- 	if state then
-- 		print("Player is free aiming")
-- 	else
-- 		print("Player stopped free aiming")
-- 	end
-- end)

-- AddEventHandler("events_manager:weapon", function(weaponHash)
-- 	print(("Player equiped weapon %s"):format(weaponHash))
-- end)

-- AddEventHandler("events_manager:mount", function(state, mount, seat)
-- 	if state then
-- 		print(("Player is on mount %s in seat %s"):format(mount, seat))
-- 	else
-- 		print(("Player left mount %s was in seat %s"):format(mount, seat))
-- 	end
-- end)

-- AddEventHandler("events_manager:vehicle", function(state, vehicle, seat)
-- 	if state then
-- 		print(("Player entered vehicle %s in seat %s"):format(vehicle, seat))
-- 	else
-- 		print(("Player left vehicle %s was in seat %s"):format(vehicle, seat))
-- 	end
-- end)

-- AddEventHandler("events_manager:seat", function(currentSeat, oldSeat)
-- 	print(("Player switched seat from %s to %s"):format(oldSeat, currentSeat))
-- end)

-- The events dont get triggered as long as you dont ask the script to trigger the event (Reduces spamming)
-- This makes it so the game event EVENT_ENTITY_DAMAGED is triggered
-- exports.events_manager:Register("EVENT_ENTITY_DAMAGED")

-- This removes it ( If you register the event in 4 resource you need to remove it in 4 resource or 4 times for it to not be triggered anymore)
-- exports.events_manager:Remove("EVENT_ENTITY_DAMAGED")

-- Exampe of catching game events
-- AddEventHandler("events_manager:EVENT_ENTITY_DAMAGED", function(data)
-- 	print("EVENT_ENTITY_DAMAGED", json.encode(data))
-- end)

-- This allows you to create a callback for a game event instead of using game events (Situational but usefull)
-- CreateThread(function()
-- 	exports.events_manager:Callback("EVENT_ENTITY_DAMAGED", function(data)
-- 		print("Callback, EVENT_ENTITY_DAMAGED", json.encode(data))
-- 	end, true)
-- end)

-- This allows to create a promise to catch data from a game event
-- CreateThread(function()
-- 	local data = exports.events_manager:Await("EVENT_ENTITY_DAMAGED")
-- 	print("Promise, EVENT_ENTITY_DAMAGED", json.encode(data))
-- end)
