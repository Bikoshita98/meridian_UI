# Build Status
Last updated: 2026-09-15T03:05:00Z, after: scaffolding + icon component, full toolchain validated (npm install, jest, ng-packagr build all green)

## Component checklist
- [x] icon — done (MrIcon wraps @ng-icons/core + @ng-icons/lucide; tests pass)
- [ ] button — not started (build this next, it's the reference pattern for enums/variants/spec)
- [ ] input-field — not started
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
Build the `button` component at `meridian-ui/src/lib/button/` following the exact file set and
pattern proven by `icon` (enums.ts, variants.ts using `tv()`, component.ts with OnPush +
`@Input()` decorators + signals for derived state, component.html, public-api.ts, index.ts,
component.spec.ts using TestBed), then run `npx jest src/lib/button` and
`npx ng-packagr -p ng-package.json` from `meridian-ui/` to confirm both stay green before moving
to the next component. Add its export to `meridian-ui/src/index.ts` and its path mapping is
already reserved in `tsconfig.json`.

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
