import '../styles/global.scss';
import type { AppProps } from 'next/app';
import { wrapper } from '@/store/index';
import { ReactElement, ReactNode, useEffect, useMemo } from 'react';
import { User } from '@/store/slices/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { PageComponent } from 'interfaces';
import { setTheme } from '@/utils/setTheme';
import { useRouter } from 'next/router';
import { progressBar } from '@/utils/progressBar';
import { useActions } from '@/store/useActions';
import Toast from '@/components/Toast';
import { NextPage } from 'next';
import { authSelector } from '@/store/slices/auth.slice';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const { authenticateUser } = useActions();

  const getLayout = Component.getLayout ?? ((page) => page);
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
    authenticateUser();
    return () => {
      progressBar.off(router);
    };
  }, []);
  return (
    <React.Fragment>
      <Toast />
      {getLayout(<Component {...pageProps} />)}
    </React.Fragment>
  );
}
export default wrapper.withRedux(MyApp);
