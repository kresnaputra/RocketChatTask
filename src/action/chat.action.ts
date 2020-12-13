import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {IChat} from '../types/state';
import {IBubleChat} from '../types/bubleChat';

export const GET_CHAT_STARTED = 'GET_CHAT_STARTED';
export const GET_CHAT_SUCCESS = 'GET_CHAT_SUCCESS';
export const GET_CHAT_FAILURE = 'GET_CHAT_FAILURE';

export const POST_CHAT_STARTED = 'POST_CHAT_STARTED';
export const POST_CHAT_SUCCESS = 'POST_CHAT_SUCCESS';
export const POST_CHAT_FAILURE = 'POST_CHAT_FAILURE';

export const UPDATE_CHAT_STARTED = 'UPDATE_CHAT_STARTED';
export const UPDATE_CHAT_SUCCESS = 'UPDATE_CHAT_SUCCESS';
export const UPDATE_CHAT_FAILURE = 'UPDATE_CHAT_FAILURE';

export const REMOVE_CHAT_STARTED = 'REMOVE_CHAT_STARTED';
export const REMOVE_CHAT_SUCCESS = 'REMOVE_CHAT_SUCCESS';
export const REMOVE_CHAT_FAILURE = 'REMOVE_CHAT_FAILURE';

export const getChatAction = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(getChatStarted());

    const dummyData: IChat[] = [
      {
        id: 1,
        name: 'John',
        messages: [
          {
            id: 1,
            message: 'Hello bro',
            time: '14:00',
            isMine: false,
            isRead: false,
          },
        ].reverse(),
      },
      {
        id: 2,
        name: 'Devi',
        messages: [
          {
            id: 1,
            message: 'Hai',
            time: '14:00',
            isMine: false,
            isRead: true,
          },
        ],
      },
    ];

    dispatch(getChatSuccess(dummyData));
  };
};

const getChatStarted = () => ({
  type: GET_CHAT_STARTED as typeof GET_CHAT_STARTED,
});

const getChatSuccess = (chat: IChat[]) => ({
  type: GET_CHAT_SUCCESS as typeof GET_CHAT_SUCCESS,
  payload: {
    chat,
  },
});

export const removeChatAction = (
  idPerson: number,
  idMessage: number,
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(removeChatStarted());
    dispatch(removeChatSuccess(idPerson, idMessage));
  };
};

const removeChatStarted = () => ({
  type: REMOVE_CHAT_STARTED as typeof REMOVE_CHAT_STARTED,
});

const removeChatSuccess = (idPerson: number, idMessage: number) => ({
  type: REMOVE_CHAT_SUCCESS as typeof REMOVE_CHAT_SUCCESS,
  payload: {
    idMessage,
    idPerson,
  },
});

export const updateChatAction = (
  idPerson: number,
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(updateChatStarted());
    dispatch(updateChatSuccess(idPerson));
  };
};

const updateChatStarted = () => ({
  type: UPDATE_CHAT_STARTED as typeof UPDATE_CHAT_STARTED,
});

const updateChatSuccess = (idPerson: number) => ({
  type: UPDATE_CHAT_SUCCESS as typeof UPDATE_CHAT_SUCCESS,
  payload: {
    idPerson,
  },
});

export const postChatAction = (
  idPerson: number,
  message: IBubleChat,
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(postChatStarted());
    console.log(message);
    dispatch(postChatSuccess(message, idPerson));
  };
};

const postChatStarted = () => ({
  type: POST_CHAT_STARTED as typeof POST_CHAT_STARTED,
});

const postChatSuccess = (message: IBubleChat, idPerson: number) => ({
  type: POST_CHAT_SUCCESS as typeof POST_CHAT_SUCCESS,
  payload: {
    message,
    idPerson,
  },
});

export type ActionChatType = ReturnType<
  | typeof getChatStarted
  | typeof getChatSuccess
  | typeof postChatStarted
  | typeof postChatSuccess
  | typeof updateChatStarted
  | typeof updateChatSuccess
  | typeof removeChatStarted
  | typeof removeChatSuccess
>;
