import {
  ActionChatType,
  GET_CHAT_SUCCESS,
  GET_CHAT_STARTED,
  POST_CHAT_SUCCESS,
  UPDATE_CHAT_SUCCESS,
  REMOVE_CHAT_SUCCESS,
} from '../action/chat.action';
import {IChatState} from '../types/state';

const initialState: IChatState = {
  loading: false,
  chat: [],
};

export default (state = initialState, action: ActionChatType): IChatState => {
  switch (action.type) {
    case GET_CHAT_STARTED: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_CHAT_SUCCESS: {
      return {
        ...state,
        loading: false,
        chat: action.payload.chat,
      };
    }
    case POST_CHAT_SUCCESS: {
      const newMessage = [...state.chat];
      //find index by id person
      const idxById = newMessage.findIndex(
        (item) => item.id === action.payload.idPerson,
      );
      //add message
      newMessage[idxById].messages = [
        action.payload.message,
        ...newMessage[idxById].messages,
      ];
      return {
        ...state,
        chat: newMessage,
      };
    }
    case UPDATE_CHAT_SUCCESS: {
      const newMessage = [...state.chat];
      //find index by id person
      const idxById = newMessage.findIndex(
        (item) => item.id === action.payload.idPerson,
      );
      //set message to be read
      newMessage[idxById].messages.map((item, index) => {
        if (!item.isRead) {
          newMessage[idxById].messages[index].isRead = true;
        }
      });

      return {
        ...state,
        chat: newMessage,
      };
    }
    case REMOVE_CHAT_SUCCESS: {
      //find index by id person
      const idxById = state.chat.findIndex(
        (item) => item.id === action.payload.idPerson,
      );

      const newMessage = [...state.chat];
      const removeMessage = state.chat[idxById].messages.filter(
        (item) => item.id !== action.payload.idMessage,
      );
      //remove messeage by id message
      newMessage[idxById].messages = removeMessage;
      console.log(newMessage);

      return {
        ...state,
        chat: newMessage,
      };
    }
    default:
      return state;
  }
};
