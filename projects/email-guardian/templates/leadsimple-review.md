# LeadSimple Quick Reply Templates — Crown Key Review
**Date:** June 26, 2026
**Source:** LeadSimple > Settings > Inbox Settings > Quick Replies
**Templates found:** 7
**Reviewed against:** Crown Key Tone Profiles, Fair Housing Rules, Excellence Rubric

---

## Summary

| # | Template Name | Recipient | Current Score | Issues |
|---|---|---|---|---|
| 1 | 1099 End Of Year Questions | Owner | 5/10 | Defensive tone, cut-off signature |
| 2 | HOA Violation | Tenant/Owner | 3/10 | No greeting, no structure, typo in title |
| 3 | How to Submit Tenant Insurance | Tenant | 3/10 | ALL CAPS commands, threatening language |
| 4 | Owner Disagreement with Management Increase | Owner | 1/10 | NOT a template — specific negotiation email with real addresses/numbers |
| 5 | Pricing of a Property | Owner | 7/10 | Good structure, missing merge fields |
| 6 | Protocol Regarding Vendor Visits | Owner | 6/10 | Good content, slightly defensive opening |
| 7 | What is the Eviction Process | Tenant/Owner | 5/10 | Outdated COVID language, needs structure |

---

## Template 1 — 1099 End Of Year Questions

### Current Version
> Hello, we received your inquiry regarding your 1099 v Cash Flow. Typically, the confusion comes from how the IRS requires us to report earnings. Prepaid rent is applied to the year it is received... Those are the IRS's rules, not ours. It will balance out next year... Crown Key Realty, I

### What Needs to Change
- "Those are the IRS's rules, not ours" is defensive — sounds like you're pushing blame
- "It will balance out next year" is too casual for a financial explanation to an owner
- Signature is cut off ("Crown Key Realty, I")
- No subject line or opening warmth

### Improved Version

**Subject:** Re: Your 1099 Statement — A Quick Explanation

Hi {{owner.first_name}},

Thank you for reaching out — this is one of the most common questions we receive, and I'm happy to walk you through it.

**Why your 1099 and your cash flow report show different amounts:**

The IRS requires rent to be reported in the year it is *received*, not the year it covers. So if your tenant paid January's rent in December, that payment is counted in the current year's 1099 — even though it covers next month's rent. This is a federal tax reporting rule that applies to all property managers across the country.

Your cash flow report reflects the net picture — income received minus expenses paid on your behalf. The 1099 reflects gross income reported to the IRS.

The good news: this timing difference balances itself out over time. What was counted early this year will not be counted again next year.

If you'd like to talk through your specific numbers, I'm happy to schedule a quick call.

Warm regards,
{{user.full_name}}
Crown Key Realty Inc.
{{user.phone}} | admin@crownkeyrealty.com

---

## Template 2 — HOA Violation

### Current Version
> Good afternoon RE: Please see the attached violation notice. You may not have been aware of this regulation. Please be advised failure to cure the violation may result in a fine from the HOA, and fine or mandated hearing will be your responsibility

### What Needs to Change
- No greeting — jumps straight into "RE:"
- No tenant or owner name
- All one paragraph — no structure
- Abrupt ending — no deadline, no next step
- Typo in the template title: "VIolation"
- Unclear who receives this — tenant or owner? (Need two versions)

### Improved Version — Owner-Facing

**Subject:** HOA Violation Notice — Action Required at {{unit.address}}

Hi {{owner.first_name}},

I'm reaching out regarding a violation notice we received from the HOA for your property at {{unit.address}}.

**Violation details:** Please see the attached notice for the specific regulation involved.

Your tenant may not have been aware of this requirement. We will be contacting them directly to request the violation be corrected by **[deadline from notice]**.

If the violation is not cured by the HOA's deadline, the HOA may issue a fine. Per our management agreement, any fines assessed are the property owner's financial responsibility.

We'll keep you posted on the resolution. Please don't hesitate to reach out if you have questions.

Best regards,
{{user.full_name}}
Crown Key Realty Inc.

---

### Improved Version — Tenant-Facing

**Subject:** HOA Violation Notice — Your Attention Needed

Hi {{contact.first_name}},

I hope you're doing well. I'm reaching out because we received a violation notice from your HOA regarding the property at {{unit.address}}.

**What was flagged:** [Description of violation]

We understand you may not have been aware of this regulation — these notices can come as a surprise. To avoid any fines being passed along, the violation needs to be corrected by **[deadline from notice]**.

