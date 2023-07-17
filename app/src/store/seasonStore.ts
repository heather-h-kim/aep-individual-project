import { create } from 'zustand';

interface Season {
  seasonId: number;
  startDate: string | undefined;
  endDate: string | undefined;
}

interface Seasons {
  seasons: Season[];
  currentSeasonId: number;
  updateSeasons: (seasonArray: Season[]) => void;
  updateCurrentSeasonId: (seasonId: number | unknown) => void;
}

export const useSeasonStore = create<Seasons>(set => ({
  seasons: [],
  currentSeasonId: 0,
  updateSeasons: seasonsArray => set({ seasons: seasonsArray }),
  updateCurrentSeasonId: seasonId => set({ currentSeasonId: seasonId }),
}));
