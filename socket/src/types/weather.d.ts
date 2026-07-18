// Socket perspective - what the socket server receives
declare namespace SocketIn {
  interface FromClient {
    ['weather.request-grid']: (callback: (result: { grid: { x: number; y: number; weather: string; variant: string | null; biome: string; rainRate: number; }[][] }) => void) => void;
    ['weather.admin.get-grid-state']: (callback: (result: { grid: { x: number; y: number; weather: string; variant: string | null; biome: string; rainRate: number; }[][]; frozen: boolean; globalOverride: string | null; }) => void) => void;
    ['weather.admin.set-biome-weather']: (biome: string, weather: string, callback: (result: { success: boolean; updatedCount?: number; error?: string; }) => void) => void;
    ['weather.admin.regenerate-grid']: (seed: number | undefined, callback: (result: { success: boolean; error?: string; }) => void) => void;
    ['weather.admin.freeze-weather']: (frozen: boolean, callback: (result: { success: boolean; error?: string; }) => void) => void;
    ['weather.admin.force-global']: (weather: string | null, callback: (result: { success: boolean; error?: string; }) => void) => void;
  }

  interface FromGameServer {
    ['weather.admin.get-grid-state']: (callback: (result: { grid: { x: number; y: number; weather: string; variant: string | null; biome: string; rainRate: number; }[][]; frozen: boolean; globalOverride: string | null; }) => void) => void;
    ['weather.admin.set-biome-weather']: (biome: string, weather: string, callback: (result: { success: boolean; updatedCount?: number; error?: string; }) => void) => void;
    ['weather.admin.regenerate-grid']: (seed: number | undefined, callback: (result: { success: boolean; error?: string; }) => void) => void;
    ['weather.admin.freeze-weather']: (frozen: boolean, callback: (result: { success: boolean; error?: string; }) => void) => void;
    ['weather.admin.force-global']: (weather: string | null, callback: (result: { success: boolean; error?: string; }) => void) => void;
  }
}

// Socket perspective - what the socket server sends
declare namespace SocketOut {
  interface ToClient {
    'weather.grid-update': (grid: { x: number; y: number; weather: string; variant: string | null; biome: string; rainRate: number; }[][]) => void;
    'weather.freeze-state': (frozen: boolean) => void;
    'weather.global-override': (weather: string | null) => void;
  }
}
