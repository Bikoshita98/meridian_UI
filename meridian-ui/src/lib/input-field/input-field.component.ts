import { ChangeDetectionStrategy, Component, Input, computed, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MrLabel } from '../label/public-api';
import { InputFieldSize, InputFieldStatus } from './input-field.enums';
import { inputFieldHelperVariants, inputFieldVariants } from './input-field.variants';

let nextInputFieldId = 0;

@Component({
  selector: 'mr-input-field',
  imports: [MrLabel],
  templateUrl: './input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MrInputField),
      multi: true,
    },
  ],
})
export class MrInputField implements ControlValueAccessor {
  protected readonly inputId = `mr-input-field-${nextInputFieldId++}`;
  protected readonly helperId = `${this.inputId}-helper`;

  @Input() label?: string;
  @Input() placeholder = '';
  @Input() helperText?: string;
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search' | 'url' = 'text';

  private readonly _size = signal<`${InputFieldSize}`>(InputFieldSize.Md);

  @Input()
  set size(value: `${InputFieldSize}`) {
    this._size.set(value);
  }

  get size(): `${InputFieldSize}` {
    return this._size();
  }

  private readonly _status = signal<`${InputFieldStatus}`>(InputFieldStatus.Default);

  @Input()
  set status(value: `${InputFieldStatus}`) {
    this._status.set(value);
  }

  get status(): `${InputFieldStatus}` {
    return this._status();
  }

  private readonly _disabled = signal(false);

  @Input()
  set disabled(value: boolean | `${boolean}` | '') {
    this._disabled.set(coerceBooleanProperty(value));
  }

  get disabled(): boolean {
    return this._disabled();
  }

  private readonly _readonly = signal(false);

  @Input()
  set readonly(value: boolean | `${boolean}` | '') {
    this._readonly.set(coerceBooleanProperty(value));
  }

  get readonly(): boolean {
    return this._readonly();
  }

  private readonly _required = signal(false);

  @Input()
  set required(value: boolean | `${boolean}` | '') {
    this._required.set(coerceBooleanProperty(value));
  }

  get required(): boolean {
    return this._required();
  }

  protected readonly value = signal('');

  protected readonly inputClass = computed(() =>
    inputFieldVariants({ size: this._size(), status: this._status() }),
  );

  protected readonly helperClass = computed(() => inputFieldHelperVariants({ status: this._status() }));

  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }

  protected handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
  }
}
