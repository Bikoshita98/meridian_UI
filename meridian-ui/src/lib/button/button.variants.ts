import { tv } from '../shared/tv';
import { ButtonColor, ButtonRadius, ButtonShape, ButtonSize, ButtonStatus, ButtonVariant } from './button.enums';

// Every class below is written out literally (never interpolated) so Tailwind's static content
// scan can find it — a template-literal color token like `bg-${color}-500` is invisible to it.
const colorCompoundVariants = [
  {
    variant: ButtonVariant.Filled,
    color: ButtonColor.Primary,
    class: 'border-transparent bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-600',
  },
  {
    variant: ButtonVariant.Filled,
    color: ButtonColor.Secondary,
    class: 'border-transparent bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-600',
  },
  {
    variant: ButtonVariant.Filled,
    color: ButtonColor.Neutral,
    class: 'border-transparent bg-neutral-500 text-white hover:bg-neutral-600 active:bg-neutral-600',
  },
  {
    variant: ButtonVariant.Filled,
    color: ButtonColor.Success,
    class: 'border-transparent bg-success-500 text-white hover:bg-success-600 active:bg-success-600',
  },
  {
    variant: ButtonVariant.Filled,
    color: ButtonColor.Warning,
    class: 'border-transparent bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-600',
  },
  {
    variant: ButtonVariant.Filled,
    color: ButtonColor.Error,
    class: 'border-transparent bg-error-500 text-white hover:bg-error-600 active:bg-error-600',
  },
  {
    variant: ButtonVariant.Filled,
    color: ButtonColor.Info,
    class: 'border-transparent bg-info-500 text-white hover:bg-info-600 active:bg-info-600',
  },
  {
    variant: ButtonVariant.Outline,
    color: ButtonColor.Primary,
    class: 'border-primary-300 bg-transparent text-primary-600 hover:bg-primary-25 active:bg-primary-50',
  },
  {
    variant: ButtonVariant.Outline,
    color: ButtonColor.Secondary,
    class: 'border-secondary-300 bg-transparent text-secondary-600 hover:bg-secondary-25 active:bg-secondary-50',
  },
  {
    variant: ButtonVariant.Outline,
    color: ButtonColor.Neutral,
    class: 'border-neutral-300 bg-transparent text-neutral-600 hover:bg-neutral-25 active:bg-neutral-50',
  },
  {
    variant: ButtonVariant.Outline,
    color: ButtonColor.Success,
    class: 'border-success-300 bg-transparent text-success-600 hover:bg-success-25 active:bg-success-50',
  },
  {
    variant: ButtonVariant.Outline,
    color: ButtonColor.Warning,
    class: 'border-warning-300 bg-transparent text-warning-600 hover:bg-warning-25 active:bg-warning-50',
  },
  {
    variant: ButtonVariant.Outline,
    color: ButtonColor.Error,
    class: 'border-error-300 bg-transparent text-error-600 hover:bg-error-25 active:bg-error-50',
  },
  {
    variant: ButtonVariant.Outline,
    color: ButtonColor.Info,
    class: 'border-info-300 bg-transparent text-info-600 hover:bg-info-25 active:bg-info-50',
  },
  {
    variant: ButtonVariant.Ghost,
    color: ButtonColor.Primary,
    class: 'border-transparent bg-transparent text-primary-600 hover:bg-primary-25 active:bg-primary-50',
  },
  {
    variant: ButtonVariant.Ghost,
    color: ButtonColor.Secondary,
    class: 'border-transparent bg-transparent text-secondary-600 hover:bg-secondary-25 active:bg-secondary-50',
  },
  {
    variant: ButtonVariant.Ghost,
    color: ButtonColor.Neutral,
    class: 'border-transparent bg-transparent text-neutral-600 hover:bg-neutral-25 active:bg-neutral-50',
  },
  {
    variant: ButtonVariant.Ghost,
    color: ButtonColor.Success,
    class: 'border-transparent bg-transparent text-success-600 hover:bg-success-25 active:bg-success-50',
  },
  {
    variant: ButtonVariant.Ghost,
    color: ButtonColor.Warning,
    class: 'border-transparent bg-transparent text-warning-600 hover:bg-warning-25 active:bg-warning-50',
  },
  {
    variant: ButtonVariant.Ghost,
    color: ButtonColor.Error,
    class: 'border-transparent bg-transparent text-error-600 hover:bg-error-25 active:bg-error-50',
  },
  {
    variant: ButtonVariant.Ghost,
    color: ButtonColor.Info,
    class: 'border-transparent bg-transparent text-info-600 hover:bg-info-25 active:bg-info-50',
  },
  {
    variant: ButtonVariant.Link,
    color: ButtonColor.Primary,
    class: 'border-transparent bg-transparent text-primary-600 hover:text-primary-500 active:text-primary-600',
  },
  {
    variant: ButtonVariant.Link,
    color: ButtonColor.Secondary,
    class: 'border-transparent bg-transparent text-secondary-600 hover:text-secondary-500 active:text-secondary-600',
  },
  {
    variant: ButtonVariant.Link,
    color: ButtonColor.Neutral,
    class: 'border-transparent bg-transparent text-neutral-600 hover:text-neutral-500 active:text-neutral-600',
  },
  {
    variant: ButtonVariant.Link,
    color: ButtonColor.Success,
    class: 'border-transparent bg-transparent text-success-600 hover:text-success-500 active:text-success-600',
  },
  {
    variant: ButtonVariant.Link,
    color: ButtonColor.Warning,
    class: 'border-transparent bg-transparent text-warning-600 hover:text-warning-500 active:text-warning-600',
  },
  {
    variant: ButtonVariant.Link,
    color: ButtonColor.Error,
    class: 'border-transparent bg-transparent text-error-600 hover:text-error-500 active:text-error-600',
  },
  {
    variant: ButtonVariant.Link,
    color: ButtonColor.Info,
    class: 'border-transparent bg-transparent text-info-600 hover:text-info-500 active:text-info-600',
  },
] as const;

export const buttonVariants = tv({
  base: 'inline-flex select-none items-center justify-center whitespace-nowrap font-sans font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:pointer-events-none disabled:opacity-40',
  variants: {
    variant: {
      filled: 'border shadow-xs',
      outline: 'border',
      ghost: 'border',
      link: 'h-auto border-none p-0 shadow-none',
    },
    // No standalone classes — every color's actual treatment is resolved per `variant` below.
    color: {
      primary: '',
      secondary: '',
      neutral: '',
      success: '',
      warning: '',
      error: '',
      info: '',
    },
    size: {
      xs: 'h-7 gap-3xs px-sm text-xs',
      sm: 'h-8 gap-2xs px-sm text-sm',
      md: 'h-9 gap-xs px-md text-base',
      lg: 'h-10 gap-xs px-lg text-md',
      xl: 'h-12 gap-sm px-xl text-lg',
    },
    shape: {
      default: '',
      square: 'aspect-square px-0',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      pill: 'rounded-pill',
    },
    status: {
      default: '',
      loading: 'cursor-wait',
    },
  },
  compoundVariants: [
    ...colorCompoundVariants,
    // The `link` variant never takes a border, background tint, or rounding — it's plain text.
    { variant: ButtonVariant.Link, class: 'rounded-none bg-transparent hover:bg-transparent active:bg-transparent' },
  ],
  defaultVariants: {
    variant: ButtonVariant.Filled,
    color: ButtonColor.Primary,
    size: ButtonSize.Md,
    shape: ButtonShape.Default,
    radius: ButtonRadius.Md,
    status: ButtonStatus.Default,
  },
});
