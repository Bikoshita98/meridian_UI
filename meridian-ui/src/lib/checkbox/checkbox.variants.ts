import { tv } from '../shared/tv';
import type { IconSize } from '../icon/icon.enums';
import { CheckboxSize, CheckboxStatus } from './checkbox.enums';

export const checkboxBoxVariants = tv({
  base: 'relative inline-flex shrink-0 items-center justify-center rounded-sm border bg-white transition-colors duration-150',
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
    // No standalone classes — a checked box's actual fill is resolved per `status` below.
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
    { status: CheckboxStatus.Default, checked: true, class: 'border-primary-500 bg-primary-500 text-white' },
    { status: CheckboxStatus.Error, checked: true, class: 'border-error-500 bg-error-500 text-white' },
    { status: CheckboxStatus.Success, checked: true, class: 'border-success-500 bg-success-500 text-white' },
    { status: CheckboxStatus.Warning, checked: true, class: 'border-warning-500 bg-warning-500 text-white' },
  ],
  defaultVariants: {
    size: CheckboxSize.Md,
    status: CheckboxStatus.Default,
    checked: false,
    disabled: false,
  },
});

/** Keeps the checkmark/dash icon legible at every box size without needing its own size input. */
export const CHECKBOX_ICON_SIZE: Record<`${CheckboxSize}`, `${IconSize}`> = {
  [CheckboxSize.Xs]: 'xs',
  [CheckboxSize.Sm]: 'xs',
  [CheckboxSize.Md]: 'sm',
  [CheckboxSize.Lg]: 'sm',
  [CheckboxSize.Xl]: 'md',
};
