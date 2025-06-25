import {
  DeleteMemoResponse,
  GetMemoResponse,
  PostMemoResponse,
  PostWidgetMemoResponse,
  PutMemoResponse,
} from '@/types/memo.type';
import fetcher from '@/utils/fetcher';

export const postMemo = async (
  coupleId: number,
  content: string
): Promise<PostMemoResponse> => {
  const response = await fetcher<PostMemoResponse>({
    url: `/memo/${coupleId}`,
    method: 'POST',
    data: {
      content,
    },
  });
  return response.data;
};

export const getMemo = async (coupleId: number): Promise<GetMemoResponse> => {
  const response = await fetcher<GetMemoResponse>({
    url: `/memo/${coupleId}`,
    method: 'GET',
  });
  return response.data;
};

export const deleteMemo = async (
  coupleId: number,
  memoId: number
): Promise<DeleteMemoResponse> => {
  const response = await fetcher<DeleteMemoResponse>({
    url: `/memo/${coupleId}/${memoId}`,
    method: 'DELETE',
  });
  return response.data;
};

export const putMemo = async (
  coupleId: number,
  memoId: number,
  content: string
): Promise<PutMemoResponse> => {
  const response = await fetcher<PutMemoResponse>({
    url: `/memo/${coupleId}/${memoId}`,
    method: 'PUT',
    data: {
      content,
    },
  });
  return response.data;
};

export const postMemoWidget = async (
  coupleId: number,
  memoId: number
): Promise<PostWidgetMemoResponse> => {
  const response = await fetcher<PostWidgetMemoResponse>({
    url: `/memo/${coupleId}/widget/${memoId}`,
    method: 'POST',
  });
  return response.data;
};
