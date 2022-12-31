local blacklistedWords = {
	["acrotomophilia"] = true,
	["anal"] = true,
	["anilingus"] = true,
	["beastiality"] = true,
	["bestiality"] = true,
	["bimbos"] = true,
	["bitches"] = true,
	["black cock"] = true,
	["bukkake"] = true,
	["camgirl"] = true,
	["camslut"] = true,
	["camwhore"] = true,
	["date rape"] = true,
	["daterape"] = true,
	["incest"] = true,
	["motherfucker"] = true,
	["neonazi"] = true,
	["paedophile"] = true,
	["pedobear"] = true,
	["pedophile"] = true,
	["pegging"] = true,
	["rape"] = true,
	["raping"] = true,
	["rapist"] = true,
	["rimjob"] = true,
	["rimming"] = true,
	["suck"] = true,
	["sucks"] = true,
	["urethra play"] = true,
	["urophilia"] = true,
	["vagina"] = true,
	["vibrator"] = true,
	["white power"] = true,
	["zoophilia"] = true,
	["🖕"] = true,
    ["beeyotch"] = true,
    ["biatch"] = true,
    ["bitch"] = true,
    ["cuck"] = true,
    ["cunt"] = true,
    ["dick"] = true,
    ["douchebag"] = true,
    ["dumb"] = true,
    ["fag"] = true,
    ["faggot"] = true,
    ["negress"] = true,
    ["negro"] = true,
    ["nigga"] = true,
    ["nigger"] = true,
    ["nigguh"] = true,
    ["prostitute"] = true,
    ["pussie"] = true,
    ["pussy"] = true,
    ["raghead"] = true,
    ["retard"] = true,
    ["sambo"] = true,
    ["shemale"] = true,
    ["skank"] = true,
    ["slut"] = true,
    ["soyboy"] = true,
    ["trannie"] = true,
    ["tranny"] = true,
    ["twat"] = true,
    ["whore"] = true,
    ["wigger"] = true
}

--- @param text string text to be filtered
--- @return string text filtered
local function filterText(text)
	local lower = text:lower()

	if blacklistedWords[lower] then
		return "****"
	end

	for word,bool in pairs(blacklistedWords) do
		if lower:find(word) then
			return "****"
		end
	end

	return text
end

---@param textTable table table containing text args
---@return string full sentence
local function parseText(textTable)
	local retval = ""

	for k,v in pairs(textTable) do
		retval = ("%s %s"):format(retval, filterText(v))
	end

	return retval
end

--- @param s any player source
--- @param a table args
--- @param r string raw command
--- @return void
local function meText(s,a,r)
	local ped = GetPlayerPed(s)
	local me_txt = parseText(a)

	Entity(ped).state.me_txt = me_txt
end

RegisterCommand("me", meText)
RegisterCommand("ME", meText)
RegisterCommand("Me", meText)
RegisterCommand("mE", meText)