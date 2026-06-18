# After Class — What to Do in Your First 30 Days

---

You built something real this week. Don't let momentum die.

Here's exactly what to do and when.

---

## Day 1 After Class

**Open your server and run what you built.**

Not to improve it. Not to add features. Just run it with real data from today.

If it works: great. If it breaks: perfect — that's the next session.

```bash
ssh root@YOUR_IP
cd /root/wolf-pack
claude
```

Tell Claude: *"I want to test what we built in class. Walk me through running it with real data."*

---

## Week 1 — Get to Daily Use

**The goal this week:** use your agent or tool every single day, even once.

The PMs who get the most out of this are the ones who make it a daily habit
in week one — before the class excitement fades and old routines come back.

Pick your easiest use case. Run it. Repeat.

**Check in to the community:** Post in the Wolf Pack channel what you built
and how your first real-world test went. The community wants to hear it.

---

## Week 2 — Build One More Thing

Go back to the problem list you wrote in your workbook.
Pick #2. Start a new session:

*"I want to build [problem #2]. Based on my CLAUDE.md, what tools do I already have
that we should connect? Give me a plan in plain English before writing anything."*

Approve the plan. Build it. Test it.

**Tip:** Don't try to build everything at once. One tool per week, working well,
beats five half-finished tools every time.

---

## Week 3 — Connect Your Tools

By now you probably have a feel for what Claude can and can't do easily.
Week 3 is when you start connecting things together.

Ask Claude: *"Looking at my tech stack in CLAUDE.md, which two tools would be most
valuable to connect? What would that make possible?"*

If your PM software has an API — this is the week to start exploring it.
If it doesn't, Claude can help you work around it.

---

## Month 1 — Your First Real Integration

By end of month one, aim to have one live connection between Claude
and a tool in your existing tech stack.

Common first integrations for Wolf Pack graduates:
- Claude reading from a Google Sheet and acting on it
- Claude drafting emails that go into your Gmail drafts folder
- Claude generating a report from data you paste in
- Claude connected to your maintenance log, updating it automatically

None of these require you to understand how they work technically.
You just need to be able to describe what you want clearly.

---

## Keeping Your Harness Current

Your CLAUDE.md will drift. As your business changes, your tools change, your team changes —
update it.

Set a monthly reminder: **"Update my CLAUDE.md"**

Takes 10 minutes. Makes every session for the next month better.

```bash
ssh root@YOUR_IP
cd /root/wolf-pack
nano CLAUDE.md
```

---

## Getting New Wolf Pack Content

New agent prompts, project templates, and tools are added to the Wolf Pack repo regularly.
Pull the latest with:

```bash
cd /root/wolf-pack
git pull origin main
```

Run this once a week. If there's something new, Claude will be able to use it automatically.

---

## The Wolf Pack Community

The fastest way to improve is watching what other PMs are building.

In the Crane community, the **#wolf-pack** channel is exclusively for graduates of this class.
Post your wins. Ask questions. Share prompts that work well.

The PMs in that channel are at the same starting point you are.
Some are ahead. Some are behind. All of them are building.

**If you're not yet a Crane member:**
This is the right time to consider it. Everything you built this week was designed
to plug directly into what Crane members do together.

*[CRANE JOIN LINK AND OFFER]*

---

## When You Get Stuck

**Stuck on a build?** Post in #wolf-pack with: what you were trying to do,
what you tried, and what happened. Someone has hit the same wall.

**Claude starts giving bad advice?** Start a fresh session. Ask it to re-read
your CLAUDE.md. Reorient before continuing.

**Something broke and you don't know why?** Type this to Claude:
*"Something broke. Don't fix it yet. Read the error and explain in plain English
what you think went wrong and why."* Understanding the problem is faster than
throwing solutions at it.

**Monthly office hours:** Wolf holds open office hours for Wolf Pack graduates.
Bring your hardest problem. *[CALENDAR LINK]*

---

## The Long Game

Six months from now, the PMs in this class will be in one of two groups:

**Group 1:** They have 3–5 agents running. Their business runs smoother.
They've automated 5–10 hours of work per week. They're in Crane, sharing what
they've built, and helping the next cohort.

**Group 2:** They have a server they haven't touched since class week.

The difference isn't talent. It's not technical skill. It's not even time.

It's whether they kept opening that SSH window in week 1.

You paid $1,400 to be in this room. Spend 20 minutes a week making it worth it.

---

*Wolf Pack — wolfpack.croskey.com*
*github.com/wocros/wolf-pack*
