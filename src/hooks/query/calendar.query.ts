import { getCalendar, postCalendar } from '@/api/calendar/calendar.api';
import { PostCalendarResponse } from '@/types/calendar.type';
import { queryClient } from '@/utils/queryClinet';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetCalendar = (
  coupleId: number,
  year: number,
  month: number
) => {
  return useQuery({
    queryKey: ['calendar', coupleId, year, month],
    queryFn: () => getCalendar(coupleId, year, month),
  });
};

export const usePostCalendarMutation = () => {
  const { mutate } = useMutation({
    mutationFn: ({
      coupleId,
      title,
      start,
      end,
    }: {
      coupleId: number;
      title: string;
      start: string;
      end: string;
    }) => postCalendar(coupleId, title, start, end),
    onSuccess: (data: PostCalendarResponse) => {
      queryClient.invalidateQueries({
        queryKey: ['calendar'],
      });
    },
  });
  return { postCalendar: mutate };
};
