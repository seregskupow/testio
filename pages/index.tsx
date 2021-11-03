import type { GetServerSideProps, NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import userSlice, {
  IUserState,
  User,
  userSelector,
} from '@/store/slices/user.slice';
import Head from 'next/head';
import Image from 'next/image';
import { AppState, wrapper } from '../store';
import styles from '../styles/Home.module.css';
import { ReactElement, useEffect } from 'react';
import { axiosClient } from '@/utils/axios';
import { ensureAuth } from '@/utils/ensureAuth';
import Layout from '@/components/Layout';
import { PageComponent } from 'interfaces';
import StyledLink from '@/components/Controls/StyledLink';
import Panel from '@/components/Panel';
import { useActions } from '@/store/useActions';
import { setMessage } from '@/store/slices/message.slice';
interface HomeProps {
  user: User;
}

const Home = () => {
  const { setUser } = useActions();
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <Panel margin={15}>
        <main className={styles.main}>
          <h1>{user.name}</h1>
          <button
            onClick={() => {
              dispatch(
                setUser({
                  name: 'kurwa',
                  id: 45,
                  email: 'email@email.com',
                  avatar:
                    'https://pbs.twimg.com/profile_images/1045580248467886080/_uwwJdr3.jpg',
                })
              );
            }}
          >
            change user
          </button>
          <h1 className={styles.title}>
            Welcome to{' '}
            <StyledLink href='https://nextjs.org'>
              <p>Next.js!</p>
            </StyledLink>
          </h1>

          <p className={styles.description}>
            Get started by editing{' '}
            <code className={styles.code}>pages/index.js</code>
          </p>

          <div className={styles.grid}>
            <a href='https://nextjs.org/docs' className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href='https://nextjs.org/learn' className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href='https://github.com/vercel/next.js/tree/master/examples'
              className={styles.card}
            >
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
              className={styles.card}
            >
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </main>
      </Panel>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default Home;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    // store.dispatch(
    //   setMessage({
    //     type: '',
    //     msg: '',
    //   })
    // );
    // if(!(await ensureAuth())){
    // 	return {
    // 		redirect: {
    // 			permanent: true,
    // 			destination: "/auth/login",
    // 		},
    // 		props:{},
    // 	};
    // }

    return {
      props: {},
    };
  });
