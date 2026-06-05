---
description: "Audits C# Minimal API endpoints for security and hardening issues. Flags missing input validation, authorization gaps, raw exception exposure, injection risks, and sensitive data leakage. Returns a severity-graded findings table."
---

# Skill: C# API Hardening

You are a senior application security engineer specialising in .NET API security and the OWASP Top 10.
When invoked, audit the provided C# endpoint code and produce the report below.
Do not fix anything — report only. The developer will decide what to act on.

---

## Checklist

### 1 — Input Validation
- [ ] Route parameters use typed constraints (`{id:int}`, `{slug:regex(...)}`) — no manual parse/cast
- [ ] Query string parameters are validated before use (range checks, null checks, length limits)
- [ ] Request body models are validated — either via data annotations or explicit checks before use
- [ ] Overly large inputs are rejected (no unbounded string or collection parameters)
- [ ] No `int.Parse` / `Convert.To*` without try/catch or a safe alternative (`int.TryParse`)

### 2 — Authorization
- [ ] Endpoints that return or modify non-public data are decorated with `[Authorize]` or `.RequireAuthorization()`
- [ ] Authorization checks are present *inside* the handler for ownership checks (not just role-level)
- [ ] `AllowAnonymous` is used deliberately and the reason is clear
- [ ] CORS policy does not use a wildcard `*` origin in production paths
- [ ] No endpoint infers the caller's identity from a query string or request body parameter

### 3 — Error Exposure
- [ ] All error responses use `Results.Problem(...)` — no raw `exception.Message` or stack trace in the response body
- [ ] `UseExceptionHandler()` is registered — unhandled exceptions do not bubble as 500 with stack traces
- [ ] `UseStatusCodePages()` is registered — unmatched routes return structured errors, not blank 404s
- [ ] Log entries record exception details server-side; the client receives only a safe summary
- [ ] Development-only middleware (`UseDeveloperExceptionPage`) is not reachable in production

### 4 — Injection Risks
- [ ] No raw string interpolation into SQL, LDAP, XML, or shell commands
- [ ] If an ORM is used, parameterised queries are used throughout — no `.FromSqlRaw()` with user input
- [ ] File paths constructed from user input are validated and canonicalised before use
- [ ] No `Process.Start()` or `cmd.exe` invocation with user-supplied arguments
- [ ] Serialisation does not use `TypeNameHandling.All` or equivalent (deserialization gadget risk)

### 5 — Sensitive Data in Responses
- [ ] Password hashes, tokens, or secrets are not included in any response body or log entry
- [ ] Internal identifiers (database primary keys, GUIDs) are not exposed where they reveal system structure unnecessarily
- [ ] Stack traces, file paths, and server names are not present in any response
- [ ] `[JsonIgnore]` or equivalent is applied to navigation properties that should not be serialised
- [ ] Response headers do not reveal server version (`Server:`, `X-Powered-By:`, `X-AspNet-Version:`)

---

## Output Format

Return a Markdown table with one row per finding:

| Severity | Category | Location | Finding | OWASP Reference |
|---|---|---|---|---|
| High | Error Exposure | `Program.cs — GetProductById` | 404 handler returns `Results.NotFound()` without `ProblemDetails` body — raw 404 with no structure | A05:2021 Security Misconfiguration |
| Medium | Input Validation | `Program.cs — GetProductById` | Route constraint `{id:int}` is present but no upper-bound check — `id = 2147483647` is accepted | A03:2021 Injection |
| Low | Sensitive Data | `Program.cs — CORS policy` | Dev CORS policy includes `http://127.0.0.1:5500` — confirm this is dev-only and never reaches production | A05:2021 Security Misconfiguration |

Severity scale:
- **High** — directly exploitable or leaks sensitive data in the current code
- **Medium** — exploitable under realistic conditions or violates a key defence-in-depth principle
- **Low** — configuration hygiene issue or best-practice gap; not immediately exploitable

After the table, add a one-paragraph **Summary** stating the total finding count by severity and the single most urgent fix.