If you have any questions about what's required, please contact us right away and we'll be glad to help clarify.

Thank you for your quick attention to this.

Warm regards,
{{user.full_name}}
Crown Key Realty Inc.

---

## Template 3 — How to Submit Tenant Insurance

### Current Version
> If NOT USING Provided Resident Benefit Package insurance you MUST Visit http://insurance.residentforms.com/ to provide proof of coverage from a licensed insurance agent of your choice. ** Please contact your current provider and update the associated address for your current insurance policy to PO Box 660121 Dallas, TX 75266 prior to submitting your COI through the link above DO NOT SUBMIT VIA APPFOLIO TENANT PORTAL: Failure to do this step you will be charged and no refunds given after 1 month.

### What Needs to Change
- ALL CAPS "MUST" and "DO NOT" feel threatening and harsh for a simple instructions email
- No greeting, no closing, no warmth
- The URL needs to be verified (was current when written — confirm still active)
- Should mention what the Resident Benefit Package is for tenants who don't know
- "No refunds given after 1 month" without any warmth sounds punitive

### Improved Version

**Subject:** How to Submit Your Renter's Insurance — Crown Key Realty

Hi {{contact.first_name}},

Welcome! Before your move-in is complete, we need proof of active renter's insurance on file. Here are your two options:

**Option 1 — Use the Resident Benefit Package (included with your lease)**
If your lease includes our Resident Benefit Package, renter's insurance is already taken care of. No action needed on your end.

**Option 2 — Use your own insurance provider**
If you prefer to use your own insurance, please follow these steps:

1. Contact your insurance provider and ask them to update the mailing address on your policy to:
   **PO Box 660121, Dallas, TX 75266**
2. Submit your Certificate of Insurance (COI) here:
   http://insurance.residentforms.com/
3. Do **not** submit your COI through the AppFolio tenant portal — it will not be processed correctly.

**Important:** Please complete this within 30 days of your lease start date to avoid an insurance fee being added to your account.

If you have any questions, we're happy to help — just reply to this message.

Welcome to your new home!

Warm regards,
{{user.full_name}}
Crown Key Realty Inc.

---

## Template 4 — Owner Disagreement with Management Increase

### What This Is
**This is NOT a reusable template.** This appears to be a specific email Susan wrote to a particular owner disputing a management fee increase — it contains real property addresses (10 Funderburg, 4 Funderburg, 1024/1026 Prosperity, 24427 Chrisman), specific dollar amounts, and a specific negotiation.

**Recommendation: Remove this from Quick Replies.** Saving private negotiation emails as templates creates risk — a team member could accidentally send it to the wrong owner or send it in a future dispute with different context.

### What to Replace It With
If you want a template for responding to owner pushback on fees, here is a professional version:

---

**Subject:** Re: Management Fee Questions — Happy to Discuss

Hi {{owner.first_name}},

Thank you for reaching out — I always appreciate when owners bring their concerns to me directly, and I want to make sure you feel confident in the value Crown Key provides.

I'd love to schedule a brief call this week to walk you through our fee structure and the market context behind our recent rate adjustment. I can also pull together a comparison of what we've delivered for your properties over the past [X] years — I think you'll find the picture compelling.

Please let me know what time works best, or feel free to reply with any specific questions and I'll address them directly.

I genuinely value our relationship and want to make sure we're aligned.

Warm regards,
Susan Goulding
Crown Key Realty Inc.
admin@crownkeyrealty.com

---

## Template 5 — Pricing of a Property

### Current Version
> Subject: Strategic Pricing for Your Rental PropertyDear ,I hope you're doing well! We've analyzed the rental market to determine the best pricing strategy for your property at [Property Address]...

### What Needs to Change
- "Dear ," — missing the owner name (no merge field wired up)
- "[Property Address]" and "[$XXX]" are manual placeholders, not merge fields
- Subject line doesn't use merge fields either
- Overall structure and content is actually good — this is the best existing template

### Improved Version

**Subject:** Rental Pricing Analysis for {{unit.address}}

Hi {{owner.first_name}},

I hope you're doing well! We've completed our rental market analysis for your property at {{unit.address}}, and I wanted to share our findings and recommendation.

**Current market estimates:**
- Rentometer estimate: ${{rentometer_estimate}}/month
- Zillow estimate: ${{zillow_estimate}}/month

**Our recommendation:** ${{recommended_rent}}/month

