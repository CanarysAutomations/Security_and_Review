# Exercise 0: Prerequisites & Environment Setup (Local VS Code)

**Duration**: 10 minutes  
**Expected Time to Complete**: 10 min

---

## 🎯 Learning Objectives

By the end of this exercise, you will:

✅ Set up VS Code with GitHub Copilot extension  
✅ Install and authenticate GitHub Copilot CLI locally  
✅ Clone the SecureTrails vulnerable application  
✅ Configure local Python environment  
✅ Verify that Copilot agents can access your repository  

---

## 📖 Scenario Context

You've been brought on as a security analyst at SecureTrails Co. Your first task: **prepare your local development environment for a comprehensive security audit**. You need VS Code with Copilot, Copilot CLI, access to the vulnerable app repository, and confirmation that all tools are ready for automated security analysis.

---

## 🔧 Step-by-Step Setup

### Step 1: Verify & Install Prerequisites

Before starting, ensure you have these installed:

```bash
# Check VS Code
code --version
# Expected: Should output version (e.g., 1.85.0)

# Check Python
python --version
# or
python3 --version
# Expected: Python 3.9+

# Check Git
git --version
# Expected: git version 2.x or higher

# Check GitHub CLI
gh --version
# Expected: gh version 2.x.x
```

**If any are missing**:
```bash
# Install VS Code: https://code.visualstudio.com/

# Install Python: https://www.python.org/ (or via Homebrew/Chocolatey)

# Install Git: https://git-scm.com/

# Install GitHub CLI: https://cli.github.com/
```

---

### Step 2: Install GitHub Copilot Extension in VS Code

Open VS Code and install the official Copilot extension:

1. **Open VS Code Extensions:**
   - Press `Ctrl+Shift+X` (Windows) or `Cmd+Shift+X` (Mac)
   - Or: Click **Extensions** icon on left sidebar

2. **Search for "GitHub Copilot":**
   - Type "GitHub Copilot" in search box
   - Look for extension by **GitHub** (official)

3. **Install the Extension:**
   - Click **Install** on the official GitHub Copilot extension
   - Wait for installation to complete

4. **Verify Installation:**
   - You should see a "GitHub Copilot" icon in the bottom-right status bar
   - Or check Extensions → Installed for "GitHub Copilot"

**Expected Screen:**
```
Extensions Marketplace
┌─────────────────────────────┐
│ GitHub Copilot              │
│ by GitHub                   │
│ ★★★★★ (450K ratings)        │
│ [Install] │ [Version: x.x.x] │
│                              │
│ AI-powered code completion  │
│ Your AI pair programmer     │
└─────────────────────────────┘
```

---

### Step 3: Verify GitHub Copilot CLI is Installed

Open a terminal and verify the standalone copilot tool:

```bash
# Check if copilot is installed
copilot --version
# Expected: version 0.0.414 or higher
```

**If copilot is NOT installed**, install it using one of these methods:

```bash
# Option 1: Homebrew (Mac/Linux)
brew install copilot-cli

# Option 2: npm (all platforms - Mac/Linux/Windows)
npm install -g @github/copilot

# Option 3: Windows (winget - PowerShell)
winget install GitHub.Copilot
```

