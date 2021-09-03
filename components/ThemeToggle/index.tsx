import styles from './themeToggle.module.scss';
import { FunctionComponent, useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import Switch from '@/components/Controls/Switch';

const ThemeToggle: FunctionComponent<any> = () => {
  const [isDark, setDark] = useState<boolean>(false);
  useEffect(() => {
    const theme: string | null = localStorage.getItem('theme');
    if (theme) {
      setDark(theme === 'dark');
      return;
    }
  }, []);
  const setDarkTheme = () => {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    setDark(true);
  };
  const setLightTheme = () => {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    setDark(false);
  };
  const themeToggle = () => {
    if (document.body.classList.contains('dark')) {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  };

  return (
    <div className={styles.theme__toggle}>
      <span>Тема </span>
      <button
        type='button'
        className={`${styles.theme__btn} ${styles.dark__toggle} btn__click`}
        onClick={setDarkTheme}
      >
        <i>
          <FaMoon />
        </i>
      </button>
      {isDark !== null && (
        <Switch checked={isDark} callback={() => themeToggle()} />
      )}
      <button
        type='button'
        className={`${styles.theme__btn} ${styles.light__toggle} btn__click`}
        onClick={setLightTheme}
      >
        <i>
          <FaSun />
        </i>
      </button>
    </div>
  );
};

export default ThemeToggle;
