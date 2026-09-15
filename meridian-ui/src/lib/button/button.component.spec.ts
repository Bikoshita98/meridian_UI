import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { MrIcon } from '../icon/public-api';
import { MrButton } from './button.component';
import { ButtonColor, ButtonShape, ButtonSize, ButtonStatus, ButtonVariant } from './button.enums';

describe('MrButton', () => {
  let fixture: ComponentFixture<MrButton>;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrButton],
    }).compileComponents();

    fixture = TestBed.createComponent(MrButton);
    button = fixture.nativeElement.querySelector('button');
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('defaults to type="button" so it never submits a host form by accident', () => {
    fixture.detectChanges();
    expect(button.type).toBe('button');
  });

  it('applies the filled/primary/md defaults as classes', () => {
    fixture.detectChanges();
    expect(button.className).toContain('bg-primary-500');
    expect(button.className).toContain('h-9');
    expect(button.className).toContain('rounded-md');
  });

  it('reflects a different variant/color/size combination', () => {
    fixture.componentRef.setInput('variant', ButtonVariant.Outline);
    fixture.componentRef.setInput('color', ButtonColor.Error);
    fixture.componentRef.setInput('size', ButtonSize.Xl);
    fixture.detectChanges();
    expect(button.className).toContain('border-error-300');
    expect(button.className).toContain('text-error-600');
    expect(button.className).toContain('h-12');
  });

  it('sizes itself to a square for the "square" shape', () => {
    fixture.componentRef.setInput('shape', ButtonShape.Square);
    fixture.detectChanges();
    expect(button.className).toContain('aspect-square');
  });

  it('coerces the disabled attribute string form into a real boolean', () => {
    fixture.componentRef.setInput('disabled', '');
    fixture.detectChanges();
    expect(button.disabled).toBe(true);
  });

  it('disables itself and marks aria-busy while loading, without needing disabled set explicitly', () => {
    fixture.componentRef.setInput('status', ButtonStatus.Loading);
    fixture.detectChanges();
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.querySelector('span.animate-spin')).toBeTruthy();
  });

  it('does not render a loading spinner by default', () => {
    fixture.detectChanges();
    expect(button.querySelector('span.animate-spin')).toBeFalsy();
  });
});

@Component({
  imports: [MrButton, MrIcon],
  template: `<mr-button [size]="size"><mr-icon name="check" />Save</mr-button>`,
})
class ButtonWithIconHost {
  @Input() size: `${ButtonSize}` = ButtonSize.Md;
}

describe('MrButton content projection', () => {
  let fixture: ComponentFixture<ButtonWithIconHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonWithIconHost],
      providers: [provideIcons({ check: lucideCheck })],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonWithIconHost);
  });

  it('renders projected content alongside a projected icon', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').textContent.trim()).toBe('Save');
  });

  it('pushes its own size down to a projected mr-icon', () => {
    fixture.detectChanges();
    const ngIcon = fixture.nativeElement.querySelector('ng-icon');
    expect(ngIcon.style.getPropertyValue('--ng-icon__size')).toBe('16px');
  });

  it('re-syncs a projected icon when its size input changes', () => {
    fixture.detectChanges();
    fixture.componentRef.setInput('size', ButtonSize.Xl);
    fixture.detectChanges();
    const ngIcon = fixture.nativeElement.querySelector('ng-icon');
    expect(ngIcon.style.getPropertyValue('--ng-icon__size')).toBe('24px');
  });
});
