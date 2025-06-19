import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatAnniversaryToKoreanDate(utcDateString: string): string {
  return dayjs(utcDateString)
    .tz('Asia/Seoul') // 한국 시간대 적용
    .locale('ko') // 한국어 요일
    .format('YYYY.MM.DD (dd)');
}
