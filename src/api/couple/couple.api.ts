import {
  ConnectCoupleResponse,
  CoupleImageResponse,
  CoupleMatchResponse,
  postCoupleAnniversaryResponse,
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

export const getCoupleAnniversary = async (
  coupleId: number
): Promise<postCoupleAnniversaryResponse> => {
  const response = await fetcher<postCoupleAnniversaryResponse>({
    url: `/couple/${coupleId}/anniversary`,
    method: 'GET',
  });
  return response.data;
};

export const updateCoupleAnniversary = async (
  coupleId: number,
  anniversary: string
): Promise<postCoupleAnniversaryResponse> => {
  const response = await fetcher<postCoupleAnniversaryResponse>({
    url: `/couple/${coupleId}/anniversary`,
    method: 'POST',
    data: {
      anniversary,
    },
  });
  console.log(response.data);
  return response.data;
};
