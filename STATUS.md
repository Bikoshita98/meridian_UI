# Build Status
Last updated: 2026-09-17T16:45:00Z, after: spinner component built (`MrSpinner`: the loading ring
`button` already renders inline, pulled out standalone; `SpinnerSize` maps to `icon`'s own
`ICON_SIZE_PX` pixel scale rather than `button`'s `h-*` classes; added a `SpinnerColor` axis since
this component library has no host-class-forwarding mechanism a consumer could otherwise use to
recolor it), full toolchain validated (jest, ng-packagr build all green). Only `toast` remains.

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
- [ ] toast — not started (build this next)
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
Build `toast` at `meridian-ui/src/lib/toast/` — the last of the 18. This is a bigger shape question
than any component built so far: decide the architecture *before* writing code. A per-instance
`<mr-toast>` a consumer places manually (like every other component) doesn't fit how toasts
actually get used — they need to be triggered imperatively from anywhere in an app (a click
handler, an HTTP error interceptor, etc.), not sit in a template waiting to be shown. The likely
shape: an injectable `MrToastService` with a `show(message, options)`-style API that pushes onto an
internal signal-backed queue, plus an `<mr-toast-container>` component a consumer mounts once near
the app root (or at least once per overlay context) that reads that queue and renders/positions the
actual toast elements — probably via CDK Overlay again, like `modal`'s imperative `Overlay` API
(global position, but anchored to a corner via `.position().global().top()/.bottom()/.left()/
.right()` instead of centered). Each toast needs its own timed auto-dismiss (`setTimeout`, same
non-RxJS precedent as `tooltip`'s `showDelay`/`hideDelay`) with likely a hover-to-pause affordance,
plus a manual dismiss control (reuse `MrIcon`'s `x` icon, already in `MERIDIAN_ICONS`). Think a
`ToastVariant`/`status` axis (success/warning/error/info, matching the semantic palette every other
component redeclares) since a toast's whole purpose is usually to communicate a status. `role="status"`
or `role="alert"` (`alert` for anything error-like, interrupts immediately; `status` for anything
else, polite) on each toast — same reasoning as `spinner`'s `role="status"`, but toast messages
*do* have visible text so no separate `aria-label` is needed here, unlike `spinner`. Run `npx jest`
**and** `npx ng-packagr -p ng-package.json` after — see the ng-packagr gotchas below, jest alone is
not sufficient (a CDK-Overlay-based component especially needs the `OverlayContainer` test-cleanup
gotcha below). Add the export to `meridian-ui/src/index.ts` (tsconfig/jest path mapping already
reserved). This is the last component — after it's done and both green, the checklist is complete.

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

## Known issues
- None. `npm install`, `npx jest` (150 tests across
  icon/button/label/input-field/select/checkbox/radio/toggle/tabs/tooltip/dropdown/modal/card/badge/avatar/pagination/table/spinner),
  and `npx ng-packagr -p ng-package.json` (run from `meridian-ui/`) are all green as of this update.
