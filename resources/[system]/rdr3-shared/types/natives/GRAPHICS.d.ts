/**
   * ADD_DECAL
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
   * @param {any} p11
   * @param {any} p12
   * @param {any} p13
   * @param {any} p14
   * @param {any} p15
   * @param {any} p16
   * @param {any} p17
   * @param {any} p18
   * @param {any} p19
   * @param {any} p20
   * @param {any} p21
   * @return {number}
   */
declare function AddDecal(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any, p7: any, p8: any, p9: any, p10: any, p11: any, p12: any, p13: any, p14: any, p15: any, p16: any, p17: any, p18: any, p19: any, p20: any, p21: any): number;

/**
   * ADD_PETROL_TRAIL_DECAL_INFO
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p3
   * @return {void}
   */
declare function AddPetrolTrailDecalInfo(x: number, y: number, z: number, p3: number): void;

/**
   * ADD_VEG_MODIFIER_SPHERE
   * Returns veg modifier handle
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @param {number} modType
   * @param {number} flags
   * @param {number} p6
   * @return {number}
   */
declare function AddVegModifierSphere(x: number, y: number, z: number, radius: number, modType: number, flags: number, p6: number): number;

/**
   * ALLOW_PICKUP_LIGHT_SYNC
   *
   * @param {number} pickupObject
   * @param {boolean} allow
   * @return {void}
   */
declare function AllowPickupLightSync(pickupObject: number, allow: boolean): void;

/**
   * ANIMPOSTFX_HAS_EVENT_TRIGGERED_BY_STACKHASH
   *
   * @param {number} effectNameHash
   * @param {number} p1
   * @param {boolean} p2
   * @return {[boolean, boolean]}
   */
declare function AnimpostfxHasEventTriggeredByStackhash(effectNameHash: Hash, p1: number, p2: boolean): [boolean, boolean];

/**
   * ANIMPOSTFX_IS_PRELOADING_BY_STACKHASH
   *
   * @param {number} effectNameHash
   * @return {boolean}
   */
declare function AnimpostfxIsPreloadingByStackhash(effectNameHash: Hash): boolean;

/**
   * ANIMPOSTFX_IS_RUNNING
   *
   * @param {string | number} effectName
   * @return {boolean}
   */
declare function AnimpostfxIsRunning(effectName: string | number): boolean;

/**
   * ANIMPOSTFX_PLAY
   * https://github.com/femga/rdr3_discoveries/blob/master/graphics/animpostfx
   *
   * @param {string | number} effectName
   * @return {void}
   */
declare function AnimpostfxPlay(effectName: string | number): void;

/**
   * ANIMPOSTFX_STOP
   *
   * @param {string | number} effectName
   * @return {void}
   */
declare function AnimpostfxStop(effectName: string | number): void;

/**
   * ANIMPOSTFX_STOP_ALL
   *
  
   * @return {void}
   */
declare function AnimpostfxStopAll(): void;

/**
   * ATTACH_TV_AUDIO_TO_ENTITY
   *
   * @param {number} entity
   * @return {void}
   */
declare function AttachTvAudioToEntity(entity: Entity): void;

/**
   * BEGIN_CREATE_LOW_QUALITY_COPY_OF_PHOTO
   * Called together with FREE_MEMORY_FOR_LOW_QUALITY_PHOTO
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function BeginCreateLowQualityCopyOfPhoto(p0: number): boolean;

/**
   * BEGIN_TAKE_HIGH_QUALITY_PHOTO
   *
  
   * @return {boolean}
   */
declare function BeginTakeHighQualityPhoto(): boolean;

/**
   * BLOCK_PICKUP_PLACEMENT_LIGHT
   *
   * @param {number} pickup
   * @param {boolean} toggle
   * @return {void}
   */
declare function BlockPickupPlacementLight(pickup: Pickup, toggle: boolean): void;

/**
   * CASCADE_SHADOWS_CLEAR_SHADOW_SAMPLE_TYPE
   *
  
   * @return {void}
   */
declare function CascadeShadowsClearShadowSampleType(): void;

/**
   * CASCADE_SHADOWS_ENABLE_ENTITY_TRACKER
   * When this is set to ON, shadows only draw as you get nearer.
   * 
   * When OFF, they draw from a further distance.
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function CascadeShadowsEnableEntityTracker(toggle: boolean): void;

/**
   * CASCADE_SHADOWS_SET_CASCADE_BOUNDS
   *
   * @param {any} p0
   * @param {boolean} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @param {boolean} p6
   * @param {number} p7
   * @return {void}
   */
declare function CascadeShadowsSetCascadeBounds(p0: any, p1: boolean, p2: number, p3: number, p4: number, p5: number, p6: boolean, p7: number): void;

/**
   * CASCADE_SHADOWS_SET_SHADOW_SAMPLE_TYPE
   * Possible values:
   * "CSM_ST_POINT"
   * "CSM_ST_LINEAR"
   * "CSM_ST_BOX3x3"
   * "CSM_ST_BOX4x4"
   * "CSM_ST_DITHER2_LINEAR"
   * "CSM_ST_CUBIC"
   * "CSM_ST_POISSON16"
   * "CSM_ST_SOFT8"
   * "CSM_ST_SOFT16"
   * "CSM_ST_SOFT32"
   * "CSM_ST_DITHER16_RPDB"
   * "CSM_ST_POISSON16_RPDB_GNORM"
   * "CSM_ST_HIGHRES_BOX4x4"
   * "CSM_ST_ESM"
   *
   * @param {string | number} type
   * @return {void}
   */
declare function CascadeShadowsSetShadowSampleType(type: string | number): void;

/**
   * CLEAR_TIMECYCLE_MODIFIER
   *
  
   * @return {void}
   */
declare function ClearTimecycleModifier(): void;

/**
   * CREATE_CHECKPOINT_WITH_NAMEHASH
   *
   * @param {number} typeHash
   * @param {number} posX1
   * @param {number} posY1
   * @param {number} posZ1
   * @param {number} posX2
   * @param {number} posY2
   * @param {number} posZ2
   * @param {number} radius
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @param {number} alpha
   * @param {number} reserved
   * @return {number}
   */
declare function CreateCheckpointWithNamehash(typeHash: Hash, posX1: number, posY1: number, posZ1: number, posX2: number, posY2: number, posZ2: number, radius: number, red: number, green: number, blue: number, alpha: number, reserved: number): number;

/**
   * CREATE_TRACKED_POINT
   * Creates a tracked point, useful for checking the visibility of a 3D point on screen.
   *
  
   * @return {number}
   */
declare function CreateTrackedPoint(): number;

/**
   * DELETE_CHECKPOINT
   *
   * @param {number} checkpoint
   * @return {void}
   */
declare function DeleteCheckpoint(checkpoint: number): void;

/**
   * DESTROY_TRACKED_POINT
   *
   * @param {number} point
   * @return {void}
   */
declare function DestroyTrackedPoint(point: number): void;

/**
   * DISABLE_ENTITYMASK
   *
  
   * @return {void}
   */
declare function DisableEntitymask(): void;

/**
   * DISABLE_HDTEX_THIS_FRAME
   *
  
   * @return {void}
   */
declare function DisableHdtexThisFrame(): void;

/**
   * DOES_PARTICLE_FX_LOOPED_EXIST
   *
   * @param {number} ptfxHandle
   * @return {boolean}
   */
declare function DoesParticleFxLoopedExist(ptfxHandle: number): boolean;

/**
   * DRAW_LIGHT_WITH_RANGE
   *
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {number} colorR
   * @param {number} colorG
   * @param {number} colorB
   * @param {number} range
   * @param {number} intensity
   * @return {void}
   */
declare function DrawLightWithRange(posX: number, posY: number, posZ: number, colorR: number, colorG: number, colorB: number, range: number, intensity: number): void;

/**
   * DRAW_LOW_QUALITY_PHOTO_TO_PHONE
   * nullsub, doesn't do anything (GTA5 leftover, there is no phone in RDR3)
   *
   * @param {boolean} p0
   * @param {number} photoRotation
   * @return {void}
   */
declare function DrawLowQualityPhotoToPhone(p0: boolean, photoRotation: number): void;

/**
   * DRAW_RECT
   * Draws a rectangle on the screen.
   * 
   * -x: The relative X point of the center of the rectangle. (0.0-1.0, 0.0 is the left edge of the screen, 1.0 is the right edge of the screen)
   * 
   * -y: The relative Y point of the center of the rectangle. (0.0-1.0, 0.0 is the top edge of the screen, 1.0 is the bottom edge of the screen)
   * 
   * -width: The relative width of the rectangle. (0.0-1.0, 1.0 means the whole screen width)
   * 
   * -height: The relative height of the rectangle. (0.0-1.0, 1.0 means the whole screen height)
   * 
   * -R: Red part of the color. (0-255)
   * 
   * -G: Green part of the color. (0-255)
   * 
   * -B: Blue part of the color. (0-255)
   * 
   * -A: Alpha part of the color. (0-255, 0 means totally transparent, 255 means totally opaque)
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @param {number} alpha
   * @param {boolean} p8
   * @param {boolean} p9
   * @return {void}
   */
