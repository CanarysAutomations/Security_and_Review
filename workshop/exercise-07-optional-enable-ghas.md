# Exercise 07 (Optional) — Enable GitHub Advanced Security (GHAS)

**Duration**: 10 min  
**Copilot Feature**: GitHub Native Security  
**Goal**: Enable CodeQL, Secret Scanning, and Dependabot on your fork so automated scans run on every push, and use Copilot Chat to explain a live alert in plain language.

---

## Background

GitHub Advanced Security (GHAS) provides always-on static analysis via CodeQL, credential detection via secret scanning, and dependency vulnerability tracking via Dependabot — all running automatically on every push. This exercise sets it up so Exercises 08–09 have real alert data to work with.

> **Requires**: Repository admin access on a GitHub-hosted fork.

---

## Step 1 — Fork the Repository

If you haven't forked yet, push the local `securetrails-vulnerable/` code to a new public GitHub repository, or fork [CanarysAutomations/Security_and_Review](https://github.com/CanarysAutomations/Security_and_Review). If the link is unavailable, create a new public repository on GitHub and push your local clone to it.

---

## Step 2 — Enable GHAS

In your repository on GitHub → **Settings → Security → Code security and analysis**:
- Enable **CodeQL analysis** → Set up → Default
- Enable **Secret scanning** (toggle On)
- Enable **Dependabot alerts** (toggle On)
- Enable **Dependabot security updates** (toggle On)

---

## Step 3 — Trigger a Scan

```bash
git commit --allow-empty -m "chore: trigger CodeQL scan"
git push
```

Navigate to **Security → Code scanning** and wait 5–10 minutes.

---

## Step 4 — Explain an Alert with Copilot Chat

When an alert appears, click it. In Copilot Chat:

```
I am looking at a CodeQL alert for SQL injection in app.py. Explain what this vulnerability is, how an attacker exploits it in a trail search form, and what the fix is.
```

---

## Verify

- [ ] CodeQL enabled and at least one alert visible
- [ ] Secret scanning enabled
- [ ] Dependabot enabled
- [ ] Copilot explained a CodeQL alert in plain language

---

## Key Takeaway

> GHAS turns every push into a security gate — CodeQL, secret scanning, and Dependabot run automatically so vulnerabilities are caught before they reach production.

---

**Next**: [Exercise 08 — Review CodeQL Findings & Autofix](exercise-08-optional-codeql.md)
