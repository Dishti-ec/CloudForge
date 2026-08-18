# CloudForge — Engineering Design Specification

## 1. Design Goal

CloudForge should look like a futuristic cloud engineering lab — part developer
tool, part control room, part game. Think AWS Console meets a sci-fi mission
control HUD, not a course catalog.

**Reference feel:** AWS Console's density + Datadog/Grafana's dark dashboards +
a game HUD's status indicators and XP bars.

It should explicitly NOT look like:

- A generic educational website (soft pastels, big rounded illustrations)
- A school LMS (Canvas/Moodle-style card grids)
- A generic Bootstrap/Tailwind starter dashboard
- A generic AI chatbot (centered chat bubble UI)

---

## 2. Visual Theme

Dark-first, single theme for MVP (no light mode toggle required).

Mood: futuristic, technical, premium, immersive, gamified — but restrained.
Precision over decoration. Every glow or animation should communicate state
(operational, error, progress), not just look cool.

---

## 3. Color System

Define as CSS custom properties on `:root` in `src/styles/tokens.css`.

```css
:root {
  /* Base */
  --background: #0B0E14;        /* app background */
  --surface: #11151F;           /* cards, panels */
  --surface-elevated: #171C29;  /* modals, dropdowns, hovered cards */
  --border: #232938;
  --border-hover: #323B52;

  /* Text */
  --text-primary: #F1F3F8;
  --text-secondary: #9AA3B8;
  --text-muted: #5D6B85;

  /* Accent — AWS-inspired orange (primary CTA, XP, highlights) */
  --accent: #FF9900;
  --accent-hover: #FFAC31;
  --accent-muted: rgba(255, 153, 0, 0.15);

  /* Secondary accent — cool cyan (architecture lines, links, info) */
  --accent-cool: #22D3EE;
  --accent-cool-muted: rgba(34, 211, 238, 0.15);

  /* Status */
  --success: #22C55E;
  --success-muted: rgba(34, 197, 94, 0.15);
  --warning: #EAB308;
  --warning-muted: rgba(234, 179, 8, 0.15);
  --error: #EF4444;
  --error-muted: rgba(239, 68, 68, 0.15);

  /* Elevation */
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.35);
  --shadow-glow-accent: 0 0 24px rgba(255, 153, 0, 0.25);
  --shadow-glow-error: 0 0 24px rgba(239, 68, 68, 0.25);
}
```

**Usage rules:**
- Orange (`--accent`) is reserved for primary actions, XP/score numbers, and
  the active nav item. Never use it for more than one dominant element per screen.
- Cyan (`--accent-cool`) is reserved for architecture diagrams, data-flow
  lines, and informational states — it should never compete with orange CTAs.
- Gradients: max one subtle gradient per screen (e.g., hero background radial
  glow, or the top of the results screen). No gradient text, no gradient buttons.
- Borders are 1px solid `--border`, not box-shadows pretending to be borders.

---

## 4. Typography

Font: **Inter** (variable), loaded via `@fontsource/inter` (npm) rather than a
Google Fonts CDN link, to keep it self-contained.

Monospace: **JetBrains Mono** for logs, code, error output (`@fontsource/jetbrains-mono`).

```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
}
```

**Type scale (px / rem / weight / line-height):**

| Token | Size | Weight | Line height | Use |
|---|---|---|---|---|
| `--text-h1` | 48px / 3rem | 700 | 1.1 | Hero headline |
| `--text-h2` | 32px / 2rem | 700 | 1.2 | Page/section titles |
| `--text-h3` | 22px / 1.375rem | 600 | 1.3 | Card titles, quest title |
| `--text-body` | 16px / 1rem | 400 | 1.6 | Body copy |
| `--text-small` | 13px / 0.8125rem | 500 | 1.4 | Labels, meta text |
| `--text-mono` | 14px / 0.875rem | 400 | 1.5 | Log panel, code |
| `--text-stat` | 36px / 2.25rem | 800 | 1 | XP, score, level numbers |

Small labels (e.g., "DIFFICULTY", "STATUS") are uppercase, `--text-secondary`,
letter-spacing `0.06em`, weight 600.

---

## 5. Components

Location: `src/components/`. One folder per component with `ComponentName.jsx`
+ `ComponentName.module.css` (CSS Modules — avoid inline styles and avoid a
CSS-in-JS dependency for the MVP).

