import styles from "./HomePage.module.css"
import { useTranslation } from "react-i18next"
import InteractiveFace from "../../components/InteractiveFace/InteractiveFace"

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className={styles.home}>
      <svg
        className={styles.grid}
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g
          className={styles.gridLines}
          transform="translate(0 180) scale(1 0.6)"
        >
          <line x1="800" y1="100" x2="-2500" y2="1200" />
          <line x1="800" y1="100" x2="-2280" y2="1200" />
          <line x1="800" y1="100" x2="-2060" y2="1200" />
          <line x1="800" y1="100" x2="-1840" y2="1200" />
          <line x1="800" y1="100" x2="-1620" y2="1200" />
          <line x1="800" y1="100" x2="-1400" y2="1200" />
          <line x1="800" y1="100" x2="-1180" y2="1200" />
          <line x1="800" y1="100" x2="-960" y2="1200" />
          <line x1="800" y1="100" x2="-740" y2="1200" />
          <line x1="800" y1="100" x2="-520" y2="1200" />
          <line x1="800" y1="100" x2="-300" y2="1200" />
          <line x1="800" y1="100" x2="-80" y2="1200" />
          <line x1="800" y1="100" x2="140" y2="1200" />
          <line x1="800" y1="100" x2="360" y2="1200" />
          <line x1="800" y1="100" x2="580" y2="1200" />
          <line x1="800" y1="100" x2="800" y2="1200" />
          <line x1="800" y1="100" x2="1020" y2="1200" />
          <line x1="800" y1="100" x2="1240" y2="1200" />
          <line x1="800" y1="100" x2="1460" y2="1200" />
          <line x1="800" y1="100" x2="1680" y2="1200" />
          <line x1="800" y1="100" x2="1900" y2="1200" />
          <line x1="800" y1="100" x2="2120" y2="1200" />
          <line x1="800" y1="100" x2="2340" y2="1200" />
          <line x1="800" y1="100" x2="2560" y2="1200" />
          <line x1="800" y1="100" x2="2780" y2="1200" />
          <line x1="800" y1="100" x2="3000" y2="1200" />
          <line x1="800" y1="100" x2="3220" y2="1200" />
          <line x1="800" y1="100" x2="3440" y2="1200" />
          <line x1="800" y1="100" x2="3660" y2="1200" />
          <line x1="800" y1="100" x2="3880" y2="1200" />
          <line x1="800" y1="100" x2="4100" y2="1200" />

          <line x1="-3000" y1="280" x2="4600" y2="280" />
          <line x1="-3000" y1="315" x2="4600" y2="315" />
          <line x1="-3000" y1="355" x2="4600" y2="355" />
          <line x1="-3000" y1="402" x2="4600" y2="402" />
          <line x1="-3000" y1="457" x2="4600" y2="457" />
          <line x1="-3000" y1="522" x2="4600" y2="522" />
          <line x1="-3000" y1="598" x2="4600" y2="598" />
          <line x1="-3000" y1="686" x2="4600" y2="686" />
          <line x1="-3000" y1="787" x2="4600" y2="787" />
          <line x1="-3000" y1="900" x2="4600" y2="900" />
          <line x1="-3000" y1="1025" x2="4600" y2="1025" />
          <line x1="-3000" y1="1160" x2="4600" y2="1160" />
          <line x1="-3000" y1="1200" x2="4600" y2="1200" />
        </g>
      </svg>

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