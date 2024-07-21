/**
 * ADD_CAM_SPLINE_NODE
 * p7 (length) determines the length of the spline, affects camera path and duration of transition between previous node and this one
 * 
 * p8 big values ~100 will slow down the camera movement before reaching this node
 * 
 * p9 != 0 seems to override the rotation/pitch (bool?)
 *
 * @param {number} camera
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} xRot
 * @param {number} yRot
 * @param {number} zRot
 * @param {number} length
 * @param {number} p8
 * @param {number} p9
 * @return {void}
 */
declare function AddCamSplineNode(camera: Cam, x: number, y: number, z: number, xRot: number, yRot: number, zRot: number, length: number, p8: number, p9: number): void;

/**
 * ALLOW_MOTION_BLUR_DECAY
 *
 * @param {number} cam
 * @param {boolean} p1
 * @return {void}
 */
declare function AllowMotionBlurDecay(cam: Cam, p1: boolean): void;

/**
 * ATTACH_CAM_TO_ENTITY
 * Last param determines if its relative to the Entity
 *
 * @param {number} cam
 * @param {number} entity
 * @param {number} xOffset
 * @param {number} yOffset
 * @param {number} zOffset
 * @param {boolean} isRelative
 * @return {void}
 */
declare function AttachCamToEntity(cam: Cam, entity: Entity, xOffset: number, yOffset: number, zOffset: number, isRelative: boolean): void;

/**
 * ATTACH_CAM_TO_PED_BONE
 * boneIndex: https://github.com/femga/rdr3_discoveries/tree/master/boneNames
 *
 * @param {number} cam
 * @param {number} ped
 * @param {number} boneIndex
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {boolean} heading
 * @return {void}
 */
declare function AttachCamToPedBone(cam: Cam, ped: Ped, boneIndex: number, x: number, y: number, z: number, heading: boolean): void;

/**
 * CINEMATIC_LOCATION_OVERRIDE_TARGET_ENTITY_THIS_UPDATE
 * Only used in R* Script fm_mission_controller
 *
 * @param {string | number} name
 * @param {number} entity
 * @return {void}
 */
declare function CinematicLocationOverrideTargetEntityThisUpdate(name: string | number, entity: Entity): void;

/**
 * CINEMATIC_LOCATION_STOP_SCRIPTED_SHOT_EVENT
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function CinematicLocationStopScriptedShotEvent(p0: any, p1: any, p2: any): void;

/**
 * CINEMATIC_LOCATION_TRIGGER_SCRIPTED_SHOT_EVENT
 *
 * @param {string | number} dictionary
 * @param {string | number} shotName
 * @param {string | number} cameraName
 * @param {any} p3
 * @return {void}
 */
declare function CinematicLocationTriggerScriptedShotEvent(dictionary: string | number, shotName: string | number, cameraName: string | number, p3: any): void;

/**
 * CREATE_CAM
 *
 * @param {string | number} camName
 * @param {boolean} p1
 * @return {number}
 */
declare function CreateCam(camName: string | number, p1: boolean): Cam;

/**
 * CREATE_CAMERA
 *
 * @param {number} camHash
 * @param {boolean} p1
 * @return {number}
 */
declare function CreateCamera(camHash: Hash, p1: boolean): Cam;

/**
 * CREATE_CAMERA_WITH_PARAMS
 *
 * @param {number} camHash
 * @param {number} posX
 * @param {number} posY
 * @param {number} posZ
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @param {number} fov
 * @param {boolean} p8
 * @param {any} p9
 * @return {number}
 */
declare function CreateCameraWithParams(camHash: Hash, posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, fov: number, p8: boolean, p9: any): Cam;

/**
 * CREATE_CAM_WITH_PARAMS
 *
 * @param {string | number} camName
 * @param {number} posX
 * @param {number} posY
 * @param {number} posZ
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @param {number} fov
 * @param {boolean} p8
 * @param {number} p9
 * @return {number}
 */
declare function CreateCamWithParams(camName: string | number, posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, fov: number, p8: boolean, p9: number): Cam;

/**
 * DESTROY_ALL_CAMS
 * BOOL param indicates whether the cam should be destroyed if it belongs to the calling script.
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function DestroyAllCams(p0: boolean): void;

/**
 * DESTROY_CAM
 * BOOL param indicates whether the cam should be destroyed if it belongs to the calling script.
 *
 * @param {number} cam
 * @param {boolean} p1
 * @return {void}
 */
declare function DestroyCam(cam: Cam, p1: boolean): void;

/**
 * DETACH_CAM
 *
 * @param {number} cam
 * @return {void}
 */
declare function DetachCam(cam: Cam): void;

/**
 * DISABLE_CAM_COLLISION_FOR_OBJECT
 *
 * @param {number} entity
 * @return {void}
 */
declare function DisableCamCollisionForObject(entity: Entity): void;

/**
 * DISABLE_CINEMATIC_BONNET_CAMERA_THIS_UPDATE
 * Old name: _DISABLE_VEHICLE_FIRST_PERSON_CAM_THIS_FRAME
 *

 * @return {void}
 */
declare function DisableCinematicBonnetCameraThisUpdate(): void;

/**
 * DISABLE_FIRST_PERSON_FLASH_EFFECT_THIS_UPDATE
 * nullsub, doesn't do anything
 *

 * @return {void}
 */
declare function DisableFirstPersonFlashEffectThisUpdate(): void;

/**
 * DISABLE_ON_FOOT_FIRST_PERSON_VIEW_THIS_UPDATE
 * Old name: _DISABLE_FIRST_PERSON_CAM_THIS_FRAME
 *

 * @return {void}
 */
declare function DisableOnFootFirstPersonViewThisUpdate(): void;

/**
 * DOES_CAM_EXIST
 * Returns whether or not the passed camera handle exists.
 *
 * @param {number} cam
 * @return {boolean}
 */
declare function DoesCamExist(cam: Cam): boolean;

/**
 * DO_SCREEN_FADE_IN
 * Fades the screen in.
 * 
 * duration: The time the fade should take, in milliseconds.
 *
 * @param {number} duration
 * @return {void}
 */
declare function DoScreenFadeIn(duration: number): void;

/**
 * DO_SCREEN_FADE_OUT
 * Fades the screen out.
 * 
 * duration: The time the fade should take, in milliseconds.
 *
 * @param {number} duration
 * @return {void}
 */
declare function DoScreenFadeOut(duration: number): void;

/**
 * FORCE_CINEMATIC_RENDERING_THIS_UPDATE
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function ForceCinematicRenderingThisUpdate(p0: boolean): void;

/**
 * GET_CAM_COORD
 *
 * @param {number} cam
 * @return {Vector3}
 */
declare function GetCamCoord(cam: Cam): Vector3;

/**
 * GET_CAM_FOV
 *
 * @param {number} cam
 * @return {number}
 */
declare function GetCamFov(cam: Cam): number;