declare function DrawRect(x: number, y: number, width: number, height: number, red: number, green: number, blue: number, alpha: number, p8: boolean, p9: boolean): void;

/**
   * DRAW_SPRITE
   * Draws a 2D sprite on the screen.
   * 
   * Parameters:
   * textureDict - Name of texture dictionary to load texture from
   * 
   * textureName - Name of texture to load from texture dictionary
   * 
   * screenX/Y - Screen offset (0.5 = center)
   * scaleX/Y - Texture scaling. Negative values can be used to flip the texture on that axis. (0.5 = half)
   * 
   * heading - Texture rotation in degrees (default = 0.0) positive is clockwise, measured in degrees
   * 
   * red,green,blue - Sprite color (default = 255/255/255)
   * 
   * alpha - opacity level
   * 
   * https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/textures
   *
   * @param {string | number} textureDict
   * @param {string | number} textureName
   * @param {number} screenX
   * @param {number} screenY
   * @param {number} width
   * @param {number} height
   * @param {number} heading
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @param {number} alpha
   * @param {boolean} p11
   * @return {void}
   */
declare function DrawSprite(textureDict: string | number, textureName: string | number, screenX: number, screenY: number, width: number, height: number, heading: number, red: number, green: number, blue: number, alpha: number, p11: boolean): void;

/**
   * DRAW_TV_CHANNEL
   *
   * @param {number} xPos
   * @param {number} yPos
   * @param {number} xScale
   * @param {number} yScale
   * @param {number} rotation
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @param {number} alpha
   * @return {void}
   */
declare function DrawTvChannel(xPos: number, yPos: number, xScale: number, yScale: number, rotation: number, red: number, green: number, blue: number, alpha: number): void;

/**
   * ENABLE_ENTITYMASK
   *
  
   * @return {void}
   */
declare function EnableEntitymask(): void;

/**
   * ENABLE_MOON_CYCLE_OVERRIDE
   * Old name: _ENABLE_EXTRA_TIMECYCLE_MODIFIER_STRENGTH
   *
   * @param {number} strength
   * @return {void}
   */
declare function EnableMoonCycleOverride(strength: number): void;

/**
   * ENABLE_MOVIE_SUBTITLES
   * nullsub, doesn't do anything
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function EnableMovieSubtitles(toggle: boolean): void;

/**
   * END_PETROL_TRAIL_DECALS
   *
  
   * @return {void}
   */
declare function EndPetrolTrailDecals(): void;

/**
   * FREE_MEMORY_FOR_HIGH_QUALITY_PHOTO
   *
  
   * @return {void}
   */
declare function FreeMemoryForHighQualityPhoto(): void;

/**
   * FREE_MEMORY_FOR_LOW_QUALITY_PHOTO
   *
  
   * @return {void}
   */
declare function FreeMemoryForLowQualityPhoto(): void;

/**
   * FREE_MEMORY_FOR_MISSION_CREATOR_PHOTO
   *
  
   * @return {void}
   */
declare function FreeMemoryForMissionCreatorPhoto(): void;

/**
   * GET_SCREEN_COORD_FROM_WORLD_COORD
   *
   * @param {number} worldX
   * @param {number} worldY
   * @param {number} worldZ
   * @return {[boolean, number, number]}
   */
declare function GetScreenCoordFromWorldCoord(worldX: number, worldY: number, worldZ: number): [boolean, number, number];

/**
   * GET_SCREEN_RESOLUTION
   * Hardcoded to always set x to 1280 and y to 720.
   *
  
   * @return {[number, number]}
   */
declare function GetScreenResolution(): [number, number];

/**
   * GET_STATUS_OF_CREATE_LOW_QUALITY_COPY_OF_PHOTO
   * Old name: _GET_STATUS_OF_DRAW_LOW_QUALITY_PHOTO
   *
   * @param {any} p0
   * @return {number}
   */
declare function GetStatusOfCreateLowQualityCopyOfPhoto(p0: any): number;

/**
   * GET_STATUS_OF_LOAD_MISSION_CREATOR_PHOTO
   * contentId: returned by NETWORK::_UGC_QUERY_GET_CREATOR_PHOTO(uVar0, 0, sParam3)
   *
   * @param {string | number} contentId
   * @return {number}
   */
declare function GetStatusOfLoadMissionCreatorPhoto(contentId: string | number): number;

/**
   * GET_STATUS_OF_SAVE_HIGH_QUALITY_PHOTO
   * 0 = succeeded
   * 1 = getting status
   * 2 = failed
   *
  
   * @return {number}
   */
declare function GetStatusOfSaveHighQualityPhoto(): number;

/**
   * GET_STATUS_OF_SORTED_LIST_OPERATION
   * 0 = succeeded
   * 1 = getting status
   * 2 = failed
   *
  
   * @return {number}
   */
declare function GetStatusOfSortedListOperation(): number;

/**
   * GET_STATUS_OF_TAKE_HIGH_QUALITY_PHOTO
   *
  
   * @return {number}
   */
declare function GetStatusOfTakeHighQualityPhoto(): number;

/**
   * GET_TIMECYCLE_MODIFIER_INDEX
   *
  
   * @return {number}
   */
declare function GetTimecycleModifierIndex(): number;

/**
   * GET_TIMECYCLE_TRANSITION_MODIFIER_INDEX
   *
  
   * @return {number}
   */
declare function GetTimecycleTransitionModifierIndex(): number;

/**
   * GET_TOGGLE_PAUSED_RENDERPHASES_STATUS
   *
  
   * @return {boolean}
   */
declare function GetTogglePausedRenderphasesStatus(): boolean;

/**
   * GET_TV_CHANNEL
   *
  
   * @return {number}
   */
declare function GetTvChannel(): number;

/**
   * IS_DECAL_ALIVE
   *
   * @param {number} decal
   * @return {boolean}
   */
declare function IsDecalAlive(decal: number): boolean;

/**
   * IS_PHOTO_FRAME
   *
  
   * @return {boolean}
   */
declare function IsPhotoFrame(): boolean;

/**
   * IS_TRACKED_POINT_VISIBLE
   *
   * @param {number} point
   * @return {boolean}
   */
declare function IsTrackedPointVisible(point: number): boolean;

/**
   * IS_TVSHOW_CURRENTLY_PLAYING
   * Old name: _IS_TV_PLAYLIST_ITEM_PLAYING
   *
   * @param {number} videoCliphash
   * @return {boolean}
   */
declare function IsTvshowCurrentlyPlaying(videoCliphash: Hash): boolean;

/**
   * LOAD_MISSION_CREATOR_PHOTO
   *
   * @param {DataView} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {boolean}
   */
declare function LoadMissionCreatorPhoto(p0: DataView, p1: any, p2: any, p3: any): boolean;

/**
   * PEDSHOT_IS_AVAILABLE
   *
  
   * @return {boolean}
   */
declare function PedshotIsAvailable(): boolean;

/**
   * QUEUE_OPERATION_TO_CREATE_SORTED_LIST_OF_PHOTOS
   *
  
   * @return {any}
   */
declare function QueueOperationToCreateSortedListOfPhotos(): any;

/**
   * REMOVE_DECAL
   *
   * @param {number} decal
   * @return {void}
   */
declare function RemoveDecal(decal: number): void;

/**
   * REMOVE_DECALS_FROM_OBJECT
   *
   * @param {number} obj
   * @return {void}
   */
declare function RemoveDecalsFromObject(obj: number): void;

/**
   * REMOVE_DECALS_IN_RANGE
   * Removes all decals in range from a position, it includes the bullet holes, blood pools, petrol...
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} range
   * @return {void}
   */
declare function RemoveDecalsInRange(x: number, y: number, z: number, range: number): void;

/**
   * REMOVE_GRASS_CULL_SPHERE
   *
   * @param {number} handle
   * @return {void}
   */
declare function RemoveGrassCullSphere(handle: number): void;

/**
   * REMOVE_PARTICLE_FX
   *
   * @param {number} ptfxHandle
   * @param {boolean} p1
   * @return {void}
   */
declare function RemoveParticleFx(ptfxHandle: number, p1: boolean): void;

/**
   * REMOVE_PARTICLE_FX_FROM_ENTITY
   *
   * @param {number} entity
   * @return {void}
   */
declare function RemoveParticleFxFromEntity(entity: Entity): void;

/**
   * REMOVE_PARTICLE_FX_IN_RANGE
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @return {void}
   */
declare function RemoveParticleFxInRange(X: number, Y: number, Z: number, radius: number): void;

/**
   * REMOVE_VEG_MODIFIER_SPHERE
   * only works by invoking and passing as pointer value Citizen.InvokeNative(0x9CF1836C03FB67A2, Citizen.PointerValueIntInitialized(vegModifierId),1) p1 is 1 or 0
   *
   * @param {number} vegModifierHandle
   * @param {number} p1
   * @return {void}
   */
declare function RemoveVegModifierSphere(vegModifierHandle: number, p1: number): void;

