import {storiesOf} from '@storybook/react-native';
import React from 'react';
import ChatListItem, {
  IChatListItem,
} from '../../../src/components/ChatListItem';

const chat: IChatListItem = {
  id: 1,
  name: 'Devi',
  chatDescription: 'Hai',
  time: '18:00',
  countChat: 0,
  onPress: () => {},
};

storiesOf('ChatItem', module)
  .add('Chat readed', () => <ChatListItem {...chat} />)
  .add('Chat unread', () => <ChatListItem {...chat} countChat={1} />);
