import * as i0 from '@angular/core';
import { signal, computed, Input, ChangeDetectionStrategy, Component } from '@angular/core';
import { tv } from 'tailwind-variants';

var BadgeVariant;
(function (BadgeVariant) {
    BadgeVariant["Filled"] = "filled";
    BadgeVariant["Outline"] = "outline";
})(BadgeVariant || (BadgeVariant = {}));
var BadgeColor;
(function (BadgeColor) {
    BadgeColor["Primary"] = "primary";
    BadgeColor["Secondary"] = "secondary";
    BadgeColor["Neutral"] = "neutral";
    BadgeColor["Success"] = "success";
    BadgeColor["Warning"] = "warning";
    BadgeColor["Error"] = "error";
    BadgeColor["Info"] = "info";
})(BadgeColor || (BadgeColor = {}));

// Every class below is written out literally (never interpolated) so Tailwind's static content
// scan can find it — a template-literal color token like `bg-${color}-500` is invisible to it.
const colorCompoundVariants = [
    { variant: BadgeVariant.Filled, color: BadgeColor.Primary, class: 'border-transparent bg-primary-500 text-white' },
    {
        variant: BadgeVariant.Filled,
        color: BadgeColor.Secondary,
        class: 'border-transparent bg-secondary-500 text-white',
    },
    { variant: BadgeVariant.Filled, color: BadgeColor.Neutral, class: 'border-transparent bg-neutral-500 text-white' },
    { variant: BadgeVariant.Filled, color: BadgeColor.Success, class: 'border-transparent bg-success-500 text-white' },
    { variant: BadgeVariant.Filled, color: BadgeColor.Warning, class: 'border-transparent bg-warning-500 text-white' },
    { variant: BadgeVariant.Filled, color: BadgeColor.Error, class: 'border-transparent bg-error-500 text-white' },
    { variant: BadgeVariant.Filled, color: BadgeColor.Info, class: 'border-transparent bg-info-500 text-white' },
    {
        variant: BadgeVariant.Outline,
        color: BadgeColor.Primary,
        class: 'border-primary-300 bg-primary-25 text-primary-600',
    },
    {
        variant: BadgeVariant.Outline,
        color: BadgeColor.Secondary,
        class: 'border-secondary-300 bg-secondary-25 text-secondary-600',
    },
    {
        variant: BadgeVariant.Outline,
        color: BadgeColor.Neutral,
        class: 'border-neutral-300 bg-neutral-25 text-neutral-600',
    },
    {
        variant: BadgeVariant.Outline,
        color: BadgeColor.Success,
        class: 'border-success-300 bg-success-25 text-success-600',
    },
    {
        variant: BadgeVariant.Outline,
        color: BadgeColor.Warning,
        class: 'border-warning-300 bg-warning-25 text-warning-600',
    },
    { variant: BadgeVariant.Outline, color: BadgeColor.Error, class: 'border-error-300 bg-error-25 text-error-600' },
    { variant: BadgeVariant.Outline, color: BadgeColor.Info, class: 'border-info-300 bg-info-25 text-info-600' },
];
const badgeVariants = tv({
    base: 'inline-flex items-center gap-3xs whitespace-nowrap rounded-pill border px-sm py-3xs font-sans text-xs font-medium leading-none',
    variants: {
        // No standalone classes — every color's actual treatment is resolved per `variant` below.
        variant: {
            filled: '',
            outline: '',
        },
        color: {
            primary: '',
            secondary: '',
            neutral: '',
            success: '',
            warning: '',
            error: '',
            info: '',
        },
    },
    compoundVariants: [...colorCompoundVariants],
    defaultVariants: {
        variant: BadgeVariant.Filled,
        color: BadgeColor.Neutral,
    },
});

class MrBadge {
    _variant = signal(BadgeVariant.Filled, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_variant" }] : /* istanbul ignore next */ []));
    set variant(value) {
        this._variant.set(value);
    }
    get variant() {
        return this._variant();
    }
    _color = signal(BadgeColor.Neutral, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_color" }] : /* istanbul ignore next */ []));
    set color(value) {
        this._color.set(value);
    }
    get color() {
        return this._color();
    }
    badgeClass = computed(() => badgeVariants({ variant: this._variant(), color: this._color() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "badgeClass" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrBadge, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.6", type: MrBadge, isStandalone: true, selector: "mr-badge", inputs: { variant: "variant", color: "color" }, ngImport: i0, template: "<span [class]=\"badgeClass()\">\n  <ng-content></ng-content>\n</span>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrBadge, decorators: [{
            type: Component,
            args: [{ selector: 'mr-badge', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span [class]=\"badgeClass()\">\n  <ng-content></ng-content>\n</span>\n" }]
        }], propDecorators: { variant: [{
                type: Input
            }], color: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { BadgeColor, BadgeVariant, MrBadge, badgeVariants };
//# sourceMappingURL=meridian-ui-badge.mjs.map
