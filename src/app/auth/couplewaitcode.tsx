import { getCoupleMatch } from '@/api/couple/couple.api';
import { AppText } from '@/components/AppText';
import { useSetConnectCouple } from '@/hooks/query/user.query';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuthStore } from '@/store/authStore';
import { EvilIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CoupleWaitCodeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [code, setCode] = useState('');
  const { user } = useAuthStore();
  const { setUser } = useSetConnectCouple();

  const { updateUser } = useAuthStore();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await getCoupleMatch();
        console.log('폴링 결과:', response);

        if (
          response.success &&
          response.user &&
          response.partner &&
          response.couple
        ) {
          // 1. 상태 갱신
          updateUser(response.user, response.partner, response.couple);

          // 2. 폴링 중단
          clearInterval(interval);

          // 3. 홈 화면으로 이동
          router.replace('/(protected)/(tabs)/(home)');
        }
      } catch (error) {
        console.error('폴링 에러:', error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView className='flex-1'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <View className='flex-1 items-center mt-4'>
          {/* 헤더 */}
          <View className='flex-row justify-between items-center w-full px-4 relative'>
            {/* 뒤로가기 */}
            <TouchableOpacity
              onPress={() => router.replace('/(protected)/(tabs)/(home)')}
              className='absolute right-4'
            >
              <EvilIcons
                name='close'
                size={32}
                color={isDark ? 'white' : 'black'}
              />
            </TouchableOpacity>
            {/* 로고 */}
            <View className='flex-col w-full items-center'>
              <View className='flex-col'>
                <AppText className='text-2xl font-logo'>Our</AppText>
                <AppText className='text-2xl font-logo mt-[-12px]'>Own</AppText>
              </View>
            </View>
          </View>

          <View className='flex-col mt-12 items-center'>
            <View className='flex-col items-center gap-3'>
              <Text
                className={`text-xl ${isDark ? 'text-white' : 'text-black'}`}
              >
                커플 연결을 해주세요
              </Text>
              <Text
                className={`text-md ${
                  isDark ? 'text-gray-300' : 'text-gray-400'
                }`}
              >
                상대방이 연결하면 자동으로 이동합니다.
              </Text>
            </View>
          </View>
          <View className='flex-col justify-center items-center px-4 mt-10'>
            <TouchableOpacity
              onPress={() => {
                router.push('/auth/couplecode');
              }}
              className='border border-white p-4 rounded-md mt-2'
            >
              <AppText className='text-lg'>코드 입력하러 가기</AppText>
            </TouchableOpacity>
          </View>
          <View className='flex-col items-center gap-2 mt-16'>
            <View>
              <AppText
                className={`text-lg ${
                  isDark ? 'text-gray-300' : 'text-gray-400'
                }`}
              >
                {user.nickname}님 코드를 꾹 눌러 복사해주세요!
              </AppText>
            </View>
            <View>
              <TouchableOpacity
                onLongPress={async () => {
                  await Clipboard.setStringAsync(user.code);
                  Alert.alert('복사 완료', '코드가 복사되었습니다.');
                }}
                activeOpacity={0.7}
              >
                <AppText
                  className={`text-xl ${isDark ? 'text-white' : 'text-black'}`}
                >
                  {user.code.length > 8
                    ? `${user.code.slice(0, 8)}`
                    : user.code}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
