import { ChangeDetectionStrategy, Component, Input, computed, contentChildren, effect, signal } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ICON_SIZE_PX, MrIcon } from '../icon/public-api';
import { ButtonColor, ButtonRadius, ButtonShape, ButtonSize, ButtonStatus, ButtonVariant } from './button.enums';
import { buttonVariants } from './button.variants';

@Component({
  selector: 'mr-button',
  imports: [],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrButton {
  private readonly _variant = signal<`${ButtonVariant}`>(ButtonVariant.Filled);

  @Input()
  set variant(value: `${ButtonVariant}`) {
    this._variant.set(value);
  }

  get variant(): `${ButtonVariant}` {
    return this._variant();
  }

  private readonly _color = signal<`${ButtonColor}`>(ButtonColor.Primary);

  @Input()
  set color(value: `${ButtonColor}`) {
    this._color.set(value);
  }

  get color(): `${ButtonColor}` {
    return this._color();
  }

  private readonly _size = signal<`${ButtonSize}`>(ButtonSize.Md);

  @Input()
  set size(value: `${ButtonSize}`) {
    this._size.set(value);
  }

  get size(): `${ButtonSize}` {
    return this._size();
  }

  private readonly _shape = signal<`${ButtonShape}`>(ButtonShape.Default);

  @Input()
  set shape(value: `${ButtonShape}`) {
    this._shape.set(value);
  }

  get shape(): `${ButtonShape}` {
    return this._shape();
  }

  private readonly _radius = signal<`${ButtonRadius}`>(ButtonRadius.Md);

  @Input()
  set radius(value: `${ButtonRadius}`) {
    this._radius.set(value);
  }

  get radius(): `${ButtonRadius}` {
    return this._radius();
  }

  private readonly _status = signal<`${ButtonStatus}`>(ButtonStatus.Default);

  @Input()
  set status(value: `${ButtonStatus}`) {
    this._status.set(value);
  }

  get status(): `${ButtonStatus}` {
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

  /** Native `<button>` `type` — defaults to `button` so a button never submits a host form by accident. */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  protected readonly isLoading = computed(() => this._status() === ButtonStatus.Loading);
  protected readonly isDisabled = computed(() => this._disabled() || this.isLoading());

  protected readonly hostClass = computed(() =>
    buttonVariants({
      variant: this._variant(),
      color: this._color(),
      size: this._size(),
      shape: this._shape(),
      radius: this._radius(),
      status: this._status(),
    }),
  );

  protected readonly spinnerPx = computed(() => `${ICON_SIZE_PX[this._size()]}px`);

  private readonly projectedIcons = contentChildren(MrIcon, { descendants: true });

  constructor() {
    // A projected `<mr-icon>` doesn't know the button's size — push it down so callers never have
    // to keep an icon's `size` input in sync with the button's own `size` by hand.
    effect(() => {
      const size = this._size();
      for (const icon of this.projectedIcons()) {
        icon.size = size;
      }
    });
  }
}
