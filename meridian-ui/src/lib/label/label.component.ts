import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { LabelSize } from './label.enums';
import { labelVariants } from './label.variants';

@Component({
  selector: 'mr-label',
  imports: [],
  templateUrl: './label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrLabel {
  /** Mirrors the native `<label for>` attribute — pass the id of the control this labels. */
  @Input() for?: string;

  private readonly _size = signal<`${LabelSize}`>(LabelSize.Md);

  @Input()
  set size(value: `${LabelSize}`) {
    this._size.set(value);
  }

  get size(): `${LabelSize}` {
    return this._size();
  }

  private readonly _required = signal(false);

  @Input()
  set required(value: boolean | `${boolean}` | '') {
    this._required.set(coerceBooleanProperty(value));
  }

  get required(): boolean {
    return this._required();
  }

  private readonly _disabled = signal(false);

  @Input()
  set disabled(value: boolean | `${boolean}` | '') {
    this._disabled.set(coerceBooleanProperty(value));
  }

  get disabled(): boolean {
    return this._disabled();
  }

  protected readonly hostClass = computed(() =>
    labelVariants({ size: this._size(), disabled: this._disabled() }),
  );
}
