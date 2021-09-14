import { motion } from 'framer-motion';
import { User } from '@/store/slices/user.slice';
import { PageComponent } from 'interfaces';
import AuthLayout, { variants } from '@/components/AuthLayout';
import LoginForm from '@/components/Auth/LoginForm';

interface LoginProps {
  user: User;
}

const Login: PageComponent = () => {
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

Login.Layout = AuthLayout;
export default Login;
