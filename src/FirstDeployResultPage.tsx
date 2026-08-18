import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { firstDeployQuest } from "./data/first-deploy-quest"

function Confetti() {
  const [particles, setParticles] = useState<
    { id: number; left: number; delay: number; color: string; size: number }[]
  >([])

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReduced) return

    const colors = [
      "var(--color-accent-primary)",
      "var(--color-accent-secondary)",
      "var(--color-status-success)",
      "#fff",
      "#ffd700",
      "#ff6b6b",
    ]
    const items = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 6,
    }))
    setParticles(items)
  }, [])

  if (particles.length === 0) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[200] overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-[confetti-fall_3s_ease-out_forwards]"
          style={{
            left: `${p.left}%`,
            top: "-10px",
            animationDelay: `${p.delay}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            backgroundColor: p.color,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  )
}

export default function FirstDeployResultPage() {
  const navigate = useNavigate()
  const quest = firstDeployQuest

  const [xpDisplay, setXpDisplay] = useState(0)

  // Count-up XP animation
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReduced) {
      setXpDisplay(quest.xpReward)
      return
    }

    let current = 0
    const step = Math.ceil(quest.xpReward / 25)
    const interval = setInterval(() => {
      current += step
      if (current >= quest.xpReward) {
        current = quest.xpReward
        clearInterval(interval)
      }
      setXpDisplay(current)
    }, 40)

    return () => clearInterval(interval)
  }, [quest.xpReward])

  return (
    <div className="max-w-[600px] mx-auto px-6 pt-28 pb-16 flex flex-col items-center gap-8 text-center relative min-h-screen">
      <div className="mesh-bg" />
      <Confetti />

      {/* Trophy */}
      <div className="relative z-10 text-7xl animate-[float_3s_ease-in-out_infinite]">
        🎉
      </div>

      {/* Main heading */}
      <div className="relative z-10">
        <h1 className="text-hero text-gradient-primary mb-3">
          CONGRATULATIONS!
        </h1>
        <p className="text-h2 text-text-primary mt-2">
          You have completed the
        </p>
        <p className="text-h1 text-accent-primary mt-1">
          CLOUD FOUNDATIONS QUEST
        </p>
      </div>

      {/* XP + Score */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-[320px] relative z-10">
        <div className="glass rounded-[var(--radius-card)] py-6 px-4 text-center">
          <span className="text-3xl font-extrabold text-accent-primary block">
            +{xpDisplay}
          </span>
          <span className="text-[10px] text-text-muted uppercase tracking-wider mt-1 block">
            XP Earned
          </span>
        </div>
        <div className="glass rounded-[var(--radius-card)] py-6 px-4 text-center">
          <span className="text-3xl font-extrabold text-status-success block">
            5/5
          </span>
          <span className="text-[10px] text-text-muted uppercase tracking-wider mt-1 block">
            Stages Complete
          </span>
        </div>
      </div>

      {/* Badge */}
      <div className="glass rounded-[var(--radius-card)] px-8 py-5 flex flex-col items-center gap-2 relative z-10">
        <span className="text-4xl" aria-hidden="true">
          🏅
        </span>
        <span className="text-sm font-bold text-text-primary">
          Cloud Foundations
        </span>
        <span className="text-[10px] text-text-muted uppercase tracking-wider">
          Badge Unlocked
        </span>
      </div>

      {/* Skills */}
      <div className="flex flex-col items-center gap-3 relative z-10">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Concepts Mastered
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {quest.concepts.map((concept) => (
            <span
              key={concept}
              className="px-3 py-1.5 text-sm bg-accent-secondary/10 text-accent-secondary rounded-[var(--radius-badge)] border border-accent-secondary/20"
            >
              {concept}
            </span>
          ))}
        </div>
      </div>

      {/* Motivational message */}
      <div className="glass rounded-[var(--radius-card)] p-6 relative z-10 max-w-[440px]">
        <p className="text-text-secondary text-sm leading-relaxed">
          You've taken your first steps into the cloud. You now understand IAM
          roles, Lambda functions, and how to debug permission errors. Start
          climbing the ladder and learn more — your next challenge awaits!
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-8 py-3.5 bg-accent-primary hover:bg-accent-primary-hover text-bg-primary font-semibold text-base rounded-[var(--radius-button)] transition-colors cursor-pointer shadow-[var(--shadow-glow)]"
        >
          Back to Dashboard
        </button>
        <button
          onClick={() => navigate("/quest/serverless-rescue")}
          className="px-6 py-3 text-sm font-medium text-text-secondary border border-border-subtle rounded-[var(--radius-button)] hover:border-accent-primary/30 hover:text-text-primary transition-colors cursor-pointer"
        >
          Next Quest: Serverless Rescue →
        </button>
      </div>
    </div>
  )
}
