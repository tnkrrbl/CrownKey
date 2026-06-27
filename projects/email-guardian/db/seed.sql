-- =============================================================================
-- CrownKey Email Guardian — Seed Data
-- File: seed.sql
-- Purpose: Sample data for local development and testing ONLY.
--          Do NOT run this against a production database.
-- Last updated: 2026-06-26
-- =============================================================================

PRAGMA foreign_keys = ON;

-- -----------------------------------------------------------------------------
-- Team Members (5)
-- -----------------------------------------------------------------------------
INSERT INTO team_members (id, name, email, role, active) VALUES
    (1, 'Maria Torres',   'maria@crownkeyrealty.com',   'staff',   1),
    (2, 'James Okafor',   'james@crownkeyrealty.com',   'staff',   1),
    (3, 'Linda Pham',     'linda@crownkeyrealty.com',   'staff',   1),
    (4, 'Derek Sullivan', 'derek@crownkeyrealty.com',   'staff',   1),
    (5, 'Susan Goulding', 'admin@crownkeyrealty.com',   'manager', 1);

-- -----------------------------------------------------------------------------
-- Email Reviews (10)
-- -----------------------------------------------------------------------------

-- Review 1: Clean late rent notice — Tier 1
INSERT INTO email_reviews
    (id, sender_name, recipient_type, recipient_name, property_address,
     original_text, polished_text, topics, tier_result, excellence_score,
     flags_triggered, final_status, criteria_version)
VALUES (
    1,
    'Maria Torres',
    'tenant',
    'Robert Kim',
    '4420 Tanglewood Dr, Tracy, CA 95376',
    'Hey Robert, your rent is late. You owe 1500 and its now day 5. We are going to charge a late fee.',
    'Dear Mr. Kim,\n\nAccording to our records, your rent payment of $1,500.00, due on June 1, 2026, has not yet been received. Per your lease agreement, a late fee of $75.00 was assessed on June 6, 2026. Please remit payment at your earliest convenience through the AppFolio portal to avoid further action.\n\nThank you for your prompt attention to this matter.\n\nSincerely,\nMaria Torres\nCrown Key Realty Inc.',
    '["late-rent"]',
    1, 8,
    '[]',
    'sent',
    'v1.0'
);

-- Review 2: Maintenance acknowledgment — Tier 1
INSERT INTO email_reviews
    (id, sender_name, recipient_type, recipient_name, property_address,
     original_text, polished_text, topics, tier_result, excellence_score,
     flags_triggered, final_status, criteria_version)
VALUES (
    2,
    'James Okafor',
    'tenant',
    'Priya Nair',
    '812 Mossberg Ct, Mountain House, CA 95391',
    'Hi Priya, we got your maintenance request about the heater. We will send someone out soon.',
    'Dear Ms. Nair,\n\nThank you for submitting your maintenance request regarding the heating unit. We have received your request and will contact you within 2 business days to schedule a service appointment at a time that is convenient for you. If this becomes an emergency situation, please call our office immediately at (209) 555-0100.\n\nSincerely,\nJames Okafor\nCrown Key Realty Inc.',
    '["maintenance"]',
    1, 9,
    '[]',
    'sent',
    'v1.0'
);

-- Review 3: Lease renewal offer — Tier 2 (needs edits, minor tone issue)
INSERT INTO email_reviews
    (id, sender_name, recipient_type, recipient_name, property_address,
     original_text, polished_text, topics, tier_result, excellence_score,
     flags_triggered, final_status, criteria_version)
VALUES (
    3,
    'Linda Pham',
    'tenant',
    'Carlos Mendez',
    '2251 River Islands Pkwy, Lathrop, CA 95330',
    'Hi Carlos, your lease is coming up. We would like you to renew. The new rent will be 2200 a month up from 2100. Let us know.',
    'Dear Mr. Mendez,\n\nWe hope you have been enjoying your home at 2251 River Islands Pkwy. Your current lease is scheduled to expire on August 31, 2026. We would like to offer you a lease renewal at a revised monthly rent of $2,200.00, effective September 1, 2026.\n\nPlease review the enclosed renewal agreement and return your signed copy by August 1, 2026. If you have any questions or would like to discuss your options, please do not hesitate to contact our office.\n\nSincerely,\nLinda Pham\nCrown Key Realty Inc.',
    '["lease-renewal"]',
    2, 7,
    '[{"flag":"Tone","reason":"Original lacked formal greeting and complete lease expiration date — corrected in polished version"}]',
    'sent',
    'v1.0'
);

