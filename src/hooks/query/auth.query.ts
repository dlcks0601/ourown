import { kakaoLogin, postSecritycode, signup } from '@/api/auth/auth.api';
import { useAuthStore } from '@/store/authStore';
import { SignupResponse } from '@/types/auth.type';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';

// 구글 로그인 url 코드 전달 및 로그인
export const useAuthMutation = () => {
  const { logIn } = useAuthStore();
  const { mutate } = useMutation({
    mutationFn: (securityCode: string) => postSecritycode(securityCode),
    onSuccess: async (data) => {
      const { user, jwt, isNew, partner, couple } = data;
      await logIn(user, jwt, partner, couple);
      if (isNew) {
        router.navigate('/auth/nickname');
      } else router.replace('/(protected)/(tabs)/(home)');
    },
  });
  return { googleLogin: mutate };
};

// 자체 회원가입
export const useSignupMutation = () => {
  const { logIn } = useAuthStore();
  const { mutate } = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      signup(data.email, data.password),
    onSuccess: async (data: SignupResponse) => {
      const { user, jwt, partner, couple } = data;
      await logIn(user, jwt, partner, couple);
      router.push('/auth/nickname');
    },
  });
  return { signup: mutate };
};

export const useKakaoMutation = () => {
  const { logIn } = useAuthStore();
  const { mutate } = useMutation({
    mutationFn: (accessToken: string) => kakaoLogin(accessToken),
    onSuccess: async (data) => {
      const { user, jwt, isNew, partner, couple } = data;
      await logIn(user, jwt, partner, couple);
      if (isNew) {
        router.navigate('/auth/nickname');
      } else router.navigate('/(protected)/(tabs)/(home)');
    },
  });
  return { kakaoLoginMutation: mutate };
};
