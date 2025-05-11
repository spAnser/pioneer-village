/**
   * CREATE_PROP_SET_INSTANCE_ATTACHED_TO_ENTITY
   *
   * @param {number} hash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} entity
   * @param {number} p5
   * @param {boolean} p6
   * @param {number} p7
   * @param {boolean} p8
   * @return {number}
   */
declare function CreatePropSetInstanceAttachedToEntity(hash: Hash, x: number, y: number, z: number, entity: Entity, p5: number, p6: boolean, p7: number, p8: boolean): PropSet;

/**
   * DOES_PROP_SET_EXIST
   *
   * @param {number} propSet
   * @return {boolean}
   */
declare function DoesPropSetExist(propSet: PropSet): boolean;

/**
   * IS_PROP_SET_FULLY_LOADED
   *
   * @param {number} propSet
   * @return {boolean}
   */
declare function IsPropSetFullyLoaded(propSet: PropSet): boolean;

/**
   * _0x58E0B01D45CA7357
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x58E0B01D45CA7357(p0: any): void;

/**
   * _MODIFY_PROPSET_COORDS_AND_HEADING
   * Relocates an existing prop set to specified coordinates and adjusts its heading (rotation) without affecting the prop set's internal layout or structure. The `propSet` parameter identifies the prop set to move. The parameters (`coordsX`, `coordsY`, `coordsZ`) set the new central position of the prop set, while `heading` specifies its rotation around the Z-axis (in degrees). When `onGroundProperly` is true, the prop set automatically aligns accurately with the terrain
   *
   * @param {number} propset
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {boolean} onGroundProperly
   * @param {number} heading
   * @return {void}
   */
declare function ModifyPropsetCoordsAndHeading(propset: number, posX: number, posY: number, posZ: number, onGroundProperly: boolean, heading: number): void;

/**
   * _ADD_ADDITIONAL_PROP_SET_FOR_VEHICLE
   * https://github.com/femga/rdr3_discoveries/blob/master/vehicles/vehicle_modding/vehicle_propsets.lua
   *
   * @param {number} vehicle
   * @param {number} propset
   * @return {void}
   */
declare function AddAdditionalPropSetForVehicle(vehicle: Vehicle, propset: Hash): void;

/**
   * _ADD_LIGHT_PROP_SET_TO_VEHICLE
   * To remove propsets either parse a zero as hash or call 0xE31C0CB1C3186D40
   * 0xA6A9712955F53D9C returns lightPropset Hashes
   * https://github.com/femga/rdr3_discoveries/blob/master/vehicles/vehicle_modding/vehicle_lantern_propsets.lua
   *
   * @param {number} vehicle
   * @param {number} lightPropset
   * @return {void}
   */
declare function AddLightPropSetToVehicle(vehicle: Vehicle, lightPropset: Hash): void;

/**
   * _ADD_PROP_SET_FOR_VEHICLE
   * List of vehicle propsets (wagons & trains): https://pastebin.com/1CsnvGLu / https://pastebin.com/v7TtqTgE
   *
   * @param {number} vehicle
   * @param {number} propset
   * @return {void}
   */
declare function AddPropSetForVehicle(vehicle: Vehicle, propset: Hash): void;

/**
   * _CREATE_PROP_SET
   * propsetType: https://github.com/femga/rdr3_discoveries/blob/master/objects/propsets_list.lua
   * placementType: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/PlacementType
   *
   * @param {number} propsetType
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} placementType
   * @param {number} heading
   * @param {number} zProbe
   * @param {boolean} p7
   * @param {boolean} useVegMod
   * @return {number}
   */
declare function CreatePropSet(propsetType: Hash, x: number, y: number, z: number, placementType: number, heading: number, zProbe: number, p7: boolean, useVegMod: boolean): PropSet;

/**
   * _CREATE_PROP_SET_2
   * Same as _CREATE_PROP_SET
   *
   * @param {number} propsetType
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} placementType
   * @param {number} heading
   * @param {number} zProbe
   * @param {boolean} p7
   * @param {boolean} useVegMod
   * @return {number}
   */
declare function CreatePropSet_2(propsetType: Hash, x: number, y: number, z: number, placementType: number, heading: number, zProbe: number, p7: boolean, useVegMod: boolean): PropSet;

/**
   * _CREATE_PROP_SET_INSTANCE_ATTACHED_TO_ENTITY_2
   * Same as CREATE_PROP_SET_INSTANCE_ATTACHED_TO_ENTITY
   *
   * @param {number} hash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} entity
   * @param {number} p5
   * @param {boolean} p6
   * @param {number} p7
   * @param {boolean} p8
   * @return {number}
   */
declare function CreatePropSetInstanceAttachedToEntity_2(hash: Hash, x: number, y: number, z: number, entity: Entity, p5: number, p6: boolean, p7: number, p8: boolean): PropSet;

/**
   * _DELETE_PROP_SET
   *
   * @param {number} propSet
   * @param {boolean} p1
   * @param {boolean} p2
   * @return {void}
   */
declare function DeletePropSet(propSet: PropSet, p1: boolean, p2: boolean): void;

/**
   * _DOES_PROP_SET_OF_TYPE_EXIST_NEAR_COORDS
   *
   * @param {number} propsetHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {boolean}
   */
