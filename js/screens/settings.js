/* Settings screen -------------------------------------------------- */

(function () {
  "use strict";

  window.Ongaku = window.Ongaku || {};
  window.Ongaku.screens = window.Ongaku.screens || {};

  function toggleRow(id, label, hint, checked) {
    return (
      "<li class=\"setting\">" +
        '<div class="setting__text">' +
          '<label class="setting__label" for="' + id + '">' + label + "</label>" +
          '<p class="setting__hint">' + hint + "</p>" +
        "</div>" +
        '<div class="setting__control">' +
          '<label class="toggle">' +
            '<input type="checkbox" id="' + id + '"' + (checked ? " checked" : "") + ">" +
            "<span>Enabled</span>" +
          "</label>" +
        "</div>" +
      "</li>"
    );
  }

  window.Ongaku.screens.settings = {
    title: "Settings",

    render: function () {
      return (
        '<section class="page-head">' +
          "<div>" +
            '<p class="eyebrow">Settings</p>' +
            '<h2 class="page-title">Preferences</h2>' +
            '<p class="page-sub">Placeholder settings groups. Options will be wired up as the spec defines them.</p>' +
          "</div>" +
        "</section>" +

        '<div class="settings">' +
          '<section class="settings__group" aria-labelledby="settings-playback">' +
            '<h3 class="settings__heading" id="settings-playback">Playback</h3>' +
            '<ul class="settings__list">' +
              toggleRow("opt-crossfade", "Crossfade", "Blend the end of one track into the next.", true) +
              toggleRow("opt-resume", "Resume on launch", "Pick up the last queue when the app opens.", true) +
              toggleRow("opt-autoplay", "Autoplay similar tracks", "Keep playing after the queue ends.", false) +
            "</ul>" +
          "</section>" +

          '<section class="settings__group" aria-labelledby="settings-library">' +
            '<h3 class="settings__heading" id="settings-library">Library</h3>' +
            '<ul class="settings__list">' +
              toggleRow("opt-numbers", "Show track numbers", "Display row numbers in the track list.", true) +
              '<li class="setting">' +
                '<div class="setting__text">' +
                  '<p class="setting__label">Music folder</p>' +
                  '<p class="setting__hint">Where the app looks for local files.</p>' +
                "</div>" +
                '<div class="setting__control">' +
                  '<button class="btn btn--ghost btn--sm" type="button">Choose…</button>' +
                "</div>" +
              "</li>" +
            "</ul>" +
          "</section>" +

          '<section class="settings__group" aria-labelledby="settings-about">' +
            '<h3 class="settings__heading" id="settings-about">About</h3>' +
            '<div class="about">' +
              "<span>Ongaku — offline music player. Wireframe build, specs pending.</span>" +
              '<span class="about__version">v0.0.1</span>' +
            "</div>" +
          "</section>" +
        "</div>"
      );
    }
  };
})();
