import { ChangeDetectionStrategy, Component, Input, computed, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ToggleSize, ToggleStatus } from './toggle.enums';
import { toggleThumbVariants, toggleTrackVariants } from './toggle.variants';

let nextToggleId = 0;

@Component({
  selector: 'mr-toggle',
  imports: [],
  templateUrl: './toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MrToggle),
      multi: true,
    },
  ],
})
export class MrToggle implements ControlValueAccessor {
  protected readonly inputId = `mr-toggle-${nextToggleId++}`;

  @Input() label?: string;

  private readonly _size = signal<`${ToggleSize}`>(ToggleSize.Md);

  @Input()
  set size(value: `${ToggleSize}`) {
    this._size.set(value);
  }

  get size(): `${ToggleSize}` {
    return this._size();
  }

  private readonly _status = signal<`${ToggleStatus}`>(ToggleStatus.Default);

  @Input()
  set status(value: `${ToggleStatus}`) {
    this._status.set(value);
  }

  get status(): `${ToggleStatus}` {
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

  protected readonly trackClass = computed(() =>
    toggleTrackVariants({
      size: this._size(),
      status: this._status(),
      checked: this.checked(),
      disabled: this._disabled(),
    }),
  );

  protected readonly thumbClass = computed(() =>
    toggleThumbVariants({ size: this._size(), checked: this.checked() }),
  );

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
