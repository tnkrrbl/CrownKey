# Mason Legal Review — CrownKey Email Guardian
**Reviewed by:** Mason (Legal Specialist)
**Date:** 2026-06-26
**Jurisdiction:** California — Tracy, Mountain House, Lathrop, Manteca, Ripon, River Islands, Tracy Hills, Livermore
**Scope:** Fair Housing Rules (v1.0) + 10 Playbook Templates (v1.0)

> This review identifies legal risk and compliance gaps. It is not legal advice.
> Nothing here substitutes for a licensed attorney in California. Items flagged
> as requiring attorney review must be cleared by Susan's legal counsel before
> the system goes live.

---

## 1. Fair Housing Rules — Verdict

**APPROVED WITH CHANGES**

The rule set is substantively sound. It covers the federal Fair Housing Act protected classes accurately, and the California additions (source of income, marital status, sexual orientation, gender identity/expression, citizenship/immigration status, primary language) are correctly listed. The BLOCK vs. FLAG distinction is generally well-calibrated. The Green-Light Phrases section (Section 7) is a good design choice — actively reinforcing compliant language reduces drift over time.

### Changes Required Before Approval

**RC-1 — Source of Income (Pattern 1.7): The threshold of "10+ units" is legally incorrect.**

Pattern 1.7 states that the source-of-income protection applies to "landlords with 10+ units or who work with property managers who manage 10+ units." This is not accurate under California Government Code Section 12955 (FEHA) and the Housing Accountability Act as amended. California's source-of-income protection applies to all residential rentals regardless of the number of units managed. The 10-unit threshold does not exist in current California law. This must be corrected — as written, a property manager reading this rule might believe they can refuse vouchers at a small property and that would be wrong.

**Required change:** Remove the 10-unit threshold language entirely. Replace with: "California prohibits discrimination based on source of income for all residential rental properties. Source of income includes Section 8 / Housing Choice Vouchers, government assistance programs, and any other lawful source of income including gifts, inheritance, and employment."

**RC-2 — Primary Language is a protected class in California: Pattern 1.2 partially covers it but the rule set does not make this explicit.**

California's FEHA and the Unruh Civil Rights Act protect "primary language" as a characteristic tied to national origin. Pattern 1.2 mentions native language in passing, but the rule set does not have a standalone flag for communications sent only in English that explicitly condition tenancy on English fluency, or for charging more for translation services. The Green-Light Phrases section should include a note on language access.

**Required change:** Add to Pattern 1.2 or as a new sub-pattern: "Do not condition tenancy or create additional requirements based on a person's primary language or English proficiency. Translation services, not language screening, are the correct response to communication needs."

**RC-3 — Age is not listed as a protected class in the California additions.**

California's Unruh Civil Rights Act (Civil Code Section 51) prohibits discrimination based on age (with the exception of qualifying senior housing). The rule set lists several California protected classes but omits age. This matters for Pattern 5.2 (adult community language) and Pattern 6.1 (young professionals) — both have age implications that should be explicitly named.

**Required change:** Add "Age (Unruh Civil Rights Act)" to the California protected class list at the top of the document.

**RC-4 — Veteran/Military Status is not listed and is a California protected class.**

California Government Code Section 12955 includes military and veteran status as a protected class. This is relevant to any communication about income sources, references to employment, or other screening criteria.

**Required change:** Add "Military / Veteran Status" to the California protected class list.

**RC-5 — Pattern 2.4 (Availability Misrepresentation): flagged as FLAG, should be BLOCK.**

Telling a prospective tenant a unit is unavailable when it is actually available is not an ambiguous pattern requiring human review — it is a direct Fair Housing violation when the communication occurs. The AI cannot know in real-time whether a unit is actually available, but the system design note in the pattern should be upgraded: if the system can check AppFolio availability status at send time, any "not available" email sent while a unit is actively listed must be BLOCKED, not merely flagged. The current FLAG designation understates the risk.

