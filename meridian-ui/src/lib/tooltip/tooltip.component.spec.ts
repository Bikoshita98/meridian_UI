import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MrTooltip } from './tooltip.component';

@Component({
  imports: [MrTooltip],
  template: `<mr-tooltip text="Helpful hint"><button type="button">Hover me</button></mr-tooltip>`,
})
class TooltipHost {}

describe('MrTooltip', () => {
  let fixture: ComponentFixture<TooltipHost>;
  let overlayContainer: OverlayContainer;
  let trigger: HTMLElement;

  const panel = (): HTMLElement | null => overlayContainer.getContainerElement().querySelector('[role="tooltip"]');

  beforeEach(async () => {
    jest.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [TooltipHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipHost);
    fixture.detectChanges();
    trigger = fixture.nativeElement.querySelector('span[cdkoverlayorigin]');
    overlayContainer = TestBed.inject(OverlayContainer);
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
    jest.useRealTimers();
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('is closed by default', () => {
    expect(panel()).toBeFalsy();
  });

  it('does not show immediately on mouseenter — waits for showDelay', () => {
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    expect(panel()).toBeFalsy();

    jest.advanceTimersByTime(149);
    fixture.detectChanges();
    expect(panel()).toBeFalsy();
  });

  it('shows the tooltip text after showDelay elapses', () => {
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    jest.advanceTimersByTime(150);
    fixture.detectChanges();

    expect(panel()?.textContent?.trim()).toBe('Helpful hint');
  });

  it('hides after hideDelay on mouseleave', () => {
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    jest.advanceTimersByTime(150);
    fixture.detectChanges();
    expect(panel()).toBeTruthy();

    trigger.dispatchEvent(new MouseEvent('mouseleave'));
    jest.advanceTimersByTime(0);
    fixture.detectChanges();

    expect(panel()).toBeFalsy();
  });

  it('a later mouseleave before showDelay elapses cancels the pending show', () => {
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    jest.advanceTimersByTime(50);
    trigger.dispatchEvent(new MouseEvent('mouseleave'));
    jest.advanceTimersByTime(150);
    fixture.detectChanges();

    expect(panel()).toBeFalsy();
  });

  it('shows immediately (no delay) on focusin, for keyboard users', () => {
    trigger.dispatchEvent(new FocusEvent('focusin'));
    fixture.detectChanges();
    expect(panel()?.textContent?.trim()).toBe('Helpful hint');
  });

  it('hides immediately on focusout', () => {
    trigger.dispatchEvent(new FocusEvent('focusin'));
    fixture.detectChanges();
    expect(panel()).toBeTruthy();

    trigger.dispatchEvent(new FocusEvent('focusout'));
    fixture.detectChanges();
    expect(panel()).toBeFalsy();
  });

  it('hides on Escape', () => {
    trigger.dispatchEvent(new FocusEvent('focusin'));
    fixture.detectChanges();
    expect(panel()).toBeTruthy();

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(panel()).toBeFalsy();
  });

  it('sets aria-describedby on the trigger only while open', () => {
    expect(trigger.getAttribute('aria-describedby')).toBeNull();

    trigger.dispatchEvent(new FocusEvent('focusin'));
    fixture.detectChanges();
    expect(trigger.getAttribute('aria-describedby')).toBeTruthy();
  });
});
