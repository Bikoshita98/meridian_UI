import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MrModal } from './modal.component';
import { ModalSize } from './modal.enums';

@Component({
  imports: [MrModal],
  template: `
    <button type="button">Open</button>
    <mr-modal [open]="isOpen" (openChange)="isOpen = $event" [dismissible]="dismissible" [size]="size">
      <button type="button">Confirm</button>
    </mr-modal>
  `,
})
class ModalHost {
  @Input() isOpen = false;
  @Input() dismissible = true;
  @Input() size: `${ModalSize}` = ModalSize.Md;
}

describe('MrModal', () => {
  let fixture: ComponentFixture<ModalHost>;
  let overlayContainer: OverlayContainer;
  let openButton: HTMLButtonElement;

  const dialog = (): HTMLElement | null => overlayContainer.getContainerElement().querySelector('[role="dialog"]');
  const confirmButton = (): HTMLButtonElement | null =>
    overlayContainer.getContainerElement().querySelector('[role="dialog"] button');

  beforeEach(async () => {
    // jsdom does no layout, so every element reports zero geometry. CDK's `InteractivityChecker`
    // (used by `cdkTrapFocus`'s auto-capture) treats a geometry-less element as invisible and
    // therefore unfocusable, so without this stub the focus trap can never find anything to
    // focus. Real browsers give the confirm button real geometry, so this only compensates for
    // jsdom, not for a gap in the component.
    jest.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue([{}] as unknown as DOMRectList);

    await TestBed.configureTestingModule({
      imports: [ModalHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalHost);
    fixture.detectChanges();
    openButton = fixture.nativeElement.querySelector('button');
    overlayContainer = TestBed.inject(OverlayContainer);
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
    jest.restoreAllMocks();
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('is closed by default', () => {
    expect(dialog()).toBeFalsy();
  });

  it('opens when `open` becomes true and renders projected content', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    expect(dialog()).toBeTruthy();
    expect(confirmButton()?.textContent?.trim()).toBe('Confirm');
  });

  it('traps focus on the first tabbable element inside the panel when opened', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    expect(document.activeElement).toBe(confirmButton());
  });

  it('restores focus to the previously-focused element when closed', () => {
    openButton.focus();
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
    expect(document.activeElement).toBe(confirmButton());

    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();

    expect(dialog()).toBeFalsy();
    expect(document.activeElement).toBe(openButton);
  });

  it('closes and emits openChange(false) on Escape', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    dialog()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(dialog()).toBeFalsy();
    expect(fixture.componentInstance.isOpen).toBe(false);
  });

  it('closes on a backdrop click by default', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
    expect(dialog()).toBeTruthy();

    (overlayContainer.getContainerElement().querySelector('.cdk-overlay-backdrop') as HTMLElement).click();
    fixture.detectChanges();

    expect(dialog()).toBeFalsy();
  });

  it('does not close on a backdrop click when dismissible is false', () => {
    fixture.componentRef.setInput('dismissible', false);
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
    expect(dialog()).toBeTruthy();

    (overlayContainer.getContainerElement().querySelector('.cdk-overlay-backdrop') as HTMLElement).click();
    fixture.detectChanges();

    expect(dialog()).toBeTruthy();
  });

  it('applies the size-mapped max-width class to the panel', () => {
    fixture.componentRef.setInput('size', ModalSize.Lg);
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    expect(dialog()?.className).toContain('max-w-lg');
  });
});