**Required change:** Revise Pattern 2.4 to reflect that if the system has access to availability data, a mismatch between the email content and the actual listing status must be a BLOCK, not a FLAG. If availability data is not accessible at send time, clarify that limitation in the pattern.

### Additions Recommended (Not Required for Initial Approval)

**AR-1 — Retaliation Language Pattern.**

The rule set does not include a pattern for retaliatory communications. A Fair Housing violation also occurs when a landlord retaliates against a tenant for exercising a legal right (filing a complaint, requesting an accommodation, organizing with other tenants). An email sent shortly after a tenant complaint that contains threats, lease enforcement notices, or non-renewal signals is a retaliation risk. The system should flag emails sent within 90 days of a logged tenant complaint or accommodation request, especially if the email escalates the relationship.

**AR-2 — Adverse Action / Denial Letters.**

The rule set covers active communications but does not include a pattern for denial letters or adverse action notices. Any denial of an application must reference only lawful documented criteria and follow FCRA steps if a consumer report was used. This pattern should be added before the system handles any applicant-facing communication.

**AR-3 — Assistance Animal vs. Service Animal Distinction.**

Pattern 4.4 uses the phrase "assistance animals" as an umbrella term, which is correct. However, the practical rules differ slightly between service animals (ADA, no documentation required, two permissible questions) and emotional support animals (FHA, limited documentation permissible, no breed/weight restrictions). A note distinguishing these two categories in Pattern 4.4 would reduce confusion for the humans reviewing flagged emails.

---

## 2. Playbook Reviews

---

### Playbook 1 — Late Rent Day 3

**APPROVED**

This template is clean. It does not reference late fees (correct — no fee has been assessed at Day 3 under a standard California lease), does not threaten legal action, and does not vary by tenant. The tone is appropriate for a first-contact courtesy reminder. The instruction to escalate hardship situations rather than handle via email is the right call and should be retained.

One minor note: the template uses "[Portal Link or Instructions]" as a placeholder. Whoever populates this should ensure the link is the same link sent to all tenants — using a personalized link that differs by tenant based on any demographic data would create an inconsistency record.

**No changes required.**

---

### Playbook 2 — Late Rent Day 10

**APPROVED WITH CHANGES**

The structure and tone are appropriate for a Day 10 notice — more formal, references the late fee, states the consequence of continued non-payment. The instruction to send at the same time to all tenants with outstanding balances is correct and should be retained.

**Required Changes:**

**RC-6 — "Notice to Pay or Quit" language is legally significant and the template uses it loosely.**

The Day 10 email says: "we will be required to proceed with a formal Notice to Pay or Quit as required by California law." Under California Code of Civil Procedure Section 1161, a 3-Day Notice to Pay Rent or Quit is a formal legal document with specific service requirements (personal service, substituted service, or posting and mailing) — it is not delivered by email. The Day 10 email is a courtesy email, not the legal notice itself. If the email implies that the legal notice is coming, it should make clear that the formal notice will be delivered separately in the legally required manner, and it should not be the formal notice itself.

**Required change:** Revise the consequence language to: "If we do not receive your payment by [Final Deadline Date], we will serve a formal 3-Day Notice to Pay Rent or Quit in accordance with California law. That notice will be delivered separately." Remove any implication that this email is the legal notice.

**RC-7 — The "Final Deadline Date" placeholder is legally consequential and the template gives no guidance on how to calculate it.**

Under California law, once the 3-Day Notice to Pay or Quit is served, the three-day period is calculated from the day after service, excluding weekends and court holidays. The Day 10 email's "[Final Deadline Date]" is a different deadline — the date by which the tenant must pay before the formal notice issues. This deadline is a matter of Crown Key policy, not California law, and the template should say so clearly. Whoever populates the placeholder must not use it to represent a statutory deadline it does not represent.

