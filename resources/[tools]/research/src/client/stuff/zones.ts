import { DrawTxt, PVEvents, addZone, registerCronEvent } from '@lib/client';

interface RingItem {
  x: number;
  y: number;
  z: number; // integer
}

interface RootItem {
  name: string;
  type: string;
  hullCount: number; // integer
  ringCount: number; // integer
  rings: RingItem[][]; // 1 items
}

type Root = RootItem[];

const mapzonesJson = LoadResourceFile('rdr3-shared', `resources/mapzones.json`);
const mapzones = JSON.parse(mapzonesJson) as Root;

type RGBA = { r: number; g: number; b: number; a: number };

const ZoneTypeColors: Record<string, RGBA> = {
  // Land / civic — warm earth tones, alpha lower for larger zones
  STATE: { r: 235, g: 200, b: 80, a: 70 }, // mustard yellow
  DISTRICT: { r: 240, g: 140, b: 40, a: 110 }, // orange
  TOWN: { r: 235, g: 70, b: 160, a: 160 }, // magenta-pink

  // Water — blue family, hue/saturation differentiates
  OCEAN: { r: 20, g: 50, b: 110, a: 120 }, // deep navy
  LAKE: { r: 60, g: 200, b: 220, a: 130 }, // bright cyan
  RIVER: { r: 100, g: 170, b: 230, a: 135 }, // sky blue
  CREEK: { r: 170, g: 210, b: 240, a: 140 }, // pale blue
  POND: { r: 60, g: 180, b: 170, a: 150 }, // teal
  SWAMP: { r: 110, g: 130, b: 70, a: 155 }, // muddy olive

  // Edge cases
  OIL_SPILL: { r: 255, g: 30, b: 50, a: 180 }, // dark purple-brown
  GLACIER: { r: 220, g: 240, b: 250, a: 140 }, // ice white
  TEXT_PRINTED: { r: 230, g: 90, b: 50, a: 150 }, // red-orange
  TEXT_WRITTEN: { r: 250, g: 130, b: 110, a: 150 }, // coral
  '': { r: 255, g: 255, b: 255, a: 120 }, // neutral gray (untyped)
};

const FALLBACK_COLOR: RGBA = { r: 255, g: 0, b: 255, a: 128 };

const InsideZones = new Map<string, string>();

for (const zoneType of Object.keys(ZoneTypeColors)) {
  InsideZones.set(zoneType, '');
}

// setTick(() => {
//   let n = 0;
//   for (const [zoneType, zoneName] of InsideZones.entries()) {
//     if (!zoneType) continue;
//     DrawTxt(`[${zoneType}] ${zoneName || 'None'}`, 0.15, 0.5 + 0.0175 * n++, 0.25);
//   }
// });

for (const zones of mapzones) {
  const debugColor = ZoneTypeColors[zones.type] ?? FALLBACK_COLOR;
  let n = 0;
  for (const zone of zones.rings) {
    // console.log(`research_zone_${zones.name}_${n}`);
    addZone({
      name: `research_zone_${zones.name}_${n}`,
      _type: 'poly',
      coords: zone,
      minZ: -50.0,
      maxZ: 1000.0,
      options: {
        debug: false, // zones.type === 'STATE',
        debugColor,
      },
      onEnter() {
        console.log(`Entered zone ${zones.name} (${zones.type})`);
        InsideZones.set(zones.type, zones.name);
      },
      onExit() {
        console.log(`Exited zone ${zones.name} (${zones.type})`);
        InsideZones.set(zones.type, '');
      },
    });
    n++;
  }
}

// registerCronEvent(
//   () => {
//     console.log('Performing periodic zone check');
//   },
//   'zoneCheck',
//   '*/5 * * * * *', // every 5 seconds
// );
