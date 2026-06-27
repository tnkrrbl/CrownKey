# Asimov Governance Review
## CrownKey Email Guardian — Pre-Build Review
**Date:** 2026-06-26
**Reviewer:** Asimov (AI Governance Specialist)
**Status:** PRE-BUILD REVIEW — must be resolved before Q begins construction

---

## What This Automation Does

The CrownKey Email Guardian is an AI-powered review layer that sits between team members writing emails and the moment those emails are sent. It does not send emails on its own — a human always clicks send. When a team member composes an outgoing email, the system polishes it for grammar and tone, scores it against the excellence rubric, and routes it through one of three tracks: auto-clear (Tier 1, ~85% of volume), flag with a fix suggestion for the sender to address (Tier 2, ~12%), or escalate to Susan for approval before sending (Tier 3, ~3%). The system also analyzes incoming emails from tenants and owners for emotional tone and risk, auto-creates follow-up reminders when it detects date commitments in outgoing emails, notifies Susan if those follow-ups are missed, sends Susan a daily digest of activity metrics, and sends each team member a monthly quality scorecard. Susan's edits to polished emails are stored and used over time to refine the system's behavior.

---

## Governance Questions — Findings

---

### Question 1: Tier 1 Auto-Handle (85% of emails cleared without human review of the review result)

**Finding: APPROVED WITH GUARDRAIL**

The core design is sound. The system does not send emails — the team member still clicks send on a Tier 1 email. Auto-handle in this context means the AI reviewed the email, found nothing to flag, polished it, and handed it back. The human is still the sender. This is not the same as the system autonomously taking an action.

However, the 85% Tier 1 rate creates a soft oversight gap that needs to be addressed structurally. If the system is clearing the large majority of emails without any secondary review, the quality of its clearance decisions is effectively unaudited in real time. Errors in Fair Housing detection logic, tone scoring, or pattern matching will not surface until Susan reviews a scorecard or a problem has already compounded.

**Required guardrail:** Every Tier 1 clearance must be logged in the audit trail with the full decision record per Rule 1 — email hash or identifier, which checks ran, what each returned, the criteria version used (Rule 5), and a trace ID. Susan must be able to pull any cleared email at any time and see exactly what the system checked and what it found. This is not optional — it is the audit trail requirement under Rule 1.

**Required guardrail:** The system must expose a sample review mechanism — Susan should see a weekly or daily sample of Tier 1 cleared emails (configurable count) in her digest so that she can spot-check clearance quality without having to wait for a complaint to surface. This is the practical substitute for human review on each email and is what makes Tier 1 defensible.

**Required guardrail:** A global kill switch must exist that lets Susan pause Tier 1 auto-clearing and route all emails through Tier 2 or Tier 3. This satisfies the "clear way to stop or pause the automation" requirement.

---

### Question 2: Auto-Polish (AI rewrites emails before review — team members must see and approve the polished version)

**Finding: APPROVED WITH GUARDRAIL**

The auto-polish function itself is appropriate. Improving grammar, correcting ESL writing, and aligning tone to the Crown Key voice profiles is a low-risk, high-value operation. The system is not changing the meaning of emails — it is improving the expression of meaning.

The governance concern here is one of transparency and consent, not legality. If a team member sends an email and the recipient receives a version they did not write, the team member should know exactly what changed and must have had a meaningful chance to reject or further edit the polished version before sending. "Meaningful chance" means more than a flash of the screen — it means the polished version is presented with changes visible (either as a diff or with original alongside) and the team member actively confirms.

**Required guardrail:** The team member must see the polished version before clicking send. The UI must make it clear that the email has been modified from what they wrote. A simple "here is your email" display is not sufficient — the changes must be visible. If the team member has not confirmed the polished version, the send button must not proceed. This is non-negotiable: a human wrote this email under their name and they are responsible for its content.

**Required guardrail:** Team members must have the ability to reject the polish and send their original version (after the system still runs its compliance checks). The system can coach — it cannot override a human's choice about what they send under their own name.

**Recommended guardrail:** The system should log both the original draft and the polished version in the audit trail, so if a content dispute arises, Crown Key can show what was written versus what was sent.

---

### Question 3: Fair Housing Detection (AI flags potential violations for human review — does not make a final determination)

**Finding: APPROVED**

The design is correct and reflects the right governance posture. The system detects and flags — it does not decide. A flagged email goes to Tier 3 and requires Susan's review before it sends. The AI is acting as a detection layer, not an adjudicator. This is the appropriate role for an automated system in a Fair Housing context.

The fair-housing-rules.md ruleset reviewed as part of this assessment is thorough. It covers all seven federal protected classes, all relevant California additions (source of income, marital status, sexual orientation, gender identity, citizenship/immigration status, primary language), and addresses steering, disparate treatment patterns, disability accommodation handling, and familial status patterns. The distinction between BLOCK (must not send without manual override) and FLAG (routes to review) is appropriate — outright violations are harder stopped than mere risk signals.

