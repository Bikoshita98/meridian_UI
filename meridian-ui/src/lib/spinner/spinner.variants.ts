import { createTV } from 'tailwind-variants';

// `tailwind-variants` v3 bundles its own Tailwind-v4-shaped class-conflict resolver rather than
// reading this project's tailwind.config.js. Its default border-width matcher only recognizes
// numeric values (`border-2`, `border-4`, ...), so this library's word-keyed `borderWidth` scale
// (`border-md`/`border-lg` below — see tailwind.config.js) falls through to the border-COLOR
// group's catch-all matcher instead, and silently loses its merge conflict against `border-current`
// (both get classified as "border-color"; the merge keeps only the last one in the list) — so
// `border-md` was being dropped outright, leaving the ring with no border-width at all. This local
// `tv` extends just the `border-w` class group with the two extra keys to fix that. (Not factored
// into a shared helper: a cross-component/cross-entry-point import here would break ng-packagr's
// per-secondary-entry-point `rootDir` — every other component redeclares small config locally for
// the same reason, e.g. `badge` redeclaring `ButtonColor`'s palette as its own `BadgeColor`.)
const tv = createTV({
  twMergeConfig: {
    extend: {
      classGroups: {
        'border-w': [{ border: ['md', 'lg'] }],
      },
    },
  },
});

// Same ring markup `button` renders inline for its own loading state (`animate-spin` + a
// current-color border with the top edge cut out), pulled out standalone so it can be placed
// anywhere (a loading placeholder over a `card`/`table`), not just inside a `button`.
export const spinnerVariants = tv({
  base: 'inline-block shrink-0 animate-spin rounded-pill border-md border-current border-t-transparent',
  variants: {
    color: {
      primary: 'text-primary-500',
      secondary: 'text-secondary-500',
      neutral: 'text-neutral-400',
      success: 'text-success-500',
      warning: 'text-warning-500',
      error: 'text-error-500',
      info: 'text-info-500',
    },
  },
  defaultVariants: {
    color: 'neutral',
  },
});
