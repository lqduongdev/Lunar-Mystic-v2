import vi from "./vi.json";
import en from "./en.json";

export const translations = {
  vi,
  en,
};

export type Language = "vi" | "en";
export type TranslationKey = keyof typeof vi;

export function t(lang: Language, key: string): string {
  const keys = key.split(".");
  let value: any = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}

export function useTranslation(lang: Language) {
  return {
    t: (key: string) => t(lang, key),
  };
}

// Helper to get translations without passing lang each time
export function getTranslator(lang: Language) {
  return (key: string) => t(lang, key);
}
