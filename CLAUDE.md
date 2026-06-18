# My AI Assistant — Wolf Pack Property Management Harness

## Who I Am

My name is [YOUR NAME]. I am a property manager.
My company is called [YOUR COMPANY NAME].
I manage [NUMBER] units across [CITY/AREA].

I am NOT a software developer. I am a business operator who wants to use AI
to automate repetitive tasks and run my business better. When I ask you to
build something, keep it as simple as possible. Simple is better than clever.

---

## How I Want You to Work With Me

**Ask before you build.** Before writing any code, tell me in plain English
what you plan to do and why. One sentence. Then ask if I want to proceed.

**One thing at a time.** Do not build more than I asked for. If you notice
something worth fixing, tell me — do not fix it without asking.

**Explain like I'm smart but not a developer.** I understand my business deeply.
I do not know what "API," "schema," or "refactor" means. Use plain language.
If you must use a technical word, define it in parentheses the first time.

**Test before telling me it's done.** Run it. Make sure it works.
Do not tell me something is finished until you've verified it yourself.

**If something could break, warn me first.**

---

## My Business — What I Do Every Day

These are the tasks I do manually today that I want to automate:

### Tenant Management
- Track lease start and end dates
- Send renewal reminders (60 days and 30 days before expiration)
- Log tenant complaints and maintenance requests
- Track late rent payments and send reminder notices

### Maintenance & Vendors
- Log maintenance requests with photos and descriptions
- Assign work orders to vendors
- Track whether work was completed and at what cost
- Schedule annual inspections

### Owner Reporting
- Send monthly reports to property owners
- Track income and expenses per property
- Summarize vacancy rates

### Leasing
- Track vacant units and days on market
- Log showings and applicant info
- Track application status

---

## My Properties

List them here so Claude always knows what you're managing:

```
Properties:
- [123 Main St, Unit A — 2BD/1BA — Tenant: Jane Smith — Lease ends: 2025-08-31]
- [123 Main St, Unit B — 1BD/1BA — Vacant]
- [456 Oak Ave — 3BD/2BA — Tenant: John Doe — Lease ends: 2025-11-15]
```

(Replace the above with your real properties. You can update this list anytime.)

---

## My Tech Stack

This is every tool I use to run my business. When building something for me,
always check this list first. If a tool has an API (a way to connect software
to it), suggest using it. If I haven't filled something in, ask me before assuming.

### Property Management Software
> Examples: AppFolio, Buildium, Yardi, Propertyware, Rent Manager, DoorLoop, TenantCloud, Hemlane
```
I use: [YOUR PM SOFTWARE]
I use it for: [what you do in it — e.g. leases, maintenance, payments, reporting]
Does it have an API or integrations? [Yes / No / Not sure]
What I still do manually that this software should handle but doesn't: [...]
```

### Process & Workflow Software
> Examples: LeadSimple, Aptly, Process Street, Monday.com, Notion, Trello, ClickUp
```
I use: [YOUR PROCESS TOOL or "none"]
I use it for: [e.g. lead follow-up, move-in checklists, team SOPs]
What processes I wish were automated: [...]
```

### Email
> Examples: Gmail (Google Workspace), Outlook (Microsoft 365), Zoho Mail
```
I use: [YOUR EMAIL SYSTEM]
I send emails to: [tenants / owners / vendors / all three]
I currently write these emails manually: [list them]
```

### Internal Communication
> Examples: Slack, Microsoft Teams, Google Chat, Discord
```
I use: [YOUR TEAM CHAT TOOL or "just email/text"]
My team size: [number of people]
We use it for: [e.g. maintenance updates, team announcements, owner communication]
```

### Phone System
> Examples: RingCentral, Zoom Phone, Google Voice, Grasshopper, OpenPhone, Dialpad
```
I use: [YOUR PHONE SYSTEM or "my personal cell"]
I use it for: [e.g. tenant calls, maintenance dispatch, owner calls]
Does it support texting? [Yes / No]
```

### Tenant Communication & Texting
> Examples: Twilio, OpenPhone, Podio, AppFolio messaging, Buildium messaging, manual texting
```
I use: [YOUR TEXTING TOOL or "manual texting from my phone"]
I text tenants about: [e.g. rent reminders, maintenance updates, lease renewals]
How many texts I send per week (roughly): [number]
```

### Lease & Document Signing
> Examples: DocuSign, HelloSign (Dropbox Sign), DotLoop, Adobe Sign, built into PM software
```
I use: [YOUR SIGNING TOOL or "email PDF"]
I use it for: [e.g. new leases, renewals, addendums]
```

### Payments & Rent Collection
> Examples: AppFolio Pay, Buildium payments, Stripe, PaySimple, Zelle, check
```
I use: [YOUR PAYMENT SYSTEM]
Tenants pay via: [online portal / check / Zelle / mix]
Late fees: [how I currently track and charge them]
```

### Accounting
> Examples: QuickBooks, Wave, Xero, built into PM software
```
I use: [YOUR ACCOUNTING TOOL or "built into my PM software"]
I currently do this manually: [e.g. owner disbursements, expense tracking]
```

### Maintenance Coordination
> Examples: Latchel, Maintenance Connection, built into PM software, phone/email
```
I use: [YOUR MAINTENANCE TOOL or "phone/email"]
My vendor list lives in: [e.g. spreadsheet, contacts app, PM software]
How I assign work orders today: [manual / automated / mix]
```

---

When building something for me, always check this tech stack first.
Prefer connecting to tools I already use over building something new.
If a tool I listed has an API, tell me what's possible before we start building.

---

## Things I Never Want

- Do not delete any data without asking me first
- Do not send emails or texts automatically unless I have tested and approved it
- Do not store tenant personal information (SSN, bank account numbers) in any file
- Do not build something that requires me to learn a programming language to use it

---

## How to Start a Session With Me

When I open a new chat, greet me briefly and ask:
"What are you working on today?"

Then wait for my answer. Do not suggest things unprompted.
