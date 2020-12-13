import React, {useState, useEffect} from 'react';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {colors} from '../../../constans/colors';
import {textStyles} from '../../../constans/TextStyles';
import {ChatNavProps} from '../../../types/navigation/chat';
import {IBubleChat} from '../../../types/bubleChat';
import {IState} from '../../../types/state';
import {Dispatch, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  postChatAction,
  updateChatAction,
  removeChatAction,
} from '../../../action/chat.action';

interface IDetailScreen extends IReduxProps, ChatNavProps<'Detail'> {}
const DetailScreen = ({
  navigation,
  route,
  messages,
  postChatAction,
  updateChatAction,
  removeChatAction,
}: IDetailScreen) => {
  const id = route.params.id;
  const messagesDetail =
    messages[messages.findIndex((item) => item.id === id)].messages;

  useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    });
    updateChatAction(id);
  }, []);

  const [message, setMessage] = useState('');

  const addChat = () => {
    if (message.length === 0) {
      return;
    }
    setMessage('');
    postChatAction(id, {
      id: messagesDetail.length + 1,
      message,
      time: `${dayjs().format('HH')}:${dayjs().format('mm')}`,
      isMine: true,
      isRead: true,
    });
  };

  const chatOptionHandle = (idMessage: number) => {
    Alert.alert('Warning', 'Do you want to delete this message?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => removeChatAction(id, idMessage),
      },
    ]);
  };

  const RenderItem = (item: IBubleChat) => (
    <TouchableOpacity
      onLongPress={() => chatOptionHandle(item.id)}
      style={[
        styles.buble,
        {
          alignSelf: item.isMine ? 'flex-end' : 'flex-start',
          borderBottomLeftRadius: item.isMine ? 10 : 0,
          borderBottomRightRadius: item.isMine ? 0 : 10,
          backgroundColor: item.isMine ? colors.gray : colors.green,
        },
      ]}>
      <Text
        style={[textStyles.reguler, {color: item.isMine ? 'black' : 'white'}]}>
        {item.message}
      </Text>
      <Text
        style={[
          textStyles.reguler,
          styles.textTime,
          {
            alignSelf: item.isMine ? 'flex-start' : 'flex-end',
            color: item.isMine ? 'black' : colors.gray,
          },
        ]}>
        {item.time}
      </Text>
    </TouchableOpacity>
  );

  const RenderEmptyItem = () => (
    <View style={styles.containerEmptyItem}>
      <Text>Start to chat this person</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({ios: 90, android: -200})}
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <FlatList
        extraData={messages}
        style={styles.container}
        inverted={messagesDetail.length !== 0}
        keyExtractor={(_, index) => `${index}`}
        data={messagesDetail}
        renderItem={({item}) => <RenderItem {...item} />}
        ListEmptyComponent={() => <RenderEmptyItem />}
      />
      <View style={styles.containerTextField}>
        <TextInput
          style={styles.textField}
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={addChat}
        />
        <TouchableOpacity onPress={addChat}>
          <Icon name="md-send" size={24} color={colors.primary} />
        </TouchableOpacity>
        <SafeAreaView />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerEmptyItem: {
    alignItems: 'center',
    marginTop: 20,
  },
  send: {
    width: 30,
    height: 30,
    backgroundColor: 'gray',
  },
  textTime: {
    fontSize: 11,
  },
  container: {
    paddingHorizontal: 10,
  },
  buble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  textField: {
    textAlignVertical: 'center',
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
    borderRadius: 100,
    marginRight: 15,
  },
  containerTextField: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.gray,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

const mapStateToProps = (state: IState) => ({
  messages: state.chat.chat,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {postChatAction, updateChatAction, removeChatAction},
    dispatch,
  );
};

export interface IReduxProps
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);
