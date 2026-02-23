# Exercise 5: Build Your First Security Agent

**Duration**: 30 minutes  
**Level**: ⭐⭐⭐⭐⭐ Expert  
**Bonus Exercise** - Consolidates everything you've learned

---

## 🎯 Important Clarity

**These "agents" are NOT complex AI framework objects.** They're elegant Python scripts.

### What is an Agent? (In this workshop)

```
Just a Python script that:
1. Reads code/files as INPUT
2. Scans using patterns/logic
3. Outputs JSON findings
4. Returns exit code 0 (pass) or 1 (fail)
5. Gets orchestrated by GitHub Actions
```

### Why Python Scripts, Not A Framework?

✅ **Simple** - Anyone can read/modify the code  
✅ **Reliable** - No external framework dependencies  
✅ **Composable** - Chain scripts together easily  
✅ **Copilot-friendly** - Easy for AI to generate/modify  
✅ **Production-proven** - Used by real teams  

**This is better than aspirational "agent SDKs"** because it ACTUALLY WORKS. ✓

---

## 🎯 Learning Objectives

✅ Understand agent anatomy (input → detection → output → exit code)  
✅ Write custom detection patterns  
✅ Create a working security agent  
✅ Integrate agent into CI/CD pipeline  
✅ Extend existing agents with new detections

---

## 📖 Scenario

Your team needs to detect a specific security pattern that existing agents don't catch: **unencrypted database connections**. You'll build a custom agent to detect this.

---

## 🏗️ Agent Template

### Step 1: Understand Agent Structure

Every security agent follows this pattern:

```python
#!/usr/bin/env python3
"""
Agent: Detects [SECURITY_ISSUE]
Input: Files to scan
Output: JSON findings + exit code
"""

import json
import re
from pathlib import Path

# Step 1: Define detection patterns
PATTERNS = {
    'DATABASE_PLAINTEXT': [
        r'postgresql://[^:]+:[^@]+@',   # DB with user:password
        r'mysql://.*:.*@',               # MySQL credentials in URL
    ],
    'HTTP_NOT_HTTPS': [
        r'http://[^s]',                  # HTTP (not HTTPS)
        r'requests\.get\(.*http://',     # Explicit HTTP requests
    ]
}

# Step 2: Scan logic
def scan_files(pattern_dict):
    findings = []
    for file_path in Path('.').rglob('*.py'):
        with open(file_path, 'r') as f:
            for line_num, line in enumerate(f, 1):
                for issue_type, patterns in pattern_dict.items():
                    for pattern in patterns:
                        if re.search(pattern, line):
                            findings.append({
                                'file': str(file_path),
                                'line': line_num,
                                'type': issue_type,
                                'severity': 'HIGH',
                                'code': line.strip()
                            })
    return findings

# Step 3: Output JSON
def main():
    findings = scan_files(PATTERNS)
    output = {
        'findings': findings,
        'summary': {
            'total': len(findings),
            'high': len(findings)
        }
    }
    print(json.dumps(output, indent=2))
    
    # Step 4: Exit code (0=pass, 1=fail)
    exit(1 if findings else 0)

if __name__ == '__main__':
    main()
```

---

## 🛠️ Build: Database Encryption Agent

### Step 1: Use Copilot CLI to Generate Agent Code

Launch Copilot CLI:

```bash
copilot
```

Paste this prompt:

```
Create a Python security agent that detects unencrypted database connections.

The agent should:
1. Scan all .py files in the current directory
2. Detect patterns like:
   - postgresql://user:password@ (unencrypted credentials)
   - mysql://... (plaintext connection)
   - password = '...' (hardcoded passwords)
3. Output JSON with: file, line number, type, severity
4. Return exit code 1 if issues found, 0 if clean
5. Can be run as: python agent.py > findings.json

Make it production-ready with error handling and proper JSON output.
```

**Copilot responds with complete agent code!** Copy it:

```bash
# Create the agent file
cat > .github/agents/database-encryption-checker.py << 'EOF'
[paste Copilot output here]
EOF

chmod +x .github/agents/database-encryption-checker.py
```

### Step 2: Test Your Copilot-Generated Agent

```bash
# Run the agent on the vulnerable app
cd apps/securetrails-vulnerable
python ../../.github/agents/database-encryption-checker.py

# Check exit code
echo "Exit code: $?"  # 0 = clean, 1 = found issues
```

**Expected output:**
```json
{
  "vulnerabilities": [
    {
      "file": "app.py",
      "line": 25,
      "type": "UNENCRYPTED_DB_CONNECTION",
      "severity": "HIGH",
      "code_snippet": "DB_URL = 'postgres://user:password@localhost'"
    }
  ],
  "summary": {
    "total": 1,
    "high": 1
  }
}
```

### Step 3: Enhance Your Agent

Add more database connection patterns:

```python
# Edit the PATTERNS dict to include:
PATTERNS = {
    'UNENCRYPTED_DB_CONNECTION': [
        # ... existing patterns ...
        r'mongodb://\w+:\w+@',           # MongoDB without SSL
        r'redis://',                      # Redis without SSL/TLS
        r'cassandra://.*:.*@',           # Cassandra credentials exposed
    ],
}
```

