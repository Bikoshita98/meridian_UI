import * as i0 from '@angular/core';
import { signal, computed, Input, ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_SIZE_PX } from '@meridian/ui/icon';
import { createTV } from 'tailwind-variants';

var SpinnerSize;
(function (SpinnerSize) {
    SpinnerSize["Xs"] = "xs";
    SpinnerSize["Sm"] = "sm";
    SpinnerSize["Md"] = "md";
    SpinnerSize["Lg"] = "lg";
    SpinnerSize["Xl"] = "xl";
})(SpinnerSize || (SpinnerSize = {}));
var SpinnerColor;
(function (SpinnerColor) {
    SpinnerColor["Primary"] = "primary";
    SpinnerColor["Secondary"] = "secondary";
    SpinnerColor["Neutral"] = "neutral";
    SpinnerColor["Success"] = "success";
    SpinnerColor["Warning"] = "warning";
    SpinnerColor["Error"] = "error";
    SpinnerColor["Info"] = "info";
})(SpinnerColor || (SpinnerColor = {}));

// `tailwind-variants` v3 bundles its own Tailwind-v4-shaped class-conflict resolver rather than
// reading this project's tailwind.config.js. Its default border-width matcher only recognizes
// numeric values (`border-2`, `border-4`, ...), so this library's word-keyed `borderWidth` scale
// (`border-md`/`border-lg` below — see tailwind.config.js) falls through to the border-COLOR
// group's catch-all matcher instead, and silently loses its merge conflict against `border-current`
// (both get classified as "border-color"; the merge keeps only the last one in the list) — so
// `border-md` was being dropped outright, leaving the ring with no border-width at all. This local
// `tv` extends just the `border-w` class group with the two extra keys to fix that. (Not factored
// into a shared helper: a cross-component/cross-entry-point import here would break ng-packagr's
// per-secondary-entry-point `rootDir` — every other component redeclares small config locally for
// the same reason, e.g. `badge` redeclaring `ButtonColor`'s palette as its own `BadgeColor`.)
const tv = createTV({
    twMergeConfig: {
        extend: {
            classGroups: {
                'border-w': [{ border: ['md', 'lg'] }],
            },
        },
    },
});
// Same ring markup `button` renders inline for its own loading state (`animate-spin` + a
// current-color border with the top edge cut out), pulled out standalone so it can be placed
// anywhere (a loading placeholder over a `card`/`table`), not just inside a `button`.
const spinnerVariants = tv({
    base: 'inline-block shrink-0 animate-spin rounded-pill border-md border-current border-t-transparent',
    variants: {
        color: {
            primary: 'text-primary-500',
            secondary: 'text-secondary-500',
            neutral: 'text-neutral-400',
            success: 'text-success-500',
            warning: 'text-warning-500',
            error: 'text-error-500',
            info: 'text-info-500',
        },
    },
    defaultVariants: {
        color: 'neutral',
    },
});

class MrSpinner {
    _size = signal(SpinnerSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    _color = signal(SpinnerColor.Neutral, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_color" }] : /* istanbul ignore next */ []));
    set color(value) {
        this._color.set(value);
    }
    get color() {
        return this._color();
    }
    /** Announced to assistive tech via `aria-label` — a spinner conveys a loading state with no visible text of its own. */
    label = 'Loading';
    spinnerClass = computed(() => spinnerVariants({ color: this._color() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "spinnerClass" }] : /* istanbul ignore next */ []));
    spinnerPx = computed(() => `${ICON_SIZE_PX[this._size()]}px`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "spinnerPx" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrSpinner, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.6", type: MrSpinner, isStandalone: true, selector: "mr-spinner", inputs: { size: "size", color: "color", label: "label" }, ngImport: i0, template: "<span\n  [class]=\"spinnerClass()\"\n  [style.width]=\"spinnerPx()\"\n  [style.height]=\"spinnerPx()\"\n  role=\"status\"\n  [attr.aria-label]=\"label\"\n></span>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrSpinner, decorators: [{
            type: Component,
            args: [{ selector: 'mr-spinner', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span\n  [class]=\"spinnerClass()\"\n  [style.width]=\"spinnerPx()\"\n  [style.height]=\"spinnerPx()\"\n  role=\"status\"\n  [attr.aria-label]=\"label\"\n></span>\n" }]
        }], propDecorators: { size: [{
                type: Input
            }], color: [{
                type: Input
            }], label: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { MrSpinner, SpinnerColor, SpinnerSize, spinnerVariants };
//# sourceMappingURL=meridian-ui-spinner.mjs.map
