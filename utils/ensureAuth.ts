import { GetServerSidePropsContext } from 'next';
import { axiosClient } from './axios';

export const ensureAuth = async (ctx:GetServerSidePropsContext) => {
  let isAuth: boolean = true;
	const cookie = ctx.req?.headers.cookie;
  await axiosClient
    .get('http://localhost:5000/api/v1/users/me', {
      headers: {
        cookie: cookie,
      },
    })
    .catch((error) => {
      if (
        error.response?.status === 401 ||
        error.response?.status === 403 ||
        !error.response
      )
        isAuth = false;
    });
  return isAuth;
};
