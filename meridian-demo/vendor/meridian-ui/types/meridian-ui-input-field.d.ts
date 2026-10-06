import * as _angular_core from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as tailwind_variants from 'tailwind-variants';

declare enum InputFieldSize {
    Xs = "xs",
    Sm = "sm",
    Md = "md",
    Lg = "lg",
    Xl = "xl"
}
declare enum InputFieldStatus {
    Default = "default",
    Error = "error",
    Success = "success",
    Warning = "warning"
}

declare class MrInputField implements ControlValueAccessor {
    protected readonly inputId: string;
    protected readonly helperId: string;
    label?: string;
    placeholder: string;
    helperText?: string;
    type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'search' | 'url' | 'date';
    private readonly _size;
    set size(value: `${InputFieldSize}`);
    get size(): `${InputFieldSize}`;
    private readonly _status;
    set status(value: `${InputFieldStatus}`);
    get status(): `${InputFieldStatus}`;
    private readonly _disabled;
    set disabled(value: boolean | `${boolean}` | '');
    get disabled(): boolean;
    private readonly _readonly;
    set readonly(value: boolean | `${boolean}` | '');
    get readonly(): boolean;
    private readonly _required;
    set required(value: boolean | `${boolean}` | '');
    get required(): boolean;
    protected readonly value: _angular_core.WritableSignal<string>;
    protected readonly inputClass: _angular_core.Signal<string>;
    protected readonly helperClass: _angular_core.Signal<string>;
    private onChange;
    protected onTouched: () => void;
    writeValue(value: string): void;
    registerOnChange(fn: (value: string) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    protected handleInput(event: Event): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrInputField, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrInputField, "mr-input-field", never, { "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "helperText": { "alias": "helperText"; "required": false; }; "type": { "alias": "type"; "required": false; }; "size": { "alias": "size"; "required": false; }; "status": { "alias": "status"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "required": { "alias": "required"; "required": false; }; }, {}, never, never, true, never>;
}

declare const inputFieldVariants: tailwind_variants.TVReturnType<{
    size: {
        xs: "h-7 px-sm text-xs";
        sm: "h-8 px-sm text-sm";
        md: "h-9 px-md text-base";
        lg: "h-10 px-lg text-md";
        xl: "h-12 px-xl text-lg";
    };
    status: {
        default: "border-neutral-300 focus:border-primary-500 focus:ring-primary-100";
        error: "border-error-500 focus:border-error-500 focus:ring-error-100";
        success: "border-success-500 focus:border-success-500 focus:ring-success-100";
        warning: "border-warning-500 focus:border-warning-500 focus:ring-warning-100";
    };
}, undefined, "w-full rounded-md border bg-white font-sans text-neutral-900 shadow-xs outline-none transition-colors duration-150 placeholder:text-neutral-400 focus:ring-2 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-50 disabled:text-neutral-400", {
    size: {
        xs: "h-7 px-sm text-xs";
        sm: "h-8 px-sm text-sm";
        md: "h-9 px-md text-base";
        lg: "h-10 px-lg text-md";
        xl: "h-12 px-xl text-lg";
    };
    status: {
        default: "border-neutral-300 focus:border-primary-500 focus:ring-primary-100";
        error: "border-error-500 focus:border-error-500 focus:ring-error-100";
        success: "border-success-500 focus:border-success-500 focus:ring-success-100";
        warning: "border-warning-500 focus:border-warning-500 focus:ring-warning-100";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        xs: "h-7 px-sm text-xs";
        sm: "h-8 px-sm text-sm";
        md: "h-9 px-md text-base";
        lg: "h-10 px-lg text-md";
        xl: "h-12 px-xl text-lg";
    };
    status: {
        default: "border-neutral-300 focus:border-primary-500 focus:ring-primary-100";
        error: "border-error-500 focus:border-error-500 focus:ring-error-100";
        success: "border-success-500 focus:border-success-500 focus:ring-success-100";
        warning: "border-warning-500 focus:border-warning-500 focus:ring-warning-100";
    };
}, undefined>>;
declare const inputFieldHelperVariants: tailwind_variants.TVReturnType<{
    status: {
        default: "text-neutral-500";
        error: "text-error-600";
        success: "text-success-600";
        warning: "text-warning-600";
    };
}, undefined, "label-3", {
    status: {
        default: "text-neutral-500";
        error: "text-error-600";
        success: "text-success-600";
        warning: "text-warning-600";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    status: {
        default: "text-neutral-500";
        error: "text-error-600";
        success: "text-success-600";
        warning: "text-warning-600";
    };
}, undefined>>;

export { InputFieldSize, InputFieldStatus, MrInputField, inputFieldHelperVariants, inputFieldVariants };
