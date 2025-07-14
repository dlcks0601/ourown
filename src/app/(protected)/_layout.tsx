// app/(protected)/_layout.tsx
import { useNotificationService } from '@/api/notification/notification.api';
import { useAuthStore } from '@/store/authStore';
import { Redirect, Stack } from 'expo-router';
import { useEffect } from 'react';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function ProtectedLayout() {
  const { isReady, isLoggedIn, user } = useAuthStore();
  const { connectToSSE, disconnectFromSSE, isConnected } =
    useNotificationService();

  // SSE 연결 테스트
  useEffect(() => {
    if (isLoggedIn && user.id) {
      console.log('🔗 SSE 연결 시도 중... userId:', user.id);
      const eventSource = connectToSSE();

      if (eventSource) {
        console.log('✅ SSE 연결 성공!');
      } else {
        console.log('❌ SSE 연결 실패!');
      }
    }

    return () => {
      if (isConnected()) {
        console.log('🔌 SSE 연결 해제');
        disconnectFromSSE();
      }
    };
  }, [isLoggedIn, user.id]);

  if (!isReady) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect href='/login' />;
  }

  // if (user && !user.coupleId) {
  //   return <Redirect href='/auth/couplecode' />;
  // }

  return (
    <Stack>
      <Stack.Screen
        name='(tabs)'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