/**
 * GET_CAM_ROT
 * rotationOrder: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eEulerRotationOrder
 *
 * @param {number} cam
 * @param {number} rotationOrder
 * @return {Vector3}
 */
declare function GetCamRot(cam: Cam, rotationOrder: number): Vector3;

/**
 * GET_CAM_SPLINE_PHASE
 * Can use this with SET_CAM_SPLINE_PHASE to set the float it this native returns.
 * 
 * (returns 1.0f when no nodes has been added, reached end of non existing spline)
 *
 * @param {number} cam
 * @return {number}
 */
declare function GetCamSplinePhase(cam: Cam): number;

/**
 * GET_FINAL_RENDERED_CAM_COORD
 *

 * @return {Vector3}
 */
declare function GetFinalRenderedCamCoord(): Vector3;

/**
 * GET_FINAL_RENDERED_CAM_FOV
 *

 * @return {number}
 */
declare function GetFinalRenderedCamFov(): number;

/**
 * GET_FINAL_RENDERED_CAM_ROT
 *
 * @param {number} rotationOrder
 * @return {Vector3}
 */
declare function GetFinalRenderedCamRot(rotationOrder: number): Vector3;

/**
 * GET_FIRST_PERSON_AIM_CAM_ZOOM_FACTOR
 *

 * @return {number}
 */
declare function GetFirstPersonAimCamZoomFactor(): number;

/**
 * GET_GAMEPLAY_CAM_COORD
 *

 * @return {Vector3}
 */
declare function GetGameplayCamCoord(): Vector3;

/**
 * GET_GAMEPLAY_CAM_FOV
 *

 * @return {number}
 */
declare function GetGameplayCamFov(): number;

/**
 * GET_GAMEPLAY_CAM_RELATIVE_HEADING
 *

 * @return {number}
 */
declare function GetGameplayCamRelativeHeading(): number;

/**
 * GET_GAMEPLAY_CAM_RELATIVE_PITCH
 *

 * @return {number}
 */
declare function GetGameplayCamRelativePitch(): number;

/**
 * GET_GAMEPLAY_CAM_ROT
 *
 * @param {number} rotationOrder
 * @return {Vector3}
 */
declare function GetGameplayCamRot(rotationOrder: number): Vector3;

/**
 * GET_LETTER_BOX_RATIO
 * More info: see HAS_LETTER_BOX
 *

 * @return {number}
 */
declare function GetLetterBoxRatio(): number;

/**
 * GET_RENDERING_CAM
 *

 * @return {number}
 */
declare function GetRenderingCam(): Cam;

/**
 * HAS_LETTER_BOX
 * More info: https://en.wikipedia.org/wiki/Letterboxing_(filming)
 *

 * @return {boolean}
 */
declare function HasLetterBox(): boolean;

/**
 * INVALIDATE_CINEMATIC_VEHICLE_IDLE_MODE
 * Old name: _INVALIDATE_VEHICLE_IDLE_CAM
 *

 * @return {void}
 */
declare function InvalidateCinematicVehicleIdleMode(): void;

/**
 * IS_AIM_CAM_ACTIVE
 *

 * @return {boolean}
 */
declare function IsAimCamActive(): boolean;

/**
 * IS_CAM_ACTIVE
 * Returns whether or not the passed camera handle is active.
 *
 * @param {number} cam
 * @return {boolean}
 */
declare function IsCamActive(cam: Cam): boolean;

/**
 * IS_CAM_INTERPOLATING
 *
 * @param {number} cam
 * @return {boolean}
 */
declare function IsCamInterpolating(cam: Cam): boolean;

/**
 * IS_CAM_RENDERING
 *
 * @param {number} cam
 * @return {boolean}
 */
declare function IsCamRendering(cam: Cam): boolean;

/**
 * IS_CAM_SHAKING
 *
 * @param {number} cam
 * @return {boolean}
 */
declare function IsCamShaking(cam: Cam): boolean;

/**
 * IS_CINEMATIC_CAM_RENDERING
 *

 * @return {boolean}
 */
declare function IsCinematicCamRendering(): boolean;

/**
 * IS_DEATH_FAIL_CAMERA_RUNNING
 *

 * @return {boolean}
 */
declare function IsDeathFailCameraRunning(): boolean;

/**
 * IS_FIRST_PERSON_AIM_CAM_ACTIVE
 *

 * @return {boolean}
 */
declare function IsFirstPersonAimCamActive(): boolean;

/**
 * IS_FIRST_PERSON_CAMERA_ACTIVE
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {boolean}
 */
declare function IsFirstPersonCameraActive(p0: any, p1: any, p2: any): boolean;

/**
 * IS_FOLLOW_VEHICLE_CAM_ACTIVE
 *

 * @return {boolean}
 */
declare function IsFollowVehicleCamActive(): boolean;

/**
 * IS_GAMEPLAY_CAM_LOOKING_BEHIND
 *

 * @return {boolean}
 */
declare function IsGameplayCamLookingBehind(): boolean;

/**
 * IS_GAMEPLAY_CAM_RENDERING
 *

 * @return {boolean}
 */
declare function IsGameplayCamRendering(): boolean;

/**
 * IS_GAMEPLAY_CAM_SHAKING
 *

 * @return {boolean}
 */
declare function IsGameplayCamShaking(): boolean;

/**
 * IS_GAMEPLAY_HINT_ACTIVE
 *

 * @return {boolean}
 */
declare function IsGameplayHintActive(): boolean;

/**
 * IS_INTERPOLATING_FROM_SCRIPT_CAMS
 *

 * @return {boolean}
 */
declare function IsInterpolatingFromScriptCams(): boolean;

/**
 * IS_INTERPOLATING_TO_SCRIPT_CAMS
 *

 * @return {boolean}
 */
declare function IsInterpolatingToScriptCams(): boolean;

/**
 * IS_SCREEN_FADED_IN
 *

 * @return {boolean}
 */
declare function IsScreenFadedIn(): boolean;

/**
 * IS_SCREEN_FADED_OUT
 *

 * @return {boolean}
 */
declare function IsScreenFadedOut(): boolean;

/**
 * IS_SCREEN_FADING_IN
 *

 * @return {boolean}
 */
declare function IsScreenFadingIn(): boolean;

/**
 * IS_SCREEN_FADING_OUT
 *

 * @return {boolean}
 */
declare function IsScreenFadingOut(): boolean;

/**
 * IS_SPHERE_VISIBLE
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} radius
 * @return {boolean}
 */
declare function IsSphereVisible(x: number, y: number, z: number, radius: number): boolean;

/**
 * PLAY_CAM_ANIM
 *
 * @param {number} cam
 * @param {string | number} animName
 * @param {string | number} animDictionary
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} xRot
 * @param {number} yRot
 * @param {number} zRot
 * @param {number} animFlags
 * @param {number} rotOrder
 * @return {boolean}
 */
