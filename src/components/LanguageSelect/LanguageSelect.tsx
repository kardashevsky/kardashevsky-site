import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from "../../i18n"
import styles from "./LanguageSelect.module.css"

function normalizeLanguage(
  language?: string,
): SupportedLanguage {
  const baseLanguage = language
    ?.toLowerCase()
    .split("-")[0]

  return SUPPORTED_LANGUAGES.includes(
    baseLanguage as SupportedLanguage,
  )
    ? (baseLanguage as SupportedLanguage)
    : "en"
}

export default function LanguageSelect() {
  const { i18n } = useTranslation()

  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)

  const currentLanguage = normalizeLanguage(
    i18n.resolvedLanguage ?? i18n.language,
  )

  const openDropdown = () => {
    setIsOpen(true)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true)
      })
    })
  }

  const closeDropdown = () => {
    setIsVisible(false)
  }

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown()
    } else {
      openDropdown()
    }
  }

  const handleChange = (
    language: SupportedLanguage,
  ) => {
    if (language !== currentLanguage) {
      void i18n.changeLanguage(language)
    }

    closeDropdown()
  }

  const handleTransitionEnd = () => {
    if (!isVisible) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsVisible(false)
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    )

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      )
    }
  }, [])

  return (
    <div
      className={styles.wrapper}
      ref={wrapperRef}
    >
      <button
        type="button"
        className={`${styles.select} ${
          isOpen ? styles.open : ""
        }`}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {currentLanguage.toUpperCase()}

        <span className={styles.arrow} />
      </button>

      {isOpen && (
        <div
          className={`${styles.dropdown} ${
            isVisible
              ? styles.dropdownVisible
              : styles.dropdownHidden
          }`}
          role="listbox"
          onTransitionEnd={handleTransitionEnd}
        >
          {SUPPORTED_LANGUAGES
            .filter(
              (language) =>
                language !== currentLanguage,
            )
            .map((language) => (
              <button
                key={language}
                type="button"
                className={styles.option}
                onClick={() =>
                  handleChange(language)
                }
                role="option"
                aria-selected={false}
              >
                {language.toUpperCase()}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}
