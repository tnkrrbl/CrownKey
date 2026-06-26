# Getting Unstuck
### The 10 problems you will definitely hit — and how to fix them

---

## 1. "Claude seems confused or is going in circles"

**What happened:** The session lost context. Claude is trying to help but doesn't
have a clear picture of what you're doing.

**Fix:** Start a fresh session. Then paste this:
```
Read my CLAUDE.md and tell me what you know about my business.
Then I'll tell you what I need today.
```
Wait for it to confirm. Then ask for what you need. A fresh oriented session
beats a confused long one every time.

---

## 2. "Permission denied" when SSHing into the server

**What happened:** Wrong password, or you're using the wrong IP.

**Fix:**
1. Go to Hostinger hPanel → VPS → find your server
2. Double-check the IP address — copy it fresh, don't type it by hand
3. If the password is wrong: click **Root Password** → reset it → try again

---

## 3. "Connection refused" — can't reach the server at all

**What happened:** The server is off, or it's still booting after a restart.

**Fix:**
1. Go to Hostinger hPanel → VPS → check if the server shows as **Running**
2. If it's stopped: click **Start**
3. If it just rebooted: wait 2 minutes, try again

---

## 4. "API key not found" or Claude won't start

**What happened:** Your API key is saved but the terminal session doesn't see it yet.

**Fix:** Run this first:
```bash
source ~/.bashrc
```
Then try `claude` again. This reloads your saved settings including the API key.

If that doesn't work:
```bash
echo $ANTHROPIC_API_KEY
```
If it prints nothing, your key isn't saved. Run `setup/vps-setup.sh` again to re-enter it.

---

## 5. "git push" is rejected

You'll see something like: *"rejected — Updates were rejected because the remote
contains work you do not have locally."*

**Fix:**
```bash
git pull origin main --rebase
git push origin main
```
This pulls the latest version, layers your changes on top, and pushes cleanly.

---

## 6. PR checks are failing (red ✗ on GitHub)

**What happened:** Either there's a Python syntax error in your code, or an API
key accidentally got saved in a file.

**Fix:**
1. Click the failing check on GitHub — it shows exactly which file and what's wrong
2. For a syntax error: open that file on your server, find the line, fix the typo
3. For an API key: delete the key from the file, use an environment variable instead
4. Save, commit, push — the check re-runs automatically

---

## 7. Claude is slow, timing out, or giving short answers

**What happened:** Usually an API billing issue — your account ran out of credit,
or you hit a usage limit.

**Fix:**
1. Go to **console.anthropic.com → Billing**
2. Check your credit balance — add more if it's low
3. Check if your account has usage limits set — raise them if needed

For big tasks (building a full tool), Claude can take 2-3 minutes. That's normal.
If it's been more than 5 minutes with no output, start a fresh session.

---

## 8. "I don't know how to ask for what I need"

**What happened:** You know the problem, but you're not sure how to phrase it
for Claude.

**Fix:** Just describe the problem like you'd describe it to a new employee:
```
Here's what I'm trying to do: [describe the task].
Here's what I have to work with: [data, list, spreadsheet, etc.].
Here's what I want at the end: [email, report, script, etc.].
Don't build anything yet — just tell me your plan.
```
You don't need to know the technical words. Describe it in business terms.

---

## 9. Merge conflict

You'll see: *"CONFLICT — Automatic merge failed."*

**What happened:** Two versions of the same file were changed in different places
and git can't figure out which to keep.

**Fix:** Tell Jarvis exactly this:
```
I have a merge conflict in [filename]. Help me resolve it without losing my work.
Show me both versions and help me decide what to keep.
```
Jarvis will walk you through it line by line.

---

## 10. A tool that worked before suddenly stopped working

**What happened:** Something changed — a file moved, an API key expired, or the
tool depends on data that's no longer there.

**Fix:** Tell Jarvis:
```
My [tool name] stopped working. Here's what happens when I run it: [paste the
error message]. Don't fix it yet — tell me what you think went wrong first.
```
Always get the diagnosis before the fix. Blindly re-running things makes it worse.

---

## When None of This Works

Ask Wolf. That is literally what he's there for.

Post in the Wolf Pack community with:
1. What you were trying to do
2. What you did (the exact commands or prompts)
3. What happened (the exact error message — copy/paste it)

The more specific you are, the faster you get unstuck.
