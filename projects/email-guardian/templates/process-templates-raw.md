# LeadSimple Process Email Templates — Raw Capture
**Extracted:** June 26, 2026
**Status:** In progress — capturing all process email templates for review

---

## PROCESS: T 01 BSG Delinquency 2point0 (Active — 734+ sends)

### Day 3: (Tenant) Payment Due Reminder
**Subject:** Reminder - Rental Payment Past Due
**Sends:** 734 | **Open rate:** 88%

```
Dear {{tenant.all.first_name}},

This is a reminder that your rent for this month was due on the 1st. Your current delinquent rent is: {{unit.delinquent_rent | default}}.

Please log into your tenant portal to make your payment as soon as possible to avoid late fees. If you have already remitted payment, please ignore this email.

Thank you!
{{our_company_name}}
```

**Issues:** No warmth. "Thank you!" is abrupt as a closing. "As soon as possible" vague — no deadline. No empathy for why someone might be late. Signed with company name, not a person.

---

### Day 5: (Tenant) Late Charges Incurred
**Subject:** (not captured — need to check)
**Sends:** 207 | **Open rate:** 100%

```
Dear {{tenant.all.first_name}},

Late fees of $150 have been applied per your lease agreement. Your delinquent rent balance is {{unit.delinquent_rent | default}}. Please log in to your tenant portal to view your total balance.

Please pay your balance or contact us to avoid risking an eviction.

Sincerely,
{{our_company_name | default}}
```

**Issues:** "risking an eviction" on Day 5 is aggressive — legally notice hasn't gone out yet. No empathy. No offer to help/discuss. Jumps straight to threat.

---

### Day 9 (Owner): Pay or Quit Going Out Soon
**Subject:** (not captured)
**Sends:** 18 | **Open rate:** 106%

```
Dear {{owner.first_name | default}},

I hope this message finds you well.

We wanted to inform you that the tenant at your property located at {{property.address | default}} is currently late on their rent payment, with an outstanding balance of {{unit.amount_receivable | default}}. Not to worry - we're working with the tenant to get the payment completed as soon as possible.

No action is required from you at this time, but we believe in keeping you fully informed. Please be aware that, due to the late rent, there may be a delay in your payout this month. We are actively following up with the tenant and will keep you updated with any new developments.

We will update you as soon as payment is made. Please keep in mind we will pay you as soon as payment clears the bank.

Thank you for entrusting us with the management of your property. We appreciate the opportunity to serve you.

Sincerely,
{{our_company_name | default}}
```

**Issues:** "Not to worry" is slightly casual. Good overall tone — proactive, reassuring. Missing: what happens next if tenant doesn't pay. Could mention that a pay-or-quit notice is going out.

---

### Day 9: (Tenant) Email of Pay or Quit — ADD ATTACHMENT
**Subject:** (not captured)
**Sends:** 21 | **Open rate:** 86%

```
Dear {{tenant.all.first_name | default}},

We regret to inform you that due to your unpaid balance of {{unit.amount_receivable | default}}, we will be posting a pay or quit notice tomorrow and you are at risk of being evicted from the property.

Please pay your balance or contact us immediately to avoid eviction proceedings.

Sincerely,
{{our_company_name | default}}
```

**Issues:** Very abrupt for a high-stakes notice. "We regret to inform you" is cold. No empathy. No resources offered. No phone number or personal contact offered. Note says "(ADD ATTACHMENT)" — this is a manual reminder in the template name, which is risky (someone might forget).

**Fair Housing flag:** None identified in the body text. However, the process should ensure this goes out consistently regardless of tenant characteristics — handled at process level.

---

### (Owner) Eviction Recommended
**Subject:** (not captured)
**Sends:** 0

```
Dear {{owner.first_name | default}},

I hope this message finds you well.

I am writing to inform you of a situation regarding your property at {{property.address | default}}. Unfortunately, the tenant still has an outstanding balance of {{unit.amount_receivable | default}} and has been unresponsive to our attempts at communication.

We have taken the necessary step of posting a 3-day pay or quit notice, which has since expired without any response or payment from the tenant.

Given the lack of response and the ongoing delinquency, we recommend proceeding with the eviction process. As stipulated in your Property Management Agreement, you will be responsible for the costs associated with this eviction. Please be assured that our actions are always taken with your best interest in mind, with the primary goal of removing the non-paying tenant so that the property can return to a profitable state.

Unless we hear otherwise from you by {{process.owner_must_respond_by | default}}, we will move forward with the eviction process. If you have any questions or concerns, please do not hesitate to contact me directly.

Thank you for your attention to this matter, and for your continued trust in our management of your property.

Sincerely,
{{our_company_name | default}}
```

**Issues:** Good structure and content. "removing the non-paying tenant so that the property can return to a profitable state" is a bit clinical. Should be signed by a person (Susan), not the company name — this is a major decision that should feel personal. 0 sends suggests this template hasn't been used yet.

---

### (Owner) Payment Plan Recommended
**Subject:** (not captured)
**Sends:** 1 | **Open rate:** 100%

```
Dear {{owner.first_name | default}}

I hope this message finds you well.

I wanted to update you regarding your property at {{property.address | default}}. As you know, the tenant has fallen behind on their rent payments, and after assessing the situation, we believe a payment plan would be a constructive way forward.

Our goal is to help the tenant get back on track while protecting your interests as the property owner. We believe that a payment plan could facilitate timely payments moving forward and stabilize the situation. Your trust in our management is greatly appreciated, and we always strive to act in your best interest.

Please feel free to reach out if you have any questions or concerns.

Thank you for your attention to this matter.

Warm regards,
{{our_company_name | default}}
```

**Issues:** Missing the actual payment plan details — amount, schedule, how it works. Owner is being told a plan is recommended but not what the plan IS. Needs a placeholder for plan specifics. Missing comma after "Dear {{owner.first_name | default}}" (typo).

---

### (Owners) Payment Received In Full
**Subject:** (not captured)
**Sends:** 18 | **Open rate:** 67%

```
Dear {{owner.first_name | default}},

I wanted to inform you that your tenant at {{property.address | default}}, who had previously been delinquent on their rent, has now made the outstanding payment. As of today, their account is current.

Please let me know if you have any questions or need additional information regarding this update.

Thank you for your attention to this matter.

Best regards,
```

**Issues:** Closing says "Best regards," with NO NAME — signature is missing entirely. This is the good news email and it's the most bare-bones one. Should include: when payout will be sent, confirm the amount, warmth. "Thank you for your attention to this matter" is out of place — the owner didn't do anything, the tenant paid.

---

### Resources Prior to Eviction
**Subject:** (not captured)
**Sends:** 0 | **Has 1 attachment**

```
Dear {{tenant.primary.first_name | default}},

As of {{today | default}}, we have not received your rent payment.

If you are experiencing a financial hardship, we encourage you to seek assistance immediately. Attached are several resources and agencies that may be able to provide rental assistance or other support.

Please be advised that if we do not hear from you within 48 hours with a specific plan to bring your rent current, we will begin the Unlawful Detainer (Eviction) process.

Our goal is not to evict you. We would prefer to work with you to overcome this financial challenge and help you remain in your home. However, communication is essential. You must contact our office immediately to discuss your situation and proposed payment plan.

Failure to respond within 48 hours may leave us with no alternative but to proceed with legal action.

We look forward to hearing from you.

Crown Key Realty
[California resources attachment]
```

**Issues:** Good compassionate tone — this is the best tenant template. "Failure to respond within 48 hours may leave us with no alternative" is slightly harsh at the end after setting a compassionate tone. Should end with a warm, human closing. The 48-hour deadline appears twice — pick one place.

---

---

## PROCESS: T 07 Lease Renewal Process (16 templates — all captured)

> **Note:** This process has 16 templates, not 11 as initially expected.
> Three tenant offer templates share an identical subject line — a problem to fix.
> The Resident Benefit Package fee is inconsistent: $50.95/month in template 13, $25/month in 14 and 15.

---

### Template 1: Congratulations Lease increase - increase in Mgmt fee
**Subject:** (not sent — 0 sends, presumed in-modal note)
**Sends:** 0

*(Full body captured in previous session — see prior raw notes)*

---

### Template 2: M2M Upcoming Renewal Process (Owner Notification)
**Sends:** 0

*(Full body captured in previous session — see prior raw notes)*

---

### Template 3: MGMT fee increase - and NEW lease
**Sends:** 193 | **Open:** 101% | **Click:** 43%

*(Full body captured in previous session — see prior raw notes)*

---

### Template 4: (Owner) Congrats Email
**Subject:** Lease Executed for {{property.street}}
**Sends:** 213 | **Open:** 95%

```
Hi {{owners.first_name}},

Congratulations! We have executed your lease renewal with your tenant at {{property.street}} and a copy will be uploaded to your owner portal. Please let us know if you have any questions!

Renewal rent:
Effective date of the renewal rent:
Lease Term:
```

**Issues:** The renewal rent, effective date, and lease term are blank fields the sender must fill in manually — no merge fields exist for these. Very short otherwise — no warmth or celebration for a great outcome. Good news should feel like good news.

---

### Template 5: (Owner) Follow up if not responded
**Subject:** Interested in renewing the lease for {{property.street | default}}?
**Sends:** 28 | **Open:** 93%

```
Hi {{owners.first_name}},

I just wanted to follow up with you about the lease renewal coming up on {{unit.lease_end_date}} for {{property.street}} since we haven't heard back from you we will be moving forward with the lease renewal.

Nothing further is needed from you at this time.

Thank you
```

**Issues:** Run-on sentence ("since we haven't heard back from you we will be moving forward"). "Thank you" with no name is an abrupt close. The subject is good — conversational and clear.

---

### Template 6: Owner Notification of Tenant going into a MTM lease
**Subject:** Property {{property.street | default}} Lease changing into a Month to Month
**Sends:** 4 | **Open:** 100%

```
Dear property Owner,

We would like to inform you that the tenant at {{property.street | default}} has not signed a new lease agreement or chose to go into a Month to Month option. As a result, and in accordance with the terms of the original lease, the tenancy has automatically converted to a month-to-month arrangement.

Lease Renewal Date:
New Monthly Rent Ammount: {{process.new_rental_rate | default}}

As of now, no action is required from your end but please let me know if you have any questions or concerns.
```

**Issues:** "Dear property Owner" — no personalization. Typo: "Ammount" (should be "Amount"). "Lease Renewal Date:" is a blank field — no merge field. Missing warmth or closing. Tone is clinical for what is actually a meaningful update.

---

### Template 7: (Owner) Notification of Upcoming Lease Expiration ⭐ HIGHEST TRAFFIC
**Subject:** Upcoming Lease Renewal for {{property.street}}
**Sends:** 224 | **Open:** 96% | **Click:** 56%

```
Dear {{owners.first_name}},

I hope you are doing well! We wanted to notify you that the lease renewal is coming up on {{unit.lease_end_date}} for your property at {{property.address}}.

We do want to keep rent current with the market. We also want to keep good tenants. As you know Resident Turn is the most expensive part of an investment property. We will evaluate the current market rents and either do an increase or keep rent at the same price, depending on our comps, number of properties on the market for rent, etc.

To view a personalized rental analysis just click here. What is the average rent near my property?

After reviewing, we need to know if you would still be interested in renewing the lease with this tenant.

Please select answer below:

1. YES (I would like to renew and select options)
2. NO (I would not like to renew with this tenant)

We must hear from you within 7 days from {{today | default}} if you do not want us to renew the lease. After 7 days we will proceed with our yearly lease renewal process.

Our process includes a property assessment, reviewing the resident's payment record, notifying the resident of any rent increase, and getting an extension signed. If the property assessment reveals any reason for a non- renewal we will contact you or if the payment record for the residents is behind on their rent.

As long as you are planning to maintain the property as a rental there is nothing further we need from you at this time.

Thank you.
```

**Issues:** "click here" link — need to verify it's still active and points to the right place. "Resident Turn" should probably be lowercase "resident turn." The YES/NO numbering is functional but feels clinical. Missing professional sign-off. Sentence fragment: "As long as you are planning to maintain the property as a rental there is nothing further we need from you at this time" — abrupt ending. Despite these issues, 56% click rate shows it works.

---

### Template 8: (Owner) Tenant Not Renewing the Lease
**Subject:** Tenant not Renewing Lease {{property.street | default}}
**Sends:** 0

```
{Dear {{owners.first_name}},

Unfortunately your tenant at {{property.street}} has informed us that they will not be renewing their lease expiring {{process.due_at}}.

We will. hold the last months rent so that if there are needed items to be completed to get the property rent ready we will have available funds. If there are no wear and tear repairs that are needed we will release the rent to you immediately after our inspection is completed.

We are also working with the tenant to coordinate a pre-inspection to assist them in addressing any cleaning and tenant-responsible repairs if any. After the tenant vacates, we will complete a full move-out assessment and provide you with an update on whether any further updating, repairs or cleaning are necessary before the new tenancy, as well as if any of those items are chargeable to the tenant's security deposit.

If you do not want us to re-rent the property please let us know no later than 72 hours ( 3 days) after {{today | default}}.

Please contact me with any questions or concerns. Thank you!
```

**Issues:** Starts with "{Dear" — errant "{" character is a bug that would show up in every sent email. "We will. hold" — extra period in the middle of a sentence. "last months rent" — missing apostrophe (should be "last month's rent"). Content is actually comprehensive and good. Just needs the bugs fixed and better opening.

---

### Template 9: (Tenant) One year lease renewal offer
**Subject:** Upcoming Lease Expiration for {{property.street}} - 1 year lease Renewal Offer
**Sends:** 3 | **Open:** 67%

```
Dear {{tenants.first_name}},

Your lease expiration for {{property.street}} is coming up soon on {{unit.lease_end_date}}. We are reaching out to determine your intent to renew.

We are extending a One Year Lease option . There will be a modest increase. $__________. Your new rent will be $_______________

In addition to the rent increase there is the $30/month Resident Benefit Package Fee.
The Resident Benefit package gives you the Resident the following:
Access to ACH payments
Free Tenant Portal
Free Utility Concierge Service
Free Waive of one time NSF Fee
Free Waive on one time Late Fee
Free 24/7 Maintenance line
Free Credit Reporting of on time payments

Prior to sending the renewal lease, you will need to complete the self renewal inspection. If you prefer to have an inperson renewal inspection, we can send our field director, cost is $75.
After we received the completed inspection report we will send the lease for signing.

There is a Lease renewal fee of $200. However, If the lease is signed within 7 days of receiving the lease for signatures, the lease renewal fee will be reduced to $100.

NOTE: If we do not hear from you your lease will revert to month to month. Month to month leases have an increase of 9.5% and a $25/month administrative charge.

If you do not plan on renewing your lease, please let us know immediately. 30 day minimum written notice must be received if you are not renewing.

Please let me know if you have any questions.
```

