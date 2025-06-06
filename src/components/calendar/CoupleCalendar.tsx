import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { useGetCalendar } from '@/hooks/query/calendar.query';
import { useAuthStore } from '@/store/authStore';
import { ScheduleResponse } from '@/types/calendar.type';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const CALENDAR_HEIGHT = SCREEN_HEIGHT * 0.7;
const ROW_HEIGHT = CALENDAR_HEIGHT / 7;

const today = dayjs().tz('Asia/Seoul').startOf('day');

const isSameDay = (d1: Date, d2: dayjs.Dayjs) =>
  dayjs(d1).tz('Asia/Seoul').startOf('day').isSame(d2, 'day');

function generateCalendarMatrix(year: number, month: number) {
  const jsFirst = new Date(year, month, 1).getDay();
  const firstDay = (jsFirst + 6) % 7;
  const lastDate = new Date(year, month + 1, 0).getDate();

  const calendarDays: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= lastDate; d++) {
    const date = dayjs
      .tz(`${year}-${month + 1}-${d}`, 'Asia/Seoul')
      .startOf('day')
      .toDate();
    calendarDays.push(date);
  }
  while (calendarDays.length < 42) {
    calendarDays.push(null);
  }

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }
  return weeks;
}

type Schedule = {
  title: string;
  start: string;
  end: string;
  userId?: number;
  lineIndex?: number;
};

function assignLineIndexes(schedules: Schedule[]): Schedule[] {
  const sorted = [...schedules].sort((a, b) =>
    dayjs(a.start).isBefore(dayjs(b.start)) ? -1 : 1
  );

  const lines: { end: dayjs.Dayjs }[] = [];
  const result: Schedule[] = [];

  sorted.forEach((sch) => {
    const start = dayjs.tz(sch.start, 'Asia/Seoul').startOf('day');
    const end = dayjs.tz(sch.end, 'Asia/Seoul').startOf('day');
    let placed = false;

    for (let i = 0; i < lines.length; i++) {
      const lastEnd = lines[i].end;
      if (start.isAfter(lastEnd)) {
        lines[i].end = end;
        result.push({ ...sch, lineIndex: i });
        placed = true;
        break;
      }
    }

    if (!placed) {
      lines.push({ end });
      result.push({ ...sch, lineIndex: lines.length - 1 });
    }
  });

  return result;
}

type CalendarMonthProps = {
  date: Date;
  selectedDay: Date | null;
  onSelect: (d: Date) => void;
  schedules: ScheduleResponse[];
  myUserId: number;
};

