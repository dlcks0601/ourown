import { AppText } from '@/components/AppText';
import { View } from 'react-native';

export default function NestedScreen() {
  return (
    <View className='justify-center flex-1 p-4'>
      <AppText center>Nested Screen</AppText>
    </View>
  );
}
