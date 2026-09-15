import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  contentChildren,
  effect,
  signal,
} from '@angular/core';
import { MrTab } from './tab.component';
import { TabsSize } from './tabs.enums';
import { tabButtonVariants, tabsListVariants } from './tabs.variants';

@Component({
  selector: 'mr-tabs',
  imports: [],
  templateUrl: './tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrTabs {
  private readonly _selected = signal(0);

  @Input()
  set selected(value: number) {
    this._selected.set(value);
  }

  get selected(): number {
    return this._selected();
  }

  @Output() readonly selectedChange = new EventEmitter<number>();

  private readonly _size = signal<`${TabsSize}`>(TabsSize.Md);

  @Input()
  set size(value: `${TabsSize}`) {
    this._size.set(value);
  }

  get size(): `${TabsSize}` {
    return this._size();
  }

  protected readonly tabs = contentChildren(MrTab);
  protected readonly listClass = computed(() => tabsListVariants());

  constructor() {
    // Same contentChildren + effect pattern MrButton uses to push its size down to a projected
    // MrIcon — here pushing which tab is active down to each projected MrTab.
    effect(() => {
      const selected = this._selected();
      this.tabs().forEach((tab, index) => {
        tab.active = index === selected;
      });
    });
  }

  protected tabButtonClass(index: number): string {
    return tabButtonVariants({ size: this._size(), selected: index === this._selected() });
  }

  protected select(index: number): void {
    const tab = this.tabs()[index];
    if (!tab || tab.disabled || index === this._selected()) {
      return;
    }
    this._selected.set(index);
    this.selectedChange.emit(index);
  }
}