declare function PlayCamAnim(cam: Cam, animName: string | number, animDictionary: string | number, x: number, y: number, z: number, xRot: number, yRot: number, zRot: number, animFlags: number, rotOrder: number): boolean;

/**
 * POINT_CAM_AT_COORD
 *
 * @param {number} cam
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {void}
 */
declare function PointCamAtCoord(cam: Cam, x: number, y: number, z: number): void;

/**
 * POINT_CAM_AT_ENTITY
 *
 * @param {number} cam
 * @param {number} entity
 * @param {number} p2
 * @param {number} p3
 * @param {number} p4
 * @param {boolean} p5
 * @return {void}
 */
declare function PointCamAtEntity(cam: Cam, entity: Entity, p2: number, p3: number, p4: number, p5: boolean): void;

/**
 * RENDER_SCRIPT_CAMS
 * ease - smooth transition between the camera's positions
 * easeTime - Time in milliseconds for the transition to happen
 * 
 * If you have created a script (rendering) camera, and want to go back to the 
 * character (gameplay) camera, call this native with render set to FALSE.
 * Setting ease to TRUE will smooth the transition.
 *
 * @param {boolean} render
 * @param {boolean} ease
 * @param {number} easeTime
 * @param {boolean} p3
 * @param {boolean} p4
 * @param {number} p5
 * @return {void}
 */
declare function RenderScriptCams(render: boolean, ease: boolean, easeTime: number, p3: boolean, p4: boolean, p5: number): void;

/**
 * SET_CAM_ACTIVE
 * Set camera as active/inactive.
 *
 * @param {number} cam
 * @param {boolean} active
 * @return {void}
 */
declare function SetCamActive(cam: Cam, active: boolean): void;

/**
 * SET_CAM_ACTIVE_WITH_INTERP
 *
 * @param {number} camTo
 * @param {number} camFrom
 * @param {number} duration
 * @param {number} easeLocation
 * @param {number} easeRotation
 * @return {void}
 */
declare function SetCamActiveWithInterp(camTo: Cam, camFrom: Cam, duration: number, easeLocation: number, easeRotation: number): void;

/**
 * SET_CAM_AFFECTS_AIMING
 * Allows you to aim and shoot at the direction the camera is facing.
 *
 * @param {number} cam
 * @param {boolean} toggle
 * @return {void}
 */
declare function SetCamAffectsAiming(cam: Cam, toggle: boolean): void;

/**
 * SET_CAM_CONTROLS_MINI_MAP_HEADING
 *
 * @param {number} cam
 * @param {boolean} p1
 * @return {void}
 */
declare function SetCamControlsMiniMapHeading(cam: Cam, p1: boolean): void;

/**
 * SET_CAM_COORD
 * Sets the position of the cam.
 *
 * @param {number} cam
 * @param {number} posX
 * @param {number} posY
 * @param {number} posZ
 * @return {void}
 */
declare function SetCamCoord(cam: Cam, posX: number, posY: number, posZ: number): void;

/**
 * SET_CAM_FAR_CLIP
 *
 * @param {number} cam
 * @param {number} farClip
 * @return {void}
 */
declare function SetCamFarClip(cam: Cam, farClip: number): void;

/**
 * SET_CAM_FOV
 * Sets the field of view of the cam.
 * 
 * Min: 1.0f
 * Max: 130.0f
 *
 * @param {number} cam
 * @param {number} fieldOfView
 * @return {void}
 */
declare function SetCamFov(cam: Cam, fieldOfView: number): void;

/**
 * SET_CAM_MOTION_BLUR_STRENGTH
 *
 * @param {number} cam
 * @param {number} strength
 * @return {void}
 */
declare function SetCamMotionBlurStrength(cam: Cam, strength: number): void;

/**
 * SET_CAM_NEAR_CLIP
 *
 * @param {number} cam
 * @param {number} nearClip
 * @return {void}
 */
declare function SetCamNearClip(cam: Cam, nearClip: number): void;

/**
 * SET_CAM_PARAMS
 *
 * @param {number} cam
 * @param {number} posX
 * @param {number} posY
 * @param {number} posZ
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @param {number} fieldOfView
 * @param {any} p8
 * @param {number} p9
 * @param {number} p10
 * @param {number} p11
 * @param {any} p12
 * @param {any} p13
 * @return {void}
 */
declare function SetCamParams(cam: Cam, posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, fieldOfView: number, p8: any, p9: number, p10: number, p11: number, p12: any, p13: any): void;

/**
 * SET_CAM_ROT
 * Sets the rotation of the cam.
 *
 * @param {number} cam
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @param {number} rotationOrder
 * @return {void}
 */
declare function SetCamRot(cam: Cam, rotX: number, rotY: number, rotZ: number, rotationOrder: number): void;

/**
 * SET_CAM_SPLINE_DURATION
 *
 * @param {number} cam
 * @param {number} timeDuration
 * @return {void}
 */
declare function SetCamSplineDuration(cam: Cam, timeDuration: number): void;

/**
 * SET_CAM_SPLINE_PHASE
 *
 * @param {number} cam
 * @param {number} p1
 * @return {void}
 */
declare function SetCamSplinePhase(cam: Cam, p1: number): void;

/**
 * SET_CAM_SPLINE_SMOOTHING_STYLE
 *
 * @param {number} cam
 * @param {number} smoothingStyle
 * @return {void}
 */
declare function SetCamSplineSmoothingStyle(cam: Cam, smoothingStyle: number): void;

/**
 * SET_CINEMATIC_BUTTON_ACTIVE
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function SetCinematicButtonActive(p0: boolean): void;

/**
 * SET_CINEMATIC_MODE_ACTIVE
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function SetCinematicModeActive(p0: boolean): void;

/**
 * SET_FIRST_PERSON_AIM_CAM_RELATIVE_HEADING_LIMITS_THIS_UPDATE
 *
 * @param {number} p0
 * @param {number} p1
 * @return {void}
 */
declare function SetFirstPersonAimCamRelativeHeadingLimitsThisUpdate(p0: number, p1: number): void;

/**
 * SET_FIRST_PERSON_AIM_CAM_RELATIVE_PITCH_LIMITS_THIS_UPDATE
 * Old name: _SET_FIRST_PERSON_CAM_PITCH_RANGE
 *
 * @param {number} p0
 * @param {number} p1
 * @return {void}
 */
declare function SetFirstPersonAimCamRelativePitchLimitsThisUpdate(p0: number, p1: number): void;

/**
 * SET_GAMEPLAY_CAM_FOLLOW_PED_THIS_UPDATE
 * Forces gameplay cam to specified ped as if you were the ped or spectating it
 *
 * @param {number} ped
 * @return {void}
 */
declare function SetGameplayCamFollowPedThisUpdate(ped: Ped): void;

/**
 * SET_GAMEPLAY_CAM_IGNORE_ENTITY_COLLISION_THIS_UPDATE
 * Old name: _DISABLE_CAM_COLLISION_FOR_ENTITY
 *
 * @param {number} entity
 * @return {void}
 */
