import { tv } from 'tailwind-variants';

export const cardVariants = tv({
  base: 'rounded-lg bg-white',
  variants: {
    variant: {
      elevated: 'border border-neutral-100 shadow-md',
      outlined: 'border border-neutral-200',
    },
    padding: {
      none: 'p-0',
      sm: 'p-lg',
      md: 'p-xl',
      lg: 'p-2xl',
    },
  },
  defaultVariants: {
    variant: 'elevated',
    padding: 'md',
  },
});
