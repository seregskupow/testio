import styles from './switch.module.scss';
import { useState, useEffect, useRef } from 'react';

interface SwitchProps {
  checked?: boolean;
  callback: () => void;
}
const Switch: React.FC<SwitchProps> = ({ checked = false, callback }) => {
  const [switched, setSwitch] = useState(checked);
  const sw = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setSwitch(checked);
  }, [checked]);
  return (
    <button
      type='button'
      className={styles.switch}
      data-switch={switched}
      onClick={() => {
        setSwitch(!switched);
        callback();
      }}
    >
      <div className={styles.switch__thumb} ref={sw} data-swicthed={switched}>
        <div className={styles.switch__thumb__dot}></div>
      </div>
      <div className={styles.switch__track}></div>
    </button>
  );
};

export default Switch;
