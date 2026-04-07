# Exercise 17 — Security Policy & Compliance Documentation

**Duration**: 10 minutes
**Copilot Feature**: Copilot Chat (Document Generation)
**Goal**: Use Copilot to generate a SECURITY.md policy and an OWASP compliance checklist for the repository.

---

## Background

Automated tooling catches vulnerabilities — documentation ensures the team knows how to respond to them and how the pipeline works. A `SECURITY.md` file at the repository root tells contributors how to report vulnerabilities. An OWASP checklist documents your current coverage across the Top 10. Both are Copilot-generated in minutes and become permanent repository assets.

---

## Step 1 — Generate SECURITY.md

In Copilot Chat, paste:

```
Generate a SECURITY.md file for the SecureTrails repository.
Include sections for:
- How to report a vulnerability (private disclosure email or GitHub private advisory)
- Response timeline (acknowledgement within 48h, patch within 14 days for critical)
- Supported versions (only latest main branch)
- How automated scanning works (GHAS, Dependabot, GitHub Actions pipeline)
- How developers should use the custom agents in .github/agents/ when fixing vulnerabilities
```

Save the output as `SECURITY.md` at the repository root.

---

## Step 2 — Generate OWASP Top 10 Coverage Checklist

In Copilot Chat, paste:

```
Generate an OWASP Top 10 (2021 edition) compliance checklist for SecureTrails.
For each of the 10 categories, state:
- Whether SecureTrails was vulnerable (Yes / Partially / No)
- What we did to address it in this workshop
- What automated control is now in place (GHAS / GitHub Actions / test coverage)
Format as a markdown table.
```

Save the output as `docs/owasp-coverage.md`.

---

## Step 3 — Add a Developer Quick-Reference

In Copilot Chat, paste:

```
Write a 10-line quick-reference section for developers explaining:
1. How to run a security check locally before pushing
2. What to do if their PR fails the security pipeline
3. Which custom agent to open for which vulnerability type
4. Who to contact for security questions

Keep it short enough to paste into a README or Confluence page.
```

Add this as the last section of `SECURITY.md`.

---

## Step 4 — Commit the Documentation

```bash
git add SECURITY.md docs/owasp-coverage.md
git commit -m "docs(security): add SECURITY.md policy and OWASP coverage checklist"
git push
```

---

## Verify

- [ ] `SECURITY.md` exists at repo root with vulnerability disclosure instructions
- [ ] `docs/owasp-coverage.md` contains OWASP Top 10 table with coverage status
- [ ] Developer quick-reference section present in `SECURITY.md`
- [ ] Both files committed and visible on GitHub

---

## Key Takeaway

> Copilot generates compliance documentation in minutes — turning your security controls into auditable, stakeholder-ready evidence.
