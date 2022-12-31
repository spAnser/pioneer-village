local isLoaded = false

Citizen.CreateThread(function()
    while not isLoaded do
        Citizen.Wait(1)
        local interior = GetInteriorAtCoords(-308.88, 777.37, 118.77)
        local isValid = IsValidInterior(interior)
        if isValid then
            if IsInteriorEntitySetActive(interior, "val_bank_front_windows") then
                print("Valentine Bank Interior Already Active")
            else
                ActivateInteriorEntitySet(interior, "val_bank_int_curtainsopen")
                -- ActivateInteriorEntitySet(interior, "val_bank_mud5_windowblock")
                ActivateInteriorEntitySet(interior, "val_bank_front_windows")
                print("Valentine Bank Interior Activated")
            end
        end

        local interior = GetInteriorAtCoords(-310.0119, 802.9316, 117.9846)
        local isValid = IsValidInterior(interior)
        if isValid then
            if IsInteriorEntitySetActive(interior, "front_windows") then
                print("Valentine Saloon Interior Already Active")
            else
                ActivateInteriorEntitySet(interior, "front_windows")
                ActivateInteriorEntitySet(interior, "val_saloon_br03_bed")
                ActivateInteriorEntitySet(interior, "6_chair_poker_set")
                print("Valentine Saloon Interior Activated")
            end
        end

        local interior = GetInteriorAtCoords(-273.4513, 811.3408, 118.38)
        local isValid = IsValidInterior(interior)
        if isValid then
            if IsInteriorEntitySetActive(interior, "val_jail_int_walla") then
                print("Valentine Jail Interior Already Active")
            else
                ActivateInteriorEntitySet(interior, "val_jail_int_walla")
                ActivateInteriorEntitySet(interior, "val_jail_int_wallb")
                print("Valentine Jail Interior Activated")
            end
        end

        local interior = GetInteriorAtCoords(323.0087, 801.0296, 116.8817)
        local isValid = IsValidInterior(interior)
        if isValid then
            if IsInteriorEntitySetActive(interior, "val_genstore_night_light") then
                print("Valentine General Store Nightlight Activated")
            else
                ActivateInteriorEntitySet(interior, "val_genstore_night_light")
                print("Valentine General Store Nightlight Activated")
            end
        end

        local interior = GetInteriorAtCoords(3285.792, -1325.603, 43.08399)
        local isValid = IsValidInterior(interior)
        if isValid then
            if IsInteriorEntitySetActive(interior, "korrigan_props_poker") then
                print("Riverboat Interior Already Active")
            else
                ActivateInteriorEntitySet(interior, "korrigan_props_poker")
                --ActivateInteriorEntitySet(interior, "korrigan_props_default")
                print("Riverboat Interior Activated")
            end
        end

        local interior = GetInteriorAtCoords(-1643.893, -1358.232, 86.4541)
        local isValid = IsValidInterior(interior)
        if isValid then
            if IsInteriorEntitySetActive(interior, "bee_01_house_fireplace_on") then
                print("Beechers Interior Already Active")
            else
                ActivateInteriorEntitySet(interior, "bee_01_masterBR_bed01")
                ActivateInteriorEntitySet(interior, "Beechers_decorated_after_Abigail3")
                ActivateInteriorEntitySet(interior, "IntGrp_livingrm_furniture_basic")
                ActivateInteriorEntitySet(interior, "bee_01_house_fireplace_on")
                print("Beechers Interior Activated")
            end
        end

        local interior = GetInteriorAtCoords(2385.548, -1221.158, 46.1729)
        local isValid = IsValidInterior(interior)
        if isValid then
            if not IsInteriorEntitySetActive(interior, "bronte_shutters_open") then
                ActivateInteriorEntitySet(interior, "bronte_shutters_open")
                ActivateInteriorEntitySet(interior, "bronte_glass_unbreakable")
            end
        end

        local interior = GetInteriorAtCoords(1006.364, -1766.812, 46.5922)
        local isValid = IsValidInterior(interior)
        if isValid then
            if not IsInteriorEntitySetActive(interior, "bra_mansion_WindowsStatic") then
                ActivateInteriorEntitySet(interior, "bra_mansion_WindowsStatic")
                ActivateInteriorEntitySet(interior, "bra_int_bedroom_clean")
            end
        end

        local interior = GetInteriorAtCoords(2643.708984375,-1293.3395996094,51.24600982666)
        local isValid = IsValidInterior(interior)
        if isValid then
        if IsInteriorEntitySetActive(interior, "new_com_bank_int_des") then
            print("St Denis Bank Interior Already Active")
        else
                ActivateInteriorEntitySet(interior, "new_com_bank_int_des")
                print("St Denis Bank Interior Activated")
            end
        end

        local interior = GetInteriorAtCoords(1288.9132080078,-1303.3087158203,77.699859619141)
        local isValid = IsValidInterior(interior)
        if isValid then
        if IsInteriorEntitySetActive(interior, "rhobank_int_wallb") then
            print("Rhodes Vault Interior Already Active")
        else
                ActivateInteriorEntitySet(interior, "rhobank_int_wallb")
                ActivateInteriorEntitySet(interior, "rhobank_int_walla")
                print("Rhodes Bank Vault Interior Activated")
            end
        end

        --[[local interiorId = 29442
        if IsInteriorReady(interiorId) then
        if not IsInteriorEntitySetActive(interiorId, "rhobank_int_walla") then
        ActivateInteriorEntitySet(interiorId, "rhobank_int_walla")
    end
end]]

        -- Moonshine interiors

        local moonshine_interior_id = {
            ['77313'] = {
                ['imaps'] = {
                    `mp006_area03_supp`,
                    `mp006_a3supp_moonshine01`,
                    `mp006_a3supp_moonshine01_plug`
                },
                ['interiors'] = {
                    "mp006_mshine_band2",
                    "mp006_mshine_bar_benchAndFrame",
                    "mp006_mshine_dressing_1",
                    "mp006_mshine_hidden_door_open",
                    "mp006_mshine_location1",
                    "mp006_mshine_pic_02",
                    "mp006_mshine_shelfwall1",
                    "mp006_mshine_shelfwall2",
                    "mp006_mshine_Still_01",
                    "mp006_mshine_still_hatch",
                    "mp006_mshine_theme_christmas",
                },
            }, --{x=1789.1730957031,y=-817.29760742188,z=191.59609985352,typeHashId=855142338,typeHashName="mp006_moonshine01_int",rpf="mp006_moonshine01_int.rpf"}

            ['77569'] = {
                ['imaps'] = {
                    `mp006_area02_supp`,
                    `mp006_a2supp_moonshine02`,
                    `mp006_a2supp_moonshine02_plug`
                },
                ['interiors'] = {
                    "mp006_mshine_band2",
                    "mp006_mshine_bar_benchAndFrame",
                    "mp006_mshine_dressing_2",
                    "mp006_mshine_hidden_door_open",
                    "mp006_mshine_location2",
                    "mp006_mshine_pic_02",
                    "mp006_mshine_shelfwall1",
                    "mp006_mshine_shelfwall2",
                    "mp006_mshine_Still_02",
                    "mp006_mshine_still_hatch",
                    "mp006_mshine_theme_goth",
                },
            },--{x=-1090.7846679688,y=711.73596191406,z=83.230895996094,typeHashId=855142338,typeHashName="mp006_moonshine01_int",rpf="mp006_moonshine01_int.rpf"}

            ['77825'] = {
                ['imaps'] = {
                    `mp006_area04_supp`,
                    `mp006_a4supp_moonshine05`,
                    `mp006_a4supp_moonshine05_plug`
                },
                ['interiors'] = {
                    "mp006_mshine_band2",
                    "mp006_mshine_bar_benchAndFrame",
                    "mp006_mshine_dressing_3",
                    "mp006_mshine_hidden_door_open",
                    "mp006_mshine_location3",
                    "mp006_mshine_pic_03",
                    "mp006_mshine_shelfwall1",
                    "mp006_mshine_shelfwall2",
                    "mp006_mshine_Still_03",
                    "mp006_mshine_still_hatch",
                    "mp006_mshine_theme_refined",
                },
            },--{x=-1864.5423583984,y=-1727.5068359375,z=88.252014160156,typeHashId=855142338,typeHashName="mp006_moonshine01_int",rpf="mp006_moonshine01_int.rpf"},

            ['78337'] = {
                ['imaps'] = {
                    `mp006_area04_supp`,
                    `mp006_a4supp_moonshine03`,
                    `mp006_a4supp_moonshine03_plug`
                },
                ['interiors'] = {
                    "mp006_mshine_band2",
                    "mp006_mshine_bar_benchAndFrame",
                    "mp006_mshine_dressing_4",
                    "mp006_mshine_hidden_door_open",
                    "mp006_mshine_location4",
                    "mp006_mshine_pic_04",
                    "mp006_mshine_shelfwall1",
                    "mp006_mshine_shelfwall2",
                    "mp006_mshine_Still_02",
                    "mp006_mshine_still_hatch",
                    "mp006_mshine_theme_hunter",
                },
            }, -- {x=-2774.65625,y=-3046.2746582031,z=-9.70361328125,typeHashId=855142338,typeHashName="mp006_moonshine01_int",rpf="mp006_moonshine01_int.rpf"},

            ['78593'] = {
                ['imaps'] = {
                    `mp006_area01_supp`,
                    `mp006_a1supp_moonshine04`,
                    `mp006_a1supp_moonshine04_plug`
                },
                ['interiors'] = {
                    "mp006_mshine_band2",
                    "mp006_mshine_bar_benchAndFrame",
                    "mp006_mshine_dressing_5",
                    "mp006_mshine_hidden_door_open",
                    "mp006_mshine_location5",
                    "mp006_mshine_pic_05",
                    "mp006_mshine_shelfwall1",
                    "mp006_mshine_shelfwall2",
                    "mp006_mshine_Still_02",
                    "mp006_mshine_still_hatch",
                    "mp006_mshine_theme_floral",
                },
            },--{x=1629.7342529297,y=828.16253662109,z=123.93880462646,typeHashId=855142338,typeHashName="mp006_moonshine01_int",rpf="mp006_moonshine01_int.rpf"},
            --['79105'] = { `mp007_area01_supp`, `mp007_a1_str_whore_int_milo`}, -- {x=-1864.5424804688,y=-1727.5080566406,z=88.252014160156,typeHashId=-1406656258,typeHashName="mp007_moonshine01_int",rpf=""},
        }

        -- request imap for moonshine interior:
        for moonshineInteriorId,v in pairs(moonshine_interior_id) do
            for _,imap in pairs(v['imaps']) do
                if not IsImapActive(imap) then
                    RequestImap(imap)
                end
            end

            -- activate some interior entity sets.
            for _,interiorSet in pairs(v['interiors']) do
              if not IsInteriorEntitySetActive(tonumber(moonshineInteriorId),interiorSet) then
                ActivateInteriorEntitySet(tonumber(moonshineInteriorId),interiorSet)
              end
            end
        end


        isLoaded = true

    end
end)


--------- ### Problem IPLs ###
-- RequestImap(174727090)  -- Unknown, possibly causing CTDs
--

RequestImap(183712523) -- CharacterCreator
RequestImap(`MP001_MP_LOBBY_CHARMILO_EXT`) -- CharacterCreator mp001_mp_lobby_charmilo_ext
RequestImap(1679934574) -- CharacterCreator
-- -559.93 -3776.59 238.6 266.08

--------------------------------                                   ############# -- Valentine Investigate -- ###############                                       ----------------------

RequestImap(-661560211) -- Barrels Everywhere?
RequestImap(-1933617196) -- Structure in front of gunsmith?
-- RequestImap(1202020135)  -- Blank Banners across mainstreet
RequestImap(-892659042) -- Leatherworker on west side of encampment
RequestImap(-1588793465) -- Structure in front of motel?
RequestImap(1186533019) -- Chair in front of Law Offices
RequestImap(-156313117) -- Structure in front of Law Offices
RequestImap(56708243) -- Green Building and General Store Boarded up?
RequestImap(1136898294) -- Saloon Boarded Up??
RequestImap(30201771) -- Water Trough?
RequestImap(-1475403379) -- Fencing at farm
RequestImap(`val_03_lockdown`) -- Prison Break?
RequestImap(897455211) -- something regarding the saloon and store?
RequestImap(1285430299) -- Crates outside saloon and gen store?
RequestImap(1573766063) -- General Store - Fruit in front?
RequestImap(`val_03_props_lockdown_jail`) -- Something regarding the general store
RequestImap(666617953) -- Something relating to valentine saloon
RequestImap(-1892595931) -- Something relating to valentine restaurant
RequestImap(-784156210) -- Something relating to valentine bank
RequestImap(-1000738568) -- boxes between valentine general store and saloon
RequestImap(-991619789) -- wooden box outside valentine saloon below food board
RequestImap(-799526632) -- Valentine Saloon chimney smoke
RequestImap(1804593020) -- Barrels outside Valentine Sheriff Office
RequestImap(`val_03_default_jail`) -- something relating to Val Sheriff Office
RequestImap(-1049500949) -- Fixed Chair outside Valentine Doctor's Office
RequestImap(-1905652203) -- something outside valentine gunsmith
RequestImap(2470511) -- box and stool by pole to left of valentine gunsmith
RequestImap(`val_02_lockdown_gun`) -- something inside valentine gunsmith
--RequestImap(-1878882174) -- extra planks on fence in Valentine Auction Yard at -239.54, 672.14, 113.29
--RequestImap(724436573) -- open gates in valentine auction yard, near previous imap
RequestImap(-1744253204) -- something relating to green house in valentine
--RequestImap(-2009766528) -- Broken Chair outside Valentine Doctor's Office
RequestImap(-1781246069) -- something relating to green house in valentine
RequestImap(610256856) -- window next to front door of house behind valentine gunsmith
--RequestImap(-2083943324) --hay bales and boxes outside Keane's Saloon in valentine
RequestImap(-159723514) -- barrels near rock to the right of valentine stables
RequestImap(`mp004_supp_gfh_theboy_val_objects`) -- Barrels by wagon near valentine -382.04, 729.91, 115.92
RequestImap(`mp004_area2_PlaylistMarker_03`) -- Skull, Flags and random props at -384.06, 875.9, 115.51 near valentine
RequestImap(`mp001_trea2_hea_rd_sgn_PlaylistMarker_05`) -- Skull, Flags and random props at -434.07, 550.15, 103.8 near valentine
RequestImap(`mp007_valentine_bountyboard`) -- Noticeboard outside Valentine Sheriff Office
RequestImap(1519091923) -- pillars outside hotel
--RequestImap(1722569012)

----- Serial Killer
-- _GET_IMAP_POSITION_AND_HEADING
--crun IN(0x9C77964B0E07B633, 0x0465D244, Citizen.PointerValueVector(), Citizen.PointerValueFloat())
RemoveImap(73781828) -- Cellar doors closed -608.42, 520.42, 96.54
RemoveImap(-391567710) -- Cellar doors open -608.42, 520.42, 96.54
-----

--------------------------------                                   ############# -- Valentine Multiplayer (Online) Components -- ###############                                       ----------------------
-- RequestImap(731209239)  -- Fast Travel Marker Valentine Train Station
-- RequestImap(824748066)  -- Event Marker Western side of town along path ( -229.93, 946.05, 138.33 )

--------------------------------                                   ############# -- Valentine Necessities -- ###############                                       ----------------------
RemoveImap(774477221) -- Valentine Sheriff's Office Crumbled Wall parts...
RequestImap(1097534152) -- Valentine Sheriffs Office Outer wall
-- RequestImap(2095116685) -- supplies/boxes in mainstreet front of General Store, Saloon, Green building
RequestImap(192173299) -- Valentine -- Support Beams and signs -- Mainstreet Saloon
-- RequestImap(1081087978) -- Valentine -- Green Building and Restaurant mainstreet - Pre-paint, almost completed stage. (Help wanted sign) -- https://gyazo.com/b4d1f0b57d17c470e7db030f050db1c0     (Do Not Load Both(1/2))
RequestImap(903666582) -- Valentine -- Green Building and Restaurant mainstreet - Painted, completed stage.  Keane's Rooms for Rent -- https://gyazo.com/b8f9f77bb52aeb37aac6dd21463a2133         (Do Not Load Both(2/2))
-- RequestImap(282485265) -- Valentine Green building boarded up
RequestImap(637874199) -- Valentine -- Green Building Lamp
RequestImap(-1521525254)  --Green House Valentine -- Exterior Trees and Flowers 1(Run 1 and 2 together)
RequestImap(-761186147)  --Green House Valentine -- Exterior Trees and Flowers 2(Run 1 and 2 together)
-- RequestImap(2040843256) -- Valentine -- Construction supplies outside of Smithfields Saloon / Green Building -- https://gyazo.com/c5b67926f2c4304b74061ca62b345a1b
-- RequestImap(999248445) -- Valentine -- Yellow Wagon with Blue Barrels outside Smithfields Saloon  -- https://gyazo.com/467e15f5cd1de68bad5e2d414fa330d4
-- RequestImap(-713587740)  -- Valentine -- Construction Material in Roadway -- https://gyazo.com/665f85e9e2b00ec78c5fd6b2b0dd2332
-- RequestImap(-1217078386) -- Valentine -- Wagons blocking road through Valentine -- https://gyazo.com/c6758dd8f86601eaeefef2b6ef69f38c -- https://gyazo.com/83e1fb7bb26402e6d6329777e7a766a9
-- RequestImap(-1579403437) -- Valentine -- Wagon Parked in front of bank -- https://gyazo.com/5b08f55828e867f872552bb8881dc293
-- RequestImap(517553365) -- Valentine -- 2 Wagons, 1 in front of and behind of blue house across from Keane's Saloon.  -- https://gyazo.com/4444709e3cc069fddd8d4003d5f0caa3
-- RequestImap(805009584) -- Valentine -- Western Barricades -- https://gyazo.com/631b61e44cae28d4c7c4391d1d7830a7
-- RequestImap(-560409108) -- Valentine -- Eastern Barricades -- https://gyazo.com/45304e29a207805e373bcd921af6a668
-- RequestImap(-518785376) -- Valentine -- Southern Barricades -- https://gyazo.com/2fa60fa4d76205783907e2eec98253ec

