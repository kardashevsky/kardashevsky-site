import { useTranslation } from "react-i18next"
import styles from "./ProjectsPage.module.css"

export default function ProjectsPage() {
  const { t } = useTranslation()

  return (
    <section className={styles.projects}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>{t("projects.eyebrow")}</p>

        <h1 className={styles.title}>{t("projects.title")}</h1>

        <p className={styles.description}>{t("projects.description")}</p>
      </div>
    </section>
  )
}
