# Fair Housing Violation Detection Rules
## CrownKey Email Guardian — Rule Set v1.0

**Document Purpose:** This file defines the patterns the Email Guardian AI will scan for in every outgoing email. It is written for review by Mason (legal) before the system goes live. Nothing in this document constitutes legal advice — it is a detection framework based on established Fair Housing law.

**Protected Classes (Federal):** Race, Color, National Origin, Religion, Sex, Familial Status, Disability
**Protected Classes (California — additional):** Source of Income, Marital Status, Sexual Orientation, Gender Identity/Expression, Citizenship/Immigration Status, Age, Military/Veteran Status, Arbitrary Characteristics (in some contexts)

**How to Read This Document:** Each pattern includes (a) what the AI looks for, (b) an example of the problem language, (c) why it creates legal risk, and (d) a suggested replacement where one exists. A "FLAG" means the AI holds the email for human review before sending. A "BLOCK" means the AI will not allow the email to send without manual override.

---

## Section 1: Explicit Protected Class References

These patterns involve directly mentioning a protected class in a way that treats people differently or signals a preference.

---

**Pattern 1.1 — Race or Color References**
- Description: Any language that references a person's race, skin color, or racial background in the context of housing eligibility, neighborhood description, or tenant suitability.
- Problematic example: "This neighborhood is predominantly one ethnic group, so you'd fit right in." / "We've found that tenants from [country] tend to take care of the property."
- Risk: Direct Fair Housing violation. Race and color are protected under federal law. Any statement that references racial composition as a positive or negative factor is a textbook violation.
- Replacement: Remove entirely. Neighborhood characteristics should be described in objective, non-demographic terms (proximity to parks, walkability score, distance to transit).
- Action: BLOCK

---

**Pattern 1.2 — National Origin References**
- Description: References to a person's country of birth, ancestry, native language as a qualification or disqualification, or describing a neighborhood by the national origin of its residents.
- Problematic example: "Most of our tenants here speak English, so communication is easy." / "Are you a U.S. citizen? We prefer citizens." / "This area is popular with [nationality] families."
- Risk: National origin is a federally protected class. Preferring or discouraging applicants based on country of birth or citizenship is a violation. Note: landlords may ask about ability to pay — they may NOT ask about immigration status.
- **Primary language rule (RC-2):** Do not condition tenancy, screening, or any communication of availability on English proficiency. Requiring that tenants speak English, or stating a preference for English speakers, is a proxy for national origin discrimination under California FEHA. Crown Key must offer translation or plain-language communication rather than screening by language ability.
- Replacement: Remove national origin references entirely. If language is a practical concern for maintenance communication, the solution is translation services, not screening by language.
- Action: BLOCK

---

**Pattern 1.3 — Religion References**
- Description: References to a person's religion, religious practices, faith community, or house of worship in the context of whether they would be a good tenant or fit the community.
- Problematic example: "We have a lot of Christian families here, so it's a quiet Sunday crowd." / "Do you observe any religious holidays that would affect your ability to pay rent on time?"
- Risk: Religion is a federally protected class. Describing a community's religious character as a selling point implies preference and may constitute steering.
- Replacement: Remove religion references. Community description should focus on objective facts — noise levels, parking availability, pet policies.
- Action: BLOCK

---

**Pattern 1.4 — Sex and Gender References**
- Description: References to a person's sex, gender, or gender expression as relevant to tenancy. Also includes sexual harassment in any form.
- Problematic example: "We prefer female tenants for this building — it's safer." / "Single women love this neighborhood." / Any comment on physical appearance.
- Risk: Sex is a federally protected class. California also protects gender identity and gender expression. Any preference stated by sex creates liability.
- Replacement: Remove sex/gender references entirely. Safety features of a building should be described objectively (security cameras, gated entry, deadbolt locks).
- Action: BLOCK

---

**Pattern 1.5 — Familial Status References (Explicit)**
- Description: Direct statements about whether an applicant has children, is pregnant, or has custody of a minor — as a factor in the rental decision or communication.
- Problematic example: "We don't allow children in this unit." / "Are you expecting any children joining you?" / "This building is better suited for adults."
- Risk: Familial status (having children under 18, being pregnant, having legal custody of a minor) is a federally protected class. Refusing to rent to families with children is illegal except in qualifying senior housing.
- Replacement: State occupancy standards factually (e.g., "This unit meets California occupancy standards for up to X occupants") without referencing children specifically.
- Action: BLOCK

