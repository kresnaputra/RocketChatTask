import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const chatAction = () => ({
  type: LOGIN_FAILURE as typeof LOGIN_FAILURE,
});

export type ActionChatType = ReturnType<typeof chatAction>;
