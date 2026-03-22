import styles from "./Header.module.css"
import LanguageSelect from "../LanguageSelect/LanguageSelect"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          DK
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/" className={styles.link}>
            {t("nav.home")}
          </NavLink>

          <NavLink to="/about" className={styles.link}>
            {t("nav.about")}
          </NavLink>

          <NavLink to="/projects" className={styles.link}>
            {t("nav.projects")}
          </NavLink>

          <NavLink to="/contact" className={styles.link}>
            {t("nav.contact")}
          </NavLink>
        </nav>

        <div className={styles.actions}>
          <LanguageSelect />
        </div>
      </div>
    </header>
  )
}
