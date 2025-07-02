import { AppText } from '@/components/AppText';
import CoupleLink from '@/components/CoupleLink';
import CoupleMemo from '@/components/CoupleMemo';
import CoupleWidget from '@/components/CoupleWidget';
import Todo from '@/components/Todo';
import { formatToKoreanDate } from '@/constants/Day';
import { useGetCoupleInfo } from '@/hooks/query/user.query';
import { useAuthStore } from '@/store/authStore';
import { EvilIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IndexScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user, partner, couple } = useAuthStore();
  const formattedAnniv = formatToKoreanDate(couple.anniversary);
  const coupleId = user.coupleId;
  const { data } = useGetCoupleInfo(coupleId);
  const dday = data?.dday;
  const hasCouple = !!user?.coupleId;

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <View className='flex-col'>
        <View className={`px-4 ${isDark ? 'bg-black' : 'bg-white'} gap-4`}>
          <View className='flex-row justify-between items-center'>
            <AppText className='font-logo text-3xl'>Our Own</AppText>
            <TouchableOpacity>
              <EvilIcons
                name='bell'
                size={32}
                color={isDark ? 'white' : 'black'}
              />
            </TouchableOpacity>
          </View>
          {hasCouple ? (
            <>
              {/* <View className='flex-col items-center w-full'>
                <View className='flex-row w-full items-center justify-between px-12'>
                  <View className='flex-col items-center'>
                    <Image
                      source={{ uri: user.profileUrl }}
                      width={40}
                      height={40}
                      className='rounded-full'
                    />
                    <AppText className='primary'>{user.nickname}</AppText>
                  </View>

                  <View>
                    <AppText>❤️</AppText>
                  </View>

                  <View className='flex-col items-center'>
                    <Image
                      source={{ uri: partner.profileUrl }}
                      width={40}
                      height={40}
                      className='rounded-full'
                    />
                    <AppText className='primary'>{partner.nickname}</AppText>
                  </View>
                </View>
                <View>
                  <AppText className='text-lg'>D-{dday}</AppText>
                </View>
              </View> */}
              <CoupleWidget />
              <Todo />
              <View className='flex-row w-full gap-4'>
                <CoupleMemo />
                <CoupleLink />
              </View>
            </>
          ) : (
            <View className='w-full h-full items-center justify-center'>
              <Text
                className={`text-lg ${isDark ? 'text-white' : 'text-black'}`}
              >
                커플을 연결해주세요!
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
