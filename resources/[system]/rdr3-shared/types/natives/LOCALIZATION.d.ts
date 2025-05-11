/**
   * GET_CURRENT_LANGUAGE
   * 0 = american (en-US)
   * 1 = french (fr-FR)
   * 2 = german (de-DE)
   * 3 = italian (it-IT)
   * 4 = spanish (es-ES)
   * 5 = brazilian (pt-BR)
   * 6 = polish (pl-PL)
   * 7 = russian (ru-RU)
   * 8 = korean (ko-KR)
   * 9 = chinesetrad (zh-TW)
   * 10 = japanese (ja-JP)
   * 11 = mexican (es-MX)
   * 12 = chinesesimp (zh-CN)
   *
  
   * @return {number}
   */
declare function GetCurrentLanguage(): number;

/**
   * LOCALIZATION_GET_SYSTEM_DATE_TYPE
   * 0 = DATE_FORMAT_DMY
   * 1 = DATE_FORMAT_MDY
   * 2 = DATE_FORMAT_YMD
   * 
   * Old name: _LOCALIZATION_GET_SYSTEM_DATE_FORMAT
   *
  
   * @return {number}
   */
declare function LocalizationGetSystemDateType(): number;

/**
   * LOCALIZATION_GET_SYSTEM_LANGUAGE
   * Same return values as GET_CURRENT_LANGUAGE
   *
  
   * @return {number}
   */
declare function LocalizationGetSystemLanguage(): number;

/**
   * _DOES_CURRENT_LANGUAGE_SUPPORT_CONDENSED_STYLE
   * Returns true if the current language is american, french, german, italian, spanish, brazilian or mexican.
   * _DOES_*
   *
  
   * @return {boolean}
   */
declare function DoesCurrentLanguageSupportCondensedStyle(): boolean;