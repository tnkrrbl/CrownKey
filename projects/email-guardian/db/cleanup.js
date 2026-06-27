/**
 * cleanup.js
 * Data retention cleanup for CrownKey Email Guardian.
 *
 * Two routines:
 *   1. auto   — deletes incoming_analysis_log rows older than 30 days
 *               and approval_queue rows resolved more than 90 days ago
 *   2. reviewed — deletes incoming_analysis_log rows and resolved
 *               approval_queue rows that Susan has already acted on
 *               (run this after Susan clears her queue)
 *
 * Usage:
 *   node cleanup.js auto      ← run by the daily scheduled job
 *   node cleanup.js reviewed  ← run after Susan finishes reviewing
 *   node cleanup.js all       ← run both routines
 */

const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'guardian.db');
const mode = process.argv[2] || 'auto';

if (!['auto', 'reviewed', 'all'].includes(mode)) {
  console.error('Usage: node cleanup.js [auto|reviewed|all]');
  process.exit(1);
}

const db = new Database(DB_PATH);
db.pragma('foreign_keys = ON');

function runAuto() {
  console.log('[cleanup] Running auto retention cleanup...');

  // 1. Delete incoming analysis log entries older than 30 days
  const logCleanup = db.prepare(
    `DELETE FROM incoming_analysis_log WHERE created_at < datetime('now', '-30 days')`
  );
  const logResult = logCleanup.run();
  console.log(`[cleanup] incoming_analysis_log: deleted ${logResult.changes} rows (30-day expiry)`);

  // 2. Delete resolved approval_queue rows older than 90 days
  const queueCleanup = db.prepare(
    `DELETE FROM approval_queue
     WHERE status != 'pending'
       AND resolved_at < datetime('now', '-90 days')`
  );
  const queueResult = queueCleanup.run();
  console.log(`[cleanup] approval_queue: deleted ${queueResult.changes} resolved rows (90-day expiry)`);
}

function runReviewed() {
  console.log('[cleanup] Running post-review cleanup...');

  // Delete incoming analysis log entries where Susan has already reviewed
  // the relevant emails (i.e., no pending queue items remain from today or earlier)
  const logReviewedCleanup = db.prepare(
    `DELETE FROM incoming_analysis_log
     WHERE created_at < datetime('now', '-1 day')
       AND NOT EXISTS (
         SELECT 1 FROM approval_queue
         WHERE status = 'pending'
           AND created_at >= datetime('now', '-30 days')
       )`
  );
  const logResult = logReviewedCleanup.run();
  console.log(`[cleanup] incoming_analysis_log: deleted ${logResult.changes} rows (post-review)`);

  // Delete resolved approval_queue rows immediately (Susan has acted on them)
  const queueReviewedCleanup = db.prepare(
    `DELETE FROM approval_queue
     WHERE status IN ('approved', 'edited', 'rejected', 'sent-back')
       AND resolved_at IS NOT NULL`
  );
  const queueResult = queueReviewedCleanup.run();
  console.log(`[cleanup] approval_queue: deleted ${queueResult.changes} resolved rows (post-review)`);
}

if (mode === 'auto' || mode === 'all') runAuto();
if (mode === 'reviewed' || mode === 'all') runReviewed();

db.close();
console.log('[cleanup] Done.');
