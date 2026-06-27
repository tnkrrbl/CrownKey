/* ============================================================
   CrownKey Email Guardian — app.js
   Main application logic for index.html (email review + draft).
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  Nav.init();

  // ---- DOM refs ----
  const modeBtns       = document.querySelectorAll(".mode-btn");
  const modeA          = document.getElementById("mode-a");
  const modeB          = document.getElementById("mode-b");
  const reviewBtn      = document.getElementById("review-btn");
  const generateBtn    = document.getElementById("generate-btn");
  const resultSection  = document.getElementById("result-section");
  const loadingOverlay = document.getElementById("loading-overlay");
  const ctxToggleA     = document.getElementById("ctx-toggle-a");
  const ctxFieldA      = document.getElementById("ctx-field-a");
  const ctxToggleB     = document.getElementById("ctx-toggle-b");
  const ctxFieldB      = document.getElementById("ctx-field-b");
  const situationSelect= document.getElementById("situation-select");
  const situationDesc  = document.getElementById("situation-desc");

  // ---- Pre-fill from Incoming Analysis ("Start My Reply") ----
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("prefill") === "1") {
    const savedOpening = sessionStorage.getItem("ck_prefill_email");
    if (savedOpening) {
      document.getElementById("email-textarea").value = savedOpening;
      sessionStorage.removeItem("ck_prefill_email");
      showToast("Reply opening pre-filled from your analysis. Add the email body and click Review.");
    }
  }

  // ---- Mode switching ----
  modeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modeBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.dataset.mode;
      if (mode === "a") {
        modeA.classList.remove("hidden");
        modeB.classList.add("hidden");
      } else {
        modeB.classList.remove("hidden");
        modeA.classList.add("hidden");
      }
      resultSection.classList.add("hidden");
    });
  });

  // ---- Collapsible context field ----
  function wireContextToggle(btn, field) {
    if (!btn || !field) return;
    btn.addEventListener("click", () => {
      const isOpen = field.classList.toggle("open");
      btn.classList.toggle("open", isOpen);
      btn.querySelector(".arrow").textContent = isOpen ? "▼" : "▶";
    });
  }
  wireContextToggle(ctxToggleA, ctxFieldA);
  wireContextToggle(ctxToggleB, ctxFieldB);

  // ---- Situation dropdown shows/hides description textarea ----
  if (situationSelect) {
    situationSelect.addEventListener("change", () => {
      if (situationSelect.value) {
        situationDesc.classList.add("hidden");
      } else {
        situationDesc.classList.remove("hidden");
      }
    });
  }

  // ---- Loading helpers ----
  function showLoading(msg) {
    document.getElementById("loading-msg").textContent = msg || "Reviewing your email…";
    loadingOverlay.classList.add("active");
  }
  function hideLoading() {
    loadingOverlay.classList.remove("active");
  }

  // ---- Toast ----
  function showToast(msg) {
    let toast = document.getElementById("global-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "global-toast";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  // ---- REVIEW EMAIL ----
  if (reviewBtn) {
    reviewBtn.addEventListener("click", async () => {
      const emailText = document.getElementById("email-textarea").value.trim();
      const recipient = document.getElementById("recipient-select").value;
      const sender    = document.getElementById("sender-select-a").value;

      if (!emailText) {
        alert("Please paste your email before clicking Review.");
        return;
      }

      showLoading("Reviewing your email…");

      try {
        const res = await fetch("/api/review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailText, recipientType: recipient, senderName: sender })
        });
        const data = await res.json();
        hideLoading();
        renderReviewResult(data, emailText);
      } catch (err) {
        hideLoading();
        showReviewError("Something went wrong reviewing your email. Please try again.");
        console.error(err);
      }
    });
  }

  // ---- GENERATE DRAFT ----
  if (generateBtn) {
    generateBtn.addEventListener("click", async () => {
      const situation = document.getElementById("situation-select").value;
      const desc      = document.getElementById("situation-desc-text").value.trim();
      const recipient = document.getElementById("recipient-select-b").value;
      const sender    = document.getElementById("sender-select-b").value;

      if (!situation && !desc) {
        alert("Please describe the situation or choose a common situation from the dropdown.");
        return;
      }

      showLoading("Generating your draft…");

      try {
        const res = await fetch("/api/draft", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ situation, description: desc, recipientType: recipient, senderName: sender })
        });
        const data = await res.json();
        hideLoading();

        // Pre-fill Mode A with the generated draft and switch to it
        document.getElementById("email-textarea").value = data.draft;
        document.getElementById("recipient-select").value = recipient;
        document.getElementById("sender-select-a").value = sender;

        // Switch to Mode A
        modeBtns[0].click();

        // Scroll to textarea
        document.getElementById("email-textarea").focus();
        showToast("Draft ready. Review it, then click Review My Email.");
      } catch (err) {
        hideLoading();
        showReviewError("Something went wrong generating the draft. Please try again.");
        console.error(err);
      }
    });
  }

  // ---- RENDER REVIEW RESULT ----
  function renderReviewResult(data, originalText) {
    resultSection.classList.remove("hidden");
    resultSection.innerHTML = "";

    const status = data.status;

    // --- Polish Diff Section (if polished text available) ---
    if (data.polished && status !== "route") {
      const diffCard = buildDiffCard(originalText, data.polished, data.changes || []);
      resultSection.appendChild(diffCard);
    }

    // --- Status Card ---
    let statusCard;
    if (status === "clear")       statusCard = buildClearCard(data);
    else if (status === "needs_edits") statusCard = buildEditsCard(data);
    else if (status === "route")  statusCard = buildRouteCard(data);
    else {
      statusCard = document.createElement("div");
      statusCard.className = "card";
      statusCard.textContent = "Unexpected result from the server.";
    }
    resultSection.appendChild(statusCard);

    // --- Follow-up detection ---
    if (data.followup) {
      const fuBanner = buildFollowUpBanner(data.followup);
      resultSection.appendChild(fuBanner);
    }

    // Scroll to result
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function buildDiffCard(original, polished, changes) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2 style="font-size:16px;font-weight:800;color:var(--navy);margin-bottom:14px;">Polish Suggestions</h2>
      <div class="diff-wrap">
        <div>
          <div class="diff-pane-label">Your Original</div>
          <div class="diff-pane" id="diff-original"></div>
        </div>
        <div>
          <div class="diff-pane-label">Polished Version</div>
          <div class="diff-pane" id="diff-polished"></div>
        </div>
      </div>
      ${changes.length ? `
        <p style="font-size:13px;font-weight:700;color:var(--gray-600);margin-bottom:4px;">Changes made:</p>
        <ul class="change-list">
          ${changes.map(c => `<li>${escHtml(c)}</li>`).join("")}
        </ul>
      ` : ""}
      <div class="btn-group">
        <button class="btn btn-green btn-sm" id="accept-polish-btn">Accept Polish</button>
        <button class="btn btn-outline btn-sm" id="keep-original-btn">Keep My Original</button>
      </div>
      <p id="accepted-msg" class="text-sm text-muted mt-8 hidden">Polished version accepted. Use the "Copy Email" button below.</p>
    `;

    card.querySelector("#diff-original").textContent = original;
    card.querySelector("#diff-polished").textContent = polished;

    // Store active text choice
    let activeText = polished;

    card.querySelector("#accept-polish-btn").addEventListener("click", () => {
      activeText = polished;
      card.querySelector("#accepted-msg").textContent = "Polished version accepted.";
      card.querySelector("#accepted-msg").classList.remove("hidden");
      // Update copy button target
      window._guardianActiveEmail = polished;
    });
    card.querySelector("#keep-original-btn").addEventListener("click", () => {
      activeText = original;
      card.querySelector("#accepted-msg").textContent = "Keeping your original.";
      card.querySelector("#accepted-msg").classList.remove("hidden");
      window._guardianActiveEmail = original;
    });

    window._guardianActiveEmail = polished; // default
    return card;
  }

  function buildClearCard(data) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="status-banner status-clear">
        <div class="status-icon" aria-hidden="true">✓</div>
        <div>
          <div class="status-title">Clear to Send</div>
          <div class="status-body">This email meets professional standards and is ready to go.</div>
        </div>
      </div>
      <div style="display:flex;align-items:baseline;gap:12px;margin:16px 0 8px;">
        <span style="font-size:13px;font-weight:700;color:var(--gray-600);">Excellence Score</span>
        <div class="score-badge">
          <span class="score-num">${data.excellence_score}</span>
          <span class="score-denom">/10</span>
        </div>
      </div>
      ${data.suggestion ? `
        <p style="font-size:14px;color:var(--gray-600);margin-bottom:16px;padding:10px 14px;background:var(--blue-bg);border-radius:var(--radius);">
          <strong>To score a 10:</strong> ${escHtml(data.suggestion)}
        </p>
      ` : ""}
      <button class="btn btn-primary" id="copy-email-btn">Copy Email to Clipboard</button>
    `;

    card.querySelector("#copy-email-btn").addEventListener("click", () => {
      const text = window._guardianActiveEmail || data.polished || "";
      navigator.clipboard.writeText(text).then(() => {
        showToast("Email copied to clipboard.");
      }).catch(() => {
        showToast("Could not copy — please select and copy manually.");
      });
    });

    return card;
  }

  function buildEditsCard(data) {
    const card = document.createElement("div");
    card.className = "card";

    const issuesHtml = (data.issues || []).map((issue, i) => `
      <li class="issue-item">
        <div class="issue-num">${i + 1}</div>
        <div>
          <div class="issue-text">${escHtml(issue.what)}</div>
          <div class="issue-fix"><strong>Fix:</strong> ${escHtml(issue.fix)}</div>
        </div>
      </li>
    `).join("");

    card.innerHTML = `
      <div class="status-banner status-edits">
        <div class="status-icon" aria-hidden="true">!</div>
        <div>
          <div class="status-title">Needs Edits</div>
          <div class="status-body">Please fix the issues below before sending this email.</div>
        </div>
      </div>
      ${data.excellence_score !== null ? `
        <div style="display:flex;align-items:baseline;gap:12px;margin:8px 0 16px;">
          <span style="font-size:13px;font-weight:700;color:var(--gray-600);">Excellence Score</span>
          <div class="score-badge">
            <span class="score-num" style="color:var(--yellow);">${data.excellence_score}</span>
            <span class="score-denom">/10</span>
          </div>
        </div>
      ` : ""}
      <ul class="issue-list">${issuesHtml}</ul>
      <label for="edit-textarea" style="margin-top:8px;">Edit your email here:</label>
      <textarea id="edit-textarea" class="tall" style="margin-bottom:12px;"></textarea>
      <button class="btn btn-gold" id="re-review-btn">Re-Review</button>
    `;
    card.querySelector("#edit-textarea").value = data.polished || data.original || "";

    card.querySelector("#re-review-btn").addEventListener("click", async () => {
      const newText = card.querySelector("#edit-textarea").value.trim();
      if (!newText) { alert("Please write your email before re-reviewing."); return; }

      showLoading("Re-reviewing your updated email…");
      try {
        const res = await fetch("/api/review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailText: newText })
        });
        const data2 = await res.json();
        hideLoading();
        renderReviewResult(data2, newText);
      } catch (err) {
        hideLoading();
        showReviewError("Something went wrong. Please try again.");
      }
    });

    return card;
  }

  function buildRouteCard(data) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="status-banner status-route">
        <div class="status-icon" aria-hidden="true">🚩</div>
        <div>
          <div class="status-title">Routed to Susan</div>
          <div class="status-body">This email has been flagged for Susan's review before it sends.</div>
        </div>
      </div>
      <div style="margin:14px 0;padding:14px 16px;background:var(--red-bg);border-radius:var(--radius);border-left:4px solid var(--red);">
        <p style="font-size:13px;font-weight:700;color:var(--red);margin-bottom:4px;">Why this was flagged:</p>
        <p style="font-size:14px;color:var(--gray-800);">${escHtml(data.flag_reason || "")}</p>
      </div>
      <div style="padding:14px 16px;background:var(--yellow-bg);border-radius:var(--radius);">
        <p style="font-size:14px;font-weight:600;color:var(--yellow);">Do not send this email yet.</p>
        <p style="font-size:13px;color:var(--gray-600);margin-top:4px;">Susan will review and respond within 2 business hours. You'll receive a Slack message when she's made a decision.</p>
      </div>
    `;
    return card;
  }

  function buildFollowUpBanner(followup) {
    const wrap = document.createElement("div");
    wrap.className = "followup-banner";
    wrap.innerHTML = `
      <div class="followup-icon">🗓</div>
      <div class="followup-body">
        <div class="followup-title">Date Commitment Detected</div>
        <div class="followup-text">"${escHtml(followup.text)}"</div>
        <div style="margin-top:10px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <input type="date" value="${followup.date}" id="followup-date-input" style="width:auto;padding:6px 10px;font-size:13px;border:1.5px solid var(--gray-200);border-radius:var(--radius);">
          <button class="btn btn-yellow btn-sm" id="confirm-followup-btn">Confirm Follow-Up</button>
        </div>
        <p id="followup-confirmed" class="text-sm text-muted mt-8 hidden">Follow-up added to your tracker.</p>
      </div>
    `;
    wrap.querySelector("#confirm-followup-btn").addEventListener("click", () => {
      wrap.querySelector("#followup-confirmed").classList.remove("hidden");
      wrap.querySelector("#confirm-followup-btn").disabled = true;
      showToast("Follow-up saved.");
    });
    return wrap;
  }

  function showReviewError(msg) {
    resultSection.classList.remove("hidden");
    resultSection.innerHTML = `
      <div class="card" style="border-left:4px solid var(--red);">
        <p style="color:var(--red);font-weight:600;">${escHtml(msg)}</p>
      </div>
    `;
  }

  // ---- Utility ----
  function escHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
});
