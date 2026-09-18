import { tv } from 'tailwind-variants';
import { BadgeColor, BadgeVariant } from './badge.enums';

// Every class below is written out literally (never interpolated) so Tailwind's static content
// scan can find it — a template-literal color token like `bg-${color}-500` is invisible to it.
const colorCompoundVariants = [
  { variant: BadgeVariant.Filled, color: BadgeColor.Primary, class: 'border-transparent bg-primary-500 text-white' },
  {
    variant: BadgeVariant.Filled,
    color: BadgeColor.Secondary,
    class: 'border-transparent bg-secondary-500 text-white',
  },
  { variant: BadgeVariant.Filled, color: BadgeColor.Neutral, class: 'border-transparent bg-neutral-500 text-white' },
  { variant: BadgeVariant.Filled, color: BadgeColor.Success, class: 'border-transparent bg-success-500 text-white' },
  { variant: BadgeVariant.Filled, color: BadgeColor.Warning, class: 'border-transparent bg-warning-500 text-white' },
  { variant: BadgeVariant.Filled, color: BadgeColor.Error, class: 'border-transparent bg-error-500 text-white' },
  { variant: BadgeVariant.Filled, color: BadgeColor.Info, class: 'border-transparent bg-info-500 text-white' },
  {
    variant: BadgeVariant.Outline,
    color: BadgeColor.Primary,
    class: 'border-primary-300 bg-primary-25 text-primary-600',
  },
  {
    variant: BadgeVariant.Outline,
    color: BadgeColor.Secondary,
    class: 'border-secondary-300 bg-secondary-25 text-secondary-600',
  },
  {
    variant: BadgeVariant.Outline,
    color: BadgeColor.Neutral,
    class: 'border-neutral-300 bg-neutral-25 text-neutral-600',
  },
  {
    variant: BadgeVariant.Outline,
    color: BadgeColor.Success,
    class: 'border-success-300 bg-success-25 text-success-600',
  },
  {
    variant: BadgeVariant.Outline,
    color: BadgeColor.Warning,
    class: 'border-warning-300 bg-warning-25 text-warning-600',
  },
  { variant: BadgeVariant.Outline, color: BadgeColor.Error, class: 'border-error-300 bg-error-25 text-error-600' },
  { variant: BadgeVariant.Outline, color: BadgeColor.Info, class: 'border-info-300 bg-info-25 text-info-600' },
] as const;

export const badgeVariants = tv({
  base: 'inline-flex items-center gap-3xs whitespace-nowrap rounded-pill border px-sm py-3xs font-sans text-xs font-medium leading-none',
  variants: {
    // No standalone classes — every color's actual treatment is resolved per `variant` below.
    variant: {
      filled: '',
      outline: '',
    },
    color: {
      primary: '',
      secondary: '',
      neutral: '',
      success: '',
      warning: '',
      error: '',
      info: '',
    },
  },
  compoundVariants: [...colorCompoundVariants],
  defaultVariants: {
    variant: BadgeVariant.Filled,
    color: BadgeColor.Neutral,
  },
});