-- Review 4: Potential Fair Housing issue — Tier 3 (source of income reference)
INSERT INTO email_reviews
    (id, sender_name, recipient_type, recipient_name, property_address,
     original_text, polished_text, topics, tier_result, excellence_score,
     flags_triggered, final_status, criteria_version)
VALUES (
    4,
    'Derek Sullivan',
    'tenant',
    'Angela Washington',
    '905 Clover Basin Dr, Manteca, CA 95336',
    'Hi Angela, just wanted to let you know that we do not accept Section 8 at this property. All income must come from employment.',
    'Dear Ms. Washington,\n\nThank you for your interest in our property at 905 Clover Basin Dr. Our income qualification requirement is verifiable income of 2.5 times the monthly rent from any lawful source. These requirements apply equally to all applicants.\n\nPlease do not hesitate to reach out if you have any questions about the application process.\n\nSincerely,\nDerek Sullivan\nCrown Key Realty Inc.',
    '["leasing","fair-housing"]',
    3, 3,
    '[{"flag":"Pattern 1.7","reason":"Source of income reference — original email stated Section 8 not accepted, which violates California law. Rewritten to remove all source-of-income language."}]',
    'pending-susan',
    'v1.0'
);

-- Review 5: Vendor work order confirmation — Tier 1
INSERT INTO email_reviews
    (id, sender_name, recipient_type, recipient_name, property_address,
     original_text, polished_text, topics, tier_result, excellence_score,
     flags_triggered, final_status, criteria_version)
VALUES (
    5,
    'Maria Torres',
    'vendor',
    'Reliable Plumbing Co.',
    '1130 Sunstone Dr, Tracy Hills, CA 95377',
    'Hi, just wanted to confirm the plumbing job at Sunstone. Please go next Tuesday between 9 and noon. Tenant will be home.',
    'Dear Reliable Plumbing Co.,\n\nThis email confirms your work order for the plumbing repair at 1130 Sunstone Dr, Tracy Hills, CA 95377. The appointment is scheduled for Tuesday, July 1, 2026, between 9:00 AM and 12:00 PM. The tenant has been notified and will be available.\n\nPlease contact our office at (209) 555-0100 if you need to reschedule or have any questions before the appointment.\n\nThank you,\nMaria Torres\nCrown Key Realty Inc.',
    '["maintenance","vendor"]',
    1, 9,
    '[]',
    'sent',
    'v1.0'
);

-- Review 6: Late rent day 10 — Tier 1
INSERT INTO email_reviews
    (id, sender_name, recipient_type, recipient_name, property_address,
     original_text, polished_text, topics, tier_result, excellence_score,
     flags_triggered, final_status, criteria_version)
VALUES (
    6,
    'James Okafor',
    'tenant',
    'Tom Larsen',
    '3304 Eagle Nest Way, Livermore, CA 94551',
    'Tom your rent is still not paid. This is day 10. We need you to pay asap or we will have to take action.',
    'Dear Mr. Larsen,\n\nThis is a follow-up notice regarding your outstanding rent balance of $1,850.00, which remains unpaid as of June 10, 2026. A late fee of $75.00 has been assessed per your lease agreement, bringing your total balance due to $1,925.00.\n\nImmediate payment is required through the AppFolio portal. If you are experiencing difficulty, please contact our office at (209) 555-0100 today to discuss a payment arrangement before further action is required.\n\nSincerely,\nJames Okafor\nCrown Key Realty Inc.',
    '["late-rent"]',
    1, 8,
    '[]',
    'sent',
    'v1.0'
);

