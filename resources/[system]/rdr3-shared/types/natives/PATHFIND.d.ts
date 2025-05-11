/**
   * ADD_NAVMESH_BLOCKING_OBJECT
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {number} p6
   * @param {boolean} p7
   * @param {any} p8
   * @return {any}
   */
declare function AddNavmeshBlockingObject(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: boolean, p8: any): any;

/**
   * ADD_NAVMESH_REQUIRED_REGION
   *
   * @param {number} x
   * @param {number} y
   * @param {number} radius
   * @return {void}
   */
declare function AddNavmeshRequiredRegion(x: number, y: number, radius: number): void;

/**
   * ARE_NODES_LOADED_FOR_AREA
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @return {boolean}
   */
declare function AreNodesLoadedForArea(x1: number, y1: number, x2: number, y2: number): boolean;

/**
   * DOES_NAVMESH_BLOCKING_OBJECT_EXIST
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function DoesNavmeshBlockingObjectExist(p0: any): boolean;

/**
   * GET_APPROX_FLOOR_FOR_POINT
   * Returns CGameWorldHeightMap's minimum Z value at specified point (grid node).
   *
   * @param {number} x
   * @param {number} y
   * @return {number}
   */
declare function GetApproxFloorForPoint(x: number, y: number): number;

/**
   * GET_CLOSEST_ROAD
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p3
   * @param {number} p4
   * @param {DataView} p7
   * @param {DataView} p8
   * @param {boolean} p10
   * @return {[any, Vector3, Vector3, number]}
   */
declare function GetClosestRoad(x: number, y: number, z: number, p3: number, p4: number, p7: DataView, p8: DataView, p10: boolean): [any, Vector3, Vector3, number];

/**
   * GET_CLOSEST_VEHICLE_NODE
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} nodeType
   * @param {number} p5
   * @param {number} p6
   * @return {[boolean, Vector3]}
   */
declare function GetClosestVehicleNode(x: number, y: number, z: number, nodeType: number, p5: number, p6: number): [boolean, Vector3];

/**
   * GET_CLOSEST_VEHICLE_NODE_WITH_HEADING
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} nodeType
   * @param {number} p6
   * @param {number} p7
   * @return {[boolean, Vector3, number]}
   */
declare function GetClosestVehicleNodeWithHeading(x: number, y: number, z: number, nodeType: number, p6: number, p7: number): [boolean, Vector3, number];

/**
   * GET_GPS_BLIP_ROUTE_FOUND
   *
  
   * @return {boolean}
   */
declare function GetGpsBlipRouteFound(): boolean;

/**
   * GET_GPS_BLIP_ROUTE_LENGTH
   *
  
   * @return {number}
   */
declare function GetGpsBlipRouteLength(): number;

/**
   * GET_NTH_CLOSEST_VEHICLE_NODE
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} nthClosest
   * @param {number} unknown1
   * @param {number} unknown2
   * @param {any} unknown3
   * @return {[boolean, Vector3]}
   */
declare function GetNthClosestVehicleNode(x: number, y: number, z: number, nthClosest: number, unknown1: number, unknown2: number, unknown3: any): [boolean, Vector3];

/**
   * GET_NTH_CLOSEST_VEHICLE_NODE_FAVOUR_DIRECTION
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} desiredX
   * @param {number} desiredY
   * @param {number} desiredZ
   * @param {number} nthClosest
   * @param {number} nodetype
   * @param {any} p10
   * @param {any} p11
   * @return {[boolean, Vector3, number]}
   */
declare function GetNthClosestVehicleNodeFavourDirection(x: number, y: number, z: number, desiredX: number, desiredY: number, desiredZ: number, nthClosest: number, nodetype: number, p10: any, p11: any): [boolean, Vector3, number];

/**
   * GET_NTH_CLOSEST_VEHICLE_NODE_ID
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} nth
   * @param {number} nodetype
   * @param {number} p5
   * @param {number} p6
   * @return {number}
   */
declare function GetNthClosestVehicleNodeId(x: number, y: number, z: number, nth: number, nodetype: number, p5: number, p6: number): number;

