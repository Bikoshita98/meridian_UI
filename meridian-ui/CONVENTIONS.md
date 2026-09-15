# Conventions

House rules for `@meridian/ui`. Binding for humans and AI coding assistants alike — follow these
over local intuition or a different library's conventions.

- Always import from a component's own sub-path (`@meridian/ui/button`), never a root barrel.
- Never invent a color, spacing, radius, or shadow value inline — it must exist in
  `tailwind.config.js`. Components reference semantic tokens only (`primary`, `neutral`, …), never
  a raw palette (`indigo`, `slate`, …) directly.
- No `ngClass` / `ngStyle` anywhere — use `[class]` / `[style]` bindings only.
- No `NgModule` wrapping; omit `standalone: true` (implicit default in this Angular version).
- Prefer `gap-*` on flex/grid containers over margin utilities on children; never pass a margin
  class through a component's `customClass`-style input.
- Use a component's own `label` input where one exists; otherwise use `<mr-label>` instead of a
  bare `<label>`.
- All variant/color/size/shape/status `@Input()`s are enums typed as template-literal types, so an
  invalid value fails Angular's AOT type-check rather than silently no-op-ing at runtime.
- Styling logic lives only in `<component>.variants.ts` (a `tv()` config). No hand-concatenated
  class strings, no conditional class logic in the component class or template.
- `ChangeDetectionStrategy.OnPush` on every component.
- No `-legacy` component today — this is a fresh system. If a future consolidation needs one,
  follow the `<name>-legacy` suffix convention rather than deleting the superseded component
  outright.
