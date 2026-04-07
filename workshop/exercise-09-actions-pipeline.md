# Exercise 09 — GitHub Actions Security Pipeline

**Duration**: 10 minutes
**Copilot Feature**: Copilot Agent (Agent Mode)
**Goal**: Use Copilot to generate a GitHub Actions workflow that automates GHAS result checking and issue creation on every push.

---

## Background

GitHub Actions closes the last mile of the security loop: it reads GHAS findings after each push, creates or updates issues linked to the relevant agent guides, and blocks pull request merges when critical vulnerabilities are present. Using Copilot in Agent Mode, you generate the complete workflow file without writing YAML by hand.

---

## Step 1 — Ask Copilot to Design the Workflow

Open Copilot Chat (`Ctrl+Alt+I`) in Agent Mode and paste:

```
Create a GitHub Actions workflow file at .github/workflows/security-pipeline.yml that:
1. Triggers on push to main and on pull_request targeting main
2. Waits for CodeQL results, then queries the GitHub Code Scanning API for open alerts
3. For each CRITICAL alert, creates a GitHub issue linking to the matching agent guide in .github/agents/
4. Fails the workflow (exit 1) if any CRITICAL alert is found, blocking the PR merge
5. Uses GITHUB_TOKEN for authentication — no secrets required
```

---

## Step 2 — Review and Save the Generated Workflow

Copilot will generate a `.yml` file. Review it for:
- Correct `on:` triggers
- `permissions: security-events: read` and `issues: write`
- The API call to `/repos/{owner}/{repo}/code-scanning/alerts?severity=critical&state=open`
- The `gh issue create` command with agent guide link in the body

Save the file to `.github/workflows/security-pipeline.yml`.

---

## Step 3 — Commit and Trigger the Workflow

```bash
git add .github/workflows/security-pipeline.yml
git commit -m "feat: add automated security pipeline workflow"
git push
```

Navigate to **Actions** tab in GitHub and watch the workflow run.

---

## Step 4 — Verify Pipeline Behaviour

In Copilot Chat, paste:

```
Our security pipeline workflow just ran and found 2 critical alerts. It should have created issues and failed the build. 
Looking at .github/workflows/security-pipeline.yml, explain what each job step does and confirm the workflow is correctly blocking merges.
```

---

## Verify

- [ ] `.github/workflows/security-pipeline.yml` exists and is committed
- [ ] Workflow triggered on push and completed (pass or fail)
- [ ] Workflow output shows GHAS alerts were queried
- [ ] At least one issue was created or updated by the workflow
- [ ] Pull request status check shows the security pipeline result

---

## Key Takeaway

> A Copilot-generated GitHub Actions pipeline turns GHAS from a reporting tool into an enforcement gate — vulnerabilities block merges automatically.

---

**Next**: [Exercise 10 — Fix SQL Injection with Copilot](exercise-10-fix-sql-injection.md)
