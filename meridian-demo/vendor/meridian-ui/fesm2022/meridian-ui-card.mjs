import * as i0 from '@angular/core';
import { signal, computed, Input, ChangeDetectionStrategy, Component } from '@angular/core';
import { tv } from 'tailwind-variants';

var CardVariant;
(function (CardVariant) {
    CardVariant["Elevated"] = "elevated";
    CardVariant["Outlined"] = "outlined";
})(CardVariant || (CardVariant = {}));
var CardPadding;
(function (CardPadding) {
    CardPadding["None"] = "none";
    CardPadding["Sm"] = "sm";
    CardPadding["Md"] = "md";
    CardPadding["Lg"] = "lg";
})(CardPadding || (CardPadding = {}));

const cardVariants = tv({
    base: 'rounded-lg bg-white',
    variants: {
        variant: {
            elevated: 'border border-neutral-100 shadow-md',
            outlined: 'border border-neutral-200',
        },
        padding: {
            none: 'p-0',
            sm: 'p-lg',
            md: 'p-xl',
            lg: 'p-2xl',
        },
    },
    defaultVariants: {
        variant: 'elevated',
        padding: 'md',
    },
});

class MrCard {
    _variant = signal(CardVariant.Elevated, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_variant" }] : /* istanbul ignore next */ []));
    set variant(value) {
        this._variant.set(value);
    }
    get variant() {
        return this._variant();
    }
    _padding = signal(CardPadding.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_padding" }] : /* istanbul ignore next */ []));
    set padding(value) {
        this._padding.set(value);
    }
    get padding() {
        return this._padding();
    }
    cardClass = computed(() => cardVariants({ variant: this._variant(), padding: this._padding() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "cardClass" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrCard, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "22.1.6", type: MrCard, isStandalone: true, selector: "mr-card", inputs: { variant: "variant", padding: "padding" }, ngImport: i0, template: "<div [class]=\"cardClass()\">\n  <ng-content></ng-content>\n</div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrCard, decorators: [{
            type: Component,
            args: [{ selector: 'mr-card', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"cardClass()\">\n  <ng-content></ng-content>\n</div>\n" }]
        }], propDecorators: { variant: [{
                type: Input
            }], padding: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { CardPadding, CardVariant, MrCard, cardVariants };
//# sourceMappingURL=meridian-ui-card.mjs.map