**Issues:** "$__________" and "$_______________" are manual blanks — someone must fill these in. "One Year Lease option ." — extra space before period. "inperson" should be "in-person". "After we received" should be "After we receive". RBP fee is $30/month here vs. $50.95 in template 13 and $25 in 14/15 — three different amounts across four templates. The NOTE section is important but buried.

---

### Template 10: (Tenant) Owner Not Renewing the Lease
**Subject:** Notice of Non-Lease Renewal {{property.street | default}}
**Sends:** 0

```
Hi {{tenants.first_name}},

We regret to inform you that the owner has chosen not to renew the lease for {{property.street}} at this time. As a reminder, the lease ends on {{unit.lease_end_date | default}}.

We will be sending a move out assessment link for you to complete to document the condition of the property. If you prefer to have a pre-move-out assessment done in person please respond to this email. Please keep in mind this is a preliminary assessment and the final move-out assessment will be completed after the property is vacated.

Please reach out with any questions or concerns and thank you for your tenancy!
```

**Issues:** "We regret to inform you" is a cold opening for difficult news. No empathy for the tenant's situation. No information about next steps (where to go, who to call). "Thank you for your tenancy!" sounds cheerful at the end of what is stressful news. Should acknowledge this is hard news.

**Fair Housing note:** Non-renewal decisions must be documented as non-discriminatory. This template should include a note to the sender to confirm the reason for non-renewal is in the file.

---

### Template 11: (Tenant) Reminder to Sign Lease or M2M fee will be applied
**Subject:** Reminder to Sign Lease {{property.address | default}}
**Sends:** 0

```
Hi {{tenants.first_name}},

I'm following up since we haven't yet received your signed lease and renewal fee for {{property.street}}. Do you have any questions about the lease I can help you with?

As a reminder, the rent will increase with or without signatures. However, your protection of a lease does need a signature.

Failure to sign the lease will result in a $200 leasing fee, the lease will revert to a month to month lease with a rent increase of 9% plus a $25/month Month to Month Administrative fee.

If you are unable to log into your resident portal please let our office know. Please be aware that all persons over 18 must sign the lease or the month to month increase will be applied the first month after lease end {{unit.lease_end_date | default}} date.
```

**Issues:** "Failure to sign the lease will result in..." — leads with threat after a helpful opening. The friendly question in paragraph 1 and the threat in paragraph 3 feel disconnected. No warm closing or sign-off. Reframe the threat as a reminder with a deadline rather than a punitive statement.

---

### Template 12: (Tenant) Thanks for renting with us!
**Subject:** Thank you for signing your new lease {{property.address | default}}
**Sends:** 2 | **Open:** 100%

```
Dear {{tenants.first_name | default}},

We have received the signed lease renewal for {{property.address | default}}.

Thank you
```

**Issues:** This is the shortest template in the entire system. The subject line is actually good — specific and clear. But the body is bare. This is a great opportunity to: celebrate the renewal, confirm next steps (when does new rent start?), remind them of anything they need to do. "Thank you" alone as the closing is not a complete sentence and has no name. Should be a warmer, fuller celebration of the renewed relationship.

---

### Template 13: (Tenant) Upcoming Lease Expiration
**Subject:** Upcoming Lease Expiration for {{property.street}}
**Sends:** 0

```
Dear {{tenants.first_name}},

Your lease expiration for {{property.street}} is coming up soon on {{unit.lease_end_date}}. I'm reaching out to offer you the following renewal option and look forward to hearing from you soon.

In addition to the rent increase there will be a $50.95/month Resident Benefit Package Fee. The Resident Benefit package gives you the Resident the following:
Free ACH
Free Tenant Portal
Free Utility Concierge Service
Free Waive of one time NSF Fee
Free Waive on one time Late Fee
Free 24/7 Maintenance line
Identity Theft Protection
Credit Reporting to all 3 Bureaus
Free Credit Reporting of on time payments
Filter Delivery twice a year.
INSURANCE IS NOW INCLUDED, no longer billed separately.
PLEASE SEE ATTACHED FLYER

Once I receive your response, I will send the new lease for electronic signing and send you information on the lease renewal inspection.

Lease renewal fee of $200. If lease is renewed within 7 days of receiving this notice lease renewal fee will be reduced to $100

If you do not plan on renewing your lease, please let us know immediately. If you choose to vacate please provide a 30 day notice.

Please let me know if you have any questions.
```

**Issues:** Never states what the renewal option IS — says "I'm reaching out to offer you the following renewal option" but then jumps straight to the RBP fee list. "INSURANCE IS NOW INCLUDED" and "PLEASE SEE ATTACHED FLYER" in all caps are unprofessional. RBP fee is $50.95/month here vs. $30/month in template 9 and $25/month in templates 14 and 15 — four templates, four different prices.

---

### Template 14: (Tenant) Upcoming Lease Expiration - Month to Month Option
**Subject:** Upcoming Lease Expiration for {{property.street}} ⚠️ DUPLICATE SUBJECT
**Sends:** 0

```
Dear {{tenants.first_name}},

Your lease expiration for {{property.street}} is coming up soon on {{unit.lease_end_date}}. I'm reaching out to offer you the following renewal options and look forward to hearing from you soon.

Month to month - 10% increase and a $125/month admin fee

In addition to the rent increase there will be a $25/month Resident Benefit Package Fee added to all leases starting 2022. The Resident Benefit package gives you the Resident the following:
Free ACH
Free Tenant Portal
Free Utility Concierge Service
Free Waive of one time NSF Fee
Free Waive on one time Late Fee
Free 24/7 Maintenance line
Free Credit Reporting of on time payments

Once I receive your response, I will send the new lease for electronic signing and send you information on the lease renewal inspection.

Lease renewal fee of $200. If lease is renewed within 7 days of receiving this notice lease renewal fee will be reduced to $100

If you do not plan on renewing your lease, please let us know immediately. We must have 30 day notice to vacate in writing.

Please let me know if you have any questions.
```

**Issues:** Subject line is identical to templates 13 and 15 — if sent on different occasions, tenants can't distinguish which offer is which. "starting 2022" — outdated year (now 2026). RBP is $25/month here (different from other templates). M2M admin fee is $125/month here vs. other templates referencing $25/month admin fee — need to confirm current rates. No warm opening or closing.

---

### Template 15: (Tenant) Upcoming Lease Expiration - Year Lease Option
**Subject:** Upcoming Lease Expiration for {{property.street}} ⚠️ DUPLICATE SUBJECT (3rd template with same subject)
**Sends:** 0

```
Dear {{tenants.first_name}},

Your lease expiration for {{property.street}} is coming up soon on {{unit.lease_end_date}}. I'm reaching out to offer you the following renewal options and look forward to hearing from you soon.

One Year Lease - 5 - 7% rounded to nearest dollar amount increase dependent on market and length of time the tenant has been living in the property.

In addition to the rent increase there will be a $25/month Resident Benefit Package Fee added to all leases starting 2022. The Resident Benefit package gives you the Resident the following:
Free ACH
Free Tenant Portal
Free Utility Concierge Service
Free Waive of one time NSF Fee
Free Waive on one time Late Fee
Free 24/7 Maintenance line
Free Credit Reporting of on time payments

Once I receive your response, I will send the new lease for electronic signing and send you information on the lease renewal inspection.

Lease renewal fee of $200. If lease is renewed within 7 days of receiving this notice lease renewal fee will be reduced to $100

If you do not plan on renewing your lease, please let us know immediately. If you choose to vacate, we require a 30 day notice in writing of via email.

Please let me know if you have any questions.
```

**Issues:** Third template with identical subject line "Upcoming Lease Expiration for {{property.street}}". "starting 2022" — outdated. "in writing of via email" — typo ("of" should be "or"). "5 - 7% rounded to nearest dollar amount increase" — this is not what gets communicated to a tenant; actual $ amount should be in a merge field or manually filled in. Same $25/month RBP as template 14 but different from 9 ($30) and 13 ($50.95).

---

### Template 16: Upcoming Inspection Notice (Tenant Notification)
**Subject:** Yearly Inspection Notice for {{property.address}}
**Sends:** 42 | **Open:** 95% | **Click:** 12%

```
Dear Residents,

We are aware your renewal is coming up and that we will be in touch when we have made contact with owners on their intentions to renew.

For the time being, we are excited to announce our partnership with Resident Inspect to assist in conducting periodic inspections of your home. Instead of in-person walkthroughs, these inspections will now be conducted virtually using live video technology, similar to a Zoom call.

This new approach offers several benefits, including:
● Flexible and convenient appointment times.
● A less intrusive experience
● No need for someone to physically enter your home.
● Shorter inspection durations.

No accounts, photo submissions, or other time-consuming steps are required—Resident Inspect's process is designed to be simple and user-friendly. We have asked Resident Inspect to reach out to you when it's time to schedule your inspection. Please keep an eye out for upcoming communications on our behalf from Resident Inspect regarding your inspection.

IF YOU FAIL TO COMPLETE THIS INSPECTION, WE MIGHT NEED TO SEND AN INHOUSE INSPECTOR AND THAT WILL HAVE A COST OF $175 FOR THE TENANTS

If you have any questions or concerns, feel free to reach out to us directly.
```

**Issues:** "Dear Residents" — no personalization. "For the time being" — implies this is temporary, which is probably not the intent. The all-caps threat at the end ("IF YOU FAIL TO COMPLETE THIS INSPECTION...") completely undermines the warm, benefit-focused tone of the preceding paragraphs. "INHOUSE INSPECTOR" should be "in-house inspector." Should end with a warm closing instead of a threat.

---

## KEY FINDINGS — T 07 Lease Renewal Process

### Bugs to fix immediately
1. **"{Dear" typo** in Template 8 — the "{" character appears in every email this template sends
2. **"We will. hold"** in Template 8 — extra period breaks the sentence
3. **Duplicate subject lines** — Templates 13, 14, and 15 all use "Upcoming Lease Expiration for {{property.street}}" — tenants can't tell which offer they're receiving
4. **Inconsistent RBP fees** across four templates: $30/mo (T9), $50.95/mo (T13), $25/mo (T14, T15)
5. **Outdated "starting 2022"** in Templates 14 and 15 — it's now 2026

### Structural issues
- Templates 13, 14, and 15 appear to be versions of the same offer — need to understand which is actually in use and consolidate
- Template 4 (Congrats Email) has blank fields for renewal rent/date/term — no merge fields exist; someone fills these in manually every time
- Template 12 (Thanks for renting!) is too bare for such an important moment

### Fair Housing flag
- Template 10 (Owner Not Renewing): Non-renewal without documented reason is a Fair Housing risk. This template should include a sender note: "Before sending, confirm the reason for non-renewal is documented in the file."

---

## PROCESS: NP 01 Owner Onboarding Process (Active — 0 sends on all templates)

**10 templates total. 4 have real content; 6 are unfilled LeadSimple default stubs.**

---

### Template 1 — (Owner) Follow Up Email for Any Missing Information/Documents
**Subject:** Request for Missing Information/Documents
**Sends:** 0

```
Hi {{owners.all.first_name | there}},

In reviewing your owner onboarding packet, it appears there are a couple items
missing which we require to set up your owner portal. Please send us the
following as soon as possible:

Outline the missing items here
```

**Issues:** "Outline the missing items here" is a manual placeholder — not a merge field. Someone must fill this in by hand every time before sending. No deadline given. No list structure for the missing items.

---

### Template 2 — (owner) FTB Documentation Needed
**Subject:** `{{owners.first_name | default}} {{property.address | default}} Franchise Tax Board for State of CA Needed`
**Sends:** 0

```
Dear {{owners.all.first_name | there}}
```

**Issues:** SKELETON ONLY — body is a greeting with nothing else. Template was started and never finished. FTB = Franchise Tax Board (California requires property owners to provide tax documentation). Subject line has no verb/action — reads like a file label, not an email subject. Needs to be written from scratch.

---

### Templates 3, 4, 5, 7, 8, 9 — LeadSimple Default Stubs (Never Filled In)

| # | Name | Preview text |
|---|---|---|
| 3 | (Owner) Info about Invoices & Statements | "Informational auto email about invoices & statements. Learn more about how to embed videos…" |
| 4 | (Owner) Info about Rental Payments | "Informational auto email about rental payments. Learn more about how to embed videos…" |
| 5 | (Owner) Referral Program | "This email could outline how your referral program works." |
| 7 | (Owner) Satisfaction Survey | "Edit this template to request that the owner fill out a survey or leave you a review." |
| 8 | (Owner) Video - Next Steps | "This could be an auto-email with a video outlining the next steps for the owner." |
| 9 | (Owner) Video - What to Expect in the Leasing Process | "Auto email including a video about what to expect with the leasing process." |

**All 6 are unfilled LeadSimple placeholder stubs.** Crown Key has never written content for any of these. All show 0 sends. These are opportunities — especially #5 (Referral Program) and #7 (Satisfaction Survey) — but they need to be built from scratch.

---

### Template 6 — (Owner) Reminder to Sign the Management Agreement
**Subject:** `Reminder to Sign the Property Management Agreement for {{property.street | default}}`
**Sends:** 0

```
Hi {{owners.all.first_name | there}},

We are eager to begin onboarding your property at {{property.street}} and
create your owner portal, but we have not yet received the signed property
management agreement. Please sign and return it at your earliest convenience
so we can move forward.

Thank you!
```

**Issues:** Short and functional but thin. No urgency. No next step (link to sign? call us?). "Thank you!" is an odd closing for a document-chasing email — should be more professional. No merge field for who to contact with questions.

---

### Template 10 — (Owner) Welcome Email - Onboarding Packet
**Subject:** `Welcome to {{our_company_name | default}}! {{property.address | default}}`
**Sends:** 0

