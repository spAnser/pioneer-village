/**
   * CLEAR_CONTROL_LIGHT_EFFECT
   * nullsub, doesn't do anything
   *
   * @param {number} control
   * @return {void}
   */
declare function ClearControlLightEffect(control: number): void;

/**
   * CLEAR_CONTROL_SHAKE_SUPPRESSED_ID
   * Old name: _CLEAR_SUPPRESSED_PAD_RUMBLE
   *
   * @param {number} control
   * @return {void}
   */
declare function ClearControlShakeSuppressedId(control: number): void;

/**
   * DISABLE_ALL_CONTROL_ACTIONS
   *
   * @param {number} control
   * @return {void}
   */
declare function DisableAllControlActions(control: number): void;

/**
   * DISABLE_CONTROL_ACTION
   *
   * @param {number} control
   * @param {number} action
   * @param {boolean} disableRelatedActions
   * @return {void}
   */
declare function DisableControlAction(control: number, action: Hash, disableRelatedActions: boolean): void;

/**
   * ENABLE_CONTROL_ACTION
   *
   * @param {number} control
   * @param {number} action
   * @param {boolean} enableRelatedActions
   * @return {void}
   */
declare function EnableControlAction(control: number, action: Hash, enableRelatedActions: boolean): void;

/**
   * GET_CONTROL_HOW_LONG_AGO
   * Returns time in ms since last input.
   *
   * @param {number} control
   * @return {number}
   */
declare function GetControlHowLongAgo(control: number): number;

/**
   * GET_CONTROL_NORMAL
   *
   * @param {number} control
   * @param {number} action
   * @return {number}
   */
declare function GetControlNormal(control: number, action: Hash): number;

/**
   * GET_CONTROL_UNBOUND_NORMAL
   *
   * @param {number} control
   * @param {number} action
   * @return {number}
   */
declare function GetControlUnboundNormal(control: number, action: Hash): number;

/**
   * GET_CONTROL_VALUE
   *
   * @param {number} control
   * @param {number} action
   * @return {number}
   */
declare function GetControlValue(control: number, action: Hash): number;

/**
   * GET_DISABLED_CONTROL_NORMAL
   *
   * @param {number} control
   * @param {number} action
   * @return {number}
   */
declare function GetDisabledControlNormal(control: number, action: Hash): number;

/**
   * GET_DISABLED_CONTROL_UNBOUND_NORMAL
   *
   * @param {number} control
   * @param {number} action
   * @return {number}
   */
declare function GetDisabledControlUnboundNormal(control: number, action: Hash): number;

/**
   * HAVE_CONTROLS_CHANGED
   *
   * @param {number} control
   * @return {boolean}
   */
declare function HaveControlsChanged(control: number): boolean;

/**
   * IS_CONTROL_ENABLED
   *
   * @param {number} control
   * @param {number} action
   * @return {boolean}
   */
declare function IsControlEnabled(control: number, action: Hash): boolean;

/**
   * IS_CONTROL_JUST_PRESSED
   *
   * @param {number} control
   * @param {number} action
   * @return {boolean}
   */
declare function IsControlJustPressed(control: number, action: Hash): boolean;

/**
   * IS_CONTROL_JUST_RELEASED
   *
   * @param {number} control
   * @param {number} action
   * @return {boolean}
   */
declare function IsControlJustReleased(control: number, action: Hash): boolean;

/**
   * IS_CONTROL_PRESSED
   *
   * @param {number} control
   * @param {number} action
   * @return {boolean}
   */
declare function IsControlPressed(control: number, action: Hash): boolean;

/**
   * IS_CONTROL_RELEASED
   *
   * @param {number} control
   * @param {number} action
   * @return {boolean}
   */
declare function IsControlReleased(control: number, action: Hash): boolean;

/**
   * IS_DISABLED_CONTROL_JUST_PRESSED
   *
   * @param {number} control
   * @param {number} action
   * @return {boolean}
   */
declare function IsDisabledControlJustPressed(control: number, action: Hash): boolean;

/**
   * IS_DISABLED_CONTROL_JUST_RELEASED
   *
   * @param {number} control
   * @param {number} action
   * @return {boolean}
   */
declare function IsDisabledControlJustReleased(control: number, action: Hash): boolean;

/**
   * IS_DISABLED_CONTROL_PRESSED
   *
   * @param {number} control
   * @param {number} action
   * @return {boolean}
   */
declare function IsDisabledControlPressed(control: number, action: Hash): boolean;

/**
   * IS_LOOK_INVERTED
   *
  
   * @return {boolean}
   */
declare function IsLookInverted(): boolean;

/**
   * IS_USING_KEYBOARD_AND_MOUSE
   * padIndex is not used
   * 
   * Old name: _IS_USING_KEYBOARD
   *
   * @param {number} control
   * @return {boolean}
   */
