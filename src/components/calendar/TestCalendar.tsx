// dayjs 및 관련 플러그인 import
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

// dayjs 플러그인 확장
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// 현재 서울 기준 오늘 (자정 기준)
const today = dayjs().tz('Asia/Seoul').startOf('day');

// 화면 크기 계산
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const CALENDAR_HEIGHT = SCREEN_HEIGHT * 0.7;
const ROW_HEIGHT = CALENDAR_HEIGHT / 7;

// 요일 배열 (일~토)
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

// 두 dayjs 객체가 같은 날짜인지 확인
const isSameDay = (d1: dayjs.Dayjs, d2: dayjs.Dayjs) =>
  d1.year() === d2.year() &&
  d1.month() === d2.month() &&
  d1.date() === d2.date();

// 한 달의 날짜를 7일씩 잘라서 6주(총 42개 셀) 배열로 반환
function generateCalendarMatrix(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=일요일, ..., 6=토요일
  const lastDate = new Date(year, month + 1, 0).getDate();

  const calendarDays: (Date | null)[] = [];

  // 1) 첫 번째 주의 빈 공백(전월 말 마지막 날짜 직전 부분)
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  // 2) 해당 월의 날짜들
  for (let d = 1; d <= lastDate; d++) {
    calendarDays.push(new Date(year, month, d));
  }
  // 3) 총 42개(6주) 가 되도록 null로 채우기
  while (calendarDays.length < 42) calendarDays.push(null);

  // 4) 7개씩 잘라서 6개의 주 배열 생성
  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }
  return weeks;
}

// 일정 타입 정의
type Schedule = {
  title: string;
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
  lineIndex?: number;
};

/**
 * “겹치거나(인접 포함) 않는 일정만 같은 줄에 배치”하기 위한 함수
 *
 * 1. 시작일 기준 오름차순 정렬
 * 2. 각 스케줄마다 “이미 배치된 줄(lines[i])의 마지막 종료일(lastEnd)”
 *    과 비교하여 “start > lastEnd” 인 경우만 같은 줄에 배치.
 * 3. 그렇지 않으면(인접 or 겹침) 다음 줄 검사.
 */
function assignLineIndexes(schedules: Schedule[]): Schedule[] {
  // 1) 시작일 오름차순 정렬
  const sorted = [...schedules].sort((a, b) =>
    dayjs(a.start).isBefore(dayjs(b.start)) ? -1 : 1
  );

  // lines[i].end 은 해당 줄 i 에 마지막으로 배치된 스케줄의 “end” 날짜(dayjs)
  const lines: { end: dayjs.Dayjs }[] = [];
  const result: Schedule[] = [];

  sorted.forEach((sch) => {
    const start = dayjs(sch.start);
    const end = dayjs(sch.end);
    let placed = false;

    // 2) 줄별로 검사
    for (let i = 0; i < lines.length; i++) {
      const lastEnd = lines[i].end;

      // “start가 lastEnd보다 strictly 커야만(=다음 날부터) 같은 줄 i 에 배치 가능”
      if (start.isAfter(lastEnd)) {
        // 같은 줄 i 에 배치
        lines[i].end = end; // i 번째 줄의 마지막 종료일을 갱신
        result.push({ ...sch, lineIndex: i });
        placed = true;
        break;
      }
      // 만약 start === lastEnd(인접) 혹은 start < lastEnd(겹침) 이면
      // → 같은 줄에 둘 수 없으므로 다음 줄 검사
    }

    // 3) 아직 배치되지 않았다면 → 새 줄 생성
    if (!placed) {
      lines.push({ end });
      result.push({ ...sch, lineIndex: lines.length - 1 });
    }
  });

  return result;
}

// 샘플 일정 목록 (필요시 외부에서 props로 받아올 수도 있습니다)
const rawSchedules: Schedule[] = [
  { title: '미팅', start: '2025-06-04', end: '2025-06-05' },
  { title: '미팅', start: '2025-06-05', end: '2025-06-06' },
  { title: '미팅', start: '2025-06-06', end: '2025-06-07' },
  { title: '미팅', start: '2025-06-07', end: '2025-06-08' },
  { title: '미팅', start: '2025-06-08', end: '2025-06-09' },
  { title: '미팅', start: '2025-06-09', end: '2025-06-10' },
  { title: '미팅', start: '2025-06-09', end: '2025-06-9' },
];

// 줄 인덱스까지 계산된 최종 일정 리스트
const scheduleList = assignLineIndexes(rawSchedules);

// → scheduleList 안의 각 스케줄에 붙은 lineIndex를 화면이 렌더링되기 전에 확인하려면 여기에 console.log 추가
console.log('scheduleList with lineIndex:', scheduleList);