```
Hi {{owners.all.first_name}},

First off, we'd like to welcome you to the {{our_company_name}} family. The
whole team is so excited to have you on board!

Please complete this quick information form, so that the entire team has all
relevant information for your property.

Owner Onboarding Form

Next Steps:
We will be placing a combination lockbox on the PGE meter at the property.
The code will be 5573. When you are prepared to give us possession please put
one key in the combination lock box, and all remaining keys, mail box keys,
remotes in a drawer in the kitchen.

We will schedule photos and video to be taken. We will schedule the locksmith
to have the property rekeyed.

If any repairs, cleaning or suggested improvements are needed we will reach
out to you.

If necessary we will transfer utilties to CKRPM's account.

We will let you know as soon as the house is ready and on the rental market.
Our goal is to get it on the market as quickly as possible. We can't control
syndication or vendor times.

Please reach out with any questions as well.

Meet the Team:
Abi - Director of Onboarding & Make Readys
Rodrigo - Market
Tiffany - Leasing
Alex - Resident Repair Requests

Reach anyone on the team at 209-627-0257 or info@crownkeyrealty.com

Susan and Team
```

**Issues:**
1. **NOTE — Lockbox code**: `5573` is Crown Key's standard initial onboarding code, intentionally the same across all properties. It is changed at tenant move-in. No action needed — this is by design.
2. **Typo**: "utilties" → "utilities"
3. **Outdated team roster**: Abi and Rodrigo are listed but do not appear in current team context. Susan's team today includes Tiffany, Maria, Priya, James. This roster needs updating.
4. **Wrong email**: `info@crownkeyrealty.com` — Crown Key's contact email is `admin@crownkeyrealty.com`
5. **Missing merge field fallback**: `{{owners.all.first_name}}` has no `| there` fallback — will be blank if name isn't in system
6. **"Owner Onboarding Form"**: This is a hyperlink in the original — the actual link URL is not visible in the text capture. Need to verify the form link is still active and working.
7. **Tone**: "The whole team is so excited to have you on board!" is the right energy but the body quickly becomes a list of tasks the owner needs to do. Could be warmer.
8. **No PG&E capitalization**: "PGE" should be "PG&E"

---

### NP 01 KEY FINDINGS

**Fix immediately before this process is used:**

1. **Update the team roster** in Template 10 — Abi and Rodrigo are listed but do not appear to be current team members. Verify and update.
2. **Correct the email address** in Template 10 — `info@crownkeyrealty.com` → `admin@crownkeyrealty.com`
3. **Write Template 2 (FTB Documentation Needed)** — it's an empty skeleton and won't function if triggered
4. **Fix the typo** "utilties" → "utilities" in Template 10

**Missing templates that should exist but don't:**
- No template for "Owner Portal is Ready" — owners need confirmation when setup is complete
- No template for "Property is Listed" — owners want to know when their unit hits the market

---

## PROCESS: T 04 BSG Payment Plan 2024 (Active — small send volume)

**18 templates total. All have real content. Split: 8 owner-facing, 10 tenant-facing.**

Context: This process is used when a tenant cannot pay overdue rent in full and Crown Key arranges an installment plan. Templates cover: notifying the owner of the plan terms, confirming each payment as it arrives, and reminding the tenant each day a payment is due.

---

### GROUP A — Owner Notification: Payment Plan Terms (4 templates)

All 4 share the same subject and same body structure — only the number of payment rows differs.

**Subject (all 4):** `Payment Plan Initiated | {{property.address | default}}`

**Template A1 — Owner Message - Payment Plan Terms 1 Payment** | Sends: 1 | Open: 100%
**Template A2 — Owner Message - Payment Plan Terms 2 Payments** | Sends: 0
**Template A3 — Owner Message - Payment Plan Terms 3 Payments** | Sends: 0
**Template A4 — Owner Message - Payment Plan Terms 4 Payments** | Sends: 1 | Open: 100%

```
Hello {{owners.full_name | default}},

As previously mentioned, the tenant at {{property.address | default}} was late
on making their monthly rent payment. Regrettably, they have not been able to
complete the payment yet, though we have arrange a payment plan to ensure that
they are restored to a paid up status as quickly as possible.

The dates and amounts of payment are detailed below. Please keep in mind that
it may take up to 3 business days in processing before we can release the funds,
due to banking regulations.

Payment 1 Due: {{process.payment1_due}} - Amount: {{process.payment1_value}}
[Payment 2, 3, 4 rows added in respective versions]

Please reach out with any questions, and we appreciate your understanding.

If you have any questions, feel free to reach out.
```

**Issues (all 4):**
- **Grammar bug**: "we have arrange" → "we have arranged"
- **Duplicate closing**: "Please reach out with any questions" AND "If you have any questions, feel free to reach out" — exact same sentiment twice
- `{{owners.full_name}}` — too formal. Uses full legal name; should use first name
- "Regrettably" is an odd word here — the plan IS the solution; tone should be matter-of-fact, not apologetic
- "Hello" is inconsistent with "Dear" used in the success templates

---

### GROUP B — Owner Notification: Payment Successes (4 templates)

**Template B1 — (Owners) 1st Payment Success** | Sends: 0
**Subject:** `First Payment Recieved | {{property.street | default}}`

```
Dear {{owners.first_name | default}},

I am writing to inform you that the first payment installment of
{{process.payment1_value | default}} from the tenant at
{{property.street | default}} has been successfully processed.

We will provide you with further updates as we receive them.

Thank you for your attention.
Sincerely,
```

**Issues:** Subject has typo: "Recieved" → "Received". "Thank you for your attention / Sincerely," is stiff and cold for genuinely good news. "I am writing to inform you" is bureaucratic.

---

**Template B2 — (Owners) Second Payment Success** | Sends: 0
**Subject:** `Second Payment Received | {{property.street | default}}`

```
Dear {{owners.first_name | default}},

I am writing to inform you that the second payment installment of
{{process.payment2_value | default}} from the tenant at
{{property.street | default}} has been successfully processed.

We will provide you with further updates as we receive them.

Thank you for your attention.
Sincerely,
```

**Issues:** Same stiff tone as B1. Otherwise functional.

---

**Template B3 — (Owners) Third Payment Success** | Sends: 0
**Subject:** `Third Payment Received | {{property.street | default}}`

```
Dear {{owners.first_name | default}},

I am writing to inform you that the second payment installment of
{{process.payment3_value | default}} from the tenant at
{{property.street | default}} has been successfully processed.

We will provide you with further updates as we receive them.

Thank you for your attention.
Sincerely,
```

**Issues:** **BUG** — Body says "the **second** payment installment" but this is the THIRD payment and uses `payment3_value`. Subject correctly says "Third." Copy-paste error — the word "second" was never updated.

---

**Template B4 — (Owners) Payment Plan Complete** | Sends: 0
**Subject:** `Payment Plan Complete | {{property.address | default}}`

```
Dear {{owners.first_name | default}},

We are pleased to inform you that the tenant at your property at
{{property.address | default}} has successfully completed their payment plan
and is now current on their payments.

Thank you for trusting us with the management of your property and please
reach out if you have any questions.
Best Regards,
```

**Issues:** Best of the four — warm, clear, appropriate. Minor: "Best Regards," with no name (signature fills in). Could be slightly warmer given this is excellent news.

---

### GROUP C — Tenant Notification: Payment Plan Breakdown (4 templates)

All 4 share the same subject. All use `{{tenants.full_name}},` with NO greeting word — jumps straight into the full name.

**Subject (all 4):** `Flexible Payment Plan to Catch Up on Overdue Rent`

**Template C1 — Payment Plan Breakdown (1 Payment1)** | Sends: 4 | Open: 75%
*(Note: Template is named "1 Payment1" — the "1" at the end is a naming error)*

```
{{tenants.full_name}},

In accordance with the payment plan discussed to get your overdue balance
current, the following will be one installment:

• Payment Due: {{process.payment1_due}} - Amount: {{process.payment1_value}}

Please ensure timely payments to avoid any disruptions.

We appreciate your understanding.

If you have any questions, feel free to reach out.
```

**Template C2 — Payment Plan Breakdown (2 Payments)** | Sends: 2 | Open: 100%
Same structure + Payment 2 row.

**Template C3 — Payment Plan Breakdown (3 Payments)** | Sends: 0
Same structure + Payment 3 row.

**Template C4 — Payment Plan Breakdown (4 Payments)** | Sends: 1 | Open: 100%
Same structure + Payment 4 row.

**Issues (all 4):**
- No greeting word — `{{tenants.full_name}},` alone is cold and abrupt. Should be "Hi {{tenants.first_name}},"
- "Please ensure timely payments" (plural) in the single-installment version is grammatically wrong
- Duplicate closing lines again
- Uses `{{tenants.full_name}}` — should be `{{tenants.first_name}}`

---

### GROUP D — Tenant Reminders: Day-Before Notices (5 templates)

**Template D1 — (Tenant): Payment 1 Reminder** | Sends: 3 | Open: 100%
**Subject:** `Payment Reminder: Installment 1 Due Tomorrow`

```
Dear {{tenants.full_name}},

A friendly reminder that your first installment payment of
{{process.payment1_value}} for {{property.address}} is due tomorrow. Kindly
ensure the timely submission to avoid any inconvenience.

Thank you for your cooperation.
```

**Template D2 — (Tenant): Payment 2 Reminder** | Sends: 0
**Subject:** `Payment Reminder: Installment 2 Due Tomorrow`

```
Dear {{tenants.full_name}},

This is a reminder that your second installment payment of
{{process.payment2_value}} for {{property.address}} is due tomorrow. Your
timely cooperation is appreciated.
```

**Template D3 — (Tenant): Payment 3 Reminder** | Sends: 0
**Subject:** `Payment Reminder: Installment 3 Due Tomorrow`

```
Dear {{tenants.full_name}},

A quick reminder that your third installment payment of
{{process.payment3_value}} for {{property.address}} is due tomorrow. Thank
you for your attention to this matter.

Best regards,
```

**Template D4 — (Tenant): Payment 4 Reminder** | Sends: 0
**Subject:** `Payment Reminder: Installment 4 Due Tomorrow`

```
Dear {{tenants.full_name}},

As a reminder, your fourth and final installment payment of
{{process.payment4_value}} for {{property.address}} is due tomorrow. Your
prompt attention is crucial.

Best regards,
```

**Issues (all 4):**
- "Kindly ensure the timely submission" — stiff, awkward phrasing
- "Your prompt attention is crucial" in D4 — too heavy for a reminder; sounds threatening
- Inconsistent tone across four templates: D1 is friendly, D2 is curt, D3 is neutral, D4 is urgent
- No consistency in how they close — D1 has "Thank you for your cooperation", D2 has nothing, D3-D4 have "Best regards,"
- Uses `{{tenants.full_name}}` — should be `{{tenants.first_name}}`

---

**Template D5 — ⚠️ DUPLICATE: (Tenants) Reminder: Payment is Due Tomorrow** | Sends: 5 | Open: 100%
**Subject:** `Your Payment is Due Tomorrow`

**Body: IDENTICAL to Template D1** — same word-for-word as "(Tenant): Payment 1 Reminder"

