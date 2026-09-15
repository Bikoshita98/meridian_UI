import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { IconSize } from './icon.enums';
import { ICON_SIZE_PX, iconVariants } from './icon.variants';
import type { MrIconName } from './icon.registry';

@Component({
  selector: 'mr-icon',
  imports: [NgIcon],
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrIcon {
  @Input({ required: true }) name!: MrIconName;

  private readonly _size = signal<`${IconSize}`>(IconSize.Md);

  @Input()
  set size(value: `${IconSize}`) {
    this._size.set(value);
  }

  get size(): `${IconSize}` {
    return this._size();
  }

  protected readonly wrapperClass = computed(() => iconVariants());
  protected readonly pixelSize = computed(() => `${ICON_SIZE_PX[this._size()]}px`);
}
