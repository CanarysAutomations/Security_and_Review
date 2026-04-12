# Exercise 02 — Discover: Secret Scanning + VS Code Code Review

**Duration**: 15 min  
**Copilot Feature**: `/plugin advanced-security` (secret scanning) · VS Code Code Review  
**Goal**: Use two Copilot IDE security tools to find exposed credentials and surface code issues — before touching a single fix.

---

## Background

Discovery before fixing prevents tunnel vision. This exercise covers both IDE-based discovery features:
1. **Secret scanning** — uses GitHub's credential detection patterns to find hardcoded secrets
2. **VS Code Code Review** — Copilot's dedicated review model analyses a code selection or all uncommitted changes, returning inline comments with one-click suggested fixes

These are different from Copilot Chat: they use specialised models focused on surfacing genuine issues, not general Q&A.

---

## Step 1 — Scan for Hardcoded Secrets
Open copilot chat (`Ctrl+Alt+I`), go to settings and use the `plugins`, from marketplace select `advanced-security` to activate the secret scanning skill. 

Open `config.py` in VS Code. In Copilot Chat (`Ctrl+Alt+I`), type `#secret-scanning` to activate the skill, then paste the prompt below:

```
Scan config.py for any hardcoded secrets, API keys, passwords, tokens, or credentials. Use the secret scanning skill to check each value against known secret patterns. List every finding with: variable name | value type | risk level | recommended fix.
```

Then repeat for `app.py` (optional):

```
Scan app.py for hardcoded secrets, JWT tokens, and API keys. List every finding with file, variable name, line number, and the os.environ.get() replacement needed.
```

---

## Step 2 — Review a Function with VS Code Code Review (Selection Mode)

Open `app.py`. Select the entire `login()` function (lines 24–41).

**Right-click** the selection → **Copilot** → **Review and Comment**.

Wait up to 30 seconds. Copilot posts review comments:
- **Inline** in the editor at the relevant lines
- In the **Problems** tab (`Ctrl+Shift+M`)

Read each comment. Note the SQL injection issue Copilot flags on the f-string query.

---

## Step 3 — Review All Uncommitted Changes (Uncommitted Changes Mode)

Make a small edit to `app.py` (e.g., add a blank line) so there is at least one uncommitted change.

In VS Code, click the **Source Control** button (`Ctrl+Shift+G`).

At the top of the Source Control view, hover over **CHANGES** and click the **Copilot Code Review — Uncommitted Changes** button (Copilot icon next to the section header).

Wait for the review to complete. Copilot will surface issues across all changed files.

---

## Step 4 — Apply or Dismiss Suggestions

For each Copilot review comment:
- Click **Apply and Go To Next** to accept a suggested fix
- Click **Discard and Go to Next** to skip it

Do not commit any changes yet — you will fix them properly in Exercises 03 and 04.

---

## Step 5 — Customise Reviews with OWASP Instructions *(Optional)*

To focus every future review on OWASP Top 10 checks, create `.github/copilot-instructions.md`, select it as context in chat and then use `/create-instruction` with the following prompt:

```markdown
Update the copilot-instructions.md file with the following content:
When performing a code review, apply the OWASP Top 10 2021 checklist.
Focus on: A01 Broken Access Control, A02 Cryptographic Failures, A03 Injection, A05 Security Misconfiguration.
Flag any user input that reaches a database query, file path, or HTML output without sanitisation.
```

---

## Verify

- [ ] Secret scanning identified hardcoded `SECRET_KEY` and `JWT_SECRET` in `app.py` and `config.py`
- [ ] Selection review on `login()` flagged the SQL injection f-string
- [ ] Uncommitted changes review generated inline comments across changed files
- [ ] You understand the difference between selection review and uncommitted changes review
- [ ] You understand how to create copilot-instructions for customising reviews

---

## Key Takeaway

> Secret scanning finds committed credentials using GitHub's detection engine; VS Code Code Review surfaces broader code quality and security issues inline — both without leaving the editor; Copilot instructions allow you to customise the review focus.

---

**Next**: [Exercise 03 — Fix Core Vulnerabilities](exercise-03-fix-core.md)
