import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MrRadio } from './radio.component';
import { RadioSize } from './radio.enums';

describe('MrRadio', () => {
  let fixture: ComponentFixture<MrRadio<string>>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrRadio],
    }).compileComponents();

    fixture = TestBed.createComponent<MrRadio<string>>(MrRadio);
    fixture.componentRef.setInput('name', 'color');
    fixture.componentRef.setInput('value', 'red');
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input[type="radio"]');
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('is unchecked by default with no dot rendered', () => {
    expect(input.checked).toBe(false);
    const box = fixture.nativeElement.querySelector('span[aria-hidden="true"]');
    expect(box.querySelector('span')).toBeFalsy();
  });

  it('shares the name input as the native radio group name', () => {
    expect(input.name).toBe('color');
  });

  it('renders the label text when set', () => {
    fixture.componentRef.setInput('label', 'Red');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('label').textContent).toContain('Red');
  });

  it('applies the md size box classes by default', () => {
    const box = fixture.nativeElement.querySelector('span[aria-hidden="true"]');
    expect(box.className).toContain('h-5');
    expect(box.className).toContain('w-5');
  });

  it('reflects a different size as classes', () => {
    fixture.componentRef.setInput('size', RadioSize.Xl);
    fixture.detectChanges();
    const box = fixture.nativeElement.querySelector('span[aria-hidden="true"]');
    expect(box.className).toContain('h-7');
  });

  it('checks and calls the registered onChange with its own value when selected', () => {
    const onChange = jest.fn();
    fixture.componentInstance.registerOnChange(onChange);

    input.click();
    fixture.detectChanges();

    expect(input.checked).toBe(true);
    expect(onChange).toHaveBeenCalledWith('red');
    const box = fixture.nativeElement.querySelector('span[aria-hidden="true"]');
    expect(box.className).toContain('border-primary-500');
    expect(box.querySelector('span')).toBeTruthy();
  });

  it('coerces the disabled attribute string form into a real boolean', () => {
    fixture.componentRef.setInput('disabled', '');
    fixture.detectChanges();
    expect(input.disabled).toBe(true);
  });

  it('implements ControlValueAccessor: writeValue checks only when the value matches', () => {
    fixture.componentInstance.writeValue('blue');
    fixture.detectChanges();
    expect(input.checked).toBe(false);

    fixture.componentInstance.writeValue('red');
    fixture.detectChanges();
    expect(input.checked).toBe(true);
  });

  it('implements ControlValueAccessor: setDisabledState disables the native input', () => {
    fixture.componentInstance.setDisabledState(true);
    fixture.detectChanges();
    expect(input.disabled).toBe(true);
  });
});

@Component({
  imports: [MrRadio, ReactiveFormsModule],
  template: `
    <mr-radio name="color" value="red" [formControl]="control" />
    <mr-radio name="color" value="blue" [formControl]="control" />
  `,
})
class RadioGroupHost {
  control = new FormControl('red');
}

describe('MrRadio grouped via a shared FormControl', () => {
  let fixture: ComponentFixture<RadioGroupHost>;
  let radios: HTMLInputElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupHost],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioGroupHost);
    fixture.detectChanges();
    radios = Array.from(fixture.nativeElement.querySelectorAll('input[type="radio"]'));
  });

  it('checks the radio matching the initial FormControl value', () => {
    expect(radios[0].checked).toBe(true);
    expect(radios[1].checked).toBe(false);
  });

  it('selecting one radio unchecks its sibling\'s own rendered state, even though the browser never fires a change event on the sibling', () => {
    const boxes = Array.from(fixture.nativeElement.querySelectorAll('span[aria-hidden="true"]')) as HTMLElement[];
    expect(boxes[0].className).toContain('border-primary-500');
    expect(boxes[0].querySelector('span')).toBeTruthy();

    radios[1].click();
    fixture.detectChanges();

    expect(radios[1].checked).toBe(true);
    expect(radios[0].checked).toBe(false);
    expect(fixture.componentInstance.control.value).toBe('blue');

    // The sibling's own signal-driven visuals must also have flipped back — this is exactly what
    // UniqueSelectionDispatcher exists for, since jsdom (like real browsers) never fires a native
    // `change` event on radios[0] just because a sibling with the same `name` got selected.
    expect(boxes[0].className).not.toContain('border-primary-500');
    expect(boxes[0].querySelector('span')).toBeFalsy();
  });
});
