# chatsmith

Public QE datasets and HTML viewers for Chat Smith. Hosted from repository root (e.g. GitHub Pages).

## Layout

- **`datasets/`** — Static datasets and viewers (`index.html` per dataset). Feature JSON lives next to each viewer (e.g. `datasets/chat-dataset/*.json`).
- **`reports/`** — Run outputs and category viewers. Hub: **`reports/index.html`** (manual list of categories). Root `index.html` links to `./reports/`.

## Chat dataset (`datasets/chat-dataset/`)

- **Header copy** (title, version, last updated) lives in **`index.html`** — edit there when it changes.
- **`<feature_key>.json`** — One file per feature. To add a **new** feature tab: add `<key>.json` and append the key to **`FEATURE_ORDER`** in `datasets/chat-dataset/index.html` (one manual line).

## Reports

### Conventions

- **Category folder:** `reports/<category-slug>/` (e.g. `image-generation/`).
- **Run JSON:** `reports/<category>/results/<dd_mm_yyyy>/image_generation_run_<HHmmss>.json` (24h time suffix; example: `image_generation_run_051724.json`).
- **Optional static HTML** per category: use a feature-specific name (e.g. `reports/image-generation/image-generations-index.html`) so it is not confused with repo root `index.html`.

### Adding a new report category (maintainers)

1. Create `reports/<new-slug>/` with viewer HTML and any `results/...` JSON (or static HTML only).
2. Edit **`reports/index.html`** — add a stakeholder-facing card (title, description, link). Static hosting does not auto-list folders.

### Image generation

- Viewer: `reports/image-generation/image-generations-index.html`.
- JSON paths to load are listed in **`knownFiles`** in that file — append a path when you add another run export.
