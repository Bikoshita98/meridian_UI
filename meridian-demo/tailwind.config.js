/**
 * Reuses @meridian/ui's own token config (colors, spacing, typography, radius, shadow) so the
 * demo app renders with the exact same design tokens the library's components are built against.
 * `content` additionally scans meridian-ui's own source, since this app consumes the library
 * straight from `../meridian-ui/src` (via tsconfig path mapping) rather than a prebuilt package —
 * Tailwind needs to see the component templates/variants.ts files themselves to generate their
 * classes.
 */
const meridianConfig = require('../meridian-ui/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...meridianConfig,
  content: ['./src/**/*.{html,ts}', '../meridian-ui/src/**/*.{html,ts}'],
};
