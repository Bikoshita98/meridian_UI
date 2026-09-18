import { tv } from '../shared/tv';
import { TabsSize } from './tabs.enums';

export const tabsListVariants = tv({
  base: 'flex items-center gap-lg border-b border-neutral-200',
});

export const tabButtonVariants = tv({
  base: 'relative -mb-px whitespace-nowrap border-b-2 border-transparent font-sans font-medium text-neutral-500 outline-none transition-colors duration-150 hover:text-neutral-700 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:text-neutral-300 disabled:hover:text-neutral-300',
  variants: {
    size: {
      xs: 'py-3xs text-xs',
      sm: 'py-2xs text-sm',
      md: 'py-xs text-base',
      lg: 'py-sm text-md',
      xl: 'py-md text-lg',
    },
    // No standalone classes — a selected tab's underline/text color is resolved via the
    // compoundVariant below (it doesn't vary by size).
    selected: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [{ selected: true, class: 'border-primary-500 text-primary-600 hover:text-primary-600' }],
  defaultVariants: {
    size: TabsSize.Md,
    selected: false,
  },
});