-- Review 7: Owner monthly summary — Tier 1
INSERT INTO email_reviews
    (id, sender_name, recipient_type, recipient_name, property_address,
     original_text, polished_text, topics, tier_result, excellence_score,
     flags_triggered, final_status, criteria_version)
VALUES (
    7,
    'Susan Goulding',
    'owner',
    'David Chen',
    '4420 Tanglewood Dr, Tracy, CA 95376',
    'Hi David, here is your monthly report for June. Income was 4500. Expenses were 320 for the plumbing repair. Net was 4180.',
    'Dear Mr. Chen,\n\nPlease find below your monthly summary for June 2026 at 4420 Tanglewood Dr, Tracy, CA 95376.\n\nGross Rent Collected: $4,500.00\nMaintenance Expenses: ($320.00) — Plumbing repair, June 1\nNet Owner Distribution: $4,180.00\n\nFull documentation is available in your AppFolio owner portal. Please contact our office if you have any questions.\n\nSincerely,\nSusan Goulding\nCrown Key Realty Inc.',
    '["owner-report"]',
    1, 9,
    '[]',
    'sent',
    'v1.0'
);

-- Review 8: Lease violation — Tier 2 (vague language, corrected)
INSERT INTO email_reviews
    (id, sender_name, recipient_type, recipient_name, property_address,
     original_text, polished_text, topics, tier_result, excellence_score,
     flags_triggered, final_status, criteria_version)
VALUES (
    8,
    'Linda Pham',
    'tenant',
    'Sofia Reyes',
    '2251 River Islands Pkwy, Lathrop, CA 95330',
    'Sofia, there have been some complaints about noise at your unit. Please keep it down.',
    'Dear Ms. Reyes,\n\nWe have received reports of noise disturbances originating from your unit at 2251 River Islands Pkwy on the evenings of June 12 and June 14, 2026. This notice is to inform you that this behavior may constitute a violation of Section 12 of your lease agreement, which requires residents to respect the quiet enjoyment of neighboring tenants between 10:00 PM and 8:00 AM.\n\nPlease ensure that noise levels in your unit comply with your lease terms. A repeat occurrence may result in a formal written warning. If you have questions regarding this notice, please contact our office.\n\nSincerely,\nLinda Pham\nCrown Key Realty Inc.',
    '["violation","noise"]',
    2, 7,
    '[{"flag":"Pattern 3.3","reason":"Selective enforcement risk — ensured language matches standardized template"}]',
    'sent',
    'v1.0'
);

-- Review 9: ESA accommodation denial (BLOCKED) — Tier 3
INSERT INTO email_reviews
    (id, sender_name, recipient_type, recipient_name, property_address,
     original_text, polished_text, topics, tier_result, excellence_score,
     flags_triggered, final_status, criteria_version)
VALUES (
    9,
    'Derek Sullivan',
    'tenant',
    'Mark Hoffman',
    '905 Clover Basin Dr, Manteca, CA 95336',
    'Hi Mark, sorry but our no-pets policy applies to all animals including emotional support animals.',
    'Dear Mr. Hoffman,\n\nThank you for reaching out regarding an assistance animal. Crown Key Realty complies with all Fair Housing laws regarding assistance animals, and our pet policies do not apply to assistance animals.\n\nIf you would like to request a reasonable accommodation, please contact our office at (209) 555-0100 and we will provide you with our accommodation request process and respond within 10 business days.\n\nSincerely,\nDerek Sullivan\nCrown Key Realty Inc.',
    '["accommodation","fair-housing","ESA"]',
    3, 2,
    '[{"flag":"Pattern 4.4","reason":"Original email incorrectly applied no-pet policy to ESA — this is a Fair Housing violation. BLOCKED."}, {"flag":"Pattern 4.1","reason":"Denial without engaging interactive process — BLOCKED."}]',
    'pending-susan',
    'v1.0'
);

-- Review 10: Owner repair escalation — Tier 1
INSERT INTO email_reviews
    (id, sender_name, recipient_type, recipient_name, property_address,
     original_text, polished_text, topics, tier_result, excellence_score,
     flags_triggered, final_status, criteria_version)