**Install Links:**
- [Copilot CLI GitHub Repo](https://github.com/github/copilot-cli)
- [Copilot CLI Documentation](https://docs.github.com/en/copilot/github-copilot-cli/about-github-copilot-cli)

**After installation, verify:**
```bash
copilot --version
# Should show: version 0.0.414 or higher
```

---

### Step 4: Authenticate with GitHub

Authenticate both GitHub CLI and Copilot:

```bash
# Authenticate GitHub CLI (if not already done)
gh auth login
```

**Follow prompts:**
- What is your preferred protocol for Git operations? → **HTTPS**
- Authenticate Git with your GitHub credentials? → **Y**
- How would you like to authenticate GitHub CLI? → **Login with a web browser**
- (Browser opens - click Authorize)

**Verify authentication:**
```bash
# Check GitHub CLI status
gh auth status
# Expected: Logged in to github.com with account <your-username>

# Verify Copilot CLI (standalone tool, NOT deprecated 'gh copilot' extension)
copilot --version
# Expected: version 0.0.414 or higher
```

---

### Step 5: Clone SecureTrails Vulnerable Application

Open terminal and clone the vulnerable repo that you'll audit:

```bash
# Clone the SecureTrails vulnerable application
git clone https://github.com/Hemavathi15sg/securetrails-workshop.git
cd securetrails-workshop

# Verify directory structure
ls -la
```
---

### Step 6: Open Project in VS Code

From the terminal:

```bash
# Open the project in VS Code
code .
```

Or from VS Code:
- Click **File** → **Open Folder**
- Navigate to `securetrails-vulnerable` folder
- Click **Open**

**VS Code should open with the project loaded**. Verify you can see:
- File explorer on left showing the directory structure
- GitHub Copilot icon in status bar (bottom-right)

---

### Step 7: Set Up Python Virtual Environment

In VS Code terminal (`` Ctrl+` ``):

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Mac/Linux:
source venv/bin/activate

# On Windows (PowerShell):
venv\Scripts\Activate.ps1

# On Windows (Command Prompt):
venv\Scripts\activate.bat

# Verify activation (should show (venv) in prompt)
```

**Install dependencies:**
```bash
# Install Python packages
pip install -r requirements.txt

# Verify Flask installation
pip list | grep Flask
```

**Expected Output:**
```
Flask                1.1.0
requests             2.24.0
SQLAlchemy           1.3.0
```

*(Note: These are intentionally outdated versions with known vulnerabilities)*

---

### Step 8: Configure VS Code for Copilot

1. **Open VS Code Settings:**
   - Press `Ctrl+,` (Windows) or `Cmd+,` (Mac)
   - Or: Click **File** → **Preferences** → **Settings**

2. **Search for Copilot settings:**
   - In the search box, type "Copilot"
   - Enable these settings:
     - ✓ **Copilot: Enable** (should be checked)
     - ✓ **Copilot: Inline Suggest: Enable** (auto-complete)

3. **Create VS Code terminal in project:**
   - Press `` Ctrl+` `` to open integrated terminal
   - Verify prompt shows project directory

**Expected Screen:**
```
VS Code
┌─────────────────────────────────┐
│ ✓ GitHub Copilot Extension      │
│ ✓ Terminal open (Python venv)   │
│ ✓ File explorer showing repo    │
│ $ (venv) project-name>          │
└─────────────────────────────────┘
```

---

### Step 9: Test Copilot CLI Access

In VS Code terminal, verify Copilot CLI works:

```bash
# Test Copilot CLI version
copilot --version
# Expected: version 0.0.414 or higher
```

**Test with an interactive prompt:**

The correct way to use Copilot CLI for interactive analysis is:

```bash
npx @github/copilot -i "Analyze this Flask application for security vulnerabilities. Identify: SQL injection risks, auth flaws, hardcoded credentials."
```

**Alternative: Use full npx path**

```bash
npx @github/copilot -i "Your prompt here"
```

The `-i` flag starts interactive mode where you can ask follow-up questions.

**Expected:**
- Copilot responds with code analysis
- Can ask follow-up questions interactively
- Type `exit` or `Ctrl+C` to close

---

### Step 10: Verify Python Path in VS Code

VS Code should use the virtual environment Python:

1. **Open Command Palette:** `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
2. **Search and select:** "Python: Select Interpreter"
3. **Choose:** `./venv/bin/python` (the virtual environment)

**Verify in terminal:**
```bash
# Check which Python is active
which python
# or on Windows:
where python

# Should show path to virtual environment
```

---

## ✅ Acceptance Criteria

Verify your setup by checking these items:

- [ ] VS Code installed and running
- [ ] GitHub Copilot extension installed in VS Code
- [ ] `copilot --version` returns a version number ≥ 0.0.414 (terminal)
- [ ] `gh auth status` shows authenticated account (terminal)
- [ ] SecureTrails repository cloned locally
- [ ] Project opened in VS Code
- [ ] Python venv created and activated
- [ ] Dependencies installed (`pip list` shows Flask, requests, etc.)
- [ ] Python interpreter set to venv in VS Code
- [ ] `npx @github/copilot -i "prompt"` works (returns analysis)

**All checkboxes complete?** → You're ready for Exercise 1! ✅

---

## 🆘 Troubleshooting

### Issue: GitHub Copilot extension not working in VS Code
```bash
# Make sure it's installed
# Go to VS Code Extensions → Search "GitHub Copilot"
# Install the official one by GitHub

# Restart VS Code
Code → File → Reload Window (or Ctrl+R)
```

### Issue: `gh: extension not found: copilot`

**This error is from the OLD deprecated method.** You don't need the `gh extension` - use the standalone `copilot` tool instead.

```bash
# Remove the old gh extension if it exists
gh extension remove github/gh-copilot  2>/dev/null || true

# Install the standalone copilot CLI
npm install -g @github/copilot
# or use: brew install copilot-cli

# Verify it works
copilot --version
```

### Issue: `Permission denied` on repository clone
```bash
# Ensure SSH key is configured
gh auth ssh-key add ~/.ssh/id_ed25519

# Or use HTTPS with token
git clone https://github.com/<org>/securetrails-vulnerable.git
# Enter GitHub username and Personal Access Token as password
```

### Issue: Python venv not activating in VS Code
```bash
# On Windows PowerShell (if execution policy blocks it):
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then try again:
venv\Scripts\Activate.ps1

# Verify activation (should show (venv) in terminal prompt)
```

### Issue: Python interpreter not showing in VS Code
```bash
# Open Command Palette: Ctrl+Shift+P
# Type: Python: Select Interpreter
# Choose: ./venv/bin/python (the one with venv path)

# Verify in terminal
python --version  # Should show Python 3.9+
```

### Issue: `copilot` command returns "not found" or `gh copilot` (deprecated extension) is installed
```bash
# The 'gh copilot' extension is DEPRECATED as of Oct 2025
# You need the standalone 'copilot' CLI tool instead

# Check if you have the old extension (remove if present)
gh extension list

# If you see 'copilot' in the list, remove it
gh extension remove github/gh-copilot

# Install the standalone copilot tool
# Option 1: Homebrew (Mac/Linux)
brew install copilot-cli

# Option 2: npm (all platforms)
npm install -g @github/copilot

# Option 3: Windows (winget)
winget install GitHub.Copilot

# Verify installation
copilot --version
```

### Issue: "Authorization required" error
```bash
# Re-authenticate GitHub CLI
gh auth logout
gh auth login
# Follow the prompts

# Verify authentication
gh auth status
```

---

## 📚 Resources

- **[GitHub Copilot Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)** — VS Code Marketplace
- **[Copilot CLI Documentation](https://docs.github.com/en/copilot/github-copilot-cli/about-github-copilot-cli)**
- **[VS Code setup guide](https://code.visualstudio.com/docs/setup/setup-overview)**
- **[GitHub CLI reference](https://cli.github.com/manual/)**
- **[Python virtual environments](https://docs.python.org/3/tutorial/venv.html)**

---

## ✨ Quick Reference

**VS Code Keyboard Shortcuts:**
- Open terminal: `` Ctrl+` ``
- Open command palette: `Ctrl+Shift+P`
- Open file explorer: `Ctrl+Shift+E`
- Open extensions: `Ctrl+Shift+X`
- Select Python interpreter: `Ctrl+Shift+P` → "Python: Select Interpreter"

**Essential Commands:**
```bash
# Activate virtual environment
source venv/bin/activate          # Mac/Linux
venv\Scripts\activate.bat         # Windows (Command Prompt)
venv\Scripts\Activate.ps1         # Windows (PowerShell)

# Test Copilot CLI (standalone tool, NOT 'gh copilot' extension)
copilot --version

# Use Copilot CLI interactively with a prompt
npx @github/copilot -i "Your security analysis prompt here"

# Check Python
python --version
pip list
```

---

## 🎯 Ready for Next Step?

Once all acceptance criteria are met, proceed to:

### **[Exercise 1: GitHub NATIVE Security (GHAS)](./1-github-native-security.md)** →

This exercise will enable GitHub's built-in security features to discover vulnerabilities in the SecureTrails application.

---

**⏱️ Time Elapsed**: ~10 minutes  
**Next Exercise**: Exercise 1 (20 min)
