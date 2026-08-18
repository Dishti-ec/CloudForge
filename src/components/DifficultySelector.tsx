import {
  useDifficulty,
  DIFFICULTY_CONFIGS,
  type DifficultyLevel,
} from "../context/DifficultyContext"

const levels: DifficultyLevel[] = ["junior", "senior", "principal"]

export default function DifficultySelector() {
  const { difficulty, setDifficulty, xpMultiplier } = useDifficulty()

  return (
    <div className="glass rounded-[var(--radius-card)] p-5 relative z-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Difficulty Level
        </h3>
        <span className="text-xs text-accent-primary font-semibold">
          {xpMultiplier}x XP
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {levels.map((level) => {
          const config = DIFFICULTY_CONFIGS[level]
          const isActive = difficulty === level

          return (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                isActive
                  ? "border-accent-primary bg-accent-primary/10 shadow-[0_0_16px_rgba(255,153,0,0.12)]"
                  : "border-border-subtle bg-bg-surface hover:border-accent-primary/30 hover:bg-bg-elevated/50"
              }`}
              aria-pressed={isActive}
            >
              <span className="text-2xl">{config.icon}</span>
              <span
                className={`text-sm font-bold ${
                  isActive ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                {config.label}
              </span>
              <span className="text-[10px] text-text-muted text-center leading-tight">
                {config.description}
              </span>
              <span
                className="text-[11px] font-semibold mt-1"
                style={{ color: config.color }}
              >
                {config.xpMultiplier}x XP
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
