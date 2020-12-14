/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import HomeScreen from '../src/screens/Chat/Home/HomeScreen';

const navigation = {
  navigate: jest.fn(),
};

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest.fn().mockImplementation((_, reducers) => reducers),
  };
});

it('renders correctly', async () => {
  await act(async () => {
    renderer.create(<App />);
  });
});

const TreeHomeScreen = <HomeScreen navigation={navigation} />;

it('HomeScreen UI', () => {
  expect(TreeHomeScreen).toMatchSnapshot();
});

