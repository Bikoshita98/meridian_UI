import * as i0 from '@angular/core';
import { signal, computed, forwardRef, Input, ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { tv } from 'tailwind-variants';

var ToggleSize;
(function (ToggleSize) {
    ToggleSize["Xs"] = "xs";
    ToggleSize["Sm"] = "sm";
    ToggleSize["Md"] = "md";
    ToggleSize["Lg"] = "lg";
    ToggleSize["Xl"] = "xl";
})(ToggleSize || (ToggleSize = {}));
var ToggleStatus;
(function (ToggleStatus) {
    ToggleStatus["Default"] = "default";
    ToggleStatus["Error"] = "error";
    ToggleStatus["Success"] = "success";
    ToggleStatus["Warning"] = "warning";
})(ToggleStatus || (ToggleStatus = {}));

const toggleTrackVariants = tv({
    base: 'relative inline-flex shrink-0 items-center rounded-pill border border-neutral-300 bg-neutral-200 transition-colors duration-150',
    variants: {
        size: {
            xs: 'h-4 w-7',
            sm: 'h-5 w-9',
            md: 'h-6 w-10',
            lg: 'h-7 w-12',
            xl: 'h-8 w-14',
        },
        // No standalone classes — an unchecked track is always neutral gray; only a checked track's
        // fill color is resolved per `status`, below.
        status: {
            default: '',
            error: '',
            success: '',
            warning: '',
        },
        checked: {
            true: '',
            false: '',
        },
        disabled: {
            true: 'cursor-not-allowed opacity-40',
            false: 'cursor-pointer',
        },
    },
    compoundVariants: [
        { status: ToggleStatus.Default, checked: true, class: 'border-primary-500 bg-primary-500' },
        { status: ToggleStatus.Error, checked: true, class: 'border-error-500 bg-error-500' },
        { status: ToggleStatus.Success, checked: true, class: 'border-success-500 bg-success-500' },
        { status: ToggleStatus.Warning, checked: true, class: 'border-warning-500 bg-warning-500' },
    ],
    defaultVariants: {
        size: ToggleSize.Md,
        status: ToggleStatus.Default,
        checked: false,
        disabled: false,
    },
});
const toggleThumbVariants = tv({
    base: 'pointer-events-none absolute left-0.5 top-1/2 -translate-y-1/2 rounded-pill bg-white shadow-sm transition-transform duration-150',
    variants: {
        size: {
            xs: 'h-3 w-3',
            sm: 'h-4 w-4',
            md: 'h-5 w-5',
            lg: 'h-6 w-6',
            xl: 'h-7 w-7',
        },
        // The actual slide distance depends on both size (track width - thumb size) and checked —
        // resolved per size below rather than a single shared distance.
        checked: {
            true: '',
            false: '',
        },
    },
    compoundVariants: [
        { size: ToggleSize.Xs, checked: true, class: 'translate-x-3' },
        { size: ToggleSize.Sm, checked: true, class: 'translate-x-4' },
        { size: ToggleSize.Md, checked: true, class: 'translate-x-4' },
        { size: ToggleSize.Lg, checked: true, class: 'translate-x-5' },
        { size: ToggleSize.Xl, checked: true, class: 'translate-x-6' },
    ],
    defaultVariants: {
        size: ToggleSize.Md,
        checked: false,
    },
});

let nextToggleId = 0;
class MrToggle {
    inputId = `mr-toggle-${nextToggleId++}`;
    label;
    _size = signal(ToggleSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    _status = signal(ToggleStatus.Default, /* @ts-ignore */
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
    _required = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_required" }] : /* istanbul ignore next */ []));
    set required(value) {
        this._required.set(coerceBooleanProperty(value));
    }
    get required() {
        return this._required();
    }
    checked = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "checked" }] : /* istanbul ignore next */ []));
    trackClass = computed(() => toggleTrackVariants({
        size: this._size(),
        status: this._status(),
        checked: this.checked(),
        disabled: this._disabled(),
    }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "trackClass" }] : /* istanbul ignore next */ []));
    thumbClass = computed(() => toggleThumbVariants({ size: this._size(), checked: this.checked() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "thumbClass" }] : /* istanbul ignore next */ []));
    onChange = () => { };
    onTouched = () => { };
    writeValue(value) {
        this.checked.set(!!value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this._disabled.set(isDisabled);
    }
    handleChange(event) {
        const value = event.target.checked;
        this.checked.set(value);
        this.onChange(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrToggle, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrToggle, isStandalone: true, selector: "mr-toggle", inputs: { label: "label", size: "size", status: "status", disabled: "disabled", required: "required" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MrToggle),
                multi: true,
            },
        ], ngImport: i0, template: "<label [for]=\"inputId\" class=\"inline-flex cursor-pointer select-none items-center gap-xs\">\n  <span class=\"relative inline-flex\">\n    <input\n      [id]=\"inputId\"\n      type=\"checkbox\"\n      role=\"switch\"\n      class=\"absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed\"\n      [checked]=\"checked()\"\n      [disabled]=\"disabled\"\n      [required]=\"required\"\n      [attr.aria-checked]=\"checked()\"\n      (change)=\"handleChange($event)\"\n      (blur)=\"onTouched()\"\n    />\n    <span [class]=\"trackClass()\" aria-hidden=\"true\">\n      <span [class]=\"thumbClass()\"></span>\n    </span>\n  </span>\n  @if (label) {\n    <span class=\"label-2 text-neutral-700\">{{ label }}</span>\n  }\n</label>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrToggle, decorators: [{
            type: Component,
            args: [{ selector: 'mr-toggle', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MrToggle),
                            multi: true,
                        },
                    ], template: "<label [for]=\"inputId\" class=\"inline-flex cursor-pointer select-none items-center gap-xs\">\n  <span class=\"relative inline-flex\">\n    <input\n      [id]=\"inputId\"\n      type=\"checkbox\"\n      role=\"switch\"\n      class=\"absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed\"\n      [checked]=\"checked()\"\n      [disabled]=\"disabled\"\n      [required]=\"required\"\n      [attr.aria-checked]=\"checked()\"\n      (change)=\"handleChange($event)\"\n      (blur)=\"onTouched()\"\n    />\n    <span [class]=\"trackClass()\" aria-hidden=\"true\">\n      <span [class]=\"thumbClass()\"></span>\n    </span>\n  </span>\n  @if (label) {\n    <span class=\"label-2 text-neutral-700\">{{ label }}</span>\n  }\n</label>\n" }]
        }], propDecorators: { label: [{
                type: Input
            }], size: [{
                type: Input
            }], status: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { MrToggle, ToggleSize, ToggleStatus, toggleThumbVariants, toggleTrackVariants };
//# sourceMappingURL=meridian-ui-toggle.mjs.map
