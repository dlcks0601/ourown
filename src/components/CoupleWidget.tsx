// 경로 맞게 수정하세요
import { useGetCoupleImageMutation } from '@/hooks/query/couple.query';
import { useAuthStore } from '@/store/authStore'; // 커플 ID를 가져오는 방식에 따라 수정하세요
import { ActivityIndicator, Image, Text, View } from 'react-native';

export default function CoupleWidget() {
  const { user } = useAuthStore();
  const coupleId = user.coupleId;

  const { data, isLoading, isError } = useGetCoupleImageMutation(coupleId);

  if (isLoading) {
    return <ActivityIndicator size='large' />;
  }

  if (isError || !data?.widget?.photoUrl) {
    return (
      <View>
        <Text>이미지를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View className='items-center justify-center w-full'>
      <Image
        source={{ uri: data.widget.photoUrl }}
        resizeMode='cover'
        style={{ width: '100%', height: 200, borderRadius: 16 }}
      />
    </View>
  );
}
