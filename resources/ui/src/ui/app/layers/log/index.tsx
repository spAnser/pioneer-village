import Bug from '@fa/5/solid/bug.svg';
import Clipboard from '@fa/5/solid/clipboard.svg';
import Desktop from '@fa/5/solid/desktop.svg';
import DiceFive from '@fa/5/solid/dice-five.svg';
import DiceFour from '@fa/5/solid/dice-four.svg';
import DiceOne from '@fa/5/solid/dice-one.svg';
import DiceSix from '@fa/5/solid/dice-six.svg';
import DiceThree from '@fa/5/solid/dice-three.svg';
import DiceTwo from '@fa/5/solid/dice-two.svg';
import ExclamationTriangle from '@fa/5/solid/exclamation-triangle.svg';
import InfoSquare from '@fa/5/solid/info-square.svg';
import Info from '@fa/5/solid/info.svg';
import Server from '@fa/5/solid/server.svg';
import TrashAlt from '@fa/5/solid/trash-alt.svg';
import { debounce } from 'lodash';
import { createRef, useCallback, useEffect, useState } from 'react';

import { Delay } from '@lib/functions';

import { conditionalClass } from '@uiLib/helpers';

import { useEscapeKey } from '../../hooks/use-game-events';
import logStore from '../../stores/log-store';
import styles from './styles.module.scss';

export default function Log() {
  const [state, setState] = useState(logStore.getState());
  const refLog = createRef<HTMLDivElement>();

  // console.log('[Log Component] Rendering with show state:', state.show);

  useEffect(() => {
    // console.log('[Log Component] Setting up subscription');
    const unsubscribe = logStore.subscribe((newState) => {
      // console.log('[Log Component] Received state update, show:', newState.show);
      setState(newState);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    logStore.initializeClientHandlers();
    logStore.setLogRef(refLog);
  }, []);

  const handleScrollUpdate = () => {
    if (state.autoScroll) {
      const logRef = refLog.current;
      if (logRef) {
        logRef.scrollTo({ top: logRef.scrollHeight });
      }
    }
  };

  // Handle escape key
  const onEscape = useCallback(() => {
    logStore.close();
    setTimeout(async () => {
      handleScrollUpdate();
      await Delay(100);
      handleScrollUpdate();
    }, 400);
  }, [handleScrollUpdate]);

  useEscapeKey(state.show, onEscape);

  // The async Clipboard API is blocked by CEF's permissions policy inside RedM's NUI
  // frame, so we fall back to the legacy textarea + execCommand('copy') trick.
  const copyToClipboard = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  const copyEntry = (entry: UI.Log.LogData) => {
    copyToClipboard(entry.message);
  };

  const addMessage = (source: UI.Log.Source, data: UI.Log.Data) => {
    logStore.addMessage(source, data);
  };

  const randomizeColors = () => {
    logStore.randomizeColors();
  };

  useEffect(() => {
    handleScrollUpdate();
  }, [state.messages, state.autoScroll]);

  const handleMousewheel = debounce((e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY < 0) {
      logStore.setAutoScroll(false);
    } else {
      const logRef = refLog?.current;
      if (logRef) {
        window.requestAnimationFrame(() => {
          const autoScroll = logRef.scrollTop >= logRef.scrollHeight - logRef.clientHeight - e.deltaY;
          if (autoScroll !== state.autoScroll) {
            logStore.setAutoScroll(autoScroll);
          }
        });
      }
    }
  }, 125);

  const clearFilter = () => {
    logStore.clearFilter();
  };

  const toggleResource = (resource: string) => {
    logStore.toggleResource(resource);
  };

  const toggleReverseResource = (resource: string) => {
    logStore.toggleReverseResource(resource);
  };

  const getClassName = (resource: string) => {
    if (state.filter.has(resource)) {
      return 'active';
    }
    if (!state.reverseFilter.has(resource) && state.filter.size === 0) {
      return '';
    }
    return 'inactive';
  };

  const shouldShow = (resource: string) => {
    if (state.filter.size > 0 && !state.filter.has(resource)) {
      return false;
    }
    if (state.reverseFilter.has(resource)) {
      return false;
    }
    return true;
  };

  const randomDice = () => {
    const dice = [DiceOne, DiceTwo, DiceThree, DiceFour, DiceFive, DiceSix];
    const random = Math.floor(Math.random() * 6);
    return dice[random];
  };

  const Dice = randomDice();

  return (
    <>
      <div
        className={conditionalClass(styles.frame, {
          [styles.active]: state.show,
        })}
      >
        <div
          id="log"
          className={conditionalClass(styles.list, {
            [styles.active]: state.show,
          })}
          ref={refLog}
          onWheel={handleMousewheel}
        >
          {state.messages.map(
            (entry, index) =>
              shouldShow(entry.resource) && (
                <div className={styles.item} key={index}>
                  <div className={styles.icons}>
                    <i data-source={entry.source}>
                      {entry.source === 'server' && <Server />} {entry.source === 'client' && <Desktop />}
                    </i>
                    <i className={styles.copyIcon} onClick={() => copyEntry(entry)}>
                      <Clipboard />
                    </i>
                  </div>
                  <span style={{ backgroundColor: state.colors[entry.resource].hsl }}>
                    {entry.resource}
                    <br />
                    {new Date(entry.timestamp).toLocaleTimeString('en-GB')}.
                    {String(entry.timestamp % 1000).padStart(3, '0')}
                  </span>
                  {entry._type && (
                    <span
                      className={conditionalClass(styles.logType, {
                        [styles.info]: entry._type === 'info',
                        [styles.warn]: entry._type === 'warn',
                        [styles.error]: entry._type === 'error',
                      })}
                    >
                      {entry._type === 'info' && <InfoSquare />}
                      {entry._type === 'warn' && <ExclamationTriangle />}
                      {entry._type === 'error' && <Bug />}
                    </span>
                  )}
                  <pre>{entry.message}</pre>
                </div>
              ),
          )}
          {state.messages.length === 0 && (
            <div className={styles.item}>
              <i data-source="client">
                <Info />
              </i>
              <pre>No messages</pre>
            </div>
          )}
        </div>
      </div>
      {state.show && (
        <div className={styles.filter}>
          <div className={`${styles.filterItem} ${styles.red}`}>
            <TrashAlt onClick={() => logStore.clearMessages()} />
          </div>
          <div className={styles.filterItem}>
            <Dice className="dice" onClick={randomizeColors} />
          </div>
          <div
            className={conditionalClass(styles.filterItem, {
              [styles.inactive]: !(
                state.filter.size === 0 && state.reverseFilter.size !== Object.values(state.colors).length
              ),
            })}
            onClick={clearFilter}
          >
            all
          </div>
          {Object.entries(state.colors).map(([resource, color]) => (
            <div
              key={resource}
              style={{ backgroundColor: color.hsl }}
              className={conditionalClass([styles.filterItem, getClassName(resource)], {
                [styles.inactive]: !shouldShow(resource),
              })}
              onClick={() => {
                toggleResource(resource);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                toggleReverseResource(resource);
              }}
            >
              {resource}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
