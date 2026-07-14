import { logInfoC, logInfoS } from '../helpers';
import weatherManager, { toBiomeType, toWeatherType, BiomeType, GridCell } from '../managers/weather';
import { serverNamespace, userNamespace } from '../server';

const getGridState = (cb: (result: { grid: GridCell[][]; frozen: boolean; globalOverride: string | null; }) => void = () => {}) => {
  cb({
    grid: weatherManager.getBiomeWeatherGrid().getGrid(),
    frozen: weatherManager.isWeatherFrozen(),
    globalOverride: weatherManager.getGlobalWeatherOverride(),
  });
};

const setBiomeWeather = (biome: string, weather: string, cb: (result: { success: boolean; updatedCount?: number; error?: string; }) => void = () => {}) => {
  const biomeType = toBiomeType(biome);
  const weatherType = toWeatherType(weather);

  if (!biomeType) {
    cb({ success: false, error: `Invalid biome type: ${biome}` });
    return;
  }

  if (!weatherType) {
    cb({ success: false, error: `Invalid weather type: ${weather}` });
    return;
  }

  const updatedCount = weatherManager.getBiomeWeatherGrid().overrideBiomeWeather(biomeType, weatherType);

  if (updatedCount > 0) {
    const grid = weatherManager.getBiomeWeatherGrid().getGrid();
    userNamespace.emit('__client__', 'weather.grid-update', grid);
  }

  cb({ success: updatedCount > 0, updatedCount });
};

const regenerateGrid = (seed: number | undefined, cb: (result: { success: boolean; error?: string; }) => void = () => {}) => {
  if (seed !== undefined && !Number.isFinite(seed)) {
    cb({ success: false, error: 'Seed must be a finite number' });
    return;
  }

  weatherManager.regenerateGrid(seed);

  const grid = weatherManager.getBiomeWeatherGrid().getGrid();
  userNamespace.emit('__client__', 'weather.grid-update', grid);

  cb({ success: true });
};

const freezeWeather = (frozen: boolean, cb: (result: { success: boolean; error?: string; }) => void = () => {}) => {
  weatherManager.freezeWeather(frozen);

  userNamespace.emit('__client__', 'weather.freeze-state', frozen);

  cb({ success: true });
};

const forceGlobal = (weather: string | null, cb: (result: { success: boolean; error?: string; }) => void = () => {}) => {
  let weatherType = null;

  if (weather !== null) {
    weatherType = toWeatherType(weather);
    if (!weatherType) {
      cb({ success: false, error: `Invalid weather type: ${weather}` });
      return;
    }
  }

  weatherManager.forceGlobalWeather(weatherType);

  userNamespace.emit('__client__', 'weather.global-override', weatherType);

  cb({ success: true });
};

export default () => {
  weatherManager.initialize();

  // Evolve weather every 5 minutes (if not frozen)
  setInterval(() => {
    if (!weatherManager.isWeatherFrozen() && !weatherManager.getGlobalWeatherOverride()) {
      weatherManager.evolveWeather();
      const grid = weatherManager.getBiomeWeatherGrid().getGrid();
      userNamespace.emit('__client__', 'weather.grid-update', grid);
    }
  }, 5 * 60 * 1000);

  userNamespace.on('connection', (socket) => {
    logInfoC('[Weather]', 'User connected', socket.id, socket.data);

    socket.on('weather.request-grid', (cb = () => {}) => {
      cb({ grid: weatherManager.getBiomeWeatherGrid().getGrid() });
    });

    socket.on('weather.admin.get-grid-state', getGridState);
    socket.on('weather.admin.set-biome-weather', setBiomeWeather);
    socket.on('weather.admin.regenerate-grid', regenerateGrid);
    socket.on('weather.admin.freeze-weather', freezeWeather);
    socket.on('weather.admin.force-global', forceGlobal);
  });

  serverNamespace.on('connection', (socket) => {
    logInfoS('[Weather]', 'Game server connected');

    socket.on('weather.admin.get-grid-state', getGridState);
    socket.on('weather.admin.set-biome-weather', setBiomeWeather);
    socket.on('weather.admin.regenerate-grid', regenerateGrid);
    socket.on('weather.admin.freeze-weather', freezeWeather);
    socket.on('weather.admin.force-global', forceGlobal);
  });
};
