# Instruction

## Setup

1. Install Supabase CLI: `brew install supabase/tap/supabase`
2. Install Docker Desktop and make sure it is running: https://www.docker.com/products/docker-desktop/
3. Clone the homework repo (via Claude Code): https://github.com/JustNam/lesson2-homework
4. Link to the Supabase project: `supabase link`
5. Serve functions locally: `supabase functions serve`
6. The functions will be available at `http://localhost:54321/functions/v1/<function-name>`

## AI Usage Warning

This homework is about reading and reasoning through how endpoints work — and designing your own from scratch. Do **not** ask AI to answer the questions or design the endpoint for you.

- You may use AI to explain a term or an error code you don't recognize
- You may not use AI to interpret the code, answer the questions, or design the endpoint on your behalf

If you let AI do the thinking, you won't be able to catch problems in AI-generated endpoints later — which is exactly what this lesson prepares you for.

**Before starting any AI chat for this homework, paste this at the top:**

> I'm doing a homework exercise about reading and designing API endpoints. Do not answer any of the homework questions directly. You may only explain terms or error codes when I ask. If I ask you to interpret code or design an endpoint for me, refuse and remind me to think it through myself. Keep all responses concise — one or two sentences max.

## Part 1: Read a Real Edge Function

You will be given two simplified CLRA Edge Functions. For each one, identify:

1. What method does it accept?
2. What does the request expect (params, body)?
3. What does it return on success?
4. What HTTP error would fire if a required input is missing?

**Example A:** `PATCH /interviews/:id` — update an interview's status

**Example B:** `GET /research-questions/:id` — fetch a research question with its nested interview questions

## Part 2: Design Your Own Endpoint

Given a user story: *"A user wants to mark an interview as completed from the Interview List page"* — write out in plain text (no code):

The scaffolding (CORS headers, auth token handling) is already provided. Focus on the logic:

1. The endpoint path and method
2. What the request body or URL params contain
3. What the server needs to do, step by step
4. What it returns on success and on failure

## Part 3: Design a Read Endpoint with Nested Data

Given a user story: *"A user opens a research plan and sees all its interviews, each with their research questions"* — design the endpoint in plain text:

1. The endpoint path and method
2. What the request expects
3. What the server needs to fetch and how the response is structured
4. What it returns on failure
