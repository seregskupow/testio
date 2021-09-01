import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { TypedUseSelectorHook } from 'react-redux';
import { AppState } from '..';

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
const initialState: IUserState = {
  id: 0,
  name: '',
  email: '',
  avatar: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      // const { id, name, email, avatar } = action.payload;
      // (state.id = id), (state.name = name);
      // state.email = email;
      // state.avatar = avatar;
      return action.payload;
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

export const { setUser } = userSlice.actions;

export const userSelector = (state: AppState) => state.user;

export default userSlice;
