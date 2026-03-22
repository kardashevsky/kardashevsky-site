import styles from "./ResumePage.module.css"
import { useTranslation } from "react-i18next"

const RESUME_URL = "/dmitry-kardashevsky-resume.pdf"

export default function ResumePage() {
  const { t } = useTranslation()

  return (
    <section className={styles.resume}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>{t("resume.eyebrow")}</p>

        <h1 className={styles.title}>{t("resume.name")}</h1>

        <p className={styles.description}>
          {t("resume.description")}
        </p>

        <div className={styles.actions}>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.primary}
          >
            {t("resume.view")}
          </a>

          <a
            href={RESUME_URL}
            download
            className={styles.secondary}
          >
            {t("resume.download")}
          </a>
        </div>
      </div>
    </section>
  )
}
