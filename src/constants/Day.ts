import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatToKoreanDate(utcDateString: string): string {
  return dayjs(utcDateString)
    .tz('Asia/Seoul') // 한국 시간대 적용
    .locale('ko') // 한국어 요일
    .format('YYYY.MM.DD');
}

export function calculateDday(dateString: string): string {
  const today = dayjs().startOf('day');
  const target = dayjs(dateString).startOf('day');
  const diff = target.diff(today, 'day');

  if (diff === 0) return 'D-DAY';
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
}
