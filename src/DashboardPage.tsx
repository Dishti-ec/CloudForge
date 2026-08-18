import { useNavigate } from "react-router-dom"
import { Zap, Star, Flame, Award } from "lucide-react"
import { useQuest } from "./context/QuestContext"
import { useDifficulty } from "./context/DifficultyContext"
import DifficultySelector from "./components/DifficultySelector"
import {
  questCatalog,
  isQuestUnlocked,
  isQuestImplemented,
} from "./data/quest-catalog"

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Zap
  label: string
  value: number
}) {
  return (
    <div className="glass rounded-[var(--radius-card)] p-5 flex flex-col items-center gap-2 text-center">
      <Icon size={22} className="text-accent-primary" aria-hidden="true" />
      <span className="text-2xl font-bold text-text-primary">{value}</span>
      <span className="text-xs text-text-muted uppercase tracking-wide">
        {label}
      </span>
    </div>
  )
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-2.5 bg-bg-elevated rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${Math.min(value, 100)}%`,
          background:
            "linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary))",
        }}
      />
    </div>
  )
}

function QuestProgressBar({ value }: { value: number }) {
  const clampedValue = Math.min(value, 100)
  return (
    <div className="w-full h-3 bg-bg-elevated rounded-full overflow-hidden relative">
      {/* Filled bar */}
      <div
        className="h-full rounded-full relative overflow-hidden transition-all duration-1000 ease-out"
        style={{
          width: `${clampedValue}%`,
          background:
            "linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-secondary))",
        }}
      >
        {/* Shimmer sweep */}
        <div
          className="absolute inset-0 animate-[shimmer_2s_ease-in-out_infinite]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
            width: "50%",
          }}
        />
        {/* Sparkle particles */}
        <div
          className="absolute top-0 right-1 w-1.5 h-1.5 rounded-full bg-white/80 animate-[pulse-glow_1.5s_ease-in-out_infinite]"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-0 right-3 w-1 h-1 rounded-full bg-white/60 animate-[pulse-glow_1.5s_ease-in-out_infinite]"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-0.5 right-5 w-0.5 h-0.5 rounded-full bg-white/70 animate-[pulse-glow_1.5s_ease-in-out_infinite]"
          style={{ animationDelay: "1s" }}
        />
      </div>
      {/* Glow at the tip */}
      {clampedValue > 5 && (
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-[pulse-glow_2s_ease-in-out_infinite]"
          style={{
            left: `calc(${clampedValue}% - 6px)`,
            background: "var(--color-accent-primary)",
            boxShadow: "0 0 8px var(--color-accent-primary), 0 0 16px rgba(255,153,0,0.3)",
          }}
        />
      )}
    </div>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { profile, questProgress, questCompleted } = useQuest()
  const { xpMultiplier } = useDifficulty()

  const xpPercent = (profile.xp / profile.xpToNextLevel) * 100

  // Track completed quest IDs
  const completedQuestIds: string[] = questCompleted ? ["serverless-rescue"] : []

  return (
    <div className="max-w-[1000px] mx-auto px-6 pt-24 pb-16 flex flex-col gap-6 relative">
      <div className="mesh-bg" />

      {/* Welcome */}
      <h1 className="text-h1 text-text-primary relative z-10">
        Welcome back, {profile.name}{" "}
        <span
          aria-hidden="true"
          className="inline-block animate-[float_3s_ease-in-out_infinite]"
        >
          👋
        </span>
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        <StatCard icon={Zap} label="Level" value={profile.level} />
        <StatCard icon={Star} label="XP" value={profile.xp} />
        <StatCard icon={Flame} label="Day Streak" value={profile.streakDays} />
        <StatCard icon={Award} label="Badges" value={profile.badgeCount} />
      </div>

      {/* XP Progress */}
      <div className="flex flex-col gap-2 relative z-10">
        <ProgressBar value={xpPercent} />
        <span className="text-[13px] text-text-secondary">
          {profile.xp} / {profile.xpToNextLevel} XP to Level{" "}
          {profile.level + 1}
        </span>
      </div>

      {/* Badges Earned */}
      {profile.badges.length > 0 && (
        <div className="glass rounded-[var(--radius-card)] p-6 relative z-10">
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Badges Earned
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.badges.map((badge) => (
              <span
                key={badge}
                className="px-3 py-1.5 text-sm bg-accent-secondary/10 text-accent-secondary rounded-[var(--radius-badge)] border border-accent-secondary/20"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================
         DIFFICULTY SELECTOR
         ============================================================ */}
      <DifficultySelector />

      {/* ============================================================
         QUEST MAP
         ============================================================ */}
      <div className="relative z-10 mt-4">
        <h2 className="text-h2 text-text-primary mb-5">Quest Map</h2>

        <div className="flex flex-col gap-4">
          {questCatalog.map((entry) => {
            const isCompleted = completedQuestIds.includes(entry.id)
            const isUnlocked = isQuestUnlocked(entry.id, completedQuestIds)
            const isImplemented = isQuestImplemented(entry.id)
            const isActive =
              entry.id === "serverless-rescue" &&
              !questCompleted &&
              questProgress > 0

            return (
              <div
                key={entry.id}
                className={`glass rounded-[var(--radius-card)] p-6 gradient-border transition-opacity ${
                  !isUnlocked ? "opacity-50" : ""
                } ${
                  isCompleted ? "border border-status-success/30" : ""
                } ${
                  isActive
                    ? "border border-accent-primary/40 shadow-[0_0_20px_rgba(255,153,0,0.08)]"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Title row */}
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-lg" aria-hidden="true">
                        {isCompleted ? "✅" : !isUnlocked ? "🔒" : "🟢"}
                      </span>
                      <h3 className="text-text-primary font-bold text-lg tracking-tight">
                        {entry.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-text-secondary text-sm mb-3 leading-relaxed">
                      {entry.description}
                    </p>

                    {/* Services */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {entry.services.map((service) => (
                        <span
                          key={service}
                          className="px-2 py-0.5 text-xs bg-bg-elevated/60 text-text-muted rounded-md border border-border-subtle/50 hover:border-accent-secondary/30 hover:text-accent-secondary transition-all duration-200"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span>
                        {"⭐".repeat(
                          entry.difficulty === "Beginner"
                            ? 1
                            : entry.difficulty === "Intermediate"
                              ? 2
                              : 3
                        )}{" "}
                        {entry.difficulty}
                      </span>
                      <span>⏱ {entry.estimatedTime}</span>
                      <span className="text-accent-primary font-semibold">
                        +{Math.round(entry.xpReward * xpMultiplier)} XP
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="ml-4 flex-shrink-0">
                    {isCompleted && (
                      <span className="text-status-success text-sm font-medium flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-status-success" />
                        Completed
                      </span>
                    )}
                    {isActive && (
                      <button
                        onClick={() => navigate(`/quest/${entry.id}`)}
                        className="px-4 py-2 bg-accent-primary hover:bg-accent-primary-hover text-bg-primary font-semibold text-sm rounded-[var(--radius-button)] transition-colors cursor-pointer"
                      >
                        Continue
                      </button>
                    )}
                    {!isCompleted &&
                      !isActive &&
                      isUnlocked &&
                      isImplemented && (
                        <button
                          onClick={() => navigate(`/quest/${entry.id}`)}
                          className="px-4 py-2 bg-accent-primary hover:bg-accent-primary-hover text-bg-primary font-semibold text-sm rounded-[var(--radius-button)] transition-colors cursor-pointer"
                        >
                          Start
                        </button>
                      )}
                    {!isCompleted && isUnlocked && !isImplemented && (
                      <span className="text-text-muted text-xs italic px-3 py-1.5 bg-bg-elevated/50 rounded-full">
                        Coming Soon
                      </span>
                    )}
                    {!isUnlocked && (
                      <span className="text-text-muted text-xs px-3 py-1.5 bg-bg-elevated/50 rounded-full">
                        🔒 Locked
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress for active quest */}
                {isActive && questProgress > 0 && (
                  <div className="mt-4 pt-4 border-t border-border-subtle/50">
                    <QuestProgressBar value={questProgress} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
