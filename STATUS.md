# Build Status
Last updated: 2026-09-18T15:15:00Z, after: re-pointed `meridian-demo` at the real, built
`dist/meridian-ui` package instead of consuming `meridian-ui` from source — the last loose end the
previous update's "Next step" flagged. `meridian-ui` was rebuilt (`npx ng-packagr`, 19 secondary
entry points + primary, all green) and installed into `meridian-demo` as an actual npm dependency:
`npm install ../dist/meridian-ui --install-links` (`--install-links` forces a real file copy into
`node_modules/@meridian/ui` instead of npm's default symlink — a symlink would resolve Angular's
peer-dependency lookups from `dist/`'s real on-disk location upward, which has no `node_modules` of
its own, rather than from `meridian-demo/node_modules` where `@angular/core` etc. actually live).
Recorded in `package.json` as `"@meridian/ui": "file:../dist/meridian-ui"`.

Two follow-on changes, both required, neither a bug: removed `meridian-demo/tsconfig.json`'s
`@meridian/ui/*` `paths` mapping entirely (no longer needed or wanted — the whole point was to stop
resolving through a source alias and let real `node_modules`/`exports`-map resolution do the work;
`app.ts`/`app.html` needed **zero** changes, since they already only ever imported through the bare
`@meridian/ui/<component>` specifier, never a relative path into `meridian-ui/src`). And repointed
`meridian-demo/tailwind.config.js`'s `content` glob from `../meridian-ui/src/**/*.{html,ts}` to
`./node_modules/@meridian/ui/fesm2022/*.mjs` — confirmed first that Angular's AOT partial-compilation
output still embeds each component's literal template HTML and `tv()` class strings as plain string
literals (`grep border-md .../meridian-ui-spinner.mjs` still matched), so Tailwind's content scanner
finds them there exactly as it would in source. `meridian-demo/tailwind.config.js` still `require()`s
`meridian-ui/tailwind.config.js` directly for the actual token *definitions* (colors/spacing/etc.) —
that part is unavoidably source-repo-adjacent, since `tailwind.config.js` is a dev/build-time file
ng-packagr doesn't publish into `dist/`, and BUILD_PROMPT.md's own "What NOT to build" section
explicitly excludes building a token-to-CSS-variable bridge that would let a truly external consumer
avoid that. Fixed the demo's own header copy, which still said "consumed from source."

Re-verified end to end, not just "still builds": `npx ng build --configuration development` (green,
and the bundle got *smaller* — 1.91MB vs. the old 3.07MB, since it now imports pre-optimized fesm
bundles instead of recompiling raw TS on every build), `npx ng build` production (green, and now
*under* budget — 430.81kB vs. the 500kB limit, resolving the previous update's budget-overage note
without touching `angular.json`), `npx ng test` (2/2), and a full Playwright pass against the served
app — full-page screenshot pixel-equivalent to the source-consuming version (including the fixed
spinner ring), zero console errors, dropdown/modal/toast interactions all still work. `meridian-ui`
itself is untouched by this update (still 168/168 jest, still a clean 19-entry-point `ng-packagr`
build) — this was entirely about how `meridian-demo` consumes it.

Previous update, after: gave `meridian-ui` real `ng-packagr` secondary entry
points, so `import { MrButton } from '@meridian/ui/button'` now resolves against the **published**
package (`dist/meridian-ui/button/...`, via a real `exports` map entry), not just against source
through `meridian-demo`'s tsconfig `paths` — closing the gap the previous update's "Known issues"
flagged. Added one `<component>/ng-package.json` (secondary-entry-point config, `{"lib":
{"entryFile": "../src/lib/<component>/public-api.ts"}}`) per folder — all 18 public components plus
`label` (19 total, matching the existing `tsconfig.json`/`jest.config.js` sub-path set) — pointing
at each component's existing `public-api.ts`; no new source files needed beyond that.

This surfaced a real structural constraint, not a bug: ng-packagr compiles each secondary entry
point with `rootDir` forced to that entry's own folder, so any `import ... from '../icon/public-api'`
style relative path reaching into a *different* component's folder is a hard `TS6059` rootDir
violation — cross-entry-point dependencies must go through the package's own public specifier
(`@meridian/ui/icon`) instead, which ng-packagr resolves internally via its own generated
`paths` (pointing at source for analysis, at built declarations for the real compile) — it does not
read this project's own `tsconfig.json` `paths` for that. Fixed by changing every actual
cross-component import (`button`, `checkbox`, `pagination`, `select`, `spinner`, `table`, `toast`
→ `@meridian/ui/icon`; `input-field`, `select` → `@meridian/ui/label`) from a relative path to the
package specifier — this also incidentally reverted the previous update's `shared/tv.ts` (see its
corrected entry below), since a cross-folder helper import hit the exact same constraint and the
codebase's own established precedent (every component redeclaring small config locally rather than
cross-importing, e.g. `badge` redeclaring `ButtonColor`'s palette as `BadgeColor`) was the more
consistent fix anyway once local-only was already the fallback for the one component that actually
needed it.

