import { Button } from '@/components/Button';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import { Alert, Text, View } from 'react-native';

export default function FourthScreen() {
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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text className='text-red-500'>
        Edit app/index.tsx to edit this screen.
      </Text>
      <Button title='Back' onPress={() => router.back()} />
      <Button title='로그아웃' theme='secondary' onPress={handleLogout} />
      <Button
        title='커플 연결'
        theme='secondary'
        onPress={() => router.push('/auth/couplewaitcode')}
      />
    </View>
  );
}
