import { useAuthStore } from '@/store/authStore';
import { Redirect, Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)', // anchor
};

export default function ProtectedLayout() {
  const { isReady, isLoggedIn } = useAuthStore();

  if (!isReady) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect href='/login' />;
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
