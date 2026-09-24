import styles from "./HomePage.module.css"
import { useTranslation } from "react-i18next"
import face from "../../assets/face.webp"

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <img
          className={styles.face}
          src={face}
          alt=""
          draggable={false}
        />

        <h1 className={styles.title}>
          <span>{t("home.firstName")}</span>
          <span>{t("home.lastName")}</span>
        </h1>
      </div>
    </div>
  )
}
