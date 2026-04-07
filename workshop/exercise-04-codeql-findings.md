# Exercise 04 — Review CodeQL Findings & Autofix

**Duration**: 10 minutes
**Copilot Feature**: Copilot Autofix (GHAS)
**Goal**: Read CodeQL scan results, understand each finding, and use Copilot Autofix to generate a patch for one vulnerability.

---

## Background

CodeQL performs semantic code analysis — it understands data flow, not just text patterns. It finds vulnerabilities like SQL injection even when the tainted data travels through multiple functions before reaching a dangerous sink. Copilot Autofix extends CodeQL by generating a ready-to-apply code patch directly on the alert page.

---

## Step 1 — Open Code Scanning Alerts

In GitHub, go to **Security → Code scanning alerts**. You will see a list like:

| Alert | Severity | File |
|-------|----------|------|
| SQL injection | Critical | app.py |
| Cross-site scripting | High | templates/trails.html |
| Weak password hashing | Medium | app.py |

Click on the **SQL injection** alert to open its detail view.

---

## Step 2 — Read the Finding Detail

On the alert page, review:
- **Rule**: The CWE or rule ID
- **Location**: Exact file and line
- **Data flow path**: How user input reaches the dangerous sink

Copy the alert description text, then paste into Copilot Chat:

```
Here is a CodeQL finding from our SecureTrails app: [paste alert description].
Explain in plain English what an attacker could do with this vulnerability and what the correct fix pattern is.
```

---

## Step 3 — Use Copilot Autofix

On the same alert page, click **Generate fix**. Copilot Autofix will:

1. Propose a code patch
2. Show a diff of before/after changes
3. Explain why the fix is safe

Review the diff. If it looks correct, click **Commit fix** to apply it directly.

> **Tip**: Do NOT accept a fix blindly. Read the diff and confirm it does not break any intentional logic.

---

## Step 4 — Check Remaining Alerts

Scan through the remaining Code scanning alerts and note:

- How many are Critical vs High vs Medium?
- Which files appear most often?

In Copilot Chat, paste:

```
I have CodeQL alerts for SQL injection, XSS, and weak password hashing in a Flask app. Rank these by real-world exploitability and suggest which to fix first.
```

---

## Verify

- [ ] Code scanning alerts page shows at least 2 findings
- [ ] You opened and read the SQL injection alert detail
- [ ] Copilot Autofix generated a patch for at least one alert
- [ ] You can explain what "data flow analysis" means vs pattern matching

---

## Key Takeaway

> CodeQL finds vulnerabilities that pattern-matching tools miss; Copilot Autofix closes the loop by delivering a reviewable patch on the same page.

---

**Next**: [Exercise 05 — Review Secret Scanning & Dependabot](exercise-05-secrets-dependabot.md)
