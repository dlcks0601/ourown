import { LoginResponse, SignupResponse } from '@/types/auth.type';
import fetcher from '@/utils/fetcher';

export const postSecritycode = async (
  securityCode: string
): Promise<LoginResponse> => {
  const response = await fetcher<LoginResponse>({
    url: 'https://duo.yeol.store/auth/google/verify',
    method: 'POST',
    data: {
      securityCode,
    },
  });
  console.log('구글 로그인', response.data);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await fetcher<LoginResponse>({
    url: '/auth/login',
    method: 'POST',
    data: {
      email,
      password,
    },
  });
  console.log(response.data);
  return response.data;
};

export const signup = async (email: string, password: string) => {
  const response = await fetcher<SignupResponse>({
    url: '/auth/register',
    method: 'POST',
    data: {
      email,
      password,
    },
  });
  return response.data;
};
