import { CalendarResponse, PostCalendarResponse } from '@/types/calendar.type';
import fetcher from '@/utils/fetcher';

export const getCalendar = async (
  coupleId: number,
  year: number,
  month: number
): Promise<CalendarResponse> => {
  const response = await fetcher<CalendarResponse>({
    url: '/calendar',
    method: 'GET',
    params: {
      coupleId,
      year,
      month,
    },
  });
  console.log(response.data);
  return response.data;
};

export const postCalendar = async (
  coupleId: number,
  title: string,
  start: string,
  end: string
): Promise<PostCalendarResponse> => {
  const response = await fetcher<PostCalendarResponse>({
    url: '/calendar',
    method: 'POST',
    data: {
      coupleId,
      title,
      start,
      end,
    },
  });
  return response.data;
};
