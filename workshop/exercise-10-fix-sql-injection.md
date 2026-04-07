# Exercise 10 — Fix SQL Injection with Copilot

**Duration**: 10 minutes
**Copilot Feature**: Copilot Agent (Inline)
**Goal**: Use Copilot Agent to apply parameterized queries to all SQL injection points in app.py and confirm GHAS clears the alert.

---

## Background

SQL injection is the most common critical vulnerability in web applications (OWASP A03:2021). The fix is always the same: separate SQL structure from user data using parameterized queries. Copilot Agent applies this pattern consistently across an entire file — including edge cases you might miss manually.

---

## Step 1 — Open the Vulnerable File

Open `apps/securetrails-vulnerable/app.py` in VS Code.

In Copilot Chat (`Ctrl+Alt+I`), attach the file using `#app.py` and paste:

```
Find every place in app.py where user input from request.args, request.form, or request.json is used directly in a SQL query string (f-string or + concatenation).
List each location as: function name | line (approx) | the vulnerable line of code.
```

Confirm you see at least the `search_trails` function.

---

## Step 2 — Fix with Copilot Agent

Select the entire contents of `app.py`. Press `Ctrl+I` to open Copilot Inline Edit, then paste:

```
Replace every SQL query that concatenates user input with a parameterized query.
Use the ? placeholder for SQLite. Pass user input as a separate tuple argument to execute().
Do not change anything else in the file.
```

Review the diff Copilot proposes. Accept changes.

---

## Step 3 — Verify the Fix Manually

Check that the pattern is gone. In Copilot Chat, paste:

```
Review the updated app.py. Confirm there are no remaining SQL injection vectors — no f-strings or string concatenation used inside execute() calls with user input.
```

---

## Step 4 — Commit and Push

```bash
git add apps/securetrails-vulnerable/app.py
git commit -m "fix(security): use parameterized queries to eliminate SQL injection"
git push
```

After pushing, navigate to **Security → Code scanning** and wait 5–10 minutes for GHAS to re-scan. The SQL injection alert should move to **Fixed** status.

---

## Verify

- [ ] All SQL queries in app.py use `?` placeholders
- [ ] No f-strings or string concatenation remain inside `execute()` calls
- [ ] Copilot Chat confirms no remaining SQL injection vectors
- [ ] Fix is committed and pushed
- [ ] CodeQL alert status updated to Fixed (may take 5–10 min)

---

## Key Takeaway

> Copilot Agent applies a security fix pattern consistently across an entire file — eliminating the risk of missing one vulnerable code path.

---

**Next**: [Exercise 11 — Fix Broken Authentication](exercise-11-fix-auth.md)
