/**
   * GET_SHAPE_TEST_RESULT
   * Returns the result of a shape test: 0 if the handle is invalid, 1 if the shape test is still pending, or 2 if the shape test has completed, and the handle should be invalidated.
   * 
   * When used with an asynchronous shape test, this native should be looped until returning 0 or 2, after which the handle is invalidated.
   * 
   * enum eShapeTestStatus
   * {
   *   SHAPETEST_STATUS_NONEXISTENT,
   *   SHAPETEST_STATUS_RESULTS_NOTREADY,
   *   SHAPETEST_STATUS_RESULTS_READY
   * };
   *
   * @param {number} shapeTestHandle
   * @param {number} entityHit
   * @return {[number, boolean, Vector3, Vector3]}
   */
declare function GetShapeTestResult(shapeTestHandle: ScrHandle, entityHit: Entity): [number, boolean, Vector3, Vector3];

/**
   * START_EXPENSIVE_SYNCHRONOUS_SHAPE_TEST_LOS_PROBE
   * Does the same as 0x7EE9F5D83DD4F90E, except blocking until the shape test completes.
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {number} flags
   * @param {number} entityToIgnore
   * @param {number} p8
   * @return {number}
   */
declare function StartExpensiveSynchronousShapeTestLosProbe(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, flags: number, entityToIgnore: Entity, p8: number): ScrHandle;

/**
   * START_SHAPE_TEST_BOX
   *
   * @param {number} posX
   * @param {number} posY
   * @param {number} posZ
   * @param {number} dimensionsX
   * @param {number} dimensionsY
   * @param {number} dimensionsZ
   * @param {number} rotX
   * @param {number} rotY
   * @param {number} rotZ
   * @param {number} rotationOrder
   * @param {number} flags
   * @param {number} entityToIgnore
   * @param {number} options
   * @return {number}
   */
declare function StartShapeTestBox(posX: number, posY: number, posZ: number, dimensionsX: number, dimensionsY: number, dimensionsZ: number, rotX: number, rotY: number, rotZ: number, rotationOrder: number, flags: number, entityToIgnore: Entity, options: number): ScrHandle;

/**
   * START_SHAPE_TEST_CAPSULE
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {number} radius
   * @param {number} flags
   * @param {number} entityToIgnore
   * @param {number} p9
   * @return {number}
   */
declare function StartShapeTestCapsule(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, radius: number, flags: number, entityToIgnore: Entity, p9: number): ScrHandle;

/**
   * START_SHAPE_TEST_LOS_PROBE
   * Asynchronously starts a line-of-sight (raycast) world probe shape test.
   * 
   * Use the handle with 0x3D87450E15D98694 or 0x65287525D951F6BE until it returns 0 or 2.
   * 
   * p8 is a bit mask with bits 1, 2 and/or 4, relating to collider types; 4 should usually be used. flags used are mostly 83 and 3167 
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {number} flags
   * @param {number} entity
   * @param {number} p8
   * @return {number}
   */
declare function StartShapeTestLosProbe(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, flags: number, entity: Entity, p8: number): ScrHandle;

/**
   * START_SHAPE_TEST_MOUSE_CURSOR_LOS_PROBE
   * Old name: _START_SHAPE_TEST_SURROUNDING_COORDS
   *
   * @param {number} flag
   * @param {number} entity
   * @param {number} flag2
   * @return {[ScrHandle, Vector3, Vector3]}
   */
declare function StartShapeTestMouseCursorLosProbe(flag: number, entity: Entity, flag2: number): [ScrHandle, Vector3, Vector3];

/**
   * START_SHAPE_TEST_SWEPT_SPHERE
   *
   * @param {number} x1
   * @param {number} y1
   * @param {number} z1
   * @param {number} x2
   * @param {number} y2
   * @param {number} z2
   * @param {number} radius
   * @param {number} flags
   * @param {number} entity
   * @param {any} p9
   * @return {number}
   */
declare function StartShapeTestSweptSphere(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, radius: number, flags: number, entity: Entity, p9: any): ScrHandle;

/**
   * _0x04AA59CA40571C2E
   *
   * @param {any} p0
   * @param {any} p1
   * @return {any}
   */
declare function N_0x04AA59CA40571C2E(p0: any, p1: any): any;