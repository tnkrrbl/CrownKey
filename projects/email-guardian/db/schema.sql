-- =============================================================================
-- CrownKey Email Guardian — Database Schema
-- Database: SQLite
-- File: schema.sql
-- Last updated: 2026-06-26
-- Owned by: Neo (Database Specialist)
--
-- Governance notes:
--   - CCPA: all records are deletable by person (see ccpa-delete.sql)
--   - Incoming email text is NEVER stored — only analysis metadata
--   - Learning pairs require explicit human acceptance; they never auto-apply
--   - criteria_version tracks which Fair Housing rule set was active at review time
--   - incoming_analysis_log rows are auto-deleted after 30 days (enforced by the
--     application layer; see README.md for the scheduled cleanup command)
-- =============================================================================

PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

-- -----------------------------------------------------------------------------
-- TABLE: team_members
-- Who can use the Email Guardian.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS team_members (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    email       TEXT    NOT NULL UNIQUE,
    role        TEXT    NOT NULL CHECK (role IN ('staff', 'manager')),
    active      INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1)),
    created_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    updated_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_team_members_email  ON team_members (email);
CREATE INDEX IF NOT EXISTS idx_team_members_active ON team_members (active);

-- -----------------------------------------------------------------------------
-- TABLE: email_reviews
-- Every outgoing email that passes through the Guardian gets one row here.
-- This is the central archive — every other table links back to this one.
--
-- criteria_version: the Fair Housing rule set active when this review ran.
--   Stored so that future audits know which rules were applied. Current version
--   is "v1.0" (see rules/fair-housing-rules.md).
--
-- flags_triggered: JSON array of objects, e.g.:
--   [{"flag":"Pattern 1.7","reason":"Source of income reference detected"}]
--
-- topics: JSON array of tag strings, e.g.:
--   ["late-rent","lease-renewal"]
--
-- Retention: rows are kept until a CCPA deletion request names the sender or
--   recipient. There is no automatic expiry on this table.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS email_reviews (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_name         TEXT    NOT NULL,
    recipient_type      TEXT    NOT NULL CHECK (recipient_type IN ('tenant', 'owner', 'vendor')),
    recipient_name      TEXT,
    property_address    TEXT,
    original_text       TEXT    NOT NULL,
    polished_text       TEXT    NOT NULL,
    topics              TEXT    NOT NULL DEFAULT '[]',   -- JSON array of strings
    tier_result         INTEGER NOT NULL CHECK (tier_result IN (1, 2, 3)),
    excellence_score    INTEGER NOT NULL CHECK (excellence_score BETWEEN 1 AND 10),
    flags_triggered     TEXT    NOT NULL DEFAULT '[]',   -- JSON array of objects
    final_status        TEXT    NOT NULL DEFAULT 'pending'
                            CHECK (final_status IN ('sent', 'not-sent', 'pending-susan')),
    criteria_version    TEXT    NOT NULL DEFAULT 'v1.0',
    created_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    updated_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_email_reviews_sender       ON email_reviews (sender_name);
CREATE INDEX IF NOT EXISTS idx_email_reviews_recipient    ON email_reviews (recipient_name);
CREATE INDEX IF NOT EXISTS idx_email_reviews_property     ON email_reviews (property_address);
CREATE INDEX IF NOT EXISTS idx_email_reviews_tier         ON email_reviews (tier_result);
CREATE INDEX IF NOT EXISTS idx_email_reviews_status       ON email_reviews (final_status);
CREATE INDEX IF NOT EXISTS idx_email_reviews_created      ON email_reviews (created_at);

-- -----------------------------------------------------------------------------
-- TABLE: follow_up_items
-- Created automatically when the Guardian detects a date commitment in an email.
-- Each row links to one email_review row.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS follow_up_items (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    email_review_id     INTEGER NOT NULL REFERENCES email_reviews (id) ON DELETE CASCADE,
    assigned_to         TEXT    NOT NULL,
    promise_text        TEXT    NOT NULL,
    due_date            TEXT    NOT NULL,   -- ISO date: YYYY-MM-DD
    status              TEXT    NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending', 'completed', 'overdue')),
    reminder_sent       INTEGER NOT NULL DEFAULT 0 CHECK (reminder_sent IN (0, 1)),
    escalated_to_susan  INTEGER NOT NULL DEFAULT 0 CHECK (escalated_to_susan IN (0, 1)),
    completed_at        TEXT,
    created_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    updated_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_follow_up_email_review ON follow_up_items (email_review_id);
CREATE INDEX IF NOT EXISTS idx_follow_up_assigned_to  ON follow_up_items (assigned_to);
CREATE INDEX IF NOT EXISTS idx_follow_up_status       ON follow_up_items (status);
CREATE INDEX IF NOT EXISTS idx_follow_up_due_date     ON follow_up_items (due_date);

-- -----------------------------------------------------------------------------
-- TABLE: approval_queue
-- Tier 3 emails held for Susan's review before they can be sent.
-- Each row links to one email_review row.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS approval_queue (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    email_review_id     INTEGER NOT NULL REFERENCES email_reviews (id) ON DELETE CASCADE,
    flag_reason         TEXT    NOT NULL,
    flag_category       TEXT    NOT NULL
                            CHECK (flag_category IN ('Fair Housing', 'Owner Escalation', 'Legal Situation')),
    status              TEXT    NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending', 'approved', 'edited', 'rejected', 'sent-back')),
    susans_edited_version TEXT,
    susans_note         TEXT,
    submitted_at        TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    resolved_at         TEXT,
    created_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    updated_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_approval_queue_email_review ON approval_queue (email_review_id);
CREATE INDEX IF NOT EXISTS idx_approval_queue_status       ON approval_queue (status);
CREATE INDEX IF NOT EXISTS idx_approval_queue_category     ON approval_queue (flag_category);
CREATE INDEX IF NOT EXISTS idx_approval_queue_submitted    ON approval_queue (submitted_at);

-- -----------------------------------------------------------------------------
-- TABLE: learning_pairs
-- When Susan edits an email in the approval queue, the original and her
-- corrected version are stored here as a PROPOSED update.
--
-- CRITICAL GOVERNANCE RULE: These records NEVER automatically change system
-- behavior. They are only applied when Susan explicitly sets status = 'accepted'
-- through the review UI. The application layer must enforce this.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS learning_pairs (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    original_text       TEXT    NOT NULL,
    corrected_text      TEXT    NOT NULL,
    flag_category       TEXT    NOT NULL
                            CHECK (flag_category IN ('Fair Housing', 'Owner Escalation', 'Legal Situation')),
    flag_reason         TEXT    NOT NULL,
    what_changed        TEXT    NOT NULL,   -- plain-English description of the edit
    status              TEXT    NOT NULL DEFAULT 'pending-review'
                            CHECK (status IN ('pending-review', 'accepted', 'rejected')),
    created_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    updated_at          TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_learning_pairs_status   ON learning_pairs (status);
CREATE INDEX IF NOT EXISTS idx_learning_pairs_category ON learning_pairs (flag_category);

-- -----------------------------------------------------------------------------
-- TABLE: monthly_scorecards
-- One row per team member per calendar month.
-- (year_month format: YYYY-MM, e.g. "2026-06")
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS monthly_scorecards (
    id                          INTEGER PRIMARY KEY AUTOINCREMENT,
    team_member_id              INTEGER NOT NULL REFERENCES team_members (id) ON DELETE CASCADE,
    year_month                  TEXT    NOT NULL,   -- YYYY-MM
    emails_reviewed             INTEGER NOT NULL DEFAULT 0,
    avg_excellence_score        REAL    NOT NULL DEFAULT 0.0,
    tier1_count                 INTEGER NOT NULL DEFAULT 0,
    tier2_count                 INTEGER NOT NULL DEFAULT 0,
    tier3_count                 INTEGER NOT NULL DEFAULT 0,
    follow_ups_due              INTEGER NOT NULL DEFAULT 0,
    follow_ups_completed_on_time INTEGER NOT NULL DEFAULT 0,
    follow_ups_missed           INTEGER NOT NULL DEFAULT 0,
    avg_response_time_hours     REAL,   -- nullable: only tracked when data is available
    created_at                  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    updated_at                  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    UNIQUE (team_member_id, year_month)
);

CREATE INDEX IF NOT EXISTS idx_scorecards_member     ON monthly_scorecards (team_member_id);
CREATE INDEX IF NOT EXISTS idx_scorecards_year_month ON monthly_scorecards (year_month);

-- -----------------------------------------------------------------------------
-- TABLE: incoming_analysis_log
-- Logged when a team member pastes an incoming email for tone/risk analysis.
--
-- IMPORTANT: The full email text is NEVER stored here — only the metadata
-- produced by the analysis. This is a hard governance requirement.
--
-- Retention: rows with created_at older than 30 days must be deleted.
-- Run the cleanup command in README.md on a daily schedule.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS incoming_analysis_log (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    analyzed_by     TEXT    NOT NULL,
    sender_type     TEXT    NOT NULL CHECK (sender_type IN ('tenant', 'owner', 'vendor')),
    emotional_tone  TEXT    NOT NULL,
    risk_level      TEXT    NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
    created_at      TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    updated_at      TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_incoming_log_analyzed_by ON incoming_analysis_log (analyzed_by);
CREATE INDEX IF NOT EXISTS idx_incoming_log_created_at  ON incoming_analysis_log (created_at);
CREATE INDEX IF NOT EXISTS idx_incoming_log_risk_level  ON incoming_analysis_log (risk_level);
