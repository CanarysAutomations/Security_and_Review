# Exercise 3: Secret Detection (Credential Leak Prevention)

**Duration**: 15 minutes  
**Level**: ⭐⭐ Intermediate  

---

## 🎯 Learning Objectives

✅ Run secret detection agent  
✅ Understand credential leak risks  
✅ Identify hardcoded secrets using regex + entropy analysis  

---

## 📖 Scenario

Prevent accidental API key/password commits. Run a secret detection agent to find hardcoded credentials before they reach the repository.

---

## 🚀 Run the Agent

### Step 1: Execute Secret Detector

```bash
cd apps/securetrails-vulnerable
python ../../.github/agents/secret-detector.py
```

This scans all files for:
- Hardcoded API keys (AWS, GitHub, etc.)
- Database passwords
- JWT secrets  
- Private keys
- Entropy-based detection (random strings that look like secrets)

**Example output:**
```
SECRETS FOUND
=============

CRITICAL:
1. JWT_SECRET in app.py:12
   Pattern: JWT_SECRET = 'super-secret-key-12345'
   Fix: Move to environment variable

2. Database password in .env.example:3
   Pattern: postgres://user:PASSWORD123@localhost
   Fix: Use .env (never commit real credentials)

Exit code: 1 (secrets found = block commit)
```

---

### Step 2: Review Findings

Notice the agent found:
- ✅ Hardcoded JWT secret
- ✅ DB password in .env.example  
- ✅ AWS credentials pattern
- ✅ Private key exposed

**Exit code mapping:**
- `1` = Secrets found (should block CI/CD)
- `0` = Clean (safe to proceed)

---

### Step 3: Create Issue

```bash
gh issue create \
  --title "[SECURITY] Exercise 3: Hardcoded Secrets Found" \
  --label "security,exercise" \
  --body "## Secret Detection Results

Agent found 2 CRITICAL hardcoded secrets:

1. JWT Secret in app.py:12
2. DB Password in .env.example:3

All credentials must be moved to environment variables.
Never commit real credentials to version control."
```

---

## ✅ Acceptance Criteria

- [ ] Ran `python .github/agents/secret-detector.py`
- [ ] Found ≥2 CRITICAL secrets (JWT, DB password)
- [ ] Understood exit codes (1=secrets, 0=clean)
- [ ] Created GitHub issue with findings
- [ ] Understood how agents detect credentials

---

## 📚 Resources

- [OWASP Secret Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)  
- [How to Identify Secrets](./resources/reference.md)

---

**⏱️ Time**: 15 min | **Exercises**: 4/5
