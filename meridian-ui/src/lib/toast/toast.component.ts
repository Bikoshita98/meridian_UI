import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MrIcon } from '../icon/public-api';
import type { MrIconName } from '../icon/public-api';
import { ToastRef, ToastStatus } from './toast.enums';
import { toastCloseButtonVariants, toastIconVariants, toastMessageVariants, toastVariants } from './toast.variants';

const STATUS_ICON: Record<`${ToastStatus}`, MrIconName> = {
  info: 'info',
  success: 'check',
  warning: 'alertTriangle',
  error: 'alertCircle',
};

@Component({
  selector: 'mr-toast',
  imports: [MrIcon],
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrToast implements OnInit, OnDestroy {
  @Input({ required: true }) toast!: ToastRef;

  @Output() readonly dismissed = new EventEmitter<void>();

  protected readonly messageClass = toastMessageVariants();
  protected readonly closeButtonClass = toastCloseButtonVariants();

  private timeoutId?: ReturnType<typeof setTimeout>;

  protected toastClass(): string {
    return toastVariants({ status: this.toast.status });
  }

  protected iconClass(): string {
    return toastIconVariants({ status: this.toast.status });
  }

  protected iconName(): MrIconName {
    return STATUS_ICON[this.toast.status];
  }

  protected role(): 'alert' | 'status' {
    return this.toast.status === ToastStatus.Error ? 'alert' : 'status';
  }

  ngOnInit(): void {
    if (this.toast.duration > 0) {
      this.timeoutId = setTimeout(() => this.dismissed.emit(), this.toast.duration);
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId !== undefined) {
      clearTimeout(this.timeoutId);
    }
  }

  protected dismiss(): void {
    this.dismissed.emit();
  }
}
