export interface QuestCatalogEntry {
  id: string
  title: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedTime: string
  xpReward: number
  services: string[]
  prerequisites: string[]
  implemented: boolean
}

export const questCatalog: QuestCatalogEntry[] = [
  {
    id: "serverless-rescue",
    title: "Serverless Rescue",
    description:
      "A startup's serverless API is down. Investigate Lambda, API Gateway, and DynamoDB to find the root cause.",
    difficulty: "Intermediate",
    estimatedTime: "5-8 min",
    xpReward: 250,
    services: ["Lambda", "API Gateway", "DynamoDB", "IAM"],
    prerequisites: [],
    implemented: true,
  },
  {
    id: "permission-denied",
    title: "Permission Denied",
    description:
      "Users are locked out of an S3 bucket after a policy change. Untangle IAM policies and bucket permissions to restore access.",
    difficulty: "Advanced",
    estimatedTime: "8-12 min",
    xpReward: 400,
    services: ["IAM", "S3", "CloudTrail"],
    prerequisites: ["serverless-rescue"],
    implemented: false,
  },
  {
    id: "the-scaling-crisis",
    title: "The Scaling Crisis",
    description:
      "Traffic is spiking and the app is buckling. Configure auto-scaling, load balancers, and caching to keep things running.",
    difficulty: "Advanced",
    estimatedTime: "10-15 min",
    xpReward: 600,
    services: ["EC2", "ALB", "Auto Scaling", "ElastiCache"],
    prerequisites: ["serverless-rescue"],
    implemented: false,
  },
  {
    id: "data-leak-detective",
    title: "Data Leak Detective",
    description:
      "Sensitive data is showing up in logs. Trace the leak through CloudWatch, Lambda environment variables, and Secrets Manager.",
    difficulty: "Intermediate",
    estimatedTime: "6-9 min",
    xpReward: 300,
    services: ["CloudWatch", "Secrets Manager", "Lambda", "KMS"],
    prerequisites: ["serverless-rescue"],
    implemented: false,
  },
  {
    id: "first-deploy",
    title: "First Deploy: Cloud Foundations",
    description:
      "A 5-stage guided quest. Learn AWS fundamentals by deploying your first Lambda function — from IAM basics to live invocation.",
    difficulty: "Beginner",
    estimatedTime: "10-15 min",
    xpReward: 150,
    services: ["IAM", "Lambda", "CloudWatch", "API Gateway", "S3"],
    prerequisites: [],
    implemented: true,
  },
]

export function isQuestUnlocked(
  questId: string,
  completedQuestIds: string[]
): boolean {
  const entry = questCatalog.find((q) => q.id === questId)
  if (!entry) return false
  if (entry.prerequisites.length === 0) return true
  return entry.prerequisites.every((pre) => completedQuestIds.includes(pre))
}

export function isQuestImplemented(questId: string): boolean {
  const entry = questCatalog.find((q) => q.id === questId)
  return entry?.implemented ?? false
}
