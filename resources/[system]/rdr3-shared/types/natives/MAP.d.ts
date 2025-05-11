/**
   * ADD_POINT_TO_GPS_MULTI_ROUTE
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} p3
   * @return {void}
   */
declare function AddPointToGpsMultiRoute(x: number, y: number, z: number, p3: boolean): void;

/**
   * ALLOW_SONAR_BLIPS
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function AllowSonarBlips(toggle: boolean): void;

/**
   * BLIP_ADD_FOR_COORDS
   * https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/textures/blips
   * https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/textures/blips_mp
   *
   * @param {number} blipHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {number}
   */
declare function BlipAddForCoords(blipHash: Hash, x: number, y: number, z: number): Blip;

/**
   * BLIP_ADD_FOR_ENTITY
   *
   * @param {number} blipHash
   * @param {number} entity
   * @return {number}
   */
declare function BlipAddForEntity(blipHash: Hash, entity: Entity): Blip;

/**
   * BLIP_ADD_FOR_PICKUP_PLACEMENT
   *
   * @param {number} blipHash
   * @param {number} pickup
   * @return {number}
   */
declare function BlipAddForPickupPlacement(blipHash: Hash, pickup: Pickup): Blip;

/**
   * BLIP_ADD_FOR_RADIUS
   *
   * @param {number} blipHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @return {number}
   */
declare function BlipAddForRadius(blipHash: Hash, x: number, y: number, z: number, radius: number): Blip;

/**
   * BLIP_ADD_MODIFIER
   * https://alloc8or.re/rdr3/doc/enums/eBlipModifier.txt
   * https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/blip_modifiers
   * 
   * Old name: _BLIP_SET_MODIFIER
   *
   * @param {number} blip
   * @param {number} modifierHash
   * @return {boolean}
   */
declare function BlipAddModifier(blip: Blip, modifierHash: Hash): boolean;

/**
   * BLIP_REMOVE_MODIFIER
   * If modifierHash is 0, ALL modifiers will be removed.
   *
   * @param {number} blip
   * @param {number} modifierHash
   * @return {boolean}
   */
declare function BlipRemoveModifier(blip: Blip, modifierHash: Hash): boolean;

/**
   * CLEAR_GPS_CUSTOM_ROUTE
   *
  
   * @return {void}
   */
declare function ClearGpsCustomRoute(): void;

/**
   * CLEAR_GPS_FLAGS
   * Clears the GPS flags.
   *
  
   * @return {void}
   */
declare function ClearGpsFlags(): void;

/**
   * CLEAR_GPS_MULTI_ROUTE
   * Does the same as SET_GPS_MULTI_ROUTE_RENDER(false);
   *
  
   * @return {void}
   */
declare function ClearGpsMultiRoute(): void;

/**
   * CLEAR_GPS_PLAYER_WAYPOINT
   *
  
   * @return {void}
   */
declare function ClearGpsPlayerWaypoint(): void;

/**
   * DISPLAY_RADAR
   * If Minimap / Radar should be displayed.
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function DisplayRadar(toggle: boolean): void;

/**
   * DOES_BLIP_EXIST
   *
   * @param {number} blip
   * @return {boolean}
   */
declare function DoesBlipExist(blip: Blip): boolean;

/**
   * FORCE_SONAR_BLIPS_THIS_FRAME
   * Doesn't actually return anything.
   *
  
   * @return {any}
   */
declare function ForceSonarBlipsThisFrame(): any;

/**
   * GET_BLIP_COORDS
   *
   * @param {number} blip
   * @return {Vector3}
   */
declare function GetBlipCoords(blip: Blip): Vector3;

/**
   * GET_BLIP_FROM_ENTITY
   * Returns the Blip handle of given Entity.
   *
   * @param {number} entity
   * @return {number}
   */
declare function GetBlipFromEntity(entity: Entity): Blip;

/**
   * GET_MAIN_PLAYER_BLIP_ID
   *
  
   * @return {number}
   */
declare function GetMainPlayerBlipId(): Blip;

/**
   * IS_BLIP_ON_MINIMAP
   *
   * @param {number} blip
   * @return {boolean}
   */
declare function IsBlipOnMinimap(blip: Blip): boolean;

/**
   * IS_WAYPOINT_ACTIVE
   *
  
   * @return {boolean}
   */
declare function IsWaypointActive(): boolean;