/**
   * GET_NTH_CLOSEST_VEHICLE_NODE_ID_WITH_HEADING
   * Returns the nth closest vehicle node with a heading to a coord
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} nthClosest
   * @param {number} nodeFlags
   * @param {number} zMeasureMult
   * @param {number} zTolerance
   * @return {[number, number, number]}
   */
declare function GetNthClosestVehicleNodeIdWithHeading(x: number, y: number, z: number, nthClosest: number, nodeFlags: number, zMeasureMult: number, zTolerance: number): [number, number, number];

/**
   * GET_NTH_CLOSEST_VEHICLE_NODE_WITH_HEADING
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} nthClosest
   * @param {DataView} unknown1
   * @param {number} unknown2
   * @param {number} unknown3
   * @param {number} unknown4
   * @return {[boolean, Vector3, number]}
   */
declare function GetNthClosestVehicleNodeWithHeading(x: number, y: number, z: number, nthClosest: number, unknown1: DataView, unknown2: number, unknown3: number, unknown4: number): [boolean, Vector3, number];

/**
   * GET_NUM_NAVMESHES_EXISTING_IN_AREA
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @return {number}
   */
declare function GetNumNavmeshesExistingInArea(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number): number;

/**
   * GET_RANDOM_VEHICLE_NODE
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {number} minLanes
   * @param {boolean} avoidDeadEnds
   * @param {boolean} avoidHighways
   * @return {[boolean, Vector3, number]}
   */
declare function GetRandomVehicleNode(x: number, y: number, z: number, radius: number, minLanes: number, avoidDeadEnds: boolean, avoidHighways: boolean): [boolean, Vector3, number];

/**
   * GET_SAFE_COORD_FOR_PED
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} onGround
   * @param {number} flags
   * @return {[boolean, Vector3]}
   */
declare function GetSafeCoordForPed(x: number, y: number, z: number, onGround: boolean, flags: number): [boolean, Vector3];

/**
   * GET_VEHICLE_NODE_IS_SWITCHED_OFF
   *
   * @param {number} nodeId
   * @return {boolean}
   */
declare function GetVehicleNodeIsSwitchedOff(nodeID: number): boolean;

/**
   * GET_VEHICLE_NODE_POSITION
   *
   * @param {number} nodeId
   * @return {Vector3}
   */
declare function GetVehicleNodePosition(nodeId: number): Vector3;

/**
   * IS_NAVMESH_LOADED_IN_AREA
   * Returns whether navmesh for the region is loaded.
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @return {boolean}
   */
declare function IsNavmeshLoadedInArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): boolean;

/**
   * IS_POINT_ON_ROAD
   * Gets a value indicating whether the specified position is on a road.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} vehicle
   * @return {boolean}
   */
declare function IsPointOnRoad(x: number, y: number, z: number, vehicle: Vehicle): boolean;

/**
   * IS_VEHICLE_NODE_ID_VALID
   * Returns true if the id is non zero.
   *
   * @param {number} vehicleNodeId
   * @return {boolean}
   */
declare function IsVehicleNodeIdValid(vehicleNodeId: number): boolean;

/**
   * NAVMESH_REQUEST_PATH
   * Starts a nav mesh query for a path between coordinates with a given ped and returns a handle to be validated by _NAVMESH_REQUESTED_QUERY_STATUS and then _NAVMESH_REQUESTED_PATH_WAYPOINTS_FOUND
   * 
   * Only bit flag values used in scripts are 0, 23, and 29. 23 is used with dogs and horses. 29 with legendary animals.
   *
   * @param {number} ped
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {number} bitFlag
   * @return {number}
   */
declare function NavmeshRequestPath(ped: Ped, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, bitFlag: number): number;

/**
   * REMOVE_NAVMESH_BLOCKING_OBJECT
   *
   * @param {any} p0
   * @return {void}
   */
declare function RemoveNavmeshBlockingObject(p0: any): void;

/**
   * REQUEST_PATH_NODES_IN_AREA_THIS_FRAME
   * Old name: REQUEST_PATHS_PREFER_ACCURATE_BOUNDINGSTRUCT
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @return {boolean}
   */
declare function RequestPathNodesInAreaThisFrame(x1: number, y1: number, x2: number, y2: number): boolean;

