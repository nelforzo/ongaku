/* ------------------------------------------------------------------
   Ongaku — app.js
   Boots the screen registry, wires navigation and the persistent
   player bar. Runs last; screens register themselves on
   window.Ongaku.screens.
------------------------------------------------------------------- */

(function () {
  "use strict";

  var screens = window.Ongaku.screens || {};
  var screenOrder = ["home", "library", "player", "settings"];

  var screenRoot = document.getElementById("screen");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-route]"));

  var iconPlay =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  var iconPause =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';

  function updateRangeFill(input) {
    var max = Number(input.max) || 100;
    var value = Number(input.value) || 0;
    var percent = Math.max(0, Math.min(100, (value / max) * 100));
    input.style.setProperty("--range-progress", percent + "%");
  }

  function initRanges() {
    var ranges = document.querySelectorAll(".range");
    Array.prototype.forEach.call(ranges, function (input) {
      if (input.dataset.rangeReady !== "true") {
        input.dataset.rangeReady = "true";
        input.addEventListener("input", function () {
          updateRangeFill(input);
        });
      }
      updateRangeFill(input);
    });
  }

  function initPlayerBar() {
    var toggle = document.querySelector('[data-player="toggle"]');
    if (toggle) {
      toggle.addEventListener("click", function () {
        var playing = toggle.getAttribute("aria-pressed") === "true";
        toggle.setAttribute("aria-pressed", String(!playing));
        toggle.setAttribute("aria-label", playing ? "Play" : "Pause");
        toggle.innerHTML = playing ? iconPlay : iconPause;
      });
    }

    initRanges();
  }

  function setActiveNav(key) {
    navLinks.forEach(function (link) {
      var active = link.getAttribute("data-route") === key;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function show(key) {
    var screen = screens[key];
    if (!screen) return;

    screenRoot.innerHTML = screen.render();

    if (typeof screen.mount === "function") {
      screen.mount(screenRoot);
    }

    setActiveNav(key);
    document.title = screen.title + " — Ongaku";
    initRanges();
    window.scrollTo(0, 0);
  }

  // Keep the in-page skip link from being treated as a route by the
  // hash router: move focus without touching location.hash.
  var skipLink = document.querySelector(".skip-link");
  if (skipLink) {
    skipLink.addEventListener("click", function (event) {
      var main = document.getElementById("main");
      if (!main) return;
      event.preventDefault();
      main.focus();
      main.scrollIntoView({ block: "start" });
    });
  }

  screenOrder.forEach(function (key) {
    if (screens[key]) window.Ongaku.router.register(key);
  });

  initPlayerBar();
  window.Ongaku.router.start(show);
})();
