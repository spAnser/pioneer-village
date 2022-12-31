InvokeNative = Citizen.InvokeNative

local promptActive = false
local prompts = {}
local shownPrompts = {}

AddEventHandler('lua::prompts::prompt', function(name, data)
    --print('lua::prompts::prompt | ' .. name)
    prompts[name] = data
end)

AddEventHandler('lua::prompts::show', function(name)
    --print('lua::prompts::show | ' .. name)
    shownPrompts[name] = true
    promptActive = true
end)

AddEventHandler('lua::prompts::hide', function(name)
    --print('lua::prompts::hide | ' .. name)
    shownPrompts[name] = false

    local newPromptsActive = false
    for name,active in pairs(shownPrompts) do
        if active then
            newPromptsActive = true
            break
        end
    end

    if newPromptsActive ~= promptActive then
        promptActive = newPromptsActive
    end
end)

function TemporarilyDisablePrompts()
    Citizen.CreateThread(function()
        for name,active in pairs(shownPrompts) do
            if active then
                local prompt = prompts[name]
                if prompt then
                    PromptSetEnabled(prompt.id, false)
                end
            end
        end

        Wait(1000)

        for name,active in pairs(shownPrompts) do
            if active then
                local prompt = prompts[name]
                if prompt and prompt.enabled then
                    PromptSetEnabled(prompt.id, prompt.enabled)
                end
            end
        end
    end)
end

Citizen.CreateThread(function()
    while true do
        Wait(0)
        if promptActive and not IsPedInMeleeCombat(PlayerPedId()) then
            PromptSetActiveGroupThisFrame(420)
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        Wait(100) -- Should be fine could be reduced if we get prompts not triggering.
        for name,prompt in pairs(prompts) do
            if
              (prompt.mode == 'standard' and PromptHasStandardModeCompleted(prompt.id, 0))
              or
              (prompt.mode == 'hold' and PromptHasHoldModeCompleted(prompt.id))
            then
              TemporarilyDisablePrompts()
              TriggerEvent('lua::' .. name .. '::completed')
            end
        end
    end
end)
