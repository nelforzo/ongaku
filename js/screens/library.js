/* Library screen --------------------------------------------------- */

(function () {
  "use strict";

  window.Ongaku = window.Ongaku || {};
  window.Ongaku.screens = window.Ongaku.screens || {};

  var filters = ["All", "Songs", "Albums", "Artists"];

  var tracks = [];
  for (var i = 1; i <= 12; i++) {
    var n = String(i).padStart(2, "0");
    tracks.push({
      title: "Track title " + n,
      artist: "Artist " + n,
      album: "Album " + n,
      time: "3:" + String(10 + ((i * 7) % 50)).padStart(2, "0")
    });
  }

  function chips() {
    return filters
      .map(function (label, index) {
        return (
          '<button class="chip' + (index === 0 ? " is-active" : "") + '"' +
            ' type="button" aria-pressed="' + (index === 0) + '">' +
            label +
          "</button>"
        );
      })
      .join("");
  }

  function row(track, index) {
    var searchText = [track.title, track.artist, track.album].join(" ");

    return (
      '<div class="tracklist__row" data-track data-search="' + searchText + '">' +
        '<span class="tracklist__index">' + (index + 1) + "</span>" +
        '<div class="tracklist__main">' +
          '<span class="wf-art tracklist__art" aria-hidden="true"></span>' +
          "<div>" +
            '<p class="tracklist__title">' + track.title + "</p>" +
            '<p class="tracklist__artist">' + track.artist + "</p>" +
          "</div>" +
        "</div>" +
        '<span class="tracklist__album">' + track.album + "</span>" +
        '<span class="tracklist__time">' + track.time + "</span>" +
      "</div>"
    );
  }

  window.Ongaku.screens.library = {
    title: "Library",

    render: function () {
      return (
        '<section class="page-head">' +
          "<div>" +
            '<p class="eyebrow">Library</p>' +
            '<h2 class="page-title">Your music</h2>' +
            '<p class="page-sub">Browsing scaffold with search, filters and a track list.</p>' +
          "</div>" +
          '<div class="page-actions">' +
            '<button class="btn btn--ghost" type="button">Sort</button>' +
            '<button class="btn btn--primary" type="button">Import</button>' +
          "</div>" +
        "</section>" +

        '<div class="library__toolbar">' +
          '<label class="field">' +
            '<span class="visually-hidden">Search library</span>' +
            '<input type="search" placeholder="Search tracks, artists, albums" data-library-search>' +
          "</label>" +
          '<div class="chips" role="group" aria-label="Filter library">' + chips() + "</div>" +
        "</div>" +

        '<p class="library__count" data-library-count>Showing ' + tracks.length + " of " + tracks.length + " tracks</p>" +

        '<div class="tracklist" data-tracklist>' +
          '<div class="tracklist__head" aria-hidden="true">' +
            "<span>#</span><span>Title</span><span>Album</span><span>Time</span>" +
          "</div>" +
          tracks.map(row).join("") +
          '<p class="library__empty">Nothing matches that search yet.</p>' +
        "</div>"
      );
    },

    mount: function (root) {
      var list = root.querySelector("[data-tracklist]");
      var rows = Array.prototype.slice.call(root.querySelectorAll("[data-track]"));
      var search = root.querySelector("[data-library-search]");
      var count = root.querySelector("[data-library-count]");

      function applyFilter() {
        var query = (search.value || "").trim().toLowerCase();
        var visible = 0;

        rows.forEach(function (item) {
          var match = !query || item.getAttribute("data-search").toLowerCase().indexOf(query) !== -1;
          item.hidden = !match;
          if (match) visible++;
        });

        list.classList.toggle("is-empty", visible === 0);
        count.textContent = "Showing " + visible + " of " + rows.length + " tracks";
      }

      search.addEventListener("input", applyFilter);

      Array.prototype.forEach.call(root.querySelectorAll(".chip"), function (chip) {
        chip.addEventListener("click", function () {
          Array.prototype.forEach.call(root.querySelectorAll(".chip"), function (other) {
            other.classList.remove("is-active");
            other.setAttribute("aria-pressed", "false");
          });
          chip.classList.add("is-active");
          chip.setAttribute("aria-pressed", "true");
        });
      });
    }
  };
})();