| Component | Purpose | Key props |
|---|---|---|
| `Navbar` | Top nav, logo, level indicator | `level`, `xp` |
| `Hero` | Landing hero block | `headline`, `subhead`, `onPrimaryCta` |
| `Button` | Primary/secondary/ghost button | `variant`, `size`, `disabled`, `onClick` |
| `Card` | Generic elevated container | `padding`, `glow` (bool) |
| `StatCard` | Single stat with icon + value | `icon`, `label`, `value` |
| `ProgressBar` | Linear progress with % fill | `value` (0–100), `color` |
| `QuestCard` | Dashboard quest summary | `title`, `difficulty`, `progress`, `onContinue` |
| `ArchitectureNode` | One AWS service box | `icon`, `name`, `status`, `description` |
| `ArchitectureGraph` | Connected sequence of nodes | `nodes[]`, `direction` |
| `StatusIndicator` | Colored dot/pill + label | `status: 'operational'\|'warning'\|'error'` |
| `LogPanel` | Monospace error/log block | `lines[]`, `level` |
| `AnswerOption` | Selectable answer card | `text`, `state`, `onSelect` |
| `MentorCard` | AI mentor feedback block | `message`, `tone: 'success'\|'hint'` |
| `Badge` | Earned badge display | `name`, `icon` |
| `SkillChip` | Small pill for unlocked skill | `label` |
| `ScoreCard` | Results score display | `score`, `xp` |
| `QuestHeader` | Quest title + difficulty + meta | `title`, `difficulty`, `estimatedTime` |

**Button variants:** `primary` (solid orange, `--background` text), `secondary`
(1px `--border`, transparent bg, `--text-primary`), `ghost` (no border, `--text-secondary`).
Heights: `sm` 32px, `md` 40px, `lg` 48px. Border-radius 8px across all buttons/cards.

---

## 6. Navbar

Height: 64px, fixed to top, `background: var(--surface)`, `border-bottom: 1px solid var(--border)`.

Desktop layout (left → right):

1. **Logo**: "CloudForge" wordmark, `--text-h3` weight 700, orange bracket/glyph accent (e.g., a small `{ }` or hex-icon before the text in `--accent`).
2. **Center nav**: `Dashboard`, `Quests`, `Profile` — 16px gap, `--text-secondary` default, `--text-primary` + orange 2px underline when active.
3. **Right side**: Level indicator pill — `background: var(--accent-muted)`, `color: var(--accent)`, text `LVL 3`, 8px border-radius, 4px/10px padding.

For MVP: `Dashboard` and the active `Quests` link (routes to `/quest/serverless-rescue`)
are functional. `Profile` renders a "Coming soon" toast/placeholder on click —
it must not 404 or crash.

Mobile (<768px): center nav collapses into a hamburger icon (Lucide `Menu`)
opening a full-height slide-in panel from the right, `background: var(--surface-elevated)`.

---

## 7. Landing Page

**Hero copy (exact):**

- Eyebrow (small, `--accent-cool`, uppercase): `AI-POWERED CLOUD LEARNING`
- H1: `CloudForge`
- Subhead (`--text-h3`, `--text-secondary`): `Build. Break. Debug. Master AWS.`
- Body (`--text-body`, `--text-secondary`, max-width 560px): `An AI-powered, gamified cloud learning lab where students learn AWS through interactive challenges and real-world cloud scenarios.`
- Primary CTA (Button `primary`, `lg`): `Start Your First Quest` → navigates to `/dashboard`
- Secondary CTA (Button `ghost`, `lg`): `Explore CloudLab` → for MVP, scrolls to the architecture visual section on the same page (no dead link)

**Visual:** Animated `ArchitectureGraph` showing:

```
User → API Gateway → Lambda → DynamoDB
```

Each node fades/slides in sequentially (100ms stagger) on scroll into view
(`IntersectionObserver`). Connection lines are 2px `--accent-cool` with a
subtle animated dash-offset (CSS `stroke-dashoffset` keyframe, 2s loop) to
suggest data flow — this is the one "glowing line" moment on the page, used
sparingly per the no-gradient-overuse rule.

Background: `--background` with one radial gradient glow (`--accent`, 8%
opacity, 600px radius) centered behind the hero text only.

---

## 8. Dashboard

Header row: `Welcome back, Cloud Explorer 👋` (`--text-h2`), with today's date
or streak flame icon inline optional.

**Stat row** — four `StatCard`s in a 4-column grid (desktop), 2-column (tablet),
1-column (mobile):

| Icon (Lucide) | Label | Value |
|---|---|---|
| `Zap` | Level | `3` |
| `Star` | XP | `840` |
| `Flame` | Day Streak | `4` |
| `Award` | Badges | `3` |

