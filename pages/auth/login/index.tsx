import { motion } from 'framer-motion';
import { User } from '@/store/slices/user.slice';
import { PageComponent } from 'interfaces';
import AuthLayout, { variants } from '@/components/AuthLayout';
import LoginForm from '@/components/Auth/LoginForm';
import { wrapper } from '@/store/index';
import { GetServerSideProps } from 'next';
import { ensureAuth } from '@/utils/ensureAuth';
import { ReactElement } from 'react';

interface LoginProps {
  user: User;
}

const Login = () => {
  return (
    <motion.div
      key='register'
      variants={variants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <LoginForm />
    </motion.div>
  );
};

Login.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};
export default Login;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    if (await ensureAuth(ctx)) {
      return {
        redirect: {
          permanent: true,
          destination: '/',
        },
        props: {},
      };
    }

    return {
      props: {},
    };
  });
