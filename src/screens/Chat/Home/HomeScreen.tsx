import React, {useEffect} from 'react';
import ChatListItem from '../../../components/ChatListItem';
import {FlatList, View, StyleSheet, Text, Button} from 'react-native';
import {colors} from '../../../constans/colors';
import {ChatNavProps} from '../../../types/navigation/chat';
import {IState} from '../../../types/state';
import {Dispatch, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getChatAction} from '../../../action/chat.action';

interface IHomeScreen extends IReduxProps, ChatNavProps<'Home'> {}
const HomeScreen = ({navigation, chat, getChatAction}: IHomeScreen) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={getChatAction} title="Reset" />,
    });
    if (chat.length === 0) {
      getChatAction();
    }
  }, []);

  const detailNavigation = (id: number) => {
    const name = chat.find((item) => item.id === id);
    navigation.navigate('Detail', {name: name!.name, id});
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={styles.container}
        renderItem={({item}) => {
          const countUnReadMessage = item.messages.map((item) => item.isRead);
          if (item.messages.length === 0) {
            return null;
          }
          return (
            <ChatListItem
              onPress={detailNavigation}
              id={item.id}
              name={item.name}
              chatDescription={item.messages[0].message}
              time={item.messages[0].time}
              countChat={
                countUnReadMessage.filter((item) => item === false).length
              }
            />
          );
        }}
        data={chat}
        extraData={chat}
        keyExtractor={(item) => `${item.id}`}
        ItemSeparatorComponent={() => <View style={styles.line} />}
        ListHeaderComponent={() => <View style={{marginVertical: 5}} />}
        ListFooterComponent={() => <View style={{marginVertical: 5}} />}
      />
    </View>
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

const mapStateToProps = (state: IState) => ({
  chat: state.chat.chat,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({getChatAction}, dispatch);
};

export interface IReduxProps
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
