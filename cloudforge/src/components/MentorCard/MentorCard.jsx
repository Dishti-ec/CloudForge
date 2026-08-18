import { Bot, CheckCircle, Lightbulb } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import styles from './MentorCard.module.css'

export default function MentorCard({ message, tone = 'success' }) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!message) return

    // Check for reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplayedText(message)
      setIsTyping(false)
      return
    }

    setDisplayedText('')
    setIsTyping(true)
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayedText(message.slice(0, i))
      if (i >= message.length) {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 18)

    return () => clearInterval(interval)
  }, [message])

  const handleClick = () => {
    if (isTyping) {
      setDisplayedText(message)
      setIsTyping(false)
    }
  }

  if (!message || !['success', 'hint'].includes(tone)) {
    return null
  }

  const ToneIcon = tone === 'success' ? CheckCircle : Lightbulb
  const toneColor = tone === 'success' ? 'var(--success)' : 'var(--accent-cool)'

  return (
    <div
      className={`${styles.card} ${styles[tone]}`}
      onClick={handleClick}
      ref={containerRef}
      aria-live="polite"
      role="status"
    >
      <div className={styles.header}>
        <div className={styles.avatar}>
          <Bot size={20} color="var(--accent-cool)" aria-hidden="true" />
        </div>
        <span className={styles.name}>CloudForge Mentor</span>
        <ToneIcon size={16} color={toneColor} aria-hidden="true" />
      </div>
      <p className={styles.message}>
        {displayedText}
        {isTyping && <span className={styles.cursor}>|</span>}
      </p>
    </div>
  )
}
