import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { TypedUseSelectorHook } from 'react-redux';
import { AppState, AppThunk } from '..';

// interface ErrorPayload {
//   message: string;
// }
interface Message {
  id: number;
  type: 'error' | 'warning' | 'info' | 'success';
  msg: string;
}

export interface IMessageState {
  messageArr: Array<Message>;
}
const initialState: IMessageState = {
  messageArr: [],
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state: IMessageState, action: PayloadAction<Message>) => {
      console.log({ Payload: action.payload });
      state.messageArr.push({ ...action.payload, id: Date.now() });
    },
    removeMessage: (state: IMessageState, action: PayloadAction<number>) => {
      const deleteIndex = state.messageArr.findIndex(
        (e) => e.id === action.payload
      );
      deleteIndex !== -1 && state.messageArr.splice(deleteIndex, 1);
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

export const messageSelector = (state: AppState) => state.message;

export default messageSlice;
