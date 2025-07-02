import { useGetMemo } from '@/hooks/query/memo.query';
import { useAuthStore } from '@/store/authStore';
import { View } from 'react-native';
import { AppText } from './AppText';

export default function CoupleMemo() {
  const { user } = useAuthStore();
  const { data } = useGetMemo(user.coupleId);

  if (!user?.coupleId) {
    return null;
  }

  const widgetMemo = data?.memo.find((m) => m.isWidgetMemo);

  if (!widgetMemo) {
    return (
      <View className='flex-1 aspect-square bg-pink-100 rounded-2xl p-4 items-center justify-center'>
        <AppText className='text-gray-400'>위젯 메모가 없습니다.</AppText>
      </View>
    );
  }

  return (
    <View className='flex-1 aspect-square bg-pink-100 rounded-2xl p-4 justify-between'>
      <AppText className='text-black text-xl'>{widgetMemo.content}</AppText>
      <AppText className='font-bold text-black text-xl'>
        {widgetMemo.user.nickname}
      </AppText>
    </View>
  );
}
