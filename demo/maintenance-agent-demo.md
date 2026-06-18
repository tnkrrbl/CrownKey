# The Jaw-Drop Demo — Maintenance Request Agent
### Wolf's Director Script for Day 1, Hour 1

---

## Purpose

This demo runs in the first 30 minutes of class, before students touch their own keyboards.
The goal: show them something they didn't think was possible, with their own real data,
in under 60 seconds.

The moment you're engineering: a student reads a real tenant text out loud.
Sixty seconds later, Claude has done what would normally take 20 minutes.
That's when phones come out and people start texting their PM friends.

---

## Setup (Do This the Night Before)

1. Have Claude Code open on your laptop, connected to your server
2. Open the file `demo/maintenance-agent-prompt.md` in your session
3. Test the demo yourself with a fake request — make sure it runs clean
4. Pick a student in advance (someone you know, or ask for a volunteer before class starts)
   and ask them to have a real tenant text ready on their phone

---

## The Script

### Step 1 — The Setup (2 min)

Say this (or your version of it):

> "Before you touch a keyboard today, I want to show you something.
> I'm going to ask [STUDENT NAME] to read me a real text they got from a tenant.
> Any text. Maintenance issue, complaint, question — doesn't matter.
> I'm going to paste it into Claude. Watch what happens."

---

### Step 2 — Get the Input (1 min)

Ask the student to read their text out loud. Type it (or paste it) exactly as they say it.

If no one has a text handy, use this one:

> "Hi this is Maria in 4B. There's water coming from under my bathroom sink and
> it's getting on the floor. I put a towel down but it's been dripping since last night.
> Can someone come look at it? I'm home until noon today."

---

### Step 3 — Run the Agent (type this into Claude Code)

```
You are my property management assistant agent.

I just received this message from a tenant:

"[PASTE THEIR TEXT HERE]"

Do all of the following without asking me any questions first:

1. TRIAGE: Tell me the urgency level (Emergency / Urgent / Routine) and why in one sentence.

2. TENANT REPLY: Write a professional, warm text message reply to the tenant.
   Confirm we received it, set an expectation for response time based on urgency, and sign it from my company.

3. WORK ORDER: Create a work order with: Tenant name and unit (extract from message if possible),
   Issue type, Description, Urgency level, Date received, and Status: Open.

4. VENDOR DISPATCH: Write a short text to send to a plumber.
   Include the unit, the issue, urgency, and that the tenant is available until noon.

5. RECOMMENDED NEXT STEP: Tell me the single most important thing I should do in the next 10 minutes.

Format each section with a clear header. Make it ready to use — not a draft, not a template.
```

---

### Step 4 — Let It Run. Say Nothing.

This is important: **don't narrate while Claude types.** Let the silence build.
Students will lean forward. Let them read it themselves as it comes out.

---

### Step 5 — The Debrief (3 min)

After Claude finishes, ask the room:

> "How long would that have taken you to do manually?"

Let them answer. They'll say 15–30 minutes. Some will say longer.

Then say:

> "That just took 45 seconds. And notice — it didn't just write one thing.
> It made a decision about urgency. It drafted the tenant reply. It created the work order.
> It messaged the vendor. It told you what to do next.
>
> That's an agent. Not a chatbot that answers questions —
> something that takes a single input and orchestrates multiple actions.
>
> That's what you're going to learn to build this week.
> And by the time you leave, you'll have one running for your own business."

---

### Step 6 — The Callback (use this on Day 2)

When students are building their own tools on Day 2, call back to this moment:

> "Remember Maria and the leaking sink? Whatever you're building today
> is the same idea — one input, multiple actions, no manual steps."

---

## Why This Demo Works

- It uses **real data** (their actual tenant text) — not a made-up example
- It produces **5 real outputs** they can actually use today
- It demonstrates the **agent concept** without requiring any technical explanation
- The urgency decision and "recommended next step" outputs are the ones that get gasps —
  those feel like judgment, not automation
- It's **repeatable** — every student could run this same prompt for their own business
  in the next 10 minutes

---

## What If Something Goes Wrong

**Claude gives a short or incomplete response:**
Just say "Let me push it a little further" and add: "Please complete all 5 sections."

**Student doesn't have a real text:**
Use the Maria example above. It's realistic and specific enough to feel real.

**Internet/API is slow:**
While it loads, ask the room: "While we wait — how many of you handle maintenance requests
via text right now? How many texts does that usually take back and forth?" Gets the room
thinking before the answer appears.
