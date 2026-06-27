/**
 * server.js
 * CrownKey Email Guardian API
 * Express server — port 3001
 *
 * Endpoints:
 *   POST /api/review    — Full email review pipeline (polish, tier, score, flags, promises)
 *   POST /api/draft     — Generate a first draft from a situation or playbook
 *   POST /api/incoming  — Analyze an incoming email to help the team respond
 *   GET  /api/playbooks — List available playbook templates with metadata
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const reviewRouter = require('./routes/review');
const draftRouter = require('./routes/draft');
const incomingRouter = require('./routes/incoming');
const playbooksRouter = require('./routes/playbooks');

const app = express();
const PORT = 3001;

// Guard against missing API key at startup rather than at first request
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ERROR: ANTHROPIC_API_KEY environment variable is not set.');
  console.error('Copy .env.example to .env and add your Anthropic API key.');
  process.exit(1);
}

// Allow all origins — team uses this internally only
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Routes
app.use('/api/review', reviewRouter);
app.use('/api/draft', draftRouter);
app.use('/api/incoming', incomingRouter);
app.use('/api/playbooks', playbooksRouter);

// Health check — useful for verifying the server is running
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'CrownKey Email Guardian API', timestamp: new Date().toISOString() });
});

// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

// Global error handler — prevents stack traces from leaking to clients
app.use((err, req, res, _next) => {
  console.error(`[${new Date().toISOString()}] Unhandled error: ${err.message}`);
  res.status(500).json({ error: 'An unexpected server error occurred. Please try again.' });
});

app.listen(PORT, () => {
  console.log(`CrownKey Email Guardian API running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Ready. Listening for requests.`);
});
