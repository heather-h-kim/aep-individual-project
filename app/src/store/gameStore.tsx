import { create } from 'zustand';

interface roundObject {
  round_number: number;
  number_shown: number;
  number_entered: number;
}

interface levelObject {
  level_number: number;
  rounds: roundObject[];
}

interface level {
  level_number: number;
  rounds: roundObject[];
  updateLevelNumber: (levelNumber: number) => void;
  updateRounds: (roundObject) => void;
  removeRounds: () => void;
}

interface game {
  levels_rounds: levelObject[];
  updateLevelsRounds: (LevelObject) => void;
  removeLevelsRounds: () => void;
}

export const useLevelStore = create<level>(set => ({
  level_number: 0,
  rounds: [],
  updateLevelNumber: levelNumber => set({ level_number: levelNumber }),
  updateRounds: newRound =>
    set(state => ({
      rounds: [
        ...state.rounds,
        {
          round_number: newRound.round_number,
          number_shown: newRound.number_shown,
          number_entered: newRound.number_entered,
        } as roundObject,
      ],
    })),
  removeRounds: () => set({ rounds: [] }),
}));

export const useGameStore = create<game>(set => ({
  levels_rounds: [],
  updateLevelsRounds: newLevelObject =>
    set(state => ({
      levels_rounds: [...state.levels_rounds, newLevelObject],
    })),
  removeLevelsRounds: () => set({ levels_rounds: [] }),
}));
