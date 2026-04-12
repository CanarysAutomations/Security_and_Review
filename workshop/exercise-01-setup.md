# Exercise 01 — Prerequisites & Setup

**Duration**: 5 minutes  
**Copilot Feature**: —  
**Goal**: Verify tools are installed, clone the app, and confirm Copilot Chat is active. No Copilot prompts in this exercise — just environment setup.

---

## Background

This workshop secures **SecureTrails**, a deliberately vulnerable Flask trail-booking app located in the `securetrails-vulnerable/` folder. You will not write code — you will direct GitHub Copilot to detect and fix security vulnerabilities. This exercise gets your environment ready.

---

## Step 1 — Verify Tools

Open a terminal and run:

```bash

python --version
git --version
gh --version
```

> If anything is missing: VS Code → code.visualstudio.com | Python → python.org | Git → git-scm.com | GitHub CLI → cli.github.com

---

## Step 2 — Install Copilot CLI

```bash

# Windows (WinGet)
winget install GitHub.Copilot

# Cross-platform (npm) — requires Node.js 22+
npm install -g @github/copilot

# macOS/Linux (Homebrew)
brew install copilot-cli
```

Verify: `copilot --version`

---

## Step 3 — Authenticate

```bash
gh auth login    # select HTTPS → Login with browser
gh auth status   # expected: Logged in to github.com as <your-username>
```

---

## Step 4 — Open the App in VS Code

```bash
cd securetrails-vulnerable
code .
python database.py   # initialises database.db

```

In VS Code press `Ctrl+Alt+I` to open Copilot Chat. Confirm it is signed in.

---

## Verify

- [ ] All tools print a version number
- [ ] `copilot --version` succeeds
- [ ] `gh auth status` shows your account
- [ ] VS Code is open on the `securetrails-vulnerable/` folder with Copilot Chat active

---

## Key Takeaway

> All exercises run against the `securetrails-vulnerable/` app. Copilot does the security work — you supply the prompts.

---

**Next**: [Exercise 02 — Discover: Secret Scanning + VS Code Code Review](exercise-02-discover-review.md)
