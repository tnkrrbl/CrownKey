/**
 * routes/incoming.js
 * POST /api/incoming
 * Analyzes an incoming email and helps the team member understand how to respond.
 * IMPORTANT: The full email text is NOT stored — this endpoint analyzes and returns only.
 */

const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');
const { buildIncomingSystemPrompt } = require('../prompts/incoming-system');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

router.post('/', async (req, res) => {
  const { emailText, senderType } = req.body;

  if (!emailText || !senderType) {
    return res.status(400).json({
      error: 'Missing required fields: emailText and senderType are required.'
    });
  }

  // Length limit
  if (emailText.length > 20000) {
    return res.status(400).json({ error: 'Email text is too long. Please paste one email at a time (max 20,000 characters).' });
  }

  const validSenderTypes = ['tenant', 'owner', 'vendor'];
  if (!validSenderTypes.includes(senderType)) {
    return res.status(400).json({
      error: `senderType must be one of: ${validSenderTypes.join(', ')}`
    });
  }

  const timestamp = new Date().toISOString();
  // Log metadata only — not the email text itself
  console.log(`[${timestamp}] POST /api/incoming | senderType: ${senderType} | emailLength: ${emailText.length} chars`);

  const systemPrompt = buildIncomingSystemPrompt();

  const userMessage = `Please analyze this incoming email.\n\nSender type: ${senderType}\n\n--- INCOMING EMAIL ---\n${emailText}\n--- END EMAIL ---`;

  let rawResponse;
  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    });
    rawResponse = message.content[0].text;
  } catch (err) {
    console.error(`[${timestamp}] Anthropic API error: ${err.message}`);
    return res.status(502).json({
      error: 'The AI analysis service is temporarily unavailable. Please try again in a moment.'
    });
  }

  let result;
  try {
    result = JSON.parse(rawResponse);
  } catch (err) {
    console.error(`[${timestamp}] Failed to parse Claude incoming response as JSON. Raw: ${rawResponse.substring(0, 200)}`);
    return res.status(502).json({
      error: 'The AI returned an unexpected response format. Please try again.'
    });
  }

  // If an accommodation request is detected, ensure risk is set to high
  // (defensive check — the prompt instructs Claude to do this, but we enforce it here too)
  if (result.isAccommodationRequest === true) {
    result.riskLevel = 'high';
    if (!result.riskReason) {
      result.riskReason = 'This email contains an accommodation request. Per Fair Housing law, these require human review and must be routed to Susan\'s queue.';
    }
  }

  // Log outcome (no email content logged)
  console.log(`[${timestamp}] POST /api/incoming | senderType: ${senderType} | tone: ${result.tone} | riskLevel: ${result.riskLevel} | accommodationRequest: ${result.isAccommodationRequest}`);

  res.json(result);
});

module.exports = router;
