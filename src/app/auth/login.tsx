import { login } from '@/api/auth/auth.api';
import { AppText } from '@/components/AppText';
import AuthInput from '@/components/AuthInput';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/authStore';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { logIn } = useAuthStore();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = () => {
    const emailTrimmed = email.trim();
    const isEmailEmpty = emailTrimmed === '';
    const isPasswordEmpty = password === '';

    setEmailError(isEmailEmpty);
    setPasswordError(isPasswordEmpty);

    if (isEmailEmpty || isPasswordEmpty) {
      setError('아이디와 패스워드를 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');
    login(emailTrimmed, password)
      .then(({ user, jwt, partner, couple }) =>
        logIn(user, jwt, partner, couple)
      )
      .then(() => router.replace('/(protected)/(tabs)/(home)'))
      .catch((err: any) => {
        console.error(err);
        setError(err.response?.data?.message || err.message || '로그인 실패');
      })
      .finally(() => setLoading(false));
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-200}
      className='flex-1 mt-48'
    >
      <SafeAreaView className='flex-1'>
        <View className='flex-col items-center px-8'>
          {/* 로고 */}
          <View className='flex-col items-start'>
            <AppText className='text-4xl font-logo'>Our</AppText>
            <AppText className='text-4xl font-logo mt-[-11px]'>Own</AppText>
          </View>
          {/* 로그인 폼 */}
          <View className='flex-col w-full'>
            <View className='flex-col w-full h-[90px]'>
              <AuthInput
                label='이메일'
                placeholder='이메일을 입력해주세요.'
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (text.trim()) setEmailError(false);
                }}
                keyboardType='email-address'
                required
                error={
                  emailError ? '올바른 이메일 형식이 아닙니다.' : undefined
                }
              />
              {emailError && (
                <Text className='text-red-500 text-sm mt-[-10px]'>
                  올바른 이메일 형식이 아닙니다.
                </Text>
              )}
            </View>
            <View className='flex-col w-full'>
              <AuthInput
                label='패스워드'
                placeholder='패스워드를 입력해주세요.'
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (text) setPasswordError(false);
                }}
                secureTextEntry
                required
              />
            </View>
          </View>

          {/* 로그인 버튼 */}
          <View className='w-full mt-8'>
            <TouchableOpacity
              className={`rounded-md py-5 ${isDark ? 'bg-white' : 'bg-black'}`}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text
                className={`${
                  isDark ? 'text-black' : 'text-white'
                } text-center`}
              >
                로그인
              </Text>
            </TouchableOpacity>
          </View>
          <View className='flex-row w-full justify-center gap-4 mt-8'>
            {/* 회원가입 버튼 */}
            <Link href='/auth/signup' asChild>
              <TouchableOpacity>
                <AppText
                  className={`text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  회원가입
                </AppText>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity>
              <AppText
                className={`text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                이메일 찾기
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
