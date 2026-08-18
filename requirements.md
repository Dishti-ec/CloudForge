# Requirements Document

## Introduction

CloudForge is an AI-powered, gamified cloud learning lab that teaches AWS through a single interactive loop: Learn → Build → Break → Debug → Explain → Master. The MVP demonstrates this full loop through one interactive quest, "Serverless Rescue," in which a student diagnoses a 403 AccessDeniedException caused by a missing IAM permission between Lambda and DynamoDB.

The application presents a futuristic, dark-themed cloud engineering environment with status indicators, logs, architecture diagrams, and XP tracking — explicitly not a traditional LMS with video players and quizzes.

## Glossary

- **Application**: The CloudForge single-page web application built with React 18.x, Vite 5.x, and React Router 6.x
- **Quest**: A self-contained interactive learning challenge that guides the student through the debug loop
- **Dashboard**: The student's home screen displaying stats (XP, Level, Streak, Badges) and active quest cards
- **Architecture_Graph**: A visual component displaying connected AWS service nodes with status indicators and connector lines
- **Architecture_Node**: A single AWS service box within the Architecture_Graph showing icon, name, status, and description
- **Answer_Option**: A selectable card representing one diagnostic choice with radio-style single-selection behavior
- **Mentor_Card**: A feedback component displaying AI mentor messages with a typewriter effect
- **Log_Panel**: A monospace terminal-style component displaying error/log output
- **Status_Indicator**: A colored dot/pill paired with a text label indicating operational state
- **Quest_Provider**: A React context provider managing gamification state (XP, Level, Badges, Quest progress) across routes
- **Explanation_Stage**: A revealed section on the debug page where the student explains their diagnosis in a textarea
- **Gamification_State**: Local React state tracking XP, Level, Badge count, Streak, and Quest progress
- **Student_Profile**: Mock data object seeding Gamification_State with starting values (Level 3, 840 XP, 4-day streak, 3 badges)
- **SPA_Fallback**: Server configuration rewriting all routes to index.html so client-side routing works on direct URL access

## Requirements

### Requirement 1: Complete Learning Journey Navigation

**User Story:** As a student, I want to navigate the entire learning journey from landing page through quest completion without interruption, so that I experience the full debug loop in one session.

#### Acceptance Criteria

1. WHEN a student visits the root URL, THE Application SHALL render the Landing page with a primary CTA labeled "Start Your First Quest" and a secondary CTA labeled "Explore CloudLab", both visible and interactive within 2 seconds of navigation
2. WHEN the student clicks "Start Your First Quest", THE Application SHALL navigate to `/dashboard` without a full page reload
3. WHEN the student clicks "Continue Quest" on the Dashboard, THE Application SHALL navigate to `/quest/serverless-rescue`
4. WHEN the student clicks "Begin Investigation" on the Quest Intro page, THE Application SHALL navigate to `/quest/serverless-rescue/debug`
5. WHEN the student submits a correct fix in the debug stage and submits an explanation in the explanation stage, THE Application SHALL navigate to `/quest/serverless-rescue/result`
6. WHEN the student clicks "Back to Dashboard" on the Results page, THE Application SHALL navigate to `/dashboard` with the completed quest reflected in the student's displayed progress indicators (e.g., XP total, quest completion status, or streak count)
7. THE Application SHALL support completing the entire journey (Landing → Dashboard → Quest Intro → Debug → Explanation → Results → Dashboard) using only in-app navigation without a full page reload, without a broken link, without a JavaScript console error, and without any page remaining blank for more than 1 second at any step
8. IF the student navigates directly to a mid-journey URL (e.g., `/quest/serverless-rescue/debug`) without completing prior steps, THEN THE Application SHALL either render the page in a valid state or redirect the student to the appropriate starting point without displaying a blank screen

### Requirement 2: Client-Side Routing

**User Story:** As a student, I want to access any page directly via URL or browser refresh, so that bookmarking and sharing links works correctly.

#### Acceptance Criteria

