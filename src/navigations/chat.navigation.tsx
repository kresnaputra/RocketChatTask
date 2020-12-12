import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {ChatStackParamList} from '../types/navigation/chat';
import DetailScreen from '../screens/Chat/Detail/DetailScreen';
import HomeScreen from '../screens/Chat/Home/HomeScreen';

const ChatStack = createStackNavigator<ChatStackParamList>();

const ChatNavigation = () => {
  return (
    <ChatStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <ChatStack.Screen name="Home" component={HomeScreen} />
      <ChatStack.Screen name="Detail" component={DetailScreen} />
    </ChatStack.Navigator>
  );
};

export default ChatNavigation;
