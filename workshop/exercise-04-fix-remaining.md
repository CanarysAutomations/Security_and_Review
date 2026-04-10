# Exercise 04 — Fix Remaining Vulnerabilities (XSS, Secrets, Weak Crypto, Debug Mode)

**Duration**: 15 min  
**Copilot Feature**: Copilot Agent (Inline `Ctrl+I`) · Copilot Chat  
**Goal**: Fix every remaining vulnerability category in one focused exercise — XSS in templates, hardcoded secrets, MD5 password hashing, the `/debug` endpoint, CORS wildcard, and DOM-based XSS in JavaScript.

---

## Background

After fixing SQL injection and auth in Exercise 03, these vulnerabilities remain:

| Vulnerability | OWASP | File | Line(s) |
|---------------|-------|------|---------|
| XSS — unescaped Jinja2 output | A03 | trails.html L12, L13, L17, login.html L11 | |
| DOM-based XSS — `innerHTML` | A03 | js/app.js L11, trails.html L34 | |
| `eval()` usage | A03 | js/app.js L2 | |
| Hardcoded `SECRET_KEY` + `JWT_SECRET` | A02 | app.py L10–11 | |
| Hardcoded credentials in config | A02 | config.py L6, L12, L17 | |
| MD5 password hashing | A02 | app.py L63–64 | |
| Debug mode always on + `/debug` endpoint | A05 | app.py L81 (DEBUG flag), L84–91 (/debug route) | |
| CORS wildcard `*` | A05 | app.py L14 | |

---

## Step 1 — Fix XSS: Enable Jinja2 Autoescaping

Open `app.py`. In Copilot Chat with `#app.py`, paste:

```
The Flask app initialises without explicit autoescaping. Show me how to:
1. Enable Jinja2 autoescaping for all .html templates in the Flask() constructor call.
2. Find and remove any {{ variable | safe }} filters in the templates that bypass autoescaping for user-controlled data.
If autoescape is not set, provide the corrected constructor and list any unsafe | safe usages.
```

Apply with `Ctrl+I` on the `app = Flask(__name__)` line.

Then in Copilot Chat with `#app.py`, paste:

```
Add an after_request hook that sets a Content-Security-Policy response header.
Policy: allow scripts only from 'self', disallow inline scripts, disallow eval, allow styles from 'self'.
Show the exact Flask code.
```

Apply with `Ctrl+I`.

---

## Step 2 — Fix DOM-Based XSS + `eval()` in JavaScript

Open `static/js/app.js`. In Copilot Chat with `#app.js`, paste:

```
Find every unsafe DOM manipulation and eval() call in app.js.
For each:
1. Replace innerHTML with textContent where only text is needed
2. Replace innerHTML template literals with safe DOM createElement/textContent pattern
3. Remove the eval() function or replace with a safe alternative
Show the corrected file.
```

Apply with `Ctrl+I` on the full file contents.

---

## Step 3 — Fix Hardcoded Secrets

Open `app.py`. In Copilot Chat with `#app.py`, paste:

```
Replace the hardcoded app.secret_key and JWT_SECRET values (lines 10–11) with os.environ.get() calls.
Add import os at the top if not present.
Use 'SECRET_KEY' and 'JWT_SECRET' as the environment variable names.
Do not change any other lines.
```

Apply with `Ctrl+I`. Then repeat for `config.py`:

```
Replace every hardcoded string value for SECRET_KEY, API_KEY, and the database connection string in config.py with os.environ.get('VARIABLE_NAME', '') calls.
Do not change variable names.
```

---

## Step 4 — Fix Weak Password Hashing (MD5 → Werkzeug)

In Copilot Chat with `#app.py`, paste:

```
The hash_password() function uses MD5, which is broken for password hashing.
Replace it with werkzeug.security.generate_password_hash() and update the login check to use check_password_hash().
Show all changes needed in app.py and the updated login() function.
```

Apply with `Ctrl+I`.

---

## Step 5 — Remove Debug Endpoint + Fix CORS

In Copilot Chat with `#app.py`, paste:

```
1. The DEBUG flag is hardcoded to True. Replace it with os.environ.get('DEBUG', 'False') == 'True'.
2. The /debug route exposes secret_key, JWT_SECRET, and database details. Remove this route entirely.
3. The CORS(app, origins="*") at line 14 allows all origins. Replace it with CORS(app, origins=["http://localhost:5000"]) or read allowed origins from an environment variable.
Show all three changes.
```

Apply with `Ctrl+I`.

---

## Step 6 — Create `.env.example`

In Copilot Chat, paste:

```
Based on the os.environ.get() calls I just added to app.py and config.py, generate a .env.example file with all required variable names and safe placeholder values. This file is safe to commit — it shows developers what to set without exposing real values.
```

Save the output as `.env.example` in `securetrails-vulnerable/`. Add `.env` to `.gitignore`:

```bash
echo ".env" >> .gitignore
```

---

## Step 7 — Commit Everything

```bash
git add app.py config.py static/js/app.js templates/ .env.example .gitignore
git commit -m "fix(security): XSS autoescaping, CSP header, DOM XSS, remove eval(), env vars for secrets, replace MD5 with werkzeug hashing, remove debug endpoint, restrict CORS"
git push
```

---

## Verify

- [ ] Flask app uses `autoescape=True` or Jinja2 Environment with autoescaping
- [ ] CSP `after_request` hook present in `app.py`
- [ ] No `innerHTML = ...` with untrusted data in `app.js` or templates
- [ ] No `eval()` in `app.js`
- [ ] `app.secret_key` and `JWT_SECRET` read from `os.environ.get()`
- [ ] `config.py` has no hardcoded string literals for passwords or keys
- [ ] `hash_password()` uses Werkzeug instead of MD5
- [ ] `DEBUG` controlled by environment variable
- [ ] `/debug` route removed
- [ ] CORS restricted to specific origins
- [ ] `.env.example` committed; `.env` in `.gitignore`

---

## Key Takeaway

> Copilot Chat + Inline Agent fixes every remaining vulnerability across templates, Python, and JavaScript with targeted prompts — no manual line-by-line editing needed.

---

**Next**: [Exercise 05 — CLI: Agentic Review + Custom Agents](exercise-05-cli-review-agents.md)
