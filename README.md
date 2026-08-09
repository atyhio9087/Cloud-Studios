# Ayan Mukherjee — Portfolio

React + Vite + TypeScript + Tailwind CSS + Framer Motion. No backend — everything (including the contact form) runs client-side, so it deploys as a plain static site.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed localhost URL. To build for production:

```bash
npm run build
npm run preview   # serves the production build locally, from dist/
```

## Structure

- `src/pages/Home.tsx` — hero (cloud photo + dot-matrix reveal), two-sides section, toolkit, featured project spotlight, other projects.
- `src/pages/Career.tsx` — full experience timeline, leadership, education, certifications, skills.
- `src/pages/Projects.tsx` — all projects, Visualizer featured at top.
- `src/components/CloudSkyPanel.tsx` — real photo + a glowing dot-matrix layer sampled from the image's own brightness/color, used in the hero. Reusable — pass `image`, `brightnessThreshold` (how much of the photo counts as "bright enough" to dot — tune per-image), `interactive` (dots brighten near the cursor), and `ambientDrift` (a slow spatial-noise shimmer across the grid).
- `src/components/AsciiCloudPanel.tsx` — the pure character-based flowing cloud used in the footer, with a mouse-ripple disturbance.
- `src/components/AmbientFlow.tsx` — the faint glowing ASCII current in the page background between hero and footer.
- `src/components/ReachOutTab.tsx` — the expanding contact tab (opens the visitor's email client via `mailto:`, prefilled — no backend needed).
- `src/data/content.ts` — all copy (experience, education, projects, interests, skills) lives here. Edit this file to update content without touching layout code.

## Things you'll probably want to personalize

- `src/data/content.ts` → `profile.github` / `profile.linkedin` are placeholders (`https://github.com`, `https://linkedin.com`) — swap in your real profile URLs.
- The Visualizer project card links to `https://visualizer-ten-drab.vercel.app/` — update if the URL changes.
- `public/favicon.svg` is a small placeholder dot-cluster mark — swap it for a real logomark if you have one.

## Notes on the effects

- The dot-matrix, ASCII cloud, and ambient current all use **real additive bloom**: bright shapes are drawn small and sharp to an offscreen canvas, then blurred copies of that canvas are composited back on top with `globalCompositeOperation = "lighter"` at a few different blur radii. That's what gives the glow real falloff instead of a flat CSS `box-shadow` ring.
- `CloudSkyPanel`'s `brightnessThreshold` is photo-dependent — it's a cutoff on 0–1 luminance, not a percentage. If you swap in a different hero photo and the dots end up covering the whole image (or barely showing at all), sample the new photo's actual brightness distribution and adjust the threshold to sit around its 75th–85th percentile so dots concentrate on the brightest subject.
- Everything respects `prefers-reduced-motion`.

## Deploying

This is a static site (`dist/` after `npm run build`) — any static host works.

### Option A — Cloudflare Workers (what this repo is set up for)

Cloudflare merged "Pages" into a unified Workers product with a Wrangler-based deploy flow. This repo already includes `wrangler.jsonc` configured for it:

```jsonc
{
  "name": "cloud-studios",
  "compatibility_date": "2026-08-09",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}
```

1. Push this project to a GitHub (or GitLab) repo.
2. [Cloudflare dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → connect the repo.
3. Settings:
   - **Project name**: must exactly match `"name"` in `wrangler.jsonc` (`cloud-studios`) — a mismatch fails the build.
   - **Build command**: `npm run build`
   - **Deploy command**: `npx wrangler deploy` (default — leave as-is)
4. Deploy. You'll get a free `*.workers.dev` URL immediately.
5. For your own domain: once deployed, go to the project's **Settings** → **Domains & Routes** (or **Custom domains**) → add it. One click if the domain's DNS is already on Cloudflare; otherwise add the CNAME/record Cloudflare gives you at your current registrar.

**Why `not_found_handling: "single-page-application"` matters:** this site uses client-side routing (`/career`, `/projects`). Without it, refreshing or directly visiting those URLs would 404 — the server doesn't know those routes exist, only `index.html` does. This setting tells Workers to serve `index.html` for any unmatched path instead of a hard 404, and it's already wired up in `wrangler.jsonc`.

**Note:** an older `public/_redirects` file (the mechanism the previous Pages product used for this same job) has been deliberately removed from this repo — it actively conflicts with `not_found_handling` and will fail the deploy with an "infinite loop" error if both are present. Don't re-add it.

### Option B — Netlify

Also free, and the fastest path if you don't want to touch git or Wrangler config at all — Netlify still uses the simpler build-command + output-directory model.

1. `npm run build` locally.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag the `dist/` folder in. It's live immediately at a `*.netlify.app` URL.
3. For your own domain: **Site settings** → **Domain management** → **Add a domain**, then update your DNS (Netlify shows you exactly which records to add wherever you bought the domain).
4. For automatic redeploys on every change, connect the repo instead (**Add new site** → **Import an existing project**), with build command `npm run build` and publish directory `dist`.
5. If you go this route, you'll want to re-add a `public/_redirects` file containing `/* /index.html 200` — Netlify uses that mechanism instead of `wrangler.jsonc`, and it won't conflict with anything since Wrangler/Cloudflare won't be involved.

### Buying a domain

If you don't have one yet: Cloudflare Registrar (at-cost, no renewal markup), Porkbun, and Namecheap are all reasonable, inexpensive options. A `.com` or `.dev` both suit a personal portfolio fine — `.dev` domains require HTTPS, which both options above provide automatically anyway.