1. THE Application SHALL define exactly six routes: `/` (Landing), `/dashboard` (Dashboard), `/quest/serverless-rescue` (Quest Intro), `/quest/serverless-rescue/debug` (Quest Debug), `/quest/serverless-rescue/result` (Quest Result), and `*` (NotFound fallback)
2. WHEN a student navigates directly to any of the five named routes via URL or browser refresh, THE Application SHALL render the corresponding page component with its visible heading or primary content area displayed within 3 seconds and without displaying an error message or a blank screen
3. WHEN a student navigates to an undefined path, THE Application SHALL render the NotFound page with a visible link back to `/`
4. WHEN the student navigates directly to `/quest/serverless-rescue/debug` without visiting the intro page first, THE Application SHALL render the debug page populated with default mock quest data, displaying the same layout and interactive elements as when accessed through the intro page
5. WHEN the student navigates directly to `/quest/serverless-rescue/result` without completing the quest, THE Application SHALL render the result page with placeholder or default content visible and without displaying an error message
6. IF any route fails to render due to a component error, THEN THE Application SHALL display a fallback error indication instead of a blank screen or browser error

### Requirement 3: Landing Page Content and Interactions

**User Story:** As a prospective student, I want to see a compelling landing page with clear calls to action, so that I understand what CloudForge offers and can start learning immediately.

#### Acceptance Criteria

1. THE Application SHALL display the following exact copy on the Landing page: title "CloudForge", tagline "Build. Break. Debug. Master AWS.", and description "An AI-powered, gamified cloud learning lab where students learn AWS through interactive challenges and real-world cloud scenarios."
2. THE Application SHALL display a primary CTA button labeled "Start Your First Quest" that navigates to `/dashboard` when clicked
3. THE Application SHALL display a secondary CTA labeled "Explore CloudLab" that, when clicked, smooth-scrolls the viewport to the Architecture_Graph section on the same page without producing a console error or dead link
4. THE Application SHALL display an Architecture_Graph section on the Landing page containing labeled nodes for "User", "API Gateway", "Lambda", and "DynamoDB" connected by directed arrows in that sequence, rendered as a visual graph with at least 4 visible nodes and 3 connecting edges
5. THE Application SHALL render the Landing page with all content (title, tagline, description, CTA buttons, and Architecture_Graph) visible within 3 seconds of initial page load on a standard broadband connection

### Requirement 4: Dashboard Display

**User Story:** As a student, I want to see my learning progress and active quests on the Dashboard, so that I can track my achievements and continue learning.

#### Acceptance Criteria

1. THE Dashboard SHALL display a welcome header containing the text "Welcome back," followed by the student name retrieved from the Student_Profile data
2. THE Dashboard SHALL display four stat cards sourced from the Student_Profile: Level (3), XP (840), Day Streak (4), and Badges (3)
3. THE Dashboard SHALL display an XP progress bar showing the current XP as a numeric label and a filled portion calculated as (current XP / next level threshold × 100)%, with the next level threshold displayed alongside (840 / 1000 XP to Level 4)
4. THE Dashboard SHALL display a quest card showing title "Serverless Rescue", difficulty "Intermediate", progress "60%", and a "Continue Quest" button navigating to `/quest/serverless-rescue`
5. WHEN the student navigates back to the Dashboard after completing the quest, THE Dashboard SHALL retrieve updated Student_Profile data and display updated gamification values: XP 1090, Level 4, Badge count 4, and Quest progress 100%

### Requirement 5: Quest Introduction Page

**User Story:** As a student, I want to see the quest scenario, objectives, and system architecture before investigating, so that I have context for the debugging challenge.

#### Acceptance Criteria

1. THE Application SHALL display the quest header with title "Serverless Rescue", difficulty "Intermediate", estimated time "5–8 minutes", and concept chips rendered as distinct labeled tags: "API Gateway", "Lambda", "DynamoDB", "IAM"
2. THE Application SHALL display the scenario text: "A startup has deployed a serverless API on AWS. Since this morning, every request from their mobile app has been failing."
3. THE Application SHALL display the mission checklist with four read-only objectives: "Review the system architecture", "Identify which service is failing", "Diagnose the root cause from the error logs", "Explain your reasoning to confirm mastery"
4. THE Application SHALL display an Architecture_Graph showing three labeled nodes ("API Gateway", "Lambda", "DynamoDB") connected by directed edges in sequence, with each node displaying an "operational" status indicator
5. WHEN the user activates the "Begin Investigation" button, THE Application SHALL navigate to `/quest/serverless-rescue/debug`
6. THE Application SHALL pull all quest content from the quest data source (`src/data/quests.js`) rather than hardcoding values in the page component

