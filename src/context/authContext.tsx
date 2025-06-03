import { useAuthStore } from '@/store/authStore';
import { SplashScreen } from 'expo-router';
import { PropsWithChildren, useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export function AuthProvider({ children }: PropsWithChildren) {
  const { isReady } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
      setIsInitialized(true);
    }
  }, [isReady]);

  if (!isInitialized) {
    return null;
  }

  return children;
}
