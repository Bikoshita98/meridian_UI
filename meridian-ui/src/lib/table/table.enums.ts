export enum TableSize {
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
}

export type TableAlign = 'left' | 'center' | 'right';

export type TableSortDirection = 'asc' | 'desc';

export interface TableColumn<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  align?: TableAlign;
}

export interface TableSortEvent<T> {
  key: keyof T;
  direction: TableSortDirection;
}
