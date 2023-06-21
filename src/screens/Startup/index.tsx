import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'hooks';
import { Brand } from 'components';
import { setDefaultTheme } from 'store/theme';
import { ApplicationScreenProps } from 'types/navigation';
import { APP_STACK } from 'shared/navigator';
import { reduxStorage, useAppDispatch } from 'store';
import { useLazyWhoamiQuery } from 'services/modules/users';
import { setUser } from 'store/auth';
import { useLazyGetSystemConfigQuery } from 'services/modules/system';
import { setSystemConfig } from 'store/system';

const Index = ({ navigation }: ApplicationScreenProps) => {
  const { Layout, Gutters } = useTheme();
  const dispatch = useAppDispatch();
  const [whoami] = useLazyWhoamiQuery();
  const [getSystemConfig] = useLazyGetSystemConfigQuery();

  const init = async () => {
    await setDefaultTheme({ theme: 'default', darkMode: null });
    const token = await reduxStorage.getItem('token');
    if (!token) {
      navigation.reset({
        index: 0,
        routes: [{ name: APP_STACK.AUTH }],
      });
    } else {
      const [res1, res2] = await Promise.all([
        whoami(null),
        getSystemConfig(null),
      ]);

      if ('data' in res2) {
        dispatch(setSystemConfig(res2.data));
      }

      if ('data' in res1) {
        dispatch(setUser(res1.data));
        navigation.reset({
          index: 0,
          routes: [{ name: APP_STACK.MAIN }],
        });
      }

      if ('error' in res1) {
        await reduxStorage.removeItem('token');
        navigation.reset({
          index: 0,
          routes: [{ name: APP_STACK.AUTH }],
        });
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
    </View>
  );
};

export default Index;
