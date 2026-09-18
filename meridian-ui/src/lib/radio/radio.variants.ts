import { tv } from '../shared/tv';
import { RadioSize, RadioStatus } from './radio.enums';

export const radioBoxVariants = tv({
  base: 'relative inline-flex shrink-0 items-center justify-center rounded-pill border bg-white transition-colors duration-150',
  variants: {
    size: {
      xs: 'h-3.5 w-3.5',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-7 w-7',
    },
    status: {
      default: 'border-neutral-300',
      error: 'border-error-500',
      success: 'border-success-500',
      warning: 'border-warning-500',
    },
    // No standalone classes — a checked radio's border color is resolved per `status` below.
    checked: {
      true: '',
      false: '',
    },
    disabled: {
      true: 'cursor-not-allowed border-neutral-200 bg-neutral-50 opacity-40',
      false: 'cursor-pointer',
    },
  },
  compoundVariants: [
    { status: RadioStatus.Default, checked: true, class: 'border-primary-500' },
    { status: RadioStatus.Error, checked: true, class: 'border-error-500' },
    { status: RadioStatus.Success, checked: true, class: 'border-success-500' },
    { status: RadioStatus.Warning, checked: true, class: 'border-warning-500' },
  ],
  defaultVariants: {
    size: RadioSize.Md,
    status: RadioStatus.Default,
    checked: false,
    disabled: false,
  },
});

export const radioDotVariants = tv({
  base: 'rounded-pill transition-colors duration-150',
  variants: {
    size: {
      xs: 'h-1.5 w-1.5',
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
      xl: 'h-3 w-3',
    },
    status: {
      default: 'bg-primary-500',
      error: 'bg-error-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
    },
  },
  defaultVariants: {
    size: RadioSize.Md,
    status: RadioStatus.Default,
  },
});
