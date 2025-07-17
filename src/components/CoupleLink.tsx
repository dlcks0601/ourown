import { calculateDday } from '@/constants/Day';
import { useAuthStore } from '@/store/authStore';
import { View } from 'react-native';
import { AppText } from './AppText';

export default function CoupleLink() {
  const { user, partner, couple } = useAuthStore();

  if (!user?.coupleId) {
    return null;
  }

  const dday = calculateDday(couple.anniversary);
  const formattedAnniv = couple.anniversary.slice(0, 10).replace(/-/g, '.');

  return (
    <View className='flex-1 aspect-square bg-[#401313] rounded-2xl p-4 justify-between'>
      <View className='flex-col'>
        <AppText className='text-md text-gray-200'>
          {partner.nickname} 사랑한 지
        </AppText>
        <AppText className='text-md text-gray-200'>{formattedAnniv}</AppText>
      </View>

      <View className='items-end'>
        <AppText className='text-4xl font-bold text-pink-600'>
          {String(dday).replace(/[^0-9]/g, '')}일
        </AppText>
      </View>
    </View>
  );
}
