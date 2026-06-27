# Email Guardian — Database README
**Last updated:** 2026-06-26
**Database engine:** SQLite
**Database file:** `guardian.db` (created in this directory)

---

## What Is In This Directory

| File | Purpose |
|---|---|
| `schema.sql` | Creates all tables and indexes. Run once to set up a new database. |
| `seed.sql` | Loads sample data for testing. Run only on a development copy. |
| `ccpa-delete.sql` | Deletes all records for one person. Run when you receive a CCPA deletion request. |
| `data-inventory.md` | Explains every table — what it stores, who can access it, retention rules. |
| `README.md` | This file. |
| `guardian.db` | The live database file. Created when you run `schema.sql`. Not checked into git. |

---

## First-Time Setup

Run this once to create the database and all its tables:

```
sqlite3 /Users/susangoulding/CrownKey/projects/email-guardian/db/guardian.db < /Users/susangoulding/CrownKey/projects/email-guardian/db/schema.sql
```

---

## Load Test Data (Development Only)

Only run this on a local development copy — never on the real database:

```
sqlite3 /Users/susangoulding/CrownKey/projects/email-guardian/db/guardian.db < /Users/susangoulding/CrownKey/projects/email-guardian/db/seed.sql
```

---

## Reset the Database (Development Only)

To wipe the database and start fresh:

```
rm /Users/susangoulding/CrownKey/projects/email-guardian/db/guardian.db
sqlite3 /Users/susangoulding/CrownKey/projects/email-guardian/db/guardian.db < /Users/susangoulding/CrownKey/projects/email-guardian/db/schema.sql
sqlite3 /Users/susangoulding/CrownKey/projects/email-guardian/db/guardian.db < /Users/susangoulding/CrownKey/projects/email-guardian/db/seed.sql
```

---

## Daily Cleanup — Incoming Analysis Log (REQUIRED)

The `incoming_analysis_log` table must be purged of any rows older than 30 days. This is a governance requirement under CCPA.

Run this command once per day (or set it up as a scheduled task):

```
sqlite3 /Users/susangoulding/CrownKey/projects/email-guardian/db/guardian.db \
  "DELETE FROM incoming_analysis_log WHERE created_at < strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '-30 days');"
```

Scotty (infrastructure) should configure this as a cron job or scheduled task when deploying the production environment.

---

## CCPA Deletion Requests

When a person asks to have their data deleted:

1. Record the request in your external audit log (Notion or a signed document) BEFORE running the deletion. Note: date of request, person's name and email, and the name of the staff member processing it.
2. Run the deletion script:

```
sqlite3 /Users/susangoulding/CrownKey/projects/email-guardian/db/guardian.db \
  -cmd ".param set :person_name 'FULL NAME HERE'" \
  -cmd ".param set :person_email 'EMAIL HERE'" \
  < /Users/susangoulding/CrownKey/projects/email-guardian/db/ccpa-delete.sql
```

3. The verification query at the bottom of the script will show you a count of remaining rows. All counts should be 0.
4. Record the completion date in the same audit log entry.

---

## Backup

Before any schema migration or CCPA deletion, copy the database file:

```
cp /Users/susangoulding/CrownKey/projects/email-guardian/db/guardian.db \
   /Users/susangoulding/CrownKey/projects/email-guardian/db/guardian.db.backup-$(date +%Y%m%d)
```

---

## Schema Migrations

When the schema needs to change:

- Never modify `schema.sql` in place after the production database has been created.
- Create a new migration file named to describe the change, for example: `migrate-add-language-field-to-email-reviews.sql`
- Every migration file must include both a "do" step (apply the change) and an "undo" step (roll it back).
- Neo (database specialist) authors all migrations. No migration runs against the live database without Susan's approval.

---

## Notes for Developers

- Foreign key enforcement is ON (`PRAGMA foreign_keys = ON`). Deleting a parent row cascades to child rows automatically. See `data-inventory.md` for the cascade map.
- The database uses WAL (write-ahead logging) mode for better concurrent read performance.
- All timestamps are stored as ISO 8601 UTC strings: `YYYY-MM-DDTHH:MM:SSZ`.
- Boolean flags (active, reminder_sent, escalated_to_susan) are stored as INTEGER 0 or 1 — SQLite has no native boolean type.
- JSON fields (topics, flags_triggered) are stored as TEXT. The application is responsible for serializing and parsing them.
- **IMPORTANT — foreign key cascades:** SQLite does not enable foreign keys by default. Every database connection opened by the application must run `PRAGMA foreign_keys = ON` immediately after connecting. Without this, cascade deletes (used by CCPA deletion and general cleanup) will not fire. Q must ensure this pragma is set in the database connection setup code.
