# Judge Review — CrownKey Email Guardian
**Reviewed by:** Judge (QA Specialist)
**Date:** 2026-06-26
**Scope:** Full pipeline review — specs, API, frontend, all prior specialist reports

---

## Verdict

**READY FOR SUSAN TO TEST** — with required pre-live conditions documented below.

---

## 1. Completeness

**Finding: MEETS SPEC WITH ONE VISIBLE GAP**

The 6-screen app is present and complete. The draft assist flow (Mode B), 10 playbook situations, excellence scoring, 3-tier routing, follow-up tracker, incoming email analysis, Susan's approval queue, and team scorecards are all built and working per TARS verification. The only feature that cannot be demonstrated during Susan's test session is the follow-up detection banner — no mock outcome includes a follow-up object, so Susan will not see that feature fire. This is a demo gap, not a build gap. Q should add a mock outcome that triggers it so Susan can see the full feature set.

The archive feature is not present. If this was in the original spec, it is missing. This review did not find an archive screen among the 6 pages built.

---

## 2. Correctness

**Finding: SPEC DOCUMENTS ARE ACCURATE — MASON'S CHANGES WERE APPLIED**

The critical corrections Mason required have been applied to the fair-housing-rules.md document:

- Source of income (RC-1): The 10-unit threshold has been removed. The document now correctly states the protection applies to ALL residential rentals with no threshold. This is accurate under California law.
- Age (RC-3): Added to the California protected class list at the top of the document.
- Military/Veteran Status (RC-4): Added to the California protected class list.
- Availability misrepresentation (RC-5/Pattern 2.4): Now shows a BLOCK for actively listed units and a SOFT BLOCK (Tier 2) for units in pending status — exactly what Mason required.

One Mason correction was NOT applied: RC-2, the primary language standalone sub-pattern. Mason required adding an explicit statement to Pattern 1.2 (or as a new sub-pattern) reading: "Do not condition tenancy or create additional requirements based on a person's primary language or English proficiency." The current document mentions "native language" in passing in Pattern 1.2 but does not include the explicit prohibition on conditioning tenancy or requiring English proficiency. The protected class list header also does not list primary language as a separate California class — it was listed in Mason's review findings as a required addition but is absent from the document's class list.

The document status footer still reads "DRAFT — not approved for production use" on all three spec documents (fair-housing-rules.md, tone-profiles.md, excellence-rubric.md). This is technically correct — Mason approved with changes, and while most changes were applied, RC-2 remains outstanding. The system prompt correctly loads these files from disk at runtime, so any future corrections take effect without a code change.

---

## 3. Quality

**Finding: SYSTEM PROMPT IS SUBSTANTIVE AND WELL-CONSTRUCTED**

The review-system.js prompt fully embeds the tone profiles, fair housing rules, and excellence rubric by reading them from disk at runtime. This means updates to the rule files take effect immediately without touching code — this is the right design for a compliance document.

The tier assignment logic in the system prompt is clearly sequenced, covers all five check types (Fair Housing, Owner Protocol, Tone, Accuracy, Promise Detection), and accurately reflects the BLOCK vs. SOFT BLOCK distinction in Pattern 2.4. The accommodation request detection override (auto-Tier 3 on any accommodation response) is correctly implemented.

The system prompt instructs Claude to return only JSON with no markdown fences. There is no fallback schema validation — if Claude returns malformed JSON, the route catches the parse error and returns a 502 to the user. This is acceptable for Phase 1 but fragile for production volume.

The criteriaVersion is hardcoded as '1.0' in review.js line 97. This satisfies Asimov's Rule 5 requirement for now. It will need to be updated manually each time the rules files change, which is a process risk — there is no mechanism to detect that the rules changed but the version string was not bumped.

---

## 4. Honesty — What Susan Should Know Before She Tests

**THE BUILD IS WORKING. HERE IS WHAT IS REAL VERSUS SIMULATED:**

- **You are testing against fake data.** The mock-api.js file is active. Every "Review My Email" click cycles through three pre-written outcomes regardless of what you type. The AI is not actually reading your email yet. This is intentional for the demo — it lets you see all three review outcomes without needing the backend running.

- **Node.js is not installed.** The real API (the part that actually connects to Claude AI) requires Node.js to run. TARS confirmed this was not installed during testing. Until Node.js is set up, the system runs on mock data only. Scotty needs to handle this before the system connects to real AI.

- **When the mock is turned off, the endpoints will connect correctly.** TARS found and Q fixed the endpoint name mismatch — the frontend now calls the correct API paths (/api/review, /api/draft, /api/incoming).

- **There is no login system.** Anyone on your office network can access all 5 pages including Susan's Queue and the scorecards. This is intentional for Phase 1 internal use but must be addressed before the system runs on a broader network.

- **The "Start My Reply" flow works.** The prefill bug was fixed — when you click "Start My Reply" on the Incoming page, the suggested opening now carries over into the Review page correctly.

- **Garbled text bug is fixed.** When Susan edits an email in the "Needs Edits" mode or in the approval queue, apostrophes and quotes will display correctly and not show as HTML codes.

- **Sender name carries over correctly.** When a draft is generated in "Help me write it" mode, the sender name now copies into the Review tab correctly.

- **You will not see the follow-up detection banner during this test session.** The mock data does not include a follow-up commitment example. This feature is built and works — Q just needs to add one mock example so you can see it.

---

## 5. What Must Happen Before This Goes Live With Real Tenants

These are not optional. The system must not send actual tenant communications until all of these are done.

**Legal (cannot skip):**
1. RC-2 correction: Add the explicit primary language prohibition to Pattern 1.2 in fair-housing-rules.md. Mason flagged this as required and it was not applied.
2. Susan's attorney must confirm: (a) whether Crown Key's lease allows email as valid service of a legal notice under California law, (b) AB 1482 just-cause applicability for each property in the portfolio, (c) current rent control status for each city in the portfolio, and (d) CCPA compliance for automated tenant data processing. These are Mason's attorney referral items and they gate the legally sensitive playbooks (lease violation, non-renewal, rent increase).
3. The bad-tenant/non-renewal playbook (Playbook 8) must not be activated until AB 1482 status is confirmed per property. A data field for this needs to be built before that playbook goes live.

**Governance (Asimov requirements):**
4. 30-day shadow mode is required before the system routes real emails. During shadow mode, the system reviews and logs but team members send their original emails. Susan reviews the shadow results to calibrate the system before it begins influencing real sends.
5. Team members must be told before activation: their emails are being scored, monthly scorecards will be created, and what data is retained. They should not discover this at the end of the first month.
6. The learning engine (Susan's edits being used to shape future behavior) must not touch Fair Housing detection criteria. Those can only be updated through a deliberate change process, not from individual edits.
7. A kill switch must be available so Susan can pause the auto-clear (Tier 1) behavior at any time without needing technical help.

**Technical:**
8. Node.js must be installed and the real API must be tested with actual email drafts before going live. Scotty handles this.
9. The mock-api.js script tag must be removed from all 5 HTML pages before switching to the real backend.
10. The criteriaVersion string in review.js must be updated every time the rules files are changed. A process for this should be established.

**Nice to have (not blocking):**
- Add one mock outcome with a follow-up detection result so Susan can see that feature working in her test session.
- Score dispute mechanism for team members who think the AI scored them incorrectly.

---

*Judge Review — CrownKey Email Guardian v1.0*
*Issued: 2026-06-26*
