/* ============================================================
   CrownKey Email Guardian — nav.js
   Injects the shared top navigation into every page.
   Call Nav.init() after DOMContentLoaded.
   ============================================================ */

const Nav = (function () {
  const LINKS = [
    { href: "index.html",    label: "Review Email",     id: "nav-review"   },
    { href: "incoming.html", label: "Incoming",         id: "nav-incoming" },
    { href: "followups.html",label: "Follow-Ups",       id: "nav-followups"},
    { href: "queue.html",    label: "Susan's Queue",    id: "nav-queue",  susanOnly: true },
    { href: "scores.html",   label: "Scorecards",       id: "nav-scores"   },
  ];

  function currentPage() {
    const parts = window.location.pathname.split("/");
    return parts[parts.length - 1] || "index.html";
  }

  function init() {
    const nav = document.createElement("nav");
    nav.id = "main-nav";
    nav.setAttribute("role", "navigation");
    nav.setAttribute("aria-label", "Main navigation");

    const inner = document.createElement("div");
    inner.className = "nav-inner";

    // Brand
    const brand = document.createElement("div");
    brand.className = "nav-brand";
    brand.innerHTML = `
      <div class="nav-logo" aria-hidden="true">CK</div>
      <div class="nav-title">Email Guardian<span>Crown Key Realty</span></div>
    `;

    // Hamburger toggle
    const toggle = document.createElement("button");
    toggle.className = "nav-toggle";
    toggle.setAttribute("aria-label", "Toggle navigation menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "nav-link-list");
    toggle.innerHTML = `<span></span><span></span><span></span>`;

    // Link list
    const linkList = document.createElement("div");
    linkList.className = "nav-links";
    linkList.id = "nav-link-list";

    const page = currentPage();

    LINKS.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.label;
      a.id = link.id;
      if (link.susanOnly) a.classList.add("susan-only");
      if (page === link.href) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
      linkList.appendChild(a);
    });

    toggle.addEventListener("click", () => {
      const isOpen = linkList.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu on link click (mobile)
    linkList.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        linkList.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    inner.appendChild(brand);
    inner.appendChild(toggle);
    inner.appendChild(linkList);
    nav.appendChild(inner);

    // Insert before first child of body
    document.body.insertBefore(nav, document.body.firstChild);
  }

  return { init };
})();
