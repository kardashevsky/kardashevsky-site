import { Link } from "react-router-dom"
import type { ComponentProps, ReactNode } from "react"
import styles from "./LinkButton.module.css"

type LinkButtonProps = ComponentProps<typeof Link> & {
  children: ReactNode
  className?: string
}

export function LinkButton({
  children,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      {...props}
      className={`${styles.button} ${className ?? ""}`}
    >
      <span>{children}</span>
      <span className={styles.arrow} aria-hidden="true">
        ↗
      </span>
    </Link>
  )
}
