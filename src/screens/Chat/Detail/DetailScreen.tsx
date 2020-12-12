import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../../constans/colors';
import {textStyles} from '../../../constans/TextStyles';

const DetailScreen = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState(
    [
      {
        id: 1,
        message: 'Hello bro',
        time: '14:00',
        isMine: false,
      },
      {
        id: 2,
        message: 'Yooo',
        time: '14:01',
        isMine: true,
      },
    ].reverse(),
  );

  const addChat = () => {
    if (message.length === 0) {
      return;
    }
    setMessage('');
    setChat([{id: chat.length, message, time: '18:00', isMine: true}, ...chat]);
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={styles.container}
        inverted
        keyExtractor={(_, index) => `${index}`}
        data={chat}
        renderItem={({item}) => (
          <View
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
              style={[
                textStyles.reguler,
                {color: item.isMine ? 'black' : 'white'},
              ]}>
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
          </View>
        )}
      />
      <View style={styles.containerTextField}>
        <TextInput
          style={styles.textField}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={addChat}>
          <Image style={styles.send} />
        </TouchableOpacity>
        <SafeAreaView />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  send: {
    width: 30,
    height: 30,
    backgroundColor: 'gray',
  },
  textTime: {
    fontSize: 11,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  buble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  textField: {
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

export default DetailScreen;
