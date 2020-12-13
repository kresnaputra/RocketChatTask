import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type ChatStackParamList = {
  Home: undefined;
  Detail: {name: string; id: number};
};

export interface ChatNavProps<T extends keyof ChatStackParamList> {
  navigation: StackNavigationProp<ChatStackParamList, T>;
  route: RouteProp<ChatStackParamList, T>;
}
