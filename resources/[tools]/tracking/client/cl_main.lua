local entitiesToDraw = {}
local itemsToDraw = {}
local vehiclesToDraw = {}

local trackPeds = false
local trackVehicles = false
local trackEntities = false

AddEventHandler('onResourceStop', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        HASH_MODELS = nil
        HASH_PEDS = nil
        HASH_PROVISIONS = nil
        HASH_VEHICLES = nil
        HASH_CARRIABLE = nil
        HASH_SCENARIOS = nil
        HASH_RAW_MODELS = nil
        collectgarbage()
    end
end)

--Citizen.CreateThread(function()
--    while true do
--        Wait(0)
--        DisableControlAction(0, `INPUT_SPRINT`, true)
--        DisableControlAction(0, `INPUT_JUMP`, true)
--    end
--end)

--Citizen.CreateThread(function()
--    while true do
--        Wait(1)
--        local lastMount = Citizen.InvokeNative(0x4C8B59171957BCF7, PlayerPedId())
--        if lastMount then
--            local coords = GetWorldPositionOfEntityBone(lastMount, 225) -- ID_PH_HEART
--            TxtAtWorldCoord(coords.x, coords.y, coords.z, 'x', 0.25, 9, 255)
--            local coords2 = GetWorldPositionOfEntityBone(lastMount, 3) -- skel_pelvis
--            TxtAtWorldCoord(coords2.x, coords2.y, coords2.z, 'x', 0.25, 9, 255)
--            local coords3 = GetWorldPositionOfEntityBone(lastMount, 243) -- MH_BreatheBone
--            TxtAtWorldCoord(coords3.x, coords3.y, coords3.z, 'x', 0.25, 9, 255)
--        end
--    end
--end)

--local seenConfigFlags = {}
--local seenResetFlags = {}
--for n=0,512 do
--    seenConfigFlags[n] = 0
--    seenResetFlags[n] = 0
--end
--Citizen.CreateThread(function()
--    while true do
--        Wait(0)
--        local playerPed = PlayerPedId()
--        DrawTxt('Config Flags | Reset Flags', 0.0, 0.02, 0.3, true, 255, 255, 255, 255, false, 9)
--        local configPrefix = ''
--        local resetPrefix = ''
--        for n=0,512 do
--            local extra = ''
--            if GetPedConfigFlag(playerPed, n) then
--                if PCF[n] then
--                    extra = ' [ ' .. PCF[n] .. ' ],'
--                end
--                configPrefix = configPrefix .. '\n'
--                if seenConfigFlags[n] < 0 then
--                    seenConfigFlags[n] = 0
--                end
--                if seenConfigFlags[n] < 1000 then
--                    seenConfigFlags[n] = seenConfigFlags[n] + 1
--                end
--                if seenConfigFlags[n] > 500 then
--                    DrawTxt(configPrefix .. tostring(n) .. extra, 0.0, 0.02, 0.25, true, 255, 255, 255, 255, false, 9)
--                else
--                    DrawTxt(configPrefix .. tostring(n) .. extra, 0.0, 0.02, 0.25, true, 0, 255, 0, 255, false, 9)
--                end
--            else
--                if seenConfigFlags[n] > 0 then
--                    seenConfigFlags[n] = 0
--                elseif seenConfigFlags[n] < 1000 then
--                    seenConfigFlags[n] = seenConfigFlags[n] - 1
--                end
--                if seenConfigFlags[n] > -500 then
--                    configPrefix = configPrefix .. '\n'
--                    DrawTxt(configPrefix .. tostring(n) .. extra, 0.0, 0.02, 0.25, true, 255, 0, 0, 255, false, 9)
--                end
--            end
--            if GetPedResetFlag(playerPed, n) then
--                if PRF[n] then
--                    extra = ' [ ' .. PRF[n] .. ' ],'
--                end
--                resetPrefix = resetPrefix .. '\n'
--                if seenResetFlags[n] < 0 then
--                    seenResetFlags[n] = 0
--                end
--                if seenResetFlags[n] < 1000 then
--                    seenResetFlags[n] = seenResetFlags[n] + 1
--                end
--                if seenResetFlags[n] > 500 then
--                    DrawTxt(resetPrefix .. tostring(n) .. extra, 0.051, 0.02, 0.25, true, 255, 255, 255, 255, false, 9)
--                else
--                    DrawTxt(resetPrefix .. tostring(n) .. extra, 0.051, 0.02, 0.25, true, 0, 255, 0, 255, false, 9)
--                end
--            else
--                if seenResetFlags[n] > 0 then
--                    seenResetFlags[n] = 0
--                elseif seenResetFlags[n] < 1000 then
--                    seenResetFlags[n] = seenResetFlags[n] - 1
--                end
--                if seenResetFlags[n] > -500 then
--                    resetPrefix = resetPrefix .. '\n'
--                    DrawTxt(resetPrefix .. tostring(n) .. extra, 0.051, 0.02, 0.25, true, 255, 0, 0, 255, false, 9)
--                end
--            end
--        end
--    end
--end)

local watchEntity = false
Citizen.CreateThread(function()
    -- Surrounding Info / Tracking
    while true do
        if watchEntity ~= false then
            Citizen.Wait(500)
            checkEntities(watchEntity)
        else
            Citizen.Wait(1000)
        end
    end
end)

