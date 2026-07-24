## I. Manual Testing Tools

### Chrome DevTools

- Open: `F12` / right-click → Inspect / `Cmd+Opt+I`
- Error Covers: UI rendering, network failures, JS errors
- Tabs:
    - Element: inspect/edit live DOM & CSS; confirm a component actually rendered
    - Network: see API calls; check status codes (200 ok, 4xx/5xx failed), payloads, timing
    - Console: read JS errors & `console.log`; your first stop when something "just doesn't work"

### Terminal (runs the Next.js server)

- Open: VS Code integrated terminal, or macOS Terminal / Windows PowerShell
- Error Covers: build/compile errors, server crashes, dependency issues
- Why should we delegate to Claude Code?
    - Checking directly on terminal costs our attention on switching tool
    - There is too much noise in the original logs

## II. Git

- Definition: version control that snapshots your project over time
- Why it matters:
    - Collaboration: many people edit safely without overwriting each other
    - Version management: revert to any working state; nothing is ever truly lost

## III. Claude Code

- Definition: an AI agent in your terminal that reads, writes, and fixes code from plain language instructions
- Main Features:
    - Conversations
    - Bash usage
    - Skills

## IV. Preparation

1. Clone the git (via Claude Code): https://github.com/JustNam/lesson2-homework
2. `cd lesson2-homework` — **start Claude Code from inside this folder**, not the parent
3. Read README and run the server
4. Turn off the auto-completion on VS code
5. Read the sample: `pages/sample.js`
6. Finish the work: `pages/index.js`
    1. Purpose:
        1. Re-create the Edit Research Plan
        2. Receive inputs from users
        3. Add, delete, update questions
        4. Display the inputs directly to the screen
    2. Only use `/check-error` and `/one-logic-at-a-time`
