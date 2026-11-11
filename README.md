# Ongaku

An offline-first playlist app that plays audio from YouTube. Playlists,
songs and downloaded covers live on the device. Audio (and the YouTube
player used to stream it) needs an internet connection.

Pure HTML, CSS and vanilla JavaScript. No build step, no framework, no npm
install. Dexie is vendored; the YouTube IFrame API is loaded at runtime.

## Run

Serve the folder locally (recommended — the YouTube IFrame API is happiest on
a real origin):

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` directly also works for browsing the library, but some
browsers restrict the YouTube player and image downloads on `file://`.

## What it does

- **Playlists** — create with a name and optional cover image URL, rename,
  re-cover, delete. The cover is downloaded, resized to ≤512 px, converted to
  JPEG and stored in `localStorage`; the source URL stays on the record.
- **Songs** — each song has a name, YouTube URL and optional picture URL.
  Playlists hold any number of songs.
- **Playback** — YouTube audio through a hidden 1×1 iframe. The video is never
  shown. Play/pause, previous and next live in the sticky player bar.
- **Cover fallback** — playing art uses the song picture if set, otherwise the
  playlist cover, otherwise a placeholder. Images that fail to load fall back
  the same way.
- **Persistence** — playlist and song records are stored in IndexedDB via
  Dexie. Covers use `localStorage`, keeping large blobs out of the playlist
  records and out of exports.
- **Backup** — export the whole library or a single playlist as JSON. Cover
  data is not embedded: the export contains image URLs only. Import the file
  on another device and covers are downloaded again.
- **Navigation** — hash routes (`#/playlists`, `#/playlists/:id`), back links,
  browser history and a player that survives route changes.

## Structure

```
index.html                 App shell: header, library outlet, player, dialogs
css/
  base.css                 Tokens, reset, shared components, player, modals
  screens/
    playlists.css          Playlist grid
    playlist-detail.css    Playlist header, song list
js/
  vendor/dexie.min.js      Dexie 4 (Apache-2.0), vendored for offline use
  vendor/LICENSE-Dexie     Dexie license
  ui.js                    Icons, escapes, toasts, modals, menus, busy overlay
  images.js                Cover download → resize → localStorage
  db.js                    Dexie schema and playlist/song CRUD
  youtube.js               IFrame API loader, audio wrapper, URL parsing
  player.js                Queue, sticky player state, media session
  actions.js               Shared create/edit/delete/import/export flows
  router.js                Hash router with :params
  screens/
    playlists.js           Library grid
    playlist-detail.js     Playlist detail and song list
  app.js                   Boot and route mounting
```

## Data model

```js
// Dexie table: playlists
{
  id: 1,                    // auto-increment
  name: "Late night drive",
  imageUrl: "https://…",    // original cover URL (exports use this)
  createdAt: 1710000000000,
  updatedAt: 1710000000000,
  songs: [
    {
      id: "uuid",
      name: "Song title",
      url: "https://www.youtube.com/watch?v=…",
      pictureUrl: "https://…",  // optional
      addedAt: 1710000000000
    }
  ]
}

// localStorage key
"ongaku.cover.<playlist id>": "data:image/jpeg;base64,…"
```

### Export format

```json
{
  "app": "ongaku",
  "version": 1,
  "exportedAt": "2024-01-01T00:00:00.000Z",
  "playlists": [
    {
      "name": "Late night drive",
      "imageUrl": "https://…",
      "songs": [
        {
          "name": "Song title",
          "url": "https://www.youtube.com/watch?v=…",
          "pictureUrl": "https://…"
        }
      ]
    }
  ]
}
```

## Notes and limits

- Playback requires internet. The app shows an offline banner and reports
  YouTube/network errors in the player bar.
- Covers can only be stored automatically when the image host allows CORS.
  If a download is blocked, the playlist is still created and the original
  image URL is displayed, but the cover is not available offline. Re-exporting
  still includes that URL.
- The player uses the official YouTube IFrame Player API. Availability,
  embedding permissions and regional restrictions apply per video.
- `localStorage` is limited (usually ~5 MB per origin). Covers are compressed,
  but a very large library can still fill it; the app reports storage errors.
- There is no service worker or PWA manifest; the app itself is static files
  on disk. YouTube content is always streamed.
- Tested in modern evergreen browsers. Use the local HTTP server for the
  fewest surprises.