Re-test:

```bash
python ../../.github/agents/database-encryption-checker.py
```

---

## 🔗 Integrate Into GitHub Actions

### Step 1: Add to Workflow

Edit `.github/workflows/security-policy-check.yml` and add your agent:

```yaml
- name: Check Database Encryption
  run: python .github/agents/database-encryption-checker.py > db-findings.json
  
- name: Parse Database Findings
  run: |
    DB_ISSUES=$(grep -c '"type"' db-findings.json || echo 0)
    if [ $DB_ISSUES -gt 0 ]; then
      echo "⚠️ Database encryption issues found"
      exit 1
    fi
```

### Step 2: Test Integration

Push your changes:

```bash
git add .github/agents/database-encryption-checker.py
git add .github/workflows/security-policy-check.yml
git commit -m "feat: add database encryption checker agent"
git push origin main
```

The workflow now runs your agent automatically on every PR!

---

## 📊 Agent Composition: Chaining Multiple Agents

Now that you understand individual agents, here's how to chain them:

```bash
# Agent 1: Detects issues
python .github/agents/baseline-checker.py > step1-findings.json

# Agent 2: Reports issue
python .github/agents/issue-reporter.py step1-findings.json > step2-issue.json

# Agent 3: Proposes fix
python .github/agents/remediation-proposer.py step1-findings.json step2-issue.json > step3-pr.json

# Result: Detection → Reporting → Remediation (fully automated!)
```

---

## 🎯 Advanced: Create a Composite Agent

Build an agent that CALLS other agents:

```python
#!/usr/bin/env python3
"""
Composite Agent: Runs multiple security checks in sequence
"""
import subprocess
import json

def run_agents():
    results = {}
    
    # Run Agent 1
    r1 = subprocess.run(['python', '.github/agents/baseline-checker.py'],
                       capture_output=True, text=True)
    results['baseline'] = json.loads(r1.stdout)
    
    # Run Agent 2
    r2 = subprocess.run(['python', '.github/agents/secret-detector.py'],
                       capture_output=True, text=True)
    results['secrets'] = json.loads(r2.stdout)
    
    # Run Agent 3
    r3 = subprocess.run(['python', '.github/agents/database-encryption-checker.py'],
                       capture_output=True, text=True)
    results['database'] = json.loads(r3.stdout)
    
    # Combine all findings
    all_findings = []
    all_findings.extend(results['baseline'].get('vulnerabilities', []))
    all_findings.extend(results['secrets'].get('secrets_found', []))
    all_findings.extend(results['database'].get('vulnerabilities', []))
    
    print(json.dumps({'all_findings': all_findings}, indent=2))
    
    exit(1 if all_findings else 0)

if __name__ == '__main__':
    run_agents()
```

---

## ✅ Acceptance Criteria

- [ ] Created `database-encryption-checker.py` agent
- [ ] Agent detects unencrypted database connections
- [ ] Agent outputs valid JSON with findings
- [ ] Agent returns correct exit codes (0/1)
- [ ] Tested agent runs successfully
- [ ] Added agent to GitHub Actions workflow
- [ ] Integrated into security policy enforcement
- [ ] Added 3+ custom detection patterns
- [ ] Understand agent composition/chaining pattern

---

## 🧠 Key Learnings: Agent Architecture

```
INPUT: Code/Files
  ↓
DETECTION LOGIC:
  ├─ Regex patterns (text matching)
  ├─ Entropy analysis (randomness detection)
  ├─ Database lookups (CVE databases)
  └─ Custom logic (business rules)
  ↓
OUTPUT: JSON findings
  ├─ File, line, type, severity
  └─ Recommendation
  ↓
EXIT CODE:
  ├─ 0 = Pass (no issues)
  └─ 1 = Fail (issues found)
  ↓
ORCHESTRATION:
  ├─ GitHub Actions reads exit code
  ├─ Passes findings to next agent
  └─ Makes policy decisions (block/allow)
```

---

## 🚀 What You Can Now Build

With this pattern, you can create agents for:

- ✅ Custom coding standards (style, patterns)
- ✅ Compliance checks (SOC2, GDPR, PCI)
- ✅ Architecture validation (service boundaries)
- ✅ Performance checks (slow queries, memory leaks)
- ✅ Cost optimization (unused resources, oversized instances)
- ✅ Infrastructure security (exposed ports, insecure configs)
- ✅ Data privacy (PII detection, data retention)

All with the same **input → detect → output → exit code** pattern!

---

## 📚 Resources

- [Python regex tutorial](https://docs.python.org/3/library/re.html)
- [JSON schema for findings](./resources/agents-reference.md)
- [GitHub Actions subprocess docs](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsrun)
- [Example agent code](./.github/agents/)

---

**🎓 Workshop Complete!** 

You now understand:
- ✅ How to USE security agents (Ex 1-4)
- ✅ How to MODIFY agent patterns (Ex 1-3)
- ✅ How to BUILD custom agents (Ex 5)
- ✅ How to ORCHESTRATE agents (Ex 4-5)
- ✅ How to INTEGRATE into CI/CD (Ex 4-5)

**Next step:** Take this knowledge to your team and build security automation that matters! 🚀