declare function SetGameplayCamIgnoreEntityCollisionThisUpdate(entity: Entity): void;

/**
 * SET_GAMEPLAY_CAM_MAX_MOTION_BLUR_STRENGTH_THIS_UPDATE
 *
 * @param {number} p0
 * @return {void}
 */
declare function SetGameplayCamMaxMotionBlurStrengthThisUpdate(p0: number): void;

/**
 * SET_GAMEPLAY_CAM_RELATIVE_HEADING
 * Sets the camera position relative to heading in float from -360 to +360.
 * 
 * Heading is always 0 in aiming camera.
 *
 * @param {number} heading
 * @param {number} p1
 * @return {void}
 */
declare function SetGameplayCamRelativeHeading(heading: number, p1: number): void;

/**
 * SET_GAMEPLAY_CAM_RELATIVE_PITCH
 * Sets the camera pitch.
 * 
 * Parameters:
 * x = pitches the camera on the x axis.
 * Value2 = always seems to be hex 0x3F800000 (1.000000 float).
 *
 * @param {number} x
 * @param {number} value2
 * @return {void}
 */
declare function SetGameplayCamRelativePitch(x: number, Value2: number): void;

/**
 * SET_GAMEPLAY_CAM_SHAKE_AMPLITUDE
 * Sets the amplitude for the gameplay (i.e. 3rd or 1st) camera to shake.
 *
 * @param {number} amplitude
 * @return {void}
 */
declare function SetGameplayCamShakeAmplitude(amplitude: number): void;

/**
 * SET_GAMEPLAY_COORD_HINT
 * Hash used in finale1.ysc: 1726668277
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} duration
 * @param {number} blendOutDuration
 * @param {number} blendInDuration
 * @param {number} p6
 * @return {void}
 */
declare function SetGameplayCoordHint(x: number, y: number, z: number, duration: number, blendOutDuration: number, blendInDuration: number, p6: Hash): void;

/**
 * SET_GAMEPLAY_ENTITY_HINT
 * p6 & p7 - possibly length or time
 *
 * @param {number} entity
 * @param {number} xOffset
 * @param {number} yOffset
 * @param {number} zOffset
 * @param {boolean} p4
 * @param {number} p5
 * @param {number} p6
 * @param {number} p7
 * @param {any} p8
 * @return {void}
 */
declare function SetGameplayEntityHint(entity: Entity, xOffset: number, yOffset: number, zOffset: number, p4: boolean, p5: number, p6: number, p7: number, p8: any): void;

/**
 * SET_GAMEPLAY_HINT_BASE_ORBIT_PITCH_OFFSET
 *
 * @param {number} p0
 * @return {void}
 */
declare function SetGameplayHintBaseOrbitPitchOffset(p0: number): void;

/**
 * SET_GAMEPLAY_HINT_CAMERA_RELATIVE_SIDE_OFFSET
 * Old name: _SET_GAMEPLAY_HINT_ANIM_OFFSETX
 *
 * @param {number} p0
 * @return {void}
 */
declare function SetGameplayHintCameraRelativeSideOffset(p0: number): void;

/**
 * SET_GAMEPLAY_HINT_CAMERA_RELATIVE_VERTICAL_OFFSET
 * Old name: _SET_GAMEPLAY_HINT_ANIM_OFFSETY
 *
 * @param {number} p0
 * @return {void}
 */
declare function SetGameplayHintCameraRelativeVerticalOffset(p0: number): void;

/**
 * SET_GAMEPLAY_HINT_FOLLOW_DISTANCE_SCALAR
 *
 * @param {number} p0
 * @return {void}
 */
declare function SetGameplayHintFollowDistanceScalar(p0: number): void;

/**
 * SET_GAMEPLAY_HINT_FOV
 *
 * @param {number} fov
 * @return {void}
 */
declare function SetGameplayHintFov(FOV: number): void;

/**
 * SET_GAMEPLAY_OBJECT_HINT
 *
 * @param {any} p0
 * @param {number} p1
 * @param {number} p2
 * @param {number} p3
 * @param {boolean} p4
 * @param {any} p5
 * @param {any} p6
 * @param {any} p7
 * @return {void}
 */
declare function SetGameplayObjectHint(p0: any, p1: number, p2: number, p3: number, p4: boolean, p5: any, p6: any, p7: any): void;

/**
 * SET_GAMEPLAY_PED_HINT
 *
 * @param {number} p0
 * @param {number} x1
 * @param {number} y1
 * @param {number} z1
 * @param {boolean} p4
 * @param {any} p5
 * @param {any} p6
 * @param {any} p7
 * @return {void}
 */
declare function SetGameplayPedHint(p0: Ped, x1: number, y1: number, z1: number, p4: boolean, p5: any, p6: any, p7: any): void;

/**
 * SET_GAMEPLAY_VEHICLE_HINT
 *
 * @param {any} p0
 * @param {number} p1
 * @param {number} p2
 * @param {number} p3
 * @param {boolean} p4
 * @param {any} p5
 * @param {any} p6
 * @param {any} p7
 * @return {void}
 */
declare function SetGameplayVehicleHint(p0: any, p1: number, p2: number, p3: number, p4: boolean, p5: any, p6: any, p7: any): void;

/**
 * SET_IN_VEHICLE_CAM_STATE_THIS_UPDATE
 * Forces gameplay cam to specified vehicle as if you were in it
 *
 * @param {number} vehicle
 * @param {number} p1
 * @return {void}
 */
declare function SetInVehicleCamStateThisUpdate(vehicle: Vehicle, p1: number): void;

/**
 * SET_SCRIPTED_CAMERA_IS_FIRST_PERSON_THIS_FRAME
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function SetScriptedCameraIsFirstPersonThisFrame(p0: boolean): void;

/**
 * SET_THIRD_PERSON_CAM_ORBIT_DISTANCE_LIMITS_THIS_UPDATE
 * Old name: _ANIMATE_GAMEPLAY_CAM_ZOOM
 *
 * @param {number} p0
 * @param {number} distance
 * @return {void}
 */
declare function SetThirdPersonCamOrbitDistanceLimitsThisUpdate(p0: number, distance: number): void;

/**
 * SET_THIRD_PERSON_CAM_RELATIVE_HEADING_LIMITS_THIS_UPDATE
 * minimum: Degrees between -180f and 180f.
 * maximum: Degrees between -180f and 180f.
 * 
 * Clamps the gameplay camera's current yaw.
 * 
 * Eg. _CLAMP_GAMEPLAY_CAM_YAW(0.0f, 0.0f) will set the horizontal angle directly behind the player.
 * 
 * Old name: _CLAMP_GAMEPLAY_CAM_YAW
 *
 * @param {number} minimum
 * @param {number} maximum
 * @return {void}
 */
declare function SetThirdPersonCamRelativeHeadingLimitsThisUpdate(minimum: number, maximum: number): void;

