import type { ConnectedPosition } from '@angular/cdk/overlay';
import { tv } from 'tailwind-variants';
import { DropdownPosition } from './dropdown.enums';

export const dropdownPanelVariants = tv({
  base: 'min-w-40 rounded-md border border-neutral-200 bg-white p-3xs shadow-lg',
});

export const dropdownItemVariants = tv({
  base: 'flex w-full items-center gap-xs rounded-sm px-sm py-xs text-left font-sans text-base text-neutral-700 outline-none transition-colors duration-150 hover:bg-primary-25 focus-visible:bg-primary-25 disabled:cursor-not-allowed disabled:text-neutral-300 disabled:hover:bg-transparent',
});

/** Each position tries its preferred side first, then falls back to flipping vertically if it doesn't fit. */
export const DROPDOWN_POSITIONS: Record<`${DropdownPosition}`, ConnectedPosition[]> = {
  [DropdownPosition.BottomStart]: [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
  ],
  [DropdownPosition.BottomEnd]: [
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 4 },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 },
  ],
  [DropdownPosition.TopStart]: [
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  ],
  [DropdownPosition.TopEnd]: [
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 4 },
  ],
};
