import Calender from '@/components/CoupleCalendar';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native';

export default function Second() {
  const router = useRouter();
  return (
    <SafeAreaView className='flex-1'>
      <Calender />
    </SafeAreaView>
  );
}
