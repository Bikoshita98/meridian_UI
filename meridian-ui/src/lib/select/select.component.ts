import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  computed,
  forwardRef,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { OverlayModule } from '@angular/cdk/overlay';
import { MrIcon } from '@meridian/ui/icon';
import { MrLabel } from '@meridian/ui/label';
import { SelectOption, SelectSize, SelectStatus } from './select.enums';
import {
  selectHelperVariants,
  selectOptionVariants,
  selectPanelVariants,
  selectTriggerVariants,
  selectValueVariants,
} from './select.variants';

let nextSelectId = 0;

@Component({
  selector: 'mr-select',
  imports: [OverlayModule, MrIcon, MrLabel],
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MrSelect),
      multi: true,
    },
  ],
})
export class MrSelect<T = unknown> implements ControlValueAccessor {
  protected readonly triggerId = `mr-select-${nextSelectId++}`;
  protected readonly helperId = `${this.triggerId}-helper`;

  @ViewChild('trigger', { static: true }) private readonly triggerRef!: ElementRef<HTMLButtonElement>;

  @Input() label?: string;
  @Input() placeholder = 'Select an option';
  @Input() helperText?: string;
  @Input() options: SelectOption<T>[] = [];

  private readonly _size = signal<`${SelectSize}`>(SelectSize.Md);

  @Input()
  set size(value: `${SelectSize}`) {
    this._size.set(value);
  }

  get size(): `${SelectSize}` {
    return this._size();
  }

  private readonly _status = signal<`${SelectStatus}`>(SelectStatus.Default);

  @Input()
  set status(value: `${SelectStatus}`) {
    this._status.set(value);
  }

  get status(): `${SelectStatus}` {
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

  protected readonly isOpen = signal(false);
  // 0 until first opened — cdkConnectedOverlay only renders the panel while `isOpen()` is true,
  // and `toggle()` sets the real width before flipping that flag, so this initial value never shows.
  protected readonly triggerWidth = signal(0);
  protected readonly value = signal<T | undefined>(undefined);

  protected readonly selectedOption = computed(() => this.options.find((option) => option.value === this.value()));

  protected readonly triggerClass = computed(() =>
    selectTriggerVariants({ size: this._size(), status: this._status(), open: this.isOpen() }),
  );

  protected readonly valueClass = computed(() => selectValueVariants({ empty: !this.selectedOption() }));
  protected readonly panelClass = computed(() => selectPanelVariants());
  protected readonly helperClass = computed(() => selectHelperVariants({ status: this._status() }));

  private onChange: (value: T) => void = () => {};
  protected onTouched: () => void = () => {};

  writeValue(value: T): void {
    this.value.set(value);
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

  protected optionClass(option: SelectOption<T>): string {
    return selectOptionVariants({ selected: option.value === this.value(), disabled: !!option.disabled });
  }

  protected toggle(): void {
    if (this.disabled) {
      return;
    }
    if (!this.isOpen()) {
      this.triggerWidth.set(this.triggerRef.nativeElement.offsetWidth);
    }
    this.isOpen.update((open) => !open);
  }

  protected close(): void {
    if (this.isOpen()) {
      this.isOpen.set(false);
      this.onTouched();
    }
  }

  protected selectOption(option: SelectOption<T>): void {
    if (option.disabled) {
      return;
    }
    this.value.set(option.value);
    this.onChange(option.value);
    this.close();
  }
}
