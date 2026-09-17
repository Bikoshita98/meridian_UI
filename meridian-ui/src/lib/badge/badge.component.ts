import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { BadgeColor, BadgeVariant } from './badge.enums';
import { badgeVariants } from './badge.variants';

@Component({
  selector: 'mr-badge',
  imports: [],
  templateUrl: './badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrBadge {
  private readonly _variant = signal<`${BadgeVariant}`>(BadgeVariant.Filled);

  @Input()
  set variant(value: `${BadgeVariant}`) {
    this._variant.set(value);
  }

  get variant(): `${BadgeVariant}` {
    return this._variant();
  }

  private readonly _color = signal<`${BadgeColor}`>(BadgeColor.Neutral);

  @Input()
  set color(value: `${BadgeColor}`) {
    this._color.set(value);
  }

  get color(): `${BadgeColor}` {
    return this._color();
  }

  protected readonly badgeClass = computed(() => badgeVariants({ variant: this._variant(), color: this._color() }));
}
