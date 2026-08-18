import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { firstDeployQuest } from "./data/first-deploy-quest"

export default function FirstDeployPage() {
  const navigate = useNavigate()
  const quest = firstDeployQuest
  const totalStages = quest.stages.length

  const [currentStage, setCurrentStage] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)
  const [mentorMessage, setMentorMessage] = useState("")
  const [stageCompleted, setStageCompleted] = useState<boolean[]>(
    Array(totalStages).fill(false)
  )

  const stage = quest.stages[currentStage]
  const progress = Math.round(
    (stageCompleted.filter(Boolean).length / totalStages) * 100
  )

  const resetMCQ = useCallback(() => {
    setSelectedOption(null)
    setSubmitted(false)
    setIsCorrect(false)
    setHintIndex(0)
    setMentorMessage("")
  }, [])

  const handleSubmit = useCallback(() => {
    if (!selectedOption) return
    setSubmitted(true)

    if (selectedOption === stage.mcq.correctId) {
      setIsCorrect(true)
      setMentorMessage(
        "Excellent work! You got it right. You can now move to the next stage."
      )
      setStageCompleted((prev) => {
        const next = [...prev]
        next[currentStage] = true
        return next
      })
    } else {
      setIsCorrect(false)
      const hint =
        stage.mcq.hints[Math.min(hintIndex, stage.mcq.hints.length - 1)]
      setMentorMessage(hint)
      setHintIndex((prev) => Math.min(prev + 1, stage.mcq.hints.length - 1))
    }
  }, [selectedOption, stage.mcq, currentStage, hintIndex])

  const handleTryAgain = useCallback(() => {
    setSelectedOption(null)
    setSubmitted(false)
    setIsCorrect(false)
  }, [])

  const handleNext = () => {
    if (currentStage < totalStages - 1) {
      setCurrentStage((s) => s + 1)
      resetMCQ()
    } else {
      navigate("/quest/first-deploy/result")
    }
  }

  const handlePrev = () => {
    if (currentStage > 0) {
      setCurrentStage((s) => s - 1)
      resetMCQ()
    }
  }

  const handleStageClick = (idx: number) => {
    setCurrentStage(idx)
    resetMCQ()
  }

  const getOptionClasses = (optionId: string) => {
    const base =
      "w-full text-left p-4 rounded-[var(--radius-card)] border transition-all duration-200 cursor-pointer"

    if (submitted && optionId === selectedOption) {
      if (isCorrect) {
        return `${base} border-status-success bg-status-success/10 text-text-primary`
      }
      return `${base} border-status-error bg-status-error/10 text-text-primary`
    }

    if (selectedOption === optionId && !submitted) {
      return `${base} border-accent-primary bg-accent-primary/10 text-text-primary`
    }

    return `${base} border-border-subtle bg-bg-surface hover:border-accent-primary/40 text-text-secondary hover:text-text-primary`
  }

  return (
    <div className="max-w-[900px] mx-auto px-6 pt-24 pb-16 flex flex-col gap-6 relative">
      <div className="mesh-bg" />

      {/* Quest Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2.5 py-1 text-xs bg-status-success/15 text-status-success rounded-[var(--radius-badge)] font-semibold">
            {quest.difficulty}
          </span>
          <span className="text-xs text-text-muted">
            ⏱ {quest.estimatedTime}
          </span>
          <span className="text-xs text-accent-primary font-semibold">
            +{quest.xpReward} XP
          </span>
        </div>
        <h1 className="text-h1 text-text-primary">{quest.title}</h1>
      </div>

      {/* Stage Progress Tabs */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {quest.stages.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => handleStageClick(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                idx === currentStage
                  ? "bg-accent-primary/15 text-accent-primary border-accent-primary/40"
                  : stageCompleted[idx]
                    ? "bg-status-success/10 text-status-success border-status-success/30"
                    : "bg-bg-surface text-text-muted border-border-subtle hover:border-accent-primary/20"
              }`}
            >
              <span>{s.icon}</span>
              <span className="hidden sm:inline">{s.title}</span>
              <span className="sm:hidden">{idx + 1}</span>
              {stageCompleted[idx] && (
                <span className="text-status-success ml-1">✓</span>
              )}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-bg-elevated rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, var(--color-status-success), var(--color-accent-secondary))",
            }}
          />
        </div>
        <span className="text-[11px] text-text-muted mt-1 inline-block">
          Stage {currentStage + 1} of {totalStages} —{" "}
          {stageCompleted.filter(Boolean).length} completed
        </span>
      </div>

      {/* Stage Content */}
      <div className="glass rounded-[var(--radius-card)] p-8 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{stage.icon}</span>
          <div>
            <h2 className="text-h2 text-text-primary">{stage.title}</h2>
            <p className="text-sm text-text-secondary mt-0.5">
              {stage.description}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {stage.content.map((point, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl bg-bg-surface/50 border border-border-subtle/50 hover:border-accent-secondary/30 transition-colors"
            >
              <span className="text-accent-secondary mt-0.5 flex-shrink-0 text-sm font-bold">
                {idx + 1}.
              </span>
              <p className="text-text-secondary text-sm leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </div>

        {/* Stage type badge */}
        <div className="mt-6 flex items-center gap-2">
          <span
            className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full border ${
              stage.type === "learn"
                ? "bg-accent-secondary/10 text-accent-secondary border-accent-secondary/20"
                : stage.type === "build"
                  ? "bg-accent-primary/10 text-accent-primary border-accent-primary/20"
                  : stage.type === "incident"
                    ? "bg-status-error/10 text-status-error border-status-error/20"
                    : stage.type === "completion"
                      ? "bg-status-success/10 text-status-success border-status-success/20"
                      : "bg-bg-elevated text-text-muted border-border-subtle"
            }`}
          >
            {stage.type} stage
          </span>
        </div>
      </div>

      {/* MCQ Challenge */}
      <div className="glass rounded-[var(--radius-card)] p-6 flex flex-col gap-4 relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg" aria-hidden="true">
            🧠
          </span>
          <h3 className="text-h3 text-text-primary">Knowledge Check</h3>
        </div>
        <p className="text-text-primary font-medium text-sm">
          {stage.mcq.question}
        </p>

        <div className="flex flex-col gap-3">
          {stage.mcq.options.map((option) => (
            <button
              key={option.id}
              className={getOptionClasses(option.id)}
              onClick={() => {
                if (!submitted || !isCorrect) {
                  setSelectedOption(option.id)
                  if (submitted) {
                    setSubmitted(false)
                  }
                }
              }}
              disabled={isCorrect}
              aria-pressed={selectedOption === option.id}
            >
              <span className="text-sm leading-relaxed">{option.text}</span>
            </button>
          ))}
        </div>

        {/* Submit / Try Again */}
        {!isCorrect && (
          <div className="flex items-center gap-3 mt-2">
            <button
              className="flex-1 py-3 bg-accent-primary hover:bg-accent-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-bg-primary font-semibold text-sm rounded-[var(--radius-button)] transition-colors cursor-pointer"
              disabled={!selectedOption}
              onClick={handleSubmit}
            >
              {submitted ? "Try Again" : "Submit Answer"}
            </button>
          </div>
        )}

        {/* Success indicator */}
        {isCorrect && (
          <div className="flex items-center gap-2 p-3 bg-status-success/10 border border-status-success/30 rounded-xl">
            <span className="text-status-success text-lg">✓</span>
            <span className="text-sm text-status-success font-medium">
              Correct! Stage complete.
            </span>
          </div>
        )}
      </div>

      {/* AI Mentor Bot */}
      {mentorMessage && (
        <div
          className={`glass rounded-[var(--radius-card)] p-5 border-l-4 relative z-10 ${
            isCorrect ? "border-l-status-success" : "border-l-accent-primary"
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl" aria-hidden="true">
              🤖
            </span>
            <div className="flex-1">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1">
                CloudForge AI Mentor
              </span>
              <p className="text-sm text-text-secondary leading-relaxed">
                {mentorMessage}
              </p>
              {!isCorrect && submitted && (
                <button
                  onClick={handleTryAgain}
                  className="mt-3 px-4 py-2 text-xs font-semibold text-accent-primary border border-accent-primary/30 rounded-[var(--radius-button)] hover:bg-accent-primary/10 transition-colors cursor-pointer"
                >
                  Try Again →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between relative z-10">
        <button
          onClick={handlePrev}
          disabled={currentStage === 0}
          className="px-5 py-2.5 text-sm font-medium text-text-secondary border border-border-subtle rounded-[var(--radius-button)] hover:border-accent-primary/30 hover:text-text-primary transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!stageCompleted[currentStage]}
          className="px-6 py-2.5 bg-accent-primary hover:bg-accent-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-bg-primary font-semibold text-sm rounded-[var(--radius-button)] transition-colors cursor-pointer shadow-[var(--shadow-glow)]"
        >
          {currentStage < totalStages - 1
            ? "Next Stage →"
            : "Complete Quest 🎉"}
        </button>
      </div>
    </div>
  )
}
