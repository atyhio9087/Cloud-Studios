<div align="center">

# AYAN.MUKHERJEE

**Data by day. Light and pattern by night.**

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer&logoColor=white)
![No backend](https://img.shields.io/badge/backend-none-lightgrey?style=flat-square)

</div>

---

A personal site built to hold two people at once — the fraud analyst who ships production rules at LatentView, and the one who'd rather spend a weekend hand-rolling a cloud out of ten thousand canvas dots than watch one drift by.

**I ~~build~~ try to build things.** This is one of them.

## What's actually happening on screen

Nothing here is a stock template effect — worth knowing before you go looking for the library that did it, because there isn't one.

- **The hero photo isn't just a background.** Every glowing dot on it is sampled live from the image's own brightness and color, capped to a fixed grid, and animated with real independent per-dot twinkle — not a CSS trick, not a GIF.
- **The footer's clouds are made of literal characters.** `. : - = + * # % @`, density-mapped from a hand-rolled noise field, slowly "breathing," with a genuine mouse-reactive ripple that disturbs the field on contact.
- **Every glow on this site is real additive bloom** — draw sharp → blur at a couple of radii → composite back with `globalCompositeOperation: "lighter"`. `box-shadow` was never involved.
- **No backend, anywhere.** The contact form posts straight to Web3Forms client-side; the whole site ships as a static `dist/` folder.

## Run it locally

```bash
npm install
npm run dev
```

Open the printed localhost URL. For a production build:

```bash
npm run build
npm run preview   # serves dist/ locally
```

## Structure

```
src/
├─ pages/
│  ├─ Home.tsx          hero, two-sides, toolkit, featured work, more projects
│  ├─ Career.tsx         experience timeline, education, certifications, skills
│  └─ Projects.tsx       every project, featured ones pinned to the top
├─ components/
│  ├─ CloudSkyPanel.tsx    photo + live dot-matrix reveal (the hero effect)
│  ├─ AsciiCloudPanel.tsx  character-based flowing cloud (the footer effect)
│  ├─ AmbientFlow.tsx      faint glowing ASCII current between hero & footer
│  └─ ReachOutTab.tsx      the expanding contact tab → Web3Forms
└─ data/
   └─ content.ts          every word of copy — experience, projects, skills, interests
```

`content.ts` is the one file you'll touch most. Update it and the layout takes care of itself.

## Make it yours

- `content.ts` → `profile.github` / `profile.linkedin` are placeholders — swap in the real ones.
- `content.ts` → `profile.web3formsAccessKey` needs a real key from [web3forms.com](https://web3forms.com) (free, just an email) or the contact form quietly falls back to opening the visitor's mail app instead of landing in your inbox.
- The Visualizer card links to `https://visualizer-ten-drab.vercel.app/` — update if that ever moves.
- `public/favicon.svg` is a small dot-cluster mark — swap the file (same name) for anything else, or point `index.html` at a new one.

## How the glow actually works

- `CloudSkyPanel`'s `brightnessThreshold` is a **luminance cutoff (0–1), not a percentage** — and it's photo-dependent. Swap in a different hero image and the dots will either blanket the whole thing or barely show up until you retune this. Sample the new photo's real brightness distribution and set the threshold around its 75th–85th percentile so dots concentrate on the brightest subject instead of guessing.
- Every animated layer respects `prefers-reduced-motion` where the motion is spatial (things moving). Pure brightness pulsing is left on regardless, since it isn't the kind of motion that setting exists to prevent.

## Shipping it

Static output (`dist/`) — any static host works. This repo ships pre-configured for two:

**Cloudflare Workers** — `wrangler.jsonc` is already set up (`assets.not_found_handling: "single-page-application"` handles the client-side routing fallback). Push to a repo, connect it in the Cloudflare dashboard, build command `npm run build`, deploy command `npx wrangler deploy`, project name must match `"name"` in `wrangler.jsonc`.

**Vercel** — `vercel.json` handles the same SPA fallback via a rewrite rule (`/(.*)` → `/index.html`). Plain JSON doesn't support comments, so that reasoning lives here instead of in the file: without it, in-app navigation works fine, but a direct visit or refresh on `/career` would 404, since Vercel has no built-in SPA fallback for a plain Vite + React Router setup.

Import the repo on Vercel, no other config needed — it's already in the file.

Domain/DNS setup for either platform is the standard flow: add the domain in the project's dashboard settings, then point your DNS at what they give you.

---

<div align="center">

Built with React, Tailwind, and an unreasonable number of `<canvas>` elements.

</div>
