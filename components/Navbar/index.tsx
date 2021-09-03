import Link from 'next/link';
import styles from './navbar.module.scss';
import Logo from '@/components/Logo';
import AccountBtn from '../AccountBtn';
import StyledLink from '../Controls/StyledLink';
const Navbar: React.FC = () => {
  console.log(styles);
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
              <StyledLink href='/blog/blog2'>
                <p className={styles['hotLinks__item__link']}>🔥Bla bla</p>
              </StyledLink>
            </li>
            <li className={styles['hot-links__item']}>
              <StyledLink href='/blog/bloggg'>
                <p className={styles['hotLinks__item__link']}>Bla bla</p>
              </StyledLink>
            </li>
          </ul>
          <AccountBtn />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