declare function IsUsingKeyboardAndMouse(control: number): boolean;

/**
   * SET_CONTROL_LIGHT_EFFECT_COLOR
   * nullsub, doesn't do anything
   * 
   * Old name: _SET_CONTROL_GROUP_COLOR
   *
   * @param {number} control
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @return {void}
   */
declare function SetControlLightEffectColor(control: number, red: number, green: number, blue: number): void;

/**
   * SET_CONTROL_LIGHT_EFFECT_FLASHING_COLOR
   * nullsub, doesn't do anything
   *
   * @param {number} control
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @return {void}
   */
declare function SetControlLightEffectFlashingColor(control: number, red: number, green: number, blue: number): void;

/**
   * SET_CONTROL_SHAKE
   * Old name: SET_PAD_SHAKE
   *
   * @param {number} control
   * @param {number} duration
   * @param {number} frequency
   * @return {void}
   */
declare function SetControlShake(control: number, duration: number, frequency: number): void;

/**
   * SET_CONTROL_SHAKE_SUPPRESSED_ID
   * Old name: SET_PAD_SHAKE_SUPPRESSED_ID
   *
   * @param {number} control
   * @param {number} uniqueId
   * @return {void}
   */
declare function SetControlShakeSuppressedId(control: number, uniqueId: number): void;

/**
   * SET_CONTROL_TRIGGER_SHAKE
   * nullsub, doesn't do anything
   *
   * @param {number} control
   * @param {number} leftDuration
   * @param {number} leftFrequency
   * @param {number} rightDuration
   * @param {number} rightFrequency
   * @return {void}
   */
declare function SetControlTriggerShake(control: number, leftDuration: number, leftFrequency: number, rightDuration: number, rightFrequency: number): void;

/**
   * SET_CONTROL_VALUE_NEXT_FRAME
   * This is for simulating player input.
   * value is a float value from 0 - 1
   * 
   * control: see IS_CONTROL_ENABLED
   * 
   * Old name: _SET_CONTROL_NORMAL
   *
   * @param {number} control
   * @param {number} action
   * @param {number} value
   * @return {boolean}
   */
declare function SetControlValueNextFrame(control: number, action: Hash, value: number): boolean;

/**
   * SET_INPUT_EXCLUSIVE
   *
   * @param {number} control
   * @param {number} action
   * @return {void}
   */
declare function SetInputExclusive(control: number, action: Hash): void;

/**
   * STOP_CONTROL_SHAKE
   * Old name: STOP_PAD_SHAKE
   *
   * @param {number} control
   * @return {void}
   */
declare function StopControlShake(control: number): void;

/**
   * _0x1252C029FC8EBB4D
   * _IS_R* - _IS_S*
   *
  
   * @return {boolean}
   */
declare function N_0x1252C029FC8EBB4D(): boolean;

/**
   * _0x43F35DDB2905D945
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x43F35DDB2905D945(p0: any, p1: any): any;

/**
   * _0x52C68E92D6E23ADD
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x52C68E92D6E23ADD(p0: any): void;

/**
   * _0x5F217BC1190503D8
   * rumbleCurve: common_0/data/rumblecurves.meta
   *
   * @param {string | number} rumbleCurve
   * @param {number} p1
   * @return {void}
   */
declare function N_0x5F217BC1190503D8(rumbleCurve: string | number, p1: number): void;

/**
   * _0x709BA8C08C5C008D
   *
  
   * @return {void}
   */
declare function N_0x709BA8C08C5C008D(): void;

/**
   * _0xBD629C1C4F501C80
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xBD629C1C4F501C80(p0: any): any;

/**
   * _GET_CURRENT_CONTROL_CONTEXT
   * Gets the current control context. See: _SET_CONTROL_CONTEXT
   *
   * @param {number} control
   * @return {number}
   */
declare function GetCurrentControlContext(control: number): number;

/**
   * _GET_DISABLED_CONTROL_HOW_LONG_AGO
   *
   * @param {number} control
   * @return {number}
   */
declare function GetDisabledControlHowLongAgo(control: number): number;

/**
   * _IS_CONTROL_ACTION_VALID
   *
   * @param {number} action
   * @param {number} control
   * @return {boolean}
   */
declare function IsControlActionValid(action: Hash, control: number): boolean;

/**
   * _SET_CONTROL_CONTEXT
   * Sets the current control context. Must be called every frame.
   * 
   * context: https://alloc8or.re/rdr3/doc/misc/input_contexts.txt
   * For more information, see common:/data/control/settings.meta
   * https://github.com/femga/rdr3_discoveries/tree/master/Controls
   *
   * @param {number} control
   * @param {number} context
   * @return {void}
   */
declare function SetControlContext(control: number, context: Hash): void;