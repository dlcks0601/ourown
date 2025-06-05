import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const today = dayjs().tz('Asia/Seoul').startOf('day').toDate();
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
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

type Schedule = {
  title: string;
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
};

const scheduleList: Schedule[] = [
  { title: '미팅', start: '2025-06-19', end: '2025-06-21' },
  { title: '야옹', start: '2025-06-12', end: '2025-06-12' },
  { title: '야옹', start: '2025-07-12', end: '2025-07-12' },
];

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

            const dayStr = dateItem ? dayjs(dateItem).format('YYYY-MM-DD') : '';

            const schedules = scheduleList.filter(
              (item) =>
                dateItem &&
                dayjs(dayStr).isSameOrAfter(item.start) &&
                dayjs(dayStr).isSameOrBefore(item.end)
            );

            return (
              <TouchableOpacity
                key={j}
                onPress={() => dateItem && onSelect(dateItem)}
                className={`flex-1 items-center rounded-xl justify-start ${
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

                {/* 일정 블럭 */}
                {schedules.map((item, idx) => {
                  const isStart = dayjs(dayStr).isSame(item.start);
                  const isEnd = dayjs(dayStr).isSame(item.end);
                  const isMiddle =
                    dayjs(dayStr).isAfter(item.start) &&
                    dayjs(dayStr).isBefore(item.end);

                  const bgColor = 'bg-[#ea9cd5b3]';
                  let rounded = '';
                  if (isStart && isEnd) rounded = 'rounded-full';
                  else if (isStart) rounded = 'rounded-l-full';
                  else if (isEnd) rounded = 'rounded-r-full';

                  return (
                    <View
                      key={idx}
                      className={`mt-1 w-full px-1 py-0.5 ${bgColor} ${rounded}`}
                    >
                      <Text
                        className={`text-xs px-1 font-medium ${
                          isStart ? 'text-white' : 'text-transparent'
                        }`}
                      >
                        {item.title}
                      </Text>
                    </View>
                  );
                })}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

type CoupleCalendarProps = {
  selectedDate?: Date | null;
  onSelectDate?: (d: Date) => void;
};

export default function CoupleCalendar({
  selectedDate: externalSelectedDate,
  onSelectDate: externalOnSelectDate,
}: CoupleCalendarProps) {
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(
    externalSelectedDate ?? new Date()
  );
  const selectedDate = externalSelectedDate ?? internalSelectedDate;
  const onSelectDate = externalOnSelectDate ?? setInternalSelectedDate;

  const [currentMonth, setCurrentMonth] = useState(new Date());
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
            selectedDay={selectedDate}
            onSelect={onSelectDate}
          />
        )}
      />
    </View>
  );
}
