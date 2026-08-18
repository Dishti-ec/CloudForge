import styles from './SkillChip.module.css'

export default function SkillChip({ label }) {
  return (
    <span className={styles.chip}>{label}</span>
  )
}
