/* ============================================================
   CrownKey Email Guardian — mock-api.js
   Intercepts fetch() calls and returns realistic mock responses
   so the UI is fully testable before the real backend is ready.
   ============================================================ */

(function () {
  const TEAM_MEMBERS = ["Susan", "Tiffany", "Maria", "Priya", "James"];

  // Rotate through outcomes for demo variety
  let reviewCallCount = 0;

  const MOCK_REVIEW_OUTCOMES = [
    // Outcome 0: Clear to Send
    {
      status: "clear",
      excellence_score: 8,
      original: "Hi James,\n\nJust wanted to follow up on the late rent. You're 5 days past due. Please pay as soon as possible or contact us to discuss.\n\nThanks\nSusan",
      polished: "Hi James,\n\nI hope you're doing well. I wanted to follow up regarding your rent payment, which is now 5 days past due.\n\nPlease submit your payment at your earliest convenience, or feel free to contact us if you'd like to discuss your options. We're here to help.\n\nWarm regards,\nSusan Goulding\nCrown Key Realty Inc.",
      changes: [
        "Added a warm greeting to set a professional tone.",
        'Replaced "as soon as possible" with "at your earliest convenience" — more courteous.',
        "Added an offer to discuss, which shows goodwill.",
        "Added full professional sign-off."
      ],
      suggestion: "Consider naming a specific payment deadline (e.g., 'by Friday, June 28') to raise the score from 8 to 10.",
      followup: null
    },
    // Outcome 1: Needs Edits
    {
      status: "needs_edits",
      excellence_score: 4,
      original: "Dear Owner,\n\nYour tenant hasn't paid rent for 2 months. We're thinking about eviction. The unit also has some damage. Let me know what you want to do.\n\nRegards",
      polished: "Dear [Owner Name],\n\nI'm writing to update you on a situation at [Unit Address]. Your tenant has not submitted rent payments for the past two months (May and June).\n\nWe are evaluating next steps, which may include serving a formal notice. Additionally, we have observed some maintenance concerns in the unit that we'd like to discuss with you.\n\nPlease let us know your availability for a brief call this week so we can align on the best path forward.\n\nBest regards,\nSusan Goulding\nCrown Key Realty Inc.",
      changes: [
        "Added owner name and unit address placeholders — fill these in before sending.",
        "Specified which months rent was missed.",
        'Softened "thinking about eviction" to a more professional legal framing.',
        'Replaced vague "some damage" with "maintenance concerns" — avoids alarming language before inspection.'
      ],
      issues: [
        {
          what: "Missing owner name and property address.",
          fix: "Fill in [Owner Name] and [Unit Address] in the polished version before sending."
        },
        {
          what: "The phrase \"thinking about eviction\" is premature — an eviction process has legal steps that must be followed in order.",
          fix: "Replace with: \"We are preparing to serve a formal pay-or-quit notice per California law.\""
        }
      ]
    },
    // Outcome 2: Clear with follow-up detected
    {
      status: "clear",
      excellence_score: 9,
      original: "Hi Mrs. Chen,\n\nThank you for reporting the leaky faucet. I will have a vendor contact you by Friday to schedule the repair.\n\nBest,\nPriya",
      polished: "Hi Mrs. Chen,\n\nThank you for letting us know about the leaky faucet — we'll get that taken care of right away.\n\nI'll have a vendor reach out to you by Friday, June 28th to schedule the repair at a time that works for you.\n\nThank you for your patience.\n\nWarm regards,\nPriya\nCrown Key Realty Inc.",
      changes: [
        "Added warmth and acknowledgment at the opening.",
        "Specified the exact date (June 28th) to make the commitment trackable.",
        "Added appreciation for tenant patience — raises the excellence score."
      ],
      suggestion: null,
      followup: {
        text: "I'll have a vendor reach out to you by Friday, June 28th",
        date: "2026-06-28"
      }
    },
    // Outcome 3: Route to Susan
    {
      status: "route",
      excellence_score: null,
      original: "Hi,\n\nWe have decided not to renew your lease. This is because of complaints from other residents about noise and behavior. We feel the unit would be better suited for a quieter resident.\n\nPlease plan to vacate by July 31.\n\nRegards",
      flag_reason: "This email declines to renew a lease and cites tenant behavior as the reason. Language like \"quieter resident\" may imply a protected characteristic under Fair Housing law (e.g., familial status, national origin, disability). This must be reviewed by Susan before it is sent.",
      polished: null,
      changes: []
    }
  ];

  const MOCK_DRAFT = {
    draft: "Dear James,\n\nI hope this message finds you well. This is a friendly reminder that your rent payment for June was due on the 1st and has not yet been received as of today, June 3rd.\n\nWe understand that sometimes payments can slip through the cracks. Please submit your payment through the AppFolio tenant portal at your earliest convenience, or give us a call if you'd like to discuss.\n\nIf you have already sent your payment, please disregard this message.\n\nThank you for your prompt attention to this matter.\n\nWarm regards,\nSusan Goulding\nCrown Key Realty Inc.\n(209) 555-0100 | admin@crownkeyrealty.com"
  };

  const MOCK_FOLLOWUPS = [
    { id: 1, recipient: "James Okafor", promise: "I'll follow up by Friday about the repair quote", due: "2026-06-28", status: "pending", assigned_to: "Tiffany" },
    { id: 2, recipient: "Maria Hernandez", promise: "We will send the lease renewal paperwork by June 30", due: "2026-06-30", status: "pending", assigned_to: "Susan" },
    { id: 3, recipient: "Oak Property LLC (Owner)", promise: "I will call you Tuesday to discuss the roof estimate", due: "2026-06-23", status: "overdue", assigned_to: "Susan" },
    { id: 4, recipient: "Victor Tan", promise: "Maintenance will be there by end of week", due: "2026-06-20", status: "complete", assigned_to: "Priya" },
    { id: 5, recipient: "Lena Brooks", promise: "I'll get you the move-in checklist by Monday", due: "2026-06-29", status: "pending", assigned_to: "James" }
  ];

  const MOCK_QUEUE = [
    {
      id: 1,
      sender: "Tiffany Reyes",
      recipient_type: "Tenant",
      submitted: "2026-06-26 09:14 AM",
      flag_reason: "Lease non-renewal citing tenant behavior — may implicate Fair Housing protections (familial status, disability).",
      email_text: "Hi,\n\nWe have decided not to renew your lease. This is because of complaints from other residents about noise and behavior. We feel the unit would be better suited for a quieter resident.\n\nPlease plan to vacate by July 31.\n\nRegards,\nTiffany"
    },
    {
      id: 2,
      sender: "Maria Gutierrez",
      recipient_type: "Tenant",
      submitted: "2026-06-25 04:41 PM",
      flag_reason: "Email references a tenant's disability accommodation request. All disability-related communications require manager review.",
      email_text: "Hello,\n\nThank you for reaching out about your accommodation request. We have looked into the matter and want to discuss it further.\n\nPlease call our office at your earliest convenience.\n\nBest,\nMaria"
    }
  ];

  const MOCK_SCORES = [
    { name: "Susan", monthly_avg: 9.2, emails: 14, followups_on_time: 5, followups_missed: 0, trend: "up", history: [8.5, 8.8, 9.0, 9.2] },
    { name: "Tiffany", monthly_avg: 7.8, emails: 22, followups_on_time: 8, followups_missed: 2, trend: "up", history: [7.0, 7.2, 7.5, 7.8] },
    { name: "Maria", monthly_avg: 8.1, emails: 18, followups_on_time: 6, followups_missed: 1, trend: "flat", history: [8.3, 8.0, 8.2, 8.1] },
    { name: "Priya", monthly_avg: 8.9, emails: 10, followups_on_time: 4, followups_missed: 0, trend: "up", history: [8.0, 8.4, 8.7, 8.9] },
    { name: "James", monthly_avg: 6.5, emails: 9, followups_on_time: 3, followups_missed: 3, trend: "down", history: [7.2, 7.0, 6.8, 6.5] }
  ];

  const MOCK_INCOMING = {
    tone: "frustrated",
    risk: "medium",
    summary: "Tenant is expressing frustration about an unresolved maintenance issue (HVAC) they say has been pending for three weeks. They are requesting immediate action and hinting at withholding rent.",
    suggested_opening: "Thank you for reaching out, and I sincerely apologize for the delay in resolving your HVAC issue. I understand how uncomfortable this must be, especially with the summer heat. I am personally following up on this today and will have an update for you within 24 hours."
  };

  // ---- Intercept fetch ----
  const _origFetch = window.fetch.bind(window);

  window.fetch = function (url, options) {
    const path = typeof url === "string" ? url : url.url || "";

    // Review an outgoing email
    if (path.includes("/api/review")) {
      return mockDelay(200).then(() => {
        const outcome = MOCK_REVIEW_OUTCOMES[reviewCallCount % MOCK_REVIEW_OUTCOMES.length];
        reviewCallCount++;
        return mockResponse(outcome);
      });
    }

    // Generate a draft
    if (path.includes("/api/draft")) {
      return mockDelay(800).then(() => mockResponse(MOCK_DRAFT));
    }

    // Follow-ups list
    if (path.includes("/api/followups")) {
      if (options && options.method === "PATCH") {
        return mockDelay(150).then(() => mockResponse({ success: true }));
      }
      return mockDelay(200).then(() => mockResponse({ followups: MOCK_FOLLOWUPS }));
    }

    // Approval queue
    if (path.includes("/api/queue")) {
      if (options && (options.method === "POST" || options.method === "PATCH")) {
        return mockDelay(200).then(() => mockResponse({ success: true }));
      }
      return mockDelay(200).then(() => mockResponse({ items: MOCK_QUEUE }));
    }

    // Scores
    if (path.includes("/api/scores")) {
      return mockDelay(200).then(() => mockResponse({ scores: MOCK_SCORES }));
    }

    // Incoming email analysis
    if (path.includes("/api/incoming")) {
      return mockDelay(600).then(() => mockResponse(MOCK_INCOMING));
    }

    // Fall through to real fetch for anything else
    return _origFetch(url, options);
  };

  function mockDelay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function mockResponse(data) {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  console.log("[CK Guardian] Mock API active — all /api/* calls return demo data.");
})();