**Required change:** Add a note in the Usage Notes: "[Final Deadline Date] is Crown Key's internal policy deadline — it is not a statutory cure period. Do not use this date as the deadline on a formal legal notice."

---

### Playbook 3 — Lease Violation First Notice

**APPROVED WITH CHANGES**

The template structure is sound. The Violation Description Writing Guide is excellent — the distinction between what was observed vs. what was concluded is exactly right. The instruction to stop and consult Mason if the violation involves a potential accommodation request is correctly placed.

**Required Changes:**

**RC-8 — Cure period is left entirely open and this is legally critical in California.**

The template uses "[Cure Period, e.g., 3 business days / 10 days / 30 days]" without guidance on which violation types correspond to which cure periods. Under California law, some violations are curable and some are not, and the required cure period for a curable violation under CCP Section 1161 is three days (for a Notice to Perform Covenant or Quit). However, the lease may provide a longer cure period. Giving the email system an open-ended placeholder for cure period without a reference table is dangerous — the wrong cure period could invalidate a subsequent eviction filing.

**Required change:** Add a Cure Period Reference Table to the Usage Notes with at minimum: (a) California statutory minimum (3 days for curable violations under CCP 1161), (b) the instruction to check the Crown Key standard lease for any contractual cure period longer than 3 days, and (c) the instruction to consult Mason if the violation may be incurable (repeat violations, criminal activity). The template should also note whether this email constitutes the formal legal Notice to Perform or is a courtesy email preceding it — the same ambiguity flagged in RC-6 applies here.

**RC-9 — "Email constitutes valid written notice" question is explicitly flagged in the template but never answered.**

The "What Mason Needs to Check" section correctly asks whether email is sufficient for a formal lease violation notice under the lease. This is not answered in the template. The risk: if Crown Key sends an email notice and the tenant later argues they never received it, the email may not satisfy the service requirements for a legal notice under California law or the lease. Until this is answered per the Crown Key standard lease, the template should include a mandatory note that formal paper notice may also be required.

**Required change:** Add to Usage Notes: "Email notice alone may not satisfy formal service requirements under California law or the Crown Key lease. Until Crown Key's legal counsel confirms whether email service is sufficient, send a paper copy by certified mail or personal service simultaneously for any notice that may precede legal action."

---

### Playbook 4 — Move-Out Charge Dispute Response

**APPROVED WITH CHANGES**

The template is well-constructed for its purpose. The Charge Description Writing Guide correctly distinguishes normal wear and tear from damage and ties each charge to documentation. The acknowledgment of the tenant's right to file in Small Claims Court is appropriate and correctly toned.

**Required Changes:**

**RC-10 — The 21-day requirement is referenced but the template does not confirm compliance with it.**

California Civil Code Section 1950.5(g) requires a landlord to provide an itemized statement of deductions within 21 days of the tenant vacating. The template's "What Mason Needs to Check" section correctly flags this. But the template does not include a field or confirmation step verifying that the initial itemization was sent on time. If Crown Key sends a dispute response that references deductions, and the original itemization was late, that dispute response cannot cure the statutory violation — and a late itemization forfeits the right to retain any deposit under some California court interpretations.

**Required change:** Add a mandatory pre-send check to the Usage Notes: "Before sending this response, confirm that the original itemized statement was sent within 21 calendar days of the tenant's vacating date. If it was not, do not send this template — consult Susan and legal counsel before responding to the dispute."

**RC-11 — "Balance Remaining" row in the charges table requires clarification.**

The template includes a "Balance Remaining (if applicable)" row covering amounts owed by the tenant beyond the deposit. California Civil Code Section 1950.5 governs the deposit disposition, but if the damages exceed the deposit, the landlord must pursue that separately (typically Small Claims Court). The email should not present the excess balance as a demand for payment in the same letter as the deposit disposition without clarifying the process for collecting it.