local entity_natives = {
    0x083d497d57b7400f,
    0x0b7cb1300cbfe19c,
    0x0c9dbf48c6ba6e4c,
    0x0ccefc6c2c95da2a,
    0x120376c23f019c6c,
    0x188736456d1dede6,
    --0x1e804ea9b12030a4,
    0x1ff441d7954f8709,
    0x255b6db4e3ad3c3e,
    0x29ba9f78321e5a6c,
    0x2a77ef9bec8518f4,
    0x31fef6a20f00b963,
    0x350e9211074955af,
    0x37b01666bae8f7ef,
    0x383f64263f946e45,
    0x3ab3a77672f6473f,
    0x3ec28da1ffac9ddd,
    0x4735e2a4bb83d9da,
    0x5594afe9de0c01b7,
    --0x5744562e973e33cd,
    --0x582f73acfe969571,
    0x59b57c4b06531e1e,
    0x5affa9ddc87846f8,
    0x5e214112806591ea,
    0x61914209c36efddb,
    0x66b2b83b94b22458,
    0x6888a43c35a5f630,
    0x6bfbdc46139c45ab,
    0x6d58167f62238284,
    0x6f3068258a499e52,
    0x75df9e73f2f005fd,
    0x808077647856de62,
    0x835f131e7dc8f97a,
    0x84ccf9a12942c83d,
    0x857acb0ab4bd0d55,
    0x886171a12f400b89,
    0x88ad6cc10d8d35b2,
    0x8c03cd6b5e0e85e8,
    0x8de41e9902e85756,
    0x8e10df0ffa63fb65,
    0x8e46e18aa828334f,
    0x935a30aa88fb1014,
    0x9587913b9e772d29,
    0x964000d355219fc0,
    0x96c638784db4c815,
    0x9a100f1cf4546629,
    0x9a87ff82fd35822f,
    0xa7e51b53309eac97,
    0xa88e215ceb0435c0,
    --0xaaacb74442c1bed3,
    0xb16c780c51e51e2b,
    0xba2a089e60ed1163,
    0xc2e71d7e0a7b4c89,
    0xc346a546612c49a9,
    0xc8ccdb712fbcba92,
    0xd21c7418c590bb40,
    0xd4636c2edb0dea8a,
    --0xd46bf94c4c66fab0,
    0xd4e5c1e93c466127,
    0xdf8e49ea89a01db1,
    0xdfc2b226d56d85f6,
    0xe12f56cb25d9ce23,
    0xe31fc20319874cb3,
    0xef2d9ed7ce684f08,
    0xf59fde7b4d31a630,
    0xf7424890e4a094c0,
}
local ped_natives = {
    0x0105fee8f9091255,
    0x02aa2096fe00f3e1,
    0x0455546f23ff08e4,
    0x06087579e7aa85a9,
    --0x06a10b4d7f50b0c3,
    0x06fa94c835787c64,
    0x078076ab50fb117f,
    0x095c2277fed731db,
    0x09d7afd3716da8e1,
    0x0bcd4091c8eaba42,
    0x0c31c51168e80365,
    0x0cab404cd2db41f5,
    0x0ceeb6f4780b1f2f,
    0x0d3b1568917ebda0,
    0x0e99e3bf11bb6367,
    0x0ea9eacba3b01601,
    0x0ee3f0d7feccc54f,
    0x0eef7a81c17679db,
    0x101b45c5f56d970f,
    0x10c70a515bc03707,
    0x1148f706cf4ebdda,
    0x118d476a6f1a13f1,
    0x12eb4e31f092c9b3,
    0x134775b093ad5c38,
    0x13a1b061007c906b,
    0x14169fa823679e41,
    0x164cecc59e70df86,
    0x16f2c8c084ab2092,
    0x1d46b417f926d34d,
    0x1e017404784aa6a3,
    0x1f714e7a9dadfc42,
    0x226cf9b159e38f42,
    0x22f2a386d43048a9,
    0x2311f15d971aa680,
    0x242edf85d4e87b65,
    0x243e1b4607040057,
    0x256edd55c6be1482,
    0x268b3aebf032a88d,
    0x273915ce30780986,
    0x27e8a84c12b0b7d1,
    0x285d36c5c72b0569,
    0x290b2e6ccde532e1,
    0x2942457417a5fd24,
    0x29fce825613fefca,
    0x2b02db082258625f,
    0x2ba9d7bf629f920c,
    0x2c76fa0e01681f8d,
    0x2d64376cf437363e,
    0x2dc0e8dcbd3546e9,
    0x2dd4e0e26dfad97d,
    0x30569f348d126a5a,
    0x31167ed4324b758d,
    --0x313778edca9158e2,
    0x31b2e7f2e3c58b89,
    0x31dc8d3f216d8509,
    0x32417cb860a3bdc4,
    0x326f7951ef0d7f75,
    0x331550b212014b92,
    0x336b3d200ab007cb,
    0x33fa048675821da7,
    0x34d6ac1157c8226c,
    0x354ca4dddeec397a,
    0x37056ba2a3fefb31,
    0x3acce14dfa6ba8c2,
    0x3aec4a410ecaf30d,
    0x3bbdd6143ff16f98,
    0x3bdfcf25b58b0415,
    0x3c67506996001f5e,
    0x3d9f958834ab9c30,
    0x3e592d0486dec0f6,
    0x3fcbb5fcfd968698,
    0x40c9155af8bc13f3,
    0x42688e94e96fd9b4,
    0x43e4da469541a9c9,
    0x454ad4da6c41b5bd,
    0x463803429297117c,
    0x4642182a298187d0,
    0x46bf2a810679d6e6,
    0x4912dfe492db98cd,
    0x498f2e77982d6945,
    0x4b19f171450e0d4f,
    0x4c39c95ae5db1329,
    0x4c57f27d1554e6b0,
    0x4d0d2e3d8bc000eb,
    0x4e76cb57222a00e5,
    --0x4f5ebe70081e5a20,
    0x4ff3c2b4e6a196c1,
    0x5064db5083c29921,
    0x50f124e6ef188b22,
    0x5102307ce88798eb,
    0x511f1a683387c7e2,
    0x5203038ff8bae577,
    0x52250b92ea70be3d,
    0x5407b7288d0478b7,
    0x5463c962bc7777c3,
    0x550cb89dd7f4fa3d,
    0x569f1e1237508deb,
    0x56e4bad93d33453c,
    0x56e58d4d118fb45e,
    0x57779b55b83e2bea,
    0x577c60ba06d0ea64,
    0x59643424b68d52b5,
    0x5bf0b9d9a8e227a0,
    0x5c16855277819bbf,
    0x5c6c7c70ca302801,
    0x5da36cccb63c0895,
    0x5e420ff293ee5472,
    0x5e9faf6c513347b4,
    0x5efa8a3d8a60d662,
    0x608bc6a6aacd5036,
    0x610438375e5d1801,
    0x6127f25ed21c533c,
    0x6243635af2f1b826,
    0x62de46f061caa468,
    0x62fdad5e01d2dd47,
    0x62fdf4e678e40cc6,
    0x630e7b01f091a197,
    0x63342c50ec115ce8,
    0x6507ac3bd7c99009,
    0x68821369a2ceadd5,
    0x693126b5d0457d0d,
    0x6b89faa36fc909a3,
    0x6db875afc584fa32,
    0x6e5cbcb3941d7d08,
    0x6f43c351a5d51e2f,
    0x6f46f8acb44c4fc1,
    0x6fb76442469abd68,
    0x7020839c7302d8ac,
    0x753b15ad0fd6f3e3,
    0x7583a9d35248b83f,
    0x758f081db204ddde,
    0x77243ed4f7caaa55,
    0x77525bbf433f2cd6,
    0x7a4e00364b5d727b,
    0x7b5c293238ee4f20,
    0x7bb810e8b343ac7b,
    0x7be607daff382fd2,
    0x7c8aa850617651d9,
    0x7cc2186c32d3540a,
    0x7e02e4218d916b94,
    0x7ee3a8660f38797e,
    0x7f090958ae95b61b,
    0x7f9b9791d4cb71f6,
    0x7fc84e85d98f063d,
    0x802092b07e3b1eea,
    0x825f6dd559a0895b,
    0x82cb0f3f0c7785e5,
    0x833f0053340ef413,
    0x849bd6c6314793d0,
    0x84d0bf2b21862059,
    0x854bc9b1a1ccd034,
    0x86bb5ff45f193a02,
    0x878b68960c1c2a35,
    0x8822f139408b8d0a,
    0x88a5564b19c15391,
    0x88d9d76d78065487,
    0x89816b58c3466262,
    0x89bfdf6d53145545,
    0x8af8e647d6b2a649,
    0x8be24d74d74c6e9b,
    0x8d9bfce3352de47f,
    0x900ca00ce703e1e2,
    0x909ad9e9a92a10df,
    0x913d04a5176f84c9,
    0x917760cfe7a0e0f1,
    0x91a5f9cbebb9d936,
    0x91fe941f9fcfb702,
    0x92c8eaca29f6bed6,
    0x9337183fda2e9035,
    0x936e7cad0ae2ee14,
    0x93ffd92f05ec32fd,
    0x94132d7c8d3575c4,
    0x947e43f544b6ab34,
    0x95b8e397b8f4360f,
    0x9641a9a20310f6b8,
    0x98082246107a6acf,
    0x99a6e246c315bf60,
    0x99df2639da76c1dc,
    0x9b90842304c938a7,
    0x9c54041bb66bcf9e,
    0x9c81338b2e62ce0a,
    0x9d9473cb82d83a30,
    0x9e7738b291706746,
    0xa0774e388ce4a679,
    0xa0bc8faed8cfeb3c,
    0xa180fbd502a03125,
    0xa1fbac56d38563e2,
    0xa218d2bbcaa7388c,
    0xa274f51ef7e34b95,
    0xa29fd00d45311eb7,
    0xa31d350d66fa1855,
    0xa454d234e45bb6e5,
    0xa4ac05b1a364ebc5,
    0xa586fbeb32a53dbb,
    0xa622e66eee92a08d,
    0xa635c11b8c44afc2,
    --0xa9c28516a6dc9d56,
    0xaa9f048dcf69b6dc,
    0xaab86462966168ce,
    0xab643407d0b26f07,
    0xaf61b3cd8c3b82c3,
    0xb05cc690cde8a4a9,
    0xb086c8c0f5701d14,
    0xb0b2c6d170b0e8e5,
    0xb292203008ebbaac,
    0xb29c553ba582d09e,
    0xb346c85d49cc998e,
    0xb655db7582aec805,
    0xb65927f861e7ae39,
    0xb676efda03dada52,
    0xb71b91b398f8f067,
    0xb7dbb2986b87e230,
    0xb8e2d655e1d5bd39,
    0xb91ab3be7f655d49,
    0xba208a8d6399a3ac,
    0xbb3e5370ebb6be28,
    0xbd0e4f52f6d95242,
    0xbd6b242b8bd5543a,
    0xbded916a9f9b0604,
    0xbec65c6049b3219d,
    0xbf5e791bbbf90a3c,
    0xc0940ac858c1e126,
    0xc22aa08a8adb87d4,
    0xc2ef407645beecdc,
    0xc3995d396f1d97b6,
    0xc488b8c0e52560d8,
    0xc48a9eb0d499b3e5,
    0xc48af420371c7407,
    0xc5303f460a40d21d,
    0xc5e7204f322e49eb,
    0xc8d523bf5bbd3808,
    0xca95924c893a0c91,
    0xcb86d3e3e3708901,
    --0xcb8f4c9343ebe240,
    0xcc2b20596e29e4e3,
    0xccb97b51893c662f,
    0xcd66fea29400a0b5,
    0xd0b7aeb56229d317,
    0xd355e2f1bb41087e,
    0xd453bb601d4a606e,
    0xd4d403ea031f351c,
    0xd543d3a8fde4f185,
    0xd55db4466d00a258,
    0xd5fe956c70ff370b,
    0xd7ad3c7ebaf88c92,
    0xdc88d06719070c39,
    0xdc9273d95976ba22,
    0xde3904b22695d9f9,
    0xe33f98bd76490abc,
    0xe4770da1b8ff4fd1,
    0xe4c11f104620ddce,
    0xe76687023d8c8505,
    0xe7687eb2f634abf0,
    --0xe7998fec53a33bbe,
    0xe8d1ccb9375c101b,
    0xe9b168527b337bf0,
    0xeaf682a14f8e5f53,
    0xeb72453b6f5b45b0,
    0xebaac9a750e7563b,
    0xebb208d6ae712c03,
    0xec6935ebe0847b90,
    0xec6b59be445fec51,
    0xeeed8fafec331a70,
    0xef2e6f870783369b,
    0xef3a8772f085b4aa,
    0xf103823ffe72bb49,
    0xf3c873ed0c595109,
    0xf445de8da80a1792,
    --0xf4860514ad354226,
    --0xf60165e1d2c5370b,
    --0xf6a8c4b4a11ae89c,
    0xf6d9e1f3560cbf8e,
    0xf7327acc7a89aef1,
    0xf9331b3a314eb49d,
    0xf97c34c33487d569,
    0xfa8c10dce0706d43,
    0xfb1e7998b8595825,
    0xfc3b580c4380b5b7,
    0xfeab3db4edb236eb,
    0xffcc2db2d9953401,
    0xffde295662405b25,
}
local task_natives = {
    0x00ffe0f85253c572,
    0x01af8a3729231a43,
    0x02ebbb3989b7e695,
    0x0365000d8bf86531,
    0x038b1f1674f0e242,
    0x03d741cb4052e26c,
    0x05a0100ea714db68,
    0x0a98a362c5a19a43,
    0x0c3cb2e600c8977d,
    0x0ccfe72b43c9cf96,
    0x10adfdf07b7dffba,
    0x11c7ce1ae38911b5,
    0x11cd066f54da0133,
    0x152664aa3188b193,
    0x1948bbe561a2375a,
    0x1ac5a8ab50cfaa33,
    0x1bf9d36a5eaffbae,
    0x1f7a9a9c38c13a56,
    0x22cd2c33ed4467a1,
    0x244430c13ba5258e,
    0x295514f198efd0ca,
    0x2c497bdef897c6df,
    0x2d19bc4df626cbe7,
    0x2d657b10f211c572,
    0x30146c25686b7836,
    0x351f74ed6177ebe7,
    0x370f57c47f68ebca,
    0x3acc128510142b9d,
    0x3f8387db1b9f31b7,
    0x3feb770d8ed9047a,
    0x4687e69d258bbe41,
    0x4eccc2815ca79ae2,
    0x508f5053e3f6f0c4,
    0x559a6f8c5133b4ee,
    0x583ae9af9cee0958,
    0x5952dfa38fa529fe,
    0x59872ea4cbd11c56,
    0x59ae5ca4ffb4e378,
    0x5b4bbe80ad5972dc,
    --0x5c885e0978b6ad60,
    0x5e5d96be25e9df68,
    0x5ea655f01d93667a,
    0x640a602946a8c972,
    0x643fd1556f621772,
    0x6718f40313a2b5a6,
    0x678d3226cf70b9c8,
    0x6afd84aeaa3ea538,
    0x6ba606ab3a83bc4d,
    0x6c269f673c47031e,
    0x6c50b9dccca70023,
    0x6eead6af637da752,
    0x6ef4e31b4d5d2da0,
    0x73f0d0327bfa0812,
    --0x74f0209674864cbd,
    0x756c7b4c43df0422,
    0x78d8c1d4eb80c588,
    0x79197f7d2bb5e73a,
    0x804425c4bbd00883,
    0x8360c47380b6f351,
    0x844ceee428ea35b0,
    0x849791ebbdba0362,
    0x865732725536ee39,
    0x8785e6e40c7a8819,
    0x90703a8f75ee4abd,
    0x908bb14bce85c80e,
    0x916b8e075abc8b4e,
    0x91cb5e431f579ba1,
    0x9420fb11b8d77948,
    0x96c6ed22fb742c3e,
    0x974da3408dec4e79,
    0x9ff5f9b24e870748,
    0xa710dc5d25f8b942,
    0xa9cc7856d52dbd25,
    0xa9e7672f8c6c6f74,
    0xac5045ab7f1a34fd,
    0xb219612b5568e9ec,
    0xb520dbda7fcf573f,
    0xb8f52a3f84a7cc59,
    0xbc864a70ad55e0c1,
    0xbd70108d01875299,
    0xbedbe39b5fd98fd6,
    0xc8b29d18022ea2b7,
    0xcacc2f9d994504b7,
    0xd04241bbf6d03a5e,
    0xd508fa229f1c4900,
    0xdf56a2b50c04dea4,
    0xe116f6f2da2d777e,
    0xe1c105e6bba48270,
    0xe47dd64b9f02677d,
    0xe55478c5edf70ac2,
    0xe62754d09354f6cf,
    0xe6a151364c600b24,
    0xe7bbc4e56b989449,
    0xe9a6400d1a0e7a55,
    0xea31f199a73801d3,
    0xeb67d4e056c85a81,
    0xec7e480ff8bd0bed,
    --0xed1f514af4732258,
    --0xefc4303ddc6e60d3,
    0xefd875c2791ebefd,
    0xf330a5c062b29bed,
    0xf3735acd11acd500,
    0xf3735acd11acd501,
    0xf97f462779b31786,
    0xfdecca06e8b81346,
    0xfe5d28b9b7837cc1,
}
local player_natives = {
    --0x0139637a3bff8b6d,
    0x029884fb65821b07,
    0x0317c947d062854e,
    0x0335106f3acabbed,
    0x03b4b759a8990505,
    0x04d7f33640662fa2,
    0x054473164c012699,
    0x0760d6f70ebcc05c,
    0x0772f87d7b07719a,
    0x0b7803f6f7bb43e0,
    0x0e6846476906c9dd,
    0x0f4eaf69da41af43,
    0x0ff421e467373fcf,
    0x19b2c7a6c34fad54,
    0x1a51bfe60708e482,
    --0x1a6e84f13c952094,
    0x1da5c5b0923e1b85,
    0x1e8099f449abb0ba,
    0x2009f8ab7a5e9d6d,
    0x21091b4beb6376ee,
    0x227b06324234fb09,
    0x22cd23bb0c45e0cd,
    0x27ad7162d3fed01e,
    0x2e1abe627c95ed9b,
    0x2e78d822208e740a,
    0x32348719dced2969,
    0x354f689c4ffaab37,
    0x36e3d8b5a6552fe8,
    0x3813e11a378958a5,
    0x3a6ae4eee30370fe,
    0x3ee1f7a8c32f24e1,
    0x45ab66d02b601fa7,
    0x46fa0ae18f4c7fa9,
    0x51139d8c17b16fbc,
    0x51bea356b1c60225,
    0x57028fd99886f6f9,
    0x57d9991dc1334151,
    0x592f58bc4d2a2cf3,
    0x5b7b97e99f84138b,
    0x5ca6bbd4a7d8145e,
    0x617d3494ad58200f,
    0x621d1b289caf5978,
    0x6614f9039bd31931,
    0x6852288340b43239,
    0x68a0389e0718ac8f,
    0x6c54e69516cc56bd,
    0x72ad59f7b7fb6e24,
    0x73eb2ef2e92d23bf,
    0x747257807b8721ce,
    0x755e08680f21ef30,
    0x7ae93c45ec14a166,
    0x7c803bdc8343228d,
    0x811a748b1be231ba,
    0x8702d9150d9fbb3d,
    0x8e84119a23c16623,
    0x927861b2c08dbea5,
    0x9422743a5ba50e10,
    0xa54000d4bfd90bde,
    0xa62bbaae67a05bb0,
    0xa81d24ae0af99a5e,
    0xa82964b9d8d6a983,
    0xaaed694ce814817f,
    0xab3773e7aa1e9dcc,
    0xad03b03737ce6810,
    0xb15cd2f9932c9ab5,
    0xb16223cb7da965f0,
    --0xb331d8a73f9d2bdf,
    0xb9050a97594c8832,
    0xbea3a6e5f5f79a6f,
    0xbefed69ce8317f91,
    0xc74eb3f2ec169f6b,
    0xc93a9a45430d484e,
    0xccd9b77f70d31c9d,
    0xd1f6b912785bfd35,
    0xd3f7445cea2e5035,
    0xda9d7be231fe865f,
    0xdab6a2fc56b7de65,
    0xde6c85975f9d4894,
    0xdf66a37936d5f3d9,
    0xe022cc1b545f1d9f,
    0xe1d356f5a66d0ffa,
    0xe24c64d9aded2ef5,
    0xe50a67c33514a390,
    0xe631eaf35828fa67,
    0xe7f8707269544b29,
    0xe92261bd28c0878f,
    0xe956c2340a76272e,
    0xea8f168a76a0b9bc,
    0xf49f14462f0ae27c,
    0xf4cb347d7b5eb0fd,
    0xfb6eb8785f808551,
    0xfe0304050261442c,
    0xfe691e89c08937b6,
}
local entity_responses = {}

