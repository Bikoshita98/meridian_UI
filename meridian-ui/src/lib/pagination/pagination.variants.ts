import { tv } from '../shared/tv';

export const paginationNavVariants = tv({
  base: 'inline-flex items-center gap-2xs',
});

// Same fixed square footprint for a page number, prev/next, and the ellipsis placeholder, so a
// row of controls lines up evenly regardless of which kind of item sits in each slot.
export const paginationButtonVariants = tv({
  base: 'inline-flex select-none items-center justify-center whitespace-nowrap rounded-md border border-transparent font-sans font-medium text-neutral-600 transition-colors duration-150 hover:bg-neutral-50 active:bg-neutral-100 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:pointer-events-none disabled:opacity-40',
  variants: {
    size: {
      xs: 'h-7 w-7 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-9 w-9 text-base',
      lg: 'h-10 w-10 text-md',
      xl: 'h-12 w-12 text-lg',
    },
    active: {
      true: 'border-transparent bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-600',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    active: false,
  },
});

export const paginationEllipsisVariants = tv({
  base: 'inline-flex select-none items-center justify-center text-neutral-400',
  variants: {
    size: {
      xs: 'h-7 w-7',
      sm: 'h-8 w-8',
      md: 'h-9 w-9',
      lg: 'h-10 w-10',
      xl: 'h-12 w-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
