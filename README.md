# Ongaku

Offline music player, built as a static HTML app with vanilla JavaScript. No
build step, no dependencies, no network access required.

**Status:** wireframe. Layout, navigation and placeholder screens only. Product
specs are still to come; expect structure and content to change.

## Run

Open `index.html` directly in a browser, or serve the folder locally:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Everything works from `file://` as well: scripts are plain `<script>` tags (no
ES modules), styling is local, and routing uses URL hashes.

## Structure

```
index.html            App shell: header, nav, screen outlet, player bar
css/
  base.css            Tokens, reset, shell layout, shared wireframe components
  screens/
    home.css          Screen-specific styles, loaded up front
    library.css
    player.css
    settings.css
js/
  router.js           Tiny hash router (#/home, #/library, …)
  app.js              Boot, screen rendering, nav state, player bar wiring
  screens/
    home.js           One file per screen, registered on window.Ongaku.screens
    library.js
    player.js
    settings.js
```

## Adding a screen

1. Create `css/screens/<name>.css` and link it in `index.html` from the
   `<head>`.
2. Create `js/screens/<name>.js` and register it:

   ```js
   window.Ongaku.screens.<name> = {
     title: "Page title",
     render: function () {
       return "<section>…</section>"; // HTML string
     },
     mount: function (root) {
       // optional: attach listeners after the markup is in the DOM
     }
   };
   ```

3. Add the script tag before `js/app.js` and add `<name>` to `screenOrder` in
   `js/app.js`.
4. Add a nav link in `index.html` with `data-route="<name>"` and
   `href="#/<name>"`.

## Conventions

- Screen modules render HTML strings; keep markup out of `app.js`.
- Shared UI (buttons, chips, cards, wireframe placeholders) lives in
  `css/base.css`; screen files only add layout that belongs to that screen.
- Wireframe placeholders use `.wf-art`, `.wf-panel` and `.wf-line` so they are
  easy to find and remove when real content arrives.
- Use design tokens (`var(--surface)`, `var(--accent)`, …) instead of hard-coded
  colours. Dark mode follows the system preference automatically.
- Player bar and player screen buttons are local wireframe stubs; there is no
  audio engine yet.
