import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { quests } from "./data/quests"
import { useQuest } from "./context/QuestContext"

export default function QuestResultPage() {
  const navigate = useNavigate()
  const { leveledUp, dismissLevelUp } = useQuest()
  const quest = quests["serverless-rescue"]
  const { score, xpEarned, badge, skills } = quest.results

  const [xpDisplay, setXpDisplay] = useState(0)
  const [showConfetti, setShowConfetti] = useState(true)

  // Count-up animation for XP
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReduced) {
      setXpDisplay(xpEarned)
      setShowConfetti(false)
      return
    }

    let current = 0
    const step = Math.ceil(xpEarned / 30)
    const interval = setInterval(() => {
      current += step
      if (current >= xpEarned) {
        current = xpEarned
        clearInterval(interval)
      }
      setXpDisplay(current)
    }, 30)

    const confettiTimer = setTimeout(() => setShowConfetti(false), 1500)

    return () => {
      clearInterval(interval)
      clearTimeout(confettiTimer)
    }
  }, [xpEarned])

  // Dismiss level-up after 4 seconds
  useEffect(() => {
    if (leveledUp) {
      const timer = setTimeout(dismissLevelUp, 4000)
      return () => clearTimeout(timer)
    }
  }, [leveledUp, dismissLevelUp])

  return (
    <div className="max-w-[480px] mx-auto px-6 pt-28 pb-16 flex flex-col items-center gap-6 text-center relative">
      <div className="mesh-bg" />

      {/* Confetti */}
      {showConfetti && (
        <div
          className="fixed inset-0 pointer-events-none z-[200] animate-[confetti-fall_1.5s_ease-out_forwards] opacity-70"
          aria-hidden="true"
          style={{
            backgroundImage: `
              radial-gradient(circle, var(--color-accent-primary) 2px, transparent 2px),
              radial-gradient(circle, var(--color-accent-secondary) 2px, transparent 2px),
              radial-gradient(circle, var(--color-status-success) 1.5px, transparent 1.5px),
              radial-gradient(circle, var(--color-accent-primary) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "80px 80px, 60px 60px, 90px 90px, 70px 70px",
            backgroundPosition: "0 0, 40px 40px, 20px 60px, 60px 20px",
          }}
        />
      )}

      {/* Level Up */}
      {leveledUp && (
        <div
          className="text-2xl font-extrabold text-accent-primary bg-accent-primary/15 px-6 py-2 rounded-lg border border-accent-primary animate-[count-pulse_2s_ease-in-out] relative z-10"
          role="alert"
        >
          Level Up!
        </div>
      )}

      {/* Quest Complete */}
      <h1 className="text-[3rem] font-bold text-status-success leading-none relative z-10">
        QUEST COMPLETE
      </h1>
      <p className="text-[1.375rem] text-text-secondary font-semibold relative z-10">
        {quest.title}
      </p>

      {/* Score */}
      <span className="text-[2.25rem] font-extrabold text-accent-primary leading-none relative z-10">
        {score}%
      </span>

      {/* XP */}
      <span className="text-[1.375rem] font-bold text-accent-primary relative z-10">
        +{xpDisplay} XP
      </span>

      {/* Badge */}
      <div className="glass rounded-[var(--radius-card)] px-8 py-5 flex flex-col items-center gap-2 relative z-10">
        <span className="text-3xl" aria-hidden="true">🏅</span>
        <span className="text-sm font-semibold text-text-primary">{badge}</span>
        <span className="text-[10px] text-text-muted uppercase tracking-wider">
          Badge Unlocked
        </span>
      </div>

      {/* Skills */}
      <div className="flex flex-col items-center gap-3 relative z-10">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Skills Unlocked
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 text-sm bg-accent-secondary/10 text-accent-secondary rounded-[var(--radius-badge)] border border-accent-secondary/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Back to Dashboard */}
      <button
        className="mt-4 px-8 py-3.5 bg-accent-primary hover:bg-accent-primary-hover text-bg-primary font-semibold text-base rounded-[var(--radius-button)] transition-colors cursor-pointer shadow-[var(--shadow-glow)] relative z-10"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>
    </div>
  )
}
