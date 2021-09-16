import { messageSelector } from '@/store/slices/message.slice';
import React from 'react';
import { useSelector } from 'react-redux';
import Panel from '@/components/Panel';
import styles from './toast.module.scss';
function Toast() {
  const { messageArr } = useSelector(messageSelector);

  return (
    messageArr?.length > 0 && (
      <div className={styles.notification__container}>
        <Panel>
          {messageArr?.length &&
            messageArr.map((message) => (
              <p
                className={`${styles.notification} ${styles[message.type]}`}
                key={Math.random()}
              >
                {message.msg}
              </p>
            ))}
        </Panel>
      </div>
    )
  );
}

export default Toast;
