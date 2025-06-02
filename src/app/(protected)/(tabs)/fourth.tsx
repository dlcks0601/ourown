import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function FourthScreen() {
  const router = useRouter();
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
    </View>
  );
}
