# Fogón — instructions for Claude

Paul's personal recipe app (static web app, no build step, deployed by Netlify from `main`).
Pushing to `main` updates the app on every phone the next time it is opened online.

## Files
- `js/seed.js` — the recipes delivered with the app. Almost every change happens here.
- `js/grams.js` — rounding, spoon guides, count hints, scaling.
- `js/app.js` — screens, storage (IndexedDB on each phone), recipe delivery (`syncSeeds`).
- `js/i18n.js` — English / Spanish interface text.

## How recipe delivery works (don't break this)
- Each seed recipe has a unique `id` and a `rev`.
- New id → added on every phone. Higher `rev` → replaces the recipe only on phones where it was never edited.
- Removing a recipe: delete it from `SEED_RECIPES` and add its id to `SEED_REMOVE` (deleted only where unedited).
- Never reuse an id. Never lower a rev. Edits made on a phone always win.
- Anything added here reaches everyone using the app (Paul and his wife).

## Adding Paul's recipes (he pastes notes or photos and says "add to Fogón")
- Everything in grams. Convert cups/spoons/ml with typical weights per ingredient; say these are estimates.
- Store exact estimates in `g` (e.g. ¾ tsp coriander = 1.5); the app rounds for display.
  At 1× the app shows the recipe's own numbers; scaled, it rounds (whole g; nearest 5 g from 100 g; nearest 10 g from 1 kg).
- Add `tsp` (grams per teaspoon) to small-amount ingredients so a spoon guide shows under 5 g. Paul's scale has 1 g steps.
- Counted items: `egg: 1` for eggs; `pc: [grams per piece, 'singular', 'plural']` for things like oranges or garlic cloves.
- No amount given → `t: 'amount?'` (or 'al gusto' / '1 pinch' when that's what he means) with `chk: 1` if it needs an answer.
- Mark the main ingredient for "By ingredient" scaling with `sb: 1` (usually flour, meat, butter).
- Sections: `{ s: 'Dough' }`.
- Steps: copy his steps, cleaned into one per line, in his wording. Put amounts in braces, `{300 g}`, so they scale.
  Fixed amounts (batch sizes like "120 g at a time") go without braces. `## Title` makes a step section.
- No steps given → `steps: []` (the app shows an empty space for him to fill in). Never invent steps.
- Keep each recipe in the language he wrote it (`lang: 'en'` or `'es'`).
- Anything unclear, missing or suspicious (unit-less numbers, typos, amounts that look off, missing ingredients)
  goes in `check: []` as a short question, and gets flagged in your reply. Don't silently fix or guess.
- Servings only if he gives them; `servingsLabel` for what a serving is (loaves, slices…).
- Notes: assumptions made during conversion, mold/pan size, remarks he gives.
- Before pushing, run `node -e "global.window=global;require('./js/seed.js');console.log(SEED_RECIPES.length)"` to make sure the file still loads.
