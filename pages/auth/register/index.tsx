import { motion } from 'framer-motion';
import AuthLayout, { variants } from '@/components/AuthLayout';
import RegisterForm from '@/components/Auth/RegisterForm';
import styles from './registerPage.module.scss';
import { wrapper } from '@/store/index';
import { ensureAuth } from '@/utils/ensureAuth';
import { GetServerSideProps } from 'next';

function Register() {
  return (
    <motion.div
      key='register'
      variants={variants}
      initial='initial'
      animate='animate'
      exit='exit'
      className={styles.register__container}
    >
      <RegisterForm />
    </motion.div>
  );
}
Register.Layout = AuthLayout;

export default Register;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(() => async (ctx) => {
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
