import { useKakaoMutation } from '@/hooks/query/auth.query';
import { login } from '@react-native-kakao/user';
import {
  Alert,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { KakaoLogo } from './KakaoLogo';

interface KakaoLoginButtonProps {
  onPress: () => void;
}

export default function KakaoLoginButton({ onPress }: KakaoLoginButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { kakaoLoginMutation } = useKakaoMutation();

  const startKakaoLogin = async () => {
    try {
      const response = await login();
      const { accessToken } = response;
      if (accessToken) {
        kakaoLoginMutation(accessToken, {
          onError: (error) => {
            console.error('로그인 실패', error);
            Alert.alert('로그인 실패', error.message);
          },
        });
      } else {
        console.warn('카카오 accessToken이 없습니다.');
      }
    } catch (error) {
      console.error('카카오 로그인 실패:', error);
    }
  };

  return (
    <TouchableOpacity
      className={`w-full px-10 py-4 items-center justify-center rounded-md min-h-[56px] h-auto ${
        isDark ? 'bg-[#FEE500]' : 'bg-[#FEE500]'
      }`}
      onPress={startKakaoLogin}
    >
      <View className='flex-row items-center gap-2'>
        <KakaoLogo />
        <Text className='text-[#000000]'>카카오 계정으로 시작하기</Text>
      </View>
    </TouchableOpacity>
  );
}
