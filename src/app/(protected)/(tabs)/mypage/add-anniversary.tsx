import { AppText } from '@/components/AppText';
import { useAuthStore } from '@/store/authStore';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SimpleLineIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import SetInput from '@/components/SetInput';
import { usePostMypageAnniversary } from '@/hooks/query/mypage.query';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { router } from 'expo-router';
import { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function AddAnniversaryScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { user } = useAuthStore();
  const coupleId = user.coupleId;
  const initialDate = new Date();
  const [date, setDate] = useState(initialDate);
  const [title, setTitle] = useState('');
  const { postMypageAnniversary } = usePostMypageAnniversary();

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
                기념일을 추가해주세요
              </Text>
              <View className='flex-col justify-center items-center px-4 mt-8'>
                <SetInput
                  value={title}
                  onChangeText={setTitle}
                  placeholder='기념일 이름을 입력해주세요'
                  maxLength={20}
                />
              </View>
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
                if (selectedDate) setDate(selectedDate);
              }}
              locale='ko-KR'
              minimumDate={new Date()}
            />
          </View>
          <TouchableOpacity
            className='bg-[#E2CBA5] rounded-md p-4'
            onPress={() => {
              if (title.trim()) {
                const dateString = dayjs(date).format('YYYY-MM-DD');
                postMypageAnniversary({
                  coupleId,
                  title,
                  date: dateString,
                });
                router.back();
              }
            }}
          >
            <AppText className='text-center text-black text-lg'>완료</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
