import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Globe, Zap, Database } from "lucide-react"
import { quests } from "./data/quests"
import { mentorResponses } from "./data/mentorResponses"
import { useQuest } from "./context/QuestContext"

const iconMap: Record<string, typeof Globe> = {
  Globe,
  Zap,
  Database,
}

export default function QuestDebugPage() {
  const navigate = useNavigate()
  const { completeQuest } = useQuest()
  const quest = quests["serverless-rescue"]

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [submittedId, setSubmittedId] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [mentorMessage, setMentorMessage] = useState("")
  const [mentorTone, setMentorTone] = useState<"hint" | "success">("hint")
  const [isCorrect, setIsCorrect] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const [disabled, setDisabled] = useState(false)

  // Explanation stage
  const [explanation, setExplanation] = useState("")
  const [explanationSubmitted, setExplanationSubmitted] = useState(false)

  const handleSelect = useCallback(
    (id: number) => {
      if (disabled || isCorrect) return
      setSelectedId(id)
      setFeedback(null)
      setSubmittedId(null)
    },
    [disabled, isCorrect]
  )

  const handleSubmit = useCallback(() => {
    if (selectedId === null || disabled) return

    setDisabled(true)
    setSubmittedId(selectedId)
    setAttemptCount((prev) => prev + 1)

    const answer = quest.answers.find((a) => a.id === selectedId)
    if (answer?.correct) {
      setFeedback("correct")
      setIsCorrect(true)
      setMentorMessage(mentorResponses.correctDiagnosis)
      setMentorTone("success")
      completeQuest()
    } else {
      setFeedback("incorrect")
      setMentorMessage(mentorResponses.incorrectDiagnosis)
      setMentorTone("hint")

      setTimeout(() => {
        setFeedback(null)
        setSubmittedId(null)
        setSelectedId(null)
        setDisabled(false)
      }, 1500)
    }
  }, [selectedId, disabled, quest.answers, completeQuest])

  const handleExplanationSubmit = useCallback(() => {
    const trimmed = explanation.replace(/\s/g, "")
    if (trimmed.length < 10) return
    setExplanationSubmitted(true)
    setMentorMessage(mentorResponses.explanationSubmitted)
    setMentorTone("success")
  }, [explanation])

  const getOptionClasses = (answerId: number) => {
    const base =
      "w-full text-left p-4 rounded-[var(--radius-card)] border transition-all duration-200 cursor-pointer"

    if (feedback && submittedId === answerId) {
      if (quest.answers.find((a) => a.id === answerId)?.correct) {
        return `${base} border-status-success bg-status-success/10 text-text-primary`
      }
      return `${base} border-status-error bg-status-error/10 text-text-primary`
    }

    if (selectedId === answerId && !feedback) {
      return `${base} border-accent-primary bg-accent-primary/10 text-text-primary`
    }

    return `${base} border-border-subtle bg-bg-surface hover:border-accent-primary/40 text-text-secondary hover:text-text-primary`
  }

  const nonWhitespaceCount = explanation.replace(/\s/g, "").length

  return (
    <div className="max-w-[900px] mx-auto px-6 pt-24 pb-16 flex flex-col gap-6 relative">
      <div className="mesh-bg" />

      {/* Incident Banner */}
      <div
        className="w-full bg-status-error/10 border border-status-error rounded-xl px-6 py-4 flex items-center relative z-10"
        role="alert"
      >
        <span className="text-h1 text-status-error">
          <span
            className="inline-block animate-[pulse_1.5s_ease-in-out_infinite]"
            aria-hidden="true"
          >
            🚨
          </span>{" "}
          INCIDENT DETECTED
        </span>
      </div>

      {/* Status Row */}
      <div
        className="flex flex-wrap gap-3 relative z-10"
        aria-live="polite"
      >
        {quest.architectureDebug.map((node) => {
          const isError = node.status === "error"
          return (
            <div
              key={node.id}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg bg-bg-surface border text-sm text-text-primary ${
                isError ? "border-status-error" : "border-border-subtle"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: isError
                    ? "var(--color-status-error)"
                    : "var(--color-status-success)",
                }}
              />
              <span>{node.name}</span>
              <span className="text-text-secondary">
                — {isError ? "Error" : "Operational"}
              </span>
            </div>
          )
        })}
      </div>

      {/* Log Panel */}
      <div className="glass rounded-[var(--radius-card)] p-5 relative z-10">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
          CloudWatch Logs
        </h3>
        <div className="bg-bg-primary rounded-lg p-4 border border-border-subtle overflow-x-auto">
          <pre className="text-xs text-text-secondary font-mono whitespace-pre-wrap leading-relaxed">
            {quest.logs.map((line, i) => (
              <span
                key={i}
                className={
                  line.includes("ERROR") || line.includes("not authorized")
                    ? "text-status-error font-semibold"
                    : ""
                }
              >
                {line}
                {"\n"}
              </span>
            ))}
          </pre>
        </div>
      </div>

      {/* Architecture — Horizontal */}
      <div className="glass rounded-[var(--radius-card)] p-5 relative z-10">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4 text-center">
          Architecture Status
        </h3>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {quest.architectureDebug.map((node, idx) => {
            const Icon = iconMap[node.icon] ?? Globe
            const isError = node.status === "error"
            return (
              <div key={node.id} className="flex items-center gap-3">
                <div
                  className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border ${
                    isError
                      ? "border-status-error/50 bg-status-error/5"
                      : "border-border-subtle bg-bg-surface"
                  }`}
                >
                  <Icon
                    size={24}
                    className={isError ? "text-status-error" : "text-accent-secondary"}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-medium text-text-primary">
                    {node.name}
                  </span>
                  <span
                    className={`text-[10px] ${
                      isError ? "text-status-error" : "text-status-success"
                    }`}
                  >
                    {isError ? "ERROR" : "OK"}
                  </span>
                </div>
                {idx < quest.architectureDebug.length - 1 && (
                  <div className="w-8 h-px bg-border-subtle" aria-hidden="true" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Answer Options */}
      <div className="glass rounded-[var(--radius-card)] p-6 flex flex-col gap-4 relative z-10">
        <h2 className="text-h3 text-text-primary">
          What is causing the failure?
        </h2>

        {attemptCount > 0 && !isCorrect && (
          <p className="text-xs text-text-muted font-semibold">
            Attempt {attemptCount}
          </p>
        )}

        <div className="flex flex-col gap-3">
          {quest.answers.map((answer) => (
            <button
              key={answer.id}
              className={getOptionClasses(answer.id)}
              onClick={() => handleSelect(answer.id)}
              disabled={disabled || isCorrect}
              aria-pressed={selectedId === answer.id}
            >
              <span className="text-sm leading-relaxed">{answer.text}</span>
            </button>
          ))}
        </div>

        <button
          className="mt-2 w-full py-3 bg-accent-primary hover:bg-accent-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-bg-primary font-semibold text-sm rounded-[var(--radius-button)] transition-colors cursor-pointer"
          disabled={selectedId === null || disabled || isCorrect}
          onClick={handleSubmit}
        >
          Submit Diagnosis
        </button>
      </div>

      {/* Mentor Feedback */}
      {mentorMessage && (
        <div
          className={`glass rounded-[var(--radius-card)] p-5 border-l-4 relative z-10 ${
            mentorTone === "success"
              ? "border-l-status-success"
              : "border-l-accent-primary"
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl" aria-hidden="true">
              {mentorTone === "success" ? "✅" : "🤖"}
            </span>
            <div>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                CloudForge Mentor
              </span>
              <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                {mentorMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Explanation Stage */}
      {isCorrect && !explanationSubmitted && (
        <div className="glass rounded-[var(--radius-card)] p-6 flex flex-col gap-4 relative z-10">
          <h2 className="text-h3 text-text-primary">
            Explain your diagnosis.
          </h2>
          <p className="text-sm text-text-secondary">
            Why do you think Lambda cannot access DynamoDB?
          </p>
          <label
            htmlFor="explanation-textarea"
            className="text-xs font-semibold text-text-muted uppercase tracking-wider"
          >
            Explain your diagnosis
          </label>
          <textarea
            id="explanation-textarea"
            className="w-full min-h-[120px] p-3 rounded-lg border border-border-subtle bg-bg-elevated text-text-primary text-[15px] leading-relaxed resize-y placeholder:text-text-muted focus:outline-none focus:border-accent-secondary"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            maxLength={1000}
            placeholder="e.g., The Lambda function's IAM role is missing a policy that grants dynamodb:GetItem permission..."
          />
          <button
            className="w-full py-3 bg-accent-primary hover:bg-accent-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-bg-primary font-semibold text-sm rounded-[var(--radius-button)] transition-colors cursor-pointer"
            disabled={nonWhitespaceCount < 10}
            onClick={handleExplanationSubmit}
          >
            Submit Explanation
          </button>
        </div>
      )}

      {/* View Results */}
      {explanationSubmitted && (
        <div className="flex justify-center relative z-10">
          <button
            className="px-8 py-3.5 bg-accent-primary hover:bg-accent-primary-hover text-bg-primary font-semibold text-base rounded-[var(--radius-button)] transition-colors cursor-pointer shadow-[var(--shadow-glow)]"
            onClick={() => navigate("/quest/serverless-rescue/result")}
          >
            View Results
          </button>
        </div>
      )}
    </div>
  )
}