/**
 * SET_THIRD_PERSON_CAM_RELATIVE_PITCH_LIMITS_THIS_UPDATE
 * minimum: Degrees between -90f and 90f.
 * maximum: Degrees between -90f and 90f.
 * 
 * Clamps the gameplay camera's current pitch.
 * 
 * Eg. _CLAMP_GAMEPLAY_CAM_PITCH(0.0f, 0.0f) will set the vertical angle directly behind the player.
 * 
 * Old name: _CLAMP_GAMEPLAY_CAM_PITCH
 *
 * @param {number} minimum
 * @param {number} maximum
 * @return {void}
 */
declare function SetThirdPersonCamRelativePitchLimitsThisUpdate(minimum: number, maximum: number): void;

/**
 * SET_WIDESCREEN_BORDERS
 *
 * @param {boolean} p0
 * @param {number} p1
 * @return {void}
 */
declare function SetWidescreenBorders(p0: boolean, p1: number): void;

/**
 * SHAKE_CAM
 *
 * @param {number} cam
 * @param {string | number} type
 * @param {number} amplitude
 * @return {void}
 */
declare function ShakeCam(cam: Cam, type: string | number, amplitude: number): void;

/**
 * SHAKE_GAMEPLAY_CAM
 *
 * @param {string | number} shakeName
 * @param {number} intensity
 * @return {void}
 */
declare function ShakeGameplayCam(shakeName: string | number, intensity: number): void;

/**
 * STOP_CAM_POINTING
 *
 * @param {number} cam
 * @return {void}
 */
declare function StopCamPointing(cam: Cam): void;

/**
 * STOP_CAM_SHAKING
 *
 * @param {number} cam
 * @param {boolean} p1
 * @return {void}
 */
declare function StopCamShaking(cam: Cam, p1: boolean): void;

/**
 * STOP_CODE_GAMEPLAY_HINT
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function StopCodeGameplayHint(p0: boolean): void;

/**
 * STOP_GAMEPLAY_CAM_SHAKING
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function StopGameplayCamShaking(p0: boolean): void;

/**
 * STOP_GAMEPLAY_HINT
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function StopGameplayHint(p0: boolean): void;

/**
 * STOP_RENDERING_SCRIPT_CAMS_USING_CATCH_UP
 * This native makes the gameplay camera zoom into first person/third person with a special effect.
 * blendBackSmoothingType: https://github.com/Halen84/RDR3-Native-Flags-And-Enums/tree/main/eBlendBackSmoothing
 *
 * @param {boolean} render
 * @param {number} distance
 * @param {number} blendBackSmoothingType
 * @param {boolean} p3
 * @param {boolean} p4
 * @param {boolean} p5
 * @return {void}
 */
declare function StopRenderingScriptCamsUsingCatchUp(render: boolean, distance: number, blendBackSmoothingType: number, p3: boolean, p4: boolean, p5: boolean): void;

/**
 * _0x0060B31968E60E41
 * shakeNames in script_rel: CORRECTOR_SHAKE, MINIGAME_BOUNTY_SHAKE, POV_DRUNK_SHAKE, DRUNK_SHAKE, MINIGAME_TRAIN_SHAKE
 * _IS_GAMEPLAY_*
 *
 * @param {string | number} shakeName
 * @return {boolean}
 */
declare function N_0x0060B31968E60E41(shakeName: string | number): boolean;

/**
 * _0x04084490CC302CFB
 *

 * @return {void}
 */
declare function N_0x04084490CC302CFB(): void;

/**
 * _0x06557F6D96C86881
 *

 * @return {void}
 */
declare function N_0x06557F6D96C86881(): void;

/**
 * _SET_GAMEPLAY_CAM_PARAMS_THIS_UPDATE
 * Not official name
 * This native allows to move the gameplay cam with the given speed, enableSlide will allow to move the cam to the slideOffset, enableZoom will allow to move the cam to the zoomOffset. 
 * 
 * EXAMPLE:
 * Citizen.InvokeNative(0x066167c63111d8cf,1.0, true, -1.0, true, 2.0)
 *
 * @param {number} camSpeed
 * @param {boolean} enableSlide
 * @param {number} slideOffset
 * @param {boolean} enableZoom
 * @param {number} zoomOffset
 * @return {void}
 */
declare function SetGameplayCamParamsThisUpdate(camSpeed: number, enableSlide: boolean, slideOffset: number, enableZoom: boolean, zoomOffset: number): void;

/**
 * _0x0961B089947BA6D0
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x0961B089947BA6D0(p0: any): void;

/**
 * _0x0F1FFEF5D54AE832
 * NPLOI_UPDATE__GUN_SPINNING_PREVIEW - Adjusting Camera / Ped Reset Flags This Frame
 * _DISABLE_*
 *

 * @return {void}
 */
declare function N_0x0F1FFEF5D54AE832(): void;

/**
 * _0x0FF7125F07DEB84F
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x0FF7125F07DEB84F(p0: any, p1: any): void;

/**
 * _0x1204EB53A5FBC63D
 * Used for DUELING_LOCK_CAMERA_CONTROLS_THIS_FRAME: Disabling look/aim controls
 * _IS_SC(REEN_)* (?)
 *

 * @return {boolean}
 */
declare function N_0x1204EB53A5FBC63D(): boolean;

/**
 * _0x14C4A49E36C29E49
 *

 * @return {any}
 */
declare function N_0x14C4A49E36C29E49(): any;

/**
 * _0x16E9ABDD34DDD931
 *

 * @return {void}
 */
declare function N_0x16E9ABDD34DDD931(): void;

/**
 * _0x1811A02277A9E49D
 *

 * @return {boolean}
 */
declare function N_0x1811A02277A9E49D(): boolean;

/**
 * _0x18C3DFAC458783BB
 *

 * @return {void}
 */
declare function N_0x18C3DFAC458783BB(): void;

/**
 * _0x190F7DA1AC09A8EF
 *

 * @return {any}
 */
declare function N_0x190F7DA1AC09A8EF(): any;

/**
 * _0x1D931B7CC0EE3956
 *
 * @param {string | number} dictionary
 * @param {string | number} shotName
 * @param {string | number} cameraName
 * @return {boolean}
 */
declare function N_0x1D931B7CC0EE3956(dictionary: string | number, shotName: string | number, cameraName: string | number): boolean;

/**
 * _0x1D9F72DD4FD9A9D7
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x1D9F72DD4FD9A9D7(p0: any): void;

/**
 * _0x1F6EBD94680252CE
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x1F6EBD94680252CE(p0: any, p1: any): void;

/**
 * _0x1FC6C727D30FFDDE
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x1FC6C727D30FFDDE(p0: any): void;

/**
 * _0x29E6655DF3590B0D
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x29E6655DF3590B0D(p0: any): void;

/**
 * _0x2AB7C81B3F70570C
 *

 * @return {any}
 */
declare function N_0x2AB7C81B3F70570C(): any;

