import SkillChip from '../SkillChip/SkillChip.jsx'
import styles from './QuestHeader.module.css'

export default function QuestHeader({ title, difficulty, estimatedTime, concepts = [] }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.meta}>
        <span className={styles.difficulty}>{difficulty}</span>
        <span className={styles.time}>{estimatedTime}</span>
      </div>
      <div className={styles.chips}>
        {concepts.map((concept) => (
          <SkillChip key={concept} label={concept} />
        ))}
      </div>
    </div>
  )
}
