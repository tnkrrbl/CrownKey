# TARS Test Report — CrownKey Email Guardian
**Tested by:** TARS (Testing Specialist)
**Date:** 2026-06-26
**Scope:** Frontend UI (static HTML + mock API). Node.js not installed; real API not tested.
**Method:** Source code review of all 5 pages, app.js, mock-api.js, nav.js, and the 3 API route files.

---

## Test 1: Main Review Page — "I Have a Draft" Mode

**PASS**

- Textarea with placeholder text: present
- Recipient type dropdown (Tenant / Owner / Vendor): present
- Sender dropdown with 5 real names (Susan, Tiffany, Maria, Priya, James): present — not TBD
- "Review My Email" button with that exact label: present
- "I have a draft" and "Help me write it" mode tabs: present, with correct ARIA attributes
- Mode switching hides/shows the correct panels: confirmed in app.js lines 25-39
- Collapsible context field: present with working toggle logic
- Validation: alerts if email textarea is empty before submitting

---

## Test 2: Review Results — All Three Outcomes

**PASS WITH NOTE**

The mock cycles through all three outcomes in order on each "Review My Email" click, so all three are reachable.

**Clear to Send:** Green `status-clear` banner, excellence score badge (8/10), "To score a 10" suggestion box, "Copy Email to Clipboard" button. All present.

**Needs Edits:** Yellow `status-edits` banner, excellence score (4/10), numbered issue list with what/fix pairs, pre-filled edit textarea, "Re-Review" button. All present.

**Route to Susan:** Red `status-route` banner, flag reason in plain English, yellow warning box telling the sender not to send. All present. No "sent to Susan's queue" automated confirmation is displayed — the UI tells the sender "Susan will review within 2 business hours" but does not show a queue submission confirmation. This is accurate for Phase 1 (the email is not actually queued automatically yet), so it is acceptable.

**Polish diff:** Present on Clear and Needs Edits outcomes. Shows "Your Original" and "Polished Version" side by side. "Accept Polish" and "Keep My Original" buttons both update `window._guardianActiveEmail` and show a confirmation message. Changes list renders below. Accept/Keep buttons work correctly.

**Follow-up detection:** The mock's Clear outcome has `followup: null`, so the follow-up banner is not shown for that outcome. None of the three mock outcomes include a follow-up object with a date. The banner code (`buildFollowUpBanner`) is present and correct but cannot be tested with the current mock data — no mock outcome triggers it.

NOTE: Q should add a fourth mock outcome (or modify one) that includes a `followup` object, so Susan can see that feature working during her review.

---

## Test 3: "Help Me Write It" Mode

**PASS WITH NOTE**

- Recipient type and sender dropdowns: present (same 5 names)
- Situation dropdown with all 10 playbook options by name: present and matches the 10 playbook files on disk
- Free-text description field visible by default, hidden when a situation is selected: confirmed in app.js lines 54-62
- "Generate Draft" button: present and labeled "Generate Draft"
- Validation: alerts if neither situation nor description is provided

After generate: the draft text and recipient value are copied into Mode A fields, then the tab switches to Mode A and a toast says "Draft ready. Review it, then click Review My Email." This is the correct flow.

NOTE — MISSING CARRY-OVER: The sender selected in Mode B is captured (line 124 of app.js) and sent to the API, but it is NOT written back into `sender-select-a` after switching to Mode A. If Susan or a team member generates a draft as "Tiffany" in Mode B, then clicks "Review My Email" in Mode A, the sender field will be blank (defaulting to "— Choose —"). The review will still submit because sender validation is not enforced, but the AI will receive no sender name. This should be fixed.

---

## Test 4: Incoming Email Page (incoming.html)

**PASS WITH NOTE**

- Textarea for email paste: present
- "Who sent this?" dropdown (Tenant / Owner / Vendor): present
- "Analyze This Email" button: present and correctly labeled
- Result renders: tone badge (Frustrated with correct class), risk pill (Medium, yellow), summary paragraph, suggested reply opening block
- "Start My Reply" button: present. On click, it saves the suggested opening to `sessionStorage` and navigates to `index.html?prefill=1`

NOTE — PREFILL BUG: The `sessionStorage` prefill handler (lines 166-175 of incoming.html) reads `ck_prefill_email` and writes it into `incoming-textarea` — the textarea on the Incoming page itself, not on index.html. When "Start My Reply" navigates the user to `index.html`, there is no code in `app.js` that reads `sessionStorage` and pre-fills the email textarea in Mode A. The feature will silently do nothing — Susan will land on a blank Review page. Q needs to add the prefill handler to `app.js`.

