/**
   * DECOR_EXIST_ON
   * Returns whether or not the specified property is set for the entity.
   *
   * @param {number} entity
   * @param {string | number} propertyName
   * @return {boolean}
   */
declare function DecorExistOn(entity: Entity, propertyName: string | number): boolean;

/**
   * DECOR_GET_BOOL
   *
   * @param {number} entity
   * @param {string | number} propertyName
   * @return {boolean}
   */
declare function DecorGetBool(entity: Entity, propertyName: string | number): boolean;

/**
   * DECOR_GET_FLOAT
   *
   * @param {number} entity
   * @param {string | number} propertyName
   * @return {number}
   */
declare function DecorGetFloat(entity: Entity, propertyName: string | number): number;

/**
   * DECOR_GET_INT
   *
   * @param {number} entity
   * @param {string | number} propertyName
   * @return {number}
   */
declare function DecorGetInt(entity: Entity, propertyName: string | number): number;

/**
   * DECOR_IS_REGISTERED_AS_TYPE
   * type: see DECOR_REGISTER
   *
   * @param {string | number} propertyName
   * @param {number} type
   * @return {boolean}
   */
declare function DecorIsRegisteredAsType(propertyName: string | number, type: number): boolean;

/**
   * DECOR_REGISTER
   *
   * @param {string | number} propertyName
   * @param {number} type
   * @return {void}
   */
declare function DecorRegister(propertyName: string | number, type: number): void;

/**
   * DECOR_REMOVE
   *
   * @param {number} entity
   * @param {string | number} propertyName
   * @return {boolean}
   */
declare function DecorRemove(entity: Entity, propertyName: string | number): boolean;

/**
   * DECOR_REMOVE_ALL
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function DecorRemoveAll(entity: Entity): boolean;

/**
   * DECOR_SET_BOOL
   * This function sets metadata of type bool to specified entity.
   * 
   *
   * @param {number} entity
   * @param {string | number} propertyName
   * @param {boolean} value
   * @return {boolean}
   */
declare function DecorSetBool(entity: Entity, propertyName: string | number, value: boolean): boolean;

/**
   * DECOR_SET_FLOAT
   *
   * @param {number} entity
   * @param {string | number} propertyName
   * @param {number} value
   * @return {boolean}
   */
declare function DecorSetFloat(entity: Entity, propertyName: string | number, value: number): boolean;

/**
   * DECOR_SET_INT
   * Sets property to int.
   *
   * @param {number} entity
   * @param {string | number} propertyName
   * @param {number} value
   * @return {boolean}
   */
declare function DecorSetInt(entity: Entity, propertyName: string | number, value: number): boolean;

/**
   * DECOR_SET_STRING
   *
   * @param {number} entity
   * @param {string | number} propertyName
   * @param {string | number} value
   * @return {boolean}
   */
declare function DecorSetString(entity: Entity, propertyName: string | number, value: string | number): boolean;

/**
   * _DECOR_GET_UINT8
   *
   * @param {number} entity
   * @param {string | number} propertyName
   * @return {number}
   */
declare function DecorGetUint8(entity: Entity, propertyName: string | number): number;

/**
   * _DECOR_REGISTER_2
   *
   * @param {string | number} propertyName
   * @param {number} type
   * @param {boolean} p2
   * @return {void}
   */
declare function DecorRegister_2(propertyName: string | number, type: number, p2: boolean): void;

/**
   * _DECOR_SET_UINT8
   *
   * @param {number} entity
   * @param {string | number} propertyName
   * @param {number} value
   * @return {boolean}
   */
declare function DecorSetUint8(entity: Entity, propertyName: string | number, value: number): boolean;