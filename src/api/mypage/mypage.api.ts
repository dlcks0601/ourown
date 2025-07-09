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
