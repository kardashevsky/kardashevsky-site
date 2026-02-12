import "./HomePage.css"
import BodyImage from "../assets/favicon.svg"
import Heart from "../assets/Heart"
import { useHearts } from "../hooks/useHearts"

export default function HomePage() {
  const { hearts, spawnHeart } = useHearts()

  return (
    <div className="home">
      <div className="content">
        <div className="heartsLayer">
          {hearts.map((h) => (
            <Heart key={h.id} x={h.x} y={h.y} />
          ))}
        </div>

        <div className="avatar" onClick={spawnHeart}>
          <img src={BodyImage} alt="" draggable={false} />
        </div>

        <h1 className="title">
          <span>DMITRY</span>
          <span>KARDASHEVSKY</span>
        </h1>
      </div>
    </div>
  )
}
