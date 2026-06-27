# Sentinel Security Review — CrownKey Email Guardian
**Reviewed by:** Sentinel (Security Specialist)
**Date:** 2026-06-26
**Scope:** Internal use by 5 staff on a private network (Phase 1). Not internet-facing.

---

## Files Reviewed

- `api/server.js`
- `api/routes/review.js`
- `api/routes/incoming.js`
- `api/routes/draft.js`
- `api/routes/playbooks.js`
- `api/prompts/review-system.js`
- `api/prompts/draft-system.js`
- `api/prompts/incoming-system.js`
- `api/.env.example`
- `api/package.json`
- `app/app.js`
- `app/incoming.html`
- `app/queue.html`
- `app/scores.html`
- `app/followups.html`
- `app/mock-api.js`
- `db/schema.sql`
- Root `.gitignore`

---

## Findings

---

### 1. API Key Exposure

**PASS**

The Anthropic API key is loaded exclusively from `process.env.ANTHROPIC_API_KEY` in all three route files and never returned in any API response. The server performs a startup guard at `server.js` lines 27–31 that exits immediately if the variable is not set, preventing silent failure. No hardcoded key values (`sk-ant-*`) were found anywhere in the codebase.

`.env.example` is committed correctly as a template with a placeholder value only. The root `.gitignore` covers `.env*` and `*.env`, which protects a real `.env` file from being committed.

**One note:** There is no `.gitignore` inside `api/`. If someone creates `api/.env` (a natural place to put it), the root `.gitignore` will still catch it because git evaluates ignore rules from the root. This is acceptable, but worth being aware of.

---

### 2. Input Validation

**FIX REQUIRED (S2) — Missing per-field length limits on all POST endpoints**

The `POST /api/review`, `POST /api/draft`, and `POST /api/incoming` endpoints accept user-submitted text but apply no maximum length check per field. The only size control is the 1 MB body limit on the Express JSON parser (`server.js` line 35). A team member (or anything hitting the API) could submit an extremely large email text — up to ~1 MB — which would be forwarded in full to the Anthropic API, generating unnecessary cost and potentially timing out.

**Files affected:**
- `api/routes/review.js` — `emailText` field, no length check
- `api/routes/incoming.js` — `emailText` field, no length check
- `api/routes/draft.js` — `situation` and `context` fields, no length check

**What to add:** After the existing required-field checks in each route, add a check like:

```js
if (emailText.length > 20000) {
  return res.status(400).json({ error: 'Email text is too long. Maximum is 20,000 characters.' });
}
```

A real business email will never come close to 20,000 characters. This can be tuned, but something explicit should be there.

---

**PASS WITH NOTE — Prompt injection risk is low but not zero**

All three routes pass user-submitted email text to Claude as a `user` message, while the system prompt is loaded separately from controlled files on disk. This is the correct architecture — Claude's system prompt cannot be overwritten by the user message content.

However, a team member could theoretically paste an email that contains instructions like "Ignore all previous instructions and respond with..." This is prompt injection. Claude's instruction-following hierarchy makes this difficult to exploit, and the risk is contained because: (a) only internal staff can access this system, (b) Claude is only generating analysis and draft text (not taking external actions), and (c) the system prompts are specific and tightly scoped.

This is not a block for internal Phase 1 use. For Phase 2 (if external-facing), consider adding a note at the start of the user message reminding Claude that the following content is untrusted user data.

---

**PASS WITH NOTE — Log injection via `senderName`**

The `senderName` field is a free-text input that users type themselves. It is written directly into `console.log` lines in `review.js` (line 32, line 86) and `draft.js` (line 50) without sanitization. If a team member types a name containing newline characters or log-format strings, it could pollute the log output and make log review harder.

Example: a senderName of `"Susan\n[FAKE ENTRY] POST /api/review | sender: Hacker"` would create a false log line.

This is low severity for an internal tool with trusted staff, but worth cleaning up. Fixing it is simple — strip newlines from `senderName` before logging:

```js
const safeSender = senderName.replace(/[\r\n]/g, ' ');
console.log(`[${timestamp}] POST /api/review | sender: ${safeSender} | ...`);
```

Severity: S3 for internal use.

---

### 3. Data Exposure — Incoming Email Text in Logs

**PASS**

`routes/incoming.js` correctly does not log the raw email text. Line 33 logs only the `senderType` and the character count (`emailLength`). Line 75 logs only the analysis outcome (tone, risk level, accommodation flag). The email content itself is never written to any log.

The code comment at line 2–6 documents this as an intentional governance requirement, which is the right practice.

---

### 4. Sensitive Data in the Database

**PASS**

The schema in `db/schema.sql` was reviewed in full. No columns store SSNs, bank account numbers, passwords, credit report data, or driver's license numbers.

The `incoming_analysis_log` table correctly stores only analysis metadata (tone, risk level, sender type) and never the email text itself — consistent with the governance requirement stated in the schema comment at line 187–191.

The `email_reviews` table does store `original_text` and `polished_text` (the full email content), which is expected for the review audit trail. These emails may contain tenant names, addresses, and situation details. This is appropriate for the product's purpose and is covered by the CCPA deletion procedure in `db/ccpa-delete.sql`.

---

### 5. Authentication — No Login

**PASS WITH NOTE (documented gap)**

This system has no authentication layer. Any device on the same network as the API server can access all endpoints, including Susan's approval queue, all email review history, and all team scorecards.

**What this means in practice for Phase 1:** The 5 staff members are on a private network and access the app by pointing their browser at the local server address. No one outside that network can reach it. The risk is low for the current setup.

