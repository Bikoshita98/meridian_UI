/**
 * Single source of truth for every design token consumed by @meridian/ui components.
 * Components must never hardcode a hex value, an arbitrary pixel spacing, or an arbitrary
 * shadow — everything routes through the tokens defined here (see CONVENTIONS.md).
 */

// --- Layer 1: raw palettes -------------------------------------------------
// Never referenced directly from a component. Only the semantic aliases below are.
const rawPalettes = {
  indigo: {
    25: '#F5F6FF', 50: '#EEF0FF', 100: '#E0E4FF', 200: '#C7CDFE',
    300: '#A4AEFC', 400: '#8189F8', 500: '#6366F1', 600: '#4F46E5',
  },
  plum: {
    25: '#FDF4FF', 50: '#FBE8FF', 100: '#F6D0FE', 200: '#EEAAFD',
    300: '#E27AFA', 400: '#D24CF0', 500: '#B026D6', 600: '#8E1BAE',
  },
  sky: {
    25: '#F0F9FF', 50: '#E0F2FE', 100: '#BAE6FD', 200: '#7DD3FC',
    300: '#38BDF8', 400: '#0EA5E9', 500: '#0284C7', 600: '#036AA1',
  },
  emerald: {
    25: '#F1FCF6', 50: '#DCFCE9', 100: '#B8F5D0', 200: '#86EFAC',
    300: '#4ADE80', 400: '#22C55E', 500: '#16A34A', 600: '#158240',
  },
  amber: {
    25: '#FFFBEB', 50: '#FEF3C7', 100: '#FDE68A', 200: '#FCD34D',
    300: '#FBBF24', 400: '#F59E0B', 500: '#D97706', 600: '#B45309',
  },
  crimson: {
    25: '#FEF2F3', 50: '#FEE2E4', 100: '#FECDD0', 200: '#FCA5AB',
    300: '#F97583', 400: '#F13F55', 500: '#DC1F3C', 600: '#B01530',
  },
  slate: {
    25: '#FAFAFB', 50: '#F4F5F7', 100: '#E7E9EE', 200: '#CDD2DC',
    300: '#A6AEBD', 400: '#7C8598', 500: '#5B6478', 600: '#434B5C',
  },
};

// --- Layer 2: semantic aliases ---------------------------------------------
// The only palette names a component's variants.ts may reference.
const semanticColors = {
  primary: rawPalettes.indigo,
  secondary: rawPalettes.plum,
  info: rawPalettes.sky,
  success: rawPalettes.emerald,
  warning: rawPalettes.amber,
  error: rawPalettes.crimson,
  neutral: rawPalettes.slate,
};

const semanticSpacing = {
  '3xs': '2px',
  '2xs': '4px',
  xs: '6px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
};

const fontSize = {
  '2xs': ['0.5rem', { lineHeight: '0.75rem' }],
  xs: ['0.625rem', { lineHeight: '0.875rem' }],
  sm: ['0.75rem', { lineHeight: '1rem' }],
  base: ['0.875rem', { lineHeight: '1.25rem' }],
  md: ['1rem', { lineHeight: '1.5rem' }],
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  xl: ['1.25rem', { lineHeight: '1.875rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.375rem', letterSpacing: '-0.01em' }],
  '4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.01em' }],
  '5xl': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.02em' }],
  '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
  '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
  '8xl': ['5.25rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
  '9xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#0C0D12',
      ...semanticColors,
    },
    fontSize,
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      display: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    borderRadius: {
      none: '0px',
      '2xs': '2px',
      xs: '4px',
      sm: '6px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      pill: '9999px',
    },
    borderWidth: {
      none: '0px',
      DEFAULT: '1px',
      md: '2px',
      lg: '3px',
    },
    boxShadow: {
      xs: '0 1px 2px 0 rgba(16, 24, 40, 0.05)',
      sm: '0 1px 3px 0 rgba(16, 24, 40, 0.10), 0 1px 2px -1px rgba(16, 24, 40, 0.06)',
      md: '0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06)',
      lg: '0 12px 16px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03)',
      xl: '0 20px 24px -4px rgba(16, 24, 40, 0.08), 0 8px 8px -4px rgba(16, 24, 40, 0.03)',
      '2xl': '0 24px 48px -12px rgba(16, 24, 40, 0.18)',
      none: 'none',
    },
    extend: {
      spacing: semanticSpacing,
    },
  },
  plugins: [require('./plugins.js')],
  // Exported so a consuming app's tailwind.config.js can read the raw token layer
  // (e.g. to build charts or other non-component surfaces) without duplicating it.
  meridianTokens: { rawPalettes, semanticColors, semanticSpacing, fontSize },
};
