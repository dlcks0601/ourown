import {
  AuthState,
  Couple,
  Partner,
  TokenResponse,
  User,
} from '@/types/auth.type';
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
        id: 0,
        code: '',
        coupleId: 0,
        email: '',
        nickname: '',
        profileUrl: '',
      },
      jwt: {
        accessToken: '',
        refreshToken: '',
      },
      partner: {
        id: 0,
        nickname: '',
        profileUrl: '',
      },
      couple: {
        anniversary: '',
      },
      logIn: (
        user: User,
        jwt: TokenResponse,
        partner: Partner,
        couple: Couple
      ) => {
        console.log('커플', couple);
        set({ isLoggedIn: true, user, jwt, partner, couple });
      },
      updateNickname: (nickname: string) => {
        set((state) => ({
          user: { ...state.user, nickname },
        }));
      },
      updateUser: (user: User, partner: Partner, couple: Couple) => {
        set({ user, partner, couple });
      },
      logOut: () => {
        set({
          isLoggedIn: false,
          user: {
            id: 0,
            code: '',
            coupleId: 0,
            email: '',
            nickname: '',
            profileUrl: '',
          },
          jwt: { accessToken: '', refreshToken: '' },
          partner: {
            id: 0,
            nickname: '',
            profileUrl: '',
          },
          couple: {
            anniversary: '',
          },
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
