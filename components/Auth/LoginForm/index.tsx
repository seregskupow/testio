import styles from './loginForm.module.scss';
import React, { useEffect, useState } from 'react';
import inputStyes from '../inputs.module.scss';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import ProviderButtons from '../ProvidersButtons';
import FormikTextField from '@/components/FormikComponents/FormikTextField';
import FormikSubmitButton from '@/components/FormikComponents/FormikSubmitButton';
import FormikLabel from '@/components/FormikComponents/FormikLabel';
import StyledLink from '@/components/Controls/StyledLink';
//import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
//import MyLink from '../../../Components/MyLink';
import { axiosClient } from '@/utils/axios';
import { useActions } from '@/store/useActions';
import { User } from '@/store/slices/user.slice';
import { AxiosError } from 'axios';
import Panel from '@/components/Panel';
import { authSelector, LoginDTO } from '@/store/slices/auth.slice';
import { validationSchema } from '@/utils/validationSchemas';

export default function LoginForm() {
  const { loading, loggedIn } = useSelector(authSelector);
  const { loginUser } = useActions();
  const router = useRouter();
  useEffect(() => {
    if (loggedIn && !loading) router.push('/');
  }, [loggedIn, loading, router]);
  //const error = useSelector((state) => state.user.errorMessage);

  // const login = async (user: LoginDTO) => {
  //   setLoading(true);
  //   axiosClient
  //     .post<User>('/auth/login', user)
  //     .then((loggedUser) => {
  //       setUser(loggedUser.data);
  //       setAuth(true);
  //       setLoading(false);
  //       router.push('/');
  //     })
  //     .catch((error: AxiosError) => {
  //       dispatch(setMessage({ type: 'error', msg: error.message }));
  //       setLoading(false);
  //     });
  // };

  return (
    <div className={styles.login__form}>
      <Panel padding={0}>
        <div className={styles.login__form__inner}>
          <div className={styles.login__form__left}>
            <div>
              <Logo />
              <h2>{'Some slogan blablabla'}</h2>
            </div>
          </div>
          <div className={styles.login__form__right}>
            <h1 className={styles.login__title}>Login</h1>
            <Formik
              initialValues={{
                email: 'sergskypow@gmail.com',
                password: '12345678Ss',
              }}
              validationSchema={validationSchema.LOGIN}
              onSubmit={async (values) => {
                loginUser(values);
              }}
            >
              {() => (
                <Form autoComplete='off' className={inputStyes.auth__form}>
                  <FormikLabel text={'Enter email'} fontSize={2} />
                  <FormikTextField type='email' name='email' />
                  <FormikLabel text={'enter password'} fontSize={2} />
                  <FormikTextField type='password' name='password' />
                  <FormikSubmitButton text={'Login'} isSubmitting={loading} />
                </Form>
              )}
            </Formik>
            <ProviderButtons />
            <FormikLabel text={'No account?'} fontSize={2} />
            {/* <MyLink href='/auth/register' color='blue' text={'Register'} />
        <LanguageSwitcher /> */}
            <StyledLink href='/auth/register'>
              <h1>Register</h1>
            </StyledLink>
          </div>
        </div>
      </Panel>
    </div>
  );
}