**Required change:** Add a note after the charges table: "If a balance remains after the deposit is applied, this letter acknowledges the outstanding amount but does not constitute a formal demand for payment. Consult Susan on the appropriate process for pursuing excess charges." Alternatively, if Crown Key does intend this as a demand letter for the excess, consult legal counsel on the required language.

**RC-12 — Records retention period is left to Mason to confirm but Mason is not a licensed attorney.**

The Usage Notes say "Confirm retention period with Mason." Mason can flag that California has specific retention requirements, but cannot advise on the specific period. The note should reference a confirmed retention requirement or direct Susan to confirm it with her attorney.

**Required change:** Update the retention note to reflect that California regulations governing tenant files generally require retention for a minimum of three years after the tenancy ends (though this varies by record type and local ordinance). Susan should confirm the specific period with her attorney.

---

### Playbook 5 — Owner Repair Under $500

**APPROVED**

This is a clean, low-risk internal communication. No Fair Housing issues — it is owner-facing only. The tone guidance is appropriate. The note about flagging larger underlying issues is good practice.

The "What Mason Needs to Check" note about the management agreement threshold is well-placed. This review cannot verify whether Crown Key's management agreements actually use $500 as the threshold — Susan should confirm this matches the actual agreements before the template is deployed.

**No changes required.** Condition: Susan confirms the $500 threshold matches actual management agreements.

---

### Playbook 6 — Owner Repair Over $500

**APPROVED WITH CHANGES**

The template is well-structured for an approval request. The recommendation to proceed on habitability repairs regardless of owner approval is legally accurate — this is an important point that is correctly flagged.

**Required Changes:**

**RC-13 — Habitability repair urgency language is mentioned but the legal threshold is not specified.**

The template references "habitability" and California law without specifying what conditions trigger the legal obligation to repair regardless of owner approval. Under California Civil Code Section 1941, landlords must maintain rental units in habitable condition including: effective waterproofing, plumbing, heating, electrical, clean and sanitary conditions, and freedom from vermin. If any of these conditions fail, the legal obligation to repair may exist regardless of cost and regardless of owner authorization. The template should make this clearer so the AI (and the human reviewing it) knows when the habitability exception applies.

**Required change:** Add to Usage Notes: "California Civil Code Section 1941 habitability conditions include: waterproofing, plumbing, gas facilities, heating, electrical systems, clean and sanitary conditions, and working locks. If a repair falls under Section 1941, Crown Key may be required to proceed without owner approval and bill the owner. Do not delay habitability repairs to wait for the owner's email reply."

**RC-14 — "Reply with 'Approved — Option A or B'" authorization language creates a documentation gap.**

Obtaining owner authorization by email reply is standard practice, but the template should require the authorization to be saved and referenced. If the owner later claims they never approved a repair and refuses to pay, an email reply saying "Approved — Option B" is the key evidence. The template should instruct the sender to save this reply immediately upon receipt.

**Required change:** Add to Usage Notes: "Save the owner's reply authorizing the work immediately upon receipt. File it in the property management system under the property record before scheduling the vendor. Do not proceed based on a verbal or phone authorization — require the email reply."

---

### Playbook 7 — Owner Tenant Complaint Notification

**APPROVED WITH CHANGES**

The template is sound in structure. The Complaint Description Writing Guide correctly instructs neutrality and prohibits protected class references. The instruction to stop and consult Mason for Fair Housing-related complaints is appropriately placed.

**Required Changes:**

**RC-15 — The template shares tenant identifying information with the owner without specifying what is and is not appropriate to share.**

The "What Mason Needs to Check" section correctly raises the tenant privacy concern. In general, a property owner has the right to know about issues at their property. However, certain tenant information should not be shared with an owner: the tenant's protected class status, disability information, accommodation requests, and the identity of a complaining tenant if sharing it could enable retaliation. The template currently has no guardrails on what tenant information flows to the owner.