---

**Pattern 1.6 — Disability References (Explicit)**
- Description: Language that references a person's disability, medical condition, or need for accommodation as a negative factor, or that makes assumptions about a person's ability to live independently.
- Problematic example: "We're not sure someone with your condition would be able to manage the stairs." / "We've had issues with tenants who need special accommodations." / "This building isn't really set up for people with disabilities."
- Risk: Disability is a federally protected class. Landlords must provide reasonable accommodations unless doing so causes undue hardship. Discouraging applicants based on disability is a violation.
- Replacement: Never reference disability as a factor. If accessibility features are relevant, describe them factually ("Unit is on the ground floor, no stairs required") without implying that disability is a screening criterion.
- Action: BLOCK

---

**Pattern 1.7 — Source of Income References (California)**
- Description: References to Section 8 vouchers, housing assistance, or government benefits as disqualifying factors.
- Problematic example: "We don't accept Section 8." / "This property is not enrolled in the housing voucher program." / "We require all income to be from employment."
- Risk: California prohibits discrimination based on source of income for ALL residential rentals — there is no minimum unit threshold. This applies to every property in the Crown Key portfolio regardless of size.
- Replacement: Do not reference source of income in eligibility communications. Income qualification should reference total verifiable income meeting a ratio (e.g., 2.5x monthly rent) regardless of source.
- Action: BLOCK

---

## Section 2: Steering Language

Steering means directing a person toward or away from a property or neighborhood based on their protected class — even without explicitly mentioning the class. It is illegal even when the person is not told why they are being steered.

---

**Pattern 2.1 — Demographic Neighborhood Descriptions**
- Description: Describing a neighborhood's racial, ethnic, religious, or national origin composition as a selling or discouraging point.
- Problematic example: "This is a very diverse neighborhood with lots of international families." / "It's a quiet, traditional community." / "You might prefer our other property — it has more of a multicultural feel."
- Risk: Even positive-sounding demographic descriptions constitute steering if they are being used (consciously or not) to match tenants to neighborhoods by protected class.
- Replacement: Describe neighborhoods by objective, non-demographic characteristics: walkability, proximity to services, traffic noise level, school ratings (see Pattern 2.2 for school district caveats).
- Action: FLAG for review

---

**Pattern 2.2 — School District References as Demographic Proxies**
- Description: Using school district quality or school names in ways that correlate with neighborhood racial or socioeconomic demographics.
- Problematic example: "This property is in the [District] school zone — families really love it here." / "The schools here are excellent if that's important to you."
- Risk: School district references have been used as proxies for neighborhood demographics in steering cases. They are not automatically illegal, but require care. In emails to applicants, they should not be volunteered by staff.
- Replacement: If a tenant asks about schools, provide objective information without comparison to other areas. Do not volunteer school district information as a selling point.
- Action: FLAG for review

---

**Pattern 2.3 — Suggesting Alternative Properties by Implied Match**
- Description: Suggesting a different property to an applicant in ways that imply the alternative is a "better fit" based on protected class signals.
- Problematic example: "You might be more comfortable at our [other location] — it's a bit more [adjective]." / "We have another property that might suit your lifestyle better."
- Risk: Steering is often subtle. Recommending alternatives without a clear, documented, non-protected-class reason (e.g., specific unit features the applicant asked for) creates exposure.
- Replacement: Only recommend alternatives based on stated applicant preferences (price range, unit size, pet policy, parking). Document the reason. Never recommend alternatives based on neighborhood demographics.
- Action: FLAG for review

---

**Pattern 2.4 — Availability Misrepresentation**
- Description: Telling one applicant a unit is unavailable while it remains available to others.
- Problematic example: Telling an applicant "that unit just rented" in an email while continuing to show it to other applicants.
- Risk: If availability is communicated differently based on protected class, this is a direct Fair Housing violation and a frequent source of testers/complaints. Fair Housing organizations routinely use "testers" — paired applicants sent to the same property — specifically to catch this.
- Replacement: Availability communications must be consistent and timestamped. Never send "not available" language to any applicant for a unit that is still being marketed.
- Action:
  - **BLOCK** — if the unit is actively listed and being marketed (clearly available)
  - **SOFT BLOCK (Tier 2)** — if the unit is in pending status (application under review, holding period, or status uncertain). The system will pause the email and ask the sender to confirm: "Is this unit's availability confirmed? If it is pending an application decision, make sure this communication is accurate before sending." Sender must confirm before the email can proceed.

