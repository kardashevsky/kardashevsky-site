import {
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react"

import face from "../../assets/face.webp"
import HeartIcon from "./HeartIcon"
import styles from "./InteractiveFace.module.css"

type Heart = {
  id: number
  x: number
  y: number
  dx: number
  dy: number
  rotate: number
  scale: number
  duration: number
  delay: number
}

const MAX_HEARTS = 10

export default function InteractiveFace() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const nextId = useRef(0)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const removeHeart = (id: number) => {
    setHearts((current) =>
      current.filter((heart) => heart.id !== id),
    )
  }

  const handleClick = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const wrapper = wrapperRef.current

    if (!wrapper) {
      return
    }

    const rect = wrapper.getBoundingClientRect()
    const id = nextId.current++

    const heart: Heart = {
      id,

      x:
        event.clientX -
        rect.left +
        (Math.random() * 16 - 8),

      y:
        event.clientY -
        rect.top +
        (Math.random() * 10 - 5),

      // Небольшой разброс в стороны
      dx: Math.random() * 100 - 50,

      // Полёт вверх 140–210 px
      dy: -(140 + Math.random() * 70),

      rotate: Math.random() * 50 - 25,

      scale: 0.65,

      duration: 950 + Math.random() * 300,
      delay: Math.random() * 80,
    }

    setHearts((current) => {
      const next = [...current, heart]

      // В DOM никогда не будет больше 10 сердец
      return next.slice(-MAX_HEARTS)
    })
  }

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
    >
      <img
        className={styles.face}
        src={face}
        alt=""
        draggable={false}
      />

      <button
        type="button"
        className={styles.hitArea}
        onClick={handleClick}
        aria-label="Heart"
      />

      {hearts.map((heart) => (
        <span
          key={heart.id}
          className={styles.heart}
          aria-hidden="true"
          onAnimationEnd={() =>
            removeHeart(heart.id)
          }
          style={
            {
              left: `${heart.x}px`,
              top: `${heart.y}px`,

              "--heart-x": `${heart.dx}px`,
              "--heart-y": `${heart.dy}px`,
              "--heart-rotate": `${heart.rotate}deg`,
              "--heart-scale": heart.scale,
              "--heart-duration": `${heart.duration}ms`,
              "--heart-delay": `${heart.delay}ms`,
            } as CSSProperties
          }
        >
          <HeartIcon />
        </span>
      ))}
    </div>
  )
}
