import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { lucideAlertCircle, lucideAlertTriangle, lucideCheck, lucideInfo, lucideX } from '@ng-icons/lucide';
import { MrToast } from './toast.component';
import { ToastRef, ToastStatus } from './toast.enums';

describe('MrToast', () => {
  let fixture: ComponentFixture<MrToast>;

  const card = (): HTMLElement => fixture.nativeElement.querySelector('div');
  const dismissButton = (): HTMLButtonElement => fixture.nativeElement.querySelector('button');

  const baseToast: ToastRef = { id: 1, message: 'Saved successfully', status: ToastStatus.Success, duration: 5000 };

  beforeEach(async () => {
    jest.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [MrToast],
      providers: [
        provideIcons({
          info: lucideInfo,
          check: lucideCheck,
          alertTriangle: lucideAlertTriangle,
          alertCircle: lucideAlertCircle,
          x: lucideX,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MrToast);
    fixture.componentRef.setInput('toast', baseToast);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the message with a status role', () => {
    fixture.detectChanges();
    expect(card().textContent).toContain('Saved successfully');
    expect(card().getAttribute('role')).toBe('status');
  });

  it('uses the alert role for an error toast', () => {
    fixture.componentRef.setInput('toast', { ...baseToast, status: ToastStatus.Error });
    fixture.detectChanges();
    expect(card().getAttribute('role')).toBe('alert');
  });

  it('emits dismissed when the close button is clicked', () => {
    fixture.detectChanges();
    const dismissed = jest.fn();
    fixture.componentInstance.dismissed.subscribe(dismissed);

    dismissButton().click();
    expect(dismissed).toHaveBeenCalledTimes(1);
  });

  it('auto-dismisses once its duration elapses', () => {
    fixture.detectChanges();
    const dismissed = jest.fn();
    fixture.componentInstance.dismissed.subscribe(dismissed);

    jest.advanceTimersByTime(4999);
    expect(dismissed).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(dismissed).toHaveBeenCalledTimes(1);
  });

  it('never auto-dismisses when duration is 0', () => {
    fixture.componentRef.setInput('toast', { ...baseToast, duration: 0 });
    fixture.detectChanges();
    const dismissed = jest.fn();
    fixture.componentInstance.dismissed.subscribe(dismissed);

    jest.advanceTimersByTime(100000);
    expect(dismissed).not.toHaveBeenCalled();
  });
});
