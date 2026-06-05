# GitHub Copilot — Project Instructions

You are a senior developer working on this project.
Before doing anything else in a session, read both companion files:

- **`.github/instructions.md`** — coding rules and conventions that always apply.
- **`.github/memory.md`** — accumulated facts, findings and decisions from previous sessions.

---

## Available Skills

Invoke these on demand by referencing them in your prompt:

| Skill file | Freeform phrases that trigger it | `#`-reference |
|---|---|---|
| `.github/prompts/accessibility-review.prompt.md` | "check accessibility", "audit html", "review frontend", "a11y" | `#accessibility-review.prompt.md` |
| `.github/prompts/api-hardening.prompt.md` | "check api hardening", "security review", "harden endpoint", "audit api" | `#api-hardening.prompt.md` |

When you recognise any of the above phrases in a user message, automatically load and apply the corresponding skill file before responding.

Skills **report only** — they do not make changes. After running a skill, present the findings table and wait for the user to decide what to act on.

---

## Automatic skill gates — agentic workflow rules

These rules apply whenever you are acting autonomously across multiple steps.

**API gate:** After any task that creates or modifies a file matching `src/Api/**/*.cs`, you **must** run the api-hardening skill against the changed files before considering the task complete. Present the findings table as part of your completion summary. If any High severity findings are present, flag them explicitly and ask whether to fix them before closing the task.

**Frontend gate:** After any task that creates or modifies a file matching `src/Api/wwwroot/**/*.html` or `src/Api/wwwroot/**/*.css`, you **must** run the accessibility-review skill against the changed files before considering the task complete. Present the findings table as part of your completion summary. If any High severity findings are present, flag them explicitly and ask whether to fix them before closing the task.

---

## How to use `instructions.md`

`instructions.md` is the standing rulebook for this codebase.
It contains rules that apply to **every** code change, regardless of the task.

- Treat every entry as a non-negotiable constraint unless the user explicitly overrides it.
- If you are about to generate code that would break a rule, say so and ask before proceeding.
- If the user asks you to add, remove or change a rule, update `instructions.md` immediately and confirm the change.
- Rules are short, specific and actionable — not vague principles. Prefer "Use `Results.Problem(...)` for all 4xx/5xx responses" over "handle errors properly".

---

## How to use `memory.md`

`memory.md` is the project's living memory.
It records **facts** (what is true about the codebase right now), **findings** (things discovered during work — bugs found, assumptions confirmed or refuted), and **decisions** (choices made and the reason why).

- Read it at the start of a session to restore context.
- After any session where a meaningful decision was made, a finding was confirmed, or the codebase changed in a notable way, **append a new entry** to the relevant section in `memory.md`.
- Entries must include a date (`YYYY-MM-DD`) so the history is traceable.
- Do not delete old entries — mark them as superseded with a `~~strikethrough~~` note if they are no longer accurate, and add the replacement entry below.
- Keep entries concise — one or two sentences maximum per entry.
- Never put secrets, credentials or PII into `memory.md`.
