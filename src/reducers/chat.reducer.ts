import {ActionChatType} from '../action/chat.action';

const initialState = {
  chatList: [''],
};

export default (state = initialState, action: ActionChatType) => {
  return initialState;
};
