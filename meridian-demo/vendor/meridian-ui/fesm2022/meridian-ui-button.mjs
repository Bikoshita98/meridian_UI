import * as i0 from '@angular/core';
import { signal, computed, contentChildren, effect, Input, ChangeDetectionStrategy, Component } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ICON_SIZE_PX, MrIcon } from '@meridian/ui/icon';
import { tv } from 'tailwind-variants';

var ButtonVariant;
(function (ButtonVariant) {
    ButtonVariant["Filled"] = "filled";
    ButtonVariant["Outline"] = "outline";
    ButtonVariant["Ghost"] = "ghost";
    ButtonVariant["Link"] = "link";
})(ButtonVariant || (ButtonVariant = {}));
var ButtonColor;
(function (ButtonColor) {
    ButtonColor["Primary"] = "primary";
    ButtonColor["Secondary"] = "secondary";
    ButtonColor["Neutral"] = "neutral";
    ButtonColor["Success"] = "success";
    ButtonColor["Warning"] = "warning";
    ButtonColor["Error"] = "error";
    ButtonColor["Info"] = "info";
})(ButtonColor || (ButtonColor = {}));
var ButtonSize;
(function (ButtonSize) {
    ButtonSize["Xs"] = "xs";
    ButtonSize["Sm"] = "sm";
    ButtonSize["Md"] = "md";
    ButtonSize["Lg"] = "lg";
    ButtonSize["Xl"] = "xl";
})(ButtonSize || (ButtonSize = {}));
var ButtonShape;
(function (ButtonShape) {
    ButtonShape["Default"] = "default";
    ButtonShape["Square"] = "square";
})(ButtonShape || (ButtonShape = {}));
var ButtonRadius;
(function (ButtonRadius) {
    ButtonRadius["None"] = "none";
    ButtonRadius["Sm"] = "sm";
    ButtonRadius["Md"] = "md";
    ButtonRadius["Lg"] = "lg";
    ButtonRadius["Pill"] = "pill";
})(ButtonRadius || (ButtonRadius = {}));
var ButtonStatus;
(function (ButtonStatus) {
    ButtonStatus["Default"] = "default";
    ButtonStatus["Loading"] = "loading";
})(ButtonStatus || (ButtonStatus = {}));

