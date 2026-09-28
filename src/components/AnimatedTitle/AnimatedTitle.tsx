import { motion, useReducedMotion } from "motion/react"
import styles from "./AnimatedTitle.module.css"

type TitleLine = {
  text: string
  className?: string
}

type AnimatedTitleProps = {
  lines: TitleLine[]
  className?: string
}

export function AnimatedTitle({ lines, className }: AnimatedTitleProps) {
  const shouldReduceMotion = useReducedMotion()
  const accessibleTitle = lines.map((line) => line.text).join(" ")

  return (
    <motion.h1
      className={`${styles.title} ${className ?? ""}`}
      aria-label={accessibleTitle}
      initial="hidden"
      animate="visible"
    >
      <span className={styles.titleText} aria-hidden="true">
        {lines.map((line, lineIndex) => (
          <span className={`${styles.line} ${line.className ?? ""}`} key={`${line.text}-${lineIndex}`}>
            {Array.from(line.text).map((letter, letterIndex, letters) => {
              const distanceFromCenter = Math.abs(letterIndex - (letters.length - 1) / 2)

              return (
                <motion.span
                  className={styles.letter}
                  key={`${letter}-${letterIndex}`}
                  variants={{
                    hidden: shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: "0.28em", scale: 0.985, filter: "blur(6px)" },
                    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.9,
                    delay: shouldReduceMotion ? 0 : lineIndex * 0.08 + distanceFromCenter * 0.032,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter === " " ? "\u00a0" : letter}
                </motion.span>
              )
            })}
          </span>
        ))}
      </span>
    </motion.h1>
  )
}
