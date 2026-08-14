import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { LanguageCode } from "@/types/learning";

type LanguageState = {
  selectedLanguageCode: LanguageCode | null;
  hasHydrated: boolean;
  setSelectedLanguage: (code: LanguageCode) => void;
  clearSelectedLanguage: () => void;
  clearAsyncStorage: () => Promise<void>;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguageCode: null,
      hasHydrated: false,
      setSelectedLanguage: (code) => set({ selectedLanguageCode: code }),
      clearSelectedLanguage: () => set({ selectedLanguageCode: null }),
      clearAsyncStorage: async () => {
        await AsyncStorage.clear();
        set({ selectedLanguageCode: null });
      },
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "lingua-language",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        selectedLanguageCode: state.selectedLanguageCode,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
