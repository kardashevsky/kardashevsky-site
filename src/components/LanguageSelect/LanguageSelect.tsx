import { useTranslation } from "react-i18next"
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "../../i18n"
import styles from "./LanguageSelect.module.css"

function normalizeLanguage(language?: string): SupportedLanguage {
  const baseLanguage = language?.toLowerCase().split("-")[0]

  return SUPPORTED_LANGUAGES.includes(baseLanguage as SupportedLanguage)
    ? (baseLanguage as SupportedLanguage)
    : "en"
}

export default function LanguageSelect() {
  const { i18n } = useTranslation()

  const currentLanguage = normalizeLanguage(
    i18n.resolvedLanguage ?? i18n.language,
  )

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLanguage = event.target.value as SupportedLanguage

    if (nextLanguage === currentLanguage) return

    void i18n.changeLanguage(nextLanguage)
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor="language-select" className={styles.label}>
        Language
      </label>

      <select
        id="language-select"
        className={styles.select}
        value={currentLanguage}
        onChange={handleChange}
        aria-label="Select language"
      >
        {SUPPORTED_LANGUAGES.map((language) => (
          <option key={language} value={language}>
            {language.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  )
}
