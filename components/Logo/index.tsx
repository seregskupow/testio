import styles from './logo.module.scss';
import { FunctionComponent } from 'react';
import Link from 'next/link';

type linkType = {
  // eslint-disable-next-line react/require-default-props
  color?: 'black' | 'white';
};

const Logo: FunctionComponent<linkType> = ({ color = 'white' }) => {
  return (
    <Link href='/'>
      <a className={`${styles.logo} ${styles[`logo_${color}`]}`}>
        <span>T</span>est.<b>io</b>
      </a>
    </Link>
  );
};
export default Logo;
