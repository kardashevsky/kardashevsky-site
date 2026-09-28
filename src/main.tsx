import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "./i18n"
import "./main.css"
import App from "./app/App"
import face from "./assets/face.webp"

function preloadImage(source: string) {
  return new Promise<void>((resolve) => {
    const image = new Image()

    image.onload = () => {
      image.decode().catch(() => undefined).finally(resolve)
    }
    image.onerror = () => resolve()
    image.src = source
  })
}

async function prepareApp() {
  const criticalAssets = Promise.all([
    document.fonts.load("900 108px Montserrat"),
    document.fonts.load("650 16px Montserrat"),
    preloadImage(face),
  ])
  const loadingFallback = new Promise<void>((resolve) => {
    window.setTimeout(resolve, 3000)
  })

  await Promise.race([criticalAssets, loadingFallback])
}

function renderApp() {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}

prepareApp().catch(() => undefined).finally(renderApp)
