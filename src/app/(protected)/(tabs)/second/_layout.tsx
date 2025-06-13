import { Stack, usePathname } from 'expo-router';

export default function Layout() {
  const pathname = usePathname();

  return (
    <Stack
      screenOptions={{
        animation: pathname.startsWith('/second') ? 'default' : 'none',
      }}
    >
      <Stack.Screen
        name='index'
        options={{ title: 'Second', headerShown: false }}
      />
    </Stack>
  );
}
