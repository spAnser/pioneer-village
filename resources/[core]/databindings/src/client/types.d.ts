declare interface ClientExports {
  ['databindings']: Databindings.ClientExports;
}

declare namespace Databindings {
  enum TextStyle {
    TRANSLATE_TEXT_HEADER,
    TRANSLATE_TEXT_SUB_HEADER,
    TRANSLATE_TEXT_BODY_LEFT,
    TRANSLATE_TEXT_BODY_CENTER,
    TRANSLATE_TEXT_BODY_JUSTIFY,
    TRANSLATE_TEXT_BODY_LEFT_AUTO_LENGTH,
    TRANSLATE_TEXT_BODY_CENTER_AUTO_LENGTH,
  }

  interface textFieldString {
    text: string;
    style: TextStyle;
  }

  interface textFieldHash {
    text: number;
    style: TextStyle;
  }

  interface divider {
    isVisible: boolean;
  }

  interface DynamicListItem {
    _type:
      | 'ft_dynamic_text_and_price'
      | 'ft_dynamic_dual_text_item'
      | 'dynamic_dual_text_item'
      | 'dynamic_dual_text_item_non_selectable'
      | 'dynamic_horse_list_item'
      | 'dynamic_large_image_and_stacked_text'
      | 'dynamic_large_image_and_stacked_text_new_input'
      | 'dynamic_large_image_and_stacked_text_with_fill'
      | 'dynamic_main_image_and_text'
      | 'dynamic_main_image_and_text_and_end_image'
      | 'dynamic_main_image_and_text_and_end_image_and_text'
      | 'dynamic_player_entry'
      | 'dynamic_player_entry_and_stepper'
      | 'dynamic_player_entry_and_text'
      | 'dynamic_small_image'
      | 'dynamic_text_and_counter'
      | 'dynamic_text_and_end_image'
      | 'dynamic_text_and_option_stepper'
      | 'dynamic_text_and_string_option_stepper'
      | 'dynamic_text_and_tank_bar'
      | 'dynamic_text_item'
      | 'pm_dynamic_dual_text_item'
      | 'pm_dynamic_posse_entry'
      | 'pm_dynamic_text_item';

    dynamic_list_item_enabled?: boolean;
    dynamic_list_item_visible?: boolean;
    dynamic_list_item_main_color?: number;
    dynamic_list_item_secondary_color?: number;
    dynamic_list_item_tertiary_color?: number;
    dynamic_list_item_raw_text_entry?: string;
    dynamic_list_item_text_label_entry?: number;
    dynamic_list_item_secondary_raw_text_entry?: string;
    dynamic_list_item_secondary_text_visible?: boolean;
    dynamic_list_item_secondary_text_enabled?: boolean;
    dynamic_list_item_extra_int_field_one_value?: number;
    dynamic_list_item_extra_int_field_two_value?: number;
    dynamic_list_item_extra_int_field_three_value?: number;
    dynamic_list_item_extra_text_field_entry_one_visibility?: boolean;
    dynamic_list_item_extra_text_field_entry_two_visibility?: boolean;
    dynamic_list_item_extra_text_field_entry_three_visibility?: boolean;
  }

  // Root Bindings

  interface helperTextfields {
    rawLabel0: string;
    rawValue0: string;
    rawLabel1: string;
    rawValue1: string;
  }

  interface MPCountdown {
    showTimer?: boolean;
    Timer?: string | number;
  }

  namespace PostMatchAndLeaderboard {
    interface Title {
      Heading: string;
      HeadingColor: number;
      Stat1: string;
      Stat1Color: number;
      Stat2: string;
      Stat2Color: number;
      Stat3: string;
      Stat3Color: number;
    }

    interface LeaderboardList {
      info_visible_06: boolean;
      info_visible_07: boolean;
      info_visible_08: boolean;
      info_value_06: string;
      info_value_07: string;
      info_value_08: string;
      LeaderboardListItem: LeaderboardListItem[];
    }

    interface LeaderboardListItem {
      Position: number;
      ShowCross: boolean;
      CrossColor: number;
      Gamertag: string;
      GamertagColor: number;
      ShowCrewTag: boolean;
      CrewTag: string;
      ShowRank: boolean;
      Rank: string;
      Spectating: boolean;
      Stat0: string;
      Stat1: string;
      Stat2: string;
      Stat3: string;
      ShowBlip: boolean;
      BlipColor: number;
      Blip: string;
      isHighlighted: boolean;
      HeadsetIconVisible: boolean;
      HeadsetIconColor: number;
      SetOverlayImg: number;
      ShowOverlay: boolean;
      AvatarDictionary: string;
      AvatarTexture: string;
      AvatarAlpha: number;
    }
  }

