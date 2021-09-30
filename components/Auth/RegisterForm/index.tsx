import * as yup from 'yup';
import inputs from '../inputs.module.scss';
import styles from './registerForm.module.scss';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Panel from '@/components/Panel';
import FormikLabel from '@/components/FormikComponents/FormikLabel';
import FormikSubmitButton from '@/components/FormikComponents/FormikSubmitButton';
import FormikTextField from '@/components/FormikComponents/FormikTextField';
import { Formik, Form } from 'formik';
import { User } from '@/store/slices/user.slice';
import { useActions } from '@/store/useActions';
import { axiosClient } from '@/utils/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import ProviderButtons from '@/components/Auth/ProvidersButtons';
import StyledLink from '@/components/Controls/StyledLink';
import { authSelector, RegisterDTO } from '@/store/slices/auth.slice';
import { useSelector } from 'react-redux';
import Button from '@/components/Controls/Button';
import Image from 'next/image';
import AvatarPlaceholder from '@/images/testio_placeholder.jpg';
import { checkIfImage } from '@/utils/imageExtention';
import { validationSchema } from '@/utils/validationSchemas';
import ImagePicker from '@/components/ImagePicker';

export default function RegisterForm() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string | null>(null);
  const { loading, loggedIn } = useSelector(authSelector);
  const { registerUser } = useActions();
  useEffect(() => {
    if (loggedIn && !loading) router.push('/');
  }, [loggedIn, loading, router]);
  // useEffect(() => {
  //   if (avatar !== AvatarPlaceholder.src && avatar !== null) {
  //     setShowAvatarPicker(true);
  //   }
  // }, [avatar]);

  return (
    <div className={styles.register__form}>
      <Panel>
        <div className={styles.register__inner}>
          <h1 className={styles.register__title}>Register</h1>
          <ImagePicker
            initialImage={AvatarPlaceholder.src}
            getImage={setAvatar}
          >
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

          <Formik
            validateOnChange
            initialValues={{
              name: '',
              email: '',
              password: '',
              passwordConfirmation: '',
            }}
            validationSchema={validationSchema.REGISTER}
            onSubmit={async (values) => {
              const { name, email, password } = values;
              registerUser({
                name,
                email,
                password,
                avatar: avatar as string,
              });
            }}
          >
            {() => (
              <Form autoComplete='off' className={inputs.auth__form}>
                <FormikLabel text={'Enter Credentials'} fontSize={2} />
                <FormikTextField type='text' name='name' />
                <FormikLabel text={'Enter email'} fontSize={2} />
                <FormikTextField type='email' name='email' />
                <FormikLabel text={'Enter password'} fontSize={2} />
                <FormikTextField type='password' name='password' />
                <FormikLabel text={'Repeat password'} fontSize={2} />
                <FormikTextField type='password' name='passwordConfirmation' />
                <FormikSubmitButton text={'Register'} isSubmitting={loading} />
              </Form>
            )}
          </Formik>

          <ProviderButtons />
          <StyledLink href='/auth/login'>
            <h1>Login</h1>
          </StyledLink>
        </div>
      </Panel>
    </div>
  );
}
