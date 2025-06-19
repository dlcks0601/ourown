// app/(protected)/_layout.tsx
import { useAuthStore } from '@/store/authStore';
import { Redirect, Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function ProtectedLayout() {
  const { isReady, isLoggedIn, couple } = useAuthStore();

  if (!isReady) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect href='/login' />;
  }

  // 커플 정보가 등록되지 않은 경우
  if (!couple?.anniversary) {
    return <Redirect href='/auth/couplecode' />;
  }

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
