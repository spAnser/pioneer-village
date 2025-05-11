/**
   * DATAARRAY_GET_BOOL
   *
   * @param {DataView} arrayData
   * @param {number} arrayIndex
   * @return {boolean}
   */
declare function DataarrayGetBool(arrayData: DataView, arrayIndex: number): boolean;

/**
   * DATAARRAY_GET_COUNT
   *
   * @param {DataView} arrayData
   * @return {number}
   */
declare function DataarrayGetCount(arrayData: DataView): number;

/**
   * DATAARRAY_GET_DICT
   *
   * @param {DataView} arrayData
   * @param {number} arrayIndex
   * @return {any}
   */
declare function DataarrayGetDict(arrayData: DataView, arrayIndex: number): any;

/**
   * DATAARRAY_GET_FLOAT
   *
   * @param {DataView} arrayData
   * @param {number} arrayIndex
   * @return {number}
   */
declare function DataarrayGetFloat(arrayData: DataView, arrayIndex: number): number;

/**
   * DATAARRAY_GET_INT
   *
   * @param {DataView} arrayData
   * @param {number} arrayIndex
   * @return {number}
   */
declare function DataarrayGetInt(arrayData: DataView, arrayIndex: number): number;

/**
   * DATAARRAY_GET_STRING
   *
   * @param {DataView} arrayData
   * @param {number} arrayIndex
   * @return {string | number}
   */
declare function DataarrayGetString(arrayData: DataView, arrayIndex: number): string | number;

/**
   * DATAARRAY_GET_TYPE
   * Types:
   * 1 = Boolean
   * 2 = Integer
   * 3 = Float
   * 4 = String
   * 5 = Vector3
   * 6 = Object
   * 7 = Array
   *
   * @param {DataView} arrayData
   * @param {number} arrayIndex
   * @return {number}
   */
declare function DataarrayGetType(arrayData: DataView, arrayIndex: number): number;

/**
   * DATAARRAY_GET_VECTOR
   *
   * @param {DataView} arrayData
   * @param {number} arrayIndex
   * @return {Vector3}
   */
declare function DataarrayGetVector(arrayData: DataView, arrayIndex: number): Vector3;

/**
   * DATADICT_GET_ARRAY
   *
   * @param {DataView} objectData
   * @param {string | number} key
   * @return {any}
   */
declare function DatadictGetArray(objectData: DataView, key: string | number): any;

/**
   * DATADICT_GET_BOOL
   *
   * @param {DataView} objectData
   * @param {string | number} key
   * @return {boolean}
   */
declare function DatadictGetBool(objectData: DataView, key: string | number): boolean;

/**
   * DATADICT_GET_DICT
   *
   * @param {DataView} objectData
   * @param {string | number} key
   * @return {any}
   */
declare function DatadictGetDict(objectData: DataView, key: string | number): any;

/**
   * DATADICT_GET_FLOAT
   *
   * @param {DataView} objectData
   * @param {string | number} key
   * @return {number}
   */
declare function DatadictGetFloat(objectData: DataView, key: string | number): number;

/**
   * DATADICT_GET_INT
   *
   * @param {DataView} objectData
   * @param {string | number} key
   * @return {number}
   */
declare function DatadictGetInt(objectData: DataView, key: string | number): number;

/**
   * DATADICT_GET_STRING
   *
   * @param {DataView} objectData
   * @param {string | number} key
   * @return {string | number}
   */
declare function DatadictGetString(objectData: DataView, key: string | number): string | number;

/**
   * DATADICT_GET_TYPE
   * Types:
   * 1 = Boolean
   * 2 = Integer
   * 3 = Float
   * 4 = String
   * 5 = Vector3
   * 6 = Object
   * 7 = Array
   *
   * @param {DataView} objectData
   * @param {string | number} key
   * @return {number}
   */
declare function DatadictGetType(objectData: DataView, key: string | number): number;

/**
   * DATADICT_GET_VECTOR
   *
   * @param {DataView} objectData
   * @param {string | number} key
   * @return {Vector3}
   */
declare function DatadictGetVector(objectData: DataView, key: string | number): Vector3;

/**
   * DATADICT_IS_ARRAY_VALID
   *
   * @param {DataView} fileDict
   * @return {boolean}
   */
declare function DatadictIsArrayValid(fileDict: DataView): boolean;

