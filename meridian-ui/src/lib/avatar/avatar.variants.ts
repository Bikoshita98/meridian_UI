import { tv } from '../shared/tv';

export const avatarVariants = tv({
  base: 'inline-flex select-none items-center justify-center overflow-hidden bg-neutral-100 font-sans font-medium leading-none text-neutral-600',
  variants: {
    // Same height scale as `button`'s `size` variant, so an avatar sits flush next to a button of
    // the same size in a toolbar/header.
    size: {
      xs: 'h-7 w-7 text-2xs',
      sm: 'h-8 w-8 text-xs',
      md: 'h-9 w-9 text-sm',
      lg: 'h-10 w-10 text-base',
      xl: 'h-12 w-12 text-lg',
    },
    shape: {
      circle: 'rounded-pill',
      square: 'rounded-lg',
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle',
  },
});