--------------------------------                                   ############# -- Valentine Mainstreet Sheriffs Office -- ###############                                       ----------------------
-- RequestImap(-1301569116) -- Valentine -- Sheriffs Office boarded up
--------------------------------                                   ############# -- Valentine Mainstreet Law Offices     -- ###############                                       ----------------------
-- RequestImap(`VAL_02_LOCKDOWN_LAW`)   -- Valentine -- Law Office Boarded Up
RequestImap(924412185) -- Law offices (REMOVE FOR structural damage)
--------------------------------                                   ############# -- Valentine Mainstreet Hotel           -- ###############                                       ----------------------
-- RequestImap(`VAL_02_LOCKDOWN_HOTEL`)  -- Valentine -- Hotel Boarded Up
--------------------------------                                   ############# -- Valentine Mainstreet Bank            -- ###############                                       ----------------------
-- RequestImap(`VAL_02_LOCKDOWN_BANK`) -- Valentine -- Bank Boarded Up
--------------------------------                                   ############# -- Valentine Mainstreet Doctors Office  -- ###############                                       ----------------------
-- RequestImap(-981203673)  -- Valentine -- Doctors Office boarded up
--------------------------------                                   ############# -- Valentine Mainstreet Saloon          -- ###############                                       ----------------------
-- RequestImap(-776975047)  -- Valentine -- Main Street Saloon Front Doors locked
-- RequestImap(1385025009)  -- Valentine -- Closed sign on main street Saloon
-- RequestImap(199047531)   -- Valentine -- Mainstreet Saloon boarded windows
-- RequestImap(-1158072415) -- Valentine -- Main Street Saloon Sign in front
--------------------------------                                   ############# -- Valentine Mainstreet General Store   -- ###############                                       ----------------------
-- RequestImap(406334892) -- Valentine -- General Store Closed Sign on door --
-- RequestImap(1228600352) -- Valentine General Store boarded up
RequestImap(135886022) -- Valentine -- Sign in front of General Store
--------------------------------                                   ############# -- Valentine Cemetery                   -- ###############                                       ----------------------
RemoveImap(-391187090) -- Grass on grave Valentine cemetery
RemoveImap(-1902184438) -- dirt pile from grave dug Valentine cemetery
RemoveImap(1886602884)  -- pre-grave dug grass over
RemoveImap(740012805) -- dirt pile from grave dug Valentine cemetery
RemoveImap(1236921921) -- dirt pile from grave dug Valentine cemetery
RemoveImap(1963724330) -- pre-grave grass... if graves present, remove
RemoveImap(-1871745961) -- Coffin in left grave, Valentine
RemoveImap(2125514970) -- Coffin in center grave, Valentine
RemoveImap(267578156) -- Coffin in right grave, Valentine
RequestImap(-555917871) -- something relating to valentine cemetary
RequestImap(-1801047945) -- thomas downes gravestone in valentine cemetary
RequestImap(325677491) -- Grave in valentine -229.31, 826.96, 124.45
RequestImap(-689352221)
RequestImap(-451832572)
RequestImap(-1349539327)
RequestImap(-1640200357)
RequestImap(-2127665186)
RequestImap(1854980771)
RequestImap(1513363974)
RequestImap(-1280884206)
--------------------------------                                   ############# -- Valentine ---                  -- ###############                                       ----------------------

------------------------------------- Railroad Stuff
-- RequestImap(-794503195) -- Broken Bridge and Pieces Pieces  -- 520 1754 187
------------------------------------- Central Union Train Mission
RequestImap(2077623691) -- Track Bed - Full Legnth
RequestImap(-555736180) -- Crossing 1818
RequestImap(-693812694) --Section 1 1875
RequestImap(-1386614896) --Section 2 Track at 2070
RequestImap(2080640229) --Section 3 2156
RequestImap(-805522215) --Section 4 2177
RequestImap(499044444) --Section 5
RequestImap(-196117122) --Section 6 2184
RequestImap(-1022518533) --Section 7 2201
RequestImap(691955519) --Section 8 with bridge 2203
RequestImap(-142900294) --Section 9 2229.82

------------------------------------- #### END OF RAILWAY STUFF ####

------------------------------------- Heartland Oil Station
RemoveImap(-84516711)  --Run Down Closed Station
RemoveImap(-657241692)  --Oil Pipe Damaged
RequestImap(-1112373128)  --Oil Tower
RemoveImap(1596089211) -- Oil Tower Under Construction
RequestImap(1597665303) -- station interior
RequestImap(`des_ntv3_rail_break`) -- something to do with a bridge at oil station 570.3, 596.73, 110.75
--RequestImap(-711890106) -- broken railing 570.3, 596.73, 110.75
RequestImap(-1031113966) -- fixed railing 570.3, 596.73, 110.75
RequestImap(116162819) -- fixed tower at heartlands oil factory
RequestImap(1274804496) -- walkway on top of oil tanks 482.75, 707.56, 121.62
RequestImap(918349577) -- building materials
RequestImap(-2133417899) -- house interior 456.97, 615.15, 112.52
--RequestImap(-891994084) -- house exterior 456.97, 615.15, 112.52
RequestImap(2133280389) -- army camp north of oil station
RequestImap(`mp005_watertower_addon`)
------------------------------------- #### Heartland Oil Station ####

------------------------------------- Hole Near Rhodes - Woman's Rights Mission Start
RequestImap(1277540472)  -- 1433 -1591 69
------------------------------------- #### END OF WOMAN'S RIGHTS ####

------------------------------------- #### BEECHERS ####
RequestImap(1532009326)
RequestImap(1970695826)
RequestImap(-1325016116)
RemoveImap(-2093605706)
RequestImap(-904669171)
RequestImap(480644817) -- beechers hope props
RequestImap(-584332967)
RequestImap(-392430949)
RequestImap(1353861354) -- Beechers - Barn interior, lanterns and doors
RemoveImap(611701601) -- Beechers Barn - Work supplies
RemoveImap(901412334) -- Beechers Barn - Work supplies
RemoveImap(703356498) -- Beechers Barn - Work supplies
RemoveImap(-650822431) -- Beechers Barn - Work supplies
RequestImap(`BEE_01_BAR_STAGE05`) -- Beechers Barn exterior and fencing
RemoveImap(`BEE_01_CHIMNEY_STAGE01`)
RemoveImap(`BEE_01_CHIMNEY_STAGE02`)
RemoveImap(-1615103170)
RequestImap(578474998) -- Beechers border fencing
RequestImap(-1860722801) -- Gazebo
RemoveImap(-692583342)
RemoveImap(-669282002)
RemoveImap(-1355464862)
RemoveImap(-1141450523)
RemoveImap(-252820785)
RemoveImap(258899919)
RemoveImap(-767883927)
RemoveImap(-535715562) -- Scaffolding // remove when completed
RequestImap(931647489) -- Beechers interior
RequestImap(1467774743) -- Beechers Interior
RemoveImap(`bee_01_house_minigame_fl`) -- Construction materials
RemoveImap(-790660125)
RemoveImap(33260939) -- Beechers construction supplies
RemoveImap(780653384) -- Beechers construction supplies
RemoveImap(180676027) -- Beechers construction supplies
RemoveImap(-270212770) -- Beechers construction supplies
RemoveImap(-211623797) -- Beechers construction supplies
RemoveImap(862349416) -- Beechers construction supplies
RemoveImap(699225334) -- Beechers construction supplies  -- Roof going on
RequestImap(411742897) -- Completed exterior
RequestImap(349494711) -- clothes line, wagon wheel,
RemoveImap(-706105482) -- crate on deck by window
RemoveImap(176369335) -- old windows from previous shack
RequestImap(2087181890)
RemoveImap(637627640)
RemoveImap(44077654) -- support beam - construction
RemoveImap(839872819) -- support beam - construction
RemoveImap(-1656895602) -- support beam - construction
RemoveImap(-583969090)
RemoveImap(-364121869)
RemoveImap(-1073832871)
RemoveImap(-1786558629)
RemoveImap(-1548753996)
RemoveImap(-1784133719)
RemoveImap(-1667461262)
RequestImap(1757739778)
RequestImap(-2029237844)
RequestImap(-2000794023)
RequestImap(-531137142)
RequestImap(5422464)
RemoveImap(203845253) -- Silo construction materials
RemoveImap(-1658679165) -- Silo construction base and materials
RemoveImap(258733332) -- Silo construction base and materials
RemoveImap(79028136) -- Silo construction base and materials
RequestImap(-218940381) -- Silo completed
RemoveImap(634752926) -- chairs and construction supplies
RemoveImap(984271748) -- chairs and construction supplies
RemoveImap(43335376)
RemoveImap(1444950942) -- green wagon side of house/clipping -- full of bricks
RemoveImap(910783469) -- green wagon side of house/clipping -- full of bricks
RemoveImap(727408145) -- green wagon front of house/clipping -- full of bricks
RemoveImap(429636242) -- pile of wood north side of house -- construction materials
RemoveImap(-19364596) -- pile of wood north side of house -- construction materials
RemoveImap(2131035495) -- green wagon side of house/clipping -- full of bricks
RequestImap(1236917971) -- Outhouse
RemoveImap(-316448350) -- construction materials
RemoveImap(-496874464) -- construction materials
RemoveImap(-794515291) -- construction materials
RemoveImap(275588949) -- construction materials
RemoveImap(-52330434) -- construction materials
RemoveImap(-2131457946)  -- construction materials
RemoveImap(`bee_building_roomwalls_01`) -- interior framing -- construction
RemoveImap(`bee_building_roomwalls_02`) -- interior framing -- construction
RemoveImap(`bee_building_roomwalls_03`) -- framing, remove when exterior is up.
RemoveImap(-1012618146) -- old structure
RemoveImap(2111816145) -- old structure rubble
RemoveImap(-722030448) -- old structure
RemoveImap(-974480336) -- canvas gazebos
RemoveImap(`bee_01_camp`) -- canvas gazebo north, wagon, and supplies
RequestImap(-918785150) -- firepit seating
RemoveImap(1256771838) -- wagon wreckage in cropfield
RemoveImap(1205945639) -- lumber pile main driveway in
RemoveImap(1532774697) -- lumber pile main driveway in
RemoveImap(-114633341) -- saw horse main driveway in
RemoveImap(-90646166) -- floating saddle, hat, and rope in corral
RemoveImap(`bee_woodpile_01`) --pile of old lumber
RemoveImap(-803019223) -- fire behind house
RemoveImap(449426161) -- lantern
RemoveImap(-999913940) -- lantern
RemoveImap(-30541382) -- lantern
RemoveImap(-960328988)  -- lantern


-- GRASS and GROUND
-- RequestImap(-1496619689) -- Green Ground 670 -1236 44
RequestImap(-61896664) -- Worn Brown Ground 670 -1236 44
RequestImap(-648893593) -- Version 1 of Grass and Ferns
RequestImap(1534006738) -- Version 2 of Grass and Ferns
RequestImap(-376056363) -- Version 3 of Grass and Ferns
RequestImap(519091847)  -- Version 4 of Grass and Ferns
RequestImap(-1225606266) -- Adds bush to 692 -1263 44
RequestImap(-1874720370) -- Lots of ferns, weeds and tall grass
RequestImap(-1936937394) -- Grass, Flowers and weeds]]


-- German Guys Wagon
-- RequestImap(-1123811713) -- Wagon v1  657 -1231 44
-- RequestImap(1679038623) -- Wagon v2  657 -1231 44
-- RequestImap(-546137515) -- Wagon v3 657 -1231 44  3 Boxes in Back Canopy
-- RequestImap(-462274808) -- Small Box in wgaon
-- RequestImap(-1284301817) -- Antlers on German Wagon
-- RequestImap(1169958167) -- Red Table Cloth German Wagon

--Arthurs Wagon
-- RequestImap(2072112547) --  Wagon v1 with Canopy
-- RequestImap(-2016771661) -- Wagon v2
-- RequestImap(202127432) --  Wagon v3 with Shevles Tools
-- RequestImap(1601820048) -- Hide Rug
-- RequestImap(2025485344) -- Table Top
-- RequestImap(901520480) -- Table
-- RequestImap(-1999465365) -- Right Skull  Wagon
-- RequestImap(853723410) -- Left Alligator Skull  Wagon
-- RequestImap(-1774140220) --  Chest v1
-- RequestImap(-262271608) --  Chest v2 Striped Shirt
-- RequestImap(102652153) --  Shaving Kit
-- RequestImap(-1434077648) -- Small Containers
-- RequestImap(-1728638189) -- Bigger boxes v1
-- RequestImap(93121605) -- Bigger Boxes v2
-- RequestImap(-205043526) -- Bigger Boxes v3
-- RequestImap(1027586707) -- Bigger Boxes v4
-- RequestImap(-1570232590) -- Open Flipped Small Box
-- RequestImap(648514907) -- Open Box Flipped
-- RequestImap(1351016737) -- Little Box inside Flipped Box
-- RequestImap(721720861) --  Small Box on Ground
-- RequestImap(1620317782) -- v1 Mixture of Boxes
-- RequestImap(1952267752) -- v2 Mixture of Boxes
-- RequestImap(-1739164071) -- Book on Small Table
-- RequestImap(-1331617405) --  Book
-- RequestImap(-959814975) -- Box by Book v1
-- RequestImap(-1676997321) -- Box by book v2
-- RequestImap(1096093290) -- Quiver on Ground
-- RequestImap(626928579) -- Picktures on Ground
-- RequestImap(313722477) -- Tools no wagon
-- RequestImap(976082270) -- Tools, painting, guns
-- RequestImap(153759048) -- Chair
-- RequestImap(-1147256587) -- Map
-- RequestImap(1676971154) -- Photo

-- Pearsons Wagon
-- RequestImap(764763647) -- Provisions Wagon v1
-- RequestImap(1742990618) Provisions Wagon v2
-- RequestImap(-751959361) -- Provisons Wagon v3
-- RequestImap(-1279618207) -- Provisions Wagon v4 Empty
-- RequestImap(-492479795) -- Skull Provisions Wagon
-- RequestImap(-320577790) -- Barrel with Lantern
-- RequestImap(1246210400) -- Provision Boxes Large
-- RequestImap(-172246728)  --Table - Cutting Board - Barrel of Salt v1
-- RequestImap(-850189983)  --Table - Cutting Board - Barrel of Salt v2
-- RequestImap(126970802) -- Two Boxes Provisions
-- RequestImap(715730031) -- Pans and Blue Table Cloth for Table v1
-- RequestImap(349896400) -- Pans and Table Cloth for Table v2
-- RequestImap(110400393) -- Provisions, keg, rope for Table v1 (will work with v2 as well but clips)
-- RequestImap(482931525) -- Provisions, Fruits, Milk, red cloth
-- RequestImap(-1291679096) -- Potato Bags for Wagon v3
-- RequestImap(-387018143) -- Two Barrels
-- RequestImap(5585502) -- Red Cloth v2 watermelons, pumpkins flour
-- RequestImap(1309652195) -- Water and Dishes
-- RequestImap(-112364237) --Ammo Tools
-- RequestImap(-1983416665) -- Spilled Flour
-- RequestImap(438624963) -- Supplies
-- RequestImap(82769080) -- Plate and Spilled Flour
-- RequestImap(1125807846) -- Bag of Flour
-- RequestImap(-1894946791) -- Plate
-- RequestImap(-1362716862) -- red cloth v3 provisions
-- RequestImap(-624219879) -- Pans open can ammo for v1 table
-- RequestImap(977061573) -- Pans open can ammo for v2 table
-- RequestImap(1729014506) -- Provisions for table v1
-- RequestImap(-916538063) -- Provisions for table v2
-- RequestImap(1886481528) -- Spilled flour
-- RequestImap(-1507376753) -- Bag of Flour
-- RequestImap(-1370620659) -- Pans for table v1
-- RequestImap(1074130180) -- Pans for table v2
-- RequestImap(652735549) -- Provisions for table v1

-- Javiers Tent
-- RequestImap(-347518940) -- Skull near Banjo
-- RequestImap(-1887167048) -- Banjo
-- RequestImap(530288130) -- Cushion Top near log
-- RequestImap(1538837441) -- Fur seat for Log near Banjo
-- RequestImap(-1999825729) -- Brown Cow Hide near Banjo

-- Hosea
-- RequestImap(2728487) -- Tent v1 Supplies 660 -1256 43
-- RequestImap(1674800958) -- Tent v2 Empty 660 -1256 43
-- RequestImap(-782359587) -- Tent v3 Patches
-- RequestImap(510052409) -- Tent v4 Opened at front only
-- RequestImap(291770965) -- Tent v5 closed
-- RequestImap(-2143243848) -- Tent v6 Open on front
-- RequestImap(1209017192) -- Tent v7 open front
-- RequestImap(-644575724) -- Tevt v8 closed
-- RequestImap(1700661865) -- Tent v9 Closed
-- RequestImap(-2001921071) -- Square Rug near round table top
-- RequestImap(1210820782) -- Barrel with Latntern

-- Bills Sleeping Area
-- RequestImap(-1292493167) -- Rope and Boxes near Dream Catcher
-- RequestImap(-1451784475) -- v1 Canopy inbetween bucket and blue chairs
-- RequestImap(1028224932) -- v2 Canopy inbetween bucket and blue chairs
-- RequestImap(1128417383) -- v3 Canopy with Candle
-- RequestImap(292845400) -- Skull and bucket Near Rope and Boxes
-- RequestImap(1609975546) -- Crates and Gun Table
-- RequestImap(-948006506) -- Blue Towel Dynamite
-- RequestImap(`cp_companion_coachrob01`) -- Dynamite
-- RequestImap(-1045678888) -- Small Tables
-- RequestImap(-1663177928) --Lure Kit

-- Back Wagons
-- RequestImap(1084869405) -- Two Wagons v1 Supplies 674 -1267 43
-- RequestImap(1636281938) -- Two Wagons v2 Empty 674 -1267 43
-- RequestImap(-1642249622) -- Two wagons v3 empty Canopy

-- Dutchs tent
-- RequestImap(-109425099) -- Tent v1 Empty Open Both ends
-- RequestImap(539843907) -- Tent v2 Empty Right Side Opened
-- RequestImap(180356041) -- Tent v3 Opened Both Ends
-- RequestImap(-71508135) -- Tent v4 Flaps Closed
-- RequestImap(40009123) -- Tent v5 Flaps Closed
-- RequestImap(1070723367) -- Tent v6 Flaps Closed
-- RequestImap(-146943962) -- Tent v7 Open both ends
-- RequestImap(1261237250) -- Tent v8 open front
-- RequestImap(-692521236) -- Tent v9 open on back
-- RequestImap(1049842342) -- Inside Tent Bear Rug Stove Books Barrels and Canopy
-- RequestImap(1034009086) -- Inside  Tent Boxes, Stove Lanturn, Canopy
-- RequestImap(-160392273) --  Tent Inside Music Box Canopy
-- RequestImap(2119205605) -- Cash Box behind Dutchs Tent 1
-- RequestImap(-619637948) -- Cash box behind Dutchs tent 2
-- RequestImap(-1639921686) -- Tent Flap

