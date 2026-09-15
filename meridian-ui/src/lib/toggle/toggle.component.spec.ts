import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MrToggle } from './toggle.component';
import { ToggleSize } from './toggle.enums';

describe('MrToggle', () => {
  let fixture: ComponentFixture<MrToggle>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrToggle],
    }).compileComponents();

    fixture = TestBed.createComponent(MrToggle);
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input[type="checkbox"]');
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('is a role="switch" input, unchecked by default', () => {
    expect(input.getAttribute('role')).toBe('switch');
    expect(input.checked).toBe(false);
    expect(input.getAttribute('aria-checked')).toBe('false');
  });

  it('applies the md size track classes by default', () => {
    const track = fixture.nativeElement.querySelector('span[aria-hidden="true"]');
    expect(track.className).toContain('h-6');
    expect(track.className).toContain('w-10');
  });

  it('renders the label text when set', () => {
    fixture.componentRef.setInput('label', 'Notifications');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('label').textContent).toContain('Notifications');
  });

  it('toggles checked, slides the thumb, and calls the registered onChange when clicked', () => {
    const onChange = jest.fn();
    fixture.componentInstance.registerOnChange(onChange);

    input.click();
    fixture.detectChanges();

    expect(input.checked).toBe(true);
    expect(input.getAttribute('aria-checked')).toBe('true');
    expect(onChange).toHaveBeenCalledWith(true);

    const track = fixture.nativeElement.querySelector('span[aria-hidden="true"]');
    expect(track.className).toContain('bg-primary-500');
    const thumb = track.querySelector('span');
    expect(thumb.className).toContain('translate-x-4');
  });

  it('reflects a different status as classes once checked', () => {
    fixture.componentInstance.writeValue(true);
    fixture.componentRef.setInput('status', 'error');
    fixture.detectChanges();
    const track = fixture.nativeElement.querySelector('span[aria-hidden="true"]');
    expect(track.className).toContain('bg-error-500');
  });

  it('reflects a different size as classes', () => {
    fixture.componentRef.setInput('size', ToggleSize.Xl);
    fixture.detectChanges();
    const track = fixture.nativeElement.querySelector('span[aria-hidden="true"]');
    expect(track.className).toContain('h-8');
    expect(track.className).toContain('w-14');
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
