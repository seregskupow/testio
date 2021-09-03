import { axiosClient } from './axios';

export const ensureAuth = async () => {
  let isAuth: boolean = true;
  await axiosClient.get('/users/me').catch((error) => {
    if (
      error.response?.status === 401 ||
      error.response?.status === 403 ||
      !error.response
    )
      isAuth = false;
  });
  return isAuth;
};
