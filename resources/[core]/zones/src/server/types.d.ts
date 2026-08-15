declare interface ServerExports {
  zones: Zones.ServerExports;
}

declare namespace Zones {
  type ServerZoneData = ZoneData<[serverId: number]>;

  type IsPlayerInZone = (zoneName: string, serverId: number) => boolean;
  type IsPlayerInZones = (zoneNames: string[], serverId: number) => string | null;

  type ServerExports = {
    // Zone creation
    AddPoly: AddPoly;
    AddBox: AddBox;
    AddSphere: AddSphere;
    Remove: Remove;
    // Zone checking
    IsCoordInZone: IsCoordInZone;
    IsEntityInZone: IsEntityInZone;
    IsEntityInZones: IsEntityInZones;
    IsPlayerInZone: IsPlayerInZone;
    IsPlayerInZones: IsPlayerInZones;
    GetZonesAtCoord: GetZonesAtCoord;
    GetZonesForEntity: GetZonesForEntity;
    // Zone data
    GetZoneData: GetZoneData;
  };
}
