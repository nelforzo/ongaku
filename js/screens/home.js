/* Home screen ------------------------------------------------------ */

(function () {
  "use strict";

  window.Ongaku = window.Ongaku || {};
  window.Ongaku.screens = window.Ongaku.screens || {};

  var shortcuts = [
    { title: "Playlist placeholder", meta: "Updated recently" },
    { title: "Album placeholder", meta: "Favourite artist" },
    { title: "Mix placeholder", meta: "Made for you" },
    { title: "Radio placeholder", meta: "Based on your library" }
  ];

  var recent = [
    { title: "Album placeholder 1", meta: "Artist name" },
    { title: "Album placeholder 2", meta: "Artist name" },
    { title: "Album placeholder 3", meta: "Artist name" },
    { title: "Album placeholder 4", meta: "Artist name" },
    { title: "Album placeholder 5", meta: "Artist name" },
    { title: "Album placeholder 6", meta: "Artist name" }
  ];

  var madeForYou = [
    { title: "Daily mix placeholder", meta: "Mix · 30 tracks" },
    { title: "Discover placeholder", meta: "Playlist · 50 tracks" },
    { title: "Focus placeholder", meta: "Playlist · 40 tracks" },
    { title: "Archive placeholder", meta: "Collection" }
  ];

  function mediaCard(item) {
    return (
      '<article class="card media-card">' +
        '<div class="wf-art media-card__art" aria-hidden="true"></div>' +
        '<div class="media-card__body">' +
          '<p class="media-card__title">' + item.title + "</p>" +
          '<p class="media-card__meta">' + item.meta + "</p>" +
        "</div>" +
      "</article>"
    );
  }

  function shortcutsRow() {
    return shortcuts
      .map(function (item) {
        return (
          '<button class="shortcut" type="button">' +
            '<span class="wf-art shortcut__art" aria-hidden="true"></span>' +
            '<span class="shortcut__text">' +
              '<span class="shortcut__title">' + item.title + "</span>" +
              '<span class="shortcut__meta">' + item.meta + "</span>" +
            "</span>" +
          "</button>"
        );
      })
      .join("");
  }

  window.Ongaku.screens.home = {
    title: "Home",

    render: function () {
      return (
        '<section class="page-head">' +
          "<div>" +
            '<p class="eyebrow">Home</p>' +
            '<h2 class="page-title">Good evening</h2>' +
            '<p class="page-sub">A wireframe of the home screen. Layout and placeholder content only — real features will follow the spec.</p>' +
          "</div>" +
          '<div class="page-actions">' +
            '<button class="btn btn--primary" type="button">Shuffle</button>' +
          "</div>" +
        "</section>" +

        '<section class="wf-panel hero" aria-labelledby="hero-title">' +
          '<div class="wf-art hero__art" aria-hidden="true">artwork</div>' +
          '<div class="hero__body">' +
            '<p class="eyebrow">Featured</p>' +
            '<h3 class="hero__title" id="hero-title">Hero panel placeholder</h3>' +
            '<p class="page-sub">A large slot for whatever deserves attention: a new release, a playlist, or a “continue listening” shortcut.</p>' +
            '<div class="hero__actions">' +
              '<button class="btn btn--primary" type="button">Play</button>' +
              '<button class="btn btn--ghost" type="button">Details</button>' +
            "</div>" +
          "</div>" +
        "</section>" +

        '<section class="section" aria-labelledby="shortcuts-title">' +
          '<div class="section__head">' +
            '<h3 class="section__title" id="shortcuts-title">Jump back in</h3>' +
            '<a class="section__link" href="#/library">View library</a>' +
          "</div>" +
          '<div class="shortcut-row">' + shortcutsRow() + "</div>" +
        "</section>" +

        '<section class="section" aria-labelledby="recent-title">' +
          '<div class="section__head">' +
            '<h3 class="section__title" id="recent-title">Recently played</h3>' +
            '<a class="section__link" href="#/library">See all</a>' +
          "</div>" +
          '<div class="card-grid">' + recent.map(mediaCard).join("") + "</div>" +
        "</section>" +

        '<section class="section" aria-labelledby="made-title">' +
          '<div class="section__head">' +
            '<h3 class="section__title" id="made-title">Made for you</h3>' +
          "</div>" +
          '<div class="card-grid">' + madeForYou.map(mediaCard).join("") + "</div>" +
        "</section>"
      );
    }
  };
})();
