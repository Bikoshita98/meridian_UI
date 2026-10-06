import * as i0 from '@angular/core';
import * as tailwind_variants from 'tailwind-variants';

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
    protected readonly badgeClass: i0.Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MrBadge, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MrBadge, "mr-badge", never, { "variant": { "alias": "variant"; "required": false; }; "color": { "alias": "color"; "required": false; }; }, {}, never, ["*"], true, never>;
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

export { BadgeColor, BadgeVariant, MrBadge, badgeVariants };
