/**
 * routes/playbooks.js
 * GET /api/playbooks
 * Returns the list of available playbooks with metadata extracted from their headers.
 */

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const PLAYBOOKS_DIR = path.join(__dirname, '../../../playbooks');

/**
 * Extracts metadata from a playbook markdown file.
 * Reads the first 30 lines to find the Situation, Recipient Type, and Risk Level fields.
 */
function extractMetadata(filename, content) {
  const lines = content.split('\n').slice(0, 40);

  // Pull the human-readable name from the first heading
  const titleLine = lines.find(l => l.startsWith('# Playbook:'));
  const name = titleLine ? titleLine.replace('# Playbook:', '').trim() : filename.replace('.md', '');

  // Pull situation from the **Situation:** line
  const situationLine = lines.find(l => l.startsWith('**Situation:**'));
  const situation = situationLine
    ? situationLine.replace('**Situation:**', '').trim()
    : '';

  // Pull recipient type — stored as "Tenant", "Property Owner", "Vendor", "Former Tenant"
  const recipientLine = lines.find(l => l.startsWith('**Recipient Type:**'));
  let recipientRaw = recipientLine
    ? recipientLine.replace('**Recipient Type:**', '').trim().toLowerCase()
    : '';

  // Normalize to the three valid types the API uses
  let recipientType = 'tenant';
  if (recipientRaw.includes('owner')) recipientType = 'owner';
  else if (recipientRaw.includes('vendor')) recipientType = 'vendor';
  else recipientType = 'tenant'; // covers "tenant" and "former tenant"

  // Pull risk level
  const riskLine = lines.find(l => l.startsWith('**Risk Level:**'));
  let riskLevel = 'low';
  if (riskLine) {
    const riskText = riskLine.toLowerCase();
    if (riskText.includes('high')) riskLevel = 'high';
    else if (riskText.includes('medium')) riskLevel = 'medium';
    else riskLevel = 'low';
  }

  return { name, situation, recipientType, riskLevel };
}

router.get('/', (req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] GET /api/playbooks`);

  let files;
  try {
    files = fs.readdirSync(PLAYBOOKS_DIR).filter(f => f.endsWith('.md'));
  } catch (err) {
    console.error(`[${timestamp}] Could not read playbooks directory: ${err.message}`);
    return res.status(500).json({
      error: 'Could not load playbooks. Please contact your administrator.'
    });
  }

  const playbooks = [];

  for (const filename of files) {
    try {
      const content = fs.readFileSync(path.join(PLAYBOOKS_DIR, filename), 'utf8');
      const meta = extractMetadata(filename, content);
      playbooks.push({
        id: filename.replace('.md', ''),
        name: meta.name,
        situation: meta.situation,
        recipientType: meta.recipientType,
        riskLevel: meta.riskLevel
      });
    } catch (err) {
      // Skip files that can't be read rather than failing the whole request
      console.error(`[${timestamp}] Could not parse playbook "${filename}": ${err.message}`);
    }
  }

  // Sort by recipient type then name for a consistent order
  playbooks.sort((a, b) => {
    if (a.recipientType !== b.recipientType) return a.recipientType.localeCompare(b.recipientType);
    return a.name.localeCompare(b.name);
  });

  res.json({ playbooks });
});

module.exports = router;