/**
   * LOCK_MINIMAP_ANGLE
   * Locks the minimap to the specified angle in integer degrees.
   * 
   * angle: The angle in whole degrees. If less than 0 or greater than 360, unlocks the angle.
   *
   * @param {number} angle
   * @return {void}
   */
declare function LockMinimapAngle(angle: number): void;

/**
   * REMOVE_BLIP
   *
  
   * @return {number}
   */
declare function RemoveBlip(): Blip;

/**
   * RESET_MINIMAP_FOW
   *
   * @param {number} hash
   * @return {void}
   */
declare function ResetMinimapFow(hash: Hash): void;

/**
   * SET_BLIP_COORDS
   *
   * @param {number} blip
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @return {void}
   */
declare function SetBlipCoords(blip: Blip, posX: number, posY: number, posZ: number): void;

/**
   * SET_BLIP_FLASHES
   *
   * @param {number} blip
   * @return {[boolean, number, number]}
   */
declare function SetBlipFlashes(blip: Blip): [boolean, number, number];

/**
   * SET_BLIP_FLASH_TIMER
   *
   * @param {number} blip
   * @param {number} blipType
   * @param {number} blipHash
   * @return {void}
   */
declare function SetBlipFlashTimer(blip: Blip, blipType: number, blipHash: Hash): void;

/**
   * SET_BLIP_NAME_FROM_TEXT_FILE
   *
   * @param {number} blip
   * @param {string | number} textLabel
   * @return {void}
   */
declare function SetBlipNameFromTextFile(blip: Blip, textLabel: string | number): void;

/**
   * SET_BLIP_NAME_TO_PLAYER_NAME
   *
   * @param {number} blip
   * @param {number} player
   * @return {void}
   */
declare function SetBlipNameToPlayerName(blip: Blip, player: Player): void;

/**
   * SET_BLIP_ROTATION
   *
   * @param {number} blip
   * @param {number} rotation
   * @return {void}
   */
declare function SetBlipRotation(blip: Blip, rotation: number): void;

/**
   * SET_BLIP_SCALE
   * only works for BLIP_ADD_FOR_RADIUS AND BLIP_ADD_FOR_AREA, this native works as a radius not really a scale
   *
   * @param {number} blip
   * @param {number} scale
   * @return {void}
   */
declare function SetBlipScale(blip: Blip, scale: number): void;

/**
   * SET_BLIP_SPRITE
   *
   * @param {number} blip
   * @param {number} hash
   * @param {boolean} p2
   * @return {void}
   */
declare function SetBlipSprite(blip: Blip, hash: Hash, p2: boolean): void;

/**
   * SET_GPS_CUSTOM_ROUTE_RENDER
   *
   * @param {boolean} p0
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function SetGpsCustomRouteRender(p0: boolean, p1: number, p2: number): void;

/**
   * SET_GPS_FLAGS
   * https://alloc8or.re/rdr3/doc/enums/rage__eGpsFlags.txt
   *
   * @param {number} p0
   * @param {number} p1
   * @return {void}
   */
declare function SetGpsFlags(p0: number, p1: number): void;

/**
   * SET_GPS_MULTI_ROUTE_RENDER
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetGpsMultiRouteRender(toggle: boolean): void;

/**
   * SET_MINIMAP_FOW_REVEAL_COORDINATE
   * Up to eight coordinates may be revealed per frame
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p3
   * @return {void}
   */
declare function SetMinimapFowRevealCoordinate(x: number, y: number, z: number, p3: Hash): void;

/**
   * SET_MINIMAP_FOW_REVEAL_VOLUME
   *
   * @param {number} volume
   * @param {number} p1
   * @return {void}
   */
declare function SetMinimapFowRevealVolume(volume: Volume, p1: Hash): void;

/**
   * SET_MINIMAP_HIDE_FOW
   * Reveals the entire minimap (FOW = Fog of War)
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetMinimapHideFow(toggle: boolean): void;

/**
   * SET_RADAR_AS_EXTERIOR_THIS_FRAME
   *
  
   * @return {void}
   */
declare function SetRadarAsExteriorThisFrame(): void;

/**
   * SET_RADAR_ZOOM
   *
   * @param {number} zoomLevel
   * @return {void}
   */
declare function SetRadarZoom(zoomLevel: number): void;

/**
   * SET_WAYPOINT_OFF
   *
  
   * @return {void}
   */
