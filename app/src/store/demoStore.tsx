import { create } from 'zustand';

interface DemoGame {
  gif: string | undefined;
  randomFact: string | undefined;
  updateGif: (newGif: string) => void;
  updateRandomFact: (newRandomFact: string) => void;
}

export const useDemoStore = create<DemoGame>(set => ({
  gif: '',
  randomFact: '',
  updateGif: newGif => set({ gif: newGif }),
  updateRandomFact: newRandomFact => set({ randomFact: newRandomFact }),
}));