for _, nativeHash in pairs(entity_natives) do
    local nativeHashString = string.format("0x%2X", nativeHash)
    entity_responses[nativeHashString] = false
end
for _, nativeHash in pairs(ped_natives) do
    local nativeHashString = string.format("0x%2X", nativeHash)
    entity_responses[nativeHashString] = false
end
for _, nativeHash in pairs(task_natives) do
    local nativeHashString = string.format("0x%2X", nativeHash)
    entity_responses[nativeHashString] = false
end
for _, nativeHash in pairs(player_natives) do
    local nativeHashString = string.format("0x%2X", nativeHash)
    entity_responses[nativeHashString] = false
end

function checkEntities(arg1)
    print('============================')
    for key, nativeHash in pairs(task_natives) do
        Citizen.CreateThread(function()
            local result = Citizen.InvokeNative(nativeHash, arg1)
            local nativeHashString = string.format("0x%2X", nativeHash)
            if entity_responses[nativeHashString] ~= result then
                print(nativeHashString, arg1, ' = ', entity_responses[nativeHashString], ' => ', result)
                entity_responses[nativeHashString] = result
            end
        end)
        Citizen.Wait(0)
    end
end

RegisterCommand('watch_entity', function(soruce, args, rawCommand)
    if not (tonumber(args[1]) == nil) then
        watchEntity = tonumber(args[1])
    end
end)