-- Base
-- RequestImap(`dewclm_p_camp_02`) -- Camp Extras (MUST LOAD FOR NORMAL SETUP)
-- RequestImap(2108368013) -- Tent frames for Dutch, Hosea and Arthurs Bed (Must Load for Normal Setup)
-- RequestImap(1402472902) -- Setting Up Camp v1
-- RequestImap(-1458944281) -- Setting Up Camp v2
-- RequestImap(1691578074) -- Log Fire Pit Trash Broken Barrels
-- RequestImap(810684093) -- Blue Trash Barrels on Beach
-- RequestImap(321594819) -- Broken Table on Beach
-- RequestImap(-385999832) -- Blue Trash Barrels on Beach
-- RequestImap(-1656481590) -- Target Shooting on Beach (Missing what hanging targets are tied to)
-- RequestImap(1706275010) -- Round Table
-- RequestImap(-792944828) -- Round Table Top
-- RequestImap(-1836870707) -- Round Table Seats no light
-- RequestImap(`dewclm_normal_seats`) -- Seats and light for round table
-- RequestImap(-1880340209) -- Camp Fire, 3 stools, 2 sleeping bags beside Arthurs site
-- RequestImap(-2000080725) -- Chicken Coop
-- RequestImap(719147410) -- Blue Chair and Stool for gaming table
-- RequestImap(-989202374) -- Antlers on Big Center Tree
-- RequestImap(-1010466481) -- Supplies in Lean Tos
-- RequestImap(-1247551347) -- Broken Chest
-- RequestImap(1717489303) -- Three Lean Tos
-- RequestImap(1692451176) -- Lantern Game Table on a Post
-- RequestImap(220566669) --Lantern Game Table
-- RequestImap(-1045282549) -- White Animal Skin Rugs near sitting rock
-- RequestImap(2123887232) -- Fire pit near white skins
-- RequestImap(-809371454) -- Small barrel and table to Banjo
-- RequestImap(-436009554) -- Piece of Paper near Banjo
-- RequestImap(`cp_companion_coachrob02`) -- Map near Paper
-- RequestImap(157361403) -- Large Dream Catcher
-- RequestImap(-814821283) -- Fishing Stuff
-- RequestImap(716331350)
-- RequestImap(2035942164)
-- RequestImap(1764814553)
-- RequestImap(1734859244)
--RequestImap(1403324282)
--RequestImap(-1841279810)
--RequestImap(-2066612507)
--RequestImap(1662136507)
--RequestImap(1386355334)
--RequestImap(-1397680620)
--RequestImap(1467687992)
--RequestImap(2017271733)
--RequestImap(-2111123884)
--RequestImap(2047806036)
--RequestImap(499090815)
--RequestImap(1251925821)
--RequestImap(-1821269135)
--RequestImap(1769061820)
--RequestImap(-1466334531)
--RequestImap(1461000451)
--RequestImap(-780636043)
--RequestImap(-685270742)
--RequestImap(-1341918262)
--RequestImap(-1906732332)
--RequestImap(-526829)
--RequestImap(-1754422016)
--RequestImap(688413808)
--RequestImap(794749213)
--RequestImap(17042536)
--RequestImap(298954243)
--RequestImap(1003223945)
--RequestImap(220012076)
--RequestImap(1465430690)
------------------------------------- #### END OF RHODES STORY CAMP ####

------------------------------------- Rhodes Camp
-- RequestImap(-159557995) -- Two Tents, Wagon, Chairs
------------------------------------- #### END OF RHODES CAMP ####

------------------------------------- Boat and Supplies Near Rhodes Camp
-- RequestImap(1733394134) -- Boat and Supplies 807 -1235 41
------------------------------------- #### END OF RHODES BOAT ####

------------------------------------- Rhodes Camp
-- RequestImap(`gang_lemoyne_scm011`) -- Small Camp in the Woods Just North of Dutch's Rhodes Base
------------------------------------- #### END OF RHODES CAMP ####

