import Button from '../Button/Button.jsx'
import ProgressBar from '../ProgressBar/ProgressBar.jsx'
import Card from '../Card/Card.jsx'
import styles from './QuestCard.module.css'

export default function QuestCard({ title, difficulty, progress, onContinue }) {
  return (
    <Card className={styles.questCard} padding="24px">
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.difficulty}>{difficulty}</span>
      </div>
      <div className={styles.progressSection}>
        <ProgressBar value={progress} />
        <span className={styles.progressLabel}>{progress}%</span>
      </div>
      <Button variant="primary" size="md" onClick={onContinue}>
        Continue Quest
      </Button>
    </Card>
  )
}
