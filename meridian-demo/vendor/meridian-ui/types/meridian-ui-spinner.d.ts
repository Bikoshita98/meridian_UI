import * as _angular_core from '@angular/core';
import * as tailwind_variants from 'tailwind-variants';

declare enum SpinnerSize {
    Xs = "xs",
    Sm = "sm",
    Md = "md",
    Lg = "lg",
    Xl = "xl"
}
declare enum SpinnerColor {
    Primary = "primary",
    Secondary = "secondary",
    Neutral = "neutral",
    Success = "success",
    Warning = "warning",
    Error = "error",
    Info = "info"
}

declare class MrSpinner {
    private readonly _size;
    set size(value: `${SpinnerSize}`);
    get size(): `${SpinnerSize}`;
    private readonly _color;
    set color(value: `${SpinnerColor}`);
    get color(): `${SpinnerColor}`;
    /** Announced to assistive tech via `aria-label` — a spinner conveys a loading state with no visible text of its own. */
    label: string;
    protected readonly spinnerClass: _angular_core.Signal<string>;
    protected readonly spinnerPx: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrSpinner, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrSpinner, "mr-spinner", never, { "size": { "alias": "size"; "required": false; }; "color": { "alias": "color"; "required": false; }; "label": { "alias": "label"; "required": false; }; }, {}, never, never, true, never>;
}

declare const spinnerVariants: tailwind_variants.TVReturnType<{
    color: {
        primary: "text-primary-500";
        secondary: "text-secondary-500";
        neutral: "text-neutral-400";
        success: "text-success-500";
        warning: "text-warning-500";
        error: "text-error-500";
        info: "text-info-500";
    };
}, undefined, "inline-block shrink-0 animate-spin rounded-pill border-md border-current border-t-transparent", {
    color: {
        primary: "text-primary-500";
        secondary: "text-secondary-500";
        neutral: "text-neutral-400";
        success: "text-success-500";
        warning: "text-warning-500";
        error: "text-error-500";
        info: "text-info-500";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    color: {
        primary: "text-primary-500";
        secondary: "text-secondary-500";
        neutral: "text-neutral-400";
        success: "text-success-500";
        warning: "text-warning-500";
        error: "text-error-500";
        info: "text-info-500";
    };
}, undefined>>;

export { MrSpinner, SpinnerColor, SpinnerSize, spinnerVariants };
