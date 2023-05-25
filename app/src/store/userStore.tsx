import { create } from 'zustand';

interface FetchedUser {
  user: {
    userId: number | null;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    fgcolor: string | null;
    bgcolor: string | null;
    auth0token: string | null;
  };
  updateUser: (newUser: object) => void;
}

export const useUserStore = create<FetchedUser>((set, get) => ({
  user: {
    userId: null,
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    fgcolor: null,
    bgcolor: null,
    auth0token: null,
  },
  updateUser: (newUser: object) => {
    const userState = get().user;
    set({ user: { ...userState, ...newUser } });
  },
}));
