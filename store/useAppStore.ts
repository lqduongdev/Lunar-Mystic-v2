import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserInfo {
  name: string;
  birthDate: string;
  birthTime: string;
  gender: "male" | "female";
}

export interface LifePalaceElement {
  label: string;
  value: string;
  description: string;
}

export interface KeyStar {
  name: string;
  description: string;
}

export interface AstrologyResult {
  lifePalaceElements: LifePalaceElement[];
  keyStars: KeyStar[];
  palaces?: Array<{ id: number; name: string; stars: string[]; analysis: string }>;
  majorPeriods?: Array<{ ageRange: string; description: string }>;
  specificAnalysis?: {
    lovePalace: string;
    compatibleSigns: string;
    incompatibleSigns: string;
    advice: string;
  };
}

export interface NumerologyResult {
  mainNumber: number;
  calculationSteps: string[];
  meaning: string;
  subNumbers: {
    dayNumber: number;
    lifePath: number;
    mission: number;
    soulNumber: number;
  };
  lifeCycles: Array<{ phase: string; description: string }>;
  detailedAnalysis: string;
}

export interface Hexagram {
  number: number;
  name: string;
  lines: number[];
  meaning: string;
  advice?: string[];
}

export interface IChingResult {
  mainHexagram: Hexagram;
  supportHexagram: Hexagram;
  detailedAnalysis: string;
}

export interface AnalysisResult {
  userInfo: {
    lunarDate: string;
    element: string;
    palace: string;
    bodyPalace: string;
    birthHour: string;
  };
  astrology: AstrologyResult;
  numerology: NumerologyResult;
  iChing: IChingResult;
  summary?: {
    scores: {
      love: number;
      career: number;
      finance: number;
      health: number;
      family: number;
      spiritual: number;
    };
  };
}

interface AppState {
  // User info
  userInfo: UserInfo | null;
  analysisType: string | null;
  analysisResult: AnalysisResult | null;

  // Loading & error states
  isLoading: boolean;
  error: string | null;

  // Settings
  language: "vi" | "en";
  theme: "dark" | "light" | "system";
  notificationsEnabled: boolean;

  // Actions
  setUserInfo: (info: UserInfo) => void;
  setAnalysisType: (type: string) => void;
  setAnalysisResult: (result: AnalysisResult) => void;
  fetchAnalysis: () => Promise<void>;
  clearAnalysis: () => void;
  setLanguage: (lang: "vi" | "en") => void;
  setTheme: (theme: "dark" | "light" | "system") => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      userInfo: null,
      analysisType: null,
      analysisResult: null,
      isLoading: false,
      error: null,
      language: "vi",
      theme: "dark",
      notificationsEnabled: false,

      // Actions
      setUserInfo: (info) => set({ userInfo: info }),

      setAnalysisType: (type) => set({ analysisType: type }),

      setAnalysisResult: (result) => set({ analysisResult: result }),

      clearAnalysis: () => set({ analysisResult: null, analysisType: null }),

      setLanguage: (lang) => set({ language: lang }),

      setTheme: (theme) => {
        set({ theme });
        // Apply theme to document
        if (theme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
          document.documentElement.setAttribute("data-theme", systemTheme);
        } else {
          document.documentElement.setAttribute("data-theme", theme);
        }
      },

      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      fetchAnalysis: async () => {
        const { userInfo, analysisType, language } = get();

        if (!userInfo || !analysisType) {
          set({ error: "Missing user info or analysis type" });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: userInfo.name,
              birthDate: userInfo.birthDate,
              birthTime: userInfo.birthTime,
              gender: userInfo.gender,
              analysisType,
              language,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || "Analysis failed");
          }

          const data = await response.json();
          set({ analysisResult: data, isLoading: false });
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "An error occurred",
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "lunar-mystic-storage",
      partialize: (state) => ({
        userInfo: state.userInfo,
        language: state.language,
        theme: state.theme,
        notificationsEnabled: state.notificationsEnabled,
      }),
    }
  )
);
