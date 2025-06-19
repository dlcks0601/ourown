import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: isDark ? 'black' : 'white',
        },
      }}
    >
      <Stack.Screen name='signup' options={{ headerShown: false }} />
      <Stack.Screen name='login' options={{ headerShown: false }} />
      <Stack.Screen name='nickname' options={{ headerShown: false }} />
      <Stack.Screen name='couplecode' options={{ headerShown: false }} />
    </Stack>
  );
}
