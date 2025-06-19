// import { useGetCoupleInfo } from '@/hooks/query/user.query';
// import { useAuthStore } from '@/store/authStore';
// import { Image, View } from 'react-native';
// import { AppText } from './AppText';

// export default function CoupleLink() {
//   const { user, partner } = useAuthStore();
//   const isLinked = !!user.coupleId;
//   const coupleId = user.coupleId;
//   const { data } = useGetCoupleInfo(coupleId);

//   return (
//     <View className='flex-col items-center w-full'>
//       <View className='flex-row w-full items-center justify-between px-4'>
//         <View className='flex-col items-center'>
//           <Image
//             source={{ uri: user.profileUrl }}
//             width={40}
//             height={40}
//             className='rounded-full'
//           />
//           <AppText className='primary'>{user.nickname}</AppText>
//         </View>

//         {isLinked ? (
//           <AppText className='text-lg'>💖</AppText>
//         ) : (
//           <AppText className='primary'>배우자와 연결이 필요해요!</AppText>
//         )}
//         <View className='flex-col items-center'>
//           <Image
//             source={{ uri: partner.profileUrl }}
//             width={40}
//             height={40}
//             className='rounded-full'
//           />
//           <AppText className='primary'>{partner.nickname}</AppText>
//         </View>
//       </View>
//       <View>
//         <AppText className='text-lg'>사랑한지 {data?.dday}일 째</AppText>
//       </View>
//     </View>
//   );
// }

import { formatAnniversaryToKoreanDate } from '@/constants/Day';
import { useGetCoupleInfo } from '@/hooks/query/user.query';
import { useAuthStore } from '@/store/authStore';
import { View } from 'react-native';
import { AppText } from './AppText';

export default function CoupleLink() {
  const { user, partner, couple } = useAuthStore();
  const coupleId = user.coupleId;
  const { data } = useGetCoupleInfo(coupleId);
  const dday = data?.dday ?? 0;
  const formattedAnniv = formatAnniversaryToKoreanDate(couple.anniversary);

  return (
    <View className='flex-1 aspect-square bg-pink-200 rounded-2xl p-4 justify-between'>
      <View className='flex-col'>
        <AppText className='text-xl font-semibold text-gray-500'>
          {partner.nickname} 사랑한 지
        </AppText>
        <AppText className='text-md text-gray-400'>{formattedAnniv}</AppText>
      </View>

      <View className='items-end'>
        <AppText className='text-4xl font-bold text-pink-600'>{dday}일</AppText>
      </View>
    </View>
  );
}
