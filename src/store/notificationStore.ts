import { create } from 'zustand';

export const useNotificationStore = create<{
  unreadCount: number;
  addNotification: () => void;
  markAllAsReadOnPageEnter: () => void;
}>((set) => ({
  unreadCount: 0,

  addNotification: () => {
    set((state) => ({
      unreadCount: state.unreadCount + 1,
    }));
  },

  markAllAsReadOnPageEnter: () => {
    set({ unreadCount: 0 });
  },
}));