"Copy Opening" button: present and uses `navigator.clipboard`.

---

## Test 5: Follow-Up Tracker (followups.html)

**PASS**

- Table renders with columns: Recipient, Commitment Made, Due Date, Assigned To, Status, Action
- Mock data includes 5 items covering all three statuses: pending (3), overdue (1), complete (1)
- Status badges: pill-pending (yellow), pill-complete (green), pill-overdue (red) — all CSS classes confirmed present
- "Mark Complete" button present for pending and overdue rows, replaced with "Done" text for already-complete rows
- Filter by status and by team member: both dropdowns present and wired to re-filter the rendered table
- Overdue items use `pill-overdue` (red background, red text) making them visually distinct from pending
- "Mark Complete" button disables itself and shows "Saving…" during PATCH, updates local state to "complete" on success without a full page reload

The item with id 3 (Oak Property LLC, due 2026-06-23) is correctly marked overdue — its due date is 3 days in the past from today's date (2026-06-26).

---

## Test 6: Susan's Approval Queue (queue.html)

**PASS WITH NOTE**

- Two mock items render with: sender name, recipient type, submitted date, flag reason in plain English — all present
- "Needs Review" badge shown on each item (uses `pill-overdue` CSS, red): present
- "Show email" toggle expands/collapses email text — confirmed in code. Toggle arrow changes and text changes between "Show email" and "Hide email"
- Three action buttons per item: "Approve As-Is" (green), "Edit Then Approve" (gold), "Send Back with Note" (red) — all present
- Approve As-Is: calls PATCH, shows green resolved banner "Approved and sent to team member.", disables all buttons
- Send Back with Note: shows a note textarea on click. Validates that note is not empty before submitting. On confirm, shows "Sent back with your note."
- Resolved state is per-item — resolving one item does not affect others

**Edit Then Approve flow — specifically investigated:**
The inline editor textarea is pre-populated using `escHtml(item.email_text)` inside `.innerHTML`. For the mock data (no ampersands, quotes, or angle brackets in the email text), this will display correctly. However, with real AI-reviewed email content that contains apostrophes, smart quotes, or em-dashes, the user will see raw HTML entities in the editor (e.g., `We&#39;ve decided` instead of `We've decided`). This is the same category of bug referenced in the test plan. It is latent — not visible with current mock data but will appear immediately when real data flows through.

The "Edit Then Approve" toggle itself works correctly: first click opens the editor and changes button text to "Approve This Edit." Second click calls `resolveItem` with the edited text.

NOTE — GARBLED TEXT CONCLUSION: The bug is real but is not visible with mock data because mock email text contains no HTML special characters. Q needs to fix both `queue.html` line 98 and `app.js` line 318 to use `.value =` assignment (not `.innerHTML`) for textarea population, or to use `textContent` with the raw unescaped string.

---

## Test 7: Team Scorecards (scores.html)

**PASS**

- All 5 team members have scorecards: Susan (9.2), Tiffany (7.8), Maria (8.1), Priya (8.9), James (6.5)
- Each scorecard shows: name, average score as X.X/10, emails reviewed count, trend arrow
- Trend arrows: up (green ↑), down (red ↓), flat (gray →) — all three are represented in mock data and all CSS classes (`trend-up`, `trend-down`, `trend-flat`) confirmed in styles.css
- Mini bar chart: rendered as HTML div bars using inline `height` percentage style. 4-month history with month labels (Mar, Apr, May, Jun). Current month bar gets the `.current` class. This renders without SVG — no SVG errors possible
- Filter dropdown allows viewing by individual team member or all: wired and working
- Follow-Up Completion table: shows On Time, Missed, and Rate columns per person. Rate is color-coded green (no misses), yellow (1 miss), red (2+ misses)

James correctly shows red (3 missed) and Susan correctly shows green (0 missed).

---

## Test 8: Navigation

**PASS WITH NOTE**

- All 5 nav links are defined in `nav.js`: Review Email, Incoming, Follow-Ups, Susan's Queue, Scorecards
- Active page detection works by matching the current filename to each link's `href` — confirmed in nav.js lines 51-64
- Active link gets `.active` class and `aria-current="page"` attribute
- Hamburger toggle: button with 3 span "bars" is present. Click toggles `.open` class on the link list. On mobile, closing happens when any link is clicked
- "Susan's Queue" link has `.susan-only` class — CSS applies gold background on hover to distinguish it. No access restriction is enforced (intentional for Phase 1)

