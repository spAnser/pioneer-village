import { awaitSocket } from '@lib/server';

RegisterCommand(
  'weather:grid-state',
  async () => {
    try {
      const result = await awaitSocket('weather.admin.get-grid-state');
      console.log(`[Weather] frozen=${result.frozen} globalOverride=${result.globalOverride ?? 'none'}`);
      console.log(`[Weather] grid size: ${result.grid.length}x${result.grid[0]?.length ?? 0}`);
    } catch (error) {
      console.log('[Weather] Failed to get grid state:', error);
    }
  },
  true,
);

RegisterCommand(
  'weather:set-biome',
  async (source: number, args: string[]) => {
    const [biome, weather] = args;
    if (!biome || !weather) {
      console.log('Usage: weather:set-biome <biome> <weather>');
      return;
    }

    try {
      const result = await awaitSocket('weather.admin.set-biome-weather', biome, weather);
      if (result.success) {
        console.log(`[Weather] Updated ${result.updatedCount ?? 0} cell(s) in biome ${biome} to ${weather}`);
      } else {
        console.log('[Weather] Failed to set biome weather:', result.error);
      }
    } catch (error) {
      console.log('[Weather] Failed to set biome weather:', error);
    }
  },
  true,
);

RegisterCommand(
  'weather:regenerate-grid',
  async (source: number, args: string[]) => {
    const seedArg = args[0];
    const seed = seedArg !== undefined ? Number(seedArg) : undefined;
    if (seedArg !== undefined && Number.isNaN(seed)) {
      console.log('Usage: weather:regenerate-grid [seed]');
      return;
    }

    try {
      const result = await awaitSocket('weather.admin.regenerate-grid', seed);
      if (result.success) {
        console.log('[Weather] Grid regenerated');
      } else {
        console.log('[Weather] Failed to regenerate grid:', result.error);
      }
    } catch (error) {
      console.log('[Weather] Failed to regenerate grid:', error);
    }
  },
  true,
);

RegisterCommand(
  'weather:freeze',
  async (source: number, args: string[]) => {
    const value = args[0]?.toLowerCase();
    if (value !== 'true' && value !== 'false') {
      console.log('Usage: weather:freeze <true|false>');
      return;
    }

    try {
      const result = await awaitSocket('weather.admin.freeze-weather', value === 'true');
      if (result.success) {
        console.log(`[Weather] Weather ${value === 'true' ? 'frozen' : 'unfrozen'}`);
      } else {
        console.log('[Weather] Failed to freeze weather:', result.error);
      }
    } catch (error) {
      console.log('[Weather] Failed to freeze weather:', error);
    }
  },
  true,
);

RegisterCommand(
  'weather:force-global',
  async (source: number, args: string[]) => {
    const weather = args[0]?.toUpperCase();

    try {
      const result = await awaitSocket('weather.admin.force-global', weather ?? null);
      if (result.success) {
        console.log(weather ? `[Weather] Forced global weather to ${weather}` : '[Weather] Cleared global weather override');
      } else {
        console.log('[Weather] Failed to force global weather:', result.error);
      }
    } catch (error) {
      console.log('[Weather] Failed to force global weather:', error);
    }
  },
  true,
);
