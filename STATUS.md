# Build Status
Last updated: 2026-09-15T16:32:00Z, after: label + input-field components built (input-field implements ControlValueAccessor, added @angular/forms as a declared peer/dev dependency), full toolchain validated (jest, ng-packagr build all green)

## Component checklist
- [x] icon — done (MrIcon wraps @ng-icons/core + @ng-icons/lucide; tests pass)
- [x] button — done (MrButton: 6 enums — variant/color/size/shape/radius/status; auto-syncs a
      projected `<mr-icon>`'s size via `contentChildren` + `effect()`; loading state renders an
      inline spinner and force-disables the native `<button>`; tests pass)
- [x] input-field — done (MrInputField: size/status enums, implements `ControlValueAccessor` so it
      works with `[formControl]`/`ngModel`, renders its own `<mr-label>` when `label` is set,
      helper text colored per status with `aria-describedby`/`aria-invalid`; tests pass)
- [ ] select — not started (build this next)
- [ ] checkbox — not started
- [ ] radio — not started
- [ ] toggle — not started
- [ ] tabs — not started
- [ ] tooltip — not started
- [ ] dropdown — not started
- [ ] modal — not started
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
Build the `select` component at `meridian-ui/src/lib/select/`, following the same file-set pattern
as `icon`/`button`/`input-field` (enums.ts, variants.ts using `tv()`, component.ts with OnPush +
`@Input()` setters backed by signals + `computed()` for the class string, component.html,
public-api.ts, index.ts, component.spec.ts). It's built on Angular CDK Overlay (already a
peerDependency) for the dropdown panel — `src/styles.scss` already imports
`@angular/cdk/overlay-prebuilt.css` per BUILD_PROMPT.md, so no new CSS wiring is needed. Like
`input-field`, it should implement `ControlValueAccessor` (`@angular/forms` is now a declared
dependency, see Decisions) so it works with `[formControl]`/`ngModel`, and should render its own
`<mr-label>` when a `label` input is set, matching the `input-field` pattern. Run `npx jest` and
`npx ng-packagr -p ng-package.json` from `meridian-ui/` after to confirm both stay green, and add
its export to `meridian-ui/src/index.ts` (its tsconfig/jest path mapping is already reserved).

## Testing gotcha to remember
A plain field mutation on a TestBed-created component's own instance (e.g.
`fixture.componentInstance.someField = x`) does **not** reliably re-trigger this Angular version's
change-detection scheduler on a subsequent `fixture.detectChanges()` — only
`fixture.componentRef.setInput('someField', x')` (which requires the field to be a real `@Input()`)
reliably marks the view dirty. Any spec that needs to change an input on an already-created test
host after the first `detectChanges()` must declare that field as `@Input()` and use `setInput()`,
not direct property assignment — see `button.component.spec.ts`'s `ButtonWithIconHost` for the
pattern.

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
- None. `npm install`, `npx jest` (35 tests across icon/button/label/input-field), and
  `npx ng-packagr -p ng-package.json` (run from `meridian-ui/`) are all green as of this update.