function CalendarMonth({
  date,
  selectedDay,
  onSelect,
  schedules,
  myUserId,
}: CalendarMonthProps) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const thisMonthSchedulesWithLine = useMemo<Schedule[]>(() => {
    const mapped: Schedule[] = schedules
      .map((item) => {
        const kstStart = dayjs
          .utc(item.start)
          .tz('Asia/Seoul')
          .startOf('day')
          .format('YYYY-MM-DD');
        const kstEnd = dayjs
          .utc(item.end)
          .tz('Asia/Seoul')
          .startOf('day')
          .format('YYYY-MM-DD');
        return {
          title: item.title,
          start: kstStart,
          end: kstEnd,
          userId: item.userId,
        };
      })
      .filter((sch) => {
        const s = dayjs.tz(sch.start, 'Asia/Seoul').startOf('day');
        const e = dayjs.tz(sch.end, 'Asia/Seoul').startOf('day');

        if (s.year() === year && s.month() === month) return true;
        if (e.year() === year && e.month() === month) return true;

        const monthStart = dayjs
          .tz(`${year}-${month + 1}-01`, 'Asia/Seoul')
          .startOf('day');
        const monthEnd = dayjs
          .tz(`${year}-${month + 1}-${date.getDate()}`, 'Asia/Seoul')
          .endOf('month')
          .startOf('day');
        if (s.isBefore(monthStart) && e.isAfter(monthEnd)) return true;

        return false;
      });

    return assignLineIndexes(mapped);
  }, [schedules, year, month]);

  const weeks = generateCalendarMatrix(year, month);

  const getDayTextColor = (
    isSelectedFlag: boolean,
    isTodayFlag: boolean,
    isDark: boolean
  ) => {
    if (isSelectedFlag) {
      return isDark ? 'text-black' : 'text-white';
    }
    if (isTodayFlag) {
      return isDark ? 'text-white' : 'text-black';
    }
    return isDark ? 'text-white' : 'text-black';
  };
  const getDayBgColor = (
    isSelectedFlag: boolean,
    isTodayFlag: boolean,
    isDark: boolean
  ) => {
    if (isSelectedFlag) {
      return isDark ? 'bg-white' : 'bg-[#353535]';
    }
    if (isTodayFlag) {
      return isDark ? 'bg-[#ffffff29]' : 'bg-[#84848429]';
    }
    return '';
  };

  return (
    <View style={{ width: SCREEN_WIDTH }} className='px-4'>
      {/* 월 헤더 */}
      <View className='px-5 mb-4'>
        <Text
          className={`text-start text-4xl font-bold ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {month + 1}
        </Text>
      </View>

      {/* 요일 헤더 (월요일부터 일요일) */}
      <View className='flex-row mb-2'>
        {daysOfWeek.map((day, i) => (
          <View key={i} className='flex-1 items-center justify-center mb-1'>
            <Text
              className={`text-center text-sm font-normal ${
                i === 5
                  ? 'text-blue-500'
                  : i === 6
                  ? 'text-red-500'
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

      {weeks.map((week, weekIndex) => (
        <View
          key={weekIndex}
          className='flex-row'
          style={{ height: ROW_HEIGHT }}
        >
          {week.map((dateItem, dayIndex) => {
            const dateKST = dateItem
              ? dayjs(dateItem).tz('Asia/Seoul').startOf('day')
              : null;

            const isTodayFlag = !!(
              dateItem &&
              dateKST &&
              isSameDay(dateItem, today)
            );
            const isSelected =
              !!dateItem &&
              !!selectedDay &&
              dayjs(dateItem).tz('Asia/Seoul').isSame(selectedDay, 'day') &&
              dayjs(dateItem).tz('Asia/Seoul').month() === month;

            const daySchedules = thisMonthSchedulesWithLine.filter((sch) => {
              if (!dateKST) return false;
              // “YYYY-MM-DD” 문자열을 KST 자정 dayjs 객체로 파싱
              const s = dayjs.tz(sch.start, 'Asia/Seoul').startOf('day');
              const e = dayjs.tz(sch.end, 'Asia/Seoul').startOf('day');
              return dateKST.isSameOrAfter(s) && dateKST.isSameOrBefore(e);
            });

            const firstLine = daySchedules.find((sch) => sch.lineIndex === 0);

            const secondLine = daySchedules.find((sch) => sch.lineIndex === 1);
            const limitedSchedules: Schedule[] = [];
            if (firstLine) limitedSchedules.push(firstLine);
            if (secondLine) limitedSchedules.push(secondLine);

            const maxLineIndex = 1;

            // 날짜 박스 배경, 텍스트 색
            const bgColor = getDayBgColor(isSelected, isTodayFlag, isDark);
            const textColor = getDayTextColor(isSelected, isTodayFlag, isDark);

            return (
              <TouchableOpacity
                key={dayIndex}
                onPress={() => dateItem && onSelect(dateItem)}
                className={`flex-1 items-center rounded-xl justify-start ${bgColor}`}
              >
                {/* 날짜 숫자 */}
                <Text className={`mt-1 font-bold ${textColor}`}>
                  {dateItem ? dateItem.getDate() : ''}
                </Text>

                {Array.from({ length: maxLineIndex + 1 }).map((_, _lineIdx) => {
                  const sch = limitedSchedules.find(
                    (s) => s.lineIndex === _lineIdx
                  );
                  if (!sch) {
                    return (
                      <View
                        key={_lineIdx}
                        className='mt-5 w-full px-1 py-0.5'
                      />
                    );
                  }

                  const isStart = dateKST?.isSame(
                    dayjs.tz(sch.start, 'Asia/Seoul').startOf('day')
                  );
                  const isEnd = dateKST?.isSame(
                    dayjs.tz(sch.end, 'Asia/Seoul').startOf('day')
                  );

                  const roundedClass =
                    isStart && isEnd
                      ? 'rounded-md'
                      : isStart
                      ? 'rounded-l-md'
                      : isEnd
                      ? 'rounded-r-md'
                      : '';

                  const blockBgColor =
                    sch.userId === myUserId
                      ? 'bg-[#ea9cd5b3]'
                      : 'bg-[#3d83f1a3]';
                  const titleTextColor = isDark ? 'text-white' : 'text-black';

                  return (
                    <View
                      key={`sched-${_lineIdx}`}
                      className={`mt-1 w-full px-1 py-0.5 ${blockBgColor} ${roundedClass}`}
                    >
                      <Text
                        className={`text-xs px-1 font-medium ${titleTextColor}`}
                        numberOfLines={1}
                      >
                        {isStart ? sch.title : ''}
                      </Text>
                    </View>
                  );
                })}

                {daySchedules.length > limitedSchedules.length && (
                  <Text
                    className={`mt-1 text-xs ${
                      isDark ? 'text-black' : 'text-white'
                    }`}
                  >
                    +{daySchedules.length - limitedSchedules.length}
                  </Text>
                )}
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
  const selectedDate = useMemo(
    () => externalSelectedDate ?? internalSelectedDate,
    [externalSelectedDate, internalSelectedDate]
  );
  const onSelectDate = useCallback(
    (d: Date) => {
      if (externalOnSelectDate) externalOnSelectDate(d);
      else setInternalSelectedDate(d);
    },
    [externalOnSelectDate]
  );

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const flatListRef = useRef<FlatList>(null);

  const { user } = useAuthStore();

  const { data } = useGetCalendar(
    user.coupleId,
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1
  );
  const schedules = data?.schedule ?? []; //
  const monthPages = useMemo(
    () => [
      dayjs(currentMonth).subtract(1, 'month').toDate(),
      currentMonth,
      dayjs(currentMonth).add(1, 'month').toDate(),
    ],
    [currentMonth]
  );

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
        data={monthPages}
        keyExtractor={(item) => item.toISOString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={1}
        extraData={selectedDate}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item }) => (
          <CalendarMonth
            key={`${item.toISOString()}-${selectedDate?.toISOString()}`}
            date={item}
            selectedDay={selectedDate}
            onSelect={onSelectDate}
            schedules={schedules}
            myUserId={user.id}
          />
        )}
      />
    </View>
  );
}