Two items must be confirmed at build time to maintain this approval.

**Required guardrail:** The criteria used for Fair Housing detection must be stored as versioned config per Rule 5 — not hardcoded in the AI's logic. Every flagged email must reference the criteria version that triggered the flag. When the ruleset is updated, a new version is created rather than overwriting the old one. This is mandatory because Crown Key may need to demonstrate, months after an event, exactly which rules were in effect when an email was reviewed.

**Required guardrail:** Any time a Fair Housing flag overrides a team member's intended send, that override must be logged with the specific pattern triggered, the criteria version, and the subsequent human decision (Susan approved / Susan blocked / Susan modified and sent). The system must never silently suppress an email — the team member must know why their email was held.

**Note for Mason:** The fair-housing-rules.md ruleset is drafted and pending Mason review per its status header. This review finding does not substitute for Mason's legal review of that ruleset. Mason must review and sign off on the ruleset before the system goes live. Asimov gates the system; Mason gates the ruleset the system enforces.

---

### Question 4: Follow-Up Automation (auto-creates reminders from date commitments detected in emails, escalates to Susan if missed)

**Finding: APPROVED WITH GUARDRAIL**

Auto-creating internal follow-up reminders based on date commitments is a Tier 1 operation under Rule 8 — it is internal, low-risk, and creates no external action. A calendar reminder appearing in a team member's queue is not a consequential action against a tenant or owner.

The escalation to Susan when a follow-up is missed is also internally appropriate. Susan managing her team's follow-through is squarely within her role as the business owner.

The concern is the absence of transparency to the sender about what the system is doing on their behalf.

**Required guardrail:** When the system auto-creates a follow-up reminder, it must notify the sender immediately — either as part of the email review result or as a separate notification. The sender must know: what commitment was detected, what reminder was created, and when it is set for. Creating calendar obligations without the person's knowledge is not acceptable even when the obligation is internal.

**Required guardrail:** Senders must be able to dismiss or edit auto-created follow-up reminders. If the system misdetected a date commitment (hallucinated or misread intent), the sender should not be stuck with a false reminder that will then trigger a missed-follow-up escalation to Susan.

**Recommended guardrail:** Consider a brief opt-out toggle per-email: "Skip follow-up tracking for this email" — useful for situations where the team member is quoting a date that is not their commitment (e.g., "the lease expires on June 1" does not mean Crown Key needs to take an action on June 1).

---

### Question 5: Team Scorecards (monthly quality scores and follow-up completion rates sent to each team member)

**Finding: APPROVED WITH GUARDRAIL**

Collecting and sharing performance data within a company is a legitimate and normal business practice, and this system's scorecard data — email quality scores and follow-up completion rates — is directly tied to job performance. This is not a Fair Housing concern. It is an employment practice concern.

The governance concern is fairness and transparency in how scores are generated and used.

**Required guardrail:** Team members must be informed, before the system goes live, that their emails are being scored and that monthly scorecards will be shared with them. They should not discover this at the end of the first month. Transparency here protects Crown Key from employee relations issues and is simply the right thing to do. This notification should happen at the system launch, not buried in a policy document.

**Required guardrail:** The scoring rubric and criteria must be documented, versioned (Rule 5), and made available to team members. A team member who receives a low score must be able to understand what the criteria were and how the score was calculated. "The AI said so" is not acceptable as an explanation to an employee whose performance record is being affected.

**Required guardrail:** Susan must be the only person with access to individual team member scorecards. Scores should not be visible to other team members or accessible through shared dashboards. The audit trail for the scorecard system must include who accessed which scores and when (Rule 1, Rule 4 data inventory).

**Recommended guardrail:** Consider whether scorecards should include a mechanism for a team member to flag a disputed score for Susan's review. If the AI misclassified an email and that lowered someone's score, the team member should have a path to contest it.

**Note for Mason:** If any team member scorecard data is used in disciplinary action, demotion, or termination decisions, that crosses into employment law territory. Mason should review the intended use of scorecard data before the system is activated — not to block the system, but to ensure Crown Key's employment practices around AI-generated performance data are legally sound.

---

### Question 6: Learning Engine (Susan's edits stored and used to train system behavior over time)

**Finding: NEEDS REDESIGN**

This is the most significant governance concern in the architecture. The system stores Susan's edits to emails and uses them to shape the system's future behavior. This means the system's detection thresholds, polish style, and potentially its Fair Housing flagging behavior will drift over time based on Susan's editing patterns.

There are two compounding problems:

First, team members whose emails are being polished and reviewed do not know that Susan's corrections to their work are being fed back into a system that will then apply those corrections to other team members' writing going forward. This is a transparency failure. People writing in their own name, having their work corrected, should understand that those corrections are becoming part of an automated standard applied to the whole team.

