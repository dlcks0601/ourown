import { useAuthStore } from '@/store/authStore';
import { BASE_URL } from '@/utils/constants';
import axios, { AxiosError } from 'axios';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { jwt } = useAuthStore.getState();
    const accessToken = jwt.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && originalRequest) {
      console.log('🔑 토큰 만료됨, 리프레시 토큰으로 갱신 시도');
      try {
        const { jwt, logIn } = useAuthStore.getState();
        const refreshToken = jwt.refreshToken;
        if (!refreshToken) {
          console.log('❌ 리프레시 토큰 없음');
          throw new Error('No refresh token');
        }
        console.log('🔄 리프레시 토큰으로 새로운 토큰 요청');
        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          code: refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } =
          response.data.jwt;
        console.log('✅ 새로운 토큰 발급 성공');

        logIn(useAuthStore.getState().user, {
          accessToken,
          refreshToken: newRefreshToken,
        });
        console.log('💾 새로운 토큰 저장 완료');

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        console.log('🔄 실패했던 요청 재시도');
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log('❌ 리프레시 토큰 갱신 실패:', refreshError);
        useAuthStore.getState().logOut();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
