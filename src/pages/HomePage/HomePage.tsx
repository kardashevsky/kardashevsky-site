import styles from "./HomePage.module.css"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span>{t("home.firstName")}</span>
          <span>{t("home.lastName")}</span>
        </h1>

        <Link to="/resume" className={styles.button}>
          {t("home.resumeButton")}
        </Link>
      </div>
    </div>
  )
}