/**
 * _0x2DD3149DC34A3F4C
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x2DD3149DC34A3F4C(p0: any): void;

/**
 * _0x39073DA4EDDBC91D
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x39073DA4EDDBC91D(p0: any): void;

/**
 * _0x3B8E3AD9677CE12B
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @return {void}
 */
declare function N_0x3B8E3AD9677CE12B(p0: any, p1: any, p2: any): void;

/**
 * _0x3C486E334520579D
 *

 * @return {void}
 */
declare function N_0x3C486E334520579D(): void;

/**
 * _0x3C8F74E8FE751614
 *

 * @return {void}
 */
declare function N_0x3C8F74E8FE751614(): void;

/**
 * _0x4138EE36BC3DC0A7
 *
 * @param {any} p0
 * @param {any} p1
 * @return {any}
 */
declare function N_0x4138EE36BC3DC0A7(p0: any, p1: any): any;

/**
 * _0x41E452A3C580D1A7
 *

 * @return {void}
 */
declare function N_0x41E452A3C580D1A7(): void;

/**
 * _0x450769C833D58844
 *

 * @return {any}
 */
declare function N_0x450769C833D58844(): any;

/**
 * _0x465F04F68AD38197
 *
 * @param {string | number} dictionary
 * @param {string | number} shotName
 * @param {number} duration
 * @return {any}
 */
declare function N_0x465F04F68AD38197(dictionary: string | number, shotName: string | number, duration: number): any;

/**
 * _0x4D2F46D1B28D90FB
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0x4D2F46D1B28D90FB(p0: any, p1: any): void;

/**
 * _0x5060FA977CEA4455
 *

 * @return {any}
 */
declare function N_0x5060FA977CEA4455(): any;

/**
 * _0x5B637D6F3B67716A
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x5B637D6F3B67716A(p0: any): void;

/**
 * _0x6072B7420A83A03F
 *

 * @return {any}
 */
declare function N_0x6072B7420A83A03F(): any;

/**
 * _0x632BE8D84846FA56
 * Zooms in the gameplay camera to the next zoom level?
 * USE_* - WAS_*
 *

 * @return {void}
 */
declare function N_0x632BE8D84846FA56(): void;

/**
 * _0x63E5841A9264D016
 * Maintains the death camera after respawn
 *
 * @param {boolean} toggle
 * @return {void}
 */
declare function N_0x63E5841A9264D016(toggle: boolean): void;

/**
 * _0x641092322A8852AB
 *

 * @return {void}
 */
declare function N_0x641092322A8852AB(): void;

/**
 * _0x6519238858AF5479
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x6519238858AF5479(p0: any): void;

/**
 * _0x6CAB0BA160B168D2
 *

 * @return {void}
 */
declare function N_0x6CAB0BA160B168D2(): void;

/**
 * _0x6DFD37E586D4F44F
 *

 * @return {any}
 */
declare function N_0x6DFD37E586D4F44F(): any;

/**
 * _0x70A6658D476C6187
 *

 * @return {void}
 */
declare function N_0x70A6658D476C6187(): void;

/**
 * _0x718C6ECF5E8CBDD4
 *

 * @return {void}
 */
declare function N_0x718C6ECF5E8CBDD4(): void;

/**
 * _0x71D71E08A7ED5BD7
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x71D71E08A7ED5BD7(p0: any): void;

/**
 * _0x728491FB3DFFEF99
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x728491FB3DFFEF99(p0: any): void;

/**
 * _0x73FF6BE63DC18819
 *

 * @return {any}
 */
declare function N_0x73FF6BE63DC18819(): any;

/**
 * _0x796085220ADCC847
 *

 * @return {any}
 */
declare function N_0x796085220ADCC847(): any;

/**
 * _0x7CE9DC58E3E4755F
 *

 * @return {any}
 */
declare function N_0x7CE9DC58E3E4755F(): any;

/**
 * _0x7E40A01B11398FCB
 *

 * @return {void}
 */
declare function N_0x7E40A01B11398FCB(): void;

/**
 * _0x80D7A3E39B120BC4
 *

 * @return {any}
 */
declare function N_0x80D7A3E39B120BC4(): any;

/**
 * _0x8505E05FC8822843
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x8505E05FC8822843(p0: any): void;

/**
 * _0x88544C0E3291DCAE
 * UPDATE_PLAYER_PLAYING_STATE - Releasing Lasso Hint Cam
 * Return type char in ida
 * _SET_GAMEPLAY_HINT_*
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function N_0x88544C0E3291DCAE(p0: boolean): void;

/**
 * _0x8B1A5FE7E41E52B2
 *

 * @return {any}
 */
declare function N_0x8B1A5FE7E41E52B2(): any;

/**
 * _0x8E036B41C37D0E5F
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x8E036B41C37D0E5F(p0: any): void;

/**
 * _0x975F6EBB62632FE3
 * _IS_SCRIPTED_S*
 *

 * @return {boolean}
 */
declare function N_0x975F6EBB62632FE3(): boolean;

/**
 * _0x9AC65A36D3C0C189
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0x9AC65A36D3C0C189(p0: any): void;

/**
 * _0xA54D643D0773EB65
 *
 * @param {string | number} dictionary
 * @param {string | number} shotName
 * @param {number} duration
 * @return {void}
 */
declare function N_0xA54D643D0773EB65(dictionary: string | number, shotName: string | number, duration: number): void;

/**
 * _0xA8BA2E0204D8486F
 * NPLOI_UPDATE__GUN_SPINNING_PREVIEW - Adjusting Camera / Ped Reset Flags This Frame
 * _DISABLE_*
 *

 * @return {void}
 */
declare function N_0xA8BA2E0204D8486F(): void;

/**
 * _0xAC77757C05DE9E5A
 *
 * @param {string | number} cameraDictionary
 * @return {void}
 */
declare function N_0xAC77757C05DE9E5A(cameraDictionary: string | number): void;

/**
 * _0xB6A80E1E3A5444F1
 *

 * @return {any}
 */
declare function N_0xB6A80E1E3A5444F1(): any;

/**
 * _0xB85C13E0BF1F2A1C
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xB85C13E0BF1F2A1C(p0: any): void;

/**
 * _0xC205B3C54C6A4E37
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xC205B3C54C6A4E37(p0: any): void;

/**
 * _0xC252C0CC969AF79A
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xC252C0CC969AF79A(p0: any): void;

/**
 * _0xC285FD21294A1C49
 *
 * @param {string | number} cameraDictionary
 * @return {boolean}
 */
declare function N_0xC285FD21294A1C49(cameraDictionary: string | number): boolean;

/**
 * _0xC3742F1FDF0A6824
 * Camera will be or is running
 *

 * @return {void}
 */
declare function N_0xC3742F1FDF0A6824(): void;

/**
 * _0xC3AEBB276825A359
 *
 * @param {string | number} dictionary
 * @param {string | number} shotName
 * @param {number} duration
 * @return {boolean}
 */
