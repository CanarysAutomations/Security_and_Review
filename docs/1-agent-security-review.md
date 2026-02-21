# Exercise 1: GitHub Agent Security Review

**Duration**: 20 minutes  
**Expected Time to Complete**: 20 min

---

## 🎯 Learning Objectives

By the end of this exercise, you will:

✅ Use Copilot CLI (`gh copilot explain` and `gh copilot suggest`) for vulnerability discovery  
✅ Identify OWASP Top 10 vulnerabilities in real code  
✅ Understand how AI agents analyze code for security issues  
✅ Document findings in GitHub issues  

---

## 📖 Scenario Context

You're the lead security analyst. Executive team is asking: **"Is SecureTrails ready for launch?"**

Your task: Use Copilot Agent to review the application code and identify security vulnerabilities. The agent will help you spot issues that might be missed in manual review. You need to find and document at least 5 security issues.

---

## 🔍 Task Overview

You'll analyze the SecureTrails application using Copilot CLI to discover:
- SQL Injection vulnerabilities
- Cross-Site Scripting (XSS) issues
- Hardcoded secrets/credentials
- Broken authentication
- Insecure dependencies
- Weak cryptography

---

## 📋 Step-by-Step Instructions

### Step 1: Analyze Flask Backend for Vulnerabilities

**Objective**: Scan the main Flask application for security flaws.

Navigate to the SecureTrails repository:
```bash
cd securetrails-vulnerable
```

Use Copilot to analyze the Flask backend:
```bash
gh copilot explain app.py
```

**When prompted for how Copilot can help, provide this specific prompt:**

```
Analyze this Flask application for security vulnerabilities. Identify:
1. SQL injection risks in database queries
2. Authentication and authorization flaws
3. Hardcoded credentials or secrets
4. Session management issues
5. CORS and security header misconfigurations
Provide specific line numbers and remediation advice.
```

**Expected Analysis Output:**
The agent should identify:
- Line ~47: SQL query with unsanitized user input (SQL Injection)
- Line ~12: Hardcoded JWT secret
- Line ~156: Weak session handling
- Line ~200: MD5 password hashing (insecure)
- Line ~5: CORS `*` allowing all origins

**Your Task:**
- [ ] Read the Copilot analysis carefully
- [ ] Note the file paths and line numbers
- [ ] Understand the security risk for each finding

---

### Step 2: Review HTML Templates for XSS Vulnerabilities

**Objective**: Identify Cross-Site Scripting (XSS) entry points in templates.

Use Copilot to suggest security improvements:
```bash
gh copilot suggest "Analyze templates/trails.html and templates/login.html for XSS vulnerabilities. Check if user input is properly escaped in HTML rendering and in JavaScript context. List specific lines where HTML is rendered without escaping."
```

**When Copilot responds, review its findings for:**
- HTML injection points (lines where templates render user data)
- DOM manipulation without sanitization
- Event handler injection possibilities

**Expected Findings:**
- Line ~89 (trails.html): Trail comments rendered without escaping
- Line ~124 (trails.html): Direct innerHTML usage
- Line ~45 (login.html): Username field not validated on client

**Your Task:**
- [ ] Identify ≥2 XSS vulnerabilities
- [ ] Note the specific vulnerability type (stored vs. reflected)
- [ ] Understand the attack vector

---

### Step 3: Check for Hardcoded Secrets & Credentials

**Objective**: Detect exposed sensitive information.

Examine the .env.example and app.py files:
```bash
gh copilot explain .env.example
```

**Prompt for Copilot:**
```
This file contains environment variable examples for SecureTrails. Identify any hardcoded secrets, API keys, credentials, or sensitive information that should NEVER be in version control. Check for: database passwords, API keys, JWT secrets, encryption keys, OAuth tokens. Explain the security risk of each exposure.
```

Also check app.py for secrets:
```bash
gh copilot suggest "Search app.py for hardcoded API keys, database passwords, encryption keys, JWT secrets, or any sensitive strings that should be environment variables instead of code. List line numbers and severity."
```

**Expected Findings:**
- `.env.example` line ~3: Database password example
- `.env.example` line ~8: AWS API key format exposed
- `app.py` line ~12: JWT_SECRET hardcoded
- `app.py` line ~18: Database connection string with credentials

**Your Task:**
- [ ] Identify ≥3 exposed credentials
- [ ] Understand the risk of each exposure
- [ ] Note which should be moved to `.env`

---

### Step 4: Analyze JavaScript for Client-Side Vulnerabilities

**Objective**: Check frontend code for injection and unsafe operations.

Analyze client-side code:
```bash
gh copilot explain static/js/app.js
```

