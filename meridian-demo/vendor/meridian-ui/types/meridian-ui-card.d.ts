import * as i0 from '@angular/core';
import * as tailwind_variants from 'tailwind-variants';

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
    protected readonly cardClass: i0.Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MrCard, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MrCard, "mr-card", never, { "variant": { "alias": "variant"; "required": false; }; "padding": { "alias": "padding"; "required": false; }; }, {}, never, ["*"], true, never>;
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

export { CardPadding, CardVariant, MrCard, cardVariants };
