import { messageActions } from './slices/message.slice';
import { userActions } from './slices/user.slice';

export const allActionCreators = {
  ...userActions,
  ...messageActions,
};