**Prompt:**
```
Review this JavaScript code for security vulnerabilities including:
1. DOM-based XSS (innerHTML, eval, unsafe DOM methods)
2. SQL injection in API calls
3. Lack of input validation
4. Insecure API endpoints
5. Missing HTTPS enforcement
Identify specific lines and suggest fixes.
```

**Expected Findings:**
- Line ~42: `innerHTML` usage without sanitization
- Line ~67: `eval()` used on user data
- Line ~89: Direct API call without CSRF token
- Line ~105: Sensitive data in browser console (debug logs)

**Your Task:**
- [ ] Identify ≥2 DOM-based vulnerabilities
- [ ] Note the specific JavaScript methods creating risk
- [ ] Document attack scenarios

---

### Step 5: Check Dependencies for Known Vulnerabilities

**Objective**: Identify outdated packages with security issues.

Analyze requirements file:
```bash
gh copilot suggest "I have a Python requirements.txt file. Analyze each package version and check if any have known security vulnerabilities (CVEs). Flag packages that are outdated or have critical security issues. Recommend updated versions."
```

Then show Copilot the file:
```bash
gh copilot explain requirements.txt
```

**Expected Findings:**
- Flask 1.1.0 — Multiple CVEs (upgrade to 2.3+)
- requests 2.24.0 — HTTP request smuggling (upgrade to 2.28+)
- SQLAlchemy 1.3.0 — SQL injection vectors (upgrade to 2.0+)

**Your Task:**
- [ ] Note all dependencies with vulnerabilities
- [ ] Record severity levels
- [ ] List recommended upgrade versions

---

### Step 6: Document Findings in GitHub Issue

**Objective**: Create an issue using YOUR actual findings (not a template).

The key insight: Each candidate's findings may vary slightly based on agent version, pattern matching, and environment. Your issue should reflect **what YOU actually found**, not hardcoded examples.

#### Option A: Auto-Generate Issue from Agent Output (Recommended)

Create a dynamic script that parses your agent findings and creates an issue:

```bash
# Create helper script
cat > create-findings-issue.py << 'EOF'
#!/usr/bin/env python3
"""
Create GitHub issue from actual baseline-checker findings.
This works regardless of how many/which vulnerabilities are found.
"""
import json
import subprocess
import sys

# Step 1: Run the agent
print("Running baseline security agent...")
result = subprocess.run(
    ['python', '.github/agents/baseline-checker.py'],
    capture_output=True,
    text=True
)

try:
    findings = json.loads(result.stdout)
except:
    print("❌ Error: Agent output was not valid JSON")
    print(f"Output: {result.stdout}")
    sys.exit(1)

# Step 2: Extract findings
vulns = findings.get('vulnerabilities', [])
summary = findings.get('summary', {})

# Group by severity (dynamically, whatever was found)
by_severity = {}
for v in vulns:
    severity = v.get('severity', 'UNKNOWN')
    if severity not in by_severity:
        by_severity[severity] = []
    by_severity[severity].append(v)

# Step 3: Build issue dynamically
issue_body = f"""## 🔐 Security Audit - Exercise 1

Agent scanned SecureTrails application and found **{len(vulns)} vulnerabilities**.

### Summary
"""

# Add severity breakdown
for severity in ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']:
    count = len(by_severity.get(severity, []))
    if count > 0:
        issue_body += f"- **{severity}**: {count} issues\\n"

if len(vulns) == 0:
    issue_body += "- ✅ No vulnerabilities detected!"

# Add details for each severity
for severity in ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']:
    vulns_at_level = by_severity.get(severity, [])
    if not vulns_at_level:
        continue
    
    issue_body += f"\\n### {severity} Severity Issues\\n"
    for i, v in enumerate(vulns_at_level, 1):
        issue_body += f"""
{i}. **{v['type']}** at {v['file']}:{v['line']}
   - **Issue**: {v['issue']}
   - **Fix**: {v['fix']}"""

# Assessment
issue_body += f"""

### Recommendation
**Ready for Production?** {"✅ Yes - no critical vulnerabilities" if len(by_severity.get('CRITICAL', [])) == 0 else "⚠️ No - critical issues must be fixed first"}

### Next Steps
1. Review findings above
2. Proceed to Exercise 2: Supply Chain Analysis  
3. Create PRs to fix critical issues
4. Re-run agent to verify fixes

---
Generated by Exercise 1 Security Review Agent
"""

# Step 4: Create GitHub issue with actual findings
title = f"[SECURITY] Exercise 1: {len(vulns)} vulnerabilities found"

cmd = ['gh', 'issue', 'create',
       '--title', title,
       '--label', 'security,exercise',
       '--body', issue_body]

print(f"Creating issue: {title}")
result = subprocess.run(cmd)

if result.returncode == 0:
    print("✅ Issue created successfully")
else:
    print("❌ Failed to create issue")
    
sys.exit(result.returncode)
EOF

# Run the script
python create-findings-issue.py
```

