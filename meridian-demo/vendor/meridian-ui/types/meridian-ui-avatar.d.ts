import * as _angular_core from '@angular/core';
import * as tailwind_variants from 'tailwind-variants';

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

export { AvatarShape, AvatarSize, MrAvatar, avatarVariants };
