import { AntDesign } from '@expo/vector-icons';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function CalendarFooter({
  selectedDate,
  onAddEventPress,
}: {
  selectedDate: Date | null;
  onAddEventPress: () => void;
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  if (!selectedDate) return null;

  const formatted = dayjs(selectedDate)
    .locale('ko')
    .format('YYYY년 M월 D일 (dd)');

  return (
    <View className='mt-4 px-4'>
      {/* 날짜 텍스트 */}
      <Text
        className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}
      >
        {formatted}
      </Text>

      {/* + 새로운 이벤트 버튼 */}
      <TouchableOpacity
        onPress={onAddEventPress}
        activeOpacity={0.7}
        className={`mt-4 p-4 flex-row items-center justify-between rounded-xl ${
          isDark ? 'bg-[#232323]' : 'bg-[#e0e0e0]'
        }`}
      >
        <View className='flex-row items-center gap-2'>
          <AntDesign name='plus' size={16} color={isDark ? 'white' : 'black'} />
          <Text
            className={`font-medium text-lg ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            새로운 일정
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
