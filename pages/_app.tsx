import '../styles/global.scss';
import type { AppProps } from 'next/app';
import { wrapper } from '@/store/index';
import { useEffect } from 'react';
import { setAuth, setUser, User } from '@/store/slices/user.slice';
import { useDispatch } from 'react-redux';
import React from 'react';
import { PageComponent } from 'interfaces';
import { setTheme } from '@/utils/setTheme';

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as PageComponent<any>).Layout
    ? (Component as PageComponent<any>).Layout
    : React.Fragment;
  const user: User = {
    name: 'sereg',
    id: 45,
    email: 'email@email.com',
    avatar:
      'https://pbs.twimg.com/profile_images/1045580248467886080/_uwwJdr3.jpg',
  };
  const dispatch = useDispatch();
  useEffect(() => {
    setTheme();
    dispatch(setUser(user));
    user && dispatch(setAuth(true));
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default wrapper.withRedux(MyApp);
