import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type ChatStackParamList = {
  Home: undefined;
  Detail: undefined;
};

export interface ChatNavProps<T extends keyof ChatStackParamList> {
  navigation: StackNavigationProp<ChatStackParamList, T>;
  route: RouteProp<ChatStackParamList, T>;
}
