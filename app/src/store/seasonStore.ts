import { create } from 'zustand';

interface CurrentSeason {
  currentSeasonId: number | null;
  updateCurrentSeasonId: (seasonId: number) => void;
}

export const useSeasonStore = create<CurrentSeason>(set => ({
  selectedSeason: null,
  updateCurrentSeasonId: seasonId => set({ currentSeasonId: seasonId }),
}));
