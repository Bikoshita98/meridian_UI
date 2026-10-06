import * as i0 from '@angular/core';
import { signal, computed, forwardRef, Input, ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MrLabel } from '@meridian/ui/label';
import { tv } from 'tailwind-variants';

var InputFieldSize;
(function (InputFieldSize) {
    InputFieldSize["Xs"] = "xs";
    InputFieldSize["Sm"] = "sm";
    InputFieldSize["Md"] = "md";
    InputFieldSize["Lg"] = "lg";
    InputFieldSize["Xl"] = "xl";
})(InputFieldSize || (InputFieldSize = {}));
var InputFieldStatus;
(function (InputFieldStatus) {
    InputFieldStatus["Default"] = "default";
    InputFieldStatus["Error"] = "error";
    InputFieldStatus["Success"] = "success";
    InputFieldStatus["Warning"] = "warning";
})(InputFieldStatus || (InputFieldStatus = {}));

const inputFieldVariants = tv({
    base: 'w-full rounded-md border bg-white font-sans text-neutral-900 shadow-xs outline-none transition-colors duration-150 placeholder:text-neutral-400 focus:ring-2 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-50 disabled:text-neutral-400',
    variants: {
        size: {
            xs: 'h-7 px-sm text-xs',
            sm: 'h-8 px-sm text-sm',
            md: 'h-9 px-md text-base',
            lg: 'h-10 px-lg text-md',
            xl: 'h-12 px-xl text-lg',
        },
        status: {
            default: 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100',
            error: 'border-error-500 focus:border-error-500 focus:ring-error-100',
            success: 'border-success-500 focus:border-success-500 focus:ring-success-100',
            warning: 'border-warning-500 focus:border-warning-500 focus:ring-warning-100',
        },
    },
    defaultVariants: {
        size: InputFieldSize.Md,
        status: InputFieldStatus.Default,
    },
});
const inputFieldHelperVariants = tv({
    base: 'label-3',
    variants: {
        status: {
            default: 'text-neutral-500',
            error: 'text-error-600',
            success: 'text-success-600',
            warning: 'text-warning-600',
        },
    },
    defaultVariants: {
        status: InputFieldStatus.Default,
    },
});

let nextInputFieldId = 0;
class MrInputField {
    inputId = `mr-input-field-${nextInputFieldId++}`;
    helperId = `${this.inputId}-helper`;
    label;
    placeholder = '';
    helperText;
    type = 'text';
    _size = signal(InputFieldSize.Md, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_size" }] : /* istanbul ignore next */ []));
    set size(value) {
        this._size.set(value);
    }
    get size() {
        return this._size();
    }
    _status = signal(InputFieldStatus.Default, /* @ts-ignore */
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
    _readonly = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_readonly" }] : /* istanbul ignore next */ []));
    set readonly(value) {
        this._readonly.set(coerceBooleanProperty(value));
    }
    get readonly() {
        return this._readonly();
    }
    _required = signal(false, /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "_required" }] : /* istanbul ignore next */ []));
    set required(value) {
        this._required.set(coerceBooleanProperty(value));
    }
    get required() {
        return this._required();
    }
    value = signal('', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    inputClass = computed(() => inputFieldVariants({ size: this._size(), status: this._status() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "inputClass" }] : /* istanbul ignore next */ []));
    helperClass = computed(() => inputFieldHelperVariants({ status: this._status() }), /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "helperClass" }] : /* istanbul ignore next */ []));
    onChange = () => { };
    onTouched = () => { };
    writeValue(value) {
        this.value.set(value ?? '');
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
    handleInput(event) {
        const value = event.target.value;
        this.value.set(value);
        this.onChange(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrInputField, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "22.1.6", type: MrInputField, isStandalone: true, selector: "mr-input-field", inputs: { label: "label", placeholder: "placeholder", helperText: "helperText", type: "type", size: "size", status: "status", disabled: "disabled", readonly: "readonly", required: "required" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MrInputField),
                multi: true,
            },
        ], ngImport: i0, template: "<div class=\"flex flex-col gap-2xs\">\n  @if (label) {\n    <mr-label [for]=\"inputId\" [required]=\"required\" [disabled]=\"disabled\">{{ label }}</mr-label>\n  }\n  <input\n    [id]=\"inputId\"\n    [class]=\"inputClass()\"\n    [type]=\"type\"\n    [placeholder]=\"placeholder\"\n    [value]=\"value()\"\n    [disabled]=\"disabled\"\n    [readOnly]=\"readonly\"\n    [required]=\"required\"\n    [attr.aria-invalid]=\"status === 'error' ? 'true' : null\"\n    [attr.aria-describedby]=\"helperText ? helperId : null\"\n    (input)=\"handleInput($event)\"\n    (blur)=\"onTouched()\"\n  />\n  @if (helperText) {\n    <span [id]=\"helperId\" [class]=\"helperClass()\">{{ helperText }}</span>\n  }\n</div>\n", dependencies: [{ kind: "component", type: MrLabel, selector: "mr-label", inputs: ["for", "size", "required", "disabled"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "22.1.6", ngImport: i0, type: MrInputField, decorators: [{
            type: Component,
            args: [{ selector: 'mr-input-field', imports: [MrLabel], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => MrInputField),
                            multi: true,
                        },
                    ], template: "<div class=\"flex flex-col gap-2xs\">\n  @if (label) {\n    <mr-label [for]=\"inputId\" [required]=\"required\" [disabled]=\"disabled\">{{ label }}</mr-label>\n  }\n  <input\n    [id]=\"inputId\"\n    [class]=\"inputClass()\"\n    [type]=\"type\"\n    [placeholder]=\"placeholder\"\n    [value]=\"value()\"\n    [disabled]=\"disabled\"\n    [readOnly]=\"readonly\"\n    [required]=\"required\"\n    [attr.aria-invalid]=\"status === 'error' ? 'true' : null\"\n    [attr.aria-describedby]=\"helperText ? helperId : null\"\n    (input)=\"handleInput($event)\"\n    (blur)=\"onTouched()\"\n  />\n  @if (helperText) {\n    <span [id]=\"helperId\" [class]=\"helperClass()\">{{ helperText }}</span>\n  }\n</div>\n" }]
        }], propDecorators: { label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], helperText: [{
                type: Input
            }], type: [{
                type: Input
            }], size: [{
                type: Input
            }], status: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], required: [{
                type: Input
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { InputFieldSize, InputFieldStatus, MrInputField, inputFieldHelperVariants, inputFieldVariants };
//# sourceMappingURL=meridian-ui-input-field.mjs.map