Below stats: level-progress `ProgressBar` showing XP toward next level (e.g.,
`840 / 1000 XP to Level 4`), fill color `--accent`, track `--surface-elevated`,
height 8px, fully rounded.

**Main quest card** (`QuestCard`, full-width, elevated with `--shadow-card`):

- Title: `Serverless Rescue`
- Difficulty pill: `Intermediate` — `--warning-muted` background, `--warning` text
- Progress bar: 60% fill, `--accent`
- CTA (Button `primary`): `Continue Quest` → navigates to `/quest/serverless-rescue`

---

## 9. Quest Layout

Two-column desktop grid: `grid-template-columns: 1.1fr 0.9fr`, gap 32px, max-width 1200px centered.

**Left column:**
- `QuestHeader` (title, difficulty pill, estimated time `5–8 min`, AWS concept `SkillChip`s: API Gateway, Lambda, DynamoDB, IAM)
- Scenario block: `--text-body`, `--surface` card, 24px padding
- Mission block: bulleted objectives in a `--surface` card

**Right column:**
- `ArchitectureGraph` in vertical orientation matching the diagram in section 7, each node an `ArchitectureNode`

Below both columns, full-width: `Begin Investigation` primary CTA button
(large), centered, navigates to `/quest/serverless-rescue/debug`.

**Mobile (<1024px):** single column; architecture visualization renders
*below* the scenario/mission text, not above (scenario context comes first).

---

## 10. Architecture Node

Fixed dimensions: 200px wide (desktop), full-width (mobile), min-height 140px.
`background: var(--surface)`, `border: 1px solid var(--border)`, `border-radius: 12px`, padding 16px.

Layout (top to bottom, centered):

1. Icon in a 40×40px rounded square, `background: var(--surface-elevated)` — service-specific icon color (Lambda: orange λ, API Gateway: cyan, DynamoDB: cyan)
2. Service name — `--text-h3`, weight 600
3. `StatusIndicator` — colored dot (8px) + label, colors per status:
   - `operational` → `--success` dot, text "Operational"
   - `warning` → `--warning` dot, text "Degraded"
   - `error` → `--error` dot + subtle pulsing glow (`--shadow-glow-error`), text "Error"
4. Short description — `--text-secondary`, `--text-small`

Connector lines between nodes: 2px solid `--border` by default; when a node
has `error` status, the incoming connector turns `--error` and gets the same
dash-offset flow animation used on the landing page, but in red, to visually
draw the eye toward the failure point.

---

## 11. Debug Screen

Header banner: full-width, `background: var(--error-muted)`, `border: 1px solid var(--error)`,
`🚨 INCIDENT DETECTED` in `--text-h2`, `--error` color, with a subtle 1.5s pulse
opacity animation (0.85 → 1 → 0.85) on the emoji only — not the whole banner
(avoid seizure-risk full-block flashing).

**System status row:** three `StatusIndicator` pills side by side:
- API Gateway — Operational (`--success`)
- Lambda — Operational (`--success`)
- DynamoDB — Error (`--error`)

**Log panel** (`LogPanel`): `background: #05070C` (near-black, darker than
`--surface`), `font-family: var(--font-mono)`, `--text-mono`, 20px padding,
border-radius 8px, left border 3px `--error`.

Exact log content:

```
[12:04:31] ERROR  AccessDeniedException
[12:04:31] Lambda is not authorized to perform: dynamodb:GetItem
[12:04:31] Resource: arn:aws:dynamodb:us-east-1:*:table/Orders
[12:04:31] User: arn:aws:sts::*:assumed-role/serverless-rescue-lambda-role
```

Architecture graph repeats below the log panel (compact variant), with the
DynamoDB node showing `error` state as defined in section 10.

---

## 12. Answer Options

Four `AnswerOption` cards, full-width, stacked with 12px gap. Each: `--surface`
background, 1px `--border`, 16px padding, 8px border-radius, radio-style
selection (not checkbox — only one answer allowed).

**States:**

| State | Border | Background | Extra |
|---|---|---|---|
| Default | `--border` | `--surface` | — |
| Hover | `--border-hover` | `--surface-elevated` | cursor pointer |
| Selected | `--accent-cool` 2px | `--accent-cool-muted` | left checkmark icon |
| Correct (post-submit) | `--success` 2px | `--success-muted` | checkmark icon, `--success` |
| Incorrect (post-submit) | `--error` 2px | `--error-muted` | X icon, `--error` |
| Disabled | `--border` | `--surface`, 50% opacity | cursor not-allowed |

