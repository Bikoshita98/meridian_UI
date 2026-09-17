import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';
import { provideIcons } from '@ng-icons/core';
import { lucideAlertCircle, lucideAlertTriangle, lucideCheck, lucideInfo, lucideX } from '@ng-icons/lucide';
import { MrToastContainer } from './toast-container.component';
import { MrToastService } from './toast.service';
import { ToastStatus } from './toast.enums';

@Component({
  imports: [MrToastContainer],
  template: `<mr-toast-container></mr-toast-container>`,
})
class ToastContainerHost {}

describe('MrToastContainer', () => {
  let fixture: ComponentFixture<ToastContainerHost>;
  let overlayContainer: OverlayContainer;
  let toastService: MrToastService;

  const toastCards = (): HTMLElement[] =>
    Array.from(overlayContainer.getContainerElement().querySelectorAll('[role="status"], [role="alert"]'));

  beforeEach(async () => {
    jest.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [ToastContainerHost],
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

    fixture = TestBed.createComponent(ToastContainerHost);
    fixture.detectChanges();
    overlayContainer = TestBed.inject(OverlayContainer);
    toastService = TestBed.inject(MrToastService);
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
    jest.useRealTimers();
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders nothing when the queue is empty', () => {
    expect(toastCards().length).toBe(0);
  });

  it('renders a toast pushed onto the service, in order', () => {
    toastService.show('First');
    toastService.show('Second', { status: ToastStatus.Error });
    fixture.detectChanges();

    const cards = toastCards();
    expect(cards.length).toBe(2);
    expect(cards[0].textContent).toContain('First');
    expect(cards[1].textContent).toContain('Second');
    expect(cards[1].getAttribute('role')).toBe('alert');
  });

  it('removes a toast from the overlay when its close button is clicked', () => {
    toastService.show('Dismiss me');
    fixture.detectChanges();
    expect(toastCards().length).toBe(1);

    (overlayContainer.getContainerElement().querySelector('button') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(toastCards().length).toBe(0);
  });

  it('removes a toast from the overlay once its duration elapses', () => {
    toastService.show('Auto dismiss', { duration: 1000 });
    fixture.detectChanges();
    expect(toastCards().length).toBe(1);

    jest.advanceTimersByTime(1000);
    fixture.detectChanges();

    expect(toastCards().length).toBe(0);
  });
});