/**
   * RESET_ROADS_IN_VOLUME
   *
   * @param {number} volume
   * @param {boolean} p1
   * @return {void}
   */
declare function ResetRoadsInVolume(volume: Volume, p1: boolean): void;

/**
   * SET_AMBIENT_PED_RANGE_MULTIPLIER_THIS_FRAME
   *
   * @param {number} multiplier
   * @return {void}
   */
declare function SetAmbientPedRangeMultiplierThisFrame(multiplier: number): void;

/**
   * SET_IGNORE_NO_GPS_FLAG
   * nullsub, doesn't do anything
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetIgnoreNoGpsFlag(toggle: boolean): void;

/**
   * SET_PED_PATHS_BACK_TO_ORIGINAL
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @return {void}
   */
declare function SetPedPathsBackToOriginal(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;

/**
   * SET_PED_PATHS_IN_AREA
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {boolean} unknown
   * @param {any} p7
   * @return {void}
   */
declare function SetPedPathsInArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, unknown: boolean, p7: any): void;

/**
   * SET_ROADS_BACK_TO_ORIGINAL
   *
   * @param {number} xMin
   * @param {number} yMin
   * @param {number} zMin
   * @param {number} xMax
   * @param {number} yMax
   * @param {number} zMax
   * @param {any} p6
   * @param {any} p7
   * @return {void}
   */
declare function SetRoadsBackToOriginal(xMin: number, yMin: number, zMin: number, xMax: number, yMax: number, zMax: number, p6: any, p7: any): void;

/**
   * SET_ROADS_BACK_TO_ORIGINAL_IN_ANGLED_AREA
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @return {void}
   */
declare function SetRoadsBackToOriginalInAngledArea(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any): void;

/**
   * SET_ROADS_IN_ANGLED_AREA
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @param {any} p9
   * @param {any} p10
   * @return {void}
   */
declare function SetRoadsInAngledArea(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any): void;

/**
   * SET_ROADS_IN_AREA
   *
   * @param {number} xMin
   * @param {number} yMin
   * @param {number} zMin
   * @param {number} xMax
   * @param {number} yMax
   * @param {number} zMax
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @return {void}
   */
declare function SetRoadsInArea(xMin: number, yMin: number, zMin: number, xMax: number, yMax: number, zMax: number, p6: any, p7: any, p8: any): void;

/**
   * SET_ROADS_IN_VOLUME
   *
   * @param {number} volume
   * @param {boolean} p1
   * @param {boolean} p2
   * @param {boolean} p3
   * @return {void}
   */
declare function SetRoadsInVolume(volume: Volume, p1: boolean, p2: boolean, p3: boolean): void;

/**
   * SIMULATED_ROUTE_GET_ETA
   *
   * @param {any} p0
   * @return {number}
   */
declare function SimulatedRouteGetEta(p0: any): number;

/**
   * SIMULATED_ROUTE_IS_LOADED
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function SimulatedRouteIsLoaded(p0: any): boolean;

/**
   * SIMULATED_ROUTE_TRAVEL_TO_POINT
   *
   * @param {any} p0
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function SimulatedRouteTravelToPoint(p0: any, p1: number, p2: number): void;

/**
   * _0x264E9A5CD78C338F
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x264E9A5CD78C338F(p0: any): void;

/**
   * _0x34C9AF25649172D0
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x34C9AF25649172D0(p0: any): void;

/**
   * _0x4358BCF14C91761C
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @param {any} p7
   * @param {any} p8
   * @param {any} p9
   * @return {void}
   */
declare function N_0x4358BCF14C91761C(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any): void;

/**
   * _0x4BDEBEA5702B97A9
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @return {void}
   */
declare function N_0x4BDEBEA5702B97A9(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): void;

/**
   * _0x54F4D7B6670FBB5A
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {any}
   */
declare function N_0x54F4D7B6670FBB5A(p0: any, p1: any, p2: any, p3: any, p4: any): any;

/**
   * _0x5A3B54ADDF5472A3
   *
   * @param {string | number} p0
   * @return {number}
   */
declare function N_0x5A3B54ADDF5472A3(p0: string | number): number;

