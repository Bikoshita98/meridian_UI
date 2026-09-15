import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

let nextTabId = 0;

/**
 * One tab within an `<mr-tabs>`. Renders nothing on its own — `MrTabs` reads `label`/`disabled`
 * off each projected `MrTab` to build the tab-list row, and sets `active` on the one it selects.
 */
@Component({
  selector: 'mr-tab',
  imports: [],
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrTab {
  /** Public (not `protected`) — `MrTabs`' template reads these off each projected child. */
  readonly tabId = `mr-tab-${nextTabId++}`;
  readonly panelId = `${this.tabId}-panel`;

  @Input({ required: true }) label!: string;

  private readonly _disabled = signal(false);

  @Input()
  set disabled(value: boolean | `${boolean}` | '') {
    this._disabled.set(coerceBooleanProperty(value));
  }

  get disabled(): boolean {
    return this._disabled();
  }

  private readonly _active = signal(false);

  /** Set by the parent `MrTabs` — not meant to be bound directly by a consumer. */
  set active(value: boolean) {
    this._active.set(value);
  }

  get active(): boolean {
    return this._active();
  }
}
