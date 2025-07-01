// app/(protected)/_layout.tsx
import { useAuthStore } from '@/store/authStore';
import { Redirect, Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function ProtectedLayout() {
  const { isReady, isLoggedIn, user } = useAuthStore();

  if (!isReady) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect href='/' />;
  }

  // if (user && !user.coupleId) {
  //   return <Redirect href='/auth/couplewaitcode' />;
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
