# Exercise 13 — Fix XSS Vulnerabilities

**Duration**: 10 minutes
**Copilot Feature**: Copilot Agent + Copilot Chat
**Goal**: Eliminate Cross-Site Scripting (XSS) vulnerabilities in the Jinja2 templates by enabling autoescaping and adding Content Security Policy headers.

---

## Background

XSS (OWASP A03:2021) allows attackers to inject JavaScript into pages viewed by other users. In Jinja2, the risk comes from templates using `{{ variable }}` without the `| e` escape filter or without global autoescaping enabled. Adding a Content Security Policy (CSP) header provides a browser-level second layer of defence.

---

## Step 1 — Identify XSS Vectors in Templates

Open Copilot Chat with the `templates/` folder attached. Paste:

```
Review the Jinja2 templates in the templates folder.
List every {{ variable }} expression that renders user-supplied data without the | e escape filter or Markup() wrapper.
Also check if autoescaping is enabled in the Flask app init.
```

---

## Step 2 — Enable Flask Autoescaping

In Copilot Chat with `#app.py` attached, paste:

```
Show me how to enable Jinja2 autoescaping for all .html templates when initialising the Flask app.
If the current app has autoescape=False or no autoescape setting, provide the corrected Flask() constructor call.
```

Apply the change using `Ctrl+I` inline edit on `app.py`.

---

## Step 3 — Add Content Security Policy Header

In Copilot Chat, paste:

```
Add an after_request hook to the Flask app that sets a Content-Security-Policy response header.
The policy should: allow scripts only from self, disallow inline scripts, disallow eval, allow styles from self.
Show the exact Flask code and explain each CSP directive.
```

Apply the change with Copilot Agent.

---

## Step 4 — Commit and Verify

```bash
git add apps/securetrails-vulnerable/app.py apps/securetrails-vulnerable/templates/
git commit -m "fix(security): enable Jinja2 autoescaping and add CSP headers"
git push
```

---

## Verify

- [ ] Flask app initialises with `autoescape=True` or equivalent
- [ ] CSP `after_request` hook is present in app.py
- [ ] CodeQL XSS alert cleared after push (allow 5–10 min)
- [ ] Copilot Chat confirms no remaining unescaped user output in templates

---

## Key Takeaway

> Enabling autoescaping once protects every existing and future template — Copilot identifies the gap and applies the fix in one step.
