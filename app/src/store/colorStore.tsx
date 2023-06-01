import { create } from 'zustand';

interface ThemeColors {
  colors: {
    bgcolor: string | undefined;
    fgcolor: string | undefined;
  };
  updateColors: (newColors: object) => void;
}

export const useColorsStore = create<ThemeColors>((set, get) => ({
  colors: {
    bgcolor: undefined,
    fgcolor: undefined,
  },
  updateColors: (newColors: object) => {
    const colorsState = get().colors;
    set({ colors: { ...colorsState, ...newColors } });
  },
}));
