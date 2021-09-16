import Link from 'next/link';
import styles from './navbar.module.scss';
import Logo from '@/components/Logo';
import AccountBtn from '../AccountBtn';
import StyledLink from '../Controls/StyledLink';
import { useSelector } from 'react-redux';
import React from 'react';
import { authSelector } from '@/store/slices/auth.slice';
const Navbar: React.FC = () => {
  const { loggedIn } = useSelector(authSelector);
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <div className={styles.header__left}>
          <Logo color='white' />
          {/* <Search /> */}
        </div>
        <div className={styles.header__right}>
          <ul className={styles['hot-links']}>
            <li className={styles['hot-links__item']}>
              <StyledLink href='/test'>
                <p className={styles['hotLinks__item__link']}>🔥index2</p>
              </StyledLink>
            </li>
            <li className={styles['hot-links__item']}>
              <StyledLink href='/auth/login'>
                <p className={styles['hotLinks__item__link']}>LOGG</p>
              </StyledLink>
            </li>
            {!loggedIn && (
              <React.Fragment>
                <li className={`${styles['hot-links__item']} btn__click`}>
                  <Link href='/auth/login'>
                    <a className='primary__btn'>Login</a>
                  </Link>
                </li>
                <li className={`${styles['hot-links__item']} btn__click`}>
                  <Link href='/auth/register'>
                    <a className='secondary__btn'>Register</a>
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
          <AccountBtn />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
