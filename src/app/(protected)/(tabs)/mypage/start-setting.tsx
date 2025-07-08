import { AppText } from '@/components/AppText';
import { useSetNicknameMutation } from '@/hooks/query/user.query';
import { useAuthStore } from '@/store/authStore';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SimpleLineIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { router } from 'expo-router';
import { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StartSettingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [nickname, setNickname] = useState('');
  const { setNickname: setNicknameMutation } = useSetNicknameMutation();
  const couple = useAuthStore((state) => state.couple);
  const initialDate = couple.anniversary
    ? new Date(couple.anniversary)
    : new Date();
  const [date, setDate] = useState(initialDate);
  const [show, setShow] = useState(false);

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
            <View className='flex-col items-center gap-3'>
              <Text
                className={`text-xl ${isDark ? 'text-white' : 'text-black'}`}
              >
                변경할 기념일을 입력하세요
              </Text>
              {/* 선택된 날짜 표시 */}
              <Text className='text-3xl mt-8 text-[#E2CBA5] font-bold'>
                {date.getFullYear()}.
                {String(date.getMonth() + 1).padStart(2, '0')}.
                {String(date.getDate()).padStart(2, '0')}
              </Text>
            </View>
          </View>
        </View>
        <View className='pb-4'>
          <View className='flex-col items-center w-full px-4 '>
            <DateTimePicker
              value={date}
              mode='date'
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, selectedDate) => {
                setShow(Platform.OS === 'ios');
                if (selectedDate) setDate(selectedDate);
              }}
              locale='ko-KR'
            />
          </View>
          <TouchableOpacity className='bg-[#E2CBA5] rounded-md p-4'>
            <AppText className='text-center text-black text-lg'>완료</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
