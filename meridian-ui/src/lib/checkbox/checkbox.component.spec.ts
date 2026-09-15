import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideMinus } from '@ng-icons/lucide';
import { MrCheckbox } from './checkbox.component';
import { CheckboxSize } from './checkbox.enums';

describe('MrCheckbox', () => {
  let fixture: ComponentFixture<MrCheckbox>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrCheckbox],
      providers: [provideIcons({ check: lucideCheck, minus: lucideMinus })],
    }).compileComponents();

    fixture = TestBed.createComponent(MrCheckbox);
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input[type="checkbox"]');
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('is unchecked by default with no checkmark rendered', () => {
    expect(input.checked).toBe(false);
    expect(fixture.nativeElement.querySelector('ng-icon')).toBeFalsy();
  });

  it('applies the md size box classes by default', () => {
    const box = fixture.nativeElement.querySelector('span[aria-hidden="true"]');
    expect(box.className).toContain('h-5');
    expect(box.className).toContain('w-5');
  });

  it('renders the label text when set', () => {
    fixture.componentRef.setInput('label', 'Accept terms');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('label').textContent).toContain('Accept terms');
  });

  it('toggles checked and calls the registered onChange when clicked', () => {
    const onChange = jest.fn();
    fixture.componentInstance.registerOnChange(onChange);

    input.click();
    fixture.detectChanges();

    expect(input.checked).toBe(true);
    expect(onChange).toHaveBeenCalledWith(true);
    const box = fixture.nativeElement.querySelector('span[aria-hidden="true"]');
    expect(box.className).toContain('bg-primary-500');
    expect(fixture.nativeElement.querySelector('ng-icon')).toBeTruthy();
  });

  it('shows a dash and a filled box for the indeterminate state, independent of checked', () => {
    fixture.componentRef.setInput('indeterminate', true);
    fixture.detectChanges();

    expect(input.indeterminate).toBe(true);
    expect(input.getAttribute('aria-checked')).toBe('mixed');
    const box = fixture.nativeElement.querySelector('span[aria-hidden="true"]');
    expect(box.className).toContain('bg-primary-500');
  });

  it('reflects a different status as classes', () => {
    fixture.componentInstance.writeValue(true);
    fixture.componentRef.setInput('status', 'error');
    fixture.detectChanges();
    const box = fixture.nativeElement.querySelector('span[aria-hidden="true"]');
    expect(box.className).toContain('bg-error-500');
  });

  it('reflects a different size as classes', () => {
    fixture.componentRef.setInput('size', CheckboxSize.Xl);
    fixture.detectChanges();
    const box = fixture.nativeElement.querySelector('span[aria-hidden="true"]');
    expect(box.className).toContain('h-7');
  });

  it('coerces the disabled attribute string form into a real boolean', () => {
    fixture.componentRef.setInput('disabled', '');
    fixture.detectChanges();
    expect(input.disabled).toBe(true);
  });

  it('implements ControlValueAccessor: writeValue checks the native input', () => {
    fixture.componentInstance.writeValue(true);
    fixture.detectChanges();
    expect(input.checked).toBe(true);
  });

  it('implements ControlValueAccessor: setDisabledState disables the native input', () => {
    fixture.componentInstance.setDisabledState(true);
    fixture.detectChanges();
    expect(input.disabled).toBe(true);
  });
});
