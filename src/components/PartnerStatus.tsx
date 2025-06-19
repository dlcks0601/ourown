import { formatAnniversaryToKoreanDate } from '@/constants/Day';
import { useGetCoupleInfo } from '@/hooks/query/user.query';
import { useAuthStore } from '@/store/authStore';
import { View } from 'react-native';
import { AppText } from './AppText';

export default function PartnerStatus() {
  const { user, partner, couple } = useAuthStore();
  const coupleId = user.coupleId;
  const { data } = useGetCoupleInfo(coupleId);
  const dday = data?.dday ?? 0;
  const formattedAnniv = formatAnniversaryToKoreanDate(couple.anniversary);

  return (
    <View className='flex-1 aspect-square bg-pink-100 rounded-2xl p-4 justify-between'>
      <AppText>안녕하세요!</AppText>
      <AppText className='font-bold'>{user.nickname}</AppText>
    </View>
  );
}
