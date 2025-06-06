import CoupleCalendar from '@/components/calendar/CoupleCalendar';
import CalendarFooter from '@/components/CoupleCalendarFooter';
import { usePostCalendarMutation } from '@/hooks/query/calendar.query';
import { useAuthStore } from '@/store/authStore';
import { Entypo, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Keyboard,
  Modal,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

export default function Second() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { user } = useAuthStore();
  const [title, setTitle] = useState('');
  const currentYear = dayjs(selectedDate).year();
  const currentMonth = dayjs(selectedDate).month() + 1;

  const { postCalendar } = usePostCalendarMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'start' | 'end'>('start');
  const [isAllDay, setIsAllDay] = useState(false);

  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(
    dayjs(new Date()).add(1, 'hour').toDate()
  );

  const buttonBottom = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    const keyboardShow = Keyboard.addListener('keyboardWillShow', (e) => {
      Animated.timing(buttonBottom, {
        toValue: e.endCoordinates.height + 20,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    });

    const keyboardHide = Keyboard.addListener('keyboardWillHide', () => {
      Animated.timing(buttonBottom, {
        toValue: 40,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  const handleSubmit = () => {
    if (!title || !selectedDate || !user?.coupleId) return;

    const start = isAllDay
      ? dayjs(selectedDate).startOf('day').toISOString()
      : dayjs(startTime).toISOString();

    const end = isAllDay
      ? dayjs(selectedDate).endOf('day').toISOString()
      : dayjs(endTime).toISOString();

    postCalendar({
      coupleId: user.coupleId,
      title,
      start,
      end,
    });

    // 초기화
    setModalVisible(false);
    setTitle('');
    setIsAllDay(false);
  };

  const handleTimeChange = (_: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (!date) return;

    if (pickerMode === 'start') {
      setStartTime(date);
      setEndTime(dayjs(date).add(1, 'hour').toDate());
    } else {
      setEndTime(date);
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <View className='flex-1'>
        <CoupleCalendar
          onSelectDate={setSelectedDate}
          selectedDate={selectedDate}
        />

        <View>
          <CalendarFooter
            selectedDate={selectedDate}
            onAddEventPress={() => {
              if (selectedDate) {
                const base = new Date(selectedDate);
                setStartTime(base);
                setEndTime(dayjs(base).add(1, 'hour').toDate());
              }
              setModalVisible(true);
            }}
          />
        </View>
      </View>

      <Modal
        visible={modalVisible}
        animationType='slide'
        presentationStyle='pageSheet'
        onRequestClose={() => setModalVisible(false)}
      >
        <View className={`flex-1 ${isDark ? 'bg-[#181818]' : 'bg-white'}`}>
          <View className='items-center mt-4 mb-4'>
            <View className='w-10 h-1 bg-gray-400 rounded-full opacity-60' />
          </View>

          {/* 제목 */}
          <View className='flex-col px-4 mt-5'>
            <View className='flex-row items-center'>
              <View
                className={`w-1 h-8 rounded-full ${
                  isDark ? 'bg-white' : 'bg-black'
                } mr-4`}
              />
              <View className='w-full'>
                <TextInput
                  placeholder='제목'
                  placeholderTextColor={isDark ? '#999' : '#ccc'}
                  returnKeyType='done'
                  onChangeText={setTitle}
                  style={{
                    color: isDark ? '#ffffff' : '#000000',
                    fontSize: 28,
                    fontWeight: 'bold',
                    width: 'auto',
                    height: 30,
                  }}
                />
              </View>
            </View>

            {/* 일정 시간 */}
            <View className='flex-row mt-10 items-center justify-between'>
              <View className='flex-row items-center'>
                <View className='flex-row mr-4'>
                  <MaterialCommunityIcons
                    name='clock-time-nine-outline'
                    size={20}
                    color={isDark ? '#cdcdcd' : '#2a2a2a'}
                  />
                </View>

                <View className='flex-row items-center'>
                  <TouchableOpacity
                    onPress={() => {
                      setShowPicker(true);
                      setPickerMode('start');
                    }}
                  >
                    <Text
                      className={`${
                        isAllDay
                          ? 'text-xl font-semibold'
                          : 'text-md font-normal'
                      } ${isDark ? 'text-white' : 'text-black'}`}
                    >
                      {dayjs(startTime).locale('ko').format('M월 D일 (dd)')}
                    </Text>
                    {!isAllDay && (
                      <Text
                        className={`text-2xl font-semibold ${
                          isDark ? 'text-white' : 'text-black'
                        } `}
                      >
                        {dayjs(startTime).format('h:mm A')}
                      </Text>
                    )}
                  </TouchableOpacity>

                  <EvilIcons
                    name='chevron-right'
                    size={40}
                    color={isDark ? '#cdcdcd' : '#2a2a2a'}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      setShowPicker(true);
                      setPickerMode('end');
                    }}
                  >
                    <Text
                      className={`${
                        isAllDay
                          ? 'text-xl font-semibold'
                          : 'text-md font-normal'
                      } ${isDark ? 'text-white' : 'text-black'}`}
                    >
                      {dayjs(endTime).locale('ko').format('M월 D일 (dd)')}
                    </Text>
                    {!isAllDay && (
                      <Text
                        className={`text-2xl font-semibold ${
                          isDark ? 'text-white' : 'text-black'
                        } `}
                      >
                        {dayjs(endTime).format('h:mm A')}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* 하루 종일 토글 */}
              {/* <TouchableOpacity
                onPress={() => setIsAllDay((prev) => !prev)}
                className={`rounded-full px-6 py-2 ${
                  isAllDay
                    ? isDark
                      ? 'bg-white'
                      : 'bg-black'
                    : isDark
                    ? 'border border-white'
                    : 'border border-black'
                }`}
              >
                <Text
                  className={`text-md ${
                    isAllDay
                      ? isDark
                        ? 'text-black'
                        : 'text-white'
                      : isDark
                      ? 'text-white'
                      : 'text-black'
                  }`}
                >
                  하루 종일
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>

          {/* Picker */}
          {showPicker && (
            <View className='items-center justify-center'>
              <DateTimePicker
                value={pickerMode === 'start' ? startTime : endTime}
                mode={isAllDay ? 'date' : 'datetime'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleTimeChange}
                themeVariant={isDark ? 'dark' : 'light'}
                locale='ko-KR'
              />
            </View>
          )}

          {/* 저장 버튼 */}
          <Animated.View
            className='absolute right-5'
            style={{ bottom: buttonBottom }}
          >
            <TouchableOpacity
              onPress={handleSubmit}
              className={`${
                isDark ? 'bg-white' : 'bg-[#262626]'
              } w-14 h-14 rounded-full items-center justify-center`}
            >
              <Entypo
                name='check'
                size={24}
                color={isDark ? '#2a2a2a' : '#ffffff'}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
