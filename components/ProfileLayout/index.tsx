import React, { Fragment } from 'react';
import StyledLink from '@/components/Controls/StyledLink';
import Panel from '@/components/Panel';
import styles from './profileLayout.module.scss';
import { AnimatePresence } from 'framer-motion';
import { RiAccountCircleLine } from 'react-icons/ri';
import { MdBookmarkBorder, MdStars, MdDoneAll } from 'react-icons/md';
const ProfileLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Fragment>
      <div className={styles.profile__layout}>
        <div className={styles.sidebar}>
          <Panel>
            <div className={styles.menu}>
              <StyledLink
                href='/profile'
                className='mb-10 btn__click'
                checkActive={true}
              >
                <RiAccountCircleLine />
                Profile
              </StyledLink>
              <StyledLink
                href='/profile/my_quizes'
                className='mb-10 btn__click'
                checkActive={true}
              >
                <MdStars />
                My quizez
              </StyledLink>
              <StyledLink
                href='/profile/saved_quizes'
                className='mb-10 btn__click'
                checkActive={true}
              >
                <MdBookmarkBorder />
                Saved quizez
              </StyledLink>
              <StyledLink
                href='/profile/completed_quizes'
                className='btn__click'
                checkActive={true}
              >
                <MdDoneAll />
                Completed quizez
              </StyledLink>
            </div>
          </Panel>
        </div>
        <div className={styles.content}>
          <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileLayout;

export const variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};
