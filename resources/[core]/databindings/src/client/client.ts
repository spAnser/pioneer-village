import { exports } from '@lib/client';

import DataManager from './managers/data-manager';
import { PVGame } from '@lib/client';
import { Delay } from '@lib/functions';

const bindRootData: Databindings.bindRootData = (index, data) => {
  DataManager.bindRootData(index, data);
};

exports<'databindings'>('bindRootData', bindRootData);

const bindData: Databindings.bindData = (index, data) => {
  DataManager.bindData(index, data);
};

exports<'databindings'>('bindData', bindData);

/*
(async () => {
  const flowblockId = await PVGame.requestFlowblock(1911615281);
  PVGame.createStateMachine(-1436556974, flowblockId);

  bindData('Poster0', {
    isVisible: true,
    isDiffVisible: true,
    type: 1,
    difficulty: 1,
    price: '$99',
    body: 'Murdered little kittens',
    header: '! WANTED ALIVE !',
    name: 'Steve',
    tex: 'bounty_target_02',
    txd: 'bounty_target_02',
  });
})();
*/

RegisterCommand(
  'generic',
  () => {
    LaunchUiappByHashWithEntry('TRANSLATION_OVERLAY', 'Generic');

    bindData('Generic', {
      textField0: {
        text: -54957657,
        style: 0,
      },
      divider0: {
        isVisible: true,
      },
      textField1: {
        text: -54957657,
        style: 1,
      },
      divider1: {
        isVisible: true,
      },
      textField2: {
        text: -54957657,
        style: 2,
      },
      divider2: {
        isVisible: true,
      },
      textField3: {
        text: -54957657,
        style: 3,
      },
      divider3: {
        isVisible: true,
      },
      textField4: {
        text: -54957657,
        style: 4,
      },
      divider4: {
        isVisible: true,
      },
      textField5: {
        text: -54957657,
        style: 5,
      },
      divider5: {
        isVisible: true,
      },
      textField6: {
        text: -54957657,
        style: 6,
      },
      divider6: {
        isVisible: true,
      },
    });
  },
  false,
);

RegisterCommand(
  'catalogue',
  () => {
    LaunchUiappByHashWithEntry('TRANSLATION_OVERLAY', 'Catalogue');

    bindData('Catalogue', {
      textField0: {
        text: 'My Catalogue',
        style: 0,
      },
      divider0: {
        isVisible: true,
      },
      textField1: {
        text: GetHashKey('CUSTOM_ENTRY'), //-54957657,
        style: 1,
      },
      divider1: {
        isVisible: true,
      },
      textField2: {
        text: 'jashdfi gsadhkfg ksadfgk asgdf agsdfjasdhf ajsdhbf hasbdfkl askdf kadsfkha svdkfsdklf aklhsdfvk hasdfjh basdjfb jahsdvfjhk asd',
        style: 2,
      },
      divider2: {
        isVisible: true,
      },
      textField3: {
        text: 1464454211,
        style: 3,
      },
      textField4: {
        text: -2107754996,
        style: 3,
      },
      textField5: {
        text: -1999490224,
        style: 3,
      },
      textField6: {
        text: 1501445584,
        style: 3,
      },
      textField7: {
        text: -755060114,
        style: 3,
      },
    });
  },
  false,
);

AddTextEntry('CUSTOM_ENTRY', 'My custom text entry');

RegisterCommand(
  'catalog_inspect',
  async () => {
    const flowblockId = await PVGame.requestFlowblock(GetHashKey('SHOP_BROWSING_MAIN_FLOW'));

    bindData('CatalogItemInspection', {
      isVisible: true,
      itemLabel: GetHashKey('WEAPON_PISTOL_VOLCANIC'),
      itemDescription: 'itemDescription',
      purchaseLabel: 'Buy',
      purchasePrice: 250,
      tokenPrice: 0,
      isGoldPrice: false,
      purchaseModifiedPrice: 350,
      modifiedPriceVisible: true,
      modifiedPriceGold: false,
      ammoVisible: true,
      ammoCurrent: 10,
      ammoMax: 100,
      ammoTextureDictionary: 'ammo_types',
      ammoTexture: 'arrow_type_fire',
      mailVisible: true,
      mailCurrent: 5,
    });

    UiflowblockEnter(flowblockId, -702860656);
    PVGame.createStateMachine(-1468895189, flowblockId);

    await Delay(5000);

    bindData('CatalogItemInspection', {
      isVisible: true,
      itemLabel: GetHashKey('WEAPON_PISTOL_VOLCANIC'),
      itemDescription: 'itemDescription',
      purchaseLabel: 'Buy',
      purchasePrice: 10,
      tokenPrice: 1,
      isGoldPrice: true,
      purchaseModifiedPrice: 20,
      modifiedPriceVisible: false,
      modifiedPriceGold: true,
      ammoVisible: true,
      ammoCurrent: 10,
      ammoMax: 100,
      ammoTextureDictionary: 'ammo_types',
      ammoTexture: 'arrow_type_fire',
      mailVisible: false,
      mailCurrent: 5,
    });

    await Delay(5000);
    PVGame.destroyStateMachine(-1468895189);
  },
  false,
);

