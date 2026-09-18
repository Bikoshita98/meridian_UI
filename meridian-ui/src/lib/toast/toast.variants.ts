import { tv } from 'tailwind-variants';

export const toastVariants = tv({
  base: 'pointer-events-auto flex w-80 items-start gap-xs rounded-lg border bg-white p-md shadow-lg',
  variants: {
    status: {
      info: 'border-info-300',
      success: 'border-success-300',
      warning: 'border-warning-300',
      error: 'border-error-300',
    },
  },
  defaultVariants: {
    status: 'info',
  },
});

export const toastIconVariants = tv({
  base: 'mt-3xs shrink-0',
  variants: {
    status: {
      info: 'text-info-500',
      success: 'text-success-500',
      warning: 'text-warning-500',
      error: 'text-error-500',
    },
  },
  defaultVariants: {
    status: 'info',
  },
});

export const toastMessageVariants = tv({
  base: 'flex-1 pt-3xs text-sm text-neutral-700',
});

export const toastCloseButtonVariants = tv({
  base: 'mt-3xs shrink-0 rounded-sm text-neutral-400 transition-colors duration-150 hover:text-neutral-600 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500',
});

// The container's own positioning wrapper: click-through everywhere except where an actual toast
// card sits (each card opts back in via `toastVariants`' own `pointer-events-auto`).
export const toastListVariants = tv({
  base: 'pointer-events-none flex flex-col gap-sm',
});
