import {
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
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

const HOLD_DELAY = 200
const MAX_DRAG = 10
const DRAG_RESISTANCE = 0.08
const DRAG_THRESHOLD = 4
const DRAG_INERTIA = 0.055

export default function InteractiveFace() {
  const [hearts, setHearts] = useState<Heart[]>([])

  const nextId = useRef(0)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const faceRef = useRef<HTMLImageElement>(null)

  const pointerDownPosition = useRef({
    x: 0,
    y: 0,
  })

  const pointerPosition = useRef({
    x: 0,
    y: 0,
  })

  const dragStart = useRef({
    x: 0,
    y: 0,
  })

  const targetPosition = useRef({
    x: 0,
    y: 0,
  })

  const currentPosition = useRef({
    x: 0,
    y: 0,
  })

  const isPointerDown = useRef(false)
  const canDrag = useRef(false)
  const didDrag = useRef(false)

  const holdTimeout = useRef<number | null>(null)
  const animationFrame = useRef<number | null>(null)

  const removeHeart = (id: number) => {
    setHearts((current) =>
      current.filter((heart) => heart.id !== id),
    )
  }

  const clearHoldTimeout = () => {
    if (holdTimeout.current === null) {
      return
    }

    window.clearTimeout(holdTimeout.current)
    holdTimeout.current = null
  }

  const stopDragAnimation = () => {
    if (animationFrame.current === null) {
      return
    }

    cancelAnimationFrame(animationFrame.current)
    animationFrame.current = null
  }

  const updateDrag = () => {
    const faceElement = faceRef.current

    if (!faceElement || !canDrag.current) {
      animationFrame.current = null
      return
    }

    const current = currentPosition.current
    const target = targetPosition.current

    current.x +=
      (target.x - current.x) * DRAG_INERTIA

    current.y +=
      (target.y - current.y) * DRAG_INERTIA

    faceElement.style.translate =
      `${current.x}px ${current.y}px`

    animationFrame.current =
      requestAnimationFrame(updateDrag)
  }

  const handlePointerDown = (
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    const faceElement = faceRef.current

    if (!faceElement) {
      return
    }

    event.currentTarget.setPointerCapture(
      event.pointerId,
    )

    pointerDownPosition.current = {
      x: event.clientX,
      y: event.clientY,
    }

    pointerPosition.current = {
      x: event.clientX,
      y: event.clientY,
    }

    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
    }

    targetPosition.current = {
      x: 0,
      y: 0,
    }

    currentPosition.current = {
      x: 0,
      y: 0,
    }

    isPointerDown.current = true
    canDrag.current = false
    didDrag.current = false

    clearHoldTimeout()
    stopDragAnimation()

    faceElement.getAnimations().forEach(
      (animation) => {
        if (
          animation.id === "facePress" ||
          animation.id === "faceReturn"
        ) {
          animation.cancel()
        }
      },
    )

    faceElement.style.translate = "0px 0px"
    faceElement.style.scale = "1"

    holdTimeout.current = window.setTimeout(() => {
      if (!isPointerDown.current) {
        return
      }

      dragStart.current = {
        x: pointerPosition.current.x,
        y: pointerPosition.current.y,
      }

      targetPosition.current = {
        x: 0,
        y: 0,
      }

      currentPosition.current = {
        x: 0,
        y: 0,
      }

      canDrag.current = true
      holdTimeout.current = null

      const animation = faceElement.animate(
        [
          {
            scale: "1",
          },
          {
            scale: "0.99",
          },
        ],
        {
          duration: 250,
          easing:
            "cubic-bezier(0.22, 0.61, 0.36, 1)",
          fill: "forwards",
        },
      )

      animation.id = "facePress"

      animationFrame.current =
        requestAnimationFrame(updateDrag)
    }, HOLD_DELAY)
  }

  const handlePointerMove = (
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    pointerPosition.current = {
      x: event.clientX,
      y: event.clientY,
    }

    if (!isPointerDown.current) {
      return
    }

    const totalX =
      event.clientX -
      pointerDownPosition.current.x

    const totalY =
      event.clientY -
      pointerDownPosition.current.y

    if (
      Math.hypot(totalX, totalY) >
      DRAG_THRESHOLD
    ) {
      didDrag.current = true
    }

    if (!canDrag.current) {
      return
    }

    const rawX =
      event.clientX - dragStart.current.x

    const rawY =
      event.clientY - dragStart.current.y

    const x = Math.max(
      -MAX_DRAG,
      Math.min(
        MAX_DRAG,
        rawX * DRAG_RESISTANCE,
      ),
    )

    const y = Math.max(
      -MAX_DRAG,
      Math.min(
        MAX_DRAG,
        rawY * DRAG_RESISTANCE,
      ),
    )

    targetPosition.current = {
      x,
      y,
    }
  }

  const handlePointerUp = (
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    const faceElement = faceRef.current

    const wasDragEnabled = canDrag.current
    const wasDragged = didDrag.current

    clearHoldTimeout()
    stopDragAnimation()

    canDrag.current = false
    isPointerDown.current = false

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId,
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      )
    }

    if (!faceElement) {
      return
    }

    faceElement.getAnimations().forEach(
      (animation) => {
        if (
          animation.id === "facePress" ||
          animation.id === "faceReturn"
        ) {
          animation.cancel()
        }
      },
    )

    if (!wasDragEnabled) {
      faceElement.style.translate = "0px 0px"
      faceElement.style.scale = "1"

      if (!wasDragged) {
        const animation = faceElement.animate(
          [
            {
              scale: "1",
              offset: 0,
            },
            {
              scale: "0.989",
              offset: 0.35,
            },
            {
              scale: "1.002",
              offset: 0.78,
            },
            {
              scale: "1",
              offset: 1,
            },
          ],
          {
            duration: 520,
            easing:
              "cubic-bezier(0.22, 0.61, 0.36, 1)",
          },
        )

        animation.id = "facePress"
      }

      return
    }

    const currentX = currentPosition.current.x
    const currentY = currentPosition.current.y

    faceElement.style.translate =
      `${currentX}px ${currentY}px`

    faceElement.style.scale = "1"

    const animation = faceElement.animate(
      [
        {
          translate:
            `${currentX}px ${currentY}px`,
          scale: "0.99",
          offset: 0,
        },
        {
          translate:
            `${currentX * 0.45}px ${currentY * 0.45}px`,
          scale: "0.995",
          offset: 0.45,
        },
        {
          translate:
            `${currentX * -0.08}px ${currentY * -0.08}px`,
          scale: "1.002",
          offset: 0.78,
        },
        {
          translate: "0px 0px",
          scale: "1",
          offset: 1,
        },
      ],
      {
        duration: 720,
        easing:
          "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    )

    animation.id = "faceReturn"

    faceElement.style.translate = "0px 0px"
    faceElement.style.scale = "1"

    targetPosition.current = {
      x: 0,
      y: 0,
    }

    currentPosition.current = {
      x: 0,
      y: 0,
    }
  }

  const handleClick = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    if (didDrag.current) {
      didDrag.current = false
      return
    }

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

      dx: Math.random() * 100 - 50,

      dy: -(140 + Math.random() * 70),

      rotate: Math.random() * 50 - 25,

      scale: 0.65,

      duration: 950 + Math.random() * 300,
      delay: Math.random() * 80,
    }

    setHearts((current) => {
      const next = [...current, heart]

      return next.slice(-MAX_HEARTS)
    })
  }

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
    >
      <img
        ref={faceRef}
        className={styles.face}
        src={face}
        alt=""
        draggable={false}
      />

      <button
        type="button"
        className={styles.hitArea}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
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
