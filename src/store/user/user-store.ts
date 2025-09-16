// store/user-store.ts
import storage from '@/utils/storage.util';
import { create } from 'zustand';

interface UserState {
  isFirstTimeUser: boolean;
  setFirstTimeUser: (value: boolean) => void;
}

const STORAGE_KEY = 'hasVisited';

export const useUserStore = create<UserState>((set) => {
  // read from localStorage on init
  const isFirstTime = storage.fetch(STORAGE_KEY) !== 'true';

  if (isFirstTime) {
    // mark user as returning for future sessions
    storage.keep(STORAGE_KEY, 'true');
  }

  return {
    isFirstTimeUser: isFirstTime,
    setFirstTimeUser: (value) => {
      set({ isFirstTimeUser: value });
      if (!value) storage.keep(STORAGE_KEY, 'true');
    },
  };
});
