# Exercise 15 — Update Vulnerable Dependencies

**Duration**: 5 minutes
**Copilot Feature**: Copilot Chat + Dependabot
**Goal**: Use Dependabot's automated pull requests to upgrade vulnerable packages and let Copilot explain the CVEs.

---

## Background

Vulnerable dependencies (OWASP A06:2021) are often the easiest category to fix — the upstream package already has a patched version. Dependabot creates pull requests that update your `requirements.txt` to a safe version. Copilot explains what each CVE means and whether the upgrade could break anything.

---

## Step 1 — Open Dependabot Pull Requests

Navigate to **Security → Dependabot** in GitHub. Click **Create Dependabot security updates** if no PRs exist yet, or find the auto-generated PRs in the **Pull requests** tab.

You should see PRs for Flask, requests, and SQLAlchemy.

---

## Step 2 — Ask Copilot About Each CVE

Open the Dependabot PR for Flask. In Copilot Chat, paste:

```
The Flask version in our requirements.txt has a Dependabot alert.
Explain what the CVE is, what an attacker could do with it, and whether upgrading to the patched version is likely to introduce any breaking changes for a small Flask application.
```

Repeat for the requests and SQLAlchemy PRs.

---

## Step 3 — Merge the Safe Updates

For each Dependabot PR where Copilot confirms the upgrade is safe:

1. Review the diff (only `requirements.txt` should change)
2. Click **Merge pull request**

For any upgrade Copilot flags as potentially breaking, add a comment on the PR:

```bash
gh pr comment <pr-number> --body "Needs compatibility review before merge — see Copilot analysis."
```

---

## Step 4 — Verify Dependabot Alerts Clear

After merging, navigate to **Security → Dependabot alerts**. Fixed alerts should show status **Fixed**.

---

## Verify

- [ ] You reviewed at least 2 Dependabot PRs
- [ ] Copilot explained the CVE for each alert
- [ ] At least one Dependabot PR merged successfully
- [ ] `requirements.txt` contains updated package versions
- [ ] Dependabot alert count decreased after merge

---

## Key Takeaway

> Dependabot automates the detection and the fix PR — Copilot tells you if it's safe to merge, removing the last barrier to acting on dependency vulnerabilities.
