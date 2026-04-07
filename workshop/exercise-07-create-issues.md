# Exercise 07 — Create GitHub Issues from Findings

**Duration**: 5 minutes
**Copilot Feature**: Copilot CLI + GitHub MCP
**Goal**: Use Copilot CLI to create well-formed GitHub issues for each critical vulnerability, linked to the owning developer.

---

## Background

Security findings have no value until a developer is assigned to fix them. GitHub Issues are the handoff mechanism between detection (GHAS / Copilot CLI) and remediation. Copilot CLI can create issues directly through GitHub's MCP integration — including title, labels, body, and assignee — without leaving the terminal.

---

## Step 1 — Create Issue for SQL Injection

Open a terminal and paste:

```bash
npx @github/copilot -i "Create a GitHub issue in repository Hemavathi15sg/securetrails-workshop with:
- Title: fix(security): SQL Injection — parameterize database queries in app.py
- Labels: security, critical, bug
- Body: Include the vulnerability location (app.py, search_trails function), the attack scenario, the required fix (parameterized queries), and a checklist of done criteria."
```

Note the issue number returned (e.g., `#12`).

---

## Step 2 — Create Issue for Broken Authentication

```bash
npx @github/copilot -i "Create a GitHub issue in repository Hemavathi15sg/securetrails-workshop with:
- Title: fix(security): Broken Object-Level Auth — verify ownership in booking endpoints
- Labels: security, critical, bug
- Body: Include the vulnerable endpoint (DELETE /booking/<id>), the attack scenario (user can delete any booking by changing the URL), and the required fix (check session user_id matches booking owner)."
```

---

## Step 3 — Create Issue for Hardcoded Secrets

```bash
npx @github/copilot -i "Create a GitHub issue in repository Hemavathi15sg/securetrails-workshop with:
- Title: fix(security): Hardcoded secrets — move credentials to environment variables
- Labels: security, critical
- Body: List config.py as location, describe the risk of credentials in version control, and list the fix steps: move to .env, add .env to .gitignore, read via os.environ."
```

---

## Verify

- [ ] Three issues created with labels `security` and `critical`
- [ ] Each issue has a clear vulnerability description and fix checklist
- [ ] Issues appear in the repository Issues tab with correct labels
- [ ] You can navigate to each issue by its URL

---

## Key Takeaway

> Copilot CLI can translate raw security findings into developer-ready GitHub issues in seconds, bridging the gap between detection and remediation.

---

**Next**: [Exercise 08 — Create Custom Security Agents](exercise-08-custom-agents.md)
