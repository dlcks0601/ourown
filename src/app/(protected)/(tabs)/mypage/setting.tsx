import { AppText } from '@/components/AppText';
import { calculateDday, formatToKoreanDate } from '@/constants/Day';
import { useAuthStore } from '@/store/authStore';
import { SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  ActionSheetIOS,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user, partner, couple } = useAuthStore();
  const dday = calculateDday(couple.anniversary);
  const formattedAnniv = formatToKoreanDate(couple.anniversary);

  const handleUserPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['닉네임', '생년월일', '취소'],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 2,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          router.push('/mypage/nickname-setting');
        } else if (buttonIndex === 1) {
          // 생년월일 설정 페이지로 이동 (추후 구현)
          Alert.alert('알림', '생년월일 설정 페이지는 추후 구현 예정입니다.');
        }
      }
    );
  };

  return (
    <SafeAreaView
      edges={['top']}
      className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}
    >
      <Text
        className={`text-3xl font-logo mb-2 px-4 ${
          isDark ? 'text-white' : 'text-black'
        }`}
      >
        Couple Setting
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='flex-col mt-4 gap-6'>
          <View className='flex-row items-center px-4 w-full'>
            <TouchableOpacity
              onPress={() => router.push('/mypage/start-setting')}
              className='flex-row items-center justify-between w-full pr-8'
            >
              <AppText className='font-logo text-xl'>Our Start</AppText>
              <AppText className='text-xl font-logo'>{formattedAnniv}</AppText>
            </TouchableOpacity>
            <SimpleLineIcons
              className='absolute right-4'
              name='arrow-right'
              size={12}
              color={isDark ? 'white' : 'black'}
            />
          </View>

          <TouchableOpacity
            className='flex-row items-center justify-between px-4'
            onPress={handleUserPress}
          >
            <View className='flex-col items-start gap-2'>
              <View className='flex-row items-center gap-4'>
                <Image
                  source={{ uri: user.profileUrl }}
                  className='w-10 h-10 rounded-full'
                />
                <View>
                  <AppText className='font-extralight text-xl'>
                    {user.nickname}
                  </AppText>
                  <AppText className='font-extralight text-xl'>
                    1999.01.01
                  </AppText>
                </View>
              </View>
            </View>
            <SimpleLineIcons
              name='arrow-right'
              size={12}
              color={isDark ? 'white' : 'black'}
            />
          </TouchableOpacity>

          <View className='flex-row items-center justify-between px-4'>
            <View className='flex-col items-start gap-2'>
              <View className='flex-row items-center gap-4'>
                <Image
                  source={{ uri: partner.profileUrl }}
                  className='w-10 h-10 rounded-full'
                />
                <View>
                  <AppText className='font-extralight text-xl'>
                    {partner.nickname}
                  </AppText>
                  <AppText className='font-extralight text-xl'>
                    1999.01.01
                  </AppText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