RegisterCommand('unwatch_entity', function(soruce, args, rawCommand)
    watchEntity = false
end)

Citizen.CreateThread(function()
    -- Surrounding Info / Tracking
    while true do
        Citizen.Wait(1)

        if IsDisabledControlJustReleased(2, 0x446258B6) then -- PageUp
            trackPeds = not trackPeds
            trackVehicles = not trackVehicles
        end
        if IsDisabledControlJustReleased(2, 0x3C3DD371) then -- PageDown
            trackEntities = not trackEntities
        end

        if trackEntities then
            local player = PlayerPedId()
            local coords = GetEntityCoords(player)

            -- World - Ground / Walls / Rocks
            -- Below Player
            local shapeTest = StartShapeTestRay(coords.x, coords.y, coords.z, coords.x, coords.y, coords.z - 5.0, 1, 1)
            local rtnVal, hit, endCoords, surfaceNormal, entityHit = GetShapeTestResult(shapeTest)
            if hit > 0 then
                TxtAtWorldCoord(endCoords.x, endCoords.y, endCoords.z, "Standing On: " .. tostring(entityHit), 0.15, 9)
            end

            -- World - Ground / Walls / Rocks
            -- Infront of Player
            local coordsf = GetOffsetFromEntityInWorldCoords(player, 0.0, 2.5, 0.0)
            local shapeTest = StartShapeTestRay(coords.x, coords.y, coords.z, coordsf.x, coordsf.y, coordsf.z, 1)
            local rtnVal, hit, endCoords, surfaceNormal, entityHit = GetShapeTestResult(shapeTest)
            if hit > 0 then
                TxtAtWorldCoord(endCoords.x, endCoords.y, endCoords.z, "1: " .. tostring(entityHit), 0.3, 9)
            end
        end

        DrawTrackedInfo()
    end
end)

