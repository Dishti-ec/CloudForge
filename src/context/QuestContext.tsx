import { createContext, useContext, useState, useCallback } from "react"
import type { ReactNode } from "react"
import { studentProfile } from "../data/student"
import type { StudentProfile } from "../data/student"

interface QuestContextValue {
  profile: StudentProfile
  questProgress: number
  questCompleted: boolean
  leveledUp: boolean
  completeQuest: () => void
  dismissLevelUp: () => void
}

const QuestContext = createContext<QuestContextValue | null>(null)

export function QuestProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<StudentProfile>({ ...studentProfile })
  const [questProgress, setQuestProgress] = useState(60)
  const [questCompleted, setQuestCompleted] = useState(false)
  const [leveledUp, setLeveledUp] = useState(false)

  const completeQuest = useCallback(() => {
    if (questCompleted) return

    setQuestCompleted(true)
    setQuestProgress(100)

    setProfile((prev) => {
      const newXp = prev.xp + 250
      const newLevel = newXp >= prev.xpToNextLevel ? prev.level + 1 : prev.level
      if (newLevel > prev.level) {
        setLeveledUp(true)
      }
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        badgeCount: prev.badgeCount + 1,
        badges: [...prev.badges, "IAM Detective"],
        xpToNextLevel: newLevel > prev.level ? 1500 : prev.xpToNextLevel,
      }
    })
  }, [questCompleted])

  const dismissLevelUp = useCallback(() => {
    setLeveledUp(false)
  }, [])

  return (
    <QuestContext.Provider
      value={{
        profile,
        questProgress,
        questCompleted,
        leveledUp,
        completeQuest,
        dismissLevelUp,
      }}
    >
      {children}
    </QuestContext.Provider>
  )
}

export function useQuest() {
  const ctx = useContext(QuestContext)
  if (!ctx) {
    throw new Error("useQuest must be used within a QuestProvider")
  }
  return ctx
}
