## I. Instruction

### 1. Setup

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account)
2. Click **New Project** and give it any name (e.g. `clra-homework`)
3. Choose a region close to you, set a database password, then click **Create new project**
4. Once ready, go to **SQL Editor** (left sidebar); this is where you'll run all commands below
5. For each table you create in this homework, disable **Row Level Security (RLS)**. Go to **Table Editor**, select the table, and toggle RLS off.

### 2. AI Usage Warning

This homework is about learning to think in tables and relationships, not about getting a working schema as fast as possible. Do **not** ask Claude Code (or any AI tool) to design the schema or write the SQL for you.

- Design the tables yourself first, on paper or in your head, before touching the SQL Editor
- Write the SQL yourself. This is just a mock database, so feel free to be wrong
- You may use AI to explain a concept or an error message, but not to generate the answer

If you skip the thinking and let AI do the design, the homework won't teach you anything. That would just rob you of the chance to learn directly for yourself.

## II. Homework Requirements

### 1. Design the Database

CLRA is a research assistant that helps users plan and conduct interviews. A user starts by creating a **research plan** (e.g. "B2B SaaS User Research"). Under that plan, they schedule one or more **interviews**, each with a specific interviewee and date.

For each interview, the user first sets **research questions** (the goals of that interview, e.g. "Understand pricing sensitivity"). Under each research question, they prepare the actual **interview questions** they'll ask out loud (e.g. "How much do you currently pay for X?"). This separates *what we want to learn* from *what we literally say to the person*.

Separately, each interview also has its own **content**: raw notes or transcript captured during the session, independent of the question structure.

As the product grows, this is the kind of data it needs to persist reliably. Before writing any SQL, answer these questions for yourself:

- What are the main **things** users work with? (plans, interviews, questions...)
- What information do we need to store for each?
- How are they connected to each other?

Then use the SQL Editor to create the tables you designed. Check the **Table Editor** (left sidebar) to confirm each table appeared.

### 2. Populate Your Database

Now seed some data so you have something to work with.

**Hint:** Think about the order you insert data. Which table has no foreign keys and must go first?

### 3. Iteration 1: A User Problem That Requires Table Changes

**The problem:** Users want to track the status of each interview (*planned*, *completed*, or *cancelled*). Right now the database has no way to store this.

**SQL Submission:**

1. The SQL you used to change the database
2. The SQL you used to update existing rows
3. Show all interviews that are still *planned*, with their plan name
4. Show the most recently created interview

**Reflect:** Why did you modify the existing table rather than drop and recreate it? What would have happened to your data if you had?

### 4. Iteration 2: A User Problem That Requires a New Table

**The problem:** Users want to highlight key quotes from interviews and tag them with a theme (e.g. "pain point", "motivation", "workaround"). These highlights don't fit anywhere in the current schema.

**SQL Submission:**

1. The SQL you used to create the new table
2. The SQL you used to populate it
3. Show all highlights tagged as *pain point*, with the interviewee name who said them
4. How many highlights are there per theme?

**Reflect:** What makes this different from Iteration 1? When do you add a column vs. create a whole new table?

## Reference

- [W3Schools SQL Tutorial](https://www.w3schools.com/sql/)
- [GeeksforGeeks SQL Tutorial](https://www.geeksforgeeks.org/sql-tutorial/)
