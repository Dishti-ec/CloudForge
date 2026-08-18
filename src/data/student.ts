export interface StudentProfile {
  name: string
  level: number
  xp: number
  xpToNextLevel: number
  streakDays: number
  badgeCount: number
  badges: string[]
}

export const studentProfile: StudentProfile = {
  name: "Cloud Explorer",
  level: 3,
  xp: 840,
  xpToNextLevel: 1000,
  streakDays: 4,
  badgeCount: 3,
  badges: ["Cloud Architect", "First Deploy", "Bug Squasher"],
}
