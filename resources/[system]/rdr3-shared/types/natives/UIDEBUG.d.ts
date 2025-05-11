/**
   * _BG_DISPLAY_TEXT
   * Note: you must use VAR_STRING
   *
   * @param {string | number} text
   * @param {number} x
   * @param {number} y
   * @return {void}
   */
declare function BgDisplayText(text: string | number, x: number, y: number): void;

/**
   * _BG_SET_TEXT_COLOR
   * https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/colours
   *
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @param {number} alpha
   * @return {void}
   */
declare function BgSetTextColor(red: number, green: number, blue: number, alpha: number): void;

/**
   * _BG_SET_TEXT_SCALE
   *
   * @param {number} scaleX
   * @param {number} scaleY
   * @return {void}
   */
declare function BgSetTextScale(scaleX: number, scaleY: number): void;