/**
   * RESET_ADAPTATION
   * Sets an unknown value related to timecycles.
   *
   * @param {number} unk
   * @return {void}
   */
declare function ResetAdaptation(unk: number): void;

/**
   * RESET_PARTICLE_FX_OVERRIDE
   * Resets the effect of SET_PARTICLE_FX_OVERRIDE
   *
   * @param {string | number} name
   * @return {void}
   */
declare function ResetParticleFxOverride(name: string | number): void;

/**
   * RESET_PAUSED_RENDERPHASES
   *
  
   * @return {void}
   */
declare function ResetPausedRenderphases(): void;

/**
   * SAVE_HIGH_QUALITY_PHOTO
   *
   * @param {number} unused
   * @return {boolean}
   */
declare function SaveHighQualityPhoto(unused: number): boolean;

/**
   * SET_ARTIFICIAL_LIGHTS_STATE
   * Does not affect weapons, particles, fire/explosions, flashlights or the sun.
   * When set to true, all emissive textures (including ped components that have light effects), street lights, building lights, vehicle lights, etc will all be turned off.
   * 
   * state: True turns off all artificial light sources in the map: buildings, street lights, car lights, etc. False turns them back on.
   *
   * @param {boolean} state
   * @return {void}
   */
declare function SetArtificialLightsState(state: boolean): void;

/**
   * SET_CHECKPOINT_RGBA
   * Sets the checkpoint color.
   *
   * @param {number} checkpoint
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @param {number} alpha
   * @return {void}
   */
declare function SetCheckpointRgba(checkpoint: number, red: number, green: number, blue: number, alpha: number): void;

/**
   * SET_CHECKPOINT_RGBA2
   * Sets the checkpoint icon color.
   *
   * @param {number} checkpoint
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @param {number} alpha
   * @return {void}
   */
declare function SetCheckpointRgba2(checkpoint: number, red: number, green: number, blue: number, alpha: number): void;

/**
   * SET_DISABLE_PETROL_DECALS_IGNITING_THIS_FRAME
   *
  
   * @return {void}
   */
declare function SetDisablePetrolDecalsIgnitingThisFrame(): void;

/**
   * SET_GRASS_CULL_SPHERE
   * Returns handle to be used with REMOVE_GRASS_CULL_SPHERE
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p3
   * @param {number} p4
   * @return {number}
   */
declare function SetGrassCullSphere(x: number, y: number, z: number, p3: number, p4: number): number;

/**
   * SET_HIDOF_OVERRIDE
   * Old name: _SET_HIDOF_ENV_BLUR_PARAMS
   *
   * @param {boolean} p0
   * @param {boolean} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} p4
   * @param {number} p5
   * @return {void}
   */
declare function SetHidofOverride(p0: boolean, p1: boolean, p2: number, p3: number, p4: number, p5: number): void;

/**
   * SET_PARTICLE_FX_AMBIENT_COLOUR
   * Related to Campfires.
   * p1: AMB_BONFIRE_MP, AMB_CAMPFIRE_LRG_MP
   *
   * @param {number} entity
   * @param {string | number} p1
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @return {void}
   */
declare function SetParticleFxAmbientColour(entity: Entity, p1: string | number, r: number, g: number, b: number): void;

/**
   * SET_PARTICLE_FX_BULLET_IMPACT_LODRANGE_SCALE
   *
   * @param {number} p0
   * @return {void}
   */
declare function SetParticleFxBulletImpactLodrangeScale(p0: number): void;

/**
   * SET_PARTICLE_FX_BULLET_IMPACT_SCALE
   *
   * @param {number} scale
   * @return {void}
   */
declare function SetParticleFxBulletImpactScale(scale: number): void;

/**
   * SET_PARTICLE_FX_FOOT_LODRANGE_SCALE
   *
   * @param {number} p0
   * @return {void}
   */
declare function SetParticleFxFootLodrangeScale(p0: number): void;

/**
   * SET_PARTICLE_FX_LOOPED_ALPHA
   *
   * @param {number} ptfxHandle
   * @param {number} alpha
   * @return {void}
   */
declare function SetParticleFxLoopedAlpha(ptfxHandle: number, alpha: number): void;

/**
   * SET_PARTICLE_FX_LOOPED_COLOUR
   *
   * @param {number} ptfxHandle
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @param {boolean} p4
   * @return {void}
   */
declare function SetParticleFxLoopedColour(ptfxHandle: number, r: number, g: number, b: number, p4: boolean): void;

/**
   * SET_PARTICLE_FX_LOOPED_EVOLUTION
   *
   * @param {number} ptfxHandle
   * @param {string | number} propertyName
   * @param {number} amount
   * @param {boolean} noNetwork
   * @return {void}
   */
declare function SetParticleFxLoopedEvolution(ptfxHandle: number, propertyName: string | number, amount: number, noNetwork: boolean): void;

/**
   * SET_PARTICLE_FX_LOOPED_FAR_CLIP_DIST
   *
   * @param {number} ptfxHandle
   * @param {number} range
   * @return {void}
   */
declare function SetParticleFxLoopedFarClipDist(ptfxHandle: number, range: number): void;

/**
   * SET_PARTICLE_FX_LOOPED_OFFSETS
   *
   * @param {number} ptfxHandle
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} rotX
   * @param {number} rotY
   * @param {number} rotZ
   * @return {void}
   */
declare function SetParticleFxLoopedOffsets(ptfxHandle: number, x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number): void;

/**
   * SET_PARTICLE_FX_LOOPED_SCALE
   *
   * @param {number} ptfxHandle
   * @param {number} scale
   * @return {void}
   */
declare function SetParticleFxLoopedScale(ptfxHandle: number, scale: number): void;

/**
   * SET_PARTICLE_FX_NON_LOOPED_ALPHA
   *
   * @param {number} alpha
   * @return {void}
   */
declare function SetParticleFxNonLoopedAlpha(alpha: number): void;

/**
   * SET_PARTICLE_FX_NON_LOOPED_COLOUR
   *
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @return {void}
   */
declare function SetParticleFxNonLoopedColour(r: number, g: number, b: number): void;

/**
   * SET_PARTICLE_FX_OVERRIDE
   *
   * @param {string | number} oldAsset
   * @param {string | number} newAsset
   * @return {void}
   */
declare function SetParticleFxOverride(oldAsset: string | number, newAsset: string | number): void;

/**
   * SET_PICKUP_LIGHT
   * https://imgur.com/a/I2swSDJ
   * 
   * Old name: _SET_PICKUP_OBJECT_GLOW_ENABLED
   *
   * @param {number} object
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPickupLight(object: number, toggle: boolean): void;

/**
   * SET_SCRIPT_GFX_DRAW_BEHIND_PAUSEMENU
   * Sets a flag defining whether or not script draw commands should continue being drawn behind the pause menu. This is usually used for draw commands that are used with a world render target.
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetScriptGfxDrawBehindPausemenu(toggle: boolean): void;

/**
   * SET_SCRIPT_GFX_DRAW_ORDER
   * Sets the draw order for script draw commands.
   *
   * @param {number} drawOrder
   * @return {void}
   */
declare function SetScriptGfxDrawOrder(drawOrder: number): void;

/**
   * SET_TIMECYCLE_MODIFIER
   * https://github.com/femga/rdr3_discoveries/blob/master/graphics/timecycles
   *
   * @param {string | number} modifierName
   * @return {void}
   */
declare function SetTimecycleModifier(modifierName: string | number): void;

/**
   * SET_TIMECYCLE_MODIFIER_STRENGTH
   *
   * @param {number} strength
   * @return {void}
   */
declare function SetTimecycleModifierStrength(strength: number): void;

/**
   * SET_TRACKED_POINT_INFO
   *
   * @param {number} point
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} radius
   * @return {void}
   */
declare function SetTrackedPointInfo(point: number, x: number, y: number, z: number, radius: number): void;

/**
   * SET_TRANSITION_OUT_OF_TIMECYCLE_MODIFIER
   *
   * @param {number} strength
   * @return {void}
   */
declare function SetTransitionOutOfTimecycleModifier(strength: number): void;

/**
   * SET_TRANSITION_TIMECYCLE_MODIFIER
   *
   * @param {string | number} modifierName
   * @param {number} transitionBlend
   * @return {void}
   */
declare function SetTransitionTimecycleModifier(modifierName: string | number, transitionBlend: number): void;

/**
   * SET_TV_AUDIO_FRONTEND
   * Probably changes tvs from being a 3d audio to being "global" audio
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetTvAudioFrontend(toggle: boolean): void;

/**
   * SET_TV_CHANNEL
   *
   * @param {number} channel
   * @return {void}
   */
declare function SetTvChannel(channel: number): void;

/**
   * SET_TV_CHANNEL_PLAYLIST
   *
   * @param {number} tvChannel
   * @param {string | number} playlistName
   * @param {boolean} restart
   * @return {void}
   */
declare function SetTvChannelPlaylist(tvChannel: number, playlistName: string | number, restart: boolean): void;

