import { AppText } from '@/components/AppText';
import { useAuthStore } from '@/store/authStore';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SimpleLineIcons } from '@expo/vector-icons';

import { usePostCoupleAnniversaryMutation } from '@/hooks/query/couple.query';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StartSettingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user } = useAuthStore();
  const couple = useAuthStore((state) => state.couple);
  const initialDate = couple.anniversary
    ? new Date(couple.anniversary)
    : new Date();
  const [date, setDate] = useState(initialDate);
  const { postCoupleAnniversary } = usePostCoupleAnniversaryMutation();
  const coupleId = user.coupleId;

  const pickImage = async () => {
    // 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('권한 필요', '앨범 접근 권한이 필요합니다.');
      return;
    }

    // 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      // 선택된 이미지 처리
      const selectedImage = result.assets[0];
      console.log('Selected image:', selectedImage.uri);

      // TODO: 여기에 이미지 업로드 API 호출 로직 추가
      // 예: uploadProfileImage(selectedImage.uri);

      Alert.alert('성공', '프로필 이미지가 변경되었습니다.');
    }
  };

  return (
    <SafeAreaView
      edges={['top']}
      className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      <View className='flex-1 items-center justify-between mt-4'>
        <View>
          <View className='flex-row justify-between items-center w-full px-4 relative'>
            {/* 뒤로가기 */}
            <TouchableOpacity
              onPress={() => router.back()}
              className='absolute left-4'
            >
              <SimpleLineIcons
                name='arrow-left'
                size={18}
                color={isDark ? 'white' : 'black'}
              />
            </TouchableOpacity>
            {/* 로고 */}
            <View className='flex-col w-full items-center'>
              <View className='flex-col'>
                <AppText className='text-2xl font-logo'>Our</AppText>
                <AppText className='text-2xl font-logo mt-[-12px]'>Own</AppText>
              </View>
            </View>
          </View>
          <View className='flex-col items-center mt-10'>
            <View className='flex-col items-center gap-12'>
              <Text
                className={`text-xl ${isDark ? 'text-white' : 'text-black'}`}
              >
                프로필 이미지를 변경하세요
              </Text>

              <Image
                source={{ uri: user.profileUrl }}
                className={`w-32 h-32 rounded-full border-[0.5px] border-gray-300`}
              />
              <TouchableOpacity
                className='bg-[#E2CBA5] rounded-md p-4'
                onPress={pickImage}
              >
                <AppText className='text-md'>프로필 이미지 변경</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
