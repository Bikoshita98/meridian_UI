import * as _angular_core from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as tailwind_variants from 'tailwind-variants';

declare enum SelectSize {
    Xs = "xs",
    Sm = "sm",
    Md = "md",
    Lg = "lg",
    Xl = "xl"
}
declare enum SelectStatus {
    Default = "default",
    Error = "error",
    Success = "success",
    Warning = "warning"
}
interface SelectOption<T = unknown> {
    label: string;
    value: T;
    disabled?: boolean;
}

declare class MrSelect<T = unknown> implements ControlValueAccessor {
    protected readonly triggerId: string;
    protected readonly helperId: string;
    private readonly triggerRef;
    label?: string;
    placeholder: string;
    helperText?: string;
    options: SelectOption<T>[];
    private readonly _size;
    set size(value: `${SelectSize}`);
    get size(): `${SelectSize}`;
    private readonly _status;
    set status(value: `${SelectStatus}`);
    get status(): `${SelectStatus}`;
    private readonly _disabled;
    set disabled(value: boolean | `${boolean}` | '');
    get disabled(): boolean;
    private readonly _required;
    set required(value: boolean | `${boolean}` | '');
    get required(): boolean;
    protected readonly isOpen: _angular_core.WritableSignal<boolean>;
    protected readonly triggerWidth: _angular_core.WritableSignal<number>;
    protected readonly value: _angular_core.WritableSignal<T | undefined>;
    protected readonly selectedOption: _angular_core.Signal<SelectOption<T> | undefined>;
    protected readonly triggerClass: _angular_core.Signal<string>;
    protected readonly valueClass: _angular_core.Signal<string>;
    protected readonly panelClass: _angular_core.Signal<string>;
    protected readonly helperClass: _angular_core.Signal<string>;
    private onChange;
    protected onTouched: () => void;
    writeValue(value: T): void;
    registerOnChange(fn: (value: T) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    protected optionClass(option: SelectOption<T>): string;
    protected toggle(): void;
    protected close(): void;
    protected selectOption(option: SelectOption<T>): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrSelect<any>, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrSelect<any>, "mr-select", never, { "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "helperText": { "alias": "helperText"; "required": false; }; "options": { "alias": "options"; "required": false; }; "size": { "alias": "size"; "required": false; }; "status": { "alias": "status"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "required": { "alias": "required"; "required": false; }; }, {}, never, never, true, never>;
}

declare const selectTriggerVariants: tailwind_variants.TVReturnType<{
    size: {
        xs: "h-7 px-sm text-xs";
        sm: "h-8 px-sm text-sm";
        md: "h-9 px-md text-base";
        lg: "h-10 px-lg text-md";
        xl: "h-12 px-xl text-lg";
    };
    status: {
        default: "border-neutral-300";
        error: "border-error-500";
        success: "border-success-500";
        warning: "border-warning-500";
    };
    open: {
        true: "ring-2";
        false: "";
    };
}, undefined, "flex w-full items-center justify-between gap-xs rounded-md border bg-white font-sans text-left text-neutral-900 shadow-xs outline-none transition-colors duration-150 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-50 disabled:text-neutral-400", {
    size: {
        xs: "h-7 px-sm text-xs";
        sm: "h-8 px-sm text-sm";
        md: "h-9 px-md text-base";
        lg: "h-10 px-lg text-md";
        xl: "h-12 px-xl text-lg";
    };
    status: {
        default: "border-neutral-300";
        error: "border-error-500";
        success: "border-success-500";
        warning: "border-warning-500";
    };
    open: {
        true: "ring-2";
        false: "";
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
        default: "border-neutral-300";
        error: "border-error-500";
        success: "border-success-500";
        warning: "border-warning-500";
    };
    open: {
        true: "ring-2";
        false: "";
    };
}, undefined>>;
declare const selectValueVariants: tailwind_variants.TVReturnType<{
    empty: {
        true: "text-neutral-400";
        false: "text-neutral-900";
    };
}, undefined, "flex-1 truncate", {
    empty: {
        true: "text-neutral-400";
        false: "text-neutral-900";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    empty: {
        true: "text-neutral-400";
        false: "text-neutral-900";
    };
}, undefined>>;
declare const selectPanelVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "max-h-64 overflow-auto rounded-md border border-neutral-200 bg-white py-2xs shadow-lg", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const selectOptionVariants: tailwind_variants.TVReturnType<{
    selected: {
        true: "bg-primary-50 text-primary-600";
        false: "hover:bg-primary-25";
    };
    disabled: {
        true: "pointer-events-none opacity-40";
        false: "";
    };
}, undefined, "cursor-pointer px-md py-xs text-base text-neutral-700 transition-colors duration-150", {
    selected: {
        true: "bg-primary-50 text-primary-600";
        false: "hover:bg-primary-25";
    };
    disabled: {
        true: "pointer-events-none opacity-40";
        false: "";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    selected: {
        true: "bg-primary-50 text-primary-600";
        false: "hover:bg-primary-25";
    };
    disabled: {
        true: "pointer-events-none opacity-40";
        false: "";
    };
}, undefined>>;
declare const selectHelperVariants: tailwind_variants.TVReturnType<{
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

export { MrSelect, SelectSize, SelectStatus, selectHelperVariants, selectOptionVariants, selectPanelVariants, selectTriggerVariants, selectValueVariants };
export type { SelectOption };
