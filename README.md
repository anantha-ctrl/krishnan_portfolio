# Krishnan K — Video Editor Portfolio

Portfolio website for **Krishnan K**, a freelance video editor (Instagram Reels, short-form content, YouTube editing, thumbnail design).

It is a plain **HTML + CSS + JavaScript** site with no framework, no build step and no backend. Open the HTML files directly or serve the `Frontend` folder with any static server.

---

## Project structure

```
Krishnan Portfolio/
├── README.md
└── Frontend/
    ├── index.html      Home page
    ├── work.html       Showreel + project gallery (filters + video popup)
    ├── about.html      About + experience
    ├── services.html   Services + tools / skill bars
    ├── contact.html    Contact (copy-email button)
    ├── krishnan.png    Portrait photo
    ├── css/style.css   All styles (light + dark theme, responsive)
    └── js/
        ├── config.js   ★ Edit this file to change content
        └── main.js     Shared script for all pages (no need to edit)
```

---

## How to run

**Option 1: VS Code Live Server.** Right-click `Frontend/index.html` → *Open with Live Server*. It opens at `http://127.0.0.1:5500/Frontend/index.html`.

**Option 2: XAMPP.** Start Apache and open `http://localhost/Krishnan%20Portfolio/Frontend/`.

Use a server, not a double-click on the file. YouTube and Instagram embeds don't load reliably from `file://` URLs.

---

## How to update content (only `js/config.js`)

| Setting | What it does |
|---|---|
| `THEME` | Default theme: `"light"` or `"dark"`. Visitors can switch it with the ◐ button, and their choice is remembered. |
| `SHOWREEL_SRC` | Showreel video. It accepts a YouTube, Google Drive, Vimeo or Instagram link, or a local file like `"videos/showreel.mp4"`. |
| `SHOWREEL_POSTER` | Optional cover image for a local showreel file. |
| `PREVIEW_START` | Second where the showreel preview loop starts. |
| `PREVIEW_LENGTH` | Length of the preview loop in seconds (default `3`). |
| `SHOW_EMPTY_PLACEHOLDERS` | `true` shows "Coming soon" cards for items without a link. `false` hides them. |
| `EMAIL` | Email used by the copy-email button on the Contact page. |
| `WORK` | The project list (see below). |
| `FACTS`, `TOOLS`, `SERVICES`, `MARQUEE`, `FILTERS` | Stats, skill bars, service cards, scrolling text and gallery filter buttons. |

### Adding a project

Each line in `WORK` is one card, and cards appear in the same order as the lines:

```js
reel("Title", "link or file", "description", "cover image"),     // Instagram Reels (vertical)
short("Title", "link or file", "description", "cover image"),    // Short-form (vertical)
youtube("Title", "link or file", "description", "cover image"),  // YouTube (wide)
thumb("Title", "images/thumb.jpg"),                              // Thumbnail image
```

- YouTube, Drive and Vimeo links get their cover image automatically.
- Google Drive files must be shared as **"Anyone with the link"**.
- Put local videos in `Frontend/videos/` and images in `Frontend/images/`. Create these folders when you need them.
- Description and cover image are optional. Every line must end with a comma.

---

## Features

**All pages**
- Floating pill navbar with the active page highlighted, plus a mobile hamburger menu
- Light and dark theme toggle (saved in `localStorage`)
- Custom cursor with a "PLAY" label over video cards (mouse devices only)
- Scroll-reveal animations, which turn off for users who prefer reduced motion
- SEO: unique `<title>` and description per page, Open Graph tags, keywords, and `Person` JSON-LD on the home page
- Google Fonts: Space Grotesk (headings) and Inter (body). Accent colour: `#C6FF00`
- Responsive layouts from desktop down to small phones

**Home (`index.html`)**: hero with a parallax portrait card, short intro, facts/stats, scrolling marquee, "Where to next" links to the other pages, and a quote with a "View showreel" button.

**Work (`work.html`)**
- **Showreel**: plays a muted 2–3 second preview loop automatically. Clicking it plays the full video with sound (details below).
- **Selected projects** gallery: filter buttons (All / Instagram Reels / Short-Form / YouTube / Thumbnails) and auto cover images. Local videos are lazy-loaded and play on hover.
- **Popup player**: opens the video or image in a modal. Esc or a click outside closes it, and keyboard focus is handled.
- A filter can be opened from a link, e.g. `work.html?f=reel`.

**About (`about.html`)**: intro, facts, experience and journey (Spark Zen, Samudhra Tech Solutions, Cloud Hawk).

**Services (`services.html`)**: four service cards and "Tools I work with" skill bars (CapCut, Photoshop, Premiere Pro, After Effects).

**Contact (`contact.html`)**: large call to action and a copy-email button with a toast message.

---

## Work log (from the start to now)

1. **Site setup.** Built a 5-page static portfolio (Home, Work, About, Services, Contact) with one shared stylesheet and one shared script.
2. **Design system.** Added light and dark themes with CSS variables, the lime accent, Space Grotesk + Inter fonts, rounded cards, the floating navbar and a custom cursor.
3. **Content in one file.** Moved all editable content into `js/config.js` (`WORK`, `FACTS`, `TOOLS`, `SERVICES`, `MARQUEE`), so updates never touch the HTML.
4. **Smart link handling.** Added `media()` in `main.js`, which turns YouTube, Google Drive, Vimeo and Instagram links into embeds. Any other value is treated as a local video file.
5. **Work gallery.** Added filter buttons, auto cover images, a fallback card when a cover fails to load, Instagram previews, hover-play for local videos, and the popup player.
6. **Showreel player.** Built a custom player for local files (play/pause, seek bar, time, mute, fullscreen, keyboard shortcuts) that autoplays muted when scrolled into view. A YouTube, Drive or Vimeo showreel opens in that service's player.
7. **Real content added.** Set the showreel to a YouTube video (`SHOWREEL_SRC`) and added the first two Instagram reels.
8. **SEO and accessibility.** Added page titles and descriptions, Open Graph tags, JSON-LD, ARIA labels, focus handling in the modal, and reduced-motion support.
9. **Showreel preview loop (latest change).**
   - A YouTube showreel now plays a **muted preview loop** of `PREVIEW_LENGTH` seconds starting at `PREVIEW_START`, with no YouTube controls. Every few seconds the page tells the YouTube player to jump back to the start point.
   - The YouTube title bar and the "Watch on YouTube" button are cropped out by making the iframe taller than its box (`.ytp` in `style.css`).
   - A play button and a "Click to watch full video" label sit on top of the video. **Clicking it** loads the full YouTube video with sound and controls.
   - Local showreel files (`videos/showreel.mp4`) use the same preview loop until the visitor presses play.
   - Files changed: `js/config.js` (two new settings), `js/main.js` (showreel block) and `css/style.css` (`.vp.prev`, `.ytp`, `.pvt`).

---

## To-do

- [ ] Add links for Reel 03, Short 01, YouTube Video 01 and 02, and Thumbnails 01 and 02 in `config.js`
- [ ] Set `PREVIEW_START` to the best-looking part of the showreel
- [ ] Add `og:image` and a favicon
- [ ] Choose hosting (GitHub Pages, Netlify or Vercel all work, since the site is static)
