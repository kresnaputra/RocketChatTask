import React from 'react';
import {Provider} from 'react-redux';
import ChatNavigation from './navigations/chat.navigation';
import {NavigationContainer} from '@react-navigation/native';
import store from './config/storeConfig';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => (
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <NavigationContainer>
        <ChatNavigation />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
