import { CoupleImageResponse } from '@/types/couple.type';
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
