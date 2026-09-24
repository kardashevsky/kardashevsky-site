import { useTranslation } from "react-i18next"
import { LinkButton } from "../../components/LinkButton/LinkButton"
import styles from "./AboutPage.module.css"

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <section className={styles.about}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>{t("about.eyebrow")}</p>

        <h1 className={styles.title}>{t("about.title")}</h1>

        <p className={styles.description}>
          {t("about.description")}
        </p>

        <div className={styles.actions}>
          <LinkButton to="/resume">
            {t("about.resumeButton")}
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
