import { create } from 'zustand';

interface Season {
  seasonId: number;
  startDate: string;
  endDate: string;
}

interface Seasons {
  seasons: Season[];
  currentSeason: Season;
  currentSeasonId: number;
  updateSeasons: (seasonArray: Season[]) => void;
  updateCurrentSeason: (currentSeason: Season) => void;
  updateCurrentSeasonId: (seasonId: number | unknown) => void;
}

export const useSeasonStore = create<Seasons>(set => ({
  seasons: [],
  currentSeason: {},
  currentSeasonId: 0,
  updateSeasons: seasonsArray => set({ seasons: seasonsArray }),
  updateCurrentSeason: currentSeason => set({ currentSeason: currentSeason }),
  updateCurrentSeasonId: seasonId => set({ currentSeasonId: seasonId }),
}));
