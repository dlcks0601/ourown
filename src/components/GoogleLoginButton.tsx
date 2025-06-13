import GoogleLogo from '@/components/GoogleLogo';
import { useAuthMutation } from '@/hooks/query/auth.query';
import { useColorScheme } from '@/hooks/useColorScheme';
import { APP_SCHEME, GOOGLE_REDIRECT_URI } from '@/utils/constants';
import * as LinkingExpo from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

interface GoogleLoginButtonProps {
  onPress: () => void;
}

export default function GoogleLoginButton({ onPress }: GoogleLoginButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { googleLogin } = useAuthMutation();

  const startGoogleLogin = async () => {
    try {
      const result = await WebBrowser.openAuthSessionAsync(
        GOOGLE_REDIRECT_URI,
        APP_SCHEME
      );

      if (result.type === 'success' && result.url) {
        const { queryParams } = LinkingExpo.parse(result.url);
        const securityCodeRaw = queryParams?.securityCode;
        const securityCode =
          typeof securityCodeRaw === 'string'
            ? securityCodeRaw
            : Array.isArray(securityCodeRaw)
            ? securityCodeRaw[0]
            : undefined;

        if (securityCode) {
          googleLogin(securityCode, {
            onError: (error) => {
              console.error('[로그인 실패]', error);
              Alert.alert('로그인 실패', error.message);
            },
          });
        }
      }
    } catch (error) {
      console.error('[로그인 오류]', error);
    }
  };

  return (
    <TouchableOpacity
      className={`w-full px-10 py-4 items-center justify-center rounded-md min-h-[56px] h-auto ${
        isDark ? 'bg-[#000000]' : 'bg-[#ffffff]'
      } border-[0.5px] ${isDark ? 'border-[#8E918F]' : 'border-[#000000]'}`}
      onPress={startGoogleLogin}
    >
      <View className='flex-row gap-2'>
        <GoogleLogo />
        <Text className={isDark ? 'text-[#E3E3E3]' : 'text-[#1F1F1F]'}>
          구글 계정으로 시작하기
        </Text>
      </View>
    </TouchableOpacity>
  );
}
