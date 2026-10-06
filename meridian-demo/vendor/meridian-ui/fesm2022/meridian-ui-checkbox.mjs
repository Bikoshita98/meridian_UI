import * as i0 from '@angular/core';
import { signal, computed, forwardRef, Input, ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MrIcon } from '@meridian/ui/icon';
import { tv } from 'tailwind-variants';

var CheckboxSize;
(function (CheckboxSize) {
    CheckboxSize["Xs"] = "xs";
    CheckboxSize["Sm"] = "sm";
    CheckboxSize["Md"] = "md";
    CheckboxSize["Lg"] = "lg";
    CheckboxSize["Xl"] = "xl";
})(CheckboxSize || (CheckboxSize = {}));
var CheckboxStatus;
(function (CheckboxStatus) {
    CheckboxStatus["Default"] = "default";
    CheckboxStatus["Error"] = "error";
    CheckboxStatus["Success"] = "success";
    CheckboxStatus["Warning"] = "warning";
})(CheckboxStatus || (CheckboxStatus = {}));

const checkboxBoxVariants = tv({
    base: 'relative inline-flex shrink-0 items-center justify-center rounded-sm border bg-white transition-colors duration-150',
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
        // No standalone classes — a checked box's actual fill is resolved per `status` below.
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
        { status: CheckboxStatus.Default, checked: true, class: 'border-primary-500 bg-primary-500 text-white' },
        { status: CheckboxStatus.Error, checked: true, class: 'border-error-500 bg-error-500 text-white' },
        { status: CheckboxStatus.Success, checked: true, class: 'border-success-500 bg-success-500 text-white' },
        { status: CheckboxStatus.Warning, checked: true, class: 'border-warning-500 bg-warning-500 text-white' },
    ],
    defaultVariants: {
        size: CheckboxSize.Md,
        status: CheckboxStatus.Default,
        checked: false,
        disabled: false,
    },
});
/** Keeps the checkmark/dash icon legible at every box size without needing its own size input. */
const CHECKBOX_ICON_SIZE = {
    [CheckboxSize.Xs]: 'xs',
    [CheckboxSize.Sm]: 'xs',
    [CheckboxSize.Md]: 'sm',
    [CheckboxSize.Lg]: 'sm',
    [CheckboxSize.Xl]: 'md',
};

let nextCheckboxId = 0;
class MrCheckbox {
    inputId = `mr-checkbox-${nextCheckboxId++}`;
    label;
    _indeterminate = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_indeterminate" }] : /* istanbul ignore next */ []));
    /** Visual "mixed" state (e.g. a parent checkbox over a partially-selected list) — not user-settable by clicking. */
    set indeterminate(value) {
        this._indeterminate.set(coerceBooleanProperty(value));
    }
    get indeterminate() {
        return this._indeterminate();
    }
    _size = signal(CheckboxSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    _status = signal(CheckboxStatus.Default, /* @ts-ignore */
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
    boxClass = computed(() => checkboxBoxVariants({
        size: this._size(),
        status: this._status(),
        checked: this.checked() || this._indeterminate(),
        disabled: this._disabled(),
    }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "boxClass" }] : /* istanbul ignore next */ []));
    iconSize = computed(() => CHECKBOX_ICON_SIZE[this._size()], /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "iconSize" }] : /* istanbul ignore next */ []));
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrCheckbox, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrCheckbox, isStandalone: true, selector: "mr-checkbox", inputs: { label: "label", indeterminate: "indeterminate", size: "size", status: "status", disabled: "disabled", required: "required" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MrCheckbox),
                multi: true,
            },
        ], ngImport: i0, template: "<label [for]=\"inputId\" class=\"inline-flex cursor-pointer select-none items-center gap-xs\">\n  <span class=\"relative inline-flex\">\n    <input\n      [id]=\"inputId\"\n      type=\"checkbox\"\n      class=\"absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed\"\n      [checked]=\"checked()\"\n      [indeterminate]=\"indeterminate\"\n      [disabled]=\"disabled\"\n      [required]=\"required\"\n      [attr.aria-checked]=\"indeterminate ? 'mixed' : checked()\"\n      (change)=\"handleChange($event)\"\n      (blur)=\"onTouched()\"\n    />\n    <span [class]=\"boxClass()\" aria-hidden=\"true\">\n      @if (indeterminate) {\n        <mr-icon name=\"minus\" [size]=\"iconSize()\" />\n      } @else if (checked()) {\n        <mr-icon name=\"check\" [size]=\"iconSize()\" />\n      }\n    </span>\n  </span>\n  @if (label) {\n    <span class=\"label-2 text-neutral-700\">{{ label }}</span>\n  }\n</label>\n", dependencies: [{ kind: "component", type: MrIcon, selector: "mr-icon", inputs: ["name", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrCheckbox, decorators: [{
            type: Component,
            args: [{ selector: 'mr-checkbox', imports: [MrIcon], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MrCheckbox),
                            multi: true,
                        },
                    ], template: "<label [for]=\"inputId\" class=\"inline-flex cursor-pointer select-none items-center gap-xs\">\n  <span class=\"relative inline-flex\">\n    <input\n      [id]=\"inputId\"\n      type=\"checkbox\"\n      class=\"absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed\"\n      [checked]=\"checked()\"\n      [indeterminate]=\"indeterminate\"\n      [disabled]=\"disabled\"\n      [required]=\"required\"\n      [attr.aria-checked]=\"indeterminate ? 'mixed' : checked()\"\n      (change)=\"handleChange($event)\"\n      (blur)=\"onTouched()\"\n    />\n    <span [class]=\"boxClass()\" aria-hidden=\"true\">\n      @if (indeterminate) {\n        <mr-icon name=\"minus\" [size]=\"iconSize()\" />\n      } @else if (checked()) {\n        <mr-icon name=\"check\" [size]=\"iconSize()\" />\n      }\n    </span>\n  </span>\n  @if (label) {\n    <span class=\"label-2 text-neutral-700\">{{ label }}</span>\n  }\n</label>\n" }]
        }], propDecorators: { label: [{
                type: Input
            }], indeterminate: [{
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

export { CHECKBOX_ICON_SIZE, CheckboxSize, CheckboxStatus, MrCheckbox, checkboxBoxVariants };
//# sourceMappingURL=meridian-ui-checkbox.mjs.map