-- local volumeArea = CreateVolumeBox(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, DrawDistance * 2, DrawDistance * 2, DrawDistance * 2)
-- local volumeArea = CreateVolumeCylinder(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, DrawDistance, DrawDistance, DrawDistance)
local volumeArea = Citizen.InvokeNative(0xB3FB80A32BAE3065, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, DrawDistance, DrawDistance, DrawDistance) -- _CREATE_VOLUME_SPHERE
-- Citizen.InvokeNative(0x43F867EF5C463A53, volumeArea) -- _DELETE_VOLUME
local itemSet = CreateItemset(1)
Citizen.CreateThread(function()
    -- Surrounding Info / Tracking
    while true do
        local player = PlayerPedId()
        Wait(500)
        entitiesToDraw = {}
        itemsToDraw = {}
        foliageToDraw = {}
        vehiclesToDraw = {}
        local coords = GetEntityCoords(player)
        if volumeArea then
            -- 0x541B8576615C33DE SET_VOLUME_COORDS
            -- 0xA07CF1B21B56F041 SET_VOLUME_ROTATION
            -- 0xA46E98BDC407E23D  SET_VOLUME_SIZE
            Citizen.InvokeNative(0x541B8576615C33DE, volumeArea, coords.x, coords.y, coords.z) -- SET_VOLUME_COORDS
            -- 1 Peds
            -- 2 Vehicles
            -- 3 Entities
            if trackPeds then
                local itemsFound = Citizen.InvokeNative(0x886171A12F400B89, volumeArea, itemSet, 1) -- Get volume items into itemset
                if itemsFound then
                    n = 0
                    while n < itemsFound do
                        -- DrawEntityInfo((GetIndexedItemInItemset(n, itemSet)))
                        entitiesToDraw[(GetIndexedItemInItemset(n, itemSet))] = true
                        n = n + 1
                    end
                end
                Citizen.InvokeNative(0x20A4BF0E09BEE146, itemSet) -- Empty Item Set
            end
            if trackVehicles then
                local itemsFound = Citizen.InvokeNative(0x886171A12F400B89, volumeArea, itemSet, 2) -- Get volume items into itemset
                if itemsFound then
                    n = 0
                    while n < itemsFound do
                        -- DrawVehicleInfo((GetIndexedItemInItemset(n, itemSet)))
                        vehiclesToDraw[(GetIndexedItemInItemset(n, itemSet))] = true
                        n = n + 1
                    end
                end
                Citizen.InvokeNative(0x20A4BF0E09BEE146, itemSet) -- Empty Item Set
            end
            if trackEntities then
                local itemsFound = Citizen.InvokeNative(0x886171A12F400B89, volumeArea, itemSet, 3) -- Get volume items into itemset
                if itemsFound then
                    n = 0
                    while n < itemsFound do
                        -- DrawItemInfo((GetIndexedItemInItemset(n, itemSet)))
                        itemsToDraw[(GetIndexedItemInItemset(n, itemSet))] = true
                        n = n + 1
                    end
                end
                Citizen.InvokeNative(0x20A4BF0E09BEE146, itemSet) -- Empty Item Set
            end
        end

    end
end)

function DrawTrackedInfo()
    if trackPeds then
        for entity, active in pairs(entitiesToDraw) do
            if not DoesEntityExist(entity) then
                active = false
            end
            if active and IsEntityOnScreen(entity) then
                DrawEntityInfo(entity)
            end
        end
    end

    if trackEntities then
        for entity, active in pairs(itemsToDraw) do
            if not DoesEntityExist(entity) then
                active = false
            end
            if active and IsEntityOnScreen(entity) then
                DrawItemInfo(entity)
            end
        end

        -- for entity, active in pairs(foliageToDraw) do
        --     if not DoesEntityExist(entity) then
        --         active = false
        --     end
        --     if active and IsEntityOnScreen(entity) then
        --         DrawFoliageInfo(entity)
        --     end
        -- end
    end

    if trackVehicles then
        for entity, active in pairs(vehiclesToDraw) do
            if not DoesEntityExist(entity) then
                active = false
            end
            if active and IsEntityOnScreen(entity) then
                DrawVehicleInfo(entity)
            end
        end
    end
end

RegisterCommand('wash', function()
    local player = PlayerPedId()
    --Citizen.InvokeNative(0xEB8886E1065654CD, player, 4, 'ALL', 0.0)
    --Citizen.InvokeNative(0xEB8886E1065654CD, player, 6, 'ALL', 0.0)
    --Citizen.InvokeNative(0xEB8886E1065654CD, player, 1, 'ALL', 0.0)
    Citizen.InvokeNative(0xEB8886E1065654CD, player, 10, 'ALL', 10.0)
    Citizen.InvokeNative(0xE3144B932DFDFF65, player, 0.0, -1, 1, 1)
    Citizen.InvokeNative(0xA7A806677F8DE138, player)
    ClearPedEnvDirt(player)
    ClearPedDamageDecalByZone(player, 10, 'ALL')
    Citizen.InvokeNative(0xD8544F6260F5F01E, player, 10)
    SetPedWetnessHeight(player, 1.0)
end)

function LoadModel(model)
    local attempts = 0
    while attempts < 1000 and not HasModelLoaded(model) do
        RequestModel(model)
        Citizen.Wait(1)
        attempts = attempts + 1
    end
    return IsModelValid(model)
end

RegisterCommand("weapon", function(source, args, rawCommand) -- GIVES A WEAPON
    if args[1] == nil then
        print("Please set the specific name for weapon")
    else
        local player = PlayerPedId()
        Citizen.InvokeNative(0xB282DC6EBD803C75, player, GetHashKey(args[1]), 500, true, 0)
        -- 0xB190BCA3F4042F95     P_ID    HASH_WEAPON_BOW      10   -   GIVE DEFAULT AMMO FOR WEAPON
        -- 0x106A811C6D3035F3     P_ID    HASH_AMMO_ARROW      10   -   GIVE SPECIFIC AMMO
        -- SetCurrentPedWeapon    P_ID    HASH_WEAPON_UNARMED  true
    end
end, false)

RegisterCommand("delete_entity", function(source, args, rawCommand)
    Citizen.CreateThread(function()
        local entity_id = tonumber(args[1])
        if entity_id then
            SetEntityAsMissionEntity(entity_id, true, true)
            DeleteEntity(entity_id)
        end
    end)
end)

function convert(n)
    if n >= 2 ^ 31 then
        return n - 2 ^ 32
    end
    return n
end

RegisterCommand('identify', function(source, args, rawCommand)
    local hash = convert(tonumber(args[1]))
    print('hash', hash)
    if HASH_MODELS[hash] then
        print('HASH_MODELS: ', HASH_MODELS[hash])
    elseif HASH_PEDS[hash] then
        print('HASH_PEDS: ', HASH_PEDS[hash])
    elseif HASH_PROVISIONS[hash] then
        print('HASH_PROVISIONS: ', HASH_PROVISIONS[hash])
    elseif HASH_VEHICLES[hash] then
        print('HASH_VEHICLES: ', HASH_VEHICLES[hash])
    elseif HASH_CARRIABLE[hash] then
        print('HASH_CARRIABLE: ', HASH_CARRIABLE[hash])
    elseif HASH_YMAP[hash] then
        print('HASH_YMAP: ', HASH_YMAP[hash])
    elseif HASH_RAW_MODELS[hash] then
        print('HASH_RAW_MODELS: ', HASH_RAW_MODELS[hash])
    else
        print("I don't know that hash.")
    end
end)

