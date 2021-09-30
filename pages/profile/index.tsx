import Layout from '@/components/Layout';
import Panel from '@/components/Panel';
import { wrapper } from '@/store/index';
import { authSelector } from '@/store/slices/auth.slice';
import { userSelector } from '@/store/slices/user.slice';
import { ensureAuth } from '@/utils/ensureAuth';
import { PageComponent } from 'interfaces';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './profile.module.scss';
import Image from 'next/image';
import ProfileLayout, { variants } from '@/components/ProfileLayout';
import { motion } from 'framer-motion';
import AvatarPlaceholder from '@/images/testio_placeholder.jpg';

import { AnimatePresence } from 'framer-motion';
import Button from '@/components/Controls/Button';
import ImagePicker from '@/components/ImagePicker';
import { loadImage } from '@/utils/loadImage';

const Profile = () => {
  const router = useRouter();
  const { loggedIn, authenticationLoading } = useSelector(authSelector);
  const { name, avatar: userAvatar } = useSelector(userSelector);
  const [newAvatar, setNewAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (!loggedIn && !authenticationLoading) router.push('/');
  }, [loggedIn, authenticationLoading, router]);
  useEffect(() => {}, [userAvatar]);
  return (
    <motion.div
      key='register'
      variants={variants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <Panel padding={20}>
        {userAvatar && (
          <ImagePicker initialImage={userAvatar} getImage={setNewAvatar}>
            {({ setShowAvatarPicker, triggerInput, resetImage, avatar }) => (
              <Fragment>
                {avatar && (
                  <Fragment>
                    <div
                      onClick={() => setShowAvatarPicker(true)}
                      className={`${styles.avatar__wrapper} mb-10 btn__click`}
                    >
                      <Image
                        src={avatar}
                        width={300}
                        height={300}
                        layout='responsive'
                        alt='avatar'
                      />
                    </div>
                    <p className='mb-10'>Click on image to configure</p>
                  </Fragment>
                )}
                <div className={`${styles.img__controls} mb-20`}>
                  <Button text='Choose image' event={triggerInput} />
                  <Button text='Reset image' event={resetImage} />
                </div>
              </Fragment>
            )}
          </ImagePicker>
        )}
        <h1>Hello, {name}!</h1>
      </Panel>
    </motion.div>
  );
};

Profile.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <ProfileLayout>{page}</ProfileLayout>
    </Layout>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    if (!(await ensureAuth(ctx))) {
      return {
        redirect: {
          permanent: true,
          destination: '/auth/login',
        },
        props: {},
      };
    }

    return {
      props: {},
    };
  });
