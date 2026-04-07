# Exercise 06 — Copilot CLI Interactive Analysis

**Duration**: 10 minutes
**Copilot Feature**: Copilot CLI (Interactive Mode)
**Goal**: Use Copilot CLI's interactive shell to perform a conversational deep-dive on the vulnerabilities GHAS detected.

---

## Background

GHAS tells you *what* was found. Copilot CLI tells you *why it matters* and *how to fix it* — through a multi-turn conversation. Unlike one-shot prompts, the interactive shell lets you ask follow-up questions, explore trade-offs, and get architecture-specific guidance. This exercise drills into the SQL injection finding from Exercise 04.

---

## Step 1 — Launch Copilot CLI

Open a terminal and start the interactive session:

```bash
npx @github/copilot -i "I am reviewing a Flask web application called SecureTrails.
GitHub CodeQL found a SQL injection vulnerability in app.py.
User input from request.args is concatenated directly into a SQL query string.
Tell me: (1) how an attacker would exploit this, (2) the exact fix pattern for Flask + SQLite, and (3) how to write a test that proves the fix works."
```

---

## Step 2 — Follow Up on Fix Trade-offs

Within the same session, continue:

```
What is the difference between using parameterized queries vs using an ORM like SQLAlchemy for this fix?
Which should we use for a small team with an existing codebase and why?
```

---

## Step 3 — Expand to Auth Vulnerability

Continue in the same session:

```
GHAS also flagged that our DELETE /booking/<id> endpoint does not verify that the logged-in user owns the booking.
A user can delete anyone's booking by changing the URL parameter.
What is this vulnerability called, what is its OWASP category, and what is the Flask pattern to fix it?
```

---

## Step 4 — Generate a Remediation Summary

Continue in the same session:

```
Summarise all three vulnerabilities we discussed (SQL injection, broken object-level authorisation, weak hashing) in a table with columns: Vulnerability | OWASP category | Severity | Fix pattern | Estimated fix time.
```

Copy the table output — you will use it in the next exercise.

---

## Verify

- [ ] Copilot CLI interactive session started successfully
- [ ] Copilot explained how SQL injection is exploited step by step
- [ ] Copilot recommended parameterized queries with a code example
- [ ] Copilot named the auth issue as BOLA/IDOR and gave a Flask fix pattern
- [ ] You have a remediation summary table

---

## Key Takeaway

> Copilot CLI's interactive mode gives you a security consultant in your terminal — multi-turn, context-aware, and specific to your stack.

---

**Next**: [Exercise 07 — Create GitHub Issues from Findings](exercise-07-create-issues.md)
