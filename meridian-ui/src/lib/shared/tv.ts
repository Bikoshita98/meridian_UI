import { createTV } from 'tailwind-variants';

/**
 * tailwind-variants v3 bundles its own Tailwind-v4-shaped class-conflict resolver rather than
 * reading this project's tailwind.config.js. Its default border-width matcher only recognizes
 * numeric values (`border-2`, `border-4`, ...), so this library's own word-keyed `borderWidth`
 * scale (`border-md`/`border-lg` — see tailwind.config.js) falls through to the border-COLOR
 * group's catch-all matcher instead, and silently loses a class-merge conflict against any
 * border-color utility listed after it in the same class string. Concretely: `spinner`'s base
 * class `border-md border-current border-t-transparent` was having `border-md` dropped entirely
 * (both got classified as "border-color", and tailwind-merge keeps only the last one in a
 * conflicting group), leaving the loading ring with no border-width — invisible. This never
 * surfaced before because no component's Tailwind pipeline had ever actually been run through a
 * real browser build until a consuming app exercised it.
 *
 * Extending (not overriding) the border-width class group here — every `tv()` in the library
 * should import from this file, not `tailwind-variants` directly — fixes that misclassification
 * everywhere at once, per BUILD_PROMPT.md's "extend tailwind-merge's config" requirement.
 */
export const tv = createTV({
  twMergeConfig: {
    extend: {
      classGroups: {
        'border-w': [{ border: ['md', 'lg'] }],
      },
    },
  },
});
