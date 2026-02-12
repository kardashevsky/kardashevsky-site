type Props = { x: number; y: number }

export default function Heart({ x, y }: Props) {
  return (
    <svg
      className="heart"
      style={{ left: x, top: y }}
      viewBox="0 0 24 24"
      width="28"
      height="28"
    >
      <path
        d="M12 21s-6.716-4.35-9.428-8.02C-0.36 9.06 1.42 4.5 5.5 4.5
           7.74 4.5 9 6 12 8.5 15 6 16.26 4.5 18.5 4.5
           22.58 4.5 24.36 9.06 21.428 12.98
           18.716 16.65 12 21 12 21z"
        fill="#ff2e63"
      />
    </svg>
  )
}
