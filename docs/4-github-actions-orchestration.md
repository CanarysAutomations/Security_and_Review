# Exercise 4: GitHub Actions Integration - Orchestrate Detection + Custom Agents
## Connect Findings to Fix Guides

**Duration**: 20 minutes  
**Type**: ⭐⭐⭐⭐⭐ Complete automation  
**Focus**: Link GHAS findings to custom agent fix guides

---

## 🎯 Learning Objectives

✅ Create GitHub Actions workflow  
✅ Parse GHAS findings  
✅ Create issues linked to custom agent guides  
✅ Organize developer workflow around agents  
✅ Track remediation progress  

---

## 📋 Scenario

**We've built the security pipeline**:

| Exercise | What You Have | Type |
|----------|-------|------|
| Exercise 1 | GHAS detects vulnerabilities | Automated detection |
| Exercise 2 | Copilot CLI analyzes findings | Interactive analysis |
| Exercise 3 | Custom agent .md fix guides | Documentation |
| **Exercise 4** | **GitHub Actions connects them** | **Orchestration** |

**Now**: Automate creating issues with links to agent guides.

```
Code Push
    ↓
GHAS Detects Vulnerability
    ↓
GitHub Actions Workflow Triggers
    ↓
Create Issue + Link to Custom Agent Guide
    ↓
Developer Opens Issue
    ↓
Developer Reads Agent Fix Guide
    ↓
Developer Applies Fix
    ↓
Re-runs GHAS to Verify
    ↓
Issue Closes When Fixed
```

---

## 🏗️ Step 1: Create GitHub Actions Workflow

Create: `.github/workflows/security-detection-and-agents.yml`

```yaml
name: Security Detection + Custom Agents

on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main ]

permissions:
  contents: read
  security-events: read
  issues: write
  pull-requests: write

jobs:
  detect-and-link-agents:
    runs-on: ubuntu-latest
    
    steps:
      # Step 1: Checkout code
      - name: Checkout
        uses: actions/checkout@v4
      
      # Step 2: GitHub GHAS runs automatically in background
      # CodeQL, Secret Scanning, and Dependabot scan your code
      # Results appear in Security tab
      
      - name: Wait for GHAS Scan Results
        run: |
          echo "GitHub GHAS is scanning for:"
          echo "  ✓ SQL Injection"
          echo "  ✓ Cross-Site Scripting (XSS)"
          echo "  ✓ Hardcoded Secrets"
          echo "  ✓ Vulnerable Dependencies"
          echo ""
          echo "Results will appear in repository Security tab"
      
      # Step 3: Check for vulnerabilities and create issues
      - name: Create Issues for Vulnerabilities
        run: |
          python3 << 'EOF'
          import json
          import os
          
          # Simulated GHAS findings for demonstration
          # In production, these would come from GitHub Security API
          findings = [
              {
                  "type": "SQL Injection",
                  "severity": "CRITICAL",
                  "file": "apps/securetrails-vulnerable/app.py",
                  "line": 47,
                  "agent": "sql-injection-fix-guide.md",
                  "description": "User input concatenated directly into SQL query"
              },
              {
                  "type": "Broken Authentication",
                  "severity": "CRITICAL",
                  "file": "apps/securetrails-vulnerable/app.py",
                  "line": 142,
                  "agent": "authentication-fix-guide.md",
                  "description": "Missing session validation on state changes"
              },
              {
                  "type": "Cross-Site Scripting (XSS)",
                  "severity": "HIGH",
                  "file": "apps/securetrails-vulnerable/templates/trail_detail.html",
                  "line": 25,
                  "agent": "xss-fix-guide.md",
                  "description": "User comments rendered without HTML escaping"
              }
          ]
          
          print("=" * 60)
          print("SECURITY FINDINGS DETECTED")
          print("=" * 60)
          
          for finding in findings:
              print(f"\n🔴 {finding['type'].upper()}")
              print(f"   Severity: {finding['severity']}")
              print(f"   Location: {finding['file']}:{finding['line']}")
              print(f"   Description: {finding['description']}")
              print(f"   📖 Agent Guide: {finding['agent']}")
          
          print(f"\n\nTotal Findings: {len(findings)}")
          print("Linked Custom Agents: Available for developers")
          
          EOF
      
      # Step 4: Link agents to issues
      - name: Show Agent Guides Available
        run: |
          echo "📚 Custom Agent Guides Available:"
          echo ""
          echo "1. SQL Injection Fix"
          echo "   📖 Guide: .github/agents/sql-injection-fix-guide.md"
          echo "   Developer can follow step-by-step fix instructions"
          echo ""
          echo "2. Authentication Fix"
          echo "   📖 Guide: .github/agents/authentication-fix-guide.md"
          echo "   Explains proper session validation"
          echo ""
          echo "3. XSS Prevention Fix"
          echo "   📖 Guide: .github/agents/xss-fix-guide.md"
          echo "   Shows template escaping patterns"
```

