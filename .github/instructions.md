# Project Instructions

Rules that apply to every code change. Read by GitHub Copilot automatically via `copilot-instructions.md`.

---

## C# / .NET API

- Target **.NET 9** with `<Nullable>enable</Nullable>` and `<ImplicitUsings>enable</ImplicitUsings>`.
- Use **Minimal API** style (`app.MapGet(...)` etc.) — no MVC controllers.
- All 4xx and 5xx responses must return **RFC 9457 `ProblemDetails`** using `Results.Problem(...)`. Never return raw exception strings or custom error shapes.
- Register `AddProblemDetails()`, `UseExceptionHandler()` and `UseStatusCodePages()` in every app.
- JSON is **camelCase** by default (ASP.NET Core default) — do not change this.
- Route parameters use **route constraints** (`{id:int}`, `{slug:regex(...)}`) — no manual parsing.
- Do not add NuGet packages without confirming with the user first.

---

## HTML

- Use **semantic HTML5** elements (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`, etc.).
- Every interactive element must have an accessible label (`aria-label`, `aria-labelledby` or visible text).
- Dynamic regions that change after load must have `aria-live` and `aria-busy` set appropriately.
- No inline `style` attributes — use CSS classes only.

---

## CSS

- Use **CSS custom properties** (design tokens) for all colours, spacing, radii and shadows — defined in `:root`.
- Layout uses **CSS Grid** or **Flexbox** — no floats, no absolute positioning for layout.
- Responsive breakpoints use `@media` with `max-width` at `480px` and `768px`.
- No CSS frameworks (Bootstrap, Tailwind, etc.) unless explicitly requested.

---

## JavaScript

- All JS files use **`type="module"`** — no global variables, no `var`.
- Never use `innerHTML` with unsanitised data — always call `escapeHtml()` or use `textContent`.
- Fetch calls must handle both network errors (`catch`) and non-OK HTTP responses (check `response.ok`).
- Use `const` by default; `let` only when reassignment is needed; never `var`.
- No external JS libraries unless explicitly requested.

---

## General

- Do not modify files outside the scope of the current task.
- Do not add comments that merely restate what the code does — only comment non-obvious intent.
- Do not add speculative error handling or defensive code for scenarios that cannot occur.
- Always run `dotnet build` mentally — if a change would break the build, say so before applying it.
