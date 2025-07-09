import { mypageAnniversaryResponse } from '@/types/mypage.type';
import fetcher from '@/utils/fetcher';

export const getMypageAnniversary =
  async (): Promise<mypageAnniversaryResponse> => {
    const response = await fetcher<mypageAnniversaryResponse>({
      url: `/mypage`,
      method: 'GET',
    });
    console.log(response.data);
    return response.data;
  };

export const postMypageAnniversary = async (
  coupleId: number,
  title: string,
  date: string
) => {
  const response = await fetcher<mypageAnniversaryResponse>({
    url: `/couple/${coupleId}/anniversaries`,
    method: 'POST',
    data: {
      coupleId,
      title,
      date,
    },
  });
  return response.data;
};

export const deleteMypageAnniversary = async (coupleId: number, id: number) => {
  const response = await fetcher<mypageAnniversaryResponse>({
    url: `/couple/${coupleId}/anniversaries`,
    method: 'DELETE',
    data: {
      id,
    },
  });
  return response.data;
};

export const patchMypageAnniversary = async (
  coupleId: number,
  id: number,
  title: string,
  date: string
) => {
  const response = await fetcher<mypageAnniversaryResponse>({
    url: `/couple/${coupleId}/anniversaries`,
    method: 'PUT',
    data: {
      coupleId,
      id,
      title,
      date,
    },
  });
  return response.data;
};
