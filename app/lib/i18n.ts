import { LANG_STORAGE_KEY, Lang, LocalizedText } from "./siteContent";

export function getCurrentLang(): Lang {
  if (typeof window === "undefined") return "fr";

  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved === "fr" || saved === "en" || saved === "es") return saved;

  return "fr";
}

export function setCurrentLang(lang: Lang) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LANG_STORAGE_KEY, lang);
}

export function t(value: LocalizedText, lang: Lang): string {
  return value?.[lang] ?? value?.fr ?? "";
}