import * as _angular_core from '@angular/core';
import { AfterViewInit, OnDestroy, EventEmitter, OnInit } from '@angular/core';
import * as tailwind_variants from 'tailwind-variants';
import { ControlValueAccessor } from '@angular/forms';
import { IconSize as IconSize$1, MrIconName as MrIconName$1 } from '@meridian/ui/icon';
import { FocusableOption } from '@angular/cdk/a11y';
import * as _angular_cdk_overlay from '@angular/cdk/overlay';
import { ConnectedPosition } from '@angular/cdk/overlay';

declare enum AvatarSize {
    Xs = "xs",
    Sm = "sm",
    Md = "md",
    Lg = "lg",
    Xl = "xl"
}
declare enum AvatarShape {
    Circle = "circle",
    Square = "square"
}

declare class MrAvatar {
    private readonly _src;
    set src(value: string | undefined);
    get src(): string | undefined;
    private readonly _alt;
    set alt(value: string);
    get alt(): string;
    private readonly _name;
    set name(value: string | undefined);
    get name(): string | undefined;
    private readonly _initials;
    set initials(value: string | undefined);
    get initials(): string | undefined;
    private readonly _size;
    set size(value: `${AvatarSize}`);
    get size(): `${AvatarSize}`;
    private readonly _shape;
    set shape(value: `${AvatarShape}`);
    get shape(): `${AvatarShape}`;
    private readonly _imgError;
    protected readonly avatarClass: _angular_core.Signal<string>;
    protected readonly resolvedAlt: _angular_core.Signal<string>;
    protected readonly resolvedInitials: _angular_core.Signal<string>;
    protected readonly showImage: _angular_core.Signal<boolean>;
    protected onImageError(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrAvatar, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrAvatar, "mr-avatar", never, { "src": { "alias": "src"; "required": false; }; "alt": { "alias": "alt"; "required": false; }; "name": { "alias": "name"; "required": false; }; "initials": { "alias": "initials"; "required": false; }; "size": { "alias": "size"; "required": false; }; "shape": { "alias": "shape"; "required": false; }; }, {}, never, never, true, never>;
}

declare const avatarVariants: tailwind_variants.TVReturnType<{
    size: {
        xs: "h-7 w-7 text-2xs";
        sm: "h-8 w-8 text-xs";
        md: "h-9 w-9 text-sm";
        lg: "h-10 w-10 text-base";
        xl: "h-12 w-12 text-lg";
    };
    shape: {
        circle: "rounded-pill";
        square: "rounded-lg";
    };
}, undefined, "inline-flex select-none items-center justify-center overflow-hidden bg-neutral-100 font-sans font-medium leading-none text-neutral-600", {
    size: {
        xs: "h-7 w-7 text-2xs";
        sm: "h-8 w-8 text-xs";
        md: "h-9 w-9 text-sm";
        lg: "h-10 w-10 text-base";
        xl: "h-12 w-12 text-lg";
    };
    shape: {
        circle: "rounded-pill";
        square: "rounded-lg";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        xs: "h-7 w-7 text-2xs";
        sm: "h-8 w-8 text-xs";
        md: "h-9 w-9 text-sm";
        lg: "h-10 w-10 text-base";
        xl: "h-12 w-12 text-lg";
    };
    shape: {
        circle: "rounded-pill";
        square: "rounded-lg";
    };
}, undefined>>;

declare enum BadgeVariant {
    Filled = "filled",
    Outline = "outline"
}
declare enum BadgeColor {
    Primary = "primary",
    Secondary = "secondary",
    Neutral = "neutral",
    Success = "success",
    Warning = "warning",
    Error = "error",
    Info = "info"
}

declare class MrBadge {
    private readonly _variant;
    set variant(value: `${BadgeVariant}`);
    get variant(): `${BadgeVariant}`;
    private readonly _color;
    set color(value: `${BadgeColor}`);
    get color(): `${BadgeColor}`;
    protected readonly badgeClass: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrBadge, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrBadge, "mr-badge", never, { "variant": { "alias": "variant"; "required": false; }; "color": { "alias": "color"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare const badgeVariants: tailwind_variants.TVReturnType<{
    variant: {
        filled: "";
        outline: "";
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
}, undefined, "inline-flex items-center gap-3xs whitespace-nowrap rounded-pill border px-sm py-3xs font-sans text-xs font-medium leading-none", {
    variant: {
        filled: "";
        outline: "";
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
}, undefined, tailwind_variants.TVReturnTypeLike<{
    variant: {
        filled: "";
        outline: "";
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
}, undefined>>;

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

declare enum CardVariant {
    Elevated = "elevated",
    Outlined = "outlined"
}
declare enum CardPadding {
    None = "none",
    Sm = "sm",
    Md = "md",
    Lg = "lg"
}

declare class MrCard {
    private readonly _variant;
    set variant(value: `${CardVariant}`);
    get variant(): `${CardVariant}`;
    private readonly _padding;
    set padding(value: `${CardPadding}`);
    get padding(): `${CardPadding}`;
    protected readonly cardClass: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrCard, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrCard, "mr-card", never, { "variant": { "alias": "variant"; "required": false; }; "padding": { "alias": "padding"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare const cardVariants: tailwind_variants.TVReturnType<{
    variant: {
        elevated: "border border-neutral-100 shadow-md";
        outlined: "border border-neutral-200";
    };
    padding: {
        none: "p-0";
        sm: "p-lg";
        md: "p-xl";
        lg: "p-2xl";
    };
}, undefined, "rounded-lg bg-white", {
    variant: {
        elevated: "border border-neutral-100 shadow-md";
        outlined: "border border-neutral-200";
    };
    padding: {
        none: "p-0";
        sm: "p-lg";
        md: "p-xl";
        lg: "p-2xl";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    variant: {
        elevated: "border border-neutral-100 shadow-md";
        outlined: "border border-neutral-200";
    };
    padding: {
        none: "p-0";
        sm: "p-lg";
        md: "p-xl";
        lg: "p-2xl";
    };
}, undefined>>;

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
declare const CHECKBOX_ICON_SIZE: Record<`${CheckboxSize}`, `${IconSize$1}`>;

/** One item inside an `<mr-dropdown>` panel. Implements `FocusableOption` so `MrDropdown`'s `FocusKeyManager` can move focus onto it. */
declare class MrDropdownItem implements FocusableOption {
    private readonly buttonRef;
    private readonly _disabled;
    set disabled(value: boolean | `${boolean}` | '');
    get disabled(): boolean;
    protected readonly itemClass: _angular_core.Signal<string>;
    focus(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrDropdownItem, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrDropdownItem, "mr-dropdown-item", never, { "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare enum DropdownPosition {
    BottomStart = "bottom-start",
    BottomEnd = "bottom-end",
    TopStart = "top-start",
    TopEnd = "top-end"
}

declare class MrDropdown {
    private readonly injector;
    private readonly _position;
    set position(value: `${DropdownPosition}`);
    get position(): `${DropdownPosition}`;
    protected readonly isOpen: _angular_core.WritableSignal<boolean>;
    protected readonly positions: _angular_core.Signal<_angular_cdk_overlay.ConnectedPosition[]>;
    protected readonly panelClass: _angular_core.Signal<string>;
    protected readonly items: _angular_core.Signal<readonly MrDropdownItem[]>;
    private readonly keyManager;
    protected toggle(): void;
    protected open(): void;
    protected close(): void;
    protected handleMenuKeydown(event: KeyboardEvent): void;
    protected handlePanelClick(event: MouseEvent): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrDropdown, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrDropdown, "mr-dropdown", never, { "position": { "alias": "position"; "required": false; }; }, {}, ["items"], ["*", "mr-dropdown-item"], true, never>;
}

declare const dropdownPanelVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "min-w-40 rounded-md border border-neutral-200 bg-white p-3xs shadow-lg", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const dropdownItemVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "flex w-full items-center gap-xs rounded-sm px-sm py-xs text-left font-sans text-base text-neutral-700 outline-none transition-colors duration-150 hover:bg-primary-25 focus-visible:bg-primary-25 disabled:cursor-not-allowed disabled:text-neutral-300 disabled:hover:bg-transparent", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
/** Each position tries its preferred side first, then falls back to flipping vertically if it doesn't fit. */
declare const DROPDOWN_POSITIONS: Record<`${DropdownPosition}`, ConnectedPosition[]>;

declare enum IconSize {
    Xs = "xs",
    Sm = "sm",
    Md = "md",
    Lg = "lg",
    Xl = "xl"
}

/**
 * The curated set of icons available as `<mr-icon name="...">` across the library.
 * Consumers register these once via `provideMeridianIcons()` in their app config — ng-icons
 * then tree-shakes away anything not referenced, so this is the one place a new icon is added.
 */
declare const MERIDIAN_ICONS: {
    readonly chevronDown: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><path d=\"m6 9 6 6 6-6\"></path></svg>";
    readonly chevronUp: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><path d=\"m18 15-6-6-6 6\"></path></svg>";
    readonly chevronLeft: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><path d=\"m15 18-6-6 6-6\"></path></svg>";
    readonly chevronRight: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><path d=\"m9 18 6-6-6-6\"></path></svg>";
    readonly check: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><path d=\"M20 6 9 17l-5-5\"></path></svg>";
    readonly x: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><path d=\"M18 6 6 18\"></path><path d=\"m6 6 12 12\"></path></svg>";
    readonly alertCircle: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\"></line><line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\"></line></svg>";
    readonly alertTriangle: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"></path><path d=\"M12 9v4\"></path><path d=\"M12 17h.01\"></path></svg>";
    readonly info: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M12 16v-4\"></path><path d=\"M12 8h.01\"></path></svg>";
    readonly loader: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><path d=\"M21 12a9 9 0 1 1-6.219-8.56\"></path></svg>";
    readonly search: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><path d=\"m21 21-4.34-4.34\"></path><circle cx=\"11\" cy=\"11\" r=\"8\"></circle></svg>";
    readonly eye: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\"></path><circle cx=\"12\" cy=\"12\" r=\"3\"></circle></svg>";
    readonly eyeOff: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><path d=\"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49\"></path><path d=\"M14.084 14.158a3 3 0 0 1-4.242-4.242\"></path><path d=\"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143\"></path><path d=\"m2 2 20 20\"></path></svg>";
    readonly link: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><path d=\"M9 17H7A5 5 0 0 1 7 7h2\"></path><path d=\"M15 7h2a5 5 0 1 1 0 10h-2\"></path><line x1=\"8\" x2=\"16\" y1=\"12\" y2=\"12\"></line></svg>";
    readonly calendar: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><path d=\"M8 2v4\"></path><path d=\"M16 2v4\"></path><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"></rect><path d=\"M3 10h18\"></path></svg>";
    readonly plus: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><path d=\"M5 12h14\"></path><path d=\"M12 5v14\"></path></svg>";
    readonly minus: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><path d=\"M5 12h14\"></path></svg>";
    readonly moreHorizontal: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><circle cx=\"12\" cy=\"12\" r=\"1\"></circle><circle cx=\"19\" cy=\"12\" r=\"1\"></circle><circle cx=\"5\" cy=\"12\" r=\"1\"></circle></svg>";
    readonly star: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\"></path></svg>";
    readonly circle: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle></svg>";
    readonly square: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"stroke-width:var(--ng-icon__stroke-width, 2)\"><rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"></rect></svg>";
};
type MrIconName = keyof typeof MERIDIAN_ICONS;
/** Register once in the consuming app's providers (bootstrapApplication or root NgModule). */
declare function provideMeridianIcons(): _angular_core.Provider[];

declare class MrIcon {
    name: MrIconName;
    private readonly _size;
    set size(value: `${IconSize}`);
    get size(): `${IconSize}`;
    protected readonly wrapperClass: _angular_core.Signal<string>;
    protected readonly pixelSize: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrIcon, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrIcon, "mr-icon", never, { "name": { "alias": "name"; "required": true; }; "size": { "alias": "size"; "required": false; }; }, {}, never, never, true, never>;
}

declare const iconVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "inline-flex shrink-0 items-center justify-center leading-none", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
/** Pixel size handed to `ng-icon`'s `size` input, keyed by the same enum as every other component. */
declare const ICON_SIZE_PX: Record<`${IconSize}`, number>;

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

declare enum LabelSize {
    Sm = "sm",
    Md = "md",
    Lg = "lg"
}

declare class MrLabel {
    /** Mirrors the native `<label for>` attribute — pass the id of the control this labels. */
    for?: string;
    private readonly _size;
    set size(value: `${LabelSize}`);
    get size(): `${LabelSize}`;
    private readonly _required;
    set required(value: boolean | `${boolean}` | '');
    get required(): boolean;
    private readonly _disabled;
    set disabled(value: boolean | `${boolean}` | '');
    get disabled(): boolean;
    protected readonly hostClass: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrLabel, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrLabel, "mr-label", never, { "for": { "alias": "for"; "required": false; }; "size": { "alias": "size"; "required": false; }; "required": { "alias": "required"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare const labelVariants: tailwind_variants.TVReturnType<{
    size: {
        lg: "label-1";
        md: "label-2";
        sm: "label-3";
    };
    disabled: {
        true: "opacity-40";
        false: "";
    };
}, undefined, "inline-flex select-none items-center gap-3xs font-sans text-neutral-600", {
    size: {
        lg: "label-1";
        md: "label-2";
        sm: "label-3";
    };
    disabled: {
        true: "opacity-40";
        false: "";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        lg: "label-1";
        md: "label-2";
        sm: "label-3";
    };
    disabled: {
        true: "opacity-40";
        false: "";
    };
}, undefined>>;

declare enum ModalSize {
    Sm = "sm",
    Md = "md",
    Lg = "lg",
    Xl = "xl"
}

declare class MrModal implements AfterViewInit, OnDestroy {
    private readonly overlay;
    private readonly viewContainerRef;
    private readonly modalTemplate;
    private readonly _open;
    set open(value: boolean);
    get open(): boolean;
    readonly openChange: EventEmitter<boolean>;
    /** Allows disabling backdrop-click-to-close for "must choose an option" modals. */
    dismissible: boolean;
    private readonly _size;
    set size(value: `${ModalSize}`);
    get size(): `${ModalSize}`;
    protected readonly panelClass: _angular_core.Signal<string>;
    private overlayRef?;
    private previouslyFocusedElement?;
    private viewReady;
    constructor();
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    protected close(): void;
    private attach;
    private detach;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrModal, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrModal, "mr-modal", never, { "open": { "alias": "open"; "required": false; }; "dismissible": { "alias": "dismissible"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, { "openChange": "openChange"; }, never, ["*"], true, never>;
}

declare const modalPanelVariants: tailwind_variants.TVReturnType<{
    size: {
        sm: "max-w-sm";
        md: "max-w-md";
        lg: "max-w-lg";
        xl: "max-w-xl";
    };
}, undefined, "w-full rounded-lg bg-white p-lg shadow-2xl outline-none", {
    size: {
        sm: "max-w-sm";
        md: "max-w-md";
        lg: "max-w-lg";
        xl: "max-w-xl";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        sm: "max-w-sm";
        md: "max-w-md";
        lg: "max-w-lg";
        xl: "max-w-xl";
    };
}, undefined>>;

declare enum PaginationSize {
    Xs = "xs",
    Sm = "sm",
    Md = "md",
    Lg = "lg",
    Xl = "xl"
}

type PageItem = number | 'ellipsis';
declare class MrPagination {
    private readonly _page;
    set page(value: number);
    get page(): number;
    readonly pageChange: EventEmitter<number>;
    private readonly _totalPages;
    set totalPages(value: number);
    get totalPages(): number;
    private readonly _size;
    set size(value: `${PaginationSize}`);
    get size(): `${PaginationSize}`;
    protected readonly navClass: _angular_core.Signal<string>;
    protected readonly ellipsisClass: _angular_core.Signal<string>;
    protected readonly pageItems: _angular_core.Signal<PageItem[]>;
    protected readonly isFirstPage: _angular_core.Signal<boolean>;
    protected readonly isLastPage: _angular_core.Signal<boolean>;
    protected pageButtonClass(item: number): string;
    protected navButtonClass(): string;
    protected goTo(target: number): void;
    protected prev(): void;
    protected next(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrPagination, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrPagination, "mr-pagination", never, { "page": { "alias": "page"; "required": false; }; "totalPages": { "alias": "totalPages"; "required": true; }; "size": { "alias": "size"; "required": false; }; }, { "pageChange": "pageChange"; }, never, never, true, never>;
}

declare const paginationNavVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "inline-flex items-center gap-2xs", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const paginationButtonVariants: tailwind_variants.TVReturnType<{
    size: {
        xs: "h-7 w-7 text-xs";
        sm: "h-8 w-8 text-sm";
        md: "h-9 w-9 text-base";
        lg: "h-10 w-10 text-md";
        xl: "h-12 w-12 text-lg";
    };
    active: {
        true: "border-transparent bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-600";
        false: "";
    };
}, undefined, "inline-flex select-none items-center justify-center whitespace-nowrap rounded-md border border-transparent font-sans font-medium text-neutral-600 transition-colors duration-150 hover:bg-neutral-50 active:bg-neutral-100 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:pointer-events-none disabled:opacity-40", {
    size: {
        xs: "h-7 w-7 text-xs";
        sm: "h-8 w-8 text-sm";
        md: "h-9 w-9 text-base";
        lg: "h-10 w-10 text-md";
        xl: "h-12 w-12 text-lg";
    };
    active: {
        true: "border-transparent bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-600";
        false: "";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        xs: "h-7 w-7 text-xs";
        sm: "h-8 w-8 text-sm";
        md: "h-9 w-9 text-base";
        lg: "h-10 w-10 text-md";
        xl: "h-12 w-12 text-lg";
    };
    active: {
        true: "border-transparent bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-600";
        false: "";
    };
}, undefined>>;
declare const paginationEllipsisVariants: tailwind_variants.TVReturnType<{
    size: {
        xs: "h-7 w-7";
        sm: "h-8 w-8";
        md: "h-9 w-9";
        lg: "h-10 w-10";
        xl: "h-12 w-12";
    };
}, undefined, "inline-flex select-none items-center justify-center text-neutral-400", {
    size: {
        xs: "h-7 w-7";
        sm: "h-8 w-8";
        md: "h-9 w-9";
        lg: "h-10 w-10";
        xl: "h-12 w-12";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        xs: "h-7 w-7";
        sm: "h-8 w-8";
        md: "h-9 w-9";
        lg: "h-10 w-10";
        xl: "h-12 w-12";
    };
}, undefined>>;

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

declare enum TableSize {
    Sm = "sm",
    Md = "md",
    Lg = "lg"
}
type TableAlign = 'left' | 'center' | 'right';
type TableSortDirection = 'asc' | 'desc';
interface TableColumn<T> {
    key: keyof T;
    header: string;
    sortable?: boolean;
    align?: TableAlign;
}
interface TableSortEvent<T> {
    key: keyof T;
    direction: TableSortDirection;
}

declare class MrTable<T = unknown> {
    private readonly _columns;
    set columns(value: TableColumn<T>[]);
    get columns(): TableColumn<T>[];
    private readonly _rows;
    set rows(value: T[]);
    get rows(): T[];
    emptyMessage: string;
    private readonly _size;
    set size(value: `${TableSize}`);
    get size(): `${TableSize}`;
    readonly sortChange: EventEmitter<TableSortEvent<T>>;
    private readonly _sortKey;
    private readonly _sortDirection;
    protected readonly wrapperClass: _angular_core.Signal<string>;
    protected readonly tableClass: _angular_core.Signal<string>;
    protected readonly headerRowClass: _angular_core.Signal<string>;
    protected readonly bodyRowClass: _angular_core.Signal<string>;
    protected readonly emptyCellClass: _angular_core.Signal<string>;
    protected readonly sortedRows: _angular_core.Signal<T[]>;
    protected headerCellClass(column: TableColumn<T>): string;
    protected cellClass(column: TableColumn<T>): string;
    protected sortDirectionFor(column: TableColumn<T>): TableSortDirection | null;
    protected ariaSortFor(column: TableColumn<T>): 'ascending' | 'descending' | 'none';
    protected toggleSort(column: TableColumn<T>): void;
    private resolveAlign;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrTable<any>, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrTable<any>, "mr-table", never, { "columns": { "alias": "columns"; "required": true; }; "rows": { "alias": "rows"; "required": false; }; "emptyMessage": { "alias": "emptyMessage"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, { "sortChange": "sortChange"; }, never, never, true, never>;
}

declare const tableWrapperVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "w-full overflow-x-auto rounded-lg border border-neutral-200", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const tableVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "w-full border-collapse text-left", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const tableHeaderRowVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "border-b border-neutral-200 bg-neutral-25", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const tableBodyRowVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "border-b border-neutral-100 last:border-b-0 hover:bg-neutral-25", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const tableHeaderCellVariants: tailwind_variants.TVReturnType<{
    size: {
        sm: "px-sm py-2xs text-xs";
        md: "px-md py-xs text-sm";
        lg: "px-lg py-sm text-base";
    };
    align: {
        left: "text-left";
        center: "text-center";
        right: "text-right";
    };
    sortable: {
        true: "cursor-pointer select-none hover:text-neutral-700";
        false: "";
    };
}, undefined, "whitespace-nowrap font-sans font-medium text-neutral-500", {
    size: {
        sm: "px-sm py-2xs text-xs";
        md: "px-md py-xs text-sm";
        lg: "px-lg py-sm text-base";
    };
    align: {
        left: "text-left";
        center: "text-center";
        right: "text-right";
    };
    sortable: {
        true: "cursor-pointer select-none hover:text-neutral-700";
        false: "";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        sm: "px-sm py-2xs text-xs";
        md: "px-md py-xs text-sm";
        lg: "px-lg py-sm text-base";
    };
    align: {
        left: "text-left";
        center: "text-center";
        right: "text-right";
    };
    sortable: {
        true: "cursor-pointer select-none hover:text-neutral-700";
        false: "";
    };
}, undefined>>;
declare const tableCellVariants: tailwind_variants.TVReturnType<{
    size: {
        sm: "px-sm py-2xs text-xs";
        md: "px-md py-xs text-sm";
        lg: "px-lg py-sm text-base";
    };
    align: {
        left: "text-left";
        center: "text-center";
        right: "text-right";
    };
}, undefined, "whitespace-nowrap font-sans text-neutral-700", {
    size: {
        sm: "px-sm py-2xs text-xs";
        md: "px-md py-xs text-sm";
        lg: "px-lg py-sm text-base";
    };
    align: {
        left: "text-left";
        center: "text-center";
        right: "text-right";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        sm: "px-sm py-2xs text-xs";
        md: "px-md py-xs text-sm";
        lg: "px-lg py-sm text-base";
    };
    align: {
        left: "text-left";
        center: "text-center";
        right: "text-right";
    };
}, undefined>>;

/**
 * One tab within an `<mr-tabs>`. Renders nothing on its own — `MrTabs` reads `label`/`disabled`
 * off each projected `MrTab` to build the tab-list row, and sets `active` on the one it selects.
 */
declare class MrTab {
    /** Public (not `protected`) — `MrTabs`' template reads these off each projected child. */
    readonly tabId: string;
    readonly panelId: string;
    label: string;
    private readonly _disabled;
    set disabled(value: boolean | `${boolean}` | '');
    get disabled(): boolean;
    private readonly _active;
    /** Set by the parent `MrTabs` — not meant to be bound directly by a consumer. */
    set active(value: boolean);
    get active(): boolean;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrTab, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrTab, "mr-tab", never, { "label": { "alias": "label"; "required": true; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare enum TabsSize {
    Xs = "xs",
    Sm = "sm",
    Md = "md",
    Lg = "lg",
    Xl = "xl"
}

declare class MrTabs {
    private readonly _selected;
    set selected(value: number);
    get selected(): number;
    readonly selectedChange: EventEmitter<number>;
    private readonly _size;
    set size(value: `${TabsSize}`);
    get size(): `${TabsSize}`;
    protected readonly tabs: _angular_core.Signal<readonly MrTab[]>;
    protected readonly listClass: _angular_core.Signal<string>;
    constructor();
    protected tabButtonClass(index: number): string;
    protected select(index: number): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrTabs, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrTabs, "mr-tabs", never, { "selected": { "alias": "selected"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, { "selectedChange": "selectedChange"; }, ["tabs"], ["*"], true, never>;
}

declare const tabsListVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "flex items-center gap-lg border-b border-neutral-200", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const tabButtonVariants: tailwind_variants.TVReturnType<{
    size: {
        xs: "py-3xs text-xs";
        sm: "py-2xs text-sm";
        md: "py-xs text-base";
        lg: "py-sm text-md";
        xl: "py-md text-lg";
    };
    selected: {
        true: "";
        false: "";
    };
}, undefined, "relative -mb-px whitespace-nowrap border-b-2 border-transparent font-sans font-medium text-neutral-500 outline-none transition-colors duration-150 hover:text-neutral-700 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:text-neutral-300 disabled:hover:text-neutral-300", {
    size: {
        xs: "py-3xs text-xs";
        sm: "py-2xs text-sm";
        md: "py-xs text-base";
        lg: "py-sm text-md";
        xl: "py-md text-lg";
    };
    selected: {
        true: "";
        false: "";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    size: {
        xs: "py-3xs text-xs";
        sm: "py-2xs text-sm";
        md: "py-xs text-base";
        lg: "py-sm text-md";
        xl: "py-md text-lg";
    };
    selected: {
        true: "";
        false: "";
    };
}, undefined>>;

declare enum ToastStatus {
    Info = "info",
    Success = "success",
    Warning = "warning",
    Error = "error"
}
interface ToastOptions {
    status?: `${ToastStatus}`;
    /** Milliseconds before auto-dismissing. `0` (or omitted with a falsy override) means "no auto-dismiss". */
    duration?: number;
}
interface ToastRef {
    id: number;
    message: string;
    status: `${ToastStatus}`;
    duration: number;
}

/**
 * Toasts are triggered imperatively from anywhere in an app (a click handler, an HTTP error
 * interceptor, ...), not placed in a template like every other component — so this is a service,
 * not a component. Mount an `<mr-toast-container>` once (e.g. at the app root) to actually render
 * whatever this service queues up.
 */
declare class MrToastService {
    private readonly _toasts;
    readonly toasts: _angular_core.Signal<ToastRef[]>;
    private nextId;
    /** Returns the new toast's id, so a caller can `dismiss()` it early if it needs to. */
    show(message: string, options?: ToastOptions): number;
    dismiss(id: number): void;
    clear(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrToastService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<any>;
}

/**
 * Mount exactly one of these (e.g. at the app root) to render whatever `MrToastService` queues
 * up. Built on CDK Overlay's imperative API, same as `modal` — not for a backdrop or connected
 * positioning (a toast needs neither), but so it shares the same overlay stacking layer and
 * reliably renders above a `modal`/`dropdown`/`select` panel rather than under one.
 */
declare class MrToastContainer implements OnInit, OnDestroy {
    private readonly overlay;
    private readonly viewContainerRef;
    protected readonly toastService: MrToastService;
    private readonly containerTemplate;
    protected readonly listClass: string;
    private overlayRef?;
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected dismiss(id: number): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrToastContainer, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrToastContainer, "mr-toast-container", never, {}, {}, never, never, true, never>;
}

declare class MrToast implements OnInit, OnDestroy {
    toast: ToastRef;
    readonly dismissed: EventEmitter<void>;
    protected readonly messageClass: string;
    protected readonly closeButtonClass: string;
    private timeoutId?;
    protected toastClass(): string;
    protected iconClass(): string;
    protected iconName(): MrIconName$1;
    protected role(): 'alert' | 'status';
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected dismiss(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrToast, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrToast, "mr-toast", never, { "toast": { "alias": "toast"; "required": true; }; }, { "dismissed": "dismissed"; }, never, never, true, never>;
}

declare const toastVariants: tailwind_variants.TVReturnType<{
    status: {
        info: "border-info-300";
        success: "border-success-300";
        warning: "border-warning-300";
        error: "border-error-300";
    };
}, undefined, "pointer-events-auto flex w-80 items-start gap-xs rounded-lg border bg-white p-md shadow-lg", {
    status: {
        info: "border-info-300";
        success: "border-success-300";
        warning: "border-warning-300";
        error: "border-error-300";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    status: {
        info: "border-info-300";
        success: "border-success-300";
        warning: "border-warning-300";
        error: "border-error-300";
    };
}, undefined>>;
declare const toastIconVariants: tailwind_variants.TVReturnType<{
    status: {
        info: "text-info-500";
        success: "text-success-500";
        warning: "text-warning-500";
        error: "text-error-500";
    };
}, undefined, "mt-3xs shrink-0", {
    status: {
        info: "text-info-500";
        success: "text-success-500";
        warning: "text-warning-500";
        error: "text-error-500";
    };
}, undefined, tailwind_variants.TVReturnTypeLike<{
    status: {
        info: "text-info-500";
        success: "text-success-500";
        warning: "text-warning-500";
        error: "text-error-500";
    };
}, undefined>>;
declare const toastMessageVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "flex-1 pt-3xs text-sm text-neutral-700", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const toastCloseButtonVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "mt-3xs shrink-0 rounded-sm text-neutral-400 transition-colors duration-150 hover:text-neutral-600 focus-visible:outline focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-primary-500", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
declare const toastListVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "pointer-events-none flex flex-col gap-sm", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;

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

declare enum TooltipPosition {
    Top = "top",
    Bottom = "bottom",
    Left = "left",
    Right = "right"
}

declare class MrTooltip implements OnDestroy {
    protected readonly tooltipId: string;
    text: string;
    /** Delay in ms before showing on hover — avoids flicker when the pointer just passes over the trigger. */
    showDelay: number;
    /** Delay in ms before hiding on mouse-leave. */
    hideDelay: number;
    private readonly _position;
    set position(value: `${TooltipPosition}`);
    get position(): `${TooltipPosition}`;
    protected readonly isOpen: _angular_core.WritableSignal<boolean>;
    protected readonly positions: _angular_core.Signal<_angular_cdk_overlay.ConnectedPosition[]>;
    protected readonly panelClass: _angular_core.Signal<string>;
    private showTimeoutId?;
    private hideTimeoutId?;
    ngOnDestroy(): void;
    protected scheduleShow(): void;
    protected scheduleHide(): void;
    /** Immediate, no delay — used for focus/blur/Escape so keyboard users never wait on it. */
    protected show(): void;
    protected hide(): void;
    private clearTimeouts;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MrTooltip, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MrTooltip, "mr-tooltip", never, { "text": { "alias": "text"; "required": true; }; "showDelay": { "alias": "showDelay"; "required": false; }; "hideDelay": { "alias": "hideDelay"; "required": false; }; "position": { "alias": "position"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare const tooltipPanelVariants: tailwind_variants.TVReturnType<{} | {} | {}, undefined, "pointer-events-none max-w-xs rounded-sm bg-neutral-600 px-sm py-2xs font-sans text-xs text-white shadow-md", {} | {}, undefined, tailwind_variants.TVReturnTypeLike<unknown, undefined>>;
/** Each position tries its preferred side first, then falls back to the opposite side if it doesn't fit. */
declare const TOOLTIP_POSITIONS: Record<`${TooltipPosition}`, ConnectedPosition[]>;

export { AvatarShape, AvatarSize, BadgeColor, BadgeVariant, ButtonColor, ButtonRadius, ButtonShape, ButtonSize, ButtonStatus, ButtonVariant, CHECKBOX_ICON_SIZE, CardPadding, CardVariant, CheckboxSize, CheckboxStatus, DROPDOWN_POSITIONS, DropdownPosition, ICON_SIZE_PX, IconSize, InputFieldSize, InputFieldStatus, LabelSize, MERIDIAN_ICONS, ModalSize, MrAvatar, MrBadge, MrButton, MrCard, MrCheckbox, MrDropdown, MrDropdownItem, MrIcon, MrInputField, MrLabel, MrModal, MrPagination, MrRadio, MrSelect, MrSpinner, MrTab, MrTable, MrTabs, MrToast, MrToastContainer, MrToastService, MrToggle, MrTooltip, PaginationSize, RadioSize, RadioStatus, SelectSize, SelectStatus, SpinnerColor, SpinnerSize, TOOLTIP_POSITIONS, TableSize, TabsSize, ToastStatus, ToggleSize, ToggleStatus, TooltipPosition, avatarVariants, badgeVariants, buttonVariants, cardVariants, checkboxBoxVariants, dropdownItemVariants, dropdownPanelVariants, iconVariants, inputFieldHelperVariants, inputFieldVariants, labelVariants, modalPanelVariants, paginationButtonVariants, paginationEllipsisVariants, paginationNavVariants, provideMeridianIcons, radioBoxVariants, radioDotVariants, selectHelperVariants, selectOptionVariants, selectPanelVariants, selectTriggerVariants, selectValueVariants, spinnerVariants, tabButtonVariants, tableBodyRowVariants, tableCellVariants, tableHeaderCellVariants, tableHeaderRowVariants, tableVariants, tableWrapperVariants, tabsListVariants, toastCloseButtonVariants, toastIconVariants, toastListVariants, toastMessageVariants, toastVariants, toggleThumbVariants, toggleTrackVariants, tooltipPanelVariants };
export type { MrIconName, SelectOption, TableAlign, TableColumn, TableSortDirection, TableSortEvent, ToastOptions, ToastRef };
