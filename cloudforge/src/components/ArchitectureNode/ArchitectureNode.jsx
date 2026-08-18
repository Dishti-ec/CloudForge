import { Globe, Zap, Database } from 'lucide-react'
import StatusIndicator from '../StatusIndicator/StatusIndicator.jsx'
import styles from './ArchitectureNode.module.css'

const iconMap = {
  Globe,
  Zap,
  Database,
}

export default function ArchitectureNode({ icon, name, status, description }) {
  const IconComp = iconMap[icon] || Globe
  const isError = status === 'error'
  const iconColor = icon === 'Zap' ? 'var(--accent)' : 'var(--accent-cool)'

  return (
    <div className={`${styles.node} ${isError ? styles.error : ''}`}>
      <div className={styles.iconWrap}>
        <IconComp size={24} color={iconColor} aria-hidden="true" />
      </div>
      <h4 className={styles.name}>{name}</h4>
      <StatusIndicator status={status} />
      <p className={styles.description}>{description}</p>
    </div>
  )
}
