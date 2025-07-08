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

export function calculateDday(anniversaryDate: string): number {
  const anniversary = new Date(anniversaryDate);
  const today = new Date();

  const startDate = new Date(
    anniversary.getFullYear(),
    anniversary.getMonth(),
    anniversary.getDate()
  );
  const endDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const timeDiff = endDate.getTime() - startDate.getTime();
  return Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
}
