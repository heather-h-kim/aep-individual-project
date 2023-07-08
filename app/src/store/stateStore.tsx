import { create } from 'zustand';

interface Index {
  index: number;
  updateIndex: (newNumber: number) => void;
}

export const useIndexStore = create<Index>(set => ({
  index: 10,
  updateIndex: newNumber => set({ index: newNumber }),
}));
