local Await = Citizen.Await
local ExecuteCommand = ExecuteCommand
local IsControlJustPressed, IsDisabledControlJustPressed, IsControlJustReleased, IsDisabledControlJustReleased, IsControlPressed, IsDisabledControlPressed = IsControlJustPressed, IsDisabledControlJustPressed, IsControlJustReleased, IsDisabledControlJustReleased, IsControlPressed, IsDisabledControlPressed
local KeyMapper = {
	keys = {
		["A"] = {hash = 0x7065027D},
		["B"] = {hash = 0x4CC0E2FE},
		["C"] = {hash = 0x9959A6F0},
		["D"] = {hash = 0xB4E465B4},
		["E"] = {hash = 0xCEFD9220},
		["F"] = {hash = 0xB2F377E8},
		["G"] = {hash = 0x760A9C6F},
		["H"] = {hash = 0x24978A28},
		["I"] = {hash = 0xC1989F95},
		["J"] = {hash = 0xF3830D8E},
		-- ["K"] = {hash = Missing},
		["L"] = {hash = 0x80F28E95},
		["M"] = {hash = 0xE31C6A41},
		["N"] = {hash = 0x4BC9DABB},
		["O"] = {hash = 0xF1301666},
		["P"] = {hash = 0xD82E0BD2},
		["Q"] = {hash = 0xDE794E3E},
		["R"] = {hash = 0xE30CD707},
		["S"] = {hash = 0xD27782E3},
		-- ["T"] = {hash = Missing},
		["U"] = {hash = 0xD8F73058},
		["V"] = {hash = 0x7F8D09B8},
		["W"] = {hash = 0x8FD015D8},
		["X"] = {hash = 0x8CC9CD42},
		-- ["Y"] = {hash = Missing},
		["Z"] = {hash = 0x26E9DC00},
		["RIGHTBRACKET"] = {hash = 0xA5BDCD3C},
		["LEFTBRACKET"] = {hash = 0x430593AA},
		["MOUSE1"] = {hash = 0x07CE1E61},
		["MOUSE2"] = {hash = 0xF84FA74F},
		["MOUSE3"] = {hash = 0xCEE12B50},
		["MWUP"] = {hash = 0x3076E97C},
		["CTRL"] = {hash = 0xDB096B85},
		["TAB"] = {hash = 0xB238FE0B},
		["SHIFT"] = {hash = 0x8FFC75D6},
		["SPACEBAR"] = {hash = 0xD9D0E1C0},
		["ENTER"] = {hash = 0xC7B5340A},
		["BACKSPACE"] = {hash = 0x156F7119},
		["LALT"] = {hash = 0x8AAA0AD4},
		["DEL"] = {hash = 0x4AF4D473},
		["PGUP"] = {hash = 0x446258B6},
		["PGDN"] = {hash = 0x3C3DD371},
		["F1"] = {hash = 0xA8E3F467},
		["F4"] = {hash = 0x1F6D95E5},
		["F6"] = {hash = 0x3C0A40F2},
		["1"] = {hash = 0xE6F612E4},
		["2"] = {hash = 0x1CE6D9EB},
		["3"] = {hash = 0x4F49CC4C},
		["4"] = {hash = 0x8F9F9E58},
		["5"] = {hash = 0xAB62E997},
		["6"] = {hash = 0xA1FDE2A6},
		["7"] = {hash = 0xB03A913B},
		["8"] = {hash = 0x42385422},
		["DOWN"] = {hash = 0x05CA7C52},
		["UP"] = {hash = 0x6319DB71},
		["LEFT"] = {hash = 0xA65EBAB4},
		["RIGHT"] = {hash = 0xDEB34313},
	},
	
	keybinds = {}
}

--- @param table table to get length of
local function tableLength(t)
	local retval = 0
	
	for k,v in pairs(t) do
		retval = retval + 1
	end

	return retval
end

