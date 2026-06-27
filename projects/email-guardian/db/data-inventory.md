# Email Guardian — Data Inventory
**Last updated:** 2026-06-26
**Owned by:** Neo (Database Specialist)
**Status:** Production schema v1.0

This document lists every table in the Email Guardian database, explains what it stores, who can access it, and how long data is kept.

---

## Table 1: `team_members`

**What it stores:** The five people who use the Email Guardian — their names, email addresses, roles, and whether they are currently active.

**Contains personal data?** Yes — staff names and email addresses.

**Who can read it:** Application (all features), Susan's admin panel.

**Who can write to it:** Susan (manager) only, through the admin panel.

**Retention:** Records are kept as long as the person is employed. When a staff member leaves, their record is set to inactive. It is not automatically deleted. A CCPA request by a former employee triggers full deletion (see `ccpa-delete.sql`).

---

## Table 2: `email_reviews`

**What it stores:** Every outgoing email that passed through the Guardian. Includes the original draft, the polished version, who wrote it, who it was sent to, which property it concerns, the AI's score and tier result, and any Fair Housing flags triggered.

**Contains personal data?** Yes — tenant names, owner names, vendor names, property addresses, and the full text of the email (which may contain additional personal details).

**Who can read it:**
- The team member who wrote the email (their own reviews)
- Susan (all reviews, through the admin panel and dashboard)

**Who can write to it:** Application only (one row per email submission). No manual edits — the record is the permanent audit trail.

**Retention:** Kept indefinitely unless a CCPA deletion request names the sender or recipient. There is no automatic expiry. Emails older than 3 years may be archived by Susan's request.

**Audit field — `criteria_version`:** Records which version of the Fair Housing rules (see `rules/fair-housing-rules.md`) was active when the review ran. Currently `v1.0`. This allows future audits to know exactly what rules were applied.

---

## Table 3: `follow_up_items`

**What it stores:** Date commitments detected in outgoing emails (e.g., "I'll follow up by Friday"). Tracks whether the commitment was kept.

**Contains personal data?** Indirectly — links to `email_reviews`, which contains names. The `assigned_to` field contains a team member name. The `promise_text` field may contain a tenant or owner name if it was in the original email.

**Who can read it:**
- The assigned team member (their own follow-ups)
- Susan (all follow-ups, through the dashboard)

**Who can write to it:** Application (creates rows automatically). Team members update status to "completed" through the UI.

**Retention:** Deleted automatically when the linked `email_reviews` row is deleted (cascade). No separate retention policy needed.

---

## Table 4: `approval_queue`

**What it stores:** High-risk emails held for Susan's review before they can be sent. Includes the reason it was flagged, Susan's edited version (if she changed it), and her notes.

**Contains personal data?** Indirectly — links to `email_reviews`. Susan's notes may also contain names.

**Who can read it:** Susan only.

**Who can write to it:**
- Application (creates rows when a Tier 3 result is produced)
- Susan (updates status, adds edited version and notes)

**Retention — two deletion triggers (either one applies):**
1. **Post-review delete:** Once Susan has taken action on an item (status = approved / edited / rejected / sent-back), that queue record is immediately eligible for deletion. Susan can clear resolved items from the admin panel at any time.
2. **90-day auto-purge:** Resolved items older than 90 days are automatically deleted by the cleanup job, regardless of whether Susan manually cleared them.

The linked `email_reviews` archive row is NOT deleted when a queue item is purged — the email stays in the searchable archive. Only the queue metadata is removed.

---

## Table 5: `learning_pairs`

**What it stores:** Examples of before-and-after edits that Susan made to flagged emails. These are candidates for improving how the AI reviews future emails — but they are NEVER automatically applied.

**Contains personal data?** Yes — the original and corrected email texts may contain tenant or owner names.

**Who can read it:** Susan only, through the learning review panel.

**Who can write to it:**
- Application (creates rows when Susan edits a Tier 3 email)
- Susan (updates status to accepted or rejected)

**Critical governance rule:** A learning pair in `status = 'pending-review'` or `status = 'rejected'` has NO effect on system behavior. Only `status = 'accepted'` rows are read by the AI, and only when Susan explicitly triggers a rule refresh. The application must enforce this — no background job should auto-apply pending pairs.

**Retention:** Kept indefinitely. A CCPA request may trigger deletion if the pair contains the requesting person's name or email in the email text (handled by `ccpa-delete.sql`).

---

## Table 6: `monthly_scorecards`

**What it stores:** Performance summary per team member per calendar month — how many emails they reviewed, average excellence score, tier breakdown, and follow-up completion rate.

**Contains personal data?** Yes — links to `team_members` by ID, and the data describes an individual employee's performance.

**Who can read it:** Susan only (managers view all; staff do not see each other's scores in v1).

**Who can write to it:** Application only (calculated and written at the end of each month or on-demand by Susan).

**Retention:** Kept as long as the team member record exists. Deleted via cascade when a team member is deleted through CCPA. Aggregate monthly summaries with no PII may be retained even after individual deletion — this is Susan's discretion.

---

## Table 7: `incoming_analysis_log`

**What it stores:** A brief log entry each time a team member pastes an incoming email for tone and risk analysis. Stores ONLY the analysis results — tone label, risk level, and who ran the analysis. The full email text is never stored.

**Contains personal data?** Minimally — the `analyzed_by` field contains the team member's name. No tenant, owner, or vendor names are stored. No email content is stored.

**Who can read it:** Susan (admin panel, for usage monitoring). Not visible to staff.

**Who can write to it:** Application only (one row per analysis run).

**Retention — two deletion triggers (either one applies):**
1. **30-day auto-delete:** Any row where `created_at` is older than 30 days is deleted by the daily cleanup job.
2. **Post-review delete:** Once Susan has reviewed and acted on the email(s) associated with a given analysis session, those log entries are eligible for immediate deletion — no need to wait 30 days. Susan can trigger this from the admin panel.

This is a hard governance requirement — do not disable or skip this cleanup.

---

## CCPA Compliance Summary

| Table | Contains PII | Deletable by person? | Method |
|---|---|---|---|
| team_members | Yes | Yes | `ccpa-delete.sql` |
| email_reviews | Yes | Yes | `ccpa-delete.sql` (cascade) |
| follow_up_items | Indirectly | Yes | Cascade from email_reviews |
| approval_queue | Indirectly | Yes | Cascade from email_reviews |
| learning_pairs | Yes (email text) | Yes | `ccpa-delete.sql` (text match) |
| monthly_scorecards | Yes (by FK) | Yes | Cascade from team_members |
| incoming_analysis_log | Minimally | Yes | `ccpa-delete.sql` (by name) |

**To process a CCPA deletion request:** See `ccpa-delete.sql`. Run the script with the person's name and email. Record the deletion in an external audit log (Notion or signed document) before executing.

---

## What Is Never Stored

The following data is explicitly prohibited from this database by governance policy:

- Full text of incoming emails from tenants, owners, or vendors
- Social Security numbers
- Bank account numbers or routing numbers
- Driver's license numbers
- Passwords or authentication credentials
- Immigration status
- Medical or disability diagnosis details

If a future feature proposes storing any of the above, it must be reviewed by Asimov (governance) and Mason (legal) before the schema is changed.
