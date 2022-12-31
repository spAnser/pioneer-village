local class = {
    -- Bushes
    [joaat('RDR2_TREE_RATA01')] = {isBush = true},
    [joaat('RDR2_TREE_RATA02')] = {isBush = true},
    [joaat('RDR2_TREE_RIVERBIRCH')] = {isBush = true},
    [joaat('RDR2_TREE_SYCAMORE')] = {isBush = true},
    [joaat('RDR2_TREE_UTAHJUNIPER')] = {isBush = true},

    -- Horses
    [joaat('A_C_HORSE_AMERICANPAINT_GREYOVERO')] = {isHorse = true},
    [joaat('A_C_HORSE_AMERICANPAINT_OVERO')] = {isHorse = true},
    [joaat('A_C_HORSE_AMERICANPAINT_SPLASHEDWHITE')] = {isHorse = true},
    [joaat('A_C_HORSE_AMERICANPAINT_TOBIANO')] = {isHorse = true},
    [joaat('A_C_HORSE_AMERICANSTANDARDBRED_BLACK')] = {isHorse = true},

    -- Chairs
    [joaat('P_TOILETCHAIR01X')] = {isChair = true},
    [joaat('P_CHAIR12X')] = {isChair = true},

    -- Pianos
    [joaat('P_PIANO02X')] = {isPiano = true},
    [joaat('P_PIANO03X')] = {isPiano = true},
    [joaat('P_NBMPIANO01X')] = {isPiano = true},
    [joaat('P_NBXPIANO01X')] = {isPiano = true},
    [joaat('SHA_MAN_PIANO01')] = {isPiano = true},

    -- Wagons
    [joaat('COACH2')] = {isWagon = true},
    [joaat('COACH3')] = {isWagon = true},
}

CreateThread(function()
    for k,v in pairs(class) do
        Target.class[k] = v
    end
end)
