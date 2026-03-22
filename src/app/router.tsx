import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import ContactPage from "../pages/ContactPage/ContactPage"
import ResumePage from "../pages/ResumePage/ResumePage"
import AboutPage from "../pages/AboutPage/AboutPage"
import ProjectsPage from "../pages/ProjectsPage/ProjectsPage"

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/resume" element={<ResumePage />} />
    </Routes>
  )
}