### Requirement 6: Architecture Visualization

**User Story:** As a student, I want to see a visual representation of the AWS architecture with status indicators, so that I can identify which service is failing.

#### Acceptance Criteria

1. THE Architecture_Graph SHALL display connected nodes in the sequence: API Gateway → Lambda → DynamoDB with visible connector lines between nodes
2. THE Architecture_Node SHALL display an icon, service name, status indicator (colored dot paired with text label), and a short description for each service
3. WHILE the intro page or debug page is displayed, THE Architecture_Node for API Gateway SHALL display description "Routes HTTPS requests to the Lambda function" and status "Operational"
4. WHILE the intro page or debug page is displayed, THE Architecture_Node for Lambda SHALL display description "Executes business logic, reads/writes to DynamoDB" and status "Operational"
5. WHILE the intro page is displayed, THE Architecture_Node for DynamoDB SHALL display description "Stores order data for the application" and status "Operational"
6. WHILE the debug page is displayed, THE Architecture_Node for DynamoDB SHALL display status "Error" and description "Access denied — Lambda execution role lacks required permissions"
7. WHEN a node has "Operational" status, THE Architecture_Node SHALL display a green status dot paired with the text label "Operational"
8. IF a node has "Error" status, THEN THE Architecture_Node SHALL display a red status dot paired with the text label "Error" and a pulsing glow animation to draw attention to the failure point

### Requirement 7: Debug Screen Display

**User Story:** As a student, I want to see the incident details, system status, and error logs, so that I can diagnose the root cause of the failure.

#### Acceptance Criteria

1. THE Application SHALL display a banner at the top of the debug page with exact text "🚨 INCIDENT DETECTED"
2. THE Application SHALL display a system status section below the banner showing three service entries in order: "API Gateway — Operational", "Lambda — Operational", "DynamoDB — Error", where services with "Operational" status display a green indicator and services with "Error" status display a red indicator
3. THE Log_Panel SHALL display below the system status section the following exact four lines in monospace font: `[12:04:31] ERROR  AccessDeniedException`, `[12:04:31] Lambda is not authorized to perform: dynamodb:GetItem`, `[12:04:31] Resource: arn:aws:dynamodb:us-east-1:*:table/Orders`, `[12:04:31] User: arn:aws:sts::*:assumed-role/serverless-rescue-lambda-role`
4. THE Application SHALL display the Architecture_Graph below the Log_Panel showing nodes for API Gateway, Lambda, and DynamoDB connected in sequence, with the DynamoDB node visually highlighted in red to indicate error state

### Requirement 8: Answer Selection and Submission

**User Story:** As a student, I want to select and submit my diagnosis from multiple choices, so that I can demonstrate my understanding of the error.

#### Acceptance Criteria

1. THE Application SHALL display exactly four Answer_Option cards with the following exact text in fixed order: (1) "Lambda's execution role does not have permission to access DynamoDB." (correct), (2) "The DynamoDB table does not exist in this region.", (3) "API Gateway is throttling requests before they reach Lambda.", (4) "The Lambda function has run out of memory."
2. THE Application SHALL enforce radio-style single selection — selecting one option deselects any previously selected option
3. WHILE no answer option is selected, THE Application SHALL keep the "Submit Diagnosis" button in a disabled state that is both visually greyed and non-clickable
4. WHEN the student selects an answer option, THE Application SHALL enable the "Submit Diagnosis" button
5. THE Application SHALL reveal correct/incorrect state only after the student clicks "Submit Diagnosis" — selecting or hovering over an option SHALL NOT reveal the answer state
6. WHEN the student submits option 1 (correct answer), THE Application SHALL mark it with green/correct styling including a checkmark icon, disable all answer option cards and the "Submit Diagnosis" button to prevent further interaction, and display a progression pathway to the next quest stage
7. WHEN the student submits any of options 2, 3, or 4 (incorrect answers), THE Application SHALL mark the selected option with red/incorrect styling including an X icon without revealing the correct answer, and then after a delay of no more than 2 seconds, reset all options to their unselected state and disable the "Submit Diagnosis" button so the student may select a different option and resubmit
8. WHILE the answer options are in a post-submission feedback state (showing correct or incorrect styling), THE Application SHALL disable all answer option cards to prevent re-selection until the feedback state resolves