---

## 📊 Step 2: Understanding the Flow

### What Happens When Code is Pushed

```
Developer pushes code
    ↓
GitHub GHAS automatically scans (CodeQL, Secrets, Dependabot)
    ↓
GitHub Actions workflow triggers
    ↓
Workflow detects findings
    ↓
Workflow creates/updates issues
    ↓
Issues link to .github/agents/*.md guides
    ↓
Developers see issue + full fix guide
    ↓
Developer follows agent guide to fix
    ↓
Developer pushes fix
    ↓
GHAS re-scans
    ↓
If fixed, issue closes automatically
```

---

## 💬 Step 3: Issue + Custom Agent Link

When a vulnerability is detected, GitHub creates an issue like:

```
TITLE: 🔴 CRITICAL: SQL Injection in app.py:47

DESCRIPTION:
User input from request.args.get('location') is directly 
concatenated into SQL query, allowing attackers to extract all data.

SEVERITY: CRITICAL
FILE: apps/securetrails-vulnerable/app.py
LINE: 47

📖 FIX GUIDE:
See: .github/agents/sql-injection-fix-guide.md
for step-by-step remediation instructions

STEPS:
1. Read the custom agent fix guide
2. Understand the vulnerability
3. Apply the fixes shown in the guide
4. Test the fix
5. Push changes
6. Re-run security scan
7. Close issue when GHAS confirms fix
```

Developer clicks the link to `.github/agents/sql-injection-fix-guide.md` and gets:

```markdown
# SQL Injection Fix Guide - SecureTrails Database Layer

## Executive Summary
...
## Step-by-step remediation process
...
## Before/After code examples
...
## How to test the fix
...
## Common pitfalls to avoid
...
```

---

## ✅ Step 4: Developer Workflow

1. **Developer gets issue notification**
   ```
   Someone assigned you to: 🔴 CRITICAL: SQL Injection in app.py:47
   ```

2. **Developer reads the issue**
   - Sees the custom agent fix guide linked
   - Understands what's wrong

3. **Developer reads agent guide**
   - Steps 1-6 guide them through fix
   - Before/After code examples
   - Testing instructions

4. **Developer applies fix**
   ```python
   # BEFORE
   query = f"SELECT * FROM trails WHERE location = '{location}'"
   
   # AFTER
   query = "SELECT * FROM trails WHERE location = ?"
   results = db.execute(query, (location,))
   ```

5. **Developer tests**
   ```bash
   # Test normal input
   curl "http://localhost:5000/api/trails?location=Colorado"
   
   # Test injection payload
   curl "http://localhost:5000/api/trails?location=Colorado' OR '1'='1"
   ```

6. **Developer pushes fix**
   ```bash
   git add .
   git commit -m "Fix: SQL injection using parameterized queries"
   git push
   ```

7. **GHAS re-scans automatically**
   - No SQL injection found
   - Issue marked as resolved
   - Issue closes automatically

---

## 🔗 Step 5: Creating Issues Programmatically

In production, you would create issues with:

```bash
gh issue create \
  --title "🔴 CRITICAL: SQL Injection in app.py:47" \
  --body "User input concatenated into SQL query
  
  📖 **Fix Guide**: See .github/agents/sql-injection-fix-guide.md
  
  Follow the step-by-step instructions to remediate." \
  --label security,critical
```

---

## ✅ What Gets Automated

| Step | Manual? | Automated? |
|------|---------|-----------|
| Detect vulnerability | ❌ | ✅ (GHAS) |
| Create issue | ❌ | ✅ (Actions) |
| Link fix guide | ❌ | ✅ (Actions) |
| Fix code | ✅ | ❌ (Developer applies) |
| Test fix | ✅ | ❌ (Developer verifies) |
| Re-scan after fix | ❌ | ✅ (GHAS) |
| Close issue | ❌ | ✅ (Auto when fixed) |

**Automation handles discovery and organization. Developers handle remediation.**

---

## 🎯 Key Benefit

**Without custom agents**:
- Developer sees issue: "SQL Injection found"
- Developer: "How do I fix this?"
- Security: "Use parameterized queries"
- Developer: "How exactly?"
- Back and forth...

**With custom agents**:
- Developer sees issue + link to agent guide
- Agent guide has: Why it's bad, Before/After code, Step-by-step fix, How to test
- Developer follows guide independently
- Security team notified when fixed

---

## ✅ Acceptance Criteria

- [ ] Created `.github/workflows/security-detection-and-agents.yml`
- [ ] Workflow detects GHAS findings conceptually
- [ ] Workflow would link to custom agent guides
- [ ] Understand issue creation flow
- [ ] Can explain how developers use agent guides
- [ ] Understand the orchestration pattern

---

## 🚀 Next Steps

**Exercise 5**: Real-World Ecosystem
- Deploy everything together
- See the complete flow in action
- Understand when to use each component

---

**⏱️ Time**: 20 min | **Exercises**: 4/5 ✓
