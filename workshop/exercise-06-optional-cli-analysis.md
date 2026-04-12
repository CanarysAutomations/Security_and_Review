# Exercise 06 (Optional) — CLI Interactive Security Analysis

**Duration**: 10 min  
**Copilot Feature**: Copilot CLI (interactive mode)  
**Goal**: Use Copilot CLI's multi-turn interactive session to understand the *why* behind vulnerabilities — attack scenarios, fix trade-offs, and remediation patterns — as a conversational deep-dive.

---

## Background

CLI interactive mode gives you a security consultant in your terminal. Unlike one-shot prompts, the session maintains context across turns so you can ask follow-up questions about the same vulnerability.

> **Note**: Complete this if you want deeper conceptual understanding beyond the fixing exercises. It is not required for the Mandatory Track.

---

## Step 1 — Start an Interactive Session

```bash
cd securetrails-vulnerable
copilot 
```

---

## Step 2 — Deep-dive: SQL Injection Exploitation & Fix

```
I am reviewing a Flask web application. There is a SQL injection in the login() function where an f-string is used directly in execute().
Explain: (1) how an attacker would exploit this with a classic bypass payload, (2) the exact fix using ? parameterized queries for SQLite, (3) why an ORM is a structural alternative.
```

---

## Step 3 — Explore the Auth Issue

```
The /admin route accepts ?user_id= from the URL and renders the admin panel without checking if the session user has the admin role.
What is this called (BOLA/IDOR/Broken Auth), what OWASP category is it, and what is the minimal Flask fix?
```

---

## Step 4 — Generate a Remediation Table

```
Summarise the vulnerabilities in SecureTrails in a table:
Vulnerability | OWASP category | Severity | Fix pattern
```

> **Note**: Treat any time or effort estimates provided by Copilot as rough guidance only.

Exit the session: `Ctrl+C`

---

## Verify

- [ ] Copilot explained SQL injection exploitation step by step
- [ ] Copilot recommended parameterized queries with a code example
- [ ] Copilot named the auth issue and its OWASP category
- [ ] You have a remediation summary table

---

## Key Takeaway

> Copilot CLI interactive mode acts as a security consultant in your terminal — multi-turn context lets you drill into exploitation scenarios, trade-offs, and remediation patterns without switching tools.

---

> You have completed this optional exercise. Return to the [Workshop Map](../README.md) to pick your next exercise.
