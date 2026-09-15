/**
 * Generates the semantic typography utility classes (.heading-*, .subheading-*, .label-*,
 * and the .text-{size}-{weight} cross-product) referenced by variants.ts across the library.
 * Every value here is pulled from tailwind.config.js's theme — nothing is hardcoded.
 */
const plugin = require('tailwindcss/plugin');

const HEADINGS = {
  'heading-1': { size: '9xl', weight: '700', family: 'display' },
  'heading-2': { size: '7xl', weight: '700', family: 'display' },
  'heading-3': { size: '5xl', weight: '600', family: 'display' },
  'heading-4': { size: '4xl', weight: '600', family: 'display' },
  'heading-5': { size: '3xl', weight: '600', family: 'display' },
  'heading-6': { size: '2xl', weight: '600', family: 'display' },
};

const SUBHEADINGS = {
  'subheading-1': { size: 'xl', weight: '500', family: 'sans' },
  'subheading-2': { size: 'lg', weight: '500', family: 'sans' },
};

const LABELS = {
  'label-1': { size: 'md', weight: '500', family: 'sans' },
  'label-2': { size: 'base', weight: '500', family: 'sans' },
  'label-3': { size: 'sm', weight: '500', family: 'sans' },
};

const WEIGHTS = { normal: '400', medium: '500', semibold: '600', bold: '700' };

module.exports = plugin(function ({ addUtilities, theme }) {
  const utilities = {};

  const resolveFontSize = (size) => {
    const value = theme(`fontSize.${size}`);
    return Array.isArray(value) ? value : [value, {}];
  };

  const emit = (className, { size, weight, family }) => {
    const [fontSize, opts] = resolveFontSize(size);
    utilities[`.${className}`] = {
      fontFamily: theme(`fontFamily.${family}`).join(', '),
      fontSize,
      fontWeight: weight,
      lineHeight: opts.lineHeight ?? '1.5',
      ...(opts.letterSpacing ? { letterSpacing: opts.letterSpacing } : {}),
    };
  };

  Object.entries(HEADINGS).forEach(([name, cfg]) => emit(name, cfg));
  Object.entries(SUBHEADINGS).forEach(([name, cfg]) => emit(name, cfg));
  Object.entries(LABELS).forEach(([name, cfg]) => emit(name, cfg));

  // Generated cross-product: .text-{size}-{weight}, e.g. .text-md-semibold
  Object.keys(theme('fontSize')).forEach((size) => {
    Object.entries(WEIGHTS).forEach(([weightName, weightValue]) => {
      emit(`text-${size}-${weightName}`, { size, weight: weightValue, family: 'sans' });
    });
  });

  addUtilities(utilities);
});
