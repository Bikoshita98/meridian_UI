import { tv } from 'tailwind-variants';

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
