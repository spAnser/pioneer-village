import { PVGame } from '@lib/client';

import {
  WEATHER_COMPATIBILITY,
  WeatherType,
  analyzeWeatherCompatibility,
  findWeatherTransitionPath,
} from '../shared/biome';
import './exports';
import weatherManager from './managers/weather';
import './test';

(async () => {
  SetWeatherOwnedByNetwork(false);
})();

setInterval(() => {
  const playerPed = PlayerPedId();
  if (playerPed && playerPed !== 0) {
    const coords = PVGame.playerCoords(true);
    const heading = GetEntityHeading(playerPed);

    // Always update weather state — handles grid changes even when stationary
    // The transition engine ensures smooth blending regardless
    weatherManager.calculateIfWeatherShouldTransition(coords.x, coords.y, heading);
  }
}, 5_000); // Check every 5 seconds

// Create a checkerboard test pattern for debugging, alternating between two weather types SUNNY & RAIN
// Useful when running in conjunction with the 'togglegrid' command to verify grid updates and transitions.
RegisterCommand(
  'weather:test',
  () => {
    weatherManager.generateTestPattern();
  },
  false,
);

// Show the current weather grid in the console for debugging purposes
RegisterCommand(
  'weather:check',
  () => {
    weatherManager.checkWeather();
  },
  false,
);

RegisterCommand(
  'weather:force',
  async (source: number, args: any[], rawCommand: string) => {
    const wType = args[0]?.toUpperCase();
    if (typeof wType !== 'string') {
      console.log('Invalid weather type. Usage: /weather:force <WEATHER_TYPE>');
      return;
    }

    console.log(`Forcing all grid cells to weather type: ${wType}`);
    weatherManager.setAllCellsToWeatherType(wType as WeatherType);
    SetOverrideWeather(wType);
  },
  false,
);

// Print the full weather grid to console with biome and weather per cell
RegisterCommand(
  'weather:grid',
  () => {
    const grid = weatherManager.getWeatherGrid();
    const cells = grid.getGrid();
    const coords = PVGame.playerCoords(true);
    const playerPos = grid.worldToGrid(coords.x, coords.y);

    console.log('========================================');
    console.log('WEATHER GRID');
    console.log('========================================');

    const biomeAbbrev: Record<string, string> = {
      GRIZZLIES: 'GRIZ',
      TALL_TREES: 'TREE',
      BIG_VALLEY: 'BVAL',
      HEARTLANDS: 'HEAR',
      GREAT_PLAINS: 'PLNS',
      BAYOU: 'BAYO',
      LEMOYNE: 'LEMO',
      NEW_AUSTIN: 'NAUS',
      RIO_BRAVO: 'RBRA',
      ROANOKE: 'ROAN',
      CUMBERLAND: 'CUMB',
      SCARLETT: 'SCAR',
    };

    for (let y = cells.length - 1; y >= 0; y--) {
      const row = cells[y]
        .map((cell) => {
          const biome = biomeAbbrev[cell.biome] || cell.biome.substring(0, 4);
          const weather = cell.weather.substring(0, 6).padEnd(6);
          const marker = cell.x === playerPos.x && cell.y === playerPos.y ? '*' : ' ';
          return `${marker}${biome}:${weather}`;
        })
        .join(' | ');
      console.log(`Y${y} ${row}`);
    }

    console.log('========================================');
    console.log(`Player at cell (${playerPos.x}, ${playerPos.y})`);
    console.log('* = player cell');
    console.log('========================================');
  },
  false,
);

// Request the current weather grid from the server, resetting any forced weather
RegisterCommand(
  'weather:sync',
  () => {
    weatherManager.requestWeatherGrid();
  },
  false,
);

// Analyze the weather compatibility graph for reachability and transition paths
RegisterCommand(
  'weather:compat',
  (_source: number, args: any[]) => {
    const result = analyzeWeatherCompatibility();

    console.log('========================================');
    console.log('WEATHER COMPATIBILITY ANALYSIS');
    console.log('========================================');

    // Isolated types (no outgoing edges)
    if (result.isolated.length > 0) {
      console.log(`\n[ISOLATED] ${result.isolated.length} types with NO outgoing transitions:`);
      for (const type of result.isolated) {
        console.log(`  - ${type}`);
      }
    } else {
      console.log('\n[OK] All weather types have outgoing transitions');
    }

    // Unreachable pairs
    if (result.unreachable.length > 0) {
      console.log(`\n[UNREACHABLE] ${result.unreachable.length} pairs with no path:`);
      // Group by source for readability
      const bySource = new Map<string, string[]>();
      for (const pair of result.unreachable) {
        if (!bySource.has(pair.from)) bySource.set(pair.from, []);
        bySource.get(pair.from)!.push(pair.to);
      }
      for (const [from, targets] of bySource) {
        console.log(`  ${from} -> [${targets.join(', ')}]`);
      }
    } else {
      console.log('\n[OK] All weather type pairs are reachable');
    }

    // Stats
    console.log(`\n[STATS]`);
    console.log(`  Total pairs: ${Object.values(WeatherType).length * (Object.values(WeatherType).length - 1)}`);
    console.log(`  Reachable: ${result.reachable.length}`);
    console.log(`  Unreachable: ${result.unreachable.length}`);
    console.log(`  Max hops: ${result.maxHops}`);

    if (result.worstPath) {
      console.log(`  Worst path: ${result.worstPath.path.join(' -> ')} (${result.worstPath.hops} hops)`);
    }

    // Hop distribution
    const hopCounts = new Map<number, number>();
    for (const entry of result.reachable) {
      hopCounts.set(entry.hops, (hopCounts.get(entry.hops) || 0) + 1);
    }
    console.log(`\n[HOP DISTRIBUTION]`);
    for (const [hops, count] of [...hopCounts.entries()].sort((a, b) => a[0] - b[0])) {
      console.log(`  ${hops} hop${hops !== 1 ? 's' : ''}: ${count} pairs`);
    }

    // If a specific type was passed, show its paths
    const queryType = args[0]?.toUpperCase();
    if (queryType && Object.values(WeatherType).includes(queryType as WeatherType)) {
      const from = queryType as WeatherType;
      console.log(`\n[PATHS FROM ${from}]`);
      console.log(`  Direct: ${(WEATHER_COMPATIBILITY[from] || []).filter((t) => t !== from).join(', ') || 'NONE'}`);

      for (const to of Object.values(WeatherType)) {
        if (to === from) continue;
        const path = findWeatherTransitionPath(from, to);
        if (path) {
          console.log(`  -> ${to}: ${path.join(' -> ')} (${path.length - 1} hops)`);
        } else {
          console.log(`  -> ${to}: UNREACHABLE`);
        }
      }
    } else if (queryType) {
      console.log(`\nUnknown weather type: ${queryType}`);
    } else {
      console.log(`\nTip: /weather:compat <WEATHER_TYPE> to see paths from a specific type`);
    }

    console.log('========================================');
  },
  false,
);
