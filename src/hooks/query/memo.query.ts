import {
  deleteMemo,
  getMemo,
  postMemo,
  postMemoWidget,
  putMemo,
} from '@/api/memo/memo.api';
import { useAuthStore } from '@/store/authStore';
import { queryClient } from '@/utils/queryClinet';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetMemo = (coupleId: number) => {
  return useQuery({
    queryKey: ['memo', coupleId],
    queryFn: () => getMemo(coupleId),
    enabled: !!coupleId,
  });
};

export const usePostMemoWidget = () => {
  const { user } = useAuthStore();
  const coupleId = user.coupleId;
  const { mutate } = useMutation({
    mutationFn: ({ coupleId, memoId }: { coupleId: number; memoId: number }) =>
      postMemoWidget(coupleId, memoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memo', coupleId] });
    },
  });

  return { postWidgetMemo: mutate };
};

export const useDeleteMemo = () => {
  const { user } = useAuthStore();
  const coupleId = user.coupleId;
  const { mutate } = useMutation({
    mutationFn: ({ coupleId, memoId }: { coupleId: number; memoId: number }) =>
      deleteMemo(coupleId, memoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memo', coupleId] });
    },
  });
  return { deleteMemo: mutate };
};

export const usePutMemo = () => {
  const { user } = useAuthStore();
  const coupleId = user.coupleId;
  const { mutate } = useMutation({
    mutationFn: ({
      coupleId,
      memoId,
      content,
    }: {
      coupleId: number;
      memoId: number;
      content: string;
    }) => putMemo(coupleId, memoId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memo', coupleId] });
    },
  });
  return { putMemo: mutate };
};

export const usePostMemo = () => {
  const { user } = useAuthStore();
  const coupleId = user.coupleId;
  const { mutate } = useMutation({
    mutationFn: ({
      coupleId,
      content,
    }: {
      coupleId: number;
      content: string;
    }) => postMemo(coupleId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memo', coupleId] });
    },
  });
  return { postMemo: mutate };
};
