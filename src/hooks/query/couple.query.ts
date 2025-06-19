import { getCoupleImage } from '@/api/couple/couple.api';
import { CoupleImageResponse } from '@/types/couple.type';
import { useQuery } from '@tanstack/react-query';

export const useGetCoupleImageMutation = (coupleId: number) => {
  return useQuery<CoupleImageResponse>({
    queryKey: ['coupleImage', coupleId],
    queryFn: () => getCoupleImage(coupleId),
    enabled: !!coupleId,
  });
};
