import React from 'react';
import ChatListItem from '../../../components/ChatListItem';
import {FlatList, View, StyleSheet} from 'react-native';
import {colors} from '../../../constans/colors';
import {ChatNavProps} from '../../../types/navigation/chat';

const Dummy = [
  {
    id: 1,
    name: 'Jhon',
    chatDescription: 'Hello, I already take the computer',
    time: '18:00',
    countChat: 3,
    isRead: false,
  },
  {
    id: 2,
    name: 'Devi',
    chatDescription: 'Hey nice to meet you',
    time: '17:00',
    countChat: 0,
    isRead: true,
  },
];

const HomeScreen = ({navigation}: ChatNavProps<'Home'>) => {
  const detailNavigation = (id: number) => {
    navigation.navigate('Detail');
  };

  return (
    <FlatList
      style={styles.container}
      renderItem={({item}) => (
        <ChatListItem {...item} onPress={detailNavigation} />
      )}
      data={Dummy}
      keyExtractor={(item) => `${item.id}`}
      ItemSeparatorComponent={() => <View style={styles.line} />}
      ListHeaderComponent={() => <View style={{marginVertical: 5}} />}
      ListFooterComponent={() => <View style={{marginVertical: 5}} />}
    />
  );
};

const styles = StyleSheet.create({
  line: {
    marginVertical: 5,
    height: 1,
    marginLeft: 60,
    backgroundColor: colors.gray,
  },
  container: {flex: 1, backgroundColor: 'white', paddingHorizontal: 10},
});

export default HomeScreen;
