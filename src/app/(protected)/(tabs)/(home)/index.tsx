import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/store/authStore';
import { Link, useRouter } from 'expo-router';
import { Alert, Text, View } from 'react-native';

export default function IndexScreen() {
  const router = useRouter();
  const { logOut, user } = useAuthStore();

  // https://reactnative.dev/docs/alert

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '로그아웃',
        style: 'destructive',
        onPress: () => {
          logOut();
          router.replace('/(auth)');
        },
      },
    ]);
  };

  return (
    <View className='justify-center flex-1 p-4'>
      <AppText center>Index Screen</AppText>
      <Link href='/home-nested' push asChild>
        <Button title='Push to /home-nested' />
      </Link>

      <Text>{user.nickname}</Text>

      <Button title='로그아웃' theme='secondary' onPress={handleLogout} />
      {/* https://reactnative.dev/docs/modal */}
    </View>
  );
}
