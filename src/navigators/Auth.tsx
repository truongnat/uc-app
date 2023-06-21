import React from 'react';
import { SignIn } from 'screens';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthParamsList } from 'types/navigation';
import { APP_SCREEN } from 'shared/navigator';

const Stack = createStackNavigator<AuthParamsList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={APP_SCREEN.SIGN_IN} component={SignIn} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
