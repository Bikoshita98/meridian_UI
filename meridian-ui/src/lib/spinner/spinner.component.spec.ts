import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MrSpinner } from './spinner.component';
import { SpinnerColor, SpinnerSize } from './spinner.enums';

@Component({
  imports: [MrSpinner],
  template: ` <mr-spinner [size]="size" [color]="color" [label]="label"></mr-spinner> `,
})
class SpinnerHost {
  @Input() size: `${SpinnerSize}` = SpinnerSize.Md;
  @Input() color: `${SpinnerColor}` = SpinnerColor.Neutral;
  @Input() label = 'Loading';
}

describe('MrSpinner', () => {
  let fixture: ComponentFixture<SpinnerHost>;

  const spinner = (): HTMLElement => fixture.nativeElement.querySelector('span');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerHost],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerHost);
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders a status role with a default aria-label and neutral color at the md size', () => {
    fixture.detectChanges();
    expect(spinner().getAttribute('role')).toBe('status');
    expect(spinner().getAttribute('aria-label')).toBe('Loading');
    expect(spinner().className).toContain('text-neutral-400');
    expect(spinner().style.width).toBe('16px');
    expect(spinner().style.height).toBe('16px');
  });

  it('applies a size in pixels matching the icon size scale', () => {
    fixture.componentRef.setInput('size', SpinnerSize.Xl);
    fixture.detectChanges();
    expect(spinner().style.width).toBe('24px');
    expect(spinner().style.height).toBe('24px');
  });

  it('applies a color', () => {
    fixture.componentRef.setInput('color', SpinnerColor.Error);
    fixture.detectChanges();
    expect(spinner().className).toContain('text-error-500');
  });

  it('reflects a custom label', () => {
    fixture.componentRef.setInput('label', 'Saving changes');
    fixture.detectChanges();
    expect(spinner().getAttribute('aria-label')).toBe('Saving changes');
  });
});
