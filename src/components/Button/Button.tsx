import styles from "./Button.module.css"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
}

export function Button({ text, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`${styles.button} ${className ?? ""}`}
    >
      <span>{text}</span>
    </button>
  )
}
