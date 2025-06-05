import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// 화면 높이의 52%를 캘린더 높이로 설정 (6주 기준)
const CALENDAR_HEIGHT = SCREEN_HEIGHT * 0.59;
const ROW_HEIGHT = CALENDAR_HEIGHT / 6;

const normalizeDate = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

function generateCalendarMatrix(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const calendarDays: (Date | null)[] = [];

  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= lastDate; d++)
    calendarDays.push(new Date(year, month, d));
  while (calendarDays.length < 42) calendarDays.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return weeks;
}

// 샘플 일정 데이터
const scheduleMap: Record<string, string[]> = {
  // '2025-06-05': ['미팅', '회의', '야옹'],
  '2025-06-20': ['미팅', '회의', '야옹'],
};

function CalendarMonth({
  date,
  selectedDay,
  onSelect,
}: {
  date: Date;
  selectedDay: Date | null;
  onSelect: (d: Date) => void;
}) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = normalizeDate(new Date());
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const weeks = generateCalendarMatrix(year, month);

  return (
    <View style={{ width: SCREEN_WIDTH }} className='px-4'>
      {/* 월 타이틀 */}
      <View className='px-5 mb-4'>
        <Text
          className={`text-start text-4xl font-bold ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {month + 1}
        </Text>
      </View>

      {/* 요일 헤더 */}
      <View className='flex-row mb-2'>
        {daysOfWeek.map((day, i) => (
          <View key={i} className='flex-1 items-center justify-center mb-1'>
            <Text
              className={`text-center text-sm font-normal ${
                i === 0
                  ? 'text-red-500'
                  : i === 6
                  ? 'text-blue-500'
                  : isDark
                  ? 'text-white'
                  : 'text-black'
              }`}
            >
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* 날짜 셀 */}
      {weeks.map((week, i) => (
        <View key={i} className='flex-row' style={{ height: ROW_HEIGHT }}>
          {week.map((dateItem, j) => {
            const isToday = dateItem && isSameDay(dateItem, today);
            const isSelected =
              dateItem && selectedDay && isSameDay(dateItem, selectedDay);
            const dateStr = dateItem
              ? dayjs(dateItem).format('YYYY-MM-DD')
              : '';
            const schedules = dateItem && scheduleMap[dateStr];

            return (
              <TouchableOpacity
                key={j}
                onPress={() => dateItem && onSelect(dateItem)}
                className={`flex-1 items-center px-1 rounded-xl justify-start ${
                  isSelected
                    ? isDark
                      ? 'bg-white'
                      : 'bg-[#353535]'
                    : isToday
                    ? isDark
                      ? 'bg-[#ffffff29]'
                      : 'bg-[#84848429]'
                    : ''
                }`}
              >
                <Text
                  className={
                    isSelected
                      ? isDark
                        ? 'text-black mt-1 font-bold'
                        : 'text-white mt-1 font-bold'
                      : isToday
                      ? isDark
                        ? 'text-white mt-1 font-bold'
                        : 'text-black mt-1 font-bold'
                      : isDark
                      ? 'text-white mt-1 font-bold'
                      : 'text-black mt-1 font-bold'
                  }
                >
                  {dateItem ? dateItem.getDate() : ''}
                </Text>

                {/* 일정 렌더링 */}
                {schedules && (
                  <>
                    {schedules.slice(0, 2).map((title, idx) => (
                      <View
                        key={idx}
                        className={`mt-1 w-full px-1 py-0.5 rounded bg-purple-200 ${
                          isSelected ? (isDark ? 'bg-black' : 'bg-white') : ''
                        }`}
                      >
                        <Text
                          className={`text-xs ${
                            isSelected
                              ? isDark
                                ? 'text-white'
                                : 'text-black'
                              : 'text-purple-800'
                          }`}
                        >
                          {title}
                        </Text>
                      </View>
                    ))}

                    {schedules.length > 2 && (
                      <Text
                        className={`text-xs font-bold mt-0.5 ${
                          isSelected
                            ? isDark
                              ? 'text-black'
                              : 'text-white'
                            : 'text-gray-500'
                        }`}
                      >
                        +{schedules.length - 2}
                      </Text>
                    )}
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

export default function SwipeCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const getMonthPages = () => [
    dayjs(currentMonth).subtract(1, 'month').toDate(),
    currentMonth,
    dayjs(currentMonth).add(1, 'month').toDate(),
  ];

  const handleMomentumScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (index === 0) {
      setCurrentMonth((prev) => dayjs(prev).subtract(1, 'month').toDate());
    } else if (index === 2) {
      setCurrentMonth((prev) => dayjs(prev).add(1, 'month').toDate());
    }

    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index: 1, animated: false });
    }, 100);
  };

  return (
    <View style={{ height: CALENDAR_HEIGHT }}>
      <FlatList
        ref={flatListRef}
        data={getMonthPages()}
        keyExtractor={(item) => item.toISOString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={1}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <CalendarMonth
            date={item}
            selectedDay={selectedDay}
            onSelect={setSelectedDay}
          />
        )}
      />
    </View>
  );
}
