When performing a code review, apply the OWASP Top 10 2021 checklist.
Focus on: A01 Broken Access Control, A02 Cryptographic Failures, A03 Injection, A05 Security Misconfiguration.
Flag any user input that reaches a database query, file path, or HTML output without sanitisation.

## Security Conventions for SecureTrails

- Use parameterized queries (`?` placeholder) for all SQLite `execute()` calls — never f-strings or string concatenation with user input.
- Use `werkzeug.security.generate_password_hash()` and `check_password_hash()` for all password handling — never MD5 or SHA1.
- Read all secrets from `os.environ.get('VARIABLE_NAME')` — never hardcode values in source files.
- Enable Jinja2 autoescaping for all HTML templates — never render user-controlled strings with `{{ variable | safe }}`.
- Replace `innerHTML` assignments with `textContent` or safe `createElement/appendChild` patterns — never assign untrusted data to `innerHTML`.
- Never use `eval()` in JavaScript — use explicit parse functions or data attributes instead.
- Gate admin routes with `session.get('role') == 'admin'` checks — never trust URL parameters for identity.
- Remove or gate `/debug` endpoints behind an environment flag — never expose `secret_key`, JWT secrets, or database paths in API responses.
- Restrict CORS to known origins via an environment variable — never use `origins="*"` in production.
- Log exceptions at WARNING level using Python's `logging` module — never swallow exceptions silently.
