const images = import.meta.glob<string>(
  "../assets/projects/*.{webp,png,jpg,jpeg}",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
)

const getProjectImage = (fileName: string) => {
  return images[`../assets/projects/${fileName}`]
}

export type ProjectLink = {
  label: string
  url: string
}

export type Project = {
  id: number
  slug: string
  title: string
  description: string
  category: string
  company: string
  role: string
  year: number
  period: string
  image: string
  stack: string[]
  links: ProjectLink[]
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "genza",
    title: "GENZA",
    description: "Digital product.",
    category: "Frontend Development",
    company: "GENZA",
    role: "Frontend Developer",
    year: 2026,
    period: "2025 — 2026",
    image: getProjectImage("genza.webp"),
    stack: [
      "Vue 3",
      "TypeScript",
      "REST API",
      "WebSocket",
    ],
    links: [
      {
        label: "Application",
        url: "https://...",
      },
      {
        label: "Website",
        url: "https://...",
      },
      {
        label: "Company",
        url: "https://...",
      },
    ],
  },
  {
    id: 2,
    slug: "duriano",
    title: "DURIANO",
    description: "Digital product.",
    category: "Frontend Development",
    company: "DURIANO",
    role: "Founder · Frontend Developer",
    year: 2026,
    period: "2024 — 2026",
    image: getProjectImage("duriano.webp"),
    stack: [
      "React",
      "TypeScript",
    ],
    links: [
      {
        label: "Application",
        url: "https://...",
      },
      {
        label: "Website",
        url: "https://...",
      },
      {
        label: "Company",
        url: "https://...",
      },
    ],
  },
]

export const getProjectBySlug = (slug: string) => {
  return projects.find((project) => project.slug === slug)
}