Second, if Susan ever edits a flagged email in a way that approves language the system originally flagged as a potential Fair Housing issue, that approval could be learned by the system and reduce the sensitivity of future detection. The learning engine could, over time, erode Fair Housing guardrails based on a small number of individual decisions made without recognizing their systemic effect. This is not a hypothetical risk — it is the predictable behavior of a feedback loop without controls.

**Required redesign:** The learning engine must not apply to Fair Housing detection criteria, tone profiles, or the excellence rubric. Those must be updated only through a deliberate, documented change management process per Rule 6. Automatic behavioral drift from individual edits is not a compliant change management process for compliance-relevant criteria.

**Required redesign:** Susan's edits must be logged separately as "owner feedback" and presented to Susan periodically (monthly or quarterly) as proposed updates to the system's behavior, which she explicitly approves or rejects as a batch. She should not be unknowingly training the system with every edit. Edits that affect compliance-relevant behavior (tone thresholds, flag sensitivity) must require explicit approval under Rule 6 change management.

**Required guardrail:** Team members must be informed, at launch, that the system learns from the business owner's edits and that this shapes how future emails are polished. They should understand they are working with a system that evolves.

**Required guardrail:** Every behavioral change driven by learning must be logged in the audit trail with what changed, what input triggered it, and which criteria version was replaced (Rule 5, Rule 6).

---

### Question 7: Incoming Email Analysis (tenant and owner emails analyzed for emotional tone and risk)

**Finding: APPROVED WITH GUARDRAIL**

Analyzing emails received from tenants and owners is an internal risk-assessment and coaching tool. The recipients of the analysis are Crown Key staff, not the tenants or owners. The tenants and owners are not being scored — the system is coaching Crown Key's team on how to respond. This is meaningfully different from, for example, using AI to score applicants.

However, there is a data handling concern that must be addressed.

Tenant emails contain personal information — descriptions of living conditions, complaints about neighbors, financial difficulties mentioned in the context of rent, and sometimes health information in accommodation requests. Analyzing this content with AI means that content is being processed and potentially retained in a system beyond the original email inbox.

**Required guardrail:** The data inventory for the incoming email analysis must be registered per Rule 4 with a clear retention policy. Tenant email content processed by the AI should not be retained beyond the time needed to generate the coaching output. The coaching output itself (tone classification, risk flag) may be retained for audit purposes, but the raw email content should not persist in the AI system's data store beyond a defined and documented window.

**Required guardrail:** If the incoming email analysis detects language that could relate to a Fair Housing accommodation request (disability, assistance animal, pregnancy, etc.), that detection must route to Tier 3 — a human review of the response — not just coaching. The stakes on accommodation request responses are too high for a coaching-only workflow. This connects to Pattern 4.1 in the fair-housing-rules.md ruleset already drafted.

**Required guardrail:** CCPA delete must cascade to any retained incoming email data. If a tenant requests deletion of their data under CCPA (Rule 10), any processed content or derived signals from their emails must be included in the deletion scope.

**Recommended guardrail:** The system should be designed so that incoming email content is analyzed in-context and not stored in a separate AI training set or knowledge base. Tenant communications are personal data with legal protection — their use should be limited to the purpose for which they were originally sent (responding to the tenant).

---

## Rule Compliance Summary

| Rule | Status | Key Issue |
|------|--------|-----------|
| Rule 1: Audit Log | CONDITIONAL | Required on all seven decision areas — must include criteria version and trace ID |
| Rule 2: Screening Extra Fields | N/A | System does not make screening decisions |
| Rule 3: SMS Consent | N/A | System does not send SMS |
| Rule 4: Data Inventory | CONDITIONAL | Incoming email data and scorecard data must be registered |
| Rule 5: Versioned Criteria | CONDITIONAL | Fair Housing rules, tone profiles, excellence rubric, and scoring thresholds must all be versioned config — not hardcoded |
| Rule 6: Change Management | FAIL | Learning engine bypasses Rule 6 — must be redesigned |
| Rule 7: Agent Lifecycle | CONDITIONAL | Shadow mode required before activation; this review is the governance gate for that transition |
| Rule 8: Permission Tiers | CONDITIONAL | Tier assignments for each action must be documented in playbook config before Q builds |
| Rule 9: Protected Class Data | CONDITIONAL | Incoming email analysis must exclude protected class signals from any retention or decision context |
| Rule 10: CCPA Delete | CONDITIONAL | Must cascade to all retained email data, processed signals, and scorecard records |

---

## Required Guardrails Before Build

The following are hard requirements. The system must not be built without design answers to each of these. They are pre-build requirements, not post-build fixes.