  interface PostMatchAndLeaderboard {
    Title: PostMatchAndLeaderboard.Title;
    LeaderboardList: PostMatchAndLeaderboard.LeaderboardList;
  }

  namespace FastTravel {
    interface locationList {
      Fast_Travel_Location: DynamicListItem[];
    }
  }

  interface FastTravel {
    header: string;
    subHeader: string;
    description: string;
    subFooter: string;
    locationList: FastTravel.locationList;
  }

  interface RootBindings {
    helperTextfields: helperTextfields;
    MPCountdown: MPCountdown;
    PostMatchAndLeaderboard: PostMatchAndLeaderboard;
    FastTravel: FastTravel;
  }

  interface RootTypes {
    helperTextfields: helperTextfields;
    MPCountdown: MPCountdown;
    PostMatchAndLeaderboard: PostMatchAndLeaderboard;
    FastTravel: FastTravel;
  }

  type BindingType = 'bool' | 'int' | 'float' | 'string' | 'hash' | 'container' | 'container[]' | 'list';

  type RootBindingTypes = {
    [K in keyof RootTypes]: Record<keyof RootTypes[K], BindingType>;
  };

  type RootDataTypes = Record<keyof RootBindings, keyof RootBindingTypes>;

  type bindRootData = <T extends keyof RootBindings>(index: T, data: RootBindings[T]) => void;

  // Bindings

  interface Generic {
    textField0?: textFieldHash;
    textField0Strike?: textFieldHash;
    divider0?: divider;
    textField1?: textFieldHash;
    textField1Strike?: textFieldHash;
    divider1?: divider;
    textField2?: textFieldHash;
    textField2Strike?: textFieldHash;
    divider2?: divider;
    textField3?: textFieldHash;
    textField3Strike?: textFieldHash;
    divider3?: divider;
    textField4?: textFieldHash;
    textField4Strike?: textFieldHash;
    divider4?: divider;
    textField5?: textFieldHash;
    textField5Strike?: textFieldHash;
    divider5?: divider;
    textField6?: textFieldHash;
    textField6Strike?: textFieldHash;
    divider6?: divider;
    textField7?: textFieldHash;
    textField7Strike?: textFieldHash;
    divider7?: divider;
    textField8?: textFieldHash;
    textField8Strike?: textFieldHash;
    divider8?: divider;
    textField9?: textFieldHash;
    textField9Strike?: textFieldHash;
    divider9?: divider;
    textField10?: textFieldHash;
    textField10Strike?: textFieldHash;
    divider10?: divider;
    textField11?: textFieldHash;
    textField11Strike?: textFieldHash;
    divider11?: divider;
    textField12?: textFieldHash;
    textField12Strike?: textFieldHash;
    divider12?: divider;
    textField13?: textFieldHash;
    textField13Strike?: textFieldHash;
    divider13?: divider;
    textField14?: textFieldHash;
    textField14Strike?: textFieldHash;
    divider14?: divider;
    textField15?: textFieldHash;
    textField15Strike?: textFieldHash;
    divider15?: divider;
    textField16?: textFieldHash;
    textField16Strike?: textFieldHash;
    divider16?: divider;
    textField17?: textFieldHash;
    textField17Strike?: textFieldHash;
    divider17?: divider;
    textField18?: textFieldHash;
    textField18Strike?: textFieldHash;
    divider18?: divider;
    textField19?: textFieldHash;
    textField19Strike?: textFieldHash;
    divider19?: divider;
    textField20?: textFieldHash;
    textField20Strike?: textFieldHash;
    divider20?: divider;
    textField21?: textFieldHash;
    textField21Strike?: textFieldHash;
    divider21?: divider;
    textField22?: textFieldHash;
    textField22Strike?: textFieldHash;
    divider22?: divider;
    textField23?: textFieldHash;
    textField23Strike?: textFieldHash;
  }