VALUES (
    10,
    'Maria Torres',
    'owner',
    'Jennifer Park',
    '812 Mossberg Ct, Mountain House, CA 95391',
    'Jennifer, the HVAC at Mossberg needs to be replaced. Cost is about 3800. We need your go ahead.',
    'Dear Ms. Park,\n\nWe are writing to inform you of a maintenance issue at 812 Mossberg Ct, Mountain House, CA 95391 that requires your authorization before we can proceed.\n\nOur licensed HVAC contractor has inspected the unit and determined that the heating and cooling system requires full replacement. The estimated cost is $3,800.00. This repair falls above our pre-authorized maintenance threshold and requires your written approval.\n\nPlease reply to this email with your authorization or contact our office at (209) 555-0100 to discuss. We recommend acting promptly as the tenant does not have a functioning HVAC unit.\n\nSincerely,\nMaria Torres\nCrown Key Realty Inc.',
    '["maintenance","owner-escalation"]',
    1, 9,
    '[]',
    'sent',
    'v1.0'
);

-- -----------------------------------------------------------------------------
-- Follow-Up Items (5)
-- Each links to an email_review row above.
-- -----------------------------------------------------------------------------

-- Follow-up from review 1 (late rent — promise to follow up if unpaid by June 12)
INSERT INTO follow_up_items
    (id, email_review_id, assigned_to, promise_text, due_date, status, reminder_sent, escalated_to_susan)
VALUES (
    1, 1,
    'Maria Torres',
    'Follow up with Mr. Kim if payment not received by June 12, 2026.',
    '2026-06-12',
    'completed',
    1, 0
);

-- Follow-up from review 2 (maintenance scheduling)
INSERT INTO follow_up_items
    (id, email_review_id, assigned_to, promise_text, due_date, status, reminder_sent, escalated_to_susan, completed_at)
VALUES (
    2, 2,
    'James Okafor',
    'Confirm HVAC repair appointment with Ms. Nair within 2 business days.',
    '2026-06-14',
    'completed',
    1, 0,
    '2026-06-13T10:22:00Z'
);

-- Follow-up from review 5 (vendor job — confirm completion after Tuesday)
INSERT INTO follow_up_items
    (id, email_review_id, assigned_to, promise_text, due_date, status, reminder_sent, escalated_to_susan)
VALUES (
    3, 5,
    'Maria Torres',
    'Confirm plumbing repair was completed and close work order after July 1 appointment.',
    '2026-07-02',
    'pending',
    0, 0
);

-- Follow-up from review 6 (day 10 late rent — escalate if still unpaid by June 13)
INSERT INTO follow_up_items
    (id, email_review_id, assigned_to, promise_text, due_date, status, reminder_sent, escalated_to_susan)
VALUES (
    4, 6,
    'James Okafor',
    'Escalate to Susan if Mr. Larsen has not paid by June 13, 2026.',
    '2026-06-13',
    'overdue',
    1, 1
);

-- Follow-up from review 10 (HVAC authorization from owner)
INSERT INTO follow_up_items
    (id, email_review_id, assigned_to, promise_text, due_date, status, reminder_sent, escalated_to_susan)
VALUES (
    5, 10,
    'Maria Torres',
    'Follow up with Ms. Park for HVAC authorization if no response by June 30, 2026.',
    '2026-06-30',
    'pending',
    0, 0
);

-- -----------------------------------------------------------------------------
-- Approval Queue (2) — both from Tier 3 reviews
-- -----------------------------------------------------------------------------

INSERT INTO approval_queue
    (id, email_review_id, flag_reason, flag_category, status, submitted_at)
VALUES (
    1, 4,
    'Original email stated the property does not accept Section 8 and requires employment income only. This violates California source-of-income protections (Civil Code § 12955). Email has been rewritten. Please review the polished version before sending.',
    'Fair Housing',
    'pending',
    '2026-06-10T14:30:00Z'
);

