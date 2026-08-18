# CloudForge — Engineering Task Board

## 🚨 PRIORITY SYSTEM

- **P0** — Must work for the demo. If any P0 task is incomplete, the app is not shippable.
- **P1** — Important polish. Cut only if P0 is at risk.
- **P2** — Future / skip if time is low.

Total estimated build time: ~10–14 focused hours for a solo developer familiar
with React + Vite. Phase estimates below assume that pace.

---

# PHASE 1 — SETUP (~30 min)

## P1-01 Initialize Project

**Priority:** P0

```bash
npm create vite@latest cloudforge -- --template react
cd cloudforge
npm install
```

**Acceptance criteria:**
- `npm install` completes with 0 errors.
- `npm run dev` starts a dev server on `localhost:5173` (or next available port).
- Default Vite starter page renders in browser with 0 console errors.
- `npm run build` succeeds on the untouched starter (sanity check before adding code).

---

## P1-02 Install Dependencies

**Priority:** P0

Install only:

```bash
npm install react-router-dom
npm install lucide-react
npm install @fontsource/inter @fontsource/jetbrains-mono
```

**Do not install:** a CSS-in-JS library, a UI kit (MUI/Chakra/Ant), a state
management library (Redux/Zustand/Jotai), or an animation library (Framer
Motion/GSAP) — all required motion in `design.md` §15 is achievable with CSS
transitions and vanilla JS. Adding these costs setup/debug time the MVP
timeline doesn't have and none are required by `requirements.md` §3.

**Acceptance criteria:**
- `package.json` dependencies list contains exactly: `react`, `react-dom`, `react-router-dom`, `lucide-react`, `@fontsource/inter`, `@fontsource/jetbrains-mono` (plus Vite devDependencies).
- `npm run dev` still starts with 0 errors after install.

---

# PHASE 2 — APPLICATION STRUCTURE (~30 min)

## P1-03 Create Routes

**Priority:** P0

Set up `react-router-dom` in `App.jsx` with the six routes defined in
`requirements.md` §5 (including the `*` NotFound fallback).

**Acceptance criteria:**
- Navigating to each of the 5 named routes renders a distinct, non-blank page (placeholder content is fine at this stage).
- Navigating to an undefined path (e.g., `/xyz`) renders `NotFound.jsx`, not a blank screen or router error.
- Refreshing the browser on any of the 5 named routes renders that route directly (confirms Vite/router history mode is configured correctly), not a 404 from the dev server.

---

## P1-04 Create Shared Components

**Priority:** P0

Build the components listed in `design.md` §5, starting with the ones needed
by the most pages first: `Button`, `Card`, `ProgressBar`, `StatusIndicator`,
`Navbar`, then `QuestCard`, `ArchitectureNode`, `AnswerOption`, `MentorCard`.

**Acceptance criteria:**
- Each component lives in its own folder under `src/components/` with a `.jsx` and `.module.css` file, per `requirements.md` §4.
- Each component accepts props as specified in `design.md` §5's prop table — no hardcoded content inside a shared component (e.g., `QuestCard` must accept `title` as a prop, not hardcode "Serverless Rescue").
- No component imports data directly from `src/data/` — pages pass data down as props (keeps components reusable/testable per `requirements.md` §18).

---

# PHASE 3 — LANDING (~45 min)

## P1-05 Landing Page

**Priority:** P0

Implement per `design.md` §7 and `requirements.md` §6: exact copy, hero
layout, both CTAs, architecture visualization teaser.

**Acceptance criteria:**
- All copy matches `requirements.md` §6 exactly (title, tagline, description, both CTA labels).
- `Start Your First Quest` navigates to `/dashboard` — verified by clicking, not just by reading the code.
- `Explore CloudLab` scrolls to the on-page architecture section (not a dead `#` link, not a console error).
- Page is readable and CTA is visible without scrolling at 1280×800 viewport.

---

# PHASE 4 — DASHBOARD (~45 min)

## P1-06 Dashboard

**Priority:** P0

Implement per `design.md` §8 and `requirements.md` §7: stat cards (Level, XP,
Streak, Badges), XP progress bar, main quest card.

