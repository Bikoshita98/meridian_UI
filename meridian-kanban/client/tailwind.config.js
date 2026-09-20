/**
 * Reuses @meridian/ui's own token config, same approach as meridian-demo/tailwind.config.js (see
 * that file's comment for the full rationale — this app is one directory deeper, hence `../../`).
 */
const meridianConfig = require('../../meridian-ui/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...meridianConfig,
  content: ['./src/**/*.{html,ts}', './node_modules/@meridian/ui/fesm2022/*.mjs'],
};
