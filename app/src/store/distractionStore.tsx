import { create } from 'zustand';

interface Distraction {
  gif: string[];
  randomFact: string[] | undefined;
  updateGif: (newGifs: string[]) => void;
  updateRandomFact: (newRandomFact: string) => void;
}

export const useDistractionStore = create<Distraction>(set => ({
  gif: [],
  randomFact: [],
  updateGif: newGifs => set({ gif: newGifs }),
  updateRandomFact: newRandomFact => set({ randomFact: newRandomFact }),
}));