Do not reveal correct/incorrect state until after `Submit Diagnosis` is
clicked. Submit button is disabled (state: `disabled`) until exactly one
option is selected.

Answer copy (exact, per requirements.md §10):

1. `Lambda's execution role does not have permission to access DynamoDB.` *(correct)*
2. `The DynamoDB table does not exist in this region.`
3. `API Gateway is throttling requests before they reach Lambda.`
4. `The Lambda function has run out of memory.`

---

## 13. Mentor Card

`background: var(--surface-elevated)`, `border: 1px solid var(--accent-cool)`,
border-radius 12px, padding 20px, max-width 640px.

Header row: 36×36px circular avatar (`--accent-cool-muted` background,
robot icon in `--accent-cool`) + `CloudForge Mentor` label, `--text-h3`.

Body text: `--text-body`, `--text-primary`, typed-in with a lightweight
typewriter effect (~18ms/char, skippable on click) to reinforce the "AI
explaining" feel without implementing a real streaming API.

Explicitly avoid: message bubbles, timestamps, multi-turn chat history,
avatar photos of people — this is a single expert callout, not a chat app.

---

## 14. Result Screen

Centered column, max-width 480px, vertical rhythm 24px between blocks.

1. `QUEST COMPLETE` — `--text-h1`, `--success`, with a one-time confetti/particle
   burst on mount (canvas or CSS-only, ≤1.5s, using `--accent` and `--accent-cool`
   particles) — not a full-screen animation loop.
2. `Serverless Rescue` — `--text-h3`, `--text-secondary`
3. Score ring or large number: `92%` — `--text-stat`, `--accent`
4. XP earned: `+250 XP` — `--text-h3`, `--accent`, with a count-up animation from 0
5. Badge unlocked: `Badge` component — `IAM Detective`, shield/detective icon, `--accent` glow border
6. Skills unlocked row: `SkillChip`s — `Lambda`, `IAM`, `DynamoDB`, `Serverless Architecture`, `Cloud Debugging`
7. CTA row: `Back to Dashboard` (primary) — no "next quest" CTA in MVP since only one quest exists; do not show a disabled/broken "Next Quest" button

---

## 15. Motion

Priority order and concrete implementation:

1. **Page transitions** — 200ms fade + 8px translateY on route change (React Router `useLocation` + CSS transition, no animation library required)
2. **Button interactions** — 120ms scale(0.97) on active, 150ms background transition on hover
3. **Progress animation** — `ProgressBar` fill animates via CSS `width` transition, 600ms ease-out, on mount/update
4. **Architecture flow** — dash-offset line animation described in §7/§10, 2s linear loop
5. **Quest completion** — confetti burst described in §14

All durations ≤600ms except the intentionally looping flow lines. Respect
`prefers-reduced-motion: reduce` — disable dash-offset loops, confetti, and
typewriter effect (render text instantly) when set.

---

## 16. Accessibility

- All interactive elements (`Button`, `AnswerOption`, nav links, `QuestCard` CTA) are real `<button>`/`<a>` elements — never a `<div onClick>`.
- Focus-visible ring: `2px solid var(--accent-cool)`, `2px offset`, applied via `:focus-visible` (not `:focus`, to avoid mouse-click outlines).
- Color is never the only signal: `StatusIndicator` always pairs color with a text label and an icon (check/warning-triangle/x). `AnswerOption` correct/incorrect states pair color with a checkmark/X icon.
- Text contrast: `--text-primary` on `--background`/`--surface` meets WCAG AA (≥4.5:1) — verify `#F1F3F8` on `#0B0E14` and `#11151F` (both pass, ~15:1 and ~13:1).
- Form field: the explanation `<textarea>` has an associated `<label>` (`Explain your diagnosis`), not just placeholder text.
- Log panel and dynamic status updates use `aria-live="polite"` so screen readers announce state changes (e.g., incident detected, answer feedback).

---

## 17. Responsive Behavior

Breakpoints: `--bp-mobile: 480px`, `--bp-tablet: 768px`, `--bp-desktop: 1024px`.

- **Desktop (≥1024px):** two-column architecture layouts (Quest page), 4-column dashboard stats.
- **Tablet (768–1023px):** single-column quest layout, 2-column dashboard stats, navbar stays horizontal.
- **Mobile (<768px):** single-column everywhere, `ArchitectureNode`s stack vertically with connectors rotated to vertical arrows, answer options full-width, navbar collapses to hamburger.
- No horizontal scrolling at any breakpoint down to 320px width — verify with `overflow-x: hidden` on `body` as a safety net, but layout should not rely on it.