/**
   * SET_TV_VOLUME
   *
   * @param {number} volume
   * @return {void}
   */
declare function SetTvVolume(volume: number): void;

/**
   * START_NETWORKED_PARTICLE_FX_LOOPED_ON_ENTITY
   *
   * @param {string | number} effectName
   * @param {number} entity
   * @param {number} xOffset
   * @param {number} yOffset
   * @param {number} zOffset
   * @param {number} xRot
   * @param {number} yRot
   * @param {number} zRot
   * @param {number} scale
   * @param {boolean} xAxis
   * @param {boolean} yAxis
   * @param {boolean} zAxis
   * @return {number}
   */
declare function StartNetworkedParticleFxLoopedOnEntity(effectName: string | number, entity: Entity, xOffset: number, yOffset: number, zOffset: number, xRot: number, yRot: number, zRot: number, scale: number, xAxis: boolean, yAxis: boolean, zAxis: boolean): number;

/**
   * START_NETWORKED_PARTICLE_FX_LOOPED_ON_ENTITY_BONE
   *
   * @param {string | number} effectName
   * @param {number} entity
   * @param {number} xOffset
   * @param {number} yOffset
   * @param {number} zOffset
   * @param {number} xRot
   * @param {number} yRot
   * @param {number} zRot
   * @param {number} boneIndex
   * @param {number} scale
   * @param {boolean} xAxis
   * @param {boolean} yAxis
   * @param {boolean} zAxis
   * @return {number}
   */
declare function StartNetworkedParticleFxLoopedOnEntityBone(effectName: string | number, entity: Entity, xOffset: number, yOffset: number, zOffset: number, xRot: number, yRot: number, zRot: number, boneIndex: number, scale: number, xAxis: boolean, yAxis: boolean, zAxis: boolean): number;

/**
   * START_NETWORKED_PARTICLE_FX_NON_LOOPED_AT_COORD
   *
   * @param {string | number} effectName
   * @param {number} xPos
   * @param {number} yPos
   * @param {number} zPos
   * @param {number} xRot
   * @param {number} yRot
   * @param {number} zRot
   * @param {number} scale
   * @param {boolean} xAxis
   * @param {boolean} yAxis
   * @param {boolean} zAxis
   * @return {boolean}
   */
declare function StartNetworkedParticleFxNonLoopedAtCoord(effectName: string | number, xPos: number, yPos: number, zPos: number, xRot: number, yRot: number, zRot: number, scale: number, xAxis: boolean, yAxis: boolean, zAxis: boolean): boolean;

/**
   * START_NETWORKED_PARTICLE_FX_NON_LOOPED_ON_ENTITY
   *
   * @param {string | number} effectName
   * @param {number} entity
   * @param {number} offsetX
   * @param {number} offsetY
   * @param {number} offsetZ
   * @param {number} rotX
   * @param {number} rotY
   * @param {number} rotZ
   * @param {number} scale
   * @param {boolean} axisX
   * @param {boolean} axisY
   * @param {boolean} axisZ
   * @return {boolean}
   */
declare function StartNetworkedParticleFxNonLoopedOnEntity(effectName: string | number, entity: Entity, offsetX: number, offsetY: number, offsetZ: number, rotX: number, rotY: number, rotZ: number, scale: number, axisX: boolean, axisY: boolean, axisZ: boolean): boolean;

/**
   * START_PARTICLE_FX_LOOPED_AT_COORD
   * https://github.com/femga/rdr3_discoveries/blob/master/graphics/ptfx/ptfx_assets_looped.lua
   *
   * @param {string | number} effectName
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} xRot
   * @param {number} yRot
   * @param {number} zRot
   * @param {number} scale
   * @param {boolean} xAxis
   * @param {boolean} yAxis
   * @param {boolean} zAxis
   * @param {boolean} p11
   * @return {number}
   */
declare function StartParticleFxLoopedAtCoord(effectName: string | number, x: number, y: number, z: number, xRot: number, yRot: number, zRot: number, scale: number, xAxis: boolean, yAxis: boolean, zAxis: boolean, p11: boolean): number;

/**
   * START_PARTICLE_FX_LOOPED_ON_ENTITY
   *
   * @param {string | number} effectName
   * @param {number} entity
   * @param {number} xOffset
   * @param {number} yOffset
   * @param {number} zOffset
   * @param {number} xRot
   * @param {number} yRot
   * @param {number} zRot
   * @param {number} scale
   * @param {boolean} xAxis
   * @param {boolean} yAxis
   * @param {boolean} zAxis
   * @return {number}
   */
declare function StartParticleFxLoopedOnEntity(effectName: string | number, entity: Entity, xOffset: number, yOffset: number, zOffset: number, xRot: number, yRot: number, zRot: number, scale: number, xAxis: boolean, yAxis: boolean, zAxis: boolean): number;

/**
   * START_PARTICLE_FX_LOOPED_ON_ENTITY_BONE
   *
   * @param {string | number} effectName
   * @param {number} entity
   * @param {number} xOffset
   * @param {number} yOffset
   * @param {number} zOffset
   * @param {number} xRot
   * @param {number} yRot
   * @param {number} zRot
   * @param {number} boneIndex
   * @param {number} scale
   * @param {boolean} xAxis
   * @param {boolean} yAxis
   * @param {boolean} zAxis
   * @return {number}
   */
declare function StartParticleFxLoopedOnEntityBone(effectName: string | number, entity: Entity, xOffset: number, yOffset: number, zOffset: number, xRot: number, yRot: number, zRot: number, boneIndex: number, scale: number, xAxis: boolean, yAxis: boolean, zAxis: boolean): number;

/**
   * START_PARTICLE_FX_LOOPED_ON_PED_BONE
   *
   * @param {string | number} effectName
   * @param {number} ped
   * @param {number} xOffset
   * @param {number} yOffset
   * @param {number} zOffset
   * @param {number} xRot
   * @param {number} yRot
   * @param {number} zRot
   * @param {number} boneIndex
   * @param {number} scale
   * @param {boolean} xAxis
   * @param {boolean} yAxis
   * @param {boolean} zAxis
   * @return {number}
   */
declare function StartParticleFxLoopedOnPedBone(effectName: string | number, ped: Ped, xOffset: number, yOffset: number, zOffset: number, xRot: number, yRot: number, zRot: number, boneIndex: number, scale: number, xAxis: boolean, yAxis: boolean, zAxis: boolean): number;

/**
   * START_PARTICLE_FX_NON_LOOPED_AT_COORD
   * https://github.com/femga/rdr3_discoveries/blob/master/graphics/ptfx/ptfx_assets_non_looped.lua
   *
   * @param {string | number} effectName
   * @param {number} xPos
   * @param {number} yPos
   * @param {number} zPos
   * @param {number} xRot
   * @param {number} yRot
   * @param {number} zRot
   * @param {number} scale
   * @param {number} eventType
   * @param {boolean} bPeekOnly
   * @param {boolean} bIsRegistered
   * @return {boolean}
   */
declare function StartParticleFxNonLoopedAtCoord(effectName: string | number, xPos: number, yPos: number, zPos: number, xRot: number, yRot: number, zRot: number, scale: number, eventType: number, bPeekOnly: boolean, bIsRegistered: boolean): boolean;

/**
   * START_PARTICLE_FX_NON_LOOPED_ON_ENTITY
   *
   * @param {string | number} effectName
   * @param {number} entity
   * @param {number} offsetX
   * @param {number} offsetY
   * @param {number} offsetZ
   * @param {number} rotX
   * @param {number} rotY
   * @param {number} rotZ
   * @param {number} scale
   * @param {boolean} axisX
   * @param {boolean} axisY
   * @param {boolean} axisZ
   * @return {boolean}
   */
declare function StartParticleFxNonLoopedOnEntity(effectName: string | number, entity: Entity, offsetX: number, offsetY: number, offsetZ: number, rotX: number, rotY: number, rotZ: number, scale: number, axisX: boolean, axisY: boolean, axisZ: boolean): boolean;

/**
   * START_PARTICLE_FX_NON_LOOPED_ON_PED_BONE
   *
   * @param {string | number} effectName
   * @param {number} ped
   * @param {number} offsetX
   * @param {number} offsetY
   * @param {number} offsetZ
   * @param {number} rotX
   * @param {number} rotY
   * @param {number} rotZ
   * @param {number} boneIndex
   * @param {number} scale
   * @param {boolean} axisX
   * @param {boolean} axisY
   * @param {boolean} axisZ
   * @return {boolean}
   */
declare function StartParticleFxNonLoopedOnPedBone(effectName: string | number, ped: Ped, offsetX: number, offsetY: number, offsetZ: number, rotX: number, rotY: number, rotZ: number, boneIndex: number, scale: number, axisX: boolean, axisY: boolean, axisZ: boolean): boolean;

/**
   * START_PETROL_TRAIL_DECALS
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function StartPetrolTrailDecals(p0: any, p1: any): void;

/**
   * STOP_PARTICLE_FX_LOOPED
   *
   * @param {number} ptfxHandle
   * @param {boolean} p1
   * @return {void}
   */
