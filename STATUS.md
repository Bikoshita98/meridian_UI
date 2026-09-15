# Build Status
Last updated: 2026-09-15T17:07:00Z, after: dropdown component built (compound MrDropdown + MrDropdownItem, CDK FocusKeyManager for arrow-key nav), full toolchain validated (jest, ng-packagr build all green)

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
- [ ] modal — not started (build this next)
- [ ] card — not started
- [ ] badge — not started
- [ ] avatar — not started
- [ ] pagination — not started
- [ ] table — not started
- [ ] toast — not started
- [ ] spinner — not started
- [x] label — done (internal-only helper, not part of the public 18; `<mr-label>` wraps a native
      `<label>` with `for`/`size`/`required`(asterisk marker)/`disabled`(dims via opacity); see
      Decisions)

## Next step
Build `modal` at `meridian-ui/src/lib/modal/`. Architecturally different from every other overlay
component so far: `select`/`dropdown`/`tooltip` all use the *declarative* `cdkConnectedOverlay`
directive, which is hard-wired to *connected* (anchored-to-a-trigger-element) positioning — a modal
has no trigger to anchor to, it's centered on the viewport, so it needs CDK Overlay's lower-level,
*imperative* API instead: inject `Overlay` from `@angular/cdk/overlay` directly, create an
`OverlayRef` via `overlay.create({ positionStrategy: overlay.position().global()
.centerHorizontally().centerVertically(), hasBackdrop: true, backdropClass: ... })`, and attach the
modal's own content to it via a `TemplatePortal` (`@ViewChild(TemplateRef)` on the modal's own
`<ng-template>` wrapping its `<ng-content>`, instantiated with the component's own
`ViewContainerRef`). Keep the *public* API declarative and consistent with the rest of the library
rather than introducing a service-based open()/close() pattern this codebase doesn't use anywhere
else: `<mr-modal [open]="isOpen" (openChange)="isOpen = $event">...</mr-modal>`, where the
component's own `ngOnChanges`/an `effect()` watching an `open` signal creates/attaches the
`OverlayRef` when it flips true and disposes it when it flips false (dispose in `ngOnDestroy` too,
in case the host is destroyed while still open). Two real accessibility requirements, not optional:
1. **Focus trap** — Tab must not escape to background content while the modal is open. Use CDK's
   `cdk/a11y` `CdkTrapFocus` directive (`cdkTrapFocus` + `cdkTrapFocusAutoCapture` on the modal
   panel content) rather than hand-rolling tab-key interception.
2. **Focus restoration** — capture `document.activeElement` right before opening (this is the
   trigger button in the calling app), and restore focus to it when the modal closes. CDK's
   `FocusMonitor`/`cdk/a11y` has helpers for this, or it's simple enough to do by hand with a saved
   element reference — either is fine, just don't skip it.
Closing: Escape key (while trapped-focus is active, still needs an explicit `(keydown.escape)`
listener — `cdkTrapFocus` only traps Tab, it doesn't add an Escape handler), backdrop click (an
`@Input() dismissible = true` to allow disabling backdrop-click-to-close for "must choose an
option" modals is a reasonable, minimal addition — don't go further than that, e.g. no need for a
whole confirmation-before-close system). `ModalSize` enum (`sm`/`md`/`lg`/`xl`, controlling panel
`max-w-*`) makes sense here since modal width genuinely varies by content; skip a `status` enum,
nothing color-coded about a modal's own chrome. No CVA. After `modal`, the remaining components
(`card`, `badge`, `avatar`, `pagination`, `table`, `toast`, `spinner`) are all simpler, non-overlay
presentational components — `card`/`badge`/`avatar` in particular should go quickly, matching
`icon`'s minimal pattern rather than any of the CVA/overlay components. Run `npx jest` **and**
`npx ng-packagr -p ng-package.json` after each — see the ng-packagr gotchas below, jest alone is
not sufficient. Add each export to `meridian-ui/src/index.ts` (tsconfig/jest path mappings already
reserved).

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
- None. `npm install`, `npx jest` (103 tests across
  icon/button/label/input-field/select/checkbox/radio/toggle/tabs/tooltip/dropdown), and
  `npx ng-packagr -p ng-package.json` (run from `meridian-ui/`) are all green as of this update.