### Requirement 9: Incorrect Answer Behavior

**User Story:** As a student, I want to retry after an incorrect diagnosis, so that I can learn from my mistake and find the right answer.

#### Acceptance Criteria

1. WHEN the student submits an incorrect answer, THE Application SHALL display the Mentor_Card with the incorrectDiagnosis message: "Look carefully at the evidence. The services are running, but the log contains AccessDeniedException. What does that tell you about permissions?"
2. WHEN the student submits an incorrect answer, THE Application SHALL keep the previously selected incorrect option selectable, deselect it, re-enable the full option list for selection, and disable the Submit button until a new option is selected
3. WHEN the student submits an incorrect answer, THE Application SHALL display an attempt counter showing the current attempt number starting from "Attempt 1" on the first submission and incrementing by 1 after each subsequent incorrect submission
4. THE Application SHALL impose no maximum attempt limit for the MVP
5. WHILE the Mentor_Card is displayed after an incorrect submission, THE Application SHALL disable the Submit button until the student selects a different option than the one most recently submitted

### Requirement 10: Correct Answer and Explanation Stage

**User Story:** As a student, I want to explain my diagnosis after answering correctly, so that I can demonstrate deep understanding beyond multiple choice.

#### Acceptance Criteria

1. WHEN the student submits the correct answer (option 1), THE Application SHALL display the Mentor_Card with the correctDiagnosis message: "Excellent diagnosis! You correctly connected the AccessDeniedException to an IAM permissions problem. Lambda uses an execution role to determine which AWS resources it can access."
2. WHEN the student submits the correct answer, THE Application SHALL reveal the Explanation_Stage below the mentor feedback on the same `/quest/serverless-rescue/debug` route
3. THE Explanation_Stage SHALL display a prompt "Explain your diagnosis." with sub-label "Why do you think Lambda cannot access DynamoDB?"
4. THE Explanation_Stage SHALL contain a `<textarea>` with an associated `<label>` element, placeholder text "e.g., The Lambda function's IAM role is missing a policy that grants dynamodb:GetItem permission...", and a maximum input length of 1000 characters
5. WHILE the textarea contains fewer than 10 non-whitespace characters, THE Application SHALL keep the "Submit Explanation" button disabled
6. WHEN the student submits a valid explanation (10 or more non-whitespace characters), THE Application SHALL display the Mentor_Card with the explanationSubmitted message: "Great reasoning. You've correctly identified that Lambda's execution role needs an IAM policy granting dynamodb:GetItem on the Orders table — that's exactly how AWS enforces least-privilege access between services."
7. WHEN the student submits a valid explanation, THE Application SHALL display a "View Results" button that navigates to the Results page
8. WHILE the student has not yet submitted the correct answer, THE Application SHALL keep the Explanation_Stage hidden

### Requirement 11: AI Mentor Component

**User Story:** As a student, I want to receive contextual feedback from an AI mentor, so that I learn from both correct and incorrect actions.

#### Acceptance Criteria

1. THE Mentor_Card SHALL accept a `message` prop (string, maximum 500 characters) and a `tone` prop (restricted to 'success' or 'hint') from the page component rather than importing mock data directly
2. THE Mentor_Card SHALL display a mentor identity consisting of a static icon or image avatar and a "CloudForge Mentor" text label, followed by the message body text
3. THE Mentor_Card SHALL visually distinguish success tone from hint tone through at least two observable differences: a distinct background or border color per tone, and a distinct icon per tone (e.g., checkmark for success, lightbulb for hint)
4. THE Mentor_Card SHALL render as a single expert callout — not as message bubbles, not with timestamps, and not with multi-turn chat history
5. IF the `message` prop is empty or the `tone` prop is not one of the accepted values, THEN THE Mentor_Card SHALL not render any mentor feedback content

### Requirement 12: Quest Results Display

**User Story:** As a student, I want to see my quest results with score, XP earned, and badges unlocked, so that I feel rewarded for completing the challenge.

#### Acceptance Criteria