------------------------------------- Rhodes Cemetery
RequestImap(-1366431554) -- Covers Large hole with grass patch
RequestImap(-2144587490) -- Covers small plot hole with mound of dirt
-- RequestImap(-158824350) -- Dirt in Small Plot (visually can't see it)
-- RequestImap(146746575)
-- RequestImap(-960136064)
------------------------------------- #### END OF RHODES CEMETERY ####

------------------------------------- Braithwaite Mansion
--Mansion Interior
RequestImap(1149195254)  --Brathwaite House Shell
-- RequestImap(-1643869063) -- House Burnt Down
RequestImap(58066174)  -- Interior
-- RequestImap(`bra_vfx_post_smolder`)  -- House on fire Smoke (Smoke and Burning Sounds Only)
-- RequestImap(-437251660)  -- House of Fire Flames
RequestImap(-1108618313)
RequestImap(-1484530238)
RequestImap(363257921)
RequestImap(1048790253)

-- Mansion Exterior
-- RequestImap(-1220264217)  -- Shurbs and Bushes
-- RequestImap(-1508467572) -- Ferns Bushes Weeds Overgrown (Use with Burned Down Version of House)
-- RequestImap(-990258606) -- Small Trees
-- RequestImap(-21876618)
RequestImap(1944013855) -- Add Open Shudders Upstairs Bed Room and Downstairs Library
-- RequestImap(-2137633069)  -- Shudders Close Upstairs Bedroom and Downstairs Library
RequestImap(-880373663)  -- Front Balcony Lantern Added
RequestImap(-70021332)  -- Adds Working tools and supplies to upper balcony
-- RequestImap(-787678727) -- burnt plants outside
RequestImap(188985281)
RequestImap(-964156415)
RequestImap(-1872939092)
RequestImap(1649275138)
RequestImap(2016081133)
RequestImap(622597018)

-- RequestImap(-1452136643) weeds in field 1189.41, -1638.19, 58.63
-- RequestImap(654746614) -- overgrown grass in crops
-- RequestImap(434145706) -- overgrown grass in crops
-- RequestImap(340621560) -- overgrown grass in crops
-- RequestImap(24859476) -- overgrown grass in crops
-- RequestImap(314111435) -- overgrown grass in crops
-- RequestImap(-64632667) -- overgrown grass in crops
-- RequestImap(-282972514)  -- overgrown grass in crops
-- RequestImap(-665583358)  -- overgrown grass in crops
-- RequestImap(-889100155)  -- overgrown grass in crops
-- RequestImap(-946313953)  -- overgrown grass in crops
-- RequestImap(-1184151355) -- overgrown grass in crops
-- RequestImap(1812999696) -- overgrown grass in crops
-- RequestImap(-1296418825) -- overgrown grass in crops
-- RequestImap((1576931820) -- overgrown grass in crops
-- RequestImap(1891284833) -- overgrown grass in crops
-- RequestImap(-744260705)
-- RequestImap(1424293412)
RequestImap(366542865)
RequestImap(241205019)
RequestImap(1060557512)
-- RequestImap(-362403544)
RequestImap(-592147003)
RequestImap(352816221)
RequestImap(1128622296)
RequestImap(979982112)
RequestImap(1756640181)
RequestImap(1557076971)
RequestImap(1913538153)
RequestImap(1650694835)
RequestImap(1965736001)
RequestImap(1266707689)
RequestImap(-1603329230)
RequestImap(2056145270)
RequestImap(748826019)
RequestImap(-1892843345)
------------------------------------- #### END OF BRAITHWAITE MANSION ####

------------------------------------- Grey Estates
RequestImap(-677977650) -- Normal Barn Frame
RequestImap(702350293) -- Barn Interior
-- RequestImap(419559004) -- Burnt Barn Frame 1
RequestImap(1426715569) -- Adds Field Props
-- RequestImap(1284656212) -- Burning Structure
-- RequestImap(-1162161651) -- Fields on fire
-- RequestImap(557212279) -- Burnt Plants
-- RequestImap(1786931635) -- Burnt out fields
RequestImap(26815048) -- Normal Fields
RequestImap(-1229109520) -- Green Plants
RequestImap(-1390612743)
RequestImap(2097480406)
------------------------------------- #### END OF GREY ESTATES ####

------------------------------------- Blackwater Town Hall
RequestImap(-2082201137)  --Blackwater Ground Town Hall
RequestImap(1343343014)  --Blackwater Town Hall Addons Construction
RequestImap(739412171)  -- Two Boards in front of city hall (Goes with Town Hall Construction)
RequestImap(-5339556)  --Bank Under Construction
RequestImap(1641449717)
RequestImap(1258244391) -- something
RequestImap(-501793326) -- construction
RequestImap(1490756544) -- crates on main st
RequestImap(-753454183) -- trapper
RequestImap(-1854368742) -- trapper
RequestImap(466168676)
RequestImap(411846009)
RequestImap(-393583941)
RequestImap(-636161219)
-- RequestImap(-2122914678) -- grave
-- RequestImap(917434281) -- grave
RequestImap(-518004776) -- grave
-- RequestImap(1173561253) -- Tents Beside City Hall Near Trech
-- RequestImap(1470738186) -- Adds Pre-Construcion Ground (Ground does not mesh well with contrustion IPLs)
-- RequestImap(-1632348233) -- Adds Trees and Grass (DO NOT USE WITH CONSTRUCTION IPL, WILL MERGE VISUALS)
RequestImap(-562289114) -- something in cemetary
------------------------------------- #### END OF BLACKWATER TOWN HALL ####

------------------------------------- First Camp - Winter Area -1346 2407 311
-- RequestImap(867231253)  -- Ground Spring Melt
-- RequestImap(1248111234) -- Ground Early Spring Melt
-- RequestImap(474287981) -- Ground Standard Winter
RequestImap(-1331012521) -- Ground After Snowfall Winter
-- RequestImap(-2119625926) -- Barrels and Crates
-- RequestImap(1113693078) -- Snow on Two Crates
-- RequestImap(660686456) -- Crates for use with Snow Cover Crates (FOR USE WITH Snow on Crates)
-- RequestImap(-8749224) -- Torches Boxes and Crates (DO NOT USE SNOW ON CRATES WITH THIS)
RequestImap(-1991237877) -- Boxes
RequestImap(-1670453688) -- Broken Wagons
RequestImap(-743781837) -- Fire in Pit
RequestImap(2114706334) -- Fire Pit
RequestImap(-1306375743) -- Forge Fire
------------------------------------- #### END OF FIRST CAMP ####

------------------------------------- Farm House near Mining Town - -559 2686 319
RequestImap(-338553155) -- Exterior House
RequestImap(-1636879249) -- Normal Looking Interior
-- RequestImap(-323126593) -- Burned Out Interior
-- RequestImap(-889869458)  -- Debris
-- RequestImap(1590561203)  -- Flames
RequestImap(-1106668087) -- Adds Wagon Wheel near Front Door
RequestImap(`adl_winter01_houseburnt_chest`) -- Cash Box Interior
------------------------------------- #### END OF FARM HOUSE ####

------------------------------------- Strawberry
-- RequestImap(-134556459) -- Doctors House Locked Door (No Interior) -1799 -428 158
RequestImap(131323483)  -- Doctors House Interior and Unlocked Front Door
-- RequestImap(270920361) -- Crates on Doctors Porch

-- RequestImap(1892122519)-- Locked Door Micahs Gun House (No Interior) -1773 -431 154
RequestImap(-130638369) -- Micahs Gun House Interior with Unlocked Front Door (Upstairs does not work, other doors are locked)

RequestImap(`des_str_jail`) -- Jail Cell Window Fixed
RequestImap(1934919499) -- Jail Cell Window Fixed
RequestImap(-515396642) -- Jail Cell Window Fixed
-- RequestImap(993595204) -- Window Debris
-- RequestImap(1291083725) -- Window Debris

-- RequestImap(1924458218) -- goods blocking southern bridge
RequestImap(1190076410)
RequestImap(-1956194332)
--RequestImap(1598834669)
RequestImap(1299817544)
RequestImap(1204787444)
RequestImap(66523468)
RequestImap(2040259178)
RequestImap(-1106517275) -- help wanted general store
RequestImap(-1986209836)
RequestImap(1525054056)
RequestImap(749968899)
RequestImap(-186143124)
RequestImap(966418260)
RequestImap(-432154242)
RequestImap(`des_str_jail_exp`)
RequestImap(-1986209836)
RequestImap(-1403908542)


--- Strawberry taxidermy ---
RemoveImap(`tax_shutters_closed`) -- taxidermy cabin -1680.5, -337.43, 174.0 shutters closed if requested
RequestImap(-1125782227)  -- taxidermy cabin -1680.5, -337.43, 174.0 shutters open
RequestImap(-372970556)--taxidermy cabin uncertain


------------------------------------- #### END OF STRAWBERRY ####

----------------------- Saint Denis Doctor office
-- RequestImap(-473077489) -- Doors (fixes hole) no interior
RequestImap(619024057) -- full interior with doors
------------------------------------- #### END OF SAINT DENIS DOCTOR OFFICE ####

----------------------- Saint Denis Docks
RequestImap(-445068262)
RequestImap(-801609437)
RequestImap(`sdn_market_s_saltedbeef01x_group`)
RequestImap(-469909433)
RequestImap(-1461530058)
RequestImap(1826022799)
RemoveImap(-1859413313)
RequestImap(1394163483)
--RequestImap(942470447)
RequestImap(-483649675)
--RequestImap(-782601262)
RequestImap(-1170563128)
RequestImap(212587871)
RequestImap(-436566493)
--RequestImap(-677790400)
RequestImap(143811737)
--RequestImap(1679182807)
RequestImap(-1512794226)
RequestImap(146172383)
RequestImap(876228895)
--RequestImap(1417687142)
RequestImap(-2035101386)
RequestImap(1520435387)
--RequestImap(1078633574)
RequestImap(1305074360)
RequestImap(1048677741)
RequestImap(1284188544)
RequestImap(-1986089134)
RequestImap(913995529)
RequestImap(-730093764)
RequestImap(-359734366)
RequestImap(175173994)
RequestImap(-686953321)
--RequestImap(54029413)
--RequestImap(-739754595)
RequestImap(-931280709)
RequestImap(-1737485501)
--RequestImap(-1070234238)
RequestImap(191078900)
RequestImap(695709062)
RequestImap(`sdn_slm_mrk_p_apple01x_group`)
RequestImap(-1366130296)
RequestImap(`sdn_slm_mrk_p_corn02x_group`)
RequestImap(`sdn_slm_mrk_p_pear_02x_group`)
RequestImap(1355914142)
--RequestImap(165972019)
RequestImap(-1036688493)
RequestImap(-30157790)
RequestImap(-929277449)
RequestImap(-801609437)
------------------------------------- #### END OF SAINT DENIS DOCKS ####

----------------------- Saint Denis THEATRE
RequestImap(-278745837) -- saint denis big theatre
RequestImap(-41173958) -- saint denis big theatre
RequestImap(1160690623) -- saint denis big theatre
RequestImap(-660075384) -- saint denis big theatre
RequestImap(149553684) -- saint denis big theatre
--RequestImap(1547403545) -- saint denis big theatre one of the signs outside
--RequestImap(808576710) -- saint denis big theatre one of the signs outside
--RequestImap(-775951892) -- saint denis big theatre one of the signs outside
--RequestImap(137316925) -- saint denis big theatre one of the signs outside
--RequestImap(1431947993) -- saint denis big theatre one of the signs outside
------------------------------------- #### END OF SAINT DENIS THEATRE ####

----------------------- Saint Denis
RequestImap(-2096572276)
RequestImap(2015532863)
RequestImap(-800942395)
--RequestImap(-741366935)
--RequestImap(-1593790123)
RequestImap(-595698218)
RequestImap(-1269989522)
RequestImap(-1995815064)
RequestImap(1136457806) -- tram crash
--RequestImap(-342806042) -- tram crash
--RequestImap(1255880931) -- tram crash
--RequestImap(1676972066) -- tram crash
RequestImap(-643411908)
RequestImap(-1901860833)
RequestImap(-1225383143)
RequestImap(206289712)
RequestImap(1405627586)
RequestImap(-1889108254)
--RequestImap(-1583923165)
RequestImap(1726243396)
--RequestImap(96746001)
RequestImap(`sdn_slm_mrk_market_items`)
RequestImap(`sdn_slm_mrk_p_apple01x_dressing`)
RequestImap(`sdn_slm_mrk_p_carrots_01x_dressing`)
RequestImap(`sdn_slm_mrk_p_corn02x_group_dressing`)
RequestImap(-540286923)
RequestImap(1017355491)
RequestImap(-920505696)
RequestImap(-596723840)
--RequestImap(-1026473536)
RequestImap(-1762770596)
--RequestImap(-516683274)
RequestImap(-1004522372)
RequestImap(281772765)
--RequestImap(-2084311522)
RequestImap(489834626)
RequestImap(1628286919)
RequestImap(-704461521)
--RequestImap(`new_com_07_nohotel`)
--RequestImap(-1725465949)
--RequestImap(1821956151)
RequestImap(-1993960878)
RequestImap(204868257)
RequestImap(432272547)
--RequestImap(1895127686)
RequestImap(1461266126)
--RequestImap(-1473336090)
RequestImap(-1490034522)
RequestImap(-205116461)
RequestImap(-1013403664)
RequestImap(-670748311)
RequestImap(-2124415277)
RequestImap(-836433697)
RequestImap(-494733971)
RequestImap(490883533)
RequestImap(`des_mob3_trolley`)
------------------------------------- #### END OF SAINT DENIS ####

----------------------- Casino boat
RequestImap(-873881483)
RequestImap(`new_boats_01_grandkor3`)
RequestImap(-614421509) -- boat shell
RequestImap(604920544)  -- upstairs interior
RequestImap(`ser_01_grandkor3`) -- main room interior
RequestImap(-1968130469) -- railings
RequestImap(-276259505) -- railings
RequestImap(-1716205818)
RequestImap(1056170594)
RemoveImap(1157695860) -- needs to be removed so double doors can open
RequestImap(1859948183)
RequestImap(-1688366042)
------------------------------------- #### END OF CASINO ####

----------------------- ferry boat
RequestImap(-723094901)
------------------------------------- #### END OF FERRY BOAT ####

----------------------- Beechers field
RequestImap(255093300)
RequestImap(1344772301)
RequestImap(-382865315)
RequestImap(181690478)
RequestImap(774601424)
RequestImap(431365499)
RequestImap(-2090209059)
RequestImap(-706937940)
RequestImap(-71885140)
RequestImap(-1792872817)
RequestImap(-1402083909)
-- RequestImap(1929454697) -- beechers field side rows of some medium crop
-- RequestImap(1649902358) -- beechers field side rows of some small crop
-- RequestImap(1864768904) -- beechers field crops in middle
-- RequestImap(938290967)  -- beechers field crops in middle
-- RequestImap(1169279648) -- beechers field crops in middle
-- RequestImap(-284612948) -- beechers field tilled field
RequestImap(-1765152778) -- beechers field logs laying in
RequestImap(-2072231077) -- beechers field plants over area
RequestImap(-1253110600) -- beechers field hole in ground fix
RequestImap(1965249616)
RequestImap(276582710)
RequestImap(1977031606)
RequestImap(-2021605623)
RequestImap(1191890045)
RequestImap(19217583)
RequestImap(-284612948)
------------------------------------- #### END OF BEECHERS FIELD ####

----------------------- hole at -1627.81, 224.5, 106.45
RequestImap(1861460906)
------------------------------------- #### END OF HOLE AT -1627.81, 224.5, 106.45 ####

----------------------- farm with hole in ground next to W in West Elizabeth
RequestImap(-928367655)
RequestImap(890107948)
RequestImap(1153046408)
RequestImap(1634621556)
RequestImap(-243627670)
RequestImap(38567760)
RequestImap(-1954278106)
RequestImap(-947200121)
RequestImap(629362551)
RequestImap(-786579336)
RequestImap(-1305545118)
RequestImap(-825836321) -- ground
RequestImap(446554495) -- ground
RequestImap(-262959893) -- ground
RequestImap(-735136865) -- ground
RequestImap(-868830916)
RequestImap(764025611)
-- RequestImap(1802934313) --trees
-- RequestImap(607468222) --shrubs
-- RequestImap(2108112010) --trees
-- RequestImap(1208537422) --trees
-- RequestImap(361734047) -- trees
-- RequestImap(-1552951782) --trees
-- RequestImap(1391886974) -- plants
-- RequestImap(-1142569437) -- plants
-- RequestImap(474113610) -- plants
-- RequestImap(1298607560)
-- RequestImap(-297340751) -- small pines

RequestImap(`pro_barn_int_milo`)
RequestImap(1423681694)
RequestImap(1293624693)
RequestImap(-1305406402)
RequestImap(`pro_es_01_workerhouse`)
RequestImap(-602816690)
RequestImap(636278554)
RequestImap(-285245562)
RequestImap(1031662866)
RequestImap(-1041976064)
RequestImap(1221694281)
RequestImap(1036815507)
RequestImap(775893260)
RequestImap(-329355129)
-- RequestImap(2117211184) --fence
-- RequestImap(-1042390616) -- barn interior
-- RequestImap(-118700196) --props outside
RequestImap(991016631)
RequestImap(57105576)
RequestImap(238757788)
RequestImap(927020127)


RequestImap(-1680050035)
RequestImap(41398635)
RequestImap(462263849)
RequestImap(1422134667)
RequestImap(`m_07_p_murderrock`)
RequestImap(-1813544782)
RequestImap(1008375999)
RequestImap(117485200)
RequestImap(-188216801)
RequestImap(-2047539266)
RequestImap(1053919002)
------------------------------------- #### end farm with hole in ground next to W in West Elizabeth ####

----------------------- Fantana Theatre Saint Denis
RequestImap(-1667265438) -- signs on building 1
--RequestImap(175578406)  -- signs on building 2
--RequestImap(1137646647) -- fantana doors (fills hole)
RequestImap(-898081380) -- fantana theatre interior
-- RequestImap(-468635897) -- sign option 1 out front (advertisement)
-- RequestImap(-771786794) -- sign option 2 picture
-- RequestImap(-626641013) -- sign option 3 scull
-- RequestImap(1088045886) -- sign option 4 (advertisement)
-- RequestImap(-1678761663) -- sign option 5 (advertisement)
-- RequestImap(535384482) -- sign option 6 (advertisement)
-- RequestImap(1724413302) -- sign option 7 (advertisement)
RequestImap(-1267247536) -- sign option 8 (advertisement)
------------------------------------- #### END Fantana Theatre Saint Denis ####

----------------------- Prison
RequestImap(350100475) --Cellar doors
RequestImap(728046625)
RequestImap(2033090463)
RequestImap(826576088)
------------------------------------- #### END Prison ####

----------------------- Hotel Chevalier
-- RequestImap(481139295)  -- scaffolding and grand opening soon sing
RequestImap(-274080837) -- fixed hole in wall
------------------------------------- #### END Hotel Chevalier ####

----------------------- House interior 1119 481.74 96
RequestImap(-787042507)
------------------------------------- #### END House interior ####

----------------------- Patch hole in building -1860, -1722, 109.25
RequestImap(-1696865897)
------------------------------------- #### END Patch hole in building ####

----------------------- Missing cabin -2376.0, -1590.96, 156.0

RequestImap(-1387511711) -- shell
RequestImap(1901132483) -- interior
-- RequestImap(-2082345587) -- onfire
-- RequestImap(-715865581) -- fallen tree
------------------------------------- #### END Missing cabin ####

-- RequestImap(1879779330)  -- sign outside tent version 1
-- RequestImap(1104143966)  -- sign outside tent version 2
-- RequestImap(1027093524)  -- sign outside tent version 3
-- RequestImap(-1617847332) -- sign outside tent version 4
RequestImap(-2142987163)  -- sign outside tent version 5
RequestImap(-763477089)  -- partial door flap open
-- RequestImap(317070801)   -- full closed flap
------------------------------------- #### END Traveling Magic Lantern Show -- Valentine --####

----------------------------------------- ### Armadillo Fires ### Southwest
-- RequestImap(-1745210725) -- SW add debris
-- RequestImap(-1096712211) -- SW add debris
-- RequestImap(-1941005496) -- SW add debris
-- RequestImap(1898267848)  -- SW add ember
-- RequestImap(974280355)   -- SW add ember
-- RequestImap(1756181464)  -- SW add ember
-- RequestImap(-816857367)  -- SW add ember
-- RequestImap(-72482077)   -- SW add flame
-- RequestImap(-1122265410) -- SW add flame
-- RequestImap(-935952905)  -- SW add flame
-- RequestImap(1309948033)  -- SW add flame
-- RequestImap(1941336822)  -- SW add flame
-- RequestImap(712371053)   -- SW add flame
-- RequestImap(1710282603)  -- SW add flame
-- RequestImap(574303518)   -- SW add charred ground
-- RequestImap(-752772715)  -- SW add smoke
-- RequestImap(503623514)   -- SW add smoke
-- RequestImap(-407026996)  -- SW add smoke
----------------------------------------- ### Armadillo Fires ### Northeast
-- RequestImap(-1029093195) -- NE add debris
-- RequestImap(-1325390493) -- NE add debris
-- RequestImap(-1622834706) -- NE add debris?
-- RequestImap(257582350)   -- NE add ember
-- RequestImap(-39730787)   -- NE add ember
-- RequestImap(-1438901569) -- NE add ember
-- RequestImap(-772691681)  -- NE add flame
-- RequestImap(-2110850686) -- NE add flame
-- RequestImap(-1142062162) -- NE add Flame
-- RequestImap(32078073)    -- NE add flame
-- RequestImap(1011350990)  -- NE add flame
-- RequestImap(1007204499)  -- NE add flame
-- RequestImap(705321299)   -- NE add flame
-- RequestImap(34346755)    -- NE smoke
-- RequestImap(482102371)   -- NE smoke
-- RequestImap(-502343927)  -- NE smoke
-- RequestImap(112916013)   -- NE add charred ground
----------------------------------------- ### Armadillo Fires ### Southeast
-- RequestImap(-1725439174) -- SE add ember
-- RequestImap(-1443390498) -- SE add debris
-- RequestImap(689576469)   -- SE add debris
-- RequestImap(-1750010031) -- SE add debris
-- RequestImap(1857654366)  -- SE add ember
-- RequestImap(2095655613)  -- SE add ember
-- RequestImap(1049317994)  -- SE add flame
-- RequestImap(-820561187)  -- SE add flame
-- RequestImap(-280121448)  -- SE add flame
-- RequestImap(-1268841107) -- SE add flame
-- RequestImap(-279038963)  -- SE add flame
-- RequestImap(2087785010)  -- SE add flame
-- RequestImap(161441935)   -- SE add flame
-- RequestImap(-1603458673) -- SE add charred ground
-- RequestImap(1065585604)  -- SE smoke
-- RequestImap(-175048740)  -- SE smoke
-- RequestImap(-482127039)  -- SE smoke
----------------------------------------- ### END ARMADILLO FIRES ###

-----------------------Cornwall Train Car on tracks -369.12, 1314.26, 150.0----------------
--RequestImap(1903595390) -- Cornwall train car exterior
--RequestImap(-24665995) -- Cornwall train car exterior parts
--RequestImap(`reg_hrt_00_wnt4_train_milo`) -- Cornwall train car interior
----------------------------#### END Cornwall Train Car #### ---------------

------------------------Hole in ground and house next to Emerald Ranch
--RequestImap(-165202905) -- Ground for no house
RequestImap(-1377975054) -- Ground for house
RequestImap(897624424) -- Bushes out front
RequestImap(-1327148782) -- Bushes out back
RequestImap(-574996782) -- House Exterior and outhouse
RequestImap(1169511062) --House interior
RequestImap(-2111718052)
RequestImap(-1266106154) -- Planks piled up on south wall of house
------------------------#### END Hole and House next to Emerald

------------------------House South of Valentine -441.4, 499.04, 98.94
--RequestImap(1987335384) -- house south of valentine planks outside
--RequestImap(-590227673) -- House construction south of valentine -436.32, 498.18, 98.93
RequestImap(1823159188) -- Crops at the house south of valentine -433.32, 505.72, 98.01
--RequestImap(-1593160175) -- boxes outside house south of valentine -436.32, 498.18, 98.93
--RequestImap(-2040493861) -- house south of valentine interior -436.32, 498.18, 98.93
--RequestImap(-1382265257) -- house south of valentine interior -436.32, 498.18, 98.93
RequestImap(1552753100) -- House construction complete -436.32, 498.18, 98.93
--RequestImap(-1149736196) -- something
RequestImap(`cas_housewares`) -- curtains closed
RequestImap(-1926787493) -- house finished
--RequestImap(1840600379) -- planks of wood, underground?!
--RequestImap(2136811572) -- planks of wood, underground?!
RequestImap(765141292)
RequestImap(1305415261)
RequestImap(-442857872) -- fence
RequestImap(1251358153) -- hitching post
--RequestImap(872406077)
--RequestImap(1867048850)
--RequestImap(-1490939730)
--RequestImap(1471226731)
RequestImap(-1471527776)
------------------------#### END House South of Valentine

------------------------Camps
RequestImap(-1069586228) -- Camp at -191.35, 295.35, 96.83
RequestImap(-508205317) -- Camp at -547.63, 391.85, 87.89
RequestImap(-232598845) -- Camp at -423.34, 497.2, 98.12
RequestImap(`gang_odriscollboys_cml001`) -- Camp at -4.34, 951.13, 210.97
RequestImap(588746212) -- something relating to a camp 123.48, 415.33, 136.63
RequestImap(-688744902) -- Camp at 182.7, 344.61, 120.62
RequestImap(-1227807056) -- Camp at 2073.57, -407.31, 44.71
RequestImap(`amb_camp_tal_story_emranch`) -- Camp at -2004.63, -1164.96, 100.04
RequestImap(`amb_camp_bgv_006`) -- Camp at -2126.17, -567.08, 136.9
RequestImap(`amb_camp_bgv_basket`) -- Camp at -1469.51, -482.23, 130.71
RequestImap(-995906750) -- Camp at -1228.99, 156.73, 44.63
RequestImap(-2112989134) -- Camp at -1188.62, 322.81, 43.96
RequestImap(`amb_camp_bgv_dead01`) -- Camp at -2215.18, -297.01, 176.78
RequestImap(-1710969071) -- Camp at -1107.33, -828.24, 58.24
RequestImap(`amb_camp_bgv_explr01`) -- Camp at -771.02, -956.09, 58.39
RequestImap(`amb_camp_bgv_glamp01`) -- Camp at -1913.77, -1082.06, 75.96
RequestImap(`amb_camp_bgv_gold01`) -- Gold panning camp at -2749.37, -316.57, 149.16
RequestImap(`amb_camp_bgv_wildchest`) -- Gold panning camp at -2747.48, -303.8, 148.42
RequestImap(`amb_camp_bgv_hunt01`) -- Camp at -1670.66, 296.44, 106.45
RequestImap(`amb_camp_bgv_mount_view_1`) -- Camp at -2454.02, -262.35, 168.71
RequestImap(`amb_camp_bgv_mount_view_2`) -- Camp at -1234.45, -87.46, 84.58
RequestImap(-1501864740) -- Camp at -1531.39, -307.53, 142.49
RequestImap(-1070814495) -- Camp at -568.01, 145.4, 44.67
RequestImap(`amb_camp_bgv_skinners`) -- Camp at -2078.61, -1437.18, 128.39
RequestImap(506519174) -- Camp at -2060.49, -1446.88, 128.13
RequestImap(`amb_camp_bgv_trap01`) -- Camp at -1585.22, -697.43, 135.12
RequestImap(-792399058) -- Camp at -2725.06, 166.45, 159.57
RequestImap(-248246131) -- Camp at 1853.11, 171.59, 98.47
RequestImap(-1435884039) -- Camp at -1992.32, 423.39, 121.51
RequestImap(-108299713) -- Camp at -1118.45, -219.96, 90.48
RequestImap(-2009032789) -- Camp at -980.45, -212.64, 90.69
RequestImap(-822172378) -- Camp at -2601.27, -24.32, 160.63
RequestImap(`gang_odriscollboys_bgv005`) -- Camp at -2762.92, 112.72, 164.46
RequestImap(`gang_odriscollboys_bgv006`) -- Camp at -1448.86, 101.69, 90.49
RequestImap(-1740687448) -- Camp at -1580.84, 496.55, 114.71
RequestImap(-1508256931) -- Camp at -1345.14, 493.06, 96.55
RequestImap(`gang_odriscollboys_bgv009`) -- Camp at -1711.56, 605.51, 118.71
RequestImap(-817060178) -- Camp at -1625.35, 822.73, 155.06
RequestImap(-780302065) -- Camp at -320.82, 177.49, 64.33
RequestImap(-1226654727) -- Camp at -1777.42, -182.18, 194.18
RequestImap(1849913721) -- Camp at -1531.0, -307.53, 142.44
RequestImap(573576705) -- Camp at -1531.0, -307.53, 142.44
RequestImap(-173548630) -- Camp at -2368.01, -1324.2, 147.73
RequestImap(-170108806) -- Camp at -3952.08, -2783.79, -13.55
RequestImap(-856826868) -- Camp at -3938.42, -2777.43, -14.51
RequestImap(-1928361302) -- Camp at 324.4, 1161.02, 181.88
--RequestImap(-315113250) -- Incomplete Camp at 681.71, 1093.99, 186.8
RequestImap(-1850873053) -- Camp at -1186.42, 326.58, 43.78
RequestImap(-1192753172) -- Camp at 646.32, 1301.28, 194.55
RequestImap(-482255714) -- Camp at 102.27, 1407.16, 167.68
RequestImap(-236914211) -- Camp at 586.52, 1431.2, 187.0
RequestImap(`gang_odriscollboys_cml005`) -- Camp at 497.62, 1498.41, 173.64
RequestImap(-833696851) -- Camp at 886.67, 1272.53, 235.12
RequestImap(`k_11_p_mary1_camp`) -- Camp at 886.67, 1272.53, 235.12
RequestImap(-2060277385) -- Camp at 299.58, 1288.67, 197.65
RequestImap(-223199122) -- Camp at 207.09, 998.65, 189.77
RequestImap(416864911) -- Camp at -5782.08, -2753.06, -4.68
RequestImap(-1957607557) -- Camp at -5438.91, -3653.94, -22.03
RequestImap(1337703077) -- Camp at -1497.17, -780.72, 104.16
RequestImap(`mp_intro_gang_blackwater3`) -- Camp at -2257.55, -1338.25, 134.16
RequestImap(`mp_jessicacamp_blackwater`) -- Camp at -1574.09, -1677.05, 79.96
--RequestImap(`amb_camp_gre_story_hunter`) -- Lots of tents at 799.87, 1511.28, 204.61 causes clipping
RequestImap(`amb_camp_gre_story_treasure`) -- Camp at 712.72, 1883.02, 239.5
RequestImap(827906606) -- Supplies at Camp 1919.76, 1962.32, 262.9
RequestImap(`amb_camp_hen_story_harlow`) -- Camp at -1967.81, -2707.99, 67.89
RequestImap(`min_hid_mantecafalls`) -- Camp at -1657.23, -2759.94, 70.73
RequestImap(`amb_camp_grt_story_manzanita`) -- Camp at -1232.96, -929.79, 69.04
--RequestImap(-433293752) -- Random floating props at camp -332.59, 189.68, 63.31
--RequestImap(1831175752) -- random ass underground camp below 1005.12, 1149.38, 171.94
RequestImap(-1235304557) -- Supplies at camp 495.75, -294.93, 114.29
RequestImap(`amb_camp_hrt_story_chelonian`) -- Camp at -701.46, -464.91, 41.65
--RequestImap(-936204805) -- causes CTD at camp 503.38, -250.26, 144.3
RequestImap(`gang_odoriscollboys_hrt005`) -- Camp at -1172.58, 94.76, 44.79
RequestImap(-1287270695) -- Camp at -647.76, -391.94, 79.67
RequestImap(-1885599866) -- Camp at 646.38, -110.39, 149.87
RequestImap(-118171082) -- Camp at 1059.02, 34.59, 86.68
RequestImap(`gang_odriscollboys_hrt006`) -- Camp at -961.5, 296.37, 95.08
RequestImap(`gang_odriscollboys_hrt007`) -- Camp at -646.04, 277.78, 90.75
RequestImap(-1993836161) -- Camp at -849.67, 466.56, 90.4
--RequestImap(`gang_odriscollboys_hrt011`) -- Camp with wagons etc at 440.28, 829.49, 146.7
RequestImap(`gang_odriscollboys_hrt012`) -- Camp at 275.57, 835.41, 190.43
RequestImap(-1279832420) -- Camp at 998.36, 988.8, 151.79
RequestImap(1280284302) -- Camp at 124.02, 415.34, 136.64
RequestImap(-195226224) -- Camp at 879.78, 419.22, 111.74
RequestImap(-1670262487) -- Camp at -120.72, -75.56, 90.35
RequestImap(-754458705) -- Camp at 135.29, 162.38, 112.19
RequestImap(-1534019549) -- Camp at -5247.27, -3849.85, -2.45
RequestImap(`amb_camp_roa_rc_calloway`) -- Camp at 2366.01, 1589.3, 85.6
RequestImap(`amb_camp_roa_story_pigfarm`) -- Camp at 1845.86, 937.56, 121.19
RequestImap(`amb_camp_roa_story_princess`) -- Camp at 2377.09, 1073.18, 85.06
RequestImap(-985843618) -- Camp at 2469.88, 113.48, 45.36
RequestImap(`gang_murfreeransack_loc01_hat`) -- Camp at 2121.3, -138.08, 50.35
RequestImap(`gang_murfreeransack_loc01_shoe`) -- Camp at 2121.3, -138.08, 50.35
RequestImap(-1298966347) -- Camp at 2467.37, -87.68, 45.88
RequestImap(`gang_murfreeransack_loc02_shoe`) -- Camp at 2467.37, -87.68, 45.88
RequestImap(-1695492178) -- Camp at 2555.07, -70.44, 50.29
RequestImap(-1985868973) -- Camp at 2555.07, -70.44, 50.29
RequestImap(-1300575561) -- Camp at 2321.16, 10.88, 48.18
RequestImap(`gang_murfreeransack_loc04_shoe`) -- Camp at 2321.16, 10.88, 48.18
RequestImap(`gang_murfreeransack_loc05_hat`) -- Camp at 2439.99, 644.31, 69.88
RequestImap(`gang_murfreeransack_loc05_shoe`) -- Camp at 2439.99, 644.31, 69.88
RequestImap(-1139312905) -- Camp at 2424.91, 776.95, 68.35
RequestImap(`gang_murfreeransack_loc06_shoe`) -- Camp at 2424.91, 776.95, 68.35
RequestImap(-1003150953) -- Camp at 2361.58, 838.28, 79.4
RequestImap(-1986775954) -- Camp at 2361.58, 838.28, 79.4
RequestImap(`gang_murfreeransack_loc08_hat`) -- Camp at 2408.55, 881.49, 73.89
RequestImap(-899261623) -- Camp at 2408.55, 881.49, 73.89
RequestImap(-476849231) -- Camp at 2504.0, 880.28, 73.24
RequestImap(-557729610) -- Camp at 2504.0, 880.28, 73.24
RequestImap(-639956757) -- Camp at 2390.0, 1022.46, 90.35
RequestImap(-1991979537)-- Camp at 2390.0, 1022.46, 90.35
RequestImap(`gang_murfreeransack_loc11_hat`) -- Camp at 2301.04, 1053.43, 116.39
RequestImap(`gang_murfreeransack_loc11_shoe`) -- Camp at 2301.04, 1053.43, 116.39
RequestImap(-663999418) -- Camp at 2517.65, 1746.51, 88.1
RequestImap(`gang_murfreeransack_loc12_shoe`) -- Camp at 2517.65, 1746.51, 88.1
RequestImap(-259044425) -- Camp at 2792.45, 2009.49, 165.12
RequestImap(`gang_murfreeransack_loc13_shoe`) -- Camp at 2792.45, 2009.49, 165.12
RequestImap(`gang_murfreeransack_loc14_hat`) -- Camp at 2622.06, 2104.98, 173.95
RequestImap(-1414272575) -- Camp at 2622.06, 2104.98, 173.95
RequestImap(-1398290276) -- Camp at 2597.77, 61.94, 55.81
RequestImap(2006120810) -- Camp at 2455.8, 288.65, 70.62
RequestImap(`mp_jessicacamp_rhodes`) -- Camp at 1762.56, -1899.15, 47.95
RequestImap(`amb_camp_scm_story_murfee`) -- Camp at 725.07, -1432.71, 49.59
RequestImap(-1923126393) -- Camp at 1678.88, -614.25, 44.59
RequestImap(-313259746) -- Debris at Camp 890.94, -397.25, 85.8
RequestImap(-367168072) -- Debris at Camp 890.94, -397.25, 85.8
RequestImap(`gang_lemoyne_scm001`) -- Camp at 1173.41, -2181.35, 55.13
RequestImap(`gang_lemoyne_scm002`) -- Camp at 1426.63, -2185.84, 49.29
RequestImap(`gang_lemoyne_scm003`) -- Camp at 1561.97, -2048.6, 48.32
RequestImap(`gang_lemoyne_scm004`) -- Camp at 1704.87, -2008.57, 44.66
RequestImap(`gang_lemoyne_scm005`) -- Camp at 1380.24, -1695.79, 68.18
RequestImap(-900541220) -- Camp at 1622.05, -1649.1, 57.03
RequestImap(-1199296193) -- Camp at 1502.88, -1470.19, 72.43
RequestImap(-290546285) -- Camp at 868.38, -1330.22, 55.67
RequestImap(1883767827) -- Camp at -1573.42, 1693.13, 235.18
RequestImap(-1973910443) -- Camp at -1898.91, -1221.06, 81.56
RequestImap(-553189820) -- Camp at 947.94, -1318.26, 59.19
RequestImap(`gang_lemoyne_scm010`) -- Camp at 1083.28, -1268.27, 68.5
RequestImap(`gang_lemoyne_scm012`) -- Camp at 856.65, -1134.05, 58.42
RequestImap(-1232784731) -- Camp at 683.33, -992.18, 53.42
RequestImap(-482898935) -- Camp at 911.14, -986.1, 58.3
RequestImap(`gang_lemoyne_scm015`) -- Camp at 708.4, -885.18, 49.26
RequestImap(`gang_lemoyne_scm016`) -- Camp at 1334.82, -594.43, 75.81
RequestImap(`gang_lemoyne_scm017`) -- Camp at 879.24, -538.01, 89.08
RequestImap(-1419371417) -- Camp at 961.13, -572.61, 90.54
RequestImap(-643041038) -- Camp at 1012.38, -392.18, 91.49
RequestImap(-911242864) -- Camp at 1787.11, -654.76, 42.76
RequestImap(`mp_jessicacamp_tumbleweed`) -- Camp at -4578.67, -2750.18, -10.0
RequestImap(-476377037) -- Camp at 2010.27, -503.76, 42.02
RequestImap(-105596478) -- Camp at 2137.08, -1789.32, 142.6
RequestImap(`gang_skinner_tal003`) -- Camp at -2667.92, -1461.97, 146.33
RequestImap(`gang_skinner_tal004`) -- Camp at -2429.43, -1329.61, 153.42
RequestImap(`gang_skinner_tal005`) -- Camp at -2109.76, -1274.98, 125.31
RequestImap(`gang_skinner_tal006`) -- Camp at -2033.44, -1278.07, 115.56
--RequestImap(705065993) -- camp at -1990.35, -1530.17, 114.32 - clips with trees
RequestImap(-2090647942) -- Camp at -1935.94, -1417.09, 108.62
RequestImap(-2051019414) -- Camp at -2053.21, -1913.8, 112.29
RequestImap(274045919) -- Camp at -4759.47, -2420.75, 7.52
RequestImap(-1109901848) -- Camp at -1220.05, 2099.0, 339.99
RequestImap(1193359531) -- Camp at -3336.32, -2500.81, 2.92
RequestImap(-718318645) -- Camp at 2302.9, 1045.5, 116.61
RequestImap(`re_sp_savagewarning_02`) -- Camp at -1951.1, -1843.24, 117.46
RequestImap(1489268640) -- Camp at -960.56, 2167.46, 341.48
RequestImap(-1344255754) -- Camp at -966.8, 2184.26, 341.1
RequestImap(-710506752) -- Something in Camp at 1933.03, 1960.31, 263.57
RequestImap(-1786365097) -- -2110.09, 661.51, 121.01
RequestImap(-1832103801) -- -1505.59, 1247.54, 313.76
RequestImap(-3789307) -- -1883.82, 1334.0, 200.89
RequestImap(1368296489) -- -1883.82, 1334.0, 200.89
RequestImap(-1194012756) -- -1811.12, -866.45, 106.1
RequestImap(-1960338341) -- -1399.95, -1078.18, 76.51
RequestImap(519905064) -- -1898.91, -1221.06, 81.56
RequestImap(1696372169) -- 2297.13, 1049.84, 116.62
RequestImap(26544760) -- -1757.68, 1692.22, 237.92
RequestImap(2100012223) -- 2471.25, 1755.66, 86.7
RequestImap(-432370325) -- 902.64, -385.01, 89.28
RequestImap(`n_11p_blackwhite_setupcamp`) -- 902.64, -385.01, 89.28
RequestImap(-1132206051) -- 484.52, 287.36, 111.26
--RequestImap(1432023115) -- underground campfire at -30.0, 1229.74, 173.0
RequestImap(1274066881) -- litter at camp at -27.87, 1225.29, 173.12
RequestImap(-1123141803) -- camp at -884.53, -1087.37, 59.3
RequestImap(2096286828) -- 2214.67, 658.79, 95.69
RequestImap(1520095560) -- 2195.35, 800.88, 108.39
RequestImap(409171062) -- 1944.8, 932.62, 117.25
RequestImap(998966461) -- 2217.48, 644.15, 96.36
RequestImap(-1381094502) -- 2197.28, 799.02, 108.15
RequestImap(`mp004_campdef_heartlands`) -- 506.35, -246.35, 114.51
RequestImap(476687617) -- -1757.68, 1692.22, 237.92
RequestImap(`mp004_campdef_grt_plains`) -- -1399.95, -1078.18, 76.51
RequestImap(568096966) -- 2471.26, 1755.66, 86.7
RequestImap(`mp004_campdef_bgv_two_rocks`) -- -1810.73, -867.15, 106.07
RequestImap(`mp004_campdef_gap_ridge`) -- -5690.2, -3358.43, -22.82
RequestImap(`mp004_campdef_gap_breach`) -- -5908.11, -3030.05, 1.19
RequestImap(-1207218596) -- -3584.02, -2227.72, -13.09
RequestImap(-116967529) -- -3881.74, -3489.0, 62.24
RequestImap(-605808708) -- -2547.9, 557.59, 140.89
RequestImap(-100150000) -- 752.89, -918.88, 51.6
RequestImap(-320403109) -- -2562.3, -2685.89, 71.21
RequestImap(18369533) -- -2138.8, -1151.8, 132.2
RequestImap(-331965904) -- 1881.84, 126.75, 98.31
RequestImap(`mp004_campdef_bluewater`) -- 2274.72, -374.86, 42.23
RequestImap(-1934886317) -- -1657.23, -2759.94, 70.73
RequestImap(`mp001_min_hid_rattlesnakehollow`) -- -4413.52, -2186.81, 47.25
RequestImap(`mp001_min_hid_repentance`) -- -4640.24, -3331.84, 26.82
RequestImap(967935536) -- -6263.28, -3572.63, -32.05
RequestImap(-773956478) -- -3952.1, -2783.36, -14.46
RequestImap(-1615749463) -- -1432.26, -2681.41, 40.93
RequestImap(-361709910) -- -3938.42, -2777.43, -14.51
RequestImap(-1323334072) -- -2717.61, -2372.55, 45.66
RequestImap(-1521897637) -- -5995.67, 3258.83, -21.63
RequestImap(-716370751) -- 1762.56, -1899.15, 47.95
RequestImap(-2053832767) -- -320.82, 177.49, 64.33
RequestImap(`mp001_mp_jessicacamp_blackwater`) -- -1574.09, -1677.05, 79.96
RequestImap(-1534577778) -- -4578.77, -2750.6, -9.98
RequestImap(-2024941402) -- 1787.52, -654.52, 42.69
RequestImap(-50297425) -- 323.83, 1161.22, 181.89
RequestImap(`mp001_mp_intro_gang_blackwater3`) -- -2257.8, -1337.77, 134.04
RequestImap(`mp001_mp_intro_gang_tumbleweed1`) -- -5248.24, -3851.16, -2.35
RequestImap(-576687258) -- 123.48, 415.33, 136.63
RequestImap(`mp001_mp_hid_talltrees`) -- -2060.53, -1910.61, 112.52
RequestImap(-1809365172) -- 2351.4, 1358.54, 105.96
RequestImap(-2051059045) -- 207.09, 998.65, 189.77
RequestImap(1191283411) -- -3640.26, -2776.56, 14.48
RequestImap(507232138) -- 2627.34, 1328.04, 114.25
RequestImap(-502582154) -- 1217.11, -1424.09, 71.54
RequestImap(1759143160) -- -1489.85, -774.43, 104.38
RequestImap(1173232190) -- -5012.73, -2359.41, 1.58
RequestImap(105236016) -- -3561.46, -2080.16, -12.86
RequestImap(-1081428331) -- -4178.82, -2507.46, 3.05
RequestImap(-527717905) -- -5685.31, -2760.58, -16.63
RequestImap(1969270586) -- -5613.92, -3880.79, -30.64
RequestImap(-1113878850) -- -3888.02, -3498.04, 62.11
RequestImap(1186551862) -- -1144.68, -1783.78, 61.02
RequestImap(-1112692383) -- -1569.45, -1240.96, 75.19
RequestImap(526763180) -- -2649.98, -2243.89, 80.29
RequestImap(1802967124) -- -4680.17, -3747.86, 13.61
RequestImap(-598586662) -- -2040.48, -405.44, 162.54
RequestImap(-1838419604) -- -665.73, 509.17, 98.44
------------------------#### END Camps

------------------------Beaver's Hollow
--RequestImap(-1392793470) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-2117963426) -- Wrecked Carriage in camp at 2351.41, 1358.53, 105.96
--RequestImap(-1849681615) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(1122583474) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-828094297) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(44502487) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-459648718) -- Big Tent at Camp at 2351.41, 1358.53, 105.96
--RequestImap(1102643191) -- Big Tent at Camp at 2351.41, 1358.53, 105.96
--RequestImap(-1778044697) -- Big Tent at Camp at 2351.41, 1358.53, 105.96
--RequestImap(1387226336) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-1310355638) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(1069611813) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(531106429) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-407402757) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(1459136338) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-1162254606) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-1869016398) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-1541842872) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-1966238128) -- water basin at Camp at 2351.41, 1358.53, 105.96
--RequestImap(1561231200) -- water basin at Camp at 2351.41, 1358.53, 105.96
--RequestImap(-149795084) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-957510885) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(1311984381) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-771819139) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-1063926197) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-1437554707) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-981684452) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(560821199) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(1547347496) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(806681228) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(955352710) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(41956969) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(629519239) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-1255331540) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-317096325) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(1025787994) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-2048221620) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(255767990) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(1104800593) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-1063259251) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-763678874) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-408234235) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(1423158124) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(360408116) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(668976634) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(968084866) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(-696422730) -- Camp at 2351.41, 1358.53, 105.96
--RequestImap(1537844205) -- Camp at 2351.41, 1358.53, 105.96
RequestImap(-1766409506)
RequestImap(339295570) -- bones on tree
RequestImap(-483001024) -- bones on tree
RequestImap(-1361342903) -- antlers on tree
RequestImap(-1016007592) -- antlers on tree
RequestImap(-1496155572) -- Cave at camp at 2351.41, 1358.53, 105.96
--RequestImap(-419935200) --map on wagon in camp at 2351.41, 1358.53, 105.96
RequestImap(883152450)
RequestImap(753181111)
RequestImap(1475089455)
RequestImap(637861796)
RequestImap(913170302)
RequestImap(702867922)
------------------------#### END Beaver's Hollow