// Every class below is written out literally (never interpolated) so Tailwind's static content
// scan can find it — a template-literal color token like `bg-${color}-500` is invisible to it.
const colorCompoundVariants = [
    {
        variant: ButtonVariant.Filled,
        color: ButtonColor.Primary,
        class: 'border-transparent bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-600',
    },
    {
        variant: ButtonVariant.Filled,
        color: ButtonColor.Secondary,
        class: 'border-transparent bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-600',
    },
    {
        variant: ButtonVariant.Filled,
        color: ButtonColor.Neutral,
        class: 'border-transparent bg-neutral-500 text-white hover:bg-neutral-600 active:bg-neutral-600',
    },
    {
        variant: ButtonVariant.Filled,
        color: ButtonColor.Success,
        class: 'border-transparent bg-success-500 text-white hover:bg-success-600 active:bg-success-600',
    },
    {
        variant: ButtonVariant.Filled,
        color: ButtonColor.Warning,
        class: 'border-transparent bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-600',
    },
    {
        variant: ButtonVariant.Filled,
        color: ButtonColor.Error,
        class: 'border-transparent bg-error-500 text-white hover:bg-error-600 active:bg-error-600',
    },
    {
        variant: ButtonVariant.Filled,
        color: ButtonColor.Info,
        class: 'border-transparent bg-info-500 text-white hover:bg-info-600 active:bg-info-600',
    },
    {
        variant: ButtonVariant.Outline,
        color: ButtonColor.Primary,
        class: 'border-primary-300 bg-transparent text-primary-600 hover:bg-primary-25 active:bg-primary-50',
    },
    {
        variant: ButtonVariant.Outline,
        color: ButtonColor.Secondary,
        class: 'border-secondary-300 bg-transparent text-secondary-600 hover:bg-secondary-25 active:bg-secondary-50',
    },
    {
        variant: ButtonVariant.Outline,
        color: ButtonColor.Neutral,
        class: 'border-neutral-300 bg-transparent text-neutral-600 hover:bg-neutral-25 active:bg-neutral-50',
    },
    {
        variant: ButtonVariant.Outline,
        color: ButtonColor.Success,
        class: 'border-success-300 bg-transparent text-success-600 hover:bg-success-25 active:bg-success-50',
    },
    {
        variant: ButtonVariant.Outline,
        color: ButtonColor.Warning,
        class: 'border-warning-300 bg-transparent text-warning-600 hover:bg-warning-25 active:bg-warning-50',
    },
    {
        variant: ButtonVariant.Outline,
        color: ButtonColor.Error,
        class: 'border-error-300 bg-transparent text-error-600 hover:bg-error-25 active:bg-error-50',
    },
    {
        variant: ButtonVariant.Outline,
        color: ButtonColor.Info,
        class: 'border-info-300 bg-transparent text-info-600 hover:bg-info-25 active:bg-info-50',
    },
    {
        variant: ButtonVariant.Ghost,
        color: ButtonColor.Primary,
        class: 'border-transparent bg-transparent text-primary-600 hover:bg-primary-25 active:bg-primary-50',
    },
    {
        variant: ButtonVariant.Ghost,
        color: ButtonColor.Secondary,
        class: 'border-transparent bg-transparent text-secondary-600 hover:bg-secondary-25 active:bg-secondary-50',
    },
    {
        variant: ButtonVariant.Ghost,
        color: ButtonColor.Neutral,
        class: 'border-transparent bg-transparent text-neutral-600 hover:bg-neutral-25 active:bg-neutral-50',
    },
    {
        variant: ButtonVariant.Ghost,
        color: ButtonColor.Success,
        class: 'border-transparent bg-transparent text-success-600 hover:bg-success-25 active:bg-success-50',
    },
    {
        variant: ButtonVariant.Ghost,
        color: ButtonColor.Warning,
        class: 'border-transparent bg-transparent text-warning-600 hover:bg-warning-25 active:bg-warning-50',
    },
    {
        variant: ButtonVariant.Ghost,
        color: ButtonColor.Error,
        class: 'border-transparent bg-transparent text-error-600 hover:bg-error-25 active:bg-error-50',
    },
    {
        variant: ButtonVariant.Ghost,
        color: ButtonColor.Info,
        class: 'border-transparent bg-transparent text-info-600 hover:bg-info-25 active:bg-info-50',
    },
    {
        variant: ButtonVariant.Link,
        color: ButtonColor.Primary,
        class: 'border-transparent bg-transparent text-primary-600 hover:text-primary-500 active:text-primary-600',
    },
    {
        variant: ButtonVariant.Link,
        color: ButtonColor.Secondary,
        class: 'border-transparent bg-transparent text-secondary-600 hover:text-secondary-500 active:text-secondary-600',
    },
    {
        variant: ButtonVariant.Link,
        color: ButtonColor.Neutral,
        class: 'border-transparent bg-transparent text-neutral-600 hover:text-neutral-500 active:text-neutral-600',
    },
    {
        variant: ButtonVariant.Link,
        color: ButtonColor.Success,
        class: 'border-transparent bg-transparent text-success-600 hover:text-success-500 active:text-success-600',
    },
    {
        variant: ButtonVariant.Link,
        color: ButtonColor.Warning,
        class: 'border-transparent bg-transparent text-warning-600 hover:text-warning-500 active:text-warning-600',
    },
    {
        variant: ButtonVariant.Link,
        color: ButtonColor.Error,
        class: 'border-transparent bg-transparent text-error-600 hover:text-error-500 active:text-error-600',
    },
    {
        variant: ButtonVariant.Link,
        color: ButtonColor.Info,
        class: 'border-transparent bg-transparent text-info-600 hover:text-info-500 active:text-info-600',
    },
];
const buttonVariants = tv({
    base: 'inline-flex select-none items-center justify-center whitespace-nowrap font-sans font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:pointer-events-none disabled:opacity-40',
    variants: {
        variant: {
            filled: 'border shadow-xs',
            outline: 'border',
            ghost: 'border',
            link: 'h-auto border-none p-0 shadow-none',
        },
        // No standalone classes — every color's actual treatment is resolved per `variant` below.
        color: {
            primary: '',
            secondary: '',
            neutral: '',
            success: '',
            warning: '',
            error: '',
            info: '',
        },
        size: {
            xs: 'h-7 gap-3xs px-sm text-xs',
            sm: 'h-8 gap-2xs px-sm text-sm',
            md: 'h-9 gap-xs px-md text-base',
            lg: 'h-10 gap-xs px-lg text-md',
            xl: 'h-12 gap-sm px-xl text-lg',
        },
        shape: {
            default: '',
            square: 'aspect-square px-0',
        },
        radius: {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            pill: 'rounded-pill',
        },
        status: {
            default: '',
            loading: 'cursor-wait',
        },
    },
    compoundVariants: [
        ...colorCompoundVariants,
        // The `link` variant never takes a border, background tint, or rounding — it's plain text.
        { variant: ButtonVariant.Link, class: 'rounded-none bg-transparent hover:bg-transparent active:bg-transparent' },
    ],
    defaultVariants: {
        variant: ButtonVariant.Filled,
        color: ButtonColor.Primary,
        size: ButtonSize.Md,
        shape: ButtonShape.Default,
        radius: ButtonRadius.Md,
        status: ButtonStatus.Default,
    },
});

