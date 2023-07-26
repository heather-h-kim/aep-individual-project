import { create } from 'zustand';

interface CurrentSeason {
  currentSeasonId: number | null;
  updateCurrentSeasonId: (seasonId: number) => void;
}

export const useSeasonStore = create<CurrentSeason>(set => ({
  currentSeasonId: null,
  updateCurrentSeasonId: seasonId => set({ currentSeasonId: seasonId }),
}));
