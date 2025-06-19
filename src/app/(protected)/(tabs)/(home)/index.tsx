import CoupleLink from '@/components/CoupleLink';
import CoupleWidget from '@/components/CoupleWidget';
import PartnerStatus from '@/components/PartnerStatus';
import Todo from '@/components/Todo';
import React from 'react';
import { useColorScheme, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function IndexScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <View className='flex-col'>
        <View className={`p-4 ${isDark ? 'bg-black' : 'bg-white'} gap-4`}>
          <CoupleWidget />
          <Todo />
          <View className='flex-row w-full gap-4'>
            <PartnerStatus />
            <CoupleLink />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
