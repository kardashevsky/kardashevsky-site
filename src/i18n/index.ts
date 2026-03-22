import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./locales/en.json"
import ru from "./locales/ru.json"

export const SUPPORTED_LANGUAGES = ["en", "ru"] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

const DEFAULT_LANGUAGE: SupportedLanguage = "en"
const LANGUAGE_STORAGE_KEY = "language"

const resources = {
  en: { translation: en },
  ru: { translation: ru },
} as const

function isSupportedLanguage(language: string): language is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(language as SupportedLanguage)
}

function normalizeLanguage(language: string | null | undefined): SupportedLanguage {
  const baseLanguage = language?.toLowerCase().split("-")[0] ?? DEFAULT_LANGUAGE
  return isSupportedLanguage(baseLanguage) ? baseLanguage : DEFAULT_LANGUAGE
}

function getInitialLanguage(): SupportedLanguage {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)

  if (savedLanguage) {
    return normalizeLanguage(savedLanguage)
  }

  return normalizeLanguage(navigator.language)
}

function syncDocumentLanguage(language: SupportedLanguage) {
  document.documentElement.lang = language
}

const initialLanguage = getInitialLanguage()

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
})

syncDocumentLanguage(initialLanguage)

i18n.on("languageChanged", (language) => {
  const normalizedLanguage = normalizeLanguage(language)

  syncDocumentLanguage(normalizedLanguage)
  localStorage.setItem(LANGUAGE_STORAGE_KEY, normalizedLanguage)
})

export default i18n