# Exercise 10 (Optional) — Issue Creation from CLI

**Duration**: 10 min  
**Copilot Feature**: Copilot Chat + GitHub Issues MCP  
**Goal**: Use Copilot CLI and the GitHub Issues MCP server to turn vulnerability findings into tracked GitHub Issues without leaving the terminal.

---

## Background

Vulnerability findings discovered in Exercises 02–04 are only useful if they are tracked, assigned, and closed. This exercise closes the loop by using Copilot Chat combined with the GitHub MCP server to draft well-structured security issues from your analysis — directly from the IDE, with no copy-pasting into a browser.

The GitHub Issues MCP server exposes `create_issue`, `list_issues_for_repo`, and `get_issue` as tools Copilot can call. Copilot reads your vulnerability context and generates issue titles, bodies, labels, and severity metadata automatically.

> **Note**: Requires a GitHub-hosted repository and `gh auth login` completed. Works best after Exercise 03 or 04 so you have real findings to track.

---

## Step 1 — Confirm GitHub MCP is Available

In VS Code, open Copilot Chat (`Ctrl+Alt+I`) and type:

```
What MCP tools are available for GitHub Issues? List the tool names and what each one does.
```

> **Tip**: If no GitHub MCP tools appear, ensure the GitHub MCP server is configured in your VS Code settings under `github.copilot.chat.mcp.servers`. See the [GitHub MCP server setup guide](https://github.com/github/github-mcp-server) for configuration steps.

---

## Step 2 — Generate Issues for SQL Injection Findings

In Copilot Chat with `#app.py` attached, copy and paste the following prompt:

```
Using the GitHub Issues MCP tool, create three separate GitHub Issues — one for each SQL injection vulnerability in app.py:
1. login() function — f-string query (line 30)
2. view_trail() function — f-string query (line 55)
3. search() function — f-string query (line 132)

For each issue use:
- Title: [Security][SQLi] <function name> — SQL injection via f-string query
- Body: include the vulnerable line of code, OWASP classification (A03:2021), CVSS severity (Critical), steps to reproduce with a curl payload, and the parameterized query fix
- Labels: security, sql-injection, critical
```

Review each draft before confirming creation. Approve each with **Yes** when prompted.

---

## Step 3 — Create an Issue for Broken Authentication

Copy and paste the following prompt:

```
Using the GitHub Issues MCP tool, create a GitHub Issue for the broken access control vulnerability in the /admin route of app.py.

Title: [Security][A01] /admin route — no role check, IDOR via URL parameter
Body: describe that any user can access the admin panel by passing ?user_id= in the URL, state OWASP A01:2021, list the session role check fix, and mention CVSS High.
Labels: security, broken-access-control, high
```

> **Note**: Create this issue even if you have already fixed the route — it documents the finding for audit trail purposes.

---

## Step 4 — List and Verify Created Issues

Copy and paste the following prompt:

```
Using the GitHub Issues MCP list_issues_for_repo tool, list all open issues in this repository with the label 'security'. Show: issue number | title | labels | created date.
```

Confirm all issues from Steps 2–3 appear in the list.

---

## Step 5 — Link Issues to a Fix Commit

After completing any fix exercise (03 or 04), commit with a closing reference:

```bash
git commit -m "fix(security): parameterized queries (SQLi x3) — closes #<issue-number>"
git push
```

Replace `<issue-number>` with the actual issue numbers from Step 4. GitHub will automatically close the linked issues when the commit is merged to the default branch.

---

## Verify

- [ ] GitHub Issues MCP tools are listed and available in Copilot Chat
- [ ] Three SQL injection issues created with correct titles, labels, and OWASP metadata
- [ ] Broken authentication issue created
- [ ] `list_issues` returned all four security issues
- [ ] At least one commit message references an issue number with `closes #N`

---

## Key Takeaway

> Copilot Chat + GitHub Issues MCP converts vulnerability findings into tracked, labelled, assignable work items in a single prompt — no browser, no manual copy-paste, no lost context.

---

> You have completed all workshop exercises. Return to the [Workshop Map](../README.md) for a summary of what you covered.