Here's our thinking: pricing at or just below the top of the market gets your property rented faster by attracting the most qualified applicants — and that matters. Every additional week vacant costs more than the small monthly gain from pushing for top dollar. A property listed $100 above market that sits vacant an extra month loses $1,000+ in net income, plus the carrying costs during that time.

Our goal is always to minimize vacancy, attract high-quality residents, and maximize your long-term return.

I'm happy to walk you through the analysis in more detail. Just let me know if you'd like to talk.

Best regards,
{{user.full_name}}
Crown Key Realty Inc.

---

## Template 6 — Protocol Regarding Vendor Visits

### Current Version
> Hello, I am writing to address a concern that has recently come to our attention, related to your desire to accompany vendors on visits to the rental property...

### What Needs to Change
- "I am writing to address a concern" is stiff and slightly adversarial — opens on a defensive note
- Very long — the message is good but could be 30% shorter
- No merge fields for owner name or property address
- Closing is personal but template has "Susan & The Crown Key Realty Team" — should be sender

### Improved Version

**Subject:** Vendor Visit Protocol — {{unit.address}}

Hi {{owner.first_name}},

Thank you for your care and attention to your property — that investment mindset is exactly why we enjoy working with owners like you.

I want to take a moment to explain our vendor visit protocol, because it's something that comes up occasionally and I want to make sure you feel confident in how we manage it.

**Our process:** Crown Key handles all vendor scheduling, access coordination, and quality oversight on your behalf. This is part of what you've entrusted us to do, and our team is well-equipped to make sure the work meets the standard we hold all vendors to.

**Why owner-accompanied visits create friction:**
- Tenants have a legal right to quiet enjoyment of their home — unannounced or unfamiliar visitors can put that at risk
- When multiple parties are present, vendors sometimes receive conflicting instructions
- It creates liability questions if something goes wrong during the visit

We take this responsibility seriously, and we will always keep you informed about significant work being done and its outcome.

I appreciate your trust in our team. As always, if you'd like to discuss any specific vendor or project, I'm just a call away.

Warm regards,
{{user.full_name}}
Crown Key Realty Inc.

---

## Template 7 — What is the Eviction Process

### Current Version
> Notice to Quit... Three-Day Notice... Unlawful Detainer Lawsuit... [outdated COVID reference at the end]

### What Needs to Change
- Contains outdated language: "especially in light of the ongoing pandemic and resulting economic hardships" — needs to be removed
- Good informational content but reads like a copied legal website, not a Crown Key voice document
- No warm opening, no closing, no call to action
- No suggestion to consult an attorney (important for legal accuracy)

### Improved Version

**Subject:** Understanding the Eviction Process in California

Hi {{contact.first_name}},

I understand this can feel like unfamiliar territory, so I want to walk you through how the California eviction process works at a high level. This is general information — for advice specific to your situation, we always recommend speaking with a licensed attorney.

**Here is how the process works, step by step:**

**Step 1 — Written Notice**
Before any legal action can begin, the property owner must serve a written notice to the tenant. The type of notice depends on the situation:
- *Three-Day Notice to Pay or Quit:* Used when rent has not been paid
- *Three-Day Notice to Cure or Quit:* Used for lease violations
- *Thirty-Day or Sixty-Day Notice:* Used for no-fault terminations (rules vary by tenancy length)

**Step 2 — Unlawful Detainer Lawsuit**
If the tenant does not comply with the notice within the stated period, the property owner may file an Unlawful Detainer lawsuit in Superior Court.

**Step 3 — Summons and Response**
The tenant receives the lawsuit and typically has 5 days to file a response.

**Step 4 — Court Hearing**
Both parties present their case. If the owner wins, a Writ of Possession is issued.

**Step 5 — Sheriff Enforcement**
The Writ is delivered to the Sheriff's office, who posts a Notice to Vacate. If the tenant remains, the Sheriff returns to enforce the eviction.

California eviction law is detailed, and local ordinances may add additional steps or protections. We strongly recommend consulting with a licensed attorney before proceeding.

If you have questions about where your situation stands, please contact us.

Warm regards,
{{user.full_name}}
Crown Key Realty Inc.

---

## What's Next

1. **Review these improved versions** and let me know if the content and tone feel right
2. **Remove Template 4** (Owner Disagreement with Management Increase) — it's not a template
3. **Confirm the insurance URL** in Template 3 is still active
4. **Add the 5 improved templates back** into LeadSimple Quick Replies (I can do this for you)
5. **AppFolio templates** — next step is to look at what you have there (different system, different process)