------------------------Shady Belle
RequestImap(1865439665)
RequestImap(2036492390)
RequestImap(-1062918766)
RequestImap(-555683060)
RequestImap(-415514741)
RequestImap(809554858)
RemoveImap(1810083187)
RequestImap(-412827149)
RemoveImap(`shb_p_camp_02`)
RequestImap(923572416)
RequestImap(67198036)
RequestImap(-1130111983)
RequestImap(557551306)
RequestImap(1674493966)
RequestImap(-1115840558)
RequestImap(-1910456812)
RequestImap(-910918420)
RequestImap(-327708229)
RequestImap(1048845581)
RequestImap(-1535722316)
RequestImap(1547994518)
RequestImap(-299265919)
RequestImap(2113454609)
RequestImap(-1865650458)
RequestImap(-1015786727)
RequestImap(1802911979)
RequestImap(1567139024)
RequestImap(-1037436240)
RequestImap(-1747868160)
RequestImap(1588507579)
RequestImap(1396808929)
RequestImap(-1392451243)
RequestImap(-1828030290)
RequestImap(-2147051362)
RequestImap(2061467757)
RequestImap(-997495998)
RequestImap(1265596420)
RequestImap(266022415)
RequestImap(-414377604)
RequestImap(-109593135)
RequestImap(990134505)
RequestImap(1279910772)
RequestImap(1677041346)
RequestImap(1936473519)
RequestImap(1956790299)
RequestImap(-2029001482)
RequestImap(-538645000)
RequestImap(-789852154)
RequestImap(-1003800955)
RequestImap(-1250617063)
RequestImap(495480888)
RequestImap(884576413)
RequestImap(778703691)
RequestImap(514406510)
RequestImap(-421730990)
RequestImap(-134624703)
RequestImap(2004706822)
RequestImap(-960337247)
RequestImap(1155877447)
RequestImap(928165666)
RequestImap(2048341166)
RequestImap(-1015572514)
RequestImap(-785304751)
RequestImap(1448230281)
RequestImap(1687083522)
RequestImap(-2053999329)
RequestImap(2017155697)
RequestImap(-520163372)
RequestImap(-1388202749)
RequestImap(54661488)
RequestImap(1079213989)
RequestImap(-621187540)
RemoveImap(-638481378)
RequestImap(1833824812)
RequestImap(-1739900853)
RequestImap(-646014955)
RequestImap(159921796)
RequestImap(-2014929982)
RequestImap(-1070054959)
RequestImap(-558920293)
--RequestImap(-872749010)
RequestImap(-1924933663)
RequestImap(-54044677)
RequestImap(2116967107)
RequestImap(`sb_companion_hunt06a`)
RequestImap(`sb_companion_rustle01`)
RequestImap(-1619008260)
--RequestImap(964593693)
--RequestImap(-882188392)
RequestImap(773757120)
RequestImap(-1618574684)
--RequestImap(827269092)
RequestImap(-90228526)
------------------------#### END Shady Belle

------------------------Wapiti & Native Stuff
RequestImap(1003623269) -- Tent in Wapiti
RequestImap(`wap_rainsfalls_base`) -- tent 441.39, 2228.66, 248.03
RequestImap(739805687) -- something to do with tent in wapiti 441.39, 2228.66, 248.03
RequestImap(795060201) -- tent flap open
--RequestImap(661576070) -- tent flap closed
RequestImap(-395621323) -- something
RequestImap(-198004806) -- something
RequestImap(-924329535) -- flame in tent 448.51, 2210.93, 246.08
RequestImap(-753844687) -- fixed shrine thing 981.6, 1452.28, 278.36
--RequestImap(-1045062790) -- damaged shrine thing 981.6, 1452.28, 278.36
------------------------#### END Wapiti & Native Stuff

