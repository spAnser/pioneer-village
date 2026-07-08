import { useState, useEffect } from 'react';
import CheckCircle from '@fa/5/solid/check-circle.svg';
import TimesCircle from '@fa/5/solid/times-circle.svg';
import InfoCircle from '@fa/5/solid/info-circle.svg';
import notificationStore from '../../stores/notification-store';
import styles from './styles.module.scss';

const typeIcons: Record<UI.Notification.Type, typeof CheckCircle> = {
  success: CheckCircle,
  error: TimesCircle,
  info: InfoCircle,
};

export default function Notification() {
  const [state, setState] = useState(notificationStore.getState());

  useEffect(() => {
    const unsubscribe = notificationStore.subscribe(setState);
    return unsubscribe;
  }, []);

  return (
    <div className={styles.stack}>
      {state.activeNotifications.map((notification) => {
        const Icon = typeIcons[notification.type];
        return (
          <div
            key={notification.id}
            className={`${styles.notif} ${styles[notification.type]} ${notification.active ? styles.active : ''}${
              notification.centered ? ` ${styles.centered}` : ''
            }`}
          >
            <Icon className={styles.icon} />
            {notification.text}
          </div>
        );
      })}
    </div>
  );
}