1. THE Application SHALL display "QUEST COMPLETE" as a heading on the Results page
2. THE Application SHALL display the quest name "Serverless Rescue"
3. THE Application SHALL display a score of "92%"
4. THE Application SHALL display XP earned as "+250 XP"
5. THE Application SHALL display a badge "IAM Detective"
6. THE Application SHALL display skills unlocked as a list of individual items: Lambda, IAM, DynamoDB, Serverless Architecture, Cloud Debugging
7. THE Application SHALL display a "Back to Dashboard" button that navigates to `/dashboard`
8. THE Application SHALL NOT display a "Next Quest" button since only one quest exists in the MVP

### Requirement 13: Gamification State Management

**User Story:** As a student, I want my XP, level, and badges to update when I complete a quest, so that I see tangible progress in my learning journey.

#### Acceptance Criteria

1. THE Quest_Provider SHALL initialize Gamification_State from `src/data/student.js` with starting values: XP 840, Level 3, xpToNextLevel 1000, streakDays 4, badgeCount 3
2. WHEN the student completes the quest (submits correct diagnosis), THE Quest_Provider SHALL add 250 XP to the current XP total (840 + 250 = 1090)
3. WHEN the updated XP (1090) exceeds the xpToNextLevel threshold (1000), THE Quest_Provider SHALL increment Level from 3 to 4 and display a "Level Up!" indicator visible on screen for at least 3 seconds
4. WHEN the student completes the quest, THE Quest_Provider SHALL increment badgeCount from 3 to 4 (adding "IAM Detective")
5. WHEN the student completes the quest, THE Quest_Provider SHALL update quest progress from 60% to 100%
6. WHEN the student refreshes the browser, THE Application SHALL reset Gamification_State to the initial Student_Profile values without crashing or showing an error

### Requirement 14: Technical Stack and Architecture

**User Story:** As a developer, I want a clean component-based architecture with local data and no external dependencies beyond the specified stack, so that the codebase is maintainable and extensible.

#### Acceptance Criteria

1. THE Application SHALL use React 18.x, Vite 5.x, and React Router 6.x (createBrowserRouter or BrowserRouter)
2. THE Application SHALL use only functional components with hooks — no class components
3. THE Application SHALL store all mock data in `src/data/` as static JS/JSON files with no API calls, no fetch/XMLHttpRequest invocations, and no async data loading
4. THE Application SHALL use CSS Modules (ComponentName.module.css) for component styling with CSS custom properties defined in `src/styles/tokens.css`
5. THE Application SHALL use only these runtime (production) dependencies: react, react-dom, react-router-dom, lucide-react, @fontsource/inter, @fontsource/jetbrains-mono — dev dependencies such as Vite, ESLint, and testing tools are unrestricted
6. THE Application SHALL NOT use any CSS-in-JS library, UI kit (MUI/Chakra/Ant), state management library (Redux/Zustand), or animation library (Framer Motion/GSAP)
7. THE Application SHALL structure components in `src/components/ComponentName/` with separate `ComponentName.jsx` and `ComponentName.module.css` files
8. THE Application SHALL structure page-level components in `src/pages/` where each page component is responsible for importing data from `src/data/` and passing it down as props to child components
9. THE Application SHALL ensure no component inside `src/components/` imports directly from `src/data/` — only page-level components in `src/pages/` SHALL import mock data

### Requirement 15: Dark Theme Visual Design

**User Story:** As a student, I want a futuristic dark-themed interface that feels like a cloud engineering environment, so that the experience is immersive and professional.

#### Acceptance Criteria

1. THE Application SHALL implement a dark-first single theme using CSS custom properties defined in `src/styles/tokens.css` with background color #0B0E14, surface color #11151F, and surface-elevated color #171C29
2. THE Application SHALL use Inter as the primary font (fallback: system-ui, sans-serif) and JetBrains Mono as the monospace font for logs and code (fallback: ui-monospace, monospace), with a base font size of 16px
3. THE Application SHALL use accent color #FF9900 (AWS-inspired orange) for primary actions, XP/score numbers, and active navigation — limited to one primary action button or one highlighted numeric value per viewport at a time
4. THE Application SHALL use accent-cool color #22D3EE (cyan) for architecture diagram lines, informational states, and links
5. THE Application SHALL use status colors: success #22C55E, warning #EAB308, error #EF4444, each paired with a muted background variant at 12% opacity of the respective status color
6. THE Application SHALL apply 8px border-radius to all buttons and cards
7. THE Application SHALL ensure all text meets a minimum contrast ratio of 4.5:1 against its background surface

