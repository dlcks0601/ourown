import { deleteList, doneList, getList, postList } from '@/api/list/list.api';
import {
  BucketListResponse,
  DeleteListResponse,
  DoneListResponse,
  PostListResponse,
} from '@/types/list.type';
import { queryClient } from '@/utils/queryClinet';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetListMutation = (coupleId: number) => {
  return useQuery<BucketListResponse>({
    queryKey: ['list', coupleId],
    queryFn: () => getList(coupleId),
    enabled: !!coupleId, // id가 있어야 실행되도록
  });
};

export const usePostListMutation = () => {
  const { mutate } = useMutation({
    mutationFn: ({
      coupleId,
      content,
      categoryId,
    }: {
      coupleId: number;
      content: string;
      categoryId: number;
    }) => postList(coupleId, content, categoryId),
    onSuccess: (data: PostListResponse) => {
      queryClient.invalidateQueries({
        queryKey: ['list'],
      });
    },
  });
  return { postList: mutate };
};

export const useDoneListMutation = () => {
  const { mutate } = useMutation({
    mutationFn: ({
      coupleId,
      contentId,
    }: {
      coupleId: number;
      contentId: number;
    }) => doneList(coupleId, contentId),
    onSuccess: (data: DoneListResponse) => {
      queryClient.invalidateQueries({
        queryKey: ['list'],
      });
    },
  });
  return { doneList: mutate };
};

export const useDeleteListMutation = () => {
  const { mutate } = useMutation({
    mutationFn: ({
      coupleId,
      contetnId,
    }: {
      coupleId: number;
      contetnId: number;
    }) => deleteList(coupleId, contetnId),
    onSuccess: (data: DeleteListResponse) => {
      queryClient.invalidateQueries({
        queryKey: ['list'],
      });
    },
  });
  return { deleteList: mutate };
};
