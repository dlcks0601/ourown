import { useColorScheme } from 'react-native';

interface KakaoLoginButtonProps {
  onPress: () => void;
}

export default function KakaoLoginButton({ onPress }: KakaoLoginButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
}
