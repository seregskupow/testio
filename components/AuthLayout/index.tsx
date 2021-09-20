import styles from './authLayout.module.scss';
import { FC } from 'react';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';

const AuthLayout: FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Testio</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='manifest' href='manifest.json' />

        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='application-name' content='JobsJunter' />
        <meta name='apple-mobile-web-app-title' content='JobsHunter' />
        <meta name='theme-color' content='#000000' />
        <meta name='msapplication-navbutton-color' content='#000000' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <meta name='msapplication-starturl' content='/' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />

        <link
          rel='icon'
          type='image/png'
          sizes='256x256'
          href='icons/icon-256.png'
        />
        <link
          rel='apple-touch-icon'
          type='image/png'
          sizes='256x256'
          href='icons/icon-256.png'
        />
        <script
          async
          src='https://cdn.jsdelivr.net/npm/pwacompat'
          crossOrigin='anonymous'
        />
      </Head>
      <div className={styles.auth__container}>
        <div className={styles.auth__container__inner}>
          <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
        </div>
      </div>
    </>
  );
};
export default AuthLayout;
export const variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};
