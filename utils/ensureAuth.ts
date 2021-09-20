import { axiosClient } from './axios';

export const ensureAuth = async (cookie) => {
  let isAuth: boolean = true;
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
