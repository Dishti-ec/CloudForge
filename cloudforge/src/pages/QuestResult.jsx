import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { quests } from '../data/quests.js'
import { useQuest } from '../context/QuestContext.jsx'
import Badge from '../components/Badge/Badge.jsx'
import SkillChip from '../components/SkillChip/SkillChip.jsx'
import Button from '../components/Button/Button.jsx'
import styles from './QuestResult.module.css'

export default function QuestResult() {
  const navigate = useNavigate()
  const { leveledUp, dismissLevelUp } = useQuest()
  const quest = quests['serverless-rescue']
  const { score, xpEarned, badge, skills } = quest.results

  const [xpDisplay, setXpDisplay] = useState(0)
  const [showConfetti, setShowConfetti] = useState(true)

  // Count-up animation for XP
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
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

    // Hide confetti after 1.5s
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
    <div className={styles.page}>
      {showConfetti && <div className={styles.confetti} aria-hidden="true" />}

      {leveledUp && (
        <div className={styles.levelUp} role="alert">
          Level Up!
        </div>
      )}

      <h1 className={styles.complete}>QUEST COMPLETE</h1>
      <p className={styles.questName}>{quest.title}</p>

      <span className={styles.score}>{score}%</span>
      <span className={styles.xp}>+{xpDisplay} XP</span>

      <Badge name={badge} />

      <div className={styles.skillsSection}>
        <h3 className={styles.skillsTitle}>Skills Unlocked</h3>
        <div className={styles.skills}>
          {skills.map((s) => (
            <SkillChip key={s} label={s} />
          ))}
        </div>
      </div>

      <Button variant="primary" size="lg" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </Button>
    </div>
  )
}
