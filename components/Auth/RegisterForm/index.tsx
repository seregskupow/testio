import * as yup from 'yup';
import inputs from '../inputs.module.scss';
import styles from './registerForm.module.scss';
import React, { useState } from 'react';
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
interface RegisterDTO {
  email: string;
  password: string;
}
export default function RegisterForm() {
  const router = useRouter();
  const { setUser, setAuth, setMessage } = useActions();
  const [isLoading, setLoading] = useState<boolean>(false);

  const registerUser = async (user: RegisterDTO) => {
    setLoading(true);
    axiosClient
      .post<User>('/auth/register', user)
      .then((loggedUser) => {
        setUser(loggedUser.data);
        setAuth(true);
        setLoading(false);
        router.push('/');
      })
      .catch((error: AxiosError) => {
        setMessage({ type: 'error', msg: error.message });
        setLoading(false);
      });
  };
  const validationSchema = yup.object({
    name: yup.string().min(6).max(20).required(),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Min length should be 8')
      .max(15, 'Min length should be 15')
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
      .required('Password is required'),
  });
  return (
    <div className={styles.register__form}>
      <Panel>
        <div className={styles.register__inner}>
          <Formik
            validateOnChange
            initialValues={{
              email: '',
              password: '',
              passwordConfirmation: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              await registerUser(values);
              if (!isLoading) setSubmitting(false);
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form autoComplete='off' className={inputs.auth__form}>
                <FormikLabel text={'Enter Credentials'} fontSize={2} />
                <FormikTextField type='text' name='name' />
                <FormikLabel text={'Enter email'} fontSize={2} />
                <FormikTextField type='text' name='email' />
                <FormikLabel text={'Enter password'} fontSize={2} />
                <FormikTextField type='password' name='password' />
                <FormikLabel text={'Repeat password'} fontSize={2} />
                <FormikTextField type='password' name='passwordConfirmation' />
                <FormikSubmitButton
                  text={'Register'}
                  isSubmitting={isSubmitting}
                />
              </Form>
            )}
          </Formik>

          <ProviderButtons />
          <StyledLink href='/auth/login'>
            <h1>Back</h1>
          </StyledLink>
        </div>
      </Panel>
    </div>
  );
}
