import { useState } from "react"
import styles from "./Header.module.css"
import LanguageSelect from "../LanguageSelect/LanguageSelect"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"
import logo from "../../assets/logo.svg"

export default function Header() {
  const { t } = useTranslation()

  const [logoSpinning, setLogoSpinning] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.active : ""}`

  const handleLogoClick = () => {
    setLogoSpinning(false)
    setMenuOpen(false)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLogoSpinning(true)
      })
    })
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink
          to="/"
          className={styles.logo}
          aria-label={t("nav.home")}
          onClick={handleLogoClick}
        >
          <img
            src={logo}
            alt=""
            className={`${styles.logoImage} ${
              logoSpinning ? styles.logoSpin : ""
            }`}
            onAnimationEnd={() => setLogoSpinning(false)}
          />
        </NavLink>

        {/* Desktop navigation */}
        <nav className={styles.nav}>
          <NavLink to="/" end className={getLinkClassName}>
            {t("nav.home")}
          </NavLink>

          <NavLink to="/about" className={getLinkClassName}>
            {t("nav.about")}
          </NavLink>

          <NavLink to="/projects" className={getLinkClassName}>
            {t("nav.projects")}
          </NavLink>

          <NavLink to="/contact" className={getLinkClassName}>
            {t("nav.contact")}
          </NavLink>
        </nav>

        <div className={styles.actions}>
          <LanguageSelect />
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className={`${styles.menuButton} ${
            menuOpen ? styles.menuButtonOpen : ""
          }`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Меню"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Mobile menu */}
        <div
          className={`${styles.mobileMenu} ${
            menuOpen ? styles.mobileMenuOpen : ""
          }`}
        >
          <nav className={styles.mobileNav}>
            <NavLink
              to="/"
              end
              className={getLinkClassName}
              onClick={closeMenu}
            >
              {t("nav.home")}
            </NavLink>

            <NavLink
              to="/about"
              className={getLinkClassName}
              onClick={closeMenu}
            >
              {t("nav.about")}
            </NavLink>

            <NavLink
              to="/projects"
              className={getLinkClassName}
              onClick={closeMenu}
            >
              {t("nav.projects")}
            </NavLink>

            <NavLink
              to="/contact"
              className={getLinkClassName}
              onClick={closeMenu}
            >
              {t("nav.contact")}
            </NavLink>
          </nav>

          <div className={styles.mobileLanguage}>
            <LanguageSelect />
          </div>
        </div>
      </div>
    </header>
  )
}