------------------------Guarma
--RequestImap(1332067900) -- Guarma Storyline Building
--RequestImap(-1118337851) -- Guarma Storyline Building
--RequestImap(1236490949)
--RequestImap(-1701626270)
--RequestImap(-557964826)
--RequestImap(603871447)
--RequestImap(-1569624057)
--RequestImap(-378395191)
--RequestImap(273551835)
--RequestImap(-961488528)
--RequestImap(1936009597)
--RequestImap(-425834853) -- Guarma Ship Hold
--RequestImap(-1055748784)
--RequestImap(-694809996)
--RequestImap(-279703229)
--RequestImap(-2053475031)
--RequestImap(-623091266)
--RequestImap(-217646849)
--RequestImap(-313831898)
--RequestImap(1694736240)
--RequestImap(634920011)
--RequestImap(2035758463)
--RequestImap(425205960)
--RequestImap(54402003)
--RequestImap(-481093102)
--RequestImap(-1923021027)
--RequestImap(-1721168110) -- ship
--RequestImap(937192284)
--RequestImap(706203603)
--RequestImap(579021239)
--RequestImap(272490690)
--RequestImap(263152228)
--RequestImap(996571604)
--RequestImap(301693437)
--RequestImap(`c_11_boobytrap_01`) -- grave
--RequestImap(-512601161) -- grave
--RequestImap(765343099)
--RequestImap(-909306169)
--RequestImap(-879315604)
--RequestImap(103750283)
------------------------#### END Guarma

------------------------Abandoned Indian Reservation - -1602.19, -892.21, 86.83
RequestImap(`mp001_mp_hid_fortriggs`)
RequestImap(-340009312)
RequestImap(389213738)
RequestImap(-1877706739)
RequestImap(437660121)
RequestImap(-1325803862)
RequestImap(980904027)
RequestImap(1210622903)
RequestImap(905216692)
RequestImap(-1299414622)
RequestImap(-1035166057)
RequestImap(-821741560)
RequestImap(-574138996)
RequestImap(-754870430)
RequestImap(1361745480)
RequestImap(-84124751)
RequestImap(135073157)
RequestImap(-1588838395)
RequestImap(-601173298)
RequestImap(-1852293718)
RequestImap(1202333215)
RequestImap(-817579246)
RequestImap(1811369374)
RequestImap(-1959752936)
RequestImap(1620292759)
RequestImap(-971625396)
RequestImap(-1260156441)
------------------------#### END Abandoned Indian Reservation

------------------------Swamps
RequestImap(`amb_camp_bay_squat_macomb`) -- belongings inside broken shack 1894.02, -742.28, 42.27
RequestImap(`amb_camp_bay_story_copperhead`) -- Supplies 2040.78, -1639.4, 41.88
RequestImap(1616712776) --  something at 2262.77, -763.62, 42.63
RequestImap(-414301703)
RequestImap(1423912753)
RequestImap(980234126)
RequestImap(-1018713880)
RequestImap(1587477916)
RequestImap(18956962)
RequestImap(-329705198)
RequestImap(386231914)
RequestImap(-947895270)
RequestImap(1648013752)
RequestImap(-753535900)
RequestImap(-383442850)
RequestImap(-963708270)
RequestImap(`lag_bs_p_int_fishing01_dressing`)
RequestImap(`lag_bs_p_s_inv_pothorsestim_dressing`)
RequestImap(`lag_bs_p_s_inv_pothorsestim_group`)
RequestImap(-1323936218)
RequestImap(`lag_bs_s_crackers01x_group`)
RequestImap(-1378006849)
RequestImap(`lag_bs_s_crickettin01x_dressing`)
RequestImap(-1622723192)
RequestImap(-872587325)
RequestImap(`lag_bs_s_inv_baitherb01x_group`)
RequestImap(-1176057358)
RequestImap(`lag_bs_s_inv_baitmeat01x_group`)
RequestImap(-1656346086)
RequestImap(-597695075)
RequestImap(-1159690567)
RequestImap(`lag_bs_s_oatcakes01x_group`)
RequestImap(`lag_bs_s_wormcan01x_dressing`)
RequestImap(-1033632314)
RequestImap(59954835)
RequestImap(-98843293)
RequestImap(1928252407)
RequestImap(-1562347907)
RequestImap(1529136698)
RequestImap(-1842411116)
RequestImap(`lak_hidout_trapopen`)
RequestImap(1718863943)
RequestImap(-605128543)
RequestImap(-1395712024)
RequestImap(-1232260252)
RequestImap(-337712376)
RequestImap(`lak_p_multiplayer`)
RequestImap(1404611977)
RequestImap(-2093572127) -- moonshine
--RequestImap(-498256840) -- moonshine
--RequestImap(-1190435787) -- moonshine
RequestImap(291880860) -- moonshine
--RequestImap(1996801454) -- moonshine
--RequestImap(1013712166) -- detonators at shack 2495.53, -418.55, 217.0
RequestImap(2101399188)
------------------------#### END Swamps

------------------------Ranch -2196.76, 700.32, 121.82
RequestImap(2126897368) -- something
--RequestImap(-1221875648) -- ranch on fire
RequestImap(-833857740)
RequestImap(1929440211)
RequestImap(1354870005)
RequestImap(-1718055184)
------------------------#### END Ranch -2196.76, 700.32, 121.82

------------------------Owanjila Dam
--RequestImap(1314976319) -- tons of boxes and shit
------------------------#### END Owanjila Dam

------------------------Fort Wallace
--RequestImap(-1052023588) -- fort wallace debris outside
RequestImap(944314155) --  fort wallace back door
RequestImap(-745087561) -- props around fort
------------------------#### END Fort Wallace

------------------------New Austin Stuff
RequestImap(-456215895) -- Ropes on cactus -3686.13, -3015.65, 4.47
RequestImap(-792369764) -- Posts at -3446.56, -2933.57, -0.31
RequestImap(1647812004) -- Stuff at Twin Rocks -3960.47, -2143.11, -5.3
RequestImap(-1411225477) -- Ropes on trees -5720.89, -3499.97, -23.13
RequestImap(`amb_gap_16_ropeends`) -- Something at -5628.7, -2681.54, -0.95
RequestImap(1312163721) -- Something near a tent -5995.78, -3259.3, -21.63
RequestImap(1843301309) -- Something at -6258.29, -3565.07, -32.39
RequestImap(1311508924) -- Crates at -5089.39, -2530.69, -11.11
RequestImap(1128425273) -- Barrels at -5089.39, -2530.69, -11.11
RequestImap(306939642) -- Camp at -2716.05, -2375.02, 44.71 floating due to missing ipl
RequestImap(-1255088882) -- Camp at -2716.05, -2375.02, 44.71
RequestImap(1405502979) -- random shit at -4644.34, -3329.68, 26.34
RequestImap(-1218790373) -- something relating to -3690.76, -3565.35, 49.05
RequestImap(-2105071972) -- something to do with house at -5089.39, -2530.69, -11.11
--RequestImap(1527084472) -- something to do with house at -5089.39, -2530.69, -11.11
RequestImap(1635537886) -- something to do with house at -5089.39, -2530.69, -11.11
RequestImap(-1121783372) -- the actual house at -5089.39, -2530.69, -11.11
RequestImap(874022542) -- something to do with house at -5089.39, -2530.69, -11.11
RequestImap(552030279) -- something to do with house at -5089.39, -2530.69, -11.11
RequestImap(-1639384288) -- something to do with house at -5089.39, -2530.69, -11.11
RequestImap(-1141831946) -- Wagon at -5585.02, -3311.19, -22.11
RequestImap(-1535282356) -- Wagon at -3716.76, -3601.13, 46.91
RequestImap(1480174383)
RequestImap(495423143)
RequestImap(-1537525865)
RequestImap(-2071756699)
--RequestImap(-1781758360)
--RequestImap(1184975829) -- boulders blocking canyon
--RequestImap(2094371528)
RequestImap(1688216398)
RequestImap(-1802096589)
RequestImap(669655585)
RequestImap(-58196573)
RequestImap(-895099271) -- scarlet fever
--RequestImap(-2060408070) -- scarlet fever
RequestImap(364962188)
RequestImap(556610581)
RequestImap(-1394479903)
RequestImap(-786679704)
RequestImap(-596115807)
RequestImap(`bep_01_cc_graffiti`)
RequestImap(-1484676996)
RequestImap(472339111)
RequestImap(-262371610)
RequestImap(1123990218)
RequestImap(-1461922204)
RequestImap(-1519499946)
RequestImap(-535498894)
RequestImap(`two_01_cc_graffiti`)
RequestImap(25328693)
--RequestImap(-2118853492) -- cemetary near armadillo
--RequestImap(-597126658) -- cemetary near armadillo
RequestImap(158063004) -- cemetary near armadillo
RequestImap(1713084298) -- cemetary near armadillo
RequestImap(928528900) -- cemetary near armadillo
--RequestImap(391022529) -- cemetary near armadillo
--RequestImap(1870870569) -- cemetary near armadillo
------------------------#### END New Austin Stuff

------------------------Lemoyne Stuff
RequestImap(143994875) -- Dismembered horse in cart 2276.14, -542.22, 42.67
RequestImap(-531198053) -- big ass snake 1763.28, -559.6, 43.51
RequestImap(841781567) -- dismembered horse in cart 1974.99, -675.75, 43.52
--RequestImap(2075691867) -- dismembered horse 2098.08, -358.84, 41.64
RequestImap(1270535492)
RequestImap(1412515639) -- caravan at 1300.11, -1136.99, 82.29
------------------------#### END Lemoyne Stuff

------------------------Single Player Graves
RequestImap(-449454773) -- Hosea and Lenny Graves 2576.89, -628.63, 43.65
RequestImap(1308321372) -- Hosea and Lenny Graves 2576.89, -628.63, 43.65
RequestImap(516308968) -- Sean MacGuire Grave 673.13, -974.29, 54.39
--RequestImap(-1798733774) possibly low honor arthur grave? 800.23, 1777.86, 281.51
RequestImap(677191274) -- Eagle Flies Grave maybe? 512.78, 1932.38, 200.94
RequestImap(-2011620387) -- Davey Callander -1306.55, 2468.21, 310.22
RequestImap(579127040) -- Jenny Kirk -1278.49, 2896.35, 386.72
RequestImap(-1010679388) -- Susan Grimshaw 2156.49, 795.04, 157.31
RequestImap(`dis_scm_00_kieran_grave`) -- Kieran Duffy 1735.34, -1894.84, 45.86
RequestImap(-1754541271) -- Arthur Morgan 795.13, 1777.76, 281.42
RequestImap(-1363999915) -- Flowers at Arthur's Grave
--RequestImap(-163883900) -- Arthur Morgan 795.13, 1777.76, 281.42
RequestImap(-1116430120)
RequestImap(-1369880946)
--RequestImap(292369320)
RequestImap(539566709)
RequestImap(739567292)
--RequestImap(729601893)
RequestImap(1128276345)
------------------------#### END Single Player Graves

------------------------Carving in Mountain
--RequestImap(1121956769) -- Carving on side of mountain 1259.39, 1293.1, 213.28
--RequestImap(-340622004) -- Carving on side of mountain 1259.39, 1293.1, 213.28
--RequestImap(510716616) -- Carving on side of mountain 1259.39, 1293.1, 213.28
RequestImap(1464851585) -- Carving on side of mountain 1259.39, 1293.1, 213.28
RequestImap(1763246099) -- Lower Scaffolding
RequestImap(920427419) -- Upper Scaffolding
------------------------#### END Carving in Mountain

------------------------House at -1551.33, 253.69, 114.8 --building has imaps impacting interior needs work removed house until sorted
RemoveImap(258104717) -- house interior -1551.33, 253.69, 114.8
RemoveImap(-76700394) -- house interior -1551.33, 253.69, 114.8 --possibly uneeded
RemoveImap(-37875204) -- Main Building
RemoveImap(141366309)
RemoveImap(686601882)
RemoveImap(1861460906)
RequestImap(-1079295176) --ground area for house
RequestImap(`shack_b_a`) -- may be ground related
RequestImap(1044079550) --some plant life

--RequestImap(1614255891) -- remove planks outside house-1551.33, 253.69, 114.8
------------------------#### END House at -1551.33, 253.69, 114.8

------------------------House at -561.17, 2697.11, 319.4
RequestImap(983546059) -- house shelter at -561.17, 2697.11, 319.4
RequestImap(-739334986) -- house at -561.17, 2697.11, 319.4
RequestImap(`col_01_chimney_smoke_effect`) -- house at -561.17, 2697.11, 319.4
RequestImap(-1019727725) -- house at -561.17, 2697.11, 319.4
RequestImap(-78852126) -- house at -561.17, 2697.11, 319.4
RequestImap(992791293) -- grave
RequestImap(-584714922) --chimney maybe
RequestImap(-1513941904) -- something to do with house
------------------------#### END House at -561.17, 2697.11, 319.4

------------------------Fossils
RequestImap(104102416)
RequestImap(-1265903940)
RequestImap(-474761969)
RequestImap(782453481)
RequestImap(203916786)
RequestImap(1891601353)
RequestImap(320262265)
RequestImap(`bone_08`)
RequestImap(-1434912930)
RequestImap(`bone_10`)
RequestImap(-1078418763)
RequestImap(-415281478)
RequestImap(-722949619)
RequestImap(`bone_28`)
RequestImap(-87394864)
RequestImap(-891504611)
RequestImap(-810270260)
RequestImap(`bone_06`)
RequestImap(-2054476413)
RequestImap(`bone_16`)
RequestImap(-1676256391)
RequestImap(`bone_19`)
RequestImap(`bone_20`)
RequestImap(`bone_21`)
RequestImap(`bone_24`)
RequestImap(`bone_00`)
RequestImap(`bone_02`)
------------------------#### END Fossils

------------------------Bacchus
RequestImap(-522767301)
RequestImap(-615794465)
RequestImap(-724540003)
RequestImap(-307327135)
RequestImap(920612809)
RequestImap(-437187151)
RequestImap(820079465)
RequestImap(1424964403)
RequestImap(423891836)
RequestImap(-163787010)
RequestImap(777001839)
RequestImap(-200959126)
RequestImap(-882460089)
RequestImap(1364392658) -- fixed bridge
--RequestImap(1492058366) -- track debris near station
--RequestImap(-794503195) bridge debris from story mode
------------------------#### END Bacchus

------------------------Annesburg
--RequestImap(-1272426249) -- mine entrance blocked
--RequestImap(334535013) -- mine entrance blocked
RequestImap(1713454259) -- interior 2924.21, 1351.93, 44.86
RequestImap(-1417469821) -- blocked door of interior below 2922.8, 1340.88, 44.76
--RequestImap(-1665620584) -- scuffed textureless interior
RequestImap(1798244378)
--RequestImap(-537740003) -- wagon 2940.81, 1359.76, 44.03
--RequestImap(-1584316325) -- wagon 2940.81, 1359.76, 44.03
RequestImap(-1085363933)
--RequestImap(`ann_05_house`) -- house mid construction
RequestImap(-1509154451) -- house completed
--RequestImap(-693132475) -- house pre construction
--RequestImap(-1984145124) -- floating ropes at jetty
RequestImap(-1315256079)
------------------------#### END Annesburg

------------------------Van Horn
RequestImap(1192526031)
RequestImap(1091543855)
RequestImap(1584946069)
RequestImap(`van_02_cc_graffiti`)
RequestImap(-1081335485)
RequestImap(-1176501741)
RequestImap(-2035177903)
--RequestImap(-1147247388)
------------------------#### END Van Horn

------------------------Not quite sure
RequestImap(-737812908) -- Something relating to waterfall at -1060.13, 434.46, 57.57
RequestImap(-1967848432) -- Something at -4414.25, -2193.37, 40.32
RequestImap(132414998) -- Something relating to Bacchus Station
RequestImap(-615961815) -- Something at -1185.85, -1943.66, 44.19
RequestImap(`amb_camp_grz_finale2`) -- Something to do with mountain at -1598.28, 1118.56, 268.33
RequestImap(-76573194) -- some random mountain shit
RequestImap(391171508) -- part of a camp -1530.46, 2097.94, 316.77
RequestImap(-169261100) -- something relating to shack at -1895.82, 1332.77, 200.17
RequestImap(1912754336) -- Something relating to -1397.66, 1145.22, 223.32
RequestImap(`hen_4_rope_ends`) -- Something relating to -2540.43, -2862.12, 71.2
RequestImap(-599973510) -- Something relating to -1431.77, -2681.24, 40.98
RequestImap(-1960392600) -- Something relating to -1436.15, -2679.71, 41.16
RequestImap(`hrt_31_rope_ends`) -- Something relating to 975.35, 987.47, 149.42
RequestImap(-1725459238) -- Something relating to 321.88, 1161.24, 181.93
RequestImap(-1785392621) -- Something relating to 2996.52, 2197.95, 166.27
RequestImap(1529455145) -- Something relating to 1606.84, -761.82, 41.43
RequestImap(`abandonedcamp_talltrees`) -- Something relating to -2133.57, -1793.45, 142.6
RequestImap(`gang_skinaftermath_loc01_01`) -- Something relating to -2207.12, -1584.39, 149.29
RequestImap(`gang_skinaftermath_loc01_02`) -- Something relating to -2207.12, -1584.39, 149.29
RequestImap(-1789074439) -- Something relating to -2108.66, -1236.64, 126.62
RequestImap(-1852056457) -- Something relating to -2108.66, -1236.64, 126.62
RequestImap(`gang_skinaftermath_loc03_01`) -- Something relating to -2486.54, -1485.69, 148.37
RequestImap(`gang_skinaftermath_loc03_02`) -- Something relating to -2486.54, -1485.69, 148.37
RequestImap(`tall_5_rope_ends`) -- something relating to -2186.91, -1437.8, 137.63
RequestImap(1998087725) -- something relating to -2336.48, 907.23, 158.2
RequestImap(-3571233) -- something relating to 2760.86, -608.46, 41.59
RequestImap(`dis_hrt_animaldig`) -- something relating to 450.6, -75.26, 116.97
RequestImap(1033367448) -- something relating to -775.0, 338.02, 96.44
RequestImap(1717399635) -- something relating to 189.91, -414.36, 87.74
RequestImap(40845437) -- something relating to 189.91, -414.36, 87.74
RequestImap(-363626454) -- something relating to -5082.07, -3893.84, 0.43
RequestImap(1193229750) -- something relating to 2640.7, 0.15, 52.54
RequestImap(-2041779893) -- something relating to 2007.06, 699.69, 179.48
RequestImap(112266538) -- something relating to 2086.3, -388.65, 43.28
RequestImap(-593457329) -- something relating to 2289.86, 100.82, 49.96
RequestImap(1467466015) -- something relating to 1594.57, -110.45, 83.16
RequestImap(-551038153) -- something relating to 1310.91, -581.64, 76.13
RequestImap(-484929865) -- something relating to 1593.39, -1768.64, 52.62
RequestImap(-1453850836) -- something relating to -2298.22, -1664.03, 138.56
RequestImap(-1499162505) -- something relating to -1579.69, 1235.16, 335.89
RequestImap(-624201308) -- something relating to -1497.46, 1251.96, 314.22
RequestImap(-1848077772) -- something relating to -1900.72, 1341.64, 200.92
RequestImap(-436084091) -- something relating to -2558.11, 430.16, 147.25
RequestImap(205214733) -- something relating to -1569.54, 2946.85, 504.37
RequestImap(-78801135) -- something relating to -1782.61, 2924.14, 481.72
RequestImap(1216075674) -- something relating to -1520.42, 509.22, 101.26
RequestImap(-1316886711) -- something relating to -1549.93, 3119.07, 475.97

