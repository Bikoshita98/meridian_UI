# Build Status
Last updated: 2026-09-15T16:26:00Z, after: button component built (variant/color/size/shape/radius/status, icon auto-sizing via contentChildren), full toolchain validated (jest, ng-packagr build all green)

## Component checklist
- [x] icon — done (MrIcon wraps @ng-icons/core + @ng-icons/lucide; tests pass)
- [x] button — done (MrButton: 6 enums — variant/color/size/shape/radius/status; auto-syncs a
      projected `<mr-icon>`'s size via `contentChildren` + `effect()`; loading state renders an
      inline spinner and force-disables the native `<button>`; tests pass)
- [ ] input-field — not started (needs `label` first — see Next step)
- [ ] select — not started
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
- [ ] label — not started (internal-only helper, not part of the public 18; see Decisions)

## Next step
Build the internal `label` component at `meridian-ui/src/lib/label/` (not part of the public 18 —
it's the `<mr-label>` helper CONVENTIONS.md requires instead of a bare `<label>`), following the
same file-set pattern as `icon`/`button`. It only needs to exist well enough to support
`input-field`, `checkbox`, `radio`, `toggle` next (a text/for-id label with an optional
required-marker and disabled-state styling is enough — no need to over-build it). Then build
`input-field` at `meridian-ui/src/lib/input-field/`, using its own `label` input where present and
falling back to `<mr-label>` per CONVENTIONS.md. Run `npx jest` and `npx ng-packagr -p
ng-package.json` from `meridian-ui/` after each to confirm both stay green, and add each new
export to `meridian-ui/src/index.ts` (tsconfig/jest path mappings for `label` and `input-field` are
already reserved).

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
  deliverable but is required infrastructure for `input-field`, `checkbox`, `radio`, `toggle`.
- Per-component "own tsconfig path mapping" (prompt's exact wording) is implemented as `paths` in
  `meridian-ui/tsconfig.json` plus a matching `moduleNameMapper` in `jest.config.js`, resolving
  `@meridian/ui/<name>` to that component's `public-api.ts`. This gives tree-shakeable, per-
  component dev-time imports without standing up full Angular Package Format secondary entry
  points (which would need a `package.json` + `ng-package.json` per component folder) — not
  requested explicitly and adds meaningful build complexity for 18 components. Flagging this in
  case real per-subpath *published* imports (post `ng-packagr build`, not just within this repo)
  turn out to matter — that would need the secondary-entry-point approach instead.

## Known issues
- None yet. `npm install`, `npx jest`, and `npx ng-packagr -p ng-package.json` (run from
  `meridian-ui/`) are all green as of this update, with only the `icon` component built.
