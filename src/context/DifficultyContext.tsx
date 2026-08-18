import { createContext, useContext, useState, useCallback } from "react"
import type { ReactNode } from "react"

export type DifficultyLevel = "junior" | "senior" | "principal"

export interface DifficultyConfig {
  id: DifficultyLevel
  label: string
  icon: string
  description: string
  xpMultiplier: number
  hintLimit: number
  color: string
}

export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  junior: {
    id: "junior",
    label: "Junior",
    icon: "🌱",
    description: "Guided experience with hints and annotated logs",
    xpMultiplier: 1,
    hintLimit: 5,
    color: "var(--color-status-success)",
  },
  senior: {
    id: "senior",
    label: "Senior",
    icon: "⚡",
    description: "Realistic logs with fewer hints and red herrings",
    xpMultiplier: 1.5,
    hintLimit: 2,
    color: "var(--color-accent-primary)",
  },
  principal: {
    id: "principal",
    label: "Principal",
    icon: "🔥",
    description: "Multi-stream logs, no hints, highest XP reward",
    xpMultiplier: 2,
    hintLimit: 0,
    color: "var(--color-status-error)",
  },
}

interface DifficultyContextValue {
  difficulty: DifficultyLevel
  config: DifficultyConfig
  xpMultiplier: number
  setDifficulty: (level: DifficultyLevel) => void
}

const DifficultyContext = createContext<DifficultyContextValue | null>(null)

export function DifficultyProvider({ children }: { children: ReactNode }) {
  const [difficulty, setDifficultyState] = useState<DifficultyLevel>("junior")

  const config = DIFFICULTY_CONFIGS[difficulty]

  const setDifficulty = useCallback((level: DifficultyLevel) => {
    setDifficultyState(level)
  }, [])

  return (
    <DifficultyContext.Provider
      value={{
        difficulty,
        config,
        xpMultiplier: config.xpMultiplier,
        setDifficulty,
      }}
    >
      {children}
    </DifficultyContext.Provider>
  )
}

export function useDifficulty() {
  const ctx = useContext(DifficultyContext)
  if (!ctx) {
    throw new Error("useDifficulty must be used within a DifficultyProvider")
  }
  return ctx
}
