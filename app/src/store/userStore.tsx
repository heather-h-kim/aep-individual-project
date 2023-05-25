import { create } from 'zustand';

interface FetchedUser {
  user: object | null;
  updateUser: (newUser: object) => void;
}

export const useUserStore = create<FetchedUser>((set, get) => ({
  user: null,
  updateUser: (newUser: object) => {
    const userState = get().user;
    set({ user: { ...userState, ...newUser } });
  },
}));