**Key advantages:**
- ✅ Uses YOUR actual agent findings
- ✅ Works whether you find 3, 5, or 7 vulnerabilities
- ✅ Dynamically groups by severity
- ✅ Provides honest assessment based on what YOU found
- ✅ No hardcoded assumptions

#### Option B: Manual Quick Issue (If Script Fails)

```bash
# Simple fallback if automation doesn't work

# First, see what you actually found
echo "Your findings:"
python .github/agents/baseline-checker.py | head -50

# Then create basic issue with your results
gh issue create \
  --title "[SECURITY] Exercise 1: Security review findings" \
  --label "security,exercise" \
  --body "## Exercise 1 Findings

Run this to see YOUR actual findings:
\`\`\`bash
python .github/agents/baseline-checker.py
\`\`\`

Copy the output above and paste your specific vulnerabilities here.

Assessment: [Pass/Fail/Needs Review]
Next: Proceed to Exercise 2"
```

#### Option C: Manual Full Issue (Reference Your Output)

If you prefer manual entry, review your findings first:

```bash
# Check what the agent actually found on YOUR system
python .github/agents/baseline-checker.py

# Review the output, then create issue documenting what YOU found
# (Not what the exercise guide shows)

gh issue create --title "[SECURITY] Exercise 1 Findings" \
  --label "security,exercise" \
  --body "[Paste your actual findings here from agent output]"
```

#### ⚡ Key Point

**Every candidate will have slightly different findings.** This is normal because:
- Agent detection patterns may match differently
- Python/library versions might affect regex matching
- File encoding or line endings could vary
- Environment settings differ

The important part is: **You understand what was found and why it matters**, not that you get exact matches to a template.

---

## ✅ Acceptance Criteria

- [ ] Ran `gh copilot explain app.py` and reviewed analysis
- [ ] Ran `gh copilot suggest` for templates and JavaScript
- [ ] Identified ≥5 security vulnerabilities
- [ ] Found ≥3 exposed credentials
- [ ] Noted ≥3 vulnerable dependencies
- [ ] Created GitHub issue with comprehensive findings
- [ ] Documented each vulnerability with:
  - [ ] File and line number
  - [ ] Severity level
  - [ ] Description and impact
  - [ ] Recommended fix

---

## 🖼️ Expected Output

Copilot analysis output should look similar to:

```
Flask Application Security Analysis
====================================

CRITICAL FINDINGS (2):
1. SQL Injection (app.py:47) - User input in SQL query
2. Hardcoded JWT Secret (app.py:12) - Credential exposure

HIGH FINDINGS (4):
3. XSS in Templates (templates/trails.html:89)
4. Weak Password Hashing (app.py:200)
5. CORS Misconfiguration (app.py:5)
6. Exposed .env Example (credentials listed)

MEDIUM FINDINGS (1):
7. Vulnerable Dependencies (multiple packages outdated)

REMEDIATION OVERVIEW:
- Use parameterized queries for SQL
- Move secrets to environment variables
- Apply output escaping in templates
- Use bcrypt for passwords
- Restrict CORS to specific origins
- Update all packages to latest versions
```

---

## 🆘 Troubleshooting

### Issue: "Copilot CLI not responding"
```bash
# Restart authentication
gh copilot auth
```

### Issue: "File not found" in copilot explain
```bash
# Make sure you're in the correct directory
pwd
ls -la app.py

# Use full paths if needed
gh copilot explain ./securetrails-vulnerable/app.py
```

### Issue: "No output from copilot suggest"
```bash
# Try with simpler prompt first
gh copilot suggest "Find SQL injection in Flask"
```

---

## 📚 Resources

- [OWASP Top 10 2023](https://owasp.org/Top10/)
- [OWASP SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [GitHub Copilot CLI Docs](https://docs.github.com/en/copilot/github-copilot-cli/using-github-copilot-cli)
- [Reference Materials](./resources/reference.md)
- [Copilot Cheatsheet](./resources/copilot-cheatsheet.md)

---

## 🎯 Next Steps

Congratulations! You've completed Exercise 1. You've demonstrated how Copilot agents can quickly identify major security vulnerabilities.

### What's Next?

In **[Exercise 2: MCP & Supply Chain Security](./2-mcp-supply-chain.md)**, you'll:
- Integrate Model Context Protocol (MCP) to query CVE databases
- Deploy the `dependency-supply-chain-scout` agent
- Generate a Software Bill of Materials (SBOM)
- Create remediation pull requests

**Ready?** → **[Exercise 2: MCP & Supply Chain →](./2-mcp-supply-chain.md)**

---

**⏱️ Time Elapsed**: ~20 minutes (cumulative: 30 min)  
**Exercises Completed**: 2/5 ✓
