import * as _angular_core from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as tailwind_variants from 'tailwind-variants';
import { IconSize } from '@meridian/ui/icon';

declare enum CheckboxSize {
    Xs = "xs",
    Sm = "sm",
    Md = "md",
    Lg = "lg",
    Xl = "xl"
}
declare enum CheckboxStatus {
    Default = "default",
    Error = "error",
    Success = "success",
    Warning = "warning"
}

declare class MrCheckbox implements ControlValueAccessor {
    protected readonly inputId: string;
    label?: string;
    private readonly _indeterminate;
    /** Visual "mixed" state (e.g. a parent checkbox over a partially-selected list) — not user-settable by clicking. */
    set indeterminate(value: boolean | `${boolean}` | '');
    get indeterminate(): boolean;
    private readonly _size;
    set size(value: `${CheckboxSize}`);
    get size(): `${CheckboxSize}`;
    private readonly _status;
    set status(value: `${CheckboxStatus}`);
    get status(): `${CheckboxStatus}`;
    private readonly _disabled;
    set disabled(value: boolean | `${boolean}` | '');
    get disabled(): boolean;
    private readonly _required;
    set required(value: boolean | `${boolean}` | '');
    get required(): boolean;
    protected readonly checked: _angular_core.WritableSignal<boolean>;
    protected readonly boxClass: _angular_core.Signal<string>;
    protected readonly iconSize: _angular_core.Signal<"xs" | "sm" | "md" | "lg" | "xl">;
    private onChange;
    protected onTouched: () => void;
    writeValue(value: boolean): void;
    registerOnChange(fn: (value: boolean) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    protected handleChange(event: Event): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrCheckbox, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrCheckbox, "mr-checkbox", never, { "label": { "alias": "label"; "required": false; }; "indeterminate": { "alias": "indeterminate"; "required": false; }; "size": { "alias": "size"; "required": false; }; "status": { "alias": "status"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "required": { "alias": "required"; "required": false; }; }, {}, never, never, true, never>;
}

declare const checkboxBoxVariants: tailwind_variants.TVReturnType<{
    size: {
        xs: "h-3.5 w-3.5";
        sm: "h-4 w-4";
        md: "h-5 w-5";
        lg: "h-6 w-6";
        xl: "h-7 w-7";
    };
    status: {
        default: "border-neutral-300";
        error: "border-error-500";
        success: "border-success-500";
        warning: "border-warning-500";
    };
    checked: {
        true: "";
        false: "";
    };
    disabled: {
        true: "cursor-not-allowed border-neutral-200 bg-neutral-50 opacity-40";
        false: "cursor-pointer";
    };
}, undefined, "relative inline-flex shrink-0 items-center justify-center rounded-sm border bg-white transition-colors duration-150", {
    size: {
        xs: "h-3.5 w-3.5";
        sm: "h-4 w-4";
        md: "h-5 w-5";
        lg: "h-6 w-6";
        xl: "h-7 w-7";
    };
    status: {
        default: "border-neutral-300";
        error: "border-error-500";
        success: "border-success-500";
        warning: "border-warning-500";
    };
    checked: {
        true: "";
        false: "";
    };
    disabled: {
        true: "cursor-not-allowed border-neutral-200 bg-neutral-50 opacity-40";
        false: "cursor-pointer";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        xs: "h-3.5 w-3.5";
        sm: "h-4 w-4";
        md: "h-5 w-5";
        lg: "h-6 w-6";
        xl: "h-7 w-7";
    };
    status: {
        default: "border-neutral-300";
        error: "border-error-500";
        success: "border-success-500";
        warning: "border-warning-500";
    };
    checked: {
        true: "";
        false: "";
    };
    disabled: {
        true: "cursor-not-allowed border-neutral-200 bg-neutral-50 opacity-40";
        false: "cursor-pointer";
    };
}, undefined>>;
/** Keeps the checkmark/dash icon legible at every box size without needing its own size input. */
declare const CHECKBOX_ICON_SIZE: Record<`${CheckboxSize}`, `${IconSize}`>;

export { CHECKBOX_ICON_SIZE, CheckboxSize, CheckboxStatus, MrCheckbox, checkboxBoxVariants };
