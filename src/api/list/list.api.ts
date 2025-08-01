import {
  BucketListResponse,
  DeleteListResponse,
  DoneListResponse,
  PostListResponse,
} from '@/types/list.type';
import fetcher from '@/utils/fetcher';

export const getList = async (
  coupleId: number
): Promise<BucketListResponse> => {
  const resposne = await fetcher<BucketListResponse>({
    url: `/list/${coupleId}`,
    method: 'GET',
  });
  return resposne.data;
};

export const postList = async (
  coupleId: number,
  content: string,
  categoryId: number
): Promise<PostListResponse> => {
  const response = await fetcher<PostListResponse>({
    url: '/list',
    method: 'POST',
    data: {
      coupleId,
      content,
      categoryId,
    },
  });
  return response.data;
};

export const doneList = async (
  coupleId: number,
  contentId: number
): Promise<DoneListResponse> => {
  const response = await fetcher<DoneListResponse>({
    url: `/list/${coupleId}/${contentId}`,
    method: 'POST',
    data: {
      coupleId,
      contentId,
    },
  });
  return response.data;
};

export const deleteList = async (
  coupleId: number,
  contentId: number
): Promise<DeleteListResponse> => {
  const response = await fetcher<DeleteListResponse>({
    url: `/list/${coupleId}/${contentId}`,
    method: 'DELETE',
    data: {
      coupleId,
      contentId,
    },
  });
  return response.data;
};
