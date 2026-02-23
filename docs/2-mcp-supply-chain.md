# Exercise 2: Dependency Supply Chain Security (20 min)

**Duration**: 20 minutes  
**Level**: ⭐⭐ Intermediate  

---

## 🎯 Learning Objectives

✅ Scan dependencies for CVEs  
✅ Understand supply chain risk  
✅ Generate SBOM (Software Bill of Materials)  

---

## 📖 Scenario

Are your dependencies vulnerable? SecureTrails uses outdated packages with known CVEs. Scan them, identify risks, get recommendations.

---

## � Run the Agent

### Step 1: Execute the Agent

```bash
cd apps/securetrails-vulnerable
python ../../.github/agents/dependency-scout.py
```

This scans `requirements.txt` and reports:
- Package versions and known CVEs
- Severity levels (CRITICAL/HIGH/MEDIUM)
- Recommended upgrades
- SBOM output (full inventory)

**Example findings:**
```
Flask 1.1.0: 2 CVEs (CRITICAL - RCE)
SQLAlchemy 1.3.0: 1 CVE (HIGH - SQL injection)  
requests 2.24.0: 1 CVE (MEDIUM)

Result: 5 out of 8 packages have vulnerabilities
Status: HIGH RISK - Not production ready
```

---

### Step 2: Understand the Risk

**Critical (2)** - Must fix immediately (RCE vulnerabilities)  
**High (2)** - Fix before launch  
**Medium (1)** - Plan to fix in next release  

**Key insight:** Perfect code + vulnerable dependencies = compromised. One CVE in Flask = your entire app is pwned regardless of your code quality.

---

### Step 3: Create GitHub Issue

```bash
gh issue create \
  --title "[SECURITY] Exercise 2: Supply Chain Audit" \
  --label "security,exercise" \
  --body "## Supply Chain Audit Results

5 out of 8 packages have vulnerabilities:
- Flask 1.1.0: 2 CVEs (CRITICAL - RCE)
- SQLAlchemy 1.3.0: 1 CVE (HIGH - injection)
- requests 2.24.0: 1 CVE (MEDIUM)

Assessment: NOT PRODUCTION READY

Recommended: Upgrade all CRITICAL/HIGH packages before launch"
```

---

## ✅ Acceptance Criteria

- [ ] Ran `python .github/agents/dependency-scout.py`
- [ ] Identified 5+ vulnerable packages
- [ ] Noted 2+ CRITICAL severity issues
- [ ] Understood SBOM + supply chain risk
- [ ] Created GitHub issue with findings

---

## 📚 Resources

- [GitHub Advisory Database](https://github.com/advisories)
- [CVE Database](https://cve.mitre.org/)
