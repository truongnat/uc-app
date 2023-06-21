import React from 'react';
import { Home } from 'screens';
import { createStackNavigator } from '@react-navigation/stack';
import { MainParamsList } from 'types/navigation';
import { APP_SCREEN } from 'shared/navigator';

const Stack = createStackNavigator<MainParamsList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={APP_SCREEN.HOME} component={Home} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
