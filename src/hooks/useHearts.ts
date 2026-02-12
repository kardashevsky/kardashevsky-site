import { useState } from "react"
import { triggerHaptic } from "../utils/haptics"

export type HeartItem = { id: number; x: number; y: number }

export function useHearts() {
  const [hearts, setHearts] = useState<HeartItem[]>([])
  const [pulse, setPulse] = useState(false)
  
  const spawnHeart = (e: React.MouseEvent<HTMLElement>, duration = 900) => {
    triggerHaptic()
    const contentEl = e.currentTarget.parentElement as HTMLElement
    const contentRect = contentEl.getBoundingClientRect()

    const x = e.clientX - contentRect.left
    const y = e.clientY - contentRect.top

    const id = Date.now() + Math.random()
    setHearts((prev) => [...prev, { id, x, y }])

    setPulse(true)
    setTimeout(() => setPulse(false), 250)

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id))
    }, duration)
  }

  return { hearts, pulse, spawnHeart }
}
