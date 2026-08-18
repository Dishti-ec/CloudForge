import * as Icons from 'lucide-react'
import styles from './StatCard.module.css'

export default function StatCard({ icon, label, value }) {
  const IconComp = Icons[icon] || Icons.Star

  return (
    <div className={styles.card}>
      <div className={styles.iconWrap}>
        <IconComp size={20} color="var(--accent)" aria-hidden="true" />
      </div>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  )
}
