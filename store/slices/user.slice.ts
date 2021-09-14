import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { TypedUseSelectorHook } from 'react-redux';
import { AppState } from '..';
import { bindActionCreators } from 'redux';

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
      // const { id, name, email, avatar } = action.payload;
      // (state.id = id), (state.name = name);
      // state.email = email;
      // state.avatar = avatar;
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
//Async action
// export const fetchSubject =
//   (id: any): AppThunk =>
//   async (dispatch) => {
//     const timeoutPromise = (timeout: number) =>
//       new Promise((resolve) => setTimeout(resolve, timeout));

//     await timeoutPromise(200);

//     dispatch(
//       subjectSlice.actions.setEnt({
//         [id]: {
//           id,
//           name: `Subject ${id}`,
//         },
//       })
//     );
//   };

export const userActions = userSlice.actions;

export const userSelector = (state: AppState) => state.user;

export default userSlice;
