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
}
export const initialUserState: IUserState = {
  id: 0,
  name: '',
  email: '',
  avatar: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser: (state: IUserState, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: {
    // [HYDRATE]: (state, action) => {
    //   console.log('USER', current(state), action.payload);
    //   console.log(action.payload);
    //   // return {
    //   //   ...current(state),
    //   //   ...action.payload.user,
    //   // };
    //   return { ...state, ...{ name: 'Gavno' } };
    // },
  },
});

export const userActions = userSlice.actions;

export const userSelector = (state: AppState) => state.user;

export default userSlice;
