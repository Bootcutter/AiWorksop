# AI Exploratory Workshop for Developers
### Tasks, Ideas and Terminology — Web Developers (.NET, C#, HTML, CSS, JavaScript)

---

## Workshop Outcomes

By end of day you will be able to:

1. Use AI for generative coding and safe refactoring.
2. Run an agentic workflow — plan, execute, verify, iterate.
3. Write instruction files and memory files that make the AI behave consistently.
4. Define reusable custom skills for recurring tasks.
5. Set up an MCP server and invoke its tools from inside VS Code.
6. Build a small AI-assisted, MCP-connected application as a team.

---

## Schedule

| Time | Block | Focus |
|---|---|---|
| 09:00–10:30 | Block 1 | Foundations — setup, first generative coding wins |
| 10:30–10:45 | Break | — |
| 10:45–12:15 | Block 2 | Agentic workflows, instruction files, memory, skills |
| 12:15–13:00 | Lunch | — |
| 13:00–14:30 | Block 3 | MCP — build a server, expose tools, query a product catalog |
| 14:30–14:45 | Break | — |
| 14:45–16:30 | Block 4 | Team build challenge |
| 16:30–17:00 | Wrap-up | Demos, retro, next steps |

---

---

## Block 1 — AI Foundations and First Coding Wins

**Goal:** Get every tool working and understand how to write prompts that produce useful output — within the first 30 minutes.

---

### The RACE Framework — Writing Better Prompts

Before touching any code, learn one prompting pattern you will use all day.

**RACE** gives every prompt the four things an AI needs to give a useful answer:

| Letter | Stands for | What to write | Example |
|---|---|---|---|
| **R** | **Role** | The persona or expertise the AI should adopt | *"You are a senior C# developer working on a .NET 8 API"* |
| **A** | **Action** | The specific task you want performed | *"Generate a Minimal API endpoint that returns a paged list of products"* |
| **C** | **Context** | Relevant background the AI does not already know | *"The project uses ProblemDetails for all errors and camelCase JSON"* |
| **E** | **Expectation** | What the output must look like or satisfy | *"Return only the handler method. Include XML doc comments. No class wrapper."* |

A prompt that skips Role gets generic code. A prompt that skips Context gets code that ignores your conventions. A prompt that skips Expectation gets something that does the job but in a shape you did not want.

> Keep RACE in mind for every prompt you write today — not as a rigid template, but as a checklist. If a response disappoints you, identify which letter was weak or missing.

---

### Task 1.1 — Environment Check

Verify that everything is installed and working before writing any AI-assisted code:

- .NET 8 SDK (`dotnet --version`)
- Node.js 20 LTS (`node --version`)
- VS Code with GitHub Copilot and GitHub Copilot Chat extensions
- Sign in to your AI assistant — confirm it responds in the editor

> Ask the AI: *"What languages and frameworks are available in this environment?"*
> If it answers correctly, your setup is working.

---

### Task 1.2 — Create a Starter Project

Create a minimal project to use as your working base for the rest of the day.

**Option A:** .NET Minimal API + static HTML/CSS/JS frontend
- Ask the AI to scaffold a .NET 8 minimal API with one endpoint and a plain HTML page that calls it.

**Option B:** Use an existing simple project from your organisation if available.

Either way: get it running locally before moving on. A non-running project is a blocked team.

---

### Task 1.3 — First Generative Coding Tasks

Write each prompt yourself using the RACE framework before sending it. After each response, read the output before running it.

1. Generate a responsive product card component using semantic HTML and CSS — no JavaScript.
2. Generate a C# .NET 8 Minimal API endpoint that returns a hardcoded list of three products as JSON.
3. Write an async JavaScript function that fetches from `/api/products` and renders the results as cards in the DOM.

For each result:
- Does it compile / render without changes?
- Is the HTML semantic or just `<div>` soup?
- Does the C# return `ProblemDetails` on error, or a raw exception string?
- Compare your prompt with a colleague's — did different RACE phrasings produce noticeably different output?

---

### Task 1.4 — Validation Exercise

Ask the AI to suggest 3 unit tests for the endpoint you just generated.

- Pick the one most likely to actually catch a bug — implement it.
- Pick the one that looks correct but is actually trivial or circular — explain why it adds no value.
- Discuss: what would a *meaningful* test for this endpoint actually verify?

> **Teaching point:** AI is good at generating plausible tests. Plausible ≠ useful. You are the judge.

---

### Ideas and Variations for Block 1

- Give the AI a deliberately vague prompt with no RACE structure. Note every assumption it made. Rewrite using RACE and compare.
- Ask the AI to generate the same component twice with a different Role each time — e.g., "senior accessibility engineer" vs. "junior frontend developer". Compare the outputs.
- Ask the AI to explain a piece of generated code line by line — verify whether its explanation matches what the code actually does.
- Ask the AI to critique its own output: *"What is the weakest part of the code you just generated?"*

---

### Optional — Publish Your App with Git and GitHub Pages

> **When to do this:** If your team finishes Tasks 1.1–1.4 early, or as a stretch goal. Takes roughly 20–30 minutes. Useful context for Block 4 where teams demo a running app.

Get your starter project into a git repository and served live via GitHub Pages — using the AI to help with every step.

---

#### Step O.1 — Initialise a Git Repository

