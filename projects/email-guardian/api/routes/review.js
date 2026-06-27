/**
 * routes/review.js
 * POST /api/review
 * Runs the full email review pipeline: polish, tier, score, flags, promises.
 */

const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');
const { buildReviewSystemPrompt } = require('../prompts/review-system');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

router.post('/', async (req, res) => {
  const { emailText, recipientType, senderName, context } = req.body;

  // Validate required fields
  if (!emailText || !recipientType || !senderName) {
    return res.status(400).json({
      error: 'Missing required fields: emailText, recipientType, and senderName are all required.'
    });
  }

  // Length limits
  if (emailText.length > 20000) {
    return res.status(400).json({ error: 'Email text is too long. Please paste one email at a time (max 20,000 characters).' });
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
  console.log(`[${timestamp}] POST /api/review | sender: ${senderName} | recipientType: ${recipientType}`);

  let systemPrompt;
  try {
    systemPrompt = buildReviewSystemPrompt();
  } catch (err) {
    console.error(`[${timestamp}] Failed to build system prompt: ${err.message}`);
    return res.status(500).json({
      error: 'Server configuration error: could not load review rules. Please contact your administrator.'
    });
  }

  // Build the user message that gives Claude the email to review
  const contextNote = context
    ? `\n\nAdditional context about this situation: ${context}`
    : '';

  const userMessage = `Please review this outgoing email.

Sender name: ${senderName}
Recipient type: ${recipientType}${contextNote}

--- EMAIL DRAFT ---
${emailText}
--- END DRAFT ---`;

  let rawResponse;
  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    });
    rawResponse = message.content[0].text;
  } catch (err) {
    console.error(`[${timestamp}] Anthropic API error: ${err.message}`);
    return res.status(502).json({
      error: 'The AI review service is temporarily unavailable. Please try again in a moment.'
    });
  }

  // Parse the JSON Claude returned
  let result;
  try {
    result = JSON.parse(rawResponse);
  } catch (err) {
    console.error(`[${timestamp}] Failed to parse Claude response as JSON. Raw: ${rawResponse.substring(0, 200)}`);
    return res.status(502).json({
      error: 'The AI returned an unexpected response format. Please try again.'
    });
  }

  // Log the tier result now that we have it
  console.log(`[${timestamp}] POST /api/review | sender: ${senderName} | recipientType: ${recipientType} | tier: ${result.tier} | score: ${result.excellenceScore}`);

  // Ensure criteriaVersion is always set (governance requirement)
  result.criteriaVersion = '1.0';

  res.json(result);
});

module.exports = router;
