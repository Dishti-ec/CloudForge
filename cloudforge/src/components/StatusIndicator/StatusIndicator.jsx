import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import styles from './StatusIndicator.module.css'

const statusConfig = {
  operational: {
    color: 'var(--success)',
    label: 'Operational',
    Icon: CheckCircle,
  },
  warning: {
    color: 'var(--warning)',
    label: 'Degraded',
    Icon: AlertTriangle,
  },
  error: {
    color: 'var(--error)',
    label: 'Error',
    Icon: XCircle,
  },
}

export default function StatusIndicator({ status }) {
  const config = statusConfig[status] || statusConfig.operational

  return (
    <span className={`${styles.indicator} ${styles[status]}`}>
      <span className={styles.dot} style={{ backgroundColor: config.color }} />
      <config.Icon size={14} color={config.color} aria-hidden="true" />
      <span className={styles.label}>{config.label}</span>
    </span>
  )
}
