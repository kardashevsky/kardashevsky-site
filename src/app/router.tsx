import {
  useEffect,
  useState,
  type TransitionEvent,
} from "react"
import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom"

import HomePage from "../pages/HomePage/HomePage"
import ContactPage from "../pages/ContactPage/ContactPage"
import ResumePage from "../pages/ResumePage/ResumePage"
import AboutPage from "../pages/AboutPage/AboutPage"
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage"

import styles from "./Router.module.css"

export default function AppRouter() {
  const location = useLocation()

  const [displayLocation, setDisplayLocation] = useState(location)
  const [isVisible, setIsVisible] = useState(true)

  const routeChanged =
    location.pathname !== displayLocation.pathname

  useEffect(() => {
    if (!routeChanged) {
      return
    }

    const frame = requestAnimationFrame(() => {
      setIsVisible(false)
    })

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [routeChanged])

  const handleTransitionEnd = (
    event: TransitionEvent<HTMLDivElement>,
  ) => {
    if (
      event.propertyName !== "opacity" ||
      isVisible ||
      !routeChanged
    ) {
      return
    }

    setDisplayLocation(location)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true)
      })
    })
  }

  return (
    <div
      className={`${styles.page} ${
        isVisible ? styles.visible : styles.hidden
      }`}
      onTransitionEnd={handleTransitionEnd}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </div>
  )
}
