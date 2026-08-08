export function buildExport(points: ZoneManagerNew.Point[], minZ: number, maxZ: number): ZoneManagerNew.ExportResult {
  const tsLines = points.map((p) => `  { x: ${p.x.toFixed(2)}, y: ${p.y.toFixed(2)} },`);
  const ts = `[\n${tsLines.join('\n')}\n]`;

  const luaLines = points.map((p) => `  vector2(${p.x.toFixed(2)}, ${p.y.toFixed(2)}),`);
  const lua = `{\n${luaLines.join('\n')}\n}`;

  return { ts, lua, minZ, maxZ };
}