class MrButton {
    _variant = signal(ButtonVariant.Filled, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_variant" }] : /* istanbul ignore next */ []));
    set variant(value) {
        this._variant.set(value);
    }
    get variant() {
        return this._variant();
    }
    _color = signal(ButtonColor.Primary, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_color" }] : /* istanbul ignore next */ []));
    set color(value) {
        this._color.set(value);
    }
    get color() {
        return this._color();
    }
    _size = signal(ButtonSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    _shape = signal(ButtonShape.Default, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_shape" }] : /* istanbul ignore next */ []));
    set shape(value) {
        this._shape.set(value);
    }
    get shape() {
        return this._shape();
    }
    _radius = signal(ButtonRadius.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_radius" }] : /* istanbul ignore next */ []));
    set radius(value) {
        this._radius.set(value);
    }
    get radius() {
        return this._radius();
    }
    _status = signal(ButtonStatus.Default, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_status" }] : /* istanbul ignore next */ []));
    set status(value) {
        this._status.set(value);
    }
    get status() {
        return this._status();
    }
    _disabled = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_disabled" }] : /* istanbul ignore next */ []));
    set disabled(value) {
        this._disabled.set(coerceBooleanProperty(value));
    }
    get disabled() {
        return this._disabled();
    }
    /** Native `<button>` `type` — defaults to `button` so a button never submits a host form by accident. */
    type = 'button';
    isLoading = computed(() => this._status() === ButtonStatus.Loading, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    isDisabled = computed(() => this._disabled() || this.isLoading(), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "isDisabled" }] : /* istanbul ignore next */ []));
    hostClass = computed(() => buttonVariants({
        variant: this._variant(),
        color: this._color(),
        size: this._size(),
        shape: this._shape(),
        radius: this._radius(),
        status: this._status(),
    }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "hostClass" }] : /* istanbul ignore next */ []));
    spinnerPx = computed(() => `${ICON_SIZE_PX[this._size()]}px`, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "spinnerPx" }] : /* istanbul ignore next */ []));
    projectedIcons = contentChildren(MrIcon, { ...(ngDevMode ? { debugName: "projectedIcons" } : /* istanbul ignore next */ {}), descendants: true });
    constructor() {
        // A projected `<mr-icon>` doesn't know the button's size — push it down so callers never have
        // to keep an icon's `size` input in sync with the button's own `size` by hand.
        effect(() => {
            const size = this._size();
            for (const icon of this.projectedIcons()) {
                icon.size = size;
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrButton, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrButton, isStandalone: true, selector: "mr-button", inputs: { variant: "variant", color: "color", size: "size", shape: "shape", radius: "radius", status: "status", disabled: "disabled", type: "type" }, queries: [{ propertyName: "projectedIcons", predicate: MrIcon, descendants: true, isSignal: true }], ngImport: i0, template: "<button [class]=\"hostClass()\" [type]=\"type\" [disabled]=\"isDisabled()\" [attr.aria-busy]=\"isLoading() ? 'true' : null\">\n  @if (isLoading()) {\n    <span\n      class=\"animate-spin rounded-pill border-md border-current border-t-transparent\"\n      [style.width]=\"spinnerPx()\"\n      [style.height]=\"spinnerPx()\"\n      aria-hidden=\"true\"\n    ></span>\n  }\n  <ng-content></ng-content>\n</button>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrButton, decorators: [{
            type: Component,
            args: [{ selector: 'mr-button', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button [class]=\"hostClass()\" [type]=\"type\" [disabled]=\"isDisabled()\" [attr.aria-busy]=\"isLoading() ? 'true' : null\">\n  @if (isLoading()) {\n    <span\n      class=\"animate-spin rounded-pill border-md border-current border-t-transparent\"\n      [style.width]=\"spinnerPx()\"\n      [style.height]=\"spinnerPx()\"\n      aria-hidden=\"true\"\n    ></span>\n  }\n  <ng-content></ng-content>\n</button>\n" }]
        }], ctorParameters: () => [], propDecorators: { variant: [{
                type: Input
            }], color: [{
                type: Input
            }], size: [{
                type: Input
            }], shape: [{
                type: Input
            }], radius: [{
                type: Input
            }], status: [{
                type: Input
            }], disabled: [{
                type: Input
            }], type: [{
                type: Input
            }], projectedIcons: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => MrIcon), { ...{ descendants: true }, isSignal: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonColor, ButtonRadius, ButtonShape, ButtonSize, ButtonStatus, ButtonVariant, MrButton, buttonVariants };
//# sourceMappingURL=meridian-ui-button.mjs.map