### Requirement 16: Responsive Design

**User Story:** As a student, I want to use CloudForge on any device from desktop to mobile, so that I can learn regardless of my screen size.

#### Acceptance Criteria

1. THE Application SHALL render without horizontal scrollbar, overlapping elements, or cut-off text at viewport widths: 1440px, 1280px, 1024px, 768px, 390px, and 360px
2. WHILE the viewport width is 1024px or greater, THE Application SHALL display the quest page in a two-column layout with content on the left and architecture canvas on the right, each column occupying no less than 30% of the available width
3. WHILE the viewport width is less than 1024px, THE Application SHALL display the quest page in a single-column layout with the architecture canvas stacked below the scenario text, both spanning full content width
4. WHILE the viewport width is less than 768px, THE Application SHALL collapse the navbar into a hamburger menu icon that, when tapped, opens a slide-in navigation panel and when tapped again or when the user taps outside the panel, closes it
5. WHILE the viewport width is 1024px or greater, THE Dashboard SHALL display four stat cards in a single row with equal width
6. WHILE the viewport width is at least 768px and less than 1024px, THE Dashboard SHALL display stat cards in a two-column grid
7. WHILE the viewport width is less than 768px, THE Dashboard SHALL display stat cards in a single-column layout, each card spanning full content width
8. WHILE the viewport width is less than 768px, THE Application SHALL render Answer_Option cards full-width with a minimum touch target height of 44px
9. THE Application SHALL maintain a minimum body text size of 16px across all supported viewport widths

### Requirement 17: Accessibility

**User Story:** As a student using assistive technology, I want CloudForge to be navigable and understandable without a mouse, so that I can complete the learning journey regardless of ability.

#### Acceptance Criteria

1. THE Application SHALL use semantic HTML elements (`<button>`, `<a>`) for all interactive elements — never a `<div onClick>`
2. THE Application SHALL display a focus-visible ring (2px solid cyan, 2px offset) on all interactive elements during keyboard navigation using `:focus-visible`
3. THE Application SHALL ensure Status_Indicator and Answer_Option states are distinguishable without color by pairing color with both an icon and a text label
4. THE Application SHALL associate the explanation `<textarea>` with a `<label>` element (not just placeholder text)
5. THE Application SHALL use `aria-live="polite"` on the Log_Panel and dynamic status updates so screen readers announce state changes
6. THE Application SHALL support completing the full quest flow (Landing → Dashboard → Intro → Debug → Explanation → Results) using only Tab, Shift+Tab, Enter, Space, Escape, and Arrow keys, where Escape dismisses overlays and Arrow keys navigate within grouped controls
7. THE Application SHALL meet WCAG AA contrast requirements: minimum 4.5:1 ratio for normal text (below 18pt) and minimum 3:1 ratio for large text (18pt and above) and non-text UI components against background and surface colors
8. WHEN a view transition occurs within the quest flow, THE Application SHALL move keyboard focus to the first heading or primary content region of the new view within 500 milliseconds
9. THE Application SHALL render interactive elements in a tab order that follows the visual reading order (left-to-right, top-to-bottom) within each view, with no focus traps outside of modal overlays
10. IF a modal or overlay is displayed, THEN THE Application SHALL trap focus within the modal until it is dismissed, and SHALL return focus to the element that triggered the modal upon dismissal

### Requirement 18: Motion and Animation

**User Story:** As a student, I want subtle, purposeful animations that communicate state changes, so that the interface feels responsive and alive without being distracting.

#### Acceptance Criteria

