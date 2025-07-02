import { AppText } from '@/components/AppText';
import AuthInput from '@/components/AuthInput';
import { useSignupMutation } from '@/hooks/query/auth.query';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { signup } = useSignupMutation();

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

  const handleSignup = () => {
    const emailTrimmed = email.trim();
    const isEmailEmpty = emailTrimmed === '';
    const isPasswordEmpty = password === '';
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const isEmailValid = emailRegex.test(emailTrimmed);

    setEmailError(!isEmailValid);
    setPasswordError(isPasswordEmpty);

    if (isEmailEmpty || isPasswordEmpty) {
      setError('이메일과 패스워드를 모두 입력해주세요.');
      return;
    }

    if (!isEmailValid) {
      setError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      signup({ email: emailTrimmed, password });
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || '회원가입 실패');
    } finally {
      setLoading(false);
    }
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
          {/* 회원가입 폼 */}
          <View className='flex-col w-full'>
            <View className='flex-col w-full h-[95px]'>
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

          {/* 다음 버튼 */}
          <View className='w-full mt-8'>
            {email && password ? (
              <TouchableOpacity
                className={`rounded-md py-5 ${
                  isDark ? 'bg-white' : 'bg-black'
                }`}
                onPress={handleSignup}
              >
                <Text
                  className={`${
                    isDark ? 'text-black' : 'text-white'
                  } text-center`}
                >
                  다음
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className='rounded-md py-5 bg-gray-300'
                disabled={true}
              >
                <Text className='text-gray-500 text-center'>다음</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