--- @return threadId current id of the thread script is using
function KeyMapper:Thread() 
	CreateThread(function() 
		local Promise = promise.new()
		
		CreateThread(function(threadId)
			Promise:resolve(threadId)
			
			while true do
				for k,v in pairs(self.keybinds) do
					if IsControlJustPressed(0, v.hash) or IsDisabledControlJustPressed(0, v.hash) then
						for commandString, commandData in pairs(v.commandsList) do
							if commandData.modifier and (IsControlPressed(0, commandData.modifier.hash) or IsDisabledControlPressed(0, commandData.modifier.hash)) then
								ExecuteCommand(("+%s"):format(commandString))
							elseif not commandData.modifier then
								ExecuteCommand(("+%s"):format(commandString))
							end
						end
					elseif IsControlJustReleased(0, v.hash) or IsDisabledControlJustReleased(0, v.hash) then
						for commandString, commandData in pairs(v.commandsList) do
							if commandData.modifier and (IsControlPressed(0, commandData.modifier.hash) or IsDisabledControlPressed(0, commandData.modifier.hash)) then
								ExecuteCommand(("-%s"):format(commandString))
							elseif not commandData.modifier then
								ExecuteCommand(("-%s"):format(commandString))
							end
						end
					end
				end

				-- I didnt had the option the have a slower thread has if you're using the script its most likely going to use keybinds.
				Wait(0)
			end
		end)

		return Await(Promise)
	end)
end

--- @param commandString string command string 
--- @param description string description of the keybind (if we ever make a ui for those keybinds to allow in game modification we would show this description)
--- @param inputType string keybord or mouse (Currently not supported i only added it for further implementation by cfx of the key mapper so it would be easier to migrate to it)
--- @param inputKey string Key input
--- @return boolean if the keybind has been succesfully registered
function KeyMapper.RegisterKeyMapping(commandString, description, inputType, inputKey, modifier)
	self = self or KeyMapper
	
	if commandString:sub(1,1) == "+" or commandString:sub(1,1) == "-" then
		commandString = commandString:sub(2, commandString:len())
	end

	if not inputKey then
		return false, print("Missing input key for key mapper")
	end

	inputKey = inputKey:upper()

	if not self.keys[inputKey] then
		return false, print(("Registering keymapping for command ' %s ' on key ' %s ' failed: the key is missing in the key table"):format(commandString, inputKey))
	end

	
	if modifier then
		modifier = modifier:upper()

		if not self.keys[modifier] then
			return false, print(("Registering keymapping for command ' %s ' on key ' %s ' failed: the key is missing in the key table"):format(commandString, modifier))
		end
	end
	
	if not self.keybinds[inputKey] then
		self.keybinds[inputKey] = {hash = self.keys[inputKey].hash, commandsList = {}}
	end
	
	self.keybinds[inputKey].commandsList[commandString] = {description = description, inputType = inputType, inputKey = inputKey}

	self.keybinds[inputKey].commandsList[commandString].modifier = modifier and {hash = self.keys[modifier].hash, key = modifier} or nil
end
exports("RegisterKeyMapping", KeyMapper.RegisterKeyMapping)

--- @param commandString string command string 
--- @param inputKey string Key input
--- @return boolean if the keybind has been succesfully removed
function KeyMapper.RemoveKeyMapping(commandString, inputKey)
	self = self or KeyMapper

	if inputKey then
		inputKey = inputKey:upper()
		
		if not self.keybinds[inputKey] then
			return false
		end

		self.keybinds[inputKey].commandsList[commandString] = nil

		if tableLength(self.keybinds[inputKey].commandsList) == 0 then
			self.keybinds[inputKey] = nil
		end

		return true
	end

	for inputKey,v in pairs(self.keybinds) do
		for command in pairs(v.commandsList) do
			if command == commandString then
				self.keybinds[inputKey].commandsList[command] = nil 

				if tableLength(self.keybinds[inputKey].commandsList) == 0 then
					self.keybinds[inputKey] = nil
				end

				return true
			end
		end
	end

	return false
end
exports("RemoveKeyMapping", KeyMapper.RemoveKeyMapping)

KeyMapper.threadId = KeyMapper:Thread()

-- Example:
-- RegisterCommand("test_keymapper", function(s,a,r)
-- 	if a[1] then
-- 		KeyMapper:RemoveKeyMapping("kek", "G")
-- 	else
-- 		KeyMapper:RegisterKeyMapping("kek", "stupid kek", "keyboard", "G", "SHIFT")
-- 		KeyMapper:RegisterKeyMapping("idk", "stupid idk", "keyboard", "F")

-- 		RegisterCommand("+idk", function()
-- 			print("+idk")
-- 		end)
	
-- 		RegisterCommand("-idk", function()
-- 			print("-idk")
-- 		end)

-- 		RegisterCommand("+kek", function()
-- 			print("+kek")
-- 		end)
	
-- 		RegisterCommand("-kek", function()
-- 			print("-kek")
-- 		end)
-- 	end
-- end)