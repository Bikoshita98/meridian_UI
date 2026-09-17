import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { ICON_SIZE_PX } from '../icon/public-api';
import { SpinnerColor, SpinnerSize } from './spinner.enums';
import { spinnerVariants } from './spinner.variants';

@Component({
  selector: 'mr-spinner',
  imports: [],
  templateUrl: './spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrSpinner {
  private readonly _size = signal<`${SpinnerSize}`>(SpinnerSize.Md);

  @Input()
  set size(value: `${SpinnerSize}`) {
    this._size.set(value);
  }

  get size(): `${SpinnerSize}` {
    return this._size();
  }

  private readonly _color = signal<`${SpinnerColor}`>(SpinnerColor.Neutral);

  @Input()
  set color(value: `${SpinnerColor}`) {
    this._color.set(value);
  }

  get color(): `${SpinnerColor}` {
    return this._color();
  }

  /** Announced to assistive tech via `aria-label` — a spinner conveys a loading state with no visible text of its own. */
  @Input() label = 'Loading';

  protected readonly spinnerClass = computed(() => spinnerVariants({ color: this._color() }));
  protected readonly spinnerPx = computed(() => `${ICON_SIZE_PX[this._size()]}px`);
}
