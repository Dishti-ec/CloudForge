import { Check, X } from 'lucide-react'
import styles from './AnswerOption.module.css'

export default function AnswerOption({ text, state = 'default', onSelect, disabled = false }) {
  const stateClass = styles[state] || ''

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!disabled && onSelect) onSelect()
    }
  }

  return (
    <button
      type="button"
      className={`${styles.option} ${stateClass}`}
      onClick={() => !disabled && onSelect && onSelect()}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-pressed={state === 'selected'}
      aria-label={text}
    >
      <span className={styles.text}>{text}</span>
      {state === 'selected' && <Check size={18} className={styles.icon} aria-hidden="true" />}
      {state === 'correct' && <Check size={18} className={styles.iconCorrect} aria-label="Correct" />}
      {state === 'incorrect' && <X size={18} className={styles.iconIncorrect} aria-label="Incorrect" />}
    </button>
  )
}
