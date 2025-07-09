import { AppText } from '@/components/AppText';
import { calculateDday, formatToKoreanDate } from '@/constants/Day';
import { useGetMypageAnniversary } from '@/hooks/query/mypage.query';
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
  const { logOut } = useAuthStore.getState();
  const { data } = useGetMypageAnniversary();
  const anniv = data?.anniv ?? null;

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
        <TouchableOpacity
          onPress={() => {
            router.push('/mypage/anniversary');
          }}
          className='flex-row items-center justify-between mt-3'
        >
          <AppText className='text-xl font-logo'>Anniversary</AppText>
          <SimpleLineIcons name='arrow-right' size={12} color='black' />
        </TouchableOpacity>
        <View className='flex-col px-4 py-1 border-gray-400 bg-[#dbdbdb] rounded-xl mt-4'>
          {anniv?.slice(0, 3).map((item, index, arr) => (
            <View
              key={item.id}
              className={`p-2 ${
                index !== arr.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <View className='flex-row items-center justify-between'>
                <View className='flex-col items-start gap-1'>
                  <AppText className='text-sm font-semibold'>
                    {item.type}
                  </AppText>
                  <AppText className='text-sm font-light text-gray-500'>
                    {item.date.slice(0, 10).replace(/-/g, '.')}
                  </AppText>
                </View>
                <AppText className='text-lg font-semibold'>
                  {calculateDday(item.date)}
                </AppText>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          className='bg-red-500 p-4 mt-4'
          onPress={() => {
            logOut();
          }}
        >
          <AppText className='text-white text-center'>로그아웃</AppText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
