import * as _angular_core from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as tailwind_variants from 'tailwind-variants';

declare enum ToggleSize {
    Xs = "xs",
    Sm = "sm",
    Md = "md",
    Lg = "lg",
    Xl = "xl"
}
declare enum ToggleStatus {
    Default = "default",
    Error = "error",
    Success = "success",
    Warning = "warning"
}

declare class MrToggle implements ControlValueAccessor {
    protected readonly inputId: string;
    label?: string;
    private readonly _size;
    set size(value: `${ToggleSize}`);
    get size(): `${ToggleSize}`;
    private readonly _status;
    set status(value: `${ToggleStatus}`);
    get status(): `${ToggleStatus}`;
    private readonly _disabled;
    set disabled(value: boolean | `${boolean}` | '');
    get disabled(): boolean;
    private readonly _required;
    set required(value: boolean | `${boolean}` | '');
    get required(): boolean;
    protected readonly checked: _angular_core.WritableSignal<boolean>;
    protected readonly trackClass: _angular_core.Signal<string>;
    protected readonly thumbClass: _angular_core.Signal<string>;
    private onChange;
    protected onTouched: () => void;
    writeValue(value: boolean): void;
    registerOnChange(fn: (value: boolean) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    protected handleChange(event: Event): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrToggle, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrToggle, "mr-toggle", never, { "label": { "alias": "label"; "required": false; }; "size": { "alias": "size"; "required": false; }; "status": { "alias": "status"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "required": { "alias": "required"; "required": false; }; }, {}, never, never, true, never>;
}

declare const toggleTrackVariants: tailwind_variants.TVReturnType<{
    size: {
        xs: "h-4 w-7";
        sm: "h-5 w-9";
        md: "h-6 w-10";
        lg: "h-7 w-12";
        xl: "h-8 w-14";
    };
    status: {
        default: "";
        error: "";
        success: "";
        warning: "";
    };
    checked: {
        true: "";
        false: "";
    };
    disabled: {
        true: "cursor-not-allowed opacity-40";
        false: "cursor-pointer";
    };
}, undefined, "relative inline-flex shrink-0 items-center rounded-pill border border-neutral-300 bg-neutral-200 transition-colors duration-150", {
    size: {
        xs: "h-4 w-7";
        sm: "h-5 w-9";
        md: "h-6 w-10";
        lg: "h-7 w-12";
        xl: "h-8 w-14";
    };
    status: {
        default: "";
        error: "";
        success: "";
        warning: "";
    };
    checked: {
        true: "";
        false: "";
    };
    disabled: {
        true: "cursor-not-allowed opacity-40";
        false: "cursor-pointer";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        xs: "h-4 w-7";
        sm: "h-5 w-9";
        md: "h-6 w-10";
        lg: "h-7 w-12";
        xl: "h-8 w-14";
    };
    status: {
        default: "";
        error: "";
        success: "";
        warning: "";
    };
    checked: {
        true: "";
        false: "";
    };
    disabled: {
        true: "cursor-not-allowed opacity-40";
        false: "cursor-pointer";
    };
}, undefined>>;
declare const toggleThumbVariants: tailwind_variants.TVReturnType<{
    size: {
        xs: "h-3 w-3";
        sm: "h-4 w-4";
        md: "h-5 w-5";
        lg: "h-6 w-6";
        xl: "h-7 w-7";
    };
    checked: {
        true: "";
        false: "";
    };
}, undefined, "pointer-events-none absolute left-0.5 top-1/2 -translate-y-1/2 rounded-pill bg-white shadow-sm transition-transform duration-150", {
    size: {
        xs: "h-3 w-3";
        sm: "h-4 w-4";
        md: "h-5 w-5";
        lg: "h-6 w-6";
        xl: "h-7 w-7";
    };
    checked: {
        true: "";
        false: "";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        xs: "h-3 w-3";
        sm: "h-4 w-4";
        md: "h-5 w-5";
        lg: "h-6 w-6";
        xl: "h-7 w-7";
    };
    checked: {
        true: "";
        false: "";
    };
}, undefined>>;

export { MrToggle, ToggleSize, ToggleStatus, toggleThumbVariants, toggleTrackVariants };
