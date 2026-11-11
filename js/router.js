/* ------------------------------------------------------------------
   Ongaku — router.js
   Tiny hash router. Hash URLs keep the app working from file:// with
   no server or build step. Screens register a route key and the app
   supplies the render callback.
------------------------------------------------------------------- */

(function () {
  "use strict";

  var routes = [];
  var onChange = function () {};
  var current = null;
  var started = false;

  function parseHash() {
    var raw = window.location.hash.replace(/^#\/?/, "");
    var key = raw.split("?")[0];
    return routes.indexOf(key) !== -1 ? key : routes[0] || "home";
  }

  function handle() {
    var key = parseHash();
    if (started && key === current) return;
    current = key;
    started = true;
    onChange(key);
  }

  window.Ongaku = window.Ongaku || {};

  window.Ongaku.router = {
    register: function (key) {
      if (routes.indexOf(key) === -1) routes.push(key);
    },

    start: function (callback) {
      onChange = typeof callback === "function" ? callback : function () {};

      if (routes.length === 0) routes.push("home");

      window.addEventListener("hashchange", handle);

      if (!window.location.hash) {
        window.location.hash = "#/" + routes[0];
      }

      handle();
    },

    navigate: function (key) {
      var next = "#/" + key;
      if (window.location.hash === next) handle();
      else window.location.hash = next;
    }
  };
})();
