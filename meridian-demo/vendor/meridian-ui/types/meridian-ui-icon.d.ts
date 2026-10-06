import * as _angular_core from '@angular/core';
import * as tailwind_variants from 'tailwind-variants';

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

export { ICON_SIZE_PX, IconSize, MERIDIAN_ICONS, MrIcon, iconVariants, provideMeridianIcons };
export type { MrIconName };
