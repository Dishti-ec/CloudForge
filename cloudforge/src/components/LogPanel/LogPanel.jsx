import styles from './LogPanel.module.css'

export default function LogPanel({ lines = [] }) {
  return (
    <div className={styles.panel} aria-live="polite" role="log" aria-label="Error logs">
      {lines.map((line, idx) => (
        <pre key={idx} className={styles.line}>
          {line}
        </pre>
      ))}
    </div>
  )
}