/**
   * DATADICT_IS_DICT_VALID
   *
   * @param {DataView} fileDict
   * @return {boolean}
   */
declare function DatadictIsDictValid(fileDict: DataView): boolean;

/**
   * DATADICT_SET_INT
   *
   * @param {DataView} objectData
   * @param {string | number} key
   * @param {number} value
   * @return {void}
   */
declare function DatadictSetInt(objectData: DataView, key: string | number, value: number): void;

/**
   * DATAFILE_CREATE
   *
   * @param {number} index
   * @return {void}
   */
declare function DatafileCreate(index: number): void;

/**
   * DATAFILE_DELETE
   *
   * @param {number} index
   * @return {void}
   */
declare function DatafileDelete(index: number): void;

/**
   * DATAFILE_DELETE_REQUESTED_FILE
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function DatafileDeleteRequestedFile(p0: any): boolean;

/**
   * DATAFILE_GET_FILE_DICT
   *
   * @param {number} index
   * @return {any}
   */
declare function DatafileGetFileDict(index: number): any;

/**
   * DATAFILE_HAS_LOADED_FILE_DATA
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function DatafileHasLoadedFileData(p0: any): boolean;

/**
   * DATAFILE_HAS_VALID_FILE_DATA
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function DatafileHasValidFileData(p0: any): boolean;

/**
   * DATAFILE_SELECT_ACTIVE_FILE
   *
   * @param {any} p0
   * @param {any} p1
   * @return {boolean}
   */
declare function DatafileSelectActiveFile(p0: any, p1: any): boolean;

/**
   * DATAFILE_UGC_SELECT_DATA
   * Reloops value returned by UGC_QUERY_GET_CONTENT_NUM
   *
   * @param {any} ugcRequestId
   * @param {number} index
   * @param {any} p2
   * @return {any}
   */
declare function DatafileUgcSelectData(ugcRequestId: any, index: number, p2: any): any;

/**
   * DATAFILE_WATCH_REQUEST_ID
   * Adds the given request ID to the watch list.
   *
   * @param {number} id
   * @return {void}
   */
declare function DatafileWatchRequestId(id: number): void;

/**
   * PARSEDDATA_IS_FILE_LOADED
   *
   * @param {number} fileHandle
   * @return {boolean}
   */
declare function ParseddataIsFileLoaded(fileHandle: number): boolean;

/**
   * PARSEDDATA_IS_FILE_VALID
   *
   * @param {number} fileHandle
   * @return {boolean}
   */
declare function ParseddataIsFileValid(fileHandle: number): boolean;

/**
   * PARSEDDATA_RQ_FILLOUT_HASH
   * Old name: _DATAFILE_GET_HASH
   *
   * @param {DataView} p1
   * @return {[boolean, number]}
   */
declare function ParseddataRqFilloutHash(p1: DataView): [boolean, number];

/**
   * PARSEDDATA_RQ_FILLOUT_NODE
   * Old name: _DATAFILE_GET_DATA_NODE_INDEX
   *
   * @param {DataView} p1
   * @return {[boolean, number]}
   */
declare function ParseddataRqFilloutNode(p1: DataView): [boolean, number];

/**
   * PARSEDDATA_RQ_FILLOUT_STRING_127
   *
   * @param {string | number} p0
   * @param {DataView} p1
   * @return {boolean}
   */
declare function ParseddataRqFilloutString_127(p0: string | number, p1: DataView): boolean;

/**
   * UGC2_SET_PLAYER_DATA
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {any}
   */
declare function Ugc2SetPlayerData(p0: any, p1: any, p2: any, p3: any): any;

/**
   * _0x1C65CC931C0F946F
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x1C65CC931C0F946F(p0: any, p1: any, p2: any): void;

/**
   * _0x277251C161B4C3F4
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x277251C161B4C3F4(p0: any, p1: any, p2: any): void;

/**
   * _0x3168BA5D6DECE323
   * nullsub, doesn't do anything
   *
  
   * @return {void}
   */
declare function N_0x3168BA5D6DECE323(): void;

