import {
  BucketListResponse,
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
  console.log(resposne.data);
  return resposne.data;
};

export const postList = async (
  coupleId: number,
  content: string
): Promise<PostListResponse> => {
  const response = await fetcher<PostListResponse>({
    url: '/list',
    method: 'POST',
    data: {
      coupleId,
      content,
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
