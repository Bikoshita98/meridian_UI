import { tv } from 'tailwind-variants';

export const modalPanelVariants = tv({
  base: 'w-full rounded-lg bg-white p-lg shadow-2xl outline-none',
  variants: {
    size: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
