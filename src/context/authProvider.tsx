import { useAuthStore } from '@/store/authStore';
import { SplashScreen, useRouter } from 'expo-router';
import { PropsWithChildren, useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export function AuthProvider({ children }: PropsWithChildren) {
  const { isReady, isLoggedIn } = useAuthStore();
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
      setIsInitialized(true);
    }
  }, [isReady]);

  useEffect(() => {
    if (isInitialized) {
      if (isLoggedIn) {
        router.replace('/(protected)/(tabs)/(home)');
      } else {
        router.replace('/(auth)');
      }
    }
  }, [isInitialized, isLoggedIn]);

  if (!isInitialized) {
    return null;
  }

  return children;
}

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { SplashScreen, useRouter } from "expo-router";
// import { createContext, PropsWithChildren, useEffect, useState } from "react";

// SplashScreen.preventAutoHideAsync();

// type AuthState = {
//   isLoggedIn: boolean;
//   isReady: boolean;
//   logIn: () => void;
//   logOut: () => void;
// };

// const authStorageKey = "auth-key";

// export const AuthContext = createContext<AuthState>({
//   isLoggedIn: false,
//   isReady: false,
//   logIn: () => {},
//   logOut: () => {},
// });

// export function AuthProvider({ children }: PropsWithChildren) {
//   const [isReady, setIsReady] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();

//   const storeAuthState = async (newState: { isLoggedIn: boolean }) => {
//     try {
//       const jsonValue = JSON.stringify(newState);
//       await AsyncStorage.setItem(authStorageKey, jsonValue);
//     } catch (error) {
//       console.log("Error saving", error);
//     }
//   };

//   const logIn = () => {
//     setIsLoggedIn(true);
//     storeAuthState({ isLoggedIn: true });
//     router.replace("/");
//   };

//   const logOut = () => {
//     setIsLoggedIn(false);
//     storeAuthState({ isLoggedIn: false });
//     router.replace("/login");
//   };

//   useEffect(() => {
//     const getAuthFromStorage = async () => {
//       // simulate a delay, e.g. for an API request
//       await new Promise((res) => setTimeout(() => res(null), 1000));
//       try {
//         const value = await AsyncStorage.getItem(authStorageKey);
//         if (value !== null) {
//           const auth = JSON.parse(value);
//           setIsLoggedIn(auth.isLoggedIn);
//         }
//       } catch (error) {
//         console.log("Error fetching from storage", error);
//       }
//       setIsReady(true);
//     };
//     getAuthFromStorage();
//   }, []);

//   useEffect(() => {
//     if (isReady) {
//       SplashScreen.hideAsync();
//     }
//   }, [isReady]);

//   return (
//     <AuthContext.Provider
//       value={{
//         isReady,
//         isLoggedIn,
//         logIn,
//         logOut,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }
