import * as _angular_core from '@angular/core';
import { OnDestroy } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as tailwind_variants from 'tailwind-variants';

declare enum RadioSize {
    Xs = "xs",
    Sm = "sm",
    Md = "md",
    Lg = "lg",
    Xl = "xl"
}
declare enum RadioStatus {
    Default = "default",
    Error = "error",
    Success = "success",
    Warning = "warning"
}

declare class MrRadio<T = unknown> implements ControlValueAccessor, OnDestroy {
    /** Also doubles as this instance's id for `UniqueSelectionDispatcher` — see the constructor. */
    protected readonly inputId: string;
    private readonly selectionDispatcher;
    private readonly unlisten;
    label?: string;
    /** Groups radios together — must match across every `mr-radio` in the group, same as a native `name` attribute. */
    name: string;
    /** The value this particular radio represents; `writeValue` compares the model value against it. */
    value: T;
    private readonly _size;
    set size(value: `${RadioSize}`);
    get size(): `${RadioSize}`;
    private readonly _status;
    set status(value: `${RadioStatus}`);
    get status(): `${RadioStatus}`;
    private readonly _disabled;
    set disabled(value: boolean | `${boolean}` | '');
    get disabled(): boolean;
    private readonly _required;
    set required(value: boolean | `${boolean}` | '');
    get required(): boolean;
    protected readonly checked: _angular_core.WritableSignal<boolean>;
    protected readonly boxClass: _angular_core.Signal<string>;
    protected readonly dotClass: _angular_core.Signal<string>;
    private onChange;
    protected onTouched: () => void;
    constructor();
    ngOnDestroy(): void;
    writeValue(value: T): void;
    registerOnChange(fn: (value: T) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    protected handleChange(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrRadio<any>, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrRadio<any>, "mr-radio", never, { "label": { "alias": "label"; "required": false; }; "name": { "alias": "name"; "required": true; }; "value": { "alias": "value"; "required": true; }; "size": { "alias": "size"; "required": false; }; "status": { "alias": "status"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "required": { "alias": "required"; "required": false; }; }, {}, never, never, true, never>;
}

declare const radioBoxVariants: tailwind_variants.TVReturnType<{
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
}, undefined, "relative inline-flex shrink-0 items-center justify-center rounded-pill border bg-white transition-colors duration-150", {
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
declare const radioDotVariants: tailwind_variants.TVReturnType<{
    size: {
        xs: "h-1.5 w-1.5";
        sm: "h-1.5 w-1.5";
        md: "h-2 w-2";
        lg: "h-2.5 w-2.5";
        xl: "h-3 w-3";
    };
    status: {
        default: "bg-primary-500";
        error: "bg-error-500";
        success: "bg-success-500";
        warning: "bg-warning-500";
    };
}, undefined, "rounded-pill transition-colors duration-150", {
    size: {
        xs: "h-1.5 w-1.5";
        sm: "h-1.5 w-1.5";
        md: "h-2 w-2";
        lg: "h-2.5 w-2.5";
        xl: "h-3 w-3";
    };
    status: {
        default: "bg-primary-500";
        error: "bg-error-500";
        success: "bg-success-500";
        warning: "bg-warning-500";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        xs: "h-1.5 w-1.5";
        sm: "h-1.5 w-1.5";
        md: "h-2 w-2";
        lg: "h-2.5 w-2.5";
        xl: "h-3 w-3";
    };
    status: {
        default: "bg-primary-500";
        error: "bg-error-500";
        success: "bg-success-500";
        warning: "bg-warning-500";
    };
}, undefined>>;

export { MrRadio, RadioSize, RadioStatus, radioBoxVariants, radioDotVariants };
