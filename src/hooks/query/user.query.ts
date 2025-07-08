import { postConnectCouple } from '@/api/couple/couple.api';
import {
  fetchCoupleInfo,
  setNickname,
  updateUserBirthday,
} from '@/api/user/user.api';
import { useAuthStore } from '@/store/authStore';
import { NicknameUpdateResponse } from '@/types/user.type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';

export const useSetNicknameMutation = () => {
  const { mutate } = useMutation({
    mutationFn: (nickname: string) => setNickname(nickname),
    onSuccess: (data: NicknameUpdateResponse) => {
      const { updateNickname } = useAuthStore.getState();
      updateNickname(data.user.nickname);
    },
  });

  return { setNickname: mutate };
};

export const useGetCoupleInfo = (coupleId: number) => {
  return useQuery({
    queryKey: ['couple', coupleId],
    queryFn: () => fetchCoupleInfo(coupleId),
    enabled: !!coupleId,
  });
};

export const useSetConnectCouple = () => {
  const { updateUser } = useAuthStore.getState();

  const { mutate } = useMutation({
    mutationFn: (code: string) => postConnectCouple(code),
    onSuccess: ({ user, partner, couple }) => {
      updateUser(user, partner, couple);
      router.replace('/(protected)/(tabs)/(home)');
    },
  });

  return { setUser: mutate };
};

export const useSetUserBirthdayMutation = () => {
  const { updateBirthday } = useAuthStore.getState();
  const { mutate } = useMutation({
    mutationFn: ({ birthday }: { birthday: string }) => {
      return updateUserBirthday(birthday);
    },
    onSuccess: ({ user }) => {
      updateBirthday(user.birthday);
      router.back();
    },
  });
  return { setUserBirthday: mutate };
};
