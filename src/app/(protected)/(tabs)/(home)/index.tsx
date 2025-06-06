import Todo from '@/components/Todo';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { useColorScheme, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function IndexScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user } = useAuthStore();

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <View className='flex-col'>
        <View className={`p-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
          <Todo />
        </View>
        {/* <View>
          <CoupleCalendar />
        </View> */}
      </View>
    </SafeAreaView>
  );
}
