import * as _angular_core from '@angular/core';
import * as tailwind_variants from 'tailwind-variants';

declare enum ButtonVariant {
    Filled = "filled",
    Outline = "outline",
    Ghost = "ghost",
    Link = "link"
}
declare enum ButtonColor {
    Primary = "primary",
    Secondary = "secondary",
    Neutral = "neutral",
    Success = "success",
    Warning = "warning",
    Error = "error",
    Info = "info"
}
declare enum ButtonSize {
    Xs = "xs",
    Sm = "sm",
    Md = "md",
    Lg = "lg",
    Xl = "xl"
}
declare enum ButtonShape {
    Default = "default",
    Square = "square"
}
declare enum ButtonRadius {
    None = "none",
    Sm = "sm",
    Md = "md",
    Lg = "lg",
    Pill = "pill"
}
declare enum ButtonStatus {
    Default = "default",
    Loading = "loading"
}

declare class MrButton {
    private readonly _variant;
    set variant(value: `${ButtonVariant}`);
    get variant(): `${ButtonVariant}`;
    private readonly _color;
    set color(value: `${ButtonColor}`);
    get color(): `${ButtonColor}`;
    private readonly _size;
    set size(value: `${ButtonSize}`);
    get size(): `${ButtonSize}`;
    private readonly _shape;
    set shape(value: `${ButtonShape}`);
    get shape(): `${ButtonShape}`;
    private readonly _radius;
    set radius(value: `${ButtonRadius}`);
    get radius(): `${ButtonRadius}`;
    private readonly _status;
    set status(value: `${ButtonStatus}`);
    get status(): `${ButtonStatus}`;
    private readonly _disabled;
    set disabled(value: boolean | `${boolean}` | '');
    get disabled(): boolean;
    /** Native `<button>` `type` — defaults to `button` so a button never submits a host form by accident. */
    type: 'button' | 'submit' | 'reset';
    protected readonly isLoading: _angular_core.Signal<boolean>;
    protected readonly isDisabled: _angular_core.Signal<boolean>;
    protected readonly hostClass: _angular_core.Signal<string>;
    protected readonly spinnerPx: _angular_core.Signal<string>;
    private readonly projectedIcons;
    constructor();
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrButton, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrButton, "mr-button", never, { "variant": { "alias": "variant"; "required": false; }; "color": { "alias": "color"; "required": false; }; "size": { "alias": "size"; "required": false; }; "shape": { "alias": "shape"; "required": false; }; "radius": { "alias": "radius"; "required": false; }; "status": { "alias": "status"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, {}, ["projectedIcons"], ["*"], true, never>;
}

declare const buttonVariants: tailwind_variants.TVReturnType<{
    variant: {
        filled: "border shadow-xs";
        outline: "border";
        ghost: "border";
        link: "h-auto border-none p-0 shadow-none";
    };
    color: {
        primary: "";
        secondary: "";
        neutral: "";
        success: "";
        warning: "";
        error: "";
        info: "";
    };
    size: {
        xs: "h-7 gap-3xs px-sm text-xs";
        sm: "h-8 gap-2xs px-sm text-sm";
        md: "h-9 gap-xs px-md text-base";
        lg: "h-10 gap-xs px-lg text-md";
        xl: "h-12 gap-sm px-xl text-lg";
    };
    shape: {
        default: "";
        square: "aspect-square px-0";
    };
    radius: {
        none: "rounded-none";
        sm: "rounded-sm";
        md: "rounded-md";
        lg: "rounded-lg";
        pill: "rounded-pill";
    };
    status: {
        default: "";
        loading: "cursor-wait";
    };
}, undefined, "inline-flex select-none items-center justify-center whitespace-nowrap font-sans font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:pointer-events-none disabled:opacity-40", {
    variant: {
        filled: "border shadow-xs";
        outline: "border";
        ghost: "border";
        link: "h-auto border-none p-0 shadow-none";
    };
    color: {
        primary: "";
        secondary: "";
        neutral: "";
        success: "";
        warning: "";
        error: "";
        info: "";
    };
    size: {
        xs: "h-7 gap-3xs px-sm text-xs";
        sm: "h-8 gap-2xs px-sm text-sm";
        md: "h-9 gap-xs px-md text-base";
        lg: "h-10 gap-xs px-lg text-md";
        xl: "h-12 gap-sm px-xl text-lg";
    };
    shape: {
        default: "";
        square: "aspect-square px-0";
    };
    radius: {
        none: "rounded-none";
        sm: "rounded-sm";
        md: "rounded-md";
        lg: "rounded-lg";
        pill: "rounded-pill";
    };
    status: {
        default: "";
        loading: "cursor-wait";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    variant: {
        filled: "border shadow-xs";
        outline: "border";
        ghost: "border";
        link: "h-auto border-none p-0 shadow-none";
    };
    color: {
        primary: "";
        secondary: "";
        neutral: "";
        success: "";
        warning: "";
        error: "";
        info: "";
    };
    size: {
        xs: "h-7 gap-3xs px-sm text-xs";
        sm: "h-8 gap-2xs px-sm text-sm";
        md: "h-9 gap-xs px-md text-base";
        lg: "h-10 gap-xs px-lg text-md";
        xl: "h-12 gap-sm px-xl text-lg";
    };
    shape: {
        default: "";
        square: "aspect-square px-0";
    };
    radius: {
        none: "rounded-none";
        sm: "rounded-sm";
        md: "rounded-md";
        lg: "rounded-lg";
        pill: "rounded-pill";
    };
    status: {
        default: "";
        loading: "cursor-wait";
    };
}, undefined>>;

export { ButtonColor, ButtonRadius, ButtonShape, ButtonSize, ButtonStatus, ButtonVariant, MrButton, buttonVariants };
