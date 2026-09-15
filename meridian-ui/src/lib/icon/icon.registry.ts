import { provideIcons } from '@ng-icons/core';
import {
  lucideAlertCircle,
  lucideAlertTriangle,
  lucideCheck,
  lucideChevronDown,
  lucideChevronLeft,
  lucideChevronRight,
  lucideChevronUp,
  lucideCircle,
  lucideEye,
  lucideEyeOff,
  lucideInfo,
  lucideLoader2,
  lucideMinus,
  lucideMoreHorizontal,
  lucidePlus,
  lucideSearch,
  lucideSquare,
  lucideStar,
  lucideX,
} from '@ng-icons/lucide';

/**
 * The curated set of icons available as `<mr-icon name="...">` across the library.
 * Consumers register these once via `provideMeridianIcons()` in their app config — ng-icons
 * then tree-shakes away anything not referenced, so this is the one place a new icon is added.
 */
export const MERIDIAN_ICONS = {
  chevronDown: lucideChevronDown,
  chevronUp: lucideChevronUp,
  chevronLeft: lucideChevronLeft,
  chevronRight: lucideChevronRight,
  check: lucideCheck,
  x: lucideX,
  alertCircle: lucideAlertCircle,
  alertTriangle: lucideAlertTriangle,
  info: lucideInfo,
  loader: lucideLoader2,
  search: lucideSearch,
  eye: lucideEye,
  eyeOff: lucideEyeOff,
  plus: lucidePlus,
  minus: lucideMinus,
  moreHorizontal: lucideMoreHorizontal,
  star: lucideStar,
  circle: lucideCircle,
  square: lucideSquare,
} as const;

export type MrIconName = keyof typeof MERIDIAN_ICONS;

/** Register once in the consuming app's providers (bootstrapApplication or root NgModule). */
export function provideMeridianIcons() {
  return provideIcons(MERIDIAN_ICONS);
}
