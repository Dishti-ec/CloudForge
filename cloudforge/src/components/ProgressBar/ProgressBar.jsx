import styles from './ProgressBar.module.css'

export default function ProgressBar({ value = 0, color = 'var(--accent)' }) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className={styles.track} role="progressbar" aria-valuenow={clampedValue} aria-valuemin={0} aria-valuemax={100}>
      <div
        className={styles.fill}
        style={{ width: `${clampedValue}%`, backgroundColor: color }}
      />
    </div>
  )
}