Verified for real, not just "build succeeded": `npx ng-packagr -p ng-package.json` now logs 19
separate `Building entry point '@meridian/ui/<name>'` lines (`dist/meridian-ui/<name>/package.json`
each pointing at its own `fesm2022`/`types` files) plus the primary; `npx jest` is still 168/168;
`meridian-demo` (still source-consuming, unaffected by this) still builds. A standalone Node
resolution smoke test — a symlinked `node_modules/@meridian/ui` pointed at `dist/meridian-ui`,
outside either project — confirmed `require.resolve('@meridian/ui/button')`,  `.../icon`,
`.../select`, `.../table`, `.../toast`, and `.../label` all resolve to real per-component
`fesm2022/*.mjs` files (and their `.d.ts` typings) via the package's own `exports` map, exactly as
a real installed consumer's bundler would resolve them — not just that ng-packagr didn't error.

Previous update, still accurate except where noted above, after: built `meridian-demo/` — a real
Angular app (Angular
CLI 22, esbuild `@angular/build:application`) consuming `meridian-ui` from source via tsconfig
`paths` (one `@meridian/ui/<component>` sub-path per component, same convention a real consumer
would use once secondary entry points exist) — and used it to do the genuine browser-based visual
QA that "all 18 components built" had never actually had (see the previous "Known issues" entry).
This is the first time the library's Tailwind pipeline, or any component, has ever actually been
rendered in a browser. It immediately surfaced and fixed **two real, previously-undetected bugs**
in the "completed" library itself (not the demo app):

