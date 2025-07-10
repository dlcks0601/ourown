import { CoupleInfoResponse } from '@/types/couple.type';
import {
  NicknameUpdateResponse,
  UploadProfileImageResponse,
  UserBirthdayUpdateResponse,
} from '@/types/user.type';
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
  console.log(response.data);
  return response.data;
};

export const fetchCoupleInfo = async (
  coupleId: number
): Promise<CoupleInfoResponse> => {
  const response = await fetcher<CoupleInfoResponse>({
    url: `/couple/${coupleId}/anniversary`,
    method: 'GET',
  });

  return response.data;
};

export const updateUserBirthday = async (
  birthday: string
): Promise<UserBirthdayUpdateResponse> => {
  const response = await fetcher<UserBirthdayUpdateResponse>({
    url: `/user/birthday`,
    method: 'POST',
    data: {
      birthday,
    },
  });
  console.log(response.data);
  return response.data;
};

export const uploadProfileImage = async (
  file: FormData
): Promise<UploadProfileImageResponse> => {
  const response = await fetcher<UploadProfileImageResponse>({
    url: '/user/image',
    method: 'POST',
    data: file,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(response.data);
  return response.data;
};