declare function StopParticleFxLooped(ptfxHandle: number, p1: boolean): void;

/**
   * TOGGLE_PAUSED_RENDERPHASES
   *
   * @param {boolean} toggle
   * @return {void}
   */
declare function TogglePausedRenderphases(toggle: boolean): void;

/**
   * UPDATE_LIGHTS_ON_ENTITY
   *
   * @param {number} entity
   * @return {void}
   */
declare function UpdateLightsOnEntity(entity: Entity): void;

/**
   * USE_PARTICLE_FX_ASSET
   * fxName: see data_0/data/effects/ptfx/fxlists/
   *
   * @param {string | number} fxName
   * @return {void}
   */
declare function UseParticleFxAsset(fxName: string | number): void;

/**
   * _0x085C5B61A0114F32
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x085C5B61A0114F32(p0: any, p1: any): void;

/**
   * _0x0D5B19C34068FEE7
   * Gets set to 1 when GET_STATUS_OF_TAKE_HIGH_QUALITY_PHOTO = PHOTO_OPERATION_SUCCEEDED
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x0D5B19C34068FEE7(p0: any): void;

/**
   * _0x1460B644397453EB
   * _RESET_*
   *
  
   * @return {void}
   */
declare function N_0x1460B644397453EB(): void;

/**
   * _0x171C18E994C1A395
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function N_0x171C18E994C1A395(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * _0x1A9F09AB458D49C6
   * Used in shop scripts for CATALOG_BOOK
   * false = Normal -> [CATALOG_BOOK_SHUTDOWN]
   * true = Trees flickering? -> [CATALOG_BOOK_OPEN]
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0x1A9F09AB458D49C6(p0: boolean): void;

/**
   * _0x1C6306E5BC25C29C
   *
  
   * @return {void}
   */
declare function N_0x1C6306E5BC25C29C(): void;

/**
   * _0x1FF8731BE1DFC0C0
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0x1FF8731BE1DFC0C0(p0: any, p1: any): void;

/**
   * _0x21F00E08CBB5F37B
   * Params: component - used in odriscolls1 and sean1 R* SP Script: COMPONENT_BINOCULARS_SCOPE01
   * Triggers the binocular scaleform
   *
   * @param {string | number} component
   * @return {void}
   */
declare function N_0x21F00E08CBB5F37B(component: string | number): void;

/**
   * _0x26DD2FB0A88CC412
   * effectName2, p2 and p3 are unused
   * 
   * ANIMPOSTFX_*
   *
   * @param {string | number} effectName
   * @param {string | number} effectName2
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0x26DD2FB0A88CC412(effectName: string | number, effectName2: string | number, p2: any, p3: any): void;

/**
   * _0x285438C26C732F9D
   *
  
   * @return {any}
   */
declare function N_0x285438C26C732F9D(): any;

/**
   * _0x32DE2BFFDA43E62A
   *
  
   * @return {void}
   */
declare function N_0x32DE2BFFDA43E62A(): void;

/**
   * _0x38D9D50F2085E9B3
   * ANIMPOSTFX_*
   *
   * @param {number} effectNameHash
   * @return {void}
   */
declare function N_0x38D9D50F2085E9B3(effectNameHash: Hash): void;

/**
   * _0x3DA7A10583A4BEC0
   * ANIMPOSTFX_*
   *
  
   * @return {boolean}
   */
declare function N_0x3DA7A10583A4BEC0(): boolean;

/**
   * _0x402E1A61D2587FCD
   * Only used in R* SP Script spd_agnesdown1
   *
   * @param {any} p0
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p4
   * @param {number} p5
   * @param {number} heading
   * @return {boolean}
   */
declare function N_0x402E1A61D2587FCD(p0: any, x: number, y: number, z: number, p4: number, p5: number, heading: number): boolean;

/**
   * _0x4046493D2EEACA0E
   * _DISABLE_*
   *
  
   * @return {void}
   */
declare function N_0x4046493D2EEACA0E(): void;

/**
   * _0x41F88A85A579A61D
   * Used in CREATE_BEZIER_BLOOD_TRAIL_OF_TYPE
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0x41F88A85A579A61D(p0: number): void;

/**
   * _0x453D16D41FC51D3E
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0x453D16D41FC51D3E(p0: boolean): void;

/**
   * _0x48FE0DB54045B975
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
declare function N_0x48FE0DB54045B975(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): void;

/**
   * _0x4BD66B4E3427689B
   * Used in CREATE_BEZIER_BLOOD_TRAIL_OF_TYPE
   *
   * @param {string | number} p0
   * @return {void}
   */
declare function N_0x4BD66B4E3427689B(p0: string | number): void;

/**
   * _0x4FB67D172C4476F3
   * p1: AMB_ANN_COAL_CHUTE_DIVE, AMB_ANN_COAL_CHUTE
   * p2: EMIT
   * p3: either 0.0f or 1.0f
   *
   * @param {number} entity
   * @param {string | number} p1
   * @param {string | number} p2
   * @param {number} p3
   * @return {void}
   */
declare function N_0x4FB67D172C4476F3(entity: Entity, p1: string | number, p2: string | number, p3: number): void;

/**
   * _0x503941F65DBA24EC
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x503941F65DBA24EC(p0: any): void;

/**
   * _0x519928DF02EB5101
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x519928DF02EB5101(p0: any): void;

/**
   * _0x5AC6E0FA028369DE
   * Closes the the binocular scaleform
   *
  
   * @return {void}
   */
declare function N_0x5AC6E0FA028369DE(): void;

/**
   * _0x5C674EB487891F6B
   *
  
   * @return {any}
   */
declare function N_0x5C674EB487891F6B(): any;

/**
   * _0x5C9C3A466B3296A8
   * Only used in R* SP Script spd_agnesdown1
   *
   * @param {any} p0
   * @return {any}
   */
declare function N_0x5C9C3A466B3296A8(p0: any): any;

/**
   * _SET_PHOTO_MODE_EXPOSURE_LOCKED
   *
   * @param {boolean} lock
   * @return {void}
   */
declare function SetPhotoModeExposureLocked(lock: boolean): void;

/**
   * _CHANGE_PHOTO_MODE_CONTRAST
   *
   * @param {number} value
   * @return {void}
   */
declare function ChangePhotoModeContrast(value: number): void;

/**
   * _0x67B0778C62E74423
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x67B0778C62E74423(p0: any): void;

/**
   * _0x6C03118E9E5C1A14
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x6C03118E9E5C1A14(p0: any): void;

/**
   * _0x71845905BCCDE781
   * ANIMPOSTFX_*
   *
   * @param {number} effectNameHash
   * @return {void}
   */
declare function N_0x71845905BCCDE781(effectNameHash: Hash): void;

/**
   * _0x735762E8D7573E42
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @return {void}
   */
declare function N_0x735762E8D7573E42(p0: any, p1: any, p2: any): void;

/**
   * _0x812C1563185C6FB2
   * Used in CREATE_BEZIER_BLOOD_TRAIL_OF_TYPE
   * _ENABLE_*
   *
  
   * @return {void}
   */
declare function N_0x812C1563185C6FB2(): void;

/**
   * _0x815653A42C5ABE76
   *
  
   * @return {void}
   */
declare function N_0x815653A42C5ABE76(): void;

/**
   * _0x8996FA6AD9FE4E90
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x8996FA6AD9FE4E90(p0: any): void;

/**
   * _0x910E260AEAD855DE
   *
  
   * @return {void}
   */
declare function N_0x910E260AEAD855DE(): void;

/**
   * _UPDATE_PHOTO_MODE_EXPOSURE
   * Resets the exposure to the value when exposure lock was enabled
   *
  
   * @return {void}
   */
declare function UpdatePhotoModeExposure(): void;

/**
   * _0x94B261F1F35293E1
   * nullsub, doesn't do anything
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x94B261F1F35293E1(p0: any): void;

/**
   * _0x981C7D863980FA51
   *
  
   * @return {void}
   */
declare function N_0x981C7D863980FA51(): void;

/**
   * _0x9D1B0B5066205692
   *
  
   * @return {void}
   */
declare function N_0x9D1B0B5066205692(): void;

/**
   * _0x9F158A49B0D84C3C
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0x9F158A49B0D84C3C(p0: any): void;

/**
   * _0x9F6D859C80708B26
   *
   * @param {boolean} p0
   * @param {boolean} p1
   * @return {void}
   */
declare function N_0x9F6D859C80708B26(p0: boolean, p1: boolean): void;

/**
   * _0xA04EF43030593ABC
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xA04EF43030593ABC(p0: any, p1: any): void;

/**
   * _0xA0F4D12D6042F6D5
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xA0F4D12D6042F6D5(p0: any, p1: any): void;

/**
   * _0xA15CCAB8AD038291
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {any}
   */
declare function N_0xA15CCAB8AD038291(p0: any, p1: any, p2: any, p3: any): any;

/**
   * _0xA1A86055792FB249
   *
   * @param {number} personaPhotoLocalCacheType
   * @return {void}
   */