1. **Learning engine redesign** — The learning engine must not automatically modify compliance-relevant criteria. Susan's edits become proposed updates reviewed and explicitly approved in batch. Fair Housing detection criteria are excluded from automatic learning entirely. (Question 6, Rule 6)

2. **Tier 1 sample review in daily digest** — Susan must see a daily or weekly sample of Tier 1 cleared emails to enable practical oversight of the auto-clear population. (Question 1)

3. **Polish transparency — diff display required** — Team members must see what changed between their draft and the polished version before clicking send. The send action must require explicit confirmation of the polished content. (Question 2)

4. **Polish rejection right** — Team members must be able to reject the polish and send their original version. The system can flag concerns but cannot compel a specific word choice. (Question 2)

5. **Follow-up reminder notification to sender** — When the system auto-creates a follow-up reminder, the sender must be notified immediately with the detected commitment and the reminder details. Sender must be able to dismiss or edit the reminder. (Question 4)

6. **Team member notification at launch** — Team members must be told before activation: their emails will be scored, monthly scorecards will be created, the system learns from the owner's edits, and what data is retained. (Questions 5 and 6)

7. **Incoming email data retention policy** — Raw tenant and owner email content processed by the AI must not be retained beyond a defined window. Retention policy must be registered in the data inventory per Rule 4. (Question 7)

8. **Accommodation request escalation** — Any incoming email that the system detects as a potential disability accommodation or assistance animal request must route to Tier 3 for human review of the response. A coaching-only workflow is insufficient for this category. (Question 7, fair-housing-rules.md Pattern 4.1)

9. **Versioned criteria config** — All detection rules, tone thresholds, scoring rubrics, and Fair Housing patterns must be stored as versioned config (not code). Every AI decision must log the criteria version in effect. (Rule 5)

10. **Kill switch** — Susan must be able to pause Tier 1 auto-clearing system-wide and route all emails to Tier 2. This must be accessible without technical support. (Question 1, Rule 8)

---

## Recommended Guardrails

These are not blockers but should be included in the build if feasible.

1. **Per-email opt-out for follow-up tracking** — A toggle on the email review screen: "Don't create follow-up reminder for this email." Useful when team members are quoting dates that aren't their commitments.

2. **Disputed score mechanism** — Team members should have a path to flag a scorecard score for Susan's review if they believe the AI scoring was incorrect.

3. **Separate storage of original draft and polished version** — Both versions logged in the audit trail so Crown Key can show exactly what a team member wrote versus what was sent.

4. **Incoming email content isolation** — Incoming email content should be analyzed in-context without being ingested into a persistent knowledge base or training set beyond the coaching output.

5. **Mason review of learning engine output** — Any batch of proposed behavioral updates derived from Susan's edits that touches tone profiles or Fair Housing detection should be reviewed by Mason before being applied, at least for the first year of operation.

---

## Pending Gates — Not Asimov's to Clear

The following must be addressed by other specialists before this system activates. They are noted here so Jarvis has a complete picture.

- **Mason:** Must review and approve the fair-housing-rules.md ruleset before the system uses it in production. Must also review the intended use of team member scorecard data in any employment context.
- **Sentinel:** Must review the handling of incoming email content (personal data from tenants and owners), the data store for audit logs, and the mechanism by which the learning engine stores and applies Susan's edits.
- **Neo:** Must design the data inventory registration for all tables created by this system and implement CCPA delete cascades.
- **Viper:** Must adversarially test the Fair Housing detection layer — specifically, can a sophisticated bad actor craft language that evades detection while still encoding a protected class preference?
- **Rule 7 Shadow Mode:** Per GOVERNANCE.md Rule 7, this system must run in shadow mode before going active. Given that it affects every outgoing email sent by Crown Key staff and produces performance data used in employee relations, a 30-day minimum shadow mode is required.

---

## Overall Clearance

**NOT APPROVED TO ACTIVATE**

The system may not be built as currently designed. One item requires redesign before the build begins: the learning engine as described will allow automatic drift in compliance-relevant criteria without going through the Rule 6 change management process, which creates regulatory exposure.

The remaining items are guardrails that must be included in the build design — they are not post-build patches.

**The build may proceed when:**

1. The learning engine design is revised so that Fair Housing detection criteria, tone profiles, and excellence rubric thresholds are excluded from automatic learning and updated only through explicit Rule 6 change management.
2. Q's build plan addresses all ten required guardrails listed above.
3. Oracle's spec is updated to reflect this review's requirements before Q begins.

Once the build is complete with these guardrails in place, the remaining specialist gates (Mason, Sentinel, Neo, Viper) must clear before Asimov signs off on activation.

---

*Reviewed by: Asimov (AI Governance Specialist)*
*Authority: GOVERNANCE.md v1 — AI Governance Rules and Fair Housing Standard*
*This review is not legal advice. Flag legal questions to Mason.*
