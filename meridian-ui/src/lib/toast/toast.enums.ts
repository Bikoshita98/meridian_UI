export enum ToastStatus {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export interface ToastOptions {
  status?: `${ToastStatus}`;
  /** Milliseconds before auto-dismissing. `0` (or omitted with a falsy override) means "no auto-dismiss". */
  duration?: number;
}

export interface ToastRef {
  id: number;
  message: string;
  status: `${ToastStatus}`;
  duration: number;
}