declare function N_0xA1A86055792FB249(personaPhotoLocalCacheType: number): void;

/**
   * _0xA201A3D0AC087C37
   * ANIMPOSTFX_*
   *
   * @param {string | number} effectName
   * @return {void}
   */
declare function N_0xA201A3D0AC087C37(effectName: string | number): void;

/**
   * _0xA21AF60C9F99CCC5
   *
  
   * @return {void}
   */
declare function N_0xA21AF60C9F99CCC5(): void;

/**
   * _0xB032C085D9A03907
   * _SET_D* or _SET_E*
   *
  
   * @return {void}
   */
declare function N_0xB032C085D9A03907(): void;

/**
   * _0xB958D97A0DFAA0C2
   * ANIMPOSTFX_*
   *
   * @param {string | number} effectName
   * @return {boolean}
   */
declare function N_0xB958D97A0DFAA0C2(effectName: string | number): boolean;

/**
   * _0xC06F2F45A73EABCD
   * Used in NET_CAMP_SPIRIT_ANIMAL_CLEAR_ANIMAL_VISIBILITY
   *
   * @param {number} entity
   * @return {void}
   */
declare function N_0xC06F2F45A73EABCD(entity: Entity): void;

/**
   * _0xC28F62AC9774FC1B
   *
  
   * @return {any}
   */
declare function N_0xC28F62AC9774FC1B(): any;

/**
   * _0xC37792A3F9C90771
   * Doesn't actually return anything.
   * 
   * ANIMPOSTFX_*
   *
  
   * @return {any}
   */
declare function N_0xC37792A3F9C90771(): any;

/**
   * _0xC489FE31AC726512
   *
   * @param {any} p0
   * @param {any} p1
   * @return {void}
   */
declare function N_0xC489FE31AC726512(p0: any, p1: any): void;

/**
   * _0xC76FC4C2FC5F4405
   * ANIMPOSTFX_*
   *
   * @param {number} effectNameHash
   * @return {void}
   */
declare function N_0xC76FC4C2FC5F4405(effectNameHash: Hash): void;

/**
   * _CHANGE_PHOTO_MODE_EXPOSURE
   *
   * @param {number} value
   * @return {void}
   */
declare function ChangePhotoModeExposure(value: number): void;

/**
   * _0xCC3B787E73E64160
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @param {any} p4
   * @return {void}
   */
declare function N_0xCC3B787E73E64160(p0: any, p1: any, p2: any, p3: any, p4: any): void;

/**
   * _0xD1472AFF30C103D6
   * Only used in R* Script nb_stalking_hunter
   *
   * @param {number} p0
   * @return {void}
   */
declare function N_0xD1472AFF30C103D6(p0: number): void;

/**
   * _0xD543487A1F12828F
   *
   * @param {any} p0
   * @param {any} p1
   * @param {any} p2
   * @param {any} p3
   * @return {void}
   */
declare function N_0xD543487A1F12828F(p0: any, p1: any, p2: any, p3: any): void;

/**
   * _0xD9BC98B55BCFAA9B
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xD9BC98B55BCFAA9B(p0: any): void;

/**
   * _0xDFE332A5DA6FE7C9
   * Returns iNumPixels, iPixelsVisible
   *
   * @param {number} iTrackedPoint
   * @return {number}
   */
declare function N_0xDFE332A5DA6FE7C9(iTrackedPoint: number): number;

/**
   * _0xE63D68F455CA0B47
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
declare function N_0xE63D68F455CA0B47(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any, p6: any): any;

/**
   * _0xE75CDDEBF618C8FF
   * ANIMPOSTFX_*
   *
   * @param {number} effectNameHash
   * @return {boolean}
   */
declare function N_0xE75CDDEBF618C8FF(effectNameHash: Hash): boolean;

/**
   * _0xEB48CE48EEC41FD4
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xEB48CE48EEC41FD4(p0: any): void;

/**
   * _0xEC3D8C228FE553D7
   *
   * @param {boolean} p0
   * @return {boolean}
   */
declare function N_0xEC3D8C228FE553D7(p0: boolean): boolean;

/**
   * _0xEC3F7F24EEEB3BA3
   *
  
   * @return {void}
   */
declare function N_0xEC3F7F24EEEB3BA3(): void;

/**
   * _0xF2F543D48F319A3A
   *
  
   * @return {void}
   */
declare function N_0xF2F543D48F319A3A(): void;

/**
   * _0xF5793BB386E1FF9C
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xF5793BB386E1FF9C(p0: any): void;

/**
   * _0xFB680A9B33D0EDBE
   * _DISABLE_*
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function N_0xFB680A9B33D0EDBE(p0: boolean): void;

/**
   * _0xFBF161FCFEC8589E
   * ANIMPOSTFX_*
   *
   * @param {string | number} effectName
   * @param {number} p1
   * @param {boolean} p2
   * @return {[boolean, boolean]}
   */
declare function N_0xFBF161FCFEC8589E(effectName: string | number, p1: number, p2: boolean): [boolean, boolean];

/**
   * _0xFC9B53C072F418E0
   *
  
   * @return {any}
   */
declare function N_0xFC9B53C072F418E0(): any;

/**
   * _0xFD05B1DDE83749FA
   * R* Script spd_agnesdow1: p0 = SPD_AGNES_DOWD_01
   *
   * @param {string | number} p0
   * @return {boolean}
   */
declare function N_0xFD05B1DDE83749FA(p0: string | number): boolean;

/**
   * _0xFF584F097C17FA8F
   * Returns whether the 'killFX' setting is enabled.
   * 
   * ANIMPOSTFX_*
   *
  
   * @return {boolean}
   */
declare function N_0xFF584F097C17FA8F(): boolean;

/**
   * _0xFF8018C778349234
   *
   * @param {any} p0
   * @return {void}
   */
declare function N_0xFF8018C778349234(p0: any): void;

/**
   * _ADD_BLOOD_POOL
   * https://i.imgur.com/ULQU9US.jpg
   * More rounded and small puddle
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {boolean} unused
   * @return {void}
   */
declare function AddBloodPool(x: number, y: number, z: number, unused: boolean): void;

/**
   * _ADD_BLOOD_POOLS_FOR_PED
   * Creates blood pools for the given ped in some interval for a few seconds.
   *
   * @param {number} ped
   * @return {void}
   */
declare function AddBloodPoolsForPed(ped: Ped): void;

/**
   * _ADD_BLOOD_POOLS_FOR_PED_WITH_PARAMS
   *
   * @param {number} ped
   * @param {number} p1
   * @param {number} size
   * @param {number} p3
   * @return {void}
   */
declare function AddBloodPoolsForPedWithParams(ped: Ped, p1: number, size: number, p3: number): void;

/**
   * _ADD_BLOOD_POOL_2
   * https://i.imgur.com/rPITUCV.jpg
   * More customizable and more like quadrants
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} p3
   * @param {number} size
   * @param {number} p5
   * @param {boolean} permanent
   * @param {number} p7
   * @param {boolean} p8
   * @return {void}
   */
declare function AddBloodPool_2(x: number, y: number, z: number, p3: number, size: number, p5: number, permanent: boolean, p7: number, p8: boolean): void;

/**
   * _ADD_BLOOD_TRAIL_POINT
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function AddBloodTrailPoint(x: number, y: number, z: number): void;

/**
   * _ADD_BLOOD_TRAIL_SPLAT
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function AddBloodTrailSplat(x: number, y: number, z: number): void;

/**
   * _ADD_ENTITY_TO_ENTITY_MASK
   *
   * @param {number} entity
   * @param {number} mask
   * @return {void}
   */
declare function AddEntityToEntityMask(entity: Entity, mask: number): void;

/**
   * _ADD_ENTITY_TO_ENTITY_MASK_WITH_INTENSITY
   *
   * @param {number} entity
   * @param {number} mask
   * @param {number} intensity
   * @return {void}
   */
declare function AddEntityToEntityMaskWithIntensity(entity: Entity, mask: number, intensity: number): void;

/**
   * _ADD_VEG_MODIFIER_ZONE
   * Adds Vegetation Blocking Zone, Added Snow Flattening veg mod Zone
   * Returns veg modifier handle
   *
   * @param {number} volume
   * @param {number} p1
   * @param {number} flags
   * @param {number} p3
   * @return {number}
   */
declare function AddVegModifierZone(volume: Volume, p1: number, flags: number, p3: number): number;

/**
   * _ANIMPOSTFX_CLEAR_EFFECT
   *
   * @param {string | number} effectName
   * @return {void}
   */
declare function AnimpostfxClearEffect(effectName: string | number): void;

/**
   * _ANIMPOSTFX_GET_STACKHASH
   * Known effects: MP_Trans_SceneToPhoto
   * MP_Trans_WinLose
   * SpectateFilter
   * MP_CharacterCreatorPhoto
   * MP_Trans_PhotoToScene
   * InterrogationHit
   *
   * @param {string | number} effectName
   * @return {number}
   */
declare function AnimpostfxGetStackhash(effectName: string | number): number;