---

## Section 3: Inconsistent Application Language

These patterns do not involve protected classes explicitly but create risk when different tenants receive materially different information about the same rules, fees, or standards.

---

**Pattern 3.1 — Variable Late Fee Communication**
- Description: Different tenants receiving different information about late fees, grace periods, or payment policies.
- Problematic example: Tenant A receives an email saying "there is a $50 late fee after the 5th." Tenant B receives an email saying "we'll waive the fee this time since you've been such a great tenant."
- Risk: If the tenants who receive fee waivers or different terms happen to share a protected class, this creates a pattern of disparate treatment — even if that was not the intent.
- Replacement: Fee policies should be communicated consistently using templated language. Exceptions (waivers, payment plans) should be documented with a non-protected-class reason and approved by the manager.
- Action: FLAG for review

---

**Pattern 3.2 — Variable Qualification Standards**
- Description: Communicating different income, credit, or rental history requirements to different applicants.
- Problematic example: Telling Applicant A "we require 3x monthly rent in income" and Applicant B "we require 2.5x monthly rent."
- Risk: Inconsistent qualification standards are a primary indicator of discriminatory screening. Even unintentional variation creates Fair Housing exposure.
- Replacement: Qualification criteria should be standardized, written, and applied uniformly. The Email Guardian should flag any email that states qualification criteria that differ from the posted policy.
- Action: FLAG for review

---

**Pattern 3.3 — Selective Rule Enforcement Language**
- Description: Communicating enforcement of lease rules to some tenants but not others — particularly rules about noise, guests, pets, or common areas.
- Problematic example: One tenant receives a formal lease violation notice about noise; another receives a friendly reminder for the same behavior.
- Risk: Selective enforcement is a Fair Housing violation if the selection correlates with a protected class.
- Replacement: Use standardized notice templates for all lease violations regardless of tenant relationship. Friendly reminders should be the same email for all tenants at the same stage.
- Action: FLAG for review

---

**Pattern 3.4 — Disparate Maintenance Response Language**
- Description: Different tones, timelines, or levels of urgency communicated to different tenants about maintenance requests.
- Problematic example: One tenant receives a same-day response with a scheduled repair; another receives a vague "we'll get to it" reply for a similar issue.
- Risk: Disparate maintenance service quality and communication is a recognized Fair Housing complaint pattern.
- Replacement: All maintenance acknowledgment emails should use a standard template with the same SLA language and timeline commitments.
- Action: FLAG for review

---

## Section 4: Disability Accommodation Language

Reasonable accommodation requests are legally sensitive. Mishandling them in writing is one of the highest-risk areas in property management email.

---

**Pattern 4.1 — Denial Without Engaging the Interactive Process**
- Description: Any email that denies or dismisses an accommodation or modification request without first engaging in a documented interactive process.
- Problematic example: "We're sorry, but our policy does not allow pets." (in response to an emotional support animal request) / "We can't make structural changes to the property."
- Risk: Outright denial of an accommodation request — especially for assistance animals — without going through the interactive process (asking for verification, evaluating the request) is a textbook Fair Housing violation.
- Replacement: Any response to a potential accommodation request must acknowledge the request, indicate the company will review it, and ask only for legally permissible documentation. It should never be a flat denial in the first response.
- Action: BLOCK — must be reviewed before sending

---

**Pattern 4.2 — Demanding Excessive Medical Documentation**
- Description: Asking for more medical information than the law allows when evaluating a disability accommodation or assistance animal request.
- Problematic example: "We need a letter from your psychiatrist explaining your diagnosis and how the animal treats it." / "Please provide your medical records confirming your disability."
- Risk: HUD guidance prohibits landlords from asking for a diagnosis, medical records, or details about the nature of a disability. Permissible documentation only confirms (a) the person has a disability and (b) the animal or accommodation provides disability-related assistance.
- Replacement: "Please provide documentation from a healthcare provider, therapist, or other professional confirming that you have a disability-related need for [the requested accommodation]."
- Action: FLAG — review documentation request language

---