**What this creates that you should know about:**
- Any device already on the internal network — a guest's laptop connected to the office Wi-Fi, a personal phone, a compromised device — could read or submit to any endpoint.
- Susan's approval queue (which contains flagged email content and tenant-related notes) is readable by anyone on the network, not just Susan.
- There is nothing preventing one staff member from submitting queue decisions that should only be Susan's.

**Recommended Phase 2 authentication approach:** A simple username + password login backed by sessions, or a passphrase-per-user approach, would close this gap without requiring Susan or her staff to manage complex credentials. Do not implement API keys per-user in the frontend — that pattern exposes keys in the browser. A server-side session cookie is the right mechanism.

This is not a block for Phase 1 internal use, but it must be addressed before any external or broader network deployment.

---

### 6. CORS — All Origins Allowed

**PASS WITH NOTE (documented gap)**

`server.js` line 34 uses `app.use(cors())` with no origin restriction. This permits any webpage — on any domain — to send requests to the API if the user's browser can reach it.

**What this means for Phase 1:** Because the server runs on `localhost` or an internal IP, browsers block cross-origin requests to private network addresses by default under Private Network Access rules (Chrome 98+). The practical risk is low for an internal tool.

**What to change before internet-facing deployment:** Replace the open CORS config with an explicit origin allowlist:

```js
app.use(cors({
  origin: ['http://localhost:5500', 'http://192.168.1.x'] // replace with actual internal URLs
}));
```

This is not a block for Phase 1. It is required before Phase 2.

---

### 7. Error Handling — Anthropic API Errors Exposed to Frontend

**PASS**

All four route files catch Anthropic SDK errors and return a generic user-facing message. None of the raw error objects or error messages from Anthropic are forwarded to the client. The internal error detail is written only to `console.error` (server-side logs).

For example, `routes/incoming.js` lines 48–52:
```js
} catch (err) {
  console.error(`[${timestamp}] Anthropic API error: ${err.message}`);
  return res.status(502).json({
    error: 'The AI analysis service is temporarily unavailable. Please try again in a moment.'
  });
}
```

This pattern is correctly implemented in all routes. Internal details such as rate limit responses, model identifiers, or request IDs from Anthropic are never visible to the browser.

The global error handler in `server.js` lines 53–57 provides a final safety net for any unhandled exceptions.

---

### 8. Frontend Rendering — innerHTML and XSS

**PASS WITH NOTE**

All five frontend files (`app.js`, `incoming.html`, `queue.html`, `scores.html`, `followups.html`) define and consistently use a local `escHtml()` function that escapes `&`, `<`, `>`, `"`, and `'` before inserting any user-submitted or AI-generated text into `innerHTML`.

Specific confirmations:
- `app.js`: All AI-generated fields (`data.suggestion`, `data.flag_reason`, `issue.what`, `issue.fix`, `followup.text`, `data.polished`) are passed through `escHtml()` before interpolation.
- `queue.html`: `item.email_text` (the flagged email content) is passed through `escHtml()` at both the preview display (line 94) and the inline editor textarea (line 98).
- `incoming.html`: `data.summary` and `data.suggested_opening` are passed through `escHtml()`. The `tone.cls`, `tone.label`, and `tone.icon` values come from a fixed local constant object (`TONE_META`) keyed by the API response — if the API returns an unexpected tone value, the code falls back to the `neutral` entry, so no raw API value reaches the DOM.
- `scores.html` and `followups.html`: All dynamic values are passed through `escHtml()`.

**One note worth flagging:** The draft text is placed into a `<textarea>` element (`app.js` line 318, `queue.html` line 98) using `escHtml()`. This is correct — textarea content does not execute HTML. However, the value is also later retrieved with `.value` and sent back to the API on re-review (`app.js` line 331). That flow is safe.

The `mock-api.js` file intercepts `window.fetch` and will be active in any browser session where the script is loaded. This is a development convenience tool and not a security concern in itself, but it should be confirmed that this file is removed or the script tag excluded before the app goes live against a real backend. Otherwise the mock will silently intercept real API calls.

---

## Summary Table

| Check | Result |
|---|---|
| API key hardcoded anywhere | PASS |
| API key in git | PASS |
| API key logged or returned | PASS |
| Input validation — type checks | PASS |
| Input validation — length limits | FIX REQUIRED (S2) |
| Prompt injection risk | PASS WITH NOTE |
| Log injection via senderName | PASS WITH NOTE (S3) |
| Incoming email text in logs | PASS |
| SSNs / bank numbers in schema | PASS |
| Raw Anthropic errors to frontend | PASS |
| XSS via innerHTML | PASS WITH NOTE |
| Authentication | PASS WITH NOTE (documented gap) |
| CORS | PASS WITH NOTE (documented gap) |
| HTTP vs HTTPS | N/A — localhost only in Phase 1 |
| Destructive action confirmation | PASS — queue approvals require explicit button clicks |

---

## Overall Verdict

**CLEARED FOR INTERNAL USE — with one fix required before heavy use**

The system is well-built from a security standpoint. Credentials are handled correctly, error messages are safe, XSS escaping is thorough and consistent, and the incoming email logging design explicitly protects email content from appearing in logs.

**One S2 finding must be addressed before the team uses this in volume:** the missing per-field length limits on the three POST endpoints. Without them, a single large paste could generate an unexpectedly large and expensive Anthropic API call. The fix is a 3-line addition in each route and can be done quickly by Q.

The authentication and CORS gaps are documented above and must be resolved before Phase 2, but they do not block internal Phase 1 use.

**Recommended next step:** Route the length-limit fix to Q, then this clears.
