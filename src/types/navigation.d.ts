import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { APP_SCREEN, APP_STACK } from 'shared/navigator';

export type MainParamsList = {
  [APP_SCREEN.HOME]: undefined;
};

export type AuthParamsList = {
  [APP_SCREEN.SIGN_IN]: undefined;
};

export type ApplicationStackParamList = {
  [APP_STACK.STARTUP]: undefined;
  [APP_STACK.MAIN]: NavigatorScreenParams<MainParamsList>;
  [APP_STACK.AUTH]: NavigatorScreenParams<AuthParamsList>;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
