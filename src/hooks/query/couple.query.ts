import {
  getCoupleImage,
  getCoupleMatch,
  updateCoupleAnniversary,
} from '@/api/couple/couple.api';
import { useAuthStore } from '@/store/authStore';
import { CoupleImageResponse, CoupleMatchResponse } from '@/types/couple.type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';

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

export const usePostCoupleAnniversaryMutation = () => {
  const { updateAnniversary } = useAuthStore.getState();
  const { mutate } = useMutation({
    mutationFn: ({
      coupleId,
      anniversary,
    }: {
      coupleId: number;
      anniversary: string;
    }) => updateCoupleAnniversary(coupleId, anniversary),
    onSuccess: ({ couple }) => {
      updateAnniversary(couple.anniversary);
      router.back();
    },
  });
  return { postCoupleAnniversary: mutate };
};
