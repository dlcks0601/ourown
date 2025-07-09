import { getMypageAnniversary } from '@/api/mypage/mypage.api';
import { useQuery } from '@tanstack/react-query';

export const useGetMypageAnniversary = () => {
  return useQuery({
    queryKey: ['mypageAnniversary'],
    queryFn: () => getMypageAnniversary(),
  });
};
