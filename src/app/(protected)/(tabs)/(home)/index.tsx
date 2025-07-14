import { AppText } from '@/components/AppText';
import CoupleLink from '@/components/CoupleLink';
import CoupleMemo from '@/components/CoupleMemo';
import CoupleWidget from '@/components/CoupleWidget';
import Todo from '@/components/Todo';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { EvilIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IndexScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const hasCouple = !!user?.coupleId;

  const handleNotificationPress = () => {
    router.push('/(protected)/(tabs)/(home)/notifications');
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <View className='flex-col'>
        <View className={`px-4 ${isDark ? 'bg-black' : 'bg-white'} gap-4`}>
          <View className='flex-row justify-between items-center'>
            <AppText className='font-logo text-3xl'>Our Own</AppText>
            <TouchableOpacity
              onPress={handleNotificationPress}
              className='relative'
            >
              <EvilIcons
                name='bell'
                size={32}
                color={isDark ? 'white' : 'black'}
              />
              {unreadCount > 0 && (
                <View className='absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center'>
                  <AppText className='text-white text-xs font-bold'>
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </AppText>
                </View>
              )}
            </TouchableOpacity>
          </View>
          {hasCouple ? (
            <>
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
