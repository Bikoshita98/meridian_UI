# Master Prompt — Build "Meridian UI" (Angular + Tailwind Design System)

> Copy everything below the line into your AI coding agent (Claude Code, Cursor, etc.) as a single
> instruction. Placeholder name used here is **Meridian UI** / prefix **`mr-`** — swap it for
> whatever final name you pick with a project-wide find/replace before you run this.

---

## Role & Objective

You are building a self-contained Angular component/design-system library called
**`@meridian/ui`**, living entirely inside **one folder**: `libs/meridian-ui/` (or, if this repo has
no monorepo tooling, a single top-level `meridian-ui/` package). Do not create multiple Nx
libraries, one per component — this is intentionally **one library, one folder, one build target**,
unlike a multi-package setup. Every component is a subfolder inside it.

Do not use the words "vantage", "vantagecircle", "vc-" anywhere — no filenames, class names,
selectors, tokens, or copy. Use the prefix `mr-` for CSS classes/selectors and `Mr` for component
class name prefixes (e.g. `MrButton`, `mr-button`).

## Tech Stack (fixed)

- **Angular 20+**, all components `standalone: true` (implicit default — omit the flag).
- **Tailwind CSS 3.x** + PostCSS + Autoprefixer as the primary styling engine. Component `.scss`
  files are only for things Tailwind genuinely can't express (custom keyframes, pseudo-selectors
  beyond Tailwind's variant list).
- **tailwind-variants** for all variant logic — no hand-concatenated class strings, no `ngClass`
  conditionals for styling.
- **Jest** + `jest-preset-angular` for tests.
- **ng-packagr** for the build if this is a publishable library; otherwise a plain Angular library
  schematic is fine.
- Icons: wrap a single SVG icon package (e.g. `lucide-angular` or `@ng-icons/core`) behind a thin
  `MrIcon` component — do not hardcode raw SVGs inline all over the codebase.
- Fonts: pick 2–3 Google Fonts (e.g. Inter as body default + one display font), loaded via
  `@import url(...)` in the library's global stylesheet.

## Folder Layout (single folder, one library)

```
CLAUDE.md                     # auto-loaded every session — points the agent at STATUS.md first
STATUS.md                     # live build status, rewritten after every completed unit of work
libs/meridian-ui/
  docs/
    BUILD_PROMPT.md            # this prompt, copied in verbatim
  tailwind.config.js          # single source of truth for ALL design tokens
  plugins.js                  # Tailwind plugin generating semantic typography utility classes
  src/
    styles.scss               # global entry: @tailwind directives, font imports, CDK overlay css, @layer base
    index.ts                  # barrel export (optional — prefer per-component sub-path imports)
    lib/
      button/
        index.ts
        public-api.ts
        button.component.ts
        button.component.html
        button.component.scss
        button.enums.ts        # ButtonVariant, ButtonColor, ButtonSize, ButtonShape, ButtonRadius, ButtonStatus
        button.variants.ts     # tv() config: variants + compoundVariants
        button.component.spec.ts
      icon/
      select/
      modal/
      dropdown/
      input-field/
      checkbox/
      radio/
      toggle/
      tabs/
      tooltip/
      card/
      badge/
      avatar/
      pagination/
      table/
      toast/
      spinner/
  CONVENTIONS.md               # the "rules of the system" doc (see Governance below)
```

Each component subfolder gets its own `tsconfig` path mapping so consumers import per-component
(`import { MrButton } from '@meridian/ui/button'`), not one giant barrel — this keeps things
tree-shakeable even though everything lives in one physical folder.

## Design Tokens (Section 3 equivalent)

Define once in `tailwind.config.js`:

1. **Color system, two layers.** Raw palettes (`indigo`, `plum`, `sky`, `emerald`, `amber`, `crimson`,
   `slate` — 25 to 600 shades each) defined first, then **aliased** to semantic tokens components
   actually consume: `primary`, `secondary`, `info`, `success`, `warning`, `error`, `neutral`. Never
   let a component reference a raw palette name directly — only semantic tokens.
