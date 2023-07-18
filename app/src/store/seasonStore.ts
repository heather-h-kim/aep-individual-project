import { create } from 'zustand';

interface Season {
  seasonId: number;
  startDate: string;
  endDate: string;
}

interface Seasons {
  allSeasons: Season[];
  seasonsToDate: Season[];
  currentSeason: Season;
  currentSeasonId: number;
  updateAllSeasons: (seasonArray: Season[]) => void;
  updateSeasonsToDate: (seasonArray: Season[]) => void;
  updateCurrentSeason: (currentSeason: Season) => void;
  updateCurrentSeasonId: (seasonId: number | unknown) => void;
}

export const useSeasonStore = create<Seasons>(set => ({
  allSeasons: [],
  seasonsToDate: [],
  currentSeason: {},
  currentSeasonId: 0,
  updateAllSeasons: seasonsArray => set({ allSeasons: seasonsArray }),
  updateSeasonsToDate: seasonsArray => set({ seasonsToDate: seasonsArray }),
  updateCurrentSeason: currentSeason => set({ currentSeason: currentSeason }),
  updateCurrentSeasonId: seasonId => set({ currentSeasonId: seasonId }),
}));
