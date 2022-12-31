local GetCurrentResourceName = GetCurrentResourceName
local AddStateBagChangeHandler = AddStateBagChangeHandler
local tonumber = tonumber
local GetConvar = GetConvar
local GetGameTimer = GetGameTimer

local HasStreamedTextureDictLoaded = HasStreamedTextureDictLoaded
local RequestStreamedTextureDict = RequestStreamedTextureDict

local Me = {
	meTable = {},
}

local horseSeats = {
	SKEL_FrontSeat = {seatnum = -1, offset = vector3(0.1,0.0,0.4)},
	SKEL_RearSeat = {seatnum = 0, offset = vector3(0.1,0.0,0.4)}
}

local vehiclesSeats = {
	seat_anim_stagecoach_exterior_mid_left = {seatnum = 7},
	seat_pside_f = {seatnum = 0},
	seat_anim_stagecoach_exterior_mid_right = {seatnum = 8},
	seat_dside_r1 = {seatnum = 3},
	seat_dside_r = {seatnum = 1},
	seat_anim_stagecoach_exterior_rear_left = {seatnum = 9},
	seat_dside_f = {seatnum = -1},
	seat_anim_stagecoach_exterior_rear_right = {seatnum = 10},
	seat_anim_stagecoach_exterior_front_right = {seatnum = 6},
	seat_pside_r1 = {seatnum = 4},
	seat_pside_r = {seatnum = 2},
	seat_anim_stagecoach_exterior_front_left = {seatnum = 5}
}

--- @param otherPed number ped to get seat coords of
--- @return table|number coords from the ped will return GetEntityCoords if not in a vehicle / mount or unable to find coords
local function getPedCoords(otherPed)
	local mount = GetMount(otherPed)
	local otherPedCoords = GetEntityCoords(otherPed)

	if mount and DoesEntityExist(mount) then
		for k,v in pairs(horseSeats) do
			local pedInSeat = GetPedInVehicleSeat(mount, v.seatnum)
			if pedInSeat == otherPed then
				local boneIndex = GetEntityBoneIndexByName(mount, k)
				local boneCoords = GetWorldPositionOfEntityBone(mount, boneIndex)
				return boneCoords ~= vector3(0,0,0) and boneCoords + v.offset or otherPedCoords
			end
		end
	end

	local vehicle = GetVehiclePedIsIn(otherPed)

	if vehicle and DoesEntityExist(vehicle) then
		for k,v in pairs(vehiclesSeats) do
			local pedInSeat = GetPedInVehicleSeat(vehicle, v.seatnum)

			if pedInSeat == otherPed then
				local boneIndex = GetEntityBoneIndexByName(vehicle, k)
				local boneCoords = GetWorldPositionOfEntityBone(vehicle, boneIndex)

				return boneCoords ~= vector3(0,0,0) and boneCoords or otherPedCoords
			end
		end
	end

	return otherPedCoords
end

--- @param t table a table to get length of
--- @return number length of the table
local function tableLength(t)
	local retval = 0

	for k,v in pairs(t) do
		retval = retval + 1
	end

	return retval
end

function Me.Start()
	Me.name = GetCurrentResourceName()
	Me.drawTimer = tonumber(GetConvar(("%s:draw_timer"):format(Me.name), "7500")) or 7500
	Me.maxDrawDistance = tonumber(GetConvar(("%s:draw_distance"):format(Me.name), "10")) or 10
	Me.stateHandler = AddStateBagChangeHandler("me_txt", nil, Me.HandlerFunction)
end

--- @param bagName string
--- @param key string
--- @param value any
--- @param reserved number
--- @param replicated boolean
function Me.HandlerFunction(bagName, key, value, reserved, replicated)
	self = Me

	local stringNetId = bagName:gsub("entity:", "")
	local pedNetId = tonumber(stringNetId)

	if not pedNetId then
		return
	end

	self.meTable[pedNetId] = self.meTable[pedNetId] and self.meTable[pedNetId] or {}

	self.meTable[pedNetId][#self.meTable[pedNetId] + 1] = {text = value, time = GetGameTimer()}

	self:DrawThread()
end

function Me:DrawThread()
	if self.active then
		return
	end

	self.active = true

	CreateThread(function(threadId)
		while tableLength(self.meTable) > 0 do
			local sleepTimer = 250
			local ped = PlayerPedId()
			local pedCoords = GetEntityCoords(ped)
			local currentTime = GetGameTimer()

			for k,v in pairs(self.meTable) do
				local otherPed = NetworkGetEntityFromNetworkId(k)
				if #v == 0 then
					self.meTable[k] = nil
				else
					if DoesEntityExist(otherPed) and IsEntityVisible(otherPed) then
						local otherPedCoords = getPedCoords(otherPed)
						local dstCheck = #(otherPedCoords - pedCoords)

						if dstCheck < self.maxDrawDistance then
							sleepTimer = 0

							-- Add Check if the player is in a seat 
							for textKey,textData in pairs(v) do
								if currentTime - textData.time < self.drawTimer then
									self:DrawText3D(otherPedCoords, textData.text, textKey / 5)
								else
									table.remove(v, textKey)
								end
							end
						end
					end
				end
			end

			Wait(sleepTimer)
		end

		self.meTable = {}
		self.active = false
	end)
end

--- @param coords table|number coord where you want the text drawn
--- @param text string the text to be draw
--- @param offset number z offset addition
--- @param scale? number size of the text
--- @param r? number red
--- @param g? number green
--- @param b? number blue
--- @param alpha? number alpha
function Me:DrawText3D(coords,text,offset,scale,r,g,b,alpha)
	offset = offset and offset or 0

    local onScreen, _x, _y = GetScreenCoordFromWorldCoord(coords.x, coords.y, coords.z + offset)
    local factor = text:len() / 350

    if onScreen then
        if scale then
            SetTextScale(0.0 * scale, 0.35 * scale)
        else
            SetTextScale(0.30, 0.30)
        end

        SetTextFontForCurrentCommand(6) --0, 1, 5, 6, 9, 11, 12, 15, 18, 19, 20, 22, 24, 25, 28, 29
        SetTextColor(r or 255, g or 255, b or 255, alpha or 255)
		SetTextDropshadow(0, 0, 0, 255)
		SetTextCentre(1)

		DisplayText(CreateVarString(10, 'LITERAL_STRING', text), _x, _y)

		if not scale and self:RequestTextureDict("feeds") then
			DrawSprite("feeds", "toast_bg", _x + 0.002, _y + 0.01, 0.04 + factor, 0.03, 0.0, 0, 0, 0, 150, false)
		end
    end
end

--- @param dict string texture dictionary to be requested
--- @return boolean has the texture loaded
function Me:RequestTextureDict(dict)
	local breakTimer = 1000
	local requestTimer = GetGameTimer()

	RequestStreamedTextureDict(dict)

	while not HasStreamedTextureDictLoaded(dict) and GetGameTimer() - requestTimer < breakTimer do
		CreateThread(function()
			RequestStreamedTextureDict(dict)
		end)
		Wait(0)
	end

	return HasStreamedTextureDictLoaded(dict)
end

CreateThread(Me.Start)