**Required change:** Add to the Complaint Description Writing Guide: "Do not share with the owner: the tenant's disability status, accommodation requests, protected class characteristics, or the name of a tenant who complained about another tenant if retaliation is a risk. Describe the complaint by unit identifier, not by tenant name, when the complaint involves a neighbor dispute."

**RC-16 — "Investment-relevant context on the tenant" instruction needs a fair housing guardrail.**

The template instructs the sender to add investment context like "This tenant has been reliable and is in their third year." This is appropriate. But it also opens the door to characterizations like "This tenant has had a lot of issues" or worse — characterizations that could reference behavior correlated with protected class. The Writing Guide should explicitly rule out demographic or protected-class-adjacent characterizations.

**Required change:** Add to Tone Notes: "The 'What You Should Know' section must never reference the tenant's national origin, religion, disability, family composition, or any other protected characteristic — even obliquely. Characterizations like 'very particular about cleanliness' or 'very social' can carry implied protected-class meaning and should be avoided. Stick to documented facts: payment history, lease compliance history, tenure."

---

### Playbook 8 — Owner Bad Tenant Pattern

**APPROVED WITH CHANGES — ATTORNEY REFERRAL FLAGGED**

This is the highest legal-risk template in the set because it directly leads toward non-renewal or eviction decisions. The Issue Description Writing Guide is strong. The instruction to stop if a recent accommodation request or habitability complaint exists is critical and correctly placed.

**Required Changes:**

**RC-17 — AB 1482 Just Cause language is flagged in the template but not resolved.**

The template correctly flags that AB 1482 (the Tenant Protection Act) may apply and instructs the sender to confirm with Mason. This review flags the issue but cannot resolve it per property — it requires confirmation per property based on year built, property type, and whether the owner is exempt (e.g., single-family home with the appropriate notice given, small landlord exemption). An email system that presents "non-renewal" as an option without first confirming AB 1482 applicability could cause Crown Key to issue a non-renewal that is illegal under just-cause protections.

**Required change:** The Email Guardian must not populate the "non-renewal" option in this template until AB 1482 applicability has been confirmed for the specific property. Add a mandatory pre-send flag: "Confirm AB 1482 applicability for this property before presenting non-renewal as an option. Properties covered by AB 1482 require just cause for non-renewal after 12 months of tenancy. Consult legal counsel."

**RC-18 — Retaliation timing check is flagged but not operationalized.**

The template correctly flags that if the tenant recently filed a habitability or Fair Housing complaint, this email could be read as retaliatory. However, the template provides no threshold or definition of "recent." Retaliation claims in California are particularly serious — Civil Code Section 1942.5 presumes retaliation if a landlord takes adverse action within 180 days of a tenant exercising a legal right.

**Required change:** Add to Usage Notes: "Under California Civil Code Section 1942.5, there is a presumption of retaliation if non-renewal or other adverse action is taken within 180 days of a tenant filing a habitability complaint, requesting repairs, contacting a government agency, or exercising other legal rights. If any such event occurred in the past 180 days, do not send this email without consulting legal counsel."

**ATTORNEY REFERRAL — RC-17 and RC-18 together:** Because this template leads directly to non-renewal and eviction decisions, and because California's AB 1482 and anti-retaliation rules are fact-specific and property-specific, Susan should have her attorney review the legal options language in this template and confirm AB 1482 applicability for each property in the portfolio before the system is permitted to auto-populate or send this playbook.

---

### Playbook 9 — Lease Renewal Offer

**APPROVED WITH CHANGES**

The rent increase compliance note built into this template is excellent — the instruction to check AB 1482 and local rent control before populating the rent figure shows appropriate awareness of California law. The template itself is clean and Fair Housing-compliant.

**Required Changes:**

**RC-19 — AB 1482 rent cap calculation note is present but the current cap formula needs to be verified against current CPI.**

The template states that AB 1482 "caps increases at 5% + CPI or 10%, whichever is lower." This is the correct statutory formula. However, the actual allowable increase changes annually based on the regional CPI index. The Email Guardian system must use the current year's confirmed CPI figure — not a hardcoded percentage — when checking proposed rent increases.

