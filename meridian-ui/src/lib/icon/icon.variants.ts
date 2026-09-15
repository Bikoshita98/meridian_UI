import { tv } from 'tailwind-variants';
import { IconSize } from './icon.enums';

export const iconVariants = tv({
  base: 'inline-flex shrink-0 items-center justify-center leading-none',
});

/** Pixel size handed to `ng-icon`'s `size` input, keyed by the same enum as every other component. */
export const ICON_SIZE_PX: Record<`${IconSize}`, number> = {
  [IconSize.Xs]: 12,
  [IconSize.Sm]: 14,
  [IconSize.Md]: 16,
  [IconSize.Lg]: 20,
  [IconSize.Xl]: 24,
};
