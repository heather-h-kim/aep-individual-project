import { create } from 'zustand';

interface FetchedUser {
  user: {
    userId: number | undefined;
    username: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    fgcolor: string | undefined;
    bgcolor: string | undefined;
    auth0token: string | undefined;
  };
  updateUser: (newUser: object) => void;
}

export const useUserStore = create<FetchedUser>((set, get) => ({
  user: {
    userId: undefined,
    username: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    fgcolor: undefined,
    bgcolor: undefined,
    auth0token: undefined,
  },
  updateUser: (newUser: object) => {
    const userState = get().user;
    set({ user: { ...userState, ...newUser } });
  },
}));
