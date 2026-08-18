import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { quests } from '../data/quests.js'
import { mentorResponses } from '../data/mentorResponses.js'
import { useQuest } from '../context/QuestContext.jsx'
import ArchitectureGraph from '../components/ArchitectureGraph/ArchitectureGraph.jsx'
import LogPanel from '../components/LogPanel/LogPanel.jsx'
import AnswerOption from '../components/AnswerOption/AnswerOption.jsx'
import MentorCard from '../components/MentorCard/MentorCard.jsx'
import Button from '../components/Button/Button.jsx'
import Card from '../components/Card/Card.jsx'
import styles from './QuestDebug.module.css'

export default function QuestDebug() {
  const navigate = useNavigate()
  const { completeQuest } = useQuest()
  const quest = quests['serverless-rescue']

  const [selectedId, setSelectedId] = useState(null)
  const [submittedId, setSubmittedId] = useState(null)
  const [feedback, setFeedback] = useState(null) // 'correct' | 'incorrect' | null
  const [mentorMessage, setMentorMessage] = useState('')
  const [mentorTone, setMentorTone] = useState('hint')
  const [isCorrect, setIsCorrect] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const [disabled, setDisabled] = useState(false)

  // Explanation stage
  const [explanation, setExplanation] = useState('')
  const [explanationSubmitted, setExplanationSubmitted] = useState(false)

  const handleSelect = useCallback((id) => {
    if (disabled || isCorrect) return
    setSelectedId(id)
    setFeedback(null)
    setSubmittedId(null)
  }, [disabled, isCorrect])

  const handleSubmit = useCallback(() => {
    if (selectedId === null || disabled) return

    setDisabled(true)
    setSubmittedId(selectedId)
    setAttemptCount((prev) => prev + 1)

    const answer = quest.answers.find((a) => a.id === selectedId)
    if (answer?.correct) {
      setFeedback('correct')
      setIsCorrect(true)
      setMentorMessage(mentorResponses.correctDiagnosis)
      setMentorTone('success')
      completeQuest()
    } else {
      setFeedback('incorrect')
      setMentorMessage(mentorResponses.incorrectDiagnosis)
      setMentorTone('hint')

      // Reset after delay for retry
      setTimeout(() => {
        setFeedback(null)
        setSubmittedId(null)
        setSelectedId(null)
        setDisabled(false)
      }, 1500)
    }
  }, [selectedId, disabled, quest.answers, completeQuest])

  const handleExplanationSubmit = useCallback(() => {
    const trimmed = explanation.replace(/\s/g, '')
    if (trimmed.length < 10) return
    setExplanationSubmitted(true)
    setMentorMessage(mentorResponses.explanationSubmitted)
    setMentorTone('success')
  }, [explanation])

  const getOptionState = (answer) => {
    if (feedback && submittedId === answer.id) {
      return answer.correct ? 'correct' : 'incorrect'
    }
    if (selectedId === answer.id && !feedback) return 'selected'
    return 'default'
  }

  const nonWhitespaceCount = explanation.replace(/\s/g, '').length

  return (
    <div className={styles.page}>
      {/* Incident Banner */}
      <div className={styles.banner} role="alert">
        <span className={styles.bannerText}>
          <span className={styles.bannerEmoji} aria-hidden="true">🚨</span> INCIDENT DETECTED
        </span>
      </div>

      {/* Status Row */}
      <div className={styles.statusRow} aria-live="polite">
        {quest.architectureDebug.map((node) => (
          <div
            key={node.id}
            className={`${styles.statusPill} ${
              node.status === 'error' ? styles.statusError : styles.statusOk
            }`}
          >
            <span
              className={styles.statusDot}
              style={{
                backgroundColor:
                  node.status === 'error' ? 'var(--error)' : 'var(--success)',
              }}
            />
            <span>{node.name}</span>
            <span className={styles.statusLabel}>
              — {node.status === 'error' ? 'Error' : 'Operational'}
            </span>
          </div>
        ))}
      </div>

      {/* Log Panel */}
      <LogPanel lines={quest.logs} />

      {/* Architecture */}
      <ArchitectureGraph nodes={quest.architectureDebug} direction="horizontal" />

      {/* Answer Options */}
      <Card padding="24px" className={styles.answersCard}>
        <h2 className={styles.sectionTitle}>What is causing the failure?</h2>

        {attemptCount > 0 && !isCorrect && (
          <p className={styles.attemptCounter}>Attempt {attemptCount}</p>
        )}

        <div className={styles.answers}>
          {quest.answers.map((answer) => (
            <AnswerOption
              key={answer.id}
              text={answer.text}
              state={getOptionState(answer)}
              onSelect={() => handleSelect(answer.id)}
              disabled={disabled || isCorrect}
            />
          ))}
        </div>

        <Button
          variant="primary"
          size="lg"
          disabled={selectedId === null || disabled || isCorrect}
          onClick={handleSubmit}
        >
          Submit Diagnosis
        </Button>
      </Card>

      {/* Mentor Feedback */}
      {mentorMessage && (
        <MentorCard message={mentorMessage} tone={mentorTone} />
      )}

      {/* Explanation Stage */}
      {isCorrect && !explanationSubmitted && (
        <Card padding="24px" className={styles.explanationCard}>
          <h2 className={styles.sectionTitle}>Explain your diagnosis.</h2>
          <p className={styles.subLabel}>Why do you think Lambda cannot access DynamoDB?</p>
          <label htmlFor="explanation-textarea" className={styles.label}>
            Explain your diagnosis
          </label>
          <textarea
            id="explanation-textarea"
            className={styles.textarea}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            maxLength={1000}
            placeholder="e.g., The Lambda function's IAM role is missing a policy that grants dynamodb:GetItem permission..."
          />
          <Button
            variant="primary"
            size="md"
            disabled={nonWhitespaceCount < 10}
            onClick={handleExplanationSubmit}
          >
            Submit Explanation
          </Button>
        </Card>
      )}

      {/* View Results */}
      {explanationSubmitted && (
        <div className={styles.resultsNav}>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/quest/serverless-rescue/result')}
          >
            View Results
          </Button>
        </div>
      )}
    </div>
  )
}
