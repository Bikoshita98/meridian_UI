import * as i0 from '@angular/core';
import * as tailwind_variants from 'tailwind-variants';

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
    protected readonly hostClass: i0.Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MrLabel, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MrLabel, "mr-label", never, { "for": { "alias": "for"; "required": false; }; "size": { "alias": "size"; "required": false; }; "required": { "alias": "required"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*"], true, never>;
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

export { LabelSize, MrLabel, labelVariants };
