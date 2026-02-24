# Exercise 1: GitHub NATIVE Security (GHAS)
## What GitHub Provides Out-of-the-Box

**Duration**: 20 minutes  
**Type**: ⭐⭐ Understanding GitHub's native capabilities  
**Focus**: GitHub Advanced Security - Built-in scanning without custom tools

---

## 🎯 Learning Objectives

✅ Understand what GitHub GHAS provides   
✅ Enable CodeQL for static analysis  
✅ Review Secret Scanning results  
✅ Understand Dependabot vulnerability alerts  
✅ See real vulnerabilities BEFORE you write custom tools  

---

## 📖 Scenario

**Question**: "Is SecureTrails ready for launch?"

**Without writing ANY custom code**, GitHub can already tell us about:
- Code vulnerabilities (SQL injection, XSS) via CodeQL
- Hardcoded secrets via Secret Scanning  
- Vulnerable dependencies via Dependabot
- Security misconfigurations

This exercise shows what GitHub **NATIVELY** provides.

---

## 🏛️ What is GitHub Advanced Security (GHAS)?

GHAS includes THREE built-in security **SERVICES**:

| Feature | What It Does | Type | Where It Runs |
|---------|--------------|------|----------------|
| **CodeQL** | Finds code vulnerabilities (SQL injection, XSS, etc.) | GitHub Native Service | GitHub servers |
| **Secret Scanning** | Detects hardcoded API keys, passwords, tokens | GitHub Native Service | GitHub servers |
| **Dependabot** | Identifies vulnerable packages | GitHub Native Service | GitHub servers |


---

## ⚙️ Step 1: Enable Security Features via Settings

### Step 1.1: Go to Repository Settings

In your GitHub repository, click **Security** tab:

![Settings Tab Navigation](./images/1.png)

**You'll see:**
- Vulnerability alerts which includes GHAS features
- These are to enabled to get security insights on your codebase

---

### Step 1.2: Navigate to Settings tab

Scroll down in Settings sidebar to **Advanced Security** section:

![Security Settings Location](./images/2.png)

**Click**: "Advanced security" → You'll see available security features

Toggle ON all these features:

![Enable Security Features](./images/3.png)

**Enable:**
- ☑ Dependabot alerts
- ☑ Dependabot security updates  
- ☑ Code scanning with CodeQL
- ☑ Secret scanning
- ☑ Push protection (blocks secrets in commits)

Once enabled, GitHub starts scanning automatically.

---

## 🔍 Step 2: Enable Code Quality (Preview)

### Step 2.1: Open Settings → Code quality (preview) is a new GitHub feature that provides code quality insights alongside security findings.
**Enable Code Quality (Preview)** to get additional insights on code maintainability and potential bugs.

![Security Tab](./images/4.png)

---

### Step 2.2: View Code Scanning Results

Click **Code scanning** in the left menu:



**You'll see:**
- List of vulnerabilities found by CodeQL
- Severity levels (CRITICAL, HIGH, MEDIUM, LOW)
- File locations and line numbers
- Recommendations for each finding

---

## 📊 Step 3: Review CodeQL Vulnerabilities

CodeQL has found vulnerabilities in the app:

![CodeQL Findings List](./images/6.png)


**Examples you'll see:**
- SQL Injection (CRITICAL)
- XSS in templates (HIGH)
- Weak password hashing (MEDIUM)

![Code Scanning Alerts](./images/7.png)

Copilot can generate fixes for these vulnerabilities, but you can also review them manually. 

![Copilot autofix suggestions](./images/8.png)



---

## 🔑 Step 4: Review Secret Scanning

Click **Secret scanning** in the left menu to see hardcoded secrets found:

![Secret Scanning Alerts](./images/9.png)

**Types of secrets detected:**
- GitHub PAT tokens
- AWS credentials
- Database passwords
- API keys

---

## 📦 Step 5: Review Dependabot Alerts

Navigate to **Dependabot** tab to see vulnerable packages:
![Dependabot Alerts](./images/10.png)

**You'll see:**
- Flask with known CVEs
- requests with security issues
- SQLAlchemy vulnerabilities

---

## 📋 Step 6: Create Issues from Findings

Document all findings in a GitHub issue:

```bash
gh issue create \
  --title "[SECURITY] GitHub GHAS findings - SecureTrails" \
  --label "security,review" \
  --body "## Security Analysis Results (GitHub Native)

### CodeQL Findings
- SQL Injection - CRITICAL
- XSS in templates - HIGH  
- Weak password hashing - MEDIUM

### Secret Scanning
- GitHub PAT exposed - CRITICAL
- AWS credentials exposed - CRITICAL
- Database password exposed - CRITICAL

### Dependabot Alerts
- Multiple vulnerable packages detected

**Assessment**: Review and prioritize these findings"
```

---

## 📋 Step 6: Create Issues from Findings

GitHub can auto-create issues for each finding. Or manually:

```bash
# Create an issue documenting all GHAS findings
gh issue create \
  --title "[SECURITY] GitHub GHAS findings - SecureTrails" \
  --label "security,review" \
  --body "## Security Analysis Results (GitHub Native)

### CodeQL Findings
- SQL Injection (app.py:47) - CRITICAL
- XSS in templates (templates/trails.html:89) - HIGH  
- Weak password hashing (app.py:200) - MEDIUM

### Secret Scanning
- GitHub PAT in .env.example - CRITICAL
- AWS credentials in app.py - CRITICAL
- DB password exposed - CRITICAL

### Dependabot Alerts
- Flask 1.1.0: 2 CVEs (CRITICAL)
- requests 2.24.0: 1 CVE (MEDIUM)
- SQLAlchemy 1.3.0: 1 CVE (HIGH)

**Assessment**: NOT PRODUCTION READY
- 3 critical code vulnerabilities
- 3 hardcoded secrets  
- 3 vulnerable packages

**Next Steps**:
1. Fix code vulnerabilities (CodeQL findings)
2. Remove hardcoded secrets and use .env
3. Update vulnerable packages to secure versions
4. Proceed to Exercise 2 for interactive analysis"
```

---

## 🎯 Key Learning

**What GitHub GHAS Provides Natively:**

GitHub Advanced Security automatically finds three types of issues:
- Code vulnerabilities (patterns: SQL injection, XSS, weak crypto, etc.)
- Hardcoded secrets (credentials exposed in code)
- Vulnerable dependencies (packages with known CVEs)

**All enabled automatically:** You don't need to write custom tools for these basic cases.

**Why this matters:** Understand native GitHub capabilities before building custom solutions.

---

## 🚀 Next Steps

**Exercise 2** - Use Copilot CLI for deeper, interactive security analysis

---

## 📚 Resources

- [GitHub Advanced Security Docs](https://docs.github.com/en/enterprise-cloud@latest/code-security)
- [CodeQL Documentation](https://codeql.github.com/)
- [Dependabot Alerts](https://docs.github.com/en/code-security/dependabot)
- [Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)

---

**⏱️ Time**: 20 min | **Exercises**: 1/6 ✓