**Acceptance criteria:**
- All four stat values render from `src/data/student.js`, not hardcoded in `Dashboard.jsx` (confirms the data layer from `requirements.md` §4 is actually wired up).
- Quest card shows `Serverless Rescue`, `Intermediate` difficulty, `60%` progress.
- `Continue Quest` navigates to `/quest/serverless-rescue`.

---

# PHASE 5 — QUEST INTRO (~1 hr)

## P1-07 Quest Introduction

**Priority:** P0

Implement per `design.md` §9 and `requirements.md` §8: quest header, scenario,
mission checklist, architecture graph, AWS concept chips.

**Acceptance criteria:**
- Content is pulled from `src/data/quests.js`, not hardcoded (same reusability check as P1-06).
- Scenario text matches `requirements.md` §8 exactly.
- Two-column layout on desktop (≥1024px) per `design.md` §9; single column with architecture below scenario on mobile.
- `Begin Investigation` navigates to `/quest/serverless-rescue/debug`.

---

## P1-08 Architecture Visualization

**Priority:** P0

Implement `ArchitectureGraph` + `ArchitectureNode` showing
`API Gateway → Lambda → DynamoDB`, reused on both the intro page and the debug page.

**Acceptance criteria:**
- Same `ArchitectureNode` component (not a copy-pasted variant) renders on both `/quest/serverless-rescue` and `/quest/serverless-rescue/debug`, proving reusability.
- Each node displays icon, name, status, and description per `requirements.md` §9's table.
- On the debug page, DynamoDB node visually reflects `error` status (color + icon + updated description) per `design.md` §10 — this is the visual proof the incident is real.

---

# PHASE 6 — DEBUGGING (~1.5 hr)

## P1-09 Incident Screen

**Priority:** P0

Implement per `design.md` §11 and `requirements.md` §10: incident banner,
3-service status row, log panel with the exact 4-line log content.

**Acceptance criteria:**
- Banner text is exactly `🚨 INCIDENT DETECTED`.
- Status row shows API Gateway and Lambda as `Operational`, DynamoDB as `Error`.
- Log panel renders the exact 4 lines from `requirements.md` §10 in monospace font.

---

## P1-10 Answer Selection

**Priority:** P0

Implement the four `AnswerOption` cards with the exact copy from
`requirements.md` §10, radio-style single selection, and submit gating.

**Acceptance criteria:**
- Only one option can be selected at a time — selecting option 2 after option 1 deselects option 1.
- `Submit Diagnosis` button is disabled (not just visually greyed but actually non-clickable) until one option is selected.
- Clicking an option does **not** reveal correct/incorrect state — that only appears after `Submit Diagnosis`.
- Submitting option 1 (correct) shows green/correct state; submitting any of options 2–4 shows red/incorrect state on the selected card, and the quest does not end (`requirements.md` §11).
- After an incorrect submission, the user can select a different option and resubmit.

---

# PHASE 7 — EXPLANATION (~45 min)

## P1-11 Explanation Input

**Priority:** P0

Implement per `design.md` §11 (Answer Options context) and `requirements.md`
§12: revealed after correct diagnosis, textarea with label, 10-character
minimum gate.

**Acceptance criteria:**
- Explanation section is not visible/rendered until the correct answer has been submitted.
- `<textarea>` has an associated `<label>` element (verify in dev tools, not just visually).
- `Submit Explanation` is disabled for empty input and for input under 10 non-whitespace characters; becomes enabled once the threshold is met.
- Submitting triggers the mentor's `explanationSubmitted` message (`requirements.md` §13) and unlocks navigation to results.

---

# PHASE 8 — MENTOR (~30 min)

## P1-12 Mentor Feedback

**Priority:** P0

Wire `MentorCard` to the three mock responses in
`src/data/mentorResponses.js` (`requirements.md` §13), triggered at the three
points defined in §11–§12: incorrect diagnosis, correct diagnosis, explanation submitted.

**Acceptance criteria:**
- `MentorCard` receives `message` as a prop from the page component — the component itself contains no hardcoded feedback text (confirms the "swap in real AI later" requirement from `requirements.md` §13/§18).
- All three exact message strings match `requirements.md` §13.
- Correct message tone/styling (`success`) is visually distinct from the incorrect hint (`hint`) per `design.md` §13.

