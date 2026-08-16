# Instruction

## Setup

1. Install Supabase CLI: `brew install supabase/tap/supabase`
2. Install Docker Desktop and make sure it is running: https://www.docker.com/products/docker-desktop/
3. Create a local directory/folder to store the project
4. Link to the Supabase project: `supabase link`
5. Create a new function: `supabase functions new <resource-name>` (The resource is associated with the endpoint)
6. Serve functions locally: `supabase functions serve`
7. The functions will be available at `http://localhost:54321/functions/v1/<function-name>`

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

**[[Examples/A|Example A]]:** `PATCH /interviews/:id` — update an interview's status

**[[Examples/B|Example B]]:** `GET /research-questions/:id` — fetch a research question with its nested interview questions

## Part 2: Design Your Own Endpoint

Given a user story: *"A user wants to mark an interview as completed from the Interview List page"*. First, design the endpoint with guiding logic below, then implement them:
1. The endpoint path and method
2. What the request body or URL params contain
3. What the server needs to do, step by step
4. What it returns on success and on failure

## Part 3: Design a Read Endpoint with Nested Data

Given a user story: *"A user opens a research plan and sees all its interviews, each with their research questions"*. First, design the endpoint with guiding logic below, then implement them.
1. The endpoint path and method
2. What the request expects
3. What the server needs to fetch and how the response is structured
4. What it returns on failure
