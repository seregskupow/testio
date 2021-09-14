import LoginForm from '@/components/Auth/LoginForm';
import AuthLayout, { variants } from '@/components/AuthLayout';
import CenteredContainer from '@/components/CenteredContainer';
import Panel from '@/components/Panel';
import { motion } from 'framer-motion';
import React from 'react';

const Login = () => {
  return (
    <motion.div
      key='login'
      variants={variants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <CenteredContainer align='center' height={100}>
        <Panel width={100} padding={0}>
          <LoginForm />
        </Panel>
      </CenteredContainer>
    </motion.div>
  );
};
Login.Layout = AuthLayout;

export default Login;
