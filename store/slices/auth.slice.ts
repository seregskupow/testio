import { axiosClient } from '@/utils/axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppDispatch, AppState } from '..';
import { setMessage } from './message.slice';
import { User } from './user.slice';
import { userActions } from './user.slice';
import { AxiosError } from 'axios';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
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
    [HYDRATE]: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        ...action.payload.auth,
      };
    },
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
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoggedIn(false));
      dispatch(setLoading(false));
      dispatch(
        setMessage({ type: 'error', msg: (error as AxiosError).message })
      );
    }
  };
};

const registerUser = (user: RegisterDTO) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const data: User = await axiosClient.post('/auth/register', user);
      dispatch(userActions.setUser(data));
      dispatch(setLoggedIn(true));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoggedIn(false));
      dispatch(setLoading(false));
      dispatch(
        setMessage({ type: 'error', msg: (error as AxiosError).message })
      );
    }
  };
};

export const authActions = { ...authSlice.actions, loginUser, registerUser };

export const authSelector = (state: AppState) => state.auth;

export default authSlice;
