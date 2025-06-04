import Todo from '@/components/Todo';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import { Alert, View } from 'react-native';

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
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <View className='justify-center flex-1 p-4'>
      <Todo />
    </View>
  );
}
