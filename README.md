# chatsmith

Public QE datasets and HTML viewers for Chat Smith. Hosted from repository root (e.g. GitHub Pages).

## Layout

- **`datasets/`** — Static datasets and viewers (`index.html` per dataset). Feature JSON lives next to each viewer (e.g. `datasets/chat_dataset/*.json`).
- **`reports/`** — Run outputs and category viewers. Hub: **`reports/index.html`** (manual list of categories). Root `index.html` links to `./reports/`.

## Chat dataset (`datasets/chat_dataset/`)

- **Header copy** (title, version, last updated) lives in **`index.html`** — edit there when it changes.
- **`<feature_key>.json`** — One file per feature. To add a **new** feature tab: add `<key>.json` and append the key to **`FEATURE_ORDER`** in `datasets/chat_dataset/index.html` (one manual line).

## Reports

### Conventions

- **Category folder:** `reports/<category_slug>/` (e.g. `image_generation/`).
- **Run JSON:** `reports/<category>/results/<dd_mm_yyyy>/image_generation_run_<HHmmss>.json` (24h time suffix; example: `image_generation_run_051724.json`).
- **Optional static HTML** per category: use a feature-specific name (e.g. `reports/image_generation/image_generations_index.html`) so it is not confused with repo root `index.html`.

### Adding a new report category (maintainers)

1. Create `reports/<new_slug>/` with viewer HTML and any `results/...` JSON (or static HTML only).
2. Edit **`reports/index.html`** — add a stakeholder-facing card (title, description, link). Static hosting does not auto-list folders.

### Image generation

- Viewer: `reports/image_generation/image_generations_index.html`.
- JSON paths to load are listed in **`knownFiles`** in that file — append a path when you add another run export.

### GPT-5 Nano compare configs

- **Folder:** `reports/gpt5nano_compare_configs/`.
- **Format:** self-contained static HTML exported from the private evaluation pipeline (no separate JSON viewer).
- **Current snapshot:** `gpt5nano_scenario_comparison_16_04_2026_01.html` — linked from **`reports/index.html`**. When you add a new export, copy the file here and **add or update a card** on the hub (paths are not auto-discovered).
