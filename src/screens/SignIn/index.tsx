import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Brand } from 'components';
import { useForm, useTheme } from 'hooks';
import { changeTheme } from 'store/theme';
import i18next from 'i18next';
import { TextInput } from 'react-native-gesture-handler';
import { LanguageKey } from 'types/i18next';
import { Colors } from 'theme/Variables';
import { useLoginMutation } from 'services/modules/auth';
import { LoginFromPayload } from 'services/modules/auth/types';
import { ThemeState } from 'store/theme/types';
import { setToken, setUser } from 'store/auth';
import { toast } from '@backpackapp-io/react-native-toast';
import { useAppDispatch } from 'store';
import { APP_SCREEN, APP_STACK } from 'shared/navigator';
import { AuthParamsList } from 'types/navigation';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { CommonActions } from '@react-navigation/native';

const SignIn = ({
  navigation,
}: NativeStackScreenProps<AuthParamsList, APP_SCREEN.SIGN_IN>) => {
  const { t } = useTranslation(['example', 'welcome', 'signIn']);
  const {
    Common,
    Fonts,
    Gutters,
    Layout,
    Images,
    darkMode: isDark,
  } = useTheme();
  const dispatch = useAppDispatch();

  const { register, formStates, onSubmit } = useForm<LoginFromPayload>({
    username: 'peanut',
    password: 'peanut123',
  });

  const [login, { isLoading }] = useLoginMutation();

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }));
  };

  const onChangeLanguage = async (lang: LanguageKey) => {
    await i18next.changeLanguage(lang);
  };

  const handleSubmitForm = async (data: LoginFromPayload) => {
    const response = await login(data);
    if ('data' in response) {
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: APP_STACK.MAIN }],
        }),
      );
    }
    if ('error' in response) {
      toast.error(t('signIn:user_notfound'));
    }
  };

  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fullSize,
        Layout.fill,
        Layout.colCenter,
        Layout.scrollSpaceBetween,
      ]}
    >
      <View
        style={[
          Layout.fill,
          Layout.relative,
          Layout.fullWidth,
          Layout.justifyContentCenter,
          Layout.alignItemsCenter,
        ]}
      >
        <View
          style={[
            Layout.absolute,
            {
              height: 250,
              width: 250,
              backgroundColor: isDark ? '#000000' : '#DFDFDF',
              borderRadius: 140,
            },
          ]}
        />
        <Image
          style={[
            Layout.absolute,
            {
              bottom: '-30%',
              left: 0,
            },
          ]}
          source={Images.sparkles.bottomLeft}
          resizeMode={'contain'}
        />
        <View
          style={[
            Layout.absolute,
            {
              height: 300,
              width: 300,
              transform: [{ translateY: 40 }],
            },
          ]}
        >
          <Brand height={300} width={300} />
        </View>
        <Image
          style={[
            Layout.absolute,
            Layout.fill,
            {
              top: 0,
              left: 0,
            },
          ]}
          source={Images.sparkles.topLeft}
          resizeMode={'contain'}
        />
        <Image
          style={[
            Layout.absolute,
            {
              top: '-5%',
              right: 0,
            },
          ]}
          source={Images.sparkles.top}
          resizeMode={'contain'}
        />
        <Image
          style={[
            Layout.absolute,
            {
              top: '15%',
              right: 20,
            },
          ]}
          source={Images.sparkles.topRight}
          resizeMode={'contain'}
        />
        <Image
          style={[
            Layout.absolute,
            {
              bottom: '-10%',
              right: 0,
            },
          ]}
          source={Images.sparkles.right}
          resizeMode={'contain'}
        />

        <Image
          style={[
            Layout.absolute,
            {
              top: '75%',
              right: 0,
            },
          ]}
          source={Images.sparkles.bottom}
          resizeMode={'contain'}
        />
        <Image
          style={[
            Layout.absolute,
            {
              top: '60%',
              right: 0,
            },
          ]}
          source={Images.sparkles.bottomRight}
          resizeMode={'contain'}
        />
      </View>
      <View
        style={[
          Layout.fill,
          Layout.justifyContentBetween,
          Layout.alignItemsStart,
          Layout.fullWidth,
          Gutters.regularHPadding,
        ]}
      >
        <View style={[Layout.fullWidth]}>
          <Text style={[Fonts.titleRegular]}>{t('welcome:title')}</Text>
          <Text
            style={[Fonts.textBold, Fonts.textRegular, Gutters.regularBMargin]}
          >
            {t('welcome:subtitle')}
          </Text>

          <View style={[Layout.col, Layout.fullWidth]}>
            <TextInput
              style={[Common.textInput, Layout.fullWidth]}
              placeholder={t('signIn:username_placeholder')}
              placeholderTextColor={Colors.textGray200}
              {...register('username', {
                validates: { required: 'Trường này là bắt buộc' },
                blur: {
                  trimAll: true,
                },
              })}
            />
            {formStates.errors.username && (
              <Text style={[Common.textError]}>
                {formStates.errors.username}
              </Text>
            )}
            <TextInput
              style={[Common.textInput, Layout.fullWidth, Gutters.smallTMargin]}
              placeholder={t('signIn:password_placeholder')}
              placeholderTextColor={Colors.textGray200}
              {...register('password', {
                validates: { required: true },
                blur: {
                  trimAll: true,
                },
              })}
            />
          </View>
        </View>

        <View
          style={[
            Layout.row,
            Layout.justifyContentBetween,
            Layout.fullWidth,
            Gutters.smallTMargin,
          ]}
        >
          <TouchableOpacity
            style={[Common.button.circle, Gutters.regularBMargin]}
            onPress={() => onChangeTheme({ darkMode: !isDark })}
          >
            <Image
              source={Images.icons.colors}
              style={{ tintColor: isDark ? '#A6A4F0' : '#44427D' }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[Common.button.circle, Gutters.regularBMargin]}
            onPress={() =>
              onChangeLanguage(i18next.language === 'vi' ? 'en' : 'vi')
            }
          >
            <Image
              source={Images.icons.translate}
              style={{ tintColor: isDark ? '#A6A4F0' : '#44427D' }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[Common.button.circle, Gutters.regularBMargin]}
            onPress={onSubmit(handleSubmitForm)}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Image
                source={Images.icons.send}
                style={{ tintColor: isDark ? '#A6A4F0' : '#44427D' }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
