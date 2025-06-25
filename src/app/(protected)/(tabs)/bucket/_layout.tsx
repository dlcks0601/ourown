import { Stack, usePathname } from 'expo-router';

export default function Layout() {
  const pathname = usePathname();

  return (
    <Stack
      screenOptions={{
        animation: pathname.startsWith('/bucket') ? 'default' : 'none',
      }}
    >
      <Stack.Screen
        name='index'
        options={{ title: 'Bucket', headerShown: false }}
      />
    </Stack>
  );
}
