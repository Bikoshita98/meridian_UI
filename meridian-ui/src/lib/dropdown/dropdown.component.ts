import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  afterNextRender,
  computed,
  contentChildren,
  inject,
  signal,
} from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { MrDropdownItem } from './dropdown-item.component';
import { DropdownPosition } from './dropdown.enums';
import { DROPDOWN_POSITIONS, dropdownPanelVariants } from './dropdown.variants';

@Component({
  selector: 'mr-dropdown',
  imports: [OverlayModule],
  templateUrl: './dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrDropdown {
  private readonly injector = inject(Injector);

  private readonly _position = signal<`${DropdownPosition}`>(DropdownPosition.BottomStart);

  @Input()
  set position(value: `${DropdownPosition}`) {
    this._position.set(value);
  }

  get position(): `${DropdownPosition}` {
    return this._position();
  }

  protected readonly isOpen = signal(false);
  protected readonly positions = computed(() => DROPDOWN_POSITIONS[this._position()]);
  protected readonly panelClass = computed(() => dropdownPanelVariants());

  protected readonly items = contentChildren(MrDropdownItem);

  // The manager subscribes to `items` (a signal) internally via `injector` — no manual re-wiring
  // needed when the projected item list changes.
  private readonly keyManager = new FocusKeyManager(this.items, this.injector)
    .withVerticalOrientation()
    .withWrap()
    .withHomeAndEnd();

  protected toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  protected open(): void {
    this.isOpen.set(true);
    // The panel's DOM (and its projected items) doesn't exist until this change is rendered —
    // cdkConnectedOverlay's <ng-template> is deferred, same as *ngIf.
    afterNextRender(() => this.keyManager.setFirstItemActive(), { injector: this.injector });
  }

  protected close(): void {
    this.isOpen.set(false);
  }

  protected handleMenuKeydown(event: KeyboardEvent): void {
    this.keyManager.onKeydown(event);
  }

  protected handlePanelClick(event: MouseEvent): void {
    // Only an actual item's button click should close the menu — not a click on the panel's own padding.
    if ((event.target as HTMLElement).closest('button')) {
      this.close();
    }
  }
}
