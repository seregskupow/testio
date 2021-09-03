import { GetServerSidePropsContext } from 'next';

declare module 'axios' {
  export interface AxiosRequestConfig {
    ctx?: GetServerSidePropsContext;
  }
}
