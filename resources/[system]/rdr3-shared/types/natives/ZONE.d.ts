/**
 * _GET_MAP_ZONE_AT_COORDS
 * Returns name hash, see common:/data/levels/rdr3/mapzones.meta
 * 
 * type (-1 matches any type):
 * class CMapZone
 * {
 * public:
 *   enum class Type
 *   {
 *     STATE,
 *     TOWN,
 *     LAKE,
 *     RIVER,
 *     OIL_SPILL,
 *     SWAMP,
 *     OCEAN,
 *     CREEK,
 *     POND,
 *     GLACIER,
 *     DISTRICT,
 *     TEXT_PRINTED,
 *     TEXT_WRITTEN
 *   };
 * };
 * 
 * https://github.com/femga/rdr3_discoveries/tree/master/zones & https://alloc8or.re/rdr3/doc/enums/CMapZone__Type.txt
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} type
 * @return {number}
 */
declare function GetMapZoneAtCoords(x: number, y: number, z: number, type: number): number;

/**
 * _GET_WATER_MAP_ZONE_AT_COORDS
 * Returns the zone's name hash if its type matches one of the following:
 * - LAKE
 * - RIVER
 * - OIL_SPILL
 * - SWAMP
 * - OCEAN
 * - CREEK
 * - POND
 * - GLACIER
 *
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {number}
 */
declare function GetWaterMapZoneAtCoords(x: number, y: number, z: number): number;