**Pattern 4.3 — Characterizing Accommodation Requests as Special Treatment**
- Description: Language that frames an accommodation request as an exception, favor, or inconvenience rather than a legal right.
- Problematic example: "We'll make an exception for you this time." / "This is outside our normal policy, but we'll try to accommodate you." / "Other tenants don't get this."
- Risk: Accommodations are not exceptions — they are legal rights under the Fair Housing Act. Language that frames them as exceptions undermines the company's legal compliance posture.
- Replacement: "We are happy to discuss a reasonable accommodation to ensure you can enjoy your home. Here are the next steps..."
- Action: FLAG for review

---

**Pattern 4.4 — Improper Assistance Animal Screening Language**
- Description: Applying pet policies (fees, breed restrictions, weight limits) to assistance animals, or denying them based on breed or size.
- Problematic example: "Our no-pets policy applies to all animals, including emotional support animals." / "We cannot accept your ESA because it is a pit bull, which is a restricted breed." / "There is a $500 pet deposit for emotional support animals."
- Risk: Assistance animals (both service animals and emotional support animals) are not "pets" under Fair Housing law. Pet fees, breed restrictions, and weight limits cannot be applied to them. Doing so in writing creates significant liability.
- Replacement: "Our pet policies do not apply to assistance animals. If you are requesting an accommodation for an assistance animal, please let us know and we will provide you with our accommodation request process."
- Action: BLOCK

---

**Pattern 4.5 — Lease Modification Refusal for Accessibility**
- Description: Refusing to allow a tenant with a disability to make accessibility modifications to their unit.
- Problematic example: "Our lease prohibits any alterations to the unit, and we cannot make exceptions." (in response to a request to install grab bars or a ramp)
- Risk: Tenants with disabilities have the right to make reasonable accessibility modifications at their own expense under the Fair Housing Act, subject to restoration requirements. A blanket refusal is a violation.
- Replacement: "We'd be happy to discuss your modification request. Tenants with disabilities have the right to make reasonable modifications under the Fair Housing Act. Please submit your request in writing so we can evaluate it."
- Action: BLOCK

---

## Section 5: Familial Status Patterns

Familial status (having children under 18 in the household) is a protected class. Most violations in this category are subtle.

---

**Pattern 5.1 — Occupancy Standards Used as Child Exclusion**
- Description: Citing occupancy limits in ways that appear designed to exclude families with children rather than reflect genuine safety or habitability concerns.
- Problematic example: "We limit each bedroom to one adult occupant." / "This is a studio unit and is not suitable for families."
- Risk: Occupancy policies must be based on objective factors (square footage, habitability, local codes) not on discouraging children. California follows a general standard of 2 persons per bedroom plus one additional occupant.
- Replacement: "This unit accommodates up to [X] occupants per California occupancy guidelines." Remove any reference to children, adults, or family composition.
- Action: FLAG for review

---

**Pattern 5.2 — References to "Adult Community" or "Quiet Community"**
- Description: Describing a property as adult-oriented, child-free, or particularly quiet in ways that signal children are not welcome.
- Problematic example: "This is a peaceful, adult community." / "Our tenants are mostly professionals and retirees — it's very quiet." / "This property is ideal for singles or couples."
- Risk: Only qualifying senior housing communities (55+ or 62+) may lawfully limit residency to adults. Describing a non-qualifying property as adult-oriented is a Fair Housing violation.
- Replacement: Describe the property's actual physical characteristics — sound insulation, unit type, available amenities — without referencing tenant demographics.
- Action: FLAG for review

---

**Pattern 5.3 — Questions About Family Composition**
- Description: Asking applicants or tenants about the number of children, ages of children, or expected changes to family size.
- Problematic example: "How many children will be living in the unit?" / "Are you planning to have children?" / "Will any minors be residing with you?"
- Risk: Asking about family composition is permissible only to determine occupancy count (total number of occupants). Asking specifically about children, their ages, or future pregnancies goes beyond what is permissible.
- Replacement: "How many people in total will be residing in the unit?"
- Action: FLAG for review

---

**Pattern 5.4 — Rules Targeting Children**
- Description: House rules or lease terms communicated via email that specifically restrict children's activities or presence.
- Problematic example: "Children are not permitted in the pool without adult supervision at all times." (potentially acceptable if safety-based) vs. "Children are not permitted in common areas after 6 PM." (likely not acceptable)
- Risk: Rules that specifically restrict children's access to common areas or amenities — beyond what applies equally to all residents — may violate familial status protections.
- Replacement: Rules should apply to all tenants and guests regardless of age ("All residents and guests must leave the pool area by 10 PM"). Rules singling out children should be flagged for Mason review.
- Action: FLAG for Mason review