/**
   * _0x4F9E3ED7617123AC
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x4F9E3ED7617123AC(p0: any): any;

/**
   * _0x7681B677400C7071
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function N_0x7681B677400C7071(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * _0x9F130129EBC31B34
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x9F130129EBC31B34(p0: any, p1: any, p2: any): void;

/**
   * _0xBC0DF006A4952C68
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xBC0DF006A4952C68(p0: any, p1: any, p2: any): void;

/**
   * _0xCA56DD6AB7A39F64
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xCA56DD6AB7A39F64(p0: any): any;

/**
   * _0xE13634BB6BAF0734
   *
   * @param {number} p0
   * @param {number} p1
   * @return {number}
   */
declare function N_0xE13634BB6BAF0734(p0: number, p1: number): number;

/**
   * _PARSEDDATA_GET_BOOL
   *
   * @param {DataView} p1
   * @param {number} p2
   * @return {[boolean, boolean]}
   */
declare function ParseddataGetBool(p1: DataView, p2: Hash): [boolean, boolean];

/**
   * _PARSEDDATA_GET_ENTRIES
   * Returns false when there are no entries.
   *
   * @param {DataView} p0
   * @return {boolean}
   */
declare function ParseddataGetEntries(p0: DataView): boolean;

/**
   * _PARSEDDATA_GET_FILE
   * Opens file.
   *
   * @param {DataView} p0
   * @return {void}
   */
declare function ParseddataGetFile(p0: DataView): void;

/**
   * _PARSEDDATA_GET_FLOAT
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {number} p2
   * @return {boolean}
   */
declare function ParseddataGetFloat(p0: DataView, p1: DataView, p2: Hash): boolean;

/**
   * _PARSEDDATA_GET_INT
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {number} p2
   * @return {boolean}
   */
declare function ParseddataGetInt(p0: DataView, p1: DataView, p2: Hash): boolean;

/**
   * _PARSEDDATA_GET_NUM_CHILDREN
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function ParseddataGetNumChildren(p0: any, p1: any): any;

/**
   * _PARSEDDATA_GET_SECTION
   *
   * @param {DataView} p0
   * @param {DataView} p1
   * @param {number} section
   * @return {boolean}
   */
declare function ParseddataGetSection(p0: DataView, p1: DataView, section: Hash): boolean;

/**
   * _PARSEDDATA_LOAD_FILE_HASH
   * LOAD_PARSEDDATA_FILE_FAILSAFE_HASH
   * Returns parseddata script fileHandle
   *
   * @param {number} p0
   * @return {number}
   */
declare function ParseddataLoadFileHash(p0: Hash): number;

/**
   * _PARSEDDATA_REGISTER_QUERY
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function ParseddataRegisterQuery(p0: any, p1: any, p2: any): any;

/**
   * _PARSEDDATA_RQ_FILLOUT_BOOL
   * Old name: _DATAFILE_GET_BOOL
   *
   * @param {DataView} p1
   * @return {[boolean, boolean]}
   */
declare function ParseddataRqFilloutBool(p1: DataView): [boolean, boolean];

/**
   * _PARSEDDATA_RQ_FILLOUT_FLOAT
   * Old name: _DATAFILE_GET_FLOAT
   *
   * @param {DataView} p1
   * @return {[boolean, number]}
   */
declare function ParseddataRqFilloutFloat(p1: DataView): [boolean, number];

/**
   * _PARSEDDATA_RQ_FILLOUT_INT
   * Old name: _DATAFILE_GET_INT
   *
   * @param {DataView} p1
   * @return {[boolean, number]}
   */
declare function ParseddataRqFilloutInt(p1: DataView): [boolean, number];

/**
   * _PARSEDDATA_RQ_FILLOUT_STRING_63
   * Old name: _DATAFILE_GET_STRING
   *
   * @param {string | number} p0
   * @param {DataView} p1
   * @return {boolean}
   */
declare function ParseddataRqFilloutString_63(p0: string | number, p1: DataView): boolean;

/**
   * _PARSEDDATA_RQ_FILLOUT_VECTOR
   * Old name: _DATAFILE_GET_VECTOR
   *
   * @param {DataView} p1
   * @return {[boolean, Vector3]}
   */
declare function ParseddataRqFilloutVector(p1: DataView): [boolean, Vector3];

/**
   * _PARSEDDATA_RQ_GET_NUM_NODES
   *
   * @param {any} p0
   * @return {any}
   */
declare function ParseddataRqGetNumNodes(p0: any): any;

/**
   * _PARSEDDATA_UNLOAD_FILE
   *
   * @param {number} fileHandle
   * @return {void}
   */
declare function ParseddataUnloadFile(fileHandle: number): void;