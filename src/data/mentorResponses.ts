export const mentorResponses = {
  incorrectDiagnosis:
    "Look carefully at the evidence. The services are running, but the log contains AccessDeniedException. What does that tell you about permissions?",
  correctDiagnosis:
    "Excellent diagnosis! You correctly connected the AccessDeniedException to an IAM permissions problem. Lambda uses an execution role to determine which AWS resources it can access.",
  explanationSubmitted:
    "Great reasoning. You've correctly identified that Lambda's execution role needs an IAM policy granting dynamodb:GetItem on the Orders table — that's exactly how AWS enforces least-privilege access between services.",
}
