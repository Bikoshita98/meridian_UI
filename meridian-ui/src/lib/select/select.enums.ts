export enum SelectSize {
  Xs = 'xs',
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Xl = 'xl',
}

export enum SelectStatus {
  Default = 'default',
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
}

export interface SelectOption<T = unknown> {
  label: string;
  value: T;
  disabled?: boolean;
}
