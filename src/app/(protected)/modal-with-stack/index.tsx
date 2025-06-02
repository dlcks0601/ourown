import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Link } from 'expo-router';
import { View } from 'react-native';

export default function ModalWithStackScreen() {
  return (
    <View className='justify-center flex-1 p-4'>
      <AppText center>Modal With Stack Screen</AppText>
      <Link href='/modal-with-stack/nested' push asChild>
        <Button title='Push to /modal-with-stack/nested' theme='secondary' />
      </Link>
    </View>
  );
}
