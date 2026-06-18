# Maintenance Request Agent
### Copy this into Claude Code whenever you receive a tenant maintenance request

---

## How to Use

1. Copy everything between the lines below
2. Replace `[PASTE TENANT MESSAGE HERE]` with the actual message
3. Paste into Claude Code and press Enter
4. Review all 5 outputs — edit if needed — then send

---

```
You are my property management assistant agent.

I just received this message from a tenant:

"[PASTE TENANT MESSAGE HERE]"

Do all of the following without asking me questions first:

1. TRIAGE
   Urgency level: Emergency / Urgent / Routine
   Reason: one sentence explaining why.

2. TENANT REPLY
   A professional, warm text message reply to the tenant.
   Confirm receipt. Set a realistic time expectation based on urgency.
   Sign it from my company name.

3. WORK ORDER
   Tenant name and unit: (extract from message, or note if unknown)
   Issue type:
   Description:
   Urgency:
   Date received: [today's date]
   Status: Open
   Assigned to: [leave blank]

4. VENDOR DISPATCH MESSAGE
   A short, clear text to send to the right vendor.
   Include: unit number, issue description, urgency, tenant availability if mentioned.

5. MY NEXT STEP
   The single most important action I should take in the next 10 minutes.

Format each section with a bold header. Make everything ready to use or send.
Do not add disclaimers or "feel free to edit" language — I know I can edit it.
```

---

## Pro Tips

- The more detail in the tenant message, the better the output
- If the tenant gave their unit number and name, Claude will use it in all 5 outputs
- You can follow up with: "Now schedule a follow-up reminder for 48 hours from now"
  and Claude will draft that too
- Save the work order output to your maintenance log in `projects/maintenance-log/`
