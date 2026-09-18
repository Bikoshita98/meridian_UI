/**
 * Reuses @meridian/ui's own token config (colors, spacing, typography, radius, shadow) so the
 * demo app renders with the exact same design tokens the library's components are built against.
 * This still reaches into the sibling `meridian-ui/` source repo for the token definitions
 * themselves — `tailwind.config.js` is a dev/build-time file, not part of what `ng-packagr`
 * publishes into `dist/meridian-ui` — which is the one part of this setup that still assumes a
 * source-repo-adjacent consumer rather than a truly standalone npm install (BUILD_PROMPT.md's own
 * "What NOT to build" section explicitly excludes a token-to-CSS-variable bridge, which is the
 * usual way a published library would solve this for external consumers).
 *
 * `content` scans `@meridian/ui`'s actual *installed* package (`node_modules/@meridian/ui/fesm2022/
 * *.mjs`), not meridian-ui's TypeScript source — this app now consumes the real built/packed
 * dependency (`file:../dist/meridian-ui`, see package.json), and Angular's AOT partial-compilation
 * output still embeds each component's literal template HTML and `tv()` class strings as plain
 * string literals, so Tailwind's regex-based content scanner finds them there exactly as it would
 * in source.
 */
const meridianConfig = require('../meridian-ui/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...meridianConfig,
  content: ['./src/**/*.{html,ts}', './node_modules/@meridian/ui/fesm2022/*.mjs'],
};
