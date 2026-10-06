import * as i0 from '@angular/core';
import { signal, computed, Input, ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tv } from 'tailwind-variants';
import { lucideSquare, lucideCircle, lucideStar, lucideMoreHorizontal, lucideMinus, lucidePlus, lucideCalendar, lucideLink2, lucideEyeOff, lucideEye, lucideSearch, lucideLoader2, lucideInfo, lucideAlertTriangle, lucideAlertCircle, lucideX, lucideCheck, lucideChevronRight, lucideChevronLeft, lucideChevronUp, lucideChevronDown } from '@ng-icons/lucide';

var IconSize;
(function (IconSize) {
    IconSize["Xs"] = "xs";
    IconSize["Sm"] = "sm";
    IconSize["Md"] = "md";
    IconSize["Lg"] = "lg";
    IconSize["Xl"] = "xl";
})(IconSize || (IconSize = {}));

const iconVariants = tv({
    base: 'inline-flex shrink-0 items-center justify-center leading-none',
});
/** Pixel size handed to `ng-icon`'s `size` input, keyed by the same enum as every other component. */
const ICON_SIZE_PX = {
    [IconSize.Xs]: 12,
    [IconSize.Sm]: 14,
    [IconSize.Md]: 16,
    [IconSize.Lg]: 20,
    [IconSize.Xl]: 24,
};

class MrIcon {
    name;
    _size = signal(IconSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    wrapperClass = computed(() => iconVariants(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "wrapperClass" }] : /* istanbul ignore next */ []));
    pixelSize = computed(() => `${ICON_SIZE_PX[this._size()]}px`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "pixelSize" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrIcon, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.6", type: MrIcon, isStandalone: true, selector: "mr-icon", inputs: { name: "name", size: "size" }, ngImport: i0, template: "<ng-icon [class]=\"wrapperClass()\" [name]=\"name\" [size]=\"pixelSize()\" />\n", dependencies: [{ kind: "component", type: NgIcon, selector: "ng-icon", inputs: ["name", "svg", "size", "strokeWidth", "color"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrIcon, decorators: [{
            type: Component,
            args: [{ selector: 'mr-icon', imports: [NgIcon], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-icon [class]=\"wrapperClass()\" [name]=\"name\" [size]=\"pixelSize()\" />\n" }]
        }], propDecorators: { name: [{
                type: Input,
                args: [{ required: true }]
            }], size: [{
                type: Input
            }] } });

/**
 * The curated set of icons available as `<mr-icon name="...">` across the library.
 * Consumers register these once via `provideMeridianIcons()` in their app config — ng-icons
 * then tree-shakes away anything not referenced, so this is the one place a new icon is added.
 */
const MERIDIAN_ICONS = {
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
    link: lucideLink2,
    calendar: lucideCalendar,
    plus: lucidePlus,
    minus: lucideMinus,
    moreHorizontal: lucideMoreHorizontal,
    star: lucideStar,
    circle: lucideCircle,
    square: lucideSquare,
};
/** Register once in the consuming app's providers (bootstrapApplication or root NgModule). */
function provideMeridianIcons() {
    return provideIcons(MERIDIAN_ICONS);
}

/**
 * Generated bundle index. Do not edit.
 */

export { ICON_SIZE_PX, IconSize, MERIDIAN_ICONS, MrIcon, iconVariants, provideMeridianIcons };
//# sourceMappingURL=meridian-ui-icon.mjs.map