**Required change:** Add to the Rent Increase Compliance Note: "The CPI component of the AB 1482 cap changes annually. The system must pull the current confirmed CPI figure for the applicable California region (Bay Area or Inland Empire, depending on the property location) from a verified source before calculating the allowable cap. Do not hardcode a CPI percentage."

**RC-20 — Local rent control ordinance list is not confirmed.**

The template correctly asks Mason to confirm which of Crown Key's markets have local rent control. This review cannot substitute for a current municipal code check, but flagging it is correct: Tracy, Livermore, and other San Joaquin Valley cities have not historically had local rent control beyond AB 1482, but this should be confirmed with current legal counsel before the system goes live. Some cities have adopted or proposed ordinances in the last two years.

**Required change:** Susan should have her attorney confirm the current rent control status for each city in the portfolio before this template is deployed: Tracy, Mountain House, Lathrop, Manteca, Ripon, River Islands (unincorporated San Joaquin County), Tracy Hills, and Livermore. This confirmation should be documented and revisited annually.

**RC-21 — The response deadline notice period may have legal requirements not addressed in the template.**

The template says to send 60 days before lease expiration and get a response by 30 days before. For rent increases above 10%, California law requires 90 days notice. If any renewal offer includes a rent increase of 10% or more (or any amount in a rent-controlled jurisdiction that requires longer notice), the timeline in this template may be insufficient.

**Required change:** Add to Usage Notes: "If the proposed rent increase is 10% or more above the rent paid at any time in the prior 12 months, California law requires 90 days written notice rather than 30 or 60 days. The system must check the notice period requirement before scheduling this email."

---

### Playbook 10 — Vendor Work Order

**APPROVED**

This template is vendor-facing only. No Fair Housing issues apply to vendor communications (vendors are not applicants or tenants, and Fair Housing law covers tenant and applicant communications). The work description writing guide is clear and practical.

One legal note of general awareness: the tenant's name and contact information appear in the work order. Crown Key should confirm with its attorney whether sharing tenant contact information with vendors is addressed in the Crown Key lease and management agreement, and whether any notice to the tenant is required before their information is shared with a third party under California privacy law (CCPA). This is not a blocking issue for this review but is worth confirming.

**No changes required.** Advisory: confirm tenant data sharing with vendors is addressed in the lease and management agreement.

---

## 3. California-Specific Flags — Cross-Document

The following issues apply across multiple documents and should be addressed as system-level requirements, not just per-template fixes.

**CF-1 — Email as Service of Notice: No document resolves this.**

Multiple templates (Day 10, Lease Violation) involve notices that may need to satisfy California's service requirements for formal legal notices. California law (CCP 1162) specifies valid service methods: personal service, substituted service, or posting and mailing by certified mail. Email is not a recognized method of service under CCP 1162. Until Crown Key's lease explicitly authorizes email as a valid service method and counsel confirms it, every notice that may precede legal action must also be served by a legally recognized method. The Email Guardian system should not be positioned as the sole delivery mechanism for legally significant notices.

**CF-2 — AB 1482 (Tenant Protection Act) — Property-Level Applicability Must Be Documented.**

AB 1482 applies to most California multifamily properties built before 2005 and to single-family homes where the owner has not served the required AB 1482 exemption notice. Crown Key manages 200 units across multiple cities. The system must know, per property, whether AB 1482 applies before any playbook involving rent increases or non-renewals is executed. This is not a template-level fix — it is a data requirement. Neo should build a per-property AB 1482 status field before the renewal and bad-tenant templates go live.

**CF-3 — CCPA Considerations for Tenant Data in Automated Communications.**

