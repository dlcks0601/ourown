import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ title: 'Home', headerShown: false }}
      />
      <Stack.Screen
        name='todo-setting'
        options={{ title: 'TodoSetting', headerShown: false }}
      />
      <Stack.Screen
        name='todo-detail'
        options={{ title: 'TodoDetail', headerShown: false }}
      />
      <Stack.Screen
        name='notifications'
        options={{ title: 'Notifications', headerShown: false }}
      />
    </Stack>
  );
}
