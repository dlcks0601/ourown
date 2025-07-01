import { getCoupleImage, getCoupleMatch } from '@/api/couple/couple.api';
import { CoupleImageResponse, CoupleMatchResponse } from '@/types/couple.type';
import { useQuery } from '@tanstack/react-query';

export const useGetCoupleImageMutation = (coupleId: number) => {
  return useQuery<CoupleImageResponse>({
    queryKey: ['coupleImage', coupleId],
    queryFn: () => getCoupleImage(coupleId),
    enabled: !!coupleId,
  });
};

export const useGetCoupleMatchQuery = () => {
  return useQuery<CoupleMatchResponse>({
    queryKey: ['coupleMatch'],
    queryFn: getCoupleMatch,
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });
};
