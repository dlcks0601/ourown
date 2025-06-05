import CoupleCalendar from '@/components/CoupleCalendar';
import Todo from '@/components/Todo';
import { useRouter } from 'expo-router';
import React from 'react';
import { useColorScheme, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function IndexScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <View className='flex-col gap-4'>
        <View className={`p-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
          <Todo />
        </View>
        <View>
          <CoupleCalendar />
        </View>
      </View>
    </SafeAreaView>
  );
}
