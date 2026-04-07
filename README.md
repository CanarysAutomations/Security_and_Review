# Security Engineering with GitHub Copilot — Workshop

> **Audience**: Developers and security engineers who want to integrate GitHub Copilot into a real security workflow
> **Total Duration**: ~50 min mandatory + ~30 min optional (see two-track map below)
> **Pre-requisites**: VS Code with GitHub Copilot Chat extension, Python 3.9+, Git CLI, GitHub CLI, GitHub Copilot access, GitHub MCP, Mermaid extension for VS Code.

---

## What You Will Build

You will secure **SecureTrails** — a deliberately vulnerable Flask trail-booking application — using GitHub's complete security ecosystem. Every vulnerability is detected, analysed, and fixed by directing Copilot through prompts. You do not write code from scratch.

The workshop spans the full detection-to-fix cycle: GitHub Advanced Security finds the issues, Copilot CLI explains them, Custom Agents guide remediation, and GitHub Actions enforces the pipeline on every push.

**Core capabilities from [`requirement.md`](requirement.md):**

| Capability | Description |
|---|---|
| **GHAS Detection** | CodeQL, Secret Scanning, and Dependabot scan automatically on every push |
| **Copilot CLI Analysis** | Interactive multi-turn sessions explain vulnerabilities and fix patterns |
| **Custom Agents** | Reusable `.agent.md` guides scoped to each vulnerability class |
| **Actions Enforcement** | Workflow blocks PR merges when critical alerts are open |
| **Copilot Agent Fixes** | Inline edits apply secure patterns across entire files in one step |

---

## Prerequisites

- VS Code with GitHub Copilot and GitHub Copilot Chat extensions installed and signed in
- Python 3.9+ and pip
- Git 2.40+
- GitHub CLI (`gh`) v2.0+ — authenticated with `gh auth login`
- GitHub Copilot access (individual or organisation licence)
- Node.js (for `npx @github/copilot` in Exercises 06–08)

---

## Workshop Map

> **Two-Track Design**: Complete the **Mandatory Track** first (~50 min), then pick any **Optional** exercises based on time and interest.

---

### Mandatory Track (~50 minutes)

| # | Exercise | Copilot Feature | Duration |
|---|----------|----------------|----------|
| 01 | [Prerequisites & Setup](workshop/exercise-01-setup.md) | Copilot Chat | 5 min |
| 02 | [Explore the Vulnerable Application](workshop/exercise-02-explore-app.md) | Copilot Chat (Explain) | 5 min |
| 03 | [Enable GitHub Advanced Security](workshop/exercise-03-enable-ghas.md) | GitHub Native Security | 10 min |
| 04 | [Review CodeQL Findings & Autofix](workshop/exercise-04-codeql-findings.md) | Copilot Autofix | 10 min |
| 05 | [Review Secret Scanning & Dependabot](workshop/exercise-05-secrets-dependabot.md) | GHAS | 5 min |
| 06 | [Copilot CLI Interactive Analysis](workshop/exercise-06-copilot-cli-analysis.md) | Copilot CLI | 10 min |
| 07 | [Create GitHub Issues from Findings](workshop/exercise-07-create-issues.md) | Copilot CLI + GitHub MCP | 5 min |
| 08 | [Create Custom Security Agents](workshop/exercise-08-custom-agents.md) | Copilot Custom Agents | 10 min |
| 09 | [GitHub Actions Security Pipeline](workshop/exercise-09-actions-pipeline.md) | Copilot Agent (Agent Mode) | 10 min |
| 10 | [Fix SQL Injection with Copilot](workshop/exercise-10-fix-sql-injection.md) | Copilot Agent (Inline) | 10 min |
| 11 | [Fix Broken Authentication](workshop/exercise-11-fix-auth.md) | Copilot Agent + Chat | 10 min |
| 12 | [Verify Fixes & Complete the Cycle](workshop/exercise-12-verify-complete.md) | Copilot Chat + GHAS | 5 min |

---

### Optional Track (~30 minutes — pick any, in any order)

| # | Exercise | Copilot Feature | Duration | Best After |
|---|----------|----------------|----------|------------|
| 13 | [Fix XSS Vulnerabilities](workshop/exercise-13-fix-xss.md) | Copilot Agent + Chat | 10 min | Ex 04 |
| 14 | [Fix Hardcoded Secrets](workshop/exercise-14-fix-secrets.md) | Copilot Agent + Chat | 5 min | Ex 05 |
| 15 | [Update Vulnerable Dependencies](workshop/exercise-15-update-dependencies.md) | Copilot Chat + Dependabot | 5 min | Ex 05 |
| 16 | [Write Security Tests](workshop/exercise-16-security-tests.md) | Copilot Agent (Test Gen) | 10 min | Ex 10 |
| 17 | [Security Policy & Compliance Docs](workshop/exercise-17-security-docs.md) | Copilot Chat (Docs) | 10 min | Ex 12 |

> Exercises 13–15 fix vulnerabilities not covered in the mandatory track. Complete at least one of 13–15 before 16 to have a fixed codebase to write tests against.

---

## Key GitHub Copilot Features Covered

| Feature | Description |
|---------|-------------|
| **Copilot Chat (Explain)** | Conversational code exploration and attack surface mapping |
| **Copilot Autofix** | One-click patch generation directly on GHAS alert pages |
| **Copilot CLI (Interactive)** | Multi-turn terminal sessions for vulnerability deep-dives |
| **Copilot Agent (Inline)** | Applies secure coding patterns across entire files |
| **Custom Agents** | Reusable `.agent.md` files scoped to specific vulnerability classes |

---

## Getting Started

1. Clone the repository: `git clone https://github.com/Hemavathi15sg/securetrails-workshop.git`
1. Open in VS Code: `code securetrails-workshop`
1. Ensure **GitHub Copilot** and **GitHub Copilot Chat** extensions are installed and signed in
1. Open the Copilot Chat panel (`Ctrl+Alt+I`)
1. Start with [Exercise 01](workshop/exercise-01-setup.md)

---

> **Instructor Note**: Each exercise has an `<!-- Instructor Guide: ... -->` comment in the markdown source. Exercises are designed so attendees never write code — they copy **prompts** and let Copilot generate the output.