declare function SetWaypointOff(): void;

/**
   * START_GPS_MULTI_ROUTE
   *
   * @param {number} colorNameHash
   * @param {boolean} onFoot
   * @param {boolean} inVehicle
   * @return {void}
   */
declare function StartGpsMultiRoute(colorNameHash: Hash, onFoot: boolean, inVehicle: boolean): void;

/**
   * TRIGGER_SONAR_BLIP
   *
   * @param {number} typeHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function TriggerSonarBlip(typeHash: Hash, x: number, y: number, z: number): void;

/**
   * UNLOCK_MINIMAP_ANGLE
   *
  
   * @return {void}
   */
declare function UnlockMinimapAngle(): void;

/**
   * _CLEAR_BLIP
   * Clear blip data. It must be used before RemoveBlip I'm pretty sure that blips are handled internally with databinding. This function should then allow you to clear blip container and therefore free up memory?.
   *
   * @param {number} blipid
   * @return {any}
   */
declare function ClearBlip(blipid: Blip): any;

/**
   * _SET_BLIP_ICON_ON_ENTITY_ACTIVE_PROMPT
   * It adds blip a icon to active prompts like from scenarios or pickups without the need to use lockon
   *
   * @param {number} entity
   * @param {number} blipIcon
   * @return {void}
   */
declare function SetBlipIconOnEntityActivePrompt(entity: Entity, blipIcon: Hash): void;

/**
   * _BLIP_DETACH_FROM_ENTITY
   * Not official native name
   * Removes the blip from an entity and makes it static on the map, try it on GetMainPlayerBlipId() for a demonstration
   *
   * @param {number} blip
   * @return {void}
   */
declare function BlipDetachFromEntity(blip: Blip): void;

/**
   * _IS_BLIP_ICON_ON_LOCKON_ENTITY_PROMPT
   * checks if the entity lockon prompt contains an icon
   *
   * @param {number} entity
   * @param {number} blipId
   * @return {boolean}
   */
declare function IsBlipIconOnLockonEntityPrompt(entity: Entity, blipId: number): boolean;

/**
   * _CLEAR_BLIP_ICON_FROM_LOCKON_ENTITY_PROMPT
   * will remove the blip icon from the entity lockon prompt, use 0 for p1
   *
   * @param {number} entity
   * @param {number} p1
   * @return {void}
   */
declare function ClearBlipIconFromLockonEntityPrompt(entity: Entity, p1: number): void;

/**
   * _SET_BLIP_ICON_TO_LOCKON_ENTITY_PROMPT
   * will add a blip icon to the entity lockon prompt that you specify
   *
   * @param {number} entity
   * @param {number} blipIcon
   * @return {void}
   */
declare function SetBlipIconToLockonEntityPrompt(entity: Entity, blipIcon: Hash): void;

/**
   * _CLEAR_PAUSEMAP_COORDS
   * Clears the previously set coordinates for the pause map view, removing any specified focal point and radius that were set using `SetPausemapCoordsWithRadius - 0xE0884C184728C75B`
   *
  
   * @return {void}
   */
declare function ClearPausemapCoords(): void;

/**
   * _SET_ENTITY_BLIP_ICON_TO_LOCKON_ENTITY_PROMPT
   * adds the entity blip icon to the entity lockon prompt if wrong param will remove the icon if had any
   *
   * @param {number} entity
   * @param {number} blipId
   * @return {void}
   */
declare function SetEntityBlipIconToLockonEntityPrompt(entity: Entity, blipId: number): void;

/**
   * _REMOVE_BLIP_ICON_FROM_ENTITY_LOCKON_PROMPT
   * 
   * in the decompiles this doesnt seem to ever be executed the param needed needs to be above 0 but its always passed as 0
   *  removes the icon from lockon prompt
   *
   * @param {number} entity
   * @param {number} p1
   * @return {void}
   */
declare function RemoveBlipIconFromEntityLockonPrompt(entity: Entity, p1: number): void;

/**
   * _0xD3F58E9316B7FC2A
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xD3F58E9316B7FC2A(p0: any): void;

/**
   * _GET_WAYPOINT_POSITION
   * Unlike `GET_WAYPOINT_COORDS - 0x29B30D07C3F7873B`, which returns a single value, this native returns the x and y coordinates of the waypoint separately as floats from pointer. To retrieve each coordinate, `Citizen.PointerValueFloat()` must be used with this function.
   *
  
   * @return {[any, number, number]}
   */