declare function N_0xC3AEBB276825A359(dictionary: string | number, shotName: string | number, duration: number): boolean;

/**
 * _0xC3E9E5D4F413B773
 * shakeName: REINFORCED_LASSO_STRUGGLE_SHAKE
 * _RES*
 *
 * @param {string | number} shakeName
 * @param {number} intensity
 * @return {void}
 */
declare function N_0xC3E9E5D4F413B773(shakeName: string | number, intensity: number): void;

/**
 * _0xCF69EA05CD9C33C9
 *

 * @return {void}
 */
declare function N_0xCF69EA05CD9C33C9(): void;

/**
 * _0xDB382FE20C2DA222
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xDB382FE20C2DA222(p0: any): void;

/**
 * _0xDC62CD70658E7A02
 *

 * @return {any}
 */
declare function N_0xDC62CD70658E7A02(): any;

/**
 * _0xDF7F5BE9150E47E4
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xDF7F5BE9150E47E4(p0: any): void;

/**
 * _0xE28F73212A813E82
 *
 * @param {any} p0
 * @param {any} p1
 * @param {any} p2
 * @param {any} p3
 * @return {void}
 */
declare function N_0xE28F73212A813E82(p0: any, p1: any, p2: any, p3: any): void;

/**
 * _0xE2BB2D6A9FE2ECDE
 *
 * @param {any} p0
 * @return {void}
 */
declare function N_0xE2BB2D6A9FE2ECDE(p0: any): void;

/**
 * _0xE4B7945EF4F1BFB2
 *
 * @param {number} cam
 * @param {DataView} args
 * @return {void}
 */
declare function N_0xE4B7945EF4F1BFB2(cam: Cam, args: DataView): void;

/**
 * _0xE6F364DE6C2FDEFE
 *

 * @return {void}
 */
declare function N_0xE6F364DE6C2FDEFE(): void;

/**
 * _0xEA113BF9B0C0C5D7
 *
 * @param {string | number} dictionary
 * @param {string | number} shotName
 * @param {number} duration
 * @return {any}
 */
declare function N_0xEA113BF9B0C0C5D7(dictionary: string | number, shotName: string | number, duration: number): any;

/**
 * _0xEF9A3132A0AA6B19
 *

 * @return {any}
 */
declare function N_0xEF9A3132A0AA6B19(): any;

/**
 * _0xF1A6FEEDF3776EF9
 *

 * @return {void}
 */
declare function N_0xF1A6FEEDF3776EF9(): void;

/**
 * _0xF48664E9C83825E3
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xF48664E9C83825E3(p0: any, p1: any): void;

/**
 * _0xF824530B612FE0CE
 *

 * @return {any}
 */
declare function N_0xF824530B612FE0CE(): any;

/**
 * _0xFC3F638BE2B6BB02
 *

 * @return {void}
 */
declare function N_0xFC3F638BE2B6BB02(): void;

/**
 * _0xFEB8646818294C75
 *
 * @param {any} p0
 * @param {any} p1
 * @return {void}
 */
declare function N_0xFEB8646818294C75(p0: any, p1: any): void;

/**
 * _0xFEFDDC6E8FDF8A75
 * _SET_GAMEPLAY_P* - _SET_GAMEPLAY_V*
 *
 * @param {string | number} shakeName
 * @param {number} intensity
 * @return {void}
 */
declare function N_0xFEFDDC6E8FDF8A75(shakeName: string | number, intensity: number): void;

/**
 * _CAM_CREATE
 *
 * @param {string | number} cameraDictionary
 * @return {void}
 */
declare function CamCreate(cameraDictionary: string | number): void;

/**
 * _CAM_CREATE_2
 *
 * @param {string | number} cameraDictionary
 * @return {void}
 */
declare function CamCreate_2(cameraDictionary: string | number): void;

/**
 * _CAM_DESTROY
 *
 * @param {string | number} cameraDictionary
 * @return {void}
 */
declare function CamDestroy(cameraDictionary: string | number): void;

/**
 * _CINEMATIC_LOCATION_SET_LOCATION_AND_ROTATION
 *
 * @param {string | number} name
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @return {void}
 */
declare function CinematicLocationSetLocationAndRotation(name: string | number, x: number, y: number, z: number, rotX: number, rotY: number, rotZ: number): void;

/**
 * _CINEMATIC_LOCATION_TRIGGER_SCRIPTED_SHOT_EVENT_2
 *
 * @param {string | number} dictionary
 * @param {string | number} shotName
 * @param {number} duration
 * @return {void}
 */
declare function CinematicLocationTriggerScriptedShotEvent_2(dictionary: string | number, shotName: string | number, duration: number): void;

/**
 * _CREATE_KILL_CAM
 * Creates Kill Cam for specified Ped Handle
 *
 * @param {number} ped
 * @return {void}
 */
declare function CreateKillCam(ped: Ped): void;

/**
 * _DISABLE_CINEMATIC_MODE_THIS_FRAME
 *

 * @return {void}
 */
declare function DisableCinematicModeThisFrame(): void;

/**
 * _DISABLE_ON_FOOT_FIRST_PERSON_VIEW_THIS_UPDATE_2
 * Does the same as 0x9C473089A934C930 (DISABLE_ON_FOOT_FIRST_PERSON_VIEW_THIS_UPDATE)
 *

 * @return {void}
 */
declare function DisableOnFootFirstPersonViewThisUpdate_2(): void;

/**
 * _FORCE_CINEMATIC_DEATH_CAM_ON_PED
 * Used for DUELING_MANAGE_DEATH_CAMERA - Initializing death camera
 * Params: targetPed = death cam focuses on it
 *
 * @param {number} targetPed
 * @return {void}
 */
declare function ForceCinematicDeathCamOnPed(targetPed: Ped): void;

/**
 * _FORCE_FIRST_PERSON_CAM_THIS_FRAME
 * Returns true if first person camera is active in saloon1.ysc
 *

 * @return {boolean}
 */
declare function ForceFirstPersonCamThisFrame(): boolean;

/**
 * _FORCE_LETTER_BOX_THIS_UPDATE
 *

 * @return {void}
 */
declare function ForceLetterBoxThisUpdate(): void;

/**
 * _FORCE_THIRD_PERSON_CAM_FAR_THIS_FRAME
 * Forces camera position to furthest 3rd person
 *

 * @return {void}
 */
declare function ForceThirdPersonCamFarThisFrame(): void;

/**
 * _FORCE_THIRD_PERSON_CAM_THIS_FRAME
 * Forces camera position to second furthest 3rd person
 *

 * @return {void}
 */
declare function ForceThirdPersonCamThisFrame(): void;

/**
 * _FREEZE_GAMEPLAY_CAM_THIS_FRAME
 *

 * @return {void}
 */
declare function FreezeGameplayCamThisFrame(): void;

/**
 * _GET_PHOTO_MODE_DOF
 *

 * @return {number}
 */
declare function GetPhotoModeDof(): number;

