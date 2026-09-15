import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, computed, signal } from '@angular/core';
import type { FocusableOption } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { dropdownItemVariants } from './dropdown.variants';

/** One item inside an `<mr-dropdown>` panel. Implements `FocusableOption` so `MrDropdown`'s `FocusKeyManager` can move focus onto it. */
@Component({
  selector: 'mr-dropdown-item',
  imports: [],
  templateUrl: './dropdown-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrDropdownItem implements FocusableOption {
  @ViewChild('button', { static: true }) private readonly buttonRef!: ElementRef<HTMLButtonElement>;

  private readonly _disabled = signal(false);

  @Input()
  set disabled(value: boolean | `${boolean}` | '') {
    this._disabled.set(coerceBooleanProperty(value));
  }

  get disabled(): boolean {
    return this._disabled();
  }

  protected readonly itemClass = computed(() => dropdownItemVariants());

  focus(): void {
    this.buttonRef.nativeElement.focus();
  }
}
