# CrownKey Email Guardian — API

This is the backend for the Email Guardian tool. It runs on your server and handles all AI communication with Claude. The frontend (built by Tron) talks to this API.

---

## Requirements

- Node.js version 18 or newer
- An Anthropic API key (get one at https://console.anthropic.com)

---

## Setup

**Step 1 — Install Node.js** if it is not already installed.
Download from https://nodejs.org — choose the "LTS" version.

**Step 2 — Install dependencies.**
Open a terminal, navigate to this folder, and run:

```
npm install
```

This downloads the packages listed in package.json. It creates a `node_modules` folder. You only need to do this once (and again if package.json changes).

**Step 3 — Set your API key.**
Copy the example environment file:

```
cp .env.example .env
```

Open the `.env` file in any text editor and replace `your-api-key-here` with your actual Anthropic API key.

**Do not share your .env file or commit it to git.** It contains your API key.

**Step 4 — Start the server.**

```
npm start
```

You should see:
```
CrownKey Email Guardian API running on http://localhost:3001
```

The server runs on port 3001. Leave the terminal window open while using the tool.

---

## Verifying It Works

Open a browser and visit:
```
http://localhost:3001/health
```

You should see a response that says `"status": "ok"`. That means the server is running correctly.

---

## Endpoints

### POST /api/review
Polishes an outgoing email and runs the full review pipeline.

Detects Fair Housing issues, tone problems, promises/commitments, and assigns a tier (1 = send, 2 = review, 3 = must go to Susan).

### POST /api/draft
Generates a first-draft email from a description of the situation, or from a playbook template.

### POST /api/incoming
Analyzes an incoming email from a tenant, owner, or vendor. Returns tone, risk level, a suggested reply opening, and flags accommodation requests.

Note: The incoming email text is analyzed and returned — it is NOT stored.

### GET /api/playbooks
Returns the list of available playbook templates with their names and descriptions.

---

## Updating Rules

The Fair Housing rules, tone profiles, and excellence rubric are stored as plain text files in the `rules/` folder (one level up from this folder). They are read fresh on every request. To update a rule, edit the file — no code changes needed.

---

## Stopping the Server

Press `Ctrl + C` in the terminal window.

---

## Notes for When Database Integration Is Added (Phase 2)

Phase 1 of this API is stateless — it calls Claude and returns results, with no database. When Neo's database schema is connected in a future phase, the developer doing that work must follow these three rules:

**1. Enable foreign key enforcement on every connection.**
SQLite does not enforce foreign key constraints by default. Every database connection must run this immediately after opening:
```
PRAGMA foreign_keys = ON;
```
Without this, cascaded deletes (required for data privacy compliance) will silently fail.

**2. Learning pairs are read-only until Susan manually accepts them.**
The `learning_pairs` table stores potential rule improvements over time. The API must never use a learning pair to influence Claude's behavior unless two conditions are both true: `status = 'accepted'` AND Susan has manually triggered a rule refresh. Do not build any background job or scheduled task that automatically polls or applies learning pairs.

**3. Never write incoming email text to the database.**
The `incoming_analysis_log` table stores only metadata — tone, risk level, timestamp, and sender type. It must never store the raw email content. The `routes/incoming.js` file deliberately does not persist the email text, and any database integration must preserve that behavior.

---

## Files in This Folder

```
server.js           — The main server file. Starts everything up.
routes/
  review.js         — Handles POST /api/review
  draft.js          — Handles POST /api/draft
  incoming.js       — Handles POST /api/incoming
  playbooks.js      — Handles GET /api/playbooks
prompts/
  review-system.js  — Builds the AI instructions for the review endpoint
  draft-system.js   — Builds the AI instructions for the draft endpoint
  incoming-system.js — Builds the AI instructions for the incoming endpoint
package.json        — Lists the packages this API needs to run
.env.example        — Template for your .env file (copy this, don't edit it)
```
