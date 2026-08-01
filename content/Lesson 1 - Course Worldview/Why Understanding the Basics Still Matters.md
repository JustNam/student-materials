# Lesson: Why Understanding the Basics Still Matters in the Age of AI

## Overview

This lesson walks through a real conversation with an AI coding assistant (Claude) to demonstrate that AI can generate plausible-looking code that is subtly suboptimal. **You need to understand the fundamentals to catch it.**

The example is from a React + Next.js codebase. The feature being built: after a user creates a "Research Plan", a button should navigate them to the Interviews page and automatically open a modal.

---

## The Feature

On the **Interview List** page, we want to:

1. Detect a `?startInterview=true` query parameter in the URL
2. Wait for templates to finish loading from the API
3. Automatically open `CreateInterviewModal` if templates exist

---

## Iteration 1: AI's First Suggestion

The AI added a separate `useEffect`:

```tsx
useEffect(() => {
  if (searchParams.get('startInterview') === 'true' && !templatesLoading && templates.length > 0) {
    setCreateModalOpen(true)
  }
}, [searchParams, templatesLoading, templates.length])
```

**The AI included `templates.length` as a dependency.**

### Why the student should question this

Ask yourself: _what is this effect actually reacting to?_

The effect should fire when:

- The URL has `?startInterview=true`, AND
- Templates have finished loading

`templates.length` is used as a **guard** inside the effect, not as a trigger. Including it as a dependency means the effect re-runs every time the template count changes, which is unnecessary. It also opens a subtle bug: if templates are reloaded later (e.g. after creating a new one), the effect fires again and re-opens the modal unexpectedly.

### The fix

```tsx
}, [searchParams, templatesLoading]) // templates.length is a guard, not a trigger
```

**Key concept:** Dependencies should represent _what causes the effect to be meaningful_, not just _what is read inside it_. This distinction requires understanding what `useEffect` actually does, not just how to write it.

---

## Iteration 2: AI's Second Suggestion (still not optimal)

After the fix, we had:

```tsx
// Mount effect
useEffect(() => {
  loadInterviews()
  loadTemplates()
}, [])

// Query param effect
useEffect(() => {
  if (searchParams.get('startInterview') === 'true' && !templatesLoading && templates.length > 0) {
    setCreateModalOpen(true)
  }
}, [searchParams, templatesLoading])
```

**Two `useEffect` hooks for one logical flow.**

### Why the student should question this

Ask yourself: _when does this check need to happen?_

Answer: **exactly once, right after templates finish loading on mount.**

The second `useEffect` exists to react to `templatesLoading` changing. But we already know when that happens: inside `loadTemplates`. We have direct access to the fresh data at that exact moment.

The second `useEffect` is a roundabout way of doing something we could do directly.

### The fix: move logic to where data is born

```tsx
const loadTemplates = async () => {
  try {
    setTemplatesLoading(true)
    const data = await QuestionTemplatesApi.list()
    setTemplates(data)
    if (searchParams.get('startInterview') === 'true' && data.length > 0) {
      setCreateModalOpen(true)  // use `data`, not `templates` state
    }
  } catch (err) {
    console.error('Error loading templates:', err)
  } finally {
    setTemplatesLoading(false)
  }
}
```

**Key concepts:**

- **Async functions return fresh data directly.** You don't need to wait for state to update to use the result.
- **State updates are asynchronous.** Reading `templates` right after `setTemplates(data)` gives you the _old_ value, not `data`.
- **Co-locate logic with the data it depends on.** If you only need this check once, at load time, put it there.

---

## The Pattern AI Gets Wrong

AI tools are trained to generate code that _looks correct_. A separate `useEffect` for detecting query params is a common, defensible pattern. The AI is not wrong in an obvious way. It just doesn't reason about whether the pattern is _necessary_ here.

This is the gap AI cannot reliably fill:

|What AI does well|What requires your understanding|
|---|---|
|Generate syntactically correct React|Know when a `useEffect` is the right tool|
|Follow common patterns|Know when a simpler approach eliminates the need for the pattern|
|Avoid bugs it was trained to recognize|Reason about execution order, state batching, async timing|
|Produce working code|Produce _optimal_ code for the specific context|

---

## The Thinking Process

When reviewing AI-generated code, ask:

1. **What is this code reacting to?** (Is each dependency a real trigger, or just something read inside?)
2. **When does this need to run?** (Once? Every render? On specific changes?)
3. **Is there a simpler place to put this logic?** (Can I move it closer to where the data comes from?)
4. **What would happen if this runs twice?** (Is the effect idempotent? Can it cause unintended side effects?)

These questions require knowing how React works, not just how to write React.

---

## Takeaway

AI raises the floor of what you can build. It removes the need to memorize syntax, boilerplate, and common patterns.

But it lowers the ceiling of what you'll _notice_. If you don't understand `useEffect` dependencies, you'll accept the first version and ship the subtle bug. If you don't understand async state updates, you'll read `templates` instead of `data` and wonder why the modal doesn't open.

**The basics are not what AI replaces. They are what you need to use AI well.**