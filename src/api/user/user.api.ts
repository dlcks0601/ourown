import { CoupleInfoResponse } from '@/types/couple.type';
import { NicknameUpdateResponse } from '@/types/user.type';
import fetcher from '@/utils/fetcher';

export const setNickname = async (
  nickname: string
): Promise<NicknameUpdateResponse> => {
  const response = await fetcher<NicknameUpdateResponse>({
    url: '/user/nickname',
    method: 'POST',
    data: {
      nickname,
    },
  });
  return response.data;
};

export const fetchCoupleInfo = async (
  coupleId: number
): Promise<CoupleInfoResponse> => {
  const response = await fetcher<CoupleInfoResponse>({
    url: `/couple/${coupleId}/anniversary`,
    method: 'GET',
  });
  console.log(response.data);
  return response.data;
};
