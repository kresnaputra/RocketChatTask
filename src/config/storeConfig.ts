import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer, PersistConfig} from 'redux-persist';
import {createLogger} from 'redux-logger';

//import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import thunk from 'redux-thunk';
import reducer from '../reducers';
import {IState} from '../types/state';

const persistConfig: PersistConfig<IState> = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
// const persistedReducer = persistCombineReducers(persistConfig, reducer);

const loggerMiddleware = (createLogger as any)();
const middlewares = [thunk];

if (__DEV__) {
  middlewares.push(loggerMiddleware);
}

function configureStore() {
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);
  return {store, persistor};
}

const store = configureStore();

export default store;
