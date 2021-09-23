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
import AvatarPicker, {
  defaultImgOptions,
  IimgOptions,
} from '@/components/AvatarPicker';
import Button from '@/components/Controls/Button';
import Image from 'next/image';
import AvatarPlaceholder from '@/images/testio_placeholder.jpg';

export default function RegisterForm() {
  const router = useRouter();
  let imageUpload: any;
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(
    AvatarPlaceholder.src
  );
  const [imgOptions, setImageoptions] =
    useState<IimgOptions>(defaultImgOptions);
  const [avatar, setAvatar] = useState<string | null>(AvatarPlaceholder.src);
  const { loading, loggedIn } = useSelector(authSelector);
  const { registerUser } = useActions();
  const triggerInput = () => {
    imageUpload?.click();
  };
  useEffect(() => {
    if (loggedIn && !loading) router.push('/');
  }, [loggedIn, loading, router]);
  // useEffect(() => {
  //   if (avatar !== AvatarPlaceholder.src && avatar !== null) {
  //     setShowAvatarPicker(true);
  //   }
  // }, [avatar]);
  const validationSchema = yup.object({
    name: yup
      .string()
      .min(6, 'Min length should be 6')
      .max(20, 'Max length should be 15')
      .required(),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Min length should be 8')
      .max(15, 'Max length should be 15')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        'Password is invalid'
      )
      .required('Password is required'),
    passwordConfirmation: yup
      .string()
      .min(8, 'Min length should be 8')
      .max(15, 'Min length should be 15')
      .oneOf([yup.ref('password'), null], 'Password do not match')
      .required('Password confirmation is required'),
  });
  return (
    <div className={styles.register__form}>
      <Panel>
        <div className={styles.register__inner}>
          <h1 className={styles.register__title}>Register</h1>
          <AnimatePresence exitBeforeEnter>
            {showAvatarPicker && (
              <AvatarPicker
                image={originalImage as string}
                getImage={setAvatar}
                getOptions={setImageoptions}
                imgOptions={imgOptions}
                closePicker={() => setShowAvatarPicker(false)}
              />
            )}
          </AnimatePresence>
          {avatar && (
            <Fragment>
              <div
                onClick={() => setShowAvatarPicker(true)}
                className={`${styles.avatar__wrapper} mb-10 btn__click`}
              >
                <Image
                  src={avatar}
                  width={AvatarPlaceholder.width}
                  height={AvatarPlaceholder.height}
                  layout='responsive'
                  alt='avatar'
                />
              </div>
              <p className='mb-10'>Click on image to configure</p>
            </Fragment>
          )}
          <div className={`${styles.img__controls} mb-20`}>
            <Button text='Choose image' event={triggerInput} />
            <Button
              text='Reset image'
              event={() => {
                setAvatar(AvatarPlaceholder.src);
                setOriginalImage(AvatarPlaceholder.src);
                setImageoptions(defaultImgOptions);
              }}
            />
          </div>
          <input
            ref={(upload) => (imageUpload = upload)}
            id='avatar'
            type='file'
            accept='image/*'
            onChange={(e) => {
              if (e.target?.files?.length) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const img = reader.result?.toString() as string;
                  setOriginalImage(img);
                  setAvatar(img);
                  setImageoptions(defaultImgOptions);
                  setShowAvatarPicker(true);
                };
                reader.readAsDataURL(e.target?.files[0]);
              }
            }}
          />

          <Formik
            validateOnChange
            initialValues={{
              name: '',
              email: '',
              password: '',
              passwordConfirmation: '',
            }}
            validationSchema={validationSchema}
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
