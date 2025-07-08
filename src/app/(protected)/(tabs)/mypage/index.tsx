import { AppText } from '@/components/AppText';
import { calculateDday, formatToKoreanDate } from '@/constants/Day';
import { useAuthStore } from '@/store/authStore';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyPageScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user, partner, couple } = useAuthStore();
  const dday = calculateDday(couple.anniversary);
  const formattedAnniv = formatToKoreanDate(couple.anniversary);
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
        Our Page
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} className='p-4'>
        <TouchableOpacity
          onPress={() => {
            router.push('/mypage/setting');
          }}
          className='flex-row justify-between items-center px-16 py-4'
        >
          <View className='flex-col items-center gap-4'>
            <Image
              source={{ uri: user.profileUrl }}
              className={`w-12 h-12 rounded-full border-[0.5px] border-gray-300`}
            />
            <AppText className='text-sm'>{user.nickname}</AppText>
          </View>
          <View className='flex-col items-center justify-center mt-2'>
            <Ionicons name='heart' size={32} color='#F9C5D1' />
            <View className='flex-col items-center mt-2'>
              <AppText className='text-sm font-light'>{dday} 일 째</AppText>
              <AppText className='text-sm font-extralight'>
                {formattedAnniv}
              </AppText>
            </View>
          </View>
          <View className='flex-col items-center gap-4'>
            <Image
              source={{ uri: partner.profileUrl }}
              className={`w-12 h-12 rounded-full border-[0.5px] border-gray-300`}
            />
            <AppText className='text-sm'>{partner.nickname}</AppText>
          </View>
          <SimpleLineIcons
            name='arrow-right'
            className='absolute right-0'
            size={12}
            color={isDark ? 'white' : 'black'}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
