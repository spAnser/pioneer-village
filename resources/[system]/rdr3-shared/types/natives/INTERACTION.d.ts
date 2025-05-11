/**
   * SET_MOUSE_CURSOR_STYLE
   * Changes the mouse cursor's sprite.
   * 
   * spriteId's: https://github.com/femga/rdr3_discoveries/tree/master/graphics/HUD/cursor_sprites#readme
   * 
   * Old name: _SET_MOUSE_CURSOR_SPRITE
   *
   * @param {number} spriteId
   * @return {void}
   */
declare function SetMouseCursorStyle(spriteId: number): void;

/**
   * SET_MOUSE_CURSOR_THIS_FRAME
   * Shows the cursor on screen for one frame.
   * 
   * Old name: _SET_MOUSE_CURSOR_ACTIVE_THIS_FRAME
   *
  
   * @return {void}
   */
declare function SetMouseCursorThisFrame(): void;

/**
   * _POINTER_IS_BEING_MOVED
   * Returns true if player is moving mouse while cursor is active
   * _PI* - _PO*
   *
  
   * @return {boolean}
   */
declare function PointerIsBeingMoved(): boolean;

/**
   * _POINTER_IS_LEFT_BUTTON_HELD
   * Returns true if player is holding LMB while cursor is active
   * _PI* - _PO*
   *
  
   * @return {boolean}
   */
declare function PointerIsLeftButtonHeld(): boolean;

/**
   * _POINTER_IS_LEFT_BUTTON_JUST_RELEASED
   * Returns true if player releases LMB if cursor is active
   * _PI* - _PO*
   *
  
   * @return {boolean}
   */
declare function PointerIsLeftButtonJustReleased(): boolean;

/**
   * _SET_ALLOW_FIRST_PERSON_MOUSE_CAMERA_MOVEMENT
   * Allows camera to be moved if middle mouse button is held while in first person
   * Must be called every frame
   * _SET*
   *
  
   * @return {void}
   */
declare function SetAllowFirstPersonMouseCameraMovement(): void;