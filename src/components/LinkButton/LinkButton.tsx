import { Link } from "react-router-dom"
import type { ComponentProps } from "react"
import styles from "./LinkButton.module.css"

type LinkButtonProps = ComponentProps<typeof Link> & {
  children: React.ReactNode
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
      {children}
    </Link>
  )
}
