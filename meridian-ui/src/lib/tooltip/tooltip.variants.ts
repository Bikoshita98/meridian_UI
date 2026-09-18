import type { ConnectedPosition } from '@angular/cdk/overlay';
import { tv } from 'tailwind-variants';
import { TooltipPosition } from './tooltip.enums';

export const tooltipPanelVariants = tv({
  base: 'pointer-events-none max-w-xs rounded-sm bg-neutral-600 px-sm py-2xs font-sans text-xs text-white shadow-md',
});

/** Each position tries its preferred side first, then falls back to the opposite side if it doesn't fit. */
export const TOOLTIP_POSITIONS: Record<`${TooltipPosition}`, ConnectedPosition[]> = {
  [TooltipPosition.Top]: [
    { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8 },
    { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8 },
  ],
  [TooltipPosition.Bottom]: [
    { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8 },
    { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8 },
  ],
  [TooltipPosition.Left]: [
    { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8 },
    { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8 },
  ],
  [TooltipPosition.Right]: [
    { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8 },
    { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8 },
  ],
};