2. **Spacing scale.** Extend (don't replace) Tailwind's numeric spacing scale with a semantic one:
   `3xs`(2px) → `3xl`(30px), for values used repeatedly across components.
3. **Typography.** A `fontSize` scale from `2xs`(8px) to `9xl`(96px) with paired line-height/letter-
   spacing where needed, across 2–3 font families. Then a hand-written Tailwind plugin
   (`plugins.js`, using `addUtilities`) that generates semantic classes at build time: `.heading-1`
   through `.heading-6`, `.subheading-1/2`, `.label-1/2/3`, and a generated cross-product
   `.text-{size}-{weight}`.
4. **Radius / border / shadow.** `borderRadius` (`none`, `2xs`…`xl`, `pill`), `borderWidth`
   (`none`, `DEFAULT`, `md`, `lg`), and a six-step `boxShadow` elevation scale using layered rgba
   values (Untitled-UI style).

Nothing in any component template may hardcode a hex value, an arbitrary spacing pixel value, or an
arbitrary shadow — everything routes through these tokens.

## Global Stylesheet

`src/styles.scss`:
- Emits `@tailwind base/components/utilities`.
- Imports the chosen Google Font families.
- Imports `@angular/cdk/overlay-prebuilt.css` (needed for modal/dropdown/select/tooltip, all built
  on CDK Overlay).
- A small `@layer base` block: default transition duration on all elements, default body text
  color/font, link hover states.

## Component Architecture Pattern (apply to every component)

- `standalone: true`, `ChangeDetectionStrategy.OnPush` on every component.
- All variant/color/size/shape/status props are enums, typed on the `@Input()` as template-literal
  types (`` `${ButtonVariant}` ``) so invalid values fail at Angular's AOT type-check.
- Styling brain lives in `<component>.variants.ts`: a `tv()` call with a base class string, named
  `variants`, and `compoundVariants` for combinations needing extra classes. Extend
  `tailwind-merge`'s config so the library's own semantic spacing tokens are deduplicated
  correctly.
- Use `@ContentChildren` for structural composition where a component needs to know about
  projected children (e.g. a button auto-sizing a projected icon to match its own size).
- Boolean-like `@Input()`s (`disabled`, `iconOnly`, etc.) use custom setters that coerce
  HTML-attribute string forms (`disabled=""`, `disabled="true"`) into real booleans.
- Use Angular Signals for small derived/computed state (e.g. an icon's resolved size = its own
  input, falling back to a size signal pushed down by a parent component). Don't force every
  component to be 100% signals-based if `@Input()`/RxJS is simpler — mixed is fine, matching a
  system mid-migration.
- No `ngClass` / `ngStyle` — use `[class]` / `[style]` bindings only.
- Use a component's own `label` input where one exists; otherwise provide a dedicated `<mr-label>`
  component rather than a bare `<label>`.

## Initial Component Set (first pass — build all of these)

`button`, `icon`, `input-field`, `select`, `checkbox`, `radio`, `toggle`, `tabs`, `tooltip`,
`dropdown`, `modal`, `card`, `badge`, `avatar`, `pagination`, `table`, `toast`, `spinner`.

(No `-legacy` variants needed — this is a fresh system, not a migration. If a future consolidation
happens, follow the same `-legacy` suffix convention rather than deleting old components outright.)

## Governance — `CONVENTIONS.md`

Write a single `CONVENTIONS.md` at the library root, stating explicitly (this is the equivalent of
enforced house rules, whether read by a human or an AI coding assistant):

- Always import from a component's own sub-path (`@meridian/ui/button`), never a root barrel.
- Never invent a color/spacing/radius/shadow value inline — it must exist in `tailwind.config.js`.
- No `ngClass`/`ngStyle`.
- No `NgModule` wrapping; omit `standalone: true` (implicit).
- Prefer `gap-*` on flex/grid containers over margin utilities on children; never pass margin
  classes through a component's `customClass`-style input.
- Use built-in `label` inputs / `<mr-label>` instead of bare `<label>`.

## Automatic Session Continuity (build this FIRST, before any component)

This build will span multiple sessions with unannounced interruptions (laptop closed without
warning, no clean "end of session"). You must make the *project itself* self-tracking, so that
progress survives an abrupt stop and a brand-new session can resume without being told anything.
Set this up as the very first step, before touching any component:

1. **Create `CLAUDE.md` at the repository root** (not inside `libs/meridian-ui/` — Claude Code
   automatically reads a root-level `CLAUDE.md` at the start of every session, unprompted). Its
   entire content should instruct the agent as follows:
   > Before doing anything else this session, read `STATUS.md` and the last 10 `git log` entries
   > in full. Treat the "Next step" line in `STATUS.md` as your starting instruction. Do not ask
   > the user what to do next — resume from there directly. Continue following
   > `libs/meridian-ui/docs/BUILD_PROMPT.md` and `CONVENTIONS.md` for all standing rules.

2. **Create `STATUS.md` at the repository root** — this is the single file that must always
   reflect current reality. Structure it as:
   ```markdown
   # Build Status
   Last updated: <ISO timestamp>, after: <task just finished>

   ## Component checklist
   - [x] button — done
   - [ ] icon — in progress (variants.ts done, spec.ts pending)
   - [ ] select — not started
   ... (one line per component, kept current)

   ## Next step
   <One explicit, unambiguous sentence: exactly what to do next and where.>

   ## Decisions / deviations from BUILD_PROMPT.md
   - <anything you changed from the original prompt, and why>

   ## Known issues
   - <anything broken or deferred>
   ```

3. **Update `STATUS.md` continuously, not at "session end."** There is no reliable session end —
   treat every completed unit of work (one component finished, one config change, one bug fixed) as
   the trigger to rewrite `STATUS.md` immediately, before starting the next unit. This is not an
   optional wrap-up step; it is part of finishing the task itself. Never leave `STATUS.md`
   describing a state older than the most recent completed unit of work.

4. **Commit to git after every unit of work**, with a descriptive message (e.g.
   `feat(button): implement variants + tests`), immediately alongside the `STATUS.md` update. Git
   log becomes a second, independent record of what happened and when — don't wait for a batch of
   changes to accumulate.

5. **Copy this prompt into the repo** as `libs/meridian-ui/docs/BUILD_PROMPT.md` so it's a durable
   part of the project, not something that only exists in a chat.

With this in place, opening a brand-new session — even after an unannounced shutdown mid-component —
means: Claude Code loads `CLAUDE.md` automatically → reads `STATUS.md` + recent git log → resumes
work at the stated next step, with no re-explanation needed from you.

## What NOT to build (out of scope for this pass)

- No Storybook and no separate docs app in this first pass — that can be a v2 addition once the
  component set stabilizes.
- No dual old/new library consolidation story — there is no legacy library to merge here.
- No build-time design-token-to-CSS-variable bridge (e.g. Style Dictionary) — tokens live purely as
  Tailwind config values, same as the reference system.

## Deliverable

A working `libs/meridian-ui/` folder that installs, builds (`ng-packagr` or `ng build`), and passes
`jest`, with all 18 components above implemented per the pattern, tokens fully wired in
`tailwind.config.js`, and `CONVENTIONS.md` present. Confirm the build and test commands actually
pass before declaring the task done. `CLAUDE.md` and `STATUS.md` at the repo root must exist before
any component work starts, and `STATUS.md` must be current (matching the actual state of the repo,
not stale) at whatever point the session happens to stop.