RegisterCommand('golden', function(source, args, rawCommand)
    Citizen.CreateThread(function()
        AnimpostfxPlay('PlayerOverpower')
        local player = PlayerPedId()
        Citizen.InvokeNative(0xC6258F41D86676E0, player, 0, 100) -- SetAttributeCoreValue
        Citizen.InvokeNative(0xC6258F41D86676E0, player, 1, 100) -- SetAttributeCoreValue
        Citizen.InvokeNative(0xC6258F41D86676E0, player, 2, 100) -- SetAttributeCoreValue
        EnableAttributeOverpower(player, 0, 5000.0)
        EnableAttributeOverpower(player, 1, 5000.0)
        EnableAttributeOverpower(player, 2, 5000.0)
        -- 0x103C2F885ABEB00B Is Attribute Overpowered
        -- 0xF6A7C08DF2E28B28 Set Attribute Overpowered Amount
        Citizen.InvokeNative(0xF6A7C08DF2E28B28, player, 0, 5000.0)
        Citizen.InvokeNative(0xF6A7C08DF2E28B28, player, 1, 5000.0)
        Citizen.InvokeNative(0xF6A7C08DF2E28B28, player, 2, 5000.0)
        local mount = GetMount(player)
        if mount then
            Citizen.InvokeNative(0xC6258F41D86676E0, mount, 0, 100) -- SetAttributeCoreValue
            Citizen.InvokeNative(0xC6258F41D86676E0, mount, 1, 100) -- SetAttributeCoreValue
            EnableAttributeOverpower(mount, 0, 5000.0)
            EnableAttributeOverpower(mount, 1, 5000.0)
            Citizen.InvokeNative(0xF6A7C08DF2E28B28, mount, 0, 5000.0)
            Citizen.InvokeNative(0xF6A7C08DF2E28B28, mount, 1, 5000.0)
        end
    end)
end)

-- HORSE

--TODO
--Check Ped is on own mount
--Set Ped Mount ID Decor on horse
--local playerId = PlayerId()
--local playerPed = PlayerPedId()
--Citizen.CreateThread(function()
--    local playerMountPed
--    local whistledKeyDown = false
--    local distance = math.random() + math.random(2, 7)
--    local speed = 2.0
--    local horseWhistled
--    while true do
--        Wait(0)
--
--        if horseWhistled and IsEntityAtEntity(playerPed, playerMountPed, distance * 1.5, distance * 1.5, distance * 1.5) then
----            print('Horse Arrived', distance, speed)
--            speed = 2.0
--            horseWhistled = false
--        end
--        if not whistledKeyDown and (IsControlPressed(0, 0x24978A28) or IsControlPressed(0, 0xE7EB9185)) then
--            whistledKeyDown = true
--            distance = math.random() + math.random(2, 7)
----            distance = math.random() + math.random(1, 2)
--            playerMountPed = Citizen.InvokeNative(0xB48050D326E9A2F3, playerId) -- _GET_SADDLE_HORSE_FOR_PLAYER
--            if not playerMountPed or not IsPedFatallyInjured(playerMountPed) then
--                if not horseWhistled then
----                    print('First Whistle')
--                    playerPed = PlayerPedId()
--                    if not playerMountPed or not DoesEntityExist(playerMountPed) then
--                        local offsetX = math.random() + math.random(1, 100) - 50
--                        local offsetY = math.random() + math.random(1, 100) - 50
--                        local spawnCoords = GetOffsetFromEntityInWorldCoords(playerPed, offsetX, offsetY, 0)
--                        local retval, groundZ, normal  = GetGroundZAndNormalFor_3dCoord(spawnCoords.x, spawnCoords.y, spawnCoords.z + 5.0)
--                        local modelHash = `A_C_Horse_Arabian_White`
--                        LoadModel(modelHash)
--                        playerMountPed = CreatePed(modelHash, spawnCoords.x, spawnCoords.y, groundZ, 0.0, true, true, true, true)
--                        SetEntityVisible(playerMountPed, true)
--                        SetEntityAlpha(playerMountPed, 255, false)
--                        Citizen.InvokeNative(0x283978A15512B2FE, playerMountPed, true) -- _SET_RANDOM_OUTFIT_VARIATION
--                        SetModelAsNoLongerNeeded(modelHash)
--                        Citizen.InvokeNative(0xD2CB0FB0FDCB473D, playerId, playerMountPed) -- _SET_PED_AS_SADDLE_HORSE_FOR_PLAYER
--                    end
--                    local horseBlip = GetBlipFromEntity(playerMountPed)
--                    if horseBlip == 0 then
--                        horseBlip = Citizen.InvokeNative(0x23F74C2FDA6E7C61, -1230993421, playerMountPed) -- _BLIP_ADD_FOR_ENTITY
--                        SetBlipSprite(horseBlip, `blip_horse_owned`, true)
--                    end
--                    local varString = CreateVarString(10, 'LITERAL_STRING', 'Kevin')
--                    Citizen.InvokeNative(0x9CB1A1623062F402, horseBlip, varString) -- _SET_BLIP_NAME_FROM_PLAYER_STRING
--                    TaskGoToEntity(playerMountPed, playerPed, -1, distance, speed, 0, 0)
--                    horseWhistled = true
--                else
----                    print('Second Whistle')
--                    speed = math.min(speed * 1.05, 5.0)
--                    TaskGoToEntity(playerMountPed, playerPed, -1, distance, speed, 0, 0)
--                end
--            end
--        elseif whistledKeyDown and IsControlJustReleased(0, 0x24978A28) then
--            whistledKeyDown = false
--        end
--    end
--end)

--// 0x46FA0AE18F4C7FA9
--Entity _GET_PLAYER_MAIN_HORSE(Player player)
--
--// 0x8FBF9EDB378CCB8C
--void _SET_PED_AS_PLAYER_MAIN_HORSE(Player player, Ped horse)
--/*
--Seems to work similar to
--_SET_PED_AS_SADDLE_HORSE_FOR_PLAYER (0xD2CB0FB0FDCB473D)
--*/
--
--// 0xD3F7445CEA2E5035
--Entity _GET_PLAYER_TEMPORARY_HORSE(Player player)
--
--// 0x227B06324234FB09
--BOOL _SET_PED_AS_PLAYER_TEMPORARY_HORSE(Player player, Ped horse)

--P_BAITBREAD01X
--P_BAITCORN01X
--P_BAITCHEESE01X
--P_BAITWORM01X
--P_BAITCRICKET01X
--P_CRAWDAD01X
--P_FINISHEDRAGONFLY01X
--P_FINISDFISHLURE01X
--P_FINISHDCRAWD01X
--P_FINISHEDRAGONFLYLEGENDARY01X
--P_FINISDFISHLURELEGENDARY01X
--P_FINISHDCRAWDLEGENDARY01X
--P_LGOC_SPINNER_V4

