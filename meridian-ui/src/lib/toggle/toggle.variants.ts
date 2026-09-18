import { tv } from 'tailwind-variants';
import { ToggleSize, ToggleStatus } from './toggle.enums';

export const toggleTrackVariants = tv({
  base: 'relative inline-flex shrink-0 items-center rounded-pill border border-neutral-300 bg-neutral-200 transition-colors duration-150',
  variants: {
    size: {
      xs: 'h-4 w-7',
      sm: 'h-5 w-9',
      md: 'h-6 w-10',
      lg: 'h-7 w-12',
      xl: 'h-8 w-14',
    },
    // No standalone classes — an unchecked track is always neutral gray; only a checked track's
    // fill color is resolved per `status`, below.
    status: {
      default: '',
      error: '',
      success: '',
      warning: '',
    },
    checked: {
      true: '',
      false: '',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-40',
      false: 'cursor-pointer',
    },
  },
  compoundVariants: [
    { status: ToggleStatus.Default, checked: true, class: 'border-primary-500 bg-primary-500' },
    { status: ToggleStatus.Error, checked: true, class: 'border-error-500 bg-error-500' },
    { status: ToggleStatus.Success, checked: true, class: 'border-success-500 bg-success-500' },
    { status: ToggleStatus.Warning, checked: true, class: 'border-warning-500 bg-warning-500' },
  ],
  defaultVariants: {
    size: ToggleSize.Md,
    status: ToggleStatus.Default,
    checked: false,
    disabled: false,
  },
});

export const toggleThumbVariants = tv({
  base: 'pointer-events-none absolute left-0.5 top-1/2 -translate-y-1/2 rounded-pill bg-white shadow-sm transition-transform duration-150',
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-7 w-7',
    },
    // The actual slide distance depends on both size (track width - thumb size) and checked —
    // resolved per size below rather than a single shared distance.
    checked: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { size: ToggleSize.Xs, checked: true, class: 'translate-x-3' },
    { size: ToggleSize.Sm, checked: true, class: 'translate-x-4' },
    { size: ToggleSize.Md, checked: true, class: 'translate-x-4' },
    { size: ToggleSize.Lg, checked: true, class: 'translate-x-5' },
    { size: ToggleSize.Xl, checked: true, class: 'translate-x-6' },
  ],
  defaultVariants: {
    size: ToggleSize.Md,
    checked: false,
  },
});
