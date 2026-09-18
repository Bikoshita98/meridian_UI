import { tv } from '../shared/tv';
import { InputFieldSize, InputFieldStatus } from './input-field.enums';

export const inputFieldVariants = tv({
  base: 'w-full rounded-md border bg-white font-sans text-neutral-900 shadow-xs outline-none transition-colors duration-150 placeholder:text-neutral-400 focus:ring-2 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-50 disabled:text-neutral-400',
  variants: {
    size: {
      xs: 'h-7 px-sm text-xs',
      sm: 'h-8 px-sm text-sm',
      md: 'h-9 px-md text-base',
      lg: 'h-10 px-lg text-md',
      xl: 'h-12 px-xl text-lg',
    },
    status: {
      default: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100',
      error: 'border-error-500 focus:border-error-500 focus:ring-error-100',
      success: 'border-success-500 focus:border-success-500 focus:ring-success-100',
      warning: 'border-warning-500 focus:border-warning-500 focus:ring-warning-100',
    },
  },
  defaultVariants: {
    size: InputFieldSize.Md,
    status: InputFieldStatus.Default,
  },
});

export const inputFieldHelperVariants = tv({
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
    status: InputFieldStatus.Default,
  },
});
