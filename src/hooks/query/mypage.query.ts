import {
  deleteMypageAnniversary,
  getMypageAnniversary,
  patchMypageAnniversary,
  postMypageAnniversary,
} from '@/api/mypage/mypage.api';
import { queryClient } from '@/utils/queryClinet';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetMypageAnniversary = () => {
  return useQuery({
    queryKey: ['mypageAnniversary'],
    queryFn: () => getMypageAnniversary(),
  });
};

export const usePostMypageAnniversary = () => {
  const { mutate } = useMutation({
    mutationFn: ({
      coupleId,
      title,
      date,
    }: {
      coupleId: number;
      title: string;
      date: string;
    }) => postMypageAnniversary(coupleId, title, date),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypageAnniversary'] });
    },
  });
  return { postMypageAnniversary: mutate };
};

export const useDeleteMypageAnniversary = () => {
  const { mutate } = useMutation({
    mutationFn: ({ coupleId, id }: { coupleId: number; id: number }) =>
      deleteMypageAnniversary(coupleId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypageAnniversary'] });
    },
  });
  return { deleteMypageAnniversary: mutate };
};

export const usePatchMypageAnniversary = () => {
  const { mutate } = useMutation({
    mutationFn: ({
      coupleId,
      id,
      title,
      date,
    }: {
      coupleId: number;
      id: number;
      title: string;
      date: string;
    }) => patchMypageAnniversary(coupleId, id, title, date),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mypageAnniversary'] });
    },
  });
  return { patchMypageAnniversary: mutate };
};