RequestImap(-518858513) -- something relating to -415.41, 1731.15, 216.25
RequestImap(-528294019) -- something relating to 51.81, 1074.13, 179.15
RequestImap(1708195603) -- something relating to 58.09, 1104.24, 180.13
RequestImap(-205505701) -- something relating to -340.07, -262.13, 90.63
RequestImap(-51262018) -- something relating to -340.07, -262.13, 90.63
RequestImap(`six_point_lights_on`) -- something relating to -44.27, 1231.9, 172.03
RequestImap(-791673850) -- something relating to -299.73, 130.14, 59.5
RequestImap(1585258492) -- something relating to -2392.82, 325.75, 201.71
RequestImap(382484708) -- something relating to 795.79, 855.37, 117.94
RequestImap(350637317) -- something relating to 1407.85, 280.38, 89.48
RequestImap(-1528647119) -- something related to 2962.67, 1965.3, 136.29
RequestImap(-1758697759) -- something related to 2637.48, 636.28, 78.48
RequestImap(591001924) -- something related to 2637.86, 641.96, 76.02
RequestImap(-890900091) -- something related to 2637.86, 641.96, 76.02
RequestImap(-1055775145) -- something related to 1743.34, 1552.96, 158.0
RequestImap(-276247702) -- something related to 2630.8, 587.43, 86.57
RequestImap(`roc_01_garden01_nice`) -- something related to 2998.19, 2198.0, 166.2
RequestImap(883579956) -- something related to 2998.19, 2198.0, 166.2
RequestImap(-1436313374)
RequestImap(334010167)
RequestImap(-676881895)
RequestImap(1331438832)
RequestImap(376665102) -- rhodes
RequestImap(-928815382) -- near saint denis train station
RequestImap(1736837788)
RequestImap(1814624585)
RequestImap(-1613262779) -- near straberry -1770.1, -479.72, 164.66
RequestImap(-1306905398)
RequestImap(339409162)
RequestImap(647011769)
RequestImap(-273633290)
RequestImap(-118635920)
RequestImap(751578549)
RequestImap(446073162)
RequestImap(-588668690)
RequestImap(-242247633)
RequestImap(-1439987356)
RequestImap(-1126224181)
RequestImap(-890895654)

RequestImap(`cen_h`)
RequestImap(-1393565861)
RequestImap(-586415580)
RequestImap(-1960936248)
RequestImap(1251859782)
RequestImap(994786977)
RequestImap(-665831452)
RequestImap(-2074957003)
RequestImap(-612173099)
RequestImap(-1017701936)
RequestImap(-717025835)
RequestImap(2039534767)
RequestImap(979670262)
--RequestImap(-1451954802) -- some weird LOD mountains far north
RequestImap(1290812287)
RequestImap(-626724117)
RequestImap(1623114783)
RequestImap(-64729392)
RequestImap(-523896426)
RequestImap(483041556)

RequestImap(-960397707)
RequestImap(1424082059)
RequestImap(-1939038021)
RequestImap(-1613805696)
RequestImap(801042892)
RequestImap(25498969)
RequestImap(1419819915)
RequestImap(621272158)
RequestImap(422167750)
RequestImap(-1799943886)
------------------------#### Not quite sure

------------------------Train Tracks 1832.83, 877.56, 110.68
--RequestImap(-869788001) -- trees on train tracks
--RequestImap(-691393565) -- trees on train tracks
--RequestImap(-1448947307) -- trees on train tracks
--RequestImap(-1171033418) -- trees on train tracks
--RequestImap(1589293578)
--RequestImap(-487373767)
--RequestImap(341106871)
--RequestImap(-835267464)
--RequestImap(992700940)
--RequestImap(-1324099905)
--RequestImap(1435082664)
--RequestImap(-2091615427)
--RequestImap(227706189)
--RequestImap(-454287921)
--RequestImap(-1997605640)
--RequestImap(2066602358)
--RequestImap(-1374896333)
--RequestImap(1587857798)
--RequestImap(1735860959)
--RequestImap(-109606367)
--RequestImap(441668603)
RequestImap(-797033116) --track related seems fine to leave in
--RequestImap(-455342387) -- track related
--RequestImap(-1407773372) --track related
--RequestImap(2020752077) --track Stumps
--RequestImap(593772301) --track relatedish
--RequestImap(207032563) -- track related
--RequestImap(-1984361543)
------------------------END Train Tracks 1832.83, 877.56, 110.68

------------------------Possibly Invalid
RequestImap(-1279036865) -- doesn't seem to be anything, teleports me underground
RequestImap(-1816233372) -- not sure if valid, teleports me into air
RequestImap(-2097346584) -- some underground box, nothing there
RequestImap(-1626434823) -- another random underground box
RequestImap(-1562607865) -- another random underground box
RequestImap(46370274) -- teleported me into the air, might be invalid?
RequestImap(976641588) -- teleported me into the air, might be invalid?
RequestImap(781058494) -- teleported me way into the air
RequestImap(-1022426685) -- teleported me way into the air
RequestImap(`des_ntvs2_treefall`) -- teleported me into air
--RequestImap(-1465375517) -- maybe causing CTD
--RequestImap(-1859373348) underground planks
RequestImap(558651865) -- way underground
RequestImap(857341300) -- way underground
RequestImap(-1075177706) -- way underground
RequestImap(-826493765) -- way underground
RequestImap(-1852256117)
RequestImap(-522714993)
RequestImap(-1352620713)
RequestImap(2107567819)
RequestImap(1108015391)
RequestImap(-904833761) -- underground
RequestImap(-1554566073) -- underground
RequestImap(510089692) -- underground
RequestImap(-1208336782) -- underground
RequestImap(1415119588) -- underground
RequestImap(1171197889) -- underground
RequestImap(-1377880324) -- underground
RequestImap(-701897747) -- underground
RequestImap(-1356658830) -- underground
RequestImap(1169154818) -- underground
RequestImap(-102239629) -- underground
RequestImap(1507566204) -- underground
RequestImap(-2122297972) -- underground
RequestImap(-1360647871) -- underground
RequestImap(88716961) -- underground
RequestImap(-2051158745) -- underground
RequestImap(488068970) -- underground
RequestImap(409306948) -- underground
RequestImap(-1996105597) -- underground
RequestImap(1017072544) -- underground
RequestImap(-1588780614) -- underground
RequestImap(1857501669) -- underground
RequestImap(2053819138) -- underground
RequestImap(-763069375) -- underground
RequestImap(-1560636071) -- underground
RequestImap(1473078398) -- underground
RequestImap(-421457898) -- underground
------------------------#### END Possibly Invalid

-------------------------------------#### Misc Roadwork ###---

--------## Dakota river Diablo ridge area ###--------
RequestImap(-642132908) -- tree source undamaged (source tree -1182.52, -30.35,42.76 ?)
RemoveImap(-848315456) -- main tree source upright damaged (source tree -1182.52, -30.35,42.76 ?)
RemoveImap(105426297) -- fallen tree stump only (source tree -1182.52, -30.35,42.76 ?)
RemoveImap(-7594117) --main tree source damged upright (source tree -1179.3,-25.3,41.6 ?)
RemoveImap(1388161943) --main broken tree across road source

RequestImap(1777348822) -- sacks at -382.88, 918.75, 118.53
RequestImap(-1824080033) -- House interior at -379.01, 917.94, 118.59
RequestImap(-1818498296) -- barrels and chest below cliff -107.32, 922.87, 177.33
RequestImap(-1773409329) -- "LOOK ON MY WORKS" written on rocks -160.29, 489.7, 104.09
RequestImap(-1111286486) -- "MAKE ME BETTER" - 1996.71, 1791.65, 192.37
RequestImap(-1664053323) -- "MY KINGDOM IS A HORSE" -4431.52, -3874.31, -24.52
RequestImap(-1375030991) -- "BETTER THAN MY DOG" 3588.54, 1411.09, 41.46
RequestImap(531960211)  -- "I STILL SEEK MORE" -2317.47, -473.88, 140.78
RequestImap(1454866069) -- "RUN RUN RUN" -1582.84, 927.15, 84.75
RequestImap(1497923922) -- Ropes at cliff -8.14, 537.49, 149.78
RequestImap(-563006151) -- Underground canoe -699.83, 107.45, 45.19
RequestImap(`blu_2_rope_end`) -- Ropes on trees 2248.65, -288.99, 42.77
RequestImap(1239191982) -- Supplies at Flatneck Station
RequestImap(948877318) -- Supplies at Flatneck Station
RequestImap(-1872364931) -- Debris at 1546.02, -691.78, 48.26
RequestImap(-368895393) -- Wagon and stuff at -2016.2, -1828.6, 114.19
RequestImap(1991621063) -- Cowboy Squirrel on mountain... -1981.07, 24.45, 333.12
RequestImap(-1314125880) -- Random Junk at -1328.93, 137.4, 76.44
RequestImap(-953275122) -- Random Junk at -2253.63, -617.71, 163.4
RequestImap(1145227353) -- Demonic Ritual shit at -2902.92, -252.1, 186.82
RequestImap(1915867459) -- Gorilla at -1712.68, 75.22, 140.91
RequestImap(-1047394327) -- US Mail Wagon at 180.88, 1303.58, 178.95
RequestImap(-591921971) -- Horse carcass on mountain -1774.78, 2756.92, 600.1
RequestImap(`dis_grz_00_frozencamp01`) -- Horse carcass and supplies on mountain -1597.63, 1841.3, 299.35
RequestImap(`dis_grz_00_frozencamp02`) -- Fence shit -973.86, 2663.76, 321.0
RequestImap(-820486040) -- Tree stump at -1228.66, 1668.75, 344.0
RequestImap(98482444) -- target practice shit 808.29, 2300.95, 251.79
RequestImap(26932594) -- Barrel at 546.19, 1792.98, 128.86
RequestImap(-1930879809) -- Bird Nest 1173.43, 1685.6, 355.74
RequestImap(`dis_scm_cc_graffiti`) -- shipwreck at 392.76, -1259.23, 41.39
--RequestImap(-860750371) -- Flying skeleton outside of the actual game world
--RequestImap(-697003681) -- underground grave below 2405.03, 1371.47, 126.59
--RequestImap(658964321) -- overturned wagon 2812.62, 989.91, 53.55
RequestImap(-755250900) -- traveling circus wagons -1749.86, -1628.42, 90.41s
RequestImap(1262164851) -- Dirt Mounds at -2262.2, -1437.54, 139.7
--RequestImap(-620856989) -- Dirt Mounds at -2262.2, -1437.54, 139.7
RequestImap(-1815023148) -- Grave 483.76, 2178.01, 244.31
--RequestImap(-537757838) -- Closed Cellar Doors 1934.39, 1938.8, 265.45
RequestImap(1575123584) -- Open Cellar Doors 1934.39, 1938.8, 265.45
RequestImap(-724913398) -- Treehouse ladder down at -2460.1, 837.0, 142.44
--RequestImap(-1950049852) -- Treehouse ladder up at -2460.1, 837.0, 142.44
RequestImap(-262759679) -- corpse inside outhouse -1512.02, 1250.52, 313.9
RequestImap(-1754970007) -- crashed wagon debris -1498.66, -556.29, 132.88
--RequestImap(1364276294) -- crashed wagon debris -1498.66, -556.29, 132.88
--RequestImap(1986073536) -- floating props -73.77, -313.69, 90.54
--RequestImap(-835014781) -- floating props -73.77, -313.69, 90.54
--RequestImap(2144414063) -- wagon crash at -1761.57, 270.44, 119.27
RequestImap(1108743226)  -- wagon crash at -1761.57, 270.44, 119.27
RequestImap(-2042475701) -- wagon crash at -2761.4, -157.79, 151.97
--RequestImap(-198101911) -- wagon crash at -2761.4, -157.79, 151.97
RequestImap(1358414393) -- wagon crash at -718.98, -755.86, 50.81
--RequestImap(672931117) -- wagon crash at -718.98, -755.86, 50.81
--RequestImap(1182205549) -- some shit inside overturned stagecoach -1171.25, -9.96, 41.46
--RequestImap(-1614141377) -- overturned stagecoach -1171.25, -9.96, 41.46
--RequestImap(45121961) -- overturned stagecoach -1171.25, -9.96, 41.46
--RequestImap(2095421392) -- overturned stagecoach detonator -1171.25, -9.96, 41.46
RequestImap(-846371468) -- barrels broken on shore -1175.15, 296.68, 41.26
--RequestImap(-270704741) -- some tree shit -1540.28, 592.7, 109.16
RequestImap(222513322) -- animal carcass -1639.6, 581.98, 124.59
RequestImap(461989174) -- animal remains -1528.72, 606.51, 110.41
RequestImap(1492183352) -- destroyed house -2106.73, 1843.37, 255.24
RequestImap(1260721433) -- cabin fixed door frame -2369.32, 469.8, 132.26
--RequestImap(642301973) -- cabin broken door frame -2369.32, 469.8, 132.26
RequestImap(-622475043) -- cabin chimney smoke -1815.41, 657.56, 140.39
RequestImap(1138093977) -- grave -1824.08, 656.7, 132.09
--RequestImap(339111695) -- loose roof tiles -396.65, 1724.24, 222.9
RequestImap(1733948592) -- barn at 207.43, 987.12, 191.11
RequestImap(634831342) -- barn at 207.43, 987.12, 191.11
RequestImap(-943891161) -- barn at -875.22, 332.55, 95.79
RequestImap(-914406102) -- barn at -875.22, 332.55, 95.79
RequestImap(1855900423) -- house at -821.62, 345.89, 97.75
RequestImap(-1809571159) -- barn -1095.87, 700.46, 103.96
RequestImap(1531008020) -- cross with goat skull and wheel 368.74, 1444.86, 177.82
RequestImap(1750312025) -- cross with goat skull and wheel 1514.9, 438.32, 89.88
RequestImap(582879672) -- cross with goat skull and wheel 2928.25, 1296.81, 44.49
RequestImap(-952533419) -- cross with goat skull and wheel 2901.8, 636.29, 56.22
RequestImap(945532872) -- cross with goat skull and wheel -1964.72, -1608.74, 116.22
RequestImap(-2043326480) -- cross with goat skull and wheel -1737.21, -414.28, 155.0
RequestImap(1858796535) -- cross with goat skull and wheel -743.7, -1247.25, 43.45
RequestImap(2079207010) -- cross with goat skull and wheel -2501.77, -2443.54, 60.16
RequestImap(-1360840312) -- cross with goat skull and wheel 2666.3, -1467.41, 46.31
--RequestImap(23211744) -- trees blocking road north of valentine
RequestImap(1672215059) -- trees lining same road
RequestImap(604668055) -- fallen trees near same road
RequestImap(-1177027698) -- fallen trees near same road
--RequestImap(-2106432785) -- part of a fence a gate in a field 238.37, -32.41, 103.78
RequestImap(-1233192626) -- corpse in coffin -989.42, 1691.35, 243.77
--RequestImap(453346329) -- ground around corpse in coffin -989.42, 1691.35, 243.77
RequestImap(1190000937) -- crates outside house -48.38, 1225.32, 171.61
--RequestImap(-1835067413) -- boarded up mine 2282.05, 1198.56, 109.07
--RequestImap(-1392150519) -- boarded up mine 2282.05, 1198.56, 109.07
RequestImap(-389510791) -- chimney smoke 781.75, 850.81, 118.97
RequestImap(-910880980) -- props 781.75, 850.81, 118.97
--RequestImap(-411006854) -- sandbags etc in fort 2452.55, 294.08, 70.22
RequestImap(1133453602) -- ladder in barn 1178.15, 428.83, 92.78
RequestImap(1968676233) -- pre lion mission 1385.04, 343.94, 87.56
--RequestImap(2112594812) -- post lion mission 1385.04, 343.94, 87.56
RequestImap(-1625703283) -- barn 1625.97, 820.33, 144.7
RequestImap(`i_12_native_01`) -- army camp 1393.78, 1312.38, 164.61
RequestImap(1628851253) -- army camp 1393.78, 1312.38, 164.61
RequestImap(-703127827) -- army camp 1393.78, 1312.38, 164.61
RequestImap(-1933338814) -- army camp 1393.78, 1312.38, 164.61
RequestImap(`nat_native1_army_01`) -- army camp 790.24, 1510.27, 204.46
RequestImap(-1653831205) -- lamp 2533.96, 814.12, 75.35
RequestImap(-1307469679) -- hole in ground 2393.52, 1057.26, 82.19
--RequestImap(-2092712551) -- covered hole in ground 2393.52, 1057.26, 82.19
--RequestImap(-1595003151) -- something invisible 2934.12, 1982.42, 144.55
RequestImap(-1207658444) -- balloon crash 2485.79, 105.09, 45.04
RequestImap(585407854) -- chimney smoke 2992.21, 2192.83, 172.41
--RequestImap(`roc_01_garden01_die`) -- rocks 2980.72, 2192.3, 166.38
RequestImap(537424819) -- Strawberry / Pronghorn Sign -2300.12, -317.93, 156.63
RequestImap(2038589758) -- Strawberry / Pronghorn Sign -2646.41, 205.36, 153.42
--RequestImap(`sds_well_cover`) -- covered well -2094.59, -1900.1, 114.09
--RequestImap(77337110) -- burning cabin -2371.56, -1594.17, 153.93


