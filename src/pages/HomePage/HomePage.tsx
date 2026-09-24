import styles from "./HomePage.module.css"
import { useTranslation } from "react-i18next"
import InteractiveFace from "../../components/InteractiveFace/InteractiveFace"

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <InteractiveFace />

        <h1 className={styles.title}>
          <span className={styles.firstName}>
            {t("home.firstName")}
          </span>
          <span className={styles.lastName}>
            {t("home.lastName")}
          </span>
        </h1>

        <p className={styles.positioning}>
          {t("home.positioning")}
        </p>
      </div>
    </div>
  )
}
