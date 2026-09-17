import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { CardPadding, CardVariant } from './card.enums';
import { cardVariants } from './card.variants';

@Component({
  selector: 'mr-card',
  imports: [],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrCard {
  private readonly _variant = signal<`${CardVariant}`>(CardVariant.Elevated);

  @Input()
  set variant(value: `${CardVariant}`) {
    this._variant.set(value);
  }

  get variant(): `${CardVariant}` {
    return this._variant();
  }

  private readonly _padding = signal<`${CardPadding}`>(CardPadding.Md);

  @Input()
  set padding(value: `${CardPadding}`) {
    this._padding.set(value);
  }

  get padding(): `${CardPadding}` {
    return this._padding();
  }

  protected readonly cardClass = computed(() => cardVariants({ variant: this._variant(), padding: this._padding() }));
}