NOTE: All 5 pages include `<script src="mock-api.js">` and `<script src="nav.js">` before their page-specific scripts, which is the correct load order.

---

## Test 9: Mock API Behavior

**PASS WITH NOTE**

All 6 endpoint intercepts confirmed:
- `/api/review-email` — cycles through 3 outcomes
- `/api/generate-draft` — returns a realistic late-rent draft
- `/api/followups` (GET and PATCH) — returns 5 items, PATCH returns success
- `/api/queue` (GET and PATCH) — returns 2 items, PATCH returns success
- `/api/scores` — returns 5 scorecards
- `/api/analyze-incoming` — returns a frustrated/medium tone analysis

Mock data quality: realistic names (James Okafor, Maria Hernandez, Oak Property LLC), real-sounding email text, real flag reasons with Fair Housing language, accurate dates relative to today (2026-06-26).

CRITICAL NOTE — ENDPOINT NAME MISMATCH: The mock API intercepts different endpoint paths than the real API exposes. This means when Node.js is installed and Susan switches from mock to real, every call will silently fail (fall through to a real fetch against paths that don't exist):

| Frontend calls | Mock intercepts | Real API serves |
|---|---|---|
| `/api/review-email` | `/api/review-email` | `/api/review` |
| `/api/generate-draft` | `/api/generate-draft` | `/api/draft` |
| `/api/analyze-incoming` | `/api/analyze-incoming` | `/api/incoming` |

The mock works now precisely because it intercepts the same wrong names. But when mock-api.js is removed, every primary action (Review, Generate, Analyze Incoming) will get a 404. The remaining endpoints (`/api/followups`, `/api/queue`, `/api/scores`) are not implemented in the real API at all yet, so those are a Phase 2 concern — but they must be noted.

Q must either rename the frontend's fetch calls to match the real API, or add route aliases in the real API before Node.js is switched on.

---

## Test 10: Sentinel Fix Verification

**PASS**

Length limits confirmed present in all three files:

- `review.js` lines 25-30: `emailText > 20000` → 400 error; `context > 500` → 400 error. Confirmed.
- `incoming.js` lines 25-27: `emailText > 20000` → 400 error. Confirmed.
- `draft.js` lines 43-48: `situation > 2000` → 400 error; `context > 500` → 400 error. Confirmed.

All three return plain-English error messages, not raw stack traces.

---

## Summary of Findings

### Bugs That Must Be Fixed Before Launch

**BUG 1 — Endpoint names will break when mock is removed** (mock-api.js / app.js / incoming.html)
The frontend calls `/api/review-email`, `/api/generate-draft`, and `/api/analyze-incoming`. The real API serves `/api/review`, `/api/draft`, and `/api/incoming`. These must match before Node.js is switched on.

**BUG 2 — "Start My Reply" prefill does not work** (incoming.html / app.js)
The prefill handler that reads `sessionStorage` is in `incoming.html`, not in `app.js`. When the user clicks "Start My Reply" and lands on `index.html`, nothing is pre-filled. The handler needs to move into `app.js`.

**BUG 3 — Sender not carried over from Mode B to Mode A** (app.js lines 142-147)
When a draft is generated in "Help me write it" mode and the tab switches to "I have a draft," the recipient is pre-filled but the sender dropdown is left blank. If the team member clicks "Review My Email" without noticing, the review runs with no sender name, which affects the AI's output and scorecarding.

**BUG 4 — HTML entities appear in editable textareas with real data** (queue.html line 98, app.js line 318)
Both the queue inline editor and the "Needs Edits" edit textarea set their content using `.innerHTML` with `escHtml()`. This converts apostrophes to `&#39;`, quotes to `&quot;`, and ampersands to `&amp;` — visually garbled text for the person editing. With mock data this is invisible (mock emails have no special characters), but it will appear immediately with real AI-generated content. Fix: assign `.value = rawText` directly on the textarea element after creating it, instead of injecting via innerHTML.

### Minor Notes (Not Blocking)

- The follow-up detection banner cannot be demoed because no mock outcome includes a `followup` object. Add one so Susan can see the feature.
- "Susan's Queue" link is not access-restricted — anyone on the team can visit it. Intentional for Phase 1 but worth noting for Phase 2.

---

## Overall Verdict

**NEEDS FIXES FIRST**

The frontend is well-built — the structure, layout, and individual page flows are solid. Four bugs stand out, one of which (endpoint name mismatch) will cause a complete failure the moment Node.js is enabled. The other three are functional gaps that Susan will notice immediately when she tests with real data. These should be fixed before her review session.
