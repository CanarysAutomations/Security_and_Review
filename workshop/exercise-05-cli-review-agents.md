# Exercise 05 — CLI: Agentic Review + Custom Agents

**Duration**: 15 min  
**Copilot Feature**: Copilot CLI `/review` command · Custom Agents (`.github/agents/`)  
**Goal**: Use the CLI `/review` command to validate your fixes from the terminal, then create reusable OWASP-scoped custom agents that any developer on the team can invoke.

---

## Background

After applying IDE fixes in Exercises 03–04, the CLI provides a second verification layer:
- **`/review`** — Copilot's built-in `code-review` agent analyses changes directly in the terminal, without a browser tab
- **Custom agents** — `.agent.md` files in `.github/agents/` package specialist security expertise that any developer can invoke by name, reducing dependency on dedicated security team members

---

## Step 1 — Start Copilot CLI

Navigate to `securetrails-vulnerable/` and start an interactive session:

```bash
cd securetrails-vulnerable
copilot
```

Confirm you trust the directory. Authenticate with `/login` if prompted.

---

## Step 2 — Run the Agentic Code Review

In the interactive session, type:

```
/review
```

Or focus the review on security by entering a plain-language prompt:

```
Verify that all SQL injection vectors in app.py are fixed — check for f-strings in execute() calls — the admin route has a role check, and error handlers do not leak internal details
```

Approve any `git diff` or file-read commands Copilot proposes using the arrow keys → **Yes** → Enter.

Read the feedback. For any issue flagged:
1. Note the file and line
2. Fix it in VS Code (`Ctrl+I`)
3. Re-run `/review` to confirm it's cleared

---

## Step 3 — Validate Remaining Vulnerabilities via CLI

Continue in the same session with a plain-language prompt:

```
Check static/js/app.js for: eval() usage, innerHTML with untrusted data, sensitive data in console.log, and missing CSRF tokens on fetch() calls
```

---

## Step 4 — Create the SQL Injection Remediation Agent

In the Copilot CLI session, type `/agent` and select **Create new agent**. Fill in the fields as prompted:

- **Name**: `sql-injection-fix`
- **Description**: `Guides developers to detect and remediate SQL injection vulnerabilities in Flask + SQLite applications using parameterized queries.`
- **Tools**: enable file read access

When prompted for the agent's instructions, paste:

```
You are a SQL injection remediation expert for Flask + SQLite applications.
When invoked:
1. Explain the vulnerability in plain language
2. Provide step-by-step fix instructions using parameterized queries (? placeholder)
3. Show a before/after code example using the login() function pattern
4. Explain how to test the fix with a curl injection payload
5. List common mistakes to avoid
```

Save the agent. Confirm `.github/agents/sql-injection-fix.agent.md` was created.

---

## Step 5 — Create the OWASP Security Review Agent

In the CLI session, type `/agent` again and select **Create new agent**. Fill in the fields:

- **Name**: `owasp-review`
- **Description**: `Performs an OWASP Top 10 2021 code review of Python Flask applications, reporting findings as a structured table.`
- **Tools**: enable file read access

When prompted for the agent's instructions, paste:

```
You are an OWASP Top 10 2021 code reviewer for Python Flask applications.
When invoked:
1. Apply the OWASP Top 10 2021 checklist
2. Focus on: A01 Broken Access Control, A02 Cryptographic Failures, A03 Injection, A05 Security Misconfiguration
3. Look for Flask/Python-specific patterns: f-strings in execute(), missing session checks, hardcoded secrets, autoescape disabled, CORS wildcard, debug mode enabled
4. Report findings as a table: Finding | OWASP Category | Severity | Recommended Fix
```

Save the agent.

---

## Step 6 — Test the OWASP Agent

In Copilot CLI, invoke the new agent:

```
/agent
```

Select `owasp-review` from the list. Then prompt:

```
Review app.py using the OWASP checklist. Focus on A03 Injection and A01 Broken Access Control. Report any remaining issues.
```

Verify the agent responds with OWASP-categorised output specific to SecureTrails.

---

## Step 7 — Commit the Agents

```bash
git add .github/agents/
git commit -m "feat: add OWASP review and SQL injection remediation agents"
git push
```

---

## Verify

- [ ] Copilot CLI `/review` ran and reported on `app.py` changes
- [ ] `/review` confirmed no remaining SQL injection f-strings
- [ ] `.github/agents/sql-injection-fix.agent.md` created with before/after example
- [ ] `.github/agents/owasp-review.agent.md` created with OWASP checklist
- [ ] Invoking the OWASP agent returns SecureTrails-specific, categorised findings
- [ ] Agents committed and pushed

---

## Key Takeaway

> CLI `/review` verifies fixes without leaving the terminal; custom `.agent.md` files turn one-time security expertise into a reusable, committable team asset that any developer can invoke.

---

> You have completed the **Mandatory Track**.  
> Continue with any Optional exercises based on time and interest.

**Next**: [Exercise 06 — CLI Interactive Analysis](exercise-06-optional-cli-analysis.md)
