# Exercise 08 — Create Custom Security Agents

**Duration**: 10 minutes
**Copilot Feature**: Copilot Custom Agents (`.github/agents/`)
**Goal**: Create two custom `.agent.md` files that guide developers through specific vulnerability remediations.

---

## Background

A Copilot custom agent is a reusable instruction set stored as a `.agent.md` file in `.github/agents/`. When a developer opens one, Copilot provides context-aware, opinionated guidance scoped to that agent's purpose. For security, this means each vulnerability class gets its own expert guide that any developer can invoke without needing to know the full security context.

---

## Step 1 — Create the SQL Injection Remediation Agent

In Copilot CLI, paste:

```bash
npx @github/copilot -i "Create a custom Copilot agent file for SQL injection remediation in our Flask + SQLite app.
The agent should be saved as .github/agents/sql-injection-fix.agent.md and include:
- A description of the vulnerability in SecureTrails context
- Step-by-step fix instructions using parameterized queries
- A before/after code example specific to the search_trails function in app.py
- How to test the fix using curl with injection payloads
- Common mistakes to avoid"
```

Confirm the file was created at `.github/agents/sql-injection-fix.agent.md`.

---

## Step 2 — Create the Auth Fix Agent

```bash
npx @github/copilot -i "Create a custom Copilot agent file for broken object-level authorisation in our Flask app.
Save it as .github/agents/auth-fix.agent.md and include:
- Explanation of BOLA (Broken Object-Level Authorisation) in plain language
- Flask decorator pattern to check session user_id matches resource owner_id
- Before/after code example for the DELETE /booking/<id> endpoint
- Test cases: verify that user A cannot delete user B's booking"
```

---

## Step 3 — Select and Test the SQL Agent

In Copilot CLI, activate the agent:

```bash
npx @github/copilot -i "Use the agent at .github/agents/sql-injection-fix.agent.md.
I am fixing app.py line 47. Walk me through the exact steps."
```

Confirm the agent responds with guidance that references SecureTrails-specific details.

---

## Step 4 — Commit the Agents

```bash
git add .github/agents/
git commit -m "feat: add security remediation agents for SQL injection and auth"
git push
```

---

## Verify

- [ ] `.github/agents/sql-injection-fix.agent.md` exists in the repository
- [ ] `.github/agents/auth-fix.agent.md` exists in the repository
- [ ] The SQL agent includes a before/after code example
- [ ] Activating the agent in Copilot CLI returns SecureTrails-specific guidance

---

## Key Takeaway

> Custom agents turn specialist security knowledge into a reusable, committable asset — any developer can follow expert guidance without escalating to the security team.

---

**Next**: [Exercise 09 — GitHub Actions Security Pipeline](exercise-09-actions-pipeline.md)
