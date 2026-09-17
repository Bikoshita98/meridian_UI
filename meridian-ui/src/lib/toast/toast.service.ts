import { Injectable, signal } from '@angular/core';
import { ToastOptions, ToastRef, ToastStatus } from './toast.enums';

const DEFAULT_DURATION_MS = 5000;

/**
 * Toasts are triggered imperatively from anywhere in an app (a click handler, an HTTP error
 * interceptor, ...), not placed in a template like every other component — so this is a service,
 * not a component. Mount an `<mr-toast-container>` once (e.g. at the app root) to actually render
 * whatever this service queues up.
 */
@Injectable({ providedIn: 'root' })
export class MrToastService {
  private readonly _toasts = signal<ToastRef[]>([]);
  readonly toasts = this._toasts.asReadonly();

  private nextId = 0;

  /** Returns the new toast's id, so a caller can `dismiss()` it early if it needs to. */
  show(message: string, options: ToastOptions = {}): number {
    const id = this.nextId++;
    this._toasts.update((toasts) => [
      ...toasts,
      {
        id,
        message,
        status: options.status ?? ToastStatus.Info,
        duration: options.duration ?? DEFAULT_DURATION_MS,
      },
    ]);
    return id;
  }

  dismiss(id: number): void {
    this._toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
  }

  clear(): void {
    this._toasts.set([]);
  }
}
