import { create } from 'zustand';

interface ShowNumber {
  showNumber: boolean;
  updateShowNumber: () => void;
}

export const useShowNumberStore = create<ShowNumber>(set => ({
  showNumber: false,
  updateShowNumber: () => {
    set(state => ({ showNumber: !state.showNumber }));
  },
}));
