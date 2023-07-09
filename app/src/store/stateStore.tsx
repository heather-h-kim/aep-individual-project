import { create } from 'zustand';

interface Index {
  index: number;
  updateIndex: (newNumber: number) => void;
}

export const useIndexStore = create<Index>(set => ({
  index: 10,
  updateIndex: newNumber => set({ index: newNumber }),
}));

interface IsCorrect {
  isCorrect: number;
  updateIsCorrect: () => void;
}

export const useIsCorrectStore = create<IsCorrect>(set => ({
  isCorrect: 0,
  updateIsCorrect: () => set(state => ({ isCorrect: state.isCorrect + 1 })),
}));
