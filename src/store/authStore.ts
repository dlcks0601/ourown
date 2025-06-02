import { AuthState, TokenResponse, User } from '@/types/auth.type';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const value = await SecureStore.getItemAsync(name);
      return value;
    } catch (error) {
      console.error('SecureStore getItem error:', error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(name, value);
    } catch (error) {
      console.error('SecureStore setItem error:', error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch (error) {
      console.error('SecureStore removeItem error:', error);
    }
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isReady: false,
      user: {
        email: '',
        nickname: '',
        profileUrl: '',
      },
      jwt: {
        accessToken: '',
        refreshToken: '',
      },
      logIn: (user: User, jwt: TokenResponse) => {
        set({ isLoggedIn: true, user, jwt });
      },
      updateNickname: (nickname: string) => {
        set((state) => ({
          user: { ...state.user, nickname },
        }));
      },
      logOut: () => {
        set({
          isLoggedIn: false,
          user: { nickname: '', email: '', profileUrl: '' },
          jwt: { accessToken: '', refreshToken: '' },
        });
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => secureStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isReady = true;
        }
      },
    }
  )
);