---

# PHASE 9 — RESULTS & GAMIFICATION (~1 hr)

## P1-13 Quest Results

**Priority:** P0

Implement `/quest/serverless-rescue/result` per `design.md` §14 and
`requirements.md` §14: completion header, score, XP, badge, skills unlocked.

**Acceptance criteria:**
- All values match `requirements.md` §14 exactly: `92%` score, `+250 XP`, `IAM Detective` badge, 5 listed skills.
- `Back to Dashboard` navigates to `/dashboard`.
- Direct navigation to this route without completing the quest still renders correctly (no crash) — see P1-19/error handling.

---

## P1-14 Gamification State

**Priority:** P0

Implement the XP/level/badge update logic exactly as specified in
`requirements.md` §15, using `QuestProvider` context so Dashboard reflects
post-quest state.

**Acceptance criteria:**
- On quest completion, XP updates from `840` to `1090` and this is visible on the Dashboard when the user navigates back (not just on the Results page in isolation).
- Since `1090 ≥ 1000` (the Level 4 threshold), Level updates from `3` to `4` and a level-up indicator appears somewhere in the flow (toast, badge, or Results-screen callout — implementer's choice, but it must be visibly different from a normal completion).
- Badge count updates from `3` to `4`.
- Quest progress on the Dashboard's quest card updates from `60%` to `100%` (or the card indicates "Complete").

---

# PHASE 10 — POLISH (~1.5 hr)

## P1-15 Visual Polish

**Priority:** P1

Implement the 5 motion priorities from `design.md` §15: page transitions,
button interactions, progress bar fill animation, architecture flow lines,
results confetti.

**Acceptance criteria:**
- Each of the 5 motion types is implemented at the durations specified in `design.md` §15 (all ≤600ms except the intentional flow-line loop).
- `prefers-reduced-motion: reduce` disables looping/decorative animations (flow lines, confetti, typewriter) — verify by toggling the OS/browser setting.
- No animation blocks interaction (e.g., user can click Submit before a fade-in finishes).

---

## P1-16 Responsive Design

**Priority:** P1

Verify and fix layout at all six widths from `requirements.md` §17: 1440,
1280, 1024, 768, 390, 360px.

**Acceptance criteria:**
- No horizontal scrollbar appears at any tested width.
- No text is clipped/overlapping at any tested width.
- Answer options are full-width and tappable (min 44px touch target height) on the two mobile widths.
- Navbar collapses to hamburger below 768px per `design.md` §17.

---

## P1-17 Accessibility

**Priority:** P1

Verify the checklist in `design.md` §16.

**Acceptance criteria:**
- Full quest flow (Landing → Dashboard → Intro → Debug → Explanation → Results) is completable using only `Tab`, `Shift+Tab`, and `Enter`/`Space` — no mouse.
- `:focus-visible` ring is visible on every interactive element during keyboard navigation.
- `AnswerOption` and `StatusIndicator` correct/incorrect/error states are distinguishable without color (icon or text label present).
- Run Chrome DevTools Lighthouse accessibility audit on `/` and `/quest/serverless-rescue/debug`; score ≥90 on both.

---

# PHASE 11 — TESTING (~1 hr)

## P1-18 Full User Flow Test

**Priority:** P0

Manually execute the exact path below start-to-finish, in one session,
without a page reload:

```
Landing → Start Your First Quest → Dashboard → Continue Quest
→ Quest Intro → Begin Investigation → Debug Screen
→ Select wrong answer → Submit → see hint feedback
→ Select correct answer → Submit → see success feedback
→ Explanation textarea → type reasoning → Submit
→ Mentor confirms → navigate to Results
→ Results show 92%, +250 XP, IAM Detective, 5 skills
→ Back to Dashboard → XP now 1090, Level now 4, Badge count 4
```

**Acceptance criteria:** every arrow above completes with no console error,
no blank screen, and the exact copy/values specified in `requirements.md`.

---

## P1-19 Refresh Testing

**Priority:** P1

Refresh the browser on each of the 5 named routes individually (not
mid-flow — a cold refresh directly on that URL).

**Acceptance criteria:**
- Each route renders its default state correctly per the error-handling table in `requirements.md` §16.
- No route throws an unhandled exception or shows a white screen on refresh.

---

## P1-20 Console Testing

**Priority:** P0

**Acceptance criteria:**
- 0 errors in browser console across the full flow in P1-18.
- 0 warnings about missing `key` props, unresolved imports, or missing assets.
- Network tab shows no 404s for fonts, icons, or other static assets.

---

# PHASE 12 — DEPLOYMENT (~30 min)

## P1-21 Production Build

**Priority:** P0

```bash
npm run build
npm run preview
```

**Acceptance criteria:**
- `npm run build` completes with 0 errors (warnings about chunk size are acceptable).
- `npm run preview` serves the production build locally, and the full flow from P1-18 works identically to dev mode.

---

## P1-22 Deploy

**Priority:** P0

Deploy the built `dist/` folder to a static host — **Vercel** or **Netlify**
recommended (both support drag-and-drop `dist/` upload or a one-command CLI
deploy with zero config for a Vite SPA). Configure SPA fallback (rewrite all
routes to `index.html`) so client-side routes don't 404 on direct load —
Vercel/Netlify both auto-detect this for Vite projects, but verify it explicitly.

**Acceptance criteria:**
- Live URL loads `/` correctly.
- Live URL loads `/quest/serverless-rescue/debug` directly (typed/pasted, not navigated-to) without a 404 — confirms SPA fallback is configured.
- Full P1-18 flow works on the deployed URL, not just locally.

---

# STOP CONDITIONS

If time runs out before all P0 tasks are done, cut in this order (stop as
soon as remaining time is sufficient for what's left):

**Cut first (lowest cost to demo quality):**
1. Visual/motion polish (P1-15) — ship with instant state changes instead of animated ones
2. Responsive polish beyond "doesn't visually break" (P1-16) — desktop-only demo is acceptable
3. Accessibility audit polish (P1-17) — keep semantic HTML (already required by P1-04/P1-11) but skip the Lighthouse-score pass

**Cut second (changes scope, mention explicitly in the demo):**
4. Attempt counter / multiple wrong-answer narrative flourish — a single hint message is enough
5. Level-up visual callout — a plain XP/level number update is enough

**Never cut (these are the MVP as defined in `requirements.md` §2):**
- Landing, Dashboard, Quest Intro, Debug, Explanation, Results — all 5 routes
- Correct/incorrect answer feedback loop
- Mentor feedback text (even if visually plain)
- XP/level/badge state update on completion
- Production build + deploy

**Explicitly out of scope regardless of time remaining** (do not attempt):
real AI/Bedrock integration, authentication, a database, real AWS calls,
multiple quests, a leaderboard, drag-and-drop architecture building, complex
animation libraries.

---

# DEFINITION OF DONE

CloudForge's MVP is done when all of the following are simultaneously true:

1. `npm run build` succeeds with 0 errors.
2. The deployed production URL loads `/` with 0 console errors.
3. `Start Your First Quest` reaches `/dashboard` and shows Level 3 / 840 XP / 4-day streak / 3 badges, all sourced from `src/data/student.js`.
4. `Continue Quest` opens `/quest/serverless-rescue` showing the correct scenario and architecture.
5. `Begin Investigation` opens the debug screen showing `INCIDENT DETECTED`, correct system status (API Gateway/Lambda operational, DynamoDB error), and the exact 4-line log.
6. Selecting a wrong answer and submitting shows the hint feedback without ending the quest.
7. Selecting the correct answer and submitting shows the success feedback and reveals the explanation stage.
8. The explanation textarea enforces the 10-character minimum and, once submitted, shows the mentor's confirmation message.
9. `/quest/serverless-rescue/result` shows `92%`, `+250 XP`, `IAM Detective` badge, and 5 unlocked skills.
10. Returning to `/dashboard` shows updated XP (1090), Level (4), and badge count (4).
11. All 5 named routes survive a direct refresh without crashing.
12. The full flow in P1-18 is keyboard-navigable end to end.
