# Exercise 02 — Explore the Vulnerable Application

**Duration**: 5 minutes
**Copilot Feature**: Copilot Chat (Explain)
**Goal**: Use Copilot to understand what SecureTrails does and identify its attack surface before scanning.

---

## Background

Before running any security tools, a security engineer reads the codebase to understand what it does. Copilot Chat's `/explain` capability lets you do this conversationally — no line-by-line reading required. This exercise maps the attack surface so later findings make sense in context.

---

## Step 1 — Understand the Application Structure

Open `apps/securetrails-vulnerable/app.py` in the editor. Then open Copilot Chat and paste:

```
Explain what this Flask application does. List every route, what data each route reads or writes, and what user inputs are accepted. Focus on anything that touches the database or renders user-supplied data.
```

---

## Step 2 — Identify the Attack Surface

In Copilot Chat, paste:

```
Based on app.py, database.py, and the templates folder, list all the places where:
1. User input is used in database queries
2. User-supplied content is rendered in HTML
3. Credentials or secrets appear in source code
4. Session or authentication checks are performed

Format each finding as: File | Line (approx) | Risk type
```

---

## Step 3 — Review the Dependencies

Open `apps/securetrails-vulnerable/requirements.txt` in the editor. Paste into Copilot Chat:

```
Review this requirements.txt. For each package, tell me the pinned version and whether that version has any known critical or high CVEs. List packages that should be updated immediately.
```

---

## Verify

- [ ] Copilot identified at least 3 routes that accept user input
- [ ] Copilot flagged at least one location where user input touches SQL
- [ ] Copilot flagged at least one outdated dependency
- [ ] You can name the two main vulnerability types present in this app

---

## Key Takeaway

> Copilot Chat turns codebase exploration into a conversation — you understand the attack surface in minutes instead of hours.

---

**Next**: [Exercise 03 — Enable GitHub Advanced Security](exercise-03-enable-ghas.md)
