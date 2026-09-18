import { tv } from '../shared/tv';

export const tableWrapperVariants = tv({
  base: 'w-full overflow-x-auto rounded-lg border border-neutral-200',
});

export const tableVariants = tv({
  base: 'w-full border-collapse text-left',
});

export const tableHeaderRowVariants = tv({
  base: 'border-b border-neutral-200 bg-neutral-25',
});

export const tableBodyRowVariants = tv({
  base: 'border-b border-neutral-100 last:border-b-0 hover:bg-neutral-25',
});

export const tableHeaderCellVariants = tv({
  base: 'whitespace-nowrap font-sans font-medium text-neutral-500',
  variants: {
    size: {
      sm: 'px-sm py-2xs text-xs',
      md: 'px-md py-xs text-sm',
      lg: 'px-lg py-sm text-base',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    sortable: {
      true: 'cursor-pointer select-none hover:text-neutral-700',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    align: 'left',
    sortable: false,
  },
});

export const tableCellVariants = tv({
  base: 'whitespace-nowrap font-sans text-neutral-700',
  variants: {
    size: {
      sm: 'px-sm py-2xs text-xs',
      md: 'px-md py-xs text-sm',
      lg: 'px-lg py-sm text-base',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'md',
    align: 'left',
  },
});