declare function DoesPropSetOfTypeExistNearCoords(propsetHash: Hash, x: number, y: number, z: number): boolean;

/**
   * _DOES_VEHICLE_HAVE_ANY_LIGHT_PROP_SET
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function DoesVehicleHaveAnyLightPropSet(vehicle: Vehicle): boolean;

/**
   * _DOES_VEHICLE_HAVE_ANY_PROP_SET
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function DoesVehicleHaveAnyPropSet(vehicle: Vehicle): boolean;

/**
   * _GET_ENTITIES_FROM_PROP_SET
   *
   * @param {number} propSet
   * @param {number} itemSet
   * @param {number} model
   * @param {boolean} p3
   * @param {boolean} p4
   * @return {number}
   */
declare function GetEntitiesFromPropSet(propSet: PropSet, itemSet: ItemSet, model: Hash, p3: boolean, p4: boolean): number;

/**
   * _GET_PROP_SET_AT_COORDS
   *
   * @param {number} propsetHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {number}
   */
declare function GetPropSetAtCoords(propsetHash: Hash, x: number, y: number, z: number): PropSet;

/**
   * _GET_PROP_SET_MODEL
   *
   * @param {number} propSet
   * @return {number}
   */
declare function GetPropSetModel(propSet: PropSet): number;

/**
   * _GET_TRAIN_CARRIAGE_PROP_SET
   * Example before/after deleting a train carriage's propset: https://imgur.com/a/qRNrIrK
   *
   * @param {number} trainCarriage
   * @return {number}
   */
declare function GetTrainCarriagePropSet(trainCarriage: Entity): PropSet;

/**
   * _GET_VEHICLE_LIGHT_PROP_SET
   * Returns PropSet handle to be used with _GET_PROP_SET_MODEL
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetVehicleLightPropSet(vehicle: Vehicle): PropSet;

/**
   * _GET_VEHICLE_PROP_SET
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetVehiclePropSet(vehicle: Vehicle): PropSet;

/**
   * _GET_VEHICLE_PROP_SET_HASH
   *
   * @param {number} vehicle
   * @return {number}
   */
declare function GetVehiclePropSetHash(vehicle: Vehicle): number;

/**
   * _HAS_PROP_SET_LOADED
   *
   * @param {number} hash
   * @return {boolean}
   */
declare function HasPropSetLoaded(hash: Hash): boolean;

/**
   * _HAS_PROP_SET_LOADED_2
   * Same as _HAS_PROP_SET_LOADED
   *
   * @param {number} hash
   * @return {boolean}
   */
declare function HasPropSetLoaded_2(hash: Hash): boolean;

/**
   * _HAS_VEHICLE_TRAILER_PROP_SET_LOADED
   *
   * @param {number} vehicle
   * @param {number} wagonIndex
   * @return {boolean}
   */
declare function HasVehicleTrailerPropSetLoaded(vehicle: Vehicle, wagonIndex: number): boolean;

/**
   * _IS_PROP_SET_VISIBLE
   *
   * @param {number} propSet
   * @return {boolean}
   */
declare function IsPropSetVisible(propSet: PropSet): boolean;

/**
   * _IS_VEHICLE_LIGHT_PROP_SET_LOADED
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsVehicleLightPropSetLoaded(vehicle: Vehicle): boolean;

/**
   * _IS_VEHICLE_PROP_SET_LOADED
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsVehiclePropSetLoaded(vehicle: Vehicle): boolean;

/**
   * _IS_VEHICLE_PROP_SET_LOADED_ADDITIONAL
   *
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsVehiclePropSetLoadedAdditional(vehicle: Vehicle): boolean;

/**
   * _RELEASE_PROP_SET
   *
   * @param {number} hash
   * @return {boolean}
   */
declare function ReleasePropSet(hash: Hash): boolean;

/**
   * _REMOVE_VEHICLE_LIGHT_PROP_SETS
   *
   * @param {number} vehicle
   * @return {void}
   */
declare function RemoveVehicleLightPropSets(vehicle: Vehicle): void;

/**
   * _REMOVE_VEHICLE_PROP_SETS
   *
   * @param {number} vehicle
   * @return {void}
   */
declare function RemoveVehiclePropSets(vehicle: Vehicle): void;

/**
   * _REQUEST_PROP_SET
   *
   * @param {number} hash
   * @return {boolean}
   */
declare function RequestPropSet(hash: Hash): boolean;

/**
   * _REQUEST_PROP_SET_2
   * Same as _REQUEST_PROP_SET
   *
   * @param {number} hash
   * @return {boolean}
   */
declare function RequestPropSet_2(hash: Hash): boolean;

/**
   * _SET_PROP_SET_AS_NO_LONGER_NEEDED
   *
   * @param {number} propSet
   * @return {void}
   */
declare function SetPropSetAsNoLongerNeeded(propSet: PropSet): void;

/**
   * _SET_PROP_SET_FLAG
   *
   * @param {number} propSet
   * @param {number} flag
   * @return {void}
   */
declare function SetPropSetFlag(propSet: PropSet, flag: number): void;

/**
   * _SET_PROP_SET_VISIBLE
   *
   * @param {number} propSet
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPropSetVisible(propSet: PropSet, toggle: boolean): void;