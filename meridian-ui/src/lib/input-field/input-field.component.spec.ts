import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MrInputField } from './input-field.component';
import { InputFieldSize, InputFieldStatus } from './input-field.enums';

describe('MrInputField', () => {
  let fixture: ComponentFixture<MrInputField>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MrInputField],
    }).compileComponents();

    fixture = TestBed.createComponent(MrInputField);
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
  });

  it('creates', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('defaults to type="text" and the md size', () => {
    expect(input.type).toBe('text');
    expect(input.className).toContain('h-9');
  });

  it('does not render a label or helper text when neither is set', () => {
    expect(fixture.nativeElement.querySelector('mr-label')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('span')).toBeFalsy();
  });

  it('renders a label wired to the input via for/id when label is set', () => {
    fixture.componentRef.setInput('label', 'Email');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent).toContain('Email');
    expect(label.getAttribute('for')).toBe(input.id);
  });

  it('renders helper text colored for the current status', () => {
    fixture.componentRef.setInput('helperText', 'Required field');
    fixture.componentRef.setInput('status', InputFieldStatus.Error);
    fixture.detectChanges();
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    const helper = fixture.nativeElement.querySelector(`#${describedBy}`);
    expect(helper.textContent).toBe('Required field');
    expect(helper.className).toContain('text-error-600');
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('reflects a different size as classes', () => {
    fixture.componentRef.setInput('size', InputFieldSize.Xl);
    fixture.detectChanges();
    expect(input.className).toContain('h-12');
  });

  it('coerces disabled/readonly/required attribute string forms into real booleans', () => {
    fixture.componentRef.setInput('disabled', '');
    fixture.componentRef.setInput('readonly', '');
    fixture.componentRef.setInput('required', '');
    fixture.detectChanges();
    expect(input.disabled).toBe(true);
    expect(input.readOnly).toBe(true);
    expect(input.required).toBe(true);
  });

  it('implements ControlValueAccessor: writeValue renders into the native input', () => {
    fixture.componentInstance.writeValue('hello');
    fixture.detectChanges();
    expect(input.value).toBe('hello');
  });

  it('implements ControlValueAccessor: typing calls the registered onChange with the new value', () => {
    const onChange = jest.fn();
    fixture.componentInstance.registerOnChange(onChange);
    input.value = 'typed';
    input.dispatchEvent(new Event('input'));
    expect(onChange).toHaveBeenCalledWith('typed');
  });

  it('implements ControlValueAccessor: setDisabledState disables the native input', () => {
    fixture.componentInstance.setDisabledState(true);
    fixture.detectChanges();
    expect(input.disabled).toBe(true);
  });
});

@Component({
  imports: [MrInputField, ReactiveFormsModule],
  template: `<mr-input-field [formControl]="control" />`,
})
class InputFieldFormHost {
  control = new FormControl('initial');
}

describe('MrInputField with ReactiveFormsModule', () => {
  let fixture: ComponentFixture<InputFieldFormHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldFormHost],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFieldFormHost);
    fixture.detectChanges();
  });

  it('renders the initial FormControl value', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('initial');
  });

  it('pushes native input changes back into the FormControl', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'updated';
    input.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.control.value).toBe('updated');
  });

  it('disables the native input when the FormControl is disabled', () => {
    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});
