import Layout from '@/components/Layout';
import Panel from '@/components/Panel';
import { wrapper } from '@/store/index';
import { authSelector } from '@/store/slices/auth.slice';
import { userSelector } from '@/store/slices/user.slice';
import { ensureAuth } from '@/utils/ensureAuth';
import { PageComponent } from 'interfaces';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './profile.module.scss';
import Image from 'next/image';

const Profile: PageComponent = () => {
  const router = useRouter();
  const { loggedIn, loading } = useSelector(authSelector);
  const { name, avatar } = useSelector(userSelector);
  useEffect(() => {
    if (!loggedIn && !loading) router.push('/');
  }, [loggedIn, loading, router]);
  return (
    <>
      <Panel padding={20} margin={20}>
        <Image
          src={avatar}
          width={300}
          height={300}
          layout='fixed'
          alt='useravatar'
        />
        <h1>Hello, {name}!</h1>
      </Panel>
    </>
  );
};

export default Profile;

Profile.Layout = Layout;

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
