import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {textStyles} from '../constans/TextStyles';
import {colors} from '../constans/colors';

interface IChatListItem {
  id: number;
  name: string;
  chatDescription: string;
  time: string;
  countChat: number;
  onPress: (id: number) => void;
  testID?: string;
}

const ChatListItem = ({
  id,
  name,
  chatDescription,
  time,
  countChat,
  onPress,
  testID,
}: IChatListItem) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={() => onPress(id)}
      style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={[textStyles.reguler, {color: 'white'}]}>
          {name[0].toUpperCase()}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={[textStyles.subtitle]}>{name}</Text>
        <Text style={textStyles.reguler}>{chatDescription}</Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text
          style={[
            textStyles.reguler,
            {color: countChat > 0 ? colors.green : colors.secondary},
          ]}>
          {time}
        </Text>
        {countChat > 0 && (
          <View style={styles.countChatContainer}>
            <Text style={[textStyles.reguler, {color: 'white'}]}>
              {countChat}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  countChatContainer: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatListItem;
