import rootReducer from '../reducers';
import {IBubleChat} from './bubleChat';

export interface IState extends ReturnType<typeof rootReducer> {}

export interface IChat {
  id: number;
  name: string;
  messages: IBubleChat[];
}

export interface IChatState {
  loading: boolean;
  chat: IChat[];
}