declare function GetWaypointPosition(): [any, number, number];

/**
   * _IS_GPS_ROUTE_ON_ROAD
   * Checks if the GPS route to the waypoint is navigable along a road. If a route exists but there is no valid road path, this function returns false.
   *
  
   * @return {boolean}
   */
declare function IsGpsRouteOnRoad(): boolean;

/**
   * _ABANDON_BLIP
   * It's unclear what exactly this does, but I assume it marks the blip as "no longer needed"
   *
   * @param {number} blip
   * @return {void}
   */
declare function AbandonBlip(blip: Blip): void;

/**
   * _ADD_PROP_TO_MINIMAP
   * list of minimap props: https://github.com/femga/rdr3_discoveries/tree/master/graphics/minimap/minimapObjects
   * variations parameter are the interior locations you see on the map like these bellow
   * variation 0 https://i.imgur.com/jkLhn3Z.png
   * variation 2  https://i.imgur.com/eKV0Tcm.png
   * variation 4 https://i.imgur.com/rjwOgEH.png
   * there are more and you can find them in the decompiles
   *
   * @param {number} minimapProp
   * @param {number} x
   * @param {number} y
   * @param {number} rotation
   * @param {number} variation
   * @return {void}
   */
declare function AddPropToMinimap(minimapProp: Hash, x: number, y: number, rotation: number, variation: number): void;

/**
   * _BLIP_ADD_FOR_AREA
   *
   * @param {number} blipHash
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} scaleX
   * @param {number} scaleY
   * @param {number} scaleZ
   * @param {number} p7
   * @return {number}
   */
declare function BlipAddForArea(blipHash: Hash, x: number, y: number, z: number, scaleX: number, scaleY: number, scaleZ: number, p7: number): Blip;

/**
   * _BLIP_ADD_FOR_STYLE
   *
   * @param {number} styleHash
   * @return {number}
   */
declare function BlipAddForStyle(styleHash: Hash): Blip;

/**
   * _BLIP_ADD_FOR_VOLUME
   *
   * @param {number} blipHash
   * @param {number} volume
   * @return {number}
   */
declare function BlipAddForVolume(blipHash: Hash, volume: Volume): Blip;

/**
   * _BLIP_ADD_STYLE
   *
   * @param {number} blip
   * @param {number} styleHash
   * @return {boolean}
   */
declare function BlipAddStyle(blip: Blip, styleHash: Hash): boolean;

/**
   * _BLIP_SET_STYLE
   * https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/blip_styles
   * Removes any existing modifiers and sets the style.
   *
   * @param {number} blip
   * @param {number} styleHash
   * @return {boolean}
   */
declare function BlipSetStyle(blip: Blip, styleHash: Hash): boolean;

/**
   * _DOES_ENTITY_HAVE_BLIP
   *
   * @param {number} entity
   * @return {boolean}
   */
declare function DoesEntityHaveBlip(entity: Entity): boolean;

/**
   * _FIND_CLOSEST_GPS_POSITION
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {[boolean, Vector3]}
   */
declare function FindClosestGpsPosition(x: number, y: number, z: number): [boolean, Vector3];

/**
   * _GET_WAYPOINT_COORDS
   *
  
   * @return {Vector3}
   */
declare function GetWaypointCoords(): Vector3;

/**
   * _HIDE_ACTIVE_POINTS_OF_INTEREST
   *
  
   * @return {void}
   */
declare function HideActivePointsOfInterest(): void;

/**
   * _IS_BLIP_ATTACHED_TO_ANY_ENTITY
   *
   * @param {number} blip
   * @return {boolean}
   */
declare function IsBlipAttachedToAnyEntity(blip: Blip): boolean;

/**
   * _MAP_DISABLE_REGION_BLIP
   *
   * @param {number} regionHash
   * @return {void}
   */
declare function MapDisableRegionBlip(regionHash: Hash): void;

/**
   * _MAP_DISCOVERY_SET_ENABLED
   *
   * @param {number} discoveryHash
   * @return {void}
   */
declare function MapDiscoverySetEnabled(discoveryHash: Hash): void;

/**
   * _MAP_DISCOVER_REGION
   *
   * @param {number} discoveryHash
   * @return {void}
   */
declare function MapDiscoverRegion(discoveryHash: Hash): void;