/**
   * _0x5A4E1A41E3A02AD0
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x5A4E1A41E3A02AD0(p0: any, p1: any, p2: any): void;

/**
   * _0x665B21666351CB37
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {any}
   */
declare function N_0x665B21666351CB37(p0: any, p1: any, p2: any): any;

/**
   * _0x6C3F12ECEB6D2E2A
   *
   * @param {number} xMin
   * @param {number} yMin
   * @param {number} zMin
   * @param {number} xMax
   * @param {number} yMax
   * @param {number} zMax
   * @param {any} p6
   * @param {any} p7
   * @return {void}
   */
declare function N_0x6C3F12ECEB6D2E2A(xMin: number, yMin: number, zMin: number, xMax: number, yMax: number, zMax: number, p6: any, p7: any): void;

/**
   * _0x6DAD6630AE4A74CB
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x6DAD6630AE4A74CB(p0: any, p1: any): void;

/**
   * _0x869A7015BD4606E9
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x869A7015BD4606E9(p0: any): void;

/**
   * _0xA33914B00CA55756
   *
   * @param {string | number} p0
   * @param {number} p1
   * @return {any}
   */
declare function N_0xA33914B00CA55756(p0: string | number, p1: number): any;

/**
   * _0xAFE2AE66F6251C66
   *
   * @param {number} xMin
   * @param {number} yMin
   * @param {number} zMin
   * @param {number} xMax
   * @param {number} yMax
   * @param {number} zMax
   * @param {number} p6
   * @param {any} p7
   * @return {void}
   */
declare function N_0xAFE2AE66F6251C66(xMin: number, yMin: number, zMin: number, xMax: number, yMax: number, zMax: number, p6: number, p7: any): void;

/**
   * _0xB03944057FD735BA
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xB03944057FD735BA(p0: any, p1: any, p2: any): void;

/**
   * _0xCA27A86CAA4E98ED
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @param {any} p5
   * @param {any} p6
   * @return {any}
   */
declare function N_0xCA27A86CAA4E98ED(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): any;

/**
   * _0xCF213A5FC3ABFC08
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xCF213A5FC3ABFC08(p0: any, p1: any, p2: any): void;

/**
   * _0xE5EF9DE716FF737E
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0xE5EF9DE716FF737E(p0: any, p1: any, p2: any): void;

/**
   * _0xEFC535C9FAF563B3
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0xEFC535C9FAF563B3(p0: any): any;

/**
   * _0xF2A2177AC848B3A8
   * GPS disabled zone: p1 = 0
   * Clearing GPS disabled zone: p1 = 1
   *
   * @param {number} volume
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function N_0xF2A2177AC848B3A8(volume: Volume, p1: number, p2: number): void;

/**
   * _ADD_NAVMESH_BLOCKING_VOLUME
   *
   * @param {number} volume
   * @param {number} flags
   * @return {boolean}
   */
declare function AddNavmeshBlockingVolume(volume: Volume, flags: number): boolean;

/**
   * _DOES_NAVMESH_BLOCKING_VOLUME_EXIST
   *
   * @param {number} volume
   * @return {boolean}
   */
declare function DoesNavmeshBlockingVolumeExist(volume: Volume): boolean;

/**
   * _GET_SPAWN_DATA_FOR_ROAD_NODE
   *
   * @param {number} nodeId
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {[Vector3, number]}
   */
declare function GetSpawnDataForRoadNode(nodeId: number, x: number, y: number, z: number): [Vector3, number];

/**
   * _NAVMESH_ACTIVATE_SWAP
   *
   * @param {string | number} name
   * @return {boolean}
   */
declare function NavmeshActivateSwap(name: string | number): boolean;

/**
   * _NAVMESH_ASSIGN_NAVMESH_TO_VEHICLE
   *
   * @param {number} vehicle
   * @param {string | number} navMeshName
   * @return {boolean}
   */
declare function NavmeshAssignNavmeshToVehicle(vehicle: Vehicle, navMeshName: string | number): boolean;

