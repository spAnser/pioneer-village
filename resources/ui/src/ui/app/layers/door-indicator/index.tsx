import LockSVG from '@fa/5/solid/lock.svg';
import UnlockSVG from '@fa/5/solid/unlock.svg';
import { useState, useEffect } from 'react';
import { onClient } from '@lib/ui';

import styles from './styles.module.scss';

export default function DoorIndicator() {
  const [indicators, setIndicators] = useState<UI.Door.Indicator[]>([]);

  useEffect(() => {
    onClient('doors.indicator', setIndicators);
  }, []);

  return (
    <>
      {indicators.map((indicator) => (
        <div
          key={indicator.doorHash}
          className={`${styles.indicator} ${indicator.locked ? styles.locked : styles.unlocked}`}
          style={{
            left: `${indicator.screenX * 100}%`,
            top: `${indicator.screenY * 100}%`,
            transform: 'translate(-50%, -50%)',
            opacity: Math.max(0.4, 1 - indicator.distance / 4),
          }}
        >
          <div className={styles.iconWrapper}>
            {indicator.locked ? <LockSVG /> : <UnlockSVG />}
          </div>
          {indicator.canInteract && (
            <div className={styles.keyHints}>
              <span className={styles.keyHint}>[E] {indicator.locked ? 'Unlock' : 'Lock'}</span>
              {indicator.lockpickable && (
                <span className={styles.keyHint}>[G] Lockpick</span>
              )}
              {indicator.devOpen && (
                <span className={styles.keyHint}>[F] {indicator.locked ? 'Dev Open' : 'Dev Close'}</span>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
