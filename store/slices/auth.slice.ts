import { axiosClient } from '@/utils/axios';
import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppDispatch, AppState } from '..';
import { setMessage } from './message.slice';
import { initialUserState, User } from './user.slice';
import { userActions } from './user.slice';
import { AxiosError } from 'axios';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
  avatar: string;
}

export interface IAuthState {
  loading: boolean;
  loggedIn: boolean;
}
const initialState: IAuthState = {
  loading: false,
  loggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state: IAuthState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLoggedIn: (state: IAuthState, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
  },
  extraReducers: {
    // [HYDRATE]: (state, action) => {
    //   console.log('AUTH', current(state), action.payload);
    //   console.log(action.payload);
    //   // return {
    //   //   ...current(state),
    //   //   ...action.payload.auth,
    //   // };
    //   state = {
    //     ...current(state),
    //     ...action.payload.auth,
    //   };
    // },
  },
});
const { setLoading, setLoggedIn } = authSlice.actions;

const loginUser = (user: LoginDTO) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const data: User = await axiosClient.post('/auth/login', user);
      dispatch(userActions.setUser(data));
      dispatch(setLoggedIn(true));
      dispatch(setMessage({ type: 'success', msg: 'Successful login' }));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoggedIn(false));
      dispatch(setLoading(false));
      dispatch(
        setMessage({
          type: 'error',
          msg:
            (error as AxiosError).response?.data.message ||
            (error as AxiosError).message,
        })
      );
      // dispatch(
      //   setMessage({ type: 'warning', msg: (error as AxiosError).message })
      // );
      // dispatch(
      //   setMessage({ type: 'info', msg: (error as AxiosError).message })
      // );
      // dispatch(
      //   setMessage({ type: 'success', msg: (error as AxiosError).message })
      // );
    }
  };
};

const registerUser = (user: RegisterDTO) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const data: User = await axiosClient.post('/auth/signup', user);
      console.log({ REGISTERED: data });
      dispatch(userActions.setUser(data));
      dispatch(setLoggedIn(true));
      dispatch(setMessage({ type: 'success', msg: 'Successful register' }));
      dispatch(setLoading(false));
    } catch (error) {
      console.log({ ERROR: error });
      dispatch(setLoggedIn(false));
      dispatch(setLoading(false));
      dispatch(
        setMessage({
          type: 'error',
          msg:
            (error as AxiosError).response?.data.message ||
            (error as AxiosError).message,
        })
      );
    }
  };
};

const authenticateUser = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const user: User = await axiosClient.get('/users/me');
      console.log({ AUTHUSER: user });
      dispatch(userActions.setUser(user));
      dispatch(setLoggedIn(true));
      dispatch(
        setMessage({ type: 'success', msg: `Logged in as ${user.name}` })
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      if (
        axiosError.response?.status === 403 ||
        axiosError.response?.status === 401
      ) {
        dispatch(
          setMessage({ type: 'info', msg: 'You are not authenticated' })
        );
      } else {
        dispatch(
          setMessage({
            type: 'error',
            msg:
              (error as AxiosError).response?.data.message ||
              (error as AxiosError).message,
          })
        );
      }
    }
  };
};

const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    try {
      await axiosClient.get('/auth/logout');
      dispatch(userActions.setUser(initialUserState));
      dispatch(setLoggedIn(false));
      dispatch(setMessage({ type: 'success', msg: 'Successful logout' }));
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          msg:
            (error as AxiosError).response?.data.message ||
            (error as AxiosError).message,
        })
      );
    }
  };
};

export const authActions = {
  ...authSlice.actions,
  loginUser,
  registerUser,
  logoutUser,
  authenticateUser,
};

export const authSelector = (state: AppState) => state.auth;

export default authSlice;
