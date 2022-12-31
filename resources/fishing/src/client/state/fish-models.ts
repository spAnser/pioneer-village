const FishBait = {
    None: GetHashKey('p_fishhook02x'),
    Bread: GetHashKey('p_baitbread01x'),
    Corn: GetHashKey('p_baitcorn01x'),
    Cheese: GetHashKey('p_baitcheese01x'),
    Worm: GetHashKey('p_baitworm01x'),
    Cricket: GetHashKey('p_baitcricket01x'),
    Crawdad: GetHashKey('p_crawdad01x'),
    FishLure: GetHashKey('p_finisdfishlure01x'), // Lake
    DragonFlyLure: GetHashKey('p_finishedragonfly01x'), // River
    CrawdLure: GetHashKey('p_finishdcrawd01x'), // Swamp
    FishLureLeg: GetHashKey('p_finisdfishlurelegendary01x'), // Lake
    DragonFlyLureLeg: GetHashKey('p_finishedragonflylegendary01x'), // River
    CrawdLureLeg: GetHashKey('p_finishdcrawdlegendary01x'), // Swamp
    Spinner: GetHashKey('p_lgoc_spinner_v4'), // Freshwater
};

interface FishModelInfo {
    name: string;
    baitNotInterestedIn: number[];
}

const fishModels: Map<number, FishModelInfo> = new Map();

fishModels.set(GetHashKey('A_C_FISHBLUEGIL_01_SM'), {
    name: 'Blue Gil',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHBLUEGIL_01_MS'), {
    name: 'Blue Gil',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHBULLHEADCAT_01_SM'), {
    name: 'Bull Head Cat',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHBULLHEADCAT_01_MS'), {
    name: 'Bull Head Cat',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHCHAINPICKEREL_01_SM'), {
    name: 'Chain Pickerel',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHCHAINPICKEREL_01_MS'), {
    name: 'Chain Pickerel',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHCHANNELCATFISH_01_LG'), {
    name: 'Chanel Catfish',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHCHANNELCATFISH_01_XL'), {
    name: 'Chanel Catfish',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHLAKESTURGEON_01_LG'), {
    name: 'Lake Sturgeon',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHLARGEMOUTHBASS_01_MS'), {
    name: 'Large Mouth Bass',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHLARGEMOUTHBASS_01_LG'), {
    name: 'Large Mouth Bass',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHLONGNOSEGAR_01_LG'), {
    name: 'Longnose Gar',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHMUSKIE_01_LG'), {
    name: 'Muski',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHNORTHERNPIKE_01_LG'), {
    name: 'Northern Pike',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHPERCH_01_SM'), {
    name: 'Perch',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHPERCH_01_MS'), {
    name: 'Perch',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHRAINBOWTROUT_01_MS'), {
    name: 'Rainbow Trout',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHRAINBOWTROUT_01_LG'), {
    name: 'Rainbow Trout',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHREDFINPICKEREL_01_SM'), {
    name: 'Redfin Pickerel',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHREDFINPICKEREL_01_MS'), {
    name: 'Redfin Pickerel',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHROCKBASS_01_SM'), {
    name: 'Rock Bass',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHROCKBASS_01_MS'), {
    name: 'Rock Bass',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHSALMONSOCKEYE_01_MS'), {
    name: 'Sockeye Salmon',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHSALMONSOCKEYE_01_ML'), {
    name: 'Sockeye Salmon',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHSALMONSOCKEYE_01_LG'), {
    name: 'Sockeye Salmon',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHSMALLMOUTHBASS_01_MS'), {
    name: 'Small Mouth Bass',
    baitNotInterestedIn: [],
});
fishModels.set(GetHashKey('A_C_FISHSMALLMOUTHBASS_01_LG'), {
    name: 'Small Mouth Bass',
    baitNotInterestedIn: [],
});

export default fishModels;

// crun CompendiumFishGetLureSuitabilityByStatItem(`AT_FCHAINPICKEREL`, `UPGRADE_FSH_BAIT_CHEESE`)

// AT_FBLUEGIL
// AT_FBULLHEADCATFISH
// AT_FCHAINPICKEREL
// AT_FCHANNELCATFISH
// AT_FLAKESTURGEON
// AT_FLARGEMOUTHBASS
// AT_FLONGNOSEGAR
// AT_FMUSKIE
// AT_FNORTHERNPIKE
// AT_FPERCH
// AT_FREDFINPICKEREL
// AT_FROCKBASS
// AT_FSMALLMOUTHBASS
// AT_FSALMONSOCKEYE
// AT_FRAINBOWTROUT

// UPGRADE_FSH_BAIT_CHEESE
// UPGRADE_FSH_BAIT_BREAD
// UPGRADE_FSH_BAIT_CORN
// UPGRADE_FSH_BAIT_WORM
// UPGRADE_FSH_BAIT_CRICKET
// UPGRADE_FSH_BAIT_CRAYFISH
// UPGRADE_FSH_BAIT_LURE_LAKE
// UPGRADE_FSH_BAIT_LURE_RIVER
// UPGRADE_FSH_BAIT_LURE_SWAMP
// UPGRADE_FSH_BAIT_LEG_LURE_LAKE
// UPGRADE_FSH_BAIT_LEG_LURE_RIVER
// UPGRADE_FSH_BAIT_LEG_LURE_SWAMP
// UPGRADE_FSH_BAIT_SPINNER_FRESHWATER_LEG

// OUTSTANDING
// EXCELLENT
// GOOD
// NORMAL
// BAD