---

## Section 6: Advertising and Marketing Language

Marketing emails about available units carry the same Fair Housing obligations as any other tenant communication.

---

**Pattern 6.1 — Preference or Limitation Statements**
- Description: Language in marketing emails that states or implies a preference for certain types of tenants.
- Problematic example: "Perfect for young professionals." / "Great for couples." / "Ideal for someone looking for a quiet, like-minded community."
- Risk: The Fair Housing Act prohibits any statement of preference, limitation, or discrimination based on a protected class. "Young professionals" implies age and potentially national origin or familial status. "Like-minded" can be a proxy for racial or religious preference.
- Replacement: Describe the unit's physical features, price, and included amenities. Let applicants self-select based on their needs.
- Action: FLAG for review

---

**Pattern 6.2 — Human Model Descriptions**
- Description: Describing the "type of person" who would love this unit.
- Problematic example: "This unit is perfect for a working couple or single professional." / "We think you'll love it here — it's a great fit for your stage of life."
- Risk: Describing the ideal tenant in demographic terms — even flattering ones — implies a preference. "Stage of life" is a proxy for familial status and age.
- Replacement: "This unit includes [features]. It is available [date] at [rent]."
- Action: FLAG for review

---

**Pattern 6.3 — Amenity Descriptions That Imply Exclusion**
- Description: Emphasizing amenities in ways that signal only certain groups are welcome.
- Problematic example: "Our community features a wine lounge and rooftop terrace — perfect for our adult residents." / "Our prayer room and community garden are available to all tenants."
- Risk: Emphasizing religion-specific amenities signals a religious preference. Emphasizing adult amenities while advertising units signals familial status discrimination.
- Replacement: List amenities factually without implying who they are "for."
- Action: FLAG for review

---

## Section 7: Green-Light Phrases

These are patterns the system should recognize as explicitly compliant and low-risk. When these phrases appear, the AI should note them positively in its review.

---

**Pattern 7.1 — Standardized Qualification Language (Safe)**
- Example: "Our application requirements include verifiable income of [X] times monthly rent, a credit check, and a rental history review. These requirements apply equally to all applicants."
- Why it's safe: Uniform, documented, non-class-based qualification criteria applied consistently.

---

**Pattern 7.2 — Accommodation Request Acknowledgment (Safe)**
- Example: "Thank you for your accommodation request. We will review it in accordance with the Fair Housing Act and respond within [X] business days. If you have questions, please contact our office at [contact]."
- Why it's safe: Acknowledges the request, commits to a process, sets a timeline, provides a contact.

---

**Pattern 7.3 — Occupancy Statement (Safe)**
- Example: "This unit accommodates up to [X] occupants in accordance with California occupancy guidelines."
- Why it's safe: Objective, non-discriminatory occupancy statement based on legal standards, not tenant characteristics.

---

**Pattern 7.4 — Assistance Animal Statement (Safe)**
- Example: "Crown Key Realty complies with all Fair Housing laws regarding assistance animals. Our pet policies do not apply to assistance animals. To request an accommodation for an assistance animal, please complete our accommodation request form."
- Why it's safe: Correctly distinguishes assistance animals from pets, points to a documented process.

---

**Pattern 7.5 — Maintenance Acknowledgment (Safe)**
- Example: "We have received your maintenance request and will contact you within [X] business days to schedule a time. If this is an emergency, please call [number] immediately."
- Why it's safe: Consistent, documented response that creates an equal-service record.

---

**Pattern 7.6 — Late Rent Notice Using Standardized Template (Safe)**
- Example: "According to our records, your rent payment of $[amount], due on [date], has not yet been received. Per your lease agreement, a late fee of $[amount] was assessed on [date]. Please remit payment immediately to avoid further action."
- Why it's safe: Factual, references lease terms, no language that varies by tenant, no protected class references.

---

**Pattern 7.7 — Move-Out Instructions (Safe)**
- Example: "Your lease concludes on [date]. Attached are the move-out instructions that apply to all Crown Key Realty residents. Please review them carefully. A pre-move-out inspection may be scheduled by contacting [contact]."
- Why it's safe: Applies the same process to all tenants; references a standardized document.

---

*Last updated: 2026-06-26*
*Prepared by: Oracle (Research & Spec)*
*Pending review by: Mason (Legal)*
*Status: DRAFT — not approved for production use*