INSERT INTO approval_queue
    (id, email_review_id, flag_reason, flag_category, status, submitted_at)
VALUES (
    2, 9,
    'Original email denied an emotional support animal request by applying the no-pet policy. This is a Fair Housing violation under Pattern 4.4 and Pattern 4.1. The email has been rewritten to engage the interactive accommodation process. Please review before sending.',
    'Fair Housing',
    'pending',
    '2026-06-14T09:15:00Z'
);

-- -----------------------------------------------------------------------------
-- Learning Pairs (2) — pending Susan's explicit acceptance
-- -----------------------------------------------------------------------------

INSERT INTO learning_pairs
    (id, original_text, corrected_text, flag_category, flag_reason, what_changed, status)
VALUES (
    1,
    'Hi Angela, just wanted to let you know that we do not accept Section 8 at this property. All income must come from employment.',
    'Dear Ms. Washington,\n\nThank you for your interest in our property at 905 Clover Basin Dr. Our income qualification requirement is verifiable income of 2.5 times the monthly rent from any lawful source. These requirements apply equally to all applicants.\n\nPlease do not hesitate to reach out if you have any questions about the application process.\n\nSincerely,\nDerek Sullivan\nCrown Key Realty Inc.',
    'Fair Housing',
    'Source of income reference — Section 8 rejection language violates California Civil Code § 12955.',
    'Removed Section 8 and employment-only language. Replaced with income ratio standard that accepts all lawful sources.',
    'pending-review'
);

INSERT INTO learning_pairs
    (id, original_text, corrected_text, flag_category, flag_reason, what_changed, status)
VALUES (
    2,
    'Hi Mark, sorry but our no-pets policy applies to all animals including emotional support animals.',
    'Dear Mr. Hoffman,\n\nThank you for reaching out regarding an assistance animal. Crown Key Realty complies with all Fair Housing laws regarding assistance animals, and our pet policies do not apply to assistance animals.\n\nIf you would like to request a reasonable accommodation, please contact our office at (209) 555-0100 and we will provide you with our accommodation request process and respond within 10 business days.\n\nSincerely,\nDerek Sullivan\nCrown Key Realty Inc.',
    'Fair Housing',
    'Pet policy applied to ESA — Fair Housing violation (Pattern 4.4). No interactive process engaged (Pattern 4.1).',
    'Removed pet policy application to ESA. Added compliant accommodation request language directing tenant to formal process.',
    'pending-review'
);

-- -----------------------------------------------------------------------------
-- Monthly Scorecards (one per team member for June 2026)
-- -----------------------------------------------------------------------------

INSERT INTO monthly_scorecards
    (team_member_id, year_month, emails_reviewed, avg_excellence_score,
     tier1_count, tier2_count, tier3_count,
     follow_ups_due, follow_ups_completed_on_time, follow_ups_missed,
     avg_response_time_hours)
VALUES
    (1, '2026-06', 3, 8.7, 3, 0, 0, 2, 2, 0, 3.2),
    (2, '2026-06', 2, 8.5, 2, 0, 0, 2, 1, 1, 4.1),
    (3, '2026-06', 2, 7.0, 0, 2, 0, 0, 0, 0, 5.5),
    (4, '2026-06', 2, 2.5, 0, 0, 2, 0, 0, 0, 6.8),
    (5, '2026-06', 1, 9.0, 1, 0, 0, 0, 0, 0, 1.0);

-- -----------------------------------------------------------------------------
-- Incoming Analysis Log (3 sample entries — no email text stored)
-- -----------------------------------------------------------------------------

INSERT INTO incoming_analysis_log
    (id, analyzed_by, sender_type, emotional_tone, risk_level, created_at)
VALUES
    (1, 'Maria Torres',   'tenant', 'frustrated, escalating', 'medium', '2026-06-10T08:45:00Z'),
    (2, 'James Okafor',   'owner',  'concerned, professional', 'low',   '2026-06-12T11:20:00Z'),
    (3, 'Linda Pham',     'tenant', 'angry, threatening legal action', 'high', '2026-06-14T15:05:00Z');
