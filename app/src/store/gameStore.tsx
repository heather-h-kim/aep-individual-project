import { create } from 'zustand';

interface roundObject {
  roundNumber: number;
  numberShown: number;
  numberEntered: number;
}

interface levelObject {
  levelNumber: number;
  rounds: roundObject[];
}

interface level {
  levelNumber: number;
  rounds: roundObject[];
  updateLevelNumber: (levelNumber: number) => void;
  updateRounds: (roundObject) => void;
  removeRounds: () => void;
}

interface game {
  levelsRounds: levelObject[];
  updateLevelsRounds: (LevelObject) => void;
  removeLevelsRounds: () => void;
}

export const useLevelStore = create<level>(set => ({
  levelNumber: 0,
  rounds: [],
  updateLevelNumber: levelNumber => set({ levelNumber: levelNumber }),
  updateRounds: newRound =>
    set(state => ({
      rounds: [
        ...state.rounds,
        {
          roundNumber: newRound.roundNumber,
          numberShown: newRound.numberShown,
          numberEntered: newRound.numberEntered,
        } as roundObject,
      ],
    })),
  removeRounds: () => set({ rounds: [] }),
}));

export const useGameStore = create<game>(set => ({
  levelsRounds: [],
  updateLevelsRounds: newLevelObject =>
    set(state => ({
      levelsRounds: [...state.levelsRounds, newLevelObject],
    })),
  removeLevelsRounds: () => set({ levelsRounds: [] }),
}));