1. **`meridian-ui/plugins.js` crashed the instant a real Tailwind build ran.** `theme(\`fontFamily.
   ${family}\`).join(', ')` — but Tailwind's plugin `theme()` accessor already returns `fontFamily`
   paths as a ready CSS string (it supports a `[fontFamily, {fontFeatureSettings,...}]` tuple form
   and normalizes for callers), not the raw config array, so `.join` threw `TypeError: theme(...)
   .join is not a function`. Fixed by dropping the redundant `.join(', ')`. This means the
   `.heading-*`/`.subheading-*`/`.label-*`/`.text-{size}-{weight}` utility classes generated by
   this plugin — used by every component's `variants.ts` — had **never actually been generated by
   a real Tailwind build before**; `npx jest` (jsdom, no real CSS) and `ng-packagr` (compiles
   TS/templates, doesn't run Tailwind) both stayed green regardless.
2. **`spinner`'s loading ring rendered completely invisible** — `border-md border-current
   border-t-transparent`. Root cause: `tailwind-variants` v3 bundles its own Tailwind-v4-shaped
   class-conflict resolver instead of reading `tailwind.config.js`, and its default border-width
   matcher only recognizes numeric values (`border-2`, `border-4`, ...). This library's own
   word-keyed `borderWidth` scale (`border-md`/`border-lg`) doesn't match, falls through to the
   border-*color* group's catch-all instead, and silently loses its merge conflict against
   `border-current` (both get classified as the same "border-color" group; the merge keeps only
   the last one in the list) — so `border-md` was dropped outright, leaving the ring with no
   border-width at all. Fixed per BUILD_PROMPT.md's own (previously unfulfilled) "extend
   tailwind-merge's config" requirement — **superseded by the next update below**: this was
   originally fixed via a shared `src/lib/shared/tv.ts` imported by all 18 `variants.ts` files,
   which then turned out to conflict with real secondary entry points (see below); the fix now
   lives as a small local `createTV()` inside `spinner.variants.ts` only, the one component that
   actually needs it. `button`'s one `border-none` usage was audited too — same misclassification
   risk in principle, but harmless in practice (no `border-style` is ever set on that variant, so
   the browser never paints a border regardless of width).

Both fixes are narrow, additive, and re-verified: `npx jest` (168 tests) and `npx ng-packagr` are
still green from `meridian-ui/`, and the demo app was re-screenshotted after the fix with all 18
components (including a now-visible, correctly-colored spinner ring) confirmed via a headless
Chromium (Playwright) pass — full-page screenshot, zero console errors, and interactive checks
(dropdown opens via `FocusKeyManager`, modal opens/traps focus/closes, toast queues and
auto-positions, pagination/tabs/table sort all update) — not just a green build. `meridian-demo/`
itself has no known component-level layout bugs after this pass; see "Next step" for what's still
worth doing from here.

## Component checklist
- [x] icon — done (MrIcon wraps @ng-icons/core + @ng-icons/lucide; tests pass)
- [x] button — done (MrButton: 6 enums — variant/color/size/shape/radius/status; auto-syncs a
      projected `<mr-icon>`'s size via `contentChildren` + `effect()`; loading state renders an
      inline spinner and force-disables the native `<button>`; tests pass)
- [x] input-field — done (MrInputField: size/status enums, implements `ControlValueAccessor` so it
      works with `[formControl]`/`ngModel`, renders its own `<mr-label>` when `label` is set,
      helper text colored per status with `aria-describedby`/`aria-invalid`; tests pass)
- [x] select — done (MrSelect: size/status enums, custom button trigger + `cdkConnectedOverlay`
      listbox panel (not a native `<select>`), implements `ControlValueAccessor`, `options:
      SelectOption<T>[]` input with per-option `disabled`, renders its own `<mr-label>` when
      `label` is set; tests pass)
- [x] checkbox — done (MrCheckbox: size/status enums matching `input-field`'s scale; a real
      `<input type="checkbox">` sits invisible on top of a decorative styled box for full a11y +
      keyboard support; `indeterminate` is a signal-backed coerced boolean input, shown as a dash
      icon and a filled box independent of `checked`; implements `ControlValueAccessor`; tests
      pass)
- [x] radio — done (MrRadio: went with option (b) from the prior Next step — each `mr-radio` is
      its own standalone `ControlValueAccessor` with a required `value` + `name`; consumer binds
      the *same* `[formControl]`/`[(ngModel)]` to every radio in a group. Uses CDK's
      `UniqueSelectionDispatcher` to force-uncheck a radio's own signal state when a sibling with
      the same `name` is selected, since native radio `change` events never fire on the
      deselected item — proven by a regression test with two radios sharing one `FormControl`;
      tests pass)
- [x] toggle — done (MrToggle: size/status enums, a pill-shaped track with a circular thumb that
      slides via `translate-x-*` compound variants keyed by size (slide distance = track width -
      thumb size, precomputed per size rather than done with inline arithmetic in the template);
      implements `ControlValueAccessor`; no `indeterminate` — doesn't apply to a switch; tests
      pass)
- [x] tabs — done (first compound component: `MrTabs` container + `MrTab` item, two `@Component`
      classes in one `tabs/` folder. `MrTabs` reads `label`/`disabled`/`tabId`/`panelId` off each
      projected `MrTab` via `contentChildren` (same pattern `button` uses for its projected icon)
      and pushes `active` down to each; `MrTab` conditionally renders its own `<ng-content>` panel
      via `@if (active)`. Plain `[selected]`/`(selectedChange)` — deliberately not a
      `ControlValueAccessor`, it isn't a form control. Simplified away from the originally-planned
      animated sliding indicator to a static per-button underline — the animated version needed
      DOM measurement (`ViewChildren` + `getBoundingClientRect`) and resize handling that nothing
      in BUILD_PROMPT.md asked for; the static underline gives the same visual result with far
      less surface area. `TabsSize` only (no status/variant enum, single visual style for v1);
      tests pass)
- [x] tooltip — done (MrTooltip: a wrapping `<mr-tooltip text="...">` around projected trigger
      content, `cdkOverlayOrigin` + `cdkConnectedOverlay` for positioning only — no listbox, no
      CVA. Opens on `mouseenter`/`focusin` (mouse waits `showDelay`ms, default 150, to avoid
      flicker; focus is immediate for keyboard users), closes on `mouseleave` (after `hideDelay`,
      default 0)/`focusout`/Escape, implemented with plain `setTimeout`/`clearTimeout`, not RxJS.
      `position` enum (`top`/`bottom`/`left`/`right`) maps to a `ConnectedPosition[]` with a
      same-axis fallback. No `TooltipSize` — didn't turn out to need one. Tests pass, including a
      pending-show-cancelled-by-early-mouseleave case using `jest.useFakeTimers()`)
- [x] dropdown — done (went with option 2 from the prior Next step — compound `MrDropdown`
      (trigger + `cdkConnectedOverlay` host) + `MrDropdownItem` (styled `@Component`, an internal
      native `<button role="menuitem">`). No `contentChildren`/click-subscription bookkeeping for
      selection — the panel wrapper just listens for any `(click)` that bubbles up from an item's
      internal button (`event.target.closest('button')`) and closes; a disabled item's button
      never dispatches click natively, so disabled-item exclusion is free. Arrow-key navigation +
      Home/End use CDK's `FocusKeyManager` (`@angular/cdk/a11y`, constructed directly from the
      `contentChildren` signal — no `QueryList` conversion needed) which also skips disabled items
      automatically; first item auto-focuses on open via `afterNextRender` (the overlay's projected
      item DOM doesn't exist until the next render, same as `*ngIf`). `DropdownPosition`
      (`bottom-start`/`bottom-end`/`top-start`/`top-end`) maps to `ConnectedPosition[]` with a
      vertical-flip fallback, same pattern as `tooltip`. Tests pass)
- [x] modal — done (MrModal: the first overlay component using CDK Overlay's *imperative* API
      instead of `cdkConnectedOverlay` — no trigger to anchor to, so it injects `Overlay` directly,
      creates an `OverlayRef` via `overlay.position().global().centerHorizontally()
      .centerVertically()`, and attaches a `TemplatePortal` built from the component's own
      `@ViewChild(TemplateRef)` + `ViewContainerRef`. Public API stays declarative — `[open]`/
      `(openChange)`, no service-based `open()`/`close()` — with a constructor `effect()` watching
      a signal-backed `open` input that creates/disposes the `OverlayRef` as it flips. Focus trap
      via CDK's `cdkTrapFocus`/`cdkTrapFocusAutoCapture` (`@angular/cdk/a11y`) on the panel;
      focus restoration done by hand (`document.activeElement` captured right before attach,
      `.focus()` called on it in `detach()`). Closes on Escape (explicit `(keydown.escape)`,
      `cdkTrapFocus` only traps Tab), backdrop click (gated by an `@Input() dismissible = true`),
      or the `open` input flipping false externally. `ModalSize` (`sm`/`md`/`lg`/`xl`) maps to
      `max-w-*` in `modal.variants.ts`; no `status` enum. No CVA — a modal isn't a form control.
      Tests pass, including focus-trap/restoration assertions — see the new testing gotcha below
      about jsdom and `cdkTrapFocus`)
- [x] card — done (MrCard: the first non-overlay, non-CVA component — a single `<div [class]=
      "cardClass()"><ng-content></ng-content></div>` matching `icon`'s minimal pattern. `CardVariant`
      (`elevated`: `border-neutral-100` + `shadow-md`; `outlined`: `border-neutral-200`, no shadow)
      and `CardPadding` (`none`/`sm`/`md`/`lg` mapping to `p-0`/`p-lg`/`p-xl`/`p-2xl` — deliberately
      *not* reusing the same spacing-token names 1:1, since a card's smallest usable padding is
      bigger than a button's). No `status`/`color` enum — a card's own chrome isn't color-coded.
      Tests pass)
- [x] badge — done (MrBadge: `<span [class]="badgeClass()"><ng-content></ng-content></span>`, no
      dedicated icon slot — plain content projection is enough, a consumer can drop an `<mr-icon
      size="xs">` straight into the projected content without any special wiring, same as any other
      inline content; adding `contentChildren`-based icon auto-sizing (like `button`) would have
      been overkill for v1. `BadgeVariant` (`filled`/`outline`) × `BadgeColor` (the same 7 semantic
      colors as `ButtonColor` — `primary`/`secondary`/`neutral`/`success`/`warning`/`error`/`info`,
      redeclared as badge's own enum rather than importing `ButtonColor`, consistent with every
      other component owning its own enums) resolved via the same per-combination
      `compoundVariants` pattern `button` uses. No `size` enum — a badge is one fixed small size.
      Tests pass)
- [x] avatar — done (MrAvatar: `<span [class]="avatarClass()">` containing either an `<img>` or an
      initials fallback `<span>`, matching `card`/`badge`'s minimal single-element pattern — no CDK,
      no CVA (an avatar isn't a form control). `AvatarSize` (`xs`–`xl`) reuses `ButtonSize`'s exact
      `h-*`/`w-*` pixel scale (redeclared as its own enum, same as every other component owning its
      enums) so an avatar sits flush next to a same-size button. `AvatarShape` (`circle`/`square`)
      maps to `rounded-pill`/`rounded-lg`. `initials` input takes precedence when set; otherwise
      derived from `name` (first letter of the first two whitespace-separated words, uppercased) —
      deliberately simple, no locale-aware word-boundary handling. `(error)` on the native `<img>`
      flips an internal `imgError` signal to fall back to initials instead of a broken-image icon;
      the signal resets whenever `src` is reassigned. Outer `<span>` gets `role="img"` +
      `aria-label` (from `alt`, falling back to `name`) only while showing the initials fallback —
      the `<img>`'s own `alt` already provides the accessible name when the image is showing, so
      the wrapper role would be redundant/double-announced there. Tests pass)
- [x] pagination — done (MrPagination: a single `@Component`, no compound container/item split like
      `tabs` — page items are data-driven from `totalPages`/`page`, not projected content, so there
      was nothing to query with `contentChildren`. Plain `[page]`/`(pageChange)`, deliberately not a
      `ControlValueAccessor` — not a form control, same reasoning as `tabs`' `[selected]`/
      `(selectedChange)`. Renders a windowed layout — first page, last page, one sibling either side
      of the current page, collapsing the rest into a single ellipsis per side (standard
      MUI-`usePagination`-style algorithm, `siblingCount` fixed at 1, not exposed as an input for
      v1) — falling back to showing every page with no ellipsis when they all fit. The ellipsis
      itself is a non-interactive `<span>` (a `<mr-icon name="moreHorizontal">`), not a button — no
      "jump by N" affordance in v1, nobody asked for one. Prev/next are native `<button>`s disabled
      at the first/last page via computed `isFirstPage`/`isLastPage`. `PaginationSize` (`xs`–`xl`)
      reuses `button`'s exact `h-*`/`w-*` scale, same precedent as `avatar`; page/prev/next/ellipsis
      all share one fixed square footprint per size so a row lines up evenly. Tests pass — see the
      new testing gotcha below about a test host's own `@Output`-bound field)
- [x] table — done (MrTable<T>: went with the `select`-style generic data-input API (`columns:
      TableColumn<T>[]`, `rows: T[]`) rather than a `tabs`-style compound container/item split —
      cell values come from `column.key` (a `keyof T`) indexing straight into each row, so there
      was no projected content to query with `contentChildren`. Sort state (`sortKey`/
      `sortDirection`) is internal, toggled by clicking a `sortable` column header: first click on
      a column sorts ascending, a second click on the *same* column flips to descending, clicking a
      *different* sortable column resets to ascending on that column — no third "unsorted" state in
      the cycle, deliberately, to avoid needing to track/restore original row order. Sorts
      in-memory by default (generic `<`/`>` comparator, fine for the string/number/Date values a
      data table actually renders) and also emits `(sortChange)` with `{ key, direction }` so a
      caller doing server-side sorting can ignore the in-memory result and re-fetch instead.
      `aria-sort` (`ascending`/`descending`/`none`) only set on sortable `<th>`s, omitted entirely on
      non-sortable ones per WAI-ARIA authoring practice. No row selection in v1 — nothing in
      BUILD_PROMPT.md asked for it and it's a reasonable cut. `TableSize` (`sm`/`md`/`lg`) controls
      cell padding/text density — deliberately a narrower 3-step scale, not `button`'s `xs`–`xl`,
      since padding density and control height aren't the same axis (same reasoning `card` used for
      its own `CardPadding` scale). Empty state (`emptyMessage`, default "No data available") shown
      as a single row spanning every column via `colspan`. Tests pass)
- [x] toast — done (last of the 18. Triggered imperatively, not placed in a template like every
      other component, so the architecture is a service + a mounted container rather than a single
      `@Component`: `MrToastService` (`providedIn: 'root'`, a signal-backed queue, `show(message,
      options)`/`dismiss(id)`/`clear()`) plus `MrToastContainer` (mount once, e.g. at the app root)
      that renders whatever the service queues via one `MrToast` per entry. `MrToastContainer` uses
      CDK Overlay's imperative API, same as `modal` — not for a backdrop or connected positioning
      (a toast needs neither), but so it shares the same overlay stacking layer and reliably
      renders above a `modal`/`dropdown`/`select` panel instead of under one; global position
      strategy anchored to the top-right corner (`.top('16px').right('16px')`, matching the `lg`
      spacing token's px value — CDK's position API takes a raw CSS length, it can't reference a
      Tailwind token by name). `ToastStatus` (`info`/`success`/`warning`/`error`, not the full
      7-color semantic palette — a toast's whole purpose is communicating one of these four kinds
      of outcome) maps to `MERIDIAN_ICONS`' existing `info`/`check`/`alertTriangle`/`alertCircle` —
      no new icons needed. Each `MrToast` owns its own `setTimeout`-based auto-dismiss (default
      5000ms via `ToastOptions.duration`, `0` means persistent-until-manually-dismissed), cleared
      in `ngOnDestroy`; no hover-to-pause — cut for v1, nobody asked for it. `role="alert"` +
      `aria-live="assertive"` for an error toast, `role="status"` + `aria-live="polite"` for the
      other three. No `success()`/`error()`/... convenience sugar methods on the service — just the
      one `show(message, options)` entry point, consistent with this build's running preference for
      cutting anything not explicitly asked for. Tests pass, including a container test verifying
      it renders above/independent of other overlay-based components and one confirming
      auto-dismiss timing via `jest.useFakeTimers()`, same pattern as `tooltip`)
- [x] spinner — done (MrSpinner: single `<span role="status" [attr.aria-label]="label">`, the same
      `animate-spin` + current-color ring markup `button` already renders for its own loading
      state, pulled out standalone so it can sit anywhere (a loading placeholder over a `card`/
      `table`), not just inside a `button`. `SpinnerSize` (`xs`–`xl`) deliberately maps to `icon`'s
      own `ICON_SIZE_PX` pixel scale (imported directly, not redeclared) rather than `button`'s
      `h-*` height classes — a spinner is a decorative ring sized like an icon, not a control with
      a height. Added a `SpinnerColor` axis (the same 7 semantic colors every other component
      redeclares) after concluding a consumer has no other way to recolor it: this library's
      components render their own `[class]`-bound inner element rather than forwarding a host
      `class` attribute anywhere, so "just wrap it and set text-color" (which would work in most
      other component libraries) doesn't actually work here. `label` input (default `"Loading"`)
      is the only accessible text — conveyed via `aria-label` on the `role="status"` element
      itself, not a separate visually-hidden child, since there's no other content on the element
      to conflict with it. No `role="status"` region needed elsewhere since the element *is* the
      status region. Tests pass)
- [x] label — done (internal-only helper, not part of the public 18; `<mr-label>` wraps a native
      `<label>` with `for`/`size`/`required`(asterisk marker)/`disabled`(dims via opacity); see
      Decisions)

## Next step
None mandated — `meridian-ui/`'s own BUILD_PROMPT.md deliverable is still complete (see the
component checklist), and everything since (the `meridian-demo/` app, the two bug fixes, real
secondary entry points, and now re-pointing the demo at the real built package) was user-directed
new scope, not part of that checklist. If a new session picks this up: there's no outstanding task
to resume. Both loose ends the previous update flagged are now resolved: `meridian-demo` installs
the real `dist/meridian-ui` build as an npm dependency (`file:../dist/meridian-ui`, via
`--install-links` so it's a real copy, not a symlink) rather than aliasing into source, and its
production bundle is now *under* the CLI's inherited budget (430.81kB vs. 500kB) as a side effect of
consuming pre-optimized fesm bundles instead of recompiling raw TS — no separate fix needed. One
new, smaller thing worth knowing: `meridian-demo`'s `@meridian/ui` dependency is a `file:` reference
to `../dist/meridian-ui`, which is gitignored (build output, not source) — a fresh clone needs
`meridian-ui` built (`npx ng-packagr -p ng-package.json` from `meridian-ui/`) *before*
`npm install` in `meridian-demo/` will succeed; `meridian-demo` still has no tests beyond the
CLI-scaffolded smoke spec.

Treat any next request (build ordering/CI for the two-project dependency, more demo tests,
Storybook, publishing to a real registry, etc.) as new scope and check with the user before assuming
which one they want.

## Testing gotchas to remember
- A plain field mutation on a TestBed-created component's own instance (e.g.
  `fixture.componentInstance.someField = x`) does **not** reliably re-trigger this Angular
  version's change-detection scheduler on a subsequent `fixture.detectChanges()` — only
  `fixture.componentRef.setInput('someField', x)` (which requires the field to be a real
  `@Input()`) reliably marks the view dirty. Any spec that needs to change an input on an
  already-created test host after the first `detectChanges()` must declare that field as
  `@Input()` and use `setInput()`, not direct property assignment — see
  `button.component.spec.ts`'s `ButtonWithIconHost` for the pattern.
- `npx jest` passing is **not** sufficient proof a component is done — jest-preset-angular's
  template type-checking is looser than `ng-packagr`'s actual AOT `strictTemplates` compile. Hit
  this on `select`: a `cdkConnectedOverlayWidth` signal typed `number | undefined` passed jest
  fine but failed `ng-packagr` with a strict-template TS2322. Always run **both** `npx jest` and
  `npx ng-packagr -p ng-package.json` before considering a component finished, not just the one
  that's faster to iterate on.
- A CDK Overlay panel (`cdkConnectedOverlay`) attaches to a `.cdk-overlay-container` on
  `document.body`, not inside `fixture.nativeElement` — query it via `TestBed.inject
  (OverlayContainer).getContainerElement()`, and call `overlayContainer.ngOnDestroy()` in
  `afterEach` or panel DOM leaks across tests in the same file. See `select.component.spec.ts`.
- In a compound component (container + item, e.g. `tabs`), any property the *container*'s template
  reads off a queried *item* instance (`tab.tabId`, `tab.label`, etc. in `MrTabs`' template) must be
  `public` on the item class, not `protected` — `protected` only permits access from the declaring
  class's own template/methods (and subclasses), and `ng-packagr`'s `strictTemplates` compile
  enforces this like any other TypeScript cross-class access. `active` (set by the container) needs
  the same treatment: a plain public getter/setter with no `@Input()`, since it's parent-set
  internal state, not a consumer-facing binding.
- CDK's `ListKeyManager`/`FocusKeyManager` (`onKeydown`) reads the legacy numeric `event.keyCode`
  (e.g. 40 for down-arrow), not `event.key`. jsdom's `KeyboardEvent` constructor does **not**
  derive `keyCode` from `key` automatically — a synthetic `new KeyboardEvent('keydown', { key:
  'ArrowDown' })` in a test has `keyCode === 0` and the manager silently ignores it. Always pass
  `keyCode` explicitly in a test that dispatches a key event through a CDK key manager (Angular's
  own `(keydown.escape)`-style template bindings are unaffected — those parse `.key`, not
  `.keyCode`). See `dropdown.component.spec.ts`'s ArrowDown test.
- jsdom does no layout, so every element reports zero geometry (`offsetWidth`/`offsetHeight`/
  `getClientRects()` are all always empty). CDK's `InteractivityChecker.isVisible` requires
  non-zero geometry, so anything that depends on it — notably `cdkTrapFocus`'s
  `cdkTrapFocusAutoCapture`, used by `modal` — can never find a focusable element under jsdom and
  silently leaves focus on `<body>`. Stub `jest.spyOn(HTMLElement.prototype,
  'getClientRects').mockReturnValue([{}] as unknown as DOMRectList)` in `beforeEach`
  (`jest.restoreAllMocks()` in `afterEach`) to compensate — this is a jsdom gap, not a bug in the
  component, and real browsers give elements real geometry. See `modal.component.spec.ts`.
- When a host wraps a component whose input is driven by an *external* signal (e.g. `modal`'s
  `[open]`, flipped by the consuming app, not by a click inside the component itself), the same
  "plain field mutation doesn't reliably retrigger CD" gotcha above applies to the *test host's own*
  field just as much as to the tested component's — declare the host's field as a real `@Input()`
  and drive it with `fixture.componentRef.setInput(...)`, exactly like `button.component.spec.ts`'s
  `ButtonWithIconHost`, even though the host is single-purpose and only exists in the spec file. See
  `modal.component.spec.ts`'s `ModalHost`.
- Same gotcha again, one more shape: a test host field that's *also* the target of an
  `(outputChange)="field = $event"` two-way test binding (e.g. `pagination`'s
  `[page]="page" (pageChange)="page = $event"`) still needs to be a real `@Input()` on the host if
  the *test itself* is ever going to reassign it directly after the first `detectChanges()` (as
  opposed to only ever being reassigned by the component's own output, which goes through Angular's
  normal event-binding path and doesn't need this). Assigning it before the first `detectChanges()`
  (an initial-value test, like `tabs`' "respects an initial non-zero selected input") never needs
  this — only a *subsequent* direct assignment from test code does. See
  `pagination.component.spec.ts`'s `PaginationHost.page`.

## Decisions / deviations from BUILD_PROMPT.md
- New: real `ng-packagr` secondary entry points. One `<component>/ng-package.json` per folder at
  `meridian-ui/` root (`avatar/`, `badge/`, ..., `label/` — 19 total), each just `{"lib":
  {"entryFile": "../src/lib/<component>/public-api.ts"}}`; no `package.json` needed in those
  folders (only the primary entry point requires one — see ng-packagr's own
  `ng-entrypoint.schema.json` vs. `ng-package.schema.json`). ng-packagr discovers these
  automatically by scanning for `ng-package.json` files and derives each one's public module id
  (`@meridian/ui/<component>`) from its path relative to the primary entry point — no manual
  `exports` map authoring needed; `ng-packagr` generates the root `package.json`'s `exports` field
  itself from the discovered entry-point graph.
- Cross-component imports must go through the package's own specifier (`@meridian/ui/icon`,
  `@meridian/ui/label`), not a relative path (`../icon/public-api`) — ng-packagr compiles each
  secondary entry point with `rootDir` forced to that entry's own folder, so a relative import
  reaching into a sibling component's folder is a hard `TS6059` rootDir violation. Changed in
  `button`, `checkbox`, `pagination`, `select`, `spinner`, `table`, `toast` (→ `@meridian/ui/icon`)
  and `input-field`, `select` (→ `@meridian/ui/label`). ng-packagr resolves these itself via a
  `paths` mapping it generates internally from the discovered entry-point graph (source for
  analysis passes, built declarations for the real compile) — it does not read this project's own
  `tsconfig.json` `paths`, so that mapping (kept for jest/dev-time source consumption, e.g. by
  `meridian-demo`) is coincidental, not what actually makes the packaged build work.
- Superseded: an earlier pass added `meridian-ui/src/lib/shared/tv.ts`, a `createTV()` instance
  every component's `variants.ts` imported instead of `tailwind-variants` directly, to fix
  `spinner`'s dropped `border-md` (see the bug-fix note above). That's the same cross-folder-import
  constraint as above, applied to a non-component helper — removed, replaced with a small local
  `createTV()` inside `spinner.variants.ts` only (the one component that actually needs the
  border-width class-group extension), matching this codebase's existing precedent of every
  component redeclaring small config locally rather than cross-importing it (e.g. `badge`
  redeclaring `ButtonColor`'s palette as its own `BadgeColor`).
- `meridian-demo/` (separate top-level Angular CLI 22 app, own `package.json`/`node_modules`/
  `angular.json`, a sibling of `meridian-ui/`, not nested inside it and not an Nx/npm-workspace
  monorepo — consistent with "no monorepo tooling in this repo" below) now consumes the real
  **built** `dist/meridian-ui` package as an actual npm dependency (`"@meridian/ui": "file:../dist/
  meridian-ui"`, installed with `--install-links` so it's a real file copy in `node_modules`, not a
  symlink — a symlink would make Angular's peer-dependency resolution look for `@angular/core` etc.
  starting from `dist/`'s real on-disk location upward, which has no `node_modules` of its own,
  instead of from `meridian-demo/node_modules` where they actually live). This supersedes an earlier
  from-source setup (tsconfig `@meridian/ui/<component>` → `../meridian-ui/src/lib/.../public-api.ts`
  path mapping), built before the secondary-entry-points work above existed for the published
  package to satisfy the same import style — `app.ts`/`app.html` needed zero changes for the switch,
  since they always imported through the bare `@meridian/ui/<component>` specifier, never a relative
  source path. One consequence: `meridian-ui` must be built (`npx ng-packagr -p ng-package.json`)
  *before* `npm install` in `meridian-demo/` can succeed, since `dist/` is gitignored build output,
  not source. `meridian-demo/tailwind.config.js` still `require()`s `meridian-ui`'s own
  `tailwind.config.js` directly for the token *definitions* (colors/spacing/etc. — a dev-time file,
  not published into `dist/`, so this one piece is still source-repo-adjacent; see BUILD_PROMPT.md's
  "What NOT to build" exclusion of a token-to-CSS-variable bridge), but `content` now scans the
  *installed* package's compiled output (`node_modules/@meridian/ui/fesm2022/*.mjs`) instead of
  `meridian-ui/src` — confirmed Angular's AOT partial-compilation output still embeds each
  component's literal template HTML and `tv()` class strings as plain string literals, so Tailwind's
  content scanner finds them there exactly as it would in source. `meridian-demo/src/styles.scss`
  still duplicates (doesn't `@import` cross-package) `meridian-ui/src/styles.scss`'s content, to
  avoid a sass cross-package relative-import path — unrelated to and unaffected by this change.
- No monorepo tooling exists in this repo (empty directory to start), so per the prompt's own
  fallback the library lives at top-level `meridian-ui/` rather than `libs/meridian-ui/`. All
  paths in `CLAUDE.md` and this file are adjusted accordingly (`meridian-ui/docs/BUILD_PROMPT.md`,
  `meridian-ui/CONVENTIONS.md`).
- Icons: used `@ng-icons/core` + `@ng-icons/lucide` instead of `lucide-angular` — at build time
  `lucide-angular@1.0.0`'s peer range caps at Angular 21, and this project uses Angular 22.1.6.
  `@ng-icons/core@36` explicitly supports `@angular/core >=22.0.0`.
- Angular/tooling pinned to versions that satisfy each other's peer ranges as of this build:
  `@angular/*@22.1.6`, `ng-packagr@22.1.1` (requires `typescript >=6.0 <6.1`, so
  `typescript@~6.0.3`), `jest@30.5.1` + `jest-preset-angular@17` (requires Jest 30, not 29).
- `jest-preset-angular@17` dropped the old `jest-preset-angular/setup-jest` side-effect import.
  `src/test/setup-jest.ts` now calls `setupZoneTestEnv()` from
  `jest-preset-angular/setup-env/zone` instead.
- `ng-package.json` needed an explicit `allowedNonPeerDependencies` array
  (`tailwind-variants`, `tailwind-merge`, `@ng-icons/core`, `@ng-icons/lucide`) — ng-packagr
  refuses to write the package manifest otherwise.
- Added one small internal `label` component (`<mr-label>`) beyond the public 18 — CONVENTIONS.md
  and the architecture pattern both require components to use it instead of a bare `<label>`, so
  it has to exist. It is not part of the public component-checklist count in the prompt's
  deliverable but is required infrastructure for `input-field`, `checkbox`, `radio`, `toggle`. Done.
- `radio` uses `@angular/cdk/collections`' `UniqueSelectionDispatcher` (already available — CDK is
  a peerDependency) to keep each `mr-radio`'s own visual `checked` signal correct when a sibling
  in the same `name` group is selected. This is necessary, not optional: a native radio `change`
  event only fires on the newly-selected item, never on the one that silently became unchecked, so
  without this a deselected radio's decorative box/dot would stay visually stuck "checked" even
  though the underlying `<input>` correctly updates. This is the same mechanism Angular Material's
  own `mat-radio-button` uses internally for the same reason — not a novel workaround.