--Citizen.CreateThread(function()
--    Citizen.Wait(1000)
--    print('Searching Ropes START')
--    for n=1,512 do
--        Citizen.Wait(0)
--        if DoesRopeExist(n) or Citizen.InvokeNative(0xFD5448BE3111ED96, n) then
--            print('Rope Exists', n)
--            local ropeCoords = GetRopeVertexCoord(n, 0)
--            print(ropeCoords.x, ropeCoords.y, ropeCoords.z)
--        end
--    end
--    print('Searching Ropes END')
--
--    local winding = false
--    while true do
--        Wait(0)
--        if IsControlJustPressed(0, 0xD9D0E1C0) then
--            if not winding then
--                winding = true
--                for n=1,512 do
--                    --0x3D69537039F8D824 _GET_ROPE_LENGTH
--                    if Citizen.InvokeNative(0xFD5448BE3111ED96, n) then
--                        Citizen.InvokeNative(0x1FC92BDBA1106BD2, n, 1.0)
--                        StartRopeWinding(n)
--                    end
--                end
--            end
--        end
--        if IsControlJustReleased(0, 0xD9D0E1C0) then
--            winding = false
--            for n=1,512 do
--                if Citizen.InvokeNative(0xFD5448BE3111ED96, n) then
--                    StopRopeWinding(n)
--                    --Citizen.InvokeNative(0x538D1179EC1AA9A9, n)
--                end
--            end
--        end
--    end
--end)

--RegisterCommand('fish', function(source, args, rawCommand)
--    local player = PlayerPedId()
--    local fishEntity = tonumber(args[1])
--    if not Citizen.InvokeNative(0x88AD6CC10D8D35B2, fishEntity) or not DoesEntityBelongToThisScript(fishEntity, false) then
--        Citizen.InvokeNative(0xDC19C288082E586E, fishEntity, true, true)
--    end
--    ClearPedTasks(fishEntity, 1, 0)
--    Citizen.InvokeNative(0xF0FBF193F1F5C0EA, fishEntity)
--    SetEntityInvincible(fishEntity, true)
--    SetPedConfigFlag(fishEntity, 17, true)
--    Citizen.InvokeNative(0x1F298C7BD30D1240, player)
--    ClearPedTasksImmediately(fishEntity, false, true)
--    Citizen.InvokeNative(0x1A52076D26E09004, player, fishEntity)
--end)

-- _GET_ROPE_LENGTH 0x3D69537039F8D824
--{ -- Local_18
--    ['f_0']  = 0,
--    ['f_1']  = -1474589744, -- P_FISHUPGRADEBOBBER04X
--    ['f_2']  = 391506844, -- P_FISHHOOK02X
--    ['f_3']  = -294392875, -- P_BAITCHEESE01X
--    ['f_4']  = 0,
--    ['f_5']  = 0,
--    ['f_6']  = 0,
--    ['f_7']  = 0,
--    ['f_8']  = 0,
--    ['f_9']  = 0,
--    ['f_10'] = 0.3,
--    ['f_11'] = 0.1,
--    ['f_12'] = 8.0,
--    ['f_13'] = 10.0,
--    ['f_14'] = 1.0,
--    ['f_15'] = 1.0,
--    ['f_16'] = 2.0,
--    ['f_17'] = 0
--}

local BLIP_TYPES = {
    -678244495, -- gray destination
    -1702907713, -- pink enemy
    -1337945352, -- white unselectable?
    1560611276, -- posse camp
    -674883803, -- invisible?
    1687768444, -- destination, mine icon?
    1260140857, -- invisible?
    -1230993421, -- horse icon "Arthur's Horse"
    -936216634, -- white unselectable?
    2098831270, -- white no name?
    -325639900, -- white pickup
    -773443467, -- corpse
    -700928964, -- gray herd
    -214162151, -- yellow straggler
    -1594303955, -- animal carcass
    662885764, -- red lawman
    -1049390151, -- red witness
    953018525, -- red bounty target
    455691738, -- red bounty target
    -839369609, -- red enemy
    -1749618580, -- white companion
    168093330, -- white destination
    -1595050198, -- red lawman
    -118010418, -- red alternative? lawman
    522464759, -- red bounty hunter
    631964804, -- wagon icon "Arthur's Wagon"
    1055493006, -- small yellow (x) destination
    486881925, -- white hat
    203020899, -- small yellow (x) destination
    -399496385, -- train
    -89429847, -- light gray companion
    1664425300, -- white weapon
    831283580, -- red enemy
    422991367, -- dark gray companion
    -515518185, -- white saddle unselectable?
    2033377404, -- yellow ( ) unselectable?
    -308585968, -- yellow (x) destination
    -108658760, -- invisible?
    -666422021, -- red ( ) unselectable?
    1774867085, -- invisible?
    -1282792512, -- yellow ( ) unselectable?
    227551412, -- yellow ( ) unselectable?
    408396114, -- yellow (x) destination
    -1559907306, -- white ( ) unselectable?
    1673015813, -- white ( ) unselectable?
    1247852480, -- yellow ( ) unselectable?
}

RegisterCommand('train', function(source, args, rawCommand)
    Citizen.CreateThread(function()
        local trainHash = GetHashKey('northSteamer01x')
        trainHash = -1464742217
        print(trainHash)
        local trainWagons = N_0x635423d55ca84fc8(trainHash)
        print(trainWagons)
        for wagonIndex = 0, trainWagons - 1 do
            local trainWagonModel = N_0x8df5f6a19f99f0d5(trainHash, wagonIndex)
            LoadModel(trainWagonModel)
        end
        local train = N_0xc239dbd9a57d2a71(trainHash, GetEntityCoords(PlayerPedId()), 0, 0, 1, 1)
        print(train)
        SetTrainSpeed(train, 0.0)
        -- TaskWarpPedIntoVehicle(PlayerPedId(), train, -1)
    end)
end)

RegisterCommand('handcart', function(source, args, rawCommand)
    Citizen.CreateThread(function()
        local trainHash = 1054492269 -- handcart
        print(trainHash)
        local trainWagons = N_0x635423d55ca84fc8(trainHash)
        print(trainWagons)
        for wagonIndex = 0, trainWagons - 1 do
            local trainWagonModel = N_0x8df5f6a19f99f0d5(trainHash, wagonIndex)
            LoadModel(trainWagonModel)
        end
        local train = N_0xc239dbd9a57d2a71(trainHash, GetEntityCoords(PlayerPedId()), 0, 0, 1, 1)
        print(train)
        SetTrainSpeed(train, 0.0)
        -- TaskWarpPedIntoVehicle(PlayerPedId(), train, -1)
    end)
end)

RegisterCommand('minecart', function(source, args, rawCommand)
    Citizen.CreateThread(function()
        local trainHash = -950361972 -- minecart
        print(trainHash)
        local trainWagons = N_0x635423d55ca84fc8(trainHash)
        print(trainWagons)
        for wagonIndex = 0, trainWagons - 1 do
            local trainWagonModel = N_0x8df5f6a19f99f0d5(trainHash, wagonIndex)
            LoadModel(trainWagonModel)
        end
        local train = N_0xc239dbd9a57d2a71(trainHash, GetEntityCoords(PlayerPedId()), 0, 0, 1, 1)
        print(train)
        SetTrainSpeed(train, 0.0)
        -- TaskWarpPedIntoVehicle(PlayerPedId(), train, -1)
    end)
end)

