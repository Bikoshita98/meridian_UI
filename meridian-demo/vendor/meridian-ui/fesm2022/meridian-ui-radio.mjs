import * as i0 from '@angular/core';
import { inject, signal, computed, forwardRef, Input, ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { tv } from 'tailwind-variants';

var RadioSize;
(function (RadioSize) {
    RadioSize["Xs"] = "xs";
    RadioSize["Sm"] = "sm";
    RadioSize["Md"] = "md";
    RadioSize["Lg"] = "lg";
    RadioSize["Xl"] = "xl";
})(RadioSize || (RadioSize = {}));
var RadioStatus;
(function (RadioStatus) {
    RadioStatus["Default"] = "default";
    RadioStatus["Error"] = "error";
    RadioStatus["Success"] = "success";
    RadioStatus["Warning"] = "warning";
})(RadioStatus || (RadioStatus = {}));

const radioBoxVariants = tv({
    base: 'relative inline-flex shrink-0 items-center justify-center rounded-pill border bg-white transition-colors duration-150',
    variants: {
        size: {
            xs: 'h-3.5 w-3.5',
            sm: 'h-4 w-4',
            md: 'h-5 w-5',
            lg: 'h-6 w-6',
            xl: 'h-7 w-7',
        },
        status: {
            default: 'border-neutral-300',
            error: 'border-error-500',
            success: 'border-success-500',
            warning: 'border-warning-500',
        },
        // No standalone classes — a checked radio's border color is resolved per `status` below.
        checked: {
            true: '',
            false: '',
        },
        disabled: {
            true: 'cursor-not-allowed border-neutral-200 bg-neutral-50 opacity-40',
            false: 'cursor-pointer',
        },
    },
    compoundVariants: [
        { status: RadioStatus.Default, checked: true, class: 'border-primary-500' },
        { status: RadioStatus.Error, checked: true, class: 'border-error-500' },
        { status: RadioStatus.Success, checked: true, class: 'border-success-500' },
        { status: RadioStatus.Warning, checked: true, class: 'border-warning-500' },
    ],
    defaultVariants: {
        size: RadioSize.Md,
        status: RadioStatus.Default,
        checked: false,
        disabled: false,
    },
});
const radioDotVariants = tv({
    base: 'rounded-pill transition-colors duration-150',
    variants: {
        size: {
            xs: 'h-1.5 w-1.5',
            sm: 'h-1.5 w-1.5',
            md: 'h-2 w-2',
            lg: 'h-2.5 w-2.5',
            xl: 'h-3 w-3',
        },
        status: {
            default: 'bg-primary-500',
            error: 'bg-error-500',
            success: 'bg-success-500',
            warning: 'bg-warning-500',
        },
    },
    defaultVariants: {
        size: RadioSize.Md,
        status: RadioStatus.Default,
    },
});

let nextRadioId = 0;
class MrRadio {
    /** Also doubles as this instance's id for `UniqueSelectionDispatcher` — see the constructor. */
    inputId = `mr-radio-${nextRadioId++}`;
    selectionDispatcher = inject(UniqueSelectionDispatcher);
    unlisten;
    label;
    /** Groups radios together — must match across every `mr-radio` in the group, same as a native `name` attribute. */
    name;
    /** The value this particular radio represents; `writeValue` compares the model value against it. */
    value;
    _size = signal(RadioSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    _status = signal(RadioStatus.Default, /* @ts-ignore */
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
    boxClass = computed(() => radioBoxVariants({
        size: this._size(),
        status: this._status(),
        checked: this.checked(),
        disabled: this._disabled(),
    }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "boxClass" }] : /* istanbul ignore next */ []));
    dotClass = computed(() => radioDotVariants({ size: this._size(), status: this._status() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "dotClass" }] : /* istanbul ignore next */ []));
    onChange = () => { };
    onTouched = () => { };
    constructor() {
        // Native radio `change` events only fire on the newly-selected item — a sibling that just got
        // deselected is never told. This service is exactly the fix (see its own doc comment).
        this.unlisten = this.selectionDispatcher.listen((id, name) => {
            if (name === this.name && id !== this.inputId) {
                this.checked.set(false);
            }
        });
    }
    ngOnDestroy() {
        this.unlisten();
    }
    writeValue(value) {
        this.checked.set(value === this.value);
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
    handleChange() {
        this.checked.set(true);
        this.onChange(this.value);
        this.selectionDispatcher.notify(this.inputId, this.name);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrRadio, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrRadio, isStandalone: true, selector: "mr-radio", inputs: { label: "label", name: "name", value: "value", size: "size", status: "status", disabled: "disabled", required: "required" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MrRadio),
                multi: true,
            },
        ], ngImport: i0, template: "<label [for]=\"inputId\" class=\"inline-flex cursor-pointer select-none items-center gap-xs\">\n  <span class=\"relative inline-flex\">\n    <input\n      [id]=\"inputId\"\n      type=\"radio\"\n      [name]=\"name\"\n      class=\"absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed\"\n      [checked]=\"checked()\"\n      [disabled]=\"disabled\"\n      [required]=\"required\"\n      (change)=\"handleChange()\"\n      (blur)=\"onTouched()\"\n    />\n    <span [class]=\"boxClass()\" aria-hidden=\"true\">\n      @if (checked()) {\n        <span [class]=\"dotClass()\"></span>\n      }\n    </span>\n  </span>\n  @if (label) {\n    <span class=\"label-2 text-neutral-700\">{{ label }}</span>\n  }\n</label>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrRadio, decorators: [{
            type: Component,
            args: [{ selector: 'mr-radio', imports: [], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MrRadio),
                            multi: true,
                        },
                    ], template: "<label [for]=\"inputId\" class=\"inline-flex cursor-pointer select-none items-center gap-xs\">\n  <span class=\"relative inline-flex\">\n    <input\n      [id]=\"inputId\"\n      type=\"radio\"\n      [name]=\"name\"\n      class=\"absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed\"\n      [checked]=\"checked()\"\n      [disabled]=\"disabled\"\n      [required]=\"required\"\n      (change)=\"handleChange()\"\n      (blur)=\"onTouched()\"\n    />\n    <span [class]=\"boxClass()\" aria-hidden=\"true\">\n      @if (checked()) {\n        <span [class]=\"dotClass()\"></span>\n      }\n    </span>\n  </span>\n  @if (label) {\n    <span class=\"label-2 text-neutral-700\">{{ label }}</span>\n  }\n</label>\n" }]
        }], ctorParameters: () => [], propDecorators: { label: [{
                type: Input
            }], name: [{
                type: Input,
                args: [{ required: true }]
            }], value: [{
                type: Input,
                args: [{ required: true }]
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

export { MrRadio, RadioSize, RadioStatus, radioBoxVariants, radioDotVariants };
//# sourceMappingURL=meridian-ui-radio.mjs.map
