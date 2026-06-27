# Landing page v2 media (`public/v2/`)

Drop files at these paths — the app reads them via `src/pages/v2/v2Assets.js` and section components. Reload the dev server after adding files. No code changes required.

## Root

| Path | Format | Purpose |
|------|--------|---------|
| `hero-demo.mp4` | mp4 | Hero background and CTA echo video (`V2_ASSETS.hero`, `ctaEcho`). Optional: falls back to `public/Hero_demo.mp4`. |
| `before-after-before.mp4` | mp4 | Before/after strip — “before” clip (`LandingPageV2` scroll demo). |
| `before-after-after.mp4` | mp4 | Before/after strip — “after” clip. |
| `before-after.webp` | webp | Static before/after fallback (`BeforeAfterStrip` / `V2_ASSETS.beforeAfter`). |

## `features/`

| Path | Format | Purpose |
|------|--------|---------|
| `browser-frame.webp` | webp | Feature: in-browser recording frame. |
| `auto-zoom.mp4` | mp4 | Feature: auto-zoom on clicks. |
| `timeline-export.webp` | webp | Feature: timeline and export. |

## `editor/`

| Path | Format | Purpose |
|------|--------|---------|
| `timeline.webp` | webp | Editor showcase: timeline. |
| `frame-picker.webp` | webp | Editor showcase: frame picker. |
| `export.webp` | webp | Editor showcase: export. |

## `gallery/`

| Path | Format | Purpose |
|------|--------|---------|
| `product-demo.mp4` | mp4 | Output gallery: product demo. |
| `support-repro.mp4` | mp4 | Output gallery: support reproduction. |
| `design-wip.mp4` | mp4 | Output gallery: design work-in-progress. |

## `use-cases/`

| Path | Format | Purpose |
|------|--------|---------|
| `product.webp` | webp | Use case: product teams. |
| `support.webp` | webp | Use case: support. |
| `founders.webp` | webp | Use case: founders. |
| `creators.webp` | webp | Use case: creators. |

## `privacy/`

| Path | Format | Purpose |
|------|--------|---------|
| `local-flow.svg` | svg | Trust panel: local-only processing diagram. |

## `compare/`

| Path | Format | Purpose |
|------|--------|---------|
| `local-vs-cloud.webp` | webp | Local vs cloud comparison visual. |

Empty subfolders include a `.gitkeep` so Git tracks them until you add media.
