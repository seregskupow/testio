import '../styles/global.scss';
import type { AppProps } from 'next/app';
import { wrapper } from '@/store/index';
import { useEffect, useMemo } from 'react';
import { User } from '@/store/slices/user.slice';
import { useDispatch } from 'react-redux';
import React from 'react';
import { PageComponent } from 'interfaces';
import { setTheme } from '@/utils/setTheme';
import { useRouter } from 'next/router';
import { progressBar } from '@/utils/progressBar';
import { useActions } from '@/store/useActions';
import Toast from '@/components/Toast';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { setAuth, setUser, setLoggedIn } = useActions();
  const Layout = (Component as PageComponent<any>).Layout
    ? (Component as PageComponent<any>).Layout
    : React.Fragment;
  const user: User = useMemo(() => {
    return {
      name: 'sereg',
      id: 45,
      email: 'email@email.com',
      avatar:
        'https://pbs.twimg.com/profile_images/1045580248467886080/_uwwJdr3.jpg',
    };
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    progressBar.on(router);
    setTheme();
    // setUser(user);
    // user && setLoggedIn(true);
    return () => {
      progressBar.off(router);
    };
  }, [user, router, setLoggedIn, setUser]);
  return (
    <React.Fragment>
      <Toast />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  );
}
export default wrapper.withRedux(MyApp);
