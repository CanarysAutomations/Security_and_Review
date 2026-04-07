# Exercise 12 — Verify Fixes & Complete the Cycle

**Duration**: 5 minutes
**Copilot Feature**: Copilot Chat + GHAS
**Goal**: Confirm that GHAS clears the fixed alerts, close the resolved issues, and understand the full detection-to-fix cycle.

---

## Background

Security work is only complete when the detection tool confirms the fix. GHAS rescans automatically on every push. This final mandatory exercise closes the loop: check alert status, close resolved issues, and use Copilot to generate a summary of what was accomplished — a deliverable you can share with stakeholders.

---

## Step 1 — Check GHAS Alert Status

Navigate to **Security → Code scanning alerts** in GitHub.

Alerts for SQL injection and auth issues should show status **Fixed** (or still **Open** if the scan hasn't completed yet — wait 5 minutes and refresh).

---

## Step 2 — Close Resolved Issues

For each issue created in Exercise 07 that is now fixed, run:

```bash
gh issue close <issue-number> \
  --comment "Fixed in commit $(git rev-parse --short HEAD). GHAS alert confirmed resolved."
```

Or use Copilot CLI:

```bash
npx @github/copilot -i "List all open GitHub issues in repository Hemavathi15sg/securetrails-workshop with the label 'security'. For any that have been fixed (SQL injection, authentication), close them with a comment referencing the fix commit."
```

---

## Step 3 — Generate a Stakeholder Summary

In Copilot Chat, paste:

```
Based on this workshop, write a one-page security remediation summary for a non-technical stakeholder.
Include: what vulnerabilities were found, what tools detected them, what was fixed, and what automated guardrails are now in place.
Keep it under 200 words.
```

---

## Step 4 — Review What Was Built

In Copilot Chat, paste:

```
Summarise the end-to-end security pipeline we built for SecureTrails in this workshop.
List each layer (GHAS, Copilot CLI, Custom Agents, GitHub Actions) and what role it plays.
Which layer catches which type of problem?
```

---

## Verify

- [ ] CodeQL SQL injection alert shows status Fixed
- [ ] All resolved GitHub issues are closed with a fix comment
- [ ] Copilot generated a stakeholder summary
- [ ] You can describe all four security layers and their roles

---

## Key Takeaway

> The detection-to-fix cycle is complete when GHAS confirms the alert is resolved — Copilot accelerates every step from discovery through remediation to sign-off.

---

> You have completed the **Mandatory Track**. Continue with any Optional exercises below based on time and interest.

**Optional**: [Exercise 13 — Fix XSS Vulnerabilities](exercise-13-fix-xss.md)