1. WHEN a route change occurs, THE Application SHALL transition the outgoing page to opacity 0 and the incoming page from opacity 0 with an 8px translateY offset to its final position over 200ms
2. WHEN the user presses a button (active state), THE Application SHALL scale the button to 0.97 over 120ms, and WHEN the user hovers a button, THE Application SHALL transition the button background color over 150ms
3. WHEN a ProgressBar mounts or its value updates, THE Application SHALL animate the fill width from the previous value to the new value over 600ms with ease-out timing
4. WHILE the Architecture diagram is visible, THE Application SHALL animate connector lines using a stroke-dashoffset keyframe loop completing one cycle every 2s
5. WHEN the Results page mounts, THE Application SHALL display a single particle burst animation lasting no more than 1.5s, triggered once per navigation to the Results page
6. IF the user has `prefers-reduced-motion: reduce` set, THEN THE Application SHALL disable all looping animations (connector flow lines, particle burst) and apply 0ms duration to all transition-based animations (page transitions, button interactions, progress bar fills)
7. IF the user has `prefers-reduced-motion: reduce` set, THEN THE Application SHALL render typewriter text content in its final state with no character-by-character delay

### Requirement 19: Error Handling and Resilience

**User Story:** As a student, I want the application to handle unexpected navigation and edge cases gracefully, so that I never encounter a broken or blank screen.

#### Acceptance Criteria

1. WHEN a student navigates to an unknown route (e.g., `/foo`), THE Application SHALL render the NotFound page displaying a message indicating the page was not found and a navigable link back to `/`
2. WHEN a student directly navigates to `/quest/serverless-rescue/debug` without visiting the intro first, THE Application SHALL render the debug page using default mock quest data, displaying the question text, answer options, and explanation textarea without crashing or showing a blank screen
3. WHEN a student directly navigates to `/quest/serverless-rescue/result` without completing the quest, THE Application SHALL render the result page displaying static result content including a score value and summary text without crashing or showing a blank screen
4. WHEN a student refreshes the browser on any route, THE Application SHALL re-render that route correctly with gamification state reset to Student_Profile defaults without displaying a blank screen or throwing an error
5. WHILE the explanation textarea contains empty or whitespace-only input, THE Application SHALL keep the "Submit Explanation" button disabled and SHALL NOT trigger a submission
6. WHILE no answer option is selected, THE Application SHALL keep the "Submit Diagnosis" button disabled and SHALL NOT trigger a submission
7. THE Application SHALL produce zero unhandled exceptions, zero console errors, and zero 404s for static assets during the complete user flow from landing page through intro, debug, and result pages
8. IF a runtime rendering error occurs in any route component, THEN THE Application SHALL display a fallback error message instead of a blank screen and SHALL provide a navigable link back to `/`

### Requirement 20: Future Integration Architecture

**User Story:** As a developer, I want clean integration boundaries in the codebase, so that real AWS services, AI, and authentication can be added later without rewriting existing components.

#### Acceptance Criteria

1. THE Mentor_Card component SHALL accept message content via props so a future async API response (Amazon Bedrock) can replace the mock data without changing the component interface
2. THE Architecture_Node and Architecture_Graph components SHALL accept data via props so future backend-fetched architecture data can replace static mock data without changing the component interfaces
3. THE Application SHALL structure routes under `/quest/:questId/...` so additional quests can be added following the same pattern
4. THE Log_Panel component SHALL accept `lines[]` as a prop so future CloudWatch log data can replace static mock data without changing the component interface
5. THE Application router in `App.jsx` SHALL be structured to accept an auth provider wrapper and a `/login` route addition without modifying existing route definitions
6. THE Application SHALL store all mock data in `src/data/` so each file represents a single integration point replaceable with an async data source

### Requirement 21: Build and Deployment

**User Story:** As a developer, I want the application to build successfully and deploy to a static host with SPA fallback, so that the MVP is publicly accessible.

#### Acceptance Criteria

1. WHEN `npm run build` is executed, THE Application SHALL produce a production build in the `dist/` folder with zero errors within 120 seconds
2. THE Application repository SHALL include a static host configuration file (e.g., `vercel.json` or `_redirects`) that rewrites all non-asset routes to `index.html` so that direct URL navigation does not return a 404
3. WHEN the production build is served via `npm run preview`, THE Application SHALL render all routes, accept user interactions, and complete navigation transitions without errors, matching the behavior observable in development mode
4. WHEN the deployed Application loads the root URL `/`, THE Application SHALL render the page with zero console errors and reach interactive state within 5 seconds on a standard broadband connection
5. WHEN a user navigates directly to `/quest/serverless-rescue/debug` via typed or pasted URL, THE Application SHALL render the corresponding page content without returning a 404 or displaying a blank screen
