import { motion } from 'framer-motion';
import AuthLayout, { variants } from '@/components/AuthLayout';
import RegisterForm from '@/components/Auth/RegisterForm';
import styles from './registerPage.module.scss';

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