RegisterCommand(
  'shelf_inspect',
  async () => {
    bindData('price_details', {
      purchasePrice: 250,
      isGoldPrice: false,
      modifiedPriceVisible: true,
      modifiedPriceGold: false,
      purchaseModifiedPrice: 350,
    });

    const str = VarString(2, 'SHOP_H_LOCKED', 0);

    const struct1 = new DataView(new ArrayBuffer(8 * 4));
    struct1.setUint32(0, 10000, true);

    const struct2 = new DataView(new ArrayBuffer(8 * 2));
    struct2.setBigUint64(8, BigInt(str), true);

    UiFeedPostHelpText(struct1, struct2, true);
  },
  false,
);

RegisterCommand(
  'scoreboard',
  async () => {
    bindRootData('helperTextfields', {
      rawLabel0: 'TEAM 1',
      rawValue0: '4',
      rawLabel1: 'TEAM 2',
      rawValue1: '2',
    });

    EnableHudContext(-66088566);
    await Delay(5000);
    DisableHudContext(-66088566);
  },
  false,
);

RegisterCommand(
  'countdown',
  async () => {
    let i = 5;

    bindRootData('MPCountdown', { showTimer: true });
    while (i > 0) {
      bindRootData('MPCountdown', { Timer: String(i--) });
      await Delay(1000);
    }

    bindRootData('MPCountdown', { showTimer: false });
  },
  false,
);

RegisterCommand(
  'leaderboard',
  async () => {
    const listItems: Databindings.PostMatchAndLeaderboard.LeaderboardListItem[] = [];

    for (let i = 0; i < 7; i++) {
      listItems.push({
        Position: i,
        ShowCross: i > 1 && i < 4,
        CrossColor: GetHashKey('COLOR_BLUE'),
        Gamertag: `Gamertag ${i}`,
        GamertagColor: GetHashKey('COLOR_RED'),
        ShowCrewTag: true,
        CrewTag: 'CrewTag',
        ShowRank: i < 5,
        Rank: `${i}`,
        Spectating: i >= 5,
        Stat0: 'Stat0',
        Stat1: 'Stat1',
        Stat2: 'Stat2',
        Stat3: 'Stat3',
        ShowBlip: i !== 3,
        BlipColor: i === 0 ? GetHashKey('COLOR_YELLOW') : GetHashKey('COLOR_RED'),
        Blip: i === 0 ? 'blip_mvp' : 'blip_ambient_ped_medium',
        isHighlighted: i === 2,
        HeadsetIconVisible: i === 3,
        HeadsetIconColor: GetHashKey('COLOR_PURE_WHITE'),
        SetOverlayImg: i % 2,
        ShowOverlay: i >= 4,
        AvatarDictionary: 'mp_lobby_textures',
        AvatarTexture: 'TEMP_PEDSHOT',
        AvatarAlpha: 100 - i * 12,
      });
    }

    bindRootData('PostMatchAndLeaderboard', {
      Title: {
        Heading: 'Heading',
        HeadingColor: GetHashKey('COLOR_PURE_WHITE'),
        Stat1: 'Stat1',
        Stat1Color: GetHashKey('COLOR_GREEN'),
        Stat2: 'Stat2',
        Stat2Color: GetHashKey('COLOR_YELLOW'),
        Stat3: 'Stat3',
        Stat3Color: GetHashKey('COLOR_BLUE'),
      },
      LeaderboardList: {
        info_visible_06: false,
        info_visible_07: false,
        info_visible_08: false,
        info_value_06: 'info_value_06',
        info_value_07: 'info_value_07',
        info_value_08: 'info_value_08',
        LeaderboardListItem: listItems,
      },
    });

    LaunchUiappByHashWithEntry(GetHashKey('LEADERBOARDS'), GetHashKey('LEADERBOARD'));
    await Delay(5000);
    CloseUiappByHash(GetHashKey('LEADERBOARDS'));
  },
  false,
);

RegisterCommand(
  'fasttravel',
  async () => {
    const listItems: Databindings.DynamicListItem[] = [];

    for (let i = 0; i < 7; i++) {
      listItems.push({
        _type: i % 2 === 0 ? 'ft_dynamic_text_and_price' : 'ft_dynamic_dual_text_item',
        dynamic_list_item_enabled: true,
        dynamic_list_item_visible: true,
        dynamic_list_item_main_color: GetHashKey('COLOR_BLUE'),
        dynamic_list_item_secondary_color: GetHashKey('COLOR_GREEN'),
        dynamic_list_item_tertiary_color: GetHashKey('COLOR_RED'),
        dynamic_list_item_raw_text_entry: 'Blackwater',
        // dynamic_list_item_text_label_entry: GetHashKey('WEAPON_PISTOL_VOLCANIC'),
        dynamic_list_item_secondary_raw_text_entry: 'test',
        dynamic_list_item_secondary_text_enabled: true,
        dynamic_list_item_secondary_text_visible: true,
        dynamic_list_item_extra_int_field_one_value: 100,
        dynamic_list_item_extra_int_field_two_value: 200,
        dynamic_list_item_extra_text_field_entry_two_visibility: true,
        dynamic_list_item_extra_int_field_three_value: 300,
        dynamic_list_item_extra_text_field_entry_three_visibility: true,
      });
    }

    bindRootData('FastTravel', {
      header: 'Header',
      subHeader: 'Sub Header',
      description: 'Description',
      subFooter: 'Sub Footer',
      locationList: {
        Fast_Travel_Location: listItems,
      },
    });

    LaunchUiappByHash('FAST_TRAVEL_MENU');
    await Delay(5000);
    CloseUiappByHash('FAST_TRAVEL_MENU');
  },
  false,
);

SetSnowCoverageType(2);
