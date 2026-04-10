# Exercise 08 (Optional) — Review CodeQL Findings & Autofix

**Duration**: 10 min  
**Copilot Feature**: Copilot Autofix (GHAS alert page)  
**Goal**: Use Copilot Autofix to generate one-click patches directly on GitHub CodeQL alert pages.

---

## Background

Copilot Autofix is separate from Copilot Chat. It is a GHAS-integrated fix generator that analyses a specific CodeQL alert and proposes a diff you can commit directly from the alert page. Autofix is triggered from the GitHub **Security** tab, requires a completed CodeQL scan on a GitHub-hosted repository, and produces a PR-ready diff — it is not available in VS Code or the CLI.

> **Requires**: Exercise 07 (GHAS enabled, CodeQL scan completed).

---

## Step 1 — Open a CodeQL Alert

**Security → Code scanning alerts** → click the SQL injection alert.

> **Note**: If SQL injection alerts are not visible, use any other alert that CodeQL detected, or trigger a fresh scan on a branch that still has the unfixed `app.py`.

---

## Step 2 — Generate Autofix

Click **Generate fix** on the alert page. Wait for Copilot to produce a patch diff.

---

## Step 3 — Review the Diff with Copilot Chat

Open `app.py` in VS Code. In Copilot Chat (`Ctrl+Alt+I`), attach `#app.py`, then paste:

```
Review the Autofix suggestion for the SQL injection alert. Does it correctly use ? parameterized queries? Are there any edge cases missed?
```

---

## Step 4 — Apply or Adapt

- If correct → click **Commit fix** on the alert page
- If you want to adapt → copy the code, apply via `Ctrl+I` in VS Code, push

Wait 5–10 minutes for CodeQL to rescan. Verify alert status → **Fixed**.

---

## Verify

- [ ] Autofix generated a diff
- [ ] Copilot Chat confirmed the fix is correct
- [ ] Fix committed and CodeQL alert moved to Fixed

---

## Key Takeaway

> Copilot Autofix generates a ready-to-commit patch directly on the CodeQL alert page — security fixes go from alert to merged PR without leaving GitHub.

---

**Next**: [Exercise 09 — Update Vulnerable Dependencies](exercise-09-optional-dependencies.md)
