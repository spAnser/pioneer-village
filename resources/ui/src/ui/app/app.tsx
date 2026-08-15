import ExclamationTriangle from '@fa/5/solid/exclamation-triangle.svg';
import WifiSlash from '@fa/5/solid/signal-slash.svg';
// @ts-ignore
import 'normalize.css';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button, DisabledLayers, DisconnectedSocket } from '@styled/core';

import { uiSize } from '@uiLib/helpers';

import styles from './app.module.scss';
import { Catcher } from './catcher';
import { SocketProvider } from './contexts/socket-context';
import { UIComponents } from './types';

String.prototype.GetHashKey = function (this: string): number {
  const keyLowered = this.toLowerCase();
  const length = this.length;
  let hash, i;

  for (hash = i = 0; i < length; i++) {
    hash += keyLowered.charCodeAt(i);
    hash += hash << 10;
    hash ^= hash >>> 6;
  }

  hash += hash << 3;
  hash ^= hash >>> 11;
  hash += hash << 15;

  return hash;
};

// @ts-expect-error
const requiredLayers = require.context('./layers', true, /index\.tsx$/);
const namedLayers: Record<string, React.ComponentType<any>> = {};
for (const layer of requiredLayers.keys()) {
  const layerModule = requiredLayers(layer);
  const name = layer.split('/')[1];
  // Only use default export for React components, not the whole module
  if (layerModule.default && typeof layerModule.default === 'function') {
    namedLayers[name] = layerModule.default;
  } else {
    console.warn(`Layer ${name} does not have a valid default export`, layerModule);
  }
}

interface CrashEntry {
  timestamp: number;
}

interface CrashData {
  [layerName: string]: CrashEntry[];
}

// @ts-ignore
window.GetHashKey = (text: string): number => {
  const keyLowered = text.toLowerCase();
  const length = text.length;
  let hash, i;

  for (hash = i = 0; i < length; i++) {
    hash += keyLowered.charCodeAt(i);
    hash += hash << 10;
    hash ^= hash >>> 6;
  }

  hash += hash << 3;
  hash ^= hash >>> 11;
  hash += hash << 15;

  return hash;
};

export default function App({ socket }: UIComponents.App.Props) {
  const isFramed = useMemo(() => !!window.frameElement, []);
  const [bg, setBG] = useState(() => (!isFramed ? 'daytime' : ''));
  const [disabledLayers, setDisabledLayers] = useState<Set<string>>(new Set());
  const [socketConnected, setSocketConnected] = useState(socket.connected);

  socket.on('connect_error', () => {
    setSocketConnected(false);
    console.log(`setSocketConnected(false)`);
  });
  socket.on('disconnect', () => {
    setSocketConnected(false);
    console.log(`setSocketConnected(false)`);
  });
  socket.on('connect', () => {
    setSocketConnected(true);
    console.log(`setSocketConnected(true)`);
  });

  const getCrashData = useCallback<() => CrashData>(() => {
    try {
      const data = sessionStorage.getItem('ui-crash-data');
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Failed to get crash data:', error);
      return {};
    }
  }, []);

  const cleanOldCrashes = useCallback<(crashes: CrashEntry[]) => CrashEntry[]>((crashes) => {
    const oneMinuteAgo = Date.now() - 60 * 1000;
    return crashes.filter((crash) => crash.timestamp > oneMinuteAgo);
  }, []);

  const updateDisabledLayers = useCallback<() => void>(() => {
    const crashData = getCrashData();
    const newDisabledLayers = new Set<string>();

    for (const [layerName, crashes] of Object.entries(crashData)) {
      // Handle both old format (numbers) and new format (arrays)
      let recentCrashes: CrashEntry[] = [];

      if (Array.isArray(crashes)) {
        // New format - filter by time
        recentCrashes = cleanOldCrashes(crashes);
      }

      // Disable layer if it has 3 or more crashes in the last minute
      if (recentCrashes.length >= 3) {
        newDisabledLayers.add(layerName);
        console.warn(`Layer "${layerName}" disabled due to ${recentCrashes.length} crashes in the last minute`);
      }
    }

    // Update state if disabled layers changed
    setDisabledLayers((prev) => {
      if (newDisabledLayers.size !== prev.size || [...newDisabledLayers].some((layer) => !prev.has(layer))) {
        return newDisabledLayers;
      }
      return prev;
    });
  }, [getCrashData, cleanOldCrashes]);

  useEffect(() => {
    updateDisabledLayers();
  }, [updateDisabledLayers]);

  const isLayerDisabled = useCallback<(layerName: string) => boolean>(
    (layerName) => {
      return disabledLayers.has(layerName);
    },
    [disabledLayers],
  );

  const renderLayers = useMemo((): [Record<string, React.ComponentType<any>>, string[]] => {
    const layersEnabled: Record<string, React.ComponentType<any>> = {};
    const layersDisabled: string[] = [];

    for (const [name, LayerComponent] of Object.entries(namedLayers)) {
      if (isLayerDisabled(name)) {
        layersDisabled.push(name);
      } else {
        layersEnabled[name] = LayerComponent;
      }
    }

    return [layersEnabled, layersDisabled];
  }, [isLayerDisabled]);

  const [layersEnabled, layersDisabled] = renderLayers;

  return (
    <SocketProvider socket={socket}>
      <div
        id="app"
        className={`${bg === 'daytime' ? styles.appDaytime : bg === 'nighttime' ? styles.appNighttime : bg === 'inside' ? styles.appInside : ''} ${styles.appRatio16x9}`}
      >
        {!isFramed && (
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
            <Button onClick={() => setBG('daytime')}>Daytime</Button>
            <Button onClick={() => setBG('inside')}>Inside</Button>
            <Button onClick={() => setBG('nighttime')}>Nighttime</Button>
            {disabledLayers.size > 0 && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                Disabled: {Array.from(disabledLayers).join(', ')}
              </div>
            )}
          </div>
        )}
        {layersDisabled.length > 0 && (
          <DisabledLayers>
            <p>
              <ExclamationTriangle width={uiSize(12)} />
            </p>
            <p>Broken UI Layers:</p>
            {layersDisabled.map((name) => (
              <p key={name}>{name}</p>
            ))}
          </DisabledLayers>
        )}
        {!socketConnected && (
          <DisconnectedSocket>
            <p>
              <WifiSlash width={uiSize(19)} />
            </p>
          </DisconnectedSocket>
        )}
        {Object.entries(layersEnabled).map(([name, LayerComponent]) => {
          return (
            <Catcher key={name} layer={name} reloadWindow={isFramed}>
              <LayerComponent />
            </Catcher>
          );
        })}
      </div>
    </SocketProvider>
  );
}
