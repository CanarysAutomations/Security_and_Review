# Exercise 03 — Enable GitHub Advanced Security

**Duration**: 10 minutes
**Copilot Feature**: GitHub Native Security (GHAS)
**Goal**: Enable CodeQL, Secret Scanning, Dependabot, and Code Quality on the SecureTrails repository.

---

## Background

GitHub Advanced Security (GHAS) is a set of built-in scanning services that run on GitHub's servers — no custom tooling required. Enabling it gives you automated detection of code vulnerabilities, hardcoded secrets, and vulnerable dependencies on every push. This exercise activates GHAS so you have real findings to work with.

---

## Step 1 — Navigate to Security Settings

In your GitHub repository, click the **Security** tab, then go to **Settings → Code Security**.

Enable the following:

- **Dependabot alerts** — ON
- **Dependabot security updates** — ON
- **Code scanning (CodeQL)** — ON (use Default setup)
- **Secret scanning** — ON
- **Push protection** — ON

> **Tip**: Push protection blocks commits that contain secrets before they ever reach the repository.

---

## Step 2 — Enable Code Quality Preview

In Settings, scroll to **Code quality (preview)** and enable it. This adds maintainability and bug-detection signals alongside security findings.

---

## Step 3 — Confirm Scanning Has Started

After enabling, navigate to **Security → Code scanning**. Within 2–5 minutes you should see the first CodeQL scan running or completed.

> **Note**: If this is a fresh fork, push any small change (e.g., add a blank line to README) to trigger the first scan.

```bash
echo "" >> README.md
git add README.md
git commit -m "chore: trigger initial GHAS scan"
git push
```

---

## Step 4 — Ask Copilot What GHAS Provides

In Copilot Chat, paste:

```
Explain what GitHub Advanced Security (GHAS) scans for automatically. What is CodeQL, what is Secret Scanning, and what is Dependabot? How are they different from running a linter?
```

---

## Verify

- [ ] Dependabot alerts are enabled
- [ ] CodeQL scanning is enabled (Default setup)
- [ ] Secret scanning and push protection are ON
- [ ] Code scanning tab shows a scan running or completed
- [ ] You can explain the difference between CodeQL and Dependabot

---

## Key Takeaway

> Enabling GHAS takes under five minutes and gives your repository continuous, automated security scanning without writing a single line of custom tooling.

---

**Next**: [Exercise 04 — Review CodeQL Findings & Autofix](exercise-04-codeql-findings.md)