RequestImap(1749008611) -- cabin -1398.47, -215.33, 102.33
RequestImap(898257133) -- cabin curtains
--RequestImap(1943484686) -- trashed cabin interior
--RequestImap(2056603274) -- trashed cabin interior
--RequestImap(758066107) -- something inside cabin above
RequestImap(-1560816708)-- something inside cabin above
RequestImap(1202346365)-- something inside cabin above
RequestImap(-1995054197) -- lighting inside cabin above
RequestImap(-1623126047) -- lighting inside cabin above
RequestImap(2111695903) -- something near cabin above
RequestImap(-1947695052) -- something near cabin above
RequestImap(-1321905459) -- something near cabin above
RequestImap(-826466486) -- something near cabin above
RequestImap(-593183975) -- something near cabin above
RequestImap(1433203214) -- something near cabin above
--RequestImap(-362883443) -- something near cabin above
RequestImap(-1559513478) -- lighting near cabin above
RequestImap(823583740) -- crates near cabin above
RequestImap(-630275010) -- campfire near cabin above
RequestImap(-164693058) -- campfire near cabin above
RequestImap(118201723) -- campfire near cabin above
RequestImap(458453080) -- campfire near cabin above
RequestImap(-1385360243) -- campfire near cabin above
RequestImap(-1288790000) -- campfire near cabin above
--RequestImap(-380287375) -- logging camp -1358.32, -198.43, 101.79
RequestImap(281153830) -- logging camp -1358.32, -198.43, 101.79
RequestImap(1739101350) -- logging camp -1358.32, -198.43, 101.79
RequestImap(-1047158045) -- logging camp -1358.32, -198.43, 101.79
--RequestImap(42081460) -- logging camp -1358.32, -198.43, 101.79
--RequestImap(-125588314) -- uncut trees
--RequestImap(-1340001373) -- uncut trees
--RequestImap(-2116397290) -- uncut trees
--RequestImap(-922917541) -- uncut trees
--RequestImap(1524580507) -- uncut trees
--RequestImap(204481342) -- uncut trees
RequestImap(870580095) -- logging camp -1358.32, -198.43, 101.79
RequestImap(767505137) -- logging camp -1358.32, -198.43, 101.79
RequestImap(1815262278)
RequestImap(588062093)
RequestImap(471934509)
RequestImap(995675696)
RequestImap(706423733)
--RequestImap(82084523)
--RequestImap(-1466172032) -- grass at logging camp
--RequestImap(-981873755) -- grass at logging camp
--RequestImap(2013143748) -- grass at logging camp
--RequestImap(-2139410267)  -- grass at logging camp
--RequestImap(1289178060) -- shrubs at logging camp
--RequestImap(138913863)
--RequestImap(-90108678)
--RequestImap(504746979) -- logging camp
--RequestImap(1511919645)
--RequestImap(-634291786) -- collapsed roof at logging camp
--RequestImap(-2045964586) -- end of train line 1811.29, 861.24, 110.09
RequestImap(-1926989471) -- shack 2185.01, 881.37, 113.42
RequestImap(-948615309) -- junk outside shack above
--RequestImap(66382979) -- tents by above shack
RequestImap(-141795616) -- scraps from bear kill maybe? -1528.51, 606.72, 110.45
RequestImap(1705957630) -- pig shit -72.83, -396.69, 71.59
RequestImap(2002353235) -- pig shit -72.83, -396.69, 71.59
RequestImap(1111495201) -- pig shit -72.83, -396.69, 71.59
RequestImap(-354071784) -- pig shit -72.83, -396.69, 71.59
RemoveImap(-1226747327) -- pile of sticks -1521.5, 507.71, 101.23
RequestImap(-1408478050)
RequestImap(-1974746920)
RequestImap(1171226610)
RequestImap(406701199)
RequestImap(-1151968796)
RequestImap(1975720265)
RequestImap(508578717)
RequestImap(-848533860)
RequestImap(-2103414139)
RequestImap(771896020)
RequestImap(895825612)
RequestImap(1256749990)
RequestImap(728379187)
RequestImap(375693548)
RequestImap(1636184722)
RequestImap(371690004)
RequestImap(-276524767)
RequestImap(728046625)
RequestImap(-929277449)
RequestImap(1092530042)
RequestImap(-492341871)
RequestImap(-15009406)
RequestImap(-604091710)
RequestImap(-2131576785)
RequestImap(-2137016051)
RequestImap(1193151399)
RequestImap(-1353871107)
RequestImap(2026630914)
RequestImap(-225844616)
RequestImap(-1202265833)
RequestImap(-1781252352)
--RequestImap(651621232) -- overgrown grass at ranch 1444.5, -1577.04, 71.54
RequestImap(418666411) -- bushes at ranch 1444.5, -1577.04, 71.54
RequestImap(-559257162) -- grass at ranch 1444.5, -1577.04, 71.54
RequestImap(1133172356) --  ranch 1444.5, -1577.04, 71.54
--RequestImap(-677362237) -- random floating shit -785.75, -602.02, 51.54
RequestImap(-846230557)
RequestImap(1736386364)
--RequestImap(-1912028958)
RequestImap(563944718)
RequestImap(-1532653291)
RequestImap(1873580721)
RequestImap(1706906210)

RequestImap(894787561)
RequestImap(-758463889)
RequestImap(1601053042)
RequestImap(952753807)
RequestImap(187740801)
RequestImap(-1965378386)
RequestImap(-2116659774)
RequestImap(-893624314)
RequestImap(985448695)
RequestImap(`carni_nbd_kittykitty_brokewagon01`) -- toppled circus wagons
RequestImap(580700069) -- toppled circus wagons
RequestImap(1347068672) -- toppled circus wagons
RequestImap(943998860) -- toppled circus wagons
RequestImap(-750963311)
--RequestImap(-886310806)
RequestImap(1926336063)
RequestImap(-800534102)
RequestImap(-693870347)
RequestImap(-877653131)
RequestImap(1335714585)
RequestImap(-1382351182)
RequestImap(-688890765)
RequestImap(-313992757)
RequestImap(643415268)
RequestImap(1401474740)
RequestImap(516817794)

RequestImap(-926795318) -- random tree
RequestImap(-1276109918)
RequestImap(-1386423483)
RequestImap(-1331593143)
RequestImap(-1405375965)
RequestImap(1881774051)
RequestImap(912202325)
RequestImap(`bone_01`)
RequestImap(-1466175146)
RequestImap(-1023331176)
RequestImap(-276524767)
--RequestImap(`n_1114_watertower01_feud1`)
RequestImap(-1218507547)
RequestImap(483731764)
RequestImap(289521398)
RequestImap(1883534212)
RequestImap(209919309)
RequestImap(-166639526)
RequestImap(1915768280)
RequestImap(-105525329)
RequestImap(612040624)
RequestImap(-1176903838)
RequestImap(-1389718656)
--RequestImap(-958046355) -- white boxes in rhodes
--RequestImap(2107657444) -- white boxes in rhodes
RequestImap(-2023595928) -- white boxes in rhodes
RequestImap(-759698431)
--RequestImap(-406964748) -- closed signs rhodes saloon
RequestImap(481636996) -- window bars rhodes bank
RequestImap(-1671953459) -- window bars rhodes gunsmith
--RequestImap(910941329) -- scuffed textureless bathroom rhodes saloon

-- Rhodes Bank - Wall Intact
RequestImap(518127510) --Rhodes bank brick hole filler
-- Rhodes Bank - Wall Blown Up
RemoveImap(758684739) -- rhodes bank wall exterior
RemoveImap(-661825463) -- rhodes bank wall possibly blast damage


RequestImap(1343484786)
--RequestImap(1033721560) -- road blocked rhodes
--RequestImap(1989074279) -- road blocked rhodes
RequestImap(349486662)
RequestImap(1603294144)
RequestImap(-1754425204)
RequestImap(-1036501021) -- rhodes trapper
RequestImap(1871051363)
RequestImap(945502524)
--RequestImap(-1436188587) -- rhodes gen store sign
--RequestImap(-468702164) -- rhodes gen store sign
RequestImap(-687151759)
--RequestImap(1882605165) -- fencer caravan
RequestImap(869642051) -- fencer caravan
RequestImap(-184821200) -- caravan near rhodes
--RequestImap(-490818122)
--RequestImap(1907352897)
RequestImap(1700234797)
RequestImap(-708550718)
RequestImap(-1377139506)
RequestImap(767293177)
RequestImap(1706509616)

--[[
function DrawTxt(str, x, y, w, h, enableShadow, col1, col2, col3, a, centre)
    local str = CreateVarString(10, "LITERAL_STRING", str, Citizen.ResultAsLong())
   SetTextScale(w, h)
   SetTextColor(math.floor(col1), math.floor(col2), math.floor(col3), math.floor(a))
   SetTextCentre(centre)
   if enableShadow then SetTextDropshadow(1, 0, 0, 0, 255) end
   Citizen.InvokeNative(0xADA9255D, 10);
   DisplayText(str, x, y)
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(5)
        local playerPed = PlayerPedId()
        DrawTxt("Press [ENTER] if you like titties", 0.50, 0.90, 0.6, 0.6, true, 255, 255, 255, 255, true, 10000)
        if IsControlJustReleased(0, 0xC7B5340A) then
            local isValid, position, heading = Citizen.InvokeNative(0x9C77964B0E07B633, 1785810071, Citizen.PointerValueVector(), Citizen.PointerValueFloat(), Citizen.ResultAsInteger(), Citizen.ReturnResultAnyway())
            if isValid then
              local ped = PlayerPedId()
              SetEntityCoords(ped, position)
              SetEntityHeading(ped, heading)
            end
        end
    end
end)
]]
-------------------------------------------------------------------------------------
-----------------##campaign camp 1---------------
---there are at least 3 variants some imaps call multiple items based on a particular variant.---
--needs to have correct combinations identified by variant at some point.

RemoveImap(633503129) --props near blue cart?
RemoveImap(-1795618779)-- ground cover pre camp maybe?
RemoveImap(-927211837) --props relating to crashing camp
RemoveImap(1707393029) -- related to crashing camp. maybe props
RemoveImap(1381006186) --Flap on tent( tent at -130.36,-31.63,96.18)
RemoveImap(-441619793) --related to  camp.. possibly props
RemoveImap(140744122) -- un-needed props?
RequestImap(-1177590512) --alot of linked imaps in the camp...appears to be a variant set
RemoveImap(1267297807) --some camp variant  supply wagon no cover?
RequestImap(-182995231) -- open supply wagon variant with a table
RemoveImap(1103365569) -- related to camp Unknown
RemoveImap(-1873685184)--related to camp Unknown
RemoveImap(-1536198599) --related to camp Unknown
RemoveImap(-697307430) --related to camp Unknown
RemoveImap(-710911638) --props. def near blue cart timeline variant
RemoveImap(-942555699) --more props near blue cart. timeline variant
RemoveImap(-760097927) -- related to  camp
RemoveImap(607574432) --related to camp
RemoveImap(-1563072795) --related to camp maybe a prop
RequestImap(825179479) --bluewagon with awning variant
RemoveImap(-293283707) -- related to crashing camp maybe props
RemoveImap(-539928451) --same as above props
RemoveImap(1526869387) --same as above props
RemoveImap(213881095) --same ads above props
RemoveImap(2122708114) --same as above
RemoveImap(-1031045988) --same as above
RemoveImap(1108342912) --same as above
RemoveImap(976283842) --same as above
RemoveImap(736578607) --same as above
RemoveImap(478657470) --same as above
RemoveImap(-355608501) --same as above
RemoveImap(957052101) --same as above
RemoveImap(123244896) --same as above
RemoveImap(607173790)-- barrel with shaving stuff on it
RemoveImap(-520400509) --floating barrel no one likes those set to remove
RemoveImap(-1920340119) -- crashing camp props under open air tent
RemoveImap(-1576393943) --colliding open air tent
RemoveImap(-413795019) --in crashing camp assuming safe as related to props in collided open air tent
RemoveImap(288413571) -- coliding carpert on barrel set to removed
RemoveImap(-2037661155) --part of barrel prop above
RequestImap(-1150137955) --chicken coop in camp
RemoveImap(-1559012672) -- underground imap
RemoveImap(-1954657946) --stool/fishing nearby rocks
RemoveImap(`hso_companion_homerob01`) --props
RemoveImap(-110381721) --stuff by a rock
RemoveImap(`hso_companion_hunt02`) --prop under open air tent
RemoveImap(-2125611324) --something near horse hitch
RemoveImap(1453569688) --chair at table seemed out of place? so set removed
RequestImap(-80564929) --hay on ground by the 2 wagons
RemoveImap(1157066259) --something with large tent set removed
RemoveImap(1720188956) --something with large tent set removed
RemoveImap(1475953931) --somthing with large tent set removed
RemoveImap(-1166561064) --something in large tent set removed
RemoveImap(-1365193577) --something with large tent set removed
RemoveImap(300868838) --something with large tent set removed
RemoveImap(-316909020) --something with large tent set removed
RemoveImap(172011504) --carpeting in  large tent set removed
RequestImap(-1788578071) --large tent variant open but closed flaps
RemoveImap(-1962893335) --Open variant of large tent open both sides
RemoveImap(1351589798) --something with collided tent set removed
RemoveImap(1457661960) -- appears to be remainder of closed variant
RemoveImap(163126540) --Aframe tent related possible collision
RemoveImap(-1620486708) --Aframe tent related posible collision
RemoveImap(-223906810) --aframe related possible collison
RemoveImap(2015311123) --something causing collision with the 2 wagons set removed
RemoveImap(1808508475) --something causing collision with the 2 wagons set removed
RemoveImap(-379409079) --model for one of the 2 wagons (-108.4,-39.52,95.75)
RemoveImap(-102951407) --lantern on pole at large table
RequestImap(1998041523) --lantern on ground by rock
RemoveImap(-1114426126) --Aframe Tent related
RemoveImap(-1971474291) --Aframe Tent related
RemoveImap(-1687561002) --Aframe Tent related
RemoveImap(-1425946870) --Aframe Tent related seems to be front flap related possibly a closed variant
RemoveImap(1957225320) -- Aframe tent related seems to be something with the actual canvas variant
RequestImap(-860696938) --Aframe primary small canvas shell open nop framework
RemoveImap(-1893724593) --prop..seems fine
RemoveImap(394987827) --ground related perhaps?
RemoveImap(-937893311) --ground related perhaps
RemoveImap(321670654) --ground related perhaps
RemoveImap(-1916602073) --seat variant for round table at center of camp
RemoveImap(-1611076340) --ground related perhaps
RemoveImap(1079303588) --map on side of tent/wagon
RequestImap(`hso_p_camp_02`) --barrels and props around large tent and elsewhere around camp
RemoveImap(-159819388) --weird poly model of supply caravan wagon
RemoveImap(-1426249148) --partial uncovered supply caravan
RemoveImap(-1445186253) --sacks at back of supply caravan
RemoveImap(2047954825) --vegetables an props in and on supply caravan
RemoveImap(-2085723453) --something on supply caravan
RemoveImap(1434945142) --something on supply caravan
RemoveImap(658099812) --something on supply caravan
RemoveImap(360721137) --something on supply caravan
RemoveImap(1268291329) --something on supply caravan
RemoveImap(943845492) --something on supply caravan
RemoveImap(-2037324418) --something on supply caravan
RemoveImap(937052178) --something on supply caravan
RemoveImap(698067861) --something on supply caravan
RemoveImap(-741769242) --something on supply caravan
RemoveImap(2019747962) --something on supply caravan
RemoveImap(1785810071) --something on supply caravan
RemoveImap(1423450469) --something on supply caravan
RemoveImap(1189709192) --something on supply caravan
RequestImap(512556003) --lantern on  round table in center
RequestImap(`hso_poker_seats`)  --seats around round table in center
RemoveImap(2022451711)  --buncha messy props in large tent
RemoveImap(-1933895237) --small caravan variant 1
RequestImap(-1987982797) --small caravan variant 2
RemoveImap(-104137172) --small caravan base variant 3
RequestImap(1924209179) --something with small caravan prop in back
RequestImap(-2084193212) --something with small caravan
RequestImap(-838184752) --something with small caravan
RequestImap(-1433138716) --something with small caravan
RequestImap(-1103841944) --something with small caravan
RequestImap(-621941030) --something with small caravan
RequestImap(1782877577) --something with small caravan
RequestImap(-584027313) --something with small caravan
RequestImap(1219098211) --something with small caravan
RequestImap(2097700639) --something with small caravan
RequestImap(728120284) --something with small caravan
RequestImap(1370097763) --something with small caravan
RequestImap(1948051928) --chairs at long table
RequestImap(1548546221) --deer antlers hanging on something i deleted while testing this
RemoveImap(106249677) -- deer antlers on a tree maybe
RemoveImap(1546110128) --props inside a tent
RequestImap(-855912354) --props beside blue wagon (chestvariant 1 collides with another imap if its called together)
RemoveImap(324486076) --props beside blue wagon( carpet)
RequestImap(-2052582076)-- upright table under awning bluecart
RemoveImap(-402976431)--props inside a tent
RemoveImap(1560807181) --bones hanging from tree
RemoveImap(-723982773) --prop by a small fire
RemoveImap(-268335331) --skin on log/log by small fire
RemoveImap(-302735166) --props or lean to related
RemoveImap(-2104773585) --fur rug in Aframe
RemoveImap(2101101756) --skins by small fire on edge of camp
RequestImap(-1472352094) --gator skull on pole/frame
RemoveImap(-2077690059) --prongorn skull by supply caravan
RemoveImap(-15722296) --skull on lean to
RemoveImap(327932996) --props in camp

--------------##end campaign camp 1--------------
--RequestImap(-745860880)
--RequestImap(1219276914)
RequestImap(711016796)
RequestImap(690962168)
RequestImap(384146021)
RequestImap(2082890965)
--RequestImap(-1192199739)
RequestImap(-65072454)
RequestImap(-770240157)
RequestImap(71064384)
RequestImap(-1380983970)
RequestImap(135028740)
RequestImap(-515910704)
RequestImap(398639187)
RequestImap(532770666)
RequestImap(-365969388)
RequestImap(780406120)
RequestImap(1372565859)
RequestImap(1111220101)
RequestImap(-688011628)
--RequestImap(114673428) -- thieves landing gate
RequestImap(1822607116) -- thieves landing gate
RequestImap(216214729)
RequestImap(-87826930)
RequestImap(286801141)
RequestImap(107317036)
RequestImap(-554880142) -- wagon near SP horse guy near rhodes 713.07, -827.1, 49.85


-- Wapati India Reservertion
RequestImap(0x3BD21365)

-- REMOVE FARM PLANTS
RemoveImap(0x6A7C6BF3)
RemoveImap(0x4588A20C)
RemoveImap(0x8B148431) -- Maybe clone and remove grass just in farm land area.
RemoveImap(0x3A695720)
RemoveImap(0x4B806CE9)
RemoveImap(0x5CCF1BEB)
RemoveImap(0x68B433B5)
RemoveImap(0x720E4669)
RemoveImap(0x434568D8)
RemoveImap(0xA06F2332)
RemoveImap(0x8F2D80AF)
RemoveImap(0x15078C5D)
RemoveImap(0x15D90011)
RemoveImap(0xB6BD46F0)
RemoveImap(1811561423)

