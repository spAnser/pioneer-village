/**
   * CASHINVENTORY_INIT_SESSION_STATUS
   *
  
   * @return {[boolean, number, number]}
   */
declare function CashinventoryInitSessionStatus(): [boolean, number, number];

/**
   * CASHINVENTORY_IS_CONNECTION_FAULTED
   *
  
   * @return {boolean}
   */
declare function CashinventoryIsConnectionFaulted(): boolean;

/**
   * _0x38640A8C2DEF011B
   *
   * @param {number} p0
   * @return {number}
   */
declare function N_0x38640A8C2DEF011B(p0: number): number;

/**
   * _0x3FA09DD57B93C0DE
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {any} p3
   * @param {number} p4
   * @return {boolean}
   */
declare function N_0x3FA09DD57B93C0DE(p0: Hash, p1: number, p2: number, p3: any, p4: number): boolean;

/**
   * _0x92A32BA29622763F
   *
   * @param {number} id
   * @param {number} index
   * @param {DataView} p2
   * @return {boolean}
   */
declare function N_0x92A32BA29622763F(id: number, index: number, p2: DataView): boolean;

/**
   * _0xA0B7094629724974
   *
   * @param {number} p0
   * @param {any} p1
   * @return {boolean}
   */
declare function N_0xA0B7094629724974(p0: Hash, p1: any): boolean;

/**
   * _0xA3B8D31C13CB4239
   *
   * @param {number} p0
   * @param {number} p1
   * @param {DataView} p2
   * @param {number} p3
   * @param {DataView} p4
   * @param {number} p5
   * @return {boolean}
   */
declare function N_0xA3B8D31C13CB4239(p0: number, p1: Hash, p2: DataView, p3: number, p4: DataView, p5: number): boolean;

/**
   * _0xB6F4557060EF0FB4
   *
   * @param {number} p0
   * @param {number} p1
   * @return {number}
   */
declare function N_0xB6F4557060EF0FB4(p0: number, p1: number): number;

/**
   * _0xCE54C9ABE6FBC6DB
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function N_0xCE54C9ABE6FBC6DB(p0: Hash): boolean;

/**
   * _0xD1555FBC96C88444
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {any} p3
   * @param {number} p4
   * @return {boolean}
   */
declare function N_0xD1555FBC96C88444(p0: Hash, p1: number, p2: number, p3: any, p4: number): boolean;

/**
   * _CASHINVENTORY_INIT_SESSION_IS_FAULTED
   *
  
   * @return {boolean}
   */
declare function CashinventoryInitSessionIsFaulted(): boolean;

/**
   * _CASHINVENTORY_IS_SESSION_READY
   *
  
   * @return {boolean}
   */
declare function CashinventoryIsSessionReady(): boolean;

/**
   * _CASHINVENTORY_TRANSACTION_ADD_AWARD
   *
   * @param {number} id
   * @param {number} hash
   * @param {DataView} p2
   * @param {DataView} p3
   * @return {boolean}
   */
declare function CashinventoryTransactionAddAward(id: number, hash: Hash, p2: DataView, p3: DataView): boolean;

/**
   * _CASHINVENTORY_TRANSACTION_CHECKOUT
   *
   * @param {number} id
   * @return {boolean}
   */
declare function CashinventoryTransactionCheckout(id: number): boolean;

/**
   * _CASHINVENTORY_TRANSACTION_CHECKOUT_STATUS
   *
   * @param {number} id
   * @return {[boolean, number]}
   */
declare function CashinventoryTransactionCheckoutStatus(id: number): [boolean, number];

/**
   * _CASHINVENTORY_TRANSACTION_DELETE
   *
   * @param {number} id
   * @return {boolean}
   */
declare function CashinventoryTransactionDelete(id: number): boolean;

/**
   * _CASHINVENTORY_TRANSACTION_FIRE_AND_FORGET_ITEM
   *
   * @param {number} actionHash
   * @param {DataView} item
   * @param {number} p3
   * @return {[boolean, number]}
   */
declare function CashinventoryTransactionFireAndForgetItem(actionHash: Hash, item: DataView, p3: number): [boolean, number];

/**
   * _CASHINVENTORY_TRANSACTION_GET_ACTION
   *
   * @param {number} id
   * @return {number}
   */
declare function CashinventoryTransactionGetAction(id: number): number;

/**
   * _CASHINVENTORY_TRANSACTION_GET_BASKET_IS_VALID
   *
   * @param {number} id
   * @return {boolean}
   */
declare function CashinventoryTransactionGetBasketIsValid(id: number): boolean;

/**
   * _CASHINVENTORY_TRANSACTION_GET_ITEM_INFO
   *
   * @param {number} id
   * @param {number} index
   * @param {DataView} itemInfo
   * @return {boolean}
   */
declare function CashinventoryTransactionGetItemInfo(id: number, index: number, itemInfo: DataView): boolean;

/**
   * _CASHINVENTORY_TRANSACTION_GET_NUM_OF_ITEMS
   *
   * @param {number} id
   * @return {number}
   */
declare function CashinventoryTransactionGetNumOfItems(id: number): number;

/**
   * _CASHINVENTORY_TRANSACTION_RESPONSE_GET_ITEM_INFO
   *
   * @param {number} id
   * @param {number} index
   * @param {DataView} itemInfo
   * @return {boolean}
   */
declare function CashinventoryTransactionResponseGetItemInfo(id: number, index: number, itemInfo: DataView): boolean;

/**
   * _CASHINVENTORY_TRANSACTION_START
   *
   * @param {number} type
   * @param {number} actionHash
   * @return {[boolean, number]}
   */
declare function CashinventoryTransactionStart(type: Hash, actionHash: Hash): [boolean, number];

/**
   * _CASHINVENTORY_TRANSACTION_VALIDATE_ITEM
   *
   * @param {number} p0
   * @param {DataView} p1
   * @return {number}
   */
declare function CashinventoryTransactionValidateItem(p0: Hash, p1: DataView): number;