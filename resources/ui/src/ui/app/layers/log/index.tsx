import Bug from '@fa/5/solid/bug.svg';
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
            ({ source, resource, _type, message }, index) =>
              shouldShow(resource) && (
                <div className={styles.item} key={index}>
                  <i data-source={source}>
                    {source === 'server' && <Server />} {source === 'client' && <Desktop />}
                  </i>
                  <span style={{ backgroundColor: state.colors[resource].hsl }}>{resource}</span>
                  {_type && (
                    <span
                      className={conditionalClass(styles.logType, {
                        [styles.info]: _type === 'info',
                        [styles.warn]: _type === 'warn',
                        [styles.error]: _type === 'error',
                      })}
                    >
                      {_type === 'info' && <InfoSquare />}
                      {_type === 'warn' && <ExclamationTriangle />}
                      {_type === 'error' && <Bug />}
                    </span>
                  )}
                  <pre>{message}</pre>
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
