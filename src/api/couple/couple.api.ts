import {
  ConnectCoupleResponse,
  CoupleImageResponse,
  CoupleMatchResponse,
} from '@/types/couple.type';
import fetcher from '@/utils/fetcher';

export const getCoupleImage = async (
  coupleId: number
): Promise<CoupleImageResponse> => {
  const response = await fetcher<CoupleImageResponse>({
    url: `/couple/${coupleId}/widget`,
    method: 'GET',
  });
  return response.data;
};

export const postConnectCouple = async (
  code: string
): Promise<ConnectCoupleResponse> => {
  const response = await fetcher<ConnectCoupleResponse>({
    url: '/user/match',
    method: 'POST',
    data: {
      code,
    },
  });
  return response.data;
};

export const getCoupleMatch = async (): Promise<CoupleMatchResponse> => {
  const response = await fetcher<CoupleMatchResponse>({
    url: '/user/match',
    method: 'GET',
  });
  return response.data;
};
