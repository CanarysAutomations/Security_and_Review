# Exercise 09 (Optional) — Update Vulnerable Dependencies

**Duration**: 5 min  
**Copilot Feature**: Copilot Chat + Dependabot  
**Goal**: Use Copilot to explain CVEs in pinned packages and determine safe upgrade paths.

---

## Background

`requirements.txt` includes old versions of Flask, Werkzeug, Jinja2, requests, SQLAlchemy, MarkupSafe, click, itsdangerous, and Flask-CORS — all with known CVEs. 

---

## Step 1 — Identify Vulnerable Packages

In Copilot Chat with `#requirements.txt` attached:

```
Review requirements.txt. For each pinned package version, check for known CVEs.
List: package | pinned version | CVE (if any) | recommended safe version | breaking change risk (Low/Medium/High).
```

---

## Step 2 — Ask Copilot About Breaking Changes

For each flagged package, repeat this prompt substituting the package name and version Dependabot or Step 1 identified:

```
Explain the CVE for [package name] [pinned version]. What can an attacker do, and will upgrading to [recommended safe version] introduce breaking changes in a small SQLite-backed Flask app with no blueprints?
```

---

## Step 3 — Review and Merge Dependabot PRs (if GHAS enabled)

If Dependabot PRs exist in your repo:
1. Review the diff (only `requirements.txt` should change)
2. Click **Merge pull request** for packages Copilot confirmed safe

Otherwise, in Copilot Chat with `#requirements.txt` attached, paste:

```
Generate an updated requirements.txt replacing all vulnerable package versions with the latest stable versions compatible with Flask 3.0. List any packages where an upgrade would introduce breaking changes.
```

Apply the output to `requirements.txt` and push.

---

## Verify

- [ ] Copilot explained at least 2 CVEs for pinned packages
- [ ] `requirements.txt` updated to safe versions
- [ ] Copilot confirmed no breaking changes for the updated packages

---

## Key Takeaway

> Copilot explains CVEs in plain language and assesses breaking-change risk — turning dependency upgrades from a guessing game into an informed, guided decision.

---

**Next**: [Exercise 10 — Issue Creation from CLI](exercise-10-optional-issue-creation.md)
