import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { TypedUseSelectorHook } from 'react-redux';
import { AppState, AppThunk } from '..';
import { bindActionCreators } from 'redux';
import { axiosClient } from '@/utils/axios';
import { setMessage } from './message.slice';

export type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};
export interface IUserState {
  id: number;
  name: string;
  email: string;
  avatar: string;
  isAuthenticated: boolean;
}
const initialState: IUserState = {
  id: 0,
  name: '',
  email: '',
  avatar: '',
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: IUserState, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    setAuth: (state: IUserState, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const userActions = userSlice.actions;

export const userSelector = (state: AppState) => state.user;

export default userSlice;
