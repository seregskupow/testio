import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { TypedUseSelectorHook } from 'react-redux';
import { AppState, AppThunk } from '..';

// interface ErrorPayload {
//   message: string;
// }
interface Message {
  type: 'error' | 'warning' | 'info' | 'success';
  msg: string;
}

export interface IMessageState {
  message: Array<Message>;
}
const initialState: IMessageState = {
  message: [],
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state: IMessageState, action: PayloadAction<Message>) => {
      state.message.push(action.payload);
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        ...action.payload.message,
      };
    },
  },
});

export const { setMessage } = messageSlice.actions;

export const messageActions = messageSlice.actions;

export default messageSlice;
