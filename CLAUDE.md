# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A single-file, fully static browser game: **“360 User Stories – The Story Wheel”**, a storytelling
game for agile teams. Based on “360 Stories” by Wilma Mulder (www.360stories.one), adapted by
Udo Wiegärtner. The visual/game reference is the Miro board image
`360UserStories-Overview.jpg` in the `kosmonautica/MiroResources` repo (`360UserStories/`).

## Hard constraints

- **Everything lives in `index.html`** – HTML, CSS, JS, and SVG generation in one file.
- **No server, no build step, no external resources** (no CDNs, fonts, images). The page must
  work when opened via `file://` and offline.
- **UI language is English only** (an explicit owner decision; the topic labels come from the
  original English board).
- Keep the beige/red/gold/green/blue board look (`:root` CSS variables at the top of the file).
- **Build stamp (owner rule): on EVERY change to `index.html`, update the `#buildstamp` line in
  the footer** to the current time before committing – format `Build: YYYY-MM-DD HH:MM UTC`
  (get it via `date -u "+%Y-%m-%d %H:%M UTC"`). There is no build tooling to do this; it is a
  manual step that must not be forgotten.

## Architecture of index.html

Plain vanilla JS, no frameworks. The three wheels are SVGs generated at load time.

- **Data** (top of the `<script>`): `RING_BLUE` (32), `RING_GREEN` (16), `RING_GOLD` (8),
  `RING_RED` (4) hold the ring topics **clockwise starting at 12 o'clock**. Rings nest perfectly:
  blue index `i` maps to green `⌊i/2⌋`, gold `⌊i/4⌋`, red `⌊i/8⌋` (see `sectorTopics()`).
  `COLOR_SEGS` (blue/gold/white/red/green/black) and `CATEGORIES` (First/Last/Best/Worst/Advise/?)
  are the 6-sector small wheels; their sector 0 is **centered** at the top (sectors start at −30°).
- **Angle convention:** degrees clockwise from 12 o'clock; `pt(cx,cy,r,deg)` converts to x/y.
  Big-wheel sector index = `⌊angle/11.25⌋`; small wheels = `⌊((angle+30)%360)/60⌋`.
- **SVG builders:** `buildBigWheel()`, `buildColorWheel()`, `buildCategoryWheel()`. Labels are
  `textPath`s along per-segment arcs (`labelArc` flips direction in the bottom half so text stays
  upright; font size shrinks to fit the arc length). The big wheel also has `#wheelDim` (an
  even-odd “everything except the hit sector” fade overlay) and `#sectorHighlight` (dark outline).
- **Spinner mechanics:** `class Spinner` – arrows rotate, wheels stay fixed. `start()` sets a
  random velocity and arms an auto-stop timeout (~0.8–2.2 s); `stop()` switches to friction decay
  (×0.968/frame) until rest, then calls the per-wheel `onDone(angle)` callback. One global rAF
  loop ticks all spinners.
- **Game flow/state:** `state = {sector, color, topic, category, catPick}`. Callbacks:
  `directionDone` → `colorDone` → `categoryDone`. Steps are gated via disabled buttons; respinning
  an earlier wheel resets downstream results. `pointTo(id)` smooth-scrolls to the next step's card
  and pulses it. Landing on **“?”** on the category wheel works like black/white on the color
  wheel: `state.category` stays null, `catPick` turns on, and `renderCategoryPick()` renders a
  banner plus five tappable category chips into `#categoryPick` (in card 3).
- **Topic display:** `renderTopics()` renders the four topic chips into **two** places –
  `#wheelTopics` (under the big wheel) and `#topics` (in the “Your Story” card) – plus the
  Blackbox/Wildcard `pickbanner` into `#wheelColorHint`/`#colorHint`. On black/white the chips are
  tappable and pulse (`.pick`) until a topic is chosen; the choice stays changeable.
- **Result:** `renderStory(showBig)` renders the red `storybox` banner; when topic **and**
  category exist and `showBig` is true it also fills and shows the full-screen `#storyOverlay`
  (“Your storytelling mission”). “New Round” resets everything and scrolls back to the top.

## Testing

No test framework is committed. Verify changes end-to-end with Playwright + the pre-installed
Chromium, loading the page via `file://`:

```js
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
```

(Install the `playwright` npm package in a scratch dir; do NOT run `playwright install`.)
Useful patterns from previous sessions:

- Click `#spin1` and wait for `!document.getElementById('topics').hidden` (wheels auto-stop).
- Force specific outcomes by calling the global callbacks directly, e.g.
  `page.evaluate(() => colorDone(300))` → black, `colorDone(0)` → blue, `categoryDone(120)` → Best.
- Test mobile at viewport 390×844; check auto-scroll (`window.scrollY`) and that the
  `#storyOverlay` appears only when topic + category are both set.
- Collect `pageerror`/console errors and assert none.
- Screenshot after overlay animations settle (~600 ms) – mid-animation shots look broken.

## Deployment (GitHub Pages)

- GitHub Pages serves this repo at https://kosmonautica.github.io/360UserStories/ via the
  **built-in “pages build and deployment” workflow** (no workflow file in the repo). Pages deploys
  from **`main`** – every merge to `main` goes live automatically.
- **Known flakiness:** deployments sometimes fail within ~5 s with GitHub's transient error
  `Deployment failed, try again later.` This is never caused by repo content. **Do not re-run**
  the failed run – re-runs of this dynamic workflow get stuck in a un-cancellable “queued” limbo.
  Instead push an empty commit (`git commit --allow-empty`) to trigger a fresh deployment; if that
  fails too, wait a few minutes and push another one.
- `githubstatus.com` and `*.github.io` are not reachable from the Claude Code remote environment
  (network policy), so verify deployments via the Actions run conclusion, not by fetching the site.

## Conventions

- The repo was renamed from `360StoriesUdosVersion` to `360UserStories` – old URLs and local
  clone directories may still use the old name; GitHub redirects them.
- Development happens on `claude/…` feature branches PR'd into `main` (PRs #1, #2 so far).
  The owner merges quickly – restart the feature branch from `origin/main` after each merge.
- Keep code comments in English.
- The owner communicates in German (often via speech-to-text – expect transcription quirks);
  the product itself stays English.
