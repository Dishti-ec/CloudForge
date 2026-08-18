import styles from './Card.module.css'

export default function Card({ children, padding = '24px', glow = false, className = '' }) {
  return (
    <div
      className={`${styles.card} ${glow ? styles.glow : ''} ${className}`}
      style={{ padding }}
    >
      {children}
    </div>
  )
}
