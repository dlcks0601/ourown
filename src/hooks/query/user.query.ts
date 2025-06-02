import { setNickname } from '@/api/user/user.api';
import { useAuthStore } from '@/store/authStore';
import { NicknameUpdateResponse } from '@/types/user.type';
import { useMutation } from '@tanstack/react-query';

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
