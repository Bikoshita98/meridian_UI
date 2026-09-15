import { ChangeDetectionStrategy, Component, Input, computed, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MrIcon } from '../icon/public-api';
import { CheckboxSize, CheckboxStatus } from './checkbox.enums';
import { CHECKBOX_ICON_SIZE, checkboxBoxVariants } from './checkbox.variants';

let nextCheckboxId = 0;

@Component({
  selector: 'mr-checkbox',
  imports: [MrIcon],
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MrCheckbox),
      multi: true,
    },
  ],
})
export class MrCheckbox implements ControlValueAccessor {
  protected readonly inputId = `mr-checkbox-${nextCheckboxId++}`;

  @Input() label?: string;

  private readonly _indeterminate = signal(false);

  /** Visual "mixed" state (e.g. a parent checkbox over a partially-selected list) — not user-settable by clicking. */
  @Input()
  set indeterminate(value: boolean | `${boolean}` | '') {
    this._indeterminate.set(coerceBooleanProperty(value));
  }

  get indeterminate(): boolean {
    return this._indeterminate();
  }

  private readonly _size = signal<`${CheckboxSize}`>(CheckboxSize.Md);

  @Input()
  set size(value: `${CheckboxSize}`) {
    this._size.set(value);
  }

  get size(): `${CheckboxSize}` {
    return this._size();
  }

  private readonly _status = signal<`${CheckboxStatus}`>(CheckboxStatus.Default);

  @Input()
  set status(value: `${CheckboxStatus}`) {
    this._status.set(value);
  }

  get status(): `${CheckboxStatus}` {
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

  private readonly _required = signal(false);

  @Input()
  set required(value: boolean | `${boolean}` | '') {
    this._required.set(coerceBooleanProperty(value));
  }

  get required(): boolean {
    return this._required();
  }

  protected readonly checked = signal(false);

  protected readonly boxClass = computed(() =>
    checkboxBoxVariants({
      size: this._size(),
      status: this._status(),
      checked: this.checked() || this._indeterminate(),
      disabled: this._disabled(),
    }),
  );

  protected readonly iconSize = computed(() => CHECKBOX_ICON_SIZE[this._size()]);

  private onChange: (value: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }

  protected handleChange(event: Event): void {
    const value = (event.target as HTMLInputElement).checked;
    this.checked.set(value);
    this.onChange(value);
  }
}
