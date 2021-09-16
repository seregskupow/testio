/* eslint-disable no-use-before-define */
import styles from './accountbtn.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { CgChevronDown } from 'react-icons/cg';
import { RiAccountBoxLine, RiLogoutCircleRLine } from 'react-icons/ri';
import { MdLanguage } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillFormatPainter } from 'react-icons/ai';
import Link from 'next/link';
import { userSelector } from '@/store/slices/user.slice';
import ThemeToggle from '@/components/ThemeToggle';
import { authSelector } from '@/store/slices/auth.slice';
// import ThemeToggle from '../ThemeToggle';
// import LanguageSwitcher from '../LanguageSwitcher';

function AccountBtn() {
  const { loggedIn } = useSelector(authSelector);
  // const loggedIn: boolean = useSelector((state) => state.user.loggedInenticated);
  // const userName: string = useSelector((state) => state.user.userName);
  // const userAvatar: string = useSelector((state) => state.user.userAvatar);
  const [open, setOpen] = useState<boolean>(false);
  const accBtn = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (accBtn.current?.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };

  return (
    <div className={styles.user__acount} ref={accBtn}>
      <button
        type='button'
        className={`${styles.user__acount__btn} ${
          loggedIn && styles.logged
        } btn__click`}
        onClick={() => setOpen(!open)}
      >
        {loggedIn ? (
          <UserBtn />
        ) : (
          <i>
            <FaUser />
          </i>
        )}
        <i>
          <CgChevronDown data-open={open} />
        </i>
      </button>
      <AnimatePresence exitBeforeEnter>
        {open && <DropdownMenu loggedIn={loggedIn} />}
      </AnimatePresence>
    </div>
  );
}
export default AccountBtn;

const UserBtn = () => {
  const { avatar: userAvatar, name: userName } = useSelector(userSelector);
  const [imgError, setImgError] = useState<boolean>(false);
  const [userImage, setUserImg] = useState<string>('');

  useEffect(() => {
    const img = new Image();
    img.onerror = () => {
      setImgError(true);
    };
    console.log({ userAvatar });
    img.src = userAvatar;
    setUserImg(userAvatar);
    setImgError(false);
  }, [userAvatar, setUserImg, setImgError]);
  return (
    <div className={styles.user__logged}>
      {imgError === true ? (
        <ShortLogo userName={userName} />
      ) : (
        <img src={userImage} alt='' />
      )}
      <span>{userName}</span>
    </div>
  );
};
interface DropdownItemProps {
  link?: string;
  icon: any;
  children: React.ReactNode;
}
const DropdownMenu = ({ loggedIn }: { loggedIn: boolean }) => {
  const DropdownItem: React.FC<DropdownItemProps> = ({
    link,
    icon,
    children,
  }) => {
    if (link) {
      return (
        <Link href={link}>
          <a className={styles.dropdown__item}>
            <span className={styles.item__left__icon}>{icon}</span>
            <span>{children}</span>
          </a>
        </Link>
      );
    }
    return (
      <div className={styles.dropdown__item}>
        <span className={styles.item__left__icon}>{icon}</span>
        {children}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      transition={{ duration: 0.1 }}
      className={styles.user__dropdown}
    >
      {loggedIn && (
        <DropdownItem link='/account' icon={<RiAccountBoxLine />}>
          Account
        </DropdownItem>
      )}
      <DropdownItem icon={<AiFillFormatPainter />}>
        <ThemeToggle />
      </DropdownItem>
      <DropdownItem icon={<MdLanguage />}>
        {/* <span>Мова</span> <LanguageSwitcher /> */}
      </DropdownItem>
      {loggedIn ? (
        <DropdownItem link='#' icon={<RiLogoutCircleRLine />}>
          Logout
        </DropdownItem>
      ) : (
        <DropdownItem link='/auth/login' icon={<RiLogoutCircleRLine />}>
          Login/Register
        </DropdownItem>
      )}
    </motion.div>
  );
};

type shortLogo = {
  userName: string;
};
function ShortLogo({ userName }: shortLogo) {
  // Получение первых букв юзернейма
  const wordsFromUsername: Array<string> = userName
    .split(' ')
    .map((item) => item.charAt(0));
  return (
    <p>
      {wordsFromUsername[0]}
      {wordsFromUsername[1]}
    </p>
  );
}
