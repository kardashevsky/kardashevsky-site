import { useTranslation } from "react-i18next"
import styles from "./ContactPage.module.css"

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <section className={styles.contact}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>{t("contact.eyebrow")}</p>

        <h1 className={styles.title}>{t("contact.title")}</h1>

        <p className={styles.description}>{t("contact.description")}</p>

        <div className={styles.actions}>
          <a
            href="https://t.me/kardashevsky"
            target="_blank"
            rel="noreferrer"
            className={styles.primaryButton}
          >
            {t("contact.telegram")}
          </a>

          <a
            href="mailto:contact@kardashevsky.com"
            className={styles.secondaryButton}
          >
            {t("contact.email")}
          </a>
        </div>
      </div>
    </section>
  )
}