- `computed()` only tracks **signal** reads made during its factory function — reading a plain
  (non-signal-backed) class field inside a `computed()` does not make it reactive to that field
  changing later; the computed just returns a stale cached value until some *other* tracked signal
  it depends on also changes. Caught this before it shipped on `checkbox`: `indeterminate` was
  briefly a plain `@Input() indeterminate = false` field read inside `boxClass = computed(...)`,
  which would have left the box's fill color stuck stale after `indeterminate` changed on its own.
  Fixed by making it a proper signal-backed input like `size`/`status`/`disabled`. Rule going
  forward: any `@Input()` whose value is read inside a `computed()` must be signal-backed
  (`private readonly _x = signal(...)` + a setter that calls `.set()`), never a plain field —
  plain fields are only safe to read directly in the template.
- Added `@angular/forms` as a declared `peerDependency`/`devDependency` (it wasn't listed in the
  original scaffold's dependency set). `input-field` implements `ControlValueAccessor` via
  `NG_VALUE_ACCESSOR` — a form-field component that can't plug into `[formControl]`/`ngModel`
  isn't usable in a real app, so this is core to what "build input-field" means, not scope creep.
  It was already present in `node_modules` transitively; only the explicit package.json
  declaration + a plain `npm install` were needed to pin it properly.
- Per-component "own tsconfig path mapping" (prompt's exact wording) is implemented as `paths` in
  `meridian-ui/tsconfig.json` plus a matching `moduleNameMapper` in `jest.config.js`, resolving
  `@meridian/ui/<name>` to that component's `public-api.ts`. This gives tree-shakeable, per-
  component dev-time imports without standing up full Angular Package Format secondary entry
  points (which would need a `package.json` + `ng-package.json` per component folder) — not
  requested explicitly and adds meaningful build complexity for 18 components. Flagging this in
  case real per-subpath *published* imports (post `ng-packagr build`, not just within this repo)
  turn out to matter — that would need the secondary-entry-point approach instead.
- `toast` is a service (`MrToastService`) + a mounted container (`MrToastContainer`) rather than a
  single `@Component` a consumer places in a template, unlike every other component in this
  library. This is a deliberate deviation, not an inconsistency: a toast is triggered imperatively
  from arbitrary application code (a click handler, an HTTP interceptor), which a template-placed
  component fundamentally can't support — there's no "where" to put it ahead of time. `MrToast`
  (the per-entry card) still exists as an ordinary `@Component` and is still exported, in case a
  consumer wants to render one directly without going through the service.

## Known issues
- None currently known. `npm install`, `npx jest` (168 tests across
  icon/button/label/input-field/select/checkbox/radio/toggle/tabs/tooltip/dropdown/modal/card/badge/avatar/pagination/table/spinner/toast),
  and `npx ng-packagr -p ng-package.json` (run from `meridian-ui/`, now producing 19 real secondary
  entry points plus the primary — see the Decisions entry below) are all green as of this update,
  the library has actually been rendered in a real browser (via `meridian-demo/`, which now installs
  and renders against the real *built* `dist/meridian-ui` package, not source) with no visual or
  console-error regressions found beyond the two already fixed two updates ago, and a standalone
  Node resolution smoke test confirmed the *published* package's per-component sub-paths
  (`@meridian/ui/button`, `.../icon`, `.../select`, `.../table`, `.../toast`, `.../label`) resolve
  correctly via its generated `exports` map — CONVENTIONS.md's "always import from a component's own
  sub-path" rule is now satisfiable by, and actually exercised by, a real installed consumer, not
  just an in-repo one resolving through tsconfig `paths`. (Previously flagged here as a known gap;
  resolved two updates ago, and now the demo app itself proves it rather than just a smoke test.)
- Tailwind's PostCSS pipeline had never been run end-to-end before this update (see the plugins.js
  and tailwind-merge fixes above) — worth remembering that "jest passes" and "ng-packagr builds"
  are still not proof a component's *actual CSS* is correct; only a real Tailwind build + browser
  render catches that class-name-level category of bug.