**BUG**: This is the same template under a different name and different subject. 5 sends vs D1's 3 sends — both are being used, likely interchangeably. Team members don't know which to use. The subject "Your Payment is Due Tomorrow" is also vague (doesn't specify installment number). One of these should be deleted.

---

### GROUP E — Tenant: Plan Completion (1 template)

**Template E1 — (Tenant): Payment Plan Completion Congrats** | Sends: 0
**Subject:** `Congratulations on Completing Your Payment Plan!`

```
Dear {{tenants.full_name}},

Congratulations! We are pleased to inform you that you have successfully
completed the installment payment plan for {{property.address}}.

Your commitment and timely payments are commendable.

Thank you for your cooperation throughout this process.

If you have any questions or need further assistance, feel free to reach out.
```

**Issues:** Best tenant-facing template in this set — has warmth, structure, positive tone. "Your commitment and timely payments are commendable" sounds like a performance review; replace with something warmer. Uses `{{tenants.full_name}}` — should be `{{tenants.first_name}}`.

---

### T 04 KEY FINDINGS

**Fix immediately:**

1. **Grammar bug** in all Group A templates: "we have arrange" → "we have arranged"
2. **Copy-paste bug** in Template B3 (Third Payment Success): Body says "second payment" — change to "third"
3. **Typo** in Template B1 subject: "Recieved" → "Received"
4. **Delete the duplicate**: "(Tenants) Reminder: Payment is Due Tomorrow" is identical to "(Tenant): Payment 1 Reminder". Keep the one with better naming conventions and the more specific subject line.

**Consistency issues to fix in rewrite:**
- All templates use `{{tenants.full_name}}` — switch to first name throughout
- Inconsistent greeting: "Hello" (Group A) vs "Dear" (Groups B-E) — pick one
- Inconsistent closings across the 4 day-before reminders — standardize
- Duplicate closing lines in Group A and Group C

**Fair Housing note:** These templates relate to tenant payment arrangements. They are factual and financial in nature. No protected class language found. No Fair Housing flag.

---

---

# T 03 BSG Move Out 2024

**Process status:** Live Mode
**Stage count:** 8 stages listed, but **26 email templates** total
**Extraction date:** 2026-06-26

**⚠️ Critical cross-template bug: Inconsistent holdover fees**
Three different amounts appear across T 03, with no explanation for the difference:
- $200/day: Templates 1, 8
- $250/day (or just "$250 holdover fee"): Templates 4, 23
- $150 holdover fee: Templates 16, 17
**Action required:** Confirm correct holdover amount with Susan and standardize across all templates.

**⚠️ Wrong email throughout:** `info@crownkeyrealty.com` appears in Templates 3, 12, 14, 15, 16, 17, 18, 25. Correct address is `admin@crownkeyrealty.com`. Template 26 has a typo: `infor@crownkeyrealty.com`.

**Recurring grammar error:** "If there is not have a lockbox" appears in Templates 15 and 23 (identical wording). Fix: "If there is not a lockbox."

**Hardcoded contact info (should be merge fields):**
- Office address "44 W 11th Street, Tracy CA 95376" appears in Templates 15, 16, 17, 23 — verify this is still current
- Phone "209-627-0257" appears in Templates 16, 17, 18, 25, 26

---

## Template 1 — confirm vacancy

**Sends:** 0 | **Files:** 0
**Subject:** `Confirming Move out Date is TOMORROW`
**Recipient:** Tenant

**Body:**
> Good afternoon, We want to confirm that you will be vacating by noon, tomorrow. Failure to vacate in a timely fashion will result in a $200/day hold over fee. Per move out instructions keys need to be available by noon on the move out date. Thank you.

**Bugs:**
- No greeting with tenant name — impersonal and can't address co-tenants
- "Good afternoon" is time-inappropriate for an automated email
- 0 sends — likely never triggered (but subject says TOMORROW, so timing is critical)
- `$200/day` holdover — conflicts with Templates 4 and 23 ($250) and 16/17 ($150)

---

## Template 2 — Follow-Up on Property Status

**Sends:** 29 | **Files:** 0
**Subject:** `Follow Up on Property Status {{property.name | default}}`
**Recipient:** Owner

**Body (preview — full body captured in prior session):**
> Dear {{owners.first_name | default}}, I hope this message finds you well. I wanted to follow up regarding the relisting of your property for rentals. If we do not hear back from you soon, we will proceed with our standard processes. If you have decided [to keep it off market or have other plans, please let us know]...

**Bugs:**
- None flagged in extraction — clean structure, uses `| default`, professional tone
- Subject uses `property.name` — confirm this is the correct field (vs `property.address` or `property.street`)

---

## Template 3 — House Cleaning Invoice Reminder

**Sends:** 67 | **Files:** 0
**Subject:** `Move out - House Cleaning Invoice Request {{property.name | default}}`
**Recipient:** Tenant

**Body (preview — full body captured in prior session):**
> Dear {{tenants.first_name | default}}, Dear tenant, This is a friendly reminder regarding the house cleaning requirements for your move-out: - Ensure the move-out inspection link has been completed before move-out. - Ensure that the cleaning service [receipt is submitted]...

**Bugs:**
- **Double greeting:** Body starts with "Dear {{tenants.first_name | default}}, Dear tenant," — two salutations run together (the generic "Dear tenant" was left in when the merge field was added)
- Missing space after "Dear tenant," before next word
- `info@crownkeyrealty.com` — wrong email (should be `admin@`)
- Subject uses `property.name` — verify this is the correct LeadSimple field

---

## Template 4 — Is there a Combination Lock Box

**Sends:** 0 | **Files:** 0
**Subject:** `Confirm Combination Lock Box`
**Recipient:** Tenant (no name salutation — "Good Day,")

**Body (preview — full body captured in prior session):**
> Good Day, We have received your notice to vacate on or before {{process.move_out_date | default}}. To help make your move out as pain free as possible, please confirm (with a photo) that there is a combination lockbox on the PGE meter. If there is a b[ox, please check to see that it opens with code 5573]...

**Bugs:**
- **Typo:** "understant" (should be "understand") — confirmed in prior session extraction
- `$250` holdover — conflicts with Templates 1 and 8 ($200) and 16/17 ($150)
- No tenant name in greeting — "Good Day," is impersonal
- 0 sends — this is the older template; Template 23 (92 sends) is the active version
- Code 5573 — **intentional**, confirmed by Susan (initial lockbox code, changed at move-in)

---

## Template 5 — Move Out Instructions

**Sends:** 1 | **Files:** 0
**Subject:** `Move Out Instructions`
**Recipient:** Tenant (addressed as `{{tenants.full_name}}`)

**Body (preview — full body captured in prior session):**
> {{tenants.full_name}}, I hope this message finds you well. As your lease for {{property.address}} approaches its conclusion, we want to provide you with clear move-out instructions to ensure a smooth transition. Kindly note the following: Property Condi[tion, cleaning requirements, etc.]...

**Bugs:**
- No salutation word — starts directly with `{{tenants.full_name}},` (no "Dear" or "Hi")
- `{{property.address}}` — missing `| default` fallback
- `{{tenants.full_name}}` — uses full name (not personalized first-name approach)
- 1 send — low use, likely replaced by Templates 16/17

---

## Template 6 — Move Out Reminder - One Week Notice

**Sends:** 17 | **Files:** 0
**Subject:** `Reminder: Move-Out in One Week`
**Recipient:** Tenant

**Body (preview — full body captured in prior session):**
> Hi {{tenants.all.first_name | there}}! I hope this message finds you well. This is a friendly reminder that your move-out date for {{property.address}} is just one week away. We appreciate your cooperation in ensuring a smooth transition. As you prepare[, please complete these steps: 1. Clean property, 2. Return keys, 3. Submit forwarding address, 4...]...

**Bugs:**
- `{{property.address}}` — missing `| default` fallback
- 4-item checklist (specific items captured in prior session)
- **Same subject line as Template 7** — could cause confusion if both are triggered

---

## Template 7 — Move Out Reminder - One Week Notice with Inspection Reminder

**Sends:** 32 | **Files:** 0
**Subject:** `Reminder: Move-Out in One Week`
**Recipient:** Tenant

**Body (preview — same opener as Template 6):**
> Hi {{tenants.all.first_name | there}}! I hope this message finds you well. This is a friendly reminder that your move-out date for {{property.address}} is just one week away. We appreciate your cooperation in ensuring a smooth transition. As you prepare[...adds "Complete self inspection" as item 1 before other checklist items]...

**Bugs:**
- **IDENTICAL SUBJECT to Template 6** — `Reminder: Move-Out in One Week` — tenants (or the system) cannot distinguish between the two versions
- `{{property.address}}` — missing `| default` fallback
- This version adds a "Complete self inspection" step at the top of the checklist vs. Template 6
- Template 7 has more sends (32 vs. 17) — the inspection reminder version is the preferred one

---

## Template 8 — Move Out Tomorrow - Final Reminder

**Sends:** 54 | **Files:** 0
**Subject:** `Final Reminder: Move-Out Tomorrow`
**Recipient:** Tenant (addressed as `{{tenants.full_name}}`)

**Body (preview — full body captured in prior session):**
> {{tenants.full_name}}, I hope this message finds you well. Tomorrow marks the scheduled move-out day for {{property.address}}, and we wanted to send you a final reminder. Please ensure the following: 1. Have the property professionally cleaned...

**Bugs:**
- No salutation word — starts directly with `{{tenants.full_name}},`
- `{{tenants.full_name}}` — uses full name instead of first name
- `$200/day` holdover — conflicts with $250 in Templates 4 and 23, and $150 in Templates 16/17
- `{{property.address}}` — likely missing `| default` (confirm)

---

## Template 9 — (Owner) Early Termination Notice

**Sends:** 13 | **Files:** 0
**Subject:** `Early Termination at {{property.address | default}}`
**Recipient:** Owner

**Body (preview — full body captured in prior session):**
> Dear {{owners.first_name | default}}, Early termination of the original term of the lease has been requested by the tenant at {{property.address | default}}, also known as a lease break. The tenant shall be responsible for rent, releasing fees, advertisi[ng costs, and potentially paint and carpet per Fair Housing guidelines]...

**Bugs:**
- Paint/carpet language references Fair Housing policy — Mason confirmed this content in prior governance review
- Minor: "also known as a lease break" — could be cleaner as a separate sentence
- No bugs flagged in Fair Housing scan during extraction

---

## Template 10 — (Owner) Tenant has given notice to vacate [ACTIVE]

**Sends:** 73 | **Files:** 0
**Subject:** `Tenant has given notice to vacate {{property.street}}`
**Recipient:** Owner

**Body (preview — full body captured in prior session):**
> Hi {{owners.all.first_name}}, We have received a notice from the tenant at {{property.street | default}}. The date given for move out of the tenant is {{process.move_out_date | default}} To ensure future tenant satisfaction, we will conduct a home as[sessment at $175/hr]...

**Bugs:**
- **Extra space** in `{{property.street  }}` (extra space inside merge field — may not render correctly)
- `$175/hr assessment fee` — hardcoded dollar amount (should this be variable?)
- Missing period after `{{process.move_out_date | default}}` before next sentence
- Subject uses `{{property.street}}` (no `| default`) while body uses `{{property.street | default}}` — inconsistent

---

## Template 11 — (Owner) Tenant has given notice to vacate [BROKEN ALTERNATE]

**Sends:** 0 | **Files:** 0
**Subject:** `Tenant has given notice to vacate {{property.street}}`
**Recipient:** Owner (same subject as Template 10)

**Body (preview):**
> {{Hi {{owners.all.first_name}}, We have received a notice from the tenant at {{property.street}}...

**Bugs:**
- **CRITICAL — Broken merge field syntax:** `{{Hi {{owners.all.first_name}},` — the word "Hi" is trapped inside the merge field opening brackets. This is invalid LeadSimple syntax. The email would render broken output.
- Never sent (0 sends) — confirms it was never used in production
- **Action:** Delete this template. Template 10 (73 sends) is the correct active version.

---

## Template 12 — (Owner) Tenant Moved Out - Next Steps [ACTIVE]

**Sends:** 51 | **Files:** 0
**Subject:** `Tenant Moved Out - Next Steps`
**Recipient:** Owner

**Body (preview — full body captured in prior session):**
> Hi {{owners.all.first_name}}, The tenant has vacated the property at {{property.address | default}}. We will have our field assessor go evaluate what needs to be done, if anything, beyond normal cleaning. Please be advised, that if the carpet is older...

**Bugs:**
- **Hardcoded staff name "Abigail"** — appears in body as the named contact (e.g., "contact Abigail at...") — must be replaced with a team role or merge field
- `info@crownkeyrealty.com` — wrong email (should be `admin@`)
- Comma splice: "Please be advised, that if the carpet is older" — comma unnecessary

---

## Template 13 — (Owner) Tenant Moved Out - Next Steps [DUPLICATE]

**Sends:** 0 | **Files:** 0
**Subject:** `Tenant Moved Out - Next Steps`
**Recipient:** Owner

**Body:** Identical to Template 12.

**Bugs:**
- **TRUE DUPLICATE** of Template 12 (confirmed in prior session — same subject, same body, different record)
- 0 sends — never used
- **Action:** Delete this template.

---

## Template 14 — Security Deposit Disbursement Option

**Sends:** 22 | **Files:** 1 (attached)
**Subject:** `Move out request received - Complete your Security Deposit Disbursement Option for {{property.address | default}}`
**Recipient:** Tenant (addressed as `{{tenants.full_name | default}}`)

**Body (captured via get_page_text in prior session):**
> Dear tenants: {{tenants.full_name | default}}
>
> We are preparing to disburse the security deposit for the property and would like to confirm how you would like the funds to be distributed. Please review the options below and let us know which you prefer:
>
> **Option 1 — Single Disbursement:** [All funds disbursed to one person/account]
>
> **Option 2 — Split Disbursement:** [Funds split among multiple tenants] — must be requested within 3 days
>
> [Instructions for each option, file attachment included]

**Bugs:**
- Greeting format: "Dear tenants: {{tenants.full_name | default}}" — unusual punctuation, reads awkwardly ("Dear tenants: John Smith,")
- `{{tenants.full_name | default}}` — uses full name, not first name
- Long subject line — may be truncated in some email clients
- 3-day deadline for split disbursement option — time-sensitive; confirm this is the intended policy

---

## Template 15 — (Tenant) Follow Up Regarding Lockbox

**Sends:** 38 | **Files:** 0
**Subject:** `Reminder: Please Check For Lockbox At Property`
**Recipient:** Tenant

**Body (captured in prior session):**
> Dear {{tenants.first_name | default}}, We still need to hear back from you confirming whether there is a lockbox present at the property. To help make your move out as pain free as possible, please confirm (with a photo) that there is a combination lockbox on the PGE meter. If there is a box, please check to see that it opens with code 5573. If there is no lockbox, please reply to this email and let us know and one will be installed within the next week.
>
> **If there is not have a lockbox installed at move out**, you will need to drop keys off at our office. 44 W 11th Street, Tracy CA 95376 to relinquish possession.

**Bugs:**
- **Grammar error:** "If there is not have a lockbox" — should be "If there is not a lockbox"
- Hardcoded office address: `44 W 11th Street, Tracy CA 95376` — verify if still current
- Code 5573 — intentional (confirmed by Susan)
- Formatting: bold applied to the sentence with the grammar error — will draw attention to the mistake

---

## Template 16 — (Tenant) Move Out Date & Instructions [OLD VERSION]

**Sends:** 1 | **Files:** 0
**Subject:** `Move Out Date & Instructions`
**Recipient:** Tenant

**Body:**
> Dear {{tenants.first_name | default}},
>
> RE: {{property.address | default}}Attached are move-out instructions.
>
> Please be advised that a professional carpet cleaning company needs to be used, the receipt must be submitted to Crown Key Realty, Inc. Renting a carpet cleaning machine is not acceptable.
>
> We advise hiring a professional cleaning service and providing us with their name. We can order both carpet cleaning and house cleaning services for you assuring the cleaning is done correctly. Our vendor cost estimates between $500 and $650 for house cleaning. If you choose to use your own vendors please provide the receipt. If we notice something is not cleaned properly we may call your company and ask them to come back or send our own cleaners at your expense. Please keep in mind this needs to be completed PRIOR to by your termination (move out) date. Your account will be charged a per diem for every day past the move out date it takes to clean the property properly.
>
> As a reminder utilities are not to be disconnected until AFTER KEYS ARE RETURNED and the lease has ended. You are responsible for utilities until the last day of your lease no matter when keys are returned. Your lease is not considered ended until KEYS ARE RETURNED. You must vacate by noon, of your last day, or you will be charged for an extra day plus a $150 holdover fee. Please drop keys at the office of Crown Key Realty, Inc 44 W 11th Street, Tracy CA 95376 (or if there is a combination lockbox on your PGE meter you may put a door key inside. If there is a lockbox you will need to Text 209-627-0257 to notify the office that you have officially vacated the property by depositing the key into the lockbox. All additional keys, mailbox key, garage remotes should be left inside a kitchen drawer. Missing keys and remotes will result in additional deductions from your security deposit.
>
> Return the following minimum. Charge if not returned. 2 door keys. $25/each1 garage door remote $751 mail key $75(key to any padlock or additional locks) Garbage left on-premises. If garbage has been left, if garbage cans are over full, if garbage is not in the correct can, etc. You will be charged $750 depending on the items left at the property for garbage disposal. Please be sure garbage cans are left at the curb to be emptied as appropriate. Text 209-627-0257 if a service call will be needed to bring the cans back inside from the curb after you have vacated. $75 fee to bring cans in or take them out.
>
> Crown Key Realty Inc will not do a final inspection of the property until the property is vacant. Crown Key Realty Inc will only do a final inspection with any one else present. If you'd like an in person "pre-inspection done" ($75) please email info@crownkeyrealty.com to request a preliminary inspection 2 weeks prior to the move-out date. We will send a link for a pre-move out inspection for you to complete 2 weeks prior to vacating.
>
> If you have any further questions please do not hesitate to contact our Tenant Care Coordinator at info@crownkeyrealty.com
>
> Thank you and we wish you all the best.

**Bugs:**
- **No space** between `{{property.address | default}}` and "Attached" — runs together
- **Grammar:** "PRIOR to by your termination" — should be "PRIOR to your termination"
- **$150 holdover fee** — inconsistent with other templates ($200 and $250 elsewhere)
- **Unclosed parenthesis** in keys paragraph: "Please drop keys at the office... (or if there is a combination lockbox..." — parenthesis never closed
- **Broken key list formatting:** "2 door keys. $25/each1 garage door remote $751 mail key $75" — runs together without line breaks
- **Ambiguous wording:** "will only do a final inspection with any one else present" — likely means "will NOT do a final inspection with anyone else present"
- `info@crownkeyrealty.com` — wrong email (x2)
- Hardcoded phone: `209-627-0257` (x2)
- Hardcoded office address: `44 W 11th Street, Tracy CA 95376`
- 1 send — **this is the old version**, replaced by Template 17 (81 sends)

---

## Template 17 — (Tenant) Move Out Date & Instructions 6.23 [ACTIVE VERSION]

**Sends:** 81 | **Files:** 3 (ckrpm_mo..., notice_o..., MOVE_OUT...)
**Subject:** `Move Out Date & Instructions`
**Recipient:** Tenant

**Body:**
> Dear {{tenants.first_name | default}},
>
> RE: {{property.address | default}}
>
> Attached are move-out instructions.
>
> We advise hiring a professional cleaning service and providing us with their name. We can order house cleaning services for you assuring the cleaning is done correctly. Our vendor cost estimates between $500 and $650 for house cleaning. If you choose to use your own vendor please provide the receipt. If we notice something is not cleaned properly we may call your company and ask them to come back or send our own cleaners at your expense. Please keep in mind this needs to be completed PRIOR to by your termination (move out) date. Your account will be charged a per diem for every day past the move out date it takes to clean the property properly.
>
> As a reminder utilities are not to be disconnected until AFTER KEYS ARE RETURNED and the lease has ended. You are responsible for utilities until the last day of your lease no matter when keys are returned.
>
> Your lease is not considered ended until KEYS ARE RETURNED. You must vacate by noon, of your last day, or you will be charged for an extra day plus a $150 holdover fee. Please drop keys at the office of Crown Key Realty, Inc 44 W 11th Street, Tracy CA 95376 (or if there is a combination lockbox on your PGE meter you may put a door key inside. If there is a lockbox you will need to Text 209-627-0257 to notify the office that you have officially vacated the property by depositing the key into the lockbox. All additional keys, mailbox key, garage remotes should be left inside a kitchen drawer. Missing keys and remotes will result in additional deductions from your security deposit.
>
> Return the following minimum. Charge if not returned.
> 2 door keys. $25/each
> 1 garage door remote $75
> 1 mail key $75
> (key to any padlock or additional locks)
>
> Garbage left on-premises. If garbage has been left, if garbage cans are over full, if garbage is not in the correct can, etc. You will be charged $750 depending on the items left at the property for garbage disposal. Please be sure garbage cans are left at the curb to be emptied as appropriate. Text 209-627-0257 if a service call will be needed to bring the cans back inside from the curb after you have vacated. $75 fee to bring cans in or take them out.
>
> Crown Key Realty Inc will not do a final inspection of the property until the property is vacant. Crown Key Realty Inc will only do a final inspection with any one else present. If you'd like an in person "pre-inspection done" ($75) please email info@crownkeyrealty.com to request a preliminary inspection 2 weeks prior to the move-out date. We will send a link for a pre-move out inspection for you to complete 2 weeks prior to vacating.
>
> If you have any further questions please do not hesitate to contact our Tenant Care Coordinator at info@crownkeyrealty.com
>
> Thank you and we wish you all the best.

**Bugs (same core issues as Template 16, some fixed):**
- **Grammar:** "PRIOR to by your termination" — still present (copied from Template 16)
- **$150 holdover fee** — still inconsistent
- **Unclosed parenthesis** in keys paragraph — still present
- **Ambiguous wording:** "will only do a final inspection with any one else present" — same issue
- `info@crownkeyrealty.com` — wrong email (x2)
- Hardcoded phone: `209-627-0257` (x2)
- Hardcoded office address: `44 W 11th Street, Tracy CA 95376`
- **Fixed vs. Template 16:** RE line now properly separated, key list now has line breaks, carpet-cleaning-machine paragraph removed
- This is the active version — 81 sends, 3 attachments

---

## Template 18 — Tenant notice of termination - 30, 60 day - owner moving in

**Sends:** 0 | **Files:** 0
**Subject:** `Non-Renewal of Lease {{property.address | default}}`
**Recipient:** Tenant

**Body:**
> Subject: Important Notice Regarding Your Lease Renewal
>
> Dear ,{{tenants.all.first_name | default}},
>
> I hope this message finds you well. As your property management team, it is our duty to keep you informed about matters affecting your tenancy. Today, I write to share an important update regarding your current lease at {{property.address | default}} .
>
> After careful consideration and planning, the property owner has decided to move back into their home. As a result, we regret to inform you that we will not be able to renew your lease upon its expiration on {{unit.lease_end_date | default}} . We understand that this news may come as a surprise and want to assure you of our full support during this transition period.
>
> Recognizing the impact of this decision, we wish to offer you flexibility in planning your next steps. Should you choose to relocate prior to the end of your lease term, you are welcome to do so with a 30-day notice, without incurring any penalties. This option is provided to ease any potential inconvenience and to allow you ample time to secure a new home that meets your needs.
>
> Please rest assured that our team is here to assist you throughout this process. Whether you have questions, need guidance on moving logistics, or require assistance in finding a new property, we are committed to providing the support you need.
>
> To discuss this notice further or to initiate your moving process, please feel free to reach out to us at info@crownkeyrealty.com. We are here to help and want to make this transition as smooth and stress-free as possible for you.
>
> Thank you for your understanding and cooperation. We genuinely appreciate having you as a tenant and wish you all the best in your future endeavors.
>
> Warm regards,
>
> Crown Key Realty Team
> Dre 01490605
> info@crownkeyrealty.com
> 209-627-0257

**Bugs:**
- **Subject line typed into body:** "Subject: Important Notice Regarding Your Lease Renewal" appears as the first line of the message body — this text will be sent to the tenant verbatim
- **Spurious comma before name:** "Dear ,{{tenants.all.first_name | default}}," — comma between "Dear" and the merge field
- **Trailing spaces before periods:** `{{property.address | default}} .` and `{{unit.lease_end_date | default}} .` — space before the period
- `info@crownkeyrealty.com` — wrong email (x2)
- **Hardcoded full signature block:** "Crown Key Realty Team / Dre 01490605 / info@crownkeyrealty.com / 209-627-0257" — LeadSimple auto-adds a signature, so this creates a DOUBLE signature with wrong email
- **⚠️ Legal flag — Mason review required:** This is an owner-move-in termination notice. Under California law, owner move-in terminations have specific notice requirements, required language, relocation assistance obligations, and Just Cause protections under AB 1482. This template as written is informal and does NOT include required legal notice language. **Do not use until Mason reviews.**
- 0 sends — never used in production

---

## Template 19 — (Tenant) Notification of Early Lease Termination [VERSION A]

**Sends:** 0 | **Files:** 0
**Subject:** `Notification of Early Lease Termination {{property.address | default}}`
**Recipient:** Tenant

**Body:**
> Dear {{tenants.all.first_name}},
>
> We received your notice to terminate your lease early. Please be advised that you are responsible for the rent until a new tenant is located.   You are also responsible for all utilities until a replacement is located.  We will not show the property until it is vacant. We will however, be listed on our website as coming soon.
>
> There is a $850 lease break fee.
>
> We will send further move out instructions in a separate email.
>
> Please let us know if anything changes or you have any questions.

**Bugs:**
- `{{tenants.all.first_name}}` — missing `| default` fallback
- **Confusing sentence:** "We will however, be listed on our website as coming soon" — missing subject, reads as if Crown Key will be listed on a website. Should be "We will, however, list it on our website as coming soon."
- **$850 lease break fee** — hardcoded amount (may not apply to every situation)
- Double spaces between sentences (minor formatting)
- 0 sends — never used in production

---

## Template 20 — (Tenant) Notification of Early Lease Termination [VERSION B, NEAR-DUPLICATE]

**Sends:** 0 | **Files:** 0
**Subject:** `Notification of Early Lease Termination {{property.address | default}}`
**Recipient:** Tenant

**Body:**
> Dear {{tenants.all.first_name}},
>
> We received your notice to terminate your lease early.
> Please be advised that you are responsible for the rent until a new tenant is located.
> You are also responsible for all utilities until a replacement is located.
> We will not show the property until it is vacant. We will however, be listed on our website as coming soon.
> There is a $850 lease break fee.
>
> We will send further move out instructions in a separate email.
>
> Please let us know if anything changes or you have any questions.

**Bugs:** Same as Template 19. The only difference: Template 20 uses line breaks between sentences; Template 19 uses double-spaces. Content is otherwise identical.

**Action:** Both have 0 sends. Consolidate into one improved version and delete the other.

---

## Template 21 — (Tenant) reminder of self inspection

**Sends:** 0 | **Files:** 0
**Subject:** `Reminder: Complete Self Inspection`
**Recipient:** Tenant

**Body:**
> Hi {{tenants.all.first_name | default}},
>
> Please don't forget to complete the property condition inspection sent to you via email through Z Inspector. This inspection is for your record as well as ours and is very important for documenting the property condition to ensure that all make ready costs are accurately and fairly assessed.
>
> If you have any questions please don't hesitate to reach out!
>
> Best,

**Bugs:**
- **Internal jargon:** "make ready costs" — tenants won't know this term. Use "move-out costs" or "charges after move-out"
- **Z Inspector not explained:** Tenant is told to check an email from "Z Inspector" with no context about what Z Inspector is or how to access the link
- **Incomplete sign-off:** "Best," with no name or company name following it (though LeadSimple auto-adds signature, the hanging "Best," looks unprofessional)
- 0 sends — never used in production; the inspection link should be sent via Z Inspector directly

---

## Template 22 — (Tenants) Forwarding address needed

**Sends:** 47 | **Files:** 0
**Subject:** `Action Needed: Confirm Forwarding Address`
**Recipient:** Tenant

**Body:**
> Dear {{tenants.first_name | default}},
>
> Your move out date is coming up on {{process.move_out_date | default}}.
>
> Before you move out we will need a forwarding address for disbursement of your Security Deposit- This can be submitted through your tenant portal or by replying to this email.
>
> Please watch for further move out instructions via separate emails.
>
> Crown Key Realty Inc

**Bugs:**
- **Punctuation:** "Security Deposit-" — hyphen instead of period. Should be "Security Deposit. This can be submitted..."
- **Hardcoded partial sign-off:** "Crown Key Realty Inc" — LeadSimple auto-adds a full signature, so this creates an awkward half-signature before the auto-signature
- Otherwise clean and functional (47 sends, 98% open rate)

---

## Template 23 — (Tenants) Is there a Combination Lock Box [ACTIVE — MOST USED]

**Sends:** 92 | **Files:** 0
**Subject:** `Action Needed: Confirm Lockbox For Key Drop Off`
**Recipient:** Tenant

**Body:**
> Dear {{tenants.first_name | default}},
>
> We have received your notice to vacate on or before {{process.move_out_date | default}}.
>
> To help make your move out as pain free as possible, please confirm (with a photo) that there is a combination lockbox on the PGE meter. If there is a box, please check to see that it opens with code 5573. If there is no lockbox, please reply to this email and let us know and one will be installed within the next week.
>
> Why this is helpful for you: When you are vacating you will put ONE DOOR key in the combination box, and all remaining keys, (door, mail, garage remotes) on the kitchen counter. Upon move out you will need to send a photo via text of the key in the combination box, to confirm you have relinquished possession of the property.
>
> If there is not have a lockbox installed at move out, you will need to drop keys off at our office. 44 W 11th Street, Tracy CA 95376 to relinquish possession.
>
> Please be advised your tenancy is NOT CONSIDERED completed until the keys have been returned.
>
> In the event that you do not vacate on or before {{process.move_out_date | default}} you will be charged a $250 hold over fee, and daily rent for every day past {{process.move_out_date | default}} that the house is not vacated. Please remember, the property is not considered relinquished/vacant until we have the keys.
>
> We do understand plans change and timing gets delayed. If your move out is going to be delayed past your move out date, to prevent the hold over fee Crown Key Realty must be notified 7 days in advance.
>
> Please watch for further move out instructions via separate emails.
>
> Crown Key Realty Inc

**Bugs:**
- **Grammar error (same as Template 15):** "If there is not have a lockbox" — should be "If there is not a lockbox"
- **$250 holdover fee** — conflicts with $200 (Templates 1, 8) and $150 (Templates 16, 17)
- Hardcoded office address: `44 W 11th Street, Tracy CA 95376`
- **Hardcoded partial sign-off:** "Crown Key Realty Inc" before auto-signature
- Code 5573 — intentional (confirmed by Susan)
- **This is the most-used template in T 03 (92 sends).** The grammar error has been sent to 92 tenants.

---

## Template 24 — (Tenants) - Notice to Vacate

**Sends:** 6 | **Files:** 0
**Subject:** `Notice to Vacate Property`
**Recipient:** Tenant

**Body:**
> Dear {{tenants.full_name | default}},
>
> This is to inform you that we are requesting the property at {{property.address | default}} to be vacated on {{process.move_out_date}}.
>
> If you have any questions or require further clarification, feel free to reach out to us.
>
> Thank you for your understanding and cooperation in this matter.
>
> We will be in touch soon with instructions.

**Bugs:**
- `{{process.move_out_date}}` — missing `| default` fallback (if move-out date isn't set, field will be blank)
- `{{tenants.full_name | default}}` — uses full name instead of first name
- **⚠️ Legal flag — Mason review recommended:** If this template is being used as a formal legal Notice to Vacate, it is entirely insufficient under California law. A proper notice to vacate requires specific language, proper notice periods (30/60/90 days depending on tenancy length), service method, and basis for termination. This template should be clearly labeled as an informal communication, not a legal notice. If a legal notice to vacate is needed, it must be served separately per California Code.
- 6 sends — occasionally used

---

## Template 25 — (Tenant) WRITTEN 30 Day Notice not yet received [VERSION A]

**Sends:** 0 | **Files:** 0
**Subject:** `30 Day Notice Required for {{property.street}}`
**Recipient:** Tenant

**Body:**
> Hi {{tenants.all.first_name}},
>
> You have notified us of your intention to move out of {{property.street}} but we have not yet received your formal 30 day notice. Please email us at info@crownkeyrealty.com or log in to your tenant portal to submit your formal 30 day notice.
>
> Further information will follow regarding your move out process.
>
> Thank you
>
> Crown Key Realty Inc
> 209-627-0257

**Bugs:**
- `{{tenants.all.first_name}}` — missing `| default` fallback
- `{{property.street}}` in subject — missing `| default` fallback
- `info@crownkeyrealty.com` — wrong email (should be `admin@`)
- **Hardcoded double sign-off:** "Crown Key Realty Inc / 209-627-0257" before LeadSimple auto-signature
- 0 sends — never used

---

## Template 26 — (Tenant) WRITTEN 30 Day Notice not yet received 6.23 [VERSION B]

**Sends:** 0 | **Files:** 0
**Subject:** `30 Day Notice Required for {{property.street}}`
**Recipient:** Tenant

**Body:**
> Hi {{tenants.all.first_name}},
>
> You have notified us of your intention to move out of {{property.street}} but we have not yet received your formal 30 day notice. Please email us at infor@crownkeyrealty.com or submit via your tenant ledger to submit your formal 30 day notice.
>
> Further information will follow regarding your move out process.
>
> Thank you
>
> Crown Key Realty Inc
> 209-627-0257

**Bugs:**
- `{{tenants.all.first_name}}` — missing `| default` fallback
- `{{property.street}}` in subject — missing `| default` fallback
- **Typo in email:** `infor@crownkeyrealty.com` — "infor" is a typo (and wrong domain — should be `admin@crownkeyrealty.com`)
- **Redundant phrasing:** "Please email us at... or submit via your tenant ledger to submit your formal 30 day notice" — "to submit" appears twice
- **Hardcoded double sign-off:** "Crown Key Realty Inc / 209-627-0257" before LeadSimple auto-signature
- 0 sends — never used
- Same subject and nearly identical content to Template 25 — another near-duplicate pair

---

## T 03 Bug Summary

**Structural problems:**
| Issue | Templates |
|---|---|
| Wrong email `info@` | 3, 12, 14, 15, 16, 17, 18, 25 |
| Typo email `infor@` | 26 |
| Hardcoded double sign-off | 22, 23, 25, 26 |
| Hardcoded full signature block | 18 |
| Hardcoded office address | 15, 16, 17, 23 |
| Hardcoded phone 209-627-0257 | 16, 17, 18, 25, 26 |
| Hardcoded staff name "Abigail" | 12 |

**Content/grammar bugs:**
| Issue | Templates |
|---|---|
| "If there is not have a lockbox" | 15, 23 |
| "PRIOR to by your termination" | 16, 17 |
| Double greeting ("Dear X, Dear tenant,") | 3 |
| Subject line typed into body | 18 |
| Spurious comma "Dear ,{{name}}" | 18 |
| Broken merge field `{{Hi {{name}}` | 11 |
| Missing `| default` on name | 10, 11, 19, 20, 25, 26 |
| Missing `| default` on dates/address | 8, 24 |
| Typo "understant" | 4 |
| "make ready costs" (internal jargon) | 21 |
| Ambiguous "only do a final inspection with any one else" | 16, 17 |

**Inconsistent holdover fees:**
| Amount | Templates |
|---|---|
| $150 holdover fee | 16, 17 |
| $200/day holdover | 1, 8 |
| $250 holdover fee | 4, 23 |
**Action: Susan must confirm which amount is correct and when each applies.**

**Duplicates and dead templates to delete:**
| Template | Action |
|---|---|
| Template 11 — broken alternate | Delete |
| Template 13 — true duplicate | Delete |
| Template 4 — replaced by Template 23 | Consider deleting (0 sends) |
| Template 16 — replaced by Template 17 | Consider deleting (1 send) |
| Templates 19 & 20 — near-duplicate pair | Consolidate to one, delete other |
| Templates 25 & 26 — near-duplicate pair | Consolidate to one, delete other |

**Legal flags — require Mason review before use:**
- Template 18: Owner move-in termination notice — not compliant with California AB 1482 / Just Cause requirements
- Template 24: Notice to Vacate — if used as a formal legal notice, it lacks required California notice language

**Fair Housing note:** T 03 templates are operational/logistical in nature. No protected class language found in templates reviewed. Template 9 (Early Termination) references paint/carpet policy which was previously reviewed and cleared by Mason.

---

---

# T 01 BSG Delinquency 2point0

**Process status:** Live Mode
**Stage count:** 11 stages, **8 email templates**
**Extraction date:** 2026-06-26

**Overall quality note:** T 01 is the best-written process in the system so far. Owner templates (3, 5, 6, 7) are professional, warm, and well-structured. Tenant templates (1, 2, 4, 8) are appropriately firm. The main issues are merge field inconsistencies and one subject-line typo.

**⚠️ Merge field inconsistency:** Tenant name merge field is inconsistent across the process:
- Templates 1, 2 use `{{tenant.all.first_name}}` (no `| default`)
- Templates 4, 8 use `{{tenant.all.first_name | default}}` and `{{tenant.primary.first_name | default}}` respectively
- Template 8 uses a completely different field: `{{tenant.primary.first_name}}` vs. `{{tenant.all.first_name}}`
**Action:** Standardize to `{{tenant.all.first_name | default}}` throughout.

---

## Template 1 — Day 3: (Tenant) Payment Due Reminder

**Sends:** 734 | **Files:** 0
**Subject:** `Reminder - Rental Payment Past Due`
**Recipient:** Tenant

**Body:**
> Dear {{tenant.all.first_name}},
>
> This is a reminder that your rent for this month was due on the 1st. Your current delinquent rent is: {{unit.delinquent_rent | default}}.
>
> Please log into your tenant portal to make your payment as soon as possible to avoid late fees. If you have already remitted payment, please ignore this email.
>
> Thank you!
> {{our_company_name}}

**Bugs:**
- `{{tenant.all.first_name}}` — missing `| default` fallback
- `{{our_company_name}}` — missing `| default` (Template 2 has it; inconsistent)
- **Word choice:** "delinquent rent" — unnecessarily harsh language to use directly with tenants. Consider "outstanding balance" or "amount due"
- 734 sends — the highest-volume email in this process. This is sent to every late tenant on Day 3.

---

## Template 2 — Day 5: (Tenant) Late Charges Incurred

**Sends:** 207 | **Files:** 0
**Subject:** `Unpaid Charges for {{property.street}}`
**Recipient:** Tenant

**Body:**
> Dear {{tenant.all.first_name}},
>
> Late fees of $150 have been applied per your lease agreement. Your delinquent rent balance is {{unit.delinquent_rent | default}}. Please log in to your tenant portal to view your total balance.
>
> Please pay your balance or contact us to avoid risking an eviction.
>
> Sincerely,
> {{our_company_name | default}}

**Bugs:**
- `{{tenant.all.first_name}}` — missing `| default`
- `{{property.street}}` in subject — missing `| default`
- `$150` hardcoded late fee — should be confirmed as the universal Crown Key late fee or made a variable
- **Word choice:** "delinquent rent balance" and "risking an eviction" — direct but appropriate for Day 5
- Sign-off: `{{our_company_name | default}}` — has `| default` (Template 1 doesn't, inconsistent)
- 207 sends — 28% of Day 3 tenants are still delinquent by Day 5

---

## Template 3 — Day 9 (Owner) Pay or quit going out soon

**Sends:** 18 | **Files:** 0
**Subject:** `Delinquent Rent | {{property.address | default}}`
**Recipient:** Owner

**Body:**
> Dear {{owner.first_name | default}},
>
> I hope this message finds you well.
>
> We wanted to inform you that the tenant at your property located at {{property.address | default}} is currently late on their rent payment, with an outstanding balance of {{unit.amount_receivable | default}}. Not to worry - we're working with the tenant to get the payment completed as soon as possible.
>
> No action is required from you at this time, but we believe in keeping you fully informed. Please be aware that, due to the late rent, there may be a delay in your payout this month. We are actively following up with the tenant and will keep you updated with any new developments.
>
> We will update you as soon as payment is made. Please keep in mind we will pay you as soon as payment clears the bank.
>
> Thank you for entrusting us with the management of your property. We appreciate the opportunity to serve you.
>
> Sincerely,
> {{our_company_name | default}}

**Bugs:** None significant. This is one of the best-written templates in the system.
- "Not to worry - we're working on it" — excellent owner tone: proactive, reassuring, expert
- Sets payout delay expectation upfront — owners appreciate this transparency
- 106% open rate — forwarded by recipients (shared with spouse/business partner)
- Minor: dash in "Not to worry - we're" could be an em dash

---

## Template 4 — Day 9: (Tenant) Email of pay or quit (ADD ATTACHMENT)

**Sends:** 21 | **Files:** 0 (manual attachment required)
**Subject:** `3 Day Pay or Quit Notice | {{property.address | default}}`
**Recipient:** Tenant

**Body:**
> Dear {{tenant.all.first_name | default}},
>
> We regret to inform you that due to your unpaid balance of {{unit.amount_receivable | default}}, we will be posting a pay or quit notice tomorrow and you are at risk of being evicted from the property.
>
> Please pay your balance or contact us immediately to avoid eviction proceedings.
>
> Sincerely,
> {{our_company_name | default}}

**Bugs:**
- **Process risk:** "(ADD ATTACHMENT)" is in the template name as a team reminder — there is no system enforcement. If a team member sends without attaching the 3-Day Notice PDF, the email goes out with no attachment. A missed attachment on a legal notice is a significant operational risk.
- Template body itself is clean — appropriate firm tone for Day 9
- All merge fields have `| default` — good
- **Legal note:** The email says "we will be POSTING a pay or quit notice tomorrow" — this is informational, not the notice itself. The formal notice must be properly served per California CCP §1161. This email is a heads-up; the actual notice delivery must happen through proper channels.
- 21 sends

---

## Template 5 — (Owner) Eviction Recommended

**Sends:** 0 | **Files:** 0
**Subject:** `Eviction Recommended | {{property.address | default}}`
**Recipient:** Owner

**Body:**
> Dear {{owner.first_name | default}},
>
> I hope this message finds you well.
>
> I am writing to inform you of a situation regarding your property at {{property.address | default}}. Unfortunately, the tenant still has an outstanding balance of {{unit.amount_receivable | default}} and has been unresponsive to our attempts at communication.
>
> We have taken the necessary step of posting a 3-day pay or quit notice, which has since expired without any response or payment from the tenant.
>
> Given the lack of response and the ongoing delinquency, we recommend proceeding with the eviction process. As stipulated in your Property Management Agreement, you will be responsible for the costs associated with this eviction. Please be assured that our actions are always taken with your best interest in mind, with the primary goal of removing the non-paying tenant so that the property can return to a profitable state.
>
> Unless we hear otherwise from you by {{process.owner_must_respond_by | default}}, we will move forward with the eviction process. If you have any questions or concerns, please do not hesitate to contact me directly.
>
> Thank you for your attention to this matter, and for your continued trust in our management of your property.
>
> Sincerely,
> {{our_company_name | default}}

**Bugs:** None. This is excellent writing — clear, professional, legally sound framing.
- Uses `{{process.owner_must_respond_by | default}}` — process-specific deadline field, well used
- Sets out PMA cost responsibility clearly — protects Crown Key
- Default-proceed structure (move forward unless owner stops it) — appropriate for this situation
- 0 sends — reflects how rarely evictions reach this stage (good sign)
- **Governance note:** Eviction requires human owner approval. This template correctly implements the "opt-out" model — owner must respond to stop it, not respond to start it. Per Asimov governance rules, final housing decisions require human approval. The owner's explicit non-response is not ideal — ideally owner says yes. Consider adding "Please reply to confirm you authorize us to proceed."

---

## Template 6 — (Owner) Payment Plan Recommended

**Sends:** 1 | **Files:** 0
**Subject:** `Payment Plan | {{property.address | default}}`
**Recipient:** Owner

**Body:**
> Dear {{owner.first_name | default}}
>
> I hope this message finds you well.
>
> I wanted to update you regarding your property at {{property.address | default}}. As you know, the tenant has fallen behind on their rent payments, and after assessing the situation, we believe a payment plan would be a constructive way forward.
>
> Our goal is to help the tenant get back on track while protecting your interests as the property owner. We believe that a payment plan could facilitate timely payments moving forward and stabilize the situation. Your trust in our management is greatly appreciated, and we always strive to act in your best interest.
>
> Please feel free to reach out if you have any questions or concerns.
>
> Thank you for your attention to this matter.
>
> Warm regards,
> {{our_company_name | default}}

**Bugs:**
- **Missing comma** after greeting: "Dear {{owner.first_name | default}}" — no comma before the next line
- **No explicit ask for approval:** Template recommends a payment plan but doesn't ask the owner to approve or respond. If Crown Key needs owner consent before entering a payment arrangement with a tenant, this template should include a clear call to action: "Please reply to confirm you approve us to proceed with a payment plan."
- 1 send — rarely used

---

## Template 7 — (Owners) Payment Received In Full

**Sends:** 18 | **Files:** 0
**Subject:** `Tenant Payment Received | {{property.address | default}}`
**Recipient:** Owner

**Body:**
> Dear {{owner.first_name | default}},
>
> I wanted to inform you that your tenant at {{property.address | default}}, who had previously been delinquent on their rent, has now made the outstanding payment. As of today, their account is current.
>
> Please let me know if you have any questions or need additional information regarding this update.
>
> Thank you for your attention to this matter.
>
> Best regards,

**Bugs:**
- **Template name:** "(Owners)" uses plural — should be "(Owner)" to match the naming convention of other templates in this process
- Sign-off "Best regards," has no company name — LeadSimple auto-signature handles it, but compare with Templates 3 and 5 which have `{{our_company_name | default}}` before the auto-signature
- Minor inconsistency: uses "previously been delinquent" — fine for owner communication
- 18 sends — matches Template 3 (Day 9 owner notices), which makes sense: every owner who got the Day 9 notice should get this closure

---

## Template 8 — Resources prior to Eviction

**Sends:** 0 | **Files:** 1 (California rental assistance resources PDF)
**Subject:** `Payment Not Recieved - Resources`
**Recipient:** Tenant (primary tenant only)

**Body:**
> Dear {{tenant.primary.first_name | default}},
>
> As of **{{today | default}}**, we have not received your rent payment.
>
> If you are experiencing a financial hardship, we encourage you to seek assistance immediately. Attached are several resources and agencies that may be able to provide rental assistance or other support.
>
> Please be advised that if we do not hear from you within **48 hours** with a specific plan to bring your rent current, we will begin the **Unlawful Detainer (Eviction) process**.

**Bugs:**
- **TYPO in subject:** "Payment Not **Recieved**" — should be "Received"
- **Different merge field:** `{{tenant.primary.first_name}}` instead of `{{tenant.all.first_name}}` used in Templates 1-4 — this template only reaches the primary tenant, not co-tenants
- 0 sends — never used in production (possibly not yet wired into the process, or eviction situations aren't reaching this stage)
- **Positive note:** Providing California rental assistance resources is excellent practice and may be required in some California jurisdictions before an eviction filing. This template shows Crown Key cares about tenant welfare, not just collections.
- **Note on bold text:** `{{today | default}}` and "48 hours" and "Unlawful Detainer (Eviction) process" are bolded — intentional for emphasis. This is appropriate.

---

## T 01 Bug Summary

**Quick fixes:**
| Issue | Templates |
|---|---|
| Missing `\| default` on tenant name | 1, 2 |
| Missing `\| default` on company name | 1 |
| Missing `\| default` on property.street | 2 (subject) |
| Missing comma after greeting | 6 |
| Typo "Recieved" in subject | 8 |
| Inconsistent tenant merge field (`primary` vs `all`) | 8 vs 1-4 |

**Process/operational flags:**
| Issue | Template |
|---|---|
| No attachment enforcement — must manually add PDF | 4 |
| No explicit owner approval requested for payment plan | 6 |
| Eviction proceeds by default unless owner opts out | 5 |
| Template 8 never sent — verify it's wired into process | 8 |
| Template name "(Owners)" should be "(Owner)" | 7 |

**Word choice (rewrite consideration):**
- "delinquent" used to address tenants directly in Templates 1 and 2 — consider "outstanding balance" or "amount due" in improved versions

**Fair Housing note:** T 01 templates deal with rent delinquency and eviction proceedings. All templates are factual and financial in nature. Template 8 provides eviction-prevention resources. No protected class language found. Template 4 references a legal notice; ensure actual notice service complies with California CCP §1161. Template 5 eviction authorization should be confirmed through human (owner) decision, not default.

**Overall assessment:** T 01 is the strongest process in the system. The owner communication templates (3, 5, 7) are genuinely excellent — professional tone, proactive, and trust-building. The tenant templates (1, 2, 4) are functionally sound but use harsh language that could be softened without reducing firmness. Template 8 (eviction resources) is a Crown Key differentiator — keep and improve it.

---

## PROCESS: T 02 BSG Move In 2024 (Draft — 0 sends — never used)

**Status:** Draft. This process has never been activated or used. All templates show 0 sends, 0% open rate.
**Template count:** 6
**Recipients:** Tenants (5 templates) + Owners (1 template)
**Merge field namespace:** `tenants.` / `owners.` / `property.` / `unit.` / `process.`

**Process-level notes:**
- This is in Draft mode — no tenant has ever received these emails. Before activating, all bugs should be fixed.
- Templates 1 and 5 have nearly identical bodies — likely a duplicate situation requiring cleanup.
- Templates 4 and 6 both reference `https://utility-setup.com/crown-key-realty` — Susan needs to verify this URL is valid and still in use.

---

### Template 1: Move-In Reminder - Less Than 7 Days
**Subject:** Reminder: Your Move-In Date Approaching for {{property.address}}
**Sends:** 0 | **Open rate:** 0%
**Recipient:** Tenant

```
Hi {{tenants.all.first_name}},

Congratulations again on being approved for {{property.street}}! Here are the next steps and details on our move in process so we can get you moved into your new home!

You will get a combination code to a lockbox that will be on the PGE Meter. This code will enable to you access the property on {{unit.future_lease_move_in | default}}.

You will also receive a link to perform a move in inspection. You have 7 days to complete the inspection. This inspection is very important as it will document the condition of the property at move in.

If you have any further questions please do not hesitate to reach out at info@crownkeyrealty.com or 209-627-0257

Welcome to your new home.

Crown Key Realty, Inc
```

**Bugs:**
- GRAMMAR: "This code will enable to you access" → should be "enable you to access"
- WRONG EMAIL: `info@crownkeyrealty.com` → correct address is `admin@crownkeyrealty.com`
- MERGE FIELD: `{{tenants.all.first_name}}` missing `| default` fallback
- INCONSISTENCY: Subject uses `{{property.address}}`, body uses `{{property.street}}` — pick one
- NEAR-DUPLICATE: Body is identical to Template 5 — one should be deleted

---

### Template 2: Move-In Reminder - Tomorrow
**Subject:** Move-In Day Tomorrow - {{property.address}}
**Sends:** 0 | **Open rate:** 0%
**Recipient:** Tenant

```
Dear {{tenants.first_name | default}}

We hope this email finds you well and buzzing with excitement! We have some fantastic news for you – your new home is ready, and everything is set for your scheduled {{unit.future_lease_move_in | default}}!

Keys are located in the code box on the PGE meter, the code is {{unit.lockbox_code | default}}.

A move in inspection form will be emailed to you, please complete as soon as possible. If anything needs immediate attention please call the office at 209-627-0257. Remember, the property is rented in as-is cosmetic condition.

Thank you,

Tiffany Carapinha
VP of Operations
Crown Key Realty, Inc
```

**Bugs:**
- HARDCODED NAME: "Tiffany Carapinha / VP of Operations" is hardcoded in the body. The system already adds the sender's signature at the bottom — this creates a double signature. Remove the hardcoded name.
- MERGE FIELD INCONSISTENCY: Uses `{{tenants.first_name | default}}` (singular, no `.all.`) — every other template in this process uses `{{tenants.all.first_name}}`. Pick one namespace and be consistent.
- GRAMMAR: Missing comma after greeting — "Dear {{tenants.first_name | default}}" → should end with a comma
- TONE: "as soon as possible" is vague — consider adding what happens if they don't complete the inspection within 7 days

---

### Template 3: (Owner) Congrats Email - Tenant Moved In
**Subject:** Tenant moved in at {{property.street}}
**Sends:** 0 | **Open rate:** 0%
**Recipient:** Owner

```
Hi {{owners.all.first_name}},

Congratulations! The tenant has now moved into your property at {{property.street}}.

We'd love to know any feedback you can provide to our team.

Thank you

Crown Key Realty, Inc
```

**Bugs:**
- PHRASING: "We'd love to know any feedback" → "know feedback" is awkward; should be "hear any feedback" or "receive any feedback you can share"
- PUNCTUATION: "Thank you" missing comma → "Thank you,"
- MERGE FIELD: `{{owners.all.first_name}}` missing `| default` fallback
- CONTENT: Very bare — no next steps for the owner, no mention of what the move-in inspection covers, no mention of who to contact with questions

---

### Template 4: Tenant Move-In Instructions
**Subject:** Your Move-In Instructions for {{property.address}}
**Sends:** 0 | **Open rate:** 0%
**Recipient:** Tenant

```
Hi {{tenants.all.first_name}},

Congratulations again on being approved for {{property.street}}! Here are the next steps and details on our move in process so we can get you moved into your new home!

- Key Handoff: You will get a combination code to a lockbox that will be on the PGE Meter. This code will enable to you access the property on {{unit.future_lease_move_in | default}}.
- Move In Inspection: You will also receive a link to perform a move in inspection. You have 7 days to complete the inspection. This inspection is very important as it will document the condition of the property at move in.
- Maintenance Requests: Submit any non-emergency maintenance requests through our online portal here.
- Utility Setup: Before handing over the keys to your property, you must set up utilities in your name. To facilitate a smooth transition, please follow these steps:
  - Access Our Platform: Use the following link to locate and connect with the required utility providers: https://utility-setup.com/crown-key-realty
  - Input Confirmation Details: Once you've established your utility services, input the relevant account or confirmation IDs into our platform. This step ensures we're able to track and manage your utility services effectively.

If you have any further questions please do not hesitate to reach out at info@crownkeyrealty.com or 209-627-0257

Welcome to your new home.

Crown Key Realty, Inc
```

**Bugs:**
- GRAMMAR: "enable to you access" → "enable you to access" (same error as Templates 1 and 5)
- WRONG EMAIL: `info@crownkeyrealty.com` → `admin@crownkeyrealty.com`
- MERGE FIELD: `{{tenants.all.first_name}}` missing `| default`
- BROKEN LINK: "Submit any non-emergency maintenance requests through our online portal **here**" — "here" is a hyperlink but the URL wasn't captured in text extraction. Needs to be verified as still working.
- THIRD-PARTY URL: `https://utility-setup.com/crown-key-realty` — Susan needs to confirm this is still the correct utility setup platform and that the link is active
- PHRASING: "Before handing over the keys to your property" — confusing; the tenant doesn't own the property. Should say "the rental property" or "your new home"

---

### Template 5: (Tenants) Move In Instructions
**Subject:** Move in details for {{property.street}}
**Sends:** 0 | **Open rate:** 0%
**Recipient:** Tenant

```
Hi {{tenants.all.first_name}},

Congratulations again on being approved for {{property.street}}! Here are the next steps and details on our move in process so we can get you moved into your new home!

You will get a combination code to a lockbox that will be on the PGE Meter. This code will enable to you access the property on {{unit.future_lease_move_in | default}}.

You will also receive a link to perform a move in inspection. You have 7 days to complete the inspection. This inspection is very important as it will document the condition of the property at move in.

If you have any further questions please do not hesitate to reach out at info@crownkeyrealty.com or 209-627-0257

Welcome to your new home.

Crown Key Realty, Inc
```

**Bugs:** Same as Template 1 — grammar error, wrong email, missing `| default`.

⚠️ **DUPLICATE ALERT:** The body of this template is WORD FOR WORD identical to Template 1 ("Move-In Reminder - Less Than 7 Days"). The only differences are the template name and subject line. One of these should be deleted. Recommend keeping Template 4 (the bullet-point version) as the definitive move-in instructions email, and deciding which reminder schedule fits — "Less Than 7 Days" or no specific timing label.

---

### Template 6: (Tenant) Utility Companies' Contact Info - Set Up Utilities
**Subject:** How to set up utilities for {{property.street}}
**Sends:** 0 | **Open rate:** 0%
**Recipient:** Tenant

```
Hi {{tenants.all.first_name}},

You will need to transfer the following utilities for {{property.street}} to your name at least 3 days before your move in date of {{process.move_in_date}}.

Important: Utility Setup Required

Before handing over the keys to your property, you must set up utilities in your name. To facilitate a smooth transition, please follow these steps:

1. Access Our Platform: Use the following link to locate and connect with the required utility providers: https://utility-setup.com/crown-key-realty
2. Input Confirmation Details: Once you've established your utility services, input the relevant account or confirmation IDs into our platform. This step ensures we're able to track and manage your utility services effectively.

Should you have any inquiries or require assistance regarding essential utility options, our chat support feature within the provided link is readily available to assist you.
```

**Bugs:**
- MERGE FIELDS: Both `{{tenants.all.first_name}}` and `{{process.move_in_date}}` are missing `| default` fallback
- PHRASING: "Before handing over the keys to your property" — same issue as Template 4; tenant doesn't own the property
- THIRD-PARTY URL: `https://utility-setup.com/crown-key-realty` — same URL as Template 4; Susan must verify this is current and active
- VAGUE: "our chat support feature within the provided link" — what platform is this? Tenants won't know what this means. If this is a real service Crown Key uses, name it. If not, remove this sentence.
- NO CLOSING: Email ends abruptly after the paragraph. No "Thank you," no sign-off, no contact info if the link doesn't work.
- OVERLAP: This template covers utility setup and Template 4 also covers utility setup. If both are sent, the tenant gets the same utility link twice.

---

### T 02 Bug Summary

| Template | Issue | Priority |
|---|---|---|
| 1, 4, 5 | Grammar: "enable to you access" → "enable you to access" | Fix before activating |
| 1, 4, 5 | Wrong email: info@ → admin@ | Fix before activating |
| 1, 4, 5 | Missing \| default on {{tenants.all.first_name}} | Fix before activating |
| 1 & 5 | EXACT DUPLICATE bodies — delete one | Fix before activating |
| 2 | Hardcoded "Tiffany Carapinha" — remove, causes double signature | Fix before activating |
| 2 | Uses {{tenants.first_name}} not {{tenants.all.first_name}} — inconsistent | Fix before activating |
| 3 | "We'd love to know any feedback" — awkward phrasing | Minor |
| 3 | Missing | default on {{owners.all.first_name}} | Fix before activating |
| 4, 6 | https://utility-setup.com/crown-key-realty — verify URL still active | Verify before activating |
| 4 | "online portal here" — hyperlink URL not visible, verify it works | Fix before activating |
| 6 | {{process.move_in_date}} missing | default | Fix before activating |
| 6 | No closing / sign-off | Fix before activating |
| 6 | "chat support feature" reference — vague or outdated | Clarify or remove |

**Key questions for Susan:**
1. Should Templates 1 and 5 be merged into one? They are identical. Which version should survive?
2. Is `https://utility-setup.com/crown-key-realty` still the active utility setup link?
3. Is "Tiffany Carapinha" still VP of Operations? (Template 2 has her name hardcoded)
4. This process is in **Draft** — are you planning to activate it? If so, all bugs above need to be fixed first.

---

## PROCESSES STILL TO CAPTURE

Priority order:
- [x] T 07 Lease Renewal Process ✅ ALL 16 TEMPLATES CAPTURED
- [x] NP 01 Owner Onboarding Process ✅ ALL 10 TEMPLATES CAPTURED
- [x] T 04 BSG Payment Plan 2024 ✅ ALL 18 TEMPLATES CAPTURED
- [x] T 03 BSG Move Out 2024 ✅ ALL 26 TEMPLATES CAPTURED
- [x] T 01 BSG Delinquency 2point0 ✅ ALL 8 TEMPLATES CAPTURED
- [x] T 02 BSG Move In 2024 ✅ ALL 6 TEMPLATES CAPTURED
- [x] T 60 60 Day Notice to Not Renew Just Cause ✅ NO EMAIL TEMPLATES (process is Live but task-based only — no LeadSimple emails)
- [x] 02 Security Deposit Disposition 2024 ✅ ALL 11 TEMPLATES CAPTURED
- [ ] O 01 Owner Cancelled Mgmt Vacant no tenant (7 stages)
- [ ] O 02 Mgmt Cancelled by Owner Tenant in Place (3 stages)
- [ ] T 09 HOA Violation Process (3 stages)

---

## 02 Security Deposit Disposition 2024

**Status:** Live | **Active processes:** 45 | **Total email templates:** 11 | **Total sends across all templates:** 0

> **Critical operational note:** This process has 45 active cases but every template shows 0 sends. The team is managing all security deposit disposition work manually. None of the email automation is being used. This is a significant gap — 45 active cases means 45 sets of tenant and owner communications being done ad hoc, with no consistency, no audit trail, and no automation.

---

### Template 1 — (Attorney) Request for Small Claims Court Action

**Template name:** (Attorney) Subject: Request for Small Claims Court Action – Tenant Outstanding Balance
**Subject:** Request for Small Claims Court Action – Tenant Outstanding Balance
**Sends:** 0
**Recipient:** External (attorney)

```
Hi Chris,

I trust this email finds you well.

I am writing to seek your professional assistance regarding a tenant matter that requires legal intervention.

The tenant in question is {{tenants.full_name}} who recently vacated the property at {{property.address}}.

Despite multiple reminders and warnings, they have failed to settle their outstanding balance, creating a significant financial discrepancy.

Attempts to communicate with the tenant via {{tenants.email}} and {{tenants.phone}} have proven unsuccessful.

Given the exhaustion of our attempts to resolve this matter amicably, we believe it is necessary to pursue legal action through small claims court.

Attached to this email, you will find a comprehensive record of all communications, notices, and evidence supporting the outstanding balance. The amount owed is {{process.disbursement_balance | default}}.

The breach of lease terms and refusal to cooperate necessitate legal intervention to protect our interests.

We kindly request your expertise in initiating the small claims court process on our behalf. If there are any additional documents or information required, please let us know promptly.

Your prompt attention to this matter is highly appreciated.

We understand the complexities of your schedule and are grateful for your assistance in resolving this issue in a timely and efficient manner.

Thank you for your professional support.
```

**Bugs:**
- CRITICAL: "Hi Chris" — hardcoded attorney first name. If the attorney changes, every email goes to the wrong name with no error
- `{{tenants.full_name}}`, `{{property.address}}`, `{{tenants.email}}`, `{{tenants.phone}}` — all missing `| default`
- `{{process.disbursement_balance | default}}` — has `| default` but empty default means balance could show as blank
- No closing / sign-off

---

### Template 2 — Email 2: Reminder with Urgency

**Template name:** Email 2: Reminder with Urgency
**Subject:** Urgent: Outstanding Balance Requires Immediate Attention
**Sends:** 0
**Recipient:** Tenant

```
Dear {{tenants.full_name}},

I trust this email reaches you in good health.

Your account continues to show an unsettled balance, and it's crucial to address this matter urgently. Failure to rectify this situation may result in further actions. As a reminder, the current amount due is {{process.disbursement_balance}}.

Please make the payment at your earliest convenience through our tenant portal or contact us immediately.

Your cooperation is highly appreciated.
```

**Bugs:**
- `{{tenants.full_name}}` — missing `| default`
- `{{process.disbursement_balance}}` — missing `| default`
- "further actions" — vague; doesn't say what consequence is
- No closing / sign-off

---

### Template 3 — Email 3: Notice of Impending Action

**Template name:** Email 3: Notice of Impending Action
**Subject:** Final Warning: Settlement Required Immediately
**Sends:** 0
**Recipient:** Tenant

```
Dear {{tenants.full_name}},

We regret to inform you that your account remains in arrears, and this serves as the final warning before further action.

Immediate settlement is imperative to avoid any legal consequences.

Kindly arrange the payment urgently through our tenant portal or contact our office. The current total amount due is {{process.disbursement_balance}}.

Your compliance is essential.
```

**Bugs:**
- `{{tenants.full_name}}` — missing `| default`
- `{{process.disbursement_balance}}` — missing `| default`
- "Your compliance is essential" — cold and robotic; not Crown Key voice
- No closing / sign-off

---

### Template 4 — Email 4: Legal Action Warning

**Template name:** Email 4: Legal Action Warning
**Subject:** Legal Action Notice: Unpaid Balance: {{process.disbursement_balance}}
**Sends:** 0
**Recipient:** Tenant

```
Dear {{tenants.full_name}},

Despite previous notices, your account remains unsettled.

This is a formal warning of impending legal action if the outstanding balance is not cleared immediately.

We urge you to resolve this matter without further delay.

Contact us urgently to prevent legal consequences.

Your cooperation is paramount.
```

**Bugs:**
- CRITICAL: Subject line contains `{{process.disbursement_balance}}` with no `| default` — if balance field is empty, subject reads "Legal Action Notice: Unpaid Balance: " with nothing after it
- `{{tenants.full_name}}` — missing `| default`
- Body does not mention the amount owed — amount only appears (unreliably) in the subject line
- "Your cooperation is paramount" — robotic sign-off
- No closing / sign-off

---

### Template 5 — Email 5: Final Legal Action Notice

**Template name:** Email 5: Final Legal Action Notice
**Subject:** Final Notice: Legal Action Initiation
**Sends:** 0
**Recipient:** Tenant

```
Dear {{tenants.full_name}},

This is the final notice regarding your unsettled account. Regrettably, if the outstanding balance is not paid within the next 7 business days, legal action will commence without further warning.

The outstanding balance is {{process.disbursement_balance}}.

To avoid this, settle the amount immediately.

Time is of the essence. Act now to prevent legal consequences.
```

**Bugs:**
- `{{tenants.full_name}}` — missing `| default`
- `{{process.disbursement_balance}}` — missing `| default`
- "7 business days" — hardcoded deadline; confirm this is Crown Key policy
- "Time is of the essence. Act now to prevent legal consequences." — aggressive collection-agency tone
- No closing / sign-off

---

### Template 6 — (owners) Unit Turn Expenses Notification

**Template name:** (owners) Subject: Unit Turn Expenses Notification
**Subject:** Unit Turn Expenses Notification
**Sends:** 0
**Recipient:** Owner

```
Dear {{owners.full_name}},

I trust this message finds you well. Following a recent unit turnover, we regret to inform you that the security deposit for your property falls short of covering all associated expenses.

A detailed breakdown is available upon request.

Your prompt attention to this matter is appreciated, and we kindly request the additional funds to cover the outstanding costs.

Feel free to contact us for any clarification or to discuss the specifics.
```

**Bugs:**
- `{{owners.full_name}}` — missing `| default`
- No amount mentioned — owner has no idea how much they owe
- No property address — owner with multiple properties won't know which one
- "A detailed breakdown is available upon request" — owner should receive the breakdown proactively, not have to ask for it
- No closing / sign-off
- Template name has "Subject:" embedded in the name field (naming convention issue throughout this process)

---

### Template 7 — Forwarding Address Request

**Template name:** Subject: Forwarding Address Request
**Subject:** Forwarding Address Request
**Sends:** 0
**Recipient:** Tenant

```
Dear {{tenants.first_name | default}},

I trust this email finds you well.

As your lease term concludes, we kindly request your new forwarding address for the return of your security deposit.

Please provide this information at your earliest convenience, so that any deposit can be returned to you as speedily as possible.

You can reply to this email with the details or update your address through our tenant portal. We appreciate your prompt cooperation.
```

**Bugs:**
- Template name has "Subject:" embedded in the name field (naming convention issue)
- Uses `{{tenants.first_name | default}}` — inconsistent with rest of this process which uses `{{tenants.full_name}}`; verify `first_name` field exists
- No deadline mentioned for when forwarding address is needed
- "as speedily as possible" — informal phrasing

---

### Template 8 — Positive Balance – Security Deposit Refund

**Template name:** Subject: Positive Balance – Security Deposit Refund
**Subject:** Positive Balance – Security Deposit Refund
**Sends:** 0
**Recipient:** Tenant

```
Dear {{tenants.first_name | default}},

I trust this email finds you in good spirits.

We're delighted to inform you that your recent unit inspection reveals a positive balance from your security deposit. As a result, we'll be processing a refund check promptly.

Please confirm your current mailing address or update it through our tenant portal to ensure the prompt delivery of your refund. We appreciate your tenancy and wish you all the best in your future endeavors.
```

**Bugs:**
- Template name has "Subject:" embedded in the name field (naming convention issue)
- Uses `{{tenants.first_name | default}}` — inconsistent; verify field exists
- No refund amount mentioned — tenant doesn't know how much they're getting back
- No timeframe for when check will arrive

---

### Template 9 — (tenants) Email 1: Friendly Reminder

**Template name:** (tenants) Email 1: Friendly Reminder
**Subject:** Friendly Reminder: Unsettled Account Balance
**Sends:** 0
**Recipient:** Tenant

```
Dear {{tenants.full_name}},

I hope this email finds you well. This is a gentle reminder that your account currently reflects an unpaid balance.

The current amount due is {{process.disbursement_balance}}.

We kindly request your prompt attention to settle the outstanding amount to avoid any inconveniences.

Please log in to our tenant portal or contact our office for assistance.

Thank you for your immediate attention to this matter.
```

**Bugs:**
- `{{tenants.full_name}}` — missing `| default`
- `{{process.disbursement_balance}}` — missing `| default`
- "avoid any inconveniences" — vague; doesn't specify what happens if not paid
- No closing / sign-off

---

### Template 10 — (tenants) Urgent: Negative Balance on Your Account

**Template name:** (tenants) Subject: Urgent: Negative Balance on Your Account
**Subject:** Urgent: Negative Balance on Your Account
**Sends:** 0
**Recipient:** Tenant

```
Dear {{tenants.full_name}},

I hope this email finds you in good health.

Regrettably, our recent assessment indicates a negative balance in your account due to insufficient coverage from the security deposit. It's crucial to address this promptly to avoid any inconvenience.

Kindly submit the outstanding amount at your earliest convenience.

You can make the payment through our tenant portal or contact our office for assistance.
```

**Bugs:**
- Template name has "Subject:" embedded in the name field (naming convention issue)
- `{{tenants.full_name}}` — missing `| default`
- No amount mentioned anywhere — this is the "urgent" notice but the tenant doesn't know what they owe
- No closing / sign-off
- "to avoid any inconvenience" — vague; no consequence stated

---

### Template 11 — Unit Turn Expenses Covered by Security Deposit

**Template name:** Unit Turn Expenses Covered by Security Deposit
**Subject:** Unit Turn Expenses Covered by Security Deposit
**Sends:** 0
**Recipient:** Owner

```
Dear {{owners.full_name | default}},

I hope this message finds you well. I'm pleased to inform you that the security deposit for your property has successfully covered all expenses associated with the recent unit turnover.

The property is now ready for the next tenant.

Should you have any questions or require further details, please feel free to reach out.

We appreciate your continued trust in our property management services.
```

**Bugs:**
- `{{owners.full_name | default}}` — has `| default`, good
- No property address — owner with multiple properties won't know which one
- No expense summary — owner may want to know what was covered and the amounts
- No closing / sign-off beyond auto-signature

---

### 02 Security Deposit Disposition — Bug Summary

| Template | Bug | Severity |
|---|---|---|
| 1 | "Hi Chris" — hardcoded attorney name with no merge field | CRITICAL |
| 4 | `{{process.disbursement_balance}}` in subject line with no `\| default` — subject goes blank if field empty | CRITICAL |
| 1 | `{{tenants.full_name}}`, `{{property.address}}`, `{{tenants.email}}`, `{{tenants.phone}}` missing `\| default` | Fix before activating |
| 2, 3, 5, 9 | `{{tenants.full_name}}` missing `\| default` | Fix before activating |
| 2, 3, 5, 9 | `{{process.disbursement_balance}}` missing `\| default` | Fix before activating |
| 6 | `{{owners.full_name}}` missing `\| default` | Fix before activating |
| 10 | `{{tenants.full_name}}` missing `\| default` | Fix before activating |
| 6, 10 | No amount mentioned — recipient has no idea how much they owe | Fix before activating |
| 6, 11 | No property address — owner with multiple properties won't know which one | Fix before activating |
| 7, 8 | Uses `{{tenants.first_name \| default}}` — inconsistent field name vs rest of process | Verify field exists |
| 8 | No refund amount mentioned | Fix before activating |
| 3, 4, 5, 10 | Tone is collection-agency level — threatening, robotic, not Crown Key voice | Rewrite |
| 1–11 | Multiple template names embed "Subject:" in the name field — naming convention inconsistency | Clean up |
| 1–11 | All 11 templates show 0 sends despite 45 active cases — process running entirely manually | Operational gap |

**Key questions for Susan:**
1. Is "Chris" still your attorney for small claims? (Template 1 has his name hardcoded)
2. Do you want to activate these templates so the 45 active cases get consistent emails? If yes, the bugs above need to be fixed first.
3. Should Templates 7 and 8 use `first_name` or `full_name`? The rest of this process uses `full_name`.
4. Template 5 says tenants have "7 business days" before legal action — is that your actual policy?
