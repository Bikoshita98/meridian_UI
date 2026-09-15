import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  computed,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { RadioSize, RadioStatus } from './radio.enums';
import { radioBoxVariants, radioDotVariants } from './radio.variants';

let nextRadioId = 0;

@Component({
  selector: 'mr-radio',
  imports: [],
  templateUrl: './radio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MrRadio),
      multi: true,
    },
  ],
})
export class MrRadio<T = unknown> implements ControlValueAccessor, OnDestroy {
  /** Also doubles as this instance's id for `UniqueSelectionDispatcher` — see the constructor. */
  protected readonly inputId = `mr-radio-${nextRadioId++}`;

  private readonly selectionDispatcher = inject(UniqueSelectionDispatcher);
  private readonly unlisten: () => void;

  @Input() label?: string;
  /** Groups radios together — must match across every `mr-radio` in the group, same as a native `name` attribute. */
  @Input({ required: true }) name!: string;
  /** The value this particular radio represents; `writeValue` compares the model value against it. */
  @Input({ required: true }) value!: T;

  private readonly _size = signal<`${RadioSize}`>(RadioSize.Md);

  @Input()
  set size(value: `${RadioSize}`) {
    this._size.set(value);
  }

  get size(): `${RadioSize}` {
    return this._size();
  }

  private readonly _status = signal<`${RadioStatus}`>(RadioStatus.Default);

  @Input()
  set status(value: `${RadioStatus}`) {
    this._status.set(value);
  }

  get status(): `${RadioStatus}` {
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
    radioBoxVariants({
      size: this._size(),
      status: this._status(),
      checked: this.checked(),
      disabled: this._disabled(),
    }),
  );

  protected readonly dotClass = computed(() => radioDotVariants({ size: this._size(), status: this._status() }));

  private onChange: (value: T) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor() {
    // Native radio `change` events only fire on the newly-selected item — a sibling that just got
    // deselected is never told. This service is exactly the fix (see its own doc comment).
    this.unlisten = this.selectionDispatcher.listen((id, name) => {
      if (name === this.name && id !== this.inputId) {
        this.checked.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.unlisten();
  }

  writeValue(value: T): void {
    this.checked.set(value === this.value);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }

  protected handleChange(): void {
    this.checked.set(true);
    this.onChange(this.value);
    this.selectionDispatcher.notify(this.inputId, this.name);
  }
}
