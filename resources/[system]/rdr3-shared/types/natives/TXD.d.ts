/**
   * DOES_STREAMED_TEXTURE_DICT_EXIST
   *
   * @param {string | number} textureDict
   * @return {boolean}
   */
declare function DoesStreamedTextureDictExist(textureDict: string | number): boolean;

/**
   * DOES_STREAMED_TXD_EXIST
   *
   * @param {number} txdHash
   * @return {boolean}
   */
declare function DoesStreamedTxdExist(txdHash: Hash): boolean;

/**
   * HAS_STREAMED_TEXTURE_DICT_LOADED
   *
   * @param {string | number} textureDict
   * @return {boolean}
   */
declare function HasStreamedTextureDictLoaded(textureDict: string | number): boolean;

/**
   * HAS_STREAMED_TXD_LOADED
   *
   * @param {number} txdHash
   * @return {boolean}
   */
declare function HasStreamedTxdLoaded(txdHash: Hash): boolean;

/**
   * REQUEST_STREAMED_TEXTURE_DICT
   *
   * @param {string | number} textureDict
   * @param {boolean} p1
   * @return {void}
   */
declare function RequestStreamedTextureDict(textureDict: string | number, p1: boolean): void;

/**
   * REQUEST_STREAMED_TXD
   *
   * @param {number} txdHash
   * @param {boolean} p1
   * @return {void}
   */
declare function RequestStreamedTxd(txdHash: Hash, p1: boolean): void;

/**
   * SET_STREAMED_TEXTURE_DICT_AS_NO_LONGER_NEEDED
   *
   * @param {string | number} textureDict
   * @return {void}
   */
declare function SetStreamedTextureDictAsNoLongerNeeded(textureDict: string | number): void;

/**
   * SET_STREAMED_TXD_AS_NO_LONGER_NEEDED
   *
   * @param {number} txdHash
   * @return {void}
   */
declare function SetStreamedTxdAsNoLongerNeeded(txdHash: Hash): void;