import { create } from 'zustand';

interface ThemeColors {
  bgcolor: string | undefined;
  fgcolor: string | undefined;
  preview: boolean;
  updateBgcolor: (newColor: string) => void;
  updateFgcolor: (newColor: string) => void;
  updatePreview: (newPreview: boolean) => void;
}

export const useColorsStore = create<ThemeColors>(set => ({
  bgcolor: undefined,
  fgcolor: undefined,
  preview: false,
  updateBgcolor: newColor => set({ bgcolor: newColor }),
  updateFgcolor: newColor => set({ fgcolor: newColor }),
  updatePreview: newPreview => set({ preview: newPreview }),
}));
