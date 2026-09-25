import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react"
import styles from "./Header.module.css"
import LanguageSelect from "../LanguageSelect/LanguageSelect"
import Logo from "../Logo/Logo"
import { useTranslation } from "react-i18next"
import {
  NavLink,
  useLocation,
} from "react-router-dom"

const navItems = [
  {
    to: "/",
    key: "nav.home",
  },
  {
    to: "/about",
    key: "nav.about",
  },
  {
    to: "/projects",
    key: "nav.projects",
  },
  {
    to: "/contact",
    key: "nav.contact",
  },
]

export default function Header() {
  const { t } = useTranslation()
  const location = useLocation()

  const [logoSpinning, setLogoSpinning] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const [indicator, setIndicator] = useState({
    x: 0,
    width: 0,
    ready: false,
  })

  const navRef = useRef<HTMLElement>(null)

  const getLinkClassName = ({
    isActive,
  }: {
    isActive: boolean
  }) =>
    `${styles.link} ${
      isActive ? styles.active : ""
    }`

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const nav = navRef.current

      if (!nav) {
        return
      }

      const activeLink =
        nav.querySelector<HTMLElement>(
          `.${styles.active}`,
        )

      if (!activeLink) {
        return
      }

      setIndicator({
        x: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        ready: true,
      })
    })

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [location.pathname, t])

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
          <Logo
            className={`${styles.logoImage} ${
              logoSpinning ? styles.logoSpin : ""
            }`}
            onAnimationEnd={() =>
              setLogoSpinning(false)
            }
          />
        </NavLink>

        <nav
          ref={navRef}
          className={styles.nav}
          style={
            {
              "--indicator-x": `${indicator.x}px`,
              "--indicator-width": `${indicator.width}px`,
              "--indicator-opacity":
                indicator.ready ? 1 : 0,
            } as CSSProperties
          }
        >
          <span
            className={styles.activeIndicator}
            aria-hidden="true"
          />

          {navItems.map(({ to, key }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={getLinkClassName}
            >
              {t(key)}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <LanguageSelect />
        </div>

        <button
          type="button"
          className={`${styles.menuButton} ${
            menuOpen ? styles.menuButtonOpen : ""
          }`}
          onClick={() =>
            setMenuOpen((value) => !value)
          }
          aria-label="Меню"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`${styles.mobileMenu} ${
            menuOpen ? styles.mobileMenuOpen : ""
          }`}
        >
          <nav className={styles.mobileNav}>
            {navItems.map(({ to, key }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={getLinkClassName}
                onClick={closeMenu}
              >
                {t(key)}
              </NavLink>
            ))}
          </nav>

          <div className={styles.mobileLanguage}>
            <LanguageSelect />
          </div>
        </div>
      </div>
    </header>
  )
}