Ask the AI:
> *"How do I initialise a new git repository in my current project folder, create a `.gitignore` suitable for a .NET 8 project with a JavaScript frontend, and make a first commit?"*

Follow the steps it gives. Then verify:
- `git status` shows a clean working tree.
- `git log --oneline` shows your first commit.

Note: was the generated `.gitignore` complete? What did it miss?

---

#### Step O.2 — Create a Repository on GitHub and Connect It

1. Go to your GitHub instance and create a new **empty** repository (no README, no licence — otherwise you'll have a conflict on first push).
2. Ask the AI: *"How do I connect my local git repository to a remote GitHub repository and push my main branch for the first time?"*
3. Follow the steps. Verify the files appear on GitHub.

> **Teaching point:** Notice how the AI gives you the exact commands without you needing to remember the syntax. This is a good example of using AI as a reference assistant — but always read the commands before running them. `git push --force` on a shared repo would be a bad day.

---

#### Step O.3 — Configure GitHub Pages

GitHub Pages can serve static files directly from a branch. Your .NET API cannot run on Pages (it needs a server), but your **HTML/CSS/JS frontend** can.

1. Ask the AI: *"How do I configure GitHub Pages to serve static HTML files from the `wwwroot` folder of a .NET 8 project? What folder structure does GitHub Pages expect?"*
2. Read the answer. You will likely need to either:
   - Copy your static files to a `docs/` folder at the repo root, **or**
   - Push your static files to a dedicated `gh-pages` branch.
3. Ask the AI to generate the steps for whichever approach you choose.
4. In your GitHub repository settings → **Pages** → set the source to match.
5. Wait ~60 seconds and open the Pages URL. Your product card should be live.

> **Teaching point:** GitHub Pages serves static files only — HTML, CSS, JS, images. Your C# API needs a real host. In Block 4 the two are treated separately: Pages for the frontend, `localhost` for the API during the workshop.

---

#### Step O.4 — Ask the AI to Generate a GitHub Actions Workflow

Once Pages is working manually, ask the AI to automate it:

> *"Write a GitHub Actions workflow that runs on every push to main, copies the contents of `src/wwwroot` to a `gh-pages` branch, and deploys it to GitHub Pages."*

Review the generated YAML before committing it. Check:
- Does it check out the correct branch?
- Does it use a pinned action version (e.g., `actions/checkout@v4`) rather than `@main` or `@latest`?
- Does it have any permissions it does not need?

Commit the workflow file and push. Watch the Actions tab on GitHub — see the workflow run automatically.

> **Discussion:** The AI generated this workflow in seconds. A developer writing it from scratch would take 15–30 minutes and several rounds of trial and error. What did you have to verify that the AI could not verify itself?

---

---

## Block 2 — Agentic Workflows, Instructions, Memory and Skills

**Goal:** Move from one-shot prompting to repeatable, context-aware AI behaviour — where the AI remembers your conventions, follows your rules, and applies specialised skills on demand.

---

### The CLEAR Framework — Prompting for Multi-Step Agentic Work

RACE works well for a single code generation task. When you are directing an agent through several steps — or asking it to work within boundaries — use **CLEAR**:

| Letter | Stands for | What to write | Example |
|---|---|---|---|
| **C** | **Context** | Background the agent needs to understand the situation | *"We have a .NET 8 Minimal API with a products endpoint. The codebase uses ProblemDetails and xUnit."* |
| **L** | **Limitations** | What the agent must not do or change | *"Do not modify the existing endpoint. Do not add any new NuGet packages."* |
| **E** | **Expectations** | What done looks like — your acceptance criteria | *"The search is case-insensitive. Results return within 200ms for 1,000 products. Tests pass."* |
| **A** | **Action** | The specific task to perform | *"Add a search endpoint that filters products by keyword across name, description and tags."* |
| **R** | **Refinement** | How to handle uncertainty or gaps | *"If anything is unclear, ask before generating. Do not guess at requirements."* |

The key difference from RACE: CLEAR makes **constraints and acceptance criteria** explicit up front, which matters when the agent will take multiple steps and you cannot review every micro-decision.

> Use CLEAR for any task that spans more than one file, has side effects, or where a wrong assumption would cost significant time to undo.

---

### Five Things That Shape AI Behaviour — and How They Differ

By the end of today you will use all five of these. Here is the distinction between them:

| Concept | What it is | When it applies | Who writes it |
|---|---|---|---|
| **Prompt** | A single natural-language instruction in chat | One task, one moment | You, each time |
| **Instruction file** (`.instructions.md`) | A persistent file of rules the AI follows in every session | Always — ambient background rules | Team, once and maintained |
| **Memory file** (`memory.md`) | A persistent file of accumulated facts and decisions | Always — grows as the project grows | Team, continuously updated |
| **Skill** | A named, packaged set of instructions for a specific recurring task type | On demand — invoked deliberately for that task | Team, defined once, reused many times |
| **Agent** | An AI that takes a sequence of autonomous actions toward a goal | A multi-step workflow — not a single question | The AI, directed by your brief |

**The practical difference in one sentence each:**
- A *prompt* is a question or command you type right now.
- An *instruction file* is a standing order that applies without you asking.
- A *memory file* is the project's accumulated knowledge that would otherwise be lost.
- A *skill* is a reusable playbook for a specific kind of review or generation task.
- An *agent* is what runs the loop — reading your instructions, using your memory, invoking your skills, and asking for your review.

---

### The Core Agentic Loop

Every productive agentic session follows this cycle:

| Step | What you do |
|---|---|
| **Plan** | Write a CLEAR brief before prompting |
| **Act** | Let the agent take the first step |
| **Verify** | Read and test what was produced |
| **Reflect** | Identify what was wrong or missing |
| **Store** | Write decisions into memory so the AI retains them |

---

### How GitHub Copilot Actually Loads Instruction and Memory Files

Before writing any files, understand one thing that trips up most teams on their first day:

**GitHub Copilot has only one file it loads automatically and treats as high-priority instructions:**

```
.github/copilot-instructions.md
```

Files named `memory.md`, `.instructions.md`, `CLAUDE.md`, or anything else are **not** automatically injected. Copilot may stumble across them during context gathering, but there is no guarantee it will read them, and their influence is much weaker.

**The solution: use `copilot-instructions.md` as the entrypoint, and reference your other files from inside it.**

```markdown
# Copilot Instructions

Before making changes, read:
- instructions.md      (coding standards and safety rules)
- memory.md            (prior decisions and project conventions)

Follow the standards in instructions.md.
Consult memory.md before making any architectural decision.
```

This gives Copilot an explicit, high-priority signal to open those files. Without it, they may be silently ignored.

**For teams using multiple AI assistants** (e.g., Copilot and Claude), a common pattern is:

| File | Purpose |
|---|---|
| `.github/copilot-instructions.md` | Copilot's entrypoint — tells it to read shared files |
| `CLAUDE.md` | Claude's entrypoint — same pointer, same shared files |
| `instructions.md` | Shared coding standards, referenced by both |
| `memory.md` | Shared project knowledge, referenced by both |

Both agent entrypoints point at the same shared knowledge. You maintain conventions in one place; both tools benefit.

> **Workshop implication:** In Task 2.1 you will create your team's instruction file. In Task 2.2 you will create the memory file. Make sure `.github/copilot-instructions.md` explicitly references both — otherwise the rules you write may never be applied.

---

### Task 2.1 — Write an Instruction File

An instruction file gives the AI persistent rules it applies to every task — without you repeating them in each prompt. Write one for your team now, before you write any more code.

**First:** create `.github/copilot-instructions.md`. This is Copilot's guaranteed entry point. For now, add a single line:
```markdown
Before making changes, read: instructions.md and memory.md in this folder.
```
You will fill those files in Tasks 2.1 and 2.2.

**Then:** create `instructions.md` with your team's rules:
- A C# style rule (e.g., always use `record` types for DTOs)
- An API convention (e.g., always return `ProblemDetails` for errors, never raw exception messages)
- A safety constraint (e.g., never generate code that deletes or truncates data without explicit user confirmation in the prompt)
- One rule your team decides together

After saving, ask the AI to generate a new endpoint and verify each rule is reflected in the output.
Then deliberately ask the AI to violate the safety constraint — confirm it refuses or warns.

> Test whether the entrypoint matters: temporarily rename `.github/copilot-instructions.md` to something else and repeat the same request. Does Copilot still follow the rules? Rename it back and ask again. This is the clearest demonstration of why the entrypoint file exists.

---

### Task 2.2 — Build a Memory File

A memory file captures decisions so the AI does not lose context between sessions or across teammates.

Create `memory.md` for your team. Record at least three decisions you have already made today:
- Your agreed .NET version and JSON casing convention
- Your API response shape for list endpoints
- Your test naming convention

Then update `.github/copilot-instructions.md` to explicitly reference it — if it isn't already:
```markdown
Before making changes, read: instructions.md and memory.md.
```

Now ask the AI to read `memory.md` and summarise what it knows about your project. Add one new entry and ask again — confirm it picked up the change.

Finally, ask the AI to generate a C# response wrapper class using *only* `memory.md` as the source of truth. Compare your output with another team's — they should look different.

---

### Task 2.3 — Turn a Vague Request into an Agent Brief

Take this vague request: *"Make the product listing better."*

Rewrite it as a CLEAR agent brief:
- Context: what does the current listing look like?
- Limitations: what should the agent leave untouched?
- Expectations: what does "better" mean, concretely? (Measurable if possible.)
- Action: the specific change to make
- Refinement: what should the agent do if it hits an ambiguity?

Give the brief to the AI and compare the output quality with what a vague prompt produces.
Then give the same vague original to a teammate and compare their AI's output with yours.

---

### Task 2.4 — Define Custom Skills

A skill is a reusable playbook for a specific type of recurring task. Define two skills for your team from scratch. Do not copy from another team — the definitions will differ, and that difference is the point.

**Skill 1: Frontend Accessibility Reviewer**
The AI should audit HTML and CSS and report on:
- Semantic structure problems
- Missing or misused ARIA attributes
- Keyboard navigation failures
- Colour contrast issues
- Form labelling gaps

Decide the checklist and the output format yourself. Should it return a table? A severity-graded list? A diff?

**Skill 2: C# API Hardening**
The AI should review any C# endpoint and flag:
- Missing input validation
- Missing or incorrect authorization
- Errors returned as raw exception messages
- Potential injection risks
- Sensitive data in responses

Once both skills are written, invoke each one on code you generated in Block 1.
Note what the AI finds — and especially what it misses.

---

### Task 2.5 — Run the Full Agentic Loop

Put everything together. Run a complete Plan → Act → Verify → Reflect → Store cycle:

1. Write a CLEAR brief for: *"add a keyword search endpoint to the product API"*
2. Ask the agent to implement it — do not intervene until it finishes
3. Apply your API Hardening skill to the result
4. Apply your Accessibility Reviewer skill to any new UI component
5. Fix at least one finding from each skill
6. Update your memory file with the key decision made during the fix
7. Ask the AI to write a one-line changelog entry for what was built

---

### Debrief Prompts for Block 2

- What did the instruction file prevent that would otherwise have needed a manual correction?
- Which skill finding surprised you most?
- Did the CLEAR brief produce a better first attempt than a plain prompt? What was different?
- What would you add to your instruction file right now based on what the AI got wrong?

---

### Ideas and Variations for Block 2

- Ask the AI to write your instruction file for you, based on a conversation about your preferences. Then review and correct it — what did it miss?
- Deliberately write a vague skill definition (one sentence). See how the AI interprets it. Then tighten it and compare.
- Ask the AI: *"Based on our conversation so far, what should go in our memory file?"* — evaluate whether its suggestions are accurate.
- Ask two teams to run the same CLEAR brief against their different instruction files. Present the results side by side.

---

---

## Block 3 — MCP: Build a Server and Query a Product Catalog

**Goal:** Understand what MCP is, build a working server, and use it from inside VS Code.

---

### MCP in Plain Language

**MCP (Model Context Protocol)** is a standard that lets AI assistants communicate with external tools and data sources in a structured, predictable way. Think of it as a plug-in system for AI — any server that speaks MCP can expose capabilities that any MCP-compatible AI client can discover and use.

An MCP server can expose three kinds of things:

| Concept | What it is | Example |
|---|---|---|
| **Tool** | A callable function the AI invokes with arguments | Search products, run a calculation |
| **Resource** | A readable document the AI uses as background context | Catalog summary, team coding standards |
| **Prompt** | A reusable prompt template the AI can fill in | "Summarise today's out-of-stock items for a manager" |

The AI client (VS Code + GitHub Copilot) connects to your server, asks what is available, and then decides which tool to call based on the user's question and each tool's description.

---

### Task 3.1 — Generate Your Product Catalog

Before building the server you need data for it to serve.

Ask the AI to generate a product catalog as a JSON file. Before you prompt, decide:
- What categories do you want?
- What fields should each product have?
- How many products?
- What should vary between products (price range, description length, in/out of stock)?

Write your own prompt. Do not use a template.

After the AI generates the file, review it critically:
- Are prices realistic?
- Do descriptions feel varied or copy-pasted?
- Is there at least one out-of-stock item?
- Does anything look obviously hallucinated (a product that makes no sense)?

Ask the AI to regenerate one product with better copy. Replace it manually. Notice the difference.

> **Teaching point:** Even trivial data generation rewards explicit constraints. The AI fills in everything you don't specify — sometimes well, sometimes carelessly.

---

### Task 3.2 — Scaffold the MCP Server

Ask the AI to scaffold a C# .NET 8 MCP server that:
- Uses the `ModelContextProtocol` NuGet package
- Loads your product catalog from disk at startup
- Uses stdio transport
- Has no tools yet — just the skeleton with data loaded

Think about the data model before prompting. What shape does a product need?

Read the generated code carefully before running it. Understand what each part does.

Verify the server starts without errors. Then configure VS Code to connect to it as an MCP client.

---

### Task 3.3 — Add Product Query Tools

Add tools to your server one at a time. For each tool, write the **description string first** — in plain language, describe what the tool does and when the AI should use it. Only then implement the method.

Suggested tools to build (define your own names and signatures):

- A tool that returns all available categories
- A tool that returns all products in a given category
- A tool that finds a single product by its identifier
- A tool that searches across product names, descriptions, and tags by keyword
- A tool that filters products by a price range

After implementing each tool, test it by asking the AI a natural-language question and watching it call the tool automatically.

> **Discussion:** Two teams will likely name the same conceptual tool differently. Does the name matter for discoverability? Try renaming one and see if the AI still finds it.

---

### Task 3.4 — Add a Resource

Add an MCP resource that gives the AI a plain-text summary of your catalog — total products, categories, price range, number out of stock.

This is not a tool call. The AI reads it passively as background context.

Once added, ask the AI: *"Based on what you know about the product catalog, which category has the highest average price?"* — without invoking any tool yourself.

> **Teaching point:** Resources give the AI ambient knowledge. Tools give it active capabilities. A well-designed server combines both.

---

### Task 3.5 — Test the Protocol Flow End to End

Ask the AI a multi-step question that requires more than one tool call:
*"List all categories, then tell me the cheapest product in each one."*

Watch how it chains tool calls: first categories, then per-category queries.
This is the agentic loop from Block 2 running automatically.

Now deliberately break one tool — return the wrong type, or throw an exception.
Observe how the client and AI handle the failure.
Fix it, retest, and note what the error experience was like.

---

### Stretch Ideas for Block 3

- Add a "low stock alert" tool that accepts a threshold and returns products below it.
- Add a "featured products" tool that filters by a tag the caller provides.
- Add a simple API key check so the tools only execute when a valid key header is present — explore what happens when the key is missing.
- Write a prompt template for MCP: "Summarise today's out-of-stock items in a format suitable for a daily store manager report."
- Ask the AI to write the tool description strings — then compare them to the ones you wrote. Which would make the AI choose the right tool more reliably?

---

---

## Block 4 — Team Build Challenge

**Goal:** Synthesise everything from Blocks 1–3 in one realistic, time-boxed build.

---

### The Challenge

Build a **Product Explorer** application. Each team builds their own — using their own product catalog, their own MCP tools, and their own instruction and memory files.

**The application must have:**
1. A frontend page — search bar, category filter, product cards (HTML/CSS/JS)
2. A C# API — reads from the JSON product catalog, exposes search and filter endpoints
3. The MCP server from Block 3 — connected and providing at least two tools used during the build
4. Instruction and memory files — actively referenced and updated during development
5. At least one test — unit or API-level

**Everything must be AI-assisted.** If you write something manually, note why.

---

### Acceptance Criteria

1. One AI-generated feature that was reviewed, found to have an issue, and fixed.
2. One agent brief written before a task (not a vague prompt after the fact).
3. One memory update made because the AI got something wrong without it.
4. At least two distinct MCP tool invocations that visibly influenced the app output.
5. One test that verifies meaningful behaviour — not a trivially passing assertion.
6. The product data comes from the JSON file — no hardcoded arrays in the API.

---

### Demo Format (5 minutes per team)

1. Show the running app.
2. Show one moment where the AI got something wrong — what was it?
3. Show how your instruction or memory file changed the AI's output.
4. One sentence: what did MCP add that a plain chat conversation couldn't?

---

### Ideas to Push Further in Block 4

- Add a "compare products" feature and let the AI design the UI.
- Ask the AI to write a full accessibility audit of the product card you built — using your skill from Block 2.
- Add a "recently viewed" feature driven by `localStorage` — let the AI implement it, then review the security implications.
- Add role-based authorization to one endpoint — ask the AI how to test it.
- Ask the AI to generate a changelog entry from a summary of what your team built today.

---

---

## Task Bank — For Teams That Finish Early

1. Add role-based endpoint authorization and ask the AI how it would test for authorization bypass.
2. Ask the AI to generate two alternative visual designs for the product card. Implement the better one.
3. Run your accessibility skill against the entire frontend. Fix every High severity finding.
4. Add a product data generator tool to the MCP server — accepts a category and count, returns synthetic products.
5. Add structured logging to the MCP server using `ILogger<T>`. Ask the AI to explain why structured logging matters.
6. Ask the AI to produce a "safe refactoring checklist" and add it to your memory file.
7. Ask the AI to generate release notes for everything your team built today, formatted as a changelog entry.
8. Add a low-stock alert threshold to the MCP server, configurable via an environment variable.
9. Write a skill for "API performance review" — have the AI audit your endpoints for N+1 risks and synchronous blocking calls.
10. Ask the AI: *"What are the three most likely security vulnerabilities in what we built today?"* — evaluate whether it is right.

---

---

## Facilitation Notes

- Pair participants as **Driver** (types) and **Reviewer** (reads and questions). Swap every 25 minutes.
- Every AI-generated change must be read before it is committed. No blind paste-and-run.
- Reward teams for finding and documenting AI mistakes — not just for finishing fast.
- End each block with one captured lesson: *"The AI surprised us when..."*
- If a team is stuck, ask them to show you their prompt before helping — often the prompt is the problem.

---

---

# Terminology Reference

Explanations of every major concept used in this workshop, written for developers with little or no prior AI tooling experience.

---

## The Five AI Behaviour Shapers — How They Differ

These five things all influence how an AI responds. They are easy to confuse because they can all contain similar text — but they operate at different times, in different scopes, and for different purposes.

| Concept | Scope | When it applies | Who writes it | Lives where |
|---|---|---|---|---|
| **Prompt** | One message | Right now only | You, each time | In the chat input |
| **Instruction file** | Entire workspace / session | Always — ambient, automatic | Team, maintained over time | `.instructions.md` |
| **Memory file** | Project or team | Always — grows continuously | Team, updated as decisions are made | `memory.md` |
| **Skill** | One task type | On demand — invoked deliberately | Team, defined once, reused many times | A named `.md` file |
| **Agent** | A full workflow | For multi-step goals | The AI itself, directed by your brief | Runs in Copilot Chat |

**In plain language:**
- A **prompt** is a question you ask right now. It is forgotten the moment the session ends.
- An **instruction file** is a standing order that shapes every response without you asking. Think of it as house rules.
- A **memory file** is the project's growing knowledge base — decisions, conventions, context the team has accumulated. Without it, the AI starts fresh every session.
- A **skill** is a reusable playbook for a recurring type of task — not general rules, but a specific checklist for a specific job.
- An **agent** is the AI acting autonomously across steps: reading your instructions, consulting your memory, optionally invoking skills, and asking for your review at the right moments.

They are not alternatives. They stack. A well-set-up session uses all five.

---

## Agent / Agentic AI

An **agent** is an AI that does not just answer a single question — it takes a sequence of actions to complete a goal. It can read files, write code, run commands, check results, and loop back to correct mistakes. **Agentic** describes any workflow where the AI is given a goal and autonomously plans and executes steps toward it, rather than responding to a single isolated question.

**Why it matters here:** Instead of copy-pasting AI output one prompt at a time, an agent lets you say "build me an endpoint with tests" and the AI plans, implements, and verifies — with you reviewing at each step.

**What it is not:** An agent is not magic. It makes mistakes, hallucinates APIs that don't exist, and confidently generates insecure code. The human reviewer is a first-class part of every agentic workflow.

---

## Agentic Loop (Plan → Act → Verify → Reflect → Store)

The repeatable cycle that separates productive agentic work from one-shot prompting.

| Step | What happens |
|---|---|
| **Plan** | Define the goal as a specific task brief before prompting |
| **Act** | Agent takes the first executable step |
| **Verify** | Human (or agent) checks the result against the goal |
| **Reflect** | Identify what went wrong, what was missing, what surprised you |
| **Store** | Write decisions and lessons into memory so they persist |

Each iteration of the loop produces better output than the last — because each Reflect and Store step adds context the AI didn't have before.

---

## Generative Code / Generative Coding

**Generative code** is code produced by an AI language model in response to a natural-language description. You describe the intent — "a C# endpoint that returns a filtered list of products" — and the AI generates an implementation.

**Common outputs:** Functions, classes, HTML/CSS components, JSON schemas, test cases, configuration files, boilerplate.

**What to watch for:**
- Generated code is often syntactically correct but semantically wrong — it compiles but doesn't match the requirement.
- The AI invents plausible-looking APIs that don't exist.
- Security vulnerabilities (missing authorization, raw exception messages, SQL injection risks) are common in first-pass output.
- Always read before running. Always run before committing.

---

## Prompt / Prompting

A **prompt** is the natural-language instruction you give to an AI model in a single message. The quality of the output is directly proportional to the quality of the prompt.

**Weak prompt:** "Write a login function."

**Better prompt:** "Write a C# method that validates a username and password against ASP.NET Core Identity, returns a JWT on success, and returns HTTP 401 with a `ProblemDetails` body on failure. Do not return exception details in the response body."

Good prompts include:
- The specific goal
- The relevant context (language, framework, existing conventions)
- Explicit constraints (what to avoid, what format to use)
- Acceptance criteria (what "done" looks like)

---

## RACE — Prompting Framework for Single Tasks

A four-part structure for writing effective prompts when you want a specific output from a single request.

| Letter | Meaning | Purpose |
|---|---|---|
| **R** | **Role** | The expertise or persona the AI should adopt |
| **A** | **Action** | The exact task to perform |
| **C** | **Context** | Background the AI needs that it does not already have |
| **E** | **Expectation** | What the output must look like or satisfy |

**When to use it:** Single code generation tasks, explanations, refactoring a specific method, generating a component. Anything where you want one focused result.

**What RACE does not solve:** Multi-step workflows, tasks with side effects, or anything where wrong assumptions midway through would be costly. Use CLEAR for those.

---

## CLEAR — Prompting Framework for Agentic Workflows

A five-part structure for directing an agent through multi-step work, where constraints and acceptance criteria matter as much as the action itself.

| Letter | Meaning | Purpose |
|---|---|---|
| **C** | **Context** | The situation and background the agent must understand |
| **L** | **Limitations** | What the agent must not do or change |
| **E** | **Expectations** | Measurable acceptance criteria — what "done" looks like |
| **A** | **Action** | The specific task to perform |
| **R** | **Refinement** | How the agent should handle uncertainty or gaps |

**When to use it:** Any task that spans multiple files, has side effects, or where you cannot review every micro-decision the agent makes. The Limitations and Refinement letters are what prevent the agent from doing plausible-but-wrong work for several steps before you notice.

**The key difference from RACE:** CLEAR front-loads constraints and acceptance criteria. RACE front-loads role and context. In practice, well-written CLEAR briefs often contain RACE elements inside the Context and Expectations letters.

---

## Human-in-the-Loop

**Human-in-the-loop** means a person is involved at key decision points in an otherwise automated AI workflow. The AI does the work; a human reviews, approves, or corrects before the output is used or extended.

**In practice:** The agent generates a C# endpoint. You read it. If it looks correct, you let the agent continue with tests. If it looks wrong, you interrupt and correct — before more work is built on a bad foundation.

This is not a fallback for when AI fails. It is the intended design of safe agentic development.

---

## `copilot-instructions.md` — The Guaranteed Entrypoint

GitHub Copilot has one file it automatically loads and treats as high-priority instructions:

```
.github/copilot-instructions.md
```

No other file — `memory.md`, `instructions.md`, `CLAUDE.md`, or anything else — is automatically injected. Copilot may discover these during context gathering, but there is no guarantee it reads them, and their weight is much lower than the entrypoint file.

**The recommended pattern:** use `.github/copilot-instructions.md` as a pointer to your other files:

```markdown
# Copilot Instructions

Before making changes, read:
- instructions.md   (coding standards and safety rules)
- memory.md         (prior decisions and project conventions)
```

This gives Copilot an explicit, guaranteed signal to open both files before every task.

**For multi-agent teams** (Copilot + Claude), each tool has its own entrypoint pointing at shared files:

```
.github/copilot-instructions.md  → read instructions.md, memory.md
CLAUDE.md                        → read instructions.md, memory.md
instructions.md                  → shared coding standards (maintained once)
memory.md                        → shared project knowledge (maintained once)
```

Both agents behave consistently because both read the same source of truth.

---

## Instruction Files

Instruction files are Markdown documents that give an AI assistant persistent, reusable rules to follow across an entire workspace or session. Instead of repeating your conventions in every prompt, you write them once.

**What they contain:**
- Coding style rules — "use `record` types for DTOs", "no `var` in public APIs"
- Safety constraints — "never generate code that deletes data without user confirmation"
- Response format rules — "always return `ProblemDetails` for HTTP errors"
- Off-limits patterns — "never use `Thread.Sleep` in async code"

**How they work:** The AI reads the instruction file at the start of a task and applies the rules throughout — even if you don't mention them in your prompt. This is what makes the AI behave consistently across a team.

**Important:** For GitHub Copilot, rules in `instructions.md` only take effect reliably if `.github/copilot-instructions.md` explicitly tells Copilot to read the file. See the `copilot-instructions.md` entry above.

---

## Memory Files

A **memory file** is a Markdown file where accumulated facts, decisions, and conventions are stored so they persist across sessions and assistant restarts.

**The difference from an instruction file:**
- An instruction file carries *rules* — standing orders the AI must follow.
- A memory file carries *knowledge* — things the team has decided, discovered, or agreed on.

**Examples of memory content:**
- "We chose `camelCase` for all JSON property names — June 4"
- "The products API uses a cursor-based pagination model, not offset"
- "The search endpoint is intentionally case-insensitive — not a bug"

**Layered memory:** You can have a shared memory file (for the whole group) and a team memory file (for one team). The AI applies the most specific one first, then falls back to the broader one. This mirrors how real organisations work — company standard at the top, project decisions closer to the code.

---

## Custom Skills

A **skill** is a packaged set of instructions that teaches the AI how to perform a specific, recurring type of task. A skill defines a named capability with a clear purpose, a scope (which files it applies to), a checklist of what to look for, and a format for the output.

**Where skills differ from instruction files:**
- An instruction file sets ambient rules for all tasks.
- A skill is invoked deliberately for a specific type of work — "run the accessibility review skill on this component".

**In this workshop you will define:**
- A **Frontend Accessibility Reviewer** skill — audits HTML and CSS for WCAG 2.1 AA issues
- A **C# API Hardening** skill — audits endpoints for OWASP Top 10 risks

Skills are reusable. Once defined well, they work on any new code — not just the piece you wrote them for.

---

## MCP (Model Context Protocol)

**MCP** is an open protocol that standardises how AI assistants communicate with external tools and data sources. It was introduced by Anthropic and is now broadly adopted across AI tooling.

Think of it the way you think of REST: REST standardises how web applications expose data over HTTP. MCP standardises how AI assistants access tools and resources. Any MCP server can be used by any MCP client — they don't need to be from the same vendor.

**The three capabilities an MCP server exposes:**

| Concept | What it is | When the AI uses it |
|---|---|---|
| **Tool** | A callable function with typed inputs and outputs | When the AI needs to fetch, compute, or act |
| **Resource** | A readable document or data source | When the AI needs background context |
| **Prompt** | A reusable prompt template | When a recurring question needs a consistent structure |

---

## MCP Server

An **MCP server** is a process that hosts tools, resources, and prompts and exposes them over the MCP protocol. It is typically a small application — .NET, Node.js, or Python — that you write and run locally or deploy.

The server handles two kinds of requests from the client:
- `tools/list` — "what tools do you have?"
- `tools/call` — "invoke this tool with these arguments"

**In this workshop:** You will build a C# MCP server that loads a JSON product catalog and exposes tools for searching, filtering, and browsing it.

---

## MCP Client

An **MCP client** is the AI-powered tool that connects to an MCP server and uses its tools. In this workshop the client is VS Code with GitHub Copilot Chat.

The client connects to your server at startup, discovers the available tools, and then automatically decides which tool to call based on the user's question and each tool's description string.

---

## MCP Protocol Flow

Step by step, what happens when the AI uses an MCP tool:

1. Client starts and connects to the MCP server (via stdio or HTTP).
2. Client sends `tools/list` — server responds with tool names, descriptions, and input schemas.
3. User asks a question in chat. The AI reads the tool descriptions and decides which tool to call.
4. Client sends `tools/call` with the tool name and typed arguments.
5. Server executes the tool and returns a structured result.
6. Client passes the result back to the AI as context for its response.

The user sees only the final answer. The tool call chain happens transparently.

---

## MCP Tool Description and Discoverability

When you define a tool, you provide a **description string** alongside the method. This is the text the AI reads to decide whether to call the tool — it is not documentation for humans.

**Poor description:** `"Gets products."`
This tells the AI almost nothing. It may never call the tool, or call it for the wrong reason.

**Good description:** `"Returns all products in the catalog whose name, description, or tags contain the given search term. Use this when the user asks to find, search for, or look up a product by keyword or characteristic."`
This tells the AI exactly when to use the tool and what it will get back.

Writing good tool descriptions is a skill in itself. In this workshop you will write your own before implementing — and compare with other teams.

---

## Scaffolding

**Scaffolding** is AI-generated boilerplate code that gives you a working skeleton to build on. Rather than starting from an empty file, you describe what you want and get a structural starting point.

**In .NET:** Scaffolding typically produces a data model, a controller or minimal API handler, and basic CRUD operations — wired together but empty of business logic.

**The risk:** Scaffolding is fast but generic. It will not apply your team's naming conventions, error format, or validation rules unless you have instruction and memory files that tell the AI what those are. Without them, you will spend time fixing the scaffold rather than extending it.

---

## .NET Minimal API

A **.NET Minimal API** defines HTTP endpoints with minimal ceremony — no full MVC controller structure, no `[ApiController]` attribute, no routing conventions. Just a direct mapping from an HTTP verb and path to a handler function.

```csharp
app.MapGet("/products", () => Results.Ok(store.GetAll()));
app.MapGet("/products/{id:int}", (int id) => store.FindById(id) is { } p
    ? Results.Ok(p)
    : Results.NotFound());
```

It is the default starting point for new .NET APIs and ideal for workshops because the code stays compact and readable.

---

## Semantic HTML

**Semantic HTML** means using elements whose names describe the content they hold, rather than generic containers.

**Semantic:** `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<section>`, `<aside>`, `<figure>`, `<button>`, `<label>`

**Non-semantic:** `<div>`, `<span>` used for everything

Why it matters:
- Screen readers use semantic elements to navigate pages.
- Search engines use them to understand content structure.
- Browsers apply sensible default styles and behaviours.
- AI assistants generate better semantic HTML when given explicit constraints in the prompt.

---

## ProblemDetails (RFC 7807)

`ProblemDetails` is a standardised JSON format for HTTP error responses, supported natively in ASP.NET Core via `Results.Problem()` or `ControllerBase.Problem()`.

```json
{
  "type": "https://httpstatuses.io/400",
  "title": "Validation failed",
  "status": 400,
  "detail": "The 'name' field is required and must be between 1 and 100 characters."
}
```

Using it consistently means every error from your API has the same shape. Clients — including AI tools — can handle errors predictably. It also prevents leaking exception messages and stack traces to callers.

Make it a rule in your instruction file from the start.

---

## Mock Datastore / JSON Fixture

A **mock datastore** is a static JSON file that acts as a stand-in for a real database. The application reads it from disk at startup and holds the data in memory. There is no database engine, no connection string, no schema migration.

**Why use one:**
- Zero infrastructure to set up or tear down.
- Trivial to inspect, edit, and version-control.
- AI generates convincing seed data in seconds.
- Reset by replacing the file.

**The trade-off:** It does not survive concurrent writes from multiple users or server restarts with in-memory mutations. Fine for a workshop. Not for production.

---

## Unit Test

A **unit test** tests a single function or class in isolation — no network calls, no database, no filesystem. Dependencies are replaced with fakes or mocks.

In .NET the standard frameworks are **xUnit**, MSTest, and NUnit. xUnit is the default for new .NET projects.

AI is good at generating unit tests. They are often syntactically correct but test the wrong thing — asserting that the method returns what was hardcoded into the test setup, rather than verifying real behaviour. Reviewing AI-generated tests is as important as reviewing the code being tested.

---

## API-Level Test

An **API-level test** (also called an integration test) sends a real HTTP request to a running or in-memory-hosted endpoint and verifies the HTTP response — status code, headers, and body.

In .NET, `WebApplicationFactory<T>` from `Microsoft.AspNetCore.Mvc.Testing` lets you host your entire API in memory during a test without starting a real server.

API-level tests verify the full stack — routing, model binding, validation, business logic, serialisation — in a single test. They are slower than unit tests but catch more real bugs.

---

## Trust but Verify

A working principle for AI-assisted development: **assume every piece of generated output may be wrong in a non-obvious way.**

Generated code often looks correct. It compiles, it runs, it returns the right shape of data. And then:
- The authorization check is there but evaluates to `true` for everyone.
- The search is case-sensitive when the spec said otherwise.
- The exception is caught but the error is swallowed silently.
- The SQL query is correct 99% of the time and SQL-injectable 1%.

Running the code is not enough. Reading the code, testing the edge cases, and applying a hardening skill are what "verify" actually means.

---

## GitHub Copilot

**GitHub Copilot** is an AI coding assistant built into VS Code (and other editors) that offers:
- **Inline completions** — code suggested as you type, accepted with Tab
- **Copilot Chat** — a conversational interface for multi-turn agent sessions with workspace context
- **Edits mode** — apply AI-suggested changes across multiple files at once

In this workshop, Copilot Chat (agent mode) is the primary interface. It reads your instruction files and memory files automatically, invokes MCP tools when configured, and maintains context across a session.

---

## VS Code Extensions Used in This Workshop

| Extension | Purpose |
|---|---|
| **GitHub Copilot** | Inline AI code completion |
| **GitHub Copilot Chat** | Multi-turn agent with workspace and MCP context |
| **C# Dev Kit** | .NET IntelliSense, test runner, project management |
| **REST Client** | Send HTTP requests from plain `.http` files in the editor |

---

## `.http` Files

A `.http` file contains HTTP requests in plain text. With the REST Client VS Code extension installed, you can send them with a single click and see the response inline — no Postman, no browser dev tools.

```http
### Get all products
GET http://localhost:5000/api/products
Accept: application/json

### Search for wireless products
GET http://localhost:5000/api/products?q=wireless
Accept: application/json
```

Useful for manually testing endpoints without leaving the editor. AI can generate `.http` test files for your API automatically.

---

*For facilitator notes and setup instructions, see the accompanying facilitator guide.*
