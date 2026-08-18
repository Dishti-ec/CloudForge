import { Shield } from 'lucide-react'
import styles from './Badge.module.css'

export default function Badge({ name }) {
  return (
    <div className={styles.badge}>
      <div className={styles.iconWrap}>
        <Shield size={24} color="var(--accent)" aria-hidden="true" />
      </div>
      <span className={styles.name}>{name}</span>
    </div>
  )
}
