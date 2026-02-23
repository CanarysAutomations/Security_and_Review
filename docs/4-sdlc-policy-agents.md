# Exercise 4: SDLC Security Automation (Enterprise)

**Duration**: 20 minutes  
**Level**: ⭐⭐⭐⭐ Advanced  

---

## 🎯 Learning Objectives

✅ Orchestrate multiple agents with GitHub Actions  
✅ Enforce security policies on every PR  
✅ Auto-block PRs with CRITICAL vulnerabilities  
✅ Create audit trail for compliance

---

## 📖 Scenario

Every PR must pass security checks before merge. Automate this with GitHub Actions + agents.

---

## 🚀 Implementation

### Step 1: Review the workflow

```bash
# View the automation workflow
cat .github/workflows/security-policy-check.yml
```

**What it does:**
1. Runs baseline-checker agent on every PR
2. Parses findings JSON
3. Blocks PR if CRITICAL issues found  
4. Comments on PR with summary
5. Creates issue if violations found

**Key structure:**
```yaml
name: Security Policy Check
on: [pull_request, push]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      # Run agent
      - run: python .github/agents/baseline-checker.py > findings.json
      
      # Parse results
      - run: |
          CRITICAL=$(grep -c '"severity": "CRITICAL"' findings.json)
          if [ $CRITICAL -gt 0 ]; then
            exit 1  # Block PR
          fi
      
      # Report findings
      - run: python .github/agents/issue-reporter.py findings.json
      
      # Comment on PR
      - uses: actions/github-script@v6
        with:
          script: |
            const findings = JSON.parse(fs.readFileSync('findings.json'));
            github.rest.issues.createComment({...})
```

---

### Step 2: Test the Workflow

Create a test PR with security issue:

```bash
# Create test branch
git checkout -b test/security-violation

# Add vulnerable code
echo 'import pickle; pickle.loads(user_input)' >> apps/securetrails-vulnerable/app.py

# Commit and push
git add apps/securetrails-vulnerable/app.py
git commit -m "Test: Add unsafe pickle usage"
git push origin test/security-violation
```

**Result:**
- GitHub Actions runs automatically
- baseline-checker finds the vulnerability
- PR is **blocked** (can't merge)
- Issue is created with findings
- PR comment shows details

**Expected workflow output:**
```
✓ Baseline security scan: 1 vulnerability found
✓ Severity: HIGH (unsafe pickle usage)
✗ BLOCKING: Violations exceed policy threshold
✓ Issue created: #52
✓ PR comment: Posted summary
```

---

### Step 3: Review the Blocked PR

```bash
# Check PR status online
gh pr view <pr-number>

# See the security comment
gh pr view <pr-number> --comments
```

**Expected:**
- PR shows ❌ security-policy-check failed
- Can't merge until checks pass
- Comment shows: "1 HIGH severity issue"
- Linked issue has remediation details

---

### Step 4: Fix and Re-run

```bash
# Remove vulnerable code
git checkout main
rm unsafe-code.py
git commit -m "fix: Remove unsafe pickle"
git push

# Re-run checks
# GitHub Actions automatically re-runs
```

**Result:**
- Tests pass ✓
- PR **unblocked** (can now merge)
- Demonstrates policy enforcement working

---

## ✅ Acceptance Criteria

- [ ] Viewed `.github/workflows/security-policy-check.yml`
- [ ] Understood agent orchestration pattern
- [ ] Created test PR that violates policy
- [ ] Verified PR was **blocked** automatically
- [ ] Verified issue was **created** automatically
- [ ] Verified PR comment was **posted** automatically
- [ ] Fixed the violation
- [ ] Verified PR **passed** after fix

---

## 🎯 What This Demonstrates

✅ **Automated enforcement** - No manual reviews  
✅ **Policy as code** - Rules defined in workflow  
✅ **Audit trail** - Every finding is logged  
✅ **Developer feedback** - Immediate guidance on PR  
✅ **Scalability** - Same pattern works for all PRs  

---

## 🔑 Key Insights

**Agent Orchestration Pattern:**
```
Agent 1 (detect) → Output findings.json
                ↓
Workflow (parse) → Read findings.json, decide
                ↓
Agent 2 (report) → Create issue from findings
                ↓
Workflow (comment) → Post summary on PR
```

**Exit code flow:**
- agent returns exit code (0=pass, 1=fail)
- workflow checks exit code and decides
- if fail: `exit 1` blocks PR automatically

**Data passing:**
- Agents communicate via JSON files
- Workflow reads JSON to make decisions
- GitHub Actions posts results

---

## 📚 Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GitHub Actions/python-setup](https://github.com/actions/setup-python)
- [Workflow syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

---

**⏱️ Time**: 20 min | **Exercises**: 5/5 ✓

🎉 **Workshop Complete!** You've demonstrated:
- Copilot CLI for interactive analysis (Ex 1)
- Python agents for automated scanning (Ex 2-3)
- GitHub Actions orchestration (Ex 4)
- Real security automation patterns (all)
