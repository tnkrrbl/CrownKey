/**
 * routes/draft.js
 * POST /api/draft
 * Generates a first-draft email from a situation description or playbook.
 */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');
const { buildDraftSystemPrompt } = require('../prompts/draft-system');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const PLAYBOOKS_DIR = path.join(__dirname, '../../../playbooks');

function loadPlaybook(name) {
  // Try to find a file whose name starts with the given playbook id
  const files = fs.readdirSync(PLAYBOOKS_DIR);
  const match = files.find(f => f.replace('.md', '') === name || f === name);
  if (!match) return null;
  return fs.readFileSync(path.join(PLAYBOOKS_DIR, match), 'utf8');
}

router.post('/', async (req, res) => {
  const { situation, playbook, recipientType, senderName, context } = req.body;

  // Must have either a situation or a playbook
  if (!situation && !playbook) {
    return res.status(400).json({
      error: 'Either situation or playbook is required.'
    });
  }

  if (!recipientType || !senderName) {
    return res.status(400).json({
      error: 'Missing required fields: recipientType and senderName are required.'
    });
  }

  // Length limits
  if (situation && situation.length > 2000) {
    return res.status(400).json({ error: 'Situation description is too long (max 2,000 characters).' });
  }
  if (context && context.length > 500) {
    return res.status(400).json({ error: 'Context note is too long (max 500 characters).' });
  }

  const validRecipientTypes = ['tenant', 'owner', 'vendor'];
  if (!validRecipientTypes.includes(recipientType)) {
    return res.status(400).json({
      error: `recipientType must be one of: ${validRecipientTypes.join(', ')}`
    });
  }

  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] POST /api/draft | sender: ${senderName} | recipientType: ${recipientType} | playbook: ${playbook || 'none'}`);

  let systemPrompt;
  try {
    systemPrompt = buildDraftSystemPrompt();
  } catch (err) {
    console.error(`[${timestamp}] Failed to build draft system prompt: ${err.message}`);
    return res.status(500).json({
      error: 'Server configuration error: could not load draft rules. Please contact your administrator.'
    });
  }

  // Build the user message
  let userMessage = `Please draft an email for the following request.\n\n`;
  userMessage += `Sender name: ${senderName}\n`;
  userMessage += `Recipient type: ${recipientType}\n`;

  if (context) {
    userMessage += `Additional context: ${context}\n`;
  }

  if (playbook) {
    const playbookContent = loadPlaybook(playbook);
    if (!playbookContent) {
      return res.status(400).json({
        error: `Playbook "${playbook}" not found. Use GET /api/playbooks to see available playbooks.`
      });
    }
    userMessage += `\nUse the following playbook as the basis for the draft. Follow its template structure and tone guidance:\n\n--- PLAYBOOK ---\n${playbookContent}\n--- END PLAYBOOK ---\n`;
    if (situation) {
      userMessage += `\nAdapt the playbook for this specific situation: ${situation}`;
    }
  } else {
    userMessage += `\nSituation to draft email for: ${situation}`;
  }

  let rawResponse;
  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    });
    rawResponse = message.content[0].text;
  } catch (err) {
    console.error(`[${timestamp}] Anthropic API error: ${err.message}`);
    return res.status(502).json({
      error: 'The AI drafting service is temporarily unavailable. Please try again in a moment.'
    });
  }

  let result;
  try {
    result = JSON.parse(rawResponse);
  } catch (err) {
    console.error(`[${timestamp}] Failed to parse Claude draft response as JSON. Raw: ${rawResponse.substring(0, 200)}`);
    return res.status(502).json({
      error: 'The AI returned an unexpected response format. Please try again.'
    });
  }

  res.json(result);
});

module.exports = router;
