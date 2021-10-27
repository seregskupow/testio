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
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import AvatarPlaceholder from '@/images/testio_placeholder.jpg';

import Button from '@/components/Controls/Button';
import { useImagePicker } from '@/components/ImagePicker';
import { loadImage } from '@/utils/loadImage';
import FormikLabel from '@/components/FormikComponents/FormikLabel';
import FormikSubmitButton from '@/components/FormikComponents/FormikSubmitButton';
import FormikTextField from '@/components/FormikComponents/FormikTextField';
import { validationSchema } from '@/utils/validationSchemas';
import { Formik, Form } from 'formik';

const imageVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

const Profile = () => {
  const router = useRouter();
  const { loggedIn, authenticationLoading, loading } =
    useSelector(authSelector);
  const {
    name: userName,
    avatar: userAvatar,
    email: userEmail,
  } = useSelector(userSelector);
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const { ImagePicker, setShowAvatarPicker, triggerInput, resetImage, avatar } =
    useImagePicker(userAvatar);
  const [allowChange, setAllowChange] = useState<boolean>(false);
  useEffect(() => {
    if (!loggedIn && !authenticationLoading) router.push('/');
  }, [loggedIn, authenticationLoading, router]);
  return (
    <motion.div
      key='register'
      variants={variants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <Panel padding={20}>
        <div className={styles.profile__wrapper}>
          <div className={`${styles.profile__image}  mr-20`}>
            {userAvatar && (
              <ImagePicker>
                {/* {({
                  setShowAvatarPicker,
                  triggerInput,
                  resetImage,
                  avatar,
                }) => ( */}
                <Fragment>
                  {avatar && (
                    <Fragment>
                      <div
                        onClick={() => allowChange && setShowAvatarPicker(true)}
                        className={`${styles.avatar__wrapper} mb-10 ${
                          allowChange && 'btn__click'
                        }`}
                      >
                        <Image
                          src={avatar}
                          width={300}
                          height={300}
                          layout='responsive'
                          alt='avatar'
                        />
                      </div>
                    </Fragment>
                  )}
                  <AnimatePresence exitBeforeEnter>
                    {allowChange && (
                      <Fragment>
                        <p className='mb-10'>Click on image to configure</p>
                        <div className={`${styles.img__controls} mb-20`}>
                          <Button
                            text='Change image'
                            color={'contrast'}
                            fontSize={1.3}
                            event={triggerInput}
                          />
                          <Button
                            text='Cancel changes'
                            fontSize={1.3}
                            event={resetImage}
                          />
                        </div>
                      </Fragment>
                    )}
                  </AnimatePresence>
                </Fragment>
                {/* )} */}
              </ImagePicker>
            )}
          </div>
          <div className={styles.profile__info}>
            <Formik
              enableReinitialize
              validateOnChange
              initialValues={{
                name: userName,
                email: userEmail,
              }}
              validationSchema={validationSchema.PROFILE}
              onSubmit={async (values) => {
                const { name, email } = values;
              }}
            >
              {({ resetForm }) => (
                <Form autoComplete='off'>
                  <FormikLabel text={'Name'} fontSize={2} />
                  <FormikTextField
                    disabled={!allowChange}
                    type='text'
                    name='name'
                  />
                  <FormikLabel text={'Email'} fontSize={2} />
                  <FormikTextField
                    disabled={!allowChange}
                    type='email'
                    name='email'
                  />
                  {allowChange && (
                    <FormikSubmitButton
                      text={'Save changes'}
                      isSubmitting={loading}
                    />
                  )}
                  <div className={styles.profile__controls}>
                    {allowChange ? (
                      <Button
                        text='Cancel'
                        fontSize={1.3}
                        event={() => {
                          resetImage();
                          resetForm();
                          setAllowChange(false);
                        }}
                      />
                    ) : (
                      <Button
                        text='Edit profile'
                        color={'contrast'}
                        fontSize={1.3}
                        event={() => setAllowChange(true)}
                      />
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
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
