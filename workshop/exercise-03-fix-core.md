# Exercise 03 — Fix Core Vulnerabilities (SQL Injection + Auth + IDOR)

**Duration**: 15 min  
**Copilot Feature**: Copilot Agent (Inline `Ctrl+I`) · Copilot Chat  
**Goal**: Use Copilot to fix the three most critical vulnerability classes in `app.py` — SQL injection (3 locations), broken authentication, IDOR, and raw error disclosure — using prompt-driven inline edits.

---

## Background

These are the most dangerous vulnerabilities in SecureTrails:
- **SQL Injection** (OWASP A03) — user input is directly concatenated into SQL strings at `app.py` lines 30, 52, 132. Fix: parameterized queries.
- **Broken Authentication** (OWASP A01) — the `/admin` route accepts any URL parameter as `user_id` with no role check (lines 43–46). Fix: session role validation.
- **IDOR** (OWASP A01) — `/trail/<trail_id>` has no ownership check and a second SQL injection (line 52). Fix: parameterized query + auth check.

---

## Step 1 — Find All SQL Injection Points

Open `app.py` in VS Code. In Copilot Chat with `#app.py` attached (`Ctrl+Alt+I`), paste:

```
Find every place in app.py where user input from request.args, request.form, or URL parameters is used directly in a SQL query string using f-strings or string concatenation.
List each as: function name | line number | the vulnerable line of code.
```

Expected findings: `login()` line 30, `view_trail()` line 52, `search()` line 132.

---

## Step 2 — Fix All SQL Injections at Once

Select the entire contents of `app.py`. Press `Ctrl+I` to open Copilot Inline Edit, then paste:

```
Replace every SQL query that uses f-strings or string concatenation with user input.
Use parameterized queries — the ? placeholder for SQLite, passing user input as a separate tuple to execute().
Fix all three locations: login(), view_trail(), and search().
Do not change anything else.
```

Review the diff. Accept all changes.

---

## Step 3 — Fix Broken Authentication on `/admin`

In Copilot Chat with `#app.py`, paste:

```
The /admin route accepts any user_id from the URL without checking if the current session user has the 'admin' role.
Rewrite the admin() function so it:
1. Requires session['user_id'] to exist (redirect to /login if not)
2. Checks that session.get('role') == 'admin' (return 403 if not)
3. Uses session['user_id'] instead of the URL parameter
Show the corrected function.
```

Apply the suggested code with `Ctrl+I` on the `admin()` function.

---

## Step 4 — Fix IDOR on `/trail/<trail_id>`

In Copilot Chat with `#app.py`, paste:

```
The view_trail() function uses the trail_id URL parameter directly in a SQL f-string.
Rewrite it to:
1. Use a parameterized query with ? placeholder
2. Require session['user_id'] to be set before serving trail data
Return 403 if not authenticated.
```

Apply with `Ctrl+I`.

---

## Step 5 — Suppress Raw Error Disclosure

In Copilot Chat with `#app.py`, paste:

```
The except block in login() swallows the exception with no logging.
Replace it so it:
1. Logs the exception using Python's logging module (WARNING level)
2. Returns a generic error message to the user without any internal detail
Show the corrected block.
```

Apply with `Ctrl+I`.

---

## Step 6 — Run a Final Check

In Copilot Chat with `#app.py`, paste:

```
Review the updated app.py. Confirm:
1. No f-strings or string concatenation remain inside execute() calls with user input
2. The /admin route checks session role
3. The /trail/<id> route requires authentication
List any remaining issues.
```

Commit:

```bash
git add app.py
git commit -m "fix(security): parameterized queries (SQLi x3), admin role check, IDOR auth"
git push
```

---

## Verify

- [ ] All three SQL queries in `app.py` use `?` placeholders
- [ ] `login()`, `view_trail()`, `search()` have no f-strings touching user input in SQL
- [ ] `admin()` checks `session.get('role') == 'admin'`
- [ ] `view_trail()` requires `session['user_id']`
- [ ] Exception handler logs the error and returns a generic message
- [ ] Copilot confirms no remaining SQL injection vectors

---

## Key Takeaway

> Copilot Agent applies a security fix pattern across an entire file in one step — all three SQL injection points are fixed simultaneously, eliminating the risk of missing one.

---

**Next**: [Exercise 04 — Fix Remaining Vulnerabilities](exercise-04-fix-remaining.md)
