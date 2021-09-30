import Layout from '@/components/Layout';
import Panel from '@/components/Panel';
import { wrapper } from '@/store/index';
import { authSelector } from '@/store/slices/auth.slice';
import { userSelector } from '@/store/slices/user.slice';
import { ensureAuth } from '@/utils/ensureAuth';
import { PageComponent } from 'interfaces';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './profile.module.scss';
import Image from 'next/image';
import ProfileLayout, { variants } from '@/components/ProfileLayout';
import { motion } from 'framer-motion';

const Profile = () => {
  const router = useRouter();
  const { loggedIn, authenticationLoading } = useSelector(authSelector);
  const { name, avatar } = useSelector(userSelector);
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
        <h1>MY</h1>
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
