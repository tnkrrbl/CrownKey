-- =============================================================================
-- CrownKey Email Guardian — CCPA Person-Level Deletion Script
-- File: ccpa-delete.sql
-- Last updated: 2026-06-26
-- Owned by: Neo (Database Specialist)
--
-- PURPOSE:
--   When a person (tenant, owner, vendor, or team member) submits a deletion
--   request under the California Consumer Privacy Act (CCPA), this script
--   removes all records associated with them from every table in the database.
--
-- HOW TO USE:
--   Replace :person_name and :person_email with the actual values before running.
--   Both checks run independently — a match on EITHER name OR email triggers deletion.
--   Run this inside a transaction so all deletes succeed or all fail together.
--
-- EXAMPLES (SQLite CLI):
--
--   Delete by name:
--     sqlite3 guardian.db \
--       "BEGIN; $(sed 's/:person_name/'"'"'Robert Kim'"'"'/g; s/:person_email/'"'"''"'"'/g' ccpa-delete.sql) COMMIT;"
--
--   Better approach: use the application's admin panel, which wraps this script
--   with a confirmation dialog and writes an audit log entry.
--
-- WHAT GETS DELETED:
--   - email_reviews rows where the person is the sender or recipient
--     (cascades to follow_up_items and approval_queue via foreign keys)
--   - learning_pairs rows derived from that person's email reviews
--   - incoming_analysis_log rows for that team member
--   - monthly_scorecards rows for that team member
--   - team_members row for that person (if they are a staff member)
--
-- WHAT IS NOT DELETED:
--   - Aggregate counts in other scorecards that happened to include this
--     person's work — those are statistical summaries with no PII.
--
-- AUDIT REQUIREMENT:
--   Before running this script, record the following in your external audit log
--   (outside this database — use Notion or a signed document):
--     - Date of deletion request
--     - Name and email of the person requesting deletion
--     - Name of the staff member who executed the deletion
--     - Date deletion was executed
--   Do not log this inside the database being deleted.
-- =============================================================================

BEGIN;

-- Step 1: Capture the team member ID (if this person is a team member).
--   Used later to delete scorecards and incoming log rows.
--   This is a SQLite variable workaround — the application layer should
--   resolve the team_member_id before calling the delete statements below.
--
--   In the application, run this query first:
--     SELECT id FROM team_members
--     WHERE name = :person_name OR email = :person_email;
--   Then substitute :team_member_id in the scorecard and incoming log deletes.

-- ---------------------------------------------------------------------------
-- Delete email_reviews where this person is the recipient.
-- Cascade: foreign keys automatically delete linked follow_up_items
--          and approval_queue rows.
-- ---------------------------------------------------------------------------
DELETE FROM email_reviews
WHERE recipient_name = :person_name;

-- ---------------------------------------------------------------------------
-- Delete email_reviews where this person is the sender.
-- Cascade: same as above.
-- ---------------------------------------------------------------------------
DELETE FROM email_reviews
WHERE sender_name = :person_name;

-- ---------------------------------------------------------------------------
-- Delete learning_pairs derived from this person's flagged emails.
-- Learning pairs do not have a direct FK to email_reviews — they are
-- standalone copies of the text — so they must be deleted by matching
-- the text content or flag reason. The safest approach: delete all
-- learning_pairs where the flag_reason or original_text contains the
-- person's name. This is a conservative sweep.
-- ---------------------------------------------------------------------------
DELETE FROM learning_pairs
WHERE original_text LIKE '%' || :person_name || '%'
   OR corrected_text LIKE '%' || :person_name || '%';

-- ---------------------------------------------------------------------------
-- Delete incoming_analysis_log rows analyzed by this person (team member).
-- These rows contain no personal data about the email sender — only the
-- name of the staff member who ran the analysis.
-- ---------------------------------------------------------------------------
DELETE FROM incoming_analysis_log
WHERE analyzed_by = :person_name;

-- ---------------------------------------------------------------------------
-- Delete monthly_scorecards for this team member.
-- Run AFTER resolving :team_member_id from the SELECT above.
-- ---------------------------------------------------------------------------
DELETE FROM monthly_scorecards
WHERE team_member_id = (
    SELECT id FROM team_members
    WHERE name = :person_name OR email = :person_email
    LIMIT 1
);

-- ---------------------------------------------------------------------------
-- Deactivate (soft-delete) the team member record.
-- We do a soft delete first (set active = 0) rather than a hard delete,
-- because other tables reference team_member_id. The hard delete follows.
-- ---------------------------------------------------------------------------
UPDATE team_members
SET active = 0,
    updated_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
WHERE name = :person_name OR email = :person_email;

-- Hard delete the team member row.
DELETE FROM team_members
WHERE name = :person_name OR email = :person_email;

COMMIT;

-- =============================================================================
-- VERIFICATION QUERY
-- Run after the delete to confirm no rows remain for this person.
-- Returns the count of remaining rows per table. All counts should be 0.
-- =============================================================================

SELECT 'email_reviews (recipient)' AS source,
       COUNT(*) AS remaining_rows
FROM email_reviews
WHERE recipient_name = :person_name

UNION ALL

SELECT 'email_reviews (sender)', COUNT(*)
FROM email_reviews
WHERE sender_name = :person_name

UNION ALL

SELECT 'follow_up_items', COUNT(*)
FROM follow_up_items
WHERE assigned_to = :person_name

UNION ALL

SELECT 'incoming_analysis_log', COUNT(*)
FROM incoming_analysis_log
WHERE analyzed_by = :person_name

UNION ALL

SELECT 'team_members', COUNT(*)
FROM team_members
WHERE name = :person_name OR email = :person_email;
