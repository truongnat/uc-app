import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { Startup } from 'screens';
import { useTheme } from 'hooks';
import MainNavigator from './Main';
import { useFlipper } from '@react-navigation/devtools';
import { ApplicationStackParamList } from 'types/navigation';
import AuthNavigator from './Auth';
import { Toasts } from '@backpackapp-io/react-native-toast';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { APP_STACK } from 'shared/navigator';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme();

  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <GestureHandlerRootView style={[Layout.fill]}>
      <SafeAreaProvider>
        <SafeAreaView style={[Layout.fill]} edges={[]}>
          <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle={darkMode ? 'light-content' : 'dark-content'}
            />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name={APP_STACK.STARTUP} component={Startup} />
              <Stack.Screen name={APP_STACK.MAIN} component={MainNavigator} />
              <Stack.Screen name={APP_STACK.AUTH} component={AuthNavigator} />
            </Stack.Navigator>
            <Toasts />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default ApplicationNavigator;