/**
   * _ANIMPOSTFX_HAS_LOADED
   *
   * @param {string | number} effectName
   * @return {boolean}
   */
declare function AnimpostfxHasLoaded(effectName: string | number): boolean;

/**
   * _ANIMPOSTFX_IS_STACKHASH_PLAYING
   *
   * @param {number} effectNameHash
   * @return {boolean}
   */
declare function AnimpostfxIsStackhashPlaying(effectNameHash: Hash): boolean;

/**
   * _ANIMPOSTFX_IS_TAG_PLAYING
   *
   * @param {string | number} effectName
   * @return {boolean}
   */
declare function AnimpostfxIsTagPlaying(effectName: string | number): boolean;

/**
   * _ANIMPOSTFX_PLAY_TAG
   *
   * @param {number} effectNameHash
   * @return {void}
   */
declare function AnimpostfxPlayTag(effectNameHash: Hash): void;

/**
   * _ANIMPOSTFX_PLAY_TIMED
   *
   * @param {string | number} effectName
   * @param {number} duration
   * @return {void}
   */
declare function AnimpostfxPlayTimed(effectName: string | number, duration: number): void;

/**
   * _ANIMPOSTFX_PRELOAD_POSTFX
   *
   * @param {string | number} effectName
   * @return {void}
   */
declare function AnimpostfxPreloadPostfx(effectName: string | number): void;

/**
   * _ANIMPOSTFX_PRELOAD_POSTFX_BY_STACKHASH
   *
   * @param {number} effectNameHash
   * @return {void}
   */
declare function AnimpostfxPreloadPostfxByStackhash(effectNameHash: Hash): void;

/**
   * _ANIMPOSTFX_SET_POSTFX_COLOR
   *
   * @param {string | number} effectName
   * @param {number} p1
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @param {number} alpha
   * @return {void}
   */
declare function AnimpostfxSetPostfxColor(effectName: string | number, p1: number, red: number, green: number, blue: number, alpha: number): void;

/**
   * _ANIMPOSTFX_SET_POTENCY
   * Health Core Effect Filter Potency: p1 = 1
   * Stamina Core Effect Filter Potency: p1 = 2
   * Multiple Core Effect Filter Potency: p1 = 3
   *
   * @param {string | number} effectName
   * @param {number} p1
   * @param {number} potency
   * @return {void}
   */
declare function AnimpostfxSetPotency(effectName: string | number, p1: number, potency: number): void;

/**
   * _ANIMPOSTFX_SET_STRENGTH
   * must be called after ANIMPOSTFX_PLAY, strength 0.0f - 1.0f
   *
   * @param {string | number} effectName
   * @param {number} strength
   * @return {void}
   */
declare function AnimpostfxSetStrength(effectName: string | number, strength: number): void;

/**
   * _ANIMPOSTFX_SET_TO_UNLOAD
   *
   * @param {string | number} effectName
   * @return {void}
   */
declare function AnimpostfxSetToUnload(effectName: string | number): void;

/**
   * _ANIMPOSTFX_STOP_STACKHASH_POSTFX
   *
   * @param {number} effectNameHash
   * @return {void}
   */
declare function AnimpostfxStopStackhashPostfx(effectNameHash: Hash): void;

/**
   * _ANIMPOSTFX_STOP_TAG
   *
   * @param {string | number} effectName
   * @return {void}
   */
declare function AnimpostfxStopTag(effectName: string | number): void;

/**
   * _BLOCK_PICKUP_OBJECT_LIGHT
   *
   * @param {number} pickupObject
   * @param {boolean} toggle
   * @return {void}
   */
declare function BlockPickupObjectLight(pickupObject: number, toggle: boolean): void;

/**
   * _BLOOD_TRAIL_FOR_WAYPOINT
   * p1: 0.3f in R* Scripts
   *
   * @param {string | number} waypointRecording
   * @param {number} p1
   * @return {void}
   */
declare function BloodTrailForWaypoint(waypointRecording: string | number, p1: number): void;

/**
   * _CREATE_SWATCH_TEXTURE_DICT
   *
   * @param {number} slots
   * @return {boolean}
   */
declare function CreateSwatchTextureDict(slots: number): boolean;

/**
   * _DESTROY_SWATCH_TEXTURE_DICT
   *
  
   * @return {void}
   */
declare function DestroySwatchTextureDict(): void;

/**
   * _DISABLE_FAR_ARTIFICIAL_LIGHTS
   * Only used in guama1 R* Script
   * Disables lod/distant lights when BOOL is set to true
   *
   * @param {boolean} disable
   * @return {void}
   */
declare function DisableFarArtificialLights(disable: boolean): void;

/**
   * _DISABLE_STATIC_VEG_MODIFIER
   *
   * @param {number} p0
   * @return {void}
   */
declare function DisableStaticVegModifier(p0: Hash): void;

/**
   * _DOES_CHECKPOINT_HAVE_FX
   *
   * @param {number} checkpoint
   * @return {boolean}
   */
declare function DoesCheckpointHaveFx(checkpoint: number): boolean;

/**
   * DRAW_MARKER
   * https://github.com/femga/rdr3_discoveries/blob/master/graphics/markers/marker_types.lua
   * Old name: _DRAW_MARKER
   *
   * @param {number} type
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {number} dirX
   * @param {number} dirY
   * @param {number} dirZ
   * @param {number} rotX
   * @param {number} rotY
   * @param {number} rotZ
   * @param {number} scaleX
   * @param {number} scaleY
   * @param {number} scaleZ
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @param {number} alpha
   * @param {boolean} bobUpAndDown
   * @param {boolean} faceCamera
   * @param {number} p19
   * @param {boolean} rotate
   * @param {string | number} textureDict
   * @param {string | number} textureName
   * @param {boolean} drawOnEnts
   * @return {void}
   */
declare function DrawMarker(type: Hash, posX: number, posY: number, posZ: number, dirX: number, dirY: number, dirZ: number, rotX: number, rotY: number, rotZ: number, scaleX: number, scaleY: number, scaleZ: number, red: number, green: number, blue: number, alpha: number, bobUpAndDown: boolean, faceCamera: boolean, p19: number, rotate: boolean, textureDict: string | number, textureName: string | number, drawOnEnts: boolean): void;

/**
   * _ENABLE_STATIC_VEG_MODIFIER
   *
   * @param {number} p0
   * @return {void}
   */
declare function EnableStaticVegModifier(p0: Hash): void;

/**
   * _GENERATE_SWATCH_TEXTURE
   * Example:
   * local hash = GetHashKey("CLOTHING_ITEM_M_EYES_001_TINT_001")
   * _GENERATE_SWATCH_TEXTURE(0, hash, 0, true)
   * metapedType: see 0xEC9A1261BF0CE510
   *
   * @param {number} slotId
   * @param {number} componentHash
   * @param {number} metapedType
   * @param {boolean} p3
   * @return {void}
   */
declare function GenerateSwatchTexture(slotId: number, componentHash: Hash, metapedType: number, p3: boolean): void;

/**
   * _GENERATE_SWATCH_TEXTURE_DIRECTLY
   * Example: https://pastebin.com/tTgpER9A
   *
   * @param {number} slot
   * @param {any} p1
   * @return {void}
   */
declare function GenerateSwatchTextureDirectly(slot: number, p1: any): void;

/**
   * _GET_CURRENT_NUMBER_OF_LOCAL_PHOTOS
   *
  
   * @return {number}
   */
declare function GetCurrentNumberOfLocalPhotos(): number;

/**
   * _GET_ENTITY_MASK_LAYERS
   *
   * @param {number} entity
   * @return {[boolean, number, number, number, number]}
   */
declare function GetEntityMaskLayers(entity: Entity): [boolean, number, number, number, number];

/**
   * _GET_MAX_NUMBER_OF_LOCAL_PHOTOS
   * Always returns 200.
   *
  
   * @return {number}
   */
declare function GetMaxNumberOfLocalPhotos(): number;

/**
   * _GET_MODIFIED_VISIBILITY_DISTANCE
   * _GET_C* - _GET_E*
   *
  
   * @return {number}
   */
declare function GetModifiedVisibilityDistance(): number;

/**
   * _GET_PHOTO_MODE_CONTRAST
   *
  
   * @return {number}
   */
declare function GetPhotoModeContrast(): number;

/**
   * _GET_PHOTO_MODE_EXPOSURE
   *
  
   * @return {number}
   */
declare function GetPhotoModeExposure(): number;

/**
   * _GET_PROXY_INTERIOR_INDEX
   * Returns proxyInteriorIndex
   *
   * @param {number} interiorId
   * @return {number}
   */
declare function GetProxyInteriorIndex(interiorId: number): number;

/**
   * _IS_PROXY_INTERIOR_INDEX_ARTIFICIAL_LIGHTS_ENABLED
   *
   * @param {number} proxyInteriorIndex
   * @return {boolean}
   */
declare function IsProxyInteriorIndexArtificialLightsEnabled(proxyInteriorIndex: number): boolean;

/**
   * _IS_STATIC_VEG_MODIFIER_ENABLED
   *
   * @param {number} p0
   * @return {boolean}
   */
