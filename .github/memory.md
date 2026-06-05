# Project Memory

Living record of facts, findings and decisions. Read by GitHub Copilot automatically via `copilot-instructions.md`.
Append new entries — never delete old ones. Superseded entries get a ~~strikethrough~~ note and a replacement below.

---

## Must-read at session startup

- **`.github/todo.md`** — active improvement backlog. Check this before any frontend work. Do not implement items not listed here without adding them first.

---

## Facts

Facts describe what is currently true about the codebase.

- **2026-06-05** — Solution file is `Workshop.sln` at the repo root. API project is at `src/Api/WorkshopApi.csproj`.
- **2026-06-05** — Runtime is .NET 9.0 (SDK 9.0.311). No `Microsoft.AspNetCore.OpenApi` package — NuGet access was unavailable at setup time; the package is not in the local cache.
- **2026-06-05** — Static files are served from `src/Api/wwwroot/`. `UseDefaultFiles()` is registered before `UseStaticFiles()` so `GET /` returns `index.html`.
- **2026-06-05** — API runs on `http://localhost:5090` in Development (from `launchSettings.json`).
- **2026-06-05** — Product data is hardcoded in `Program.cs` — no database or file-based persistence yet.

---

## Findings

Findings are things discovered during work — bugs caught, assumptions confirmed or refuted.

- **2026-06-05** — NuGet restore against `https://api.nuget.org/v3/index.json` fails in this environment (network proxy returns HTML, not JSON). Build only works with packages already in the local cache.

---

## Decisions

Decisions record choices made and the reasoning behind them.

- **2026-06-05** — Removed `Microsoft.AspNetCore.OpenApi` from the project to allow offline builds. Can be re-added once network/NuGet access is confirmed.
- **2026-06-05** — CORS policy (`DevPolicy`) is applied in the Development environment only. Origins are explicit (`localhost:5000`, `localhost:7000`, `127.0.0.1:5500`) — no wildcard `*`.
- **2026-06-05** — Frontend uses vanilla JS with `type="module"` and no external libraries, to keep the project self-contained and workshop-friendly.
- **2026-06-05** — All user-supplied strings rendered via `innerHTML` pass through `escapeHtml()` in `app.js` to prevent XSS.
