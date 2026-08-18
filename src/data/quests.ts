export interface ArchitectureNode {
  id: string
  name: string
  icon: string
  status: "operational" | "error"
  description: string
}

export interface Answer {
  id: number
  text: string
  correct: boolean
}

export interface QuestResults {
  score: number
  xpEarned: number
  badge: string
  skills: string[]
}

export interface Quest {
  id: string
  title: string
  difficulty: string
  estimatedTime: string
  progress: number
  concepts: string[]
  scenario: string
  mission: string[]
  architecture: ArchitectureNode[]
  architectureDebug: ArchitectureNode[]
  logs: string[]
  answers: Answer[]
  results: QuestResults
}

export const quests: Record<string, Quest> = {
  "serverless-rescue": {
    id: "serverless-rescue",
    title: "Serverless Rescue",
    difficulty: "Intermediate",
    estimatedTime: "5-8 minutes",
    progress: 60,
    concepts: ["API Gateway", "Lambda", "DynamoDB", "IAM"],
    scenario:
      "A startup has deployed a serverless API on AWS. Since this morning, every request from their mobile app has been failing.",
    mission: [
      "Review the system architecture",
      "Identify which service is failing",
      "Diagnose the root cause from the error logs",
      "Explain your reasoning to confirm mastery",
    ],
    architecture: [
      {
        id: "api-gateway",
        name: "API Gateway",
        icon: "Globe",
        status: "operational",
        description: "Routes HTTPS requests to the Lambda function",
      },
      {
        id: "lambda",
        name: "Lambda",
        icon: "Zap",
        status: "operational",
        description: "Executes business logic, reads/writes to DynamoDB",
      },
      {
        id: "dynamodb",
        name: "DynamoDB",
        icon: "Database",
        status: "operational",
        description: "Stores order data for the application",
      },
    ],
    architectureDebug: [
      {
        id: "api-gateway",
        name: "API Gateway",
        icon: "Globe",
        status: "operational",
        description: "Routes HTTPS requests to the Lambda function",
      },
      {
        id: "lambda",
        name: "Lambda",
        icon: "Zap",
        status: "operational",
        description: "Executes business logic, reads/writes to DynamoDB",
      },
      {
        id: "dynamodb",
        name: "DynamoDB",
        icon: "Database",
        status: "error",
        description:
          "Access denied — Lambda execution role lacks required permissions",
      },
    ],
    logs: [
      "[12:04:31] ERROR  AccessDeniedException",
      "[12:04:31] Lambda is not authorized to perform: dynamodb:GetItem",
      "[12:04:31] Resource: arn:aws:dynamodb:us-east-1:*:table/Orders",
      "[12:04:31] User: arn:aws:sts::*:assumed-role/serverless-rescue-lambda-role",
    ],
    answers: [
      {
        id: 1,
        text: "Lambda's execution role does not have permission to access DynamoDB.",
        correct: true,
      },
      {
        id: 2,
        text: "The DynamoDB table does not exist in this region.",
        correct: false,
      },
      {
        id: 3,
        text: "API Gateway is throttling requests before they reach Lambda.",
        correct: false,
      },
      {
        id: 4,
        text: "The Lambda function has run out of memory.",
        correct: false,
      },
    ],
    results: {
      score: 92,
      xpEarned: 250,
      badge: "IAM Detective",
      skills: [
        "Lambda",
        "IAM",
        "DynamoDB",
        "Serverless Architecture",
        "Cloud Debugging",
      ],
    },
  },
}
