# Exercise 14 — Fix Hardcoded Secrets

**Duration**: 5 minutes
**Copilot Feature**: Copilot Agent + Copilot Chat
**Goal**: Move all hardcoded credentials from `config.py` to environment variables and prevent future secret commits with push protection.

---

## Background

Secrets committed to version control are often exposed to everyone with repo access — and in git history even after deletion. The fix is to move credentials to environment variables loaded at runtime, never hardcoded in source. GHAS push protection then blocks future accidental commits before they land in the repository.

---

## Step 1 — Find All Hardcoded Secrets

Open Copilot Chat with `#config.py` attached. Paste:

```
Identify every hardcoded secret, password, token, or key in config.py.
For each one, tell me: the variable name, what it is (DB password, secret key, etc.), and the correct os.environ.get() replacement with a safe default.
```

---

## Step 2 — Replace with Environment Variables

Press `Ctrl+I` on `config.py` and paste:

```
Replace every hardcoded secret value with os.environ.get('VARIABLE_NAME', '').
Add import os at the top if not present.
Do not change any variable names — only replace the hardcoded string values.
```

Review and accept the diff.

---

## Step 3 — Create a `.env.example` File

In Copilot Chat, paste:

```
Based on the secrets we just moved to environment variables in config.py, generate a .env.example file that lists all required environment variable names with placeholder values.
This file is safe to commit — it shows developers what variables to set without exposing real values.
```

Save the output as `.env.example` at the repository root and add `.env` to `.gitignore`.

---

## Step 4 — Commit

```bash
echo ".env" >> .gitignore
git add config.py .env.example .gitignore
git commit -m "fix(security): move hardcoded secrets to environment variables"
git push
```

---

## Verify

- [ ] `config.py` contains no hardcoded string literals for passwords or keys
- [ ] All secret values are loaded via `os.environ.get()`
- [ ] `.env.example` committed with placeholder values
- [ ] `.env` is listed in `.gitignore`
- [ ] GHAS Secret scanning alert clears after push

---

## Key Takeaway

> Moving secrets to environment variables takes five minutes with Copilot and permanently removes the most common cause of credential exposure.