The Email Guardian is an AI-assisted system that will process tenant names, contact information, and payment data to generate emails. California's CCPA (now CPRA) applies to businesses handling California residents' personal information. Crown Key's privacy notice and data handling practices should be reviewed to confirm that automated processing of tenant data for communications is disclosed and compliant. This is not a blocking legal issue for the email content itself but should be confirmed with legal counsel before the system is activated.

**CF-4 — Livermore is in Alameda County: Confirm Local Protections.**

Livermore is in Alameda County. Alameda County and some of its cities have adopted additional tenant protections beyond state law. Susan should confirm with her attorney whether any of the Livermore properties are covered by Livermore municipal ordinances or Alameda County tenant protection rules beyond AB 1482.

**CF-5 — Late Fee Compliance: California Has No Statutory Late Fee Cap, But Reasonableness Is Required.**

No template specifies the late fee amount or confirms it is reasonable. California does not set a statutory cap on late fees, but courts have voided excessive late fees as unenforceable penalties (as opposed to valid liquidated damages). The fee amount in the templates is left as a placeholder. Crown Key's legal counsel should confirm that the late fee in the standard lease form is defensible as a reasonable estimate of damages, not a penalty.

---

## 4. Overall Clearance

**NO — Changes Required Before Build Proceeds**

The following items must be resolved before the Email Guardian system is built and deployed:

**Blocking (cannot go live without these):**

1. RC-1: Fix the incorrect 10-unit threshold for source-of-income protection in the Fair Housing Rules.
2. RC-6: Revise Day 10 template to clarify that the email is not the formal 3-Day Notice to Pay or Quit, and that formal notice will be served separately in the legally required manner.
3. RC-8: Add a Cure Period Reference Table to the lease violation template.
4. RC-9: Add a mandatory instruction that paper notice must also be served simultaneously with any email notice that may precede legal action, until the lease is confirmed to authorize email service.
5. RC-17: The Email Guardian must not populate the non-renewal option in the bad-tenant template until AB 1482 applicability is confirmed per property. This requires a property-level data field (Neo) before the template can be activated.
6. CF-1: Establish and document a policy on email as notice vs. legal service of process before any legally significant notice template is deployed.
7. CF-2: Build per-property AB 1482 status into the system data before renewal and non-renewal templates go live.

**Required Before Full Production (not blocking for initial development but must be resolved before tenant-facing emails send):**

8. RC-3: Add Age to the California protected class list.
9. RC-4: Add Military/Veteran Status to the California protected class list.
10. RC-5: Upgrade Pattern 2.4 (availability misrepresentation) from FLAG to BLOCK when availability data is accessible.
11. RC-10: Add pre-send 21-day check to the move-out dispute template.
12. RC-13: Add Section 1941 habitability conditions list to the over-$500 repair template.
13. RC-18: Add the 180-day anti-retaliation presumption to the bad-tenant template.
14. RC-19: Confirm the system uses current-year CPI for AB 1482 rent cap calculation, not a hardcoded figure.
15. RC-20: Confirm local rent control status per city with legal counsel before lease renewal template deploys.
16. RC-21: Add 90-day notice requirement trigger for rent increases of 10%+.

**Attorney Referral Required:**

The following items cannot be resolved by Mason's review alone. They require confirmation from a licensed California attorney before the system goes live:

- RC-17 / RC-18 and the overall bad-tenant template: AB 1482 just cause applicability per property, and retaliation risk analysis.
- CF-1: Whether Crown Key's current lease form authorizes email as valid service of notice.
- CF-2: AB 1482 status for each property in the portfolio.
- CF-4: Livermore / Alameda County local tenant protection ordinances.
- RC-20: Local rent control status for all cities in the portfolio.
- RC-12: Confirmed records retention period for closed tenant files.
- CF-3: CCPA compliance review for automated tenant data processing.

---

*Mason Legal Review — CrownKey Email Guardian v1.0*
*Not legal advice. Consult a licensed California attorney before deploying any tenant-facing communications system.*
*Document prepared: 2026-06-26*
