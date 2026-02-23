# Exercise 3: Create Custom Agents - Generate Fix Guides Using Copilot CLI
## Building Domain-Specific Vulnerability Fixes

**Duration**: 20 minutes  
**Type**: ⭐⭐⭐⭐ Agent creation  
**Focus**: Use Copilot CLI to CREATE custom agents (.md guides) for fixing vulnerabilities

---

## 🎯 Learning Objectives

✅ Understand what a "custom agent" is (fix documentation)  
✅ Use Copilot CLI to GENERATE fix guides  
✅ Create `.md` agent files for SecureTrails vulnerabilities  
✅ Document step-by-step remediation processes  
✅ Build a library of custom agents for your domain  

---

## 📖 What is a Custom Agent?

**In this workshop, a "Custom Agent" is:**
- A `.md` file that documents HOW to fix a specific vulnerability
- Created using Copilot CLI prompts
- Contains step-by-step remediation instructions
- Stored in `.github/agents/` as reference guides
- Used by developers to understand AND fix issues

**NOT**:
- Pre-built Python scripts (we don't use those)
- Automated executables
- Magic frameworks

**Simply**: Intelligent documentation for fixing security issues.

---

## 📋 The Vulnerability We Found

From Exercise 1 (GitHub GHAS), we detected:

```
🔴 CRITICAL: SQL Injection in database query layer
File: apps/securetrails-vulnerable/app.py
Line: ~47
Issue: User input directly concatenated into SQL query
```

Example vulnerable code:
```python
user_input = request.args.get('location')
query = f"SELECT * FROM trails WHERE location = '{user_input}'"
database.execute(query)  # VULNERABLE!
```

**Now**: Use Copilot CLI to CREATE a fix guide (custom agent).

---

## 🚀 Step 1: Launch Copilot CLI

Use the npx command with your prompt:

```bash
npx @github/copilot -i "Create a comprehensive remediation guide for fixing SQL Injection"
```

This launches an interactive session where you can ask follow-up questions.

---

## 🛠️ Step 2: Create SQL Injection Fix Agent

Ask Copilot CLI to generate a fix guide:

```bash
npx @github/copilot -i "I'm a lead dev at SecureTrails (Flask/Python app) flagged by GitHub GHAS for SQL injection in our database layer.

Here's what we found:
- File: app.py, Line 47
- Problem: User input from request.args directly concatenated into SQL queries
- Example: query = f\"SELECT * FROM trails WHERE location = '{user_input}'\"
- This breaks auth AND lets attackers dump the entire database

I need to create a remediation guide for our team (2 seniors, 1 junior).

Create a structured, implementable guide covering:
1. What's the risk? (what could attackers actually DO?)
2. Root cause analysis (where in our code?)
3. Step-by-step fix process
4. Before/After code examples (show Python SQLAlchemy AND raw MySQLdb patterns)
5. Testing strategy (including injection payloads to try)
6. Gotchas & common mistakes (what could go wrong?)
7. Timeline (how long should this take?)

Make it something we can hand to a developer without needing hand-holding."
```

**Copilot responds** with structured remediation guide:

```markdown
# SQL Injection Fix Guide - SecureTrails Database Layer

## Executive Summary
SQL Injection is a CRITICAL vulnerability allowing attackers to:
- Extract all database records
- Modify or delete data
- Escalate privileges

**Risk Level**: CRITICAL
**Effort**: 2-4 hours
**Impact**: Prevents remote code execution

## Root Cause
User input from `request.args.get('location')` is directly interpolated into SQL queries.
The string formatting operator (`f"..."`) does NOT sanitize input.

## Remediation Steps

### Step 1: Identify All Vulnerable Query Points
```bash
grep -r "f\"SELECT" apps/securetrails-vulnerable/
grep -r "f'SELECT" apps/securetrails-vulnerable/
grep -r "query = f" apps/securetrails-vulnerable/
```

### Step 2: Understand Parameterized Queries
Parameterized queries separate SQL code from data:
```python
# VULNERABLE - String interpolation
query = f"SELECT * FROM users WHERE id = {user_id}"

# SAFE - Parameterized query
query = "SELECT * FROM users WHERE id = ?"
cursor.execute(query, (user_id,))
```

The `?` is a placeholder. User_id is passed separately, so it's treated as DATA, not code.

### Step 3: Fix the Code

**BEFORE (Vulnerable)**:
```python
@app.route('/api/trails')
def search_trails():
    location = request.args.get('location')
    query = f"SELECT * FROM trails WHERE location = '{location}'"
    results = db.execute(query)
    return jsonify(results)
## 🛠️ Step 2: Create SQL Injection Fix Agent

Ask Copilot CLI to generate a fix guide:

```bash
npx @github/copilot -i "I'm a lead dev at SecureTrails (Flask/Python app) flagged by GitHub GHAS for SQL injection in our database layer.

Here's what we found:
- File: app.py, Line 47
- Problem: User input from request.args directly concatenated into SQL queries
- Example: query = f\"SELECT * FROM trails WHERE location = '{user_input}'\"
- This breaks auth AND lets attackers dump the entire database

I need to create a remediation guide for our team (2 seniors, 1 junior).

Create a structured, implementable guide covering:
1. What's the risk? (what could attackers actually DO?)
2. Root cause analysis (where in our code?)
3. Step-by-step fix process (like: identify vulnerable points, use parameterized queries, test with payloads)
4. Before/After code examples (show Python SQLAlchemy AND raw DB-API patterns)
5. Testing strategy (including injection payloads to try)
6. Common mistakes (hardcoding IDs, forgetting session checks, etc)
7. Timeline (how long should this take?)
8. Success criteria (how do we know it's fixed?)

Make it something we can hand to a developer without needing hand-holding. Format as a .md file."
```

**Copilot generates** a complete `.md` remediation guide. Copy the entire response.

---

## 📝 Step 3: Save the Agent Guide to Repository

Create the file in your repo:

**File path**: `.github/agents/sql-injection-fix-guide.md`

**To create it:**

1. In VS Code, create new file: `.github/agents/sql-injection-fix-guide.md`
2. Paste Copilot's entire response into this file
3. Save with `Ctrl+S`
4. Commit to git:

```bash
git add .github/agents/sql-injection-fix-guide.md
git commit -m "docs: Add SQL injection remediation guide agent"
git push
```

✅ **First custom agent created!**

---

## 🔄 Step 4: Create More Agents - Repeat for Other Vulnerabilities

Follow the same pattern for each vulnerability GHAS found:

### Agent 2: Authentication & Authorization Fix

```bash
npx @github/copilot -i "Our SecureTrails Flask app has broken authentication flagged by GitHub GHAS.
Problem: No user permission validation on data modifications.
- User A can modify User B's bookings by changing URL parameter
- Sessions exist but aren't checked on PUT/DELETE/POST
- Example: DELETE /booking/123 should verify logged-in user OWNS it

Create a remediation guide covering:
1. Business risk (attackers can book/cancel other users' trips)
2. Root cause (session handling vs permission validation)
3. Fix implementation (Flask decorators for authorization checks)
4. Before/After code (vulnerable vs secure endpoint)
5. How to test permission boundaries
6. Common mistakes (hardcoding IDs, missing session checks)
7. Timeline (implementable in 1-2 days?)

Include Flask-Login patterns. Format as .md"
```

**Save to**: `.github/agents/authentication-fix-guide.md`

---

### Agent 3: XSS Prevention Fix

```bash
npx @github/copilot -i "GitHub GHAS flagged XSS in our Jinja2 templates - user comments/descriptions rendered without HTML escaping.

Risk: Attackers inject JavaScript in other users' browsers (steal cookies, redirect to malware).

Create a remediation guide:
1. How XSS exploits our Jinja2 templates (what pattern is wrong?)
2. Why it's dangerous for trail booking (we store user comments)
3. Jinja2 escaping patterns and how autoescape works
4. Before/After template examples
5. Content Security Policy headers for app.py
6. Testing - verify XSS payloads are neutralized
7. Performance impact of escaping?

We're inconsistently escaping. Explain when it's needed vs not. Format as .md"
```

**Save to**: `.github/agents/xss-fix-guide.md`

---

### Agent 4: Dependency Security Fix

```bash
npx @github/copilot -i "Our requirements.txt has vulnerable dependencies flagged by Dependabot (Flask 1.1.2→2.3.0, Jinja2 2.11→3.1.0, etc).

We need a safe upgrade process without breaking the app.

Create a remediation guide:
1. Risks of upgrading vs NOT upgrading
2. Breaking changes between Flask 1.x and 2.x
3. Testing strategy (unit? integration? manual?)
4. Rollback plan if something breaks
5. Step-by-step upgrade order
6. How to verify no regression
7. Documentation checklist

We have a 2-hour regression test window. Format as .md"
```

**Save to**: `.github/agents/dependency-update-guide.md`

---

## ✅ Your Custom Agent Library

After this exercise, you'll have:

```
.github/agents/
├── sql-injection-fix-guide.md .............. Fix SQL injection
├── authentication-fix-guide.md ............ Fix auth issues
├── xss-fix-guide.md ...................... Fix XSS vulnerabilities
└── dependency-update-guide.md ............ Safe dependency updates
```

**These are your CUSTOM AGENTS** - Copilot-generated fix guides for YOUR domain.

---

## 🎯 Key Insight: Custom Agents = Smart Documentation

**What custom agents do**:
- ✅ Explain WHAT vulnerability exists (why GitHub flagged it)
- ✅ Explain WHY it's dangerous (business impact)
- ✅ Show BEFORE/AFTER code examples
- ✅ Provide step-by-step fix instructions
- ✅ Include testing strategies
- ✅ Prevent developers from making mistakes

**What they DON'T do**:
- ❌ Automatically fix code (that's developer's job)
- ❌ Run as background services
- ❌ Execute code
- ❌ Bypass manual review

**They guide, not automate.**

---

## 💡 Using Custom Agents in Workflow

In Exercise 4 (GitHub Actions), we'll:

1. GHAS finds vulnerability → Creates issue
2. Issue links to custom agent (fix guide)
3. Developer reads agent guide
4. Developer applies fixes following guide
5. Re-runs GHAS to verify fix
6. Issue closes when fixed

---

## ✅ Acceptance Criteria

- [ ] Used Copilot CLI to create at least 1 custom agent
- [ ] Saved agent as `.md` file in `.github/agents/`
- [ ] Agent includes: Problem, Why it's bad, Before/After code, Fix steps
- [ ] Agent is formatted for easy developer reading
- [ ] Created minimum 2 agents (one required, one bonus)
- [ ] Understand agents are documentation, not code execution
- [ ] Can explain how agents will be used in GitHub Actions

---

## 📚 Agent Best Practices

When creating custom agents via Copilot CLI:

1. **Be Specific**: Include exact file names and line numbers from GHAS findings
2. **Show Examples**: Include actual before/after code
3. **Step-by-Step**: Number each action clearly
4. **Add Testing**: How to verify the fix works
5. **Link to Standards**: Reference OWASP, CWE where applicable
6. **Include Effort**: Time estimate for developers
7. **Add Validation**: Checklist to verify completion

---

## 🚀 Next Steps

**Exercise 4**: GitHub Actions Integration
- Connect GHAS findings → Custom agent guides → Developer workflow
- Automate issue creation with agent links
- Track remediation progress

---

**⏱️ Time**: 20 min | **Exercises**: 3/5 ✓

**You just created your FIRST custom agent using Copilot CLI!**