/**
 * 한 달치를 렌더링하는 컴포넌트
 */
function CalendarMonth({
  date,
  selectedDay,
  onSelect,
}: {
  date: Date;
  selectedDay: Date;
  onSelect: (d: Date) => void;
}) {
  const isDark = useColorScheme() === 'dark';
  const selected = dayjs(selectedDay).tz('Asia/Seoul');
  const weeks = generateCalendarMatrix(date.getFullYear(), date.getMonth());

  return (
    <View style={{ width: SCREEN_WIDTH }} className='px-4'>
      {/* 월 타이틀 */}
      <View className='px-5 mb-4'>
        <Text
          className={`text-start text-4xl font-bold ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {date.getMonth() + 1}
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

      {/* 각 주(week) row */}
      {weeks.map((week, wi) => (
        <View key={wi} className='flex-row' style={{ height: ROW_HEIGHT }}>
          {week.map((dateItem, di) => {
            const dateKST = dateItem ? dayjs(dateItem).tz('Asia/Seoul') : null;
            const isToday = dateKST && isSameDay(dateKST, today);
            const isSelected = dateKST && isSameDay(dateKST, selected);

            // 이 날짜에 걸친 일정만 필터링
            const schedules = scheduleList.filter(
              (sch) =>
                dateKST &&
                dateKST.isSameOrAfter(sch.start) &&
                dateKST.isSameOrBefore(sch.end)
            );

            // 날짜 박스 배경색
            const bgColor = isSelected
              ? isDark
                ? 'bg-white'
                : 'bg-[#353535]'
              : isToday
              ? isDark
                ? 'bg-[#ffffff29]'
                : 'bg-[#84848429]'
              : '';

            // 날짜 텍스트 색
            const textColor = isSelected
              ? isDark
                ? 'text-black'
                : 'text-white'
              : isToday
              ? isDark
                ? 'text-white'
                : 'text-black'
              : isDark
              ? 'text-white'
              : 'text-black';

            // 렌더링할 줄 수: 0 ~ maxLine 까지
            const maxLine = Math.max(
              0,
              ...schedules.map((s) => s.lineIndex ?? 0)
            );

            return (
              <TouchableOpacity
                key={di}
                onPress={() => dateItem && onSelect(dateItem)}
                className={`flex-1 rounded-xl items-center justify-start ${bgColor}`}
              >
                {/* 날짜 숫자 */}
                <Text className={`mt-1 font-bold ${textColor}`}>
                  {dateItem ? dateItem.getDate() : ''}
                </Text>

                {/* 줄(lineIndex)별로 차례로 일정 표시 */}
                {Array.from({ length: maxLine + 1 }).map((_, lineIdx) => {
                  const sch = schedules.find((s) => s.lineIndex === lineIdx);
                  if (!sch) {
                    // 해당 줄에 일정이 없으면 빈 공간 채움
                    return (
                      <View key={lineIdx} className='mt-5 w-full px-1 py-0.5' />
                    );
                  }

                  const isStart = dateKST?.isSame(sch.start);
                  const isEnd = dateKST?.isSame(sch.end);

                  // 시작/중간/끝에 따라 rounded 스타일 조정
                  const roundedClass =
                    isStart && isEnd
                      ? 'rounded-full'
                      : isStart
                      ? 'rounded-l-full'
                      : isEnd
                      ? 'rounded-r-full'
                      : '';

                  return (
                    <View
                      key={lineIdx}
                      className={`mt-1 w-full px-1 py-0.5 bg-[#ea9cd5b3] ${roundedClass}`}
                    >
                      <Text
                        className={`text-xs px-1 font-medium ${
                          isStart ? 'text-white' : 'text-transparent'
                        }`}
                      >
                        {sch.title}
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
  selectedDate: Date;
  onSelectDate: (d: Date) => void;
};

export default function CoupleCalendar({
  selectedDate,
  onSelectDate,
}: CoupleCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const flatListRef = useRef<FlatList>(null);

  const getMonthPages = () => [
    dayjs(currentMonth).tz('Asia/Seoul').subtract(1, 'month').toDate(),
    dayjs(currentMonth).tz('Asia/Seoul').toDate(),
    dayjs(currentMonth).tz('Asia/Seoul').add(1, 'month').toDate(),
  ];

  const handleMomentumScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (index === 0) {
      setCurrentMonth((prev) =>
        dayjs(prev).tz('Asia/Seoul').subtract(1, 'month').toDate()
      );
    } else if (index === 2) {
      setCurrentMonth((prev) =>
        dayjs(prev).tz('Asia/Seoul').add(1, 'month').toDate()
      );
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