function ClearScenario()
    print('Scenario Clearing')
    local player = PlayerPedId()
    ClearPedTasks(player)
    local heldEntity = Citizen.InvokeNative(0x3B390A939AF0B5FC, player, 0)
    if originalHeldEntity ~= heldEntity then
        Citizen.Wait(3000)
        if heldEntity then
            SetEntityAsMissionEntity(heldEntity, true, true)
            DeleteEntity(heldEntity)
        end
    end
    Citizen.Wait(3000)
    ClearPedTasksImmediately(player)
    runningScenario = false
    print('Scenario Ended')
end

RegisterCommand('test_animscene', function(source, args, rawCommand)
    Citizen.CreateThread(function()
        local player = PlayerPedId()
        if args[4] and not (tonumber(args[4]) == nil) then
            player = tonumber(args[4])
        end
        if args[2] and not (tonumber(args[2]) == nil) then
            args[2] = tonumber(args[2])
        end
        local animDict = args[1]
        if DoesAnimDictExist(animDict) then
            while not HasAnimDictLoaded(animDict) do
                RequestAnimDict(animDict)
                Wait (100)
            end
        end
        --local pCoord = GetEntityCoords(player)
        local pCoord = GetOffsetFromEntityInWorldCoords(player, 0.0164, 0.665, -1.0)
        local pRot = GetEntityRotation(player, 2)
        print(animDict, args[2])
        local animScene = CreateAnimScene(animDict, 24, args[2], false, true)
        LoadAnimScene(animScene)
        SetAnimSceneOrigin(animScene, pCoord.x, pCoord.y, pCoord.z, pRot.x, pRot.y, pRot.z, 2)
        SetAnimSceneEntity(animScene, args[3], player, 0)
        Wait(1000)
        print('AnimScene Started', animScene)
        StartAnimScene(animScene)
        Wait(10000)
        Citizen.InvokeNative(0x84EEDB2C6E650000, animScene)
        print('AnimScene Ended')
    end)
end)

RegisterCommand('test_anim', function(source, args, rawCommand)
    local player = PlayerPedId()
    if args[4] and not (tonumber(args[4]) == nil) then
        player = tonumber(args[4])
    end
    if args[2] and not (tonumber(args[2]) == nil) then
        args[2] = tonumber(args[2])
    end
    local animDict = args[1]
    if DoesAnimDictExist(animDict) then
        while not HasAnimDictLoaded(animDict) do
            RequestAnimDict(animDict)
            Wait (100)
        end
    end
    if IsEntityAPed(player) then
        TaskPlayAnim(player, animDict, args[2], 1.0, -1.0, -1, tonumber(args[3] or 0), 0.0, false, 0, false, 0, false)
    else
        PlayEntityAnim(player, args[2], animDict, 1.0, false, false, false, 0.0, tonumber(args[3] or 0))
    end
end)

RegisterCommand('test_scenario', function(source, args, rawCommand)
    Citizen.CreateThread(function()
        local player = PlayerPedId()
        if IsPedUsingAnyScenario(player) or runningScenario then
            ClearScenario()
            Citizen.Wait(6000)
        end
        if args[2] and not (tonumber(args[2]) == nil) then
            player = tonumber(args[2])
        end
        local scenario_hash = args[1]
        if tonumber(scenario_hash) == nil then
            scenario_hash = GetHashKey(scenario_hash)
        else
            scenario_hash = tonumber(scenario_hash)
        end
        originalHeldEntity = Citizen.InvokeNative(0x3B390A939AF0B5FC, player, 0)
                            -- ped | scenarioHash | duration | playEnterAnim | conditionalHash | heading | p6
        TaskStartScenarioInPlace(player, scenario_hash, 0, true, false, 0, -1.0, false)
        print('Scenario Started', scenario_hash)
        Citizen.Wait(1000)
        runningScenario = IsPedUsingAnyScenario(player)
    end)
end)

RegisterCommand('test_scenario_2', function(source, args, rawCommand)
    Citizen.CreateThread(function()
        local player = PlayerPedId()
        if IsPedUsingAnyScenario(player) or runningScenario then
            ClearScenario()
            Citizen.Wait(6000)
        end
        local scenario_hash = args[1]
        if tonumber(scenario_hash) == nil then
            scenario_hash = GetHashKey(scenario_hash)
        else
            scenario_hash = tonumber(scenario_hash)
        end
        local conditional_hash = args[2]
        if tonumber(conditional_hash) == nil then
            conditional_hash = GetHashKey(conditional_hash)
        else
            conditional_hash = tonumber(conditional_hash)
        end
        originalHeldEntity = Citizen.InvokeNative(0x3B390A939AF0B5FC, player, 0)
                            -- ped | scenarioHash | duration | playEnterAnim | conditionalHash | heading | p6
        TaskStartScenarioInPlace(player, scenario_hash, 0, true, conditional_hash, 0, -1.0, false)
        print('Scenario Started', scenario_hash, conditional_hash)
        Citizen.Wait(1000)
        runningScenario = IsPedUsingAnyScenario(player)
    end)
end)

RegisterCommand('test_scenario_spot', function(source, args, rawCommand)
    Citizen.CreateThread(function()
        local entity = PlayerPedId()
        if args[2] and not (tonumber(args[2]) == nil) then
            entity = tonumber(args[2])
        end
        local scenario_hash = args[1]
        if tonumber(scenario_hash) == nil then
            scenario_hash = GetHashKey(scenario_hash)
        else
            scenario_hash = tonumber(scenario_hash)
        end
        print('scenario_hash', scenario_hash)
        local coord = GetEntityCoords(entity)
        local heading = GetEntityHeading(entity)
        local originalHeldEntity = Citizen.InvokeNative(0x3B390A939AF0B5FC, entity, 0)
        local scenario = Citizen.InvokeNative(0x94b745ce41db58a1, scenario_hash, coord.x, coord.y, coord.z - 1.0, 0.0, 0.0, heading, 0) -- CREATE_SCENARIO_POINT
        print('Scenario Created: ', scenario)
        TaskUseScenarioPoint(entity, scenario, 0, 0, true, false, 0, false, -1.0, false)
        Citizen.Wait(60000)
        N_0x81948dfe4f5a0283(scenario) -- DELETE_SCENARIO_POINT
        print('Scenario Deleted: ', scenario)
    end)
end)

RegisterCommand('stop_test_scenario', function(source, args, rawCommand)
    Citizen.CreateThread(function()
        if runningScenario then
            ClearScenario()
        end
    end)
end)

RegisterCommand('emote', function(source, args, rawCommand)
    Citizen.InvokeNative(0xB31A277C1AC7B7FF, PlayerPedId(), tonumber(args[2]) or 1, 2, GetHashKey(args[1]), 0, 0, 0, 0, 0)
end)

RegisterCommand('player_model', function(source, args, rawCommand)
    local model = GetHashKey(args[1])
    local playerPed = PlayerPedId()
    LoadModel(model)
    local cid = DecorGetInt(playerPed, 'CID')
    local sex = DecorGetInt(playerPed, 'SEX')
    local inventory = DecorGetInt(playerPed, 'Inventory')
    SetPlayerModel(PlayerId(), model, true)

    local newPlayerPed = PlayerPedId()
    DecorSetInt(newPlayerPed, 'CID', cid)
    DecorSetInt(newPlayerPed, 'SEX', sex)
    DecorSetInt(newPlayerPed, 'Inventory', inventory)

    SetPedConfigFlag(newPlayerPed, 409, true)
end)
