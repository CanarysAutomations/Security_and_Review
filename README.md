# Security Engineering with GitHub Copilot — Workshop

> **Audience**: Developers, security engineers, and DevSecOps practitioners  
> **Total Duration**: ~55 min mandatory + ~25 min optional (see two-track map below)  
> **Pre-requisites**: VS Code with GitHub Copilot Chat extension, Python 3.9+, Git CLI, GitHub Copilot access, GitHub CLI (gh) v2.0+, Node.js 22+.

---

## What You Will Build

In this workshop you secure **SecureTrails**, a deliberately vulnerable Flask trail-booking application containing 28 real-world vulnerabilities across 6 OWASP Top 10 2021 categories. You will not write code — you will direct GitHub Copilot to detect, analyse, and fix every vulnerability using VS Code Chat, Copilot Agent inline edits, Copilot CLI, and custom security agents.

By the end of the mandatory track you will have: detected hardcoded secrets with secret scanning, reviewed code with VS Code Code Review, fixed SQL injection with parameterised queries, locked down broken authentication and IDOR, remediated XSS and CORS misconfigurations, and produced reusable OWASP security agents committable to any repository.



| Vulnerability | OWASP Category | Severity |
|---|---|---|
| **SQL Injection (login, search, view_trail)** | A03 — Injection | Critical |
| **Broken Authentication / IDOR** | A01 — Broken Access Control | Critical |
| **XSS — Jinja2 unescaped output + DOM-based** | A03 — Injection | High |
| **Hardcoded Secrets (SECRET_KEY, JWT_SECRET)** | A02 — Cryptographic Failures | Critical |
| **Weak Password Hashing (MD5)** | A02 — Cryptographic Failures | High |
| **Debug Mode + Sensitive `/debug` Endpoint** | A05 — Security Misconfiguration | High |

---

## Prerequisites

- VS Code with **GitHub Copilot** and **GitHub Copilot Chat** extensions installed and signed in
- Python 3.9+ and pip
- Git 2.40+
- GitHub CLI (`gh`) v2.0+ authenticated via `gh auth login`
- GitHub Copilot access (individual or organisation licence)
- Node.js 22+ (for Copilot CLI)
- Mermaid extension for VS Code (optional, for diagram rendering)

---

## Workshop Map

> **Two-Track Design**: Complete the **Mandatory Track** first (~55 min), then pick any **Optional** exercises based on time and interest.

---

### 🔵 Mandatory Track (~55 minutes)

| # | Exercise | Copilot Feature | Duration |
|---|----------|----------------|----------|
| 01 | [Prerequisites & Setup](workshop/exercise-01-setup.md) | — | 5 min |
| 02 | [Discover: Secret Scanning + VS Code Code Review](workshop/exercise-02-discover-review.md) | `/plugin advanced-security` (secret scanning) · VS Code Code Review | 15 min |
| 03 | [Fix Core Vulnerabilities (SQL Injection + Auth + IDOR)](workshop/exercise-03-fix-core.md) | Copilot Agent (Inline `Ctrl+I`) · Copilot Chat | 15 min |
| 04 | [Fix Remaining Vulnerabilities (XSS, Secrets, Weak Crypto, Debug Mode)](workshop/exercise-04-fix-remaining.md) | Copilot Agent (Inline `Ctrl+I`) · Copilot Chat | 15 min |
| 05 | [CLI: Agentic Review + Custom Agents](workshop/exercise-05-cli-review-agents.md) | Copilot CLI `/review` command · Custom Agents (agents) | 15 min |

---

### 🟡 Optional Track (~25 minutes — pick any, in any order)

| # | Exercise | Copilot Feature | Duration | Best After |
|---|----------|----------------|----------|------------|
| 06 | [CLI Interactive Security Analysis](workshop/exercise-06-optional-cli-analysis.md) | Copilot CLI (interactive mode) | 10 min | Ex 05 |
| 07 | [Enable GitHub Advanced Security (GHAS)](workshop/exercise-07-optional-enable-ghas.md) | GitHub Native Security | 10 min | Ex 05 |
| 08 | [Review CodeQL Findings & Autofix](workshop/exercise-08-optional-codeql.md) | Copilot Autofix (GHAS alert page) | 10 min | Ex 07 |
| 09 | [Update Vulnerable Dependencies](workshop/exercise-09-optional-dependencies.md) | Copilot Chat + Dependabot | 5 min | Ex 07 |
| 10 | [Issue Creation from CLI](workshop/exercise-10-optional-issue-creation.md) | Copilot CLI + GitHub Issues MCP | 10 min | Ex 03 |

> Exercises 08 and 09 require Exercise 07 (GHAS enabled on a GitHub-hosted fork with admin access).

---

## Key GitHub Copilot Features Covered

| Feature | Description |
|---------|-------------|
| **Secret Scanning (`plugins`)** | Scans code for exposed credentials using GitHub's detection patterns |
| **VS Code Code Review** | Reviews a selection or uncommitted changes with inline suggestions and one-click fixes |
| **Copilot Agent (Inline `Ctrl+I`)** | Applies fix patterns across entire files in one agentic step |
| **Copilot CLI `/review`** | Agentic CLI code review of git changes — no browser required |
| **Custom Agents (`.agent.md`)** | Reusable, committable security expertise packages per vulnerability class |
| **Copilot Autofix** | One-click patches generated directly on GitHub CodeQL alert pages |
| **GitHub Issues MCP** | Creates tracked, labelled security issues from findings without leaving the terminal |

---

## Getting Started

1. Select **use this template** to create a new repository
1. Clone the repository and open it in VS Code
1. Ensure **GitHub Copilot** and **GitHub Copilot Chat** extensions are installed and signed in
1. Open the Copilot Chat panel (`Ctrl+Alt+I`)
1. Start with [Exercise 01](workshop/exercise-01-setup.md)

---

> **Instructor Note**: Each exercise has `<!-- Instructor Guide -->` comments visible only in markdown source. Exercises are designed so attendees never need to copy code — they copy **prompts** and let Copilot generate the output. 
