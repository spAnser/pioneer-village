const PREVIEW_ZONE_NAME = '__zone_manager_preview';

export class ZonePreview {
  refresh(points: ZoneManagerNew.Point[], minZ: number, maxZ: number): void {
    exports['zones'].Remove(PREVIEW_ZONE_NAME);
    if (points.length < 3) return;

    const zonePoints = points.map((p) => ({ x: p.x, y: p.y }));
    exports['zones'].AddPoly(PREVIEW_ZONE_NAME, zonePoints, minZ, maxZ, {
      debug: true,
      debugColor: { r: 0, g: 255, b: 100, a: 120 },
    });
  }

  remove(): void {
    exports['zones'].Remove(PREVIEW_ZONE_NAME);
  }
}
