import {
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import styles from "./Header.module.css"
import LanguageSelect from "../LanguageSelect/LanguageSelect"
import Logo from "../Logo/Logo"
import { useTranslation } from "react-i18next"
import {
  NavLink,
  useLocation,
} from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { HOME_INTRO_EVENT } from "../../app/events"

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

const LIQUID_TIMES = [0, 0.34, 0.78, 1]
const LIQUID_DURATION = 0.35

export default function Header() {
  const { t } = useTranslation()
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()
  const currentPageKey = navItems.find(({ to }) => to === location.pathname)?.key
  const currentPageTitle = currentPageKey
    ? t(currentPageKey)
    : location.pathname === "/resume"
      ? t("resume.eyebrow")
      : t("nav.home")

  const [logoSpinning, setLogoSpinning] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const [indicator, setIndicator] = useState({
    x: 0,
    width: 0,
    fromX: 0,
    fromWidth: 0,
    bridgeX: 0,
    bridgeWidth: 0,
    animationId: 0,
    morphing: false,
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

  useLayoutEffect(() => {
    const updateIndicator = () => {
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

      const x = activeLink.offsetLeft
      const width = activeLink.offsetWidth

      setIndicator((current) => {
        if (current.ready && current.x === x && current.width === width) {
          return current
        }

        const fromX = current.ready ? current.x : x
        const fromWidth = current.ready ? current.width : width
        const fromRight = fromX + fromWidth
        const targetRight = x + width
        const movingRight = x > fromX
        const leadingProgress = 1
        const trailingProgress = 0.26
        const leftProgress = movingRight ? trailingProgress : leadingProgress
        const rightProgress = movingRight ? leadingProgress : trailingProgress
        const bridgeX = fromX + (x - fromX) * leftProgress
        const bridgeRight = fromRight + (targetRight - fromRight) * rightProgress
        const bridgeWidth = bridgeRight - bridgeX

        return {
          x,
          width,
          fromX,
          fromWidth,
          bridgeX,
          bridgeWidth,
          animationId: current.animationId + 1,
          morphing: current.ready,
          ready: true,
        }
      })
    }

    updateIndicator()

    const observer = new ResizeObserver(updateIndicator)
    const nav = navRef.current

    if (nav) {
      observer.observe(nav)
    }

    return () => {
      observer.disconnect()
    }
  }, [location.pathname, t])

  const handleLogoClick = () => {
    setLogoSpinning(false)
    setMenuOpen(false)

    if (location.pathname === "/") {
      window.dispatchEvent(new Event(HOME_INTRO_EVENT))
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLogoSpinning(true)
      })
    })
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const settleX = indicator.x
  const settleWidth = indicator.width
  const liquidRadius = 0
  const liquidTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: LIQUID_DURATION, times: LIQUID_TIMES, ease: "linear" as const }
  const revealTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: [0.16, 1, 0.3, 1] as const }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink
          to="/"
          className={styles.logo}
          aria-label={t("nav.home")}
          onClick={handleLogoClick}
          draggable={false}
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
        >
          <motion.span
            key={indicator.animationId}
            className={styles.activeIndicator}
            aria-hidden="true"
            initial={{
              x: indicator.fromX,
              width: indicator.fromWidth,
              scale: indicator.morphing ? 1 : 0.88,
              borderRadius: 0,
              opacity: indicator.morphing ? 1 : 0,
            }}
            animate={{
              x: indicator.morphing ? [
                indicator.fromX,
                indicator.bridgeX,
                settleX,
                indicator.x,
              ] : indicator.x,
              width: indicator.morphing ? [
                indicator.fromWidth,
                indicator.bridgeWidth,
                settleWidth,
                indicator.width,
              ] : indicator.width,
              scale: 1,
              borderRadius: liquidRadius,
              opacity: indicator.ready ? 1 : 0,
            }}
            transition={indicator.morphing ? liquidTransition : revealTransition}
          >
            <motion.span
              className={styles.indicatorSurface}
              initial={{ scaleY: 1 }}
              animate={{
                scaleY: indicator.morphing ? [1, 0.85, 0.93, 1] : 1,
              }}
              transition={indicator.morphing ? liquidTransition : revealTransition}
            />

            <motion.span
              className={styles.indicatorLabels}
              initial={{ x: -indicator.fromX }}
              animate={{
                x: indicator.morphing ? [
                  -indicator.fromX,
                  -indicator.bridgeX,
                  -settleX,
                  -indicator.x,
                ] : -indicator.x,
              }}
              transition={indicator.morphing ? liquidTransition : revealTransition}
            >
              {navItems.map(({ to, key }) => (
                <span className={styles.indicatorLabel} key={to}>
                  {t(key)}
                </span>
              ))}
            </motion.span>
          </motion.span>

          {navItems.map(({ to, key }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={getLinkClassName}
              draggable={false}
            >
              <span className={styles.linkLabel}>{t(key)}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <LanguageSelect />
        </div>

        <motion.span
          key={location.pathname}
          className={styles.mobilePageTitle}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
          {currentPageTitle}
        </motion.span>

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
                draggable={false}
              >
                <span className={styles.linkLabel}>{t(key)}</span>
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
