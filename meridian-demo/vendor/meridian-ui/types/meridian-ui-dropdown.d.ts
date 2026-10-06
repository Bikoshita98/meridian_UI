import * as _angular_core from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import * as _angular_cdk_overlay from '@angular/cdk/overlay';
import { ConnectedPosition } from '@angular/cdk/overlay';
import * as tailwind_variants from 'tailwind-variants';

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

export { DROPDOWN_POSITIONS, DropdownPosition, MrDropdown, MrDropdownItem, dropdownItemVariants, dropdownPanelVariants };
