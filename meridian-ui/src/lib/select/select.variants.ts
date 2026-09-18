import { tv } from '../shared/tv';
import { SelectSize, SelectStatus } from './select.enums';

export const selectTriggerVariants = tv({
  base: 'flex w-full items-center justify-between gap-xs rounded-md border bg-white font-sans text-left text-neutral-900 shadow-xs outline-none transition-colors duration-150 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-50 disabled:text-neutral-400',
  variants: {
    size: {
      xs: 'h-7 px-sm text-xs',
      sm: 'h-8 px-sm text-sm',
      md: 'h-9 px-md text-base',
      lg: 'h-10 px-lg text-md',
      xl: 'h-12 px-xl text-lg',
    },
    status: {
      default: 'border-neutral-300',
      error: 'border-error-500',
      success: 'border-success-500',
      warning: 'border-warning-500',
    },
    open: {
      true: 'ring-2',
      false: '',
    },
  },
  compoundVariants: [
    { status: SelectStatus.Default, open: true, class: 'border-primary-500 ring-primary-100' },
    { status: SelectStatus.Error, open: true, class: 'ring-error-100' },
    { status: SelectStatus.Success, open: true, class: 'ring-success-100' },
    { status: SelectStatus.Warning, open: true, class: 'ring-warning-100' },
  ],
  defaultVariants: {
    size: SelectSize.Md,
    status: SelectStatus.Default,
    open: false,
  },
});

export const selectValueVariants = tv({
  base: 'flex-1 truncate',
  variants: {
    empty: {
      true: 'text-neutral-400',
      false: 'text-neutral-900',
    },
  },
  defaultVariants: {
    empty: false,
  },
});

export const selectPanelVariants = tv({
  base: 'max-h-64 overflow-auto rounded-md border border-neutral-200 bg-white py-2xs shadow-lg',
});

export const selectOptionVariants = tv({
  base: 'cursor-pointer px-md py-xs text-base text-neutral-700 transition-colors duration-150',
  variants: {
    selected: {
      true: 'bg-primary-50 text-primary-600',
      false: 'hover:bg-primary-25',
    },
    disabled: {
      true: 'pointer-events-none opacity-40',
      false: '',
    },
  },
  defaultVariants: {
    selected: false,
    disabled: false,
  },
});

export const selectHelperVariants = tv({
  base: 'label-3',
  variants: {
    status: {
      default: 'text-neutral-500',
      error: 'text-error-600',
      success: 'text-success-600',
      warning: 'text-warning-600',
    },
  },
  defaultVariants: {
    status: SelectStatus.Default,
  },
});
