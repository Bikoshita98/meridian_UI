/**
 * Reuses @meridian/ui's design tokens (colors, spacing, typography, radius, shadow) so the demo
 * renders with the exact same tokens the library's components are built against.
 *
 * This app is standalone: the token config and its Tailwind plugin are vendored in
 * `vendor/tokens/` (copied from the library's `tailwind.config.js` / `plugins.js`), and the
 * built library itself is vendored in `vendor/meridian-ui` (see package.json). Re-copy both when
 * the library changes.
 *
 * `content` scans the installed package's compiled output (`node_modules/@meridian/ui/fesm2022/
 * *.mjs`): Angular's AOT output still embeds each component's template HTML and `tv()` class
 * strings as plain string literals, so Tailwind's content scanner finds them there.
 */
const meridianConfig = require('./vendor/tokens/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...meridianConfig,
  content: ['./src/**/*.{html,ts}', './node_modules/@meridian/ui/fesm2022/*.mjs'],
};
