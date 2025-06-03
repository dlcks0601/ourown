import { AuthProvider } from '@/context/authContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { queryClient } from '@/utils/queryClinet';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import '../../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Pretendard: require('../../assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-Thin': require('../../assets/fonts/Pretendard-Thin.otf'),
    'Pretendard-ExtraLight': require('../../assets/fonts/Pretendard-ExtraLight.otf'),
    'Pretendard-Light': require('../../assets/fonts/Pretendard-Light.otf'),
    'Pretendard-Medium': require('../../assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-SemiBold': require('../../assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Bold': require('../../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-ExtraBold': require('../../assets/fonts/Pretendard-ExtraBold.otf'),
    'Pretendard-Black': require('../../assets/fonts/Pretendard-Black.otf'),
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    'ITC Avant Garde Gothic LT Extra Light': require('../../assets/fonts/ITC Avant Garde Gothic LT Extra Light.ttf'),
  });

  const colorScheme = useColorScheme();

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <Stack>
            <Stack.Screen
              name='(protected)'
              options={{
                headerShown: false,
                animation: 'none',
              }}
            />
            <Stack.Screen
              name='login'
              options={{
                headerShown: false,
                animation: 'none',
              }}
            />
            <Stack.Screen
              name='auth'
              options={{
                headerShown: false,
                animation: 'none',
              }}
            />
          </Stack>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
