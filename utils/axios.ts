import Axios from 'axios';
import Router from 'next/router';
import { isServer } from './isServer';

const client = Axios.create({
  baseURL: process.env.SERVER || process.env.NEXT_PUBLIC_SERVER,
  withCredentials: true,
});

client.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        if (!isServer()) {
          Router.push({
            pathname: '/auth/login',
          });
        }
      }
    }

    return Promise.reject(error);
  }
);

export const axiosClient = client;
