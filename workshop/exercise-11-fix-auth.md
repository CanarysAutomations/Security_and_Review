# Exercise 11 — Fix Broken Authentication

**Duration**: 10 minutes
**Copilot Feature**: Copilot Agent + Copilot Chat
**Goal**: Add ownership checks to the booking endpoints so users cannot access or modify other users' resources.

---

## Background

Broken Object-Level Authorisation (BOLA/IDOR — OWASP A01:2021) occurs when an endpoint does not verify that the requesting user owns the resource they are accessing. In SecureTrails, users can delete any booking by guessing the booking ID in the URL. The fix is a reusable Flask decorator that checks ownership before the route handler runs.

---

## Step 1 — Identify the Vulnerable Endpoints

In Copilot Chat with `#app.py` attached, paste:

```
List every Flask route in app.py that accepts a resource ID (like booking_id or trail_id) as a URL parameter.
For each, tell me whether the route checks that session['user_id'] matches the owner of that resource before performing the operation.
Mark each as SAFE or VULNERABLE.
```

---

## Step 2 — Generate a Ownership-Check Decorator

In Copilot Chat, paste:

```
Write a Flask decorator called require_booking_owner that:
1. Reads booking_id from the URL parameter
2. Queries the database to get the booking's user_id
3. Compares it to session['user_id']
4. Returns a 403 JSON error if they do not match
5. Calls the decorated function only if they match

Show usage applied to the DELETE /booking/<int:booking_id> route.
```

---

## Step 3 — Apply the Fix with Copilot Agent

Select the route handler section of `app.py`. Press `Ctrl+I` and paste:

```
Add the require_booking_owner decorator (from the code I just generated) to every booking DELETE, PUT, and PATCH route.
Place the decorator definition at the top of the route section, before the first booking route.
```

Review and accept the diff.

---

## Step 4 — Commit the Fix

```bash
git add apps/securetrails-vulnerable/app.py
git commit -m "fix(security): add ownership checks to booking endpoints (BOLA/IDOR)"
git push
```

In Copilot Chat, paste:

```
Review the updated DELETE /booking/<id> route in app.py and confirm the ownership check is correctly implemented. Are there any bypass scenarios I should test?
```

---

## Verify

- [ ] `require_booking_owner` decorator exists in app.py
- [ ] All booking mutation routes (DELETE, PUT, PATCH) use the decorator
- [ ] Copilot Chat confirms correct implementation
- [ ] Fix is committed and pushed
- [ ] Copilot identified no bypass scenarios in the implementation

---

## Key Takeaway

> Copilot generates the secure pattern once (a decorator) and applies it consistently — no endpoint gets missed.

---

**Next**: [Exercise 12 — Verify Fixes & Complete the Cycle](exercise-12-verify-complete.md)
