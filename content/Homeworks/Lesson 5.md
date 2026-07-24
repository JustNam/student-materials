## I. Setup Supabase

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account)
2. Click **New Project** — give it any name (e.g. `clra-homework`)
3. Choose a region close to you, set a database password, then click **Create new project**
4. Once ready, go to **SQL Editor** (left sidebar) — this is where you'll run all commands below

## II. Design the Database

CLRA is a research assistant that helps users plan and conduct interviews. Before writing any SQL, answer these questions for yourself:

- What are the main **things** users work with? (plans, interviews, questions...)
- What information do we need to store for each?
- How are they connected to each other?

Then create the following tables in the SQL Editor:

```sql
-- Research plans
CREATE TABLE plans (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Interviews under a plan
CREATE TABLE interviews (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  plan_id bigint REFERENCES plans(id),
  interviewee_name text NOT NULL,
  date date,
  created_at timestamptz DEFAULT now()
);

-- Questions asked in each interview
CREATE TABLE questions (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  interview_id bigint REFERENCES interviews(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

> Run each block one at a time. Check the **Table Editor** (left sidebar) to confirm each table appeared.

## III. Populate Your Database

Now seed some data so you have something to work with.

**Insert a plan:**
```sql
INSERT INTO plans (name) VALUES ('B2B SaaS User Research');
```

**Insert two interviews under that plan:**
```sql
INSERT INTO interviews (plan_id, interviewee_name, date)
VALUES
  (1, 'An Nguyen', '2026-07-10'),
  (1, 'Minh Tran', '2026-07-15');
```

**Insert questions for the first interview:**
```sql
INSERT INTO questions (interview_id, content)
VALUES
  (1, 'What is the biggest pain in your current workflow?'),
  (1, 'How often does this problem occur?');
```

**Update a plan name:**
```sql
UPDATE plans SET name = 'B2B SaaS - Phase 1' WHERE id = 1;
```

Verify everything looks right:
```sql
SELECT * FROM plans;
SELECT * FROM interviews;
SELECT * FROM questions;
```

## IV. Iteration 1 — A User Problem That Requires Table Changes

**The problem:** Users want to track the status of each interview — whether it is *planned*, *completed*, or *cancelled*. Right now the database has no way to store this.

Your task:
1. Add a `status` column to the `interviews` table:
```sql
ALTER TABLE interviews
ADD COLUMN status text DEFAULT 'planned';
```

2. Update your existing rows to reflect reality:
```sql
UPDATE interviews SET status = 'completed' WHERE id = 1;
UPDATE interviews SET status = 'planned' WHERE id = 2;
```

3. Query to confirm: show all interviews with their plan name and status
```sql
SELECT interviews.interviewee_name, interviews.status, plans.name AS plan_name
FROM interviews
JOIN plans ON interviews.plan_id = plans.id;
```

**Reflect:** Why did we use `ALTER TABLE` instead of dropping and recreating the table? What would happen to existing data if we had dropped it?

## V. Iteration 2 — A User Problem That Requires a New Table

**The problem:** Users want to highlight key quotes from interviews and tag them with a theme (e.g. "pain point", "motivation", "workaround"). These highlights don't fit anywhere in the current schema.

Your task:
1. Design the table yourself first — what columns does it need?
2. Then create it:
```sql
CREATE TABLE highlights (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  question_id bigint REFERENCES questions(id),
  quote text NOT NULL,
  theme text,
  created_at timestamptz DEFAULT now()
);
```

3. Insert one highlight for a question you created earlier:
```sql
INSERT INTO highlights (question_id, quote, theme)
VALUES (1, 'We spend 3 hours a week just copy-pasting between tools.', 'pain point');
```

4. Write a query that returns: the highlight quote, its theme, the question it came from, and the interviewee name
```sql
SELECT
  highlights.quote,
  highlights.theme,
  questions.content AS question,
  interviews.interviewee_name
FROM highlights
JOIN questions ON highlights.question_id = questions.id
JOIN interviews ON questions.interview_id = interviews.id;
```

**Reflect:** What makes this different from Iteration 1? When do you add a column vs. create a whole new table?
