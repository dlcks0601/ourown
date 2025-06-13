import { AppText } from '@/components/AppText';
import GoogleLoginButton from '@/components/GoogleLoginButton';
import KakaoLoginButton from '@/components/KakaoLoginButton';
import { useColorScheme } from '@/hooks/useColorScheme';
import { KAKAO_NATIVE_APP_KEY } from '@/utils/constants';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function LoginScrren() {
  useEffect(() => {
    if (!KAKAO_NATIVE_APP_KEY) {
      console.warn('KAKAO_NATIVE_APP_KEY가 설정되지 않았습니다.');
      return;
    }

    initializeKakaoSDK(KAKAO_NATIVE_APP_KEY);
  }, []);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleGoogleLogin = () => {};
  const handleKakaoLogin = () => {};

  return (
    <View
      className={`flex-1 justify-center mb-20 px-4 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
    >
      <View className='flex-1 justify-center items-center'>
        <View>
          <AppText className='text-4xl font-logo'>Our</AppText>
          <AppText className='text-4xl font-logo mt-[-11px]'>Own</AppText>
        </View>
      </View>
      <View className='flex-col gap-4'>
        <KakaoLoginButton onPress={handleKakaoLogin} />
        <GoogleLoginButton onPress={handleGoogleLogin} />

        <TouchableOpacity
          onPress={() => router.replace('/auth/login')}
          className={`w-full min-h-[56px] h-auto px-10 py-6 items-center justify-center rounded-md ${
            isDark ? 'bg-white' : 'bg-black'
          }`}
        >
          <Text className={isDark ? 'text-black' : 'text-white'}>
            이메일 계정으로 시작하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
