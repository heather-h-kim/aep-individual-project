import { create } from 'zustand';

export interface round {
  round_number: number;
  number_shown: number;
  number_entered: number;
}

interface rounds {
  rounds: round[];
  updateRounds: (round) => void;
  resetRounds: () => void;
}

export const useRoundStore = create<rounds>(set => ({
  rounds: [],
  updateRounds: round =>
    set(state => ({
      rounds: [...state.rounds, round],
    })),
  resetRounds: () => set({ rounds: [] }),
}));

interface game {
  levelsRounds: { level_number: number; rounds: round[] }[];
  updateGame: (levelNumber: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<game>((set, get) => ({
  levelsRounds: [],
  updateGame: (number: number) => {
    //get the updated round array
    const roundsToUse = useRoundStore.getState().rounds;
    //update the levelsRounds array
    set(state => ({
      levelsRounds: [
        ...state.levelsRounds,
        { level_number: number, rounds: roundsToUse },
      ],
    }));
  },
  resetGame: () => set({ levelsRounds: [] }),
}));
