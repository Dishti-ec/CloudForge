import { useNavigate } from 'react-router-dom'
import { useQuest } from '../context/QuestContext.jsx'
import StatCard from '../components/StatCard/StatCard.jsx'
import ProgressBar from '../components/ProgressBar/ProgressBar.jsx'
import QuestCard from '../components/QuestCard/QuestCard.jsx'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const { profile, questProgress } = useQuest()

  const xpPercent = (profile.xp / profile.xpToNextLevel) * 100

  return (
    <div className={styles.page}>
      <h1 className={styles.welcome}>
        Welcome back, {profile.name} <span aria-hidden="true">👋</span>
      </h1>

      <div className={styles.stats}>
        <StatCard icon="Zap" label="Level" value={profile.level} />
        <StatCard icon="Star" label="XP" value={profile.xp} />
        <StatCard icon="Flame" label="Day Streak" value={profile.streakDays} />
        <StatCard icon="Award" label="Badges" value={profile.badgeCount} />
      </div>

      <div className={styles.xpSection}>
        <ProgressBar value={xpPercent} />
        <span className={styles.xpLabel}>
          {profile.xp} / {profile.xpToNextLevel} XP to Level {profile.level + 1}
        </span>
      </div>

      <QuestCard
        title="Serverless Rescue"
        difficulty="Intermediate"
        progress={questProgress}
        onContinue={() => navigate('/quest/serverless-rescue')}
      />
    </div>
  )
}