/**
 * _GET_PHOTO_MODE_FOCAL_LENGTH
 *

 * @return {number}
 */
declare function GetPhotoModeFocalLength(): number;

/**
 * _GET_PHOTO_MODE_FOCUS_DISTANCE
 *

 * @return {number}
 */
declare function GetPhotoModeFocusDistance(): number;

/**
 * _IS_ANIM_SCENE_CAM_ACTIVE
 * Only used in R* Script camera_photomode
 *

 * @return {boolean}
 */
declare function IsAnimSceneCamActive(): boolean;

/**
 * _IS_CAMERA_AVAILABLE
 *
 * @param {string | number} cameraDictionary
 * @return {boolean}
 */
declare function IsCameraAvailable(cameraDictionary: string | number): boolean;

/**
 * _IS_CAM_DATA_DICT_LOADED
 *
 * @param {string | number} cameraDictionary
 * @return {boolean}
 */
declare function IsCamDataDictLoaded(cameraDictionary: string | number): boolean;

/**
 * _IS_CAM_PHOTOFX_RUNNING
 *

 * @return {boolean}
 */
declare function IsCamPhotofxRunning(): boolean;

/**
 * _IS_CINEMATIC_CAM_LOCATION_LOADED
 *
 * @param {string | number} sLocationDictName
 * @return {boolean}
 */
declare function IsCinematicCamLocationLoaded(sLocationDictName: string | number): boolean;

/**
 * _IS_CINEMATIC_CAM_LOCATION_LOADED_2
 * Checks data related to Cinematic Cam Locations, if the check fails, the location is being loaded using 0x1B3C2D961F5FC0E1.
 *
 * @param {string | number} locationDictName
 * @return {boolean}
 */
declare function IsCinematicCamLocationLoaded_2(locationDictName: string | number): boolean;

/**
 * _IS_IN_CINEMATIC_MODE
 *

 * @return {boolean}
 */
declare function IsInCinematicMode(): boolean;

/**
 * _IS_IN_FULL_FIRST_PERSON_MODE
 * Returns true if player is in first person
 *

 * @return {boolean}
 */
declare function IsInFullFirstPersonMode(): boolean;

/**
 * _LOAD_CAMERA_DATA_DICT
 *
 * @param {string | number} cameraDictionary
 * @return {void}
 */
declare function LoadCameraDataDict(cameraDictionary: string | number): void;

/**
 * _LOAD_CINEMATIC_CAM_LOCATION
 *
 * @param {string | number} locationDictName
 * @return {void}
 */
declare function LoadCinematicCamLocation(locationDictName: string | number): void;

/**
 * _PAUSE_CAMERA_FOCUS
 *
 * @param {number} cam
 * @param {boolean} pause
 * @return {void}
 */
declare function PauseCameraFocus(cam: Cam, pause: boolean): void;

/**
 * _REACTIVATE_PED_HEADSHOT_EXECUTE_SLOWCAM
 * Used to enable headshot kill replay when you headshot set ped.
 * Params: p1 seems to be 0 or 1 in R* Scripts
 *
 * @param {number} ped
 * @param {number} p1
 * @return {void}
 */
declare function ReactivatePedHeadshotExecuteSlowcam(ped: Ped, p1: number): void;

/**
 * _REQUEST_LETTER_BOX_NOW
 * Creates Cinematic Black Bars (at top and bottom)
 * Disable instantly: false/false, Enable instantly: true/true
 *
 * @param {boolean} p0
 * @param {boolean} p1
 * @return {void}
 */
declare function RequestLetterBoxNow(p0: boolean, p1: boolean): void;

/**
 * _REQUEST_LETTER_BOX_OVERTIME
 *
 * @param {number} p0
 * @param {number} p1
 * @param {boolean} p2
 * @param {number} p3
 * @param {boolean} p4
 * @param {boolean} p5
 * @return {void}
 */
declare function RequestLetterBoxOvertime(p0: number, p1: number, p2: boolean, p3: number, p4: boolean, p5: boolean): void;

/**
 * _SET_CAM_FOCUS_DISTANCE
 *
 * @param {number} cam
 * @param {number} distance
 * @return {void}
 */
declare function SetCamFocusDistance(cam: Cam, distance: number): void;

/**
 * _SET_GAMEPLAY_CAM_INITIAL_HEADING
 *
 * @param {number} camInitialHeading
 * @return {void}
 */
declare function SetGameplayCamInitialHeading(camInitialHeading: number): void;

/**
 * _SET_GAMEPLAY_CAM_INITIAL_PITCH
 *
 * @param {number} camInitialPitch
 * @return {void}
 */
declare function SetGameplayCamInitialPitch(camInitialPitch: number): void;

/**
 * _SET_GAMEPLAY_CAM_INITIAL_ZOOM
 * Used in Script Function SHOP_CAMERA_SUPPORT_START_NEW_ORBIT
 *
 * @param {number} camInitialZoom
 * @return {void}
 */
declare function SetGameplayCamInitialZoom(camInitialZoom: number): void;

/**
 * _SET_START_CINEMATIC_DEATH_CAM
 * Used for DUELING_MANAGE_DEATH_CAMERA - Initializing death camera
 * _SET_P* - _SET_S*
 *
 * @param {boolean} p0
 * @return {void}
 */
declare function SetStartCinematicDeathCam(p0: boolean): void;

/**
 * _START_CAMERA_ORBIT
 * [SHOP_CAMERA_SUPPORT_START_NEW_ORBIT]
 * p0: struct<32> |*256*|
 *
 * @param {DataView} p0
 * @return {void}
 */
declare function StartCameraOrbit(p0: DataView): void;

/**
 * _STOP_GAMEPLAY_CAM_SHAKING_WITH_NAME
 * script_rel: DRUNK_SHAKE, REINFORCED_LASSO_STRUGGLE_SHAKE, CORRECTOR_SHAKE, MINIGAME_BOUNTY_SHAKE, HAND_SHAKE, MINIGAME_TRAIN_SHAKE
 * script_mp_rel: DRUNK_SHAKE, REINFORCED_LASSO_STRUGGLE_SHAKE
 * _STOP_GAMEPLAY_CAM* - _STOP_I*
 *
 * @param {string | number} shakeName
 * @param {boolean} p1
 * @return {void}
 */
declare function StopGameplayCamShakingWithName(shakeName: string | number, p1: boolean): void;

/**
 * _TRIGGER_MISSION_FAILED_CAM
 *

 * @return {void}
 */
declare function TriggerMissionFailedCam(): void;

/**
 * _UNLOAD_CAMERA_DATA_DICT
 *
 * @param {string | number} cameraDictionary
 * @return {void}
 */
declare function UnloadCameraDataDict(cameraDictionary: string | number): void;

/**
 * _UNLOAD_CINEMATIC_CAMERA_LOCATION
 *
 * @param {string | number} dictionaryName
 * @return {void}
 */
declare function UnloadCinematicCameraLocation(dictionaryName: string | number): void;