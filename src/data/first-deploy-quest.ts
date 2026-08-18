export interface MCQOption {
  id: string
  text: string
}

export interface StageMCQ {
  question: string
  options: MCQOption[]
  correctId: string
  hints: string[]
}

export interface QuestStage {
  id: number
  title: string
  type: "learn" | "build" | "incident" | "challenge" | "completion"
  icon: string
  description: string
  content: string[]
  mcq: StageMCQ
}

export const firstDeployQuest = {
  id: "first-deploy",
  title: "First Deploy: Cloud Foundations",
  difficulty: "Beginner" as const,
  estimatedTime: "10-15 min",
  xpReward: 150,
  concepts: ["IAM", "Lambda", "CloudWatch", "API Gateway", "S3"],
  stages: [
    {
      id: 1,
      title: "IAM & Identity",
      type: "learn" as const,
      icon: "🔐",
      description:
        "Understand how AWS identifies and authorizes users and services.",
      content: [
        "IAM (Identity and Access Management) controls who can do what in AWS.",
        "Every AWS service uses IAM roles and policies to grant permissions.",
        "The principle of least privilege means giving only the permissions needed — nothing more.",
        "IAM policies are JSON documents that define allowed or denied actions on resources.",
        "Services like Lambda assume an execution role that determines what they can access.",
      ],
      mcq: {
        question:
          "What does the principle of least privilege mean in AWS IAM?",
        options: [
          {
            id: "a",
            text: "Give every user full admin access for convenience",
          },
          {
            id: "b",
            text: "Grant only the minimum permissions needed to perform a task",
          },
          {
            id: "c",
            text: "Remove all permissions and add them one at a time when errors occur",
          },
          {
            id: "d",
            text: "Use the same role for all services to reduce complexity",
          },
        ],
        correctId: "b",
        hints: [
          "Think about security — what approach minimizes risk if credentials are compromised?",
          "The key word is 'minimum.' You want permissions that are just enough, not too broad.",
          "The answer focuses on granting only what is needed — nothing extra.",
        ],
      },
    },
    {
      id: 2,
      title: "Lambda Basics",
      type: "learn" as const,
      icon: "⚡",
      description:
        "Learn how serverless functions work and when to use them.",
      content: [
        "AWS Lambda runs your code without provisioning or managing servers.",
        "You pay only for the compute time you consume — no charge when code is idle.",
        "Lambda functions are triggered by events: HTTP requests, file uploads, schedules, etc.",
        "Each function has a handler — the entry point that AWS invokes with the event data.",
        "Lambda automatically scales from zero to thousands of concurrent executions.",
      ],
      mcq: {
        question: "What is true about AWS Lambda pricing?",
        options: [
          {
            id: "a",
            text: "You pay a fixed monthly fee regardless of usage",
          },
          {
            id: "b",
            text: "You pay only for compute time consumed — idle functions cost nothing",
          },
          {
            id: "c",
            text: "Lambda is always free with no limits",
          },
          {
            id: "d",
            text: "You are billed per deployment, not per execution",
          },
        ],
        correctId: "b",
        hints: [
          "Lambda is a pay-per-use service. Think about what happens when nobody calls your function.",
          "The content mentions 'no charge when code is idle.' Which option matches that?",
          "You pay for the milliseconds your code actually runs — nothing more.",
        ],
      },
    },
    {
      id: 3,
      title: "Build Your Function",
      type: "build" as const,
      icon: "🏗️",
      description:
        "Configure and deploy a Lambda function with the correct IAM role.",
      content: [
        "Create an IAM execution role with basic Lambda permissions and CloudWatch logging.",
        "Write a handler that receives an API event and returns a JSON response.",
        "Configure the runtime (Node.js 20.x), memory (128 MB), and timeout (30s).",
        "Attach the execution role so Lambda can write logs to CloudWatch.",
        "Deploy the function and confirm it appears in the AWS Lambda console.",
      ],
      mcq: {
        question:
          "Why does a Lambda function need an IAM execution role?",
        options: [
          {
            id: "a",
            text: "To allow users to edit the function code in the console",
          },
          {
            id: "b",
            text: "To determine which AWS services the function can access at runtime",
          },
          {
            id: "c",
            text: "To set the function's memory and timeout configuration",
          },
          {
            id: "d",
            text: "To define which programming language the function uses",
          },
        ],
        correctId: "b",
        hints: [
          "The execution role is about permissions at runtime. What does the function need to do after it starts?",
          "Think about CloudWatch logging — the function needs permission to write logs. Where does that permission come from?",
          "The role defines what AWS resources (DynamoDB, S3, CloudWatch) the function can interact with.",
        ],
      },
    },
    {
      id: 4,
      title: "Connect & Test",
      type: "incident" as const,
      icon: "🔍",
      description:
        "Wire up API Gateway, invoke the function, and debug a permissions issue.",
      content: [
        "Create an API Gateway REST endpoint that triggers your Lambda function.",
        "Send a test request — but it fails with a 502 Bad Gateway error.",
        "Check CloudWatch logs: the function ran but could not access S3.",
        "The execution role is missing s3:GetObject permission on the target bucket.",
        "Add the missing policy, redeploy, and confirm the request succeeds.",
      ],
      mcq: {
        question:
          "Your Lambda function returns a 502 error and CloudWatch shows 'Access Denied' for S3. What should you do?",
        options: [
          {
            id: "a",
            text: "Increase the Lambda function's memory allocation",
          },
          {
            id: "b",
            text: "Delete and recreate the API Gateway endpoint",
          },
          {
            id: "c",
            text: "Add s3:GetObject permission to the Lambda execution role",
          },
          {
            id: "d",
            text: "Change the S3 bucket to public access",
          },
        ],
        correctId: "c",
        hints: [
          "The error says 'Access Denied' — that's a permissions issue, not a memory or gateway problem.",
          "The function needs to read from S3. What specific IAM action grants read access to S3 objects?",
          "Never make a bucket public to fix a permission error. Add the specific permission to the execution role instead.",
        ],
      },
    },
    {
      id: 5,
      title: "Review & Master",
      type: "completion" as const,
      icon: "🎓",
      description:
        "Reflect on what you built and solidify your understanding.",
      content: [
        "You deployed a serverless function accessible via a public HTTPS endpoint.",
        "You learned how IAM roles grant services the permissions they need.",
        "You debugged a real-world permission error using CloudWatch logs.",
        "You understand the flow: User → API Gateway → Lambda → S3.",
        "Next quest: Serverless Rescue — diagnose a production incident using these skills.",
      ],
      mcq: {
        question:
          "What is the correct request flow in the architecture you built?",
        options: [
          {
            id: "a",
            text: "User → S3 → Lambda → API Gateway",
          },
          {
            id: "b",
            text: "User → Lambda → API Gateway → S3",
          },
          {
            id: "c",
            text: "User → API Gateway → Lambda → S3",
          },
          {
            id: "d",
            text: "User → CloudWatch → Lambda → S3",
          },
        ],
        correctId: "c",
        hints: [
          "The user sends a request to a public endpoint. Which AWS service exposes public HTTP endpoints?",
          "API Gateway is the front door. It receives the request and passes it to Lambda.",
          "The flow is: User hits API Gateway, which triggers Lambda, which reads from S3.",
        ],
      },
    },
  ] as QuestStage[],
}
