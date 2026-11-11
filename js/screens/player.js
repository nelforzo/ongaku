/* Player screen ---------------------------------------------------- */

(function () {
  "use strict";

  window.Ongaku = window.Ongaku || {};
  window.Ongaku.screens = window.Ongaku.screens || {};

  var iconPlay =
    '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  var iconPause =
    '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';

  var queue = [
    { title: "Track title 01", artist: "Artist 01", time: "3:24", current: true },
    { title: "Track title 02", artist: "Artist 02", time: "4:02", current: false },
    { title: "Track title 03", artist: "Artist 03", time: "2:58", current: false },
    { title: "Track title 04", artist: "Artist 04", time: "5:11", current: false },
    { title: "Track title 05", artist: "Artist 05", time: "3:40", current: false },
    { title: "Track title 06", artist: "Artist 06", time: "3:05", current: false }
  ];

  function queueItem(track, index) {
    return (
      '<li class="queue-item' + (track.current ? " is-current" : "") + '">' +
        '<span class="queue-item__index">' + (index + 1) + "</span>" +
        "<div>" +
          '<p class="queue-item__title">' + track.title + "</p>" +
          '<p class="queue-item__artist">' + track.artist + "</p>" +
        "</div>" +
        '<span class="queue-item__time">' + track.time + "</span>" +
      "</li>"
    );
  }

  window.Ongaku.screens.player = {
    title: "Player",

    render: function () {
      return (
        '<section class="page-head">' +
          "<div>" +
            '<p class="eyebrow">Player</p>' +
            '<h2 class="page-title">Now playing</h2>' +
            '<p class="page-sub">Full-screen playback view with artwork, transport controls and the queue.</p>' +
          "</div>" +
        "</section>" +

        '<div class="player-screen">' +
          '<section class="wf-panel now-playing" aria-label="Current track">' +
            '<div class="wf-art now-playing__art" aria-hidden="true">artwork</div>' +
            '<div class="now-playing__meta">' +
              '<h3 class="now-playing__title">Track title 01</h3>' +
              '<p class="now-playing__artist">Artist 01 · Album 01</p>' +
            "</div>" +

            '<div class="scrubber">' +
              '<span class="scrubber__time">0:00</span>' +
              '<input class="range" type="range" min="0" max="100" value="0" step="1" aria-label="Seek">' +
              '<span class="scrubber__time">3:24</span>' +
            "</div>" +

            '<div class="now-playing__controls">' +
              '<button class="control-btn" type="button" aria-label="Shuffle">' +
                '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h3l10 12h3M4 18h3L17 6h3"/><path d="M17 4l3 2-3 2M17 16l3 2-3 2"/></svg>' +
              "</button>" +
              '<button class="control-btn" type="button" aria-label="Previous track">' +
                '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M6 5h2v14H6zM20 5v14L9 12z"/></svg>' +
              "</button>" +
              '<button class="control-btn control-btn--play" type="button" aria-label="Play" aria-pressed="false" data-player-screen-toggle>' +
                iconPlay +
              "</button>" +
              '<button class="control-btn" type="button" aria-label="Next track">' +
                '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M18 5h-2v14h2zM4 5v14l11-7z"/></svg>' +
              "</button>" +
              '<button class="control-btn" type="button" aria-label="Repeat">' +
                '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 3l3 3-3 3"/><path d="M20 6H8a4 4 0 0 0-4 4v1"/><path d="M7 21l-3-3 3-3"/><path d="M4 18h12a4 4 0 0 0 4-4v-1"/></svg>' +
              "</button>" +
            "</div>" +

            '<div class="now-playing__extras">' +
              '<button class="btn btn--ghost btn--sm" type="button">Add to playlist</button>' +
              '<button class="btn btn--ghost btn--sm" type="button">Like</button>' +
              '<button class="btn btn--ghost btn--sm" type="button">Lyrics</button>' +
            "</div>" +
          "</section>" +

          '<aside class="wf-panel" aria-labelledby="queue-title">' +
            '<h3 class="queue__title" id="queue-title">Queue</h3>' +
            '<ol class="queue-list">' + queue.map(queueItem).join("") + "</ol>" +
          "</aside>" +
        "</div>"
      );
    },

    mount: function (root) {
      var toggle = root.querySelector("[data-player-screen-toggle]");
      if (!toggle) return;

      toggle.addEventListener("click", function () {
        var playing = toggle.getAttribute("aria-pressed") === "true";
        toggle.setAttribute("aria-pressed", String(!playing));
        toggle.setAttribute("aria-label", playing ? "Play" : "Pause");
        toggle.innerHTML = playing ? iconPlay : iconPause;
      });
    }
  };
})();
