import { Stack, usePathname } from 'expo-router';

export default function Layout() {
  const pathname = usePathname();

  return (
    <Stack
      screenOptions={{
        animation: pathname.startsWith('/mypage') ? 'default' : 'none',
      }}
    >
      <Stack.Screen
        name='index'
        options={{ title: 'Mypage', headerShown: false }}
      />
      <Stack.Screen
        name='setting'
        options={{ title: 'Setting', headerShown: false }}
      />
      <Stack.Screen
        name='start-setting'
        options={{ title: 'StartSetting', headerShown: false }}
      />
      <Stack.Screen
        name='nickname-setting'
        options={{ title: 'Nickname Setting', headerShown: false }}
      />
      <Stack.Screen
        name='birthday-setting'
        options={{ title: 'Birthday Setting', headerShown: false }}
      />
      <Stack.Screen
        name='profile-setting'
        options={{ title: 'Profile Setting', headerShown: false }}
      />
    </Stack>
  );
}