  interface Catalogue {
    textField0?: textFieldString;
    divider0?: divider;
    textField1?: textFieldHash;
    divider1?: divider;
    textField2?: textFieldString;
    divider2?: divider;
    textField3?: textFieldHash;
    divider3?: divider;
    textField4?: textFieldHash;
    divider4?: divider;
    textField5?: textFieldHash;
    divider5?: divider;
    textField6?: textFieldHash;
    divider6?: divider;
    textField7?: textFieldHash;
    divider7?: divider;
    textField8?: textFieldHash;
    divider8?: divider;
    textField9?: textFieldHash;
    divider9?: divider;
    textField10?: textFieldHash;
    divider10?: divider;
    textField11?: textFieldHash;
    divider11?: divider;
    textField12?: textFieldHash;
    divider12?: divider;
    textField13?: textFieldHash;
    divider13?: divider;
    textField14?: textFieldHash;
    divider14?: divider;
    textField15?: textFieldHash;
    divider15?: divider;
    textField16?: textFieldHash;
    divider16?: divider;
    textField17?: textFieldHash;
    divider17?: divider;
    textField18?: textFieldHash;
    divider18?: divider;
    textField19?: textFieldHash;
    divider19?: divider;
    textField20?: textFieldHash;
    divider20?: divider;
    textField21?: textFieldHash;
    divider21?: divider;
    textField22?: textFieldHash;
    divider22?: divider;
    textField23?: textFieldHash;
    divider23?: divider;
    textField24?: textFieldHash;
    divider24?: divider;
  }

  interface Poster {
    isVisible: boolean;
    isDiffVisible: boolean;
    type: number;
    difficulty: number;
    price: string;
    body: string;
    header: string;
    name: string;
    tex: string | number;
    txd: string | number;
  }

  interface LegendaryPoster {
    isVisible: boolean;
    tex: string | number;
    txd: string | number;
    header: string;
    setDifficulty: number;
  }

  interface AdvertPoster {
    isVisible: boolean;
    tex: string | number;
    txd: string | number;
  }

  interface CatalogItemInspection {
    isVisible: boolean;
    itemLabel: number;
    itemDescription: string;
    purchaseLabel: string;
    purchasePrice: number;
    tokenPrice: number;
    isGoldPrice: boolean;
    purchaseModifiedPrice: number;
    modifiedPriceVisible: boolean;
    modifiedPriceGold: boolean;
    ammoVisible: boolean;
    ammoCurrent: number;
    ammoMax: number;
    ammoTextureDictionary: string;
    ammoTexture: string;
    mailVisible: boolean;
    mailCurrent: number;
  }

  interface price_details {
    // ammoVisible: boolean;
    // ammoCurrent: number;
    // ammoMax: number;
    // ammoTextureDictionary: string;
    // ammoTexture: string;
    purchasePrice: number;
    isGoldPrice: boolean;
    modifiedPriceVisible: boolean;
    modifiedPriceGold: boolean;
    purchaseModifiedPrice: number;
  }

  interface bottomRightStack {
    isVisible: boolean;
    // itemCreationList: 'list';
  }

  interface Bindings {
    Generic: Generic;
    Catalogue: Catalogue;
    Poster0: Poster;
    Poster1: Poster;
    Poster2: Poster;
    legendaryPoster0: LegendaryPoster;
    legendaryPoster1: LegendaryPoster;
    legendaryPoster2: LegendaryPoster;
    advertPoster0: AdvertPoster;
    advertPoster1: AdvertPoster;
    advertPoster2: AdvertPoster;
    CatalogItemInspection: CatalogItemInspection;
    price_details: price_details; // TODO: Move to RootBindings?
    bottomRightStack: bottomRightStack;
  }

  interface Types {
    Generic: Generic;
    Catalogue: Catalogue;
    Poster: Poster;
    LegendaryPoster: LegendaryPoster;
    AdvertPoster: AdvertPoster;
    CatalogItemInspection: CatalogItemInspection;
    price_details: price_details; // TODO: Move to RootTypes?
    bottomRightStack: bottomRightStack;
  }

  type BindingsContainer = Record<keyof Types, string>;

  type BindingTypes = {
    [K in keyof Types]: Record<keyof Types[K], BindingType>;
  };

  type DataTypes = Record<keyof Bindings, keyof BindingTypes>;

  type bindData = <T extends keyof Bindings>(index: T, data: Bindings[T]) => void;

  type ClientExports = {
    bindRootData: bindRootData;
    bindData: bindData;
  };
}

declare interface UIRPC {}

declare interface UIEvents {}