/**
   * _MAP_ENABLE_REGION_BLIP
   * regionHash: https://github.com/femga/rdr3_discoveries/tree/master/graphics/minimap/wanted_regions
   *
   * @param {number} regionHash
   * @param {number} styleHash
   * @return {void}
   */
declare function MapEnableRegionBlip(regionHash: Hash, styleHash: Hash): void;

/**
   * _MAP_IS_DISCOVERY_ACTIVE
   *
   * @param {number} discoveryHash
   * @return {boolean}
   */
declare function MapIsDiscoveryActive(discoveryHash: Hash): boolean;

/**
   * _MAP_IS_REGION_HIGHLIGHTED_WITH_STYLE
   *
   * @param {number} regionHash
   * @param {number} styleHash
   * @return {boolean}
   */
declare function MapIsRegionHighlightedWithStyle(regionHash: Hash, styleHash: Hash): boolean;

/**
   * _REMOVE_PROP_FROM_MINIMAP
   *
   * @param {number} minimapProp
   * @return {void}
   */
declare function RemovePropFromMinimap(minimapProp: Hash): void;

/**
   * _REVEAL_MINIMAP_FOW
   *
   * @param {number} hash
   * @return {void}
   */
declare function RevealMinimapFow(hash: Hash): void;

/**
   * _SET_BLIP_NAME
   *
   * @param {number} blip
   * @param {string | number} name
   * @return {void}
   */
declare function SetBlipName(blip: Blip, name: string | number): void;

/**
   * _SET_FOW_UPDATE_PLAYER_OVERRIDE
   * Used for GUARMA MODE; Enabled: toggle = false, 0; Disabled: toggle = true, 0
   * Hash p1 seems to be unused, always 0
   *
   * @param {boolean} toggle
   * @param {number} p1
   * @return {void}
   */
declare function SetFowUpdatePlayerOverride(toggle: boolean, p1: Hash): void;

/**
   * _SET_MINIMAP_FOW_OVERRIDE_REVEAL_SCALE
   *
   * @param {number} scale
   * @param {number} p1
   * @return {void}
   */
declare function SetMinimapFowOverrideRevealScale(scale: number, p1: Hash): void;

/**
   * _SET_MINIMAP_FOW_SHOULD_UPDATE
   *
   * @param {boolean} toggle
   * @param {number} p1
   * @return {void}
   */
declare function SetMinimapFowShouldUpdate(toggle: boolean, p1: Hash): void;

/**
   * _SET_MINIMAP_ZONE
   * hash can be the hash of "guarma" or "world".
   *
   * @param {number} zone
   * @return {void}
   */
declare function SetMinimapZone(zone: Hash): void;

/**
   * _SET_PAUSEMAP_COORDS_WITH_RADIUS
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @return {void}
   */
declare function SetPausemapCoordsWithRadius(x: number, y: number, z: number, radius: number): void;

/**
   * _SET_RADAR_CONFIG_TYPE
   * https://github.com/femga/rdr3_discoveries/blob/master/graphics/minimap/radar/radar_configs.lua
   * configHash: -1943724816, 347777538, -117986897, -789269373, -547506804, -1986542417, 2080113112
   * p1: usually 898171178 or 0 in R* scripts (doesn't seems to have any effect)
   *
   * @param {number} configHash
   * @param {number} p1
   * @return {void}
   */
declare function SetRadarConfigType(configHash: Hash, p1: Hash): void;

/**
   * _SHOW_ACTIVE_POINTS_OF_INTEREST
   *
  
   * @return {void}
   */
declare function ShowActivePointsOfInterest(): void;

/**
   * _START_GPS_CUSTOM_ROUTE_FROM_WAYPOINT_RECORDING_ROUTE
   *
   * @param {string | number} waypointRecording
   * @param {number} point
   * @param {number} numPoints
   * @param {number} colorNameHash
   * @param {boolean} p4
   * @param {boolean} p5
   * @return {void}
   */
declare function StartGpsCustomRouteFromWaypointRecordingRoute(waypointRecording: string | number, point: number, numPoints: number, colorNameHash: Hash, p4: boolean, p5: boolean): void;

/**
   * _TRIGGER_SONAR_BLIP_ON_ENTITY
   *
   * @param {number} typeHash
   * @param {number} entity
   * @return {void}
   */
declare function TriggerSonarBlipOnEntity(typeHash: Hash, entity: Entity): void;