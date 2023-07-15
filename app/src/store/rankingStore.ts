import { create } from 'zustand';
import { useSeasonStore } from './seasonStore';

interface RankObject {
  userName: string;
  topScore: number;
}

interface Ranking {
  rankings: RankObject[];
  updateRankings: (rankingArray: RankObject[] | null) => void;
}

export const useRankingStore = create<Ranking>(set => ({
  rankings: [],
  updateRankings: rankingArray => set({ rankings: rankingArray }),
}));
