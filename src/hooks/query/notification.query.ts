import { getPrevNotification } from '@/api/notification/notification.api';
import { useQuery } from '@tanstack/react-query';

export const usePrevNotificationQuery = () => {
  return useQuery({
    queryKey: ['prevNotification'],
    queryFn: getPrevNotification,
  });
};