/**
   * _NAVMESH_CLEAR_REQUESTED_PATH
   * Called in scripts after finished with requested pathes. Immediately resets all values connected to the path handle except query status, which changes from 1 to 2 before eventually becoming fully invalidated to 0.
   *
   * @param {number} path
   * @return {boolean}
   */
declare function NavmeshClearRequestedPath(path: number): boolean;

/**
   * _NAVMESH_DEACTIVATE_SWAP
   *
   * @param {string | number} name
   * @return {boolean}
   */
declare function NavmeshDeactivateSwap(name: string | number): boolean;

/**
   * _NAVMESH_DOES_SWAP_EXIST
   *
   * @param {string | number} name
   * @return {boolean}
   */
declare function NavmeshDoesSwapExist(name: string | number): boolean;

/**
   * _NAVMESH_IS_SWAP_ACTIVE
   *
   * @param {string | number} name
   * @return {boolean}
   */
declare function NavmeshIsSwapActive(name: string | number): boolean;

/**
   * _NAVMESH_REQUESTED_PATH_NUM_WAYPOINTS
   * Returns the number of waypoints for a requested path (NAVMESH_REQUEST_PATH) if the query is completed (_NAVMESH_REQUESTED_QUERY_STATUS). For use with _NAVMESH_REQUESTED_PATH_WAYPOINT_BY_INDEX
   *
   * @param {number} path
   * @return {number}
   */
declare function NavmeshRequestedPathNumWaypoints(path: number): number;

/**
   * _NAVMESH_REQUESTED_PATH_WAYPOINTS_FOUND
   * Returns true if a path of waypoints was found. Waypoints can be retrieved with _NAVMESH_REQUESTED_PATH_NUM_WAYPOINTS and _NAVMESH_REQUESTED_PATH_WAYPOINT_BY_INDEX
   *
   * @param {number} path
   * @return {boolean}
   */
declare function NavmeshRequestedPathWaypointsFound(path: number): boolean;

/**
   * _NAVMESH_REQUESTED_PATH_WAYPOINTS_TERRAIN
   * Returns a bit flag for seemingly terrain within the waypoints in the path. Checked against bit value 2 to match water in the path, seems to always contain at least 1 though regardless of location/ped.
   *
   * @param {number} path
   * @return {number}
   */
declare function NavmeshRequestedPathWaypointsTerrain(path: number): number;

/**
   * _NAVMESH_REQUESTED_PATH_WAYPOINT_BY_INDEX
   * Returns a vector3 waypoint at the specified index for a path. Use _NAVMESH_REQUESTED_PATH_NUM_WAYPOINTS to get available indexes.
   *
   * @param {number} path
   * @param {number} waypointIndex
   * @return {Vector3}
   */
declare function NavmeshRequestedPathWaypointByIndex(path: number, waypointIndex: number): Vector3;

/**
   * _NAVMESH_REQUESTED_QUERY_STATUS
   * Returns eNavMeshQueryStatus
   * enum eNavMeshQueryStatus
   * {
   *   QS_NOT_FOUND,
   *   QS_COMPLETE,
   *   QS_PENDING
   * };
   * 
   * It appears that the pending state of 2 is at least also used when cleaning up a request (_NAVMESH_CLEAR_REQUESTED_PATH) or if a request never completes. Eventually queries are invalidated and return 0.
   * 
   * Old name: _NAVMESH_QUERY_STATUS
   *
   * @param {number} path
   * @return {number}
   */
declare function NavmeshRequestedQueryStatus(path: number): number;

/**
   * _REMOVE_NAVMESH_BLOCKING_VOLUME
   *
   * @param {number} volume
   * @return {void}
   */
declare function RemoveNavmeshBlockingVolume(volume: Volume): void;

/**
   * _SIMULATED_ROUTE_CREATE
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {number} p6
   * @return {any}
   */
declare function SimulatedRouteCreate(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, p6: number): any;

/**
   * _SIMULATED_ROUTE_DELETE
   *
   * @param {any} p0
   * @return {void}
   */
declare function SimulatedRouteDelete(p0: any): void;

/**
   * _SIMULATED_ROUTE_EXISTS
   *
   * @param {any} p0
   * @return {boolean}
   */
declare function SimulatedRouteExists(p0: any): boolean;