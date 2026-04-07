# Exercise 01 — Prerequisites & Setup

**Duration**: 5 minutes
**Copilot Feature**: GitHub Copilot Chat
**Goal**: Verify all tools are installed and the SecureTrails repository is open and ready.

---

## Background

This workshop secures **SecureTrails**, a deliberately vulnerable Flask trail-booking app. You will not write code — you will direct GitHub Copilot to detect and fix security vulnerabilities across the full SDLC. This exercise confirms your environment is ready before any security work begins.

---

## Step 1 — Verify Required Tools

Open a terminal and run:

```bash
code --version
python --version
git --version
gh --version
```

> **Tip**: If any tool is missing — VS Code: code.visualstudio.com | Python: python.org | Git: git-scm.com | GitHub CLI: cli.github.com

---

## Step 2 — Authenticate GitHub CLI

```bash
gh auth login
```

Select **HTTPS** and **Login with a web browser**. Verify:

```bash
gh auth status
```

Expected: `Logged in to github.com as <your-username>`

---

## Step 3 — Clone & Open the Repository

```bash
git clone https://github.com/Hemavathi15sg/securetrails-workshop.git
cd securetrails-workshop
code .
```

---

## Step 4 — Open Copilot Chat

In VS Code press `Ctrl+Alt+I` to open the Copilot Chat panel. Confirm it is signed in.

Copy and paste the following prompt into the chat:

```
I just opened the securetrails-workshop repository. Summarize the purpose of this Flask application and list the top files I should review for a security audit.
```

---

## Verify

- [ ] All four tools print a version number
- [ ] `gh auth status` shows your GitHub account
- [ ] Repository is open in VS Code
- [ ] Copilot Chat responds with an app summary

---

## Key Takeaway

> A verified environment with authenticated GitHub CLI and Copilot Chat is the prerequisite for every security exercise that follows.

---

**Next**: [Exercise 02 — Explore the Vulnerable Application](exercise-02-explore-app.md)
