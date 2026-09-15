import { ChangeDetectionStrategy, Component, Input, OnDestroy, computed, signal } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { TooltipPosition } from './tooltip.enums';
import { TOOLTIP_POSITIONS, tooltipPanelVariants } from './tooltip.variants';

let nextTooltipId = 0;

@Component({
  selector: 'mr-tooltip',
  imports: [OverlayModule],
  templateUrl: './tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrTooltip implements OnDestroy {
  protected readonly tooltipId = `mr-tooltip-${nextTooltipId++}`;

  @Input({ required: true }) text!: string;
  /** Delay in ms before showing on hover — avoids flicker when the pointer just passes over the trigger. */
  @Input() showDelay = 150;
  /** Delay in ms before hiding on mouse-leave. */
  @Input() hideDelay = 0;

  private readonly _position = signal<`${TooltipPosition}`>(TooltipPosition.Top);

  @Input()
  set position(value: `${TooltipPosition}`) {
    this._position.set(value);
  }

  get position(): `${TooltipPosition}` {
    return this._position();
  }

  protected readonly isOpen = signal(false);
  protected readonly positions = computed(() => TOOLTIP_POSITIONS[this._position()]);
  protected readonly panelClass = computed(() => tooltipPanelVariants());

  private showTimeoutId?: ReturnType<typeof setTimeout>;
  private hideTimeoutId?: ReturnType<typeof setTimeout>;

  ngOnDestroy(): void {
    this.clearTimeouts();
  }

  protected scheduleShow(): void {
    this.clearTimeouts();
    this.showTimeoutId = setTimeout(() => this.isOpen.set(true), this.showDelay);
  }

  protected scheduleHide(): void {
    this.clearTimeouts();
    this.hideTimeoutId = setTimeout(() => this.isOpen.set(false), this.hideDelay);
  }

  /** Immediate, no delay — used for focus/blur/Escape so keyboard users never wait on it. */
  protected show(): void {
    this.clearTimeouts();
    this.isOpen.set(true);
  }

  protected hide(): void {
    this.clearTimeouts();
    this.isOpen.set(false);
  }

  private clearTimeouts(): void {
    clearTimeout(this.showTimeoutId);
    clearTimeout(this.hideTimeoutId);
  }
}
