import { Button } from '@/components/Button';
import { Link, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function Second() {
  const router = useRouter();
  return (
    <View>
      <Text>Second</Text>
      <Link href='/second/nested' asChild>
        <Button title='Nested' />
      </Link>
      <Button
        title='Back'
        theme='secondary'
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );
}