declare function IsStaticVegModifierEnabled(p0: Hash): boolean;

/**
   * _IS_TEXTURE_IN_DICT
   *
   * @param {number} txdHash
   * @param {number} dict
   * @return {boolean}
   */
declare function IsTextureInDict(txdHash: Hash, dict: Hash): boolean;

/**
   * _IS_TRACKED_POINT_VALID
   *
   * @param {number} point
   * @return {boolean}
   */
declare function IsTrackedPointValid(point: number): boolean;

/**
   * _PEDSHOT_FINISH_CLEANUP_DATA
   *
  
   * @return {void}
   */
declare function PedshotFinishCleanupData(): void;

/**
   * _PEDSHOT_GENERATE_PERSONA_PHOTO
   *
   * @param {string | number} texture
   * @param {number} ped
   * @param {number} playerSlot
   * @return {boolean}
   */
declare function PedshotGeneratePersonaPhoto(texture: string | number, ped: Ped, playerSlot: number): boolean;

/**
   * _PEDSHOT_INIT_CLEANUP_DATA
   *
  
   * @return {void}
   */
declare function PedshotInitCleanupData(): void;

/**
   * _PEDSHOT_PREVIOUS_PERSONA_PHOTO_DATA_CLEANUP
   *
  
   * @return {void}
   */
declare function PedshotPreviousPersonaPhotoDataCleanup(): void;

/**
   * _PEDSHOT_SET_PERSONA_PHOTO_TYPE
   *
   * @param {number} personaPhotoLocalCacheType
   * @return {void}
   */
declare function PedshotSetPersonaPhotoType(personaPhotoLocalCacheType: number): void;

/**
   * _REMOVE_ENTITY_FROM_ENTITY_MASK
   *
   * @param {number} entity
   * @return {void}
   */
declare function RemoveEntityFromEntityMask(entity: Entity): void;

/**
   * _RESET_ENTITY_AURA
   * Used for script function RPG_GLOBAL_STATS__PRIVATE__DEACTIVATE_STAT_FLAG - Inspiration Aura unequip
   *
  
   * @return {void}
   */
declare function ResetEntityAura(): void;

/**
   * _SET_CLOUD_HEIGHT
   *
   * @param {number} height
   * @return {void}
   */
declare function SetCloudHeight(height: number): void;

/**
   * _SET_CLOUD_LAYER
   *
   * @param {number} x
   * @param {number} y
   * @param {number} p2
   * @return {void}
   */
declare function SetCloudLayer(x: number, y: number, p2: number): void;

/**
   * _SET_CLOUD_NOISE
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function SetCloudNoise(x: number, y: number, z: number): void;

/**
   * _SET_CLOUD_POSITION
   * Only used in finale2, smuggler2, winter4
   * _SET_CLOUD_A* - _SET_CLOUD_H*
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {void}
   */
declare function SetCloudPosition(x: number, y: number, z: number): void;

/**
   * _SET_DISTRICT_PHOTO_TAKEN_STAT
   *
   * @param {string | number} p0
   * @return {void}
   */
declare function SetDistrictPhotoTakenStat(p0: string | number): void;

/**
   * _SET_ENTITY_AURA
   * Used for script function RPG_GLOBAL_STATS__PRIVATE__ACTIVATE_STAT_FLAG - Quite and Inspiration Aura equip
   * Params: 0f, 2f, 2f
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function SetEntityAura(p0: number, p1: number, p2: number): void;

/**
   * _SET_ENTITY_MASK_LAYERS
   *
   * @param {number} entity
   * @return {[number, number, number, number]}
   */
declare function SetEntityMaskLayers(entity: Entity): [number, number, number, number];

/**
   * _SET_ENTITY_RENDER_GUARMA_SHIP
   * Only used in guama1 R* SP Script while spawning the ship
   * _SET_ENTITY_QUATERNION_* - SET_ENTITY_RENDER_*
   *
   * @param {number} vehicle
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetEntityRenderGuarmaShip(vehicle: Vehicle, toggle: boolean): void;

/**
   * _SET_LIGHTS_COLOR_FOR_ENTITY
   * https://gfycat.com/meagerfaireyra
   *
   * @param {number} entity
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @return {void}
   */
declare function SetLightsColorForEntity(entity: Entity, red: number, green: number, blue: number): void;

/**
   * _SET_LIGHTS_INTENSITY_FOR_ENTITY
   *
   * @param {number} entity
   * @param {number} intensity
   * @return {void}
   */
declare function SetLightsIntensityForEntity(entity: Entity, intensity: number): void;

/**
   * _SET_LIGHTS_TYPE_FOR_ENTITY
   * type must be less than or equal to 20
   *
   * @param {number} entity
   * @param {number} type
   * @return {void}
   */
declare function SetLightsTypeForEntity(entity: Entity, type: number): void;

/**
   * _SET_PARTICLE_FX_LOOPED_UPDATE_DISTANT_SMOKE
   * _SET_PARTICLE_FX_LOOPED_FA* - _SET_PARTICLE_FX_LOOPED_OF*
   *
   * @param {number} ptfxHandle
   * @param {number} scalar
   * @return {void}
   */
declare function SetParticleFxLoopedUpdateDistantSmoke(ptfxHandle: number, scalar: number): void;

/**
   * _SET_PARTICLE_FX_NON_LOOPED_EMITTER_SCALE
   *
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @return {void}
   */
declare function SetParticleFxNonLoopedEmitterScale(p0: number, p1: number, p2: number): void;

/**
   * _SET_PEARLESCENT_FX_ENABLED
   * Enables/disables a kind of 'shiny' effect on metals.
   *
   * @param {number} object
   * @param {boolean} toggle
   * @return {void}
   */
declare function SetPearlescentFxEnabled(object: number, toggle: boolean): void;

/**
   * _SET_PHOTO_IN_PHOTOMODE_STAT
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function SetPhotoInPhotomodeStat(p0: boolean): void;

/**
   * _SET_PHOTO_OVERLAY_EFFECT_STAT
   *
   * @param {number} p0
   * @return {void}
   */
declare function SetPhotoOverlayEffectStat(p0: number): void;

/**
   * _SET_PHOTO_SELF_STAT
   *
   * @param {boolean} p0
   * @return {void}
   */
declare function SetPhotoSelfStat(p0: boolean): void;

/**
   * _SET_PHOTO_STUDIO_STAT
   *
   * @param {number} p0
   * @return {void}
   */
declare function SetPhotoStudioStat(p0: number): void;

/**
   * _SET_PLAYER_APPEAR_IN_PHOTO
   *
   * @param {number} player
   * @return {void}
   */
declare function SetPlayerAppearInPhoto(player: Player): void;

/**
   * _SET_POSSE_ID_FOR_PHOTO
   *
   * @param {any} posseId
   * @return {void}
   */
declare function SetPosseIdForPhoto(posseId: any): void;

/**
   * _SET_PROXY_INTERIOR_INDEX_ARTIFICIAL_LIGHTS_STATE
   * state: false disables artificial interior light sources for specific proxyInteriorIndex
   *
   * @param {number} proxyInteriorIndex
   * @param {boolean} state
   * @return {void}
   */
declare function SetProxyInteriorIndexArtificialLightsState(proxyInteriorIndex: number, state: boolean): void;

/**
   * _SET_REGION_PHOTO_TAKEN_STAT
   *
   * @param {string | number} p0
   * @return {void}
   */
declare function SetRegionPhotoTakenStat(p0: string | number): void;

/**
   * _SET_SNIPER_GLINTS_ENABLED
   *
   * @param {boolean} enabled
   * @return {void}
   */
declare function SetSniperGlintsEnabled(enabled: boolean): void;

/**
   * _SET_SNOW_COVERAGE_TYPE
   * enum class eSnowCoverageType
   * {
   *   Primary,
   *   Secondary,
   *   Xmas,
   *   XmasSecondary // since b1232
   * };
   *
   * @param {number} type
   * @return {void}
   */
declare function SetSnowCoverageType(type: number): void;

/**
   * _SET_STATE_PHOTO_TAKEN_STAT
   *
   * @param {string | number} p0
   * @return {void}
   */
declare function SetStatePhotoTakenStat(p0: string | number): void;

/**
   * _START_PARTICLE_FX_NON_LOOPED_ON_PED_BONE_2
   *
   * @param {string | number} effectName
   * @param {number} ped
   * @param {number} offsetX
   * @param {number} offsetY
   * @param {number} offsetZ
   * @param {number} rotX
   * @param {number} rotY
   * @param {number} rotZ
   * @param {number} boneIndex
   * @param {number} scale
   * @param {boolean} axisX
   * @param {boolean} axisY
   * @param {boolean} axisZ
   * @return {boolean}
   */
declare function StartParticleFxNonLoopedOnPedBone_2(effectName: string | number, ped: Ped, offsetX: number, offsetY: number, offsetZ: number, rotX: number, rotY: number, rotZ: number, boneIndex: number, scale: number, axisX: boolean, axisY: boolean, axisZ: boolean): boolean;