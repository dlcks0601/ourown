import { useGetCoupleInfo } from '@/hooks/query/user.query';
import { useAuthStore } from '@/store/authStore';
import { Image, View } from 'react-native';
import { AppText } from './AppText';

export default function CoupleLink() {
  const { user, partner } = useAuthStore();
  const isLinked = !!user.coupleId;
  const coupleId = user.coupleId;
  const { data } = useGetCoupleInfo(coupleId);

  return (
    <View className='flex-col items-center w-full'>
      <View className='flex-row w-full items-center justify-between px-4'>
        <View className='flex-col items-center'>
          <Image source={{ uri: user.profileUrl }} width={24} height={24} />
          <AppText className='primary'>{user.nickname}</AppText>
        </View>

        {isLinked ? (
          <AppText className='text-lg'>💖</AppText>
        ) : (
          <AppText className='primary'>배우자와 연결이 필요해요!</AppText>
        )}
        <View className='flex-col items-center'>
          <Image source={{ uri: partner.profileUrl }} width={24} height={24} />
          <AppText className='primary'>{partner.nickname}</AppText>
        </View>
      </View>
      <View>
        <AppText className='text-lg'>사랑한지 {data?.dday}일 째</AppText>
      </View>
    </View>
  );